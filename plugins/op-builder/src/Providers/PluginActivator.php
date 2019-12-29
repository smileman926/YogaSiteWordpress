<?php

namespace OPBuilder\Providers;

use function OPDashboard\referer_is_op_dashboard;
use OptimizePress\Support\Log\Log;

class PluginActivator
{
    /**
     * Triggered when activating the plugin
     *
     * @param string $plugin
     * @return void
     */
    public static function activate($plugin)
    {
        /* if ($plugin === plugin_basename(OP3__FILE__)) {
            // Empty
        } */
    }

    /**
     * Triggered after the plugin has been activated
     *
     * @param string $plugin
     * @return void
     */
    public static function afterActivate($plugin)
    {
        if ($plugin === plugin_basename(OP3__FILE__)) {
            if (function_exists('\OPDashboard\referer_is_op_dashboard') && referer_is_op_dashboard()) {
                // Redirect to product overview page
                $message = urlencode('OptimizePress Builder was activated.');
                exit(wp_redirect(admin_url('admin.php?page=op-suite&op-notify=' . $message . '&op-notify-type=success')));
            }
        }
    }
}
