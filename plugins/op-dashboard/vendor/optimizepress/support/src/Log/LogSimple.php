<?php

namespace OptimizePress\Support\Log;

class LogSimple
{
    public function factory()
    {
        return $this;
    }

    /**
     * Debug log
     *
     * @param $message
     */
    public static function debug($message)
    {
       error_log('[DEBUG] '.$message, 0) ;
    }

    /**
     * Error log
     *
     * @param $message
     */
    public static function error($message)
    {
        error_log('[ERROR] '.$message, 0) ;
    }

    /**
     * Info log
     *
     * @param $message
     */
    public static function info($message)
    {
        error_log('[INFO] '.$message, 0) ;
    }

    /**
     * Warning log
     *
     * @param $message
     */
    public static function warning($message)
    {
        error_log('[WARNING] '.$message, 0) ;
    }
}
