<?php

return [
    'key'           => 'infusionsoft',
    'title'         => 'Infusionsoft',
    'service'       => OptimizePress\Integrations\Services\Integrations\InfusionsoftIntegration::class,
    'provider'      => OptimizePress\Integrations\Services\Providers\InfusionsoftProvider::class,
    'thumb'         => 'img/icons/integration-infusionsoft.png',
    'enabled'       => true,
    'type'          => 'oauth',
    'global'        => false,
    'has_tags'      => true,
    'list_map' => [
        'id'   => 'id',
        'name' => 'name',
    ],
    'connection' => [
        'fields'  => [
            'client_id'        => ['label' => 'Client ID'],
            'client_secret'    => ['label' => 'Client Secret'],
            'token'            => ['label' => 'Token', 'readonly' => true],
            'refresh_token'    => ['label' => 'Refresh token', 'readonly' => true],
            'token_expires_at' => ['label' => 'Token Expires At', 'readonly' => true],
            'token_data'       => ['label' => 'Token Data', 'readonly' => true],
        ],
        'client_id'         => 'gwgs8xtbzwnqs3zpzyw5yfv7',
        'client_secret'     => 'qc2Dw7evSf',
        'authorization_url' => 'https://signin.infusionsoft.com/app/oauth/authorize',
        'callback_url'      => '/op3/integrations/callback/infusionsoft',
    ],
    'connection_requirements' => 'list_or_tag',
    'has_lead_options'        => false,
    'service_url'             => 'https://keys.developer.infusionsoft.com/apps/myapps',
    'has_gdpr'                => true,
    'gdpr_tag_source'         => 'tags',
    'gdpr_notes'              => false,
    'list_label'              => 'Use fields from this form',
    'tag_label'               => 'Apply Tag',
    'list_copy'               => 'Integrate your form with Infusionsoft.  Choose a tag to apply when this subscriber is added.  You can also use the fields from a form, but we will not submit the data through this form.  <a href="https://docs.optimizepress.com/article/2213-infusionsoft-integration" target="_blank">Read our Infusionsoft tutorial here</a>'
];
