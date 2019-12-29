<?php

namespace OPDashboard\Http;

use function OPDashboard\clear_all_cache;
use function OPDashboard\view;
use OptimizePress\Integrations\Storage\IntegrationWpRepository;

class IntegrationsController extends Controller
{
    /**
     * Display list of integrations
     *
     * @return void
     */
    public static function index()
    {
        view('integrations/index');
    }

    /**
     * Display form for creating integration
     * - triggered over AJAX
     *
     * @return void
     */
    public static function create()
    {
        view('integrations/create');
        wp_die();
    }

    /**
     * Display form for editing integration
     *
     * @return void
     */
    public static function edit()
    {
        view('integrations/edit');
        wp_die();
    }

    /**
     * Run integration authorization
     *
     * @return void
     */
    public static function authorizeSL()
    {
        // Setup data
        $params   = $_GET;
        $provider = $params['provider'];

        // Find the integration
        $repo        = new IntegrationWpRepository;
        $integration = $repo->findByProviderOrCreate($provider);

        // Now lets update the connection fields
        $integration = $repo->updateConnectionFields($integration->uid, $params);

        // Try to ping
        if ($integration->ping()) {
            view('integrations/authorization_success');
        } else {
            view('integrations/authorization_error');
        }
    }

    /**
     * Disconnect provider
     * Deletes the connection from the database
     *
     * @return void
     */
    public static function disconnect()
    {
        $provider = $_POST['provider'];

        // Find the integration
        $repo        = new IntegrationWpRepository;
        $integration = $repo->findByProviderOrCreate($provider);

        // Disconnect it
        $repo->destroy($integration->uid);

        // clear all cache
        clear_all_cache();

        wp_send_json(['success' => true, 'message' => 'Integration disconnected.']);
        wp_die();
    }
}
