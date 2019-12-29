<?php

return [
    'key'      => 'mailchimp',
    'title'    => 'MailChimp',
    'service'  => OptimizePress\Integrations\Services\Integrations\MailchimpOAuthIntegration::class,
    'provider' => OptimizePress\Integrations\Services\Providers\MailchimpProvider::class,
    'thumb'    => 'img/icons/integration-mailchimp.png',
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
            'api_url'       => ['label' => 'API URL', 'readonly' => true],
        ],
        'base_uri'          => 'https://login.mailchimp.com/oauth2/',
        'authorization_url' => 'https://login.mailchimp.com/oauth2/authorize',
        'access_token_uri'  => 'https://login.mailchimp.com/oauth2/token',
    ],
    'connection_requirements' => 'list',
    'has_lead_options'        => false,
    'service_url'             => 'https://admin.mailchimp.com/account/oauth2/',
    'has_gdpr'                => true,
    'gdpr_tag_source'         => 'fields',
    'gdpr_notes'              => false,
    'list_label'              => 'Using Campaign',
    'gdpr_label'              => 'Custom Field',
    'has_double_optin_checkbox' => true,
];
