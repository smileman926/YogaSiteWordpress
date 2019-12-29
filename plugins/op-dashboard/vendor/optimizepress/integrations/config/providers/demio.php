<?php

return [
    'key'      => 'demio',
    'title'    => 'Demio',
    'service'  => OptimizePress\Integrations\Services\Integrations\DemioIntegration::class,
    'provider' => OptimizePress\Integrations\Services\Providers\DemioProvider::class,
    'thumb'    => 'img/icons/integration-demio.png',
    'enabled'  => true,
    'type'     => 'default',
    'global'   => false,
    'connection' => [
        'fields'  => [
            'api_key'    => ['label' => 'API Key'],
            'api_secret' => ['label' => 'API Secret'],
        ],
    ],
    'list_map' => [
        'id'          => 'id',
        'name'        => 'name',
    ],
    'connection_requirements' => 'list',
    'service_url' => 'https://my.demio.com/manage/api-details',
    'has_gdpr'                => false,
    'gdpr_tag_source'         => false,
    'gdpr_notes'              => false,
    'list_label'              => 'Using Event'
];
