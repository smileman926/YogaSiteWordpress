<?php

namespace OptimizePress\Integrations\Storage;

use Illuminate\Support\Collection;
use OptimizePress\Integrations\Integration;
use OptimizePress\Integrations\Services\UidGenerator;
use OptimizePress\Integrations\Storage\IntegrationRepositoryInterface;

class IntegrationWpRepository implements IntegrationRepositoryInterface
{
    /**
     * Find integration by UID
     *
     * @param string $uid
     * @param mixed $userId
     * @return mixed
     */
    public function findByUid($uid, $userId = null)
    {
        $entry = IntegrationWpModel::findByUid($uid);

        return $entry ? new Integration($entry->provider, $entry) : null;
    }

    /**
     * Find integration by provider name
     *
     * @param  string $provider
     * @param  mixed $userId
     * @return mixed
     */
    public function findByProvider($provider, $userId = null)
    {
        $entry = IntegrationWpModel::findByProvider($provider);

        return $entry ? new Integration($entry->provider, $entry->toArray()) : null;
    }

    /**
     * Find integration by provider name or create a new one
     *
     * @param  string $provider
     * @param  mixed $userId
     * @return mixed
     */
    public function findByProviderOrCreate($provider, $userId = null)
    {
        $entry = $this->findByProvider($provider);

        if ( ! $entry) {
            $entry = $this->create([
                'provider' => $provider,
            ]);

            if ($entry) {
                $entry = $this->generateUid($entry);

                $entry = new Integration($provider, $entry->model);
            }
        }

        return $entry ?: null;
    }

    /**
     * Return all integrations
     *
     * @return object
     */
    public function all()
    {
        return IntegrationWpModel::all();
    }

    /**
     * Return all integrations owned by a user
     *
     * @param  int $userId
     * @return array|null|object
     */
    public function allForUser($userId)
    {
        $entries = IntegrationWpModel::all();

        return $this->formatIntegrationCollection($entries);
    }

    /**
     * Create a new integration in the database
     *
     * @param array $data
     * @return mixed
     */
    public function create(array $data)
    {
        $entry = IntegrationWpModel::create($data);

        // Generate an unique ID
        $entry = $this->generateUid($entry);

        return $entry ? new Integration($entry->provider, $entry) : null;
    }

    /**
     * Update existing integration
     *
     * @param string $uid
     * @param array $data
     * @return bool
     */
    public function update($uid, array $data)
    {
        $integrationModel = IntegrationWpModel::findByUid($uid);

        if ($integrationModel) {
            // Update data
            $integrationModel->update($data);

            // Also update connection field if needed
            $integration = $this->updateConnectionFields($uid, $data);

            return $integration;
        }
    }

    /**
     * Delete existing integration
     *
     * @param  string $uid
     * @param  mixed $userId
     * @return mixed
     */
    public function delete($uid, $userId = null)
    {
        $integration = $this->findByUid($uid, $userId);

        if ($integration) {
            return $integration->delete();
        }
    }

    /**
     * Disconnect existing integration
     *
     * @param  string $uid
     * @param  mixed $userId
     * @return bool
     */
    public function disconnect($uid, $userId = null)
    {
        $integration = $this->findByUid($uid, $userId);

        if ($integration) {
            $connectionData = @json_decode($integration->model->connection_data);

            // Keep client ID and secret only
            $connectionData = [
                'client_id' => isset($connectionData->client_id) ? $connectionData->client_id : null,
                'client_secret' => isset($connectionData->client_secret) ? $connectionData->client_secret : null,
            ];

            // Update the model
            $integration->model->update([
                'connection_data' => @json_encode($connectionData),
                'ping' => false,
                'authorized' => false,
            ]);

            return true;
        }

        return false;
    }

    /**
     * Delete a integration from the storage
     *
     * @param  mixed $uid
     * @return bool
     */
    public function destroy($uid)
    {
        $integrationModel = IntegrationWpModel::findByUid($uid);

        return $integrationModel->delete();
    }

    /**
     * Set a user ID for all integrations
     *
     * @param int $id
     */
    public function setUserId($id)
    {
        $this->userId = $id;
    }

    /**
     * Update connection field for the storage model
     *
     * @param  string  $uid
     * @param  array   $data
     * @return bool
     */
    public function updateConnectionFields($uid, $data = [])
    {
        $integrationModel = IntegrationWpModel::findByUid($uid);

        // Get existing connection data
        $connectionData = @json_decode($integrationModel->connection_data) ?: new \stdClass;

        // Add or update new connection data
        foreach ($data as $key => $value) {
            $connectionData->{$key} = $value;
        }

        // Also update in storage
        $integrationModel->update(['connection_data' => @json_encode($connectionData)]);

        // Re-fetch integration
        $integration = $this->findByUid($uid);

        return $integration;
    }

    /**
     * Create Integration instance from eloquent model
     *
     * @param  Model $entry
     * @return Integration
     */
    public function formatIntegration($entry)
    {
        return new Integration($entry->provider, $entry);
    }

    /**
     * Create Integration instances from eloquent collection
     *
     * @param  Collection $entries
     * @return Collection
     */
    public function formatIntegrationCollection($entries)
    {
        $integrations = new Collection;

        foreach ($entries as $entry) {
            $integrations->push($this->formatIntegration($entry));
        }

        return $integrations;
    }

    /**
     * Generate UID for the model
     *
     * @param  object $entry
     * @return object
     */
    public function generateUid($entry)
    {
        if ( ! $entry->uid) {
            if ($uid = uniqid()) {
                $entry = $entry->update(['uid' => $uid]);
            }
        }

        return $entry;
    }
}
