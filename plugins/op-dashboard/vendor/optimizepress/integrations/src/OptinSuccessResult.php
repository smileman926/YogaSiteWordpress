<?php

namespace OptimizePress\Integrations;

class OptinSuccessResult extends OptinResult
{
    /**
     * New error optin result
     *
     * @param  array  $data
     */
    public function __construct(array $data = [])
    {
        // Set some variables
        $data['success'] = true;
        $data['error']   = false;

        // And pass to parent
        parent::__construct($data);
    }
}
