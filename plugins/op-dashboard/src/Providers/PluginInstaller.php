<?php

namespace OPDashboard\Providers;

use OPDashboard\Integrations\IntegrationRepository;

class PluginInstaller
{
    /**
     * Called when installing plugin
     *
     * @return void
     */
    public function run()
    {
        $repo = new IntegrationRepository;
        $repo->createIntegrationsTableIfNotExist();
    }
}
