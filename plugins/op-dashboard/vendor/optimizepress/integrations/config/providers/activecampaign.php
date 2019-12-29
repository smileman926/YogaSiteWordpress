<?php

return [
    'key'      => 'activecampaign',
    'title'    => 'ActiveCampaign',
    'service'  => OptimizePress\Integrations\Services\Integrations\ActiveCampaignIntegration::class,
    'provider' => OptimizePress\Integrations\Services\Providers\ActiveCampaignProvider::class,
    'thumb'    => 'img/icons/integration-activecampaign.png',
    'enabled'  => true,
    'type'     => 'default',
    'global'   => false,
    'has_tags' => true,
    'connection' => [
        'fields'  => [
            'api_url' => ['label' => 'API URL'],
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
    'gdpr_notes'              => false,
    'list_label'              => 'Using List',
    'has_form_id'             => true,
    'list_copy'               => 'Depending on your integrated service, you can specify to which list, tag, campaign or webhook your data is sent to.<br />If you want to enable double optin for this integration, create a form in your ActiveCampaign account, enable double optin on that form and enter the form id in the field below.'
];
