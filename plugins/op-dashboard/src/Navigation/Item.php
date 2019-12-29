<?php

namespace OPDashboard\Navigation;

use function OptimizePress\Support\array_get;

class Item
{
    /**
     * @var string
     */
    public $label;

    /**
     * @var string
     */
    public $url;

    /**
     * @var bool
     */
    public $active = false;

    /**
     * @var bool
     */
    public $visible = true;

    /**
     * @var Menu
     */
    public $menu;

    /**
     * @var Menu
     */
    public $submenu;

    /**
     * @var string
     */
    public $uid;

    /**
     * @var int
     */
    public $order;

    /**
     * @var string
     */
    public $icon;

    /**
     * New menu item
     *
     * @param array $data
     */
    public function __construct($data = [])
    {
        $this->label  = array_get($data, 'label');
        $this->url    = array_get($data, 'url');
        $this->uid    = array_get($data, 'uid', uniqid());
        $this->icon   = array_get($data, 'icon');
        $this->order  = (int) array_get($data, 'order', 0);
        $this->active = array_get($data, 'active', false);

        // Also add child items under the submenu
    }

    /**
     * Connect to parent Menu instance
     *
     * @param Menu $menu
     */
    public function setMenu(Menu $menu)
    {
        $this->menu = $menu;
    }

    /**
     * Check if item has sub items/children
     *
     * @return bool
     */
    public function hasChildren()
    {
        return ! empty($this->children);
    }

    /**
     * Return item submenu if exists
     *
     * @return Menu
     */
    public function submenu()
    {
        return $this->submenu;
    }

    /**
     * Return submenu items
     *
     * @return null|ItemCollection
     */
    public function children()
    {
        return $this->submenu ? $this->submenu->items() : null;
    }

    /**
     * Return item UID
     *
     * @return mixed|string
     */
    public function uid()
    {
        return $this->uid;
    }
}
