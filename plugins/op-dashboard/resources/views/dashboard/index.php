<?php
    if ( ! defined('ABSPATH')) {
        exit;
    }

    if ( ! isset($customer)) {
        return;
    }
?>

<div class="opd-dashboard">
    <?php OPDashboard\partial('partials/navigation'); ?>

    <div class="opd-dashboard-connected p-4">
        <?php OPDashboard\render_broadcast_message('op-dashboard', 'header'); ?>

        <div class="text-center">
            <h1>
                <i class="ops-iconFont ops-dashboard-icon"></i>
                <span><?php _e('Dashboard', 'optimizepress'); ?></span>
            </h1>

            <p class="opd-teaser"><?php _e('Install plugins and themes from OptimizePress via the dashboard', 'optimizepress'); ?></p>
        </div>

        <?php OPDashboard\view('dashboard/partials/check_requirements') ?>

        <?php OPDashboard\partial('dashboard/partials/customer_info', ['customer' => $customer]); ?>

        <?php OPDashboard\render_broadcast_message('op-dashboard', 'content'); ?>

        <div class="opd-dashboard-connected-products ops-box-size-max">
            <?php if (OPDashboard\check_basic_op_requirements()) : ?>
                <?php // OPDashboard\view('dashboard/partials/update_suite') ?>

                <div class="opd-product-list">
                    <?php OPDashboard\view('dashboard/products/index', ['customer' => $customer]) ?>
                </div>
            <?php endif; ?>
        </div>

        <?php OPDashboard\render_broadcast_message('op-dashboard', 'footer'); ?>
    </div>
</div>

<?php \OPDashboard\view('partials/notifications') ?>
