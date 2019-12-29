<?php

return [
    'key'      => 'emma',
    'title'    => 'Emma',
    'service'  => OptimizePress\Integrations\Services\Integrations\EmmaIntegration::class,
    'provider' => OptimizePress\Integrations\Services\Providers\EmmaProvider::class,
    'thumb'    => 'img/icons/integration-emma.png',
    'enabled'  => true,
    'type'     => 'default',
    'global'   => false,
    'has_tags' => false,
    'connection' => [
        'fields'  => [
            'api_key'    => ['label' => 'API Key'],
            'api_secret' => ['label' => 'API Secret'],
            'app_id'     => ['label' => 'Application ID'],
        ],
    ],
    'list_map' => [
        'id'          => 'id',
        'name'        => 'name',
        'description' => 'description',
    ],
    'connection_requirements' => 'list',
    'has_lead_options'        => false,
    'service_url'             => 'https://app.e2ma.net/app2/billing/settings/?api-key-tab',
    'has_gdpr'                => true,
    'gdpr_tag_source'         => 'fields',
    'gdpr_notes'              => 'fields',
    'gdpr_label'              => 'Custom Field'
];
