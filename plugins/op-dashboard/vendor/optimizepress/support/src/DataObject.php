<?php

namespace OptimizePress\Support;

use OptimizePress\Support\Contracts\Arrayable;
use OptimizePress\Support\Contracts\Jsonable;

class DataObject implements Arrayable, Jsonable
{
    /**
     * Init new data object
     *
     * @param array $data
     */
    public function __construct(array $data = null)
    {
        if ($data) {
            foreach ($data as $key => $value) {
                $this->{$key} = $value;
            }
        }
    }

    /**
     * Get an object property
     *
     * @param  string $key
     * @return mixed
     */
    public function __get($key)
    {
        return isset($this->{$key}) ? $this->{$key} : null;
    }

    /**
     * Get an object property
     *
     * @param  string $key
     * @param  mixed  $value
     * @return mixed
     */
    public function __set($key, $value)
    {
        return $this->{$key} = $value;
    }

    /**
     * Return as array
     *
     * @return array
     */
    public function toArray()
    {
        return get_object_vars($this);
    }

    /**
     * Return as JSON
     *
     * @param  int $options
     * @return string
     */
    public function toJson($options = 0)
    {
        return @json_encode($this->toArray(), $options);
    }

    /**
     * String representation
     *
     * @return string
     */
    public function __toString()
    {
        return $this->toJson();
    }

    /**
     * Override isset
     *
     * @param  string $key
     * @return bool
     */
    public function __isset($key)
    {
        $attribute = $this->$key;

        return ! empty($attribute);
    }
}
