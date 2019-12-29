<?php

if (! function_exists('vd')) {
    /**
     * Dump the passed variables.
     *
     * @param  mixed
     * @return void
     */
    function vd()
    {
        $dumper = new OptimizePress\Support\Debug\HtmlDumper;

        array_map(function ($x) use ($dumper) {
            $dumper->dump($x);
        }, func_get_args());
    }
}

if (! function_exists('dd')) {
    /**
     * Dump the passed variables and end the script.
     *
     * @param  mixed
     * @return void
     */
    function dd()
    {
        $dumper = new OptimizePress\Support\Debug\HtmlDumper;

        array_map(function ($x) use ($dumper) {
            $dumper->dump($x);
        }, func_get_args());

        die(1);
    }
}
