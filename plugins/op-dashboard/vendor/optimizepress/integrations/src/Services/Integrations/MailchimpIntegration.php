<?php

namespace OptimizePress\Integrations\Services\Integrations;

use Exception;
use OPDashboard\Services\GeoIp;
use OptimizePress\Integrations\Collections\IntegrationDataCollection;
use OptimizePress\Integrations\Collections\IntegrationFieldsCollection;
use OptimizePress\Integrations\Collections\IntegrationListsCollection;
use OptimizePress\Integrations\LeadOptions;
use OptimizePress\Integrations\OptinData;
use OptimizePress\Integrations\OptinErrorResult;
use OptimizePress\Integrations\OptinResult;
use OptimizePress\Integrations\OptinSuccessResult;
use OptimizePress\Integrations\Services\Exceptions\AlreadySubscribedException;
use OptimizePress\Integrations\Services\Exceptions\OptinException;
use OptimizePress\Support\Log\Log;
use OptimizePress\Integrations\IntegrationField;
use OptimizePress\Integrations\IntegrationList;
use OptimizePress\Integrations\Services\Contracts\BaseIntegration;
use OptimizePress\Integrations\Services\Contracts\IntegrationServiceInterface;
use function OptimizePress\Support\object_get;

/**
 * Integration logic for MailChimp
 */
abstract class MailchimpIntegration extends BaseIntegration implements IntegrationServiceInterface
{
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
     * Just some base request data
     *
     * @return array
     */
    public function getRequestData()
    {
        return ['headers' => ['Accept' => 'application/json']];
    }

    /**
     * Return all lists
     *
     * @return IntegrationListsCollection
     */
    public function getLists()
    {
        try {
            $response = $this->client->get($this->getApiUrl() . 'lists?count=999', $this->getRequestData());

            if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody()) and isset($result->lists)) {
                $lists = new IntegrationListsCollection;

                foreach ($result->lists as $list) {
                    $list = $this->listObject([
                        'id'   => $list->id,
                        'name' => $list->name,
                    ]);
                    $lists->push($list);
                }

                return $lists;
            }

            Log::error('[MAILCHIMP] Failed to get lists.');
        } catch (\Exception $e) {
            Log::error('[MAILCHIMP] Error when fetching lists from service. '. $e->getMessage());
        }
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
            $response = $this->client->get($this->getApiUrl() . 'lists/' . $listId, $this->getRequestData());

            if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody())) {
                $list = $this->listObject([
                    'id'   => $result->id,
                    'name' => $result->name,
                ]);

                return $list;
            }

            Log::error("[MAILCHIMP] Failed to get list [$listId].");
        } catch (\Exception $e) {
            Log::error("[MAILCHIMP] Error when fetching list [$listId] from service. " . $e->getMessage());
        }
    }

    /**
     * Get form fields
     *
     * @param  mixed $listId
     * @return IntegrationFieldsCollection
     */
    public function getFields($listId = null)
    {
        if (! $listId)
            return;

        $fields = new IntegrationFieldsCollection;

        try {
            $response = $this->client->get($this->getApiUrl() . 'lists/' . $listId . '/merge-fields?count=999', $this->getRequestData());

            if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody())) {
                // Always add email field
                $field = new IntegrationField([
                    'id'       => 'email',
                    'name'     => 'email',
                    'label'    => 'E-Mail',
                    'optin_id' => 'email',
                    'enabled'  => true,
                    'required' => true,
                    'order'    => 0,
                    'type'     => 'email',
                ]);
                $fields->push($field);

                if (isset($result->merge_fields) and $result->merge_fields) {
                    // Then fetch merge vars
                    foreach ($result->merge_fields as $mergeField) {
                        $field = null;
                        $type  = $this->parseFieldType(object_get($mergeField, 'type', 'text'));

                        // Order of fields
                        $fieldId = object_get($mergeField, 'tag');
                        $order   = object_get($mergeField, 'display_order');
                        if ($fieldId === 'FNAME') {
                            $fieldId = 'first_name';
                            $order = -2;
                        }
                        if ($fieldId === 'LNAME') {
                            $fieldId = 'last_name';
                            $order = -1;
                        }

                        // Handle some fields differently
                        if ($type === 'address' || $type === "tel" || $type === 'select' || $type === 'radio' || $type === 'number') {
                            // address, select, radio and phone fields are disabled for now
                        } else {
                            $field = new IntegrationField([
                                'id'       => $fieldId,
                                'name'     => $fieldId,
                                'label'    => object_get($mergeField, 'name'),
                                'enabled'  => true,
                                'optin_id' => object_get($mergeField, 'tag'),
                                'required' => object_get($mergeField, 'required', false),
                                'order'    => $order,
                                'type'     => $type,
                            ]);
                        }

                        // For select/radio fields we also add the provided options
                        if (in_array($type, ['select', 'radio']) and $options = object_get($mergeField, 'options.choices')) {
                            foreach ($options as $optionIndex => $optionValue) {
                                $field->addOptionValue($optionValue, $optionValue);
                            }
                        }

                        if ($field) {
                            $fields->push($field);
                        }
                    }
                }

                // We also need to fetch the interest categories which coresponds to the checkbox fields
                $checkboxes = $this->getInterestCategories($listId);
                if ($checkboxes) {
                    foreach ($checkboxes as $checkbox) {
                        $fields->push($checkbox);
                    }
                }

                Log::debug('[MAILCHIMP] ' . count($fields)." form inputs fetched on list [$listId].");
            }
        } catch (\Exception $e) {
            Log::error("[MAILCHIMP] Error when fetching list fields [$listId] from service. " . $e->getMessage());
        }

        // Increment indexes
        foreach ($fields as &$field) {
            $field->order = $field->order + 3;
        }

        // Sort the fields
        if ($fields) {
            $fields = $fields->sortBy(function($item) {
                return $item->order;
            }, SORT_NUMERIC);

            // And reset the keys
            $fields = $fields->values();
        }

        // Check if all the fields are valid for display
        return $fields;
    }

    /**
     * Get interest categories for a list
     * This is required for checkbox fields
     *
     * @param  mixed $listId
     * @return IntegrationDataCollection|void
     */
    public function getInterestCategories($listId = null)
    {
        if (! $listId)
            return;

        try {
            $response = $this->client->get($this->getApiUrl() . 'lists/' . $listId . '/interest-categories?count=999', $this->getRequestData());

            if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody()) and isset($result->categories) and $result->categories) {
                $categories = new IntegrationDataCollection;

                foreach ($result->categories as $category) {
                    Log::debug('[MAILCHIMP] ' . count($categories)." interest categories fetched on list [$listId].");
                    $interests = $this->getInterests($listId, $category->id);

                    if ($category and $interests) {
                        $categoryType = $category->type === 'dropdown' ? 'select' : ($category->type === 'radio' ? 'radio' : 'check');

                        $field = new IntegrationField([
                            'id'       => $category->id,
                            'name'     => $category->id,
                            'label'    => $category->title,
                            'enabled'  => true,
                            'optin_id' => $category->id,
                            'required' => false,
                            'order'    => 999,
                            'type'     => $categoryType,
                        ]);

                        // Also add the interests as options
                        foreach ($interests as $interestIndex => $interest) {
                            $field->addOptionValue($interest['value'], $interest['label']);
                        }

                        $categories->push($field);
                    }
                }

                return $categories;
            }

            //Log::error("[MAILCHIMP] Failed to get interest categories [$listId]. Code [".$response->getStatusCode()."] / Body: " . $response->getBody());
        } catch (\Exception $e) {
            Log::error("[MAILCHIMP] Error when fetching interest categories [$listId] from service. " . $e->getMessage());
        }
    }

    /**
     * Get interests for a interest category
     * This is required for checkbox fields
     *
     * @param  mixed $listId
     * @param  mixed $categoryId
     * @return IntegrationDataCollection|void
     */
    public function getInterests($listId, $categoryId)
    {
        if (! $listId || ! $categoryId)
            return;
        try {
            $response = $this->client->get($this->getApiUrl() . 'lists/' . $listId . '/interest-categories/' . $categoryId . '/interests?count=999', $this->getRequestData());
            $result = @json_decode($response->getBody());

            if ($response->getStatusCode() == 200 and $result = @json_decode($response->getBody()) and isset($result->interests) and $result->interests) {
                $interests = new IntegrationDataCollection;

                foreach ($result->interests as $interest) {
                    $interests->push([
                        'value' => $interest->id,
                        'label' => $interest->name,
                    ]);
                }

                Log::debug('[MAILCHIMP] ' . count($interests) . " interests fetched on list [$listId] / category [$categoryId].");
                return $interests;
            }

            Log::error("[MAILCHIMP] Failed to get interests [$listId] / category [$categoryId].");
        } catch (\Exception $e) {
            Log::error("[MAILCHIMP] Error when fetching interests [$listId] / category [$categoryId] from service. " . $e->getMessage());
        }
    }

    /**
     * Optin to email service
     *
     * @param  OptinData  $optinData
     * @param  LeadOptions  $leadOptions
     * @return OptinResult
     * @throws AlreadySubscribedException
     * @throws OptinException
     */
    public function optin(OptinData $optinData, LeadOptions $leadOptions = null)
    {
        // Setup params
        $result             = new OptinErrorResult;
        $email              = $optinData->email();
        $listId             = $optinData->listId();
        $inputs             = $this->getFields($listId);
        $interestCategories = $this->getInterestCategories($listId);
        $tagsToAssign       = [];

        // Prepare request data
        $requestData = $this->getRequestData();

        // And try to make the request
        try {
            // Create request body
            $body = ['email_address' => $email, 'status' => 'pending'];

            // Prepare merge fields if needed
            if ($inputs) {
                $merge_fields = [];

                foreach ($inputs as $input) {
                    // Only enabled, skip checkboxes (interests), skip email (added outside merge fields)
                    if ($input->isEnabled() and $input->name != 'email' and $input->type != 'check') {
                        if (!empty($optinData->get($input->name))) {
                            $merge_fields[$input->optin_id] = $optinData->get($input->name);
                        }
                    }
                }

                // GDPR stuff
                if (class_exists('\OPDashboard\Services\GeoIp')) {
                    $optinData->isFromEu = GeoIp::isFromEu();
                } else {
                    $optinData->isFromEu = true;
                }
                $gdpr = $this->processGdprTags($optinData, true);

                if (!empty($gdpr)) {
                    foreach ($gdpr as $key => $value) {
                        $tagsToAssign[$value['id']] = 'yes';
                    }

                    $merge_fields = array_merge($merge_fields, $tagsToAssign);
                }


                // And add the fields to the request body if needed
                if ($merge_fields) {
                    $body['merge_fields'] = $merge_fields;
                }
            }

            // And add interests if needed
            if ($interestCategories) {
                $interestFields = [];

                foreach ($interestCategories as $interestCategory) {
                    foreach ($interestCategory->values as $interest) {
                        if ($optinData->get($interestCategory->name) and is_array($optinData->get($interestCategory->name)) and in_array($interest->value, $optinData->get($interestCategory->name))) {
                            $interestFields[$interest->value] = true;
                        } else {
                            $interestFields[$interest->value] = false;
                        }
                    }
                }

                // And add the fields to the request body if needed
                if ($interestFields) {
                    $body['interests'] = $interestFields;
                }
            }

            // Set double optin
            $doubleOptin = $optinData->get('optin-double-optin');
            if ($doubleOptin) $body['status'] = 'pending';
            else              $body['status'] = 'subscribed';

            // Now prepared request data and make the request
            $requestData['body'] = @json_encode($body);
            Log::debug('[MAILCHIMP OAUTH] Preparing request data: ' . @json_encode($requestData));

            // Now make the request
            $response = $this->client->post($this->getApiUrl() . 'lists/' . $listId . '/members', $requestData);

            if (($response->getStatusCode() == 200 and $result = @json_decode($response->getBody()))) {
                Log::debug("[MAILCHIMP OAUTH] User subscribed: $email to list $listId");

                // Save gdpr note
                $note = $this->getGdprNote($optinData);
                if (!empty($note)) {
                    $subscriberHash = md5(strtolower($email));
                    $requestData['body'] = @json_encode(['note' => $note]);
                    $this->client->post($this->getApiUrl(). 'lists/' . $listId . '/members/' . $subscriberHash . '/notes',
                        $requestData
                    );
                }

                $result = $this->optinSuccessResult();
            } else {
                Log::error("[MAILCHIMP OAUTH] Failed to subscribe [$listId].");
                $this->throwOptinException();
            }
        } catch (\Exception $e) {
            $result = @json_decode($e->getResponse()->getBody());

            if (isset($result->status) && $result->status == "400") {
                $mailchimpID = md5(strtolower($email));

                try {
                    $realStatus = $this->client->get($this->getApiUrl() . 'lists/' . $listId . '/members/' . $mailchimpID, $this->getRequestData());
                } catch (\Exception $e) {
                    // The dreaded "has signed up to a lot of lists very recently; we’re not allowing more signups for now"
                    // returning gracefully
                    $result = $this->optinSuccessResult();
                }

                Log::info('User status (Mailchimp): ' . print_r($returned = @json_decode($realStatus->getBody()), true));

                $resubscription = false;
                if ($returned->status == 'unsubscribed') {
                    $resubscribedStatus = $this->client->patch($this->getApiUrl() . "lists/" . $listId . "/members/" . $mailchimpID, $requestData);
                    $resubscription     = true;

                    // Save GDPR note
                    $note = $this->getGdprNote($optinData);
                    $requestData['body'] = @json_encode(['note' => $note]);

                    if (!empty($note)) {
                        $this->client->post($this->getApiUrl(). 'lists/' . $listId . '/members/' . $mailchimpID . '/notes',
                            $requestData
                        );
                    }

                    $result = $this->optinSuccessResult();
                }
            }

            // Duplicate submission (no need for error)
            if (object_get($result, 'title') === 'Member Exists') {
                Log::info("[MAILCHIMP OAUTH] Member with email [$email] already subscribed to list [$listId]. Not showing an error to the end user.");

                $this->throwOptinAlreadySubscribedException();
            }

            Log::error("[MAILCHIMP OAUTH] Error when subscribing to list [$listId]. " . $e->getMessage() . ' / ' . $e->getResponse()->getBody());

            // Throw
            if (! $result->isSuccessful()) {
                $this->throwOptinException();
            }
        }

        return $result;
    }

    /**
     * Parse the MC field type and convert for OP
     *
     * @param  string $type
     * @return string
     */
    protected function parseFieldType($type)
    {
        if ($type === 'dropdown') {
            $type = 'select';
        } elseif ($type === 'zip') {
            $type = 'text';
        } elseif ($type === 'phone') {
            $type = 'tel';
        } elseif ($type === 'imageurl') {
            $type = 'text';
        }

        return $type;
    }
}
