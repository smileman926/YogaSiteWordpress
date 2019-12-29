<?php
    if ( ! defined( 'ABSPATH' ) ) {
        exit;
    }
?>

<div class="op-builder-admin">
    <?php OPDashboard\partial('partials/navigation'); ?>

    <?php function_exists('OPDashboard\render_broadcast_message') ? OPDashboard\render_broadcast_message('op-builder', 'header') : null; ?>

    <div class="opb-create-new-page p-4">
        <div class="text-center">
            <h1>
                <i class="ops-iconFont ops-layers-icon"></i>
                <span><?php _e('Create New Page', 'opdash'); ?></span>
            </h1>

            <p class="opd-teaser"><?php _e('Choose from a page or collection to start creating your next marketing page', 'optimizepress3'); ?></p>
        </div>

        <?php function_exists('OPDashboard\render_broadcast_message') ? OPDashboard\render_broadcast_message('op-builder', 'content') : null; ?>

        <?php if (op3_sl_is_connected()) : ?>
            <?php op3_view('pages/partials/template_category_navigation', ['categories' => $categories, 'collections' => $collections]) ?>

            <?php op3_view('pages/partials/template_categories', ['categories' => $categories, 'collections' => $collections]) ?>
        <?php else : ?>
            <div class="ops-white-box ops-danger text-center">
                <?php _e('OptimizePress dashboard is not connected to your OptimizePress account.', 'optimizepress3') ?>
            </div>
        <?php endif; ?>

        <?php function_exists('OPDashboard\render_broadcast_message') ? OPDashboard\render_broadcast_message('op-builder', 'footer') : null; ?>
    </div>
</div>
