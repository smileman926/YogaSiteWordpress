<?php

namespace OptimizePress\Integrations\Services\Integrations;

use OptimizePress\Integrations\OptinResult;
use OptimizePress\Integrations\OptinSuccessResult;
use OptimizePress\Integrations\Services\Contracts\BaseIntegration;

use OptimizePress\Integrations\OptinData;
use OptimizePress\Integrations\Integration;
use OptimizePress\Integrations\LeadOptions;

/**
 * Integration with Emma
 */
class EmptyIntegration extends BaseIntegration
{
    /**
     * Init dependencies and service
     *
     * @param Integration $integration
     */
    public function __construct(Integration $integration)
    {
        // Do nothing with integration
    }

    /**
     * Optin to email service
     *
     * @param  OptinData   $optinData
     * @param  LeadOptions $leadOptions
     * @return OptinResult
     */
    public function optin(OptinData $optinData, LeadOptions $leadOptions = null)
    {
        return $this->optinSuccessResult();
    }
}
