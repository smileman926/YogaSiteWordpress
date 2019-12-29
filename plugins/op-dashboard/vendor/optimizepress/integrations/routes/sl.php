<?php

// Authorizing integrations through SL
Route::group(['namespace' => 'OptimizePress\Integrations\Http\Controllers', 'middleware' => config('optimizepress-integrations.middleware.web')], function () {
    Route::get('op-integrations/sl',                               ['as' => 'optimizepress.integrations.opsl',               'uses' => 'OAuthControllerOPSL@index']);
    Route::get('op-integrations/sl/connect',                       ['as' => 'optimizepress.integrations.opsl.connect',       'uses' => 'OAuthControllerOPSL@connect']);
    Route::get('op-integrations/sl/process-oauth-response',        ['as' => 'optimizepress.integrations.opsl.process',       'uses' => 'OAuthControllerOPSL@process']);
    Route::get('op-integrations/sl/authorize',                     ['as' => 'optimizepress.integrations.opsl.authorize',     'uses' => 'OAuthControllerOPSL@authorize']);
    Route::get('op-integrations/sl/process-oauth-callback/{uid?}', ['as' => 'optimizepress.integrations.opsl.callback',      'uses' => 'OAuthControllerOPSL@callback']);
    Route::get('op-integrations/sl/refresh-token',                 ['as' => 'optimizepress.integrations.opsl.refresh_token', 'uses' => 'OAuthControllerOPSL@refreshToken']);
});
