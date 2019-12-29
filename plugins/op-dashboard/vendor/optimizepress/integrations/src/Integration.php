<?php

namespace OptimizePress\Integrations;

use OptimizePress\Integrations\Services\Contracts\BaseProvider;
use OptimizePress\Integrations\Services\Contracts\IntegrationHasTagsInterface;
use OptimizePress\Integrations\Services\Contracts\IntegrationServiceInterface;
use OptimizePress\Integrations\Services\Contracts\IntegrationServiceOauthInterface;
use OptimizePress\Integrations\Storage\IntegrationEloquentModel;
use OptimizePress\Integrations\Storage\IntegrationRepositoryInterface;
use OptimizePress\Integrations\Storage\IntegrationStorage;
use OptimizePress\Integrations\Collections\IntegrationListsCollection;
use OptimizePress\Integrations\Storage\IntegrationWpModel;
use OptimizePress\Integrations\Storage\IntegrationWpRepository;
use function OptimizePress\Support\array_get;
use OptimizePress\Support\Collection;

/**
 * Base class for an integration
 */
class Integration
{
    use IntegrationOauthTrait;

    /**
     * @var string
     */
    protected $uid;

    /**
     * @var string
     */
    public $provider;

    /**
     * @var string
     */
    public $type;

    /**
     * @var array
     */
    protected $config;

    /**
     * The integration service
     *
     * @var mixed
     */
    protected $service;

    /**
     * The integration connection data
     *
     * @var object
     */
    protected $connection;

    /**
     * @var array
     */
    protected $data = [];

    /**
     * @var bool
     */
    protected $slAuth = false;

    /**
     * @var string
     */
    protected $connectURL;

    /**
     * @var string
     */
    protected $icon;

    /**
     * @var mixed
     */
    protected $model = null;

    /**
     * Initialize new integration provider
     *
     * @param string $provider
     * @param array  $data
     */
    public function __construct($provider, $data = [])
    {
        $this->provider = \OptimizePress\Integrations\get_provider($provider);
        $this->config   = $this->getConfig($provider);

        $this->setup($data);
    }

    /**
     * Get configuration for a provider
     *
     * @param  string $provider
     * @return mixed
     */
    public function getConfig($provider = null)
    {
        $config = include(__DIR__.'/../config/providers.php');

        if (isset($config[$provider])) {
            $this->config = new IntegrationConfig($config[$provider]);

            return $this->config;
        }

        return null;
    }

    /**
     * Return config value for integration
     *
     * @param  string $key
     * @return mixed
     */
    public function config($key = null, $default = null)
    {
        return array_get($this->config, $key, $default);
    }

    /**
     * Return integration provider
     *
     * @return BaseProvider
     */
    public function provider()
    {
        return $this->provider;
    }

    /**
     * Return integration provider ID/key
     *
     * @return BaseProvider
     */
    public function providerId()
    {
        return $this->provider ? $this->provider->key : null;
    }

    /**
     * Setup integration data
     *
     * @param  mixed  $data
     * @return Integration
     */
    public function setup($data = [])
    {
        // Add model if exists
        if (is_a($data, IntegrationEloquentModel::class) or is_a($data, IntegrationWpModel::class)) {
            $this->model = $data;
            $data = $data->toArray();
        }

        // Get service connection data
        $connectionData = isset($data['connection_data']) ? $data['connection_data'] : null;
        if (is_string($connectionData)) {
            $connectionData = @json_decode($connectionData);
        } elseif (is_array($connectionData)) {
            $connectionData = (object) $connectionData;
        } elseif (is_object($connectionData)) {
            $connectionData = (object) $connectionData;
        } else {
            $connectionData = (object) [];
        }

        // Setup the data array
        $this->uid        = isset($data['uid']) ? $data['uid'] : null;
        $this->type       = $this->config->type;
        $this->connection = $connectionData;
        $this->slAuth     = ($this->model && $this->model->sl_auth) ? $this->model->sl_auth : false;
        $this->icon       = '/assets/img/integration-'.$this->config->key.'.png';
        $this->data = [
            'uid'            => $this->uid,
            'title'          => ($this->model && $this->model->title) ? $this->model->title : $this->config->title,
            'provider_title' => $this->config->title,
            'provider_id'    => $this->config->key,
            'provider'       => &$this->provider,
            'type'           => $this->config->type,
            'authorized'     => (bool) (isset($data['authorized']) ? $data['authorized'] : false),
        ];

        return $this;
    }

    /**
     * Return an instance of the integration provider
     *
     * @return IntegrationServiceOauthInterface|IntegrationServiceInterface
     */
    public function service()
    {
        if (! $this->service) {
            $serviceClass = $this->config->service;

            if ($serviceClass) {
                $this->service = new $serviceClass($this);
            }
        }

        return $this->service;
    }

    /**
     * Check if the integration has a storage model
     *
     * @return bool
     */
    public function hasModel()
    {
        return $this->model;
    }

    /**
     * Check if the connection to the provider is authorized and connected
     *
     * @return bool
     */
    public function isConnected()
    {
        if (($this->isEmail() || $this->isWebhook()) or ($this->connection and $this->authorized)) {
            return true;
        }

        return false;
    }

    /**
     * Is this an OAuth integration
     *
     * @return bool
     */
    public function isOAuth()
    {
        return $this->type == 'oauth';
    }

    /**
     * Is this an E-Mail integration
     *
     * @return bool
     */
    public function isEmail()
    {
        return $this->type === 'email';
    }

    /**
     * Is this a Webhook integration
     *
     * @return bool
     */
    public function isWebhook()
    {
        return $this->type === 'webhook';
    }

    /**
     * Does the integration have lists
     *
     * @return bool
     */
    public function hasLists()
    {
        if ($this->type === 'webhook') {
            return false;
        }

        return true;
    }

    /**
     * Does the integration have tags
     *
     * @return bool
     */
    public function hasTags()
    {
        if ($service = $this->service()) {
            $implements = class_implements($service);

            return isset($implements[IntegrationHasTagsInterface::class]);
        }

        return false;
    }

    /**
     * Does the integration have tags
     *
     * @return bool
     */
    public function hasGoals()
    {
        return $this->config->has_goals ? $this->config->has_goals : false;
    }

    /**
     * Ping the integration service and see if the connection is ok
     *
     * @param  bool  $store
     * @return bool
     */
    public function ping($store = true)
    {
        $ping = $this->service()->ping();

        if ($store) {
            $this->storage()->update($this->uid, ['ping'       => (bool) $ping]);
            $this->storage()->update($this->uid, ['authorized' => (bool) $ping]);
        }

        return $ping;
    }

    /**
     * Return URL from provider where you can get the API credentials, create OAuth apps etc.
     *
     * @return string
     */
    public function serviceUrl()
    {
        return $this->config->service_url ? $this->config->service_url : null;
    }

    /**
     * Return the current storage repository
     *
     * @return IntegrationRepositoryInterface
     */
    public function storage()
    {
        // Check for Laravel
        if (function_exists('config')) {
            $config = (array) config('optimizepress-integrations');
        // Check for WordPress
        } elseif (class_exists(\WP_Query::class)) {
            $config = ['storage' => ['repository' => IntegrationWpRepository::class]];
        // Default
        } else {
            $config = null;
        }

        return IntegrationStorage::get($config);
    }

    /**
     * Get integration optin lists
     *
     * @return IntegrationListsCollection
     */
    public function getLists()
    {
        $lists = $this->service()->getLists();

        // @TODO: OPL Check to refactor this
        // $forms    = method_exists($this->service(), "getForms")    ? $this->service()->getForms($this)    : new Collection;
        // $accounts = method_exists($this->service(), "getAccounts") ? $this->service()->getAccounts($this) : new Collection;

        return $lists;
    }

    /**
     * Get integration list
     *
     * @param  mixed $listId
     * @return Collection
     */
    public function getList($listId)
    {
        $list = $this->service()->getList($listId);

        return $list;
    }

    /**
     * Get integration list fields
     *
     * @param  mixed $listId
     * @return Collection
     */
    public function getFields($listId = null)
    {
        return $this->service()->getFields($listId);
    }

    /**
     * Get integration list tags
     *
     * @param  mixed $listId
     * @return Collection
     */
    public function getTags($listId = null)
    {
        return $this->service()->getTags($listId);
    }

    /**
     * Get integration goals
     *
     * @return Collection
     */
    public function getGoals()
    {
        return $this->service()->getGoals();
    }

    /**
     * Optin to a list
     *
     * @param  mixed $data
     * @param  mixed $leadOptions
     * @return mixed
     */
    public function optin($data, $leadOptions = null)
    {
        // Set lead options first
        if (! $leadOptions) {
            $leadOptions = new LeadOptions;
        } elseif (is_array($leadOptions)) {
            $leadOptions = new LeadOptions($leadOptions);
        }

        // Build up optin data
        if (is_a($data, OptinData::class)) {
            $optinData = $data;
        } else {
            $optinData = new OptinData($data);
        }

        return $this->service()->optin($optinData, $leadOptions);
    }

    /**
     * Disconnect integration connection
     *
     * @return bool
     */
    public function disconnect()
    {
        $this->storage()->disconnect($this->uid);

        return true;
    }

    /**
     * Authorize the API key for non OAuth integrations
     *
     * @param  mixed $requestData
     * @return bool
     */
    public function authorize($requestData = null)
    {
        if ($this->isOauth()) {
            return $this->authorizeOauthRequest($requestData);
        } else {
            // Try to ping the service and set to authorize if it passes
            $ping = $this->service()->ping();

            if ($ping) {
                // Ping the service and get API URL
                $this->storage()->updateConnectionFields($this->uid, [
                    'ping'    => $ping,
                ]);
                $this->storage()->update($this->uid, ['ping' => 1, 'authorized' => 1]);

                return true;
            } else {
                $this->storage()->updateConnectionFields($this->uid, ['ping' => 0]);
                $this->storage()->update($this->uid, ['ping' => 0, 'authorized' => 0]);
            }
        }

        return false;
    }

    /**
     * Return connection value for integration
     *
     * @param  string $key
     * @return string
     */
    public function getConnectionValue($key)
    {
        return isset($this->connection->{$key}) ? $this->connection->{$key} : false;
    }

    /**
     * Set connection value for integration
     *
     * @param  string $key
     * @return string
     */
    public function setConnectionValue($key, $value)
    {
        return $this->connection->{$key} = $value;
    }

    /**
     * Change SL authentication mode
     *
     * @param  bool $auth
     * @return void
     */
    public function setSLAuth($auth)
    {
        $this->slAuth = (bool) $auth;
    }

    /**
     * Does the integration authorize through the OPSL
     *
     * @return bool
     */
    public function authorizesThroughSL()
    {
        return (bool) $this->slAuth;
    }

    /**
     * Check if integration is the OPSL integrations
     *
     * @return bool
     */
    public function isSL()
    {
        return $this->provider->key == 'optimizepress';
    }

    /**
     * Check if this integrations also need a working connection to the SL
     *
     * @return bool
     */
    public function needsSLConnection()
    {
        return $this->config->sl_required;
    }

    /**
     * Check if this integrations also need a working connection to the SL
     *
     * @return bool
     */
    public function isConnectedToSL()
    {
        return $this->needsSLConnection() && $this->isConnected();
    }

    /**
     * Check if integration has any details to display
     *
     * @return bool
     */
    public function hasDetails()
    {
        return false;
    }

    /**
     * Set the URL for OAuth connection
     *
     * @param $url
     */
    public function setConnectURL($url)
    {
        $this->connectURL = $url;
    }

    /**
     * Set the icon image for the integration
     *
     * @param $url
     */
    public function setIconUrl($url)
    {
        $this->icon = $url;
    }

    /**
     * Return the integration as an array
     *
     * @return array
     */
    public function toArray()
    {
        return [
            'uid'         => $this->uid,
            'title'       => $this->model ? $this->model->title : $this->config->title,
            'provider'    => $this->provider->key,
            'type'        => $this->type,
            'config'      => $this->config->toArray(),
            'connection'  => (array) $this->connection,
            'model'       => $this->model ? $this->model->toArray() : null,
            'authorized'  => (bool) $this->data['authorized'],
            'sl_auth'     => (bool) $this->slAuth,
            'connect_url' => $this->connectURL,
            'icon'        => $this->icon,
            'lists'       => isset($this->lists) ? $this->lists : new Collection,
            'tags'        => isset($this->tags) ? $this->tags : null,
        ];
    }

    /**
     * Return the integration as a JSON string
     *
     * @return array
     */
    public function toJson()
    {
        return @json_encode($this->toArray());
    }

    /**
     * Return a value
     *
     * @param  string $key
     * @return mixed
     */
    public function __get($key)
    {
        return (isset($this->$key) ? $this->$key : (isset($this->data[$key]) ? $this->data[$key] : null));
    }
}
