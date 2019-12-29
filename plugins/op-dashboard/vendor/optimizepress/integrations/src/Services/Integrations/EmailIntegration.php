<?php

namespace OptimizePress\Integrations\Services\Integrations;

use Exception;
use iContact\iContactApi;
use OptimizePress\Integrations\Collections\IntegrationFieldsCollection;
use OptimizePress\Integrations\Integration;
use OptimizePress\Integrations\IntegrationTag;
use OptimizePress\Integrations\IntegrationList;
use OptimizePress\Integrations\IntegrationField;
use OptimizePress\Integrations\LeadOptions;
use OptimizePress\Integrations\Mail\MailContract;
use OptimizePress\Integrations\OptinData;
use OptimizePress\Integrations\OptinErrorResult;
use OptimizePress\Integrations\OptinResult;
use OptimizePress\Integrations\OptinSuccessResult;
use OptimizePress\Integrations\Services\Contracts\BaseIntegration;
use OptimizePress\Integrations\Services\Contracts\IntegrationServiceInterface;
use OptimizePress\Integrations\Collections\IntegrationListsCollection;
use OptimizePress\Integrations\Services\Exceptions\OptinException;

/**
 * Simple e-mail integration
 */
class EmailIntegration extends BaseIntegration implements IntegrationServiceInterface
{
    /**
     * @var MailContract
     */
    protected $mailer;

    /**
     * Init dependencies and service
     *
     * @param Integration $integration
     */
    public function __construct(Integration $integration)
    {
        // Initialize and setup
        $this->init($integration);
    }

    /**
     * Setup the mail transport
     *
     * @param MailContract $mailer
     */
    public function setMailer(MailContract $mailer)
    {
        $this->mailer = $mailer;
    }

    /**
     * Return true, always connected and ready
     *
     * @return bool
     */
    public function isReady()
    {
        return true;
    }

    /**
     * Return true, always connected
     *
     * @return bool
     */
    public function ping()
    {
        return true;
    }

    /**
     * Empty response
     *
     * @return IntegrationListsCollection
     */
    public function getLists()
    {
        return new IntegrationListsCollection;
    }

    /**
     * Empty response
     *
     * @param  string  $listId
     * @return IntegrationList
     */
    public function getList($listId)
    {
        return null;
    }

    /**
     * Get form fields (hardcoded fields for e-mail integration)
     *
     * @param  mixed  $listId
     * @return IntegrationFieldsCollection
     */
    public function getFields($listId = null)
    {
        $fields = new IntegrationFieldsCollection([
            new IntegrationField([
                'id'       => 'first_name',
                'name'     => 'first_name',
                'label'    => 'First name',
                'optin_id' => 'first_name',
                'required' => false,
                'enabled'  => false,
                'order'    => 1,
                'type'     => 'text',
            ]),
            new IntegrationField([
                'id'       => 'last_name',
                'name'     => 'last_name',
                'label'    => 'Last name',
                'optin_id' => 'last_name',
                'required' => false,
                'enabled'  => false,
                'order'    => 2,
                'type'     => 'text',
            ]),
            new IntegrationField([
                'id'       => 'email',
                'name'     => 'email',
                'label'    => 'E-Mail',
                'optin_id' => 'email',
                'required' => true,
                'enabled'  => true,
                'order'    => 3,
                'type'     => 'email',
            ]),
        ]);

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
        // Prepare result data
        $result = $this->optinErrorResult();

        if ($this->mailer) {
            $to       = $optinData->destinationEmail();
            $subject  = 'Optin from OptimizePress';
            $message  = 'Email: ' . $optinData->email() . PHP_EOL;
            $message .= 'First name: ' . $optinData->firstName() . PHP_EOL;
            $message .= 'Last name: ' . $optinData->lastName() . PHP_EOL;

            // Send the mail
            try {
                $this->mailer->send($to, $subject, $message);
                $result = $this->optinSuccessResult();
            } catch (Exception $e) {
                $this->throwOptinException($e);
            }
        }

        return $result;
    }
}
