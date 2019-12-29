<?php

namespace OPDashboard\Http;

use OPDashboard\SL\SL;
use function OPDashboard\view;

class DashboardController extends Controller
{
    /**
     * Display the main dashboard page
     */
    public static function index()
    {
        // Check if API is connected (token set) but also if the customer is authorized
        $tokenExists = SL::tokenExists();
        $connected   = static::isApiConnected();
        $customer    = SL::getCustomerDetails();
        // $ping        = SL::ping(); // not needed as isApiConnected already pings the SL

        if ($connected and $customer) {
            view('dashboard/index', ['customer' => $customer]);
        } else {
            if (! $tokenExists) {
                // $error = ['message' => 'Missing API token in options. Simply reconnect to retrieve a new token.', 'code' => 'missing_token'];
                $error = false;
            } elseif (! $connected) {
                $error = ['message' => 'Cannot authenticate your website. This usually means the API token is invalid or an API timeout occurred.', 'code' => 'authentication_failed'];
            } elseif (! $customer) {
                $error = ['message' => 'No customer data can be fetched. This usually means the API token is invalid or an API timeout occurred.', 'code' => 'customer_failed'];
            } else {
                $error = ['message' => 'Error when connecting to SL.', 'code' => 'connection_error'];
            }

            view('dashboard/connect', ['error' => $error]);
        }
    }
}
