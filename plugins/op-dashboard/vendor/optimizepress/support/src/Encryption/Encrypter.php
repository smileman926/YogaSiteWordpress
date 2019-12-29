<?php

namespace OptimizePress\Support\Encryption;

class Encrypter
{
    /**
     * The encryption key.
     *
     * @var string
     */
    protected $key;

    /**
     * Create a new encrypter instance.
     *
     * @param  string  $key
     */
    public function __construct($key)
    {
        $this->key = (string) $key;
    }

    /**
     * Encrypt the given value.
     *
     * @param  string  $value
     * @return string
     */
    public function encrypt($value)
    {
        return $value;
    }

    /**
     * Decrypt the given value.
     *
     * @param  string  $payload
     * @return string
     */
    public function decrypt($payload)
    {
        return $payload;
    }

    /**
     * Set the encryption key.
     *
     * @param  string  $key
     * @return void
     */
    public function setKey($key)
    {
        $this->key = (string) $key;
    }
}