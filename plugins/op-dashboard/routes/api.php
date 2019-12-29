<?php

$namespace = 'OPDashboard\Http\Api';

// Integration routes
register_rest_route('opd/v1', '/integrations',                               ['methods' => 'GET',  'callback' => [$namespace.'\IntegrationsController', 'index'], 'permission_callback' => 'OPDashboard\can_manage_integrations']);
register_rest_route('opd/v1', '/integrations',                               ['methods' => 'POST', 'callback' => [$namespace.'\IntegrationsController', 'save'],  'permission_callback' => 'OPDashboard\can_manage_integrations']);
register_rest_route('opd/v1', '/integrations/(?P<uid>[0-9a-zA-Z\s]+)/lists', ['methods' => 'GET',  'callback' => [$namespace.'\IntegrationsController', 'lists'], 'permission_callback' => 'OPDashboard\can_manage_integrations']);

// Cache
register_rest_route('opd/v1', '/clear-cache', ['methods' => 'POST', 'callback' => [$namespace.'\CacheController', 'clear'], 'permission_callback' => 'OPDashboard\can_clear_cache']);

// Messages
register_rest_route('opd/v1', '/mark-message-read', ['methods' => 'POST', 'callback' => [$namespace.'\MessagesController', 'markRead'], 'permission_callback' => 'OPDashboard\can_clear_cache']);
