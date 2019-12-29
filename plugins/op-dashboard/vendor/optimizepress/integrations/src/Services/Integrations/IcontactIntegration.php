<?php

namespace OptimizePress\Integrations\Services\Integrations;

use Exception;
use OPDashboard\Services\GeoIp;
use OptimizePress\Integrations\Collections\IntegrationFieldsCollection;
use OptimizePress\Integrations\Collections\IntegrationListsCollection;
use OptimizePress\Integrations\OptinResult;
use OptimizePress\Integrations\Services\Exceptions\AlreadySubscribedException;
use OptimizePress\Integrations\Services\Exceptions\OptinException;
use OptimizePress\Integrations\Services\vendor\iContact\iContactApi;
use OptimizePress\Integrations\Integration;
use OptimizePress\Integrations\IntegrationList;
use OptimizePress\Integrations\IntegrationField;
use OptimizePress\Integrations\LeadOptions;
use OptimizePress\Integrations\OptinData;
use OptimizePress\Integrations\Services\Contracts\BaseIntegration;
use OptimizePress\Integrations\Services\Contracts\IntegrationServiceInterface;
use OptimizePress\Support\Log\Log;
use function OptimizePress\Support\array_get;

/**
 * Integration with iContact
 */
class IcontactIntegration extends BaseIntegration implements IntegrationServiceInterface
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

        // HTTP clients and helpers
        $this->client = iContactApi::getInstance()->setConfig([
            'appId'       => $this->integration->getConnectionValue('api_key'),
            'apiPassword' => $this->integration->getConnectionValue('api_secret'),
            'apiUsername' => $this->integration->getConnectionValue('username'),
        ]);
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
            $result = $this->client->getLists();

            if ($result) {
                return true;
            }
        } catch (Exception $e) {
            Log::error('[ICONTACT] ' . $e->getMessage() . " / " . @json_encode($this->client->getErrors()));
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
            $result = $this->client->getLists();

            if ($result) {
                $lists = new IntegrationListsCollection;

                foreach ($result as $id => $list) {
                    $list = $this->listObject((array) $list);
                    $lists->push($list);
                }

                return $lists;
            }
        } catch (Exception $e) {
            Log::error('[ICONTACT] ' . $e->getMessage() . ' / ' . @json_encode($this->client->getErrors()));
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
        $result = $this->client->getLists();

        if ($result) {
            foreach ($result as $resultList) {
                if ($resultList->listId == $listId) {
                    $list = $this->listObject((array) $resultList);

                    return $list;
                }
            }
        }
    }

    /**
     * Get form fields (hardcoded fields for iContact)
     *
     * @param  mixed  $listId
     * @return IntegrationFieldsCollection
     */
    public function getFields($listId = null)
    {
        $fields = new IntegrationFieldsCollection;

        // Always add email field
        $field = new IntegrationField([
            'id'       => 'email',
            'name'     => 'email',
            'label'    => 'E-Mail',
            'optin_id' => 'email',
            'enabled'  => true,
            'required' => true,
            'order'    => 30,
            'type'     => 'email',
        ]);
        $fields->push($field);

        // Fields are hardcoded
        $fieldIndex = 1;
        foreach ([
                     'prefix'      => 'Prefix',
                     'name'        => 'FirstName',
                     'last_name'   => 'LastName',
                     'sufix'       => 'Suffix',
                     'street'      => 'Street',
                     'street2'     => 'Street2',
                     'city'        => 'City',
                     'state'       => 'State',
                     'postal_code' => 'PostalCode',
                     'phone'       => 'Phone',
                     'fax'         => 'Fax',
                     'business'    => 'Business'
                 ] as $fieldKey => $icontactField) {
            // Set field order
            if     ($fieldKey === 'name')      $order = 10;
            elseif ($fieldKey === 'last_name') $order = 20;
            else                               $order = 100 + $fieldIndex;

            $field = new IntegrationField([
                'id'       => $fieldKey,
                'name'     => $fieldKey,
                'label'    => $icontactField,
                'optin_id' => $fieldKey,
                'required' => false,
                'enabled'  => false,
                'type'     => 'text',
                'order'    => $order,
            ]);

            $fields->push($field);
            $fieldIndex++;
        }

        // get more fields from API
        $customFields = $this->client->getCustomFields();

        if (!empty($customFields)) {
            foreach($customFields as $customField) {
                $order = 100 + $fieldIndex;

                $field = new IntegrationField([
                    'id'       => $customField->customFieldId,
                    'name'     => $customField->customFieldId,
                    'label'    => $customField->publicName,
                    'optin_id' => $customField->customFieldId,
                    'required' => false,
                    'enabled'  => (bool) $customField->displayToUser,
                    'type'     => $customField->fieldType,
                    'order'    => $order,
                ]);

                $fields->push($field);
                $fieldIndex++;
            }
        }

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
        $listId = $optinData->listId();

        // we are using custom here, as we can not add these on update user
        // for some strange reason
        if (class_exists('\OPDashboard\Services\GeoIp')) {
            $optinData->isFromEu = GeoIp::isFromEu();
        } else {
            $optinData->isFromEu = true;
        }
        $gdpr = $this->prepareGdprData($optinData);

        try {
            // First we try to create a new contact
            $contact = $this->client->addContact(
                $email, 'normal',
                $optinData->get('prefix'), $optinData->get('name'), $optinData->get('last_name'), $optinData->get('sufix'), $optinData->get('street'),
                $optinData->get('street2'), $optinData->get('city'), $optinData->get('state'), $optinData->get('postal_code'), $optinData->get('phone'),
                $optinData->get('fax'), $optinData->get('business'), $gdpr
            );

            // If we get a contact back, we need to subscribe the person
            $response = null;
            if ($contact) {
                $response = $this->client->subscribeContactToList($contact->contactId, $listId);

                if ($response) {
                    Log::info('[ICONTACT] Contact subscribed '.$email);
                    $result = $this->optinSuccessResult();
                } elseif (is_array($response)) {
                    $this->throwOptinAlreadySubscribedException();
                }
            }

            if ( ! $response && ! $result->isSuccessful()) {
                Log::error('[ICONTACT] Failed to subscribe contact [' . $email . '] to list [' . $listId . '].');
                $this->throwOptinException();
            }
        } catch (Exception $e) {
            if ($e->getCode() == 409) {
                Log::debug("[ICONTACT] User already subscribed: $email to list $listId. Code 409.");
                $this->throwOptinAlreadySubscribedException();
            } else {
                Log::error("[ICONTACT] Error when subscribing to list [$listId]. ".$e->getMessage());
                $this->throwOptinException($e);
            }
        }

        return $result;
    }

    /**
     * Prepare GDPR tags
     *
     * @param OptinData $data
     * @return array
     */
    public function prepareGdprData(OptinData $data)
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
                        $tagsToAssign[$tag] = 'yes';
                        Log::debug("[$providerName] 'Confirmed' GDPR tag will be assigned to user. [$tag]");

                        // Apply declined tag
                    } elseif ($tag = array_get($gdprOptions, 'gdpr_declined_' . $index)) {
                        $tagsToAssign[$tag] = 'yes';
                        Log::debug("[$providerName] 'Declined' GDPR tag will be assigned to user. [$tag]");
                    }

                    // Assign tag for users outside EU that don't see the consent
                } elseif (($location == 'eu' and ! $userInEu) and $tag = array_get($gdprOptions, 'gdpr_not_shown_' . $index)) {
                    $tagsToAssign[$tag] = 'yes';
                    Log::debug("[$providerName] 'Not Shown' GDPR tag will be assigned to user. [$tag]");
                }
            }
        }

        $gdprNote = $this->getGdprNote($data);

        if (!empty($gdprNote) && !empty($data->get('optin-gdpr-field-note'))) {
            $tagsToAssign[$data->get('optin-gdpr-field-note')] = $gdprNote;
        }

        return $tagsToAssign;
    }
}
