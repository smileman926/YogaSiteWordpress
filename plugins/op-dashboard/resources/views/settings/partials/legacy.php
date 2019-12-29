<div class="ops-white-box ops-box-size-max">
    <form action="<?php echo admin_url('admin-ajax.php') ?>?action=op_dashboard_update_settings" class="ops-form" data-opd-remote="post">
        <?php wp_nonce_field('opd_update_settings'); ?>
        <input type="hidden" name="opd_settings_section" value="legacy">
        <input type="hidden" name="action" value="opd_update_settings">


        <!-- Lazy loading switch below -->
        <div class="ops-form-group">
            <h3><?php _e('Legacy Features', 'opdash'); ?></h3>
            <h5><?php _e('Enable Legacy Membership Options', 'opdash'); ?></h5>
            <p><?php _e('Enable this option to show membership options for OP3 to allow you to create membership page listings and structures.', 'opdash'); ?></p>

            <?php
                $checked = '';
                $legacyMembership = (bool) get_option('opd_enable_legacy_membership');
                if ($legacyMembership) {
                    $checked = 'checked="checked"';
                }
            ?>

            <div class="ops-onoffswitch">
                <input type="checkbox" name="opd_enable_legacy_membership" class="ops-onoffswitch-checkbox" id="opd_enable_legacy_membership" <?php echo $checked; ?>>
                <label class="ops-onoffswitch-label" for="opd_enable_legacy_membership">
                    <span class="ops-onoffswitch-inner"></span>
                    <span class="ops-onoffswitch-switch"></span>
                </label>
            </div>
        </div>


        <div class="ops-form-actions">
            <button class="ops-button" type="submit">Save</button>
        </div>
    </form>
</div>