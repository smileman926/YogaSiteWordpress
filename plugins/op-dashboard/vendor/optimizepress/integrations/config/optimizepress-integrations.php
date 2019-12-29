<?php

return [

    /**
     * Should we define the Laravel web routes
     */
    'enable_web_routes' => false,

    /**
     * Should we use the OptimizePress SL for authorization
     * Set for each provider you need
     */
    'use_optimizepress_sl' => [
        // 'gotowebinar'  => true,
        // 'infusionsoft' => true,
        // 'mailchimp'    => true,
    ],

    /**
     * URL to the OptimizePress Software and Licensing backend
     */
    'optimizepress_sl_url' => env('OPTIMIZEPRESS_SL_URL', 'https://hub.optimizepress.com/'),

    /**
     * Define storage classes
     *
     * Possible options are:
     * Store in a Laravel Eloquent model: OptimizePress\Integrations\Storage\IntegrationEloquentRepository::class
     * Store in the WordPress database: OptimizePress\Integrations\Storage\IntegrationWpDb::class
     */
    'storage' => [
        'repository' => OptimizePress\Integrations\Storage\IntegrationEloquentRepository::class,
    ],

    /**
     * Which middlewares should be used for API and web routes
     */
    'middleware' => [
        'web' => ['web'],
        'api' => ['api'],
    ],

    /**
     * Customize your views
     */
    'views' => [
        'prefix' => 'optimizepress-integrations',
        'layout' => 'optimizepress-integrations::layout',
    ],

];
