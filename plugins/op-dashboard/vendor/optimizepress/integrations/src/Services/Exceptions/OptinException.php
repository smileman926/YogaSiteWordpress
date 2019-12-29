<?php

namespace OptimizePress\Integrations\Services\Exceptions;

use Exception;
use OptimizePress\Integrations\Integration;
use OptimizePress\Integrations\OptinData;
use function OptimizePress\Support\array_get;

class OptinException extends Exception
{
    /**
     * @var string
     */
    protected $message = 'Optin failed';

    /**
     * @var int
     */
    protected $code = 500;

    /**
     * @var Integration
     */
    protected $integration;

    /**
     * @var OptinData
     */
    protected $optinData;

    /**
     * OptinException constructor.
     *
     * @param string  $message
     * @param  array  $data
     */
    public function __construct($message, $data = [])
    {
        $this->integration = array_get($data, 'integration');
        $this->optinData   = array_get($data, 'optinData');

        if ($message) {
            $this->message = $message;
        }

        parent::__construct($this->message, $this->code);
    }

    /**
     * Return optin integration
     *
     * @return Integration
     */
    public function getIntegration()
    {
        return $this->integration;
    }

    /**
     * Return optin data
     *
     * @return OptinData
     */
    public function getOptinData()
    {
        return $this->optinData;
    }

    /**
     * Return optin email address
     *
     * @return string
     */
    public function getOptinEmail()
    {
        return $this->optinData ? $this->optinData->email() : null;
    }

    /**
     * Return the ID of the list
     *
     * @return string
     */
    public function getOptinListId()
    {
        return $this->optinData ? $this->optinData->listId() : null;
    }
}
