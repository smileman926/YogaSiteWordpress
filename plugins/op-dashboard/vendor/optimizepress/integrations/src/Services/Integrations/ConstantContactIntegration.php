<?php

namespace OptimizePress\Integrations\Services\Integrations;

use DateTime;
use Exception;
use GuzzleHttp\Client as HttpClient;
use OPDashboard\Services\GeoIp;
use OptimizePress\Integrations\Collections\IntegrationFieldsCollection;
use OptimizePress\Integrations\Collections\IntegrationTagsCollection;
use OptimizePress\Integrations\Integration;
use OptimizePress\Integrations\IntegrationField;
use OptimizePress\Integrations\IntegrationList;
use OptimizePress\Integrations\Collections\IntegrationListsCollection;
use OptimizePress\Integrations\IntegrationTag;
use OptimizePress\Integrations\LeadOptions;
use OptimizePress\Integrations\OptinData;
use OptimizePress\Integrations\OptinResult;
use OptimizePress\Integrations\Services\Contracts\BaseIntegration;
use OptimizePress\Integrations\Services\Contracts\IntegrationServiceInterface;
use OptimizePress\Integrations\Services\Contracts\IntegrationServiceOAuthInterface;
use OptimizePress\Integrations\Services\Exceptions\AlreadySubscribedException;
use OptimizePress\Integrations\Services\Exceptions\OptinException;
use OptimizePress\Support\Log\Log;

/**
 * Integration with Constant Contact
 */
class ConstantContactIntegration extends BaseIntegration implements IntegrationServiceInterface, IntegrationServiceOAuthInterface
{
    /**
     * Init dependencies and service
     *
     * @param  Integration  $integration
     * @throws Exception
     */
    public function __construct(Integration $integration)
    {
        // Initialize and setup
        $this->init($integration);

        // Get the client ID and secret
        $clientId     = $this->integration->getConnectionValue('client_id')     ?: $this->getEnvClientId();
        $clientSecret = $this->integration->getConnectionValue('client_secret') ?: $this->getEnvClientSecret();

        // Set the values
        $this->config->set('client_id',     $clientId);
        $this->config->set('client_secret', $clientSecret);

        // HTTP clients and helpers
        $this->client = new HttpClient;

        // Set the token if available for integration
        $this->refreshToken();
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
            $response = $this->client->get($this->getApiUrl() . 'contact_lists', $data);

            if ($response->getStatusCode() == 200) {
                return true;
            }

            Log::error('[CONSTANTCONTACT] Ping failed. ' . @json_decode($response->getBody()));
        } catch (Exception $e) {}

        // Failed pinging API
        Log::error('[CONSTANTCONTACT] Ping failed. '. $e->getMessage());

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
     * Authorize the API
     *
     * @return mixed
     */
    public function initAuthorization()
    {
        $authorizeUrl = $this->getAuthorizationUrl();

        // Redirect user to authorization URL
        header('HTTP/1.1 200 OK');
        header('Location: '. $authorizeUrl);
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
            'client_id'     => $this->config->get('client_id'),
            'scope'         => $this->config->getConnectionValue('scope'),
            'redirect_uri'  => $this->integration->getCallbackUrl(),
            'response_type' => 'code'
        ];
        $url = $this->config->getConnectionValue('authorization_url') . '?' . http_build_query($params, null, '&');

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
            'grant_type'    => 'authorization_code',
            'code'          => $code,
            'redirect_uri'  => $this->integration->getCallbackUrl(),
        ];

        // Make authorization header
        $authorization = base64_encode($this->integration->getOauthClientId() . ':' . $this->integration->getOauthClientSecret());

        // Prepare request data
        $data = ['headers' => ['Accept' => 'application/json', 'Authorization' => 'Basic ' . $authorization], 'form_params' => $params];

        // And try to make the request
        try {
            $response = $this->client->post($this->config->getConnectionValue('access_token_uri'), $data);

            if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody()) and isset($result->access_token)) {
                Log::debug('[CONSTANTCONTACT] Access token fetched: ' . $result->access_token);

                // Set token expiration
                $expiresAt    = new DateTime('+7199 seconds');

                // The token never expires
                return [
                    'token'            => $result->access_token,
                    'token_secret'     => null,
                    'refresh_token'    => $result->refresh_token,
                    'token_expires_at' => $expiresAt,
                ];
            }

            Log::error('[CONSTANTCONTACT] No access token found in response. ' . @json_decode($response->getBody()));
        } catch (Exception $e) {
            Log::error('[CONSTANTCONTACT] Error when fetching access token. ' . $e->getMessage());
        }

        return null;
    }

    /**
     * Since the token never expires we simply return the current data
     *
     * @param  bool  $force
     * @return mixed
     * @throws Exception
     */
    public function refreshToken($force = false)
    {
        // Refresh the toke only if refresh token is set and we're forcing a refresh or the token has expired
        if ($this->getRefreshToken() && ($force || $this->tokenHasExpired())) {
            Log::debug('[CONSTANTCONTACT] Refreshing access token for integration "' . $this->integration->provider . '" [' . $this->integration->uid . "].");

            // Prepare params
            $params = [
                'grant_type'    => 'refresh_token',
                'refresh_token'  => $this->integration->getConnectionValue('refresh_token'),
            ];

            // Make authorization header
            $authorization = base64_encode($this->integration->getOauthClientId() . ':' . $this->integration->getOauthClientSecret());

            // Prepare request data
            $requestData = ['headers' => ['Accept' => 'application/json', 'Authorization' => 'Basic ' . $authorization], 'form_params' => $params];

            // And try to make the request
            try {
                $response = $this->client->post($this->config->getConnectionValue('access_token_uri'), $requestData);

                if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody()) and isset($result->access_token)) {
                    Log::debug('[CONSTANTCONTACT] Access token refreshed: ' . $result->access_token);

                    // Set token expiration
                    $expiresAt = (new DateTime('+7199 seconds'))->format('Y-m-d H:i:s');

                    // Prepare token data
                    $tokenData = [
                        'token'            => $result->access_token,
                        'refresh_token'    => $result->refresh_token,
                        'token_expires_at' => $expiresAt,
                    ];

                    // Update token data
                    $this->integration->storage()->updateConnectionFields($this->integration->uid, $tokenData);

                    // The token never expires
                    return $result->access_token;
                }

                Log::error('[CONSTANTCONTACT] No access token found in response. ' . @json_encode($response->getBody()));
            } catch (Exception $e) {
                Log::error('[CONSTANTCONTACT] Error when fetching access token. ' . $e->getMessage());
            }

            return null;
        }

        return isset($token) ? $token : null;
    }

    /**
     * Check if token has expired
     * We check for token expiration every 2 hours
     * The problem here is that CC has token that are valid for 24 hours
     * but they automatically expire 2 hours if not used
     *
     * @return bool
     * @throws Exception
     */
    public function tokenHasExpired()
    {
        $expiresAt = $this->integration->getConnectionValue('token_expires_at');

        // Check expiration only if we have a expiration date/time
        if ($expiresAt) {
            $now = (new DateTime)->format('Y-m-d H:i:s');

            return $now > $expiresAt;
        }

        return false;
    }

    /**
     * Get root URL to API
     *
     * @return string
     */
    public function getApiUrl()
    {
        return $this->config->getConnectionValue('base_uri');
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

        // Prepare request data
        $data = ['headers' => ['Accept' => 'application/json', 'Authorization' => 'Bearer ' . $this->getToken()]];

        // And try to make the request
        try {
            $response = $this->client->get($this->getApiUrl() . 'contact_custom_fields', $data);

            if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody()) and isset($result->custom_fields) and $result->custom_fields) {
                foreach ($result->custom_fields as $index => $customField) {

                    // Skip some fields
                    if (in_array($customField->name, array('first_name', 'last_name')))
                        continue;

                    // Add field to collection
                    $field = new IntegrationField([
                        'id'       => $customField->custom_field_id,
                        'name'     => $customField->name,
                        'label'    => $customField->label,
                        'optin_id' => $customField->custom_field_id,
                        'enabled'  => false,
                        'required' => false,
                        'order'    => 40 + ($index * 10),
                        'type'     => 'text',
                    ]);
                    $fields->push($field);
                }

                Log::debug('[CONSTANTCONTACT] ' . count($fields) . " form inputs fetched on list [$listId].");
            }
        } catch (Exception $e) {
            Log::error("[CONSTANTCONTACT] Error when fetching list fields [$listId] from service. " . $e->getMessage());
        }

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
            $response = $this->client->get($this->getApiUrl() . 'contact_lists', $data);

            if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody()) and isset($result->lists)) {
                $lists = new IntegrationListsCollection;

                foreach ($result->lists as $list) {
                    $list = $this->listObject([
                        'id'          => $list->list_id,
                        'name'        => $list->name,
                    ]);
                    $lists->push($list);
                }

                return $lists;
            }

            Log::error('[CONSTANTCONTACT] Failed to get lists/campaigns.');
        } catch (Exception $e) {
            Log::error('[CONSTANTCONTACT] Error when fetching lists/campaigns from service. ' . $e->getMessage());
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
        $lists = $this->getLists();

        foreach ($lists as $list) {
            if ($listId === $list->id) {
                return $list;
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
        return new IntegrationTagsCollection;
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
     * @throws AlreadySubscribedException
     * @throws OptinException
     */
    public function optin(OptinData $optinData, LeadOptions $leadOptions = null)
    {
        // Setup params
        $result = $this->optinErrorResult();
        $email  = $optinData->email();
        $listId = $optinData->listId();
        $fields = $this->getFields();

        // Prepare request data
        $requestData = ['headers' => ['Accept' => 'application/json', 'Authorization' => 'Bearer ' . $this->getToken()]];

        // And try to make the request
        try {
            // Create request body
            $body = [
                'email_address'    => ['address' => $email, 'permission_to_send' => 'implicit'],
                'first_name'       => $optinData->firstName(),
                'last_name'        => $optinData->lastName(),
                'create_source'    => 'Account',
                'list_memberships' => [$listId],
            ];

            // Also add custom fields if needed
            $body['custom_fields'] = [];
            foreach ($fields as $field) {
                if (! in_array($field->name, ['email', 'first_name', 'last_name']) && $value = $optinData->get($field->name)) {
                    $body['custom_fields'][] = [
                        'custom_field_id' => $field->id,
                        'value'           => $value,
                    ];
                }
            }

            // GDPR stuff
            if (class_exists('\OPDashboard\Services\GeoIp')) {
                $optinData->isFromEu = GeoIp::isFromEu();
            } else {
                $optinData->isFromEu = true;
            }
            $gdpr = $this->processGdprTags($optinData, true);

            // Add GDPR to custom fields
            if (! empty($gdpr)) {
                foreach ($gdpr as $key => $value) {
                    $body['custom_fields'][] = [
                        'custom_field_id' => $value['id'],
                        'value'           => 'yes',
                    ];
                }
            }

            // Add GDPR note if it exists
            $gdprNoteField = $optinData->get('optin-gdpr-field-note');
            $gdprNote      = $this->getGdprNote($optinData);
            if ($gdprNote && $gdprNoteField) {
                foreach ($fields as $field) {
                    if ($gdprNoteField === $field->id && $gdprNote) {
                        $body['custom_fields'][] = [
                            'custom_field_id' => $field->id,
                            'value'           => $gdprNote,
                        ];
                    }
                }
            }

            // Check if custom fields are empty
            if (! $body['custom_fields']) unset($body['custom_fields']);

            // Now prepared request data and make the request
            $requestData['json'] = $body;
            Log::debug('[CONSTANTCONTACT] Preparing request data: ' . @json_encode($requestData));

            // Now make the request
            $response = $this->client->post($this->getApiUrl() . 'contacts', $requestData);

            if (($response->getStatusCode() == 200 or $response->getStatusCode() == 201) and $result = @json_decode($response->getBody())) {
                Log::debug('[CONSTANTCONTACT] User subscribed.');
                $result = $this->optinSuccessResult();
            } else {
                Log::error('[CONSTANTCONTACT] Failed to subscribe.');
                $this->throwOptinException();
            }
        } catch (Exception $e) {
            if ($e->getResponse()->getStatusCode() == 409) {
                Log::info("[CONSTANTCONTACT] Member with email [$email] already subscribed to list [$listId]. Not showing an error to the end user.");
                $this->throwOptinAlreadySubscribedException();

                // Also subscribe email to list
                // $this->subscribeToList($email, $listId);
            } else {
                Log::error("[CONSTANTCONTACT] Error when subscribing to list [$listId]. " . $e->getMessage());
                $this->throwOptinException($e);
            }
        }

        return $result;
    }

    /**
     * Subscribe user to list
     * @TODO: This is not implemented on the side of the API
     *
     * @param  string $email
     * @param  string $listId
     * @return bool
     */
    public function subscribeToList($email, $listId)
    {
        $result = false;

        try {
            // We need to find the user first
            $requestData = ['headers' => ['Accept' => 'application/json', 'Authorization' => 'Bearer ' . $this->getToken()]];

            // Now prepared request data and make the request
            Log::debug('[CONSTANTCONTACT] Preparing request data: ' . @json_encode($requestData));

            // Now make the request
            $response = $this->client->get($this->getApiUrl() . 'contacts?status=all&email=' . $email, $requestData);

            // Check if user exists
            if (($response->getStatusCode() == 200 or $response->getStatusCode() == 201) and $result = @json_decode($response->getBody()) and isset($result->contacts) and $result->contacts) {
                // Now we need to add the user to the list
                $contactId = $result->contacts[0]->contact_id;

                // Now prepared request data and make the request
                $requestData['json'] = [
                    'source' => [
                        'contact_ids' => [$contactId],
                        'list_ids'    => [$listId],
                    ],
                ];
                Log::debug('[CONSTANTCONTACT] Preparing request data: ' . @json_encode($requestData));

                if ($contactId) {
                    // Now make the request
                    $response = $this->client->post($this->getApiUrl().'activities/add_list_memberships', $requestData);

                    if (($response->getStatusCode() == 200 or $response->getStatusCode() == 201) and $result = @json_decode($response->getBody()) and isset($result->contacts) and $result->contacts) {

                    }

                    Log::debug('[CONSTANTCONTACT] User subscribed to list '.$listId);
                    $result = true;
                } else {
                    Log::error('[CONSTANTCONTACT] Failed to subscribe.');
                }
            } else {
                Log::error('[CONSTANTCONTACT] Failed to subscribe.');
            }
        } catch (Exception $e) {
            Log::error("[CONSTANTCONTACT OAUTH] Error when subscribing to list [$listId]. " . $e->getMessage());
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

    }

    /**
     * Client ID from env var
     *
     * @return string
     */
    public function getEnvClientId()
    {
        return getenv('CONSTANTCONTACT_CLIENT_ID');
    }

    /**
     * Client secret from env var
     *
     * @return string
     */
    public function getEnvClientSecret()
    {
        return getenv('CONSTANTCONTACT_CLIENT_SECRET');
    }
}
