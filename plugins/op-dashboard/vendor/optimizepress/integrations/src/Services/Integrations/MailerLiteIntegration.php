<?php

namespace OptimizePress\Integrations\Services\Integrations;

use Exception;
use MailerLiteApi\MailerLite;
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

/**
 * Integration with Emma
 */
class MailerLiteIntegration extends BaseIntegration implements IntegrationServiceInterface
{
    /**
     * Init dependencies and service
     *
     * @param Integration $integration
     */
    public function __construct(Integration $integration)
    {
        // Initialize and setup
        $this->init($integration);

        // Get API key
        $apiKey = $this->integration->getConnectionValue('api_key');

        // And build up client
        try {
            $this->client = new MailerLite($apiKey);
        } catch(Exception $e) {}
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
            $stats = $this->client->stats()->get();

            if (isset($stats->subscribed)) {
                return true;
            }
        } catch (Exception $e) {
            Log::error('[MAILERLITE] Ping failed. ' . $e->getMessage());
        }

        return false;
    }

    /**
     * Return all lists/groups
     *
     * @return IntegrationListsCollection
     */
    public function getLists()
    {
        try {
            $response = $this->client->groups()->get();

            if ($response) {
                $lists = new IntegrationListsCollection;

                foreach ($response as $group) {
                    $list = $this->listObject([
                        'id'   => $group->id,
                        'name' => $group->name,
                    ]);
                    $lists->push($list);
                }
            }

            Log::error('[MAILERLITE] Failed to get lists.');
        } catch (Exception $e) {
            Log::error('[MAILERLITE] Error when fetching lists from service. '. $e->getMessage());
        }

        return isset($lists) ? $lists : null;
    }

    /**
     * Return a list
     *
     * @param  string  $listId
     * @return IntegrationList
     */
    public function getList($listId)
    {
        try {
            $response = $this->client->groups()->find($listId);

            if ($response) {
                return $this->listObject([
                    'id'   => $response->id,
                    'name' => $response->name,
                ]);
            }

            Log::error('[MAILERLITE] Failed to get list: ' . $listId);
        } catch (Exception $e) {
            Log::error('[MAILERLITE] Error when fetching list ' . $listId . ' from service. '. $e->getMessage());
        }

        return null;
    }

    /**
     * Get form fields (hardcoded fields for iContact)
     *
     * @param  string  $listId
     * @return IntegrationFieldsCollection
     */
    public function getFields($listId = null)
    {
        $fields = new IntegrationFieldsCollection;

        // Add default fields
        $field = new IntegrationField(['id' => 'first_name', 'name' => 'first_name', 'label' => 'First Name', 'optin_id' => 'name',       'type' => 'text',  'enabled'  => false, 'required' => false, 'order' => 10]);
        $fields->push($field);
        $field = new IntegrationField(['id' => 'last_name',  'name' => 'last_name',  'label' => 'Last Name',  'optin_id' => 'last_name',  'type' => 'text',  'enabled'  => false, 'required' => false, 'order' => 20]);
        $fields->push($field);
        $field = new IntegrationField(['id' => 'email',      'name' => 'email',      'label' => 'E-Mail',     'optin_id' => 'email',      'type' => 'email', 'enabled'  => true,  'required' => true,  'order' => 30]);
        $fields->push($field);

        try {
            $response = $this->client->fields()->get();

            if ($response) {
                foreach ($response as $index => $item) {
                    // Skip previously added fields
                    if (! in_array($item->key, ['email', 'name', 'last_name'])) {
                        $type = strtolower($item->type);

                        // Skip some fields
                        $field = new IntegrationField([
                            'id'       => $item->key,
                            'name'     => $item->key,
                            'label'    => $item->title,
                            'optin_id' => $item->key,
                            'enabled'  => false,
                            'required' => false,
                            'order'    => ($index * 10) + 100,
                            'type'     => 'text',
                        ]);

                        $fields->push($field);
                    }
                }
            }

            Log::debug('[MAILERLITE] ' . count($fields) . " form inputs fetched on list [$listId].");
        } catch (Exception $e) {
            Log::error("[MAILERLITE] Error when fetching list fields [$listId] from service. " . $e->getMessage());
        }

        return $fields;
    }

    /**
     * Optin to email service
     *
     * @param  OptinData   $optinData
     * @param  LeadOptions $leadOptions
     * @return OptinResult
     * @throws OptinException
     */
    public function optin(OptinData $optinData, LeadOptions $leadOptions = null)
    {
        $result = $this->optinErrorResult();
        $email  = $optinData->email();
        $listId = $optinData->listId();

        // Add basic subscriber data
        $subscriberData = [
            'email'     => $email,
            'name'      => $optinData->data('first_name'),
            'fields'    => [
                'last_name' => $optinData->data('last_name'),
            ],
        ];

        // Add custom fields
        foreach ($this->getFields() as $fieldId => $field) {
            if (! in_array($field->id, ['email', 'first_name', 'last_name']) && $value = $optinData->data($field->id)) {
                $subscriberData['fields'][$field->optin_id] = $value;
            }
        }

        // Add GDPR note if it exists
        $gdprNoteField = $optinData->get('optin-gdpr-field-note');
        $gdprNote      = $this->getGdprNote($optinData);
        if ($gdprNote && $gdprNoteField) $subscriberData['fields'][$gdprNoteField] = $gdprNote;

        // And GDPR tags
        $gdprTags = $this->processGdprTags($optinData, true);
        if (! empty($gdprTags)) {
            foreach ($gdprTags as $gdprTag) {
                $subscriberData['fields'][$gdprTag['id']] = 'yes';
            }
        }

        try {
            // Create member
            $response = $this->client->groups()->addSubscriber($listId, $subscriberData);

            // Check if created
            if ($response && $response->id) {
                Log::debug("[MAILERLITE] Contact created [{$response->id}].");

                $result = $this->optinSuccessResult();
            } else {
                Log::error("[MAILERLITE] Failed to subscribe [$listId].");
                $this->throwOptinException();
            }
        } catch (Exception $e) {
            Log::error("[MAILERLITE] Error when subscribing to list [$listId]. " . $e->getMessage());
            $this->throwOptinException($e);
        }

        return $result;
    }
}
