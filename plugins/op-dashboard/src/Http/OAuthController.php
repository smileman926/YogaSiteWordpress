<?php

namespace OPDashboard\Http;

use function OPDashboard\clear_all_cache;
use function OPDashboard\get_current_domain;
use OPDashboard\Integrations\IntegrationRepository;
use OPDashboard\Services\Log;
use function OPDashboard\sl_direct_connect_url;
use OptimizePress\Integrations\Integration;
use function OptimizePress\Support\array_get;

class OAuthController extends Controller
{
    /**
     * All the request routes
     *
     * @var array
     */
    protected $routes = [
        'op-connect-to-sl'             => 'connect',
        'op-process-oauth-response'    => 'response',
        'op-process-oauth-callback'    => 'callback',
        'op-process-oauth-sl-response' => 'responseSL',
        'op-process-oauth-sl-callback' => 'callbackSL',
        'op-process-op3-disconnect'    => 'disconnect',
    ];

    /**
     * Route requests
     *
     * @return mixed
     */
    public function routes()
    {
        global $wp;

        $method = isset($this->routes[$wp->request]) ? $this->routes[$wp->request] : false;

        if ($method and method_exists($this, $method)) {
            return $this->$method();
        }

        return [];
    }

    /**
     * Redirect to SL connection URL
     *
     * @return void
     */
    public function connect()
    {
        clear_all_cache();

        wp_redirect(sl_direct_connect_url());
        die();
    }

    /**
     * Process the OAuth response from SL
     *
     * return mixed
     *
     * @throws \Exception
     */
    public function response()
    {
        $this->responseSL();
    }

    /**
     * Process the OAuth response from SL
     *
     * return mixed
     *
     * @throws \Exception
     */
    public function responseSL()
    {
        Log::debug('[SL] [OAUTH] Response: ' . @json_encode($_GET));

        // Check for errors first
        $error = isset($_GET['errors']) ? $_GET['errors'] : null;
        if ($error) {
            return $this->displayError($error);
        }

        // Fetch credentials
        $clientId      = sanitize_text_field($_GET['client_id']);
        $clientSecret  = sanitize_text_field($_GET['client_secret']);

        // Update integration options with SL credentials
        update_option(OPD_PREFIX . 'client_options', [
            'client_id'     => $clientId,
            'client_secret' => $clientSecret,
        ]);

        // And redirect to callback processing
        wp_redirect(OPD_SL_BASE_URL . 'oauth/authorize?client_id=' . $clientId . '&redirect_uri=' . home_url() . '/op-process-oauth-sl-callback&response_type=code&scope=*');
        die();
    }

    /**
     * Process the SL OAuth callback request
     *
     * @return mixed
     * @throws \Exception
     */
    public function callback()
    {
        // Find the integration in the DB first
        $integrations = new IntegrationRepository;

        /** @var Integration $integration */
        $integration = $integrations->findByProvider($_REQUEST['provider']);
        $result      = $integration->service()->getAuthorizationTokenAndSecret($_REQUEST);

        // The get the required connection params
        $token          = array_get($result, 'token');
        $tokenSecret    = array_get($result, 'token_secret');
        $refreshToken   = array_get($result, 'refresh_token');
        $tokenExpiresAt = array_get($result, 'token_expires_at');

        if (! $token or ! $tokenSecret) {
            wp_die('Error when authorizing.');
        } else {
            $integration = $integrations->updateConnectionFields($integration->uid, $result);
            $ping        = $integration->ping();
        }

        // Redirect back to the integrations index page
        wp_redirect(admin_url() . 'admin.php?page=op-dashboard-integrations');
        die();
    }

    /**
     * Process the SL OAuth callback request
     *
     * @return mixed
     * @throws \Exception
     */
    public function callbackSL()
    {
        // Post request to get actual access token and store it to the db
        $clientOptions = get_option(OPD_PREFIX .'client_options');

        // Run the request with all the data
        $response = wp_remote_post(OPD_SL_BASE_URL . 'oauth/token', [
                'method'      => 'POST',
                'timeout'     => 45,
                'redirection' => 5,
                'httpversion' => '1.0',
                'blocking'    => true,
                'headers'     => [
                    'X-Customer-Domain' => get_current_domain(),
                    'X-OPD-Version'     => OPD_VERSION,
                ],
                'body' => [
                    'client_id'     => $clientOptions['client_id'],
                    'client_secret' => $clientOptions['client_secret'],
                    'grant_type'    => 'authorization_code',
                    'redirect_uri'  => home_url() . '/op-process-oauth-sl-callback',
                    'code'          => $_REQUEST['code']
                ],
                'cookies' => []
            ]
        );

        if (is_wp_error($response)) {
            wp_die($response);
        } elseif (isset($response['response']) and isset($response['response']['code']) and $response['response']['code'] != 200) {
            wp_die('Error when authorizing.');
        } else {
            // Decode response and get tokens
            $responseBody   = json_decode($response['body'], true);
            $token          = $responseBody['access_token'];
            $tokenExpiresIn = $responseBody['expires_in'];
            $now            = new \DateTime();
            $tokenExpiresAt = date('Y-m-d H:i:s', $now->add(new \DateInterval('PT' . $tokenExpiresIn . 'S'))->getTimestamp()); // adds 674165 secs
            $refreshToken   = $responseBody['refresh_token'];

            update_option(OPD_PREFIX . 'api_token',            $token);
            update_option(OPD_PREFIX . 'api_refresh_token',    $refreshToken);
            update_option(OPD_PREFIX . 'api_token_expires_at', $tokenExpiresAt);
        }

        // Redirect back to the dashboard index page
        wp_redirect(admin_url() . 'admin.php?page=op-suite');
        die();
    }

    /**
     * Disconnect the SL connection
     *
     * @return mixed
     */
    public function disconnect()
    {
        if (current_user_can('administrator')) {
            // Clear out options
            delete_option(OPD_PREFIX . 'api_token');
            delete_option(OPD_PREFIX . 'client_options');
            delete_option(OPD_PREFIX . 'refresh_token');

            // And also clear out cache
            clear_all_cache();
            delete_site_transient('update_core');
            delete_site_transient('update_plugins');
            delete_site_transient('update_themes');

            wp_redirect(admin_url('admin.php?page=op-suite'));
            die();
        }

        return true;
    }

    /**
     * Display specific error page
     *
     * @param $code
     */
    public function displayError($code)
    {
        $redirect = admin_url('admin.php?page=op-dashboard-error&opd-error='.$code);

        wp_redirect($redirect);
        die();
    }
}
