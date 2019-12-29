<?php

namespace OPDashboard\Customers;

use OPDashboard\Services\DataObject;
use OptimizePress\Support\Collection;

class Tier extends DataObject
{
    /**
     * @var Collection
     */
    public $products;

    /**
     * Init new customer
     *
     * @param $data
     */
    public function __construct($data)
    {
        parent::__construct($data);

        // Set it
        $this->products = $this->products();
    }

    /**
     * All products inside tier
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
}
