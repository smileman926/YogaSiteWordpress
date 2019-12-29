<?php

namespace OPBuilder\Support;

use OPBuilder\Repositories\PageRepository;

class Assets
{
    /**
     * Container holding allowed plugin scripts from OP settings
     *
     * @var array|bool
     */
    protected static $allowedPluginScripts = false;

    /**
     * Container holding allowed theme scripts from OP settings
     *
     * @var array|bool
     */
    protected static $allowedThemeScripts = false;

    /**
     * Container holding allowed plugin stylesheets from OP settings
     *
     * @var array|bool
     */
    protected static $allowedPluginStylesheets = false;

    /**
     * Container holding allowed theme stylesheets from OP settings
     *
     * @var array|bool
     */
    protected static $allowedThemeStylesheets = false;

    /**
     * Check if stylesheet is allowed to be displayed
     *
     * @param $handle
     * @return bool
     */
    public static function stylesheetIsAllowedInBlankTemplate($handle)
    {
        global $wp_styles;

        // Check for OP3 styles
        if (strpos($handle, 'op3-') !== false) {
            return true;
        }

        // Check for settings
        if (strpos($handle, 'admin-bar') !== false) {
            return true;
        }

        // Get plugin/theme dir name from library src
        $src = $wp_styles->registered[$handle]->src;
        $vendorDir = self::findVendorDirInSrc($src);

        // Get plugin and theme stylesheets
        $pluginStylesheets = self::getAllowedPluginStylesheets();
        $themeStylesheets  = self::getAllowedThemeStylesheets();

        // Check if plugin stylesheets needs to be enabled
        if (is_array($pluginStylesheets) && in_array($vendorDir, $pluginStylesheets, true)) {
            return true;
        }

        // Check if theme stylesheet needs to be enabled
        if (is_array($themeStylesheets) && in_array($vendorDir, $themeStylesheets, true)) {
            return true;
        }

        return false;
    }

    /**
     * Check if script is allowed to be displayed
     *
     * @param $handle
     * @return bool
     */
    public static function scriptIsAllowedInBlankTemplate($handle)
    {
        global $wp_scripts;

        // Paid Memberhip Pro temp fix for Stripe
        // this does not belong here
        // we probably need a hook here to have a whitelist of strange handles
        if (defined('PMPRO_VERSION') && $handle == 'stripe') {
            return true;
        }

        // Check for OP3 scripts
        if (strpos($handle, 'op3-') !== false) {
            return true;
        }

        // Check if WP admin bar
        if (strpos($handle, 'admin-bar') !== false) {
            return true;
        }

        // Get plugin/theme dir name from library src
        $src = $wp_scripts->registered[$handle]->src;
        $vendorDir = self::findVendorDirInSrc($src);

        // Get plugin and theme scripts
        $pluginScripts = self::getAllowedPluginScripts();
        $themeScripts  = self::getAllowedThemeScripts();

        // Check if plugin script needs to be enabled
        if (is_array($pluginScripts) && in_array($vendorDir, $pluginScripts, true)) {
            return true;
        }

        // Also check if theme script needs to be enabled
        if (is_array($themeScripts) && in_array($vendorDir, $themeScripts, true)) {
            return true;
        }

        return false;
    }

    /**
     * Fetch and cache allowed vendor plugin scripts
     *
     * @return array|bool|mixed
     */
    public static function getAllowedPluginScripts()
    {
        if (self::$allowedPluginScripts === false) {
            // Prefix based on current state
            $prefix = op3_is_admin() ? 'opd_admin_' : 'opd_';

            // Fetch the stored WP option
            self::$allowedPluginScripts = array_filter((array) get_option($prefix . 'external_plugins')['js'], function($value) { return $value != '0'; });
        }

        return self::$allowedPluginScripts;
    }

    /**
     * Fetch and cache allowed vendor theme scripts
     *
     * @return array|bool|mixed
     */
    public static function getAllowedThemeScripts()
    {
        if (self::$allowedThemeScripts === false) {
            // Prefix based on current state
            $prefix = op3_is_admin() ? 'opd_admin_' : 'opd_';

            // Fetch the stored WP option
            self::$allowedThemeScripts = array_filter((array) get_option($prefix . 'external_themes')['js'], function($value) { return $value != '0'; });
        }

        return self::$allowedThemeScripts;
    }

    /**
     * Fetch and cache allowed vendor plugin stylesheets
     *
     * @return array|bool|mixed
     */
    public static function getAllowedPluginStylesheets()
    {
        if (self::$allowedPluginStylesheets === false) {
            // Prefix based on current state
            $prefix = op3_is_admin() ? 'opd_admin_' : 'opd_';

            // Fetch the stored WP option
            self::$allowedPluginStylesheets = array_filter((array) get_option($prefix.'external_plugins')['css'], function($value) { return $value != '0'; });
        }

        return self::$allowedPluginStylesheets;
    }

    /**
     * Fetch and cache allowed vendor theme stylesheets
     *
     * @return array|bool|mixed
     */
    public static function getAllowedThemeStylesheets()
    {
        if (self::$allowedThemeStylesheets === false) {
            // Prefix based on current state
            $prefix = op3_is_admin() ? 'opd_admin_' : 'opd_';

            // Fetch the stored WP option
            self::$allowedThemeStylesheets = array_filter((array) get_option($prefix . 'external_themes')['css'], function($value) { return $value != '0'; });
        }

        return self::$allowedThemeStylesheets;
    }

    /**
     * Parse source URL and find vendor directory name
     *
     * @param  string $src
     * @return string|null
     */
    public static function findVendorDirInSrc($src)
    {
        // Match required conditions
        preg_match('/\/(plugins|themes)\/(.*?)\//', $src, $vendorDirName);

        // Fetch vendor directory name
        if ($vendorDirName && isset($vendorDirName[2]) && $vendorDirName[2]) {
            $vendorDirName = $vendorDirName[2];
        } else {
            $vendorDirName = null;
        }

        return $vendorDirName;
    }

    /**
     * Check if asset is part of legacy OP plugins
     *
     * @param  string $handle
     * @return bool
     */
    public static function isOPLegacyAsset($handle)
    {
        // Define legacy asset handles
        $legacyHandles = [
            'optimizepress-op-jquery-base-all',
            'optimizepress-op-front-all',
            'optimizepressplus-pack-js-front-all',
            'optimizepress-default',
            'optimizepressplus-pack-css-front-all',
            'op_map_custom',
            'optimize-urgency-frontend'
        ];

        if (in_array($handle, $legacyHandles, true)) {
            return true;
        }

        return false;
    }
}
