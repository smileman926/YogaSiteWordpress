<?php

namespace OPBuilder\Providers;

/**
 * All things regarding compatibility issues with other plugins/themes
 */
class CompatibilityProvider
{
    /**
     * Run the compatibility provider
     *
     * @return void
     */
    public function __construct()
    {
        if (op3_sl_is_connected()) {
            // Compatibility stuff for pages when in editor mode
            if (op3_is_admin()) {
                $this->editorCompatibility();
            }

            // This is only called on public pages
            if (op3_is_public()) {
                $this->publicCompatibility();
            }
        }

        // Disable SSL Insecure Content Filter in OP3 editor on REST routes only
        // could not find a better solution, as this plugin is at init hook
        // on 5 priority and nothing is loaded
        if (strpos($_SERVER['REQUEST_URI'], '/wp-json/op3/v1/') !== false) {
            add_action('init', [$this, 'SSLInsecureContentFixerExclude'], 1);
        }
    }

    /**
     * Turn off SSL Insecure Content fixer capture
     */
    public function SSLInsecureContentFixerExclude()
    {
        add_filter('ssl_insecure_content_disable_capture', function() {
            return true;
        });
    }

    /**
     * For pages when in OP3 editor mode
     *
     * @return void
     */
    public function editorCompatibility()
    {
        // Disable the Autoptimize filters
        add_filter('autoptimize_filter_noptimize', function() {
            return true;
        });

        //  Disable Oxygen builder template include in OP3 editor if Oxygen builder is active
        if (defined('CT_VERSION')) {
            remove_filter('template_include', 'ct_css_output', 99);
        }

        // Disable Yoast SEO in the OP3 editor, as we really do not need it to load there
        if (defined('WPSEO_VERSION')) {
            remove_action('plugins_loaded', 'wpseo_frontend_init', 15);
        }
    }

    /**
     * For pages when viewed publicly
     *
     * @return void
     */
    public function publicCompatibility()
    {
        // Paid Membership Pro plugin, moving it's filter to run after ours
        // administrators will always see content on OP3 pages
        if (defined('PMPRO_VERSION') && ! current_user_can('manage_options')) {
            remove_filter('the_content', 'pmpro_membership_content_filter', 5);
            add_filter('the_content', 'pmpro_membership_content_filter', 15);
        }
    }
}
