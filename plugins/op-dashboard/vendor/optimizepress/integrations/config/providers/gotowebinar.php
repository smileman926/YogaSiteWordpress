<?php

return [
    'key'      => 'gotowebinar',
    'title'    => 'GoToWebinar',
    'service'  => OptimizePress\Integrations\Services\Integrations\GoToWebinarIntegration::class,
    'provider' => OptimizePress\Integrations\Services\Providers\GoToWebinarProvider::class,
    'thumb'    => 'img/icons/integration-gotowebinar.png',
    'enabled'  => true,
    'type'     => 'oauth',
    'global'   => false,
    'has_tags' => false,
    'list_map' => [
        'id'          => 'id',
        'name'        => 'name',
        'description' => 'description',
        'url'         => 'url',
    ],
    'connection' => [
        'fields'  => [
            'client_id'     => ['label' => 'Consumer ID'],
            'client_secret' => ['label' => 'Consumer Secret'],
            'token'         => ['label' => 'Token', 'readonly' => true],
            'refresh_token' => ['label' => 'Refresh token', 'readonly' => true],
            'api_url'       => ['label' => 'API URL', 'readonly' => true],
        ],
    ],
    'connection_requirements' => 'list',
    'has_lead_options'        => false,
    'service_url'             => 'https://goto-developer.logmeininc.com/user/me/apps',
    'has_gdpr'                => false,
    'gdpr_tag_source'         => false,
    'gdpr_notes'              => false,
    'list_label'              => 'Using Webinar'
];
