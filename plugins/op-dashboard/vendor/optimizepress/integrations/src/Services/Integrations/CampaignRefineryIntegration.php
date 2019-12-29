<?php

namespace OptimizePress\Integrations\Services\Integrations;

use Exception;
use GuzzleHttp\Client as HttpClient;
use OPDashboard\Services\GeoIp;
use OptimizePress\Integrations\Collections\IntegrationFieldsCollection;
use OptimizePress\Integrations\Collections\IntegrationGoalsCollection;
use OptimizePress\Integrations\Collections\IntegrationListsCollection;
use OptimizePress\Integrations\Collections\IntegrationTagsCollection;
use OptimizePress\Integrations\Integration;
use OptimizePress\Integrations\IntegrationGoal;
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
 * CampaignRefinery service class for integration
 */
class CampaignRefineryIntegration extends BaseIntegration implements IntegrationServiceInterface, IntegrationHasTagsInterface
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
        $apiKey = $this->integration->getConnectionValue('api_key');

        // Setup base config
        $this->config = [
            'headers'  => [
                'content-type'  => 'application/x-www-form-urlencoded',
                'cache-control' => 'no-cache',
                'Accept'        => 'application/json'
            ],
            'query'    => ['key' => $apiKey],
            'base_uri' => 'https://app.campaignrefinery.com/rest/',
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
            $response = $this->client->get('forms/get-forms', $this->config);
            $result = @json_decode($response->getBody());

            if ($response->getStatusCode() == 200 && $result && empty($result->error)) {
                return true;
            }

            Log::error("[CAMPAIGNREFINERY] Failed to ping service.");
        } catch(\Exception $e) {
            Log::error("[CAMPAIGNREFINERY] Error when pinging service. " . $e->getMessage());
        }

        return false;
    }

    /**
     * Return all lists (in this case forms)
     *
     * @return IntegrationListsCollection
     */
    public function getLists()
    {
        // And try to make the request
        try {
            $response = $this->client->get('forms/get-forms', $this->config);

            if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody()) and isset($result->forms)) {
                $lists = new IntegrationListsCollection;

                foreach ($result->forms as $sequence) {
                    $list = $this->listObject([
                        'id'   => $sequence->form_uuid,
                        'name' => $sequence->form_name,
                    ]);
                    $lists->push($list);
                }

                return $lists;
            }

            Log::error('[CAMPAIGNREFINERY] Failed to get forms. ' . @json_decode($response->getBody()));
        } catch (Exception $e) {
            Log::error('[CAMPAIGNREFINERY] Error when fetching forms from service. ' . $e->getMessage());
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
     * @return array|IntegrationGoalsCollection
     */
    public function getGoals()
    {
        $goals = new IntegrationGoalsCollection;
        $response = $this->client->get('goals/get-goals', $this->config);

        if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody())) {

            foreach ($result->goals as $key => $goal) {
                $goals->push(new IntegrationGoal([
                    'id'   => $goal->goal_uuid,
                    'name' => $goal->goal_name,
                ]));
            }

            Log::info('[CAMPAIGNREFINERY] Retrieved goals successfully.');

            return $goals;
        }

        Log::error('[CAMPAIGNREFINERY] Failed to get goals. ' . @json_decode($response->getBody()));
        return $goals;
    }

    /**
     * Return tags as key => value.
     *
     * @return array|IntegrationTagsCollection
     */
    public function getTags()
    {
        $tags = new IntegrationTagsCollection;
        $response = $this->client->get('tags/get-tags', $this->config);

        if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody())) {

            foreach ($result->tags as $key => $tag) {
                $tags->push(new IntegrationTag([
                    'id'   => $tag->tag_uuid,
                    'name' => $tag->tag_name,
                ]));
            }

            Log::info('[CAMPAIGNREFINERY] Retrieved tags successfully.');

            return $tags;
        }

        Log::error('[CAMPAIGNREFINERY] Failed to get tags. ' . @json_decode($response->getBody()));
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
        $field = new IntegrationField(['id' => 'first_name', 'name' => 'first_name', 'label' => 'First Name', 'optin_id' => 'first_name', 'type' => 'text',  'enabled'  => false, 'required' => false, 'order' => 10]);
        $fields->push($field);
        $field = new IntegrationField(['id' => 'last_name',  'name' => 'last_name',  'label' => 'Last Name',  'optin_id' => 'last_name',  'type' => 'text',  'enabled'  => false, 'required' => false, 'order' => 20]);
        $fields->push($field);
        $field = new IntegrationField(['id' => 'email',      'name' => 'email',      'label' => 'E-Mail',     'optin_id' => 'email',      'type' => 'email', 'enabled'  => true,  'required' => true,  'order' => 30]);
        $fields->push($field);

        // try to get custom fields
        $response = $this->client->get('attributes/get-attributes', $this->config);

        if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody())) {
            foreach ($result->attributes as $key => $field) {
                $fields->push(new IntegrationField([
                    'id'        => $field->custom_attr_key,
                    'name'      => $field->custom_attr_name,
                    'label'     => $field->custom_attr_name,
                    'optin_id'  => $field->custom_attr_key,
                    'type'      => 'text',
                    'enabled'   => false,
                    'required'  => false,
                    'order'     => 100
                ]));
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
     * @throws OptinException
     */
    public function optin(OptinData $optinData, LeadOptions $leadOptions = null)
    {
        // Prepare data
        $result      = $this->optinErrorResult();
        $email       = $optinData->email();
        $listId      = $optinData->listId();
        $optinTags   = $optinData->tags();
        $optinGoals  = $optinData->goals();
        $requestData = $this->config;

        // Add connection key
        $requestData['form_params']['key'] = $this->integration->getConnectionValue('api_key');

        // Add optin data
        $requestData['form_params']['form_id'] = $listId;
        $requestData['form_params']['email']   = $email;
        if ($optinData->firstName()) $requestData['form_params']['first_name'] = $optinData->firstName();
        if ($optinData->lastName())  $requestData['form_params']['last_name']  = $optinData->lastName();

        if (!empty($optinData->firstName()) && !empty($optinData->lastName())) {
            $requestData['form_params']['name'] =
                $requestData['form_params']['first_name'] . ' ' . $requestData['form_params']['last_name'];
        }

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

        $requestData['form_params']['tags'] = $tagsToAssign;

        $gdprNote = $this->getGdprNote($optinData);

        if (! empty($gdprNote) && !empty($optinData->get('optin-gdpr-field-note'))) {
            $requestData['form_params'][$optinData->get('optin-gdpr-field-note')] = $gdprNote;
        }

        // set goals if they are present
        if (!empty($optinGoals)) {
            foreach ($optinGoals as $goal) {
                $goalId = $goal;
            }
            $requestData['form_params']['goal_id'] = $goalId;
        }


        Log::debug('[CAMPAIGNREFINERY] Preparing request data: ' . print_r($requestData, true));


        // And try to make the request
        try {
            // And make the request
            $response = $this->client->post('contacts/subscribe', $requestData);

            if (($response->getStatusCode() == 201)) {
                Log::debug('[CAMPAIGNREFINERY] User created.');
                $result = $this->optinSuccessResult();
            } else {
                Log::error("[CAMPAIGNREFINERY] Failed to subscribe contact [$email]." . print_r(json_decode($response->getBody(), true)));
                $this->throwOptinException();
            }
        } catch (\Exception $e) {
            Log::error("[CAMPAIGNREFINERY] Error when subscribing to list [$listId]. " . $e->getMessage());
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
       /* // ne dela ako nema gdpr tagova!!!
        $gdprTags = [];
        $realTags = [];
        // preparing GDPR tags to make it comma separated
        if ($tags) {
            foreach ($tags as $tag) {
                $gdprTags[] = $tag['id'];
            }
        }
        // adding normal tags here to optimize API calls
        if ($data->tags() && $tags) {
            $realTags = $data->tags()->toArray();
        }

        $tags = array_merge($gdprTags, $realTags);

        $tagIds = implode(',', $tags);

        $email = $data->get('email');
        $accountId = $data->contactId;

        if ($email && $tags && !empty($tagIds)) {

            $requestData = [
                'headers' => ['Accept' => 'application/json', 'Api-Appid' => $this->integration->getConnectionValue('app_id'), 'Api-Key' => $this->integration->getConnectionValue('api_key')],
                'form_params' => [
                    'objectID'       => 0,
                    'add_list'      => $tagIds,
                    'ids'           => $accountId
                ]
            ];

            $response = $this->client->put('objects/tag', $requestData);
        }*/

        return true;
    }
}
