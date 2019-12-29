<?php

return [
    'key'      => 'aweber',
    'title'    => 'Aweber',
    'service'  => OptimizePress\Integrations\Services\Integrations\AweberIntegration::class,
    'provider' => OptimizePress\Integrations\Services\Providers\AweberProvider::class,
    'thumb'    => 'img/icons/integration-aweber.png',
    'enabled'  => true,
    'type'     => 'oauth',
    'global'   => false,
    'has_tags' => false,
    'list_map' => [
        'id'          => 'id',
        'name'        => 'name',
    ],
    'connection' => [
        'fields'  => [
            'client_id'     => ['label' => 'Client ID'],
            'client_secret' => ['label' => 'Client Secret'],
            'token'         => ['label' => 'Token', 'readonly' => true],
            'refresh_token' => ['label' => 'Refresh token', 'readonly' => true],
            'api_url'       => ['label' => 'API URL', 'readonly' => true],
        ],
        'base_uri'          => 'https://api.aweber.com/1.0',
        'authorization_url' => 'https://auth.aweber.com/oauth2/authorize',
        'access_token_uri'  => 'https://auth.aweber.com/oauth2/token',
    ],
    'connection_requirements' => 'list',
    'has_lead_options'        => false,
    'service_url'             => 'https://labs.aweber.com/apps',
    'has_gdpr'                => true,
    'gdpr_tag_source'         => 'text_input',
    'gdpr_notes'              => false,
];
