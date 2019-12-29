<?php

return [
    'key'      => 'getresponse',
    'title'    => 'Get Response',
    'service'  => OptimizePress\Integrations\Services\Integrations\GetResponseIntegration::class,
    'provider' => OptimizePress\Integrations\Services\Providers\GetResponseProvider::class,
    'thumb'    => 'img/icons/integration-getresponse.png',
    'enabled'  => true,
    'type'     => 'oauth',
    'global'   => false,
    'has_tags' => true,
    'list_map' => [
        'id'          => 'id',
        'name'        => 'name',
        'href'        => 'href',
        'description' => 'description',
    ],
    'connection' => [
        'fields'  => [
            'client_id'     => ['label' => 'Client ID'],
            'client_secret' => ['label' => 'Client Secret'],
            'api_key'       => ['label' => 'API Key'],
            'token'         => ['label' => 'Token', 'readonly' => true],
            'refresh_token' => ['label' => 'Refresh token', 'readonly' => true],
            'api_url'       => ['label' => 'API URL', 'readonly' => true],
        ],
    ],
    'connection_requirements' => 'list',
    'has_lead_options'        => true,
    'service_url'             => 'https://app.getresponse.com/authorizations',
    'has_gdpr'                => true,
    'gdpr_tag_source'         => 'tags',
    'gdpr_notes'              => 'fields',
];
