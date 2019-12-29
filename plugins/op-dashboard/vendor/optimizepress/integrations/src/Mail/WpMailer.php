<?php

namespace OptimizePress\Integrations\Mail;

class WpMailer implements MailContract
{
    /**
     * Send mail via the wp_mail method
     *
     * @param  string $to
     * @param  string $subject
     * @param  string $message
     * @param  array $headers
     * @return bool
     */
    public function send($to, $subject, $message, $headers = [])
    {
        wp_mail($to, $subject, $message, $headers = '');

        return true;
    }
}
