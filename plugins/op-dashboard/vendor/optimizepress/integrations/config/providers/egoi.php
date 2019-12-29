<?php

return [
    'key'      => 'egoi',
    'title'    => 'E-goi',
    'service'  => OptimizePress\Integrations\Services\Integrations\EgoiIntegration::class,
    'provider' => OptimizePress\Integrations\Services\Providers\EgoiProvider::class,
    'thumb'    => 'img/icons/integration-egoi.png',
    'enabled'  => true,
    'type'     => 'default',
    'global'   => false,
    'has_tags' => true,
    'connection' => [
        'fields'  => [
            'api_key'    => ['label' => 'API Key'],
        ],
    ],
    'list_map' => [
        'id' => 'id',
        'name' => 'name',
        'extra_fields' => 'extra_fields',
    ],
    'connection_requirements' => 'list',
    'has_lead_options' => false,
    'service_url' => 'https://api.e-goi.com/v2/rest.php',
    'has_gdpr' => true,
    'gdpr_tag_source' => 'tags',
    'gdpr_notes' => 'fields',
    'list_label' => 'Using List',
    'has_double_optin_checkbox' => true,
    'list_copy'               => 'Depending on your integrated service, you can specify to which list, tag, campaign or webhook your data is sent to.<br />If you want to enable double optin for this integration, edit a form in your Egoi account, enable double optin on that form and select that you want double optin below.'
];
