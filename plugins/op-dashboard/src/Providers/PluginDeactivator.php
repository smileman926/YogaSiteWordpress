<?php

namespace OPDashboard\Providers;

class PluginDeactivator
{
    /**
     * Triggered when deactivating the plugin
     *
     * @return void
     */
    public static function deactivate()
    {
        /* if ($plugin === plugin_basename(OPD_FILE)) {
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
        /* if ($plugin === plugin_basename(OPD_FILE)) {
            // Empty
        } */
    }
}
