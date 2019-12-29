<?php

namespace OPBuilder\Providers;

use Exception;
use OPBuilder\Editor\MembershipPages;
use OPBuilder\Editor\Menus;
use OPBuilder\Editor\Renderer;
use OPBuilder\Repositories\PageRepository;
use OPBuilder\Support\Tools;

/**
 * Handle the live editor
 */
class PublicProvider
{
    /**
     * Init the editor backend
     */
    public function __construct()
    {
        // Render the page content
        add_filter('the_content', [$this, 'renderPage']);

        // Add styles and script to public side of web
        add_action('wp_enqueue_scripts',  [$this, 'enqueueScripts']);
        add_action('wp_enqueue_scripts',  [$this, 'enqueueStyles']);
        add_filter('wp_enqueue_scripts',  [$this, 'enqueuePageAssets']);

        // Setup admin bar
        add_action('admin_bar_menu', [$this, 'setupAdminBar'], 200);

        // Sync menus
        add_filter('wp', [$this, 'syncAllElements']);

        // adding input fields to allowed html tags, so shortcodes are working properly inside them
        add_filter('wp_kses_allowed_html', [$this, 'allowInputShortcodes'], 10, 2);

        // Other actions
        // add_action('edit_form_after_title', array($this, 'editorBuilderButton'));
        // add_action('save_post', array($this, 'savePost'));
    }

    /**
     * Adding input fields to allowed html tags
     *
     * @param $allowedPostTags
     * @param $context
     * @return mixed
     */
    public function allowInputShortcodes($allowedPostTags, $context)
    {
        if ( $context == 'post' ) {
            $allowedPostTags['input']['value'] = true;
        }

        return $allowedPostTags;
    }

    /**
     * Enqueue editor scripts.
     *
     * @return void
     */
    public function enqueueScripts()
    {
        // Add designer script only if needed
        if (op3_is_admin()) {
            wp_enqueue_script('op3-designer-script', op3_asset('js/op3-designer.js'), array('jquery'), null, true);
        }
    }

    /**
     * Enqueue editor styles.
     *
     * @return void
     */
    public function enqueueStyles()
    {
        // Add designer styles only if needed
        if (op3_is_admin()) {
            // We need additional styles for the "blank" template
            if (get_page_template_slug() === 'op_builder_blank') {
                wp_enqueue_style('op3-reboot', op3_asset('css/op3-reboot.css'), [], null);
            }

            // And the designer styles are enqueued always
            wp_enqueue_style('op3-designer-style', op3_asset('css/op3-designer.css'), [], null);
        }
    }

    /**
     * Render the page with OptimizePress
     *
     * @param  string  $content
     * @return string
     * @throws Exception
     */
    public function renderPage($content)
    {
        $pages    = new PageRepository;
        $pageId   = get_the_ID();
        $page     = $pages->find($pageId);
        $revision = isset($_GET['op3_revision']) ? $_GET['op3_revision'] : null;

        // In admin we always do this
        if (! op3_is_admin() && ! Tools::isOPPage($pageId)) {
            return $content;
        }

        // @TODO: Check if need this later (remove/add the_content filters)
        // Remove the filter itself in order to allow other `the_content` in the elements
        remove_filter('the_content', [$this, 'renderPage']);

        // Get the renderer
        $renderer = new Renderer();

        // And render the page
        if ($renderedContent = $renderer->renderPage($pageId, $revision)) {
            $content = $renderedContent;
        }

        // Add the filter again for other `the_content` calls
        add_filter('the_content', [$this, 'renderPage']);

        return $content;
    }

    /**
     * Run WP menu sync
     *
     * @return void
     * @throws Exception
     */
    public function syncAllElements()
    {
        // Find the page
        $pages  = new PageRepository;
        $pageId = get_the_ID();
        $page   = $pages->find($pageId);

        // When rendering we need to sync menu elements
        if (is_op3_page($pageId)) {
            $page->processGlobalElements(true);
            Menus::syncIfUpdated($page);
            MembershipPages::syncIfUpdated($page);
        }
    }

    /**
     * Enqueue the assets via the renderer
     *
     * @return void
     */
    public function enqueuePageAssets()
    {
        // Get the renderer and enqueue assets
        $renderer        = new Renderer();
        $pageId          = get_the_ID();
        $renderer->enqueuePageAssets($pageId);
    }

    /**
     * Setup the admin bar and the actions
     *
     * @param \WP_Admin_Bar $wp_admin_bar
     * @return void
     */
    public function setupAdminBar(\WP_Admin_Bar $wp_admin_bar)
    {
        $id      = get_the_ID();
        $canEdit = Tools::currentUserCanEditPage($id);

        // Jump out
        if (! $canEdit) {
            return;
        }

        // Add to admin bar if it's an OP page
        if (Tools::isOPPage($id)) {
            $wp_admin_bar->add_node([
                'id'    => 'op3_edit_page',
                'title' => __('Edit with OptimizePress', 'op3'),
                'href'  => Tools::editOPPageUrl($id),
            ]);
        }
    }
}
