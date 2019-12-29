<?php

namespace OPDashboard\Http;

use OPDashboard\Installer\Installer;
use function OPDashboard\view;

class UpdatesController extends Controller
{
    /**
     * Check for updates (clears transients)
     *
     * @return void
     * @throws \Exception
     */
    public static function check()
    {
        delete_site_transient('update_plugins');
        delete_site_transient('update_themes');
        delete_transient('opd_update_plugins_check_response');
        delete_transient('opd_update_plugins_last_check');
        echo 'OK';

        wp_die();
    }
}
