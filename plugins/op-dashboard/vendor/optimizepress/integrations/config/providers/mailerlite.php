<?php

use OptimizePress\Integrations\Services\Integrations\MailchimpApiKeyIntegration;
use OptimizePress\Integrations\Services\Providers\MailchimpProvider;

return [
    'key'      => 'mailerlite',
    'title'    => 'MailerLite',
    'service'  => OptimizePress\Integrations\Services\Integrations\MailerLiteIntegration::class,
    'provider' => OptimizePress\Integrations\Services\Providers\MailerLiteProvider::class,
    'thumb'    => 'img/icons/integration-mailerlite.png',
    'enabled'  => true,
    'type'     => 'default',
    'global'   => false,
    'list_map' => [
        'id'          => 'id',
        'name'        => 'name',
    ],
    'connection' => [
        'fields'  => [
            'api_key'    => ['label' => 'API Key'],
        ],
        'base_uri' => 'https://api.mailerlite.com/api/v2/',
    ],
    'connection_requirements' => 'list',
    'has_lead_options'        => false,
    'service_url'             => 'https://app.mailerlite.com/integrations/api/',
    'has_gdpr'                => true,
    'gdpr_tag_source'         => 'fields',
    'gdpr_notes'              => 'fields',
    'list_label'              => 'Using Group',
    'gdpr_label'              => 'Custom Field'
];
