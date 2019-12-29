<?php

return [
    'key'      => 'optimizepress',
    'title'    => 'OptimizePress',
    'service'  => OptimizePress\Integrations\Services\Integrations\OptimizePressSLIntegration::class,
    'provider' => OptimizePress\Integrations\Services\Providers\OptimizePressSLProvider::class,
    'thumb'    => 'img/icons/integration-optimizepress.png',
    'enabled'  => true,
    'type'     => 'oauth',
    'global'   => false,
    'connection' => [
        'fields'  => [
            'client_id'     => ['label' => 'Client ID', 'readonly' => true],
            'client_secret' => ['label' => 'Client Secret', 'readonly' => true],
            'token'         => ['label' => 'Token', 'readonly' => true],
            'refresh_token' => ['label' => 'Refresh token', 'readonly' => true],
        ],
        'base_uri'          => (getenv('OPTIMIZEPRESS_SL_URL') ?: 'https://hub.optimizepress.com/'),
        'authorization_url' => (getenv('OPTIMIZEPRESS_SL_URL') ?: 'https://hub.optimizepress.com/').'/oauth/authorize',
        'access_token_uri'  => (getenv('OPTIMIZEPRESS_SL_URL') ?: 'https://hub.optimizepress.com/').'/oauth/token',
    ],
];
