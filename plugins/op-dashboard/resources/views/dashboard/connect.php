<?php
    if ( ! defined('ABSPATH')) {
        exit;
    }
?>

<div class="opd-dashboard">
	<?php OPDashboard\view('partials/navigation'); ?>

    <div class="opd-dashboard-sl-connect p-4">
        <h1>
            <i class="ops-iconFont ops-dashboard-icon"></i>
            <span><?php _e('License Your Site', 'optimizepress'); ?></span>
        </h1>
        <p class="opd-teaser"><?php _e('Install plugins and themes from OptimizePress via the dashboard', 'opdash'); ?></p>

	    <?php OPDashboard\view('dashboard/partials/sl_connect', ['error' => (isset($error) ? $error : [])]); ?>
    </div>
</div>
