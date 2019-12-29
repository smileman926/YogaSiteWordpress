<?php

return [
    'key'      => 'sendlane',
    'title'    => 'Sendlane',
    'service'  => OptimizePress\Integrations\Services\Integrations\SendlaneIntegration::class,
    'provider' => OptimizePress\Integrations\Services\Providers\SendlaneProvider::class,
    'thumb'    => 'img/icons/integration-sendlane.png',
    'enabled'  => true,
    'type'     => 'default',
    'global'   => false,
    'has_tags' => true,
    'connection' => [
        'fields'  => [
            'api_url'    => ['label' => 'API URL'],
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
    'service_url' => 'https://optimizepresstest.sendlane.com/account/profile',
    'has_gdpr'                => true,
    'gdpr_tag_source'         => 'tags',
    'gdpr_notes'              => false,
];
