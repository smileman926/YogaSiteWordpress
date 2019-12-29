<?php

namespace OptimizePress\Integrations\Storage;

/**
 * Build up storage repository
 */
class IntegrationStorage
{
    /**
     * Storage repository
     *
     * @var mixed
     */
    protected static $repository;

    /**
     * Simply return the current storage repository
     *
     * @param  array $config
     * @return IntegrationRepositoryInterface
     */
    public static function get($config = null)
    {
        // TODO: Pass config for correct storage repository
        if ( ! $config) {
            $config = ['storage' => ['repository' => IntegrationEloquentRepository::class]];
        }

        if ( ! isset(static::$repository) or ! static::$repository) {
            static::$repository = new $config['storage']['repository'];
        }

        return static::$repository;
    }
}
