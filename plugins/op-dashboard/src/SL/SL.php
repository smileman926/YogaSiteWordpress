<?php

namespace OPDashboard\SL;

use OPDashboard\Customers\Customer;
use OPDashboard\Services\Cache;
use OPDashboard\SL\Traits\CustomersTrait;
use OPDashboard\SL\Traits\FunnelsTrait;
use OPDashboard\SL\Traits\MessagesTrait;
use OPDashboard\SL\Traits\PaymentTrait;
use OPDashboard\SL\Traits\ProductsTrait;
use OPDashboard\SL\Traits\TemplatesTrait;
use OptimizePress\Support\Collection;

class SL
{
    use CustomersTrait, FunnelsTrait, MessagesTrait, ProductsTrait, TemplatesTrait;

    /**
     * @var ApiClient
     */
    protected static $client;

    /**
     * @var Customer
     */
    protected static $customer;

    /**
     * @var Customer
     */
    protected static $customerDetails;

    /**
     * @var Collection
     */
    protected static $customerDomains;

    /**
     * @var bool
     */
    protected static $connected;

    /**
     * @var bool
     */
    protected static $ping;

    /**
     * Create new SL API client
     *
     * @return ApiClient
     */
    public static function client()
    {
        if (! static::$client) {
            static::$client = new ApiClient;
        }

        return static::$client;
    }

    /**
     * Check if plugin is connected to SL
     *
     * @return bool
     * @throws \Exception
     */
    public static function isConnected()
    {
        self::$connected = self::client()->isConnected();

        return self::$connected;
    }

    /**
     * Check if we have a token in the database
     *
     * @return bool
     */
    public static function tokenExists()
    {
        return self::client()->tokenExists();
    }

    /**
     * Ping the SL API
     *
     * @param  bool $force
     * @return bool
     */
    public static function ping($force = false)
    {
        if (self::$ping === null) {
            // Clear cache
            if ($force) {
                Cache::forget('opd_ping_api');
            }

            $pingResult = Cache::remember('opd_ping_api', OPD_CACHE_TTL_SL_PING, function () {
                $ping = self::client()->ping();

                return $ping->isError() ? null : true;
            });

            if ((bool) $pingResult) {
                self::$ping = true;
            } else {
                self::$ping = false;
            }
        }

        return self::$ping;
    }

    /**
     * Clear out tokens from WP DB
     *
     * @return void
     */
    public static function clearTokens()
    {
        self::client()->clearTokens();
    }
}
