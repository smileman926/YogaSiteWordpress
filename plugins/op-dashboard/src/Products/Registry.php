<?php

namespace OPDashboard\Products;

use OptimizePress\Support\Collection;

/**
 * OptimizePress registry for installed and activated plugins/themes
 * Every plugin should register itself as installed/active in here
 *
 * @package OPDashboard\Customers
 */
class Registry
{
    /**
     * @var Collection
     */
    protected static $plugins = [];

    /**
     * @var Collection
     */
    protected static $themes = [];

    /**
     * List all plugins
     *
     * @param bool $reload
     * @return Collection
     */
    public static function plugins($reload = false)
    {
        if (! static::$plugins or $reload) {
            $plugins    = new Collection;
            $pluginRoot = WP_PLUGIN_DIR;

            // Files in wp-content/plugins directory
            $pluginsDir  = @opendir($pluginRoot);
            $pluginFiles = [];

            // Now we walk through the entire plugin directory
            if ($pluginsDir) {
                while (($file = readdir($pluginsDir)) !== false) {
                    // Skip hidden files
                    if (substr($file, 0, 1) == '.') {
                        continue;
                    }

                    // Check if stumble upon a directory (All OP plugins are directories)
                    if (is_dir($pluginRoot . '/' . $file)) {
                        // Now open the sub directory (of the plugin)
                        $pluginsSubdir = @opendir($pluginRoot . '/' . $file);

                        if ($pluginsSubdir) {
                            // And walk through all files in plugin
                            while (($subFile = readdir($pluginsSubdir)) !== false) {
                                // Again skip hidden files
                                if (substr($subFile, 0, 1) == '.') {
                                    continue;
                                }

                                // Find first PHP file (this is the plugin bootstrap)
                                if (substr($subFile, -4) == '.php') {
                                    // And add it to the list
                                    $pluginFiles[] = [
                                        "file"     => "$file/$subFile",
                                        "manifest" => "$pluginRoot/$file/manifest.json",
                                        "path"     => "$pluginRoot/$file/$subFile",
                                    ];
                                }
                            }

                            // Close up plugin directory
                            closedir($pluginsSubdir);
                        }
                    }
                }

                // Finish reading
                closedir($pluginsDir);
            }

            // Now lets build up our plugin collection
            foreach ($pluginFiles as $pluginData) {
                // Bail if the permissions are not correct
                if (! is_readable("$pluginRoot/" . $pluginData["file"])) {
                    continue;
                }

                // Now parse the plugin headers
                $plugin = static::buildPlugin($pluginData);

                // Add the plugin to the list
                if ($plugin->isOpPlugin()) {
                    $plugins->push($plugin);
                }
            }

            // Add to registry
            static::$plugins = $plugins;
        }

        return static::$plugins;
    }

    /**
     * List all themes
     *
     * @param bool $reload
     * @return Collection
     */
    public static function themes($reload = false)
    {
        if (! static::$themes or $reload) {
            $themes     = new Collection;

            foreach (search_theme_directories() as $themeData) {
                $themeFile     = $themeData['theme_file'];
                $themeFilePath = $themeData['theme_root'] . '/' . $themeData['theme_file'];

                // Bail if the permissions are not correct
                if (! is_readable($themeFilePath)) {
                    continue;
                }

                // Now parse the theme headers
                $theme = static::buildTheme($themeFile, $themeFilePath);

                // Add the plugin to the list
                if ($theme->isOpTheme()) {
                    $themes->push($theme);
                }
            }

            // Add to registry
            static::$themes = $themes;
        }

        return static::$themes;
    }

    /**
     * Get plugin from registry
     *
     * @param $uid
     * @return mixed|null
     */
    public static function getPlugin($uid)
    {
        $plugins = static::plugins();

        foreach ($plugins as $plugin) {
            if ($plugin->uid == $uid) {
                return $plugin;
            }
        }
    }

    /**
     * Get theme from registry
     *
     * @param $uid
     * @return mixed|null
     */
    public static function getTheme($uid)
    {
        $themes = static::themes();

        foreach ($themes as $theme) {
            if ($theme->uid == $uid) {
                return $theme;
            }
        }
    }

    /**
     * Build up plugin object
     *
     * @param  array $pluginData
     * @return Plugin
     */
    public static function buildPlugin($pluginData)
    {
        // Get plugin data
        $data             = static::getPluginData($pluginData);
        $data['file']     = $pluginData['file'];
        $data['manifest'] = static::getPluginManifest($pluginData);

        // Setup plugin object
        $plugin = new Plugin($data);

        return $plugin;
    }

    /**
     * Build up plugin object
     *
     * @param  string $file
     * @param  string $path
     * @return Theme
     */
    public static function buildTheme($file, $path)
    {
        $data         = static::getThemeData($file, $path);
        $data['file'] = $file;
        $data['dir']  = basename(str_replace('/style.css', '', $path));

        // Setup plugin object
        $theme = new Theme($data);

        return $theme;
    }

    /**
     * Fetch plugin metadata
     *
     * @param  array $pluginData
     * @return array
     */
    public static function getPluginData($pluginData)
    {
        $pluginFile = WP_PLUGIN_DIR . "/" . $pluginData['file'];

        // These headers are slightly different for OP plugins since we require the plugin UID
        $defaultHeaders = [
            'name'        => 'Plugin Name',
            'plugin_uri'  => 'Plugin URI',
            'op_uid'      => 'OP UID',
            'version'     => 'Version',
            'description' => 'Description',
            'author'      => 'Author',
            'author_uri'  => 'Author URI',
            'text_domain' => 'Text Domain',
            'domain_path' => 'Domain Path',
            'network'     => 'Network',
        ];

        // Read the plugin data
        $data = get_file_data($pluginFile, $defaultHeaders, 'plugin');

        return $data;
    }

    /**
     * Fetch product manifest data
     *
     * @param  $file
     * @return array
     */
    public static function getPluginManifest($file)
    {
        $data         = [];
        $manifestFile = isset($file['manifest']) ? $file['manifest'] : '';

        if (is_readable($manifestFile)) {
            // Read data from file
            $fp       = fopen($manifestFile, 'r');
            $fileData = fread($fp, 8192);
            fclose($fp);

            // Parse manifest data
            $data = @json_decode($fileData, true);
        }

        return $data;
    }

    /**
     * Fetch plugin metadata
     *
     * @param  string $file
     * @param  string $path
     * @return array
     */
    public static function getThemeData($file, $path)
    {
        // These headers are slightly different for OP plugins since we require the plugin UID
        $defaultHeaders = [
            'name'        => 'Theme Name',
            "theme"       => 'Theme Name',
            "version"     => 'Version',
            "url"         => 'https://www.optimizepress.com',
            "package"     => 'URL',
            'op_uid'      => 'OP UID',
        ];

        // Read the plugin data
        $data = get_file_data($path, $defaultHeaders, 'theme');

        return $data;
    }

    /**
     * Check if plugin/theme is installed
     *
     * @param  string $uid
     * @param  string $channel
     * @return bool
     */
    public static function isProductInstalled($uid, $channel = null)
    {
        // Check plugins
        foreach (static::plugins() as $plugin) {
            if ($plugin->uid == $uid) {
                return true;
            }
        }

        // Check themes
        foreach (static::themes() as $theme) {
            if ($theme->uid == $uid) {
                return true;
            }
        }

        return false;
    }

    /**
     * Check if plugin/theme is activated
     *
     * @param  string $uid
     * @param  string $channel
     * @return bool
     */
    public static function isProductActive($uid, $channel = null)
    {
        foreach (static::plugins() as $plugin) {
            if ($plugin->uid == $uid) {
                return is_plugin_active($plugin->file);
            }
        }

        // First find active theme
        $activeTheme = static::getActiveTheme();

        foreach (static::themes() as $theme) {
            if ($theme->uid == $uid) {
                return $theme->uid == $activeTheme->uid;
            }
        }

        return false;
    }

    /**
     * Return the current active OP theme
     *
     * @return null|Theme
     */
    public static function getActiveTheme()
    {
        $wpTheme       = wp_get_theme();

        if ($wpTheme) {
            $themeFile     = $wpTheme->stylesheet . '/style.css';
            $themeFilePath = get_theme_root() . '/' . $themeFile;
            $theme         = static::buildTheme($themeFile, $themeFilePath);

            return $theme;
        }

        return null;
    }

    public function getManifest()
    {

    }
}
