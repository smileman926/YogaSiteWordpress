<?php

namespace OPBuilder\Http;

use OPBuilder\Support\SystemInfoManager;

class OptionsController
{
    /**
     * Support screen
     *
     * @return void
     */
    public static function support()
    {
        $system = new SystemInfoManager;
        $info   = $system->getInfo();

        echo op3_view('options/support/index', ['info' => $info]);
    }

    /**
     * Tools screen
     *
     * @return void
     */
    public static function tools()
    {
        echo '<pre>'; print_r("TOOLS"); echo '</pre>'; die();
    }

    /**
     * License screen
     *
     * @return void
     */
    public static function license()
    {
        echo '<pre>'; print_r("LICENSE"); echo '</pre>'; die();
    }
}
