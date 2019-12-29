<?php

use OptimizePress\Integrations\Services\Integrations\ConstantContactIntegration;
use OptimizePress\Integrations\Services\Providers\ConstantContactProvider;

return [
    'key'      => 'constantcontact',
    'title'    => 'Constant Contact',
    'service'  => OptimizePress\Integrations\Services\Integrations\ConstantContactIntegration::class,
    'provider' => OptimizePress\Integrations\Services\Providers\ConstantContactProvider::class,
    'thumb'    => 'img/icons/integration-constant-contact.png',
    'enabled'  => true,
    'type'     => 'oauth',
    'global'   => false,
    'has_tags' => false,
    'list_map' => [
        'id'          => 'id',
        'name'        => 'name',
    ],
    'connection' => [
        'fields'  => [
            'client_id'     => ['label' => 'Client ID'],
            'client_secret' => ['label' => 'Client Secret'],
            'token'         => ['label' => 'Token', 'readonly' => true],
            'refresh_token' => ['label' => 'Refresh token', 'readonly' => true],
        ],
        'base_uri'          => 'https://api.cc.email/v3/',
        'authorization_url' => 'https://api.cc.email/v3/idfed',
        'access_token_uri'  => 'https://idfed.constantcontact.com/as/token.oauth2',
        'scope'             => 'contact_data+campaign_data',
    ],
    'connection_requirements' => 'list_or_tag',
    'has_lead_options'        => true,
    'service_url'             => 'https://app.constantcontact.com/pages/dma/portal/#myapps',
    'has_gdpr'                => true,
    'gdpr_tag_source'         => 'fields',
    'gdpr_notes'              => 'fields',
    'list_label'              => 'Using Campaign',
    'gdpr_label'              => 'Custom Field'
];
