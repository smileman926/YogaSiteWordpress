<?php

namespace OptimizePress\Integrations\Services\Exceptions;

class AlreadySubscribedException extends OptinException
{
    /**
     * @var string
     */
    protected $message = 'User already subscribed';

    /**
     * @var int
     */
    protected $code = 409;
}
