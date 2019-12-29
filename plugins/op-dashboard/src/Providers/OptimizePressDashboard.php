<?php

namespace OPDashboard\Providers;

use OPDashboard\Integrations\IntegrationRepository;
use function OPDashboard\customer_release_channel;
use function OPDashboard\get_broadcast_messages;
use function OPDashboard\is_release_channel_valid;
use function OPDashboard\opd_config;

class OptimizePressDashboard
{
    /**
     * Initialize the plugin
     *
     * @return void
     */
    public function init()
    {
        // Check release channel
        add_action('init', [$this, 'checkReleaseChannel']);

        // Register installation, activation and deactivation hooks
        register_activation_hook(OPD_FILE,   [$this, 'install']);
        register_deactivation_hook(OPD_FILE, [$this, 'deactivate']);

        // @TODO: Not sure what this does
        // add_filter('submenu_file', ["Opd_Plugin", "opd_action_admin_submenu_filter"]);

        // Add admin dashboard messages
        add_action('admin_notices', [$this, 'addMessages']);

        // Add updater
        add_action('init', [new UpdateProvider, 'init']);

        // Initialize navigation
        add_action('init', [new NavigationProvider, 'init'], 5);

        // Add assets
        add_action('init', [new AssetsProvider, 'init']);

        // Register routes
        add_action('init', [new RouteRegistration, 'register']);

        // Load translations
        add_action('init', [$this, 'loadPluginTextDomain']);

        // Local installs
        add_filter('http_request_host_is_external', function ($allow, $host, $url) {
            if (getenv('WP_ENV') == 'development' && $host == 'optimizepress-sl.local') {
                $allow = true;
            }

            return $allow;
        }, 10, 3);

        // Load ReCaptcha Provider
        add_action('init', [new RecaptchaProvider, 'init']);

        add_filter('plugin_row_meta',     [ $this, 'op3DashboardPluginRowMeta' ], 10, 2 );
    }

    /**
     * Adds meta links to OP3 plugin
     *
     * @param $plugin_meta
     * @param $plugin_file
     * @return array
     */
    public function op3DashboardPluginRowMeta($plugin_meta, $plugin_file ) {
        if (OPD_BASE === $plugin_file) {
            $row_meta = [
                'op3help' => '<a href="https://docs.optimizepress.com" aria-label="' . esc_attr( __( 'Go To OptimizePress 3 Documentation', 'op3' ) ) . '" target="_blank">' . __('Help', 'op3') . '</a>',
                'op3hub' => '<a href="https://my.optimizepress.com" aria-label="' . esc_attr( __( 'Go To OptimizePress Member\'s Hub', 'op3' ) ) . '" target="_blank">' . __('Member\'s Hub', 'op3') . '</a>',
            ];

            $plugin_meta = array_merge( $plugin_meta, $row_meta );
        }

        return $plugin_meta;
    }

    /**
     * Triggered when installing plugin
     */
    public function install()
    {
        $installer = new PluginInstaller;
        $installer->run();
    }

    /**
     * Triggered when deactivating plugin
     */
    public function deactivate()
    {
        $deactivator = new PluginDeactivator;
        $deactivator->deactivate();
    }

    /**
     * Load the plugin text domain for translation.
     */
    public function loadPluginTextDomain()
    {
        $domain = 'opdash';
        $locale = apply_filters('plugin_locale', get_locale(), $domain);

        load_textdomain($domain, WP_LANG_DIR . '/' . $domain . '/' . $domain . '-' . $locale . '.mo');
        load_plugin_textdomain($domain, FALSE, OPD_PATH . '/lang/');
    }

    public function addMessages()
    {
        $messages = get_broadcast_messages('wp', 'header');

        foreach ($messages as $message) {
            // Different types for WP
            $type = $message->type;

            echo '<div class="notice ops-notice-' . $type . ' is-dismissible">';
            echo '<p><strong>OptimizePress:</strong> ' . $message->body . '</p>';
            echo '</div>';
        }
    }

    /**
     * Check release channel
     *
     * @return void
     */
    public function checkReleaseChannel()
    {
        $releaseChannel = defined('OPD_CUSTOMER_RELEASE_CHANNEL') ? OPD_CUSTOMER_RELEASE_CHANNEL : null;

        if (! is_release_channel_valid($releaseChannel)) {
            wp_die('Invalid OptimizePress release channel (' . $releaseChannel . '). <br><br>Please check the PHP constant: OPD_CUSTOMER_RELEASE_CHANNEL');
        }
    }
}
