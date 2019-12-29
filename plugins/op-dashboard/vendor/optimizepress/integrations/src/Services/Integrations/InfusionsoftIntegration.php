<?php

namespace OptimizePress\Integrations\Services\Integrations;

use DateTime;
use DOMXPath;
use DOMDocument;
use Exception;
use OPDashboard\Services\GeoIp;
use OptimizePress\Integrations\Collections\IntegrationFieldsCollection;
use OptimizePress\Integrations\Collections\IntegrationListsCollection;
use OptimizePress\Integrations\Collections\IntegrationTagsCollection;
use OptimizePress\Integrations\LeadOptions;
use OptimizePress\Integrations\OptinResult;
use OptimizePress\Integrations\Services\Contracts\IntegrationHasTagsInterface;
use OptimizePress\Integrations\Services\Exceptions\AlreadySubscribedException;
use OptimizePress\Integrations\Services\Exceptions\OptinException;
use function OptimizePress\Integrations\strip_single_html_tags;
use OptimizePress\Support\Log\Log;
use Infusionsoft\Infusionsoft;
use OptimizePress\Integrations\Integration;
use OptimizePress\Integrations\IntegrationField;
use OptimizePress\Integrations\IntegrationList;
use OptimizePress\Integrations\IntegrationTag;
use OptimizePress\Integrations\OptinData;
use OptimizePress\Integrations\Services\Contracts\BaseIntegration;
use OptimizePress\Integrations\Services\Contracts\IntegrationServiceInterface;
use OptimizePress\Integrations\Services\Contracts\IntegrationServiceOAuthInterface;
use function OptimizePress\Support\array_get;
use function OptimizePress\Support\starts_with;

/**
 * Infusionsoft service class for integration
 */
class InfusionsoftIntegration extends BaseIntegration implements IntegrationServiceInterface, IntegrationServiceOAuthInterface, IntegrationHasTagsInterface
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

        // Get the client ID and secret
        $clientId     = $this->integration->getConnectionValue('client_id')     ?: $this->getEnvClientId();
        $clientSecret = $this->integration->getConnectionValue('client_secret') ?: $this->getEnvClientSecret();

        // Setup service client
        $this->client = new Infusionsoft([
            'clientId'     => $clientId,
            'clientSecret' => $clientSecret,
            'redirectUri'  => $this->integration->getCallbackUrl(),
        ]);

        // Set the token if available for integration
        $this->refreshToken();
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
     * Authorize the API
     *
     * @return void
     */
    public function initAuthorization()
    {
        $authorizeUrl = $this->getAuthorizationUrl();

        // Redirect user to authorization URL
        header("HTTP/1.1 200 OK");
        header("Location: $authorizeUrl");
        exit();
    }

    /**
     * Return URL for authorizing OAuth requests
     *
     * @param  array $data
     * @return string
     */
    public function getAuthorizationUrl($data = [])
    {
        // Get the client ID and secret
        $clientId = $this->integration->getConnectionValue('client_id') ?: $this->getEnvClientId();

        $params = [
            'client_id'     => $clientId,
            'redirect_uri'  => $this->integration->getCallbackUrl(),
            'response_type' => 'code',
            'scope'         => 'full'
        ];
        $params = array_merge($params, $data);
        $url    = $this->integration->config->get('connection.authorization_url') . '?' . http_build_query($params, null, '&');

        return $url;
    }

    /**
     * Return token for authorizing OAuth requests
     *
     * @param  array $requestData
     * @return array
     */
    public function getAuthorizationTokenAndSecret(array $requestData)
    {
        $token = null;
        $code  = isset($requestData['code']) ? $requestData['code'] : null;

        if ($code and ! $this->client->getToken()) {
            try {
                $this->client->requestAccessToken($code);
            } catch (Exception $e) {
                Log::error("[INFUSIONSOFT] Error when fetching access token. " . $e->getMessage());
            }
        }

        if ($token = $this->client->getToken()) {
            $tokenData    = serialize($token);
            $accessToken  = $token->getAccessToken();
            $refreshToken = $token->getRefreshToken();
            $expiresAt    = new \DateTime();
            $expiresAt->setTimestamp($token->getEndOfLife());

            // Setup connection data
            $connectionData = [
                'token'            => isset($accessToken) ? $accessToken : null,
                'token_secret'     => null,
                'refresh_token'    => isset($refreshToken) ? $refreshToken : null,
                'token_expires_at' => isset($expiresAt)    ? $expiresAt    : null,
                'token_data'       => isset($tokenData)    ? $tokenData    : null,
            ];
        } else {
            Log::error("[INFUSIONSOFT] No access token found in response.");
            $connectionData = [];
        }

        return $connectionData;
    }

    /**
     * Refresh the token if needed
     *
     * @param  bool $force
     * @return mixed
     */
    public function refreshToken($force = false)
    {
        $serializedTokenData = $this->integration->getConnectionValue('token_data');
        $tokenData           = @unserialize($serializedTokenData) ?: @unserialize(stripslashes($serializedTokenData));

        if ($serializedTokenData and $token = $tokenData) {
            $this->client->setToken($token);

            if ($force or time() > $token->getEndOfLife()) {
                Log::debug('[INFUSIONSOFT] Refreshing access token for integration "' . $this->integration->provider . '" [' . $this->integration->uid . "].");

                try {
                    $token = $this->client->refreshAccessToken();

                    if ($token) {
                        $tokenData    = serialize($token);
                        $accessToken  = $token->getAccessToken();
                        $refreshToken = $token->getRefreshToken();
                        $expiresAt    = new DateTime();
                        $expiresAt->setTimestamp($token->getEndOfLife());

                        $tokenData = [
                            'token'            => isset($accessToken) ? $accessToken : null,
                            'token_secret'     => null,
                            'refresh_token'    => isset($refreshToken) ? $refreshToken : null,
                            'token_expires_at' => isset($expiresAt)    ? $expiresAt->getTimestamp() : null,
                            'token_data'       => isset($tokenData)    ? $tokenData : null,
                        ];

                        Log::debug('[INFUSIONSOFT] Access token refreshed: ' . @json_encode($tokenData));

                        $this->integration->storage()->updateConnectionFields($this->integration->uid, $tokenData);

                        return $tokenData;
                    }
                } catch (Exception $e) {
                    $this->integration->storage()->update($this->integration->uid, ['authorized' => 0, 'ping' => 0]);
                    $this->integration->storage()->updateConnectionFields($this->integration->uid, ['token' => null, 'refresh_token' => null, 'authorized' => 0, 'ping' => 0, 'token_data' => null]);
                    Log::error($e);

                    return false;
                }
            }
        }

        return isset($token) ? $token : null;
    }

    /**
     * Ping the service API
     *
     * @return bool
     */
    public function ping()
    {
        $result = $this->client->webForms->getMap();

        if ($result) {
            return true;
        }

        return false;
    }

    /**
     * Return all lists (corresponds to forms in IS)
     *
     * @return IntegrationListsCollection
     */
    public function getLists()
    {
        try {
            $result = $this->client->webForms->getMap();
            $lists = new IntegrationListsCollection;

            foreach ($result as $id => $list) {
                $list = $this->listObject(['id' => $id, 'name' => $list]);
                $lists->push($list);
            }

            return $lists;
        } catch (\Exception $e) {
            Log::error('[INFUSIONSOFT] Error when fetching lists from service. ' . $e->getMessage());
        }
    }

    /**
     * Return a list (form)
     *
     * @param  mixed $listId
     * @return IntegrationList
     */
    public function getList($listId)
    {
        $result = $this->client->webForms->getMap();

        foreach ($result as $id => $name) {
            if ($id == $listId) {
                $list = $this->listObject(['id' => $id, 'name' => $name]);
            }
        }

        return isset($list) ? $list : null;
    }

    /**
     * Get all tags
     *
     * @return IntegrationTagsCollection
     */
    public function getTags()
    {
        $limit    = 1000;
        $page     = 0;
        $tags     = $this->getTagsOnPage($page, $limit);
        $loadMore = (count($tags) >= $limit);

        // Append
        while ($loadMore) {
            $page++;
            $additionalTags = $this->getTagsOnPage($page, $limit);

            // Merge it
            if (count($additionalTags)) {
                $tags = $tags->merge($additionalTags);
            }

            // Check if we stop loading
            if (count($additionalTags) < $limit) {
                $loadMore = false;
            }
        }

        return $tags;
    }

    /**
     * Get tags on specific page since IS only allows 1000 tags
     *
     * @param  int $page
     * @param  int $limit
     * @return IntegrationTagsCollection
     */
    protected function getTagsOnPage($page = 0, $limit = 1000)
    {
        $allGroups = new IntegrationTagsCollection;

        try {
            $returnFields = ['Id', 'GroupName', 'GroupDescription', 'GroupCategoryId'];
            $query        = ['Id' => '%'];
            $groups       = $this->client->data->query("ContactGroup", $limit, $page, $query, $returnFields, 'Id', true);

            foreach ($groups as $group) {
                $allGroups->push(new IntegrationTag([
                    'id'          => array_get($group, 'Id'),
                    'name'        => array_get($group, 'GroupName'),
                    'description' => array_get($group, 'GroupDescription'),
                    'category_id' => array_get($group, 'GroupCategoryId'),
                ]));
            }
        } catch (\Exception $e) {
            Log::error('[INFUSIONSOFT] Error when fetching tags from service. ' . $e->getMessage());
        }

        return $allGroups;
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
            if ($tag->id == $tagId) {
                return $tag;
            }
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
        $doc    = new DOMDocument;
        $fields = new IntegrationFieldsCollection;

        // Add default fields
        $fields->push(new IntegrationField(['id' => 'inf_field_FirstName', 'name' => 'inf_field_FirstName', 'label' => 'First Name', 'optin_id' => 'inf_field_FirstName', 'type' => 'text',  'enabled'  => false, 'required' => false, 'order' => 10]));
        $fields->push(new IntegrationField(['id' => 'inf_field_LastName',  'name' => 'inf_field_LastName',  'label' => 'Last Name',  'optin_id' => 'inf_field_LastName',  'type' => 'text',  'enabled'  => false, 'required' => false, 'order' => 20]));
        $fields->push(new IntegrationField(['id' => 'inf_field_Email',     'name' => 'inf_field_Email',     'label' => 'E-Mail',     'optin_id' => 'inf_field_Email',     'type' => 'email', 'enabled'  => true,  'required' => true,  'order' => 30]));

        // When no list is passed we add some default fields
        if (! $listId) {
            // @TODO: Maybe some default actions when no list is connected

        // Else we need to parse the HTML form
        } else {
            $originalFormHtml = $this->client->webForms->getHTML($listId);
            $formHtml = strip_tags($originalFormHtml, '<style><form><label><input><select><button>');

            if ($doc->loadHTML($formHtml)) {
                $xpath = new DOMXPath($doc);
                $inputs     = $xpath->query('//input');

                if ($inputs->length > 0) {
                    $htmlLabels = $xpath->query('//label');
                    $labels     = [];

                    // Prepare the labels array
                    foreach ($htmlLabels as $label) {
                        $labels[$label->getAttribute("for")] = $label->nodeValue;
                    }

                    // Now go through all the fields and create the objects
                    foreach ($inputs as $key => $input) {
                        $fieldOrder = 40 + ($key * 10);

                        // Handle hidden fields a little bit different
                        if ($input->getAttribute('type') == "hidden") {
                            if (! $this->inputExists($fields, $input->getAttribute('name'), 'optin_id')) {
                                if (starts_with($input->getAttribute('name'), 'inf_custom_')) {
                                    $field = new IntegrationField([
                                        'id'       => $input->getAttribute('name'),
                                        'name'     => $input->getAttribute('name'),
                                        'optin_id' => $input->getAttribute('name'),
                                        'type'     => 'hidden',
                                        'protected'=> false,
                                        'label'    => str_replace('inf_custom_', '', $input->getAttribute('name')),
                                        'enabled'  => true,
                                        'value'    => $input->getAttribute('value'),
                                        'required' => true,
                                    ]);
                                } else {
                                    $field = new IntegrationField([
                                        'id'       => $input->getAttribute('name'),
                                        'name'     => $input->getAttribute('name'),
                                        'optin_id' => $input->getAttribute('name'),
                                        'type'     => 'hidden',
                                        'protected'=> true,
                                        'enabled'  => true,
                                        'value'    => $input->getAttribute('value'),
                                        'required' => true,
                                    ]);
                                }
                            }

                        // Handle radio/check fields a little bit different
                        } elseif ($input->getAttribute('type') == "radio" or $input->getAttribute('type') == "checkbox") {
                            // Find the group id/label first
                            $id         = $input->getAttribute('id');
                            $value      = $input->getAttribute('value');
                            $groupId    = str_replace("_".$value, "", $id);
                            $groupLabel = array_get($labels, $groupId, $groupId);
                            $fieldLabel = array_get($labels, $id, $input->getAttribute('name'));

                            // Check if it already exists first
                            $existingGroup = $this->inputExists($fields, $groupId);

                            if (! $existingGroup) {
                                $existingGroup = new IntegrationField([
                                    'id'       => $groupId ?: $input->getAttribute('name'),
                                    'label'    => $groupLabel,
                                    'name'     => $input->getAttribute('name'),
                                    'optin_id' => $input->getAttribute('name'),
                                    'order'    => $fieldOrder,
                                    'enabled'  => true,
                                    'type'     => $input->getAttribute('type'),
                                    // Check if label ends with "*"
                                    // @TODO: a better solution to this is required later
                                    'required' => substr(trim($fieldLabel), -1) == "*" ? true : false,
                                ]);
                            }

                            // Push in the values/options
                            $existingGroup->addOptionValue($value, $fieldLabel);

                            // Add the field to the collection
                            $fields->push($existingGroup);

                        // Text fields
                        } else {
                            $fieldLabel = array_get($labels, $input->getAttribute('id'), $input->getAttribute('name'));
                            $field = new IntegrationField([
                                'id'       => $input->getAttribute('id') ?: $input->getAttribute('name'),
                                'label'    => $fieldLabel,
                                'name'     => $input->getAttribute('name'),
                                'optin_id' => $input->getAttribute('name'),
                                'order'    => $fieldOrder,
                                'enabled'  => true,
                                'value'    => $input->getAttribute('value'),
                                'type'     => $input->getAttribute('type'),
                                // Check if label ends with "*"
                                // @TODO: a better solution to this is required later
                                'required' => substr(trim($fieldLabel), -1) == "*" ? true : false,
                            ]);
                        }

                        // Add the field to the collection
                        if (isset($field) and $field) {
                            $fields->push($field);
                        }
                    }
                }
            }

            // We need to group together radios, checkboxes and selectboxes
            $fields = $this->createInputGroups($fields);
        }

        Log::debug('[INFUSIONSOFT] ' . count($fields) . " form inputs fetched on list [$listId].");
        return $fields;
    }

    /**
     * Optin to email service
     *
     * @param OptinData    $optinData
     * @param  LeadOptions $leadOptions
     * @return OptinResult
     * @throws OptinException
     */
    public function optin(OptinData $optinData, LeadOptions $leadOptions = null)
    {
        // Get data
        $result = $this->optinErrorResult();
        $email  = $optinData->email();
        $listId = $optinData->listId();
        $inputs = $this->getFields($listId);

        // Containers for request data
        $contactData = [];
        $customData  = [];
        $formData    = [];

        // Fetch data from the request
        foreach ($inputs as $input) {
            if (starts_with($input->optin_id, 'inf_field_') and $optinData->get($input->optin_id)) {
                $contactData[str_replace('inf_field_', '', $input->optin_id)] = $optinData->get($input->optin_id, "");
            } elseif (starts_with($input->optin_id, 'inf_custom_')) {
                $customData[str_replace('inf_custom_', '', '_' . $input->optin_id)] = $optinData->get($input->optin_id);
            } elseif (starts_with($input->optin_id, 'inf_form_')) {
                $formData[str_replace('inf_form_', '', $input->optin_id)] = $optinData->get($input->optin_id);
            } elseif (starts_with($input->optin_id, 'inf_option_')) {
                $customData[str_replace('inf_option_', '', '_' . $input->optin_id)] = $optinData->get($input->optin_id);
            }
        }

        // Check email
        if (! isset($contactData['Email'])) {
            $contactData['Email'] = $email;
        }

        // Add name if not added
        if ($optinData->firstName() and ! isset($contactData['first_name'])) {
            $contactData['FirstName'] = $optinData->firstName();
        }
        if ($optinData->lastName() and ! isset($contactData['last_name'])) {
            $contactData['LastName'] = $optinData->lastName();
        }

        $gdprNote = $this->getGdprNote($optinData);
        if (!empty($gdprNote)) {
            $customData['ContactNotes'] = $gdprNote;
        }

        try {
            // Create the contact
            $contactId = $this->client->contacts('xml')->addWithDupCheck($contactData, 'Email');

            // We also need to add the custom data
            if ($contactId and $customData) {
                $optinData->contactId = $contactId;
                Log::debug('[INFUSIONSOFT] Contact added [' . $contactId . '], update data: ' . @json_encode($customData));
                $customResult = $this->client->contacts('xml')->update($contactId, $customData);
            }

            // Also optin the user
            if ($contactId) {
                $optinResult  = $this->client->emails->optIn($contactData['Email'], $leadOptions->getOptinReason());
                Log::debug('[INFUSIONSOFT] Optin result for [' . $contactId . '], result: ' . @json_encode($optinResult));
            }

            // And assign to a tag if needed
            if ($contactId and $tags = $optinData->tags()) {
                foreach ($tags as $tag) {
                    Log::debug("[INFUSIONSOFT] Assign tag to user: [$tag]");
                    $assignResult = $this->client->contacts('xml')->addToGroup($contactId, $tag);

                    if ($assignResult) {
                        Log::debug("[INFUSIONSOFT] Tag assigned to user successfully: [$tag] / [$contactId] " . @json_encode($assignResult));
                    }
                }
            }

            // Also add GDPR tags
            if (class_exists('\OPDashboard\Services\GeoIp')) {
                $optinData->isFromEu = GeoIp::isFromEu();
            } else {
                $optinData->isFromEu = true;
            }
            $this->processGdprTags($optinData);

            Log::debug('[INFUSIONSOFT] User subscribed: ' . @json_encode($contactData));
            $result = $this->optinSuccessResult();
        } catch (Exception $e) {
            Log::error('[INFUSIONSOFT] Error on optin to InfusionSoft list [' . $listId . ']. ' . $e->getMessage());
            $this->throwOptinException($e);
        }

        return $result;
    }

    /**
     * Assign GDPR tags
     *
     * @param  array  $data
     * @param  array  $tags
     * @return string
     */
    public function assignGdprTags(OptinData $data, array $tags)
    {
        $contactId = $data->contactId;

        if ($contactId and $tags) {
            foreach ($tags as $tagId => $tag) {
                Log::debug("[INFUSIONSOFT] [GDPR] Assigning GDPR tag [$tagId] to user [$contactId]");
                $assignResult = $this->client->contacts('xml')->addToGroup($contactId, $tagId);

                if ($assignResult) {
                    Log::debug("[INFUSIONSOFT] [GDPR] GDPR Tag assigned to user successfully: [$tagId] " . @json_encode($assignResult));
                }
            }
        }

        return true;
    }

    /**
     * Apply some tags to existing user
     *
     * @param  string $userId
     * @param  mixed  $tagId
     * @return mixed
     */
    public function applyTag($userId, $tagId)
    {
        $tagged = $this->client->contacts->addToGroup($userId, $tagId);
        Log::debug("[INFUSIONSOFT] User tagged: $userId / $tagId / ".@json_encode($tagged));

        return $tagged;
    }

    /**
     * Return OAuth token for this integration
     *
     * @return string
     */
    public function getToken()
    {
        return $this->integration->getConnectionValue('token');
    }

    /**
     * Return OAuth refrresh token for this integration
     *
     * @return string
     */
    public function getRefreshToken()
    {
        return $this->integration->getConnectionValue('refresh_token');
    }

    /**
     * Return token secret for this integration (not needed for MC
     *
     * @return mixed
     */
    public function getTokenSecret()
    {
        return $this->integration->getConnectionValue('token_secret');
    }

    /**
     * Client ID from env var
     *
     * @return string
     */
    public function getEnvClientId()
    {
        return getenv('INFUSIONSOFT_CLIENT_ID');
    }

    /**
     * Client secret from env var
     *
     * @return string
     */
    public function getEnvClientSecret()
    {
        return getenv('INFUSIONSOFT_CLIENT_SECRET');
    }
}
