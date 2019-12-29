<?php

namespace OptimizePress\Integrations\Services\Integrations;

use Exception;
use OPDashboard\Services\GeoIp;
use OptimizePress\Integrations\Integration;
use OptimizePress\Integrations\Collections\IntegrationFieldsCollection;
use OptimizePress\Integrations\Collections\IntegrationListsCollection;
use OptimizePress\Integrations\Collections\IntegrationTagsCollection;
use OptimizePress\Integrations\IntegrationTag;
use OptimizePress\Integrations\IntegrationList;
use OptimizePress\Integrations\IntegrationField;
use OptimizePress\Integrations\LeadOptions;
use OptimizePress\Integrations\OptinData;
use OptimizePress\Integrations\OptinResult;
use OptimizePress\Integrations\Services\Contracts\BaseIntegration;
use OptimizePress\Integrations\Services\Contracts\IntegrationHasTagsInterface;
use OptimizePress\Integrations\Services\Contracts\IntegrationServiceInterface;
use OptimizePress\Integrations\Services\Exceptions\AlreadySubscribedException;
use OptimizePress\Integrations\Services\Exceptions\OptinException;
use OptimizePress\Integrations\Vendor\KlickTipp\KlickTippConnector;
use OptimizePress\Support\Log\Log;

/**
 * Integration with Klick-Tipp
 */
class KlickTippIntegration extends BaseIntegration implements IntegrationServiceInterface, IntegrationHasTagsInterface
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
        $this->client = new KlickTippConnector;
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
        return (bool) $this->login();
    }

    /**
     * Return all lists
     *
     * @return IntegrationListsCollection
     */
    public function getLists()
    {
        $this->login();
        $result = $this->client->subscription_process_index();

        if ($result) {
            $lists = new IntegrationListsCollection;

            foreach ($result as $listId => $listTitle) {
                $list = $this->listObject([
                    'id'   => $listId,
                    'name' => $listTitle,
                ]);
                $lists->push($list);
            }

            return $lists;
        }

        return null;
    }

    /**
     * Return a list
     *
     * @param  string  $listId
     * @return IntegrationList
     */
    public function getList($listId)
    {
        $lists = $this->getLists();

        if ($lists) {
            foreach ($lists as $list) {
                if ($list->id == $listId) {
                    return $list;
                }
            }
        }

        return null;
    }

    /**
     *
     */
    public function getTags()
    {
        $this->login();
        $result = $this->client->tag_index();

        if ($result) {
            $tags = new IntegrationTagsCollection;

            foreach ($result as $tagId => $tagName) {
                $tags->push(new IntegrationTag([
                    'id' => $tagId,
                    'name' => $tagName,
                ]));
            }

            return $tags;
        }

        return null;
    }

    /**
     *
     */
    public function getTag($tagId)
    {
        $tags = $this->getTags();

        if ($tags) {
            foreach ($tags as $tag) {
                if ($tag->id == $tagId) {
                    return $tag;
                }
            }
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

        // Also fetch other fields
        $this->login();
        $result = $this->client->field_index();

        if ($result) {
            $index = 100;

            foreach ($result as $fieldId => $fieldLabel) {
                $field = new IntegrationField([
                    'id'       => $fieldId,
                    'name'     => $fieldId,
                    'label'    => $fieldLabel,
                    'optin_id' => $fieldId,
                    'enabled'  => false,
                    'required' => false,
                    'order'    => $index,
                    'type'     => 'text',
                ]);

                // Add to collection
                $fields->push($field);
                $index += 10;
            }
        }

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
        $this->login();
        $result         = $this->optinErrorResult();
        $email          = $optinData->email();
        $listId         = $optinData->listId();
        $subscriberData = [];

        // Add custom fields
        foreach ($this->getFields() as $fieldId => $field) {
            if (! in_array($field->id, ['email', 'first_name', 'last_name']) && $value = $optinData->data($field->id)) {
                $subscriberData[$field->optin_id] = $value;
            }
        }

        // Add GDPR note if it exists
        $gdprNoteField = $optinData->get('optin-gdpr-field-note');
        $gdprNote      = $this->getGdprNote($optinData);
        if ($gdprNote && $gdprNoteField) $subscriberData[$gdprNoteField] = $gdprNote;

        // Tag the user if needed
        $tag = $optinData->firstTag() ?: 0;

        // Subscribe the user
        Log::debug('[KLICKTIPP] Preparing request data: ' . print_r($subscriberData, true));
        $response = $this->client->subscribe($email, $listId, $tag, $subscriberData);

        if ($response && isset($response->id) && $subscriberId = $response->id) {
            Log::debug("[KLICKTIPP] User subscribed: $email to list $listId.");

            // GDPR stuff below:
            if (class_exists('\OPDashboard\Services\GeoIp')) {
                $optinData->isFromEu = GeoIp::isFromEu();
            } else {
                $optinData->isFromEu = true;
            }

            // We also need to apply GDPR tags
            $this->processGdprTags($optinData);

            $result = $this->optinSuccessResult();
        } else {
            Log::error("[KLICKTIPP] Failed to subscribe [$listId].");
            $this->throwOptinException();
        }

        return $result;
    }

    /**
     * Assign GDPR tags
     *
     * @param  OptinData $data
     * @param  array     $tags
     * @return string
     */
    public function assignGdprTags(OptinData $data, array $tags)
    {
        $result = true;
        $email  = $data->email();

        if (! empty($tags)) {
            foreach ($tags as $key => $tag) {
                $response = $this->client->tag($email, $tag['id']);

                if ($response) {
                    Log::debug('[KLICKTIPP] GDPR tag assigned. ' . $tag['id']);
                } else {
                    Log::error('[KLICKTIPP] Failed to assign GDPR tag. ');
                    $result = false;
                }
            }
        }

        return $result;
    }

    /**
     * Login the client
     *
     * @return bool
     */
    protected function login()
    {
        return $this->client->login(
            $this->integration->getConnectionValue('username'),
            $this->integration->getConnectionValue('password')
        );
    }
}
