<?php

namespace OptimizePress\Support\Log;

class Log
{
    /**
     * The logger instance
     *
     * @var mixed
     */
    protected static $logger;

    /**
     * Build up a logger
     *
     * @return LogSimple|\Illuminate\Log\LogManager|\OPDashboard\Services\Log
     * @throws \Exception
     */
    public static function logger()
    {
        if (! self::$logger) {
            if (class_exists('\Illuminate\Log\LogManager')) {
                self::$logger = app('log');
            } elseif (class_exists('\OPDashboard\Services\Log')) {
                self::$logger = \OPDashboard\Services\Log::logger();
            } else {
                self::$logger = new LogSimple;
            }
        }

        return self::$logger;
    }

    public static function debug($message)
    {
        self::logger()->debug($message);
    }

    public static function error($message)
    {
        self::logger()->error($message);
    }

    public static function warning($message)
    {
        self::logger()->warning($message);
    }

    public static function info($message)
    {
        self::logger()->info($message);
    }
}
