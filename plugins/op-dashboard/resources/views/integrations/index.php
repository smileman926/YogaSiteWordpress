<?php
    if ( ! defined('ABSPATH')) {
        exit;
    }
?>

<div class="opd-dashboard">
    <?php OPDashboard\partial('partials/navigation'); ?>

    <div class="opd-integrations ops-box-size-max p-4">
        <div class="text-center">
            <h1>
                <i class="ops-iconFont ops-integrations-round-icon"></i>
                <span><?php _e('Integrations', 'opdash'); ?></span>
            </h1>

            <p class="opd-teaser"><?php _e('Add and maintain integrations that will be used across your OptimizePress products.', 'opdash'); ?></p>
        </div>

        <?php OPDashboard\view('dashboard/partials/check_requirements') ?>

        <?php OPDashboard\partial('integrations/partials/connector') ?>
    </div>
</div>
