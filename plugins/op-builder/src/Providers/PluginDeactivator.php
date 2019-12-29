<?php

namespace OPBuilder\Providers;

use function OPDashboard\referer_is_op_dashboard;
use OptimizePress\Support\Log\Log;

class PluginDeactivator
{
    /**
     * Triggered when deactivating the plugin
     *
     * @return void
     */
    public static function deactivate()
    {
        /* if ($plugin === plugin_basename(OP3__FILE__)) {
            // Empty
        } */
    }

    /**
     * Triggered after the plugin has been deactivated
     *
     * @param string  $plugin
     * @return void
     */
    public static function afterDeactivate($plugin)
    {
        if ($plugin === plugin_basename(OP3__FILE__)) {
            // Get required values
            $plugins = get_option('active_plugins', []);
            $key     = array_search($plugin, $plugins, false);

            // Remove plugin from active list
            if ($key !== false and $plugins[$key]) {
                unset($plugins[$key]);
            }

            // Update the site option
            update_option('active_plugins', $plugins);

            // Redirect to Optimize Suite Dashboard page
            if (function_exists('\OPDashboard\referer_is_op_dashboard') && referer_is_op_dashboard()) {
                $message = urlencode('OptimizePress Builder was deactivated.');
                exit(wp_redirect(admin_url('admin.php?page=op-suite&op-notify=' . $message . '&op-notify-type=success')));
            }
        }
    }
}
