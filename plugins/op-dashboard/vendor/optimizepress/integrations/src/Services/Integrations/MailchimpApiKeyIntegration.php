<?php

namespace OptimizePress\Integrations\Services\Integrations;

use GuzzleHttp\Client as HttpClient;
use OptimizePress\Integrations\Collections\IntegrationTagsCollection;
use OptimizePress\Support\Log\Log;
use OptimizePress\Integrations\Integration;
use OptimizePress\Integrations\IntegrationTag;
use OptimizePress\Integrations\Services\Contracts\IntegrationServiceInterface;

/**
 * Integration logic for MailChimp
 */
class MailchimpApiKeyIntegration extends MailchimpIntegration implements IntegrationServiceInterface
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

        // Set API key
        $apiKey = $this->integration->getConnectionValue('api_key');

        // Setup base config
        $this->config = array(
            'api_key' => $apiKey,
            'auth' => ['', $apiKey]
        );

        // HTTP clients and helpers
        $this->client = new HttpClient($this->config);
    }

    /**
     * Create base request data
     *
     * @return array
     */
    public function getRequestData()
    {
        return ['headers' => ['Accept' => 'application/json']];
    }

    /**
     * Ping the service API
     *
     * @return bool
     */
    public function ping()
    {
        // Prepare request data
        $data = ['headers' => ['Accept' => 'application/json']];

        // And try to make the request
        try {
            $response = $this->client->get($this->getApiUrl(), $data);

            if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody()) and isset($result->account_id)) {
                return true;
            }
        } catch (\Exception $e) {
            Log::error("[MAILCHIMP] Error when pinging service. " . $e->getMessage());
        }

        return false;
    }

    /**
     * Get all tags
     *
     * @return IntegrationTagsCollection
     */
    public function getTags()
    {
        return new IntegrationTagsCollection;
    }

    /**
     * Return a specific tag
     *
     * @param  int  $tagId
     * @return IntegrationTag
     */
    public function getTag($tagId)
    {
        return null;
    }

    /**
     * Get root URL to API
     *
     * @return string
     */
    public function getApiUrl()
    {
        $apiKey   = $this->integration->getConnectionValue('api_key');
        $keyParts = explode("-", $apiKey);
        $dc       = isset($keyParts[1]) ? $keyParts[1] : 'us1';
        $url      = 'https://'.$dc.'.api.mailchimp.com/3.0/';

        return $url;
    }
}
