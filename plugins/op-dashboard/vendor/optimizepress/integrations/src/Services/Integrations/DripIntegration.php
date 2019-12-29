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
use OptimizePress\Integrations\OptinErrorResult;
use OptimizePress\Integrations\OptinResult;
use OptimizePress\Integrations\OptinSuccessResult;
use OptimizePress\Integrations\Services\Contracts\BaseIntegration;
use OptimizePress\Integrations\Services\Contracts\IntegrationHasTagsInterface;
use OptimizePress\Integrations\Services\Contracts\IntegrationServiceInterface;
use OptimizePress\Integrations\Services\Contracts\IntegrationServiceOAuthInterface;
use OptimizePress\Integrations\Services\Exceptions\AlreadySubscribedException;
use OptimizePress\Integrations\Services\Exceptions\OptinException;
use OptimizePress\Support\Log\Log;
use stdClass;

/**
 * Integration with Emma
 */
class DripIntegration extends BaseIntegration implements IntegrationServiceInterface, IntegrationServiceOAuthInterface, IntegrationHasTagsInterface
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
        $this->config = [
            'client_id'         => $clientId,
            'client_secret'     => $clientSecret,
            'authorization_url' => 'https://www.getdrip.com/oauth/authorize/',
            'access_token_uri'  => 'https://www.getdrip.com/oauth/token/',
            'redirect_uri'      => $this->integration->getCallbackUrl(),
            'cookie_support'    => false,
            'file_upload'       => false,
            'token_as_header'   => true,
            'base_uri'          => 'https://api.getdrip.com/v2/',
        ];

        // HTTP clients and helpers
        $this->client = new HttpClient;
    }

    /**
     * Ping the service API
     *
     * @return bool
     */
    public function ping()
    {
        $accounts = $this->getAccounts();

        if ( ! $accounts) {
            Log::error("[DRIP] Error pinging.");

            return false;
        }

        return true;
    }

    /**
     * The selected account is saved to the app_id field
     *
     * @return string
     */
    public function getActiveAccountId()
    {
        return $this->integration->app_id;
    }

    /**
     * Get all accounts connected
     *
     * @return mixed
     */
    public function getAccounts()
    {
        // Prepare request data
        $data = ['headers' => ['Accept' => 'application/json', 'Authorization' => 'Bearer ' . $this->getToken()]];

        // And try to make the request
        try {
            $response = $this->client->get($this->config['base_uri'].'accounts', $data);

            if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody()) and isset($result->accounts)) {
                if (count($result->accounts) === 1) {
                    $this->integration->storage()->updateConnectionFields($this->integration->uid, ['app_id' => $result->accounts[0]->id, 'api_url' => $this->config['base_uri'].$result->accounts[0]->id.'/']);
                }

                return $result->accounts;
            }

            Log::error("[DRIP] Failed to get accounts.");
        } catch (Exception $e) {
            Log::error("[DRIP] Error getting accounts.");
        }

        return null;
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
        $params = [
            'client_id'     => $this->config['client_id'],
            'client_secret' => $this->config['client_secret'],
            'redirect_uri'  => $this->config['redirect_uri'],
            'response_type' => 'code'
        ];
        $url = $this->config['authorization_url'] . '?' . http_build_query($params, null, '&');

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
        $params = [
            'response_type' => 'token',
            'grant_type'    => 'authorization_code',
            'client_id'     => $this->integration->getOauthClientId(),
            'client_secret' => $this->integration->getOauthClientSecret(),
            'code'          => $code,
            'redirect_uri'  => $this->integration->getCallbackUrl(),
        ];

        // Prepare request data
        $data = ['headers' => ['Accept' => 'application/json'], 'form_params' => $params];

        // And try to make the request
        try {
            $response = $this->client->post($this->config['access_token_uri'], $data);

            if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody()) and isset($result->access_token)) {
                Log::debug('[DRIP] Access token fetched: ' . $result->access_token);

                // The token never expires
                return [
                    'token'            => $result->access_token,
                    'token_secret'     => null,
                    'refresh_token'    => null,
                    'token_expires_at' => null,
                    'api_url'          => $this->getApiUrl(),
                    'app_id'           => $this->getAppId(),
                ];
            }

            Log::error("[DRIP] No access token found in response. " . @json_decode($response->getBody()));
        } catch (Exception $e) {
            Log::error("[DRIP] Error when fetching access token. " . $e->getMessage());
        }

        return null;
    }

    /**
     * Since the token never expires we simply return the current data
     *
     * @param  bool  $force
     * @return mixed
     */
    public function refreshToken($force = false)
    {
        if ($this->integration->token) {
            return [
                'token'            => $this->integration->token,
                'token_secret'     => $this->integration->token_secret,
                'refresh_token'    => $this->integration->refresh_token,
                'token_expires_at' => null,
            ];
        }
    }

    /**
     * Get root URL to API
     *
     * @return string
     */
    public function getApiUrl()
    {
        if (! $apiUrl = $this->integration->getConnectionValue('api_url')) {
            $accounts = $this->getAccounts();

            if ($accounts and isset($accounts[0]) and isset($accounts[0]->href)) {
                $apiUrl = 'https://api.getdrip.com/v2/'.$accounts[0]->id.'/';
            } else {
                $apiUrl = 'https://api.getdrip.com/v2/';
            }
        }

        return $apiUrl;
    }

    /**
     * Get application ID
     *
     * @return string
     */
    public function getAppId()
    {
        if (! $appId = $this->integration->app_id) {
            $accounts = $this->getAccounts();

            if ($accounts and isset($accounts[0]) and isset($accounts[0]->id)) {
                $appId = $accounts[0]->id;
            }
        }

        return $appId;
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
     * Get form fields
     *
     * @param  mixed  $listId
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

        $field = new IntegrationField(['id' => 'address1','name' => 'address1', 'label' => 'Address 1', 'optin_id' => 'address1', 'type' => 'text', 'enabled'  => false,  'required' => false,  'order' => 40]);
        $fields->push($field);
        $field = new IntegrationField(['id' => 'address2','name' => 'address2', 'label' => 'Address 2', 'optin_id' => 'address2', 'type' => 'text', 'enabled'  => false,  'required' => false,  'order' => 42]);
        $fields->push($field);
        $field = new IntegrationField(['id' => 'city',    'name' => 'city',     'label' => 'City',      'optin_id' => 'city',     'type' => 'text', 'enabled'  => false,  'required' => false,  'order' => 44]);
        $fields->push($field);
        $field = new IntegrationField(['id' => 'state',   'name' => 'state',    'label' => 'State',     'optin_id' => 'state',    'type' => 'text', 'enabled'  => false,  'required' => false,  'order' => 46]);
        $fields->push($field);
        $field = new IntegrationField(['id' => 'zip',     'name' => 'zip',      'label' => 'ZIP',       'optin_id' => 'zip',      'type' => 'text', 'enabled'  => false,  'required' => false,  'order' => 48]);
        $fields->push($field);
        $field = new IntegrationField(['id' => 'country', 'name' => 'country',  'label' => 'Country',   'optin_id' => 'country',  'type' => 'text', 'enabled'  => false,  'required' => false,  'order' => 50]);
        $fields->push($field);
        $field = new IntegrationField(['id' => 'phone',   'name' => 'phone',    'label' => 'Phone',     'optin_id' => 'phone',    'type' => 'text', 'enabled'  => false,  'required' => false,  'order' => 52]);
        $fields->push($field);

        // Prepare request data
        $data = ['headers' => ['Accept' => 'application/json', 'Authorization' => 'Bearer ' . $this->getToken()]];

        // And try to make the request
        try {
            $response = $this->client->get($this->getApiUrl().'custom_field_identifiers', $data);

            if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody()) and isset($result->custom_field_identifiers) and $result->custom_field_identifiers) {
                foreach ($result->custom_field_identifiers as $customField) {
                    if (in_array($customField, array('first_name', 'last_name', 'address1', 'address2', 'city', 'state', 'zip', 'country', 'phone')))
                        continue;
                    $field = new IntegrationField([
                        'id'       => $customField,
                        'name'     => $customField,
                        'label'    => $customField,
                        'optin_id' => $customField,
                        'enabled'  => false,
                        'required' => false,
                        'order'    => 100,
                        'type'     => 'text',
                    ]);
                    $fields->push($field);
                }

                Log::debug('[DRIP] ' . count($fields)." form inputs fetched on list [$listId].");
            }
        } catch (Exception $e) {
            Log::error("[DRIP] Error when fetching list fields [$listId] from service. " . $e->getMessage());
        }

        // Check if all the fields are valid for display
        return $fields;
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
            $response = $this->client->get($this->getApiUrl().'campaigns', $data);

            if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody()) and isset($result->campaigns)) {
                $lists = new IntegrationListsCollection;

                foreach ($result->campaigns as $list) {
                    $list = $this->listObject([
                        'id'          => $list->id,
                        'name'        => $list->name,
                    ]);
                    $lists->push($list);
                }

                return $lists;
            }

            Log::error('[DRIP] Failed to get forms.');
        } catch (Exception $e) {
            Log::error('[DRIP] Error when fetching lists from service. ' . $e->getMessage());
        }

        return null;
    }

    /**
     * Return a list
     *
     * @param  string  $listId
     * @return IntegrationList|null
     */
    public function getList($listId)
    {
        // Prepare request data
        $data = ['headers' => ['Accept' => 'application/json', 'Authorization' => 'Bearer ' . $this->getToken()]];

        // And try to make the request
        try {
            $response = $this->client->get($this->getApiUrl().'campaigns/'.$listId, $data);

            if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody()) and isset($result->campaigns) and isset($result->campaigns[0])) {
                $list = $this->listObject([
                    'id'          => $result->campaigns[0]->id,
                    'name'        => $result->campaigns[0]->name,
                ]);

                return $list;
            }

            Log::error("[DRIP] Failed to get list [$listId].");
        } catch (\Exception $e) {
            Log::error("[DRIP] Error when fetching list [$listId] from service. " . $e->getMessage());
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

        // Prepare request data
        $data = ['headers' => ['Accept' => 'application/json', 'Authorization' => 'Bearer ' . $this->getToken()]];

        // And try to make the request
        try {
            $response = $this->client->get($this->getApiUrl().'tags', $data);

            if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody()) and isset($result->tags) and isset($result->tags[0])) {
                foreach ($result->tags as $key => $tag) {
                    $tags->push(new IntegrationTag([
                        'id'   => $tag,
                        'name' => $tag,
                    ]));
                }

                return $tags;
            }

            Log::error('[DRIP] Failed to get tags.');
        } catch (\Exception $e) {
            Log::error('[DRIP] Error when fetching tags from service. ' . $e->getMessage());
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

        // Prepare request data
        $requestData = ['headers' => ['Accept' => 'application/json', 'Authorization' => 'Bearer ' . $this->getToken()]];

        // And try to make the request
        try {
            // Create request body
            $body = ['email' => $email, 'utc_offset' => 660, 'reactivate_if_removed' => true, 'starting_email_index' => 0];

            // Double optin is set on integration side
            //$body["double_optin"] = $leadOptions ? (bool) $leadOptions->doubleOptinEnabled() : false;

            // Add custom fields
            foreach ($this->getFields() as $field) {
                if (in_array($field->id, ['email', 'first_name', 'last_name', 'address1', 'address2', 'city', 'state', 'zip', 'country', 'phone'])) {
                    if ($optinData->data($field->id)) {
                        $body[$field->id] = $optinData->data($field->id);
                    }
                } elseif ($optinData->data($field->id)) {
                    if (! isset($body['custom_fields'])) {
                        $body['custom_fields'] = [];
                    }

                    $body['custom_fields'][$field->id] = $optinData->data($field->id);
                }
            }

            // Also add tags
            if ($tags = $optinData->tags()) {
                $body['tags'] = $tags;
            }

            // Add GDPR note if it exists
            $gdprNote = $this->getGdprNote($optinData);

            if (! empty($gdprNote) && !empty($optinData->get('optin-gdpr-field-note'))) {
                if (! isset($body['custom_fields'])) {
                    $body['custom_fields'] = [];
                }

                $fieldName = $optinData->get('optin-gdpr-field-note');
                $body['custom_fields'][$fieldName] = $gdprNote;
            }

            // Now prepared request data and make the request
            $requestData['json'] = ['subscribers' => [$body]];
            Log::debug('[DRIP] Preparing request data: ' . @json_encode($requestData));

            // Now make the request
            $response = $this->client->post($this->getApiUrl().'subscribers', $requestData);

            if (($response->getStatusCode() == 200 or $response->getStatusCode() == 201) and $result = @json_decode($response->getBody())) {
                Log::debug('[DRIP] User subscribed.');

                //GDPR stuff below:
                if (class_exists('\OPDashboard\Services\GeoIp')) {
                    $optinData->isFromEu = GeoIp::isFromEu();
                } else {
                    $optinData->isFromEu = true;
                }
                $this->processGdprTags($optinData);

                $result = $this->optinSuccessResult();
            } else {
                Log::error('[DRIP] Failed to subscribe.');
                $this->throwOptinException();
            }

            // Subscribe to campaign only if we have a list ID
            if ($listId) {
                try {
                    // We also need to subscribe him to a campaign
                    $response = $this->client->post($this->getApiUrl() . 'campaigns/' . $listId . '/subscribers',  $requestData);

                    if (($response->getStatusCode() == 200 or $response->getStatusCode() == 201) and $result = @json_decode($response->getBody())) {
                        Log::debug("[DRIP] User subscribed: $email to campaign $listId");
                        $result = $this->optinSuccessResult();
                    } else {
                        Log::error("[DRIP] Failed to subscribe [$listId].");
                        $this->throwOptinException();
                    }
                } catch (Exception $e) {
                    Log::error("[DRIP] Failed to subscribe [$listId]. " . $e->getMessage());
                    $this->throwOptinException($e);
                }
            }
        } catch (Exception $e) {
            Log::error("[DRIP] Error when subscribing to list [$listId]. " . $e->getMessage());
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

        // Add tags to selected merge fields
        if ($tags) {
            foreach ($tags as $tagId => $tag) {
                $this->tagSubscriber($email, $tagId);
            }
        }

        return true;
    }

    /**
     * Tag a subscriber
     *
     * @param  string $email
     * @param  string $tag
     * @return void
     */
    public function tagSubscriber($email, $tag)
    {
        // Prepare request data
        $data = ['headers' => ['Accept' => 'application/json', 'Authorization' => 'Bearer ' . $this->getToken()]];

        // And try to make the request
        try {
            // Create request body
            $body = ["email" => $email, "tag" => $tag];

            // Now prepared request data and make the request
            $data['json'] = ["tags" => [$body]];
            Log::debug("[DRIP] Preparing tagging request data: " . @json_encode($data));

            // And finally make the request
            $response = $this->client->post($this->getApiUrl() . 'tags', $data);

            if (($response->getStatusCode() == 200 or $response->getStatusCode() == 201) and $result = @json_decode($response->getBody())) {
                Log::debug("[DRIP] User tagged: $email with tag [$tag]");
                $result = true;
            } else {
                Log::error("[DRIP] Failed to tag user $email with tag [$tag].");
            }
        } catch (Exception $e) {
            Log::error("[DRIP] Error when tagging user $email with tag [$tag]. " . $e->getMessage());
        }
    }

    /**
     * Client ID from env var
     *
     * @return string
     */
    public function getEnvClientId()
    {
        return getenv('DRIP_CLIENT_ID');
    }

    /**
     * Client secret from env var
     *
     * @return string
     */
    public function getEnvClientSecret()
    {
        return getenv('DRIP_CLIENT_SECRET');
    }
}
