<?php

namespace OPBuilder\Repositories;

use DateTimeZone;
use Exception;
use OPBuilder\Editor\MembershipPages;
use OPBuilder\Editor\Menus;
use OPBuilder\Editor\Page;
use OPBuilder\Services\ElementStorage;
use OPBuilder\Services\Integrations;
use OPBuilder\Templates\TemplateRepository;
use OPBuilder\Templates\Templates;
use OPBuilder\Repositories\GlobalElementRepository;
use function OPFunnel\get_all_pages_in_funnel;
use function OPFunnel\get_funnel_for_page;
use function OPFunnel\get_next_page_in_funnel;
use function OPFunnel\get_next_page_redirect_url_in_funnel;
use function OPFunnel\get_page_redirect_url_in_funnel;
use function OPFunnel\get_prev_page_in_funnel;
use function OPFunnel\get_prev_page_redirect_url_in_funnel;
use function OptimizePress\Support\array_get;
use function OptimizePress\Support\object_get;
use OptimizePress\Support\Str;
use stdClass;

class PageRepository extends WordpressRepository
{
    /**
     * Default blank page data
     *
     * @var array
     */
    protected $defaultData;

    /**
     * @var string
     */
    protected $metaSummaryKey = '_op3_summary';

    /**
     * @var string
     */
    protected $metaDataKey = '_op3_data';

    /**
     * @var string
     */
    protected $metaRevisionsKey = '_op3_revisions';

    /**
     * @var GlobalElementRepository
     */
    protected $globalElements;

    /**
     * Init repository
     */
    public function __construct()
    {
        $this->globalElements = new GlobalElementRepository;
        $this->defaultData = [
            'children' => [],
            'uuid'     => null,
            'type'     => 'document',
            'style'    => null,
            'options' => [
                'all' => [
                    'css' => new StdClass,
                ],
            ],
        ];
    }

    /**
     * Search pages by keyword
     *
     * @param  string $keyword
     * @return array|null|object
     */
    public function search($keyword)
    {
        global $wpdb;

        // Build up query
        $keyword = esc_sql($wpdb->esc_like($keyword));
        $query = "
            SELECT      *
            FROM        $wpdb->posts
            WHERE       $wpdb->posts.post_title LIKE '%$keyword%'
            AND         $wpdb->posts.post_type IN ('page','post')
            AND         $wpdb->posts.post_status = 'publish'
            ORDER BY    $wpdb->posts.post_title
            LIMIT       10
        ";

        // Run query
        $result = $wpdb->get_results($query);

        // And add permalinks to the result
        foreach ($result as $post) {
            $post->permalink = get_permalink($post);
        }

        return $result;
    }

    /**
     * Find a page
     *
     * @param  int     $id
     * @param  bool    $prerender
     * @param  string  $revision
     * @return Page
     * @throws Exception
     */
    public function find($id, $prerender = false, $revision = null)
    {
        $page = get_post((int) $id);

        // Add meta
        if ($page) {
            if (! $revision and isset($_GET['op3_revision'])) {
                $revision = $_GET['op3_revision'];
            }

            // Prepare data keys (revision is handled different)
            if ($revision) {
                $metaDataKey    = $this->metaDataKey . '_' . $revision;
                $metaSummaryKey = $this->metaSummaryKey . '_' . $revision;
            } else {
                $metaDataKey    = $this->metaDataKey;
                $metaSummaryKey = $this->metaSummaryKey;
            }

            // Setup page object
            $page->op3_data          = @json_decode(get_post_meta($page->ID, $metaDataKey, true), false);
            $page->op3_summary       = @json_decode(get_post_meta($page->ID, $metaSummaryKey, true), false);
            $page->op3_live_editor   = (bool) get_post_meta($page->ID, '_op3_live_editor', true);
            $page->op3_editor_url    = add_query_arg('op3editor', 1, get_permalink($page->ID));
            $page->op3_url           = get_permalink($page->ID);
            $page->op3_page_template = get_post_meta($page->ID, '_wp_page_template', true);

            return $this->formatPage($page, $prerender);
        }
    }

    /**
     * Find a page and pre-render it
     *
     * @param  int  $id
     * @param  string  $revision
     * @return Page
     * @throws Exception
     */
    public function findAndPrerender($id, $revision = null)
    {
        return $this->find($id, true, $revision);
    }

    /**
     * Find page or throw 404 error
     *
     * @param  int  $id
     * @param  bool $prerender
     * @return Page
     */
    public function findOrFail($id, $prerender = true)
    {
        $page = $this->find($id, $prerender);

        // Check the page
        if ( ! $page) {
            $this->abort(404);
        }

        return $page;
    }

    /**
     * Update page element structure
     *
     * @param  int   $id
     * @param  array $data
     * @param  bool  $importImages
     * @return bool
     */
    public function updateData($id, $data, $importImages = true)
    {
        if ($id && $data) {
            // Check if we should mark the page as a OptimizeFunnels template
            $isFunnelPageTemplate = $this->checkIfFunnelPageTemplate($data);
            $this->markPageAsFunnelPageTemplate($id, $isFunnelPageTemplate);

            // We need to check for block images and import them
            if ($importImages) {
                $data = $this->importImages($id, $data);
            }

            // Then just save the page data
            $str    = @json_encode($data);
            $str    = wp_slash($str);
            $update = update_post_meta($id, '_op3_data', $str);

            return (bool) $update;
        }
    }

    /**
     * Update the element storage
     *
     * @param  int|Page  $page
     * @return bool
     * @throws Exception
     */
    public function updateElementStorage($page)
    {
        // Find page by ID
        if (is_int($page) and (int) $page) {
            $page = $this->find($page);
        }

        // Update the data
        if ($page) {
            $storage = new ElementStorage;
            $storage->updatePage($page);
        }

        return true;
    }

    /**
     * Create a new page revision
     *
     * @param $id
     * @return array
     */
    public function createRevision($id)
    {
        $timestamp        = (string) date('YmdHis');
        $metaDataKey      = $this->metaDataKey . '_' . $timestamp;
        $metaSummaryKey   = $this->metaSummaryKey . '_' . $timestamp;

        // Update the meta
        $revisionMetaData    = wp_slash(get_post_meta($id, $this->metaDataKey, true));
        $revisionMetaSummary = wp_slash(get_post_meta($id, $this->metaSummaryKey, true));
        update_post_meta($id, $metaDataKey,    $revisionMetaData);
        update_post_meta($id, $metaSummaryKey, $revisionMetaSummary);

        // We also need to update the revision list, so first fetch all revisions
        $revisionLimit = (int) (op3_config('plugin.revision_limit') ?: 20);
        $revisions = $this->getPageRevisions($id);

        // Add revision to end of list
        $revisions[] = $timestamp;
        rsort($revisions);

        // Limit number of revisions
        $removeRevisions = array_slice($revisions, $revisionLimit);
        $revisions = array_slice($revisions, 0, $revisionLimit);

        // We need to delete the meta data
        if ($removeRevisions) {
            foreach ($removeRevisions as $removeRevision) {
                delete_post_meta($id, $this->metaSummaryKey . '_' . $removeRevision);
                delete_post_meta($id, $this->metaDataKey . '_' . $removeRevision);
            }
        }

        // And finally save the revision list
        update_post_meta($id, $this->metaRevisionsKey, @json_encode($revisions, true));

        return $this->getPageRevisions($id, true);
    }

    /**
     * Return list of revision IDs
     *
     * @param $id
     * @param bool $humanReadable
     * @return array
     */
    public function getPageRevisions($id, $humanReadable = false)
    {
        $revisionIds = @json_decode(get_post_meta($id, $this->metaRevisionsKey, true)) ?: [];

        if (! $humanReadable) return $revisionIds;

        $revisions = [];

        foreach ($revisionIds as $revisionId) {
            $timezone = get_option('timezone_string') ? get_option('timezone_string') : 'GMT';
            $date = date_create_from_format('YmdHis', $revisionId);
            $date->setTimezone(new DateTimeZone($timezone));
            $revisions[] = [
                'id' => $revisionId,
                'human_time' => $date->format('jS M \a\t H:i')
            ];
        }

        return $revisions;
    }

    /**
     * Update page meta
     *
     * @param int $id
     * @param array $data
     * @return bool
     * @throws Exception
     */
    public function updateSummary($id, $data)
    {
        if ($id && $data) {
            $page = $this->find($id);

            // Prepare response structure
            $result = [
                'uuids'        => $page->getAllElementUuids(),
                'gids'         => $page->getAllElementGids(),
                'fonts'        => $page->getAllExternalFonts(),
                'elements'     => $page->getElementTypesList(true),
                'integrations' => $page->getOptionValuesByKey('optinIntegration', true),
                'relatedPosts' => $page->getRelatedPosts(),
                'timestamp'    => time(),
            ];

            // We also need to update the global element registry for the page
            $this->globalElements->updatePageRegistry($id, (array) $result['gids']);

            // Prepare and save to WP meta
            $str    = @json_encode($result);
            $str    = wp_slash($str);
            $update = update_post_meta($id, '_op3_summary', $str);

            return (bool) $update;
        }
    }

    /**
     * Check if page is funnel page template
     *
     * @param  mixed  $data
     * @return bool
     */
    public function checkIfFunnelPageTemplate($data)
    {
        $pageOptions          = object_get($data, 'options');
        $isFunnelPageTemplate = false;

        // Check if funnel page template
        if (isset($pageOptions->all) and isset($pageOptions->all->funnelPageTemplate)) {
            $funnelPageTemplateData = (array) $pageOptions->all->funnelPageTemplate;
            $isFunnelPageTemplate   = (bool) reset($funnelPageTemplateData);
        }

        return $isFunnelPageTemplate;
    }

    /**
     * Mark a page as an OptimizeFunnels page template
     *
     * @param  int       $id
     * @param  int|bool  $isFunnelPageTemplate
     * @return int
     */
    public function markPageAsFunnelPageTemplate($id, $isFunnelPageTemplate)
    {
        if ($isFunnelPageTemplate) {
            update_post_meta($id, '_op3_funnel_page_template', (int) $isFunnelPageTemplate);
        } else {
            delete_post_meta($id, '_op3_funnel_page_template');
        }

        return true;
    }

    /**
     * Duplicate existing OP page
     *
     * @param int $pageId
     * @param array $data
     * @return Page|mixed
     * @throws Exception
     */
    public function duplicatePage($pageId, $data = [])
    {
        // Find OP page and WP page/post
        $page   = $this->find($pageId);
        $wpPost = get_post($pageId);

        if ($page and $wpPost) {
            // Convert post data to array
            $wpPostData = $wpPost->to_array();

            // Remove data that we don's need
            unset(
                $wpPostData['ID'],
                $wpPostData['post_author'],
                $wpPostData['post_name'],
                $wpPostData['post_modified'],
                $wpPostData['post_modified_gmt'],
                $wpPostData['guid']
            );

            // Change the title
            $wpPostData['post_title'] = sanitize_text_field($wpPost->post_title . ' | Cloned at: ' . date('Y-m-d H:i:s'));

            // Now merge with data we passed into the method
            $wpPostData = array_merge($wpPostData, $data);

            // Create the post object
            $newPostID = wp_insert_post($wpPostData);

            // Also update the meta data (but be careful with JSON fields)
            foreach (get_post_meta($wpPost->ID) as $key => $values) {
                // Check if field is a valid JSON value
                foreach ($values as $value) {
                    // For JSON fields we need to do it a little  bit different
                    if (op3_is_json($value)) {
                        update_post_meta($newPostID, $key, wp_slash($value));
                    } else {
                        update_post_meta($newPostID, $key, $value);
                    }
                }
            }

            // Now re-fetch the cloned post/page
            return $this->find($newPostID);
        }

        return false;
    }

    /**
     * Update the page template
     *
     * @param  int    $id
     * @param  string $template
     * @return bool|int
     */
    public function updateTemplate($id, $template)
    {
        $post = get_post($id);

        // Change post status if needed
        if ($post->post_status === 'auto-draft') {
            $postData = [
                'ID'          => $id,
                'post_status' => 'draft',
            ];

            wp_update_post($postData);
        }

        return update_post_meta($id, '_wp_page_template', $template);
    }

    /**
     * Update the page title
     *
     * @param  int    $id
     * @param  string $title
     * @return bool|int
     */
    public function updateTitle($id, $title)
    {
        $post = get_post($id);
        $postData = [
            'ID'          => $id,
            'post_title' => $title,
        ];

        // Change post status if needed
        if ($post->post_status === 'auto-draft') {
            $postData['post_status'] = 'draft';
        }

        return wp_update_post($postData);
    }

    /**
     * Update page element structure
     *
     * @param  int   $id
     * @param  array $data
     * @return array
     */
    public function importImages($id, $data)
    {
        // First
        $baseUrl = defined('OPD_SL_TEMPLATE_ASSETS_BASE_URL') ? OPD_SL_TEMPLATE_ASSETS_BASE_URL : 'https://s3.amazonaws.com/assets.op3/';

        // Extract clean JSON
        $strippedJsonData = stripslashes_deep(@json_encode($data));
        $jsonData         = @json_encode($data);

        // Find all URL's from SL
        preg_match_all('/\b(?:(?:https?|ftp|file):\/\/)[-A-Z0-9+&@#\/%=~_|$?!:,.]*[A-Z0-9+&@#\/%=~_|$]/i', $strippedJsonData, $matches, PREG_PATTERN_ORDER);

        // Go through all URL's
        if ($matches and isset($matches[0])) {
            foreach ($matches[0] as $mediaUrl) {
                // Match only URL's on the SL server, and skip if they contain "wp-content/uploads"
                if (Str::startsWith($mediaUrl, $baseUrl) and strpos($mediaUrl, 'wp-content/uploads') === false) {
                    // Let's first check if the image already exists in the our library
                    $exists = Templates::findAttachmentByMediaUrl($mediaUrl);

                    // Import the image from the URL to the WP media library if it's not already imported
                    if ($exists) {
                        // Return the existing stuff
                        $attachmentId  = $exists->ID;
                        $attachmentUrl = wp_get_attachment_url($attachmentId);
                    } else {
                        // Create attachment
                        $attachmentId  = Templates::insertAttachmentFromUrl($mediaUrl, $id);
                        $attachmentUrl = wp_get_attachment_url($attachmentId);

                        // And update meta data
                        update_post_meta($attachmentId, '_op_media_id',  'block_'.uniqid());
                        update_post_meta($attachmentId, '_op_media_url', $mediaUrl);
                    }

                    // Then rewrite the template data placeholder with the URL in the WP media library
                    $jsonData = str_replace(addcslashes($mediaUrl, '/'), addcslashes($attachmentUrl, '/'), $jsonData);
                }
            }

            // Now update the data array
            $data = @json_decode($jsonData);
        }

        return $data;
    }

    /**
     * Update the post content for the WP page
     *
     * @param  int  $pageId
     * @throws Exception
     */
    public function updatePostContent($pageId)
    {
        $page = $this->find((int) $pageId);

        // Build up HTML and also clean it up
        $html = strip_tags($page->prerender(true, ['popoverlay']), '<h1><h2><h3><h4><h5><h6><p><a><strong><em><img>');

        // Then just save it to the post content
        $post = [
            'ID'           => $page->id,
            'post_content' => $html,
        ];

        // Update the post into the database
        wp_update_post($post);
    }

    /**
     * Set the editor mode for a page
     *
     * @param int    $id
     * @param string $mode
     * @return bool|int
     */
    public function setPageEditorMode($id, $mode)
    {
        return update_post_meta($id, '_op3_mode', (($mode === 'op' or $mode === true or $mode === 1) ? 1 : 0));
    }

    /**
     * Return some default blank page data
     *
     * @return array
     */
    public function defaultData()
    {
        return $this->defaultData;
    }

    /**
     * Create default page data and summary if needed
     *
     * @param  $pageId
     * @return bool
     */
    public function createDefaultData($pageId)
    {
        $created = false;

        // Fetch the page summary
        $summary = get_post_meta($pageId, '_op3_summary', true);

        // Simply update the data if summary is missing
        if (! $summary) {
            // Build some page default data
            $data = $this->defaultData();


            // And update the page
            $this->updateData($pageId, $data);
            $this->updateSummary($pageId, $data);

            // Set flag
            $created = true;
        }

        return $created;
    }

    /**
     * Build up data for editor initial request
     *
     * @param  Page   $page
     * @param  array  $options
     * @return array
     */
    public function buildPageData(Page $page, $options = [])
    {
        // Add block/sections categories
        $blockCategories = op3_factory(TemplateRepository::class)->blockCategories();

        // Also add blocks for first category
        if ($blockCategories and $blockCategories[0] and method_exists($blockCategories[0], 'loadBlocks')) {
            $blockCategories[0]->loadBlocks();
        }

        // Next fetch various categories
        $elementCategories = op3_config('categories');

        // Now we need all the element data
        $elements = $this->buildElementsPageData($page);

        // We also need the WP menus
        $menus = Menus::search();

        // We also need direct page children
        $membershipPages = MembershipPages::directPageChildren($page->id);

        // Check if page is part of a funnel
        $funnelsData = $this->buildFunnelPageData($page);

        // Fetch all the icons/fonts/separators
        $iconsFontsSeparators = $this->buildIconFontSeparatorData($page);
        $icons      = array_get($iconsFontsSeparators, 'icons');
        $fonts      = array_get($iconsFontsSeparators, 'fonts');
        $separators = array_get($iconsFontsSeparators, 'separators');

        // Then we fetch the integrations
        $integrations = op3_factory(Integrations::class)->getPageIntegrations($page->id);

        // Document object
        $document = get_post_meta($page->id, '_op3_data', true);
        $document = @json_decode($document);

        // dirty fix for pages that have custom css saved as empty array...
        // we should remove this after few versions
        // Zvonko
        if (is_array($document->options->all->css) && empty($document->options->all->css)) {
            $document->options->all->css = new StdClass;
        }

        // Also fetch page revisions
        $revisions = $this->getPageRevisions($page->id, true);

        // Finally the page templates
        $pageTemplates = op3_registered_page_templates($page->id);

        // @todo - Lang (translations)
        $lang = (object) [
            // "traniners" => "sneakers",
            // "pullower" => "sweater",
            // "biscuit" => "cookie",
            // "colour" => "color",
            // "grey" => "gray",
            // "aereoplane" => "airplane",
        ];

        // Get data from element storage
        $elementStorage     = new ElementStorage;
        $elementStorageData = $elementStorage->get();

        // Global elements
        $globalElementsOnPage = op3_factory(GlobalElementRepository::class)->allOnPage($page->id);
        $globalElementsOnPage = array_map(function($item) {
            return $item['data'];
        }, $globalElementsOnPage->toArray());
        $globalElementList = op3_factory(GlobalElementRepository::class)->all()->toArray();
        foreach($globalElementList as &$item) {
            unset($item['data']);
        }

        // Build up the response object
        $pageData = [
            'block_categories'        => $blockCategories,
            'document'                => $document,
            'element_categories'      => $elementCategories,
            'element_storage'         => $elementStorageData,
            'elements'                => $elements,
            'global_elements'         => $globalElementList,
            'global_elements_on_page' => $globalElementsOnPage,
            'fonts'                   => $fonts,
            'funnels'                 => isset($funnelsData) ? $funnelsData : [],
            'icons'                   => $icons,
            'integrations'            => $integrations,
            'lang'                    => $lang,
            'menus'                   => $menus,
            'page_templates'          => $pageTemplates,
            'ratings'                 => op3_config('ratings'),
            'revisions'               => $revisions,
            'separators'              => $separators,
            'membership_pages'   => $membershipPages,
        ];

        return $pageData;
    }

    /**
     * Build up data for all elements and element styles
     *
     * @param  Page  $page
     * @return array
     */
    public function buildElementsPageData(Page $page)
    {
        // Then get all elements
        // This will load all styles for elements
        // @TODO: Franjo: when dropping in blocks, if they have a different style, we need to fetch it
        // @TODO: So for optimization we would load the style when the block is inserted
        $elementsRepo = new ElementRepository;
        $elements     = $elementsRepo->all('all');

        // Forget assets and objectClass
        foreach ($elements as &$element) {
            unset($element['assets'], $element['objectClass']);

            // For funnel pages we need to set a default optin action
            if ($page->isPartOfFunnel() and $element['type'] === 'form') {
                $element['options']['optinPostAction'] = 'nextFunnelStep';
            }
        }

        return $elements;
    }

    /**
     * Build up data for fonts, icons and separators
     *
     * @param  Page  $page
     * @return array
     */
    public function buildIconFontSeparatorData(Page $page)
    {
        $data = [
            'fonts'      => op3_config('fonts'),
            'icons'      => op3_config('icons'),
            'separators' => op3_config('separators'),
        ];

        // Sort fonts alphabetically and replace placeholders
        usort($data['fonts'], function($a, $b) {
            return strnatcmp($a['title'], $b['title']);
        });
        foreach ($data['fonts'] as &$value) {
            $value['preview'] = str_replace('{assets}', op3_asset(''), $value['preview']);
        }

        return $data;
    }

    /**
     * Build up data for funnel pages
     *
     * @param  Page   $page
     * @param  array  $options
     * @return array
     */
    public function buildFunnelPageData(Page $page, $options = [])
    {
        // Add OptimizeFunnels data if needed
        if (op3_is_funnel_builder_active()) {
            // Check if page is part of a funnel
            if ($page->isPartOfFunnel() && function_exists('OPFunnel\get_funnel_for_page')) {
                $funnel      = get_funnel_for_page($page->id);
                $nextPage    = get_next_page_in_funnel($page->id);
                $prevPage    = get_prev_page_in_funnel($page->id);
                $nextPageUrl = null;
                $prevPageUrl = null;

                // Build up next page URL
                if ($nextPage) {
                    if (function_exists('\OPFunnel\get_next_page_redirect_url_in_funnel')) {
                        $nextPageUrl = get_next_page_redirect_url_in_funnel($page->id);
                    } else {
                        $nextPageUrl = get_permalink($nextPage->ID);
                    }
                }

                // Build up prev page URL
                if ($prevPage) {
                    if (function_exists('\OPFunnel\get_prev_page_redirect_url_in_funnel')) {
                        $prevPageUrl = get_prev_page_redirect_url_in_funnel($page->id);
                    } else {
                        $prevPageUrl = get_permalink($prevPage->ID);
                    }
                }

                // Also add all pages that are part of the funnel
                $funnelPages = get_all_pages_in_funnel($funnel->ID);
                $pageData    = [];

                // Build up the funnel page data
                foreach ($funnelPages as $funnelPage) {
                    if (function_exists('\OPFunnel\get_page_redirect_url_in_funnel')) {
                        $url = get_page_redirect_url_in_funnel($funnelPage->id);
                    } else {
                        $url = get_permalink($funnelPage->ID);
                    }

                    $pageData[] = [
                        'id'      => $funnelPage->ID,
                        'title'   => $funnelPage->post_title,
                        'url'     => $url,
                        'current' => $page->id == $funnelPage->ID,
                    ];
                }

                $funnelsData = [
                    'funnel_id'     => $funnel   ? $funnel->ID : null,
                    'next_page_id'  => $nextPage ? $nextPage->ID : null,
                    'next_page_url' => $nextPageUrl,
                    'prev_page_id'  => $prevPage ? $prevPage->ID : null,
                    'prev_page_url' => $prevPageUrl,
                    'pages'         => $pageData,
                ];
            }

            // Set OptimizeFunnels plugin as active
            $funnelsData['plugin_active'] = true;
        } else {
            $funnelsData = ['plugin_active' => false];
        }

        return $funnelsData;
    }
}
