<?php

return [
    'key'      => 'campaignrefinery',
    'title'    => 'Campaign Refinery',
    'service'  => OptimizePress\Integrations\Services\Integrations\CampaignRefineryIntegration::class,
    'provider' => OptimizePress\Integrations\Services\Providers\CampaignRefineryProvider::class,
    'thumb'    => 'img/icons/integration-campaignrefinery.png',
    'enabled'  => true,
    'type'     => 'default',
    'global'   => false,
    'has_tags' => true,
    'connection' => [
        'fields'  => [
            'api_key' => ['label' => 'API Key'],
        ],
    ],
    'list_map' => [
        'id'          => 'id',
        'name'        => 'name',
        'description' => 'description',
    ],
    'connection_requirements' => 'list',
    'service_url' => null,
    'has_gdpr'                => true,
    'gdpr_tag_source'         => 'tags',
    'gdpr_notes'              => 'fields',
    'has_goals'               => true,
    'list_label'              => 'Using Form'
];
