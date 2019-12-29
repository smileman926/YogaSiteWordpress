<?php

namespace OPBuilder\Hooks;

class HookRegistry
{
    /**
     * All registered hook calls
     *
     * @var array
     */
    protected static $registeredHooks = [];

    /**
     * Register new hook call
     *
     * @param $hookId
     */
    public static function register($hookId)
    {
        static::$registeredHooks[$hookId] = true;
    }

    /**
     * Check if hook call was registered
     *
     * @param $hookId
     * @return bool
     */
    public static function isRegistered($hookId)
    {
        return isset(static::$registeredHooks[$hookId]) and static::$registeredHooks[$hookId];
    }

    /**
     * Return all hook call signatures
     *
     * @return array
     */
    public static function hook()
    {
        return static::$registeredHooks;
    }
}
