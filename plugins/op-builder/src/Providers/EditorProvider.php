<?php

namespace OPBuilder\Providers;

use OPBuilder\Editor\Menus;
use OPBuilder\Support\Tools;
use function OptimizePress\Support\array_get;

/**
 * Handle the live editor
 */
class EditorProvider
{
    /**
     * Init the editor backend
     */
    public function __construct()
    {
        // Styles and scripts
        $this->enqueueMedia();
        add_action('admin_enqueue_scripts', [$this, 'enqueueScripts']);
        add_action('admin_enqueue_styles',  [$this, 'enqueueStyles']);

        // Add editor buttons (we need to check if gutenberg is enabled)
        // For this to work properly, we should generate a div with data properties
        // And then inject the button via JS
        add_action('edit_form_after_title', [$this, 'editorBuilderButton']);
        // add_action('edit_form_after_title', [$this, 'editorBuilderDataContainer']);
        add_action('in_admin_header',    [$this, 'editorBuilderDataContainer']);
        // add_action('save_post', array($this, 'savePost'));

        // Append wp backbone template (media library frame content) to dom
        add_action('admin_print_footer_scripts', [$this, 'unsplashMediaLibraryFrame']);
        add_filter('media_view_strings',         [$this, 'unsplashMediaLibraryTabName']);

        // We need to save the date when the user changes WP menus
        add_action('wp_update_nav_menu', [$this, 'menuWasUpdated'], 10, 2);
    }

    /**
     * Enqueue editor scripts.
     *
     * @param  string $page
     * @return void
     */
    public function enqueueScripts($page)
    {
        // Add the wrapper
        wp_enqueue_script('op3-wrapper', op3_asset('js/op3-wrapper.js'), ['jquery'], OP3_VERSION);
    }

    /**
     * Enqueue WordPress media files
     */
    public function enqueueMedia()
    {
        // Check current page
        if (op3_current_admin_page_requires_builder_assets()) {
            // Enqueue WordPress media scripts
            wp_enqueue_media();
        }
    }

    /**
     * Enqueue editor styles.
     *
     * @return void
     */
    public function enqueueStyles()
    {
        wp_enqueue_style('op3-wrapper', op3_asset('css/op3-wrapper.css'), array(), null);
    }

    /**
     * Display the editor button
     *
     * @return string
     */
    public function editorBuilderButton()
    {
        $pageId = isset($_GET['post']) ? $_GET['post'] : get_the_ID();
        $post   = get_post($pageId);

        if ($post && Tools::isPostTypeEnabled($post->post_type)) {
            // Do not render Edit with OptimizePress on OP2 LiveEditor pages
            if (is_op2_page($pageId)) {
                return;
            }

            echo op3_view('wrapper/index', [
                'page_id'       => $pageId,
                'page_status'   => get_post_status($pageId),
                'page_has_data' => (bool) get_post_meta($pageId, '_op3_summary', true),
                'api_base_url'  => get_rest_url(null, 'op3/v1'),
                'api_page_url'  => get_rest_url(null, 'op3/v1/pages/'.$pageId),
                'op_mode_url'   => get_rest_url(null, 'op3/v1/pages/'.$pageId.'/mode'),
                'edit_page_url' => op3_edit_page_url($pageId),
                'editor_url'    => op3_get_editor_url($pageId),
                'editor_mode'   => Tools::isOPPage($pageId),
            ]);
        }
    }

    /**
     * Build up a data container that is not visible
     * It only serves for reading the data via JS
     */
    public function editorBuilderDataContainer()
    {
        $pageId = isset($_GET['post']) ? $_GET['post'] : get_the_ID();
        $post   = get_post($pageId);

        if ($post && Tools::isPostTypeEnabled($post->post_type)) {
            // Do not render Edit with OptimizePress on OP2 LiveEditor pages
            if (function_exists('is_le_page') and is_le_page($pageId)) {
                return;
            }

            echo op3_view('wrapper/data', [
                'page_id'       => $pageId,
                'page_status'   => get_post_status($pageId),
                'page_has_data' => (bool) get_post_meta($pageId, '_op3_summary', true),
                'api_base_url'  => get_rest_url(null, 'op3/v1'),
                'api_page_url'  => get_rest_url(null, 'op3/v1/pages/'.$pageId),
                'op_mode_url'   => get_rest_url(null, 'op3/v1/pages/'.$pageId.'/mode'),
                'edit_page_url' => op3_edit_page_url($pageId),
                'editor_url'    => op3_get_editor_url($pageId),
                'editor_mode'   => Tools::isOPPage($pageId),
            ]);
        }
    }

    /**
     * Get backbone js template from file and
     * append it to dom so js can use it
     * when registering unsplash
     * media library tab.
     * (see op3-unsplash.js)
     *
     * @return void
     */
    public function unsplashMediaLibraryFrame()
    {
        ob_start();
        include OP3__DIR__ . '/resources/views/live-editor/unsplash.php';
        echo ob_get_clean();
    }

    /**
     * Register unsplash title used in media library
     *
     * @param  array $strings
     * @return array
     */
    public function unsplashMediaLibraryTabName($strings)
    {
        $strings['unsplashTitle'] = __('Unsplash', 'custom');

        return $strings;
    }

    /**
     * This action if fired when an admin saves changes to a WP menu
     *
     * @param  string $id
     * @param  null   $data
     */
    public function menuWasUpdated($id, $data = null)
    {
        // Update menu timestamp
        Menus::touch($id);

        // And also clear out some cache
        op3_clear_all_pages_cache();
    }
}
