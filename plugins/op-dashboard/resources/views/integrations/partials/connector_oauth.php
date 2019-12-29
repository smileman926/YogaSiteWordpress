<?php /** @var OptimizePress\Integrations\Integration $integration */ ?>

<div>
    <?php if (! $integration->isConnected()) : ?>
        <a href="<?php echo OPDashboard\integration_authorize_oauth_url($integration) ?>"
           class="js-toggle-integration-connection js-connect-integration-connection badge badge-disconnected"
           data-provider="<?php echo $integration->provider ?>"
        >
            <span class="ops-button ops-button-block ops-button-success hover-text"><?php _e('Connect', 'opdash'); ?></span>
            <span class="ops-button ops-button-block ops-button-danger text"><?php _e('Not Connected', 'opdash'); ?></span>
        </a>
    <?php else : ?>
        <a href="<?php echo admin_url('admin-ajax.php') ?>?action=opd_disconnect_integration"
           class="js-toggle-integration-connection js-disconnect-integration-connection badge badge-<?php echo $integration->isConnected() ? 'connected' : 'disconnected' ?>"
           data-confirm="Are you sure you want to disconnect this integration?"
           data-provider="<?php echo $integration->provider ?>"
        >
            <span class="ops-button ops-button-block ops-button-danger hover-text"><?php _e('Disconnect', 'opdash'); ?></span>
            <span class="ops-button ops-button-block ops-button-success text"><?php _e('Connected', 'opdash'); ?></span>
        </a>
    <?php endif; ?>
</div>

<div>
    <a href="#"
       class="ops-button ops-transparent ops-button-block opd-edit-integration-btn"
       data-provider="<?php echo $integration->provider; ?>"><?php _e('Edit Service', 'opdash'); ?></a>
</div>
