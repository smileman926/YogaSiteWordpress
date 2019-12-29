<?php

namespace OptimizePress\Integrations\Services\Contracts;

/**
 * Base integration provider
 */
abstract class BaseProvider
{
    /**
     * @var array
     */
    protected $config;

    /**
     * Init new integration provider
     *
     * @param  array  $config
     * @return mixed
     */
    public function __construct(array $config)
    {
        return $this->config = $config;
    }

    /**
     * Get property of provider
     *
     * @param  string $key
     * @return mixed
     */
    public function __get($key)
    {
        if ($key == 'id') $key = 'key';

        return isset($this->config[$key]) ? $this->config[$key] : null;
    }

    /**
     * Simply return key for the provider
     *
     * @return string
     */
    public function __toString()
    {
        return $this->config['key'];
    }
}
