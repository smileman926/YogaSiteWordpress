<?php
/**
 * 
 *
 * Plugin Name: OptimizePress Dashboard
 * Plugin URI: https://optimizepress.com/
 * Description: Manage your OptimizePress products, integrations, templates and general settings with the OptimizePress Dashboard plugin.
 * OP UID: op-dashboard
 * Version: 1.0.16
 * Author: OptimizePress
 * Author URI: https://optimizepress.com/
 * Text Domain: opd
 * Domain Path: /resources/lang
 * Network: 
 * License: 
 * License URI: 
 */

global $wpdb;

// Add autoloader
require_once __DIR__.'/vendor/autoload.php';

define('OPD_VERSION', '1.0.16');
define('OPD_PLUGIN_SLUG', plugin_basename(__FILE__));
define('OPD_FILE', __FILE__);
define('OPD_BASE', plugin_basename( OPD_FILE));
define('OPD_PATH', __DIR__);
define('OPD_URL' , plugin_dir_url(__FILE__));
define('OPD_ASSET_PATH' , OPD_PATH . 'public/assets/');
define('OPD_ASSETS_URL', OPD_URL . 'public/assets/');
define('OPD_PREFIX', 'opd_');
define('OPD_SL_BASE_URL', getenv('OPD_SL_BASE_URL') ?: 'https://hub.optimizepress.com/');
define('OPD_SL_TEMPLATE_ASSETS_BASE_URL', getenv('OPD_SL_TEMPLATE_ASSETS_BASE_URL') ?: 'https://s3.amazonaws.com/assets.op3/');
define('OPD_RELEASE_CHANNEL', getenv('OPD_RELEASE_CHANNEL') ?: 'stable');
define('OPD_UPDATE_CACHE_TTL', getenv('OPD_UPDATE_CACHE_TTL') ?: 60*60*3); // 3 hours by default / when testing it's 2 minutes
define('OPD_PHP_VERSION', '7.0');

// Database
define('OPD_DB_VERSION', '1.0.0');
define('OPD_INTEGRATIONS_TABLE_NAME', 'optimizepress_integrations');

// Debug
define('OPD_LOG_PATH', getenv('OPD_LOG_PATH') ?: __DIR__ . '/storage/logs/op.log');
define('OPD_LOG_TYPE', getenv('OPD_LOG_TYPE') ?: 'single');

// More configuration
require_once __DIR__.'/config/cache.php';

// Plugin activation and deactivation
register_activation_hook(__FILE__,   [\OPDashboard\Providers\PluginActivator::class,   'activate']);
register_deactivation_hook(__FILE__, [\OPDashboard\Providers\PluginDeactivator::class, 'deactivate']);
add_action('activated_plugin',       [\OPDashboard\Providers\PluginActivator::class,   'afterActivate']);
add_action('deactivated_plugin',     [\OPDashboard\Providers\PluginDeactivator::class, 'afterDeactivate']);

// Initialize the plugin
function run_optimizepress_dashboard() {
    $plugin = new OPDashboard\Providers\OptimizePressDashboard;
    $plugin->init();
}
run_optimizepress_dashboard();
