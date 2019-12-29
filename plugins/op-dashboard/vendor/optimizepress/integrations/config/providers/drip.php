<?php

return [
    'key'      => 'drip',
    'title'    => 'Drip',
    'service'  => OptimizePress\Integrations\Services\Integrations\DripIntegration::class,
    'provider' => OptimizePress\Integrations\Services\Providers\DripProvider::class,
    'thumb'    => 'img/icons/integration-drip.png',
    'enabled'  => true,
    'type'     => 'oauth',
    'global'   => false,
    'has_tags' => true,
    'list_map' => [
        'id'          => 'id',
        'name'        => 'name',
    ],
    'connection' => [
        'fields'  => [
            'client_id'     => ['label' => 'Client ID'],
            'client_secret' => ['label' => 'Client Secret'],
            'token'         => ['label' => 'Token', 'readonly' => true],
            'api_url'       => ['label' => 'API URL', 'readonly' => true],
            'app_id'        => ['label' => 'Application ID', 'readonly' => true],
        ],
        'base_uri'          => 'https://api.getdrip.com/v2/',
        'authorization_url' => 'https://www.getdrip.com/oauth/authorize/',
        'access_token_uri'  => 'https://www.getdrip.com/oauth/token/',
    ],
    'connection_requirements' => 'list_or_tag',
    'has_lead_options'        => true,
    'service_url'             => 'https://www.getdrip.com/user/applications',
    'has_gdpr'                => true,
    'gdpr_tag_source'         => 'tags',
    'gdpr_notes'              => 'fields',
    'list_label'              => 'Using Campaign'
];
