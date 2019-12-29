<?php

return [
    'key'                     => 'zapier',
    'title'                   => 'Zapier',
    'service'                 => OptimizePress\Integrations\Services\Integrations\ZapierIntegration::class,
    'provider'                => OptimizePress\Integrations\Services\Providers\ZapierProvider::class,
    'thumb'                   => 'img/icons/integration-zapier.png',
    'enabled'                 => true,
    'type'                    => 'webhook',
    'global'                  => false,
    'connection_requirements' => 'webhook_url',
    'has_lead_options'        => false,
    'has_tags'                => false,
    'has_lists'               => false,
    'connection' => [
        'fields'  => [
            'webhook_url' => ['label' => 'Webhook URL'],
        ],
    ],
    'has_gdpr'                => true,
    'gdpr_tag_source'         => 'fields',
    'gdpr_notes'              => 'fields',
    'gdpr_label'              => 'Custom Field',
    'list_label'              => 'Using Webhook URL',
    'list_copy'               => 'Enter your webhook URL provided by Zapier to send form submission data to their system. Learn more about our <a href="https://docs.optimizepress.com/article/2204-zapier-optimizepress-integration" target="_blank">Zapier integration here</a>',
];
