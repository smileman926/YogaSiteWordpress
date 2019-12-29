<?php

namespace OPDashboard\SL;

use Exception;
use function OPDashboard\get_http_timeout_value;
use function OPDashboard\get_installation_domain_and_path;
use OPDashboard\Services\Log;
use function OPDashboard\get_current_domain;
use function OPDashboard\sl_url;

class ApiClient
{
    /**
     * @var mixed
     */
    protected $ping;

    /**
     * Init new SL API client
     */
    public function __construct()
    {
        return $this;
    }

    /**
     * Return the API token stored in the database
     *
     * @return string
     */
    protected function token()
    {
        return get_option(OPD_PREFIX . 'api_token');
    }

    /**
     * Check if API is connected
     *
     * @return bool
     * @throws Exception
     */
    public function isConnected()
    {
        // First we check if we have a token
        $tokenExists = $this->tokenExists();

        if (! $tokenExists) {
            return false;
        }

        // Then simply ping the API
        $ping = SL::ping();

        return $ping;
    }

    /**
     * Check if API token is stored in the DB
     *
     * @return bool
     */
    public function tokenExists()
    {
        $token = $this->token();

        return (bool) ($token !== false and ! empty($token));
    }

    /**
     * Get customer info
     *
     * @return Response
     * @throws Exception
     */
    public function getCustomer()
    {
        $response = $this->request('GET', 'api/customer');

        return $response;
    }

    /**
     * Create a webhook for a payment provider
     *
     * @param  string  $provider
     * @param  string  $url
     * @param  array   $options
     * @return Response
     * @throws Exception
     */
    public function createPaymentWebhook($provider, $url, $options = []): Response
    {
        $response = $this->request('POST', 'api/customer/payment/' . $provider . '/webhooks', ['url' => $url]);

        return $response;
    }

    /**
     * Get detailed customer info
     *
     * @return Response
     * @throws Exception
     */
    public function getCustomerDetails()
    {
        $response = $this->request('GET', 'api/customer/details');

        return $response;
    }

    /**
     * Get registered customer domains
     *
     * @return Response
     * @throws Exception
     */
    public function getCustomerDomains()
    {
        $response = $this->request('GET', 'api/customer/domains');

        return $response;
    }

    /**
     * Ping the SL API
     *
     * @return null
     * @throws Exception
     */
    public function ping()
    {
        if (! $this->ping) {
            $this->ping = $this->request('GET', 'api/ping');
        }

        return $this->ping;
    }

    /**
     * Make a request to the SL API
     *
     * @param string $method
     * @param string $endpoint
     * @param array  $data
     * @param array  $headers
     * @return Response
     * @throws Exception
     */
    public function request($method = 'GET', $endpoint, $data = [], $headers = [])
    {
        // Only if we have a token
        if ($this->tokenExists()) {
            // But first let's check if the token is expired
            if ($this->isTokenExpired()) {
                $token = $this->refreshToken();
            } else {
                $token = get_option(OPD_PREFIX . 'api_token');
            }

            // Prepare the URL endpoint
            $url = sl_url($endpoint);
            Log::debug('[SL] [REQUEST] Request to: ' . $url);

            // Set headers
            $requestHeaders = [
                'Accept'            => 'application/json',
                'Content-Type'      => 'application/x-www-form-urlencoded',
                'X-Customer-Domain' => get_installation_domain_and_path(),
                'X-OPD-Version'     => OPD_VERSION,
                'Authorization'     => 'Bearer ' . $token,
            ];

            // Add custom headers
            if ($headers) {
                $requestHeaders = array_merge($requestHeaders, $headers);
            }

            // Prepare the request
            $request = ['headers' => $requestHeaders, 'method' => $method];

            // Add request arguments
            if ($method === 'GET' && ! empty($data) && is_array($data)) {
                $url = add_query_arg($data, $url);
            } elseif ($method === 'POST' && ! empty($data) && is_array($data)) {
                $request['body'] = $data;
            }

            // Add timeout
            $request['timeout'] = get_http_timeout_value();

            // Then make the request
            $responseData = wp_remote_request($url, $request);
            $response = new Response($responseData);

            // If the request was unauthorized let's try refreshing the token
//            if ($response->isError() and $response->getCode() and $refreshToken) {
//                $token = $this->refreshToken();
//            }

            // Log it
            Log::debug('[SL] [REQUEST] Response: ' . @json_encode($response->toArray()));

            return $response;
        }

        return new Response([
            'error'    => true,
            'response' => ['code' => 503],
            'data'     => ['message' => 'Forbidden'],
        ]);
    }

    /**
     * Refresh the API token and store new tokens in DB
     *
     * @return string|null
     * @throws Exception
     */
    public function refreshToken()
    {
        $url           = sl_url('oauth/token');
        $refreshToken  = get_option(OPD_PREFIX . 'api_refresh_token');
        $clientOptions = get_option(OPD_PREFIX . 'client_options');
        Log::debug('[SL] [OAUTH] [TOKEN] Refreshing token: ' . $url);

        $headers = [
            'X-Customer-Domain' => get_installation_domain_and_path(),
            'X-OPD-Version'     => OPD_VERSION,
        ];

        $body = [
            'client_id'     => $clientOptions['client_id'],
            'client_secret' => $clientOptions['client_secret'],
            'refresh_token' => $refreshToken,
            'grant_type'    => 'refresh_token',
        ];

        $requestData = [
            'method'      => 'POST',
            'timeout'     => 45,
            'redirection' => 5,
            'httpversion' => '1.0',
            'blocking'    => true,
            'headers'     => $headers,
            'body'        => $body,
            'cookies'     => []
        ];
        Log::debug('[SL] [OAUTH] [TOKEN] Refreshing token with data: ' . @json_encode($requestData));

        $response = wp_remote_post(OPD_SL_BASE_URL . 'oauth/token', $requestData);

        if (is_wp_error($response)) {
            Log::error('[SL] [OAUTH] [TOKEN] Token failed to refresh, WP Error occurred: ' . @json_encode($response));
            $this->clearTokens();
        } elseif (isset($response['response']) and isset($response['response']['code']) and $response['response']['code'] != 200) {
            Log::error('[SL] [OAUTH] [TOKEN] Token failed to refresh: ' . @json_encode($response));
            $this->clearTokens();
        } else {
            // Decode response and get tokens
            $responseBody   = json_decode($response['body'], true);
            Log::debug('[SL] [OAUTH] [TOKEN] Token refreshed: ' . @json_encode($responseBody));

            // Separate it
            $token           = $responseBody['access_token'];
            $newRefreshToken = $responseBody['refresh_token'];
            $tokenExpiresIn  = $responseBody['expires_in'];
            $now             = new \DateTime();
            $tokenExpiresAt  = date('Y-m-d H:i:s', $now->add(new \DateInterval('PT' . $tokenExpiresIn . 'S'))->getTimestamp()); // adds 674165 secs

            update_option(OPD_PREFIX . 'api_token',            $token);
            update_option(OPD_PREFIX . 'api_refresh_token',    $newRefreshToken);
            update_option(OPD_PREFIX . 'api_token_expires_at', $tokenExpiresAt);

            return $token;
        }
    }

    /**
     * Check if our API token is expired
     *
     * @return bool
     */
    public function isTokenExpired()
    {
        $expiresAt  = date('Y-m-d H:i:s', strtotime(get_option(OPD_PREFIX . 'api_token_expires_at')));
        $now        = date('Y-m-d H:i:s');

        return $now > $expiresAt;
    }

    /**
     * Clear tokens from DB
     *
     * @return void
     */
    public function clearTokens()
    {
        delete_option(OPD_PREFIX . 'api_token');
        delete_option(OPD_PREFIX . 'api_refresh_token');
        delete_option(OPD_PREFIX . 'api_token_expires_at');
    }
}
