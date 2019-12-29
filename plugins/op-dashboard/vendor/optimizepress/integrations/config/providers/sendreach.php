<?php

return [
    'key'      => 'sendreach',
    'title'    => 'SendReach',
    'service'  => OptimizePress\Integrations\Services\Integrations\SendReachIntegration::class,
    'provider' => OptimizePress\Integrations\Services\Providers\SendReachProvider::class,
    'thumb'    => 'img/icons/integration-sendreach.png',
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
        'description' => 'description',
    ],
    'connection_requirements' => 'list',
    'service_url' => 'http://dashboard.sendreach.com/customer/index.php/api-keys/index',
    'has_gdpr'                => true,
    'gdpr_tag_source'         => 'fields',
    'gdpr_notes'              => 'fields',
    'gdpr_label'              => 'Custom Field'
];
