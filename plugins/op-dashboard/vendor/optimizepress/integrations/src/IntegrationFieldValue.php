<?php

namespace OptimizePress\Integrations;

use OptimizePress\Integrations\Services\DataObjectTrait;

/**
 * Integration field item
 */
class IntegrationFieldValue
{
    use DataObjectTrait;

    /**
     * Data describing the field
     *
     * @var array
     */
    protected $data;

    /**
     * Init field object
     *
     * @param array $data
     */
    public function __construct(array $data)
    {
        $this->data = $data;
    }
}
