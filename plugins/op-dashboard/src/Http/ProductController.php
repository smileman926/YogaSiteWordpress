<?php

namespace OPDashboard\Http;

use OPDashboard\Installer\Installer;
use function OPDashboard\view;

class ProductController extends Controller
{
    /**
     * Install a new OP product
     *
     * @return void
     * @throws \Exception
     */
    public static function install()
    {
        // Find the product ID
        $product = isset($_GET['op-product']) ? $_GET['op-product'] : null;

        // Run the installer
        if ($product) {
            $installer = new Installer;
            $installer->install($product);
        } else {
            echo "ERROR!";
        }

        wp_die();
    }

    /**
     * Install a new OP plugin via ajax
     *
     * @return void
     * @throws \Exception
     */
    public static function ajaxInstallPlugin()
    {
        // Find the product ID
        $product = isset($_POST['slug']) ? $_POST['slug'] : null;

        // Run the installer
        static::ajaxInstallProduct($product);
    }

    /**
     * Update OP plugin via ajax
     *
     * @return void
     * @throws \Exception
     */
    public static function ajaxUpdatePlugin()
    {
        // Find the product ID
        $products = isset($_POST['checked']) ? $_POST['checked'] : null;
        $product  = isset($_POST['slug'])    ? $_POST['slug']    : null;

        // Run the installer
        if ($products) {
            static::ajaxInstallProducts($products);
        } else {
            static::ajaxInstallProduct($product);
        }
    }

    /**
     * Install a new OP theme via ajax
     *
     * @return void
     * @throws \Exception
     */
    public static function ajaxInstallTheme()
    {
        // Find the product ID
        $product = isset($_POST['slug']) ? $_POST['slug'] : null;

        // Run the installer
        static::ajaxInstallProduct($product);
    }

    /**
     * Update OP theme via ajax
     *
     * @return void
     * @throws \Exception
     */
    public static function ajaxUpdateTheme()
    {
        // Find the product ID
        $product = isset($_POST['slug']) ? $_POST['slug'] : null;

        // Run the installer
        static::ajaxInstallProduct($product);
    }

    /**
     * Install or update OP products via ajax
     *
     * @param  string $product
     * @throws \Exception
     */
    protected static function ajaxInstallProduct($product)
    {
        if ($product) {
            $version   = isset($_POST['version']) ? $_POST['version'] : null;
            $installer = new Installer;
            $installer->install($product, $version, ['feedback' => false]);
        } else {
            echo "ERROR!";
        }

        wp_die();
    }

    /**
     * Install or update OP products via ajax
     *
     * @param  array $products
     * @throws \Exception
     */
    protected static function ajaxInstallProducts($products)
    {
        if ($products) {
            $installer = new Installer;
            $installer->installBatch($products, null, ['feedback' => false]);
        } else {
            echo "ERROR!";
        }

        wp_die();
    }
}
