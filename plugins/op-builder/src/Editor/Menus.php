<?php

namespace OPBuilder\Editor;

use Exception;
use OPBuilder\Repositories\PageRepository;
use OPDashboard\Services\Benchmark;
use OptimizePress\Support\Collection;

class Menus
{
    /**
     * Flag for preventing multiple menu syncs
     *
     * @var bool
     */
    public static $synced = false;

    /**
     * Menu was changed so we update the timestamp when it was changed
     * This is saved as a WP transient
     *
     * @param  $menuId
     * @return bool
     */
    public static function touch($menuId)
    {
        // Set timestamp for all menus
        set_transient(self::updateTransientKey(), date('Y-m-d H:i:s'));

        // And set timestamp for specific menu
        return set_transient(self::updateTransientKey($menuId), date('Y-m-d H:i:s'));
    }

    /**
     * Syncing WP menu changes with the OP menu element is handled here
     * We also need to sync the styling so this could get expensive
     *
     * @param  Page  $page
     * @return Collection
     * @throws Exception
     */
    public static function sync(Page $page)
    {
        // We need the page repository
        $pages = new PageRepository;

        // Let's get all menus on the actual page
        $pageMenus = $page->findElementsByType('treemenu');

        // Loop through the menu elements
        if ($pageMenus && count($pageMenus)) {
            foreach ($pageMenus as &$pageMenu) {
                // Fetch term ID of WP menu from element options
                $menuId = op3_element_option_value($pageMenu, 'menuName');

                // Now we need to flatten all the menu items to fetch their options
                // And we also empty out the children so we can re-populate them
                $flatMenuItems = op3_flatten_tree_array($pageMenu->children, 'children', 'uuid');
                $pageMenu->children = [];

                // And get the menu object so we can rebuild the structure
                $wpMenu = self::findWpMenu($menuId);

                // We also need to update the menu ID (if there's no menu, set to blank string)
                if ($pageMenu && isset($pageMenu->options->all->menuName, $pageMenu->options->all->menuName->{' > [data-op3-menu-name]'})) {
                    if ($wpMenu && $wpMenu->term_id) {
                        $pageMenu->options->all->menuName->{' > [data-op3-menu-name]'} = (string) $wpMenu->term_id;
                    } else {
                        $pageMenu->options->all->menuName->{' > [data-op3-menu-name]'} = '';
                    }
                }

                // Now loop through all menu items recursively and inject into OP menu object
                if ($wpMenu && $wpMenu->children) {
                    foreach ($wpMenu->children as $wpMenuItem) {
                        // Build up a menu item from the WP menu
                        $menuItem = self::buildMenuItemElementFromWPMenu($page, $wpMenuItem, $flatMenuItems);

                        // And push the menu item to the OP page menu element
                        $pageMenu->children[] = $menuItem;
                    }
                }
            }
        }

        // Fetch updated data
        $pageData = $page->getData();

        // And write updated data to DB
        if (isset($pageData['data']) && $pageData['data']) {
            $pages->updateData($page->id, $pageData['data']);
            $pages->updateSummary($page->id, $pageData['data']);

            // Invalidate page cache
            delete_post_meta($page->id, '_op3_cache');
            delete_post_meta($page->id, '_op3_cache_timestamp');

            // We also need to update the modified date
            wp_update_post(['ID' => $page->id]);
        }

        // Mark synced
        self::$synced = true;

        return $pageMenus;
    }

    /**
     * Check if any menu was updated after the page and sync menus
     *
     * @param  Page  $page
     * @param  bool  $force
     * @return bool|Collection
     * @throws Exception
     */
    public static function syncIfUpdated(Page $page, $force = false)
    {
        if ($force || ! self::$synced) {
            if ($force || self::anyMenuWasUpdatedAfter($page->updatedAt())) {
                return self::sync($page);
            }
        }

        // Mark synced
        self::$synced = true;

        return false;
    }

    /**
     * Builds up a OP menu element
     *
     * @param  Page    $page
     * @param  object  $wpMenuItem
     * @param  array   $flatMenuItems
     * @param  int     $level
     * @return object
     */
    public static function buildMenuItemElementFromWPMenu(Page $page, $wpMenuItem, $flatMenuItems = [], $level = 1)
    {
        // we do not have more than 2 levels anymore
        if ($level > 2)
            $level = 2;

        // Find UUIDs to exclude so we don't get duplicates
        $exclude = isset($page->summary->uuids) ? $page->summary->uuids : [];

        // Generate a fresh element UUID
        $uuid = op3_element_uuid($exclude);

        // Build up default options
        $options = (object) [
            'menuItemId'   => (object) [' > [data-op3-menu-item-id]'                                               => $wpMenuItem->ID],
            'label'        => (object) [' > .op3-treemenuitem-content > .op3-treemenuitem-link .op3-text'          => $wpMenuItem->title],
            'href'         => (object) [' > .op3-treemenuitem-content > .op3-treemenuitem-link'                    => $wpMenuItem->url],
            // 'target'       => (object) [' > .op3-treemenuitem-content > .op3-treemenuitem-link'                    => '_self'],
            // 'dropdownIcon' => (object) [' > .op3-treemenuitem-content > .op3-treemenuitem-link .op3-dropdown-icon' => 'op3-icon-small-down'],
        ];

        // We need to check if we have any options/styling for this element
        foreach ($flatMenuItems as $flatMenuItem) {
            $flatMenuItemId = op3_element_option_value($flatMenuItem, 'menuItemId');

            if ($flatMenuItemId == $wpMenuItem->ID) {
                // UUID is taken from existing element for consistency
                $uuid = $flatMenuItem->uuid;

                // Get options from old flattened array
                $flatMenuOptions = $flatMenuItem->options->all;

                // Let's skip some properties (href, label)
                if (isset($flatMenuOptions->href)) {
                    unset($flatMenuOptions->href, $flatMenuOptions->label);
                }

                // Merge options into new menu item
                $options = (object) array_merge((array) $options, (array) $flatMenuOptions);
            }
        }

        // And build up a fresh menu item element
        $menuItem = (object) [
            'uuid'  => $uuid,
            'type'  => 'treemenuitem',
            'spec'  => 'treemenuitemlvl' . $level,
            'style' => '',
            'options' => (object) [
                'all'                            => $options,
                'screen and (max-width: 1023px)' => (object) [],
                'screen and (max-width: 767px)'  => (object) [],
            ],
            'children' => [],
        ];

        // Also build up child items
        if ($wpMenuItem->children) {
            foreach ($wpMenuItem->children as $wpChildMenuItem) {
                $menuItem->children[] = self::buildMenuItemElementFromWPMenu($page, $wpChildMenuItem, $flatMenuItems, $level + 1);
            }
        }

        return $menuItem;
    }

    /**
     * Check if any of the menus were updated after a certain timestamp
     *
     * @param  string $timestamp
     * @return bool
     */
    public static function anyMenuWasUpdatedAfter($timestamp)
    {
        // First let's check global menu update
        $menuTimestamp = self::getUpdatedAt();

        // Check global menu timestamp
        if ($menuTimestamp) {
            // Check the timestamp
            if ($menuTimestamp === false || $menuTimestamp > $timestamp) {
                return true;
            }

        // If we don't get a timestamp for all menus, we need to check each menu individualy
        } else {
            // Get all menu terms
            $menus = get_terms('nav_menu', ['hide_empty' => false]);

            // Then find the transients and compare the dates
            foreach ($menus as $menu) {
                $menuTimestamp = self::getUpdatedAt($menu->term_id);

                // Create a timestamp if missing
                if ($menuTimestamp === false) {
                    self::touch($menu->term_id);
                }

                // Check the timestamp
                if ($menuTimestamp === false || $menuTimestamp > $timestamp) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Build up data for all WP menus
     *
     * @param  string  $search
     * @param  bool    $recursively
     * @return array
     */
    public static function search($search = '', $recursively = true)
    {
        // Get all menus and add items
        if (empty($search)) {
            $result = get_terms('nav_menu', array('hide_empty' => true));

            if ($recursively) {
                foreach ($result as $item) {
                    $item->children = wp_get_nav_menu_items($item->term_id);
                    $item->children = op3_build_tree($item->children, 'ID', 'menu_item_parent', 'menu_order asc');
                }
            }

        // If we get a $search param wee need to find the specific menu
        } else {
            $result = wp_get_nav_menu_object($search);

            if ($result) {
                $result->children = wp_get_nav_menu_items($search);

                if ($recursively) {
                    $result->children = op3_build_tree($result->children, 'ID', 'menu_item_parent', 'menu_order asc');
                } else {
                    $result->children = array_filter($result->children, function ($value) {
                        return $value->menu_item_parent == 0;
                    });
                    $result->children = array_values($result->children);
                }
            }
        }

        return $result;
    }

    /**
     * Get the date when the menu was last updated
     *
     * @param  string $menuId
     * @return string|bool
     */
    public static function getUpdatedAt($menuId = null)
    {
        if ($menuId) {
            return get_transient(self::updateTransientKey($menuId)) ?: false;
        }

        return get_transient(self::updateTransientKey()) ?: false;
    }

    /**
     * Generate key for transient option
     *
     * @param  string $menuId
     * @return string
     */
    protected static function updateTransientKey($menuId = null)
    {
        if ($menuId) {
            return 'op__opb_menu__' . $menuId . '__updated_at';
        }

        return 'op__opb_all_menus__updated_at';
    }

    /**
     * Find WP menu by ID, and if none is found, return the first one
     *
     * @param  int  $menuId
     * @return mixed
     */
    public static function findWpMenu($menuId)
    {
        $menu = self::search($menuId);

        // If there's no menu found, we need to find a default one
        if (! $menu || ! isset($menu->children) || ! $menu->children) {
            // Get all menus
            $menus = self::search();

            // Then just pluck the first one
            $menu = isset($menus[0]) ? $menus[0] : null;
        }

        return $menu;
    }
}
