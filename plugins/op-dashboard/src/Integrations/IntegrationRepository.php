<?php

namespace OPDashboard\Integrations;

use DB;
use OptimizePress\Integrations\Integration;
use OptimizePress\Integrations\Collections\IntegrationsCollection;
use OptimizePress\Integrations\Storage\IntegrationWpModel;
use OptimizePress\Integrations\Storage\IntegrationWpRepository;
use function OptimizePress\Integrations\get_available_providers;
use function OptimizePress\Support\array_get;

class IntegrationRepository extends IntegrationWpRepository
{
    /**
     * @var mixed
     */
    protected $config;

    /**
     * Init repo
     */
    public function __construct()
    {
        $this->config = include __DIR__ . '/../../config/integrations.php';
    }

    /**
     * Return all integrations
     *
     * @return IntegrationsCollection
     */
    public function findAll()
    {
        $integrations = new IntegrationsCollection;
        $entries      = IntegrationWpModel::all();

        // Add to list
        foreach ($entries as $entry) {
            $integrations->push(new Integration($entry->provider, $entry));
        }

        // Sort 'em by the title
        $integrations = $integrations->sortBy(function($integration) {
            return $integration->title;
        });

        return $integrations;
    }

    /**
     * Return connected integrations
     *
     * @return IntegrationsCollection
     */
    public function findConnected()
    {
        $integrations = new IntegrationsCollection;
        $entries      = IntegrationWpModel::all();

        // Add to list
        foreach ($entries as $entry) {
            if ($entry->authorized) {
                $integrations->push(new Integration($entry->provider, $entry));
            }
        }

        // Also add webhook integrations
        $webhookIntegrations = $this->getWebhookIntegrations();
        $integrations = $integrations->merge($webhookIntegrations);

        // Sort 'em by the title
        $integrations = $integrations->sortBy(function($integration) {
            return $integration->title;
        });

        // Reset the keys
        $integrations = $integrations->values();

        return $integrations;
    }

    /**
     * Return a collection of webhook integrations that appear as connected
     *
     * @return IntegrationsCollection
     */
    public function getWebhookIntegrations()
    {
        $integrations = new IntegrationsCollection;
        $providers    = get_available_providers();

        foreach ($providers as $provider) {
            if ($provider->type === 'webhook') {
                $entry = new IntegrationWpModel([
                    'id'              => null,
                    'uid'             => null,
                    'user_id'         => null,
                    'type'            => 'webhook',
                    'sl_auth'         => false,
                    'provider'        => $provider->provider->key,
                    'title'           => null,
                    'connection_data' => null,
                    'authorized'      => true,
                    'ping'            => true,
                ]);
                $integrations->push(new Integration($entry->provider, $entry));
            }
        }

        return $integrations;
    }

    /**
     * Return all available providers with their connections
     *
     * @return IntegrationsCollection
     */
    public function getAvailableProviders()
    {
        $providers               = new IntegrationsCollection;
        $allProviders            = get_available_providers();
        $enabledProviders        = (array) array_get($this->config, 'available');
        $directOAuthIntegrations = (array) array_get($this->config, 'direct_oauth');

        // Now find integrations in the database
        $integrations = $this->findAll();

        // Build up collection of all providers with the connections
        foreach ($allProviders as $providerKey => $provider) {
            // Check if integration is enabled
            if (in_array($providerKey, $enabledProviders)) {
                $integrationsByProvider = $integrations->filter(function ($value) use ($providerKey) {
                    return ($value and isset($value->provider) and $value->provider->key == $providerKey);
                });

                // If we find integrations, simply pick first one
                if ($integrationsByProvider->count()) {
                    $providers->push($integrationsByProvider->first());
                } else {
                    $providers->push(new Integration($providerKey), ['slAuth' => 123]);
                }
            }
        }

        // Change up some things
        foreach ($providers as $integration) {
            // Change label for Email provider
            if ($integration->provider->key === 'email') {
                $integration->title = '(Default) Email';
            }

            // Set some SL OAuth things
            if (method_exists($integration, 'setSLAuth') && in_array($integration->provider->key, $directOAuthIntegrations, true)) {
                $integration->setSLAuth(false);
            } elseif ($integration->type === 'oauth') {
                $integration->setSLAuth(true);
            } else {
                $integration->setSLAuth(false);
            }
        }

        return $providers;
    }

    /**
     * Fetch all connected integrations
     *
     * @param bool $addEmail if true, Email integration is added to list of connected ones
     * @return IntegrationsCollection
     */
    public function getConnectedIntegrations($addEmail = false)
    {
        $integrations            = $this->findConnected();
        $directOAuthIntegrations = (array) array_get($this->config, 'direct_oauth');

        // See if we need to add empty email integration
        if ($addEmail) {
            $integrations->push(new Integration('email', []));
        }

        // Sort 'em by the title
        $integrations = $integrations->sortBy(function ($integration) {
            return $integration->title;
        });

        foreach ($integrations as $integration) {
            // Set some SL OAuth things
            if (method_exists($integration, 'setSLAuth') && in_array($integration->provider->key, $directOAuthIntegrations, true)) {
                $integration->setSLAuth(false);
            } elseif ($integration->type === 'oauth') {
                $integration->setSLAuth(true);
            } else {
                $integration->setSLAuth(false);
            }
        }

        // Reset the keys
        $integrations = $integrations->values();

        return $integrations;
    }

    /**
     * Create integrations table
     *
     * @param  int  $siteId
     * @return void
     */
    public function createIntegrationsTable($siteId = null)
    {
        global $wpdb;

        $tablePrefix    = $wpdb->get_blog_prefix();
        $tableName      = $tablePrefix . OPD_INTEGRATIONS_TABLE_NAME;
        $dbOptionKey    = $siteId ? 'opd_' . $siteId . '_db_version' : 'opd_db_version';
        $dbVersion      = get_option($dbOptionKey);
        $charsetCollate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE $tableName (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            uid varchar(255),
            user_id mediumint(9),
            type varchar(255) DEFAULT 'default',
            sl_auth tinyint(1) DEFAULT 1,
            provider varchar(255),
            title varchar(255),
            connection_data text,
            authorized tinyint(1) DEFAULT 0,
            ping tinyint(1) DEFAULT 0,
            created_at datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
            updated_at timestamp NOT NULL,
            PRIMARY KEY  (id),
            KEY uid (uid),
            KEY user_id (user_id),
            KEY type (type),
            KEY provider (provider),
            KEY sl_auth (sl_auth)
        ) $charsetCollate;";

        // only if db version has changed or plugin is activated for the first time
        if ($dbVersion != OPD_DB_VERSION) {
            require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
            dbDelta($sql);
            add_option($dbOptionKey, OPD_DB_VERSION);
        }
    }

    /**
     * Create integrations table if it doesnt exist
     *
     * @param  string $tableName
     * @return void
     */
    public function createIntegrationsTableIfNotExist($tableName = null)
    {
        // Check if table exists
        $this->createIntegrationsTable($tableName);
    }
}
