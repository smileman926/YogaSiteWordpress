<?php

namespace OptimizePress\Integrations\Services\Integrations;

use Exception;
use GuzzleHttp\Client as HttpClient;
use OPDashboard\Services\GeoIp;
use OptimizePress\Integrations\Collections\IntegrationFieldsCollection;
use OptimizePress\Integrations\Collections\IntegrationListsCollection;
use OptimizePress\Integrations\Collections\IntegrationTagsCollection;
use OptimizePress\Integrations\Integration;
use OptimizePress\Integrations\IntegrationField;
use OptimizePress\Integrations\IntegrationList;
use OptimizePress\Integrations\IntegrationTag;
use OptimizePress\Integrations\LeadOptions;
use OptimizePress\Integrations\OptinData;
use OptimizePress\Integrations\OptinResult;
use OptimizePress\Integrations\Services\Contracts\BaseIntegration;
use OptimizePress\Integrations\Services\Contracts\IntegrationHasTagsInterface;
use OptimizePress\Integrations\Services\Contracts\IntegrationServiceInterface;
use OptimizePress\Integrations\Services\Contracts\IntegrationServiceOAuthInterface;
use OptimizePress\Integrations\Services\Exceptions\AlreadySubscribedException;
use OptimizePress\Integrations\Services\Exceptions\OptinException;
use OptimizePress\Support\Log\Log;

/**
 * Integration with Emma
 */
class GetResponseIntegration extends BaseIntegration implements IntegrationServiceInterface, IntegrationServiceOAuthInterface, IntegrationHasTagsInterface
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

        // Get the client ID and secret
        $clientId     = $this->integration->getConnectionValue('client_id')     ?: $this->getEnvClientId();
        $clientSecret = $this->integration->getConnectionValue('client_secret') ?: $this->getEnvClientSecret();

        // Setup base config
        $state = md5($this->integration->id);
        $this->config = array(
            'client_id'        => $clientId,
            'client_secret'    => $clientSecret,
            'authorize_uri'    => 'https://app.getresponse.com/oauth2_authorize.html?response_type=code&client_id=%client_id%&state='.$state,
            'redirect_uri'     => $this->integration->getCallbackUrl(),
            'base_uri'         => 'https://api.getresponse.com/v3/'
        );

        // HTTP clients and helpers
        $this->client = new HttpClient(['base_uri' => $this->config['base_uri']]);

        // Set the token if available for integration
        $this->refreshToken();
    }

    /**
     * Authorize the API
     *
     * @return mixed
     */
    public function initAuthorization()
    {
        $authorizeUrl = $this->getAuthorizationUrl();

        // Redirect user to authorization URL
        header("HTTP/1.1 200 OK");
        header("Location: $authorizeUrl");
        exit();
    }

    /**
     * Return URL for authorizing OAuth requests
     *
     * @return string
     */
    public function getAuthorizationUrl()
    {
        $url = str_replace('%client_id%', $this->config['client_id'], $this->config['authorize_uri']);

        return $url;
    }

    /**
     * Return token for authorizing OAuth requests
     *
     * @param  array $requestData
     * @return mixed
     */
    public function getAuthorizationTokenAndSecret(array $requestData)
    {
        $code   = isset($requestData['code']) ? $requestData['code'] : null;
        $params = array(
            'grant_type' => 'authorization_code',
            'code'       => $code,
        );

        // Prepare request data
        $data = ['headers' => [
            'content-type' => 'application/x-www-form-urlencoded',
            'Expect'       => '',
            'Accept'       => 'application/json',
        ], 'form_params' => $params, 'auth' => [$this->config['client_id'], $this->config['client_secret']]];

        // And try to make the request
        try {
            $response = $this->client->post('https://api.getresponse.com/v3/token', $data);

            if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody()) and isset($result->access_token)) {
                Log::debug('[GETRESPONSE] Access token fetched: ' . $result->access_token);

                $this->integration->connection->token = $result->access_token;
                return [
                    'token'            => $result->access_token,
                    'token_secret'     => null,
                    'refresh_token'    => $result->refresh_token,
                    'token_expires_at' => date("Y-m-d H:i:s", time() + $result->expires_in),
                ];
            }

            Log::error("[GETRESPONSE] No access token found in response. " . @json_decode($response->getBody()));
        } catch (Exception $e) {
            Log::error("[RESPONSE] Error when fetching access token. " . $e->getMessage());
        }
    }

    /**
     * Since the token never expires we simply return the current data
     *
     * @param  bool  $force
     * @return mixed
     */
    public function refreshToken($force = false)
    {
        // Refresh the toke only if refresh token is set and we're forcing a refresh or the token has expired
        if ($this->getRefreshToken() and ($force or $this->integration->token_expires_at < date('Y-m-d H:i:s'))) {
            Log::debug('[GETRESPONSE] Refreshing access token for integration "' . $this->integration->provider . '" [' . $this->integration->id . "].");

            // Prepare request params
            $params = array(
                'grant_type'    => 'refresh_token',
                'refresh_token' => $this->getRefreshToken(),
            );

            // Prepare request data
            $data = ['headers' => [
                'content-type' => 'application/x-www-form-urlencoded',
                'Expect'       => '',
                'Accept'       => 'application/json',
            ], 'form_params' => $params, 'auth' => [$this->config['client_id'], $this->config['client_secret']]];
            Log::debug('[GETRESPONSE] Refresh data: ' . @json_encode($data));

            // And try to make the request
            try {
                $response = $this->client->post('https://api.getresponse.com/v3/token', $data);

                if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody()) and isset($result->access_token)) {
                    $this->integration->connection->token = $result->access_token;
                    $tokenData = [
                        'token'            => $result->access_token,
                        'token_secret'     => null,
                        'refresh_token'    => $result->refresh_token,
                        'token_expires_at' => date("Y-m-d H:i:s", time() + $result->expires_in),
                    ];

                    Log::debug('[GETRESPONSE] Access token refreshed: ' . @json_encode($tokenData));
                    $this->integration->storage()->updateConnectionFields($this->integration->uid, $tokenData);

                    return $tokenData;
                }

                Log::error("[GETRESPONSE] No access token found in refresh response. " . @json_decode($response->getBody()));
            } catch(\Exception $e) {
                Log::error("[GETRESPONSE] Error when refreshing access token. " . $e->getMessage() . " / Response body: " . $e->getResponse()->getBody());
            }
        }
    }

    /**
     * Get root URL to API
     *
     * @return string
     */
    public function getApiUrl()
    {
        return $this->config['base_uri'];
    }

    /**
     * Ping the service API
     *
     * @return bool
     */
    public function ping()
    {
        // Prepare request data
        $data = ['headers' => ['Accept' => 'application/json', 'Authorization' => 'Bearer ' . $this->getToken()]];

        // And try to make the request
        try {
            $response = $this->client->get('https://api.getresponse.com/v3/accounts', $data);

            if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody())) {
                return true;
            }

            Log::error("[GETRESPONSE] Failed to ping service.");
        } catch (Exception $e) {
            Log::error("[GETRESPONSE] Error when pinging service. " . $e->getMessage());
        }

        return false;
    }

    /**
     * Check if integration is ready
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
     * Return OAuth token for this integration
     *
     * @return string
     */
    public function getToken()
    {
        return $this->integration->getConnectionValue('token');
    }

    /**
     * Return OAuth refresh token for this integration
     *
     * @return string
     */
    public function getRefreshToken()
    {
        return $this->integration->getConnectionValue('refresh_token');
    }

    /**
     * Return token secret for this integration (not needed for MC
     *
     * @return null
     */
    public function getTokenSecret()
    {
        return $this->integration->getConnectionValue('token_secret');
    }

    /**
     * Return all lists
     *
     * @return IntegrationListsCollection
     */
    public function getLists()
    {
        // Prepare request data
        $data = ['headers' => ['Accept' => 'application/json', 'Authorization' => 'Bearer ' . $this->getToken()]];

        // And try to make the request
        try {
            $response = $this->client->get('https://api.getresponse.com/v3/campaigns', $data);

            if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody())) {
                $lists = new IntegrationListsCollection;

                foreach ($result as $list) {
                    $list = $this->listObject([
                        'id'          => $list->campaignId,
                        'name'        => $list->name,
                        'href'        => $list->href,
                        'description' => $list->description,
                    ]);
                    $lists->push($list);
                }

                return $lists;
            }

            Log::error("[GETRESPONSE] Failed to get lists.");
        } catch (Exception $e) {
            Log::error("[GETRESPONSE] Error when fetching lists from service. " . $e->getMessage());
        }
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
        $data = ['headers' => ['Accept' => 'application/json', 'Authorization' => 'Bearer ' . $this->getToken()]];

        // And try to make the request
        try {
            $response = $this->client->get('https://api.getresponse.com/v3/campaigns/' . $listId, $data);

            if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody())) {
                $list = $this->listObject([
                    'id'          => $result->campaignId,
                    'name'        => $result->name,
                    'href'        => $result->href,
                ]);

                return $list;
            }

            Log::error("[GETRESPONSE] Failed to get list [$listId].");
        } catch (Exception $e) {
            Log::error("[GETRESPONSE] Error when fetching list [$listId] from service. " . $e->getMessage());
        }
    }

    /**
     * Return tags as key => value.
     *
     * @return IntegrationTagsCollection
     */
    public function getTags()
    {
        $tags = new IntegrationTagsCollection;

        // Prepare request data
        $data = ['headers' => ['Accept' => 'application/json', 'Authorization' => 'Bearer ' . $this->getToken()]];

        try {
            $response = $this->client->get('https://api.getresponse.com/v3/tags', $data);

            if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody())) {
                foreach ($result as $key => $tag) {
                    $tags->push(new IntegrationTag([
                        'id' => $tag->tagId,
                        'name' => $tag->name,
                    ]));
                }
            }

            Log::error('[GETRESPONSE] Error when fetching tags from service.');
        } catch (\Exception $e) {
            Log::error('[GETRESPONSE] Error when fetching tags from service catch. ' . $e->getMessage());
        }

        return $tags;
    }

    /**
     * Retrieve single tag
     *
     * @param string $tagId
     * @return mixed|null
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
     * @param  mixed  $listId
     * @return IntegrationFieldsCollection
     */
    public function getFields($listId = null)
    {
        // Prepare request data
        $data = ['headers' => ['Accept' => 'application/json', 'Authorization' => 'Bearer ' . $this->getToken()]];

        // And try to make the request
        try {
            $response = $this->client->get('https://api.getresponse.com/v3/custom-fields', $data);

            if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody())) {
                $fields = new IntegrationFieldsCollection;

                // Always add email and name field
                $field = new IntegrationField([
                    'id'       => 'name',
                    'name'     => 'name',
                    'label'    => 'Name',
                    'optin_id' => 'name',
                    'required' => false,
                    'enabled'  => false,
                    'order'    => 1,
                    'type'     => 'text',
                ]);
                $fields->push($field);
                $field = new IntegrationField([
                    'id'       => 'email',
                    'name'     => 'email',
                    'label'    => 'E-Mail',
                    'optin_id' => 'email',
                    'required' => true,
                    'enabled'  => true,
                    'order'    => 2,
                    'type'     => 'email',
                ]);
                $fields->push($field);

                foreach ($result as $key => $var) {
                    $multiple = false;
                    $type = $var->fieldType;
                    if     ($var->hidden == "true")   { $type = "hidden"; }
                    elseif ($type == "single_select") { $type = "select"; }
                    elseif ($var->valueType == "url") { $type = "url"; }

                    $fields->push(new IntegrationField([
                        'id'       => $var->customFieldId,
                        'name'     => $var->name,
                        'label'    => mb_convert_case(str_replace("_", " ", $var->name), MB_CASE_TITLE),
                        'type'     => $type,
                        'optin_id' => $var->customFieldId,
                        'multiple' => $multiple,
                        'enabled'  => false,
                        'required' => false,
                        'order'    => $key + 10,
                    ]));
                }

                Log::debug('[GETRESPONSE] ' . count($fields)." form inputs fetched on list [$listId].");
                return $fields;
            }

            Log::error('[GETRESPONSE] Failed to get custom fields.');
        } catch (Exception $e) {
            Log::error('[GETRESPONSE] Error when fetching custom fields from service. ' . $e->getMessage());
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
        $result     = $this->optinErrorResult();
        $email      = $optinData->email();
        $listId     = $optinData->listId();
        $optinTags  = $optinData->tags();
        $inputs     = $this->getFields($listId);

        // get name field
        if ($inputs) {
            $merge_fields = [];

            foreach ($inputs as $input) {
                if ($input->name == 'name') {
                    if (!empty($optinData->get($input->optin_id))) {
                        $merge_fields[$input->optin_id] = $optinData->get($input->optin_id);
                    }
                }
            }
            if (empty($merge_fields['name'])) {
                $merge_fields['name'] = $email;
            }
        }

        $params = [
            'email'      => $email,
            'campaign'   => ['campaignId' => $listId],
            'dayOfCycle' => 0,
        ];
        if (! empty($merge_fields)) {
            $params = array_merge($params, $merge_fields);
        }

        // process GDPR stuff
        if (class_exists('\OPDashboard\Services\GeoIp')) {
            $optinData->isFromEu = GeoIp::isFromEu();
        } else {
            $optinData->isFromEu = true;
        }

        // Also add tags if needed
        $realTags = [];
        if (!empty($optinTags)) {
            foreach ($optinTags as $tag) {
                $realTags[] = array(
                    'tagId' => $tag
                );
            }
        }

        // Also add GDPR tags if needed
        $gdpr = $this->processGdprTags($optinData, true);

        $gdprTags = [];
        if (!empty($gdpr)) {
            foreach($gdpr as $key => $value) {
                $gdprTags[] = array(
                    'tagId' => $key
                );
            }
        }

        $allTags = array_merge($gdprTags, $realTags);

        $params['tags'] = $allTags;

        $gdprNote = $this->getGdprNote($optinData, true);
        if (!empty($gdprNote) && !empty($optinData->get('optin-gdpr-field-note'))) {
            $params['customFieldValues'][] = array(
                'customFieldId' => $optinData->get('optin-gdpr-field-note'),
                'value' => [$gdprNote]
            );
        }

        // custom fields
        if ($inputs) {
            foreach ($inputs as $input) {
                if ($input->name != 'email' && $input->name != 'name' && $input->type != 'check') {
                    if (!empty($optinData->get($input->optin_id))) {
                        $params['customFieldValues'][] = [
                            'customFieldId' => $input->optin_id,
                            'value' => [$optinData->get($input->optin_id)]
                        ];
                    }
                }
            }
        }

        //error_log('GG' . print_r($params, true));die();

        // Prepare request data
        $requestData = ['headers' => [
            'content-type'  => 'application/x-www-form-urlencoded',
            'Expect'        => '',
            'Accept'        => 'application/json',
            'Authorization' => 'Bearer ' . $this->getToken(),
        ], 'form_params' => $params];

        Log::debug('[GETRESPONSE] Preparing request data: ' . @json_encode($requestData));

        // And try to make the request
        try {
            $response = $this->client->post('https://api.getresponse.com/v3/contacts', $requestData);

            if (in_array($response->getStatusCode(), [200, 202, 409])) {
                Log::debug("[GETRESPONSE] User subscribed: $email to list $listId. Code [".$response->getStatusCode()."]");
                $result = $this->optinSuccessResult();
            } else {
                Log::error("[GETRESPONSE] Failed to subscribe to list [$listId]. Code: " . $response->getStatusCode() . ' / Body: ' . $response->getBody());
                $this->throwOptinException();
            }
        } catch(Exception $e) {
            $response = $e->getResponse();

            if ($response and in_array($response->getStatusCode(), [200, 202, 409])) {
                Log::debug("[GETRESPONSE] User already subscribed: $email to list $listId. Code [" . $response->getStatusCode() . '].');
                $this->throwOptinAlreadySubscribedException();
            } else {
                Log::error("[GETRESPONSE] Error when subscribing to list [$listId]. " . $e->getMessage() . " / " . $response->getBody());
                $this->throwOptinException($e);
            }
        }

        return $result;
    }

    /**
     * Client ID from env var
     *
     * @return string
     */
    public function getEnvClientId()
    {
        return getenv('GETRESPONSE_CLIENT_ID');
    }

    /**
     * Client secret from env var
     *
     * @return string
     */
    public function getEnvClientSecret()
    {
        return getenv('GETRESPONSE_CLIENT_SECRET');
    }
}
