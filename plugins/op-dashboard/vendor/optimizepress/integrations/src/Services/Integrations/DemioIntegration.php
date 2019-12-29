<?php

namespace OptimizePress\Integrations\Services\Integrations;

use Demio\Client;
use Exception;
use OptimizePress\Integrations\Collections\IntegrationFieldsCollection;
use OptimizePress\Integrations\Collections\IntegrationListsCollection;
use OptimizePress\Integrations\Integration;
use OptimizePress\Integrations\IntegrationList;
use OptimizePress\Integrations\IntegrationField;
use OptimizePress\Integrations\LeadOptions;
use OptimizePress\Integrations\OptinData;
use OptimizePress\Integrations\OptinResult;
use OptimizePress\Integrations\Services\Contracts\BaseIntegration;
use OptimizePress\Integrations\Services\Contracts\IntegrationServiceInterface;
use OptimizePress\Integrations\Services\Exceptions\AlreadySubscribedException;
use OptimizePress\Integrations\Services\Exceptions\OptinException;
use OptimizePress\Support\Log\Log;

/**
 * Ontraport service class for integration
 */
class DemioIntegration extends BaseIntegration implements IntegrationServiceInterface
{
    /**
     * Init dependencies
     *
     * @param Integration $integration
     */
    public function __construct(Integration $integration)
    {
        // Initialize and setup
        $this->init($integration);

        // Setup client
        $this->client = new Client($this->integration->getConnectionValue('api_key'), $this->integration->getConnectionValue('api_secret'));
    }

    /**
     * Check if integration is ready for access
     *
     * @return bool
     */
    public function isReady()
    {
        if ($this->client) {
            return true;
        }

        return false;
    }

    /**
     * Ping the service API
     *
     * @return bool
     */
    public function ping()
    {
        try {
            $response = $this->client->ping();

            if ($response->statusCode() == 200) {
                return true;
            }
        } catch(Exception $e) {
            Log::error("[DEMIO] Failed to ping service. ".$e->getMessage());
        }

        return false;
    }

    /**
     * Return all lists
     *
     * @return IntegrationListsCollection
     */
    public function getLists()
    {
        try {
            $result = $this->client->events->getList();

            if ($result and $events = $result->results()) {
                $lists = new IntegrationListsCollection;

                foreach ($events as $event) {
                    $list = $this->listObject([
                        'id'   => $event->id,
                        'name' => $event->name,
                    ]);
                    $lists->push($list);
                }

                return $lists;
            }

            Log::error("[DEMIO] Failed to get lists.");
        } catch (Exception $e) {
            Log::error("[DEMIO] Error when fetching lists from service. " . $e->getMessage());
        }

        return null;
    }

    /**
     * Return a list
     *
     * @param  mixed $listId
     * @return IntegrationList
     */
    public function getList($listId)
    {
        try {
            $result = $this->client->events->getEvent($listId);

            if ($result and $event = $result->results()) {
                $list = $this->listObject([
                    'id'   => $event->id,
                    'name' => $event->name,
                ]);

                return $list;
            }

            Log::error("[DEMIO] Failed to get list.");
        } catch (Exception $e) {
            Log::error("[DEMIO] Error when fetching list [$listId] from service. " . $e->getMessage());
        }

        return null;
    }

    /**
     * Get form fields
     *
     * @param  mixed $listId
     * @return IntegrationFieldsCollection
     */
    public function getFields($listId = null)
    {
        $fields = new IntegrationFieldsCollection;

        // Always add email field
        $fields->push(new IntegrationField(['id' => 'first_name', 'name' => 'first_name', 'label' => 'First Name', 'optin_id' => 'first_name', 'type' => 'text',  'enabled'  => false, 'required' => false, 'order' => 10]));
        $fields->push(new IntegrationField(['id' => 'last_name',  'name' => 'last_name',  'label' => 'Last Name',  'optin_id' => 'last_name',  'type' => 'text',  'enabled'  => false, 'required' => false, 'order' => 20]));
        $fields->push(new IntegrationField(['id' => 'email',      'name' => 'email',      'label' => 'E-Mail',     'optin_id' => 'email',      'type' => 'email', 'enabled'  => true,  'required' => true,  'order' => 30]));

        return $fields;
    }

    /**
     * Optin to email service
     *
     * @param  OptinData   $optinData
     * @param  LeadOptions $leadOptions
     * @return OptinResult
     * @throws OptinException
     */
    public function optin(OptinData $optinData, LeadOptions $leadOptions = null)
    {
        $result    = $this->optinErrorResult();
        $email     = $optinData->email();
        $listId    = $optinData->listId();
        $name      = $optinData->fullName();

        try {
            $register = $this->client->events->register([
                'id'    => $listId, // Event ID
                'name'  => $name ?: $email,
                'email' => $email,
            ]);

            if ($register->isSuccess()) {
                $response = $register->results();
                Log::error("[DEMIO] Contact registered to event [$listId].");
                $result = $this->optinSuccessResult();
            } else {
                Log::error("[DEMIO] Error when registering contact to event [$listId]. Code [" . $register->statusCode() . ']. Errors: ' . $register->implodeMessages(','));
                $this->throwOptinException();
            }
        } catch (Exception $e) {
            Log::error("[DEMIO] Error when registering contact to event [$listId]. " . $e->getMessage());
            $this->throwOptinException($e);
        }

        return $result;
    }
}
