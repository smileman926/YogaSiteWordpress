<?php

namespace OPDashboard\Services;

use function OptimizePress\Support\array_get;
use OptimizePress\Support\Collection;

class Route
{
    /**
     * @var array
     */
    public static $adminPages = [];

    /**
     * @var array
     */
    public static $adminSubPages = [];

    /**
     * Set the namespace for the controllers
     *
     * @var string
     */
    protected static $namespace = 'OPDashboard\Http';

    /**
     * Change controller namespace if needed
     *
     * @param  $namespace
     * @return void
     */
    public static function setNamespace($namespace)
    {
        self::$namespace = $namespace;
    }

    /**
     * Create route for admin page, and add the navigation link
     * Needs to be called under the "admin_menu" filter
     *
     * @param string $label
     * @param string $route
     * @param mixed  $callback
     * @param array  $options
     * @return void
     */
    public static function adminPage($label, $route, $callback, $options = [])
    {
        // Add page to collection
        static::$adminPages[] = [
            'route'      => $route,
            'label'      => $label,
            'title'      => array_get($options, 'title', $label),
            'icon'       => array_get($options, 'icon'),
            'position'   => array_get($options, 'position', 99),
            'capability' => array_get($options, 'capability', 'manage_options'),
            'callback'   => self::parseCallback($callback),
        ];
    }

    /**
     * Add a admin sub page
     *
     * @param string $label
     * @param string $parent
     * @param string $route
     * @param mixed  $callback
     * @param array  $options
     * @return void
     */
    public static function adminSubPage($label, $parent, $route, $callback, $options = [])
    {
        // Add page to collection
        static::$adminSubPages[] = [
            'route'      => $route,
            'parent'     => $parent,
            'label'      => $label,
            'title'      => array_get($options, 'title', $label),
            'position'   => array_get($options, 'position', 999),
            'capability' => array_get($options, 'capability', 'manage_options'),
            'callback'   => self::parseCallback($callback),
            'options'    => $options,
        ];
    }

    /**
     * Register all admin pages and subpages
     */
    public static function registerAdminPages()
    {
        // First add main pages
        if (static::$adminPages) {
            $adminPages = new Collection(static::$adminPages);

            foreach ($adminPages as $adminPage) {
                add_menu_page(
                    array_get($adminPage, 'label'),
                    array_get($adminPage, 'title'),
                    array_get($adminPage, 'capability'),
                    array_get($adminPage, 'route'),
                    array_get($adminPage, 'callback'),
                    array_get($adminPage, 'icon'),
                    array_get($adminPage, 'position')
                );
            }
        }

        // Then add sub pages
        if (static::$adminSubPages) {
            // Order by position
            usort(static::$adminSubPages, function($a, $b) {
                return $a['position'] > $b['position'];
            });

            // Add pages
            foreach (static::$adminSubPages as $adminSubPage) {
                $route  = array_get($adminSubPage, 'route');
                $url    = array_get($adminSubPage, 'options.url');

                if (! $route and $url) {
                    add_submenu_page(
                        array_get($adminSubPage, 'parent'),
                        array_get($adminSubPage, 'title'),
                        array_get($adminSubPage, 'label'),
                        array_get($adminSubPage, 'capability'),
                        $url
                    );
                } else {
                    add_submenu_page(
                        array_get($adminSubPage, 'parent'),
                        array_get($adminSubPage, 'title'),
                        array_get($adminSubPage, 'label'),
                        array_get($adminSubPage, 'capability'),
                        $route,
                        array_get($adminSubPage, 'callback')
                    );
                }
            }
        }

        // We also need to rename the first item in the navigation
        global $submenu;

        if (isset($submenu['op-suite'])) {
            $submenu['op-suite'][0][0] = __('Dashboard', 'op3');
        }
    }

    /**
     * Setup a POST route
     *
     * @param string $route
     * @param mixed  $callback
     */
    public static function post($route, $callback)
    {
        $callback = self::parseCallback($callback);
        add_action('admin_action_' . $route, $callback);
    }

    /**
     * Parse a callback and return array with class/method combination
     *
     * @param  mixed $callback
     * @return array
     */
    public static function parseCallback($callback)
    {
        if (is_string($callback)) {
            $callbackParts = explode('@', $callback);
            $class         = self::$namespace . '\\' . $callbackParts[0];
            $method        = $callbackParts[1];
            $callback      = [$class, $method];
        }

        return $callback;
    }
}
