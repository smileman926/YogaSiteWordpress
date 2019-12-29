<?php

namespace OptimizePress\Support\Debug;

class HtmlDumper
{
    /**
     * Output type
     * @param string $output
     */
    protected $output;

    /**
     * Init new var dumper
     */
    public function __construct()
    {
        // @TODO: Empty for now
    }

    /**
     * Dump variables
     *
     * @param  mixed $data
     * @return mixed
     */
    public function dump($data)
    {
        $args = func_get_args();

        echo "\n<pre style=\"border:1px solid #ccc;padding:10px;" .
            "margin:10px;font:14px courier;background:whitesmoke;" .
            "display:block;border-radius:4px;\">\n";

        $trace = debug_backtrace(false);
        $offset = (@$trace[2]['function'] === 'dump_d') ? 2 : 0;

        echo "<span style=\"color:red\">" .
            @$trace[1+$offset]['class'] . "</span>:" .
            "<span style=\"color:blue;\">" .
            @$trace[1+$offset]['function'] . "</span>:" .
            @$trace[0+$offset]['line'] . " " .
            "<span style=\"color:green;\">" .
            @$trace[0+$offset]['file'] . "</span>\n\n";

        if ( ! empty($args)) {
            if (function_exists('dump')) {
                call_user_func_array('dump', $args);
            } else {
                call_user_func_array('var_dump', $args);
            }
        }

        echo "</pre>\n";
    }
}
