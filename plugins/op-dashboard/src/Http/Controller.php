<?php

namespace OPDashboard\Http;

use OPDashboard\SL\SL;

class Controller
{
    /**
     * Abort HTTP request
     *
     * @param $code
     */
    public static function abort($code)
    {
        echo "Error: " . $code;
        die();
    }

    /**
     * Check if SL API is connected
     *
     * @return bool
     * @throws \Exception
     */
    public static function isApiConnected()
    {
        return SL::isConnected();
    }
}
