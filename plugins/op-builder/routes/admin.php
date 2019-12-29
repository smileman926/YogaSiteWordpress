<?php

use OPDashboard\Services\Route;

// Set namespace
Route::setNamespace('OPBuilder\Http');

// In navigation
if (function_exists('\\OPDashboard\\sl_license_is_valid') and \OPDashboard\sl_license_is_valid()) {
    Route::adminSubPage(__('Create New Page', 'op3'), 'op-suite', 'op-builder-create',          'PagesController@create',         ['position' => 50]);
//    Route::adminSubPage(__('Global Elements', 'op3'), 'op-suite', 'op-builder-global-elements', 'PagesController@globalElements', ['position' => 150]);
}

// Support page is handled differently
Route::adminSubPage('Help', 'op-suite', null, 'OptionsController@support', ['position' => 900, 'url' => 'https://docs.optimizepress.com/', 'target' => '_blank']);

// Store new page (not in nav)
Route::post('op-builder-store-page', 'PagesController@store');

// Export templates/blocks to SL
Route::post('op-builder-export-template', 'PagesController@exportTemplate');
Route::post('op-builder-export-block',    'PagesController@exportBlock');

// Media (not in nav)
Route::adminSubPage(null, 'op-builder', 'op-builder-media-picker', 'MediaController@picker');
