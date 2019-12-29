<?php

use function OPDashboard\oauth_callback_url;

if ( ! defined('ABSPATH')) {
    exit;
}

// Check if we are editing the integration
$isEditPage = (isset($_REQUEST['action']) && $_REQUEST['action'] === 'opd_editIntegration');

if ('gotowebinar' == $integration->provider->id) {
    $clientIdText = __('Consumer Key', 'opd');
    $clientSecretText = __('Consumer Secret', 'opd');
} else {
    $clientIdText = __('Client ID', 'opd');
    $clientSecretText = __('Client Secret', 'opd');
}

/** @var OptimizePress\Integrations\Integration $integration */
?>

<div class="opd-integration-connect">
    <?php if (! $integration->isConnected()) : ?>
        <a href="#" class="opd-integration-connect-choose opd-integration-enter-oauth-credentials-btn ops-button ops-button-success">
            <?php _e('Enter Credentials', 'opdash'); ?>
        </a>
    <?php endif; ?>
</div>

<div class="opd-integration-enter-oauth-credentials-form ops-form" data-action-url="<?php echo \OPDashboard\opd_api_url('integrations') ?>">
    <input type="hidden" name="opd_provider" value="<?php echo $integration->provider->id ?>">
    <input type="hidden" name="_wpnonce" value="<?php echo wp_create_nonce('wp_rest'); ?>">

    <p style="font-size: 11px;">To get your API credentials, please go to <a href="https://goto-developer.logmeininc.com/user/me/apps" target="_blank">GTW Developer Portal</a> and create your application.</p>

    <div class="ops-form-group">
        <label for="connection-field-<?php echo $integration->provider->id ?>-client_id"><?php echo $clientIdText ?></label>
        <input class="opd-popup-input ops-form-control" type="text" name="client_id" value="<?php echo $integration->getConnectionValue('client_id') ?>" id="connection-field-<?php echo $integration->provider->id ?>-client_id">
    </div>

    <div class="ops-form-group">
        <label for="connection-field-<?php echo $integration->provider->id ?>-client_secret"><?php echo $clientSecretText ?></label>
        <input class="opd-popup-input ops-form-control" type="text" name="client_secret" value="<?php echo $integration->getConnectionValue('client_secret') ?>" id="connection-field-<?php echo $integration->provider->id ?>-client_secret">
    </div>

    <div class="ops-form-group">
        <label for="connection-field-<?php echo $integration->provider->id ?>-callback_url"><?php _e('Callback URL', 'opd') ?></label>
        <input class="opd-popup-input ops-form-control" type="text" name="callback_url" value="<?php echo oauth_callback_url($integration->provider->id) ?>" id="connection-field-<?php echo $integration->provider->id ?>-callback_url" readonly onclick="this.setSelectionRange(0, this.value.length)">
        <p style="margin-top: -12px;font-size: 11px;">Copy this callback URL to your application under Application URL.</p>
    </div>

    <div class="oauth-connection-actions <?php echo $integration->isConnected() ? 'opd-connection-actions-for-connected' : '' ?> <?php echo $isEditPage ? 'opd-connection-edit-actions-for-connected' : '' ?>">
        <a href="#" class="ops-button opd-integration-enter-oauth-credentials-form-submit-btn"><?php _e('Save Credentials', 'opdash'); ?></a>
        <a href="<?php echo OPDashboard\integration_authorize_oauth_url($integration) ?>" target="_blank" class="opd-integration-connect-choose ops-button ops-button-success"><?php _e('Connect', 'opdash'); ?></a>
    </div>
</div>
