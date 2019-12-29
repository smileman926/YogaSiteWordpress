<?php
if ( ! defined('ABSPATH')) {
    exit;
}

// Fetch all integration and connections
$integrations = OPDashboard\get_available_providers();
?>

<div id="opd-dashboard">
    <?php foreach ($integrations as $integration) : ?>
        <?php if ($_REQUEST['provider'] === $integration->providerId()) : ?>
            <?php OPDashboard\partial('integrations/partials/integration_connection', ['integration' => $integration]) ?>
        <?php endif ?>
    <?php endforeach; ?>
</div>
