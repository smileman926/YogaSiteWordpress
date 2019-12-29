<?php

namespace OptimizePress\Integrations\Services\Contracts;

use OptimizePress\Integrations\Collections\IntegrationFieldsCollection;
use OptimizePress\Integrations\Collections\IntegrationListsCollection;
use OptimizePress\Integrations\IntegrationList;
use OptimizePress\Integrations\LeadOptions;
use OptimizePress\Integrations\OptinData;
use OptimizePress\Integrations\OptinResult;

interface IntegrationServiceInterface
{
    /**
     * Ping service to see of service is ready and connected
     *
     * @return bool
     */
    public function ping();

    /**
     * Check if client is ready
     *
     * @return bool
     */
    public function isReady();

    /**
     * Optin to integration service
     *
     * @param  OptinData    $optinData
     * @param  LeadOptions  $leadOptions
     * @return OptinResult
     */
    public function optin(OptinData $optinData, LeadOptions $leadOptions = null);

    /**
     * Get form fields
     *
     * @param  mixed $listId
     * @return IntegrationFieldsCollection
     */
    public function getFields($listId = null);

    /**
     * Return all lists
     *
     * @return IntegrationListsCollection
     */
    public function getLists();

    /**
     * Return a list
     *
     * @param  mixed $listId
     * @return IntegrationList
     */
    public function getList($listId);

    /**
     * Map list data keys to
     *
     * @param  array  $data
     * @return IntegrationList
     */
    public function listObject(array $data);

    /**
     * Get URL to API
     *
     * @return string
     */
    public function getApiUrl();

    /**
     * Return provider
     *
     * @return BaseProvider
     */
    public function getProvider();
}
