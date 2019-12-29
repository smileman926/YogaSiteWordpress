<?php

Route::group(['namespace' => 'OptimizePress\Integrations\Http\Controllers', 'middleware' => config('optimizepress-integrations.middleware.web')], function () {
    Route::get('op-integrations',                              ['as' => 'optimizepress.integrations.index',          'uses' => 'IntegrationsController@index']);
    Route::get('op-integrations/create',                       ['as' => 'optimizepress.integrations.create',         'uses' => 'IntegrationsController@create']);
    Route::post('op-integrations',                             ['as' => 'optimizepress.integrations.store',          'uses' => 'IntegrationsController@store']);
    Route::get('op-integrations/{integration}',                ['as' => 'optimizepress.integrations.show',           'uses' => 'IntegrationsController@show']);
    Route::get('op-integrations/{integration}/edit',           ['as' => 'optimizepress.integrations.edit',           'uses' => 'IntegrationsController@edit']);
    Route::put('op-integrations/{integration}',                ['as' => 'optimizepress.integrations.update',         'uses' => 'IntegrationsController@update']);
    Route::get('op-integrations/{integration}/delete',         ['as' => 'optimizepress.integrations.confirm_delete', 'uses' => 'IntegrationsController@confirmDelete']);
    Route::delete('op-integrations/{integration}',             ['as' => 'optimizepress.integrations.delete',         'uses' => 'IntegrationsController@destroy']);
    Route::post('op-integrations/{integration}/disconnect',    ['as' => 'optimizepress.integrations.disconnect',     'uses' => 'IntegrationsController@disconnect']);
    Route::get('op-integrations/{integration}/lists/{list?}',  ['as' => 'optimizepress.integrations.lists.show',     'uses' => 'ListsController@show']);
    Route::post('op-integrations/{integration}/lists/{list?}', ['as' => 'optimizepress.integrations.lists.optin',    'uses' => 'ListsController@optin']);

    // OAuth callbacks and stuff
    Route::get('op-integrations/{uid}/authorize',      ['as' => 'optimizepress.integrations.authorize',           'uses' => 'OAuthController@authorize']);
    Route::get('op-integrations/oauth/callback',       ['as' => 'optimizepress.integrations.oauth_callback',      'uses' => 'OAuthController@callbackbyRequest']);
    Route::get('op-integrations/oauth/callback/{uid}', ['as' => 'optimizepress.integrations.oauth_callback.uid',  'uses' => 'OAuthController@callbackByUid']);
    Route::get('op-integrations/{uid}/refresh-token',  ['as' => 'optimizepress.integrations.oauth_refresh_token', 'uses' => 'OAuthController@refreshToken']);
});
