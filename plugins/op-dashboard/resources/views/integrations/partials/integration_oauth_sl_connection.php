<?php
if ( ! defined('ABSPATH')) {
    exit;
}
/** @var OptimizePress\Integrations\Integration $integration */
?>

<div class="opd-integration-connect">
    <?php if (! $integration->isConnected()) : ?>
        <a href="<?php echo OPDashboard\integration_authorize_url($integration) ?>" target="_blank" class="opd-integration-connect-choose ops-button ops-button-success"><?php _e('Connect', 'opdash'); ?></a>
    <?php else : ?>
        <span class="opd-integration-connect-choose ops-button ops-button-success"><?php _e('Connected', 'opdash'); ?></span>
    <?php endif; ?>
</div>
