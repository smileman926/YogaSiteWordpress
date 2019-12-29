<?php

namespace OptimizePress\Integrations\Services\Contracts;

use OptimizePress\Integrations\Integration;
use OptimizePress\Support\Request;

interface IntegrationServiceOAuthInterface
{
    public function initAuthorization();
    public function getAuthorizationUrl();
    public function getAuthorizationTokenAndSecret(array $requestData);
    public function refreshToken($force);
    public function getToken();
    public function getRefreshToken();
    public function getTokenSecret();
}
