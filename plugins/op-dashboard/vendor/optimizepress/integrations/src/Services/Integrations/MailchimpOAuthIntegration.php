<?php

namespace OptimizePress\Integrations\Services\Integrations;

use GuzzleHttp\Client as HttpClient;
use OptimizePress\Support\Log\Log;
use OptimizePress\Integrations\Integration;
use OptimizePress\Integrations\Services\Contracts\IntegrationServiceInterface;
use OptimizePress\Integrations\Services\Contracts\IntegrationServiceOAuthInterface;

/**
 * Integration logic for MailChimp
 */
class MailchimpOAuthIntegration extends MailchimpIntegration implements IntegrationServiceInterface, IntegrationServiceOAuthInterface
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
            'client_id'        => $clientId,
            'client_secret'    => $clientSecret,
            'authorize_uri'    => 'https://login.mailchimp.com/oauth2/authorize',
            'access_token_uri' => 'https://login.mailchimp.com/oauth2/token',
            'redirect_uri'     => null,
            'cookie_support'   => false,
            'file_upload'      => false,
            'token_as_header'  => true,
            'base_uri'         => 'https://login.mailchimp.com/oauth2/'
        ];

        // HTTP clients and helpers
        $this->client = new HttpClient;
    }

    /**
     * Create base request data
     *
     * @return array
     */
    public function getRequestData()
    {
        return ['headers' => ['Accept' => 'application/json', 'Authorization' => 'OAuth ' . $this->getToken()]];
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
     * @param  array $data
     * @return string
     */
    public function getAuthorizationUrl($data = [])
    {
        $params = array_merge($this->config, ['response_type' => 'code']);
        $params = array_merge($params, $data);
        $url    = $this->config['authorize_uri'] . '?' . http_build_query($params, null, '&');

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
            'client_id'     => $this->integration->getOauthClientId(),
            'client_secret' => $this->integration->getOauthClientSecret(),
            'code'          => $code,
            'redirect_uri'  => $this->integration->getCallbackUrl(),
        );

        // Prepare request data
        $data = ['headers' => ['content-type' => 'application/x-www-form-urlencoded', 'Expect' => '', 'Accept' => 'application/json'], 'form_params' => $params];

        // And try to make the request
        try {
            $response = $this->client->post('https://login.mailchimp.com/oauth2/token', $data);

            if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody()) and isset($result->access_token)) {
                Log::debug('[MAILCHIMP OAUTH] Access token fetched: ' . $result->access_token);

                // The token never expires
                $this->integration->setConnectionValue('token', $result->access_token);

                return [
                    'token'            => $result->access_token,
                    'token_secret'     => null,
                    'refresh_token'    => null,
                    'token_expires_at' => null,
                    'api_url'          => $this->getApiUrl(),
                ];
            }

            Log::error("[MAILCHIMP OAUTH] No access token found in response. " . @json_decode($response->getBody()));
        } catch (\Exception $e) {
            Log::error("[MAILCHIMP OAUTH] Error when fetching access token. " . $e->getMessage());
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

        return null;
    }

    /**
     * Get root URL to API
     *
     * @return string
     */
    public function getApiUrl()
    {
        if (! $apiUrl = $this->integration->api_url) {
            $meta = $this->metadata();

            if ($meta and isset($meta->api_endpoint)) {
                $apiUrl = $meta->api_endpoint . '/3.0/';
            }
        }

        return $apiUrl;
    }

    /**
     * Ping the service API
     *
     * @return bool
     */
    public function ping()
    {
        $meta = $this->metadata();

        if ($meta) {
            return true;
        }

        Log::error("[MAILCHIMP OAUTH] Ping failed.");
        return false;
    }

    /**
     * Fetch service metadata
     *
     * @return mixed
     */
    public function metadata()
    {
        // Prepare request data
        $data = ['headers' => ['Accept' => 'application/json', 'Authorization' => 'OAuth ' . $this->getToken()]];

        // And try to make the request
        try {
            $response = $this->client->post('https://login.mailchimp.com/oauth2/metadata', $data);

            if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody()) and isset($result->user_id)) {
                return $result;
            }

            Log::error("[MAILCHIMP OAUTH] Fetching metadata failed. " . @json_decode($response->getBody()));
        } catch (\Exception $e) {
            Log::error("[MAILCHIMP OAUTH] Error when fetching metadata. " . $e->getMessage());
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
     * Return OAuth refrresh token for this integration
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
     * Client ID from env var
     *
     * @return string
     */
    public function getEnvClientId()
    {
        return getenv('MAILCHIMP_CLIENT_ID');
    }

    /**
     * Client secret from env var
     *
     * @return string
     */
    public function getEnvClientSecret()
    {
        return getenv('MAILCHIMP_CLIENT_SECRET');
    }
}
