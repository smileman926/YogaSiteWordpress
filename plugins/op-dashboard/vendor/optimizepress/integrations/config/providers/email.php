<?php

return [
    'key'                     => 'email',
    'title'                   => 'E-Mail',
    'service'                 => OptimizePress\Integrations\Services\Integrations\EmailIntegration::class,
    'provider'                => OptimizePress\Integrations\Services\Providers\EmailProvider::class,
    'thumb'                   => 'img/icons/integration-email.png',
    'enabled'                 => true,
    'type'                    => 'email',
    'global'                  => false,
    'connection_requirements' => 'admin_email',
    'has_lead_options'        => false,
    'has_tags'                => false,
    'has_gdpr'                => false,
    'gdpr_tag_source'         => false,
    'gdpr_notes'              => false,
    'has_admin_email'         => true,
    'list_copy'               => 'Integrate your form to email data to the email address provided below.'
];
