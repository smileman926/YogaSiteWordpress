<?php

namespace OptimizePress\Integrations\Services;

use OptimizePress\Integrations\Collections\IntegrationsCollection;
use OptimizePress\Integrations\Services\Contracts\BaseProvider;
use OptimizePress\Support\Collection;
use OptimizePress\Integrations\Integration;

/**
 * Handle all integrations provider configs
 */
class ProviderRepository
{
    /**
     * Provider config
     * @var array
     */
    protected $config;

    /**
     * Init the repository with the config
     *
     * @param string $configPath
     */
    public function __construct($configPath = null)
    {
        if ( ! $configPath) {
            $this->config = include(__DIR__ . '/../../config/providers.php');
        } else {
            $this->config = include($configPath);
        }
    }

    /**
     * Find provider configuration by key
     *
     * @param  string $key
     * @return BaseProvider
     */
    public function find($key)
    {
        if (isset($this->config[$key])) {
            $providerClass = $this->config[$key]['provider'];

            return new $providerClass($this->config[$key]);
        }

        return null;
    }

    /**
     * Return all available integration providers
     *
     * @return Collection
     */
    public function getAvailable()
    {
        $providers = new IntegrationsCollection;

        foreach ($this->config as $key => $provider)
        {
            if ($key !== 'optimizepress') {
                $integration = new Integration($provider['key']);

                $providers[$key] = $integration;
            }
        }

        return $providers;
    }
}
