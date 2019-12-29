<?php

namespace OPDashboard\Services;

use InvalidArgumentException;
use Monolog\Handler\StreamHandler;
use Monolog\Handler\SyslogHandler;
use Monolog\Formatter\LineFormatter;
use Monolog\Handler\ErrorLogHandler;
use Monolog\Logger as MonologLogger;
use Monolog\Handler\RotatingFileHandler;

class Log
{
    /**
     * The Monolog logger instance.
     *
     * @var \Monolog\Logger
     */
    protected static $monolog;

    /**
     * The Log levels.
     *
     * @var array
     */
    protected static $levels = [
        'debug'     => MonologLogger::DEBUG,
        'info'      => MonologLogger::INFO,
        'notice'    => MonologLogger::NOTICE,
        'warning'   => MonologLogger::WARNING,
        'error'     => MonologLogger::ERROR,
        'critical'  => MonologLogger::CRITICAL,
        'alert'     => MonologLogger::ALERT,
        'emergency' => MonologLogger::EMERGENCY,
    ];

    /**
     * Create a new log writer instance.
     *
     * @return mixed
     * @throws \Exception
     */
    public static function logger()
    {
        if ( ! static::$monolog) {
            // Setup the log path
            $path  = OPD_LOG_PATH;
            $log   = OPD_LOG_TYPE;

            // Determine log level
            if ((defined('WP_DEBUG') and WP_DEBUG === true) or (defined('OP3_DEBUG') and OP3_DEBUG === true) or (defined('OPD_DEBUG') and OPD_DEBUG === true)) {
                $level = MonologLogger::DEBUG;
            } else {
                $level = MonologLogger::WARNING;
            }

            // Create the logger instance
            static::$monolog = new MonologLogger('op');

            // Set all
            if ($log == 'daily') {
                static::useDailyFiles($path, 0, $level);
            } elseif ($log == 'syslog') {
                static::useSyslog('op', $level);
            } elseif ($log == 'errorlog') {
                static::useErrorLog($level);
            } else {
                static::useSingleFile($path, $level);
            }
        }

        return static::$monolog;
    }

    /**
     * Log an emergency message to the logs.
     *
     * @param  string $message
     * @param  array  $context
     * @return mixed
     * @throws \Exception
     */
    public static function emergency($message, array $context = [])
    {
        return static::writeLog(__FUNCTION__, $message, $context);
    }

    /**
     * Log an alert message to the logs.
     *
     * @param  string $message
     * @param  array  $context
     * @return mixed
     * @throws \Exception
     */
    public static function alert($message, array $context = [])
    {
        return static::writeLog(__FUNCTION__, $message, $context);
    }

    /**
     * Log a critical message to the logs.
     *
     * @param  string $message
     * @param  array  $context
     * @return mixed
     * @throws \Exception
     */
    public static function critical($message, array $context = [])
    {
        return static::writeLog(__FUNCTION__, $message, $context);
    }

    /**
     * Log an error message to the logs.
     *
     * @param  string $message
     * @param  array  $context
     * @return mixed
     * @throws \Exception
     */
    public static function error($message, array $context = [])
    {
        return static::writeLog(__FUNCTION__, $message, $context);
    }

    /**
     * Log a warning message to the logs.
     *
     * @param  string $message
     * @param  array  $context
     * @return mixed
     * @throws \Exception
     */
    public static function warning($message, array $context = [])
    {
        return static::writeLog(__FUNCTION__, $message, $context);
    }

    /**
     * Log a notice to the logs.
     *
     * @param  string $message
     * @param  array  $context
     * @return mixed
     * @throws \Exception
     */
    public static function notice($message, array $context = [])
    {
        return static::writeLog(__FUNCTION__, $message, $context);
    }

    /**
     * Log an informational message to the logs.
     *
     * @param  string $message
     * @param  array  $context
     * @return mixed
     * @throws \Exception
     */
    public static function info($message, array $context = [])
    {
        return static::writeLog(__FUNCTION__, $message, $context);
    }

    /**
     * Log a debug message to the logs.
     *
     * @param  string $message
     * @param  array  $context
     * @return mixed
     * @throws \Exception
     */
    public static function debug($message, array $context = [])
    {
        return static::writeLog(__FUNCTION__, $message, $context);
    }

    /**
     * Log a message to the logs.
     *
     * @param  string $level
     * @param  string $message
     * @param  array  $context
     * @return mixed
     * @throws \Exception
     */
    public static function log($level, $message, array $context = [])
    {
        return static::writeLog($level, $message, $context);
    }

    /**
     * Dynamically pass log calls into the writer.
     *
     * @param  string $level
     * @param  string $message
     * @param  array  $context
     * @return mixed
     * @throws \Exception
     */
    public static function write($level, $message, array $context = [])
    {
        return static::writeLog($level, static::formatMessage($message), $context);
    }

    /**
     * Write a message to Monolog.
     *
     * @param  string $level
     * @param  string $message
     * @param  array  $context
     * @return mixed
     * @throws \Exception
     */
    protected static function writeLog($level, $message, $context)
    {
        return static::logger()->addRecord(static::parseLevel($level), $message, $context);
    }

    /**
     * Register a single file log handler.
     *
     * @param  string $path
     * @param  string $level
     * @return void
     * @throws \Exception
     */
    public static function useSingleFile($path, $level = 'debug')
    {
        static::$monolog->pushHandler(
            $handler = new StreamHandler($path, $level)
        );

        $handler->setFormatter(static::getDefaultFormatter());
    }

    /**
     * Register a daily file log handler.
     *
     * @param  string  $path
     * @param  int     $days
     * @param  string  $level
     * @return void
     */
    public static function useDailyFiles($path, $days = 0, $level = 'debug')
    {
        static::$monolog->pushHandler(
            $handler = new RotatingFileHandler($path, $days, $level)
        );

        $handler->setFormatter(static::getDefaultFormatter());
    }

    /**
     * Register a Syslog handler.
     *
     * @param  string  $name
     * @param  string  $level
     * @return \Psr\Log\LoggerInterface
     */
    public static function useSyslog($name = 'op', $level = 'debug')
    {
        return static::$monolog->pushHandler(new SyslogHandler($name, LOG_USER, $level));
    }

    /**
     * Register an error_log handler.
     *
     * @param  string  $level
     * @param  int  $messageType
     * @return void
     */
    public static function useErrorLog($level = 'debug', $messageType = ErrorLogHandler::OPERATING_SYSTEM)
    {
        static::$monolog->pushHandler(
            $handler = new ErrorLogHandler($messageType, $level)
        );

        $handler->setFormatter(static::getDefaultFormatter());
    }

    /**
     * Format the parameters for the logger.
     *
     * @param  mixed  $message
     * @return mixed
     */
    protected static function formatMessage($message)
    {
        if (is_array($message)) {
            return var_export($message, true);
        }

        return $message;
    }

    /**
     * Parse the string level into a Monolog constant.
     *
     * @param  string  $level
     * @return int
     *
     * @throws \InvalidArgumentException
     */
    protected static function parseLevel($level)
    {
        if (isset(static::$levels[$level])) {
            return static::$levels[$level];
        }

        throw new InvalidArgumentException('Invalid log level.');
    }

    /**
     * Get a default Monolog formatter instance.
     *
     * @return \Monolog\Formatter\LineFormatter
     */
    protected static function getDefaultFormatter()
    {
        return new LineFormatter(null, null, true, true);
    }
}
