<?php

namespace OPBuilder\Providers;

use OPBuilder\Hooks\BodyHook;

class HookProvider
{
    /**
     * Register all hooks here
     *
     * @return void
     */
    public function register()
    {
        // Hook should be added immediately after opening "body" tag via op_body()
        add_action('op_body', [new BodyHook, 'run'], 10, 2);
    }
}
