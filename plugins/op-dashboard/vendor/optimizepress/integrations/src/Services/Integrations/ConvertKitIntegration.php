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
class ConvertKitIntegration extends BaseIntegration implements IntegrationServiceInterface, IntegrationHasTagsInterface
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
        $this->config = ['base_uri' => $this->integration->serviceUrl()];

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
        // Prepare request data
        $data = ['headers' => ['Accept' => 'application/json'], 'query' => ['api_key' => $this->integration->getConnectionValue('api_key')]];

        // And try to make the request
        try {
            $response = $this->client->get('forms', $data);

            if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody()) and isset($result->forms)) {
                return true;
            }

            Log::error('[CONVERTKIT] Ping failed. ' . @json_decode($response->getBody()));
        } catch (\Exception $e) {
            Log::error('[CONVERTKIT] Ping failed. ' . $e->getMessage());
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
        // Prepare request data
        $data = ['headers' => ['Accept' => 'application/json'], 'query' => ['api_key' => $this->integration->getConnectionValue('api_key')]];

        // And try to make the request
        try {
            $response = $this->client->get('forms', $data);

            if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody()) and isset($result->forms)) {
                $lists = new IntegrationListsCollection;

                foreach ($result->forms as $list) {
                    $list = $this->listObject([
                        'id'   => $list->id,
                        'name' => $list->name,
                    ]);
                    $lists->push($list);
                }

                return $lists;
            }

            Log::error('[CONVERTKIT] Error when fetching lists. ' . @json_decode($response->getBody()));
        } catch (\Exception $e) {
            Log::error('[CONVERTKIT] Error when fetching lists. ' . $e->getMessage());
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
        // Prepare request data
        $data = ['headers' => ['Accept' => 'application/json'], 'query' => ['api_key' => $this->integration->getConnectionValue('api_key')]];

        // And try to make the request
        try {
            $response = $this->client->get('forms/'.$listId, $data);

            if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody()) and isset($result->id)) {
                $list = $this->listObject([
                    'id'   => $result->id,
                    'name' => $result->name,
                ]);

                return $list;
            }

            Log::error("[CONVERTKIT] Failed to get list [$listId].");
        } catch (\Exception $e) {
            Log::error("[CONVERTKIT] Error when fetching list [$listId] from service. " . $e->getMessage());
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
        $field = new IntegrationField(['id' => 'first_name', 'name' => 'first_name', 'label' => 'First Name', 'optin_id' => 'first_name', 'type' => 'text',  'enabled'  => false, 'required' => false, 'order' => 10]);
        $fields->push($field);
        $field = new IntegrationField(['id' => 'last_name',  'name' => 'last_name',  'label' => 'Last Name',  'optin_id' => 'last_name',  'type' => 'text',  'enabled'  => false, 'required' => false, 'order' => 20]);
        $fields->push($field);
        $field = new IntegrationField(['id' => 'email',      'name' => 'email',      'label' => 'E-Mail',     'optin_id' => 'email',      'type' => 'email', 'enabled'  => true,  'required' => true,  'order' => 30]);
        $fields->push($field);

        // Prepare request data
        $data = ['headers' => ['Accept' => 'application/json'], 'query' => ['api_key' => $this->integration->getConnectionValue('api_key')]];

        try {
            $response = $this->client->get('custom_fields', $data);

            if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody())) {
                foreach ($result->custom_fields as $key => $field) {
                    if (in_array($field->key, array('first_name', 'last_name')))
                        continue;
                    $fields->push(new IntegrationField([
                        'id'        => $field->key,
                        'name'      => $field->name,
                        'label'     => $field->label,
                        'optin_id'  => $field->key,
                        'type'      => 'text',
                        'enabled'   => false,
                        'required'  => false,
                        'order'     => 100
                    ]));
                }
            }

            Log::error("[CONVERTKIT] Failed to get fields.");
        } catch (\Exception $e) {
            Log::error("[CONVERTKIT] Error when fetching fields from service. " . $e->getMessage());
        }

        return $fields;
    }

    /**
     * Get all tags
     *
     * @return IntegrationTagsCollection
     */
    public function getTags()
    {
        $tags = new IntegrationTagsCollection;

        // Prepare request data
        $data = ['headers' => ['Accept' => 'application/json'], 'query' => ['api_key' => $this->integration->getConnectionValue('api_key')]];

        // And try to make the request
        try {
            $response = $this->client->get('tags', $data);

            if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody())) {
                foreach ($result->tags as $key => $tag) {
                    $tags->push(new IntegrationTag([
                        'id'   => $tag->id,
                        'name' => $tag->name,
                    ]));
                }

                return $tags;
            }

            Log::error("[CONVERTKIT] Failed to get tags.");
        } catch (\Exception $e) {
            Log::error("[CONVERTKIT] Error when fetching tags from service. " . $e->getMessage());
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
            if ($tag->id == $tagId) {
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
        $name   = $optinData->fullName();
        //$gdprFields = $optinData->getGdprFields();

        // Prepare request data
        $requestData = ['headers' => ['Accept' => 'application/json']];

        // Setup body and add to request
        $body = ['api_key' => $this->integration->getConnectionValue('api_key'), 'email' => $email, 'name' => $name];

        //GDPR stuff below:
        if (class_exists('\OPDashboard\Services\GeoIp')) {
            $optinData->isFromEu = GeoIp::isFromEu();
        } else {
            $optinData->isFromEu = true;
        }
        $this->processGdprTags($optinData);

        // add gdpr note if it exists
        $gdprNote = $this->getGdprNote($optinData);

        if (!empty($gdprNote) && !empty($optinData->get('optin-gdpr-field-note'))) {
            $fieldIds = [];
            $fieldName = $optinData->get('optin-gdpr-field-note');
            $fieldIds[$fieldName] = $gdprNote;
            $body['fields'] = $fieldIds;
        }

        // Add tags if selected
        if ($tags = $optinData->tags()) {
            $tagIds = [];

            foreach ($tags as $tag) {
                $tagIds[] = $tag;
            }

            if ($tagIds) {
                $body['tags'] = implode(",", $tagIds);
            }
        }

        // Setup request data
        $requestData['form_params'] = $body;
        Log::debug('[CONVERTKIT] Preparing request data: ' . @json_encode($requestData));

        try {
            // And make the request
            $response = $this->client->post('forms/'.$listId.'/subscribe', $requestData);

            if (($response->getStatusCode() == 200 and $result = @json_decode($response->getBody()))) {
                Log::debug("[CONVERTKIT] User subscribed: $email to list $listId");
                $result = $this->optinSuccessResult();
            } else {
                Log::error("[CONVERTKIT] Failed to subscribe [$listId].");
                $this->throwOptinException();
            }
        } catch (\Exception $e) {
            Log::error("[CONVERTKIT] Error when subscribing to list [$listId]. " . $e->getMessage());
            $this->throwOptinException($e);
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
        $email = $data->get('email');

        if ($email and $tags) {
            foreach ($tags as $key => $tag) {
                Log::debug("[CONVERTKIT] [GDPR] Assigning GDPR tag {$tag['id']} to user [$email]");
                $assignResult = $this->applyTag($email, $tag['id']);

                if ($assignResult) {
                    Log::debug("[CONVERTKIT] [GDPR] GDPR Tag assigned to user successfully: {$tag['id']} " . @json_encode($assignResult));
                }
            }
        }

        return true;
    }

    /**
     * Apply some tags to existing user
     *
     * @param  string $email
     * @param  mixed  $tagId
     * @return mixed
     */
    public function applyTag($email, $tagId)
    {

        // Prepare request data
        $result      = false;
        $requestData = ['headers' => ['Accept' => 'application/json']];

        // Setup body and add to request
        $body = ["api_key" => $this->integration->getConnectionValue('api_key'), "email" => $email];

        // Setup request data
        $requestData['form_params'] = $body;
        Log::debug("[CONVERTKIT] Preparing tag request data: " . @json_encode($requestData));

        try {
            // And make the request
            $response = $this->client->post('tags/' . $tagId . '/subscribe', $requestData);

            if (($response->getStatusCode() == 200 and $result = @json_decode($response->getBody()))) {
                Log::debug("[CONVERTKIT] User tagged: $email / $tagId / ".@json_encode($result));
                $result = true;
            } else {
                Log::error("[CONVERTKIT] Failed to tag user [$email / $tagId].");
            }
        } catch (\Exception $e) {
            Log::error("[CONVERTKIT] Error when tagging user [$email / $tagId]. " . $e->getMessage());
        }

        return $result;
    }
}
