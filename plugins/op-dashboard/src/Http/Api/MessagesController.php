<?php

namespace OPDashboard\Http\Api;

use function OPDashboard\mark_broadcast_message_read;
use OptimizePress\Integrations\Storage\IntegrationWpRepository;
use WP_REST_Request;

class MessagesController extends Controller
{
    /**
     * Mark a broadcast message as read
     *
     * @param WP_REST_Request $request
     * @return array
     */
    public static function markRead(WP_REST_Request $request)
    {
        $uid = $request->get_param('uid');

        if ($uid) {
            mark_broadcast_message_read($uid);
        }

        return ['success' => true, 'message' => 'Message read.'];
    }
}
