<?php

namespace OptimizePress\Integrations\Services\Integrations;

use DateTime;
use Exception;
use GuzzleHttp\Client as HttpClient;
use OptimizePress\Integrations\Collections\IntegrationFieldsCollection;
use OptimizePress\Integrations\Integration;
use OptimizePress\Integrations\IntegrationList;
use OptimizePress\Integrations\IntegrationField;
use OptimizePress\Integrations\LeadOptions;
use OptimizePress\Integrations\OptinData;
use OptimizePress\Integrations\OptinResult;
use OptimizePress\Integrations\Services\Contracts\BaseIntegration;
use OptimizePress\Integrations\Services\Contracts\IntegrationServiceInterface;
use OptimizePress\Integrations\Services\Contracts\IntegrationServiceOAuthInterface;
use OptimizePress\Integrations\Collections\IntegrationListsCollection;
use OptimizePress\Integrations\Services\Exceptions\OptinException;
use OptimizePress\Support\Log\Log;
use function OptimizePress\Support\array_get;

/**
 * Integration with Zoom
 */
class ZoomIntegration extends BaseIntegration implements IntegrationServiceInterface, IntegrationServiceOAuthInterface
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

        // Get the client ID and secret, and app id
        $this->config->set('client_id',     $this->integration->getConnectionValue('client_id')     ?: $this->getEnvClientId());
        $this->config->set('client_secret', $this->integration->getConnectionValue('client_secret') ?: $this->getEnvClientSecret());

        // HTTP clients and helpers
        $this->client = new HttpClient;

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
        header('HTTP/1.1 200 OK');
        header('Location: ' . $authorizeUrl);
        exit();
    }

    /**
     * Return URL for authorizing OAuth requests
     *
     * @param  array  $data
     * @return string
     */
    public function getAuthorizationUrl($data = [])
    {
        $params = [
            'response_type' => 'code',
            'client_id'     => $this->config->get('client_id'),
            'redirect_uri'  => $this->integration->getCallbackUrl(),

        ];
        $url = $this->config->get('connection')['authorization_url'] . '?' . http_build_query($params, null, '&');

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
        $data = [
            'headers' => [
                "Authorization" => "Basic " . base64_encode($this->integration->getOauthClientId() . ":" . $this->integration->getOauthClientSecret()),
                'content-type' => 'application/x-www-form-urlencoded',
                'Expect' => '',
                'Accept' => 'application/json',
            ],
            'form_params' => [
                'grant_type'    => 'authorization_code',
                'code'          => isset($requestData['code']) ? $requestData['code'] : null,
                'redirect_uri'  => $this->integration->getCallbackUrl(),
            ]
        ];

        // https://marketplace.zoom.us/docs/guides/authorization/oauth/oauth-with-zoom#request-access-token
        $url = $this->config->getConnectionValue('access_token_uri');

        try {
            $response = $this->client->post($url, $data);

            if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody()) and isset($result->access_token)) {
                Log::debug('[ZOOM] Access token fetched: ' . $result->access_token);

                // Set the token
                $this->integration->setConnectionValue('token', $result->access_token);

                // Calculate expiration
                $expiresAt = new DateTime('+' . $result->expires_in . ' seconds');

                $data = [
                    'token'            => $result->access_token,
                    'token_secret'     => null,
                    'refresh_token'    => $result->refresh_token,
                    'token_expires_at' => $expiresAt,
                    'api_url'          => $this->config->get('base_uri'),
                ];

                return $data;
            }

            Log::error("[ZOOM] No access token found in response. " . @json_decode($response->getBody()));
        } catch (\Exception $e) {
            Log::error("[ZOOM] Error when fetching access token. " . $e->getMessage());
        }

        return null;
    }

    /**
     * Refresh oAuth token.
     *
     * @param  bool  $force
     * @return mixed
     */
    public function refreshToken($force = false)
    {
        // First let's check if the token is expired
        $expiresAt = $this->integration->getConnectionValue('token_expires_at');
        $tokenHasExpired = $expiresAt && (date('Y-m-d H:i:s') > $expiresAt);

        if ($this->getRefreshToken() && ($force || $tokenHasExpired)) {
            Log::debug('[ZOOM] Refreshing access token for integration "' . $this->integration->provider . '" [' . $this->integration->uid . '].');

            $data = [
                'headers'     => [
                    'Content-Type' => 'application/x-www-form-urlencoded',
                    "Authorization" => "Basic " . base64_encode($this->integration->getOauthClientId() . ":" . $this->integration->getOauthClientSecret()),
                ],
                'auth'        => $this->integration->getOauthClientId() . ":" . $this->integration->getOauthClientSecret(),
                'form_params' => [
                    'grant_type'    => 'refresh_token',
                    'refresh_token' => $this->getRefreshToken(),
                ]
            ];

            // https://marketplace.zoom.us/docs/guides/authorization/oauth/oauth-with-zoom#refresh-access-token
            $url = $this->config->getConnectionValue('access_token_uri');

            // And try to make the request
            try {
                $response = $this->client->post($url, $data);

                if ($response->getStatusCode() === 200 and $result = @json_decode($response->getBody()) and isset($result->access_token)) {
                    Log::debug('[ZOOM] Token refreshed: ' . $result->access_token);

                    // Set the token
                    $this->integration->setConnectionValue('token', $result->access_token);
                    $token = $result->access_token;

                    // Calculate expiration
                    $expiresAt = date('Y-m-d H:i:s', time() + $result->expires_in);

                    // Prepare connection data
                    $resultData = [
                        'token'            => $result->access_token,
                        'token_secret'     => null,
                        'refresh_token'    => $result->refresh_token,
                        'token_expires_at' => $expiresAt,
                    ];

                    // Update storage fields
                    $this->integration->storage()->updateConnectionFields($this->integration->uid, $resultData);

                    return $resultData;
                }

                Log::error('[ZOOM] No access token found in response when refreshing token. ' . (string) $response->getBody());
            } catch (Exception $e) {
                Log::error('[ZOOM] Error when refreshing access token. ' . $e->getMessage());
            }
        }

        return isset($token) ? $token : null;
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
     * @return string
     */
    public function getTokenSecret()
    {
        return $this->integration->getConnectionValue('token_secret');
    }

    /**
     * Ping the service API
     *
     * @return bool
     */
    public function ping()
    {
        $accounts = $this->getUsers();

        if ( ! $accounts) {
            Log::error('[ZOOM] Error pinging.');

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
    public function getUsers()
    {
       $data = [
           'headers' => [
                'Accept' => 'application/json',
                'Authorization' => 'Bearer ' . $this->getToken()
            ],
            'query' => [
                'status' => 'active',
                'page_size' => '300',
                'page_number' => '1',
            ],
        ];

        // https://marketplace.zoom.us/docs/api-reference/zoom-api/users/users
        $url = $this->config->get('connection')['base_uri'] . '/users';

        try {
            $response = $this->client->get($url, $data);

            if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody()) and isset($result->users)) {
                return $result;
            }

            Log::error("[ZOOM] Fetching account failed. " . @json_decode($response->getBody()));
        } catch (\Exception $e) {
            Log::error("[ZOOM] Error when fetching accounts. " . $e->getMessage());
        }

       return false;
    }

    /**
     * Check if integration is ready for access
     *
     * @return bool
     */
    public function isReady()
    {
        if ($this->client) return true;

        return false;
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

        // https://marketplace.zoom.us/docs/api-reference/zoom-api/webinars/webinarregistrantcreate
        // Zoom integration don't have classic fields,
        // we hardcoded fields by knowing which data can be sent when adding new webinar registrant
        $field = new IntegrationField(['id' => 'first_name', 'name' => 'first_name', 'label' => 'First Name',   'optin_id' => 'first_name',       'type' => 'text',  'enabled'  => false, 'required' => true, 'order' => 10]);
        $fields->push($field);
        $field = new IntegrationField(['id' => 'last_name',  'name' => 'last_name',  'label' => 'Last Name',    'optin_id' => 'last_name',  'type' => 'text',  'enabled'  => false, 'required' => true, 'order' => 20]);
        $fields->push($field);
        $field = new IntegrationField(['id' => 'email',      'name' => 'email',      'label' => 'E-Mail',       'optin_id' => 'email',      'type' => 'email', 'enabled'  => true,  'required' => true,  'order' => 30]);
        $fields->push($field);
//        $field = new IntegrationField(['id' => 'address',    'name' => 'address',    'label' => 'Address',      'optin_id' => 'address',    'type' => 'text',  'enabled'  => true,  'required' => false,  'order' => 40]);
//        $fields->push($field);
//        $field = new IntegrationField(['id' => 'city',       'name' => 'city',       'label' => 'City',         'optin_id' => 'city',       'type' => 'text',  'enabled'  => true,  'required' => false,  'order' => 50]);
//        $fields->push($field);
//        $field = new IntegrationField(['id' => 'country',    'name' => 'country',    'label' => 'Country',      'optin_id' => 'country',    'type' => 'text',  'enabled'  => true,  'required' => false,  'order' => 60]);
//        $fields->push($field);
//        $field = new IntegrationField(['id' => 'zip',        'name' => 'zip',        'label' => 'Zip',          'optin_id' => 'zip',        'type' => 'text',  'enabled'  => true,  'required' => false,  'order' => 70]);
//        $fields->push($field);
//        $field = new IntegrationField(['id' => 'state',      'name' => 'state',      'label' => 'State',        'optin_id' => 'state',      'type' => 'text',  'enabled'  => true,  'required' => false,  'order' => 80]);
//        $fields->push($field);
//        $field = new IntegrationField(['id' => 'phone',      'name' => 'phone',      'label' => 'Phone',        'optin_id' => 'phone',      'type' => 'text',  'enabled'  => true,  'required' => false,  'order' => 90]);
//        $fields->push($field);
//        $field = new IntegrationField(['id' => 'industry',   'name' => 'industry',   'label' => 'Industry',     'optin_id' => 'industry',   'type' => 'text',  'enabled'  => true,  'required' => false,  'order' => 100]);
//        $fields->push($field);
//        $field = new IntegrationField(['id' => 'org',        'name' => 'org',        'label' => 'Organization', 'optin_id' => 'org',        'type' => 'text',  'enabled'  => true,  'required' => false,  'order' => 110]);
//        $fields->push($field);
//        $field = new IntegrationField(['id' => 'job_title',  'name' => 'job_title',  'label' => 'Job Title',    'optin_id' => 'job_title',  'type' => 'text',  'enabled'  => true,  'required' => false,  'order' => 120]);
//        $fields->push($field);
//        $field = new IntegrationField(['id' => 'comments',   'name' => 'comments',   'label' => 'Comments',     'optin_id' => 'comments',   'type' => 'text',  'enabled'  => true,  'required' => false,  'order' => 130]);
//        $fields->push($field);

        return $fields;
    }

    /**
     * Get list of webinars.
     *
     * @return mixed
     */
    public function getWebinars()
    {
        $data = [
            'headers' => [
                'Accept' => 'application/json',
                'Authorization' => 'Bearer ' . $this->getToken(),
            ],
            'query' => [
                'page_size' => '300',
                'page_number' => '1',
            ],
        ];

        // https://marketplace.zoom.us/docs/api-reference/zoom-api/webinars/webinars
        $url = $this->config->get('connection')['base_uri'] . '/users/me/webinars';

        // And try to make the request
        try {
            $response = $this->client->get($url, $data);
            if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody()) and isset($result->webinars)) {
                return $result;
            }

            Log::error("[ZOOM] Fetching webinars failed. " . @json_decode($response->getBody()));
        } catch (\Exception $e) {
            Log::error("[ZOOM] Error when fetching webinars. " . $e->getMessage());
        }

        return false;
    }

    /**
     * Get specific webinar.
     *
     * @return mixed
     */
    public function getWebinar($webinarId)
    {
        $data = [
            'headers' => [
                'Accept' => 'application/json',
                'Authorization' => 'Bearer ' . $this->getToken(),
            ],
        ];

        // https://marketplace.zoom.us/docs/api-reference/zoom-api/webinars/webinar
        $url = $this->config->get('connection')['base_uri'] . '/webinars/' . $webinarId;

        try {
            $response = $this->client->get($url, $data);

            if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody()) and isset($result->id)) {
                return $result;
            }

            Log::error("[ZOOM] Failed to get webinar [$webinarId].");
        } catch (\Exception $e) {
            Log::error("[ZOOM] Error when fetching webinar [$webinarId] from service. " . $e->getMessage());
        }

        return false;
    }

    /**
     * Return all lists.
     * Zoom integration have webinars instead of lists.
     *
     * @return IntegrationListsCollection
     */
    public function getLists()
    {
        $response = $this->getWebinars();

        if ($response && $response->webinars) {
            $lists = new IntegrationListsCollection;

            foreach ($response->webinars as $list) {
                $list = $this->listObject([
                    'id'   => $list->id,
                    'name' => $list->topic,
                ]);
                $lists->push($list);
            }

            return $lists;
        }

        return false;
    }

    /**
     * Return a list.
     * Zoom integration have webinars and instead of list.
     *
     * @param  mixed  $listId
     * @return IntegrationList
     */
    public function getList($listId)
    {
        $response = $this->getWebinar($listId);

        if ($response) {
            $list = $this->listObject([
                'id'   => $response->id,
                'name' => $response->topic,
            ]);

            return $list;
        }

        return false;
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
        $result = $this->optinErrorResult();
        $email  = $optinData->email();
        $webinarId = $optinData->listId();
        $formData = $optinData->all();

        $data = [
            'headers' => [
                'Accept' => 'application/json',
                'Authorization' => 'Bearer ' . $this->getToken(),
            ],
            'json' => [],
        ];

        // Get data that user filled in optin form
        // and add prepare it for request
        $fields = $this->getFields($webinarId);
        if ($fields) {
            foreach ($fields as $field) {
                $value = array_get($formData, $field->id);
                if ($value)
                    $data['json'][$field->optin_id] = $value;
            }
        }

        // https://marketplace.zoom.us/docs/api-reference/zoom-api/webinars/webinarregistrantcreate
        $url = $this->config->get('connection')['base_uri'] . '/webinars/' . $webinarId . '/registrants';

        try {
            $response = $this->client->post($url, $data);

            if (($response->getStatusCode() === 201 && $result = @json_decode($response->getBody())) && isset($result->registrant_id)) {
                Log::debug("[ZOOM] User subscribed: $email to webinar $webinarId");

                $result = $this->optinSuccessResult();
            } else {
                Log::error("[ZOOM] Failed to subscribe [$webinarId].");
                $this->throwOptinException();
            }
        } catch (Exception $e) {
            Log::error("[ZOOM] Error when subscribing to webinar [$webinarId]. " . $e->getMessage());
            $this->throwOptinException($e);
        }

        return $result;
    }

    /**
     * App ID from env var
     *
     * @return string
     */
    public function getEnvAppId()
    {
        return getenv('ZOOM_APP_ID');
    }

    /**
     * Client ID from env var
     *
     * @return string
     */
    public function getEnvClientId()
    {
        return getenv('ZOOM_CLIENT_ID');
    }

    /**
     * Client secret from env var
     *
     * @return string
     */
    public function getEnvClientSecret()
    {
        return getenv('ZOOM_CLIENT_SECRET');
    }

    /**
     * Throw an optin exception
     *
     * @param  string|Exception   $exception
     * @param  array              $data
     * @throws OptinException
     */
    public function throwOptinException($exception = null, $data = [])
    {
        // Parse the exception
        if (is_string($exception)) {
            $message = $exception;
            $code    = 500;
        } elseif ($exception instanceof Exception) {
            $message = $exception->getMessage();
            $code = $exception->getCode();

            // Get response from Zoom, extract json and get message.
            // This way we display more appropriate message to user.
            preg_match('~\{(?:[^{}]|(?R))*\}~', $message, $matches);
            if ($matches && $matches[0]) {
                $json = @json_decode($matches[0]);
                $message = "Error: " . $json->message;
            }

        } else {
            $message = 'Failed to optin.';
            $code    = 500;
        }

        // And throw the exception
        throw new OptinException($message, array_merge([
            'code'        => $code,
            'optinData'   => $this->optinData,
            'leadOption'  => $this->leadOptions,
            'integration' => $this,
        ], $data));
    }
}
