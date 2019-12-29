<?php

namespace OPDashboard\Services;


class GeoIp
{
    protected static $geoip;

    protected static $euCountries = [
        "BE","BG","CZ","DK","DE","EE","EL","GR","ES",
        "FR","HR","IE","IT","CY","LV","LT","LU","HU",
        "MT","NL","AT","PL","PT","RO","SI","SK","FI",
        "SE","UK","GB"
    ];
    /**
     * Get Client IP address
     * @return string
     */
    public static function getClientIp()
    {
        if (getenv('HTTP_CLIENT_IP')) {
            $ipAddress = getenv('HTTP_CLIENT_IP');
        } else if(getenv('HTTP_X_FORWARDED_FOR')) {
            $ipAddress = getenv('HTTP_X_FORWARDED_FOR');
        } else if(getenv('HTTP_X_FORWARDED')) {
            $ipAddress = getenv('HTTP_X_FORWARDED');
        } else if(getenv('HTTP_FORWARDED_FOR')) {
            $ipAddress = getenv('HTTP_FORWARDED_FOR');
        } else if(getenv('HTTP_FORWARDED')) {
            $ipAddress = getenv('HTTP_FORWARDED');
        } else if(getenv('REMOTE_ADDR')) {
            $ipAddress = getenv('REMOTE_ADDR');
        } else {
            $ipAddress = 'UNKNOWN';
        }

        if ($ipAddress === '::1') {
            $ipAddress = '192.168.0.1';
        }

        /*
        *   On some server configurations, HTTP_X_FORWARDED_FOR or REMOTE_ADDR returns
        *   multiple comma-separated IPs This brakes some email integration,
        *   so we want to return only one IP.
        */
        if (strpos($ipAddress, ',') !== false) {
            $ipAddress = explode(',', $ipAddress);
            $ipAddress = $ipAddress[0];
        }

        return $ipAddress;
    }

    /**
     * Get country code
     * @param  string $ipAddress
     * @return string
     */
    public static function getCountryCode($ipAddress)
    {
        $countryCode = geoip_country_code_by_addr(self::getGeoIp(), $ipAddress);

        if ($countryCode == '') {
            $countryCode = 'GB';
        }
        return $countryCode;
    }

    /**
     * Check if a country is in EU
     * @param $countryCode
     * @return bool
     */
    public static function isEuCountry($countryCode)
    {
        return in_array(strtoupper($countryCode), self::$euCountries) ? true : false;
    }

    /**
     * Check if a user is in EU
     * @return bool
     */
    public static function isFromEu()
    {
        $countryCode = self::getCountryCode(self::getClientIp());

        if (self::isEuCountry($countryCode)) {
            return true;
        }
        return false;
    }

    /**
     * Return geoIP object
     * @return GeoIP
     */
    protected static function getGeoIp()
    {
        if (self::$geoip === null) {
            self::$geoip = geoip_open(__DIR__ . "/../../data/GeoIP.dat", GEOIP_STANDARD);
        }

        return self::$geoip;
    }
}