<?php

namespace OptimizePress\Integrations\Mail;

interface MailContract
{
    public function send($to, $subject, $message, $headers = []);
}
