<?php
/**
 * 
 *
 * Plugin Name: OptimizeBuilder
 * Plugin URI: https://optimizepress.com
 * Description: Build lightning fast, conversion optimized web pages with the drag and drop page builder from OptimizePress. Built by marketers for marketers.
 * OP UID: op-builder
 * Version: 1.0.17
 * Author: OptimizePress
 * Author URI: https://optimizepress.com
 * Text Domain: optimizepress
 * Domain Path: /resources/lang
 * Network: 
 * License: 
 * License URI: 
 */

if ( ! defined('WPINC')) die;

// Setup autoloading
require __DIR__ . '/vendor/autoload.php';

// Define some constants for use throughout the plugin
define('OP3_VERSION', '1.0.17');
define('OP3__PLUGIN_NAME', 'op-builder');
define('OP3__FILE__', __FILE__);
define('OP3__DIR__', __DIR__);
define('OP3_BASE__', plugin_basename( OP3__FILE__));
require __DIR__ . '/config/paths.php';

// Define dependencies
define('OP3_DEPENDENCY__DASHBOARD', '1.0.16-beta7');

// Plugin activation and deactivation
register_activation_hook(__FILE__,   [\OPBuilder\Providers\PluginActivator::class,   'activate']);
register_deactivation_hook(__FILE__, [\OPBuilder\Providers\PluginDeactivator::class, 'deactivate']);
add_action('activated_plugin',       [\OPBuilder\Providers\PluginActivator::class,   'afterActivate']);
add_action('deactivated_plugin',     [\OPBuilder\Providers\PluginDeactivator::class, 'afterDeactivate']);

// Initialize the plugin
function run_optimizepress_builder() {
    $plugin = new OPBuilder\Providers\BuilderBootstrap;
    $plugin->init();
}
run_optimizepress_builder();
