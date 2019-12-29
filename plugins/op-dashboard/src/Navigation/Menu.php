<?php

namespace OPDashboard\Navigation;

class Menu
{
    /**
     * @var array|ItemCollection
     */
    protected $items = [];

    /**
     * @var string
     */
    protected $baseUrl;

    /**
     * Init new menu
     *
     * @param $items
     */
    public function __construct($items)
    {
        $this->items = new ItemCollection;

        // Now add the items to the collection
        foreach ($items as $item) {
            $this->add($item);
        }
    }

    /**
     * Create new menu instance
     *
     * @param array $items
     * @return Menu
     */
    public static function create($items = [])
    {
        return new static($items);
    }

    /**
     * Add new menu item
     *
     * @param Item $item
     * @return $this
     */
    public function add(Item $item)
    {
        // Add the menu object reference
        $item->setMenu($this);

        // And push the item
        $this->items[] = $item;

        return $this;
    }

    /**
     * Set the base URL for links
     *
     * @param string $baseUrl
     */
    public function setBaseUrl($baseUrl)
    {
        $this->baseUrl = $baseUrl;
    }

    /**
     * Return all menu items
     *
     * @return ItemCollection
     */
    public function items()
    {
        return new ItemCollection($this->items);
    }

    /**
     * Return specific item
     *
     * @param string $uid
     * @return Item
     */
    public function item($uid)
    {
        foreach ($this->items as $item) {
            //echo '<pre>'; print_r($item); echo '</pre>';
            if ($item->uid() == $uid) {
                return $item;
            }
        }
    }

    /**
     * Generates menu HTML code
     *
     * @return string
     */
    public function generateHtml()
    {
        // We need to sort the items
        $this->items = $this->items->sortBy(function($item) {
            return $item->order;
        });

        // Start html
        $html = '';

        foreach ($this->items as $item) {
            $activeClass = '';

            // Check if active
            if ($item->active) {
                $activeClass = 'selected';
            }

            // Start HTML
            $html .= '<li class="' . $activeClass . '"><a href="' . $item->url . '">';

            // Add an icon
            if ($item->icon) {
                $html .= '<i class="' . $item->icon . '"></i>';
            }

            // The link and label
            $html .= '<span>' . $item->label . '</span>';

            // Close it out
            $html .= '</a></li>'.PHP_EOL;
        }

        return $html;
    }

    /**
     * Render the menu
     * It simply uses the generateHtml method
     * In the future more view templates will be supported
     */
    public function render()
    {
        echo $this->generateHtml();
    }
}
