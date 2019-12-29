<?php

namespace OptimizePress\Integrations\Services\Contracts;

use Exception;
use GuzzleHttp\Client as HttpClient;
use OptimizePress\Integrations\Collections\IntegrationFieldsCollection;
use OptimizePress\Integrations\Integration;
use OptimizePress\Integrations\IntegrationField;
use OptimizePress\Integrations\LeadOptions;
use OptimizePress\Integrations\OptinData;
use OptimizePress\Integrations\OptinResult;
use OptimizePress\Integrations\Services\Exceptions\AlreadySubscribedException;
use OptimizePress\Integrations\Services\Exceptions\OptinException;
use OptimizePress\Support\Log\Log;

/**
 * Base for webhook integration classes
 */
abstract class BaseWebhookIntegration extends BaseIntegration
{
    /**
     * Init dependencies and service
     *
     * @param Integration $integration
     */
    public function __construct(Integration $integration)
    {
        // Initialize and setup
        $this->init($integration);

        // Get the default webhook URL
        $defaultWebhookUrl = $this->integration->getConnectionValue('webhook_url');

        // Set the values
        $this->config->set('webhook_url', $defaultWebhookUrl);

        // HTTP clients and helpers
        $this->client = new HttpClient;
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
     * Not needed in this case
     *
     * @return bool
     */
    public function ping()
    {
        return true;
    }

    /**
     * Get form fields (hardcoded fields for iContact)
     *
     * @param  string  $listId
     * @return IntegrationFieldsCollection
     */
    public function getFields($listId = null)
    {
        $fields = new IntegrationFieldsCollection;

        // Add default fields
        $field = new IntegrationField(['id' => 'first_name', 'name' => 'first_name', 'label' => 'First Name', 'optin_id' => 'first_name', 'type' => 'text',  'enabled'  => false, 'required' => false, 'order' => 10]); $fields->push($field);
        $field = new IntegrationField(['id' => 'last_name',  'name' => 'last_name',  'label' => 'Last Name',  'optin_id' => 'last_name',  'type' => 'text',  'enabled'  => false, 'required' => false, 'order' => 20]); $fields->push($field);
        $field = new IntegrationField(['id' => 'email',      'name' => 'email',      'label' => 'E-Mail',     'optin_id' => 'email',      'type' => 'email', 'enabled'  => true,  'required' => true,  'order' => 30]); $fields->push($field);

        // Also GDPR fields
        $field = new IntegrationField(['id' => 'gdpr_confirmed',    'name' => 'gdpr_confirmed',   'label' => 'GDPR Confirmed',   'optin_id' => 'gdpr_confirmed',   'type' => 'text',  'enabled'  => false, 'required' => false, 'order' => 110]); $fields->push($field);
        $field = new IntegrationField(['id' => 'gdpr_declined',     'name' => 'gdpr_declined',    'label' => 'GDPR Declined',    'optin_id' => 'gdpr_declined',    'type' => 'text',  'enabled'  => false, 'required' => false, 'order' => 120]); $fields->push($field);
        $field = new IntegrationField(['id' => 'gdpr_not_shown',    'name' => 'gdpr_not_shown',   'label' => 'GDPR Not Shown',   'optin_id' => 'gdpr_not_shown',   'type' => 'text',  'enabled'  => false, 'required' => false, 'order' => 130]); $fields->push($field);
        $field = new IntegrationField(['id' => 'gdpr_confirmed_2',  'name' => 'gdpr_confirmed_2', 'label' => 'GDPR Confirmed 2', 'optin_id' => 'gdpr_confirmed_2', 'type' => 'text',  'enabled'  => false, 'required' => false, 'order' => 210]); $fields->push($field);
        $field = new IntegrationField(['id' => 'gdpr_declined_2',   'name' => 'gdpr_declined_2',  'label' => 'GDPR Declined 2',  'optin_id' => 'gdpr_declined_2',  'type' => 'text',  'enabled'  => false, 'required' => false, 'order' => 220]); $fields->push($field);
        $field = new IntegrationField(['id' => 'gdpr_not_shown_2',  'name' => 'gdpr_not_shown_2', 'label' => 'GDPR Not Shown 2', 'optin_id' => 'gdpr_not_shown_2', 'type' => 'text',  'enabled'  => false, 'required' => false, 'order' => 230]); $fields->push($field);
        $field = new IntegrationField(['id' => 'gdpr_note',         'name' => 'gdpr_note',        'label' => 'GDPR Note',        'optin_id' => 'gdpr_note',        'type' => 'text',  'enabled'  => false, 'required' => false, 'order' => 310]); $fields->push($field);

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
        $result = $this->optinErrorResult();
        $email  = $optinData->email();

        // Get the webhook URL
        $webhookUrl = $optinData->webhookUrl() ?: $this->integration->getConnectionValue('webhook_url');

        // Proceed to make the request
        if ($webhookUrl) {
            // Try to make the request
            try {
                // Prepare request data
                $requestData = ['headers' => ['Accept' => 'application/json']];

                // Create request body
                $body = [
                    'email'      => $email,
                    'first_name' => $optinData->firstName(),
                    'last_name'  => $optinData->lastName(),
                ];

                // Add GDPR note if it exists
                $gdprNote = $this->getGdprNote($optinData);
                if ($gdprNote) $body['gdpr_note'] = $gdprNote;

                // And GDPR tags
                $gdprTags = $this->processGdprTags($optinData, true);
                if (! empty($gdprTags)) {
                    foreach ($gdprTags as $gdprTag) {
                        $body[$gdprTag['id']] = 'yes';
                    }
                }

                // Prepare request data and make the request
                $requestData['json'] = $body;
                Log::debug('[' . strtoupper($this->provider->title) . '] Webhook URL: ' . $webhookUrl);
                Log::debug('[' . strtoupper($this->provider->title) . '] Preparing request data: ' . @json_encode($requestData));

                // Now make the request
                $response = $this->client->post($webhookUrl, $requestData);

                if ($response->getStatusCode() == 200 && $result = @json_decode($response->getBody())) {
                    Log::debug('[' . strtoupper($this->provider->title) . '] Data successfully sent to webhook.');

                    $result = $this->optinSuccessResult();
                } else {
                    Log::error('[' . strtoupper($this->provider->title) . '] Failed to send data to webhook.');
                    $this->throwOptinException();
                }
            } catch (Exception $e) {
                Log::error('['. strtoupper($this->provider->title) . "] Error when sending data to webhook [$webhookUrl]. " . $e->getMessage());
                $this->throwOptinException($e);
            }
        }

        return $result;
    }
}
