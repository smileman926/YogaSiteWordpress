<?php

namespace OptimizePress\Integrations;

use OptimizePress\Integrations\Storage\IntegrationEloquentRepository;
use OptimizePress\Support\Collection;
use OptimizePress\Integrations\Services\ProviderRepository;
use OptimizePress\Integrations\Services\UidGenerator;

/**
 * Return the OAuth connect URL for a OAuth provider
 *
 * @param  string $provider
 * @return string
 */
function get_oauth_connect_url($provider)
{
    $repo = new ProviderRepository;
    $integration = $repo->findByProvider($provider);

    return $integration ? $integration->oAuthConnectUrl() : null;
}

/**
 * Return all available providers
 *
 * @return Collection
 */
function get_available_providers()
{
    $repo = new ProviderRepository;

    return $repo->getAvailable();
}

/**
 * Return integration provider by the key
 *
 * @param  string $key
 * @return mixed
 */
function get_provider($key)
{
    $repo = new ProviderRepository;

    return $repo->find($key);
}

/**
 * Encode a value to an UID
 *
 * @param  string $value
 * @return string
 */
function uid_encode($value)
{
    $service = new UidGenerator;

    return $service->encode($value);
}

/**
 * Encode a value to an UID
 *
 * @param  string $value
 * @return string
 */
function uid_decode($value)
{
    $service = new UidGenerator;

    return $service->decode($value);
}

/**
 * Find the OPSL connection
 *
 * @return mixed
 */
function get_opsl_integration()
{
    if (auth()->check()) {
        $repo = new IntegrationEloquentRepository;
        $integration = $repo->findByProviderOrCreate('optimizepress', auth()->user()->id);

        return $integration;
    }
}

/**
 * Check if it's required to authorize with the OPSL
 *
 * @return bool
 */
function should_authorize_with_opsl()
{
    $shouldAuthorize = false;

    // Check if SL is enabled and if it's already authorized
    if (config('optimizepress-integrations.use_optimizepress_sl')) {
        $integration = get_opsl_integration();

        $shouldAuthorize = $integration ? ! $integration->isConnected() : true;
    }

    return $shouldAuthorize;
}

/**
 * Return all OAuth routes
 *
 * @param null $attributes
 */
function oauth_routes($attributes = null)
{
    /*$attributes = $attributes ?: ['middleware' => ['web']];

    app('router')->group($attributes, function ($router) {
        $router->post('/broadcasting/auth', BroadcastController::class.'@authenticate');
    });

    $this->loadRoutesFrom(__DIR__.'/../../routes/web.php');*/
}

/**
 * Load SL Routes
 */
function oauth_sl_routes()
{
//    $this->loadRoutesFrom(__DIR__.'/../../routes/sl.php');
}
