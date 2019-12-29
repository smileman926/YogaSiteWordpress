<?php

namespace OPDashboard\Providers;

class RecaptchaProvider
{
    protected $googleReCaptchaSiteKey = false;

    protected $googleReCaptchaSecret = false;

    protected $requestIsValid = -1;

    public function __construct()
    {
        $this->googleReCaptchaSiteKey = get_option('opd_recaptcha_site_key');
        $this->googleReCaptchaSecret = get_option('opd_recaptcha_secret_key');
    }

    /**
     * Init Gutenberg functionality and hooks/actions
     */
    public function init()
    {
        $this->googleReCaptchaSiteKey = get_option('opd_recaptcha_site_key');
        $this->googleReCaptchaSecret = get_option('opd_recaptcha_secret_key');

        $isOp3Admin = false;

        if (function_exists('op3_is_admin')) {
            $isOp3Admin = op3_is_admin();
        }

        // enqueue Google ReCaptcha v3
        // script only on frontend
        // and only if needed
        if (! $isOp3Admin && ! is_admin()) {
            if (!empty($this->googleReCaptchaSiteKey) && !empty($this->googleReCaptchaSecret)) {
                add_action('wp_enqueue_scripts',    [$this, "enqueueScripts"]);
            }
        }
    }

    /**
     * Enqueues script for GR
     */
    public function enqueueScripts()
    {
        wp_enqueue_script('op3-google-recaptcha', 'https://www.google.com/recaptcha/api.js?render=' . $this->googleReCaptchaSiteKey, array(), null, true);

        wp_localize_script('op3-google-recaptcha',
            'OP3', [
                'GoogleRecaptcha' => [
                    'googleRecaptchaSiteKey' => $this->getGoogleReCaptchaSiteKey()
                ]
            ]);
    }

    /**
     * Checks Google ReCaptcha return code
     *
     * @return bool
     */
    public function isInvisibleReCaptchaTokenValid()
    {
        $this->requestIsValid = true;

        if (empty( $_POST['op3-grecaptcha-token'] )) {
            return false;
        }

        $response = wp_remote_retrieve_body(
            wp_remote_get(
                add_query_arg(
                    array(
                        'secret'   => $this->googleReCaptchaSecret,
                        'response' => $_POST['op3-grecaptcha-token'],
                    ), 'https://www.google.com/recaptcha/api/siteverify')
            )
        );

        if (empty( $response )) {
            $this->requestIsValid = false;
        }

        $json = json_decode( $response );

        if (gettype( $json ) !== 'object' || empty( $json->success )) {
            $this->requestIsValid = false;
        }

        return $this->requestIsValid;
    }

    /**
     * @return bool|mixed
     */
    public function getGoogleReCaptchaSiteKey()
    {
        return $this->googleReCaptchaSiteKey;
    }

    /**
     * @return bool|mixed
     */
    public function getGoogleReCaptchaSecret()
    {
        return $this->googleReCaptchaSecret;
    }
}
