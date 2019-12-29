<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
?>

<div class="ops-white-box ops-box-size-max">

    <h3><?php _e('Google ReCaptcha v3', 'opdash'); ?></h3>

    <form action="<?php echo admin_url('admin-ajax.php') ?>?action=op_dashboard_update_settings" class="ops-form" data-opd-remote="post">
        <?php wp_nonce_field('opd_update_settings'); ?>
        <input type="hidden" name="opd_settings_section" value="recaptcha">
        <input type="hidden" name="action" value="opd_update_settings">

        <p>
            <?php _e('Sign-up for <b><a href="https://www.google.com/recaptcha/" target="_blank">Google ReCaptcha v3</a></b> and enter site key & secret in order to apply it to all opt-in forms.', 'opdash'); ?>
        </p>

        <div class="ops-form-group">
            <label for=""><?php _e('Google ReCaptcha v3 Site Key:', 'opdash'); ?></label>
            <input type="text" placeholder="Enter your Google ReCaptcha v3 Site Key" name="opd_recaptcha_site_key" value="<?php echo get_option('opd_recaptcha_site_key') ?>" class="ops-form-control">
        </div>

        <div class="ops-form-group">
            <label for=""><?php _e('Google ReCaptcha v3 Secret Key:', 'opdash'); ?></label>
            <input type="text" placeholder="Enter your Google ReCaptcha v3 Secret Key" name="opd_recaptcha_secret_key" value="<?php echo get_option('opd_recaptcha_secret_key') ?>" class="ops-form-control">
        </div>

        <div class="ops-form-actions">
            <button class="ops-button" type="submit">Save</button>
        </div>
    </form>

</div>
