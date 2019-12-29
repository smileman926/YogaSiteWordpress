<?php

namespace OptimizePress\Integrations;

class Integrations
{
    public static function getProviderConfig($provider)
    {
        $config = include(__DIR__.'/../config/providers.php');

        if ($provider) {
            return new IntegrationConfig($config[$provider]);
        }
    }

    public static function routes($attributes = null)
    {
        app('router')->loadRoutesFrom(__DIR__.'/../../routes/web.php');

        $attributes = $attributes ?: [
            'middleware' => config('optimizepress-integrations.middleware.web'),
            'namespace' => 'OptimizePress\Integrations\Http\Controllers'
        ];

        // app('router')->group($attributes, function () {
        //     require(__DIR__.'/../routes/web.php');
        // });
    }

    public static function slRoutes($attributes = null)
    {
        $attributes = $attributes ?: ['middleware' => ['web']];

        // app('router')->group($attributes, function ($router) {
        //
        // });
    }
}
