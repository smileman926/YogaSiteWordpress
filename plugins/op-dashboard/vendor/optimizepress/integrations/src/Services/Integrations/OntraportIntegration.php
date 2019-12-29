<?php

namespace OptimizePress\Integrations\Services\Integrations;

use Exception;
use GuzzleHttp\Client as HttpClient;
use OPDashboard\Services\GeoIp;
use OptimizePress\Integrations\Collections\IntegrationFieldsCollection;
use OptimizePress\Integrations\Collections\IntegrationListsCollection;
use OptimizePress\Integrations\Collections\IntegrationTagsCollection;
use OptimizePress\Integrations\Integration;
use OptimizePress\Integrations\IntegrationList;
use OptimizePress\Integrations\IntegrationField;
use OptimizePress\Integrations\IntegrationTag;
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
 * Ontraport service class for integration
 */
class OntraportIntegration extends BaseIntegration implements IntegrationServiceInterface, IntegrationHasTagsInterface
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

        // Credentials
        $appId  = $this->integration->getConnectionValue('app_id');
        $apiKey = $this->integration->getConnectionValue('api_key');

        // Setup base config
        $this->config = [
            'headers'  => ['Accept' => 'application/json', 'Api-Appid' => $appId, 'Api-Key' => $apiKey],
            'base_uri' => 'https://api.ontraport.com/1/'
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
        // And try to make the request
        try {
            $response = $this->client->get('Products');

            if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody()) and isset($result->data)) {
                return true;
            }

            Log::error('[ONTRAPORT] Ping failed. ' . @json_decode($response->getBody()));
        } catch (Exception $e) {
            Log::error('[ONTRAPORT] Ping failed. ' . $e->getMessage());
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
        $limit    = 50;
        $page     = 0;
        $lists     = $this->getListsOnPage($page, $limit);
        $loadMore = (count($lists) >= $limit);

        // Append
        while ($loadMore) {
            $page++;
            $additionalLists = $this->getListsOnPage($page, $limit);

            // Merge it
            if (count($additionalLists)) $lists = $lists->merge($additionalLists);

            // Check if we stop loading
            if (count($additionalLists) < $limit) $loadMore = false;
        }

        return $lists->unique();
    }

    /**
     * @param $page
     * @param $limit
     * @return IntegrationListsCollection
     */
    public function getListsOnPage($page, $limit)
    {
        // And try to make the request
        try {
            $start = $page * $limit;
            // Prepare request data
            $data = ['query'   => ['start' => $start]];
            $response = $this->client->get('CampaignBuilderItems', $data);

            if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody()) and isset($result->data)) {
                $lists = new IntegrationListsCollection;

                foreach ($result->data as $sequence) {
                    $list = $this->listObject([
                        'id'   => $sequence->id,
                        'name' => $sequence->name,
                    ]);
                    $lists->push($list);
                }

                return $lists;
            }

            Log::error('[ONTRAPORT] Failed to get lists. ' . @json_decode($response->getBody()));
        } catch (Exception $e) {
            Log::error('[ONTRAPORT] Error when fetching lists from service. ' . $e->getMessage());
        }
    }

    /**
     * Return a list
     *
     * @param  mixed $listId
     * @return IntegrationList
     */
    public function getList($listId)
    {
        $sequences = $this->getLists();

        if ($sequences) {
            foreach ($sequences as $list) {
                if ($list->id == $listId) {
                    return $list;
                }
            }
        }
    }

    /**
     * Return tags as key => value.
     *
     * @return IntegrationTagsCollection
     */
    public function getTags()
    {
        $limit    = 50;
        $page     = 0;
        $tags     = $this->getTagsOnPage($page, $limit);
        $loadMore = (count($tags) >= $limit);

        // Append
        while ($loadMore) {
            $page++;
            $additionalTags = $this->getTagsOnPage($page, $limit);

            // Merge it
            if (count($additionalTags)) $tags = $tags->merge($additionalTags);

            // Check if we stop loading
            if (count($additionalTags) < $limit) $loadMore = false;
        }

        return $tags->unique();
    }
    /**
     * @param $page
     * @param $limit
     * @return IntegrationTagsCollection
     */
    public function getTagsOnPage($page, $limit)
    {
        // And try to make the request
        try {
            $start = $page * $limit;
            // Prepare request data
            $data = ['query'   => ['start' => $start]];
            $tags     = new IntegrationTagsCollection;
            $response = $this->client->get('Tags', $data);

            if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody())) {

                foreach ($result->data as $key => $tag) {
                    $tags->push(new IntegrationTag([
                        'id'   => $tag->tag_id,
                        'name' => $tag->tag_name,
                    ]));
                }

                Log::info('[ONTRAPORT] Retrieved tags successfully . ');

                return $tags;
            }

            Log::error('[ONTRAPORT] Failed to get tags. ' . @json_decode($response->getBody()));
        } catch (Exception $e) {
            Log::error('[ONTRAPORT] Error when fetching lists from service. ' . $e->getMessage());
        }
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
            if ($tag->id == $tagId) {
                return $tag;
            }
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
        // Prepare request data
        $data = ['query'   => ['objectID' => 0, 'section' => 'Contact Information']];

        // And try to make the request
        try {
            $response = $this->client->get('objects/fieldeditor', $data);

            if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody()) and isset($result->data)) {
                $fields = new IntegrationFieldsCollection;

                foreach ($result->data->fields[0] as $field) {
                    if ($field->type === 'mergefield') continue;

                    $fieldObject = new IntegrationField([
                        'id'       => $field->field,
                        'name'     => $field->field,
                        'label'    => $field->alias,
                        'optin_id' => $field->field,
                        'enabled'  => true,
                        'required' => ($field->field === 'email') ? true : (bool) $field->required,
                        'order'    => $field->id,
                        'type'     => ($field->type === 'check') ? 'checkbox' : $field->type
                    ]);

                    $fields->push($fieldObject);
                }

                //Log::debug("[ONTRAPORT] Fields: " . print_r($fields, true));

                return $fields;
            }

            Log::error('[ONTRAPORT] Failed to get fields. ' . @json_decode($response->getBody()));
        } catch (Exception $e) {
            Log::error('[ONTRAPORT] Error when fetching fields from service. ' . $e->getMessage());
        }
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
        $list   = $this->getList($listId);

        // Prepare request data
        $requestData = [
            'headers' => ['Accept' => 'application/json', 'Api-Appid' => $this->integration->getConnectionValue('app_id'), 'Api-Key' => $this->integration->getConnectionValue('api_key')],
            'form_params' => [
//                'objectID'       => 0,
                'firstname'      => $optinData->firstName(),
                'lastname'       => $optinData->lastName(),
                'email'          => $email,
                'updateCampaign' => $list->id,
            ]
        ];

        // Add more fields (except Email)
        foreach ($optinData->data() as $key => $value) {
            if ($key != 'email') {
                if ($value == "true") $value = 1;
                $requestData['form_params'][$key] = $value;
            }
        }

        $gdprNote = $this->getGdprNote($optinData);

        if (!empty($gdprNote) && !empty($optinData->get('optin-gdpr-field-note'))) {
            $requestData['form_params'][$optinData->get('optin-gdpr-field-note')] = $gdprNote;
        }

        Log::debug('[ONTRAPORT] Preparing request data: ' . print_r($requestData, true));

        // And try to make the request
        try {
            // And make the request
            $response = $this->client->post('Contacts/saveorupdate', $requestData);

            if (($response->getStatusCode() == 200 and $responseDecoded = @json_decode($response->getBody()))) {
                $contactId = isset($responseDecoded->data->attrs) ? $responseDecoded->data->attrs->id : $responseDecoded->data->id;

                Log::debug("[ONTRAPORT] User subscribed: $email to list $listId.");

                $optinData->contactId = $contactId;
                //GDPR stuff below:
                if (class_exists('\OPDashboard\Services\GeoIp')) {
                    $optinData->isFromEu = GeoIp::isFromEu();
                } else {
                    $optinData->isFromEu = true;
                }

                $this->processTags($optinData);
                $this->processGdprTags($optinData);

                $result = $this->optinSuccessResult();

            } else {
                Log::error("[ONTRAPORT] Failed to subscribe [$listId].");
                $this->throwOptinException();
            }
        } catch (\Exception $e) {
            Log::error("[ONTRAPORT] Error when subscribing to list [$listId]. " . $e->getMessage());
            $this->throwOptinException($e);
        }

        return $result;
    }

    /**
     * Adds non GDPR tags
     * @param OptinData $data
     * @return bool
     */
    public function processTags(OptinData $data)
    {
        $tags = $data->tags();
        $accountId = $data->contactId;

        if (!empty($tags)) {
            $tagsToAssign = implode(',', $tags->toArray());

            $requestData = [
                'headers' => ['Accept' => 'application/json', 'Api-Appid' => $this->integration->getConnectionValue('app_id'), 'Api-Key' => $this->integration->getConnectionValue('api_key')],
                'form_params' => [
                    'objectID' => 0,
                    'add_list' => $tagsToAssign,
                    'ids' => $accountId
                ]
            ];

            $this->client->put('objects/tag', $requestData);
        }

        return true;
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
        $email = $data->get('email');
        $accountId = $data->contactId;

        if ($email and $tags) {
            foreach ($tags as $key => $tag) {
                $tagsToAssign[] = $tag['id'];
            }

            $requestData = [
                'headers' => ['Accept' => 'application/json', 'Api-Appid' => $this->integration->getConnectionValue('app_id'), 'Api-Key' => $this->integration->getConnectionValue('api_key')],
                'form_params' => [
                    'objectID'       => 0,
                    'add_list'      => implode(',', $tagsToAssign),
                    'ids'           => $accountId
                ]
            ];

            $this->client->put('objects/tag', $requestData);
        }

        return true;
    }
}
