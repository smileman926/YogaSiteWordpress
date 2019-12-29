<?php

namespace OPBuilder\Editor;

use Exception;
use OPBuilder\Editor\Elements\OPElement;
use OPBuilder\Editor\Page\Assets;
use OPBuilder\Editor\Page\Cache;
use OPBuilder\Editor\Page\Elements;
use OPBuilder\Editor\Page\Fonts;
use OPBuilder\Editor\Page\Funnels;
use OPBuilder\Editor\Page\GlobalElements;
use OPBuilder\Editor\Page\Helpers;
use OPBuilder\Editor\Render\SimpleRender;
use OPBuilder\Repositories\PageRepository;
use OPBuilder\Repositories\ElementRepository;
use function OptimizePress\Support\array_get;
use OptimizePress\Support\Contracts\Jsonable;
use OptimizePress\Support\Contracts\Arrayable;
use OPBuilder\Hooks\HookRegistry;
use function OptimizePress\Support\object_get;
use stdClass;
use WP_Post;

class Page implements Arrayable, Jsonable
{
    use Assets, Cache, Elements, Fonts, Funnels, GlobalElements, Helpers, PageIntegrations;

    /**
     * The page ID
     *
     * @param mixed
     */
    public $id;

    /**
     * Template for the page
     *
     * @param string
     */
    public $pageTemplate;

    /**
     * Summary of the page meta data
     *
     * @param stdClass
     */
    public $summary;

    /**
     * Child elements in page root container
     *
     * @param array
     */
    protected $children;

    /**
     * Store all existing UUID's for this page
     *
     * @var array
     */
    protected $uuids = [];

    /**
     * Holds all custom CSS rules applied by element options
     *
     * @param Stylesheet
     */
    public $stylesheet;

    /**
     * Helper for enqueueing scripts and styles
     *
     * @param PageAssets
     */
    public $assets;

    /**
     * Page HTML
     *
     * @param string
     */
    public $html;

    /**
     * Force DB update flag
     *
     * @var boolean
     */
    public $forceDataRefresh = false;

    /**
     * Force DB update flag
     * Used to overwrite data in DB with current page structure
     *
     * @var boolean
     */
    public $forceUpdateData = false;

    /**
     * The page data
     *
     * @var array
     */
    protected $pageData;

    /**
     * @var ElementRepository
     */
    protected $elementRepo;

    /**
     * All the elem ent properties that are synced for global elements
     *
     * @var array
     */
    protected $globalElementSyncProperties = [
        'uuid', 'type', 'config', 'style', 'styleId', 'selectorChanges', 'content', 'wrapHtml', 'class', 'parent', 'children',
        'codeBeforeElement', 'codeAfterElement', 'page', 'spec', 'options'
    ];

    /**
     * @var PageRepository
     */
    protected $pageRepo;

    /**
     * The root element
     *
     * @var OPElement
     */
    protected $rootElement;

    /**
     * @var WP_Post
     */
    protected $wpPost;

    /**
     * Document selector changes:
     * For backward compatibility we can define
     * all changes in document property selectors. If
     * user saves it's page and then updates plugin
     * (where we change some selector), property
     * getter on that element will no longer have
     * value as user saved it. So all property
     * selector changes go here as array of
     * arrays with property name, old selector
     * and new selector in it ..
     *
     * For time being those changes are defined here
     *
     * @var array
     */
    protected $documentSelectorChanges = [
        ['fontFamily', ' #op3-designer-element p, [data-op3-element-type="form"] .op3-element-input-label, [data-op3-element-type="form"] .op3-element-input-edit, #op3-designer-element blockquote, #op3-designer-element li, [data-op3-element-type="button"], [data-op3-element-type="bulletblock"], [data-op3-element-type="bulletlist"], [data-op3-element-type="progressbar"] .op3-progressbar-label', 'fontFamily', ' #op3-designer-element p, [data-op3-element-type="form"] .op3-element-input-label, [data-op3-element-type="form"] .op3-element-input-edit, #op3-designer-element blockquote, #op3-designer-element li, [data-op3-element-type="button"], [data-op3-element-type="bulletblock"], [data-op3-element-type="bulletlist"], [data-op3-element-type="progressbar"] .op3-progressbar-label, [data-op3-element-type="treemenu"], [data-op3-element-type="countdowntimer"] .op3-countdown-timer'],
        ['fontFamily', ' #op3-designer-element p, [data-op3-element-type="form"] .op3-element-input-label, [data-op3-element-type="form"] .op3-element-input-edit, #op3-designer-element blockquote, #op3-designer-element li, [data-op3-element-type="button"], [data-op3-element-type="bulletblock"], [data-op3-element-type="bulletlist"], [data-op3-element-type="progressbar"] .op3-progressbar-label, [data-op3-element-type="treemenu"]', 'fontFamily', ' #op3-designer-element p, [data-op3-element-type="form"] .op3-element-input-label, [data-op3-element-type="form"] .op3-element-input-edit, #op3-designer-element blockquote, #op3-designer-element li, [data-op3-element-type="button"], [data-op3-element-type="bulletblock"], [data-op3-element-type="bulletlist"], [data-op3-element-type="progressbar"] .op3-progressbar-label, [data-op3-element-type="treemenu"], [data-op3-element-type="countdowntimer"] .op3-countdown-timer'],
        ['fontSize', ' #op3-designer-element p, [data-op3-element-type="form"] .op3-element-input-label, [data-op3-element-type="form"] .op3-element-input-edit, #op3-designer-element blockquote, #op3-designer-element li, [data-op3-element-type="button"], [data-op3-element-type="bulletblock"], [data-op3-element-type="bulletlist"], [data-op3-element-type="progressbar"] .op3-progressbar-label', 'fontSize', ' #op3-designer-element p, [data-op3-element-type="form"] .op3-element-input-label, [data-op3-element-type="form"] .op3-element-input-edit, #op3-designer-element blockquote, #op3-designer-element li, [data-op3-element-type="button"], [data-op3-element-type="bulletblock"], [data-op3-element-type="bulletlist"], [data-op3-element-type="progressbar"] .op3-progressbar-label, [data-op3-element-type="treemenu"], [data-op3-element-type="countdowntimer"] .wrapper'],
        ['fontSize', ' #op3-designer-element p, [data-op3-element-type="form"] .op3-element-input-label, [data-op3-element-type="form"] .op3-element-input-edit, #op3-designer-element blockquote, #op3-designer-element li, [data-op3-element-type="button"], [data-op3-element-type="bulletblock"], [data-op3-element-type="bulletlist"], [data-op3-element-type="progressbar"] .op3-progressbar-label, [data-op3-element-type="treemenu"]', 'fontSize', ' #op3-designer-element p, [data-op3-element-type="form"] .op3-element-input-label, [data-op3-element-type="form"] .op3-element-input-edit, #op3-designer-element blockquote, #op3-designer-element li, [data-op3-element-type="button"], [data-op3-element-type="bulletblock"], [data-op3-element-type="bulletlist"], [data-op3-element-type="progressbar"] .op3-progressbar-label, [data-op3-element-type="treemenu"], [data-op3-element-type="countdowntimer"] .wrapper'],
        ['fontFamily', ' #op3-designer-element p, #op3-designer-element span, [data-op3-element-type="form"] .op3-element-input-label, [data-op3-element-type="form"] .op3-element-input-edit, #op3-designer-element blockquote, #op3-designer-element li, [data-op3-element-type="button"], [data-op3-element-type="bulletblock"], [data-op3-element-type="bulletlist"], [data-op3-element-type="progressbar"] .op3-progressbar-label', 'fontFamily', ' #op3-designer-element p, [data-op3-element-type="form"] .op3-element-input-label, [data-op3-element-type="form"] .op3-element-input-edit, #op3-designer-element blockquote, #op3-designer-element li, [data-op3-element-type="button"], [data-op3-element-type="bulletblock"], [data-op3-element-type="bulletlist"], [data-op3-element-type="progressbar"] .op3-progressbar-label, [data-op3-element-type="treemenu"], [data-op3-element-type="countdowntimer"] .op3-countdown-timer'],
    ];
    /**
     * Force DB update flag
     *
     * @var boolean
     */
    public $forceDocumentSelectorsDataRefresh = false;

    /**
     * Create new editor page with a config
     *
     * @param  array  $pageData
     * @param  bool  $prerender
     * @throws Exception
     */
    public function __construct(array $pageData, $prerender = true)
    {
        // Initialize some services
        $this->pageData          = $pageData;
        $this->stylesheet        = new Stylesheet;
        $this->children          = new ElementCollection;
        $this->assets            = new PageAssets;
        $this->elementRepo       = new ElementRepository;
        $this->pageRepo          = new PageRepository;

        // Init traits
        $this->initGlobalElements();

        // Init the page
        $this->init($this->pageData);

        // And prerender if needed
        if ($prerender) {
            $this->prerender();
        }
    }

    /**
     * Initialize page and build up objects
     *
     * @param array $page
     * @return void
     */
    protected function init(array $page = [])
    {
        // Add some required properties
        $this->id           = isset($page['id'])            ? $page['id']            : null;
        $this->pageTemplate = isset($page['page_template']) ? $page['page_template'] : null;
        $this->summary      = isset($page['summary'])       ? $page['summary']       : null;

        // Add children
        $children = (isset($page['data']) and isset($page['data']->children)) ? $page['data']->children : [];

        if ($children) {
            foreach ($children as $elementConfig) {
                $this->children->push($this->buildElement($elementConfig));
            }
        }

        // Add WP post if possible
        if (! $this->wpPost) {
            $this->wpPost = get_post($this->id);
        }

        // And save all UUID's to container
        $this->uuids = $this->findAllPageUuids($page['data']);
    }

    /**
     * Pre-render the page so we can fetch the styles
     *
     * @param bool $checkCache
     * @param array $skipElements
     * @return string
     * @throws Exception
     */
    public function prerender($checkCache = true, $skipElements = [])
    {
        // fix document selectors
        $this->fixDocumentSelectors();

        // We also need to check if the content can be fetched from the cache
        // This is only available outside of the admin section
        $cachedHtml = $checkCache ? $this->cached() : null;

        // Check if we got a cache hit
        if ($cachedHtml) {
            $this->buildRootElement();
            $this->html = $cachedHtml;
        } else {
            // Build up the root object (this should also be called when generating a stylesheet)
            $this->buildRootElement();

            // Start the page root element
            $this->html = '<div id="op3-designer-element" ';

            // Add some global params
            // @TODO: Re-factor this so we don't have to do this for every parameter
            if (op3_is_admin()) {
                $this->html .= 'data-op3-funnel-page-template="'.(int) get_post_meta($this->id, '_op3_funnel_page_template', true).'"';
            }

            // Close out div tag and start building elements
            $this->html .= '>'.PHP_EOL;
            $this->html .= '<div data-op3-children="' . count($this->children).'">';

            // Render each element
            foreach ($this->children as $element) {
                if ($element) {
                    // we are skipping some elements per parameter
                    if (in_array($element->type, $skipElements))
                        continue;

                    $this->html .= $element->render();
                } else {
                    $this->html .= '<div>Error with element.</div>';
                }
            }

            // Close it out
            $this->html .= '</div>'.PHP_EOL;
            $this->html .= '</div><!-- #op3-designer-element -->'.PHP_EOL;

            // And cache it for the frontend
            $this->updateCache($this->html);
        }

        // If post is password protected or correct password is not provided return
        if (! op3_is_admin() && post_password_required($this->id)) {
            $this->html = '';
        }

        return $this->html;
    }

    /**
     * Render the page and output the HTML code
     *
     * @return string
     */
    public function render()
    {
        return $this->html;
    }



    /**
     * Return page data
     *
     * @return array
     */
    public function getData()
    {
        return $this->pageData;
    }

    /**
     * Return page children elements
     *
     * @return ElementCollection
     */
    public function getChildren()
    {
        return $this->children;
    }

    /**
     * Get list of all related posts
     *
     * @param  array  $elements
     * @return array
     */
    public function getRelatedPosts($elements = null)
    {
        $result = [];

        // Set root elements
        /*if (! $elements) {
            $elements = $this->getChildren();
        }

        // Loop through all elements and find page ids
        foreach ($elements as $element) {
            if ($element->type === 'membershipcontentlistitem') {
                $uuid = $element->getParent()->uuid;
                $result[$uuid][] = $element->options->all->membershipPageId->{" [data-op3-membership-page-id]"};
            }
            // And check if we have child elements
            if ($element->getChildren()) {
                $relatedPostIds = $this->getRelatedPosts($element->getChildren());

                // Add to results
                $result = array_merge($result, $relatedPostIds);
            }
        }*/

        return $result;
    }

    /**
     * Apply custom properties to page
     *
     * @param $element
     */
    public function applyCustomElementProperties($element)
    {
        foreach ($element->getOptionKeys('all') as $property) {
            $signatureKeys = [];
            $propertyConfig = op3_property_config(kebab_case($property));

            if ($propertyConfig and ! empty($propertyConfig) and is_array($propertyConfig)) {
                $options = $element->getOption($property, 'all');
                $output  = '';

                // Get all options and build output
                foreach ($options as $key => $option) {
                    $signatureKeys[] = trim($key);
                    $output .= $option . ' ';
                }

                // Get hook and renderer
                $hook          = array_get($propertyConfig, 'hook');
                $selector      = array_get($propertyConfig, 'selector');
                $priority      = (int) array_get($propertyConfig, 'hookPriority', 10);
                $renderClass   = "\\" . array_get($propertyConfig, 'renderClass', SimpleRender::class);
                $hookSignature = md5($hook.'__'.$renderClass.'__'.implode("__", $signatureKeys));

                if ($hook and $renderClass and class_exists($renderClass) and ! HookRegistry::isRegistered($hookSignature)) {
                    add_action($hook, [new $renderClass($hook, $selector, $output), 'render'], $priority);
                    HookRegistry::register($hookSignature);
                } elseif (! class_exists($renderClass)) {
                    op3_log("[OP3] Property render class for '$property' not found '$renderClass'", 'error');
                }
            }
        }
    }

    /**
     * Return WP post object for the page
     *
     * @param  null  $key
     * @return WP_Post
     */
    public function wpPost($key = null)
    {
        // Simply return complete object
        if (! $key) {
            return $this->wpPost;
        }

        // Or else try to return the requested property
        return object_get($this->wpPost, $key);
    }

    /**
     * Backward compatibility selectors fix
     *
     * @return void
     */
    private function fixDocumentSelectors()
    {
        $hasChanges = false;

        if (! isset($this->pageData['data']->options))
            return;

        foreach($this->pageData['data']->options as $media => &$rules) {
            if (empty($rules)) {
                continue;
            }

            foreach($this->documentSelectorChanges as $change) {
                $propertyNameOld = $change[0];
                $selectorOld = $change[1];
                $propertyNameNew = $change[2];
                $selectorNew = $change[3];

                // new selector not defined
                if (empty($propertyNameNew)) {
                    $propertyNameNew = $propertyNameOld;
                }

                // no changes, invalid entry, wtf???
                if ($propertyNameOld == $propertyNameNew && $selectorOld == $selectorNew) {
                    continue;
                }

                // get current value
                $value = null;
                if (isset($rules->{$propertyNameOld}) && empty($selectorOld) && is_string($rules->{$propertyNameOld})) {
                    $value = $rules->{$propertyNameOld};
                    unset($rules->{$propertyNameOld});
                } elseif (isset($rules->{$propertyNameOld}) && is_object($rules->{$propertyNameOld}) && isset($rules->{$propertyNameOld}->{$selectorOld})) {
                    $value = $rules->{$propertyNameOld}->{$selectorOld};
                    unset($rules->{$propertyNameOld}->{$selectorOld});

                    if (is_countable($rules->{$propertyNameOld}) && count($rules->{$propertyNameOld}) === 1) {
                        unset($rules->{$propertyNameOld});
                    }
                } else {
                    continue;
                }

                // set new value to new property/selector
                if ( ! isset($rules->{$propertyNameNew}) && empty($selectorNew)) {
                    $rules->{$propertyNameNew} = $value;
                } elseif ( ! isset($rules->{$propertyNameNew})) {
                    $rules->{$propertyNameNew} = [$selectorNew => $value];
                } elseif (is_object($rules->{$propertyNameNew})) {
                    $rules->{$propertyNameNew}->{$selectorNew} = $value;
                }
                else {
                    $rules->{$propertyNameNew} = ["" => $rules->{$propertyNameNew}];
                    $rules->{$propertyNameNew}->{$selectorNew} = $value;
                }

                // flag changes so we can force db update
                $hasChanges = true;
            }
        }

        // force db update
        if ($hasChanges) {
            if (isset($this->pageData['data']))
                $this->pageRepo->updateData($this->id, $this->pageData['data'], false);
        }
    }

    /**
     * Refresh the page data and re-save to DB
     * This is used for fixing selectors of elements
     *
     * @param  string  $revision
     * @return void
     * @throws Exception
     */
    public function refreshData($revision = null)
    {
        if ($this->forceDataRefresh) {
            op3_log()->debug('[OPRENDER] Force update page "' . $this->id . '" with new page data.');

            // Fetch raw page data
            $pageForUpdate = $this->pageRepo->find($this->id, false, $revision);
            $pageData      = $pageForUpdate->getData();

            // And write updated data to DB
            if (isset($pageData['data']) && $pageData['data']) {
                $this->pageRepo->updateData($this->id, $pageData['data']);
            }
        }
    }

    /**
     * Update the DB data with current structure
     *
     * @param  mixed  $data
     * @return void
     * @throws Exception
     */
    public function updateFromData($data = null)
    {
        if ($this->forceUpdateData) {
            op3_log()->debug('[OPRENDER] Force update page data from structure "' . $this->id . '".');

            if (! $data) {
                $data = $this->getData();
            }

            // Find page to update
            $pageForUpdate = $this->pageRepo->find($this->id, false);
            $pageData      = $pageForUpdate->getData();

            // Override children data
            $pageData['data']->children = $data['data']->children;

            // And write updated data to DB
            if (isset($pageData['data']) && $pageData['data']) {
                wp_update_post(['ID' => $this->id]);
                $this->pageRepo->updateData($this->id, $pageData['data']);
                $this->pageRepo->updateData($this->id, $pageData['data']);
                $this->pageRepo->updateSummary($this->id, $pageData['data']);
            }
        }
    }

    /**
     * Simply render page to HTML output
     *
     * @return string
     */
    public function __toString()
    {
        return $this->render();
    }
}
