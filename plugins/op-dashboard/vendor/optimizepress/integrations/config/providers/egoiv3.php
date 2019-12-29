<?php

// E-Goi API v2 integration config

return [
    'key'      => 'egoiv3',
    'title'    => 'E-goi',
    'service'  => OptimizePress\Integrations\Services\Integrations\EgoiIntegrationV3::class,
    'provider' => OptimizePress\Integrations\Services\Providers\EgoiProviderV3::class,
    'thumb'    => 'img/icons/integration-egoi.png',
    'enabled'  => true,
    'type'     => 'default',
    'global'   => false,
    'has_tags' => true,
    'connection' => [
        'fields'  => [
            'api_key'    => ['label' => 'API Key'],
        ],
    ],
    'list_map' => [
        'id'          => 'id',
        'name'        => 'name',
        'description' => 'description',
    ],
    'connection_requirements' => 'list',
    'has_lead_options'        => false,
    'service_url'             => 'https://api.egoiapp.com/',
    'has_gdpr'                => true,
    'gdpr_tag_source'         => 'tags',
    'gdpr_notes'              => 'fields',
    'list_label'              => 'Using List'
];