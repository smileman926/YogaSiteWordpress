<?php

namespace OPBuilder\Providers;

use OPBuilder\Repositories\PageRepository;
use OPBuilder\Support\Assets;
use OPBuilder\Support\Tools;
use OPDashboard\Providers\RecaptchaProvider;
use OPDashboard\Services\Log;
use WP_Post;

/**
 * Base OptimizePress class
 */
class BuilderBootstrap
{
    /**
     * @var EditorProvider
     */
    protected $editor;

    /**
     * @var RouteRegistration
     */
    protected $routes;

    /**
     * @var HookProvider
     */
    protected $hooks;

    /**
     * @var PublicProvider
     */
    protected $publicProvider;

    /**
     * @var AdminProvider
     */
    protected $admin;

    /**
     * @var GutenbergProvider
     */
    protected $gutenberg;

    /**
     * @var RecaptchaProvider
     */
    protected $recaptchaProvider;


    /**
     * @var CompatibilityProvider|null
     */
    protected $compatibility;

    /**
     * @var WP_Post
     */
    protected $editorPage;

    /**
     * @var WP_Post
     */
    protected $editorPostType;

    /**
     * Init OptimizePress
     */
    public function init()
    {
        // Let's try to get the current post/page
        add_action('init', [$this, 'getCurrentContentData'], 1);

        // Public assets
        add_action('wp', [$this, 'generatePublicAssets'], 11);

        // Route to editor frame
        add_action('init', [$this, 'setEditorFrameRoute'], 2);

        // Initialize navigation
        add_action('init', [new NavigationProvider, 'init'], 10);

        // Add plugin scripts
        add_action('admin_head',            [$this, 'addMetaTags']);
        add_action('admin_enqueue_scripts', [$this, 'enqueueScripts']);
        add_action('admin_enqueue_scripts', [$this, 'enqueueStyles']);

        // Add notices
        add_action('admin_notices', [$this, 'initNotices']);

        // Register options and editor
        add_action('init',           [$this, 'registerPostTypes'], 10);
        add_action('plugins_loaded', [$this, 'initGutenberg'], 10);
        add_action('wp',             [$this, 'initRecaptcha'], 10);
        add_action('init',           [$this, 'registerPageTemplates'], 10);
        add_action('init',           [$this, 'initAdmin'], 10);
        add_action('init',           [$this, 'initLiveEditor'], 11);

        // Register routes
        add_action('init', [$this, 'registerRoutes'], 12);

        // Register hooks
        $this->registerHooks();

        // Register the frontend
        add_action('init', [$this, 'registerFrontend'], 13);

        // We also need to clear out styles for our blank template
        add_action('wp_print_styles',  [$this, 'removeStylesForBlankTemplate'], 100);
        add_action('wp_print_scripts', [$this, 'removeScriptsForBlankTemplate'], 100);

        // Handle any compatibility issues with 3rd party plugins/themes
        add_action('plugins_loaded', [$this, 'handleCompatibilityIssues'], 10);
    }

    /**
     * Add some meta tags required for the OP Builder wrapper
     */
    public function addMetaTags()
    {
        $idPlaceholder = '%objectId%';

        // Prepare all required params
        $dataParams = [
            // 'op3-page-status'     => get_post_status($post->ID),
            // 'op3-page-has-data'   => (bool) get_post_meta($post->ID, '_op3_summary', true),
            // 'op3-editor-mode'     => Tools::isOPPage($post->ID),
            'apiBaseUrl'    => get_rest_url(null, 'op3/v1'),
            'apiPageUrl'    => get_rest_url(null, 'op3/v1/pages/' . $idPlaceholder),
            'editUrl'       => op3_edit_page_url($idPlaceholder),
            'liveEditorUrl' => site_url('op-builder/'.$idPlaceholder),
            'nonce'         => wp_create_nonce('wp_rest'),
        ];

        echo '<script type="text/javascript">var OP3WP = {}; ';
        foreach ($dataParams as $name => $value) {
            echo 'OP3WP.' . $name . ' = "' . $value . '"; ';
            // echo '<meta name="'.$name.'" content="'.$value.'">'.PHP_EOL;
        }
        echo '</script>';
    }

    /**
     * Enqueue editor scripts.
     *
     * @todo do not use wp enqueue method
     * @return void
     */
    public function enqueueScripts()
    {
        if (op3_dashboard_enabled()) {
            // And enqueue the scripts
            wp_enqueue_script('op3-wrapper', op3_asset('js/op3-wrapper.js'), ['jquery'], null, true);
        }
    }

    /**
     * Enqueue editor styles.
     *
     * @todo do not use wp enqueue method
     * @return void
     */
    public function enqueueStyles()
    {
        if (op3_dashboard_enabled()) {
            wp_enqueue_style('op3-admin',   op3_asset('css/op3-admin.css'), [], null);
            wp_enqueue_style('op3-wrapper', op3_asset('css/op3-wrapper.css'), [], null);
        }
    }

    /**
     * Register all plugin web and API routes
     *
     * @return void
     */
    public function registerRoutes()
    {
        if (op3_dashboard_enabled()) {
            $this->routes = new RouteRegistration;
            $this->routes->register();
        }
    }

    /**
     * Register all plugin web and API routes
     *
     * @return void
     */
    public function registerHooks()
    {
        if (op3_dashboard_enabled()) {
            $this->hooks = new HookProvider;
            $this->hooks->register();
        }
    }

    /**
     * Init admin provider
     *
     * @return void
     */
    public function initAdmin()
    {
        if ($this->canEditPageWithOp()) {
            $this->admin = op3_dashboard_enabled() ? new AdminProvider : null;
        }
    }

    /**
     * Init Gutenberg provider
     *
     * @return void
     */
    public function initGutenberg()
    {
        if ($this->canEditPageWithOp()) {
            $this->gutenberg = op3_dashboard_enabled() ? new GutenbergProvider : null;
        }
    }

    /**
     * Init Recaptcha provider
     *
     * @return void
     */
    public function initRecaptcha()
    {
        $this->recaptchaProvider = op3_dashboard_enabled() ? new RecaptchaProvider : null;
    }

    /**
     * Add some notices to the admin screens
     *
     * @return void
     */
    public function initNotices()
    {
        if (! op3_dashboard_enabled()) {
            echo '<div class="notice notice-error"><p><strong>OptimizePress Builder</strong>: to use the OptimizePress Builder plugin please install and activate the OptimizePress Dashboard plugin.</p></div>';
        } elseif (! op3_sl_is_connected()) {
            echo '<div class="notice notice-error"><p><strong>OptimizePress Builder</strong>: to use the OptimizePress Builder plugin please <a href="' . admin_url('admin.php?page=op-suite') . '">connect your OptimizePress account</a>.</p></div>';
        }

        if (! op3_check_dependencies()) {
            echo '<div class="notice notice-error"><p><strong>OptimizePress Builder</strong>: Please make sure all plugin dependencies are up to date.<br>
            - OptimizePress Dashboard <strong>v' . OP3_DEPENDENCY__DASHBOARD . '</strong> needed (you have <strong>v' . OPD_VERSION . '</strong>)<br>
            <a href="' . admin_url('plugins.php') . '">Check for updates</a></p></div>';
        }
    }

    /**
     * Initialize the live editor
     *
     * @return void
     */
    public function initLiveEditor()
    {
        if ($this->canEditPageWithOp()) {
            $this->editor = op3_dashboard_enabled() ? new EditorProvider : null;
        }
    }

    /**
     * Register frontend renderer
     *
     * @return void
     */
    public function registerFrontend()
    {
        $this->publicProvider = op3_dashboard_enabled() ? new PublicProvider : null;
    }

    /**
     * Register required custom post types
     *
     * @return void
     */
    public function registerPostTypes()
    {
        if (op3_dashboard_enabled()) {
            new PostTypesProvider;
        }
    }

    /**
     * Run page template registration
     *
     * @return void
     */
    public function registerPageTemplates()
    {
        if (op3_dashboard_enabled()) {
            new RegisterPageTemplates;
        }
    }

    /**
     * Remove styles for blank template
     *
     * @return void
     */
    public function removeStylesForBlankTemplate()
    {
        global $wp_styles;

        // Bail for non-OP3 blank template
        if (! is_op3_blank_template()) return;

        // Loop through registered assets
        foreach ($wp_styles->queue as $asset) {
            if (! Assets::stylesheetIsAllowedInBlankTemplate($asset)) {
                wp_dequeue_style($asset);

                // For legacy OP plugins we also need to deregister the assets
                if (Assets::isOPLegacyAsset($asset)) {
                    wp_deregister_style($asset);
                }
            }
        }
    }

    /**
     * Remove scripts for blank template
     *
     * @return void
     */
    public function removeScriptsForBlankTemplate()
    {
        global $wp_scripts;

        // Bail for non-OP3 blank template
        if (! is_op3_blank_template()) return;

        // Loop through registered assets
        foreach ($wp_scripts->queue as $asset) {
            if (! Assets::scriptIsAllowedInBlankTemplate($asset)) {
                wp_dequeue_script($asset);

                // For legacy OP plugins we also need to deregister the assets
                if (Assets::isOPLegacyAsset($asset)) {
                    wp_deregister_script($asset);
                }
            }
        }
    }

    /**
     * Generate routes for public assets
     *
     * @throws \Exception
     */
    public function generatePublicAssets()
    {
        if (op3_dashboard_enabled() and ! op3_is_admin()) {
            $pageId = get_the_ID();

            if (Tools::isOPPage($pageId)) {
                $cachePath = OP3__DIR__ . '/public/assets/cache';

                // Check if cache directory exists
                if (! is_dir($cachePath)) {
                    mkdir($cachePath);
                }

                // Find the page
                $page                = (new PageRepository())->findAndPrerender($pageId);
                $pageUpdateTimestamp = $page->summary->timestamp;

                // Check if stylesheet file exists
                $stylesheetPath   = $cachePath . '/page-' . $pageId . '.css';
                $stylesheetExists = file_exists($stylesheetPath);

                // If it doesn't exists, simply create it with the latest contents
                if (! $stylesheetExists) {
                    Log::debug('[OPB] [ASSETS] Create stylesheet for page: ' . $pageId);
                    file_put_contents($stylesheetPath, $page->generateStylesheet(false));

                    // We probably don't need to update the file timestamp,
                    // but just in case we'll leave this here if it causes any problems
                    // touch($stylesheetPath, $pageUpdateTimestamp);

                    // Otherwise we need to check the timestamp and update the contents if needed
                } else {
                    $fileTimestamp = filemtime($stylesheetPath);
//                    op3_log()->debug('[ASSETS] PGUTS: ' . $pageUpdateTimestamp);
//                    op3_log()->debug('[ASSETS] FLUTS: ' . $fileTimestamp);

                    if ($pageUpdateTimestamp > $fileTimestamp) {
                        Log::debug('[OPB] [ASSETS] Update stylesheet for page: ' . $pageId . ' / ' . $pageUpdateTimestamp);

                        // We need to pre-render the page without cache so we can generate stylesheet
                        $page->prerender(false);

                        // And then the stylesheet file is generated
                        unlink($stylesheetPath);
                        file_put_contents($stylesheetPath, $page->generateStylesheet(false));
                        touch($stylesheetPath, $pageUpdateTimestamp);
                    }
                }

                // Check if script file exists
                $scriptPath   = $cachePath . '/page-' . $pageId . '.js';
                $scriptExists = file_exists($scriptPath);

                // If it doesn't exists, simply create it with the latest contents
                if (! $scriptExists) {
                    file_put_contents($scriptPath, $page->generateScripts(false));
                    touch($scriptPath, $pageUpdateTimestamp);

                    // Otherwise we need to check the timestamp and update the contents if needed
                } else {
                    $fileTimestamp = filemtime($scriptPath);

                    if ($pageUpdateTimestamp > $fileTimestamp) {
                        unlink($scriptPath);
                        file_put_contents($scriptPath, $page->generateScripts(false));
                        touch($scriptPath, $pageUpdateTimestamp);
                    }
                }
            }
        }
    }

    /**
     * Live editor frame path
     */
    public function setEditorFrameRoute()
    {
        if (op3_dashboard_enabled()) {
            $requestPath = $_SERVER['REQUEST_URI'];

            // Live editor frame
            if (preg_match("/\/op-builder\/(\d+)/", $requestPath, $matches)) {
                $_GET['id'] = $matches[1];
                include OP3__DIR__ . '/resources/views/live-editor/index.php';
                die();
            }
        }
    }

    /**
     * Handle any compatibility issues with 3rd party plugins/themes
     *
     * @return void
     */
    public function handleCompatibilityIssues()
    {
        $this->compatibility = op3_dashboard_enabled() ? new CompatibilityProvider() : null;
    }

    /**
     * Get current page in editor
     */
    public function getCurrentContentData()
    {
        $postId       = isset($_GET['post']) ? $_GET['post'] : null;
        $postTypeSlug = isset($_GET['post_type']) ? $_GET['post_type'] : null;

        // Get info from post
        if ($postId) {
            $this->editorPage     = get_post($postId);
            $this->editorPostType = $this->editorPage->post_type;
        } elseif($postTypeSlug) {
            $this->editorPage            = new \stdClass;
            $this->editorPage->post_type = $postTypeSlug;
            $this->editorPostType        = $postTypeSlug;
        } else {
            $this->editorPage            = new \stdClass;
            $this->editorPage->post_type = 'post';
            $this->editorPostType        = 'post';
        }

        // Also check if page can be edited with OP editor
        $this->editorPage->can_edit_with_op = Tools::isPostTypeEnabled($this->editorPostType);
    }

    /**
     * Check if current page can be edited with OP
     *
     * @return bool|mixed
     */
    public function canEditPageWithOp()
    {
        $canEdit = true;

        if (isset($this->editorPage->can_edit_with_op)) {
            $canEdit = $this->editorPage->can_edit_with_op;
        }

        // Also check OP2 mode
        if ($this->editorPage && isset($this->editorPage->ID) && $this->editorPage->ID && is_op2_page($this->editorPage->ID)) {
            $canEdit = false;
        }

        return $canEdit;
    }
}
