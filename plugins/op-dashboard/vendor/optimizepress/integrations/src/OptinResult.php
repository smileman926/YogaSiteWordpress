<?php

namespace OptimizePress\Integrations;

use function OptimizePress\Support\array_except;
use function OptimizePress\Support\array_get;
use OptimizePress\Support\Collection;

class OptinResult
{
    /**
     * @var bool
     */
    protected $success;

    /**
     * @var bool
     */
    protected $error;

    /**
     * @var string
     */
    protected $message;

    /**
     * @var Integration
     */
    protected $integration;

    /**
     * @var OptinData
     */
    protected $optinData;

    /**
     * @var string
     */
    protected $listId;

    /**
     * @var int
     */
    protected $errorCode;

    /**
     * Init new optin result
     *
     * @param $data
     */
    public function __construct(array $data = [])
    {
        $this->success     = (bool) array_get($data, 'success', true);
        $this->error       = (bool) array_get($data, 'error',   false);
        $this->message     = array_get($data, 'message', false);
        $this->integration = array_get($data, 'integration');
        $this->optinData   = array_get($data, 'optinData');
        $this->listId      = array_get($data, 'listId', ($this->optinData ? $this->optinData->listId() : null));
    }

    /**
     * Check if optin was successful
     *
     * @return bool
     */
    public function isSuccessful()
    {
        return (bool) $this->success;
    }

    /**
     * Check if error occurred when opting in
     *
     * @return bool
     */
    public function isError()
    {
        return (bool) $this->error;
    }

    /**
     * The response message
     *
     * @return string
     */
    public function message()
    {
        return $this->message;
    }

    /**
     * The integration instance
     *
     * @return Integration
     */
    public function integration()
    {
        return $this->integration;
    }

    /**
     * Return optin data
     *
     * @return OptinData
     */
    public function optinData()
    {
        return $this->optinData;
    }

    /**
     * Optin list ID
     *
     * @return string
     */
    public function listId()
    {
        return $this->listId;
    }

    /**
     * The code in case of an error
     *
     * @return int
     */
    public function errorCode()
    {
        return $this->errorCode;
    }
}
