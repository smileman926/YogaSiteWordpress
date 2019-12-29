<?php

namespace OptimizePress\Integrations\Boxes;

use OptimizePress\Integrations\Integration;
use OptimizePress\Integrations\LeadOptions;
use OptimizePress\Support\Collection;

class Box implements BoxInterface
{
    /**
     * @var Integration
     */
    protected $integration;

    /**
     * @var LeadOptions
     */
    protected $leadOptions;

    /**
     * Optin to provider
     *
     * @param  $listId
     * @param  array $data
     * @param  LeadOptions|null $leadOptions
     * @return mixed
     */
    public function optin($listId, array $data, LeadOptions $leadOptions = null)
    {
        return $this->getIntegration()->optin($listId, $data, $this->getLeadOptions());
    }

    /**
     * Bind integration service to optin box
     *
     * @param  Integration $integration
     * @return mixed
     */
    public function setIntegration(Integration $integration)
    {
        return $this->integration = $integration;
    }

    /**
     * Return bound integration to optin box
     *
     * @return Integration
     */
    public function getIntegration()
    {
        return $this->integration;
    }

    /**
     * Get input fields for optin box
     *
     * @param  $listId
     * @return Collection
     */
    public function getFormInputs($listId)
    {
        return $this->getIntegration()->getFields($listId);
    }

    /**
     * Set lead options for this optin box
     *
     * @param  LeadOptions $leadOptions
     * @return mixed
     */
    public function setLeadOptions(LeadOptions $leadOptions)
    {
        return $this->leadOptions = $leadOptions;
    }

    /**
     * Get lead options for this optin box
     *
     * @return LeadOptions
     */
    public function getLeadOptions()
    {
        return $this->leadOptions;
    }
}
