<?php

use OptimizePress\Integrations\Services\Integrations\KlickTippIntegration;
use OptimizePress\Integrations\Services\Providers\KlickTippProvider;

return [
    'key'      => 'klicktipp',
    'title'    => 'Klick-Tipp',
    'service'  => OptimizePress\Integrations\Services\Integrations\KlickTippIntegration::class,
    'provider' => OptimizePress\Integrations\Services\Providers\KlickTippProvider::class,
    'thumb'    => 'img/icons/integration-klicktipp.png',
    'enabled'  => true,
    'type'     => 'default',
    'global'   => false,
    'has_tags' => true,
    'connection' => [
        'fields'  => [
            'username' => ['label' => 'Username'],
            'password' => ['label' => 'Password'],
        ],
    ],
    'list_map' => [
        'id'          => 'id',
        'name'        => 'name',
        'description' => 'description',
    ],
    'connection_requirements' => 'list',
    'has_lead_options'        => false,
    'has_gdpr'                => true,
    'gdpr_tag_source'         => 'tags',
    'gdpr_notes'              => 'fields',
    'list_label'              => 'Using Campaign'
];
