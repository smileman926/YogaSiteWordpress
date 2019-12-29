<?php

namespace OPDashboard\Services;

/**
 * Very simple benchmark class to measure execution time
 *
 * @package OPDashboard\Services
 */
class Benchmark
{
    /**
     * @var array
     */
    protected static $timers = [];

    /**
     * Start a benchmark
     *
     * @param string $key
     */
    public static function start($key)
    {
        static::$timers[$key] = [
            'start' => microtime(true),
        ];
    }

    /**
     * End benchmark
     *
     * @param  string  $key
     * @param  bool    $output
     * @return mixed
     */
    public static function end($key, $output = false)
    {
        static::$timers[$key]['end'] = microtime(true);
        static::$timers[$key]['time'] = microtime(true) - static::$timers[$key]['start'];

        if ($output) {
            static::output($key);
        } else {
            return static::$timers[$key]['time'] * 1000;
        }
    }

    /**
     * End benchmark and show time output
     *
     * @param  string  $key
     * @return mixed
     */
    public static function endAndOutput($key)
    {
        return self::end($key, true);
    }

    /**
     * End benchmark and write result to log
     *
     * @param  string $key
     * @param  null   $message
     */
    public static function endAndLog($key, $message = null)
    {
        $time   = self::end($key);
        $unit   = ['b','kb','mb','gb','tb','pb'];
        $memory = memory_get_usage();
        $memory = @round($memory / pow(1024, ($i = floor(log($memory, 1024)))), 2) . ' ' . $unit[$i];

        op3_log()->debug('[OP] [BENCHMARK] The process "' . $key . '" lasted ' . $time . ' ms. Memory: ' . $memory);
    }

    /**
     * Output benchmark result in various formats
     *
     * @param  string  $key
     * @param  string  $format
     */
    public static function output($key, $format = 'html')
    {
        $outputColor = '#222';
        $outputBorderColor = '#ddd';
        $time = static::$timers[$key]['time'] * 1000;

        if ($time < 50) {
            $outputColor = '#292';
            $outputBorderColor = '#ded';
        } elseif ($time > 200) {
            $outputColor = '#922';
            $outputBorderColor = '#edd';
        }

        if ($format === 'html') {
            echo '<p style="color: ' . $outputColor . '; border: 1px solid ' . $outputBorderColor . '; margin: 8px; padding: 8px; border-radius: 3px;"><strong>' . $key . ':</strong> ' . $time . ' ms</p>';
        } else {
            echo $key . ': ' . $time . ' ms';
        }
    }
}
