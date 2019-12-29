<?php

namespace OPBuilder\Http\Api;

use WP_REST_Request;
use OPBuilder\Repositories\MediaRepository;

class MediaController extends Controller
{
    /**
     * Import images from remote URLs
     *
     * @param WP_REST_Request $request
     * @return \WP_REST_Response
     */
    public static function import(WP_REST_Request $request)
    {
        $media = new MediaRepository;

        // Import the image to WP library
        $image = $media->importImageFromUrl(sanitize_text_field($request->get_param('url')));

        if ($image) {
            return static::apiResponse([
                'success' => true,
                'media' => $image,
            ], 200);
        }

        return static::apiErrorResponse('Failed to upload.', 'FAILED_UPLOAD', 500);
    }
}
