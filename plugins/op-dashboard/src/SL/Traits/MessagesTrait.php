<?php

namespace OPDashboard\SL\Traits;

use OPDashboard\Messages\Message;
use OPDashboard\Services\Cache;
use OptimizePress\Support\Collection;

trait MessagesTrait
{
    /**
     * Get all broadcasted messages from SL
     *
     * @return Collection
     */
    public static function getMessages()
    {
        return Cache::remember('opd_broadcasted_messages', OPD_CACHE_TTL_MESSAGES, function() {
            $response   = self::client()->request('GET', 'api/customer/messages');
            $data       = $response->data();
            $messages   = new Collection;

            if ($data) {
                foreach ($data as $dataMessage) {
                    $messages->push(new Message($dataMessage));
                }
            }

            return $messages;
        });
    }
}
