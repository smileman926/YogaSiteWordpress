<?php
if ( ! defined('ABSPATH')) {
    exit;
}
/** @var OptimizePress\Integrations\Integration $integration */
?>

<div class="opd-integration-connect">
    <?php if (! $integration->isConnected()) : ?>
        <a href="#" class="opd-integration-connect-choose opd-integration-enter-credentials-btn ops-button ops-button-success">
            <?php _e('Enter Credentials', 'opdash'); ?>
        </a>
    <?php endif; ?>
</div>

<form class="opd-integration-enter-credentials-form ops-form" method="post" action="" data-action-url="<?php echo \OPDashboard\opd_api_url('integrations') ?>">
    <input type="hidden" name="opd_provider" value="<?php echo $integration->provider->id ?>">
    <input type="hidden" name="_wpnonce" value="<?php echo wp_create_nonce('wp_rest'); ?>">

    <?php foreach ($integration->getConnectionFields() as $field) : ?>
        <div class="ops-form-group">
            <label for="connection-field-<?php echo $integration->provider->id ?>-<?php echo $field->id ?>"><?php echo $field->label ?></label>
            <input class="opd-popup-input ops-form-control" type="<?php echo $field->id === 'password' ? 'password' : 'text' ?>" name="<?php echo $field->id ?>" value="<?php echo $field->value ?>" id="connection-field-<?php echo $integration->provider->id ?>-<?php echo $field->id ?>" required>
        </div>
    <?php endforeach; ?>

    <button type="submit" class="ops-button opd-integration-enter-credentials-form-submit-btn"><?php _e('Add New Integration', 'opdash'); ?></button>
<!--    <a href="#" class="ops-button opd-integration-enter-credentials-form-submit-btn">--><?php //_e('Add New Integration', 'opdash'); ?><!--</a>-->
</form>
