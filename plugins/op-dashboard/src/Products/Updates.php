<?php

namespace OPDashboard\Products;

use function OPDashboard\customer_release_channel;
use OPDashboard\SL\SL;
use function OPDashboard\sl_url;
use function OptimizePress\Support\array_get;
use OptimizePress\Support\Collection;
use stdClass;

class Updates
{
    /**
     * Check if updates are available
     *
     * @return bool
     */
    public static function areAvailable()
    {
        $pluginUpdates = static::areAvailableForPlugins();
        $themeUpdates  = static::areAvailableForThemes();

        return ($pluginUpdates || $themeUpdates);
    }

    /**
     * Return a list of products for which updates are available
     *
     * @return Collection
     */
    public static function listProducts()
    {
        $updates = new Collection;

        $updates = $updates->merge(static::areAvailableForPlugins());
        $updates = $updates->merge(static::areAvailableForThemes());

        return $updates;
    }

    /**
     * Check plugin updates
     *
     * @return array
     */
    public static function areAvailableForPlugins()
    {
        $plugins           = Registry::plugins();
        $availableProducts = SL::getAvailableProducts();
        $updates           = [];

        if ($availableProducts and $plugins) {
            // Check plugins first
            foreach ($plugins as $plugin) {
                // Find the customer product
                foreach ($availableProducts as $product) {
                    if ($plugin->uid == $product->uid) {
                        $update = static::checkPluginUpdate($plugin, $product);

                        // If an update is available, add it to the transient
                        if ($update) {
                            $updates[$plugin->file] = $product;
                        }
                    }
                }
            }
        }

        return $updates;
    }

    /**
     * Check plugin updates
     *
     * @return array
     */
    public static function areAvailableForThemes()
    {
        $themes            = Registry::themes();
        $availableProducts = SL::getAvailableProducts();
        $updates           = [];

        if ($availableProducts and $themes) {
            // Check plugins first
            foreach ($themes as $theme) {
                // Find the customer product
                foreach ($availableProducts as $product) {
                    if ($theme->uid == $product->uid) {
                        $update = static::checkThemeUpdate($theme, $product);

                        // If an update is available, add it to the transient
                        if ($update) {
                            $updates[$theme->dir] = $product;
                        }
                    }
                }
            }
        }

        return $updates;
    }

    /**
     * Check if the plugin has an update available
     *
     * @param mixed   $plugin
     * @param Product $product
     * @return stdClass
     */
    public static function checkPluginUpdate($plugin, Product $product)
    {
        // Fetch current version
        $currentVersion = $plugin->version;

        // Ping the API and get latest version
        // backwards compatibility, can be removed after few versions
        if (function_exists('OPDashboard\customer_release_channel')) {
            $latestRelease = $product->latestAvailableRelease(customer_release_channel());
        } else {
            $latestRelease = $product->latestAvailableRelease();
        }
        $latestVersion = array_get($latestRelease, 'version');

        // Compare versions
        if (version_compare($currentVersion, $latestVersion, '<') and ! $product->isInDevelopment()) {
            // Fetch the update URL
            $downloadUrl = sl_url('customers/products/install/'.$product->uid.'.zip?v=' . $latestVersion . '&_token=' . get_option('opd_api_token'));

            // Build up object for update
            $plugin = new stdClass;
            $plugin->name              = $product->title;
            $plugin->slug              = $product->uid;
            $plugin->version           = $currentVersion;
            $plugin->new_version       = $latestVersion;
            $plugin->homepage          = 'https://www.optimizepress.com';
            $plugin->url               = 'https://www.optimizepress.com';
            $plugin->download_url      = $downloadUrl;
            $plugin->package           = $downloadUrl;
            $plugin->requires          = array_get($latestRelease, 'wp_version_required', '5.0');
            $plugin->requires_php      = '7.0';
            $plugin->tested            = array_get($latestRelease, 'wp_version_tested', '5.2');
            $plugin->api_token         = get_option('opd_api_token');
            $plugin->sections          = [
                'description'       => $product->description,
                'changelog'         => array_get($latestRelease, 'changelog'),
            ];

            return $plugin;
        }
    }

    /**
     * Check if the plugin has an update available
     *
     * @param  mixed   $theme
     * @param  Product $product
     * @return array
     */
    public static function checkThemeUpdate($theme, Product $product)
    {
        // Fetch current version
        $currentVersion = $theme->version;

        // Ping the API and get latest version
        // backwards compatibility, can be removed after few versions
        if (function_exists('OPDashboard\customer_release_channel')) {
            $latestRelease = $product->latestAvailableRelease(customer_release_channel());
        } else {
            $latestRelease = $product->latestAvailableRelease();
        }
        $latestVersion = array_get($latestRelease, 'version');

        // Compare versions
        if (version_compare($currentVersion, $latestVersion, '<')) {
            // Fetch the update URL
            $downloadUrl = sl_url('customers/products/install/'.$product->uid.'.zip?v=' . $latestVersion . '&_token=' . get_option('opd_api_token'));

            // Build up object for update
            $theme = [
                'theme'       => $product->title,
                'new_version' => $latestVersion,
                'url'         => 'https://www.optimizepress.com',
                'package'     => $downloadUrl,
                'sections'    => [
                    'description'       => $product->description,
                    'changelog'         => array_get($latestRelease, 'changelog'),
                ]
            ];

            return $theme;
        }
    }
}
