<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
?>

<div class="ops-box-size-max opd-settings-secondary-menu text-center">
    <nav class="ops_movingBorderMenu">
        <ul>
            <li class="<?php echo $group === 'general'            ? 'selected' : null ?>"><a href="<?php echo admin_url('admin.php?page=op-dashboard-settings&op-settings-group=general'); ?>">General</a></li>
            <li class="<?php echo $group === 'social'             ? 'selected' : null ?>"><a href="<?php echo admin_url('admin.php?page=op-dashboard-settings&op-settings-group=social'); ?>">Social Networks</a></li>
            <li class="<?php echo $group === 'recaptcha'          ? 'selected' : null ?>"><a href="<?php echo admin_url('admin.php?page=op-dashboard-settings&op-settings-group=recaptcha'); ?>">Recaptcha</a></li>
            <li class="<?php echo $group === 'affiliate'          ? 'selected' : null ?>"><a href="<?php echo admin_url('admin.php?page=op-dashboard-settings&op-settings-group=affiliate'); ?>">Affiliates</a></li>
            <li class="<?php echo $group === 'scripts-and-styles' ? 'selected' : null ?>"><a href="<?php echo admin_url('admin.php?page=op-dashboard-settings&op-settings-group=scripts-and-styles'); ?>">Scripts And Styles</a></li>
            <li class="<?php echo $group === 'legacy' ? 'selected' : null ?>"><a href="<?php echo admin_url('admin.php?page=op-dashboard-settings&op-settings-group=legacy'); ?>">Legacy Features</a></li>
            <li class="<?php echo $group === 'advanced'           ? 'selected' : null ?>"><a href="<?php echo admin_url('admin.php?page=op-dashboard-settings&op-settings-group=advanced'); ?>">Advanced</a></li>
        </ul>
        <span class="ops_movingBorderMenuHover opd-settings-secondary-menu-hover"></span>
    </nav>
</div>
