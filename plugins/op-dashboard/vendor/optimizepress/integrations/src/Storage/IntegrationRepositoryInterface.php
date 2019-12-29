<?php

namespace OptimizePress\Integrations\Storage;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use OptimizePress\Integrations\Integration;

/**
 * Contract for repository interface
 */
interface IntegrationRepositoryInterface
{
    /**
     * Find integration by UID
     *
     * @param string $uid
     * @param mixed  $userId
     * @return mixed
     */
    public function findByUid($uid, $userId = null);

    /**
     * Find integration by provider name
     *
     * @param  string $provider
     * @param  mixed  $userId
     * @return mixed
     */
    public function findByProvider($provider, $userId = null);

    /**
     * Find integration by provider name or create a new one
     *
     * @param  string $provider
     * @param  mixed  $userId
     * @return mixed
     */
    public function findByProviderOrCreate($provider, $userId = null);

    /**
     * Return all integrations
     *
     * @return Collection
     */
    public function all();

    /**
     * Return all integrations owned by a user
     *
     * @param  int $userId
     * @return Collection
     */
    public function allForUser($userId);

    /**
     * Create a new integration in the database
     *
     * @param array $data
     * @return Integration
     */
    public function create(array $data);

    /**
     * Update existing integration
     *
     * @param string $uid
     * @param array  $data
     */
    public function update($uid, array $data);

    /**
     * Delete existing integration
     *
     * @param  string $uid
     * @param  mixed  $userId
     * @return bool
     */
    public function delete($uid, $userId = null);

    /**
     * Disconnect existing integration
     *
     * @param  string $uid
     * @param  mixed  $userId
     * @return bool
     */
    public function disconnect($uid, $userId = null);

    /**
     * Update connection field for the storage model
     *
     * @param  string  $uid
     * @param  array   $data
     * @return bool
     */
    public function updateConnectionFields($uid, $data = []);

    /**
     * Create Integration instance from eloquent model
     *
     * @param  Model $entry
     * @return Integration
     */
    public function formatIntegration($entry);

    /**
     * Create Integration instances from eloquent collection
     *
     * @param  Collection $entries
     * @return Collection
     */
    public function formatIntegrationCollection($entries);

    /**
     * Generate UID for the model
     *
     * @param  IntegrationEloquentModel $entry
     * @return IntegrationEloquentModel
     */
    public function generateUid($entry);
}
