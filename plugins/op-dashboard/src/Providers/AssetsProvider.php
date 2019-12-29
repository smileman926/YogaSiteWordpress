<?php

namespace OPDashboard\Providers;

use function OPDashboard\is_op_plugin_admin;
use function OPDashboard\is_opdashboard_admin;
use OPDashboard\Navigation\Item;
use OPDashboard\Services\Menus;

class AssetsProvider
{
    /**
     * Triggered when deactivating the plugin
     *
     * @return void
     */
    public function init()
    {
        // Add specific class for admin pages
        add_filter('admin_body_class', function($classes) {
            if (is_opdashboard_admin()) {
                return "$classes op-dashboard-admin-app";
            }

            return $classes;
        });

        // Then add the assets
        add_action('admin_enqueue_scripts', [$this, "enqueueAdminScripts"]);
        add_action('wp_enqueue_scripts',    [$this, "enqueueScripts"]);
    }

    public function enqueueScripts()
    {
//        wp_enqueue_style("roboto", "https://fonts.googleapis.com/css?family=Roboto:400,700");
//        wp_enqueue_style("font-awesome", plugins_url("assets/css/font-awesome.min.css", OPD_FILE));
    }

    /**
     * Add admin assets to markup
     *
     * @return void
     */
    public function enqueueAdminScripts()
    {
        // First add stylesheets
        //wp_enqueue_style("opd-plugin-dashboard-admin", plugins_url("public/assets/css/admin.css",      OPD_FILE), [], $this->version());
        //wp_enqueue_style("op3-general-admin",          plugins_url("public/assets/css/general.css",    OPD_FILE), [], $this->version());
        //wp_enqueue_style("ops-fonts-admin",            plugins_url("public/assets/css/fonts.css",      OPD_FILE), [], $this->version());
//        wp_enqueue_style("op-builder",                 plugins_url("public/assets/css/op-builder.css", OPD_FILE), [], $this->version());

        // Then add the scripts
        //wp_enqueue_script("op3-general", plugins_url("public/assets/js/OPGeneral.js", OPD_FILE), ["jquery"], $this->version());
//        wp_enqueue_script("op3-builder", plugins_url("public/assets/js/OPBuilder.js", OPD_FILE), ["op3-general"], $this->version());

        // Localize the scripts
        //wp_localize_script("op3-general", 'op3general', ['ajax_url' => admin_url('admin-ajax.php')]);

        wp_enqueue_script("ops-plugin-dashboard",  plugins_url("public/assets/js/app.js", OPD_FILE), ["jquery", "updates"], $this->version());
        wp_localize_script("ops-plugin-dashboard", 'OpsScriptData', [
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce'    => wp_create_nonce('wp_rest'),
        ]);

        if (is_opdashboard_admin() or is_op_plugin_admin()) {
            wp_enqueue_style("ops-framework",        plugins_url("public/assets/css/framework.css", OPD_FILE), [], $this->version());
            wp_enqueue_style("ops-plugin-dashboard", plugins_url("public/assets/css/app.css",       OPD_FILE), [], $this->version());


//            wp_enqueue_script("opd-plugin-dashboard", plugins_url("assets/js/dashboard.js", OPD_FILE), array("jquery", "wp-color-picker"));

//            wp_enqueue_style("open-sans", "https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700");
//            wp_enqueue_style('wp-color-picker');
//            wp_enqueue_style("opd-plugin-bootstrap", plugins_url("assets/css/bootstrap.css", OPD_FILE));
//            wp_enqueue_style("opd-plugin-dashboard", plugins_url("assets/css/dashboard.css", OPD_FILE));
//            wp_enqueue_style("font-awesome", plugins_url("assets/css/font-awesome.min.css", OPD_FILE));

            wp_enqueue_media();

            remove_all_actions("admin_notices");
        }

        if (is_admin()) {
            wp_enqueue_style("ops-wp-dashboard", plugins_url("public/assets/css/wp.css", OPD_FILE), [], $this->version());
        }
    }

    /**
     * Return plugin version
     *
     * @return string
     */
    public function version()
    {
        return OPD_VERSION;
    }
}
