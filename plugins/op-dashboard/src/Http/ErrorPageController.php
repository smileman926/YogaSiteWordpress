<?php

namespace OPDashboard\Http;

use function OPDashboard\view;
use function OPDashboard\view_exists;

class ErrorPageController extends Controller
{
    /**
     * Display an error page
     *
     * @return void
     */
    public static function showPage()
    {
        $view = 'errors/' . (isset($_GET['opd-error']) ? $_GET['opd-error'] : 'default');

        if (view_exists($view)) {
            view($view);
        } else {
            view('errors/default');
        }
    }
}
