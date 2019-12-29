<?php

namespace OPBuilder\Providers;

use OPBuilder\Repositories\GlobalElementRepository;
use function OptimizePress\Support\array_get;

/**
 * Used to register the post types and add additional functionality to the UI
 *
 * @package OPBuilder\Providers
 */
class PostTypesProvider
{
    /**
     * Bootstrap funnel actions and permalinks
     */
    public function __construct()
    {
        $this->registerGlobalElements();

        add_filter('admin_init',         [$this, 'openMenuForOptimizePressPages']);
        add_action('before_delete_post', [$this, 'beforeDeletePost']);
    }

    /**
     * Register custom post type for global elements
     */
    public function registerGlobalElements()
    {
        $labels = [
            'name'               => __('Global Elements', 'op3'),
            'singular_name'      => __('Global Element', 'op3'),
            'menu_name'          => __('Global Elements', 'op3'),
            'name_admin_bar'     => __('Global Elements', 'op3'),
            'add_new'            => __('Add New Global Element', 'op3'),
            'add_new_item'       => __('Add New Global Element', 'op3'),
            'new_item'           => __('New Global Element', 'op3'),
            'edit_item'          => __('Edit Global Element', 'op3'),
            'view_item'          => __('View Global Element', 'op3'),
            'all_items'          => __('Global Element Admin', 'op3'),
            'search_items'       => __('Search Global Elements', 'op3'),
            'parent_item_colon'  => __('Parent Global Element', 'op3'),
            'not_found'          => __('No Global Element Found', 'op3'),
            'not_found_in_trash' => __('No Global Element Found in Trash', 'op3'),
        ];

        $args = [
            'labels'              => $labels,
            'public'              => false,
            'exclude_from_search' => false,
            'publicly_queryable'  => false,
            'show_ui'             => true,
            'show_in_nav_menus'   => false,
            'show_in_menu'        => false,
            'show_in_admin_bar'   => false,
            'menu_position'       => 999,
            'capability_type'     => 'post',
            'capabilities'        => [
//                'create_posts' => false,
//                'delete_posts' => true,
            ],
            'hierarchical'        => false,
            'taxonomies'          => [],
            'supports'            => ['title', 'thumbnail'],
            'has_archive'         => false,
            'rewrite'             => [
                'slug'       => 'op_global_element',
                'with_front' => false,
            ],
            'query_var'           => true
        ];

        register_post_type('op_global_element', $args);
    }

    /**
     * Open OptimizePress menu for specific pages and post types
     */
    public function openMenuForOptimizePressPages()
    {
        // Fetch current page and post type
        $currentPage     = array_get($_GET, 'page');
        $currentPostType = array_get($_GET, 'post_type');

        // Configure which pages open the menu
        $adminFunnelPages = [
            'op-builder-global-elements',
        ];

        // And also which post type
        $adminPostTypes = [
            'op_global_element',
        ];

        // Now let's check the pages
        if (in_array($currentPage, $adminFunnelPages, true)) {
            $this->openOptimizePressMenu();
        }

        // And also check the post type
        if (in_array($currentPostType, $adminPostTypes, true)) {
            $this->openOptimizePressMenu();
        }
    }

    /**
     * Simply open the OptimizePress menu if needed
     *
     * @return void
     */
    public function openOptimizePressMenu()
    {
        global $menu;

        foreach ($menu as $key => $value) {
            if ('OptimizePress3' === $value[0]) {
                $menu[$key][4] .= ' wp-has-current-submenu wp-menu-open';
            }
        }
    }

    /**
     * We need to do some Global Element specific stuff when posts are deleted
     * All relations are deleted between global elements and the pages if
     * either of them are being deleted
     *
     * @param int $id
     */
    public function beforeDeletePost($id)
    {
        $post = get_post($id);

        if ($post) {
            $globalElementRepository = new GlobalElementRepository;

            // When deleting global elements, also remove relations
            if ($post->post_type === 'op_global_element') {
                $globalElementRepository->removeRelationToPagesForGlobalElement($post->ID);

            // When deleting other post types also remove global element relations
            } else {
                $globalElementRepository->removeRelationToGlobalElementsForPage($post->ID);
            }
        }
    }
}
