<?php

namespace OptimizePress\Integrations\Services\Integrations;

use Exception;
use GuzzleHttp\Client as HttpClient;
use OptimizePress\Integrations\Collections\IntegrationFieldsCollection;
use OptimizePress\Integrations\Collections\IntegrationListsCollection;
use OptimizePress\Integrations\Integration;
use OptimizePress\Integrations\IntegrationField;
use OptimizePress\Integrations\IntegrationList;
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
 * Integration with Emma
 */
class GoToWebinarIntegration extends BaseIntegration implements IntegrationServiceInterface, IntegrationServiceOAuthInterface
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
            'authorize_uri'     => 'https://api.getgo.com/oauth/v2/authorize',
            'access_token_uri'  => 'https://api.getgo.com/oauth/v2/token',
            'refresh_token_uri' => 'https://api.getgo.com/oauth/v2/token',
            'redirect_uri'      => $this->integration->getCallbackUrl(),
            'cookie_support'    => false,
            'file_upload'       => false,
            'token_as_header'   => true,
            'base_uri'          => 'https://api.getgo.com/G2W/rest'
        ];

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
        // Build up the authorization URL
        $url   = $this->config['authorize_uri'];
        $query = [
            'redirect_uri'  => $this->config['redirect_uri'],
            'client_id'     => $this->config['client_id'],
            'response_type' => 'code',
        ];
        $url = $url . '?' . http_build_query($query);

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
            'grant_type'    => 'authorization_code',
            'client_id'     => $this->config['client_id'],
            'code'          => $code,
            'redirect_uri'  => $this->config['redirect_uri'],
        );

        // Prepare request data
        $data = ['headers' => [
            'Authorization' => 'Basic ' . base64_encode($this->config['client_id'] . ':' . $this->config['client_secret']),
            'Content-Type'  => 'application/x-www-form-urlencoded',
            'Accept'        => 'application/json',
        ], 'form_params' => $params];

        // And try to make the request
        try {
            $response = $this->client->post($this->config['access_token_uri'], $data);

            if ($response->getStatusCode() === 200 and $result = @json_decode($response->getBody()) and isset($result->access_token)) {
                Log::debug('[GOTOWEBINAR] Access token fetched: ' . $result->access_token);

                // Set the token and date
                $this->integration->connection->token = $result->access_token;
                $expiresAt = date('Y-m-d H:i:s', time() + $result->expires_in);

                // And return aggregated result
                return [
                    'token'            => $result->access_token,
                    'token_secret'     => $result->organizer_key,
                    'refresh_token'    => $result->refresh_token,
                    'token_expires_at' => $expiresAt,
                ];
            }

            Log::error('[GOTOWEBINAR] No access token found in response. ' . @json_decode($response->getBody()));
        } catch (Exception $e) {
            Log::error('[GOTOWEBINAR] Error when fetching access token. ' . $e->getMessage());
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
        if ($this->getRefreshToken() and $this->isTokenExpired()) {
            Log::debug('[GOTOWEBINAR] Refreshing access token for integration "' . $this->integration->provider . '" [' . $this->integration->id . '].');

            $params = array(
                'grant_type'    => 'refresh_token',
                'refresh_token' => $this->getRefreshToken(),
            );

            // Prepare request data
            $data = ['headers' => [
                'Authorization' => 'Basic ' . base64_encode($this->config['client_id'] . ':' . $this->config['client_secret']),
                'Content-Type'  => 'application/x-www-form-urlencoded',
                'Accept'        => 'application/json',
            ], 'form_params' => $params];
            Log::debug('[GOTOWEBINAR] Refresh data: ' . @json_encode($data));

            // And try to make the request
            try {
                $response = $this->client->post($this->config['refresh_token_uri'], $data);

                if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody()) and isset($result->access_token)) {
                    // Set the token and date
                    $this->integration->connection->token = $result->access_token;
                    $expiresAt = date('Y-m-d H:i:s', time() + $result->expires_in);

                    // Compile aggregated result
                    $tokenData = [
                        'token'            => $result->access_token,
                        'token_secret'     => $result->organizer_key,
                        'refresh_token'    => $result->refresh_token,
                        'token_expires_at' => $expiresAt,
                    ];

                    Log::debug('[GOTOWEBINAR] Access token refreshed: ' . @json_encode($tokenData));
                    $this->integration->storage()->updateConnectionFields($this->integration->uid, $tokenData);

                    return $tokenData;
                }

                Log::error('[GOTOWEBINAR] No access token found in response when refreshing. ' . @json_decode($response->getBody()));
            } catch (Exception $e) {
                Log::error('[GOTOWEBINAR] Error when refreshing access token. ' . $e->getMessage());
            }
        }
    }

    /**
     * Check if the token is expired
     *
     * @return bool
     */
    public function isTokenExpired()
    {
        $refreshToken = $this->getRefreshToken();
        $expiresAt = $this->integration->connection ? $this->integration->connection->token_expires_at : null;

        if ($refreshToken and $expiresAt) {
            return $expiresAt < date('Y-m-d H:i:s');
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
        $data = ['headers' => ['Accept' => 'application/json', 'Content-Type' => 'application/json', 'Authorization' => 'OAuth oauth_token=' . $this->getToken()]];

        // And try to make the request
        try {
            $url      = $this->config['base_uri'] . '/organizers/' . $this->getTokenSecret() . '/webinars';
            $response = $this->client->get($url, $data);

            if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody())) {
                return true;
            }

            Log::error('[GOTOWEBINAR] Failed to ping.');
        } catch (Exception $e) {
            Log::error('[GOTOWEBINAR] Error when pinging. ' . $e->getMessage());
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
        $data = ['headers' => ['Accept' => 'application/json', 'Content-Type' => 'application/json', 'Authorization' => 'OAuth oauth_token=' . $this->getToken()]];

        // And try to make the request
        try {
            $url      = $this->config['base_uri'] . '/organizers/' . $this->getTokenSecret() . '/webinars';
            $response = $this->client->get($url, $data);

            if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody())) {
                $lists = new IntegrationListsCollection;

                foreach ($result as $webinar) {
                    $list = $this->listObject([
                        'id'          => $webinar->webinarKey,
                        'name'        => $webinar->subject,
                        'description' => $webinar->description,
                        'url'         => $webinar->registrationUrl,
                    ]);
                    $lists->push($list);
                }

                return $lists;
            }

            Log::error('[GOTOWEBINAR] Failed to get lists.');
        } catch (Exception $e) {
            Log::error('[GOTOWEBINAR] Error when fetching lists from service. ' . $e->getMessage());
        }

        return new IntegrationListsCollection;
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
        $data = ['headers' => ['Accept' => 'application/json', 'Content-Type' => 'application/json', 'Authorization' => 'OAuth oauth_token=' . $this->getToken()]];

        // And try to make the request
        try {
            $url      = $this->config['base_uri'].'/organizers/'.$this->getTokenSecret().'/webinars/' . $listId;
            $response = $this->client->get($url, $data);

            if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody())) {
                $list = $this->listObject([
                    'id'          => $result->webinarKey,
                    'name'        => $result->subject,
                    'description' => $result->description,
                    'url'         => $result->registrationUrl,
                ]);

                return $list;
            }

            Log::error("[GOTOWEBINAR] Failed to get lists.");
        } catch (Exception $e) {
            Log::error("[GOTOWEBINAR] Error when fetching lists from service. " . $e->getMessage());
        }
    }

    /**
     * Get form fields
     *
     * @param  mixed  $listId
     * @return IntegrationFieldsCollection
     */
    public function getFields($listId = null)
    {
        $fields = new IntegrationFieldsCollection([
            new IntegrationField([
                'id'       => 'first_name',
                'name'     => 'first_name',
                'label'    => 'First name',
                'tag'      => 'first_name',
                'optin_id' => 'first_name',
                'required' => true,
                'enabled'  => true,
                'order'    => 1,
                'type'     => 'text',
            ]),
            new IntegrationField([
                'id'       => 'last_name',
                'name'     => 'last_name',
                'label'    => 'Last name',
                'tag'      => 'last_name',
                'optin_id' => 'last_name',
                'required' => true,
                'enabled'  => true,
                'order'    => 2,
                'type'     => 'text',
            ]),
            new IntegrationField([
                'id'       => 'email',
                'name'     => 'email',
                'label'    => 'E-Mail',
                'tag'      => 'email',
                'optin_id' => 'email',
                'required' => true,
                'enabled'  => true,
                'order'    => 3,
                'type'     => 'email',
            ]),
        ]);

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
        // Setup params
        $result = $this->optinErrorResult();
        $listId = $optinData->listId();
        $email  = $optinData->email();

        // Prepare request data
        $requestData = ['headers' => ['Accept' => 'application/json', 'Content-Type' => 'application/json', 'Authorization' => 'OAuth oauth_token=' . $this->getToken()]];

        // And try to make the request
        // @TODO: Fix the field names here!
        try {
            $requestData['body'] = @json_encode([
                'email'     => $email,
                'firstName' => $optinData->firstName(),
                'lastName'  => $optinData->lastName(),
            ]);
            Log::error('[GOTOWEBINAR] Prepare optin data: ' . $requestData['body']);
            $url = $this->config['base_uri'] . '/organizers/' . $this->getTokenSecret() . '/webinars/' . $listId . '/registrants';
            $response = $this->client->post($url, $requestData);

            if (($response->getStatusCode() == 200 or $response->getStatusCode() == 201) and $result = @json_decode($response->getBody())) {
                $result = $this->optinSuccessResult();
            } elseif ($response->getStatusCode() == 409) {
                Log::debug("[GOTOWEBINAR] User already subscribed: $email to list $listId. Code [".$response->getStatusCode() . '].');
                $this->throwOptinAlreadySubscribedException();
            } else {
                Log::error('[GOTOWEBINAR] Failed to optin.');
                $this->throwOptinException();
            }
        } catch (Exception $e) {
            // Duplicate submission (no need for error)
            if ($e->getResponse()->getStatusCode() == 409) {
                Log::debug("[GOTOWEBINAR] User already subscribed: $email to list $listId.");
                $this->throwOptinAlreadySubscribedException();
            } else {
                Log::error('[GOTOWEBINAR] Error on optin. ' . $e->getMessage());
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
        return getenv('GOTOWEBINAR_CLIENT_ID');
    }

    /**
     * Client secret from env var
     *
     * @return string
     */
    public function getEnvClientSecret()
    {
        return getenv('GOTOWEBINAR_CLIENT_SECRET');
    }
}
