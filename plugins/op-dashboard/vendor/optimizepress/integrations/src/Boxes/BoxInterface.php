<?php

namespace OptimizePress\Integrations\Boxes;

use OptimizePress\Integrations\Integration;
use OptimizePress\Integrations\LeadOptions;

interface BoxInterface
{
    public function optin($listId, array $data, LeadOptions $leadOptions = null);
    public function setIntegration(Integration $integration);
    public function getIntegration();
    public function getFormInputs($listId);
    public function getLeadOptions();
}
