<?php

return [
    'key'      => 'mailchimp_apikey',
    'title'    => 'MailChimp API Key',
    'service'  => OptimizePress\Integrations\Services\Integrations\MailchimpApiKeyIntegration::class,
    'provider' => OptimizePress\Integrations\Services\Providers\MailchimpProvider::class,
    'thumb'    => 'img/icons/integration-mailchimp.png',
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
    ],
    'connection_requirements' => 'list',
    'has_lead_options'        => false,
    'service_url'             => 'https://admin.mailchimp.com/account/api/',
    'has_gdpr'                => true,
    'gdpr_tag_source'         => 'fields',
    'gdpr_notes'              => false,
    'list_label'              => 'Using Campaign',
    'gdpr_label'              => 'Custom Field',
    'has_double_optin_checkbox' => true,
];
