<?php

namespace OPDashboard\Products;

use OPDashboard\Services\DataObject;

class Product extends DataObject
{
    /**
     * Check if product/plugin/theme is active
     *
     * @param  string $channel
     * @return bool
     */
    public function isActive($channel = null)
    {
        return Registry::isProductActive($this->uid, $channel);
    }

    /**
     * Check if product/plugin/theme is installed
     *
     * @param  string $channel
     * @return bool
     */
    public function isInstalled($channel = null)
    {
        return Registry::isProductInstalled($this->uid, $channel);
    }

    /**
     * Check if installed product has an update available
     *
     * @param string $channel
     * @return bool
     */
    public function hasAvailableUpdates($channel = 'stable')
    {
        // First let's check the plugins
        if ($this->type == 'plugin') {
            $plugin = Registry::getPlugin($this->uid);

            if ($plugin) {
                $currentVersion = $plugin->version;
                $latestVersion  = $this->latestAvailableVersion($channel);

                if (version_compare($currentVersion, $latestVersion, '<')) {
                    return true;
                }
            }

        // Then let's check the themes
        } elseif ($this->type == 'theme') {
            $theme = Registry::getTheme($this->uid);

            if ($theme) {
                $currentVersion = $theme->version;
                $latestVersion  = $this->latestAvailableVersion();

                if (version_compare($currentVersion, $latestVersion, '<')) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Just return latest available release
     *
     * @TODO: for now it returns the latest stable version
     *
     * @param string $channel
     * @return mixed
     */
    public function latestAvailableRelease($channel = null)
    {
        if ($channel === 'stable') {
            return $this->latest_stable_release;
        } elseif ($channel === 'beta') {
            return $this->latest_beta_release;
        } elseif ($channel === 'demo') {
            return $this->latest_demo_release;
        } else {
            return $this->latest_release;
        }
    }

    /**
     * Just return latest stable release
     *
     * @return mixed
     */
    public function latestStableRelease()
    {
        return $this->latestAvailableRelease('stable');
    }

    /**
     * Just return latest beta release
     *
     * @return mixed
     */
    public function latestBetaRelease()
    {
        return $this->latestAvailableRelease('beta');
    }

    /**
     * Just return latest demo release
     *
     * @return mixed
     */
    public function latestDemoRelease()
    {
        return $this->latestAvailableRelease('demo');
    }

    /**
     * Simply return latest available version
     *
     * @param  string $channel
     * @return string
     */
    public function latestAvailableVersion($channel = null)
    {
        $release = $this->latestAvailableRelease($channel);

        return $release['version'];
    }

    /**
     * Check if product is in development
     * We simply check if it contains a .git directory, so we don't loose any changes accidentally
     *
     * @return bool
     */
    public function isInDevelopment()
    {
        $inDevelopment = false;

        // Prepare destination
        if ($this->type == "theme") {
            $location = trailingslashit(get_theme_root() . '/' . $this->uid);
        } else {
            $location = trailingslashit(WP_PLUGIN_DIR . '/' . $this->uid);
        }

        // Check for .git directory so we don't delete development versions
        if (file_exists($location . '/.git')) {
            $inDevelopment = true;
        }

        return $inDevelopment;
    }

    /**
     * Return the registry entry for the product
     */
    public function registry()
    {
        if ($this->type == "theme") {
            return Registry::getTheme($this->uid) ?: new Theme([]);
        }

        return Registry::getPlugin($this->uid) ?: new Plugin([]);
    }

    /**
     * Return URL to preview image
     *
     * @param  string $size
     * @return string
     */
    public function previewImage($size = null)
    {
        $size = $size ?: 'large';

        return isset($this->preview[$size]) ? $this->preview[$size] : '';
    }

    /**
     * Return URL to icon image
     *
     * @param  string $size
     * @return string
     */
    public function iconImage($size = null)
    {
        return '';
    }

    /**
     * Return path to banner image
     *
     * @param  string $size
     * @return string
     */
    public function bannerImage($size = null)
    {
        return '';
    }
}
