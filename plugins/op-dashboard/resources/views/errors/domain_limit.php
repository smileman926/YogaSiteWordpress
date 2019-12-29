<?php
    use function OPDashboard\partial;

    if ( ! defined('ABSPATH')) {
        exit;
    }
?>

<div class="opd-dashboard">
    <?php OPDashboard\view('partials/navigation'); ?>

    <div class="opd-dashboard-sl-connect p-4">
        <h1>
            <i class="ops-iconFont ops-dashboard-icon"></i>
            <span><?php _e('An error has occurred', 'optimizepress'); ?></span>
        </h1>
        <br>

        <div class="ops-white-box ops-box-size-max">
            <p><?php _e('You have exceeded your domain limit.', 'opdash'); ?></p>
            <p><a href="https://docs.optimizepress.com" target="_blank"><?php _e('Please contact support.', 'opdash'); ?></a></p>

            <?php partial('dashboard/partials/sl_connect_button') ?>
        </div>
    </div>
</div>
