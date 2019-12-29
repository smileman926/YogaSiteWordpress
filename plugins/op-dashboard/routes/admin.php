<?php

use OPDashboard\Services\Route;
use OPDashboard\SL\SL;
use function OPDashboard\op3_svg_icon;

// Set namespace
Route::setNamespace('OPDashboard\Http');

Route::adminPage('OptimizePress3', 'op-suite', 'DashboardController@index', ['icon' => op3_svg_icon(), 'position' => 33.3]);

// Load sub pages only if api is connected!
if (SL::isConnected()) {
    // Integrations
    Route::adminSubPage('Integrations',          'op-suite',     'op-dashboard-integrations',     'IntegrationsController@index', ['position' => 100]);
    //Route::adminSubPage('Add integration',       null,           'op-dashboard-add-integration',  'IntegrationsController@create');
    //Route::adminSubPage('Edit integration',      null,           'op-dashboard-edit-integration', 'IntegrationsController@edit');
    Route::adminSubPage('Authorize integration', null,           'op-process-oauth-sl-callback',     'IntegrationsController@authorizeSL');

    // Settings
    Route::adminSubPage('Settings', 'op-suite', 'op-dashboard-settings', 'SettingsController@index', ['position' => 500]);
}

// Products
Route::adminSubPage('Install', null, 'op-dashboard-product-install', 'ProductController@install');

// Error pages
Route::adminSubPage('Error', null, 'op-dashboard-error', 'ErrorPageController@showPage');

// Check for updates
//Route::adminSubPage('Install', null, 'op-dashboard-product-install', 'ProductController@install');
