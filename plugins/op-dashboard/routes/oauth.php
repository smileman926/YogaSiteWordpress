<?php

$controller = new OPDashboard\Http\OAuthController;

// Register the routes
add_action('template_redirect', [$controller, 'processOAuthResponse']);
add_action('template_redirect', [$controller, 'processOAuthCallback']);
add_action('template_redirect', [$controller, 'processOAuthDisconnect']);
add_action('template_redirect', [$controller, 'processOAuthDisconnect']);
