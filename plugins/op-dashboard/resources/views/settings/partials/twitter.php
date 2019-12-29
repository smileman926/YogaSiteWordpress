<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
?>

<div class="ops-white-box ops-box-size-max">
    <h3><?php _e('Twitter Integration', 'opdash'); ?></h3>
    <p><?php _e('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci animi, est nam nesciunt omnis.', 'opdash'); ?></p>

    <form action="<?php echo admin_url('admin-ajax.php') ?>?action=op_dashboard_update_settings" class="ops-form" data-opd-remote="post">
        <?php wp_nonce_field('opd_update_settings'); ?>
        <input type="hidden" name="opd_settings_section" value="twitter">
        <input type="hidden" name="action" value="opd_update_settings">

        <div class="ops-form-group">
            <label for="">Twitter Consumer Key</label>
            <input type="text" placeholder="Enter your Twitter consumer key" name="opd_twitter_consumer_key" value="<?php echo get_option('opd_twitter_consumer_key') ?>" class="ops-form-control">
        </div>

        <div class="ops-form-actions">
            <button class="ops-button" type="submit">Save</button>
        </div>
    </form>
</div>
