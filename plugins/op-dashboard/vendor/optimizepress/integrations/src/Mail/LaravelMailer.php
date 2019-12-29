<?php

namespace OptimizePress\Integrations\Mail;

class LaravelMailer implements MailContract
{
    /**
     * Send mail via the Laravel mailer
     *
     * @param  string $to
     * @param  string $subject
     * @param  string $message
     * @param  array $headers
     * @return bool
     */
    public function send($to, $subject, $message, $headers = [])
    {
        return true;
    }
}
