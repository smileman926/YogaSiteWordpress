<?php

namespace OptimizePress\Integrations;

use OptimizePress\Integrations\Services\DataObjectTrait;

class IntegrationTag
{
    use DataObjectTrait;

    /**
     * Integration tag data
     *
     * @var array
     */
    protected $data;

    /**
     * Init new integration tag
     *
     * @param array|null $data
     */
    public function __construct(array $data = null)
    {
        $this->data = $data;
    }

    /**
     * Get data value
     *
     * @param  string $key
     * @return mixed
     */
    public function __get($key)
    {
        return isset($this->data[$key]) ? $this->data[$key] : null;
    }

    /**
     * Set data value
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
     * Return array representation of data
     *
     * @return array
     */
    public function toArray()
    {
        return (array) $this->data;
    }

    /**
     * JSON formatted data
     *
     * @param  integer $options
     * @return string
     */
    public function toJson($options = 0)
    {
        return @json_encode($this->toArray(), $options);
    }
}
