<?php

namespace OptimizePress\Integrations\Services;

use Hashids\Hashids;

/**
 * Generate UIDs for integrations
 */
class UidGenerator
{
    /**
     * @var Hashids
     */
    protected $service;

    /**
     * Init new UID generator
     *
     * @param string $key
     */
    public function __construct($key = null)
    {
        $this->service = new Hashids(($key ? $key : config('app.key')), 12);
    }

    /**
     * Generate new UID
     *
     * @param  string $value
     * @return string
     */
    public function encode($value)
    {
        return $this->service->encode($value);
    }

    /**
     * Decode UID to real value
     *
     * @param  string $value
     * @return mixed
     */
    public function decode($value)
    {
        return $this->service->decode($value);
    }
}
