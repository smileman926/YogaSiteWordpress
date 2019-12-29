<?php

namespace OPBuilder\Providers;

/**
 * Handle the live editor page templates
 */
class RegisterPageTemplates
{
    /**
     * @var array
     */
    protected $templates;

    protected $templateFiles = [
        'op_builder_blank'      => 'resources/templates/blank.php',
        'op_builder_full_width' => 'resources/templates/full_width.php',
    ];

    /**
     * Init the templates
     */
    public function __construct()
    {
        $this->templates = [];

        // Register helper methods
        add_action('op-builder/templates/header',         [$this, 'getHeader']);
        add_action('op-builder/templates/footer',         [$this, 'getFooter']);
        add_action('op-builder/templates/content',        [$this, 'theContent']);
        add_action('op-builder/templates/header-custom',  [$this, 'getCustomHeader']);
        add_action('op-builder/templates/footer-custom',  [$this, 'getCustomFooter']);

        // Add a filter to the attributes metabox to inject template into the cache.
        if (version_compare(floatval(get_bloginfo('version')), '4.7', '<')) {
            // 4.6 and older
            add_filter('page_attributes_dropdown_pages_args', [$this, 'registerTemplates']);
        } else {
            // We need to add the templates to all post types
            $postTypes = get_post_types(['public' => true]);

            foreach ($postTypes as $postTypeKey => $postType) {
                if ($postTypeKey != 'attachment') {
                    add_filter('theme_' . $postTypeKey . '_templates', [$this, 'addNewTemplate']);
                }
            }
        }

        // Inject the templates into the page cache
        add_filter('wp_insert_post_data', [$this, 'registerTemplates']);

        // Determine if a page has an OP3 template assigned and display it
        // add_filter('template_include', [$this, 'viewTemplate']); // @TODO: This is probably the wrong hook, need to test it though
        add_filter('page_template',   [$this, 'viewTemplate']);
        add_filter('single_template', [$this, 'viewTemplate']);

        // The templates are added here
        $this->templates = [
            'op_builder_blank'      => 'OP3 - Blank Template',
            'op_builder_full_width' => 'OP3 - Full Width Template',
        ];
    }

    /**
     * Adds templates to the page dropdown for v4.7+
     *
     * @param   array $postTemplates
     * @return  array
     */
    public function addNewTemplate($postTemplates)
    {
        $postTemplates = array_merge($postTemplates, $this->templates);

        return $postTemplates;
    }

    /**
     * Register the plugin templates
     *
     * @param  mixed $attributes
     * @return mixed
     */
    public function registerTemplates($attributes)
    {
        // Create the key used for the themes cache
        $cacheKey = 'page_templates-' . md5(get_theme_root() . '/' . get_stylesheet());

        // Retrieve the cache list.
        // If it doesn't exist, or it's empty prepare an array
        $templates = wp_get_theme()->get_page_templates();
        if (empty($templates)) {
            $templates = [];
        }

        // New cache, therefore remove the old one
        wp_cache_delete($cacheKey , 'themes');

        // Now add our template to the list of templates by merging our templates
        // with the existing templates array from the cache.
        $templates = array_merge($templates, $this->templates);

        // Add the modified cache to allow WordPress to pick it up for listing
        // available templates
        wp_cache_add($cacheKey, $templates, 'themes', 1800);

        return $attributes;
    }

    /**
     * Tell WordPress where the real page template file is.
     *
     * @param  string $template
     * @return string
     */
    public function viewTemplate($template)
    {
        // Get global post
        global $post;

        // Return template if post is empty
        if ( ! $post) {
            return $template;
        }

        // Return default template if we don't have a custom one defined
        $metaTemplate = get_post_meta($post->ID, '_wp_page_template', true);
        if ( ! isset($this->templates[$metaTemplate])) {
            return $template;
        }

        // If we don't have a template path defined
        if (! isset($this->templateFiles[$metaTemplate])) {
            return $template;
        }

        // Set the path for the custom template
        $file = plugin_dir_path(__FILE__) . '../../' . $this->templateFiles[$metaTemplate];

        // Just to be safe, we check if the file exist first
        if (file_exists($file)) {
            return $file;
        }

        // Return template
        return $template;
    }

    /**
     * Render WP header
     *
     * @return void
     */
    public function getHeader()
    {
        get_header();
    }

    /**
     * Render WP footer
     *
     * @return void
     */
    public function getFooter()
    {
        get_footer();
    }

    /**
     * Render custom WP OP header
     *
     * @return void
     */
    public function getCustomHeader()
    {
        include(OP3__DIR__ . '/resources/templates/partials/header.php');
    }

    /**
     * Render custom WP OP footer
     *
     * @return void
     */
    public function getCustomFooter()
    {
        include(OP3__DIR__ . '/resources/templates/partials/footer.php');
    }

    /**
     * Run OP the content
     *
     * @return void
     */
    public function theContent() {
        the_content();
    }
}
