<?php

namespace OptimizePress\Integrations\Services\Contracts;

use Exception;
use OptimizePress\Integrations\Integration;
use OptimizePress\Integrations\IntegrationList;
use OptimizePress\Integrations\Collections\IntegrationFieldsCollection;
use OptimizePress\Integrations\LeadOptions;
use OptimizePress\Integrations\OptinData;
use OptimizePress\Integrations\OptinErrorResult;
use OptimizePress\Integrations\OptinSuccessResult;
use OptimizePress\Integrations\Services\Exceptions\AlreadySubscribedException;
use OptimizePress\Integrations\Services\Exceptions\OptinException;
use function OptimizePress\Support\array_get;
use OptimizePress\Support\Collection;
use OptimizePress\Support\Log\Log;

/**
 * Base for all integration classes
 */
abstract class BaseIntegration
{
    /**
     * Service integration
     *
     * @var Integration
     */
    protected $integration;

    /**
     * Service client
     *
     * @var mixed
     */
    protected $client;

    /**
     * Basic configuration
     *
     * @var array
     */
    protected $config;

    /**
     * @var BaseProvider
     */
    protected $provider;

    /**
     * @var OptinData
     */
    protected $optinData;

    /**
     * @var LeadOptions
     */
    protected $leadOptions;

    /**
     * Init new integration provider
     *
     * @param Integration $integration
     */
    protected function init(Integration $integration)
    {
        $this->integration = $integration;
        $this->config      = &$integration->config;
        $this->provider    = &$integration->provider;
    }

    /**
     * Return the API URL of the integration
     *
     * @return string
     */
    public function getApiUrl()
    {
        return $this->integration->api_url;
    }

    /**
     * Map list data keys to
     *
     * @param  array  $data
     * @return IntegrationList
     */
    public function listObject(array $data)
    {
        if ($data) {
            $list    = new IntegrationList;
            $listMap = $this->integration->config->list_map;

            foreach ($data as $key => $value) {
                foreach ($listMap as $integrationKey => $integrationValue) {
                    if ($key == $integrationKey) {
                        $list->{$integrationValue} = $value;
                    }
                }
            }

            // Add the integration
            $list->setIntegration($this);

            return $list;
        }

        return null;
    }

    /**
     * Group fields together if needed
     *
     * @param  Collection $ungroupedFields
     * @return IntegrationFieldsCollection
     */
    public function createInputGroups(Collection $ungroupedFields)
    {
        $fields = new IntegrationFieldsCollection;

        foreach ($ungroupedFields as $key => $field) {
            // First check for type and if it already exists
            if ($existing = $this->inputExists($fields, $field->name)) {
                $existing->label = $field->label;
                $existing->required = (bool) $field->required;

                if ($existing->required) {
                    $existing->enabled = true;
                }
            } else {
                $fields->push($field);
            }
        }

        return $fields;
    }

    /**
     * Check if input exists in collection
     *
     * @param  Collection $fields
     * @param  string     $name
     * @param  string     $key
     * @return bool
     */
    public function inputExists($fields, $name, $key = 'name')
    {
        foreach ($fields as $field) {
            if ($field->{$key} == $name) {
                return $field;
            }
        }

        return false;
    }

    /**
     * Check if all fields are valid for display
     * TODO: Refactor this for the package
     * Useful if we have an addon integration and we need to add some fields or make them required
     * This is used when we have GotoWebinar integration which always requires first/last name
     *
     * @param  Collection $fields
     * @return Collection
     */
    /*public function getBoxInputs(Box $box)
    {
        $mainFields  = $this->getFields($box->active_integration_list);

        // Check addon integration
        if ($box->active_addon_integration_list) {
            $addonFields = $box->active_addon_integration->service->getFields();

            // Now we try to merge these
            if ($addonFields) {
                foreach ($mainFields as &$mainField) {
                    // For GotoWebinar we need additional required fields
                    if (in_array($mainField->id, [
                        "first_name", "inf_field_FirstName", "FNAME", "name",
                        "last_name",  "inf_field_LastName",  "LNAME",
                    ])) {
                        $mainField->enabled  = true;
                        $mainField->required = true;
                    }
                }

                // Check if all fields are there
                foreach ($addonFields as $addonField) {
                    // Check first name
                    if ($addonField->id == "first_name") {
                        if(
                            ! $this->inputExists($mainFields, "first_name", "id") and
                            ! $this->inputExists($mainFields, "FNAME", "id") and
                            ! $this->inputExists($mainFields, "inf_field_FirstName", "id") and
                            ! $this->inputExists($mainFields, "name", "id")
                        ) {
                            $addonField->order = -2;
                            $mainFields->push($addonField);
                        }
                    }

                    // Check last name
                    if ($addonField->id == "last_name") {
                        if (
                            ! $this->inputExists($mainFields, "last_name", "id") and
                            ! $this->inputExists($mainFields, "LNAME", "id") and
                            ! $this->inputExists($mainFields, "inf_field_LastName", "id")
                        ) {
                            $addonField->order = -1;
                            $mainFields->push($addonField);
                        }
                    }
                }
            }
        }

        return $mainFields;
    }*/

    /**
     * Return the provider
     *
     * @return BaseProvider
     */
    public function getProvider()
    {
        return $this->provider;
    }

    /**
     * Return the provider name
     *
     * @return string
     */
    public function getProviderName()
    {
        return $this->provider->title;
    }

    /**
     * Return IP address for request
     *
     * @return mixed
     */
    public function getRequestIp()
    {
        if (! empty($_SERVER['HTTP_CLIENT_IP'])) {
            $ip = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (! empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else {
            $ip = $_SERVER['REMOTE_ADDR'];
        }

        return $ip;
    }

    /**
     * Apply GDPR tags to the user
     *
     * @param OptinData $data
     * @return array|bool
     */
    public function processGdprTags(OptinData $data, $return = false)
    {
        // Prepare the data for all conditions
        $tagsToAssign    = [];
        $providerName    = strtoupper($data->getIntegration());
        $gdprOptions     = $data->getGdprFields();
        $location        = array_get($gdprOptions, 'gdpr_location');
        $checkedConsents = [
            $data->get('optin-gdpr-consent-1'),
            $data->get('optin-gdpr-consent-2'),
        ];

        $userInEu = isset($data->isFromEu) ? $data->isFromEu : true;

        // If GDPR is on
        if ($location != 'off') {
            foreach ([1, 2] as $index) {
                // Check if the current consent is enabled so we can fetch selected tags
                $enabled = false;
                if ($checkedConsents[$index - 1] != '') {
                    $enabled = true;
                }

                // If the consent is enabled, and should be displayed for "all" users,
                // or users in the "EU" and the current user is in the EU
                if ($enabled and ($location == 'all' or ($location == 'eu' and $userInEu))) {
                    $checked = $checkedConsents[$index - 1];

                    // Apply confirmed tag
                    if ($checked and $tag = array_get($gdprOptions, 'gdpr_confirmed_' . $index)) {
                        $tagsToAssign[$tag] = ['id' =>$tag];
                        Log::debug("[$providerName] 'Confirmed' GDPR tag will be assigned to user. [$tag]");

                        // Apply declined tag
                    } elseif ($tag = array_get($gdprOptions, 'gdpr_declined_' . $index)) {
                        $tagsToAssign[$tag] = ['id' =>$tag];
                        Log::debug("[$providerName] 'Declined' GDPR tag will be assigned to user. [$tag]");
                    }

                    // Assign tag for users outside EU that don't see the consent
                } elseif (($location == 'eu' and ! $userInEu) and $tag = array_get($gdprOptions, 'gdpr_not_shown_' . $index)) {
                    $tagsToAssign[$tag] = ['id' =>$tag];
                    Log::debug("[$providerName] 'Not Shown' GDPR tag will be assigned to user. [$tag]");
                }
            }

            // And now assign the tags
            if ($tagsToAssign) {
                $assignResult = $this->assignGdprTags($data, $tagsToAssign);

                if ($assignResult) {
                    Log::debug("[$providerName] GDPR tags were applied. " . @json_encode($tagsToAssign));
                }
            }
        }

        if ($return) {
            return $tagsToAssign;
        }

        return true;
    }

    /**
     * Assign a GDPR tag to user
     *
     * @param OptinData $data
     * @param  array $tag
     * @return bool
     */
    public function assignGdprTags(OptinData $data, array $tag)
    {
        if ($data and $tag) {
            return true;
        }

        return false;
    }

    /**
     * Build up the GDPR note that we save for the user
     *
     * @param OptinData $data
     * @return string
     */
    public function getGdprNote(OptinData $data, $condensed = false)
    {
        $notes = [];
        $gdprFields = $data->getGdprFields();

        if (isset($gdprFields['gdpr_location']) && $gdprFields['gdpr_location'] === 'off') {
            return '';
        }

        // Add text from submit button
        if ($note = $data->get('optin-button-message')) {
            $notes[] = 'Button Text: ' . $note;
        }

        // Add text from checkboxes
        foreach ([1, 2] as $index) {
            if ($data->get('optin-gdpr-consent-' . $index, false)
                && $note = $data->get('optin-gdpr-message-' . $index)) {
                $notes[] = "Consent $index Text: " . trim($note);
            }
        }

        if ($condensed) {
            return implode(' ', $notes);
        }

        return implode(' | ', $notes);
    }

    /**
     * Prepare optin success result object
     *
     * @param  string  $message
     * @param  array   $data
     * @return OptinSuccessResult
     */
    public function optinSuccessResult($message = null, $data = [])
    {
        return new OptinSuccessResult(array_merge([
            'message'     => $message,
            'optinData'   => $this->optinData,
            'leadOption'  => $this->leadOptions,
            'integration' => $this,
        ], $data));
    }

    /**
     * Prepare optin success result object
     *
     * @param  string  $message
     * @param  array   $data
     * @return OptinErrorResult
     */
    public function optinErrorResult($message = null, $data = [])
    {
        return new OptinErrorResult(array_merge([
            'message'     => $message,
            'optinData'   => $this->optinData,
            'leadOption'  => $this->leadOptions,
            'integration' => $this,
        ], $data));
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

    /**
     * Throw an optin exception
     *
     * @param  string|Exception   $exception
     * @param  array              $data
     * @throws AlreadySubscribedException
     */
    public function throwOptinAlreadySubscribedException($exception = null, $data = [])
    {
        // Parse the exception
        if (is_string($exception)) {
            $message = $exception;
            $code    = 500;
        } elseif ($exception instanceof Exception) {
            $message = $exception->getMessage();
            $code    = $exception->getCode();
        } else {
            $message = 'User already subscribed.';
            $code    = 500;
        }

        throw new AlreadySubscribedException($message, array_merge([
            'code'        => $code,
            'optinData'   => $this->optinData,
            'leadOption'  => $this->leadOptions,
            'integration' => $this,
        ], $data));
    }
}
