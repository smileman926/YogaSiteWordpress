<?php

namespace OptimizePress\Integrations\Services\Integrations;

use Exception;
use GuzzleHttp\Client as HttpClient;
use OPDashboard\Services\GeoIp;
use OptimizePress\Integrations\Collections\IntegrationFieldsCollection;
use OptimizePress\Integrations\Collections\IntegrationListsCollection;
use OptimizePress\Integrations\Collections\IntegrationTagsCollection;
use OptimizePress\Integrations\Integration;
use OptimizePress\Integrations\IntegrationTag;
use OptimizePress\Integrations\IntegrationList;
use OptimizePress\Integrations\IntegrationField;
use OptimizePress\Integrations\LeadOptions;
use OptimizePress\Integrations\OptinData;
use OptimizePress\Integrations\OptinResult;
use OptimizePress\Integrations\Services\Contracts\BaseIntegration;
use OptimizePress\Integrations\Services\Contracts\IntegrationHasTagsInterface;
use OptimizePress\Integrations\Services\Contracts\IntegrationServiceInterface;
use OptimizePress\Integrations\Services\Exceptions\AlreadySubscribedException;
use OptimizePress\Integrations\Services\Exceptions\OptinException;
use OptimizePress\Support\Log\Log;

/**
 * Integration with ConvertKit
 */
class EgoiIntegration extends BaseIntegration implements IntegrationServiceInterface, IntegrationHasTagsInterface
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

        // Setup base config
        $this->config = [
            'api_key' => $integration->getConnectionValue('api_key'),
        ];

        // HTTP clients and helpers
        $this->client = new HttpClient($this->config);
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
        $data = [
            'query' => [
                'method' => 'getClientData',
                'type' => 'json',
                'functionOptions[apikey]' => $this->config['api_key'],
            ],
        ];
        $url = $this->integration->serviceUrl();

        try {
            // https://api-docs.e-goi.com/api/v2/#getClientData
            $response = $this->client->get($url, $data);

            if ($response->getStatusCode() === 200 and $result = @json_decode($response->getBody()) and isset($result->Egoi_Api) and isset($result->Egoi_Api->getClientData) and isset($result->Egoi_Api->getClientData->CLIENTE_ID)) {
                return true;
            }

            Log::error('[EGOI] Ping failed. ' . @json_decode($response->getBody()));
        } catch (Exception $e) {
            Log::error('[EGOI] Ping failed. ' . $e->getMessage());
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
        $data = [
            'query' => [
                'method' => 'getLists',
                'type' => 'json',
                'functionOptions[apikey]' => $this->config['api_key'],
            ],
        ];

        // https://api-docs.e-goi.com/api/v2/#getLists
        $url = $this->integration->serviceUrl();

        try {
            $response = $this->client->get($url, $data);

            if ($response->getStatusCode() === 200 and $result = @json_decode($response->getBody()) and isset($result->Egoi_Api) and isset($result->Egoi_Api->getLists)) {
                $lists = new IntegrationListsCollection;

                foreach ($result->Egoi_Api->getLists as $list) {
                    if (isset($list->listnum) and isset($list->title)) {
                        $list = $this->listObject([
                            'id'   => $list->listnum,
                            'name' => $list->title,
                            'extra_fields' => $list->extra_fields,
                        ]);
                        $lists->push($list);
                    }
                }

                return $lists;
            }

            Log::error('[EGOI] Error when fetching lists. ' . @json_decode($response->getBody()));
        } catch (Exception $e) {
            Log::error('[EGOI] Error when fetching lists. ' . $e->getMessage());
        }

        return null;
    }

    /**
     * Return a list
     *
     * @param  string  $listId
     * @return IntegrationList
     */
    public function getList($listId)
    {
        try {
            $lists = $this->getLists();

            if ($lists) {
                foreach ($lists as $list) {
                    if ($listId === $list->id) {
                        return $list;
                    }
                }
            }

            Log::error("[EGOI] Failed to get list [$listId].");
        } catch (Exception $e) {
            Log::error("[EGOI] Error when fetching list [$listId] from service. " . $e->getMessage());
        }

        return null;
    }

    /**
     * Get list fields.
     *
     * @param  string  $listId
     * @return IntegrationFieldsCollection
     */
    public function getFields($listId = null)
    {
        $fields = new IntegrationFieldsCollection;

        // E-goi default fields
        $fields->push(new IntegrationField(['id' => 'first_name', 'name' => 'first_name', 'label' => 'First Name',   'optin_id' => 'first_name', 'type' => 'text',  'enabled'  => true,  'required' => false, 'order' => 10]));
        $fields->push(new IntegrationField(['id' => 'last_name',  'name' => 'last_name',  'label' => 'Last Name',    'optin_id' => 'last_name',  'type' => 'text',  'enabled'  => true,  'required' => false, 'order' => 20]));
        $fields->push(new IntegrationField(['id' => 'email',      'name' => 'email',      'label' => 'E-Mail',       'optin_id' => 'email',      'type' => 'email', 'enabled'  => true,  'required' => true,  'order' => 30]));
        $fields->push(new IntegrationField(['id' => 'birth_date', 'name' => 'birth_date', 'label' => 'Birth Date',   'optin_id' => 'birth_date', 'type' => 'text',  'enabled'  => true,  'required' => false, 'order' => 30]));
        $fields->push(new IntegrationField(['id' => 'cellphone',  'name' => 'cellphone',  'label' => 'Cellphone',    'optin_id' => 'cellphone',  'type' => 'text',  'enabled'  => true,  'required' => false, 'order' => 40]));
        $fields->push(new IntegrationField(['id' => 'telephone',  'name' => 'telephone',  'label' => 'Telephone',    'optin_id' => 'telephone',  'type' => 'text',  'enabled'  => true,  'required' => false, 'order' => 60]));
        $fields->push(new IntegrationField(['id' => 'fax',        'name' => 'fax',        'label' => 'Fax',          'optin_id' => 'fax',        'type' => 'text',  'enabled'  => true,  'required' => false, 'order' => 70]));

        // E-goi extra fields
        $list = $this->getList($listId);
        if ($list) {
            $extraFields = (array) $list->extra_fields;

            foreach($extraFields as $field) {
                $fields->push(new IntegrationField([
                    'id'         => 'extra_' . $field->id,
                    'name'       => $field->ref,
                    'label'      => ucfirst(str_replace("_", " ", $field->ref)),
                    'optin_id'   => 'extra_' . $field->id,
                    'type'       => 'text',
                    'enabled'    => true,
                    'required'   => false,
                    'order'      => 80,
                ]));
            }
        }

        return $fields;
    }

    /**
     * Get Field from List
     *
     * @param string $listId
     * @param string $name
     * @return IntegrationField
     */
    public function getField($listId = null, $name = null)
    {
        $fields = $this->getFields($listId);

        if ($fields) {
            foreach($fields as $field) {
                if ($field->name === $name)
                    return $field;
            }
        }

        return null;
    }

    /**
     * Get all tags
     *
     * @return IntegrationTagsCollection
     */
    public function getTags()
    {
        $tags = new IntegrationTagsCollection;
        $data = [
            'query' => [
                'method' => 'getTags',
                'type' => 'json',
                'functionOptions[apikey]' => $this->config['api_key'],
            ],
        ];
        $url = $this->integration->serviceUrl();

        try {
            // https://api-docs.e-goi.com/api/v2/#getTags
            $response = $this->client->get($url, $data);

            if ($response->getStatusCode() === 200 and $result = @json_decode($response->getBody()) and isset($result->Egoi_Api) and isset($result->Egoi_Api->getTags) and isset($result->Egoi_Api->getTags->TAG_LIST)) {
                foreach ($result->Egoi_Api->getTags->TAG_LIST as $key => $tag) {
                    $tags->push(new IntegrationTag([
                        'id'   => $tag->ID,
                        'name' => $tag->NAME,
                    ]));
                }

                return $tags;
            }

            Log::error("[EGOI] Failed to get tags.");
        } catch (Exception $e) {
            Log::error("[EGOI] Error when fetching tags from service. ". $e->getMessage());
        }

        return $tags;
    }

    /**
     * Return a specific tag
     *
     * @param  mixed  $tagId
     * @return IntegrationTag
     */
    public function getTag($tagId)
    {
        $allTags = $this->getTags();

        foreach ($allTags as $tag) {
            if ($tag->id === $tagId) {
                return $tag;
            }
        }

        return null;
    }

    /**
     * Get list forms
     *
     */
    public function getForms($listId)
    {
        if ($listId) {
            $data = [
                'query' => [
                    'method' => 'getForms',
                    'type' => 'json',
                    'functionOptions' => [
                        'apikey' => $this->config['api_key'],
                        'listID' => $listId,
                    ]
                ],
            ];
            $url = $this->integration->serviceUrl();

            try {
                // https://api-docs.e-goi.com/api/v2/#getForms
                $response = $this->client->get($url, $data);

                if ($response->getStatusCode() === 200 and $result = @json_decode($response->getBody()) and isset($result->Egoi_Api) and isset($result->Egoi_Api->getForms)) {
                    return (array) $result->Egoi_Api->getForms;
                }

                return null;

                Log::error("[EGOI] Failed to get forms of list [$listId].");
            } catch (Exception $e) {
                Log::error("[EGOI] Error when fetching forms of list [$listId] from service. ". $e->getMessage());
            }
        }

        return null;
    }

    /**
     * Get default list.
     *
     * @param string $listId
     * @return mixed
     */
    public function getDefaultListForm($listId) {
        $forms = $this->getForms($listId);

        if ($forms) {
            foreach($forms as $form) {
                if ($form->default)
                    return $form;
            }
        }

        return null;
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
        // Setup params
        $result = $this->optinErrorResult();
        $email  = $optinData->email();
        $listId = $optinData->listId();
        $tags   = $optinData->tags()->all();
        $fields = $this->getFields($listId);
        $doubleOptin = $optinData->get('optin-double-optin');

        $data = [
            'query' => [
                'method' => 'addSubscriber',
                'type' => 'json',
                'functionOptions' => [
                    'apikey' => $this->config['api_key'],
                    'listID' => $listId,
                    'status' => $doubleOptin ? '0' : '1',
                    'validate_phone' => '0',
                ],
            ],
        ];

        // Prepare fields
        foreach ($fields as $field) {
            if ($value = $optinData->data($field->id)) {
                $data['query']['functionOptions'][$field->optin_id] = $value;
            }
        }

        // GDPR note
        $gdprNote = $this->getGdprNote($optinData);
        if (!empty($gdprNote) && !empty($optinData->get('optin-gdpr-field-note'))) {
            $fieldIds = [];
            $fieldName = $optinData->get('optin-gdpr-field-note');
            $data['query']['functionOptions'][$fieldName] = $gdprNote;
        }

        // Get GDPR tags
        if (class_exists('\OPDashboard\Services\GeoIp')) {
            $optinData->isFromEu = GeoIp::isFromEu();
        } else {
            $optinData->isFromEu = true;
        }
        $gdpr = $this->processGdprTags($optinData, true);
        $gdpr = array_keys($gdpr);

        // Merge GDPR tags and default tags
        $tags = array_merge($tags, $gdpr);

        // Prepare tags
        if ($tags) {
            $data['query']['functionOptions']['tags'] = $tags;
        }

        // Set list default form in case when double optin is activated
        if ($doubleOptin) {
            $form = $this->getDefaultListForm($listId);
            $data['query']['functionOptions']['formID'] = $form->id;
        }

        // https://api-docs.e-goi.com/api/v2/#addSubscriber
        $url = $this->integration->serviceUrl();

        try {
            $response = $this->client->get($url, $data);
            $result = @json_decode($response->getBody());
            $code = $response->getStatusCode();

            if ($code === 200 && $result && isset($result->Egoi_Api) && isset($result->Egoi_Api->addSubscriber) && isset($result->Egoi_Api->addSubscriber->UID)) {
                Log::debug("[EGOI] User subscribed: $email to list $listId");
                $result = $this->optinSuccessResult();
            } else if ($code === 200 && $result && isset($result->Egoi_Api) && isset($result->Egoi_Api->addSubscriber) && isset($result->Egoi_Api->addSubscriber->ERROR)) {
                Log::error("[EGOI] Failed to subscribe [$email] to list [$listId].");
                $message = ucwords(strtolower(str_replace("_", " ", $result->Egoi_Api->addSubscriber->ERROR)), " ");
                $this->throwOptinException("Error: " . $message);
            } else {
                Log::error("[EGOI] Failed to subscribe to list [$listId].");
                $this->throwOptinException();
            }
        } catch (Exception $e) {
            Log::error("[EGOI] Error when subscribing [$email] to list [$listId]. " . $e->getMessage());
            $this->throwOptinException($e);
        }

        return $result;
    }

       /**
     * Throw an optin exception
     *
     * @param  string|Exception   $exception
     * @param  array              $data
     * @throws OptinException
     */
    public function throwOptinException($exception = null, $data = [])
    {
        // Parse the exception
        if (is_string($exception)) {
            $message = $exception;
            $code    = 500;
        } elseif ($exception instanceof Exception) {
            $message = $exception->getMessage();
            $code    = $exception->getCode();

            preg_match('~\{(?:[^{}]|(?R))*\}~', $message, $matches);
            if ($matches && $matches[0] && $json = @json_decode($matches[0], true)) {
                $success = array_walk_recursive($json, function(&$item, $key) use (&$message) {
                    if ($key === "message" || $key === "MESSAGE" || $key === "error" || $key === "ERROR") {
                        return $message = $item;
                    }
                });

                $message = "Error: " . $message;
            }

        } else {
            $message = 'Failed to optin.';
            $code    = 500;
        }

        // And throw the exception
        throw new OptinException($message, array_merge([
            'code'        => $code,
            'optinData'   => $this->optinData,
            'leadOption'  => $this->leadOptions,
            'integration' => $this,
        ], $data));
    }
}
