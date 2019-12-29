<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
?>

<div class="ops-white-box ops-box-size-max">
    <form action="<?php echo admin_url('admin-ajax.php') ?>?action=op_dashboard_update_settings" class="ops-form" data-opd-remote="post">
        <?php wp_nonce_field('opd_update_settings'); ?>
        <input type="hidden" name="opd_settings_section" value="general">
        <input type="hidden" name="action" value="opd_update_settings">


        <?php $postTypes = \OPDashboard\editor_post_types(); ?>

        <h3><?php _e('Post types', 'opdash'); ?></h3>
        <p style="margin-bottom: 35px;">Enable OptimizePress editor for these post types.</p>

        <div class="container">
            <div class="column">
                <div class="enable-post-types">
                    <?php foreach ($postTypes as $postTypeSlug => $postType) : ?>
                        <div class="ops-form-group">
                            <input type="hidden" name="opd_enabled_cpt[<?php echo $postTypeSlug ?>]" value="">
                            <input type="checkbox" id="op3-enable-cpt-<?php echo $postTypeSlug ?>" value="1" name="opd_enabled_cpt[<?php echo $postTypeSlug ?>]" <?php echo $postType->enabled ? 'checked' : null ?> style="display: inline-block;">
                            <label for="op3-enable-cpt-<?php echo $postTypeSlug ?>" style="display: inline-block;"><?php echo $postType->label ?></label>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>


        <!-- Lazy loading switch below -->
        <?php /*<div class="ops-form-group">
            <h3><?php _e('Lazy loading', 'opdash'); ?></h3>
            <p><?php _e('Enable lazy loading of images on the OptimizePress pages.', 'opdash'); ?></p>

            <?php
                $checked = '';
                $lazyLoading = (bool) get_option('opd_enable_lazy_loading');
                if ($lazyLoading) {
                    $checked = 'checked="checked"';
                }
            ?>

            <div class="ops-onoffswitch">
                <input type="checkbox" name="opd_enable_lazy_loading" class="ops-onoffswitch-checkbox" id="opd_enable_lazy_loading" <?php echo $checked; ?>>
                <label class="ops-onoffswitch-label" for="opd_enable_lazy_loading">
                    <span class="ops-onoffswitch-inner"></span>
                    <span class="ops-onoffswitch-switch"></span>
                </label>
            </div>

            <br><br>
        </div>*/ ?>


        <div class="ops-form-actions">
            <button class="ops-button" type="submit">Save</button>
        </div>
    </form>
</div>
