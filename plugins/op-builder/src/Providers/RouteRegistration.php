<?php

namespace OPBuilder\Providers;

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
        // Only if we have the OP dashboard plugin activated
        if (class_exists(Route::class)) {
            // All the routes
            add_action('rest_api_init', [$this, 'registerApiRoutes']);
            add_action('wp_loaded',     [$this, 'registerAdminRoutes']);
            add_action('wp_loaded',     [$this, 'registerWebRoutes']);

            // Also some ajax routes
            $this->registerAjaxRoutes();
        }
    }

    /**
     * Include API route definitions
     *
     * @return void
     */
    public function registerApiRoutes()
    {
        require OP3_PATH . '/routes/api.php';
    }

    /**
     * Include web route definitions
     *
     * @return void
     */
    public function registerWebRoutes()
    {
        require OP3_PATH . '/routes/web.php';
    }

    /**
     * Include admin route definitions
     *
     * @return void
     */
    public function registerAdminRoutes()
    {
        require OP3_PATH . '/routes/admin.php';
    }

    /**
     * All ajax routes
     *
     * @return void
     */
    public function registerAjaxRoutes()
    {
        require OP3_PATH.'/routes/ajax.php';
    }
}
