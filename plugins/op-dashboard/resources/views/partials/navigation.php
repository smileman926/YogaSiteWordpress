<?php
if ( ! defined('ABSPATH')) {
    exit;
}
?>

<div class="ops-top-menu d-flex justify-content-between align-items-center">
    <nav class="ops-left pl-4">
        <ul>
            <li class="d-flex align-items-center">
                <a class="ops-logo" href="<?php echo admin_url( 'admin.php?page=op-suite' ); ?>">
                    <i class="ops-iconFont ops-logo-icon"></i>
                </a>
            </li>
        </ul>
    </nav>

    <nav class="ops-right">
        <nav class="ops-main-menu ops_movingBorderMenu">
            <ul class="ops-right-menu">
                <?php \OPDashboard\Services\Menus::find('opd-main-menu')->render(); ?>
            </ul>
            <span class="ops_movingBorderMenuHover ops-main-menu-hover"></span>
        </nav>

        <ul class="ops-right-static">
            <li class="ops-fullscreenBtn">
                <a href="#">
                    <i class="ops-iconFont ops-fullscreen-fill-icon"></i>
                </a>
            </li>
        </ul>
    </nav>
</div>
