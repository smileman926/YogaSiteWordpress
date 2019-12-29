<?php
    if (! defined( 'ABSPATH' )) {
        exit;
    }
?>

<div class="ops-white-box ops-box-size-max">
    <h3><?php _e('Advanced settings', 'opdash'); ?></h3>

    <form action="<?php echo admin_url('admin-ajax.php') ?>?action=op_dashboard_update_settings" class="ops-form" data-opd-remote="post">
        <?php wp_nonce_field('opd_update_settings'); ?>
        <input type="hidden" name="opd_settings_section" value="advanced">
        <input type="hidden" name="action" value="opd_update_settings">

        <div class="ops-form-group">
            <label for="">Request Timeout</label>
            <input type="number" placeholder="Request timeout in milliseconds" name="opd_request_timeout" value="<?php echo get_option('opd_request_timeout') ?>" class="ops-form-control">
        </div>

        <div class="ops-form-actions">
            <button class="ops-button" type="submit">Save</button>

            <a href="#" class="ops-button ops-transparent ops-js-clear-cache pull-right" data-url="<?php echo rest_url('opd/v1/clear-cache') ?>" data-confirm="Are you sure?">Clear cache</a>
        </div>
    </form>

</div>
