<?php

namespace OptimizePress\Integrations\Services;

trait DataObjectTrait
{
    /**
     * Get property
     *
     * @param  string $key
     * @return mixed
     */
    public function __get($key)
    {
        return isset($this->data[$key]) ? $this->data[$key] : null;
    }

    /**
     * Set property
     *
     * @param  string $key
     * @param  mixed $value
     * @return mixed
     */
    public function __set($key, $value)
    {
        return $this->data[$key] = $value;
    }

    /**
     * Convert object to array
     *
     * @return array
     */
    public function toArray()
    {
        return (array) $this->data;
    }

    /**
     * Convert object to JSON
     *
     * @param  int $options
     * @return string
     */
    public function toJson($options = 0)
    {
        return @json_encode($this->toArray(), $options);
    }
}
