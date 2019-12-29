<?php

namespace OPBuilder\Providers;

use Exception;
use OPBuilder\Repositories\PageRepository;
use OPBuilder\Support\Tools;
use function OPDashboard\editor_post_types;
use function OPDashboard\sl_is_connected;
use WP_Post;
use WP_Query;

class AdminProvider
{
    /**
     * Init the editor backend
     */
    public function __construct()
    {
        // Add hooks and actions
        add_filter('page_row_actions',    [$this, 'setOverviewEditButton'], 10, 2);
        add_filter('post_row_actions',    [$this, 'setOverviewEditButton'], 10, 2);
        add_filter('admin_body_class',    [$this, 'setBodyClass']);
        add_filter('display_post_states', [$this, 'addPageState'], 10, 2);
        add_filter('admin_bar_menu',      [$this, 'addAdminBarOptions']);
        add_filter('plugin_row_meta',     [$this, 'op3BuilderPluginRowMeta' ], 10, 2 );
        add_action('admin_menu',          [$this, 'removeRevisionsMetabox']);

        /*
        * Hooking on admin action (for the purpose of page cloning)
        */
        add_action('admin_action_op3-page-clone', [$this, 'clonePageAction']);

        // turning this off temp until I find a proper fix when there is gazillion of pages
        add_filter('pre_get_posts', [$this, 'tablePagesFilter']);
        add_filter('views_edit-page', [$this, 'addPagesFilter']);

        // add page description meta box to all post types
        add_action('add_meta_boxes', [$this, 'op3AddPageDescriptionMetaBox']);
        add_action('save_post', [$this, 'op3SavePageDescriptionMetaBox']);

        if (op3_is_admin()) {
            add_filter('show_admin_bar', '__return_false');
        }
    }

    /**
     * Register Page Description metabox
     */
    public function op3AddPageDescriptionMetaBox()
    {
        // we are adding a Page description metabox
        // only if Membership Legacy features are turned on
        if (get_option('opd_enable_legacy_membership', true) != 'on')
            return;

        $enabledPostTypes = editor_post_types();
        $postTypes = [];

        if (! empty($enabledPostTypes)) {
            foreach ($enabledPostTypes as $postType) {
                if (!in_array($postType->name, $enabledPostTypes->toArray())) {
                    array_push($postTypes, $postType->name);
                }
            }
        }

        add_meta_box(
            'op3_page_description',
            'OP3 Page Description',
            [$this, 'op3ShowPageDescriptionMetaBox'],
            $postTypes,
            'side',
            'low'
        );
    }

    /**
     * Display Page Description metabox
     *
     * @param $post
     */
    public function op3ShowPageDescriptionMetaBox($post)
    {
        /*
	    * needed for security reasons
	    */
        wp_nonce_field( basename( __FILE__ ), 'op3_page_desc_metabox_nonce' );

        $html = '<textarea rows="1" cols="40" name="op3_page_description" id="excerpt">';
        $html .= esc_attr(get_post_meta($post->ID, 'op3_page_description',true));
        $html .= '</textarea>';
        $html .= '<p>Page Description will be used in OP3 Membership element.</p>';

        echo $html;
    }

    /**
     * Save Page description metabox.
     *
     * @param $postId
     * @param $post
     * @return mixed
     */
    public function op3SavePageDescriptionMetaBox($postId)
    {
        /*
	    * Security checks
	    */
        if (! isset($_POST['op3_page_desc_metabox_nonce'])
            || ! wp_verify_nonce($_POST['op3_page_desc_metabox_nonce'], basename( __FILE__ )))
            return $postId;

        /*
	    * Do not save the data if autosave
	    */
        if ( defined('DOING_AUTOSAVE') && DOING_AUTOSAVE )
            return $postId;

        update_post_meta($postId, 'op3_page_description', sanitize_text_field( $_POST['op3_page_description']));

        return $postId;
    }

    /**
     * Cloning pages
     *
     * @return void
     */
    public function clonePageAction()
    {
        $id = (int) filter_input(INPUT_GET, 'page_id', FILTER_SANITIZE_NUMBER_INT);
        if (empty($id)) {
            wp_die(__('No page ID to clone has been provided!', OP_SN));
        }

        $pages = new PageRepository;

        try {
            $newPost = $pages->duplicatePage($id);

            wp_redirect(admin_url('post.php?action=edit&post=' . $newPost->id));
            exit();
        } catch (Exception $e) {
            wp_die(__('There was an error cloning the OP3 page ' . $e->getMessage()));
        }
    }

    /**
     * Removes Revisions meta box on OP3 edited pages
     */
    public function removeRevisionsMetabox()
    {
        if (isset($_GET['post']) && is_op3_page(sanitize_text_field($_GET['post']))) {
            remove_meta_box('revisionsdiv', ['post', 'page'], 'normal');
        }
    }

    /**
     * Adds meta links to OP3 plugin
     *
     * @param $plugin_meta
     * @param $plugin_file
     * @return array
     */
    public function op3BuilderPluginRowMeta($plugin_meta, $plugin_file ) {
        if (OP3_BASE__=== $plugin_file) {
            $row_meta = [
                'op3help' => '<a href="https://docs.optimizepress.com" aria-label="' . esc_attr( __( 'Go To OptimizePress 3 Documentation', 'op3' ) ) . '" target="_blank">' . __('Help', 'op3') . '</a>',
                'op3hub' => '<a href="https://my.optimizepress.com" aria-label="' . esc_attr( __( 'Go To OptimizePress Member\'s Hub', 'op3' ) ) . '" target="_blank">' . __('Member\'s Hub', 'op3') . '</a>',
            ];

            $plugin_meta = array_merge( $plugin_meta, $row_meta );
        }

        return $plugin_meta;
    }

    /**
     * Add "Edit with OP" button to posts overview page
     *
     * @param $actions
     * @param $post
     * @return mixed
     * @throws Exception
     */
    public function setOverviewEditButton($actions, $post)
    {
        if (op3_dashboard_enabled() && sl_is_connected() && Tools::currentUserCanEditPage($post->ID) && Tools::isOPPage($post->ID) && Tools::isPostTypeEnabled($post->post_type)) {
            /*$actionParams = '';
            $dataParams = [
                'data-op3-page-id'         => $post->ID,
                'data-op3-page-status'     => get_post_status($post->ID),
                'data-op3-page-has-data'   => (bool) get_post_meta($post->ID, '_op3_summary', true),
                'data-op3-api-base-url'    => get_rest_url(null, 'op3/v1'),
                'data-op3-api-page-url'    => get_rest_url(null, 'op3/v1/pages/' . $post->ID),
                'data-op3-edit-url'        => op3_edit_page_url($post->ID),
                'data-op3-live-editor-url' => site_url('op-builder/'.$post->ID),
                'data-op3-editor-mode'     => Tools::isOPPage($post->ID),
            ];

            // Build up HTML params
            foreach ($dataParams as $key => $value) {
                $actionParams .= ' ' . $key . '="' . $value . '"';
            }*/

            // New way: @TODO: still need to check if this is working like it should
            /*$actions['edit_with_op'] = sprintf(
                '<a href="%s" onclick="return !!OP3.Wrapper.Editor.open(' . $post->ID . ')">%s</a>',
                Tools::editOPPageUrl($post->ID),
                __('Edit with OptimizePress', 'op3')
            );*/

            // Old way: simple href link to WP edit page with a hashtag
            $actions['edit_with_op'] = sprintf(
                '<a href="%s">%s</a>',
                Tools::editOPPageUrl($post->ID),
                __('Edit with OptimizePress', 'op3')
            );

            // Added clone OP3 page
            $actions['op3_clone'] = "<a class='op3-clone' href='" . admin_url("admin.php?action=op3-page-clone&page_id=" . $post->ID . "") . "'>" . __('Clone OP3 Page', 'optimizepress') . "</a>";
        }

        return $actions;
    }

    /**
     * Set CSS classes to body element
     *
     * @param  string $classes
     * @return string
     */
    public function setBodyClass($classes)
    {
        global $pagenow;

        if (in_array($pagenow, ['post.php', 'post-new.php'])) {
            $post = get_post();

            $classes .= ' ' . (is_op3_page($post->ID) ? 'op-editor-active' : 'op-editor-inactive');
        }

        return $classes;
    }

    /**
     * Display the state of the page as an OptimizePress page
     * This is displayed on the list of pages
     *
     * @param  array   $postStates
     * @param  WP_Post $page
     * @return mixed
     */
    public function addPageState($postStates, $page)
    {
        if (is_op3_page($page->ID) && Tools::isPostTypeEnabled($page->post_type)) {
            $postStates['op3'] = __('OptimizePress', 'op3');
        }

        return $postStates;
    }

    /**
     * Add some admin bar links
     *
     * @return void
     */
    public function addAdminBarOptions()
    {
        global $wp_admin_bar;

        if (function_exists('\\OPDashboard\\sl_license_is_valid') and \OPDashboard\sl_license_is_valid()) {
            $args = [
                'id'     => 'new-op-page',
                'title'  => 'OptimizePress Page',
                'href'   => admin_url('admin.php?page=op-builder-create'),
                'meta'   => ['class' => 'new-op-page'],
                'parent' => 'new-content',
            ];
            $wp_admin_bar->add_node($args);
        }
    }

    /**
     * Add "OP3" filter to page lists table header
     * @param  array $views
     *
     * @return array
     */
    public function addPagesFilter($views)
    {
        // Return if params are not met
        if (!isset($_GET['post_type']) || $_GET['post_type'] !== 'page') {
            return $views;
        }

        $class  = '';

        // Active class
        if (isset($_GET['op3_page_filter']) && $_GET['op3_page_filter'] == '1') {
            $class = ' class="current"';
        }

        $views['op3-editor'] = sprintf('<a href="%1$s"%2$s>%3$s</a>', admin_url('edit.php?post_type=page&op3_page_filter=1&post_status=le'), $class, __('OP3 Pages', 'optimizepress'));

        return $views;
    }

    /**
     * Filter out pages not built with OP3
     *
     * @param  WP_Query $query
     * @return WP_Query
     */
    public function tablePagesFilter($query)
    {
        if (!is_admin()) {
            return $query;
        }

        global $pagenow, $typenow;

        if ($pagenow === 'edit.php' && $typenow === 'page'
            && isset($_GET['op3_page_filter']) && $_GET['op3_page_filter'] == '1') {
            $query->set('meta_key', '_op3_mode');
            $query->set('meta_value', '1');
        }

        return $query;
    }
}
