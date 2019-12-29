<?php

namespace OptimizePress\Integrations;

use OptimizePress\Support\Log\Log;
use function OptimizePress\Support\array_get;

/**
 * Base class for an integration
 */
trait IntegrationOauthTrait
{
    /**
     * Check if you can authorize the integrations
     * We need to check if all the required fields are entered and the integration exists in the storage
     *
     * @return bool
     */
    public function canAuthorize()
    {
        if ($this->connection) {
            if (isset($this->connection->client_id) and isset($this->connection->client_secret)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Return OAuth authorization URL
     *
     * @param  array $data
     * @return string
     */
    public function getAuthorizationUrl($data = [])
    {
        $url = null;

        if ($this->isOAuth()) {
            if ($this->authorizesThroughSL()) {
                $url = (getenv('OPTIMIZEPRESS_SL_URL') ?: 'https://hub.optimizepress.com/') . 'integrations/' . $this->provider . '/authorize';
            } elseif (isset($this->connection) and isset($this->connection->redirect_uri)) {
                $url = $this->service()->getAuthorizationUrl(array_merge($data, ['redirect_uri' => $this->connection->redirect_uri]));
            } else {
                $url = $this->service()->getAuthorizationUrl($data);
            }
        }

        return $url;
    }

    /**
     * Return OAuth callback URL
     *
     * @param  array $data
     * @return string
     */
    public function getCallbackUrl($data = [])
    {
        if ($this->connection && isset($this->connection->redirect_uri)) {
            return $this->connection->redirect_uri;
        }

        if ($this->connection && isset($this->connection->oauth_callback_url)) {
            return $this->connection->oauth_callback_url;
        }

        if ($this->type === 'oauth') {
            if (isset($data['callback_url'])) {
                $callbackUrl = $data['callback_url'];
            } elseif (isset($data['redirect_url'])) {
                $callbackUrl = $data['redirect_url'];
            }


            return isset($callbackUrl) ? $callbackUrl : null;
        }
    }

    /**
     * Return a list of fields required for connecting to the provider
     *
     * @return IntegrationConnectionFieldCollection
     */
    public function getConnectionFields()
    {
        $fields     = new IntegrationConnectionFieldCollection;
        $connection = $this->config->connection;

        // We can also fill the values from the storage model
        if (isset($connection['fields'])) {
            foreach ($connection['fields'] as $fieldId => $field) {
                $connectionField = new IntegrationConnectionField($field);
                $connectionField->id = $fieldId;

                if (isset($this->connection->$fieldId)) {
                    $connectionField->value = $this->connection->$fieldId;
                }

                $fields->push($connectionField);
            }
        }

        return $fields;
    }

    /**
     * Return client ID for OAuth integrations
     *
     * @return string
     */
    public function getOauthClientId()
    {
        return ($this->connection and isset($this->connection->client_id)) ? $this->connection->client_id : $this->service()->getEnvClientId();
    }

    /**
     * Return client secret for OAuth integrations
     *
     * @return string
     */
    public function getOauthClientSecret()
    {
        return ($this->connection and isset($this->connection->client_secret)) ? $this->connection->client_secret : $this->service()->getEnvClientSecret();
    }

    /**
     * Return OAuth token for API calls
     *
     * @return string
     */
    public function getOauthToken()
    {
        return ($this->connection and isset($this->connection->token)) ? $this->connection->token : null;
    }

    /**
     * Authorize the integration and get the token and token secret
     *
     * @param  array $requestData
     * @return mixed
     */
    public function authorizeOauthRequest($requestData, $store = true)
    {
        $sl = isset($requestData['sl']) ? (bool) $requestData['sl'] : false;

        if ($sl) {
            $data = $requestData;
        } else {
            $data = $this->service()->getAuthorizationTokenAndSecret($requestData);
        }

        if ($data and $token = array_get($data, 'token')) {
            // Setup expiration
            if ($expiresDate = array_get($data, 'token_expires_at') and is_a($expiresDate, 'DateTime')) {
                $expiresAt = $expiresDate->format('Y-m-d H:i:s');
            } else {
                $expiresAt = null;
            }

            $connectionFields = [
                'token'            => $token,
                'token_secret'     => array_get($data, 'token_secret'),
                'refresh_token'    => array_get($data, 'refresh_token'),
                'token_expires_at' => $expiresAt,
                'token_data'       => array_get($data, 'token_data'),
                'api_url'          => array_get($data, 'api_url'),
                'app_id'           => array_get($data, 'app_id'),
                'authorized'       => true,
            ];

            if ($store) {
                $this->storage()->updateConnectionFields($this->uid, $connectionFields);
            }

            // Ping the service and get API URL
            $ping   = $this->ping($store);
            $apiUrl = $this->service()->getApiUrl($this);

            if ($store) {
                $this->storage()->updateConnectionFields($this->uid, [
                    'ping'    => $ping,
                    'api_url' => $apiUrl,
                ]);
            }

            return $connectionFields;
        } else {
            Log::error('[OPTIMIZEPRESS INTEGRATIONS] Integration authorization failed.');
            echo 'Authorization failed.';
            die();
        }

        return false;
    }

    /**
     * Refresh the access token
     *
     * @param  bool $force
     * @return string
     */
    public function refreshToken($force = false)
    {
        return $this->service()->refreshToken($force);
    }
}
