<?php

return [
    'key'      => 'convertkit',
    'title'    => 'ConvertKit',
    'service'  => OptimizePress\Integrations\Services\Integrations\ConvertKitIntegration::class,
    'provider' => OptimizePress\Integrations\Services\Providers\ConvertKitProvider::class,
    'thumb'    => 'img/icons/integration-convertkit.png',
    'enabled'  => true,
    'type'     => 'default',
    'global'   => false,
    'has_tags' => true,
    'connection' => [
        'fields'  => [
            'api_key'    => ['label' => 'API Key'],
            'api_secret' => ['label' => 'API Secret'],
        ],
    ],
    'list_map' => [
        'id'          => 'id',
        'name'        => 'name',
        'description' => 'description',
    ],
    'connection_requirements' => 'list',
    'has_lead_options'        => false,
    'service_url'             => 'https://api.convertkit.com/v3/',
    'has_gdpr'                => true,
    'gdpr_tag_source'         => 'tags',
    'gdpr_notes'              => 'fields',
    'list_label'              => 'Using Form'
];
