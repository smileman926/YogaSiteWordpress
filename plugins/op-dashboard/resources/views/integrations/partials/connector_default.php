<?php /** @var OptimizePress\Integrations\Integration $integration */ ?>

<div>
    <?php if (! $integration->isConnected()) : ?>
        <div class="js-toggle-integration-oauth-connection badge-<?php echo $integration->isConnected() ? 'connected' : 'disconnected' ?>"><?php _e('Not Connected', 'opdash'); ?></div>
    <?php else : ?>
        <a href="<?php echo admin_url('admin-ajax.php') ?>?action=opd_disconnect_integration"
           class="js-disconnect-integration-connection badge-connected"
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
