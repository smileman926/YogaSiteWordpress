<?php

namespace OptimizePress\Integrations\Bootstrap;

use Illuminate\Support\ServiceProvider;

/**
 * Initialize the library for Laravel
 */
class LaravelServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application events.
     */
    public function boot()
    {
        $this->publishes([
            __DIR__ . '/../../config/optimizepress-integrations.php' => config_path('optimizepress-integrations.php'),
        ], 'config');

        if (config('optimizepress-integrations.enable_web_routes')) {
            $this->loadRoutesFrom(__DIR__.'/../../routes/sl.php');
            $this->loadRoutesFrom(__DIR__.'/../../routes/web.php');
        }

//        $this->loadMigrationsFrom(__DIR__.'/../../database/migrations');

        $this->loadViewsFrom(__DIR__.'/../../resources/views', 'optimizepress-integrations');
    }

    /**
     * Register the service provider.
     */
    public function register()
    {
        $this->mergeConfigFrom(__DIR__ . '/../../config/optimizepress-integrations.php', 'optimizepress-integrations');
    }
}
