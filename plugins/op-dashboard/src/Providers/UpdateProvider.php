<?php

namespace OPDashboard\Providers;

use Exception;
use function OPDashboard\clear_all_cache;
use function OPDashboard\customer_release_channel;
use OPDashboard\Products\Registry;
use OPDashboard\Products\Updates;
use OPDashboard\Services\Log;
use OPDashboard\SL\SL;
use function OPDashboard\sl_url;
use function OptimizePress\Support\array_get;
use OptimizePress\Support\DataObject;

class UpdateProvider
{
    /**
     * @var string
     */
    protected $updatePluginsSlug            = 'opd_update_plugins_check_response';
    protected $updatePluginsLastCheckedSlug = 'opd_update_plugins_last_check';

    /**
     * @var string
     */
    protected $updateThemesSlug            = 'opd_update_themes_check_response';
    protected $updateThemesLastCheckedSlug = 'opd_update_plugins_last_check';

    /**
     * Initialize the plugin updater
     */
    public function init()
    {
        // Inject product info
        if (isset($_GET['tab']) and $_GET['tab'] == 'plugin-information') {
            add_filter('plugins_api', [$this, 'addAllProductInfo'], 20, 3);
        }

        // Actions for updating plugins and themes
        add_filter('pre_set_site_transient_update_plugins', [$this, 'checkPluginUpdates']);
        add_filter('site_transient_update_plugins',         [$this, 'checkPluginUpdates']);
        add_filter('pre_set_site_transient_update_themes',  [$this, 'checkThemeUpdates']);
        add_filter('site_transient_update_themes',          [$this, 'checkThemeUpdates']);

        // Clearing the cache
        add_action('upgrader_process_complete', [$this, 'cleanCache'], 9, 0 );
    }

    /**
     * Let's check for updates of all installed plugins
     *
     * @param $transient
     * @return mixed
     * @throws Exception
     */
    public function checkPluginUpdates($transient)
    {
        $now           = (int) time();
        $checked       = (int) isset($transient->last_checked) ? $transient->last_checked : 0;
        $lastOpChecked = (int) get_transient($this->updatePluginsLastCheckedSlug) ?: 0;
        $sinceUpdate   = $now - $lastOpChecked;
        $ttl           = defined('OPD_UPDATE_CACHE_TTL') ? OPD_UPDATE_CACHE_TTL : (60*60*3);
        $response      = get_transient($this->updatePluginsSlug) ?: [];
        $plugins       = Registry::plugins();

        if ($sinceUpdate >= $ttl or ! $response) {
            // Fetch all available OP plugins
            $availableProducts = SL::getAvailableProducts();
            // Log::debug("[OPD] Checking updates: " . date('Y-m-d H:i:s'));

            if ($availableProducts and $plugins) {
                // Check plugins first
                foreach ($plugins as $plugin) {
                    // Find the customer product
                    foreach ($availableProducts as $product) {
                        if ($plugin->uid === $product->uid) {
                            $update = Updates::checkPluginUpdate($plugin, $product);

                            // If an update is available, add it to the transient
                            if ($update) {
                                $response[$plugin->file] = $update;
                            }
                        }
                    }
                }

                // Add response to transient
                set_transient($this->updatePluginsSlug, $response, $ttl);
                set_transient($this->updatePluginsLastCheckedSlug, $now, $ttl);
            }
        } else {
            $response = get_transient($this->updatePluginsSlug);
        }

        // Add to main response
        if ($transient and isset($transient->response) and $response and is_array($response)) {
            // Merge the check to the main response
            $transient->response = array_merge($transient->response, $response);

            // Also check plugins that don't need an update
            foreach ($plugins as $plugin) {
                $pluginTransient        = array_get($transient->response, $plugin->file);
                $pluginTransientVersion = $pluginTransient ? $pluginTransient->new_version : 0;

                if ($pluginTransientVersion and version_compare($plugin->version, $pluginTransientVersion, '>=')) {
                    $transient->no_update[$plugin->file] = $response[$plugin->file];

                    if (isset($transient->response[$plugin->file])) {
                        unset($transient->response[$plugin->file]);
                    }
                }
            }

        }

        return $transient;
    }

    /**
     * Let's check for updates of all installed themes
     *
     * @param $transient
     * @return mixed
     */
    public function checkThemeUpdates($transient)
    {
        $now         = (int) time();
        $checked     = (int) isset($transient->last_checked) ? $transient->last_checked : 0;
        $sinceUpdate = $now - $checked;
        $ttl         = 60*60*3*0;
        $response    = get_transient($this->updateThemesSlug) ?: [];

        if ($sinceUpdate >= $ttl or ! $response) {
            // Fetch all installed plugins
            $themes            = Registry::themes();
            $availableProducts = SL::getAvailableProducts();

            if ($themes and $availableProducts) {
                // And check themes
                foreach ($themes as $theme) {
                    // Find the customer product
                    foreach ($availableProducts as $product) {
                        if ($theme->uid === $product->uid) {
                            $update = Updates::checkThemeUpdate($theme, $product);

                            // If an update is available, add it to the transient
                            if ($update) {
                                $response[$theme->dir] = $update;
                            }
                        }
                    }
                }

                // Add response to transient
                set_transient($this->updateThemesSlug, $response, $ttl);
            }
        } else {
            $response = get_transient($this->updateThemesSlug);
        }

        // Add to main response
        if ($transient and isset($transient->response) and $response and is_array($response)) {
            $transient->response = array_merge($transient->response, $response);

            // Also check themes that don't need an update
            foreach ($themes as $theme) {
                $themeDirectory        = str_replace('/style.css', '', $theme->file);
                $themeTransient        = array_get($transient->response, $themeDirectory);
                $themeTransientVersion = $themeTransient ? $themeTransient['new_version'] : 0;

                if ($themeTransientVersion and version_compare($theme->version, $themeTransientVersion, '>=')) {
                    $transient->no_update[$themeDirectory] = $response[$themeDirectory];

                    if (isset($transient->response[$themeDirectory])) {
                        unset($transient->response[$themeDirectory]);
                    }
                }
            }
        }

        return $transient;
    }

    /**
     * Add detailed info for all OP products
     *
     * @param mixed  $result
     * @param mixed  $action
     * @param mixed  $args
     * @return object|\StdClass
     * @throws Exception
     */
    public function addAllProductInfo($result, $action = null, $args = null)
    {
        $info = new \StdClass;
        $slug = isset($args->slug) ? $args->slug : null;
        $availableProducts = SL::getAvailableProducts();

        foreach ($availableProducts as $product) {
            if ($slug == $product->uid) {
                // Fetch the info from SL
                $productInfo = (object) SL::getProductInfo($product->uid);

                // Ping the API and get latest version
                // backwards compatibility, can be removed after few versions
                if (function_exists('OPDashboard\customer_release_channel')) {
                    $latestRelease = $product->latestAvailableRelease(customer_release_channel());
                } else {
                    $latestRelease = $product->latestAvailableRelease();
                }
                $latestVersion = array_get($latestRelease, 'version');

                // Fetch the update URL
                $downloadUrl = sl_url('customers/products/install/'.$product->uid.'.zip?v=' . $latestVersion . '&_token=' . get_option('opd_api_token'));

                $info = (object) [
                    'name'            => $product->title,
                    'slug'            => $product->uid,
                    'version'         => $latestVersion,
                    'download_url'    => $downloadUrl,
                    'homepage'        => 'https://www.optimizepress.com',
                    'requires'        => array_get($latestRelease, 'wp_version_required', '5.0'),
                    'requires_php'    => '7.0',
                    'tested'          => array_get($latestRelease, 'wp_version_tested', '5.2'),
                    'last_updated'    => array_get($latestRelease, 'released_t', '5.2'),
                    'upgrade_notice'  => '',
                    'author'          => 'OptimizePress',
                    'author_homepage' => 'https://www.optimizepress.com',
                    'sections'        => [
                        'description' => $product->description,
                        'changelog'   => array_get($latestRelease, 'changelog'),
                    ],
                    'icons'   => $productInfo->icons,
                    'banners' => $productInfo->banners,
                ];

                // We are returning it as soon as we have a hit, as we only have one hit here
                // not breaking other plugins
                return $info;
            }
        }

        return $result;
    }

    /**
     * Clean the cache for update checking
     *
     * @return void
     */
    public function cleanCache()
    {
        delete_transient($this->updatePluginsSlug);
        delete_transient($this->updatePluginsLastCheckedSlug);
        delete_transient($this->updateThemesSlug);
        delete_transient($this->updateThemesLastCheckedSlug);

        // We also clear the pages cache
        clear_all_cache();
    }
}
