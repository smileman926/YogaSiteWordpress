<?php

namespace OPBuilder\Http\Api;

use OPBuilder\Repositories\GlobalElementRepository;
use WP_REST_Request;

class GlobalElementsController extends Controller
{
    /**
     * @var string
     */
    protected static $repositoryClass = GlobalElementRepository::class;

    /**
     * List of all global elements
     *
     * @param  WP_REST_Request $request
     * @return mixed
     */
    public static function list(WP_REST_Request $request)
    {
        $elements = self::repository()->getWithoutData();

        return static::apiResponse($elements->toArray());
    }

    /**
     * Get global element's details
     *
     * @param  WP_REST_Request $request
     * @return mixed
     */
    public static function detail(WP_REST_Request $request)
    {
        $id      = (int) $request->get_param('id');
        $element = self::repository()->find($id);

        if (! $element) {
            return static::apiErrorResponse('Global element not found.', 404);
        }

        return static::apiResponse($element->toArray());
    }

    /**
     * Create global element
     *
     * @param  WP_REST_Request $request
     * @return mixed
     */
    public static function create(WP_REST_Request $request)
    {
        $element = self::repository()->create($request->get_params());

        // Prepare response
        $result = $element->toArray();
        unset($result['data']);

        return static::apiResponse($result);
    }

    /**
     * Update global element
     *
     * @param  WP_REST_Request $request
     * @return mixed
     */
    public static function update(WP_REST_Request $request)
    {
        $gid     = (int) $request->get_param('id');
        $element = self::repository()->find($gid);

        if (! $element) {
            return static::apiErrorResponse('Global element not found.', 404);
        }

        // Update and set response
        $element = self::repository()->update($gid, $request->get_params());

        // Prepare response
        $result = $element->toArray();
        unset($result['data']);

        return static::apiResponse($result);
    }

    /**
     * Delete global element
     *
     * @param  WP_REST_Request $request
     * @return mixed
     */
    public static function delete(WP_REST_Request $request)
    {
        $gid     = (int) $request->get_param('id');
        $element = self::repository()->find($gid);

        if (! $element) {
            return static::apiErrorResponse('Global element not found.', 404);
        }

        // Delete if we found the element
        self::repository()->delete($gid);

        return static::apiResponse(['message' => 'Global element was deleted.', 'gid' => $gid]);
    }
}
