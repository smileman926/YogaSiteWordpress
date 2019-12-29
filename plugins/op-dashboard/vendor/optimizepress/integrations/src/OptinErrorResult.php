<?php

namespace OptimizePress\Integrations;

use function OptimizePress\Support\array_get;

class OptinErrorResult extends OptinResult
{
    /**
     * New error optin result
     *
     * @param  array  $data
     */
    public function __construct(array $data = [])
    {
        // Set some variables
        $data['success'] = false;
        $data['error']   = true;
        $this->errorCode = array_get($data, 'errorCode', 500);

        // And pass to parent
        parent::__construct($data);
    }
}
