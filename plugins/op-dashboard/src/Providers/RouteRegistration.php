<?php

namespace OPDashboard\Providers;

use OPDashboard\Http\OAuthController;
use OPDashboard\Services\Route;

class RouteRegistration
{
    /**
     * Register plugin routes
     *
     * @return void
     */
    public function register()
    {
        add_action('template_redirect', [new OAuthController, 'routes']);
        add_action('wp_loaded',         [$this, 'addAdminRoutes']);
        add_action('wp_loaded',         [$this, "addWebRoutes"]);
        add_action('admin_menu',        [$this, "registerRoutes"]);
        add_action('rest_api_init',     [$this, 'registerApiRoutes']);

        $this->registerAjaxRoutes();
    }

    /**
     * Include admin route definitions
     *
     * @return void
     */
    public function addAdminRoutes()
    {
        require OPD_PATH.'/routes/admin.php';
    }

    /**
     * Include web route definitions
     *
     * @return void
     */
    public function addWebRoutes()
    {
        require OPD_PATH.'/routes/web.php';
    }

    /**
     * Register all added routes and admin pages
     *
     * @return void
     */
    public function registerRoutes()
    {
        Route::registerAdminPages();
    }

    /**
     * Include API route definitions
     *
     * @return void
     */
    public function registerApiRoutes()
    {
        require OPD_PATH.'/routes/api.php';
    }

    /**
     * All ajax routes
     *
     * @return void
     */
    public function registerAjaxRoutes()
    {
        require OPD_PATH.'/routes/ajax.php';
    }
}
