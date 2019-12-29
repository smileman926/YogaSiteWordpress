<?php

namespace OptimizePress\Integrations\Services\Integrations;

use Exception;
use ActiveCampaign;
use OPDashboard\Services\GeoIp;
use OptimizePress\Integrations\Collections\IntegrationFieldsCollection;
use OptimizePress\Integrations\Collections\IntegrationFormsCollection;
use OptimizePress\Integrations\Collections\IntegrationListsCollection;
use OptimizePress\Integrations\Collections\IntegrationTagsCollection;
use OptimizePress\Integrations\Integration;
use OptimizePress\Integrations\IntegrationList;
use OptimizePress\Integrations\IntegrationField;
use OptimizePress\Integrations\IntegrationTag;
use OptimizePress\Integrations\LeadOptions;
use OptimizePress\Integrations\OptinData;
use OptimizePress\Integrations\OptinResult;
use OptimizePress\Integrations\Services\Contracts\BaseIntegration;
use OptimizePress\Integrations\Services\Contracts\IntegrationHasTagsInterface;
use OptimizePress\Integrations\Services\Contracts\IntegrationServiceInterface;
use OptimizePress\Integrations\Services\Exceptions\AlreadySubscribedException;
use OptimizePress\Integrations\Services\Exceptions\OptinException;
use OptimizePress\Support\Log\Log;
use function OptimizePress\Support\object_get;

/**
 * Infusionsoft service class for integration
 */
class ActiveCampaignIntegration extends BaseIntegration implements IntegrationServiceInterface, IntegrationHasTagsInterface
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
        $this->client = new ActiveCampaign($integration->getConnectionValue('api_url'), $integration->getConnectionValue('api_key'));
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
            $result = $this->client->api("account/view");

            if ($result and isset($result->success) and $result->success) {
                return true;
            }
        } catch (Exception $e) {
            Log::error('[ACTIVECAMPAIGN] ' . $e->getMessage());
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
            $list = [
                "ids"   => "all",
                'full'  => true,
            ];
            $result = $this->client->api("list/list", $list);

            if ($result) {
                $lists = new IntegrationListsCollection;

                foreach ($result as $key => $list) {
                    if (is_object($list)) {
                        $list = $this->listObject((array) $list);
                        $lists->push($list);
                    }
                }
            }
        } catch (Exception $e) {
            Log::error('[ACTIVECAMPAIGN] ' . $e->getMessage());
        }

        return isset($lists) ? $lists : null;
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
            $result = $this->client->api("list/view?id=".$listId);

            if ($result) {
                $list = $this->listObject((array) $result);
            }
        } catch (Exception $e) {
            Log::error('[ACTIVECAMPAIGN] ' . $e->getMessage());
        }

        return isset($list) ? $list : null;
    }

    /**
     * Fetch all tags
     *
     * @return IntegrationTagsCollection|null
     */
    public function getTags()
    {
        try {
            $tags = new IntegrationTagsCollection;
            $result = $this->client->api('tag/list');

            if ($result) {
                $tags = new IntegrationTagsCollection;

                $decoded = @json_decode($result);

                foreach ($decoded as $tag) {
                    $tags->push(new IntegrationTag([
                        'id' => $tag->name,
                        'name' => $tag->name,
                    ]));
                }

                //error_log('[ACTIVECAMPAIGN] ' . print_r($tags, true));
            }
        } catch (Exception $e) {
            Log::error('[ACTIVECAMPAIGN] ' . $e->getMessage());
        }

        return isset($tags) ? $tags : null;


    }

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
     * Return a list of all forms for the lead options
     *
     * @return IntegrationFormsCollection
     */
    public function getForms()
    {
        try {
            $result = $this->client->api('form/getforms');

            if ($result) {
                $forms = new IntegrationFormsCollection;

                foreach ($result as $key => $form) {
                    if (is_numeric($key)) {
                        $forms->push($form);
                    }
                }
            }
        } catch (Exception $e) {
            Log::error('[ACTIVECAMPAIGN] ' . $e->getMessage());
        }

        return isset($forms) ? $forms : null;
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

        // Always add some fields
        $field = new IntegrationField(['id' => 'first_name', 'name' => 'first_name', 'label' => 'First Name',   'optin_id' => 'first_name', 'enabled' => true, 'required' => false, 'order' => 1, 'type' => 'text']);
        $fields->push($field);
        $field = new IntegrationField(['id' => 'last_name',  'name' => 'last_name',  'label' => 'Last Name',    'optin_id' => 'last_name',  'enabled' => true, 'required' => false, 'order' => 2, 'type' => 'text']);
        $fields->push($field);
        $field = new IntegrationField(['id' => 'email',      'name' => 'email',      'label' => 'E-Mail',       'optin_id' => 'email',      'enabled' => true,  'required' => true,  'order' => 3, 'type' => 'email']);
        $fields->push($field);
        $field = new IntegrationField(['id' => 'phone',      'name' => 'phone',      'label' => 'Phone',        'optin_id' => 'phone',      'enabled' => true, 'required' => false, 'order' => 4, 'type' => 'text']);
        $fields->push($field);
        $field = new IntegrationField(['id' => 'orgname',    'name' => 'orgname',    'label' => 'Organization', 'optin_id' => 'orgname',    'enabled' => true, 'required' => false, 'order' => 5, 'type' => 'text']);
        $fields->push($field);
        $field = new IntegrationField(['id' => 'tags',       'name' => 'tags',       'label' => 'Tags',         'optin_id' => 'tags',       'enabled' => true, 'required' => false, 'order' => 6, 'type' => 'text']);
        $fields->push($field);

        try {
            $result = $this->client->api('list/view?global_fields=true&id=' . $listId);

            if ($result && isset($result->fields)) {
                foreach ($result->fields as $key => $mergeField) {
                    $type = object_get($mergeField, 'type', 'text');

                    if ($type === 'dropdown') {
                        $type = 'select';
                    } elseif ($type === 'listbox') {
                        $type = 'multiselect';
                    } elseif ($type === 'checkbox') {
                        $type = 'check';
                    }

                    $field = new IntegrationField([
                        'id'       => 'customfield_id_' . $mergeField->id,
                        'name'     => 'customfield_id_' . $mergeField->id,
                        'label'    => $mergeField->title,
                        'optin_id' => 'customfield_id_' . $mergeField->id,
                        'enabled'  => true,
                        'required' => false,
                        'order'    => (1000 + (int) $key),
                        'type'     => $type,
                    ]);

                    // For select/radio fields we also add the provided options
                    if (in_array($type, ['select', 'radio', 'check', 'multiselect']) and $options = object_get($mergeField, 'options')) {
                        foreach ($options as $optionKey => $option) {
                            $field->addOptionValue($option->value, $option->name);
                        }
                    }

                    $fields->push($field);
                }
            }
        } catch (Exception $e) {
            Log::error('[INTEGRATION] [ACTIVECAMPAIGN] ' . $e->getMessage());
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
        // Optin integration data
        $result            = $this->optinErrorResult();
        $email             = $optinData->email();
        $listId            = $optinData->listId();
        $integrationFields = $this->getFields($listId);
        $optinTags         = $optinData->tags();
        $formId            = $optinData->formId();
        $data              = $optinData->data();

        try {
            $fields['p[' . $listId . ']'] = $listId;
            $fields['status'] = 1;
            if (!empty($formId)) {
                $fields['form'] = $formId;
            }
            // Triggering instant responders
            $fields['instantresponders'] = 1;

            foreach ($integrationFields as $input) {
                if ($input->enabled) {
                    // Check if the field is a custom field
                    if (strrpos($input->id, 'customfield_id_') !== false) {
                        $customID = str_replace('customfield_id_', '', $input->id);
                        if (isset($data[$input->id])) {
                            $fields['field[' . $customID . ',0]'] = $data[$input->id];
                        }
                    } else {
                        if ($optinData->get($input->id)) {
                            $fields[$input->optin_id] = $optinData->get($input->name);
                        }
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

            $gdprTags = [];
            if (!empty($gdpr)) {
                foreach ($gdpr as $tag) {
                    $gdprTags[] = $tag['id'];
                }
            }

            // Also add tags if needed
            $realTags = [];
            if (!empty($optinTags)) {
                foreach ($optinTags as $tag) {
                    $realTags[] = $tag;
                }
            }

            $allTags = array_merge($gdprTags, $realTags);

            $fields['tags'] = implode(', ', $allTags);

            // First we try to create a new contact
            $response = $this->client->api('contact/sync', $fields);

            // If we get a contact back, we need to update the contact
            if ($response and $response->success) {
                Log::debug('[ACTIVECAMPAIGN] User subscribed: ' . $email . " to list $listId");

                $note = $this->getGdprNote($optinData);
                $this->saveGdprNote($listId, $response->subscriber_id, $note);

                $result = $this->optinSuccessResult();
            }
        } catch (Exception $e) {
            Log::error("[ACTIVECAMPAIGN] Error when subscribing to list [$listId]. " . $e->getMessage());
            $this->throwOptinException($e);
        }

        return $result;
    }

    /**
     * Save GDPR note.
     * @param  string $listId
     * @param  string $subscriberId
     * @param $note
     * @return mixed
     */
    protected function saveGdprNote($listId, $subscriberId, $note)
    {
        if ( ! empty($note)) {
            $status = $this->client->api('contact/note/add', array(
                'id' => $subscriberId,
                'note' => $note,
                'listid' => $listId,
            ));

            return $status;
        }
    }
}
