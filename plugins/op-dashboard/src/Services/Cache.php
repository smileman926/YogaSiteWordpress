<?php

namespace OPDashboard\Services;

use Closure;

class Cache
{
    /**
     * The prefix added to every cache item
     *
     * @var string
     */
    protected static $keyPrefix = 'op__';

    /**
     * Get an item from the cache, or store the default value.
     *
     * @param  string    $key
     * @param  int       $minutes
     * @param  \Closure  $callback
     * @return mixed
     */
    public static function remember($key, $minutes, Closure $callback)
    {
        $value = self::get($key);

        // If the item exists in the cache we will just return this immediately and if
        // not we will execute the given Closure and cache the result of that for a
        // given number of minutes so it's available for all subsequent requests.
        if (! is_null($value) and $value !== false) {
            return $value;
        }

        self::put($key, $value = $callback(), $minutes);

        return $value;
    }

    /**
     * Store an item in the cache.
     *
     * @param  string  $key
     * @param  mixed   $value
     * @param  int     $minutes
     * @return void
     */
    public static function put($key, $value, $minutes = null)
    {
        if (! is_null($value)) {
            set_transient(self::key($key), $value, $minutes * 60);
        }
    }

    /**
     * Retrieve an item from the cache by key.
     *
     * @param  string  $key
     * @param  mixed   $default
     * @return mixed
     */
    public static function get($key, $default = null)
    {
        $value = get_transient(self::key($key));

        // If we could not find the cache value, we will fire the missed event and get
        // the default value for this cache value. This default could be a callback
        // so we will execute the value function which will resolve it if needed.
        if (is_null($value) or $value === false) {
            $value = self::value($default);
        }

        return $value;
    }

    /**
     * Delete cache
     *
     * @param string $key
     */
    public static function forget($key)
    {
        delete_transient(self::key($key));
    }

    /**
     * Build up prefixed cache key
     *
     * @param  string $key
     * @return string
     */
    protected static function key($key)
    {
        return self::$keyPrefix . $key;
    }

    /**
     * Return the default value of the given value.
     *
     * @param  mixed  $value
     * @return mixed
     */
    protected static function value($value)
    {
        return $value instanceof Closure ? $value() : $value;
    }
}
