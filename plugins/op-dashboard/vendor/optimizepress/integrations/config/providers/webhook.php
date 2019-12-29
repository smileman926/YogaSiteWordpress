<?php

return [
    'key'                     => 'webhook',
    'title'                   => 'Webhook',
    'service'                 => OptimizePress\Integrations\Services\Integrations\WebhookIntegration::class,
    'provider'                => OptimizePress\Integrations\Services\Providers\WebhookProvider::class,
    'thumb'                   => 'img/icons/integration-webhook.png',
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
];
