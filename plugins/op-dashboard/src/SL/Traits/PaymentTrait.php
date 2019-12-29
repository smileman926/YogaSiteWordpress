<?php

namespace OPDashboard\SL\Traits;

use Exception;
use function OptimizePress\Support\array_get;

trait PaymentTrait
{
    /**
     * Create a webhook for a payment provider
     *
     * @param  string  $provider
     * @param  string  $url
     * @param  array   $options
     * @return object|bool
     * @throws Exception
     */
    /*public static function createPaymentWebhook($provider, $url, $options = [])
    {
        $response = self::client()->createPaymentWebhook($provider, $url, $options);

        if (! $response->isError()) {
            $data = (array) $response->data();

            return (object) [
                'provider'    => array_get($data, 'provider'),
                'id'          => array_get($data, 'webhook.id'),
                'url'         => array_get($data, 'webhook.url'),
                'application' => array_get($data, 'webhook.application'),
            ];
        }

        return false;
    }*/
}
