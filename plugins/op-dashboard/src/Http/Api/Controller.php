<?php

namespace OPDashboard\Http\Api;

/**
 * Base API controller
 *
 * @package OPDashboard\Http\Api
 */
class Controller
{
    /**
     * Abort HTTP request
     *
     * @param $code
     */
    public function abort($code)
    {
        echo "Error: " . $code;
        die();
    }
}
