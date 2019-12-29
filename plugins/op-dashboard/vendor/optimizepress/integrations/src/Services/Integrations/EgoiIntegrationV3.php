<?php

namespace OptimizePress\Integrations\Services\Integrations;

use Exception;
use GuzzleHttp\Client as HttpClient;
use OPDashboard\Services\GeoIp;
use OptimizePress\Integrations\Collections\IntegrationFieldsCollection;
use OptimizePress\Integrations\Collections\IntegrationListsCollection;
use OptimizePress\Integrations\Collections\IntegrationTagsCollection;
use OptimizePress\Integrations\Integration;
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
use OptimizePress\Support\Log\Log;

/**
 * Integration with ConvertKit
 */
class EgoiIntegrationV3 extends BaseIntegration implements IntegrationServiceInterface, IntegrationHasTagsInterface
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

        // Setup base config
        $this->config = [
            'base_uri' => $this->integration->serviceUrl(),
            'headers' => [
                'Accept' => 'application/json',
                'Apikey' => $integration->getConnectionValue('api_key')
            ],
        ];

        // HTTP clients and helpers
        $this->client = new HttpClient($this->config);
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
            // https://developers.e-goi.com/api/v3/#tag/Ping
            $response = $this->client->post('ping');

            if ($response->getStatusCode() === 200 and $result = @json_decode($response->getBody()) and isset($result->result)) {
                return true;
            }

            Log::error('[EGOI] Ping failed. ' . @json_decode($response->getBody()));
        } catch (Exception $e) {
            Log::error('[EGOI] Ping failed. ' . $e->getMessage());
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
            // https://developers.e-goi.com/api/v3/#tag/Lists
            $response = $this->client->get('lists?limit=100');

            if ($response->getStatusCode() === 200 and $result = @json_decode($response->getBody()) and isset($result->items)) {
                $lists = new IntegrationListsCollection;

                foreach ($result->items as $list) {
                    $list = $this->listObject([
                        'id'   => $list->list_id,
                        'name' => $list->public_name,
                    ]);
                    $lists->push($list);
                }

                return $lists;
            }

            Log::error('[EGOI] Error when fetching lists. ' . @json_decode($response->getBody()));
        } catch (Exception $e) {
            Log::error('[EGOI] Error when fetching lists. ' . $e->getMessage());
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
        try {
            $lists = $this->getLists();

            if ($lists) {
                foreach ($lists as $list) {
                    if ($listId === $list->id) {
                        return $list;
                    }
                }
            }

            Log::error("[EGOI] Failed to get list [$listId].");
        } catch (Exception $e) {
            Log::error("[EGOI] Error when fetching list [$listId] from service. " . $e->getMessage());
        }

        return null;
    }

    /**
     * Get form fields
     *
     * @param  string  $listId
     * @return IntegrationFieldsCollection
     */
    public function getFields($listId = null)
    {
        $fields = new IntegrationFieldsCollection;

        try {
            // https://developers.e-goi.com/api/v3/#operation/getAllFields
            $response = $this->client->get('lists/' . $listId . '/fields');

            if ($response->getStatusCode() === 200 and $result = @json_decode($response->getBody())) {
                foreach ($result as $field) {
                    if (in_array($field->field_id, ['subscription_method', 'subscription_status', 'uid', 'language', 'android_token', 'ios_oken', 'consent', 'dateadd']))
                        continue;

                    $fields->push(new IntegrationField([
                        'id'         => str_replace(' ', '-', strtolower($field->name)),
                        'name'       => $field->name,
                        'label'      => $field->name,
                        'optin_id'   => $field->field_id,
                        'type'       => 'text',
                        'param_type' => $field->type,
                        'enabled'    => false,
                        'required'   => $field->field_id === 'email' ? true : false,
                        'order'      => $field->field_id === 'email' ? 3 : 100,
                    ]));
                }
                
            } else {
                Log::error('[EGOI] Failed to get fields.');
            }
        } catch (Exception $e) {
            Log::error('[EGOI] Error when fetching fields from service. '. $e->getMessage());
        }

        return $fields;
    }

    /**
     * Get Field from List
     *
     * @param string $listId
     * @param string $name
     * @return IntegrationField
     */
    public function getField($listId = null, $name = null)
    {
        $fields = $this->getFields($listId);

        if ($fields) {
            foreach($fields as $field) {
                if ($field->name === $name)
                    return $field;
            }
        }

        return null;
    }

    /**
     * Get all tags
     *
     * @return IntegrationTagsCollection
     */
    public function getTags()
    {
        $tags = new IntegrationTagsCollection;

        try {
            // https://developers.e-goi.com/api/v3/#tag/Tags
            $response = $this->client->get('tags');

            if ($response->getStatusCode() === 200 and $result = @json_decode($response->getBody())) {
                foreach ($result->items as $key => $tag) {
                    $tags->push(new IntegrationTag([
                        'id'   => $tag->tag_id,
                        'name' => $tag->name,
                    ]));
                }

                return $tags;
            }

            Log::error('[EGOI] Failed to get tags.');
        } catch (Exception $e) {
            Log::error('[EGOI] Error when fetching tags from service. '. $e->getMessage());
        }

        return $tags;
    }

    /**
     * Return a specific tag
     *
     * @param  mixed  $tagId
     * @return IntegrationTag
     */
    public function getTag($tagId)
    {
        $allTags = $this->getTags();

        foreach ($allTags as $tag) {
            if ($tag->id === $tagId) {
                return $tag;
            }
        }

        return null;
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
        // Setup params
        $result = $this->optinErrorResult();
        $email  = $optinData->email();
        $listId = $optinData->listId();
        $tags   = $optinData->tags();
        $fields = $this->getFields($listId);

        // Prepare contact fields
        $body = [
            'base' => [
                'status'     => $optinData->doubleOptinCheckbox() ? 'unconfirmed' : 'active',
            ],
            'extra' => [],
        ];

        // Add base fields
        foreach ($fields as $fieldId => $field) {
            if ($field->param_type === 'base' && $value = $optinData->data($field->id)) {
                if ($field->optin_id === 'name') {
                    $field->optin_id = 'first_name';
                }
                $body['base'][$field->optin_id] = $value;
            }
        }

        // Add extra (custom) fields
        foreach ($fields as $fieldId => $field) {
            if ($field->param_type === 'extra' && $value = $optinData->data($field->id)) {
                $extraField = array(
                    "field_id" => $field->optin_id,
                    "value" => $value,
                );
                array_push($body['extra'], $extraField);
            }
        }

        // Add gdpr note if exists
        $gdprNote = $this->getGdprNote($optinData);
        if (!empty($gdprNote) && !empty($optinData->get('optin-gdpr-field-note'))) {
            $field = $this->getField($listId, $optinData->get('optin-gdpr-field-note'));
            $extraField = array(
                "field_id" => $field->optin_id,
                "value" => $gdprNote,
            );
            array_push($body['extra'], $extraField);
        }

        // Setup request data
        $requestData['form_params'] = $body;
        Log::debug('[EGOI] Preparing request data: ' . @json_encode($requestData));

        try {
            // https://developers.e-goi.com/api/v3/#operation/createContact
            $response = $this->client->post('lists/'.$listId.'/contacts', $requestData);

            if (($response->getStatusCode() === 201 && $result = @json_decode($response->getBody())) && isset($result->contact_id) && $contactId = $result->contact_id) {
                $optinData->userId = $contactId;
                Log::debug("[EGOI] User subscribed: $email to list $listId");

                // GDPR tags
                if (class_exists('\OPDashboard\Services\GeoIp')) {
                    $optinData->isFromEu = GeoIp::isFromEu();
                } else {
                    $optinData->isFromEu = true;
                }
                $gdpr = $this->processGdprTags($optinData, true);

                // And assign to a tag if needed
                if ($contactId and $tags) {
                    foreach ($tags as $tag) {
                        Log::debug("[EGOI] Assign tag to user: [$tag]");
                        $assignResult = $this->applyTag($listId, $contactId, $tag);

                        if ($assignResult) {
                            Log::debug("[EGOI] Tag assigned to user successfully: [$tag] / [$contactId].");
                        }
                    }
                }

                $result = $this->optinSuccessResult();
            } else {
                Log::error("[EGOI] Failed to subscribe [$listId].");
                $this->throwOptinException();
            }
        } catch (Exception $e) {
            if ($e->getResponse() && $e->getResponse()->getStatusCode() === 409) {
                Log::info("[EGOI] Member with email [$email] already subscribed to list [$listId]. Not showing an error to the end user.");
                $this->throwOptinAlreadySubscribedException();
            }

            Log::error("[EGOI] Error when subscribing to list [$listId]. " . $e->getMessage());
            $this->throwOptinException($e);
        }

        return $result;
    }

    /**
     * Apply some tags to existing user
     *
     * @param  string  $listId
     * @param  string  $userId
     * @param  mixed  $tag
     * @return mixed
     */
    public function applyTag($listId, $userId, $tag)
    {
        $result = false;

        // Setup request data
        $requestData['form_params'] = [
            'tag_id'   => (int) $tag,
            'contacts' => [$userId],
        ];
        Log::debug('[EGOI] Preparing request data: '.@json_encode($requestData));

        try {
            // https://developers.e-goi.com/api/v3/#operation/actionAttachTag
            $response = $this->client->post('/lists/'.$listId.'/contacts/actions/attach-tag', $requestData);

            if (($response->getStatusCode() === 200 and $result = @json_decode($response->getBody()))) {
                Log::debug("[EGOI] User tagged: $userId / $tag");
                $result = true;
            } else {
                Log::error("[EGOI] Failed to tag user: $userId / $tag");
            }
        } catch (Exception $e) {
            Log::error('[EGOI] Error when tagging user. '.$e->getMessage());
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
        $listId = $data->listId();
        $userId = $data->userId;

        if ($userId and $tags) {
            foreach ($tags as $key => $tag) {
                Log::debug("[EGOI] [GDPR] Assigning GDPR tag {$tag['id']} to user [$userId]");
                $assignResult = $this->applyTag($listId, $userId, $tag['id']);

                if ($assignResult) {
                    Log::debug("[EGOI] [GDPR] GDPR Tag assigned to user successfully: {$tag['id']} " . @json_encode($assignResult));
                }
            }
        }

        return true;
    }
}
