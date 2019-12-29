<?php

namespace OPDashboard\Customers;

use OPDashboard\Services\DataObject;
use OPDashboard\Products\Product;
use OptimizePress\Support\Collection;

class Customer extends DataObject
{
    use CustomerAccessTrait;

    /**
     * @var Tier
     */
    public $tier;

    /**
     * @var Collection
     */
    public $products;

    /**
     * @var array
     */
    public $tags;

    /**
     * Init new customer
     *
     * @param $data
     */
    public function __construct($data)
    {
        parent::__construct($data);

        // Set it
        $this->tier     = $this->tier();
        $this->products = $this->products();
        $this->tags     = $this->tags();
    }

    /**
     * Check if user has access to the beta release channel
     *
     * @return bool
     */
    public function hasBetaAccess()
    {
        return (isset($this->data['type']) and $this->data['type'] === 'admin') ? true : false;
    }

    /**
     * Build up customer tier
     *
     * @return Tier
     */
    public function tier()
    {
        return (isset($this->data['tier'])) ? new Tier($this->data['tier']) : null;
    }

    /**
     * All customer tags
     *
     * @return array
     */
    public function tags()
    {
        if (isset($this->data['tags'])) {
            return $this->data['tags'];
        }

        return [];
    }

    /**
     * All customer products
     *
     * @return Collection
     */
    public function products()
    {
        $products = new Collection;

        if (isset($this->data['products'])) {
            foreach ($this->data['products'] as $productData) {
                $products->push(new Product($productData));
            }
        }

        return $products;
    }

    /**
     * Full name of the customer
     *
     * @return string
     */
    public function getFullNameAttribute()
    {
        return $this->data['first_name'] . ' ' . $this->data['last_name'];
    }

    /**
     * Check if admin
     *
     * @return bool
     */
    public function getIsAdminAttribute()
    {
        return $this->data['type'] == 'admin';
    }
}
