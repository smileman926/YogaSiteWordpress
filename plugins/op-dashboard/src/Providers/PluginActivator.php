<?php

namespace OPDashboard\Providers;

use function OptimizePress\Support\array_get;
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
        /* if ($plugin === plugin_basename(OPD_FILE)) {
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
        if ($plugin === plugin_basename(OPD_FILE)) {
            // Check is bulk activation
            $bulk = (array) array_get($_POST, 'checked');

            if (count($bulk) <= 1) {
                // Redirect to Optimize Suite Dashboard page
                $message = urlencode('OptimizePress Dashboard plugin was activated.');
                exit(wp_redirect(admin_url('admin.php?page=op-suite&op-notify=' . $message . '&op-notify-type=success')));
            }
        }
    }
}
