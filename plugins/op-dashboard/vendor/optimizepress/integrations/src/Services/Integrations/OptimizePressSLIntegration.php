<?php

namespace OptimizePress\Integrations\Services\Integrations;

use DateTime;
use Exception;
use GuzzleHttp\Client as HttpClient;
use OptimizePress\Support\Log\Log;
use OptimizePress\Integrations\Integration;
use OptimizePress\Integrations\Services\Contracts\BaseIntegration;
use OptimizePress\Integrations\Services\Contracts\IntegrationServiceOAuthInterface;

/**
 * Infusionsoft service class for integration
 */
class OptimizePressSLIntegration extends BaseIntegration implements IntegrationServiceOAuthInterface
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

        // Get the client ID and secret
        $clientId     = $this->integration->getConnectionValue('client_id');
        $clientSecret = $this->integration->getConnectionValue('client_secret');

        // Setup base config
        $this->config = [
            'client_id'        => $clientId,
            'client_secret'    => $clientSecret,
            'authorize_uri'    => $this->integration->config->get('connection.authorization_url'),
            'access_token_uri' => $this->integration->config->get('connection.access_token_uri'),
            'redirect_uri'     => $this->getCallbackUrl(),
            'cookie_support'   => false,
            'file_upload'      => false,
            'token_as_header'  => true,
            'base_uri'         => $this->integration->config->get('connection.base_uri'),
        ];

        // HTTP clients and helpers
        $this->client = new HttpClient;

        // Set the token if available for integration
        $this->refreshToken();
    }

    public function ping()
    {
        return true;
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
        $params = array_merge($this->config, ['response_type' => 'code']);
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
            'redirect_uri'  => $this->getCallbackUrl(),
        );

        // Prepare request data
        $data = ['headers' => ['content-type' => 'application/x-www-form-urlencoded', 'Expect' => '', 'Accept' => 'application/json'], 'form_params' => $params];

        // And try to make the request
        try {
            $response = $this->client->post($this->config['access_token_uri'], $data);

            if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody()) and isset($result->access_token)) {
                Log::debug('[OPTIMIZEPRESS] Access token fetched: ' . $result->access_token);
                $expiresAt = new DateTime("+ ".$result->expires_in." seconds");

                // Write it
                $this->integration->connection->token = $result->access_token;
                return [
                    'token'            => $result->access_token,
                    'token_secret'     => null,
                    'refresh_token'    => $result->access_token,
                    'token_expires_at' => $expiresAt,
                ];
            }

            Log::error("[OPTIMIZEPRESS] No access token found in response. " . @json_decode($response->getBody()));
        } catch (Exception $e) {
            Log::error("[OPTIMIZEPRESS] Error when fetching access token. " . $e->getMessage());
        }

        return null;
    }

    /**
     * Return OAuth callback URL
     *
     * @return string
     */
    public function getCallbackUrl()
    {
        return route('optimizepress.integrations.opsl.callback');
    }

    /**
     * Refresh the access token when expired
     *
     * @param  bool  $force
     * @return mixed
     */
    public function refreshToken($force = false)
    {
        // TODO: Implement refreshToken() method.
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
}
