<?php

// Define the namespace for the API controllers
$namespace = 'OPBuilder\Http\Api';

// Pages
register_rest_route('op3/v1', '/pages',                                   ['methods' => 'GET',    'callback' => [$namespace.'\PagesController', 'index'],            'permission_callback' => 'op3_can_edit_pages']);
register_rest_route('op3/v1', '/pages/(?P<id>\d+)',                       ['methods' => 'GET',    'callback' => [$namespace.'\PagesController', 'show'],             'permission_callback' => 'op3_can_edit_pages']);
register_rest_route('op3/v1', '/pages/(?P<id>\d+)',                       ['methods' => 'POST',   'callback' => [$namespace.'\PagesController', 'update'],           'permission_callback' => 'op3_can_edit_pages']);
register_rest_route('op3/v1', '/pages/(?P<id>\d+)/data',                  ['methods' => 'GET',    'callback' => [$namespace.'\PagesController', 'pageData'],         'permission_callback' => 'op3_can_edit_pages']);
register_rest_route('op3/v1', '/pages/(?P<id>\d+)/status',                ['methods' => 'POST',   'callback' => [$namespace.'\PagesController', 'updatePageStatus'], 'permission_callback' => 'op3_can_edit_pages']);
register_rest_route('op3/v1', '/pages/(?P<id>\d+)/revisions',             ['methods' => 'GET',    'callback' => [$namespace.'\PagesController', 'revisions'],        'permission_callback' => 'op3_can_edit_pages']);
register_rest_route('op3/v1', '/pages/(?P<id>\d+)/restore-revision',      ['methods' => 'POST',   'callback' => [$namespace.'\PagesController', 'restoreRevision'],  'permission_callback' => 'op3_can_edit_pages']);
register_rest_route('op3/v1', '/pages/(?P<id>\d+)/template',              ['methods' => 'POST',   'callback' => [$namespace.'\PagesController', 'updateTemplate'],   'permission_callback' => 'op3_can_edit_pages']);
register_rest_route('op3/v1', '/pages/(?P<id>\d+)/autosave',              ['methods' => 'POST',   'callback' => [$namespace.'\PagesController', 'autosave'],         'permission_callback' => 'op3_can_edit_pages']);
register_rest_route('op3/v1', '/pages/(?P<id>\d+)/global-elements',       ['methods' => 'GET',    'callback' => [$namespace.'\PagesController', 'globalElements'],   'permission_callback' => 'op3_can_edit_pages']);
register_rest_route('op3/v1', '/pages/(?P<id>\d+)/mode/(?P<mode>[\w-]+)', ['methods' => 'POST',   'callback' => [$namespace.'\PagesController', 'updateOPMode'],     'permission_callback' => 'op3_can_edit_pages']);
register_rest_route('op3/v1', '/pages/(?P<id>\d+)/(?P<ts>[\w-]+).css',    ['methods' => 'GET',    'callback' => [$namespace.'\PagesController', 'assetsStyles']]);
register_rest_route('op3/v1', '/pages/(?P<id>\d+)/(?P<ts>[\w-]+).js',     ['methods' => 'GET',    'callback' => [$namespace.'\PagesController', 'assetsScripts']]);

// Elements and categories
register_rest_route('op3/v1', '/element-categories',                      ['methods' => 'GET',  'callback' => [$namespace.'\ElementsController', 'categories'], 'permission_callback' => 'op3_can_edit_pages']);
register_rest_route('op3/v1', '/elements',                                ['methods' => 'GET',  'callback' => [$namespace.'\ElementsController', 'show'],       'permission_callback' => 'op3_can_edit_pages']);
register_rest_route('op3/v1', '/elements/storage',                        ['methods' => 'GET',  'callback' => [$namespace.'\ElementsController', 'storage'],    'permission_callback' => 'op3_can_edit_pages']);
register_rest_route('op3/v1', '/elements/(?P<id>[\w-]+)',                 ['methods' => 'GET',  'callback' => [$namespace.'\ElementsController', 'config'],     'permission_callback' => 'op3_can_edit_pages']);
register_rest_route('op3/v1', '/fonts',                                   ['methods' => 'GET',  'callback' => [$namespace.'\ElementsController', 'fonts'],      'permission_callback' => 'op3_can_edit_pages']);
register_rest_route('op3/v1', '/icons',                                   ['methods' => 'GET',  'callback' => [$namespace.'\ElementsController', 'icons'],      'permission_callback' => 'op3_can_edit_pages']);
register_rest_route('op3/v1', '/links',                                   ['methods' => 'GET',  'callback' => [$namespace.'\ElementsController', 'links'],      'permission_callback' => 'op3_can_edit_pages']);
register_rest_route('op3/v1', '/links/(?P<search>[\w-]+)',                ['methods' => 'GET',  'callback' => [$namespace.'\ElementsController', 'links'],      'permission_callback' => 'op3_can_edit_pages']);
register_rest_route('op3/v1', '/menus',                                   ['methods' => 'GET',  'callback' => [$namespace.'\ElementsController', 'menus'],      'permission_callback' => 'op3_can_edit_pages']);
register_rest_route('op3/v1', '/menus/(?P<search>[\w-]+)',                ['methods' => 'GET',  'callback' => [$namespace.'\ElementsController', 'menus'],      'permission_callback' => 'op3_can_edit_pages']);
register_rest_route('op3/v1', '/membership-pages',                        ['methods' => 'GET',  'callback' => [$namespace.'\ElementsController', 'getPages'],      'permission_callback' => 'op3_can_edit_pages']);
register_rest_route('op3/v1', '/membership-pages-search',                 ['methods' => 'GET',  'callback' => [$namespace.'\ElementsController', 'getPagesByParams'],      'permission_callback' => 'op3_can_edit_pages']);
register_rest_route('op3/v1', '/membership-pages/categories',             ['methods' => 'GET',  'callback' => [$namespace.'\ElementsController', 'getPages'],      'permission_callback' => 'op3_can_edit_pages']);

// Global elements
register_rest_route('op3/v1', '/global-elements',                         ['methods' => 'GET',    'callback' => [$namespace.'\GlobalElementsController', 'list'],    'permission_callback' => 'op3_can_edit_pages']);
register_rest_route('op3/v1', '/global-elements/(?P<id>\d+)',             ['methods' => 'GET',    'callback' => [$namespace.'\GlobalElementsController', 'detail'],  'permission_callback' => 'op3_can_edit_pages']);
register_rest_route('op3/v1', '/global-elements',                         ['methods' => 'POST',   'callback' => [$namespace.'\GlobalElementsController', 'create'],  'permission_callback' => 'op3_can_edit_pages']);
register_rest_route('op3/v1', '/global-elements/(?P<id>\d+)',             ['methods' => 'PUT',   'callback' => [$namespace.'\GlobalElementsController', 'update'],  'permission_callback' => 'op3_can_edit_pages']);
register_rest_route('op3/v1', '/global-elements/(?P<id>\d+)',             ['methods' => 'DELETE', 'callback' => [$namespace.'\GlobalElementsController', 'delete'],  'permission_callback' => 'op3_can_edit_pages']);

// Integrations for optin forms
register_rest_route('op3/v1', '/optin/submit',                                                       ['methods' => 'POST', 'callback' => [$namespace.'\IntegrationsController', 'optin']]);
register_rest_route('op3/v1', '/optin/submit/smart',                                                 ['methods' => 'POST', 'callback' => [$namespace.'\IntegrationsController', 'optinSmart']]);
register_rest_route('op3/v1', '/optin/integrations',                                                 ['methods' => 'GET',  'callback' => [$namespace.'\IntegrationsController', 'index'],            'permission_callback' => 'op3_can_edit_pages']);
register_rest_route('op3/v1', '/optin/integrations/connected',                                       ['methods' => 'GET',  'callback' => [$namespace.'\IntegrationsController', 'connected'],        'permission_callback' => 'op3_can_edit_pages']);
register_rest_route('op3/v1', '/optin/integrations/(?P<integration>[\w-]+)',                         ['methods' => 'GET',  'callback' => [$namespace.'\IntegrationsController', 'integration'],      'permission_callback' => 'op3_can_edit_pages']);
register_rest_route('op3/v1', '/optin/integrations/(?P<integration>[\w-]+)/lists',                   ['methods' => 'GET',  'callback' => [$namespace.'\IntegrationsController', 'lists'],            'permission_callback' => 'op3_can_edit_pages']);
register_rest_route('op3/v1', '/optin/integrations/(?P<integration>[\w-]+)/tags',                    ['methods' => 'GET',  'callback' => [$namespace.'\IntegrationsController', 'tags'],             'permission_callback' => 'op3_can_edit_pages']);
register_rest_route('op3/v1', '/optin/integrations/(?P<integration>[\w-]+)/fields',                  ['methods' => 'GET',  'callback' => [$namespace.'\IntegrationsController', 'fields'],           'permission_callback' => 'op3_can_edit_pages']);
register_rest_route('op3/v1', '/optin/integrations/(?P<integration>[\w-]+)/fields/(?P<list>[\w-]+)', ['methods' => 'GET',  'callback' => [$namespace.'\IntegrationsController', 'fields'],           'permission_callback' => 'op3_can_edit_pages']);
register_rest_route('op3/v1', '/optin/integrations/(?P<integration>[\w-]+)/goals',                   ['methods' => 'GET',  'callback' => [$namespace.'\IntegrationsController', 'goals'],            'permission_callback' => 'op3_can_edit_pages']);
register_rest_route('op3/v1', '/optin/integrations/all/(?P<id>\d+)',                                 ['methods' => 'GET',  'callback' => [$namespace.'\IntegrationsController', 'pageIntegrations'], 'permission_callback' => 'op3_can_edit_pages']);
register_rest_route('op3/v1', '/optin/integrations/clear-cache',                                     ['methods' => 'GET',  'callback' => [$namespace.'\IntegrationsController', 'clearCache'],       'permission_callback' => 'op3_can_edit_pages']);
register_rest_route('op3/v1', '/optin/integrations/clear-cache/(?P<id>\d+)',                         ['methods' => 'GET',  'callback' => [$namespace.'\IntegrationsController', 'clearPageCache'],   'permission_callback' => 'op3_can_edit_pages']);

// Export
register_rest_route('op3/v1', '/export', ['methods' => 'POST', 'callback' => [$namespace.'\ExportController', 'submit'], 'permission_callback' => 'op3_can_edit_pages']);

// Templates
register_rest_route('op3/v1', '/template-categories',                      ['methods' => 'GET', 'callback' => [$namespace.'\TemplatesController', 'categories'], 'permission_callback' => 'op3_can_edit_pages']);
register_rest_route('op3/v1', '/template-categories/(?P<category>[\w-]+)', ['methods' => 'GET', 'callback' => [$namespace.'\TemplatesController', 'index'],      'permission_callback' => 'op3_can_edit_pages']);
register_rest_route('op3/v1', '/templates/(?P<template>[\w-]+)',           ['methods' => 'GET', 'callback' => [$namespace.'\TemplatesController', 'show'],       'permission_callback' => 'op3_can_edit_pages']);

// Blocks
register_rest_route('op3/v1', '/block-categories',                         ['methods' => 'GET', 'callback' => [$namespace.'\TemplatesController', 'blockCategories'], 'permission_callback' => 'op3_can_edit_pages']);
register_rest_route('op3/v1', '/block-categories/(?P<category>[\w-]+)',    ['methods' => 'GET', 'callback' => [$namespace.'\TemplatesController', 'blockIndex'],      'permission_callback' => 'op3_can_edit_pages']);
register_rest_route('op3/v1', '/blocks/(?P<block>[\w-]+)',                 ['methods' => 'GET', 'callback' => [$namespace.'\TemplatesController', 'showBlock'],       'permission_callback' => 'op3_can_edit_pages']);
register_rest_route('op3/v1', '/my-blocks/(?P<block>[\w-]+)',              ['methods' => 'GET', 'callback' => [$namespace.'\TemplatesController', 'showCustomerBlock'],       'permission_callback' => 'op3_can_edit_pages']);

// Media
register_rest_route('op3/v1', '/media/import', ['methods' => 'POST', 'callback' => [$namespace.'\MediaController',    'import'], 'permission_callback' => 'op3_can_edit_pages']);

// Unsplash
register_rest_route('op3/v1', '/unsplash/popular',  ['methods' => 'GET', 'callback' => [$namespace.'\UnsplashController', 'getPopularPhotos'], 'permission_callback' => 'op3_can_edit_pages']);
register_rest_route('op3/v1', '/unsplash/latest',   ['methods' => 'GET', 'callback' => [$namespace.'\UnsplashController', 'getLatestPhotos'],  'permission_callback' => 'op3_can_edit_pages']);
register_rest_route('op3/v1', '/unsplash/search',   ['methods' => 'GET', 'callback' => [$namespace.'\UnsplashController', 'searchPhotos'],     'permission_callback' => 'op3_can_edit_pages']);
register_rest_route('op3/v1', '/unsplash/download', ['methods' => 'GET', 'callback' => [$namespace.'\UnsplashController', 'triggerDownload'],  'permission_callback' => 'op3_can_edit_pages']);
