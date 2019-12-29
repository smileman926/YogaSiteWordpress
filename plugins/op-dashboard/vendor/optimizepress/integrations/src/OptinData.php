<?php

namespace OptimizePress\Integrations;

use function OptimizePress\Support\array_except;
use OptimizePress\Support\Collection;

class OptinData
{
    /**
     * @var string
     */
    protected $email;

    /**
     * @var string
     */
    protected $destinationEmail;

    /**
     * @var string
     */
    protected $listId;

    /**
     * @var array
     */
    protected $tags;

    /**
     * @var array
     */
    protected $goals;

    /**
     * @var string
     */
    protected $webhookUrl;

    /**
     * @var string
     */
    protected $formId;

    /**
     * @var string
     */
    protected $doubleOptinCheckbox;

    /**
     * @var array
     */
    protected $formData = [];

    /**
     * @var array
     */
    protected $data;

    /**
     * @var array
     */
    protected $gdprFields;
    /**
     * @var string
     */
    protected $integration;

    /**
     * Init optin data
     *
     * @param array|null $data
     */
    public function __construct(array $data = null)
    {
        // Set the data
        if (isset($data['email']))             $this->setEmail($data['email']);
        if (isset($data['destination_email'])) $this->setDestinationEmail($data['destination_email']);
        if (isset($data['target_email']))      $this->setDestinationEmail($data['target_email']);
        if (isset($data['inf_field_Email']))   $this->setEmail($data['inf_field_Email']);
        if (isset($data['Email']))             $this->setEmail($data['Email']);
        if (isset($data['tags']))              $this->setEmail($data['tags']);
        if (isset($data['goals']))             $this->setGoals($data['goals']);
        if (isset($data['list_id']))           $this->setListId($data['list_id']);
        if (isset($data['listId']))            $this->setListId($data['listId']);
        if (isset($data['list']))              $this->setListId($data['list']);
        if (isset($data['form_data']))         $this->setFormData($data['form_data']);
        if (isset($data['formData']))          $this->setFormData($data['formData']);

        // Set rest of data
        $this->data = $data;

        // Check other data
        if (isset($data['first_name'])) $this->formData['first_name'] = $data['first_name'];
        if (isset($data['last_name']))  $this->formData['last_name']  = $data['last_name'];
        if (isset($data['firstname']))  $this->formData['last_name']  = $data['firstname'];
        if (isset($data['lastname']))   $this->formData['last_name']  = $data['lastname'];
        $this->formData['email'] = $this->email();
    }

    /**
     * Return optin data
     *
     * @param  string $key
     * @param  mixed  $default
     * @return mixed
     */
    public function data($key = null, $default = null)
    {
        if ($key) {
            if (isset($this->data[$key])) {
                return $this->data[$key];
            } else {
                return $default;
            }
        } elseif (! $key) {
            return $this->data;
        }
    }

    /**
     * Same as the 'data' method
     *
     * @param  string $key
     * @param  mixed  $default
     * @return mixed
     */
    public function get($key = null, $default = null)
    {
        return $this->data($key, $default);
    }

    /**
     * Shorthand to return all data as an array
     *
     * @return array
     */
    public function all()
    {
        return $this->toArray();
    }

    /**
     * Return all optin data except these keys
     *
     * @param  mixed $keys
     * @return array
     */
    public function except($keys)
    {
        return array_except($this->all(), $keys);
    }

    /**
     * Check if there is any data set
     *
     * @return bool
     */
    public function isEmpty()
    {
        return (bool) empty($this->data);
    }

    /**
     * @param string $integration
     */
    public function setIntegration($integration)
    {
        $this->integration = $integration;
    }

    /**
     * @return string
     */
    public function getIntegration()
    {
        return $this->integration;
    }

    /**
     * Set lead option tags
     *
     * @param array $tags
     */
    public function setTags(array $tags)
    {
        $this->tags = new Collection($tags);
    }

    /**
     * Return tags
     *
     * @return array
     */
    public function tags()
    {
        return $this->tags;
    }

    /**
     * Return the first set tag
     *
     * @return int
     */
    public function firstTag()
    {
        if ($this->tags && count($this->tags)) {
            return $this->tags->first();
        }
    }

    /**
     * Set lead option tags
     *
     * @param array $goals
     */
    public function setGoals(array $goals)
    {
        $this->goals = new Collection($goals);
    }

    /**
     * Return tags
     *
     * @return array
     */
    public function goals()
    {
        return $this->goals;
    }

    /**
     * Return filtered tags (remove empty ones via array_filter callback).
     * @param  array $tags
     * @return array
     */
    public function cleanEmptyTags($tags)
    {
        return array_filter($tags, array($this, 'discardNullTag'));
    }

    /**
     * Discard tag (return false) if tag is either empty string or if it is "-".
     * @param  string $tag
     * @return boolean
     */
    protected function discardNullTag($tag)
    {
        $tag = trim($tag);

        return ! empty($tag) && '-' !== $tag;
    }

    /**
     * Set lead option GDPR fields
     *
     * @param array $gdprFields
     */
    public function setGdprFields(array $gdprFields)
    {
        $this->gdprFields = $gdprFields;
    }

    /**
     * Return tags
     *
     * @return array
     */
    public function getGdprFields()
    {
        return $this->gdprFields;
    }

    /**
     * Set the optin email
     *
     * @param $email
     */
    public function setEmail($email)
    {
        $this->email = $email;
    }

    /**
     * Set the destination email address for email integration
     *
     * @param $email
     */
    public function setDestinationEmail($email)
    {
        $this->destinationEmail = $email;
    }

    /**
     * Optin email
     *
     * @return string
     */
    public function email()
    {
        return $this->email;
    }

    /**
     * Destination email address for email integration
     *
     * @return string
     */
    public function destinationEmail()
    {
        return $this->destinationEmail;
    }

    /**
     * Fetch optin first name
     *
     * @param  string $default
     * @return string
     */
    public function firstName($default = null)
    {
        return $this->data('first_name', $default);
    }

    /**
     * Fetch optin last name
     *
     * @param  string $default
     * @return string
     */
    public function lastName($default = null)
    {
        return $this->data('last_name', $default);
    }

    /**
     * Combine first and last name
     *
     * @param  string $default
     * @return string
     */
    public function fullName($default = null)
    {
        return trim($this->firstName() . ' ' . $this->lastName()) ?: $default;
    }

    /**
     * Set integration list ID
     *
     * @param $listId
     */
    public function setListId($listId)
    {
        $this->listId = $listId;
    }

    /**
     * Get list ID for optin
     *
     * @return mixed
     */
    public function listId()
    {
        return $this->listId;
    }

    /**
     * Set integration list ID
     *
     * @param string $url
     */
    public function setWebhookUrl($url)
    {
        $this->webhookUrl = $url;
    }

    /**
     * Set integration list ID
     *
     * @return string
     */
    public function webhookUrl()
    {
        return $this->webhookUrl;
    }

    /**
     * Set integration form ID
     *
     * @param $formId
     */
    public function setFormId($formId)
    {
        $this->formId = $formId;
    }

    /**
     * Set integration list ID
     *
     * @return string
     */
    public function formId()
    {
        return $this->formId;
    }

    /**
     * Set integration form ID
     *
     * @param $formId
     */
    public function setDoubleOptionCheckbox($doubleOptinCheckbox)
    {
        $this->doubleOptinCheckbox = $doubleOptinCheckbox;
    }

    /**
     * Set integration list ID
     *
     * @return string
     */
    public function doubleOptinCheckbox()
    {
        return $this->doubleOptinCheckbox;
    }

    /**
     * Set data submitted by the form
     * @TODO: Maybe filter out some things here
     *
     * @param $data
     */
    public function setFormData($data)
    {
        $this->formData = $data;
    }

    /**
     * Return the form data
     *
     * @return array
     */
    public function formData()
    {
        return $this->formData;
    }

    /**
     * Convert to array
     *
     * @return array|null
     */
    public function toArray()
    {
        return $this->data;
    }
}
