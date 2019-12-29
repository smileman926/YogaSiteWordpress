<?php

namespace OPDashboard;

use League\Plates\Engine as ViewEngine;
use OPDashboard\Products\Product;
use OPDashboard\Integrations\IntegrationRepository;
use OPDashboard\SL\SL;
use OptimizePress\Integrations\Integration;
use OptimizePress\Integrations\Collections\IntegrationsCollection;
use function OptimizePress\Support\array_get;
use OptimizePress\Support\Collection;
use OptimizePress\Support\DataObject;
use OptimizePress\Support\Log\Log;

/**
 * Create URL to SL
 *
 * @param  string $url
 * @return string
 */
function sl_url($url)
{
    return preg_replace('/([^:])(\/{2,})/', '$1/', OPD_SL_BASE_URL . '/' . $url);
}

/**
 * Check if SL is connected (API token exists)
 *
 * @return bool
 * @throws \Exception
 */
function sl_is_connected()
{
    return SL::isConnected();
}

/**
 * Check if current domain is activated
 *
 * @param  string $domain
 * @return bool
 */
function sl_is_active_domain($domain = null)
{
    return SL::isActiveDomain($domain);
}

/**
 * Return current customer
 *
 * @return array|mixed|object
 * @throws \Exception
 */
function sl_customer()
{
    return SL::getCustomer();
}

/**
 * Return current customer details
 *
 * @return array|mixed|object
 * @throws \Exception
 */
function sl_customer_details()
{
    return SL::getCustomerDetails();
}

/**
 * Check if customer is admin
 *
 * @return bool
 * @throws \Exception
 */
function sl_customer_is_admin()
{
    $customer = sl_customer();

    return ($customer and $customer->is_admin);
}

/**
 * Check if license is valid
 *
 * @return bool
 */
function sl_license_is_valid()
{
    $isValid = false;

    try {
        $licenceValidDate = sl_license_valid_date();

        $isValid = $licenceValidDate > time();
    } catch (\Exception $e) {}

    return $isValid;
}

/**
 * Fetch date when license expires
 *
 * @return string
 * @throws \Exception
 */
function sl_license_valid_date()
{
    $customer = sl_customer();

    if ($customer) {
        $licenceValidDate = strtotime(date("Y-m-d", strtotime($customer->eligible_until)));

        return $licenceValidDate;
    }

    return '2018-01-01';
}

/**
 * Check license and abort request if needed
 *
 * @param string $message
 * @param bool   $wp_die
 */
function sl_license_is_valid_or_fail($message = null, $wp_die = false)
{
    if (! sl_license_is_valid()) {
        if ($wp_die) {
            wp_die($message);
        } else {
            exit($message);
        }
    }
}

/**
 * Return URL for disconnecting from SL
 *
 * @return string
 */
function sl_disconnect_url()
{
    return home_url('op-process-op3-disconnect');
}

/**
 * Create URL to SL API
 *
 * @param  string $url
 * @return string
 */
function sl_api_url($url)
{
    return OPD_SL_BASE_URL . '/api/' . $url;
}

/**
 * REST URL
 *
 * @param $path
 * @return string
 */
function opd_api_url($path)
{
    $fullPath = 'opd/v1/' . $path;

    return rest_url($fullPath);
}

/**
 * The URL for SL authorization
 *
 * @return string
 */
function sl_connect_url()
{
    return home_url() . '/op-connect-to-sl';
}

/**
 * The URL for SL authorization
 *
 * @return string
 */
function sl_direct_connect_url()
{
    // Build up the URL
    $url = OPD_SL_BASE_URL . 'connect?'.http_build_query([
            'redirect' => sl_oauth_response_url(),
            'callback' => sl_oauth_callback_url(),
        ]);

    return $url;
}

/**
 * The response URL for SL authorization
 *
 * @return string
 */
function sl_oauth_response_url()
{
    return trailingslashit(home_url()).'op-process-oauth-sl-response';
}

/**
 * The callback URL for SL authorization
 *
 * @return string
 */
function sl_oauth_callback_url()
{
    return trailingslashit(home_url()) . 'op-process-oauth-sl-callback';
}

/**
 * The callback URL for SL authorization
 *
 * @param string $provider
 * @return string
 */
function oauth_callback_url($provider = null)
{
    $url = trailingslashit(home_url()) . 'op-process-oauth-callback';

    if ($provider) {
        $url .= '?provider=' . $provider;
    }

    return $url;
}

/**
 * The response URL for SL authorization
 *
 * @return string
 */
function oauth_response_url()
{
    return trailingslashit(home_url()).'op-process-oauth-response';
}

/**
 * Get config option
 *
 * @param  string $key
 * @param  mixed  $default
 * @return mixed
 */
function opd_config($key, $default = null)
{
    $sections = explode(".", $key);

    if (isset($sections[0])) {
        $group  = $sections[0];
        $config = include(__DIR__.'/../config/'.$group.'.php');

        if (isset($sections[1])) {
            return isset($config[$sections[1]]) ? $config[$sections[1]] : $default;
        } else {
            return $config;
        }
    }

    return $default;
}

/**
 * URL for authorizing OAuth integrations
 *
 * @param $integration
 * @return string
 */
function integration_authorize_url($integration)
{
    $url = '';

    if ($integration and $integration->isOauth()) {
        $callback = admin_url('admin.php') . '?page=op-process-oauth-sl-callback';
        $params = ['uid' => $integration->uid, 'callback' => $callback];
        $url    = OPD_SL_BASE_URL . 'integrations/' . $integration->provider . '/authorize?' . http_build_query($params);
    }

    return $url;
}

/**
 * URL for authorizing OAuth integrations without SL
 *
 * @param $integration
 * @return string
 */
function integration_authorize_oauth_url($integration)
{
    $url = '';

    if ($integration and $integration->isOauth()) {
        $callback = admin_url('admin.php') . '?page=op-process-oauth-callback';
        $params = ['uid' => $integration->uid, 'callback' => $callback];


        //        $url    = OPD_SL_BASE_URL . 'integrations/' . $integration->provider . '/authorize?' . http_build_query($params);-->
        $url = $integration->getAuthorizationUrl();
    }

    return $url;
}

/**
 * Return all available integration providers
 *
 * @return IntegrationsCollection
 */
function get_available_providers()
{
    $repo = new IntegrationRepository;

    return $repo->getAvailableProviders();
}

/**
 * Return connected integration providers
 *
 * @param bool $addEmail
 * @return IntegrationsCollection
 */
function get_connected_integrations($addEmail = false)
{
    $repo = new IntegrationRepository;

    return $repo->getConnectedIntegrations($addEmail);
}

/**
 * Find integration by provider key
 *
 * @param $provider
 * @return Integration
 */
function find_integration_by_provider($provider)
{
    $repo = new IntegrationRepository;

    return $repo->findByProvider($provider);
}

/**
 * Check if view exists
 *
 * @param string $view
 * @return bool
 */
function view_exists($view)
{
    $views = new ViewEngine(__DIR__ . '/../resources/views');

    return $views->exists($view);
}

/**
 * Simply load an admin OPD view
 *
 * @param string $view
 * @param array  $data
 */
function view($view, $data = [])
{
    $views = new ViewEngine(__DIR__ . '/../resources/views');

    echo $views->render($view, $data);
}

/**
 * Simply load a partial view
 *
 * @param string $view
 * @param array  $data
 */
function partial($view, $data = [])
{
    $views = new ViewEngine(__DIR__ . '/../resources/views');

    echo $views->render($view, $data);
}

/**
 * Check if we are currently on a OP Dashboard admin page
 *
 * @return bool
 */
function is_opdashboard_admin()
{
    $screen = get_current_screen();

    // @TODO: Test to see if this check is enough
    //        // Load resources only on our plugin's screen
    //        $opdPluginScreens = array(
    //            'toplevel_page_op-dashboard',
    //            'opdashboard_page_op-dashboard-integrations',
    //            'opdashboard_page_op-dashboard-settings',
    //            'admin_page_op-dashboard-add-integration',
    //            'admin_page_op-dashboard-edit-integration',
    //        );

    return strpos($screen->id, 'op-dashboard') !== false or strpos($screen->id, 'op-suite') !== false;
}

/**
 * Check if we are on a OP admin page
 *
 * @return bool
 */
function is_op_plugin_admin()
{
    $screen = get_current_screen();

    return (
        strpos($screen->id, 'page_optimizepress3') !== false
        or strpos($screen->id, 'page_op-')         !== false
        or strpos($screen->id, 'page_opd-')        !== false
        or strpos($screen->id, 'page_opbuilder-')  !== false
        or strpos($screen->id, 'toplevel_page_optimize-urgency')  !== false
    );
}

if (! function_exists('get_domain_from_url')) {
    /**
     * Parse URL and return domain
     *
     * @param  string $url
     * @return string
     */
    function get_domain_from_url($url)
    {
        return parse_url($url, PHP_URL_HOST);
    }
}

/**
 * Get the current installation URL
 *
 * @return string
 */
function get_installation_url()
{
    global $wpml_url_filters;

    // Remove multilingual WPML filter
    if (isset($wpml_url_filters)) {
        remove_filter('home_url', [$wpml_url_filters, 'home_url_filter'], -10);
    }

    // Get the installation URL
    $url = get_bloginfo('url');

    // Add back multilingual WPML filter
    if (isset($wpml_url_filters)) {
        add_filter('home_url', array($wpml_url_filters, 'home_url_filter'), - 10);
    }

    return $url;
}

/**
 * Get domain and path for current WP installation
 *
 * @return string
 */
function get_installation_domain_and_path()
{
    $url = get_installation_url();

    return parse_url($url, PHP_URL_HOST) . parse_url($url, PHP_URL_PATH);
}

/**
 * Get the current domain
 *
 * @return string
 */
function get_current_domain()
{
    $url = defined('WP_SITEURL') ? WP_SITEURL : 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];

    return get_domain_from_url($url);
}

/**
 * Fetch install URL for a product
 *
 * @param  string $productUid
 * @param  string $version
 * @return string
 */
function product_install_url($productUid, $version = null)
{
    return wp_nonce_url(self_admin_url('admin.php?page=op-dashboard-product-install&op-product='.$productUid.'&op-product-version='.$version), 'install-plugin_' . $productUid);
}

/**
 * Generate product activation URL
 *
 * @param Product $product
 * @return string
 */
function product_activate_url(Product $product)
{
    if ($product->type === 'theme') {
        return theme_activate_url($product->uid);
    } else {
        return plugin_activate_url($product->registry()->file);
    }
}

/**
 * Generate product deactivation URL
 *
 * @param Product $product
 * @return string
 */
function product_deactivate_url(Product $product)
{
    if ($product->type == 'theme') {
        return null;
    } else {
        return plugin_deactivate_url($product->registry()->file);
    }
}

/**
 * Generate plugin activation URL
 *
 * @param  string $productFile
 * @return string
 */
function plugin_activate_url($productFile)
{
    $url = wp_nonce_url(self_admin_url('plugins.php?action=activate&amp;plugin='.$productFile), 'activate-plugin_' . $productFile);

    return $url;
}

/**
 * Generate plugin deactivation URL
 *
 * @param  string $productFile
 * @return string
 */
function plugin_deactivate_url($productFile)
{
    $url = wp_nonce_url(self_admin_url('plugins.php?action=deactivate&amp;&amp;plugin_status=all&amp;plugin='.$productFile), 'deactivate-plugin_' . $productFile);

    return $url;
}

/**
 * Generate theme activation URL
 *
 * @param  string $productUid
 * @return string
 */
function theme_activate_url($productUid)
{
    return wp_nonce_url(self_admin_url('themes.php?action=activate&amp;stylesheet='.$productUid), 'switch-theme_' . $productUid);
}

/**
 * Generate theme network enable URL
 *
 * @param  string $productUid
 * @return string
 */
function theme_network_enable_url($productUid)
{
    return wp_nonce_url(self_admin_url('network/themes.php?action=activate&theme=' . $productUid), 'enable-theme_' . $productUid);
}

/**
 * Check if theme is available
 *
 * @param  string $productUid
 * @return bool
 */
function is_theme_network_theme_available($productUid)
{
    $themes = (array) get_site_option('allowedthemes');

    return isset($themes[$productUid]);
}

/**
 * Generate product update URL
 *
 * @param  string $productUid
 * @return string
 */
function product_update_url($productUid)
{
    return admin_url('admin.php?page=op-dashboard-product-install&op-product='.$productUid);
}

/**
 * Return release channels that are available to the current user
 *
 * @return array
 */
function product_available_channels()
{
    // Get customer and default channel
    $customer = SL::getCustomerDetails();
    $channels = ['stable' => ['id' => 'stable', 'name' => __('Stable', 'opd')]];

    // Check beta channel access rights
    if ($customer->canInstallBetaProducts()) {
        $channels['beta'] = ['id' => 'beta',   'name' => __('Beta',   'opd')];
    }

    // Check demo channel access rights
    if ($customer->canInstallDemoProducts()) {
        $channels['demo'] = ['id' => 'demo',   'name' => __('Demo',   'opd')];
    }

    return $channels;
}

/**
 * Get path to plugin asset
 *
 * @param  string $path
 * @return string
 */
function opd_asset($path = '')
{
    // Assets root
    $result = OPD_ASSETS_URL;

    // Path
    if ($path) $result .= ltrim($path, '/');

    return $result;
}

/**
 * Get path to plugin asset
 *
 * @param  string $path
 * @return string
 */
function opd_asset_path($path = '')
{
    return OPD_ASSET_PATH.$path;
}

/**
 * Clear all OPD cache
 *
 * @return void
 */
function clear_all_cache()
{
    clear_all_transient_cache();
    clear_page_cache(true);
}

/**
 * Clear all OP transient cache
 *
 * @return void
 */
function clear_all_transient_cache()
{
    global $wpdb;

    // Delete all transients
    $wpdb->query("DELETE FROM `$wpdb->options` WHERE `option_name` LIKE ('_transient_%')");
}

/**
 * Clear cached pages from post meta
 *
 * @param  bool  $assets
 * @return void
 */
function clear_page_cache($assets = false)
{
    global $wpdb;

    // Delete all post meta cache
    $wpdb->query("DELETE FROM `$wpdb->postmeta` WHERE `meta_key` LIKE ('_op3_cache%')");

    if ($assets) {
        clear_assets_cache();
    }

    // And update cache hash
    set_transient('op__opb_cache_hash', time());
}

/**
 * Delete all cached assets files
 *
 * @return void
 */
function clear_assets_cache()
{
    if (defined('OP3__DIR__')) {
        try {
            $cachePath = OP3__DIR__.'/public/assets/cache';
            $cachedFiles = glob($cachePath.'/*.*');

            // Loop through all and delete
            foreach ($cachedFiles as $file) {
                if (is_file($file)) {
                    unlink($file);
                }
            }
        } catch(\Exception $e) {}
    }
}


/**
 * Check the basic OptimizePress requirements
 * This includes the PHP version, enabled permalinks, etc.
 *
 * @return bool
 */
function check_basic_op_requirements()
{
    return (check_basic_op_requirements_php() && check_basic_op_requirements_permalinks());
}

/**
 * Check the OptimizePress required PHP version
 *
 * @return bool
 */
function check_basic_op_requirements_php()
{
    if (op3_version_compare(current_php_version(), OPD_PHP_VERSION, '<')) {
        return false;
    }

    return true;
}

/**
 * Compare non-standard versions of PHP too.
 *
 * @param $ver1
 * @param $ver2
 * @param null $operator
 * @return mixed
 */
function op3_version_compare($ver1, $ver2, $operator = null)
{
    $p = '#(\.0+)+($|-)#';
    $ver1 = preg_replace($p, '', $ver1);
    $ver2 = preg_replace($p, '', $ver2);
    return isset($operator) ?
        version_compare($ver1, $ver2, $operator) :
        version_compare($ver1, $ver2);
}

/**
 * Check the if permalinks are enabled
 *
 * @return bool
 */
function check_basic_op_requirements_permalinks()
{
    if (! get_option('permalink_structure')) {
        return false;
    }

    return true;
}

/**
 * Return a nicely formatted PHP version
 *
 * @return string
 */
function current_php_version()
{
    $version = explode('.', phpversion());

    return $version[0] . '.' . $version[1];
}

/**
 * Check if updates to any OP products are available
 *
 * @return bool
 */
function updates_are_available()
{
    return \OPDashboard\Products\Updates::areAvailable();
}

/**
 * Get OP3 Icon in Base64 format
 *
 * @return string
 */
function op3_svg_icon() {
    return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIzN3B4IiBoZWlnaHQ9IjM2cHgiIHZpZXdCb3g9IjAgMCAzNyAzNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4gICAgICAgIDx0aXRsZT5Mb2dvbWFyay4yZS5zdmc8L3RpdGxlPiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4gICAgPGcgaWQ9Ik5FVy1EYXNoYm9hcmQtMjAxOCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+ICAgICAgICA8ZyBpZD0iRk9SLVBSRVZJRVctLS1JbnRlZ3JhdGlvbnMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zNS4wMDAwMDAsIC0xNS4wMDAwMDApIiBmaWxsPSIjZmZmZmZmIj4gICAgICAgICAgICA8ZyBpZD0ib3AtbG9nby13aGl0ZS1jaXJjdWxhciIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzUuMDAwMDAwLCAxNS4wMDAwMDApIj4gICAgICAgICAgICAgICAgPHBhdGggZD0iTTI0LjU1NTc2MTMsMTkuMjc0NTE4NyBDMjQuNDA5MTk5MiwyMC45MTU1NjkgMjMuNjg1ODgyMywyMi40NTQ0NTYxIDIyLjUxMTAxMTcsMjMuNjI0Nzk0OSBMMjIuNTEzMDg4NSwyMy42MjcxMzY3IEwxNy41MTU3MzQ1LDI4LjYwNzA3NzMgTDE3LjUxMzM2MSwyMi40NjA2MDM1IEwxNy44ODY4ODY4LDIyLjA4ODI0OTYgTDE3Ljg4MzMyNjYsMjIuMDg0NzM2OCBDMTguMjc5NDAwNCwyMS42OTIxODQ1IDE4LjQ5MDA0NjQsMjEuMTE0MzMzNCAxOC40MTQzOTE5LDIwLjQzODEyNDcgQzE4LjMzOTMzMDcsMTkuNzY3MTg1MSAxOC4wMDAyMjAzLDE5LjEyOTkwOTYgMTcuNTExNTgwOSwxOC42MzkyOTI0IEwxNy41MTE1ODA5LDE4LjYyMjYwNjcgTDE3LjQ5NDk2NjYsMTguNjIyNjA2NyBDMTcuMDAyNDcwMywxOC4xMzQ2MjQgMTYuMzYxNjMxNywxNy43OTUzNDg3IDE1LjY4NzU2NDUsMTcuNzIwNDA5NiBDMTUuMDA4NzUwNCwxNy42NDUxNzc3IDE0LjQyOTMyNTUsMTcuODU1MDY1OSAxNC4wMzUwMzE4LDE4LjI0OTk2MDEgTDE0LjAzMTQ3MTYsMTguMjQ1ODYxOCBMMTMuNjU0OTc4OSwxOC42MjA4NTAzIEw3LjQ4ODM5MTMsMTguNjE4NTA4NSBMMTIuMzg3ODM5NCwxMy43MzU0NjE4IEMxMy41NjQ3ODY4LDEyLjUwODkxODcgMTUuMTU1MDE1OCwxMS43NDc4MTggMTYuODYwMDYxNywxMS41OTUzMDUxIEMzMC4yNDI2MTAxLC0xLjQyMDk4MTAxIDM2LjE0NTQ0NTIsMC4wNDk5OTI1MTA1IDM2LjE0NTQ0NTIsMC4wNDk5OTI1MTA1IEMzNi4xNDU0NDUyLDAuMDQ5OTkyNTEwNSAzNy42MjIzNDA3LDUuOTMzMDA4NDIgMjQuNTU1NzYxMywxOS4yNzQ1MTg3IFogTTE4LjcwMDY5MjUsMTUuMTMwMDMyNSBDMTkuNjEyNDA0LDE1Ljc0NzQwMjMgMjAuMzk2ODM3OCwxNi41Mjk4NzI0IDIxLjAxMzA1MTYsMTcuNDM1NTgyMyBDMzAuMzc3ODk4Miw4LjA4MjgyNTI1IDMwLjkwNjI5MzQsNS4yNzA1NTgwNSAzMC45MDYyOTM0LDUuMjcwNTU4MDUgQzMwLjkwNjI5MzQsNS4yNzA1NTgwNSAyOC4wNzg1OTMyLDUuODAzNjIxMjkgMTguNzAwNjkyNSwxNS4xMjk3Mzk4IEwxOC43MDA2OTI1LDE1LjEzMDAzMjUgWiBNMTQuNzgyOTczNCwxOS4wMzM4OTM4IEMxNC43OTYzMjQyLDE5LjAxOTI1NzMgMTQuODEwMjY4NCwxOS4wMDU0OTg5IDE0LjgyNDgwNiwxOC45OTIzMjYgTDE0Ljg3OTM5NTksMTguOTM3ODc4IEwxNC44ODM1NDk1LDE4Ljk0MTk3NjMgQzE1LjA4MDI1MTMsMTguNzk1OTAzNSAxNS4zNTgyNDQ3LDE4LjczOTk5MTggMTUuNjg2Njc0NSwxOC44MDU1NjM2IEMxNi40Mzk5NTY1LDE4Ljk1NTQ0MTkgMTcuMTcyNDcwNSwxOS42ODU1MTMxIDE3LjMyMjg4OTYsMjAuNDM2MDc1NSBDMTcuMzg4NDU2OCwyMC43NjM2NDE2IDE3LjMzMjM4MzUsMjEuMDQwNTY1MiAxNy4xODYxMTgsMjEuMjM2Njk1IEwxNy4xODY0MTQ3LDIxLjIzNjk4NzcgTDE3LjExNTUwNzEsMjEuMzIwMTIzMyBMMTcuMTA4Mzg2NywyMS4zMjQyMjE2IEMxNy4wMTE2Njc1LDIxLjQxNjQzMTggMTYuODkyNDAwMywyMS40ODI1ODkgMTYuNzYxODU5MiwyMS41MTU5NjA0IEwxMy42NDc4NTg1LDIzLjIzOTI2ODEgTDE0LjQxOTIzODIsMjQuMDA3Njg3MSBMNy44Njg3NDA4NSwyNy40NjE2MjA3IEwxMS4zMzU3OTYxLDI0LjAwNjIyMzQgTDEwLjU2NDcxMywyMy4yMzc4MDQ0IEwxNC43ODI5NzM0LDE5LjAzMzg5MzggWiBNNy40MjQwMTA3Niw4LjYyMDI3OTQ1IEMxLjg4NzU4MTA1LDE0LjEzNzY3NDMgMS44ODc1ODEwNSwyMy4wODM1MzUyIDcuNDI0MDEwNzYsMjguNjAxMjIyNyBDMTAuMDY5NTQ2NiwzMS4yNDg5NzUxIDEzLjY4MDE5NzEsMzIuNzM5NTYxNiAxNy40NDgzODcxLDMyLjczOTU2MTYgQzIxLjIxNjU3NzEsMzIuNzM5NTYxNiAyNC44Mjc1MjQzLDMxLjI0ODk3NTEgMjcuNDczMDYwMiwyOC42MDEyMjI3IEMzMS40NjgyMTM4LDI0LjYxOTQ5NSAzMi41NzkyOTczLDE4Ljg1MzI3ODggMzAuODA4MDkwOCwxMy44Nzc3MjkxIEMzMS42Njk2NjI2LDEyLjc4ODc2OTYgMzIuNDExMzczOSwxMS43NzI3MDAxIDMzLjA1MDcyOSwxMC44MjcxNzg4IEMzNi4zMjM3NTI2LDE3LjM0MDQ0NDcgMzUuMjM4NDgwNiwyNS40NzMzOTE1IDI5Ljc4NjYwNiwzMC45MDY3NzI1IEMyNi41MzA0OTM1LDM0LjE2NTQ1NDUgMjIuMDg2NDU2MSwzNiAxNy40NDg2ODM4LDM2IEMxMi44MTA5MTE1LDM2IDguMzY2NTc3NDYsMzQuMTY1NDU0NSA1LjExMDQ2NDkyLDMwLjkwNjc3MjUgQy0xLjcwMzQ4ODMxLDI0LjExNTk5NzYgLTEuNzAzNDg4MzEsMTMuMTA1NTA0NiA1LjExMDQ2NDkyLDYuMzE0NzI5NzEgQzEwLjQyNjc1NDcsMC45OTUyMjEwNyAxOC42MjgzMDE0LC0wLjMwMTU3NzQ4IDI1LjM2MzAzOTksMy4xMTI1NDQ3NSBDMjQuNDE2MzE5NiwzLjc0NzQ3ODQgMjMuMzk5NTgxOCw0LjQ4MzExMTUzIDIyLjMwOTI2NjIsNS4zMzgxNzg5MiBDMTcuMTI0NzA0MywzLjQ1NDc0NzM1IDExLjMwMjg2NDEsNC43MzgzNzMgNy40MjQwMTA3Niw4LjYyMDI3OTQ1IFoiIGlkPSJMb2dvbWFyay4yZS5zdmciPjwvcGF0aD4gICAgICAgICAgICA8L2c+ICAgICAgICA8L2c+ICAgIDwvZz48L3N2Zz4=';
}

/**
 * Check if current user can edit page
 *
 * @return bool
 */
function can_manage_integrations()
{
    return (bool) current_user_can('manage_options');
}

/**
 * Check if current user can clear the cache
 *
 * @return bool
 */
function can_clear_cache()
{
    return (bool) current_user_can('manage_options');
}

/**
 * Fetch HTTP request timeout for OP requests
 *
 * @return int
 */
function get_http_timeout_value()
{
    return (int) get_option('opd_request_timeout') ?: 300;
}

/**
 * Fetch all broadcast messages
 *
 * @return Collection
 */
function get_all_broadcast_messages()
{
    $messages     = new Collection;
    $allMessages  = SL::getMessages();
    $readMessages = get_read_broadcast_messages();

    // Filter out read messages
    if ($allMessages and count($allMessages)) {
        foreach ($allMessages as $message) {
            if (! in_array($message->uid, $readMessages, true)) {
                $messages->push($message);
            }
        }
    }

    return $messages;
}

/**
 * Mark a message as read
 *
 * @param  string $uid
 * @return void
 */
function mark_broadcast_message_read($uid)
{
    $readMessages = get_read_broadcast_messages();
    $readMessages[] = $uid;

    update_option('opd_read_messages', $readMessages);
}

/**
 * Fetch IDs of read messages
 *
 * @return array
 */
function get_read_broadcast_messages()
{
    $messages = get_option('opd_read_messages');

    return (array) $messages;
}

/**
 * Fetch specific broadcast messages
 *
 * @param  string $product
 * @param  string $position
 * @param  array  $options
 * @return mixed
 */
function get_broadcast_messages($product = 'op-dashboard', $position = 'header', $options = [])
{
    $messages    = [];
    $allMessages = get_all_broadcast_messages();
    $page        = isset($options['page']) ? $options['page'] : null;

    if ($allMessages) {
        foreach ($allMessages as $message) {
            if ($message->product === $product and $message->position === $position) {
                $messagePage = $message->page;

                if ((! $page and ! $messagePage) or ($page and $page === $messagePage)) {
                    $messages[] = $message;
                }
            }
        }
    }

    return $messages;
}

/**
 * Check if message exists
 *
 * @param  string $product
 * @param  string $position
 * @return bool
 */
function broadcast_message_exist($product = 'op-dashboard', $position = 'header')
{
    if (get_broadcast_messages($product, $position)) {
        return true;
    }

    return false;
}

/**
 * Render the broadcast message
 *
 * @param  string $product
 * @param  string $position
 * @param  array  $options
 * @return void
 */
function render_broadcast_message($product = 'op-dashboard', $position = 'header', $options = [])
{
    $messages = get_broadcast_messages($product, $position, $options);

    if ($messages) {
        foreach ($messages as $message) {
            view('partials/message', ['message' => $message]);
        }
    }
}

/**
 * Build up plugin info
 * @TODO: Not used for now, need more testing
 *
 * @param  array $productInfo
 * @param  array $data
 * @return \stdClass
 */
function build_sl_plugin_info($productInfo, $data = [])
{
    // Get plugin and product
    $plugin  = array_get($data, 'plugin');
    $product = array_get($data, 'product');
//    echo '<pre>'; print_r($plugin); echo '</pre>';

    $pluginInfo = new \stdClass;
    $pluginInfo->id = 'optimizepress.com/plugins/' . $plugin->uid;
    $pluginInfo->name              = array_get($productInfo, 'name');
    $pluginInfo->slug              = array_get($productInfo, 'slug');
    $pluginInfo->plugin            = $plugin->file;
    $pluginInfo->version           = $plugin->version;
    $pluginInfo->new_version       = array_get($productInfo, 'version');
    $pluginInfo->homepage          = 'https://www.optimizepress.com?utm_source=wp-plugins&utm_campaign=author-uri&utm_medium=wp-dashboard';
    $pluginInfo->url               = 'https://www.optimizepress.com?utm_source=wp-plugins&utm_campaign=author-uri&utm_medium=wp-dashboard';
    $pluginInfo->download_url      = array_get($data, 'download_url');
    $pluginInfo->download_link     = array_get($data, 'download_url');
    $pluginInfo->trunk             = array_get($data, 'download_url');
    $pluginInfo->package           = array_get($data, 'download_url');
    $pluginInfo->requires          = array_get($productInfo, 'requires');
    $pluginInfo->tested            = array_get($productInfo, 'tested');
    $pluginInfo->author            = '<a href="' . $plugin->author_uri . '">' . $plugin->author . '</a>'; // I decided to write it directly in the plugin
    $pluginInfo->author_profile    = $plugin->author_uri; // WordPress.org profile
    $pluginInfo->icons             = [];
    $pluginInfo->banners           = [];
    $pluginInfo->banners_rtl       = [];
    $pluginInfo->compatibility     = [];
    $pluginInfo->requires_php      = '5.6';
    $pluginInfo->sections = array_get($productInfo, 'sections');
//    $pluginInfo->sections          = [
//        'description'       => $productInfo->description,
//        'changelog'         => $productInfo->sections,
//    ];
//    echo '<pre>'; print_r($pluginInfo); echo '</pre>';

    return $pluginInfo;
}

/**
 * This function is used to get the release channel the user wants to use
 *
 * By default it is set to 'null' which means there's is not channel defined
 * and the customer is offered the latest release that he has access to
 *
 * @return null
 */
function customer_release_channel()
{
    $validChannels = opd_config('plugin.release_channels');

    // Let's check the is the overwrite constant is defined
    if (defined('OPD_CUSTOMER_RELEASE_CHANNEL') && in_array(OPD_CUSTOMER_RELEASE_CHANNEL, $validChannels, true)) {
        return OPD_CUSTOMER_RELEASE_CHANNEL;
    }

    return null;
}

/**
 * This function is used to get the release channel the user wants to use
 *
 * By default it is set to 'null' which means there's is not channel defined
 * and the customer is offered the latest release that he has access to
 *
 * @param  string  $releaseChannel
 * @return null
 */
function is_release_channel_valid($releaseChannel = null)
{
    $validChannels  = opd_config('plugin.release_channels');

    if (! $releaseChannel) {
        $releaseChannel = defined('OPD_CUSTOMER_RELEASE_CHANNEL') ? OPD_CUSTOMER_RELEASE_CHANNEL : null;
    }

    return ! ($releaseChannel && ! in_array($releaseChannel, $validChannels, true));
}

/**
 * Just prepare for encryption library if needed someday
 *
 * @param  string $data
 * @return mixed
 */
function encrypt_data($data)
{
    $secretKey      = SECURE_AUTH_KEY;
    $secretIv       = SECURE_AUTH_SALT;
    $encrypt_method = 'AES-256-CBC';
    $key            = hash('sha256', $secretKey);
    $iv             = substr(hash('sha256', $secretIv), 0, 16);
    $output         = base64_encode(openssl_encrypt($data, $encrypt_method, $key, 0, $iv));

    return $output;
}

/**
 * Just prepare for encryption library if needed someday
 *
 * @param  string $data
 * @return mixed
 */
function decrypt_data($data)
{
    $secretKey      = SECURE_AUTH_KEY;
    $secretIv       = SECURE_AUTH_SALT;
    $encrypt_method = 'AES-256-CBC';
    $key            = hash('sha256', $secretKey);
    $iv             = substr(hash('sha256', $secretIv), 0, 16);
    $output         = openssl_decrypt(base64_decode($data), $encrypt_method, $key, 0, $iv);

    return $output;
}

function referer_is_page($page)
{
    $referer = array_get($_SERVER, 'HTTP_REFERER');

    if ($referer) {
        $urlData = parse_url($referer);
        parse_str(array_get($urlData, 'query'), $urlParams);

        if ($urlParams && isset($urlParams['page']) && $urlParams['page'] === $page) {
            return true;
        }
    }

    return false;
}

/**
 * Check if request came from dashboard
 *
 * @return bool
 */
function referer_is_op_dashboard()
{
    return referer_is_page('op-suite');
}

/**
 * Get all CPTs and check if they have the OP editor enabled
 *
 * @return Collection
 */
function editor_post_types()
{
    $postTypes        = new Collection;
    $wpPostTypes      = get_post_types(['public' => true], 'objects');
    $enabledPostTypes = enabled_editor_post_types();
    $hiddenPostTypes  = ['attachment', 'opf_funnel', 'elementor_library'];

    foreach ($wpPostTypes as $wpPostTypeSlug => $wpPostType) {
        // We skip some post types
        if (! in_array($wpPostTypeSlug, $hiddenPostTypes, true)) {
            $postTypes[$wpPostTypeSlug] = $wpPostType;

            // We also check if it's enabled
            if ($enabledPostTypes->has($wpPostTypeSlug)) {
                $postTypes[$wpPostTypeSlug]->enabled = true;
            } else {
                $postTypes[$wpPostTypeSlug]->enabled = false;
            }
        }
    }

    return $postTypes;
}

/**
 * Get post types for which we have the editor enabled
 *
 * @return Collection
 */
function enabled_editor_post_types()
{
    $postTypes = new Collection;
    $config    = get_option('opd_enabled_cpt');
    $default   = ['post', 'page'];

    // If there's no config file, or if we dont's have a setting
    // for default post types, we enable them
    if (! $config) {
        foreach ($default as $defaultSlug) {
            $defaultPostType = get_post_types(['public' => true, 'name' => $defaultSlug], 'objects');
            $postTypes[$defaultSlug] = $defaultPostType[$defaultSlug];
            $postTypes[$defaultSlug]->enabled = true;
        }
    }

    // Now add all from config
    if ($config) {
        foreach ($config as $wpCptSlug => $enabled) {
            if ($wpCptSlug && (bool) $enabled) {
                $postType = get_post_types(['public' => true, 'name' => $wpCptSlug], 'objects');

                if ($postType && isset($postType[$wpCptSlug]) && ! $postTypes->has($wpCptSlug)) {
                    $postTypes[$wpCptSlug] = $postType[$wpCptSlug];
                    $postTypes[$wpCptSlug]->enabled = true;
                }
            }
        }
    }

    return $postTypes;
}

/**
 * Check if OP editor is enabled for a post type
 *
 * @param  string $postType
 * @return bool
 */
function is_post_type_enabled($postType)
{
    $config  = get_option('opd_enabled_cpt');
    $default = ['post', 'page'];
    $always  = ['opf_funnel'];

    // If there's no config we compare to defaults
    if (! $config) {
        return in_array($postType, $default);
    }

    return in_array($postType, $always, true) or (isset($config[$postType]) && (bool) $config[$postType]);
}
