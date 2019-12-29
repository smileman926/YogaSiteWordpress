<?php

return [
    'key'      => 'zoom',
    'title'    => 'Zoom',
    'service'  => OptimizePress\Integrations\Services\Integrations\ZoomIntegration::class,
    'provider' => OptimizePress\Integrations\Services\Providers\ZoomProvider::class,
    'thumb'    => 'img/icons/integration-zoom.png',
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
        'base_uri'          => 'https://api.zoom.us/v2',
        'authorization_url' => 'https://zoom.us/oauth/authorize',
        'access_token_uri'  => 'https://api.zoom.us/oauth/token',
    ],
    'connection_requirements' => 'list',
    'has_lead_options'        => false,
    'service_url'             => 'https://marketplace.zoom.us',
    'has_gdpr'                => false,
    'gdpr_tag_source'         => false,
    'gdpr_notes'              => false,
    'list_label'              => 'Using Webinar'
];
