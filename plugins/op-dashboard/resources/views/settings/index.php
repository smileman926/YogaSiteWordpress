<?php
    if ( ! defined('ABSPATH')) {
        exit;
    }

    $group = isset( $group ) ? $group : "social";
?>

<div class="opd-dashboard">
    <?php OPDashboard\partial('partials/navigation'); ?>

    <div class="opd-dashboard-settings p-4">
        <div class="text-center">
            <h1>
                <i class="ops-iconFont ops-settings-square-icon"></i>
                <span><?php _e('Settings', 'opdash'); ?></span>
            </h1>
            <p class="opd-teaser"><?php _e('All your OptimizePress Settings', 'opdash'); ?></p>
        </div>

        <?php OPDashboard\view('dashboard/partials/check_requirements') ?>

        <?php OPDashboard\partial('settings/partials/nav', ['group' => $group]) ?>

        <?php OPDashboard\partial('settings/groups/' . $group) ?>
    </div>
</div>
