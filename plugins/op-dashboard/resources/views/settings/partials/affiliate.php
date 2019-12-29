<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
?>

<div class="ops-white-box ops-box-size-max">

    <h3><?php _e('OptimizePress Affiliate Program', 'opdash'); ?></h3>

    <form action="<?php echo admin_url('admin-ajax.php') ?>?action=op_dashboard_update_settings" class="ops-form" data-opd-remote="post">
        <?php wp_nonce_field('opd_update_settings'); ?>
        <input type="hidden" name="opd_settings_section" value="affiliate">
        <input type="hidden" name="action" value="opd_update_settings">

        <div class="ops-form-group">
            <h5><?php _e('Enable promotional backlink', 'opdash'); ?></h5>
            <p><?php _e('Enable this option to show the "Powered by OptimizePress" badge in your site footer.', 'opdash'); ?></p>

            <?php
                $checked = "";
                $affiliateBacklink = get_option('opd_affiliate_backlink');
                if ($affiliateBacklink == "on" || $affiliateBacklink === false) {
                    $checked = 'checked="checked"';
                }
            ?>

            <div class="ops-onoffswitch">
                <input type="checkbox" name="opd_affiliate_backlink" class="ops-onoffswitch-checkbox" id="opd_affiliate_backlink" <?php echo $checked; ?>>
                <label class="ops-onoffswitch-label" for="opd_affiliate_backlink">
                    <span class="ops-onoffswitch-inner"></span>
                    <span class="ops-onoffswitch-switch"></span>
                </label>
            </div>
        </div>

        <div class="ops-form-group">
            <label for="">OptimizePress Affiliate Link</label>
            <input type="text" placeholder="Enter your OptimizePress affiliate link" name="opd_affiliate_link" value="<?php echo get_option('opd_affiliate_link') ? get_option('opd_affiliate_link') : 'https://www.optimizepress.com' ?>" class="ops-form-control">
        </div>

        <div class="ops-form-actions">
            <button class="ops-button" type="submit">Save</button>
        </div>
    </form>

</div>
