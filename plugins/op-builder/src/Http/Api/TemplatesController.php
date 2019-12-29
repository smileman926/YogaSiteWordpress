<?php

namespace OPBuilder\Http\Api;

use OPBuilder\Templates\TemplateRepository;
use OPBuilder\Templates\BlockConfig;
use WP_REST_Request;

class TemplatesController extends Controller
{
    /**
     * @var string
     */
    protected static $repositoryClass = TemplateRepository::class;

    /**
     * List all template categories
     *
     * @param  WP_REST_Request $request
     * @return \WP_REST_Response
     */
    public static function categories(WP_REST_Request $request)
    {
        $categories = static::repository()->categories();

        return static::apiResponse($categories);
    }

    /**
     * Display list of template in category
     *
     * @param  WP_REST_Request $request
     * @return \WP_REST_Response
     */
    public static function index(WP_REST_Request $request)
    {
        $category  = $request->get_param('category');
        $style     = $request->get_param('style');
        $templates = static::repository()->templates($category, $style);

        return static::apiResponse($templates);
    }

    /**
     * Show template details
     *
     * @param WP_REST_Request $request
     * @return \WP_REST_Response
     */
    public static function show(WP_REST_Request $request)
    {
        $template = static::repository()->find($request->get_param('template'));

        return static::apiResponse($template->toArray());
    }

    /**
     * List all block categories
     *
     * @param  WP_REST_Request $request
     * @return \WP_REST_Response
     */
    public static function blockCategories(WP_REST_Request $request)
    {
        $categories = static::repository()->blockCategories();

        return static::apiResponse($categories);
    }

    /**
     * Display list of template in category
     *
     * @param  WP_REST_Request $request
     * @return \WP_REST_Response
     */
    public static function blockIndex(WP_REST_Request $request)
    {
        $category  = $request->get_param('category');
        $style     = $request->get_param('style');
        $templates = static::repository()->blocks($category, $style);

        return static::apiResponse($templates);
    }

    /**
     * Details for a block
     *
     * @param WP_REST_Request $request
     * @return \WP_REST_Response
     */
    public static function showBlock(WP_REST_Request $request)
    {
        $template = static::repository()->findBlock($request->get_param('block'));
        $block    = new BlockConfig($template);

        return static::apiResponse($block->toArray());
    }

    /**
     * Details for a block
     *
     * @param WP_REST_Request $request
     * @return \WP_REST_Response
     */
    public static function showCustomerBlock(WP_REST_Request $request)
    {
        $template = static::repository()->findCustomerBlock($request->get_param('block'));
        $block    = new BlockConfig($template);

        return static::apiResponse($block->toArray());
    }
}
