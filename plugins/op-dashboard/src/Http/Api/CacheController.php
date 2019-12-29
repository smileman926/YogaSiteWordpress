<?php

namespace OPDashboard\Http\Api;

use function OPDashboard\clear_all_cache;
use OptimizePress\Integrations\Storage\IntegrationWpRepository;
use WP_REST_Request;

class CacheController extends Controller
{
    /**
     * Clear all OP cache
     *
     * @param WP_REST_Request $request
     * @return array
     */
    public static function clear(WP_REST_Request $request)
    {
        clear_all_cache();

        return ['success' => true, 'message' => 'Cache cleared.'];
    }
}
