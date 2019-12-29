<?php

namespace OPDashboard\Http;

use function OPDashboard\clear_all_cache;
use function OPDashboard\view;

class SettingsController extends Controller
{
    /**
     * Display general dashboard settings
     *
     * @return mixed
     */
    public static function index()
    {
        $group = isset($_GET['op-settings-group']) ? $_GET['op-settings-group'] : 'general';

        return static::group($group);
    }

    /**
     * Display settings group
     *
     * @param string $group
     */
    public static function group($group = 'recaptcha')
    {
        view('settings/index', ['group' => $group]);
    }

    /**
     * Update settings
     *
     * @return void
     */
    public static function update()
    {
        $data = $_POST;

        // General options
        foreach ($data as $key => $value) {
            if (strpos($key, 'opd_') !== false) {
                update_option($key, $value);

                // Also clear cache
                clear_all_cache();
            }
        }

        wp_send_json(["success" => true, "message" => "Saved."]);
        wp_die();
    }

    /**
     * Toggle the full screen option for the current user
     *
     * @return void
     */
    public function toggleFullScreen()
    {
        $currentUser = wp_get_current_user();

        if ( ! isset($currentUser->ID)) {
            wp_die(__('You need to be logged in to WordPress.', 'opdash'));
        }

        $userOption   = 'ops_isFullScreen_' . $currentUser->ID;
        $isFullScreen = (int) $_POST['isFullScreen'];
        update_option($userOption, $isFullScreen);

        wp_send_json([
            'success'        => true,
            'option'         => $userOption,
            'isFullScreen' => $isFullScreen
        ]);
    }
}
