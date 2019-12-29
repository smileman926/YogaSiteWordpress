<?php

namespace OptimizePress\Integrations;

use OptimizePress\Integrations\Services\DataObjectTrait;

/**
 * A connection field for integrations
 * Eg. client_id, api_key, api_secret, etc.
 */
class IntegrationConnectionField
{
    use DataObjectTrait;

    /**
     * @var array
     */
    protected $data = [];

    /**
     * Init
     *
     * @param array $data
     */
    public function __construct($data)
    {
        $this->data = $data;
    }
}
