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
 * Sendlane service class for integration
 */
class SendlaneIntegration extends BaseIntegration implements IntegrationServiceInterface, IntegrationHasTagsInterface
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
        $apiKey    = $this->integration->getConnectionValue('api_key');
        $apiSecret = $this->integration->getConnectionValue('api_secret');
        $apiUrl    = 'https://'.$this->integration->getConnectionValue('api_url').'/api/v1/';

        // Setup base config
        $this->config = [
            'headers'  => ['Accept' => 'application/json'],
            'query'    => ['api' => $apiKey, 'hash' => $apiSecret],
            'base_uri' => $apiUrl,
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
            $response = $this->client->post('lists', $this->config);
            $result = @json_decode($response->getBody());

            if ($response->getStatusCode() == 200 && $result && empty($result->error)) {
                return true;
            }

            Log::error("[SENDLANE] Failed to ping service.");
        } catch(\Exception $e) {
            Log::error("[SENDLANE] Error when pinging service. " . $e->getMessage());
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
        // And try to make the request
        try {
            $response = $this->client->post('lists', $this->config);

            if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody())) {
                $lists = new IntegrationListsCollection;

                foreach ($result as $list) {
                    $list = $this->listObject([
                        'id'   => $list->list_id,
                        'name' => $list->list_name,
                    ]);
                    $lists->push($list);
                }

                return $lists;
            }

            Log::error('[SENDLANE] Failed to get lists.');
        } catch(Exception $e) {
            Log::error('[SENDLANE] Error when fetching lists from service. ' . $e->getMessage());
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
        $lists = $this->getLists();

        if ($lists) {
            foreach ($lists as $list) {
                if ($listId == $list->id) {
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
        $response = $this->client->post('tags', $this->config);

        $tags = new IntegrationTagsCollection;
        if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody())) {

            if (is_array($result) && count($result) > 0) {
                foreach ($result as $key => $tag) {
                    $tags->push(new IntegrationTag([
                        'id'   => $tag->tag_id,
                        'name' => $tag->tag_name,
                    ]));
                }
            }
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
     * Get form fields
     *
     * @param  mixed $listId
     * @return IntegrationFieldsCollection
     */
    public function getFields($listId = null)
    {
        $fields = new IntegrationFieldsCollection;

        // Add default fields
        $fields->push(new IntegrationField(['id' => 'first_name', 'name' => 'first_name', 'label' => 'First Name', 'optin_id' => 'first_name', 'type' => 'text',  'enabled'  => false, 'required' => false, 'order' => 10]));
        $fields->push(new IntegrationField(['id' => 'last_name',  'name' => 'last_name',  'label' => 'Last Name',  'optin_id' => 'last_name',  'type' => 'text',  'enabled'  => false, 'required' => false, 'order' => 20]));
        $fields->push(new IntegrationField(['id' => 'email',      'name' => 'email',      'label' => 'E-Mail',      'optin_id' => 'email',     'type' => 'email', 'enabled'  => true,  'required' => true,  'order' => 30]));

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
        // Prepare params
        $result    = $this->optinErrorResult();
        $email     = $optinData->email();
        $listId    = $optinData->listId();
        $optinTags = $optinData->tags();

        // Prepare request data
        $requestData = $this->config;

        // Add optin data
        $requestData['query']['list_id'] = $listId;
        $requestData['query']['email']   = $email;
        if ($optinData->firstName()) $requestData['query']['first_name'] = $optinData->firstName();
        if ($optinData->lastName())  $requestData['query']['last_name']  = $optinData->lastName();

        // GDPR stuff below
        if (class_exists('\OPDashboard\Services\GeoIp')) {
            $optinData->isFromEu = GeoIp::isFromEu();
        } else {
            $optinData->isFromEu = true;
        }
        $gdpr = $this->processGdprTags($optinData, true);

        $gdprTags = [];
        if (!empty($gdpr)) {
            foreach ($gdpr as $gdprTag) {
                $gdprTags[] = $gdprTag['id'];
            }
        }

        // Also add tags if needed
        $realTags = [];
        if (!empty($optinTags)) {
            foreach ($optinTags as $tag) {
                $realTags[] = $tag;
            }
        }

        $allTags = array_merge($gdprTags, $realTags);

        $tagsToAssign = implode(',', array_values($allTags));
        $requestData['query']['tag_ids'] = $tagsToAssign;

        $gdprNote = $this->getGdprNote($optinData);

        if (!empty($gdprNote)) {
            $requestData['query']['GDPRConsentNote'] = $gdprNote;
        }

        Log::debug('[SENDLANE] Preparing request data: ' . @json_encode($requestData['query']));

        // And try to make the request
        try {
            $response = $this->client->post('list-subscriber-add', $requestData);

            if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody())) {
                Log::debug("[SENDLANE] User subscribed: $email to list $listId");
                $result = $this->optinSuccessResult();
            } else {
                Log::error("[SENDLANE] Failed to subscribe [$listId].");
                $this->throwOptinException();
            }
        } catch (Exception $e) {
            Log::error("[SENDLANE] Error when subscribing to list [$listId]. " . $e->getMessage());
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
        error_log(print_r(array_values($tags), true));
        if (!empty($tags)) {
            return implode(',', array_values($tags));
        }

        return '';
    }
}
