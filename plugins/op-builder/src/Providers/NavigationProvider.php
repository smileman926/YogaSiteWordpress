<?php

namespace OPBuilder\Providers;

use OPDashboard\Navigation\Item;
use OPDashboard\Navigation\Menu;
use OPDashboard\Services\Menus;
use function OPDashboard\sl_customer;
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

        if (class_exists('\\OPDashboard\\Services\\Menus')) {
            $mainMenu = Menus::find('opd-main-menu');

            // Add "Create new page" item only if license is active
            if (function_exists('\\OPDashboard\\sl_license_is_valid') and \OPDashboard\sl_license_is_valid()) {
                $mainMenu->add(new Item([
                    'uid'    => 'op-builder-create',
                    'label'  => 'Create New Page',
                    'url'    => admin_url('admin.php?page=op-builder-create'),
                    'icon'   => 'ops-iconFont ops-layers-icon',
                    'order'  => 200,
                    'active' => ($currentPage and $currentPage == 'op-builder-create') ? true : false,
                ]));

                /* $mainMenu->add(new Item([
                    'uid'    => 'op-builder-global-elements',
                    'label'  => 'Global Elements',
                    'url'    => admin_url('admin.php?page=op-builder-global-elements'),
                    'icon'   => 'op3-icon op3-icon-globe-1',
                    'order'  => 200,
                    'active' => ($currentPage and $currentPage == 'op-builder-global-elements') ? true : false,
                ])); */
            }
        }
    }
}
