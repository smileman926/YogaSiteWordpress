<?php

return [
    'key'                     => 'empty',
    'title'                   => 'No API Integration',
    'service'                 => OptimizePress\Integrations\Services\Integrations\EmptyIntegration::class,
    'provider'                => OptimizePress\Integrations\Services\Providers\EmptyProvider::class,
    'enabled'                 => true,
    'type'                    => 'empty',
    'global'                  => false,
    'connection_requirements' => null,
    'has_lead_options'        => false,
    'service_url'             => null,
    'has_gdpr'                => false,
    'gdpr_tag_source'         => false,
    'gdpr_notes'              => false,
];
