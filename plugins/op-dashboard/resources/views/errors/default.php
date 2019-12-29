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
            <p><?php _e('Something went wrong.', 'opdash'); ?></p>
        </div>
    </div>
</div>
