<?php

namespace OptimizePress\Integrations\Services\Integrations;

use Exception;
use Kite\OhMyEmma\Emma;
use OPDashboard\Services\GeoIp;
use OptimizePress\Integrations\Collections\IntegrationFieldsCollection;
use OptimizePress\Integrations\Collections\IntegrationListsCollection;
use OptimizePress\Integrations\Integration;
use OptimizePress\Integrations\IntegrationList;
use OptimizePress\Integrations\IntegrationField;
use OptimizePress\Integrations\LeadOptions;
use OptimizePress\Integrations\OptinData;
use OptimizePress\Integrations\OptinErrorResult;
use OptimizePress\Integrations\OptinResult;
use OptimizePress\Integrations\OptinSuccessResult;
use OptimizePress\Integrations\Services\Contracts\BaseIntegration;
use OptimizePress\Integrations\Services\Contracts\IntegrationServiceInterface;
use OptimizePress\Integrations\Services\Exceptions\AlreadySubscribedException;
use OptimizePress\Integrations\Services\Exceptions\OptinException;
use OptimizePress\Support\Log\Log;
use function OptimizePress\Support\array_get;
use function OptimizePress\Support\object_get;

/**
 * Integration with Emma
 */
class EmmaIntegration extends BaseIntegration implements IntegrationServiceInterface
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

        // HTTP clients and helpers
        $this->client = new Emma(
            $this->integration->getConnectionValue('app_id'),
            $this->integration->getConnectionValue('api_key'),
            $this->integration->getConnectionValue('api_secret')
        );
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
        // And try to make the request
        try {
            $response = $this->client->Groups->getGroups();

            if ($response and array_get($response, 'code') == 200) {
                return true;
            }
        } catch (Exception $e) {
            Log::error("[EMMA] Ping failed. " . $e->getMessage());
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
            $response = $this->client->Groups->getGroups();

            if ($response and array_get($response, 'code') == 200 and $results = @json_decode(array_get($response, 'details'))) {
                $lists = new IntegrationListsCollection;

                foreach ($results as $group) {
                    $list = $this->listObject([
                        'id'   => $group->member_group_id,
                        'name' => $group->group_name,
                    ]);
                    $lists->push($list);
                }
            }

            Log::error('[EMMA] Failed to get lists.');
        } catch (Exception $e) {
            Log::error('[EMMA] Error when fetching lists from service. ' . $e->getMessage());
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
        $groups = $this->getLists();

        if ($groups) {
            foreach ($groups as $group) {
                if ($group->id == $listId) {
                    $list = $group;
                }
            }
        }

        return isset($list) ? $list : null;
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

        // Always add email field
        $field = new IntegrationField([
            'id'       => 'email',
            'name'     => 'email',
            'label'    => 'E-Mail',
            'optin_id' => 'email',
            'enabled'  => true,
            'required' => true,
            'order'    => 0,
            'type'     => 'email',
        ]);
        $fields->push($field);

        try {
            $response = $this->client->Fields->getField();

            if ($response and array_get($response, 'code') == 200 and $results = @json_decode(array_get($response, 'details'))) {
                foreach ($results as $key => $result) {
                    $type = object_get($result, 'widget_type', 'text');

                    if ($type === 'select one') {
                        $type = 'select';
                    } elseif ($type === 'select multiple') {
                        $type = 'multiselect';
                    } elseif ($type === 'check_multiple') {
                        $type = 'check';
                    } elseif ($type === 'long') {
                        $type = 'textarea';
                    }

                    $field = new IntegrationField([
                        'id'       => $result->shortcut_name,
                        'name'     => $result->shortcut_name,
                        'label'    => $result->display_name,
                        'optin_id' => $result->shortcut_name,
                        'enabled'  => false,
                        'required' => $result->required,
                        'order'    => $result->column_order + 100,
                        'type'     => $type,
                    ]);

                    // For select/radio fields we also add the provided options
                    if (in_array($type, ['select', 'multiselect', 'radio', 'check']) and $options = object_get($result, 'options')) {
                        foreach ($options as $optionIndex => $optionValue) {
                            $field->addOptionValue($optionValue, $optionValue);
                        }
                    }

                    $fields->push($field);
                }
            }

            Log::debug('[EMMA] ' . count($fields)." form inputs fetched on list [$listId].");
        } catch (Exception $e) {
            Log::error("[EMMA] Error when fetching list fields [$listId] from service. " . $e->getMessage());
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
        // Prepare data
        $result            = $this->optinErrorResult();
        $email             = $optinData->email();
        $listId            = $optinData->listId();
        $tagsToAssign      = [];
        $this->optinData   = $optinData;
        $this->leadOptions = $leadOptions;

        // Get fields
        $fields = $optinData->except(['email', '_ip_address', '_user_agent', '_op_url']);

        // GDPR stuff
        if (class_exists('\OPDashboard\Services\GeoIp')) {
            $optinData->isFromEu = GeoIp::isFromEu();
        } else {
            $optinData->isFromEu = true;
        }
        $gdpr = $this->processGdprTags($optinData, true);

        if (!empty($gdpr)) {
            foreach ($gdpr as $key => $value) {
                $tagsToAssign[$value['id']] = 'yes';
            }

            $fields = array_merge($fields, $tagsToAssign);
        }

        // GDPR note
        $gdprNote = $this->getGdprNote($optinData);

        if (! empty($gdprNote) && !empty($optinData->get('optin-gdpr-field-note'))) {
            $fields[$optinData->get('optin-gdpr-field-note')] = $gdprNote;
        }

        // Member data
        $memberData = array(
            'email'  => $email,
            'fields' => $fields,
        );

        try {
            // Create member
            $response = $this->client->Members->updateAddMember($memberData);

            // Check if created
            if ($response and array_get($response, 'code') == 200 and $results = @json_decode(array_get($response, 'details'))) {
                if ($results->added) {
                    Log::debug("[EMMA] Contact created [{$results->member_id}].");
                } else {
                    Log::debug("[EMMA] Contact updated [{$results->member_id}].");
                }

                // We also need to add the member to a group
                $added = $this->client->Groups->addRemoveMembers($listId, ['member_ids' => [$results->member_id]]);
                $addedResult = @json_decode(array_get($added, 'details'));

                // Check if added
                if ($added and array_get($added, 'code') == 200) {
                    $result = $this->optinSuccessResult();
                    Log::debug("[EMMA] Contact added to group [{$results->member_id}] / [{$listId}].");
                } else {
                    Log::error("[EMMA] Failed to add contact to group [{$results->member_id}] / [{$listId}]. ERROR: " . $addedResult->error);
                    $this->throwOptinException('Failed to add contact to group.');
                }
            } else {
                Log::error("[EMMA] Failed to subscribe [$listId].");
                $this->throwOptinException();
            }
        } catch (Exception $e) {
            Log::error("[EMMA] Error when subscribing to list [$listId]. " . $e->getMessage());
            $this->throwOptinException($e);
        }

        return $result;
    }
}
