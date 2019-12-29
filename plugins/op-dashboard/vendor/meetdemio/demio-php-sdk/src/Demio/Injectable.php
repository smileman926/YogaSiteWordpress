<?php

/**
 * @author Oleksandr Torosh <webtorua@gmail.com>
 */
namespace Demio;

use Demio\Http\Request;

class Injectable
{

    protected static $di;

    public function getDi()
    {
        return self::$di;
    }

    public static function setDi($di)
    {
        self::$di = $di;
    }

    /**
     * @return Request
     */
    public function getRequest()
    {
        return self::$di->get('request');
    }

    /**
     * @return string
     */
    public function getApiKey()
    {
        return self::$di->get('api_key');
    }


    /**
     * @return string
     */
    public function getApiSecret()
    {
        return self::$di->get('api_secret');
    }

}