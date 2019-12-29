<?php

namespace OPDashboard\Providers;

class OAuthProvider
{
    /**
     * Register all things related to OAuth integrations
     *
     * @return void
     */
    public function init()
    {
        // Register OAuth routes
        include(OPD_PATH.'/routes/oauth.php');
    }
}
