<?php

namespace OptimizePress\Integrations\Services\Integrations;

use Exception;
use OPDashboard\Services\GeoIp;
use OptimizePress\Integrations\Collections\IntegrationFieldsCollection;
use OptimizePress\Integrations\Collections\IntegrationListsCollection;
use OptimizePress\Integrations\Integration;
use OptimizePress\Integrations\IntegrationList;
use OptimizePress\Integrations\IntegrationField;
use OptimizePress\Integrations\LeadOptions;
use OptimizePress\Integrations\OptinData;
use OptimizePress\Integrations\OptinResult;
use OptimizePress\Integrations\Services\Contracts\BaseIntegration;
use OptimizePress\Integrations\Services\Contracts\IntegrationServiceInterface;
use OptimizePress\Integrations\Services\Exceptions\AlreadySubscribedException;
use OptimizePress\Integrations\Services\Exceptions\OptinException;
use OptimizePress\Support\Log\Log;
use function OptimizePress\Support\array_get;

/**
 * SendReach service class for integration
 */
class SendReachIntegration extends BaseIntegration implements IntegrationServiceInterface
{
    /**
     * Init dependencies
     *
     * @param Integration $integration
     */
    public function __construct(Integration $integration)
    {
        // Initialize and setup
        $this->init($integration);
        \MailWizzApi_Autoloader::register();

        // Credentials
        $apiKey = $this->integration->getConnectionValue('api_key');
        $apiSecret = $this->integration->getConnectionValue('api_secret');

        // Setup base config
        $this->config = [
            'apiUrl'     => 'http://dashboard.sendreach.com/api/index.php',
            'publicKey'  => $apiKey,
            'privateKey' => $apiSecret,
        ];

        // Set the config
        \MailWizzApi_Base::setConfig(new \MailWizzApi_Config($this->config));
    }

    /**
     * Check if integration is ready for access
     *
     * @return bool
     */
    public function isReady()
    {
        if ($this->client) {
            return true;
        }

        return false;
    }

    /**
     * Ping the service API
     *
     * @return bool
     */
    public function ping()
    {
        try {
            $endpoint = new \MailWizzApi_Endpoint_Lists();
            $response = $endpoint->getLists();

            if ($response->getHttpCode() == 200) {
                return true;
            }
        } catch (Exception $e) {
            Log::error($e);
        }

        return false;
    }

    /**
     * Return all lists
     *
     * @return IntegrationListsCollection
     */
    public function getLists()
    {
        try {
            $endpoint = new \MailWizzApi_Endpoint_Lists();
            $response = $endpoint->getLists(1, 9999);
            $status = $response->body->itemAt('status');

            if ($response and $response->body and isset($response->body['data']) and isset($status) and $status == 'success' and $response->body['data']['records']) {
                $lists = new IntegrationListsCollection;

                foreach ($response->body['data']['records'] as $record) {
                    $list = $this->listObject([
                        'id'          => array_get($record, 'general.list_uid'),
                        'name'        => array_get($record, 'general.display_name'),
                        'description' => array_get($record, 'general.description'),
                    ]);
                    $lists->push($list);
                }

                return $lists;
            }

            Log::error('[SENDREACH] Failed to get lists.');
        } catch (Exception $e) {
            Log::error('[SENDREACH] Error when fetching lists from service. ' . $e->getMessage());
        }

        return null;
    }

    /**
     * Return a list
     *
     * @param  mixed $listId
     * @return IntegrationList
     */
    public function getList($listId)
    {
        try {
            $endpoint = new \MailWizzApi_Endpoint_Lists();
            $response = $endpoint->getList($listId);

            $status = $response->body->itemAt('status');

            if ($response and $response->body and isset($response->body['data']) and isset($status) and $status == 'success' and $response->body['data']['record']) {
                $record = $response->body['data']['record'];
                $list = $this->listObject([
                    'id'          => array_get($record, 'general.list_uid'),
                    'name'        => array_get($record, 'general.display_name'),
                    'description' => array_get($record, 'general.description'),
                ]);

                return $list;
            }

            Log::error("[SENDREACH] Failed to get list: ".$listId);
        } catch (Exception $e) {
            Log::error("[SENDREACH] Error when fetching list [$listId] from service. " . $e->getMessage());
        }

        return null;
    }

    /**
     * Get form fields
     *
     * @param  mixed $listId
     * @return IntegrationFieldsCollection
     */
    public function getFields($listId = null)
    {
        if (!$listId) return;

        $fields = new IntegrationFieldsCollection;

        try {
            $endpoint = new \MailWizzApi_Endpoint_ListFields();
            $response = $endpoint->getFields($listId);

            $status = $response->body->itemAt('status');

            if ($response and $response->body and isset($response->body['data']) and isset($status) and $status == 'success' and $records = $response->body['data']['records']) {
                foreach ($records as $index => $record) {
                    $id       = array_get($record, 'tag');
                    $order    = $id == 'EMAIL' ? 35 : ($index + 1) * 10; // Put email after first/last name
                    $type     = array_get($record, 'type.identifier');
                    $label    = array_get($record, 'label');
                    $required = array_get($record, 'required') == 'yes' ? true : false;

                    $field = new IntegrationField([
                        'id'       => $id == 'EMAIL' ? 'email' : $id,
                        'name'     => $id,
                        'label'    => $label,
                        'optin_id' => $id,
                        'type'     => $type,
                        'enabled'  => $required,
                        'required' => $required,
                        'order'    => $order
                    ]);
                    $fields->push($field);
                }
            } else {
                Log::error('[SENDREACH] Failed to get fields for list: ' . $listId);
            }
        } catch (Exception $e) {
            Log::error("[SENDREACH] Error when fetching fields for list [$listId] from service. " . $e->getMessage());
        }

        Log::info("[SENDREACH] Fields for [$listId] successfully fetched from service.");

        return $fields;
    }

    /**
     * Optin to email service
     *
     * @param  OptinData   $optinData
     * @param  LeadOptions $leadOptions
     * @return OptinResult
     * @throws AlreadySubscribedException
     * @throws OptinException
     */
    public function optin(OptinData $optinData, LeadOptions $leadOptions = null)
    {
        $result = $this->optinErrorResult();
        $email  = $optinData->email();
        $listId = $optinData->listId();

        try {
            $endpoint = new \MailWizzApi_Endpoint_ListSubscribers();

            // Prepare data
            $requestData = ['EMAIL' => $email]; // the confirmation email will be sent!!! Use valid email address

            // Add more fields (except Email)
            foreach ($optinData->data() as $key => $value) {
                if ($key != 'email') {
                    $requestData[$key] = $value;
                }
            }

            $gdprNote = $this->getGdprNote($optinData);

            if (!empty($gdprNote) && !empty($optinData->get('optin-gdpr-field-note'))) {
                $requestData[$optinData->get('optin-gdpr-field-note')] = $gdprNote;
            }

            Log::debug('[SENDREACH] Preparing request data: ' . @json_encode($requestData));

            // Try to subscribe
            $response = $endpoint->create($listId, $requestData);

            $status = $response->body->itemAt('status');

            if ($response and $response->body and isset($response->body['data']) and isset($status) and $status == 'success') {
                Log::debug("[SENDREACH] User subscribed: $email to list $listId");

                // GDPR stuff below
                $optinData->contactId = $response->body['data']['record']['subscriber_uid'];
                if (class_exists('\OPDashboard\Services\GeoIp')) {
                    $optinData->isFromEu = GeoIp::isFromEu();
                } else {
                    $optinData->isFromEu = true;
                }
                $this->processGdprTags($optinData);

                $result = $this->optinSuccessResult();
            } elseif ($response and $response->body and $response->getHttpCode() == 409) {
                Log::info("[SENDREACH] Member with email [$email] already subscribed to list [$listId].");
                $this->throwOptinAlreadySubscribedException();
            } else {
                Log::error("[SENDREACH] Failed to subscribe [$listId].");
                $this->throwOptinException();
            }
        } catch (Exception $e) {
            if ($e->getCode() == 409) {
                Log::debug("[SENDREACH] User already subscribed: $email to list $listId. Code [" . $e->getCode() . '].');
                $this->throwOptinAlreadySubscribedException();
            } else {
                Log::error("[SENDREACH] Error when subscribing to list [$listId]. " . $e->getMessage());
                $this->throwOptinException($e);
            }
        }

        return $result;
    }

    /**
     * Assign GDPR tags
     *
     * @param OptinData $data
     * @param  array $tags
     * @return string
     */
    public function assignGdprTags(OptinData $data, array $tags)
    {
        if (!empty($tags)) {
            $listId = $data->listId();
            $contactId = $data->contactId;
            $requestData = ['EMAIL' => $data->get('email')];
            foreach ($data->data() as $key => $value) {
                if ($key != 'email') {
                    $requestData[$key] = $value;
                }
            }
            foreach ($tags as $key => $value) {
                $requestData[$key] = 'yes';
            }

            $endpoint = new \MailWizzApi_Endpoint_ListSubscribers();

            $response = $endpoint->update($listId, $contactId, $requestData);
        }

        return true;
    }
}
