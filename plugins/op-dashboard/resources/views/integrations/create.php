<?php
    if ( ! defined('ABSPATH')) {
        exit;
    }

    // Fetch all integration and connections
    $integrations          = OPDashboard\get_available_providers();
    $connectedIntegrations = OPDashboard\get_connected_integrations();
?>

<div class="opd-dashboard-integrations-list d-flex flex-wrap">
    <?php foreach ($integrations as $integration) : ?>
        <?php if (! $integration->isConnected() && $integration->type !== 'webhook') : ?>
            <?php OPDashboard\partial('integrations/partials/integration_connection', ['integration' => $integration]) ?>
        <?php endif; ?>
    <?php endforeach; ?>
</div>
