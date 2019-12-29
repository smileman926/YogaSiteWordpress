<?php

namespace OptimizePress\Integrations;

use OptimizePress\Support\Arr;

class IntegrationConfig
{
    /**
     * @var array
     */
    protected $data = [];

    /**
     * Initialize new integration configuration
     *
     * @param array $data
     */
    public function __construct(array $data)
    {
        $this->data = $data;
    }

    /**
     * Return config value
     *
     * @param  string $key
     * @return mixed
     */
    public function get($key)
    {
        return Arr::get($this->data, $key);
    }

    /**
     * Get connection parameter value
     *
     * @param $key
     * @return mixed
     */
    public function getConnectionValue($key)
    {
        if ($this->connection && isset($this->connection[$key])) {
            return $this->connection[$key];
        } elseif ($this->connection && isset($this->connection->$key)) {
            return $this->connection->$key;
        }

        return null;
    }

    /**
     * Set a connection value
     *
     * @param  string $key
     * @param  mixed  $value
     * @return void
     */
    public function setConnectionValue($key, $value)
    {
        if (is_object($this->connection)) {
            $this->connection->{$key} = $value;
        } elseif (is_array($this->connection)) {
            $this->connection[$key] = $value;
        }
    }

    /**
     * Return config value
     *
     * @param  string  $key
     * @param  mixed   $value
     * @return mixed
     */
    public function set($key, $value)
    {
        return Arr::set($this->data, $key, $value);
    }

    /**
     * Check if key exists
     * @param  string  $key
     * @return boolean
     */
    public function has($key)
    {
        return Arr::has($this->data, $key);
    }

    /**
     * Convert to array
     *
     * @return array
     */
    public function toArray()
    {
        return $this->data;
    }

    /**
     * Return config value
     *
     * @param  string $key
     * @return mixed
     */
    public function __get($key)
    {
        return Arr::get($this->data, $key);
    }
}
