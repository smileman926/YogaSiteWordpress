<?php

namespace OPDashboard\SL\Traits;

use OPDashboard\Customers\Customer;
use OPDashboard\Customers\Domain;
use function OPDashboard\get_current_domain;
use OPDashboard\Services\Cache;
use OptimizePress\Support\Collection;

trait CustomersTrait
{
    /**
     * Get customer's info from SL
     *
     * @return Customer
     */
    public static function getCustomer()
    {
        if (! self::$customer) {
            self::$customer = Cache::remember('opd_customer', OPD_CACHE_TTL_SL, function () {
                $response = self::client()->getCustomer();
                $data     = $response->data();

                // Clear out tokens when unauthorized
                if ($response->isError()) {
                    $data = null;
                }

                return $data ? new Customer($data) : null;
            });
        }

        return self::$customer;
    }

    /**
     * Fetch customer detailed data
     *
     * @return Customer
     */
    public static function getCustomerDetails()
    {
        if (! self::$customerDetails) {
            self::$customerDetails = Cache::remember('opd_customer_details', OPD_CACHE_TTL_SL, function () {
                $response = self::client()->getCustomerDetails();
                $data     = $response->data();

                // Clear out tokens when unauthorized
                if ($response->isError()) {
                    $data = null;
                }

                return $data ? new Customer($data) : null;
            });
        }

        return self::$customerDetails;
    }

    /**
     * Check if a specific domain is active for user
     *
     * @return bool
     */
    public static function getCustomerDomains()
    {
        if (! self::$customerDomains) {
            self::$customerDomains = Cache::remember('opd_customer_domains', OPD_CACHE_TTL_SL, function () {
                $response = self::client()->getCustomerDomains();
                $data     = $response->data();

                // Clear out tokens when unauthorized
                if (! $response->isError()) {
                    $domains = new Collection;

                    foreach ($data as $item) {
                        $domain = new Domain($item);
                        $domains->push($domain);
                    }

                    return $domains;
                }

                return null;
            });
        }

        return self::$customerDomains;
    }

    /**
     * Check if a specific domain is active for user
     *
     * @param string $domain
     * @return bool
     */
    public static function isActiveDomain($domain = null)
    {
        $domain  = $domain ?: get_current_domain();
        $domains = self::getCustomerDomains();

        if ($domains) {
            foreach ($domains as $domainData) {
                if ($domainData->domain === $domain and $domainData->active) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Check if a specific domain is active for user
     *
     * @return bool
     */
    public static function ping()
    {
        $response = self::client()->ping();

        if (! $response->isError()) {
            return true;
        }

        return false;
    }
}
