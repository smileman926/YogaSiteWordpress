<?php

namespace OptimizePress\Integrations\Services\Integrations;

use OptimizePress\Integrations\Services\Contracts\IntegrationServiceWebhookInterface;
use OptimizePress\Integrations\Services\Contracts\BaseWebhookIntegration;

/**
 * Integration with any webhook capable service
 * It defaults to Webhook integrations setup
 */
class WebhookIntegration extends BaseWebhookIntegration implements IntegrationServiceWebhookInterface
{
    // Empty
}
