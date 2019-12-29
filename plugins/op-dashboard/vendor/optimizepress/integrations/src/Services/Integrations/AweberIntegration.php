<?php

namespace OptimizePress\Integrations\Services\Integrations;

use DateInterval;
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
use OptimizePress\Integrations\Services\Exceptions\AlreadySubscribedException;
use OptimizePress\Integrations\Services\Exceptions\OptinException;
use OptimizePress\Support\Log\Log;
use function OptimizePress\Support\array_get;
use stdClass;

/**
 * Integration with Emma
 */
class AweberIntegration extends BaseIntegration implements IntegrationServiceInterface, IntegrationServiceOAuthInterface
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
            'client_id'     => $this->config->client_id,
            'redirect_uri'  => $this->integration->getCallbackUrl(),
            'scope'         => 'account.read list.read subscriber.read subscriber.write subscriber.read-extended',
            'state'         => 'opintegrations',
        ];

        return $this->config->getConnectionValue('authorization_url') . '?' . http_build_query($params, null, '&');
    }

    /**
     * Return token for authorizing OAuth requests
     *
     * @param  array $requestData
     * @return mixed
     */
    public function getAuthorizationTokenAndSecret(array $requestData)
    {
        // Prepare request data
        $code     = isset($requestData['code']) ? $requestData['code'] : null;
        $tokenUrl = $this->config->getConnectionValue('access_token_uri');
        $params   = array(
            'grant_type'    => 'authorization_code',
            'code'          => $code,
            'redirect_uri'  => $this->integration->getCallbackUrl(),
        );
        $data = [
            'headers'     => ['content-type' => 'application/x-www-form-urlencoded'],
            'auth'        => [$this->integration->getOauthClientId(), $this->integration->getOauthClientSecret()],
            'form_params' => $params
        ];

        // And try to make the request
        try {
            $response = $this->client->post($tokenUrl, $data);

            if ($response->getStatusCode() === 200 and $result = @json_decode($response->getBody()) and isset($result->access_token)) {
                Log::debug('[AWEBER OAUTH] Access token fetched: ' . $result->access_token);

                // Set the token and prepare data
                $this->integration->setConnectionValue('token', $result->access_token);

                // Calculate expiration
                $expiresAt    = new DateTime;
                $expiresAt->add(new DateInterval('PT' . $result->expires_in . 'S'));

                // Prepare connection data
                $resultData = [
                    'token'            => $result->access_token,
                    'token_secret'     => null,
                    'refresh_token'    => $result->refresh_token,
                    'token_expires_at' => $expiresAt,
                ];

                return $resultData;
            }

            Log::error('[AWEBER OAUTH] No access token found in response. ' . (string) $response->getBody());
        } catch (Exception $e) {
            Log::error('[AWEBER OAUTH] Error when fetching access token. ' . $e->getMessage());
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
        // First let's check if the token is expired
        $expiresAt       = $this->integration->getConnectionValue('token_expires_at');
        $tokenHasExpired = $expiresAt && (date('Y-m-d H:i:s') > $expiresAt);

        if ($force || $tokenHasExpired) {
            Log::debug('[AWEBER OAUTH] Refreshing access token for integration "' . $this->integration->provider . '" [' . $this->integration->uid . '].');

            // Prepare request data
            $tokenUrl = $this->config->getConnectionValue('access_token_uri');
            $params   = [
                'grant_type'    => 'refresh_token',
                'refresh_token' => $this->getRefreshToken(),
            ];
            $data = [
                'headers'     => ['content-type' => 'application/x-www-form-urlencoded'],
                'auth'        => [$this->integration->getOauthClientId(), $this->integration->getOauthClientSecret()],
                'form_params' => $params
            ];

            // And try to make the request
            try {
                $response = $this->client->post($tokenUrl, $data);

                if ($response->getStatusCode() === 200 and $result = @json_decode($response->getBody()) and isset($result->access_token)) {
                    Log::debug('[AWEBER OAUTH] Token refreshed: ' . $result->access_token);

                    // Set the token and prepare data
                    $this->integration->setConnectionValue('token', $result->access_token);

                    // Calculate expiration
                    $token        = $result->access_token;
                    $expiresAt    = new DateTime;
                    $expiresAt->add(new DateInterval('PT' . $result->expires_in . 'S'));

                    // Prepare connection data
                    $resultData = [
                        'token'            => $result->access_token,
                        'token_secret'     => null,
                        'refresh_token'    => $result->refresh_token,
                        'token_expires_at' => $expiresAt->format('Y-m-d H:i:s'),
                    ];

                    // Update storage fields
                    $this->integration->storage()->updateConnectionFields($this->integration->uid, $resultData);

                    return $resultData;
                }

                Log::error('[AWEBER OAUTH] No access token found in response when refreshing token. ' . (string) $response->getBody());
            } catch (Exception $e) {
                Log::error('[AWEBER OAUTH] Error when refreshing access token. ' . $e->getMessage());
            }
        }

        return isset($token) ? $token : null;
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
                $apiUrl = $this->config->getConnectionValue('base_uri') . '/accounts/' . $accounts[0]->id;
            } else {
                $apiUrl = $this->config->getConnectionValue('base_uri');
            }
        }

        return $apiUrl;
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
        $accounts = $this->getAccounts();

        if ( ! $accounts) {
            Log::error('[AWEBER] Error pinging.');

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
            $url = $this->config->getConnectionValue('base_uri') . '/accounts';
            $response = $this->client->get($url, $data);

            if ($response->getStatusCode() === 200 and $result = @json_decode($response->getBody()) and isset($result->entries)) {
                if (count($result->entries) === 1) {
                    $appId  = $result->entries[0]->id;
                    $apiUrl = $this->config->getConnectionValue('base_uri') . '/accounts/' . $result->entries[0]->id;

                    $this->integration->storage()->updateConnectionFields($this->integration->uid, [
                        'app_id'  => $appId,
                        'api_url' => $apiUrl,
                    ]);
                    $this->integration->setConnectionValue('app_id',  $appId);
                    $this->integration->setConnectionValue('api_url', $apiUrl);
                }

                return $result->entries;
            }

            Log::error('[AWEBER] Failed to get accounts.');
        } catch (Exception $e) {
            Log::error('[AWEBER] Error getting accounts.');
        }

        return null;
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
     * Searches for possible form fields from POST and adds them to the collection
     *
     * @param  string  $listId
     * @param  array   $data
     * @return null|array      null if no value/field found
     */
    protected function prepareCustomOptinData($listId, $data)
    {
        $fields = $this->getFields($listId);
        $custom = [];

        if ($fields) {
            foreach ($fields as $field) {
                $value = array_get($data, $field->id) ?: array_get($data, str_replace('aweber_', '', $field->id));

                if (! in_array($field->name, ['first_name', 'last_name', 'email']) && !empty($value)) {
                    $custom[$field->name] = $value;
                }
            }
        }

        return $custom;
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
        $field = new IntegrationField(['id' => 'first_name', 'name' => 'first_name', 'label' => 'First Name', 'optin_id' => 'first_name', 'type' => 'text',  'enabled'  => false, 'required' => false, 'order' => 10]); $fields->push($field);
        $field = new IntegrationField(['id' => 'last_name',  'name' => 'last_name',  'label' => 'Last Name',  'optin_id' => 'last_name',  'type' => 'text',  'enabled'  => false, 'required' => false, 'order' => 20]); $fields->push($field);
        $field = new IntegrationField(['id' => 'email',      'name' => 'email',      'label' => 'E-Mail',     'optin_id' => 'email',      'type' => 'email', 'enabled'  => true,  'required' => true,  'order' => 30]); $fields->push($field);

        // Prepare request data
        $data = ['headers' => ['Accept' => 'application/json', 'Authorization' => 'Bearer ' . $this->getToken()]];

        // And try to make the request
        try {
            $response = $this->client->get($this->getApiUrl() . '/lists/' . $listId . '/custom_fields', $data);

            if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody()) and isset($result->entries)) {
                foreach ($result->entries as $key => $customField) {
                    $field = new IntegrationField([
                        'id'       => "aweber_" . $customField->id,
                        'name'     => $customField->name,
                        'label'    => $customField->name,
                        'optin_id' => "aweber_" . $customField->id,
                        'enabled'  => false,
                        'required' => false,
                        'order'    => $key+50,
                        'type'     => 'text',
                    ]);
                    $fields->push($field);
                }

                Log::debug('[AWEBER] ' . count($fields) . " form inputs fetched on list [$listId].");
            }
        } catch (Exception $e) {
            Log::error("[AWEBER] Error when fetching list fields [$listId]. " . $e->getMessage());
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
            $response = $this->client->get($this->getApiUrl() . '/lists', $data);

            if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody()) and isset($result->entries)) {
                $lists = new IntegrationListsCollection;

                foreach ($result->entries as $list) {
                    $list = $this->listObject([
                        'id'          => $list->id,
                        'name'        => $list->name,
                    ]);
                    $lists->push($list);
                }

                return $lists;
            }

            Log::error('[AWEBER] Failed to get forms.');
        } catch (Exception $e) {
            Log::error('[AWEBER] Error when fetching lists from service. '. $e->getMessage());
        }

        return null;
    }

    /**
     * Return a list
     *
     * @param  mixed  $listId
     * @return IntegrationList
     */
    public function getList($listId)
    {
        // Prepare request data
        $data = ['headers' => ['Accept' => 'application/json', 'Authorization' => 'Bearer ' . $this->getToken()]];

        // And try to make the request
        try {
            $response = $this->client->get($this->getApiUrl() . '/lists/' . $listId, $data);

            if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody()) and isset($result->id)) {
                $list = $this->listObject([
                    'id'   => $result->id,
                    'name' => $result->name,
                ]);

                return $list;
            }

            Log::error("[AWEBER] Failed to get list [$listId].");
        } catch (Exception $e) {
            Log::error("[AWEBER] Error when fetching list [$listId] from service. " . $e->getMessage());
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

        // Prepare request data
        $headers = [
            'Content-Type'  => 'application/json',
            'Accept'        => 'application/json',
            'User-Agent'    => 'OptimizePress-Integrations-SDK/1.0',
            'Authorization' => 'Bearer ' . $this->getToken(),
        ];

        // And try to make the request
        try {
            // Create request body
            $body = ['email' => $email, 'name'  => $optinData->fullName()];

            // Also add custom fields if needed
            $customData = $this->prepareCustomOptinData($listId, $optinData->all());
            if ($customData) {
                $body['custom_fields'] = $customData;
            }

            // Also add tags
            if ($tags = $optinData->tags()) {
                $body['tags'] = $tags;
            }

            // Add GDPR note if it exists
            $gdprNote = $this->getGdprNote($optinData);

            if (! empty($gdprNote)) {
                $body['misc_notes'] = $gdprNote;
            }

            // Prepare request data and make the request
            $requestData = [
                'json'    => $body,
                'headers' => $headers,
            ];
            Log::debug('[AWEBER] Preparing request data: ' . @json_encode($requestData));

            // Now make the request
            $response = $this->client->post($this->getApiUrl() . '/lists/' . $listId . '/subscribers', $requestData);

            if ($response->getStatusCode() == 200 or $response->getStatusCode() == 201) {
                Log::debug('[AWEBER] User subscribed.');
                $responseData = @json_decode($response->getBody());

                // GDPR geolocation
                $subscriberUrl = $response->getHeader('Location');
                $subscriberUrl = isset($subscriberUrl[0]) ? $subscriberUrl[0] : null;

                if ($subscriberUrl) {
                    $subscriber = $this->getSubscriberByUrl($subscriberUrl, $listId);

                    $optinData->subscriber = $subscriber;
                    if (class_exists('\OPDashboard\Services\GeoIp')) {
                        $optinData->isFromEu = \OPDashboard\Services\GeoIp::isFromEu();
                    } else {
                        $optinData->isFromEu = true;
                    }

                    // And GDPR tags
                    $this->processGdprTags($optinData);
                }

                $result = $this->optinSuccessResult();
            } else {
                Log::error('[AWEBER] Failed to subscribe.');
                $this->throwOptinException();
            }
        } catch (Exception $e) {
            $resultData = method_exists($e, 'getResponse') ? @json_decode($e->getResponse()->getBody()) : new stdClass;
            $message    = (isset($resultData->error) && isset($resultData->error->message)) ? $resultData->error->message : null;

            // Duplicate submission (no need for error)
            if ($message === 'email: Subscriber already subscribed.') {
                Log::info("[AWEBER] Member with email [$email] already subscribed.");
                $this->throwOptinAlreadySubscribedException();
            } else {
                Log::error("[AWEBER] Error when subscribing to list [$listId]. " . $e->getMessage());
                $this->throwOptinException($e);
            }
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
        $result     = false;
        $email      = $data->get('email');
        $subscriber = $data->subscriber;

        if ($subscriber) {
            try {
                // Add tags to selected merge fields
                if (! empty($tags)) {
                    $tagsToAssign     = [];

                    foreach ($tags as $key => $tag) {
                        $tagsToAssign[] = $tag['id'];
                    }

                    if ($tagsToAssign) {
                        // Create request body
                        $body = ['tags' => ['add' => $tagsToAssign]];

                        // Prepare request data and make the request
                        $requestData = [
                            'json'    => $body,
                            'headers' => ['Content-Type'  => 'application/json', 'Accept' => 'application/json', 'User-Agent' => 'OptimizePress-Integrations-SDK/1.0', 'Authorization' => 'Bearer ' . $this->getToken()],
                        ];

                        // Now make the request
                        $response = $this->client->patch($this->getApiUrl() . '/lists/' . $data->listId() . '/subscribers/' . $subscriber->id, $requestData);

                        if ($response->getStatusCode() == 200 or $response->getStatusCode() == 209) {
                            $result = true;
                            Log::debug('[AWEBER] GDPR tags assigned.');
                        } else {
                            Log::error('[AWEBER] Failed to assign GDPR tags. Response code: ' . $response->getStatusCode());
                        }
                    }
                }
            } catch(Exception $e) {
                Log::error('[AWEBER] Failed to assign GDPR tags. ' . $e->getMessage());
            }
        }

        return $result;
    }

    /**
     * Get subscriber data
     *
     * @param  string $url
     * @param  string $listId
     * @return object|null
     */
    public function getSubscriberByUrl($url, $listId)
    {
        if ($url) {
            $urlParts     = explode('/', $url);
            $subscriberId = end($urlParts);

            return $this->getSubscriber($subscriberId, $listId);
        }

        return null;
    }

    /**
     * Get subscriber in list by ID
     *
     * @param $id
     * @param $listId
     * @return object|null
     */
    public function getSubscriber($id, $listId)
    {
        // Prepare request data
        $data = ['headers' => ['Accept' => 'application/json', 'Authorization' => 'Bearer ' . $this->getToken()]];

        // And try to make the request
        try {
            $response = $this->client->get($this->getApiUrl() . '/lists/' . $listId . '/subscribers/' . $id, $data);

            if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody()) and isset($result->id)) {
                return $result;
            }

            Log::error("[AWEBER] Failed to get subscriber [$id] in list [$listId].");
        } catch (Exception $e) {
            Log::error("[AWEBER] Error when fetching subscriber [$id] in list [$listId] from service. " . $e->getMessage());
        }

        return null;
    }

    /**
     * App ID from env var
     *
     * @return string
     */
    public function getEnvAppId()
    {
        return getenv('AWEBER_APP_ID');
    }

    /**
     * Client ID from env var
     *
     * @return string
     */
    public function getEnvClientId()
    {
        return getenv('AWEBER_CLIENT_ID');
    }

    /**
     * Client secret from env var
     *
     * @return string
     */
    public function getEnvClientSecret()
    {
        return getenv('AWEBER_CLIENT_SECRET');
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

            switch ($code) {
                case 400:
                $message = 'Missing required argument(s).';
                break;
                case 401:
                    $message = 'Consumer key is invalid.';
                    break;
                case 403:
                    $message = 'Rate Limit Error.';
                    break;
                case 404:
                    $message = 'List with given id not found.';
                    break;
                case 415:
                    $message = 'Content Type must be application/json or application/x-www-form-urlencoded.';
                    break;
                case 500:
                    $message = 'Something went wrong.';
                    break;
                case 503:
                    $message = 'Failed to communicate with endpoint.';
                    break;
                default:
                    $message = 'Optin Failed.';
                    break;
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
