<?php

namespace OptimizePress\Integrations;

use OptimizePress\Integrations\Services\Contracts\BaseProvider;
use OptimizePress\Integrations\Services\DataObjectTrait;
use OptimizePress\Support\Collection;

/**
 * Integration list item
 */
class IntegrationList
{
    use DataObjectTrait;

    /**
     * @var array
     */
    protected $data;

    /**
     * Init new integration list
     *
     * @param array|null $data
     */
    public function __construct(array $data = null)
    {
        $this->data = $data;
    }

    /**
     * Return fields for this list
     *
     * @return Collection
     */
    public function getFields()
    {
        return $this->integration->getFields($this->data['id']);
    }

    /**
     * Return tags for this list
     *
     * @return Collection
     */
    public function getTags()
    {
        return $this->integration->getTags($this->data['id']);
    }

    /**
     * Return list provider
     *
     * @return BaseProvider
     */
    public function getProvider()
    {
        return $this->integration->getProvider();
    }

    /**
     * Return list provider name
     *
     * @return string
     */
    public function getProviderName()
    {
        return $this->integration->getProviderName();
    }

    /**
     * Add parent integration to the list
     *
     * @param  mixed $integration
     * @return void
     */
    public function setIntegration($integration)
    {
        $this->integration = $integration;
    }
}
