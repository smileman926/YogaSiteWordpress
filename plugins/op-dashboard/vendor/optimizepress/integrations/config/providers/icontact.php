<?php

return [
    'key'      => 'icontact',
    'title'    => 'iContact',
    'service'  => OptimizePress\Integrations\Services\Integrations\IcontactIntegration::class,
    'provider' => OptimizePress\Integrations\Services\Providers\IcontactProvider::class,
    'thumb'    => 'img/icons/integration-icontact.png',
    'enabled'  => true,
    'type'     => 'default',
    'global'   => false,
    'list_map' => [
        'listId'      => 'id',
        'name'        => 'name',
        'description' => 'description',
    ],
    'connection' => [
        'fields'  => [
            'api_key'     => ['label' => 'API Key'],
            'api_secret'  => ['label' => 'API Secret'],
            'username'    => ['label' => 'Username'],
        ],
    ],
    'connection_requirements' => 'list',
    'has_lead_options'        => false,
    'service_url'             => 'https://app.icontact.com/icp/core/registerapp',
    'has_gdpr'                => true,
    'gdpr_tag_source'         => 'fields',
    'gdpr_notes'              => 'fields',
    'gdpr_label'              => 'Custom Field'
];
