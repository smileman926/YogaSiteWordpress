<?php

namespace OPDashboard\SL\Traits;

use OPDashboard\Customers\Customer;
use OPDashboard\Services\Cache;
use OPDashboard\SL\Response;
use OptimizePress\Support\Collection;

trait ProductsTrait
{
    /**
     * Fetch all available customer products from SL
     *
     * @return \OptimizePress\Support\Collection
     */
    public static function getAvailableProducts()
    {
        return Cache::remember('opd_customer_available_products', OPD_CACHE_TTL_SL, function() {
            $details = static::getCustomerDetails();

            return $details ? $details->products : null;
        });
    }

    /**
     * Generate and return the download URL for a product
     *
     * @param  string $productUid
     * @return mixed
     * @throws \Exception
     */
    public static function getProductDownloadUrl($productUid, $version = null)
    {
        /** @var Response $response */
        $response = self::client()->request('GET', 'api/customer/products/'.$productUid.'/install?v=' . $version);

        return $response->data()['url'];
    }

    /**
     * Retrieve detailed info on a product from the SL service
     *
     * @param  string $productUid
     * @return mixed
     * @throws \Exception
     */
    public static function getProductInfo($productUid)
    {
        /** @var Response $response */
        $response = self::client()->request('GET', 'api/customer/products/'.$productUid.'/info');

        return $response->data();
    }
}
