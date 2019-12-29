<?php

$integrationsController = new OPDashboard\Http\IntegrationsController;
$settingsController     = new OPDashboard\Http\SettingsController;
$productsController     = new OPDashboard\Http\ProductController;
$updatesController      = new OPDashboard\Http\UpdatesController;

// Load sub pages only if api is connected!
if (\OPDashboard\SL\SL::isConnected()) {

    // Install/update plugin
    add_action('wp_ajax_opd_install_plugin', function() use ($productsController) { $productsController->ajaxInstallPlugin(); });
    add_action('wp_ajax_opd_update_plugin',  function() use ($productsController) { $productsController->ajaxUpdatePlugin(); });

    // Install/update theme
    add_action('wp_ajax_opd_install_theme', function() use ($productsController) { $productsController->ajaxInstallTheme(); });
    add_action('wp_ajax_opd_update_theme',  function() use ($productsController) { $productsController->ajaxUpdateTheme(); });

    // Integrations
    add_action('wp_ajax_opd_disconnect_integration', function() use ($integrationsController) { $integrationsController->disconnect(); });

    // Settings
    add_action('wp_ajax_opd_update_settings', function() use ($settingsController) { $settingsController->update(); });

    // Check updates
    add_action('wp_ajax_opd_check_updates', function() use ($updatesController) { $updatesController->check(); });

    // Full screen functionality
    add_action('wp_ajax_op3toggleFullScreen', function() use ($settingsController) { $settingsController->toggleFullScreen(); });

    // Add integration ajax
    add_action('wp_ajax_opd_addIntegration', function() use ($integrationsController) { $integrationsController->create(); });

    // Edit integration ajax
    add_action('wp_ajax_opd_editIntegration', function() use ($integrationsController) { $integrationsController->edit(); });

}
