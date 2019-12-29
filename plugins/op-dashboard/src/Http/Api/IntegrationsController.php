<?php

namespace OPDashboard\Http\Api;

use function OPDashboard\integration_authorize_oauth_url;
use function OPDashboard\oauth_callback_url;
use OptimizePress\Integrations\Storage\IntegrationWpRepository;
use function OptimizePress\Support\array_get;
use WP_REST_Request;

class IntegrationsController extends Controller
{
    /**
     * Return all the integrations
     *
     * @param WP_REST_Request $request
     * @return array
     */
    public static function index(WP_REST_Request $request)
    {
        $response     = [];
        $integrations = \OPDashboard\get_available_providers();

        // Remove some unnecessary data
        foreach ($integrations as $integration) {
            $response[] = [
                'uid'       => $integration->uid,
                'provider'  => $integration->provider->key,
                'title'     => $integration->title,
                'connected' => $integration->isConnected(),
                'image'     => OPD_URL.'assets/img/providers/integration-'.$integration->provider->key.'.png',
                'type'      => $integration->type,
                'fields' => $integration->getConnectionFields()->toArray(),
            ];
        }

        return $response;
    }

    /**
     * Update or create a non-oauth integration
     *
     * @param WP_REST_Request $request
     * @return \WP_Error|array
     */
    public static function save(WP_REST_Request $request)
    {
        $repository = new IntegrationWpRepository;
        $data       = $request->get_params();
        $config     = include __DIR__ . '/../../../config/integrations.php';
        $provider = $data['opd_provider'];

        // Creating or updating the integration by provider
        $entry                   = $repository->findByProviderOrCreate($data['opd_provider']);
        $directOAuthIntegrations = (array) array_get($config, 'direct_oauth');

        // Removing opd_provider key from data array, as we do not need it in saving connection data
        unset($data['opd_provider'], $data['_wpnonce']);

        // We also need to add a redirect URL to the data
        $data['redirect_uri'] = oauth_callback_url($provider);

        // Update the integration data
        $entry = $repository->updateConnectionFields($entry->uid, $data);

        // Set SL auth
        if (method_exists($entry, 'setSLAuth') && in_array($entry->provider->key, $directOAuthIntegrations, true)) {
            $entry->setSLAuth(false);
        } elseif ($entry->type === 'oauth') {
            $entry->setSLAuth(true);
        } else {
            $entry->setSLAuth(false);
        }

        // Also try pinging the service to check if the connection is active
        $ping = $entry->ping();

        if ($ping) {
            if ($entry->type !== 'oauth') {
                return ['success' => true, 'message' => 'Saved and connected.'];
            } elseif ($entry->authorizesThroughSl()) {
                return ['success' => true, 'message' => 'Saved and connected.'];
            } else {
                return ['success' => true, 'message' => 'Credentials saved. You can connect now.', 'authorization_url' => integration_authorize_oauth_url($entry)];
            }
        } else {
            if ($entry->authorizesThroughSl() || $entry->type !== 'oauth') {
                return new \WP_Error('invalid_credentials', 'Please check your credentials',  ['status' => 400, 'message' => 'Please check your credentials']);
            } else {
                return ['success' => true, 'message' => 'Credentials saved. You can try connecting now.', 'authorization_url' => integration_authorize_oauth_url($entry)];
            }
        }
    }

    /**
     * Return all lists for an integration
     *
     * @param WP_REST_Request $request
     * @return array
     */
    public static function lists(WP_REST_Request $request)
    {
        $repository = new IntegrationWpRepository;

        // First lets find the integration
        $integration = $repository->findByUid($request->get_param('uid'));

        // Then we try to fetch the lists
        $lists = $integration->getLists();

        return $lists->toArray();
    }
}
