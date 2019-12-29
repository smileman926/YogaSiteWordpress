<?php
/**
 * Auto updates functions for this theme.
 *
 * @package smart
 */

/*
 * called on admin_init
*/
function opstLoadThemesScreen() {
    if (opstIsUserAdmin()) {
        add_thickbox();
        add_action( 'admin_notices', 'opstUpdateNagScreen' );
    }
}

/**
 * Checks if the user is an administrator
 * @return bool
 */
function opstIsUserAdmin(){
    return in_array('administrator',  wp_get_current_user()->roles);
}

/*
* checking and adding admin notices for plugin update
* @return void
*/
function opstUpdateNagScreen() {
    //THEME
    if (function_exists('wp_get_theme')){
        $theme_data = wp_get_theme(get_option('template'));
        $theme_version = $theme_data->Version;
    } else {
        $theme_data = get_theme_data( TEMPLATEPATH . '/style.css');
        $theme_version = $theme_data['Version'];
    }

    $theme_base = get_option('template');

    $response = get_transient('opst_theme_update');

    if (false === $response)
        return;

    $update_url = wp_nonce_url('update.php?action=upgrade-theme&amp;theme=' . urlencode( $theme_base ), 'upgrade-theme_' . $theme_base);
    $update_onclick = '';

    if (isset($response->new_version) && version_compare( $theme_version, $response->new_version, '<' ) ) {
        echo '<div id="update-nag">';
        printf(_x('<strong>%1$s %2$s</strong> is available. <a href="%3$s" class="thickbox" title="%4s">Check out what\'s new</a> or <a href="%5$s"%6$s>update now</a>.', 'Content', 'op3_smart'),
            $theme_data->Name . ' Theme',
            $response->new_version,
            '#TB_inline?width=640&amp;inlineId=' . $theme_base . '_changelog',
            $theme_data->Name,
            $update_url,
            $update_onclick
        );
        echo '</div>';
        if (!empty($response->sections['changelog'])) {
            echo '<div id="' . $theme_base . '_' . 'changelog" style="display:none;">';
            echo wpautop($response->sections['changelog']);
            echo '</div>';
        }
    }
}

/**
 * Check SL service for new version
 * @param array
 * @return bool|WP_Error
 */
function opstCheckUpdate($transient)
{
    if (!defined('OP_FUNC')) {
        return $transient;
    }
    //THEME
    $theme_data = wp_get_theme(get_option('template'));
    $theme_version = $theme_data->Version;

    $theme_slug = get_option('template');

    if (!function_exists('op_sl_update')) {
        require_once OP_FUNC.'options.php';
        require_once OP_FUNC.'sl_api.php';
    }
    $apiResponse = op_sl_update('op_smart_theme');

    if (is_wp_error($apiResponse)) {
        return $transient;
    }

    if (version_compare($theme_version, $apiResponse->new_version, '<')) {
        //prepare object for WordPress
        $obj                = new stdClass();
        $obj->slug          = $theme_slug;
        $obj->new_version   = $apiResponse->new_version;
        $obj->url           = $apiResponse->url;
        $obj->package       = isset($apiResponse->s3_package) ? $apiResponse->s3_package : $apiResponse->package;
        $obj->sections      = array(
            'description' => $apiResponse->section->description,
            'changelog' => $apiResponse->section->changelog,
        );

        $transient->response[$theme_slug] = (array) $obj;

        // set transient for 12 hours
        set_transient('opst_theme_update', $obj, (HOUR_IN_SECONDS * 12));
    }

    return $transient;
}

/**
 * Fetches new presigned S3 link just before download will occur
 * @param  array $transient
 * @return array
 */
function opstCheckS3Update($transient)
{
    if (!defined('OP_FUNC')) {
        return $transient;
    }

    //THEME
    $theme_data = wp_get_theme(get_option('template'));
    $theme_version = $theme_data->Version;

    $theme_slug = get_option('template');

    /*
     * We are only going on SL to get freshly presigned S3 link if the preconditions are OK
     */
    $do = false;
    if (isset($_SERVER['SCRIPT_NAME']) && strpos($_SERVER['SCRIPT_NAME'], 'update.php')
        && isset($_GET['action']) && ($_GET['action'] === 'upgrade-theme' || $_GET['action'] === 'update-selected-themes')) {
        $do = true;
    } elseif (isset($_SERVER['SCRIPT_NAME']) && strpos($_SERVER['SCRIPT_NAME'], 'update-core.php')
              && isset($_GET['action']) && $_GET['action'] === 'do-theme-upgrade'
              && isset($_POST['checked']) && in_array($theme_slug, $_POST['checked'])) {
        $do = true;
    } elseif (defined('DOING_AJAX') && DOING_AJAX
              && isset($_POST['action']) && $_POST['action'] === 'update-theme'
              && isset($_POST['slug']) && $_POST['slug'] === $theme_slug) {
        // AJAX update
        $do = true;
    }
    if (false === $do) {
        return $transient;
    }

    if (!function_exists('op_sl_update')) {
        require_once OP_FUNC.'options.php';
        require_once OP_FUNC.'sl_api.php';
    }
    $apiResponse = op_sl_update('op_smart_theme');

    if (is_wp_error($apiResponse)) {
        return $transient;
    }

    $obj                = new stdClass();
    $obj->slug          = $theme_slug;
    $obj->new_version   = $apiResponse->new_version;
    $obj->url           = $apiResponse->url;
    $obj->package       = $apiResponse->s3_package;
    $obj->sections      = array(
        'description' => $apiResponse->section->description,
        'changelog' => $apiResponse->section->changelog,
    );

    $transient->response[$theme_slug] = (array) $obj;

    return $transient;
}
/*
 * Hooks
 */

// this is for debug only, DON'T USE IN PRODUCTION
// set_site_transient('update_themes', null); //check version in every request, but also check op_theme_update transient if is set, nothing will happen

//add_filter('pre_set_site_transient_update_themes', 'opstCheckUpdate');
//add_action('admin_init', 'opstLoadThemesScreen');
//add_filter('site_transient_update_themes', 'opstCheckS3Update');