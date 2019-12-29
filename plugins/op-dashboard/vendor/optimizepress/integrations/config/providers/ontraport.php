<?php

return [
    'key'      => 'ontraport',
    'title'    => 'Ontraport',
    'service'  => OptimizePress\Integrations\Services\Integrations\OntraportIntegration::class,
    'provider' => OptimizePress\Integrations\Services\Providers\OntraportProvider::class,
    'thumb'    => 'img/icons/integration-ontraport.png',
    'enabled'  => true,
    'type'     => 'default',
    'global'   => false,
    'has_tags' => true,
    'connection' => [
        'fields'  => [
            'app_id'  => ['label' => 'Application ID'],
            'api_key' => ['label' => 'API Key'],
        ],
    ],
    'list_map' => [
        'id'          => 'id',
        'name'        => 'name',
    ],
    'connection_requirements' => 'list',
    'has_lead_options'        => false,
    'service_url' => 'https://my.demio.com/manage/api-details',
    'has_gdpr'                => true,
    'gdpr_tag_source'         => 'tags',
    'gdpr_notes'              => 'fields',
    'list_label'              => 'Using Campaign'
];
