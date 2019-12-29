<?php

namespace OptimizePress\Integrations\Storage;

use Illuminate\Database\Eloquent\Model;
use OptimizePress\Integrations\Integration;
use OptimizePress\Integrations\Services\UidGenerator;
use OptimizePress\Support\Collection;

/**
 * Storage repository for integration using a Laravel Eloquent model
 */
class IntegrationEloquentRepository implements IntegrationRepositoryInterface
{
    /**
     * The repository model
     *
     * @var \Illuminate\Database\Eloquent\Model
     */
    protected $model;

    /**
     * Init repository
     *
     * @param string $model
     */
    public function __construct($model = '')
    {
        if ($model) {
            $this->model = app($model);
        } else {
            $this->model = app(IntegrationEloquentModel::class);
        }
    }

    /**
     * Find integration by ID
     *
     * @param  string $id
     * @param  mixed  $userId
     * @return mixed
     */
    public function find($id, $userId = null)
    {
        $query = $this->model->where('id', $id);

        // By user ID
        if ($userId) {
            $query->where('user_id', $userId);
        }

        // Fetch
        $entry = $query->first();

        return $entry ? new Integration($entry->provider, $entry) : null;
    }

    /**
     * Find integration by UID
     *
     * @param  string $uid
     * @param  mixed  $userId
     * @return mixed
     */
    public function findByUid($uid, $userId = null)
    {
        $query = $this->model->where('uid', $uid);

        // By user ID
        if ($userId) {
            $query->where('user_id', $userId);
        }

        // Fetch
        $entry = $query->first();

        return $entry ? new Integration($entry->provider, $entry) : null;
    }

    /**
     * Find integration by provider name
     *
     * @param  string $provider
     * @param  mixed  $userId
     * @return mixed
     */
    public function findByProvider($provider, $userId = null)
    {
        $entry = $this->model->where('provider', $provider)->first();

        return $entry ? new Integration($entry->provider, $entry) : null;
    }

    /**
     * Find integration by provider name or create a new one
     *
     * @param  string $provider
     * @param  mixed  $userId
     * @return mixed
     */
    public function findByProviderOrCreate($provider, $userId = null)
    {
        $entry = $this->findByProvider($provider);

        if ( ! $entry) {
            $entry = $this->create([
                'provider' => $provider,
                'user_id'  => $userId,
            ]);
        }

        return $entry ? new Integration($provider, $entry->model) : null;
    }

    /**
     * Return all integrations
     *
     * @return Collection
     */
    public function all()
    {
        return new Collection;
    }

    /**
     * Return all integrations owned by a user
     *
     * @param  int $userId
     * @return Collection
     */
    public function allForUser($userId)
    {
        $entries = $this->model->where('user_id', $userId)->orderBy('provider')->get();

        return $this->formatIntegrationCollection($entries);
    }

    /**
     * Create a new integration in the database
     *
     * @param array $data
     * @return Integration
     */
    public function create(array $data)
    {
        $entry = $this->model->create($data);

        // Generate an unique ID
        $entry = $this->generateUid($entry);

        return $entry ? new Integration($entry->provider, $entry) : null;
    }

    /**
     * Update existing integration
     *
     * @param  string $uid
     * @param  array $data
     * @return mixed
     */
    public function update($uid, array $data)
    {
        $integrationModel = $this->model->where('uid', $uid)->first();

        // Update data
        $integrationModel->update($data);

        // Also update connection field if needed
        $integration = $this->updateConnectionFields($uid, $data);

        return $integration;
    }

    /**
     * Delete existing integration
     *
     * @param  string $uid
     * @param  mixed  $userId
     * @return bool
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
     * @param  mixed  $userId
     * @return bool
     */
    public function disconnect($uid, $userId = null)
    {
        $integration = $this->findByUid($uid, $userId);

        if ($integration) {
            $connectionData = $integration->model->connection_data;

            // Keep client ID and secret only
            $connectionData = [
                'client_id'     => isset($connectionData->client_id) ? $connectionData->client_id : null,
                'client_secret' => isset($connectionData->client_secret) ? $connectionData->client_secret : null,
            ];

            // Update the model
            $integration->model->update([
                'connection_data' => $connectionData,
                'ping' => false,
                'authorized' => false,
            ]);

            return true;
        }
    }

    /**
     * Delete a integration from the storage
     *
     * @param  mixed $uid
     * @return bool
     */
    public function destroy($uid)
    {
        $integrationModel = $this->model->where('uid', $uid)->first();

        return $integrationModel->delete();
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
        $integration      = $this->findByUid($uid);
        $integrationModel = $this->model->where('uid', $uid)->first();

        // Get existing connection data
        $connectionData = $integrationModel->connection_data ?: (object) [];

        // Add or update new connection data
        foreach ($data as $key => $value) {
            $connectionData->{$key} = $value;
        }

        // Also update in storage
        $integrationModel->connection_data = $connectionData;
        $integrationModel->save();

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
     * @param  IntegrationEloquentModel $entry
     * @return IntegrationEloquentModel
     */
    public function generateUid($entry)
    {
        // Generate the UID if missing and save to the storage model
        if ( ! $entry->uid) {
            $generator = new UidGenerator();
            $uid       = $generator->encode($entry->id);

            if ($uid) {
                $entry->uid = $uid;
                $entry->save();
            }
        }

        return $entry;
    }
}
