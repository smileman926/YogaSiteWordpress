<?php

namespace OPDashboard\Services;

use OptimizePress\Support\Contracts\Arrayable;
use OptimizePress\Support\Contracts\Jsonable;
use OptimizePress\Support\Str;

abstract class DataObject implements Arrayable, Jsonable
{
    /**
     * @var mixed
     */
    protected $data;

    /**
     * Init new data object
     *
     * @param $data
     */
    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * Fill up object data
     *
     * @param array $data
     */
    public function fill(array $data)
    {
        $this->data = $data;
    }

    /**
     * Return object as array
     *
     * @return array
     */
    public function toArray()
    {
        return $this->data;
    }

    /**
     * Return object as array
     *
     * @param  int $options
     * @return string
     */
    public function toJson($options = 0)
    {
        return @json_encode($this->toArray(), $options);
    }

    /**
     * Get object property
     *
     * @param  string $key
     * @return mixed
     */
    public function __get($key)
    {
        $attributeMethod = 'get'.Str::studly($key).'Attribute';

        if (method_exists($this, $attributeMethod)) {
            return $this->$attributeMethod();
        } elseif (isset($this->data[$key])) {
            return $this->data[$key];
        }
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
