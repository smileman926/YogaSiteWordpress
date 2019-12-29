<?php

namespace OPDashboard\Installer;

use OPDashboard\Products\Product;
use OPDashboard\SL\SL;
use function OPDashboard\sl_license_is_valid;
use function OPDashboard\sl_license_is_valid_or_fail;
use function OptimizePress\Support\array_get;
use WP_Upgrader;

class Installer
{
    /**
     * Init new product installer
     */
    public function __construct()
    {
        if (! class_exists("WP_Upgrader")) {
            require_once(ABSPATH.'/wp-admin/includes/class-wp-upgrader.php');
            require_once(ABSPATH.'/wp-admin/includes/class-wp-upgrader-skin.php');
        }
    }

    /**
     * Run product installation
     *
     * @param string $productId
     * @param string $version
     * @param array  $options
     * @throws \Exception
     */
    public function install($productId, $version = null, $options = [])
    {
        // Check license
        sl_license_is_valid_or_fail("License expired");

        // Find product and initialize libraries
        $product  = $this->findProduct($productId);
        $feedback = (bool) array_get($options, 'feedback', true);
        $skin     = $feedback ? new Skin(['title' => 'Installing '.$product->title]) : new JsonSkin(['title' => null]);
        $upgrader = new WP_Upgrader($skin);

        // Find the release (if no release is passed we'll get the latest one)
        if (! $version) {
            $version = $product->latest_release['version'];
        }

        // Prepare updater skin
        $skin->add_strings();
        if ($feedback) {
            $skin->header();
        } else {
            header('Content-Type: application/json');
        }

        // Get package URL
        $packageName = $product->uid;
        $url = $this->findReleaseURL($product, $version);

        if ($url) {
            // Prepare destination
            if ($product->type === 'theme') {
                $destination = trailingslashit(get_theme_root() . '/' . $packageName);
            } else {
                $destination = trailingslashit(WP_PLUGIN_DIR . '/' . $packageName);
            }

            // Connect to filesystem, get package and unzip it
            $upgrader->fs_connect([WP_CONTENT_DIR]);
            $package     = $upgrader->download_package($url);
            $directory   = $upgrader->unpack_package($package);

            // Check for .git directory so we don't delete development versions
            if (file_exists($destination . '/.git')) {
                $message = "Careful! Can't update " . $product->title . '. You have a .git directory in your product directory. This means you have a developer version installed, so be careful not to lose your changes.';

                if ($feedback) {
                    wp_die($message);
                } else {
                    echo @json_encode([
                        'success' => false,
                        'data' => ['message' => $message],
                        'error' => true,
                    ]);
                    die();
                }
            }

            // Check for error
            if (! is_wp_error($directory)) {
                // Install it
                $upgrader->install_package([
                    'source'            => trailingslashit($directory),
                    'destination'       => $destination,
                    'clear_destination' => true,
                    'clear_working'     => true,
                ]);

                // Display the feedback
                if ($product->type === "theme") {
                    $activationUrl = admin_url('themes.php#' . $packageName);
                } else {
                    $activationUrl = admin_url('plugins.php#' . $packageName);
                }

                if ($feedback) {
                    $skin->feedback(__('Done.', 'op-installer'));
                    $skin->feedback(sprintf(__('<a href="%s">Activate plugin</a>', 'opd'), $activationUrl));
                    $skin->footer();
                } else {
                    echo @json_encode([
                        'success' => true,
                        'data' => [],
                    ]);
//                    {"success":true,"data":{"update":"plugin","slug":"op-test-plugin","oldVersion":"Version 1.0.0","newVersion":"Version 1.0.0","plugin":"op-test-plugin\/op-test-plugin.php","pluginName":"OptimizePress Test Plugin","debug":["Enabling Maintenance mode&#8230;","Downloading update from http:\/\/optimizepress-sl.local\/customers\/products\/install\/op-test-plugin.zip&#8230;","Unpacking the update&#8230;","Installing the latest version&#8230;","Removing the old version of the plugin&#8230;","Plugin updated successfully.","Disabling Maintenance mode&#8230;"]}}
                }
            } elseif ($feedback) {
                $skin->feedback(__('Error when installing.', 'op-installer'));
                $skin->footer();
            }
        } elseif ($feedback) {
            $skin->feedback(__('Error when installing.', 'op-installer'));
            $skin->footer();
        }
    }

    /**
     * Install multiple products
     *
     * @param array $productFiles
     * @param null  $release
     * @param array $options
     * @throws \Exception
     */
    public function installBatch($productFiles, $release = null, $options = [])
    {
        foreach ($productFiles as $productFile) {
            $this->install($productFile, $release, $options);
        }

        echo @json_encode(['success' => true, 'error' => false, 'message' => 'Done.']);
    }

    /**
     * Find SL product
     *
     * @param  string $uid
     * @return mixed
     */
    public function findProduct($uid)
    {
        $customer = SL::getCustomerDetails();

        foreach ($customer->products as $product) {
            if ($product->uid === $uid) {
                return $product;
            }
        }
    }

    /**
     * Then get the latest release package URL
     *
     * @param  Product $product
     * @return mixed
     * @throws \Exception
     */
    public function findLatestReleaseUrl($product)
    {
        // Let's fetch the signed URL from the SL API
        $signedReleaseUrl = SL::getProductDownloadUrl($product->uid);

        // We also need to append the token
        $signedReleaseUrl .= (strpos($signedReleaseUrl, '?') !== false ? '&' : '?') . '_token=' . get_option('opd_api_token');

        return $signedReleaseUrl;
    }

    /**
     * Get specific release package URL
     *
     * @param  Product $product
     * @param null     $version
     * @return mixed
     * @throws \Exception
     */
    public function findReleaseURL($product, $version = null)
    {
        // Let's fetch the signed URL from the SL API
        $signedReleaseUrl = SL::getProductDownloadUrl($product->uid, $version);

        // Append token if needed
        if (strpos($signedReleaseUrl, 's3.amazonaws.com') === false) {
            $signedReleaseUrl .= (strpos($signedReleaseUrl, '?') !== false ? '&' : '?') . '_token=' . get_option('opd_api_token');
        }

        return $signedReleaseUrl;
    }
}
