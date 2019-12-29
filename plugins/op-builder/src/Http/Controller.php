<?php

namespace OPBuilder\Http;

use OPDashboard\SL\SL;

class Controller
{
    /**
     * Check connection to SL
     */
    public static function checkSLConnection()
    {
        if (! SL::isConnected()) {
            wp_redirect(admin_url('admin.php?page=op-dashboard'));
            die();
        }
    }
}
