<?php

namespace OPBuilder\Http\Api;

use OPBuilder\Editor\MembershipPages;
use OPBuilder\Services\ElementStorage;
use OptimizePress\Support\Collection;
use WP_REST_Request;
use OPBuilder\Repositories\ElementRepository;
use WP_REST_Response;

// @todo
// before returning any data check if
// user is logged in (or if user is
// admin for some methods)

class ElementsController extends Controller
{
    /**
     * Store a new element
     *
     * @return mixed
     */
    public static function store()
    {
        // TMP
    }

    /**
     * Update an element
     *
     * @param  string  $id
     * @return mixed
     */
    public static function update($id)
    {
        # code...
    }

    /**
     * Display element details
     *
     * @return mixed
     */
    public static function show()
    {
        $elements = new ElementRepository;

        // Get all elements
        // This will load all styles for elements
        // @TODO: Franjo: when dropping in blocks, if they have a different style, we need to fetch it
        // @TODO: So for optimization we would load the style when the block is inserted
        $result = $elements->all('all');

        // Filter only enabled elements
        $result = array_filter($result, function($element) {
            return $element['enabled'];
        });

        // Remove unnecessary attributes
        $result = array_map(function($element) {
            unset($element['enabled']);
            unset($element['assets']);
            unset($element['objectClass']);

            return $element;
        }, $result);

        // Re-index keys
        $result = array_values($result);

        return static::apiResponse($result);
    }

    /**
     * Get element configuration
     *
     * @param  WP_REST_Request $request
     * @return mixed
     */
    public static function config(WP_REST_Request $request)
    {
        $elements = new ElementRepository;

        // Find the element configuration
        $element = $elements->find($request->get_param('id'));

        // Forget assets and objectClass
        if ($element) {
            unset($element['assets']);
            unset($element['objectClass']);
        }

        return $element;
    }

    /**
     * Get all element categories
     *
     * @return mixed
     */
    public static function categories()
    {
        $config = op3_config('categories');

        return static::apiResponse($config);
    }

    /**
     * Sort alphabetically
     *
     * @param  array   $a
     * @param  array   $b
     * @return int
     */
    public static function cmp($a, $b) {
        return strnatcmp($a['title'], $b['title']);
    }

    /**
     * Get all fonts
     *
     * @return mixed
     */
    public static function fonts()
    {
        $config = op3_config('fonts');

        // Sort fonts alphabetically
        usort($config, array('OPBuilder\Http\Api\ElementsController', 'cmp'));

        foreach($config as &$value) {
            $value['preview'] = str_replace('{assets}', op3_asset(''), $value['preview']);
        }

        return static::apiResponse($config);
    }

    /**
     * Get all icons
     *
     * @return mixed
     */
    public static function icons()
    {
        $config = op3_config('icons');

        return static::apiResponse($config);
    }

    /**
     * Get all pages and posts
     *
     * c/p from wordpress' ajax-action.php
     * @todo - add this functionality without wp?
     *
     * @return mixed
     */
    public static function links(WP_REST_Request $request)
    {
        $search = $request->get_param('search');
        //if ($search === null) {
        //    return array();
        //}

        $args = array(
            's' => wp_unslash($search),
            'pagenum' => '1',
            'posts_per_page' => 20,
        );

        require(ABSPATH . WPINC . '/class-wp-editor.php');
        $results = \_WP_Editors::wp_link_query($args);
        if ( ! isset($results) || ! $results) {
            $results = array();
        }

        return $results;
    }

    /**
     * Get all menus
     *
     * @param  WP_REST_Request  $request
     * @return WP_REST_Response
     */
    public static function menus(WP_REST_Request $request)
    {
        $search = $request->get_param('search');
        $result = op3_get_menu($search);

        return static::apiResponse($result);
    }

    /**
     * Get WP pages
     * Used to fill drop-downs in Membership Content Listing element
     *
     * @param  WP_REST_Request  $request
     * @return WP_REST_Response
     */
    public static function getPages(WP_REST_Request $request)
    {
        $finalCollection = new Collection;

        $postParent = 0;

        if (! empty($request->get_param('product'))) {
            $postParent = $request->get_param('product');
        }

        // get products (top level pages)
        $args = array(
            'post_parent'           => $postParent,
            'posts_per_page'        => '-1',
            'orderby'               => 'title',
            'order'                 => 'ASC',
            'post_type'             => 'page',
            'meta_key'              => '_op3_mode',
            'meta_value'            => '1',
            'post_status'           => 'publish'
        );

        $result = new \WP_Query($args);

        $productsCollection = new Collection;

        if ($result->have_posts()) {
            foreach ($result->posts as $post) {
                $productsCollection->push(['id' => $post->ID, 'name' => $post->post_title]);
            }
        }

        $finalCollection['products'] = $productsCollection;


        return static::apiResponse($finalCollection);
    }

    /**
     * Get WP pages according to parameters
     * Used to generate the element after params have been changed
     *
     * @param  WP_REST_Request  $request
     * @return WP_REST_Response
     */
    public static function getPagesByParams(WP_REST_Request $request)
    {
        $params = $request->get_params();

        $result = MembershipPages::pageSearch($params);

        return static::apiResponse($result);
    }

    /**
     * Return element storage data
     *
     * @param  WP_REST_Request  $request
     * @return WP_REST_Response
     */
    public function storage(WP_REST_Request $request)
    {
        // Prepare
        $pageId         = (int) $request->get_param('page_id');
        $elementStorage = new ElementStorage;

        // Get data from element storage
        if ($pageId) {
            $elementStorageData = $elementStorage->getPage($pageId);
        } else {
            $elementStorageData = $elementStorage->get();
        }

        return static::apiResponse($elementStorageData);
    }
}
