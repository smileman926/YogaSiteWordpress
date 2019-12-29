<?php

namespace OPDashboard\Providers;

use OPDashboard\Navigation\Item;
use OPDashboard\Navigation\Menu;
use OPDashboard\Services\Menus;
use function OPDashboard\sl_customer;
use function OPDashboard\sl_is_connected;
use function OPDashboard\sl_license_is_valid;

class NavigationProvider
{
    /**
     * Init the navigation
     *
     * @return void
     */
    public function init()
    {
        add_filter('admin_body_class', [$this, 'addFullScreenClass']);
        $this->registerNavigation();
    }

    /**
     * Register the main OP Suite navigation object globally
     *
     * @return void
     */
    public function registerNavigation()
    {
        $currentPage = (isset($_GET['page'])) ? $_GET['page'] : false;

        $mainMenu = Menu::create()
            ->add(new Item([
                'uid'    => 'op-suite',
                'label'  => 'Dashboard',
                'url'    => admin_url('admin.php?page=op-suite'),
                'icon'   => 'ops-iconFont ops-dashboard-complex-icon',
                'order'  => 100,
                'active' => ($currentPage and $currentPage == 'op-suite') ? true : false,
            ]));

        // Integration manager
        if (sl_is_connected()) {
            $mainMenu->add(new Item([
                'uid'    => 'op-dashboard-integrations',
                'label'  => 'Integrations',
                'url'    => admin_url('admin.php?page=op-dashboard-integrations'),
                'icon'   => 'ops-iconFont ops-integrations-round-icon',
                'order'  => 300,
                'active' => ($currentPage and $currentPage == 'op-dashboard-integrations') ? true : false,
            ]));
        }

        // All OP settings
        $mainMenu->add(new Item([
            'uid'    => 'op-settings',
            'label'  => 'Settings',
            'url'    => admin_url('admin.php?page=op-dashboard-settings'),
            'icon'   => 'ops-iconFont ops-settings-square-icon',
            'order'  => 400,
            'active' => ($currentPage and $currentPage == 'op-dashboard-settings') ? true : false,
        ]));

        // Just some help
        $mainMenu->add(new Item([
            'uid'    => 'op-funnels-help',
            'label'  => 'Help',
            'url'    => 'https://docs.optimizepress.com/',
            'icon'   => 'ops-iconFont  ops-help-icon',
            'order'  => 500,
            'active' => ($currentPage and $currentPage == 'op-funnels-help') ? true : false,
        ]));

        // And register the menu to the container
        Menus::register('opd-main-menu', $mainMenu);
    }

    /**
     * Add the full screen class if needed
     *
     * @param  string $classes
     * @return string
     */
    public function addFullScreenClass($classes)
    {
        // Fetch user and current option
        $currentUser  = wp_get_current_user();
        $isFullScreen = (int) get_option('ops_isFullScreen_' . $currentUser->ID);

        // Append if needed
        if ($isFullScreen) {
            $classes .= ' ops_isFullScreen';
        }

        return $classes;
    }
}
