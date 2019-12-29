<?php

namespace OPDashboard\Services;

use OPDashboard\Navigation\Menu;

/**
 * Menu manager
 *
 * @package OPDashboard\Services
 */
class Menus
{
    public static $menus = [];

    /**
     * Register menu to container
     *
     * @param string  $uid
     * @param Menu    $menu
     */
    public static function register($uid, $menu)
    {
        self::$menus[$uid] = $menu;
    }

    /**
     * Find menu in container
     *
     * @param string $uid
     * @return Menu|null
     */
    public static function get($uid)
    {
        if (isset(self::$menus[$uid])) {
            return self::$menus[$uid];
        }
    }

    /**
     * Find menu by uid
     *
     * @param  string $uid
     * @return null|Menu
     */
    public static function find($uid)
    {
        return self::get($uid);
    }

    /**
     * Render a menu
     *
     * @param string $uid
     * @return mixed
     */
    public static function render($uid)
    {
        if (isset(self::$menus[$uid])) {
            return self::$menus[$uid]->render();
        }
    }

    /**
     * Destroy menu in container
     *
     * @param string $uid
     * @return void
     */
    public static function unregister($uid)
    {
        if (isset(self::$menus[$uid])) {
            unset(self::$menus[$uid]);
        }
    }
}
