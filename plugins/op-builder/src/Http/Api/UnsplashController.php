<?php

namespace OPBuilder\Http\Api;

use WP_REST_Request;
use OPDashboard\Services\Cache;

// @todo
// before returning any data check if
// user is logged in (or if user is
// admin for some methods)

class UnsplashController extends Controller
{

    /**
     * Get popular photos from unsplash.
     *
     * @return mixed
     */
    public static function getPopularPhotos()
    {
        $http = wp_remote_get(OP3_UNSPLASH_BASE_URL . '/photos?order=popular&per_page=30&client_id=' . OP3_UNSPLASH_ACCESS_KEY);
        $headers = $http["headers"];

        preg_match_all("/<(.*?)>/", $headers["link"], $links);

        if (!is_array($http))
            return;

        return static::apiResponse([
            'photos' => $http['body'],
            'urls' => [
                'last' => $links[1][0],
                'next' => $links[1][1],
            ],
            'total' => $headers['x-total'],
        ]);
    }

    /**
     * Search unsplash photos by given query
     *
     * @return mixed
     */
    public static function searchPhotos(WP_REST_Request $request)
    {
        $query = $request->get_param('query');
        $http = wp_remote_get(OP3_UNSPLASH_BASE_URL . '/search/photos?query=' . $query . '&per_page=30&client_id=' . OP3_UNSPLASH_ACCESS_KEY);
        $headers = $http["headers"];

        preg_match_all("/<(.*?)>/", $headers["link"], $links);

        if (!is_array($http))
            return;

        return static::apiResponse([
            'response' => $http['body'],
            'urls' => [
                'last' => $links[1][0],
                'next' => $links[1][1],
            ],
        ]);
    }

    public static function triggerDownload(WP_REST_Request $request)
    {
        $id = $request->get_param('id');
        $http = wp_remote_get(OP3_UNSPLASH_BASE_URL . '/photos/' . $id . '/download?client_id=' . OP3_UNSPLASH_ACCESS_KEY);

        return static::apiResponse([
            'response' => $http['body'],
        ]);
    }
}
