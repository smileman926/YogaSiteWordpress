<?php

namespace OptimizePress\Integrations\Http\Controllers;

/**
 * Base controller
 */
abstract class Controller
{
    /**
     * Return logged in user
     *
     * @return mixed
     */
    protected function getUser()
    {
        return auth()->user();
    }

    /**
     * Return logged in user ID
     *
     * @return int
     */
    protected function getUserId()
    {
        $user = $this->getUser();

        return ($user and isset($user->id)) ? $user->id : null;
    }
}
