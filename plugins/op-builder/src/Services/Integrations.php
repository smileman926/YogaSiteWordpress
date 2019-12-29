<?php

namespace OPBuilder\Services;

use Exception;
use OPDashboard\Providers\RecaptchaProvider;
use OPDashboard\Services\GeoIp;
use OptimizePress\Integrations\IntegrationConfig;
use OptimizePress\Integrations\Mail\WpMailer;
use OptimizePress\Integrations\OptinData;
use OPBuilder\Repositories\PageRepository;
use OptimizePress\Integrations\OptinErrorResult;
use OptimizePress\Integrations\OptinResult;
use OptimizePress\Integrations\Services\Exceptions\AlreadySubscribedException;
use OptimizePress\Integrations\Services\Exceptions\OptinException;
use OptimizePress\Integrations\Storage\IntegrationWpRepository;
use OptimizePress\Integrations\Integration;
use function OptimizePress\Support\array_get;
use WP_REST_Request;

class Integrations
{
    /**
     * Run optin from WP REST request (API)
     *
     * @param WP_REST_Request $request
     * @return OptinResult
     */
    public function optinFromRESTRequest(WP_REST_Request $request)
    {
        // first we will check reCaptcha
        $recaptchaProvider = new RecaptchaProvider;

        if (! empty($recaptchaProvider->getGoogleReCaptchaSiteKey())
                && ! empty($recaptchaProvider->getGoogleReCaptchaSecret())) {
            if (! $recaptchaProvider->isInvisibleReCaptchaTokenValid()) {
                op3_log()->error('[INTEGRATIONS] Re-captcha token is invalid. Check site key or domain.');

                // if recaptcha is invalid, we are returning success response
                // so the bot is unaware that something went wrong
                return new OptinResult([
                    'success' => true,
                    'message' => 'Success',
                ]);
            }
        }

        // We need to fetch page and element data for optin processing
        $currentPageId  = $request->get_param('optin-current-page-id');
        $formElementUid = $request->get_param('optin-current-element-uuid');
        $pages          = new PageRepository;
        $page           = $pages->findOrFail($currentPageId, false);
        $elementOptions = $page->getElementOptions($formElementUid);

        // Now let's prepare required params
        $integrationId    = array_get($elementOptions, 'optinIntegration');
        $listId           = array_get($elementOptions, 'optinList');
        $tagId            = array_get($elementOptions, 'optinTag');
        $goalId           = array_get($elementOptions, 'optinGoal');
        $webhookUrl       = array_get($elementOptions, 'optinWebhookUrl');
        $formId           = array_get($elementOptions, 'optinFormId');
        $doubleOptin      = array_get($elementOptions, 'optinDoubleOptin');
        $destinationEmail = array_get($elementOptions, 'adminEmail');

        // GDPR stuff
        $gdprConfirmed1     = array_get($elementOptions, 'optinGdprConsent1TagConfirmed');
        $gdprDeclined1      = array_get($elementOptions, 'optinGdprConsent1TagDeclined');
        $gdprNotShown1      = array_get($elementOptions, 'optinGdprConsent1TagNotShown');
        $gdprConfirmed2     = array_get($elementOptions, 'optinGdprConsent2TagConfirmed');
        $gdprDeclined2      = array_get($elementOptions, 'optinGdprConsent2TagDeclined');
        $gdprNotShown2      = array_get($elementOptions, 'optinGdprConsent2TagNotShown');

        // can be all, eu or off
        $gdprLocation  = array_get($elementOptions, 'optinGdprActivate');

        // where to store gdpr note
        $gdprNote = array_get($elementOptions, 'optinGdprFieldNote');

        // Also filter out optin data
        $data = $this->filterOptinData($request->get_params());

        // Now let's find the integration
        $integration = $this->findByProvider($integrationId);

        // Run optin
        return $this->optin($integration, [
            'list_id'           => $listId,
            'tag_id'            => $tagId,
            'goal_id'           => $goalId,
            'webhook_url'       => $webhookUrl,
            'form_id'           => $formId,
            'double_optin'      => $doubleOptin,
            'destination_email' => $destinationEmail,
            'gdpr_confirmed_1'  => $gdprConfirmed1,
            'gdpr_declined_1'   => $gdprDeclined1,
            'gdpr_not_shown_1'  => $gdprNotShown1,
            'gdpr_confirmed_2'  => $gdprConfirmed2,
            'gdpr_declined_2'   => $gdprDeclined2,
            'gdpr_not_shown_2'  => $gdprNotShown2,
            'gdpr_location'     => $gdprLocation,
            'gdpr_note'         => $gdprNote,
            'data'              => $data,
        ]);
    }

    /**
     * Run optin from WP REST request that is coming from Smart Theme (API)
     *
     * @param WP_REST_Request $request
     * @return OptinResult
     */
    public function optinFromSmartThemeRESTRequest(WP_REST_Request $request)
    {
        // first we will check reCaptcha
        $recaptchaProvider = new RecaptchaProvider;

        if (! empty($recaptchaProvider->getGoogleReCaptchaSiteKey())
            && ! empty($recaptchaProvider->getGoogleReCaptchaSecret())) {
            if (! $recaptchaProvider->isInvisibleReCaptchaTokenValid()) {
                // if recaptcha is invalid, we are returning success response
                // so the bot is unaware that something went wrong
                return new OptinResult([
                    'success' => true,
                    'message' => 'Success',
                ]);
            }
        }

        // We need to fetch request data for optin processing
        $data             = $this->filterOptinData($request->get_params());


        // Now let's prepare required params
        $integrationId    = array_get($data, 'optinIntegration');
        $listId           = array_get($data, 'optinList');
        $tagId            = array_get($data, 'optinTag');
        $goalId           = array_get($data, 'optinGoal');
        $destinationEmail = array_get($data, 'adminEmail');

        // GDPR stuff
        $gdprConfirmed1     = array_get($data, 'optinGdprConsent1TagConfirmed');
        $gdprDeclined1      = array_get($data, 'optinGdprConsent1TagDeclined');
        $gdprNotShown1      = array_get($data, 'optinGdprConsent1TagNotShown');
        $gdprConfirmed2     = array_get($data, 'optinGdprConsent2TagConfirmed');
        $gdprDeclined2      = array_get($data, 'optinGdprConsent2TagDeclined');
        $gdprNotShown2      = array_get($data, 'optinGdprConsent2TagNotShown');
        // can be all, eu or off
        $gdprLocation       = array_get($data, 'optinGdprActivate');

        // where to store gdpr note
        $gdprNote           = array_get($data, 'optinGdprFieldNote');

        // Now let's find the integration
        $integration = $this->findByProvider($integrationId);

        // Run optin
        return $this->optin($integration, [
            'list_id'           => $listId,
            'tag_id'            => $tagId,
            'goal_id'           => $goalId,
            'destination_email' => $destinationEmail,
            'gdpr_confirmed_1'  => $gdprConfirmed1,
            'gdpr_declined_1'   => $gdprDeclined1,
            'gdpr_not_shown_1'  => $gdprNotShown1,
            'gdpr_confirmed_2'  => $gdprConfirmed2,
            'gdpr_declined_2'   => $gdprDeclined2,
            'gdpr_not_shown_2'  => $gdprNotShown2,
            'gdpr_location'     => $gdprLocation,
            'gdpr_note'         => $gdprNote,
            'data'              => $data,
        ]);
    }

    /**
     * Filter the data we send to the optin
     *
     * @param  array $data
     * @return array
     */
    public function filterOptinData($data)
    {
        if (isset($data['admin-email'])) {
            $data['destination_email'] = $data['admin-email'];
        }

        unset(
            $data['optin-integration'],
            $data['optin-list'],
            $data['optin-tag'],
            $data['optin-goal'],
            $data['optin-webhook-url'],
            $data['optin-post-action'],
            $data['optin-post-action-notification-text'],
            $data['optin-post-action-notification-tex'],
            $data['optin-post-action-redirect-url'],
            $data['optin-post-action-redirect-autofill'],
            $data['admin-email'],
            $data['optin-post-action-popoverlay-trigger'],
            $data['optin-post-action-funnel-step'],
            $data['op3-dummy']
        );

        return $data;
    }

    /**
     * Run optin process for integration
     *
     * @param  mixed  $integration
     * @param  array  $requestData
     * @return OptinResult
     */
    public function optin($integration, $requestData = [])
    {
        $data             = (array) array_get($requestData, 'data');
        $email            = $this->getEmailFromRequestData($requestData);
        $listId           = array_get($requestData, 'list_id');
        $tagId            = array_get($requestData, 'tag_id');
        $goalId           = array_get($requestData, 'goal_id');
        $webhookUrl       = array_get($requestData, 'webhook_url');
        $formId           = array_get($requestData, 'form_id');
        $doubleOptin      = array_get($requestData, 'double_optin');
        $destinationEmail = array_get($requestData, 'destination_email');
        $gdprLocation     = array_get($requestData, 'gdpr_location');
        $integrationTitle = ($integration && $integration->config && is_a($integration->config, IntegrationConfig::class)) ? $integration->config->title : 'Integration';

        // Default response object
        $response = new OptinErrorResult([
            'integration' => $integration,
            'listId'      => $listId,
            'message'     => 'Optin not complete.',
        ]);

        // GDPR stuff
        $gdpr                  = [];
        $gdpr['gdpr_location'] = $gdprLocation;
        $showGdpr              = true;
        $isFromEu              = GeoIp::isFromEu();

        if ($gdprLocation === 'eu' && ! $isFromEu && class_exists('OPDashboard\Services\GeoIp')) {
            $showGdpr = false;
        }

        if (isset($data['optin-gdpr-consent-1']) && $data['optin-gdpr-consent-1'] != '') {
            if ($showGdpr) {
                if ($data['optin-gdpr-consent-1'] == '1') {
                    $gdpr['gdpr_confirmed_1'] = array_get($requestData, 'gdpr_confirmed_1');
                } else {
                    $gdpr['gdpr_declined_1'] = array_get($requestData, 'gdpr_declined_1');
                }
            } else {
                $gdpr['gdpr_not_shown_1'] = array_get($requestData, 'gdpr_not_shown_1');
            }
        } else {
            if (!$showGdpr) {
                $gdpr['gdpr_not_shown_1'] = array_get($requestData, 'gdpr_not_shown_1');
            }
        }

        if (isset($data['optin-gdpr-consent-2']) && $data['optin-gdpr-consent-2'] != '') {
            if ($showGdpr) {
                if ($data['optin-gdpr-consent-2'] == '1') {
                    $gdpr['gdpr_confirmed_2'] = array_get($requestData, 'gdpr_confirmed_2');
                } else {
                    $gdpr['gdpr_declined_2'] = array_get($requestData, 'gdpr_declined_2');
                }
            } else {
                $gdpr['gdpr_not_shown_2'] = array_get($requestData, 'gdpr_not_shown_2');
            }
        } else {
            if (!$showGdpr) {
                $gdpr['gdpr_not_shown_2'] = array_get($requestData, 'gdpr_not_shown_2');
            }
        }

        if (! $integration) {
            return new OptinErrorResult([
                'integration' => $integration,
                'listId'      => $listId,
                'message'     => 'Please check your connection to the integration provider.',
            ]);
        }

        // Then try to optin
        if ($integration and $email) {
            // Now let's prepare the lead options
            $optinData = new OptinData(array_merge($data, ['email' => $email]));

            // add integration title
            if (method_exists($optinData, 'setIntegration')) {
                $optinData->setIntegration($integrationTitle);
            }

            // Add list if needed
            if ($listId and $listId != "-") {
                $optinData->setListId($listId);
            }

            // Add webhook URL if needed
            if ($webhookUrl && method_exists($optinData, 'setWebhookUrl')) {
                $optinData->setWebhookUrl($webhookUrl);
            }

            // Add form id if needed
            if ($formId && method_exists($optinData, 'setFormId')) {
                $optinData->setFormId($formId);
            }

            // Add double optin if needed
            if ($doubleOptin && method_exists($optinData, 'setDoubleOptin')) {
                $optinData->setDoubleOptin($doubleOptin);
            }

            // Add tag if needed
            if ($tagId and $tagId != "-") {
                $optinData->setTags([$tagId]);
            }

            // Add tag if needed
            if ($goalId and $goalId != "-") {
                $optinData->setGoals([$goalId]);
            }

            // Add destination email if needed
            if ($destinationEmail) {
                $optinData->setDestinationEmail($destinationEmail);
            }

            // Add GDPR stuff if exists
            if (method_exists($optinData, 'setGdprFields')) {
                $optinData->setGdprFields($gdpr);
            }

            // And run the optin process
            try {
                $result = $integration->optin($optinData);

                if ($result->isSuccessful()) {
                    $response = new OptinResult([
                        'integration' => $integration,
                        'listId'      => $listId,
                        'message'     => 'Success',
                    ]);

                // Maybe something went wrong
                } else {
                    $response = new OptinErrorResult([
                        'integration' => $integration,
                        'listId'      => $listId,
                        'message'     => $result->message(),
                    ]);
                }

            // Handle if email is already subscribed
            } catch (AlreadySubscribedException $e) {
                $response = new OptinErrorResult([
                    'integration' => $integration,
                    'listId'      => $listId,
                    'message'     => $e->getMessage(),
                    'errorCode'   => $e->getCode(),
                ]);

            // Optin failed because of a server error
            } catch (OptinException $e) {
                $response = new OptinErrorResult([
                    'integration' => $integration,
                    'listId'      => $listId,
                    'message'     => $e->getMessage(),
                    'errorCode'   => $e->getCode(),
                ]);

            // All other errors
            } catch (Exception $e) {
                $response = new OptinErrorResult([
                    'integration' => $integration,
                    'listId'      => $listId,
                    'message'     => $e->getMessage(),
                    'errorCode'   => $e->getCode(),
                ]);
            }
        }

        return $response;
    }

    /**
     * Find email address in request data
     *
     * @param  array $requestData
     * @return string
     */
    public function getEmailFromRequestData($requestData)
    {
        $email = array_get($requestData, 'email');

        // Find in different place
        // @TODO: Refactor this to be uniform for all providers
        if (! $email) $email = array_get($requestData, 'data.email');
        if (! $email) $email = array_get($requestData, 'data.inf_field_Email');

        return $email;
    }

    /**
     * Find integration by provider name
     *
     * @param  string $integrationId
     * @return mixed|Integration
     */
    public function findByProvider($integrationId)
    {
        // Build new Email service integration
        if ($integrationId === 'email') {
            $integration = new Integration($integrationId, []);

            // Set the mail driver
            $integration->service()->setMailer(new WpMailer);

            return $integration;

        }

        // Build new webhook integration
        if ($integrationId === 'zapier' || $integrationId === 'webhook') {
            $integration = new Integration($integrationId, []);

            return $integration;
        }

        // Find the integration in the database
        $repo = new IntegrationWpRepository;

        return $repo->findByProvider($integrationId);
    }

    /**
     * Fetch all integration on a OP3 page
     *
     * @param  int  $pageId
     * @return array|mixed
     */
    public function getPageIntegrations($pageId)
    {
        $integrations = [];

        // And finally fetch the integrations
        if (op3_dashboard_enabled()) {
            // First let's find the page
            $pages  = new PageRepository;
            $page   = $pages->find($pageId);

            if ($page) {
                // Try the cache
                $cacheKey = 'op_page_integrations_for_'.$pageId;
                $response = $this->cacheGet($cacheKey);

                if (! $response) {
                    $response = $page->getPageIntegrations();

                    // Save to cache
                    $this->cachePut($cacheKey, $response);
                }

                $integrations = $response;
            }
        }

        return $integrations;
    }

    /**
     * Fetch from transient API
     *
     * @param  string $key
     * @return mixed
     */
    public function cacheGet($key)
    {
        $payload = get_transient($key);

        return @json_decode($payload) ?: $payload;
    }

    /**
     * Save to transient API
     *
     * @param string $key
     * @param mixed  $payload
     * @param int    $ttl
     */
    public function cachePut($key, $payload, $ttl = 1)
    {
        $cacheTtl = $ttl * 60;

        if (! is_string($payload)) {
            $payload = @json_encode($payload);
        }

        set_transient($key, $payload, $cacheTtl);
    }
}
