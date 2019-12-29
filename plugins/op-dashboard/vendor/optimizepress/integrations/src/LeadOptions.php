<?php

namespace OptimizePress\Integrations;

use OptimizePress\Support\Collection;

class LeadOptions
{
    /**
     * Lead options data
     *
     * @var array
     */
    protected $data;

    /**
     * Init lead options
     *
     * @param array|null $data
     */
    public function __construct(array $data = null)
    {
        $this->data = $data;
    }

    /**
     * Check if there are any lead options
     *
     * @return bool
     */
    public function areEmpty()
    {
        return (bool) empty($this->data);
    }

    /**
     * Check if double optin is enabled
     *
     * @return bool
     */
    public function doubleOptinEnabled()
    {
        return isset($this->data['double_optin']) ? (bool) $this->data['double_optin'] : false;
    }

    /**
     * Set the double optin option
     *
     * @param  bool  $doubleOptin
     * @return void
     */
    public function setDoubleOptin($doubleOptin = null)
    {
        if ($doubleOptin !== null) {
            $this->data['double_optin'] = $doubleOptin;
        }
    }

    /**
     * Check if welcome email is enabled
     *
     * @return bool
     */
    public function welcomeEmailEnabled()
    {
        return isset($this->data['welcome_email']) ? (bool) $this->data['double_optin'] : false;
    }

    /**
     * Set the welcome email option
     *
     * @param  bool  $welcomeEmail
     * @return void
     */
    public function setWelcomeEmail($welcomeEmail = null)
    {
        if ($welcomeEmail !== null) {
            $this->data['welcome_email'] = $welcomeEmail;
        }
    }

    /**
     * Return optin reason previously set or a default one.
     * Optin reason is needed by some integrations (such as InfusionSoft to make a contact "marketable").
     *
     * @return string
     */
    public function getOptinReason()
    {
        return isset($this->data['optin_reason']) ? $this->data['optin_reason'] : 'Contact Was Opted In through OptimizePress integrations';
    }

    /**
     * Set optin reason.
     *
     * @param string $reason
     * @return void
     */
    public function setOptinReason($reason)
    {
        $this->data['optin_reason'] = $reason;
    }

}
