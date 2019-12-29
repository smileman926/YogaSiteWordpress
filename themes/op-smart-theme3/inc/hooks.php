<?php
/**
 * Hooks and filters and functions that are attaching to it.
 *
 * @package smart
 */

/**
 * Add "op-navbar-fixed" CSS class to body and .op-navbar elements in case that
 * Sticky Header setting is turned on.
 *
 * @param  array $classes
 * @return array
 */
function op_sticky_header($classes)
{
    global $op_options;

    if (isset($op_options['sticky_header']) && (int) $op_options['sticky_header'] === 1) {
        $classes[] = 'op-navbar-fixed';

        if (isset($op_options['header_style']) && !empty($op_options['header_style'])) {
            // $classes[] = 'op-navbar-fixed-header-style-' . op_redux_parse_name_from_select_image($op_options['header_style']);
            $classes[] = 'op-navbar-fixed-header-style-' . op_get_header_template();
        }
    }

    return $classes;
}
add_filter('op_navbar_class', 'op_sticky_header');
add_filter('body_class', 'op_sticky_header');

/**
 * Add header style type class to <header> element
 * @param  array $classes
 * @return array
 */
function op_header_style($classes)
{
    global $op_options;

    if (isset($op_options['header_style']) && !empty($op_options['header_style'])) {
        // $classes[] = 'header-style-' . op_redux_parse_name_from_select_image($op_options['header_style']);
        $classes[] = 'header-style-' . op_get_header_template();
    }

    return $classes;
}
add_filter('op_navbar_class', 'op_header_style');

/**
 * Load custom "header" scripts added through settings.
 */
function op_load_header_scripts()
{
    // not rendering custom scripts in OP3 editor
    if (defined('OP3_VERSION') && (op3_is_admin())) {
        echo '';
    } else {
        op_render_redux_custom_script('header');
    }
}
add_action('wp_head', 'op_load_header_scripts');

/**
 * Load custom "css" styles added through settings.
 */
function op_load_css_scripts()
{
    if (defined('OP3_VERSION') && (is_op3_blank_template())) {
        echo '';
    } else {
        op_render_redux_custom_script('css', true, '<style type="text/css">', '</style>');
    }
}
add_action('wp_head', 'op_load_css_scripts', 20);

/**
 * Load custom CSS styles added on through post specific options.
 */
function op_load_css_per_page()
{
    /**
     * $op_options are global styles, defined in theme options,
     * $options are styles defined on a particular post/page
     */

    global $op_options;
    $styles = array();

    if (is_op_page()) {
        return;
    }

    // James wants letter spacing to be -1 when the title
    // is uppercase and 1 when the title is lowercase.
    // But if user has advanced typography turned
    // on, we need to let her make this
    // decision for herself
    if ((int) $op_options['typography_uppercase_styling'] === 1) {

        $letter_spacing = '';
        if ((int) $op_options['typography_advanced'] === 0) {
            $letter_spacing = ' letter-spacing: -1px;';
        }

        $styles['.op-homepage-hero-title, .op-headline, .widget-title, .op-list-headline, .post-box-title, .op-entry h1, .op-entry h2, .op-entry h3, .op-entry h4, .op-entry h5, .op-entry h6, .entry-content h1, .entry-content h2, .entry-content h3, .entry-content h4, .entry-content h5, .entry-content h6'] = 'text-transform: uppercase;' . $letter_spacing;
    }


    /**
     * Global CSS blog styles
     */

    if (isset($op_options['sitewide_post_header_background_color'])) {
        $header_bg = $op_options['sitewide_post_header_background_color'];
        if (($header_bg['from']) && isset($header_bg['to'])) {
            $styles['.op-blog-post-header'][] = op_render_css_gradient($header_bg['from'], $header_bg['to']);
        }
    }

    // Post / Page styles
    if (is_single() || is_page()) {
        $options = redux_post_meta('op_options', get_queried_object_id());

        // Header text color
        if (isset($options['post_header_text_color']) && !empty($options['post_header_text_color'])) {
            $styles['.op-blog-post-header'][] = 'color: ' . $options['post_header_text_color'] . '; ';
            $styles['.op-hero-area .feature-title'][] = 'color: ' . $options['post_header_text_color'] . '; ';
            $styles['.op-hero-area .op-headline'][] = 'color: ' . $options['post_header_text_color'] . '; ';
            $styles['.page .op-hero-area .op-headline'][] = 'color: ' . $options['post_header_text_color'] . '; ';
            $styles['.op-hero-area .op-blog-meta-wrapper'][] = 'color: ' . $options['post_header_text_color'] . '; ';
            $styles['.op-hero-area .op-hero-layout-meta-wrap a'][] = 'color: ' . $options['post_header_text_color'] . '; ';
         }

        if (isset($options['post_header_category_text_color'])) {
            $styles['.op-blog-post-header .op-small-category-link a'][] = 'color: ' . $options['post_header_category_text_color'] . ';';
        }

        if (isset($options['post_header_category_background_color'])) {
            $styles['.op-blog-post-header .op-small-category-link a'][] = 'background-color: ' . $options['post_header_category_background_color'] . '; ';
        }
    }


    if (is_home()) {

        // Output this if not featured post
        if ($op_options['homepage_hero_design'] != 'featured-post') {

            if (isset($op_options['homepage_hero_background_color']) && is_array($op_options['homepage_hero_background_color'])) {
                $styles['.op-homepage-hero-area'][] = op_render_css_gradient($op_options['homepage_hero_background_color']['from'], $op_options['homepage_hero_background_color']['to']);
            }

        }

        // Output this when featured post and Hero Background Behaviour is set to Custom
        if ($op_options['homepage_hero_design'] == 'featured-post' && (int) $op_options['homepage_hero_background_behaviour'] !== 1) {

            if (isset($op_options['homepage_hero_background_color_featured_post']) && is_array($op_options['homepage_hero_background_color_featured_post'])) {
                $styles['.op-homepage-hero-area'][] = op_render_css_gradient($op_options['homepage_hero_background_color_featured_post']['from'], $op_options['homepage_hero_background_color_featured_post']['to']);
            }

            if (empty($op_options['homepage_hero_background_featured_post']['background-image'])) {
                $styles['.op-homepage-hero-container'][] = 'background-color: transparent;';
            }

        }

        // Output this when featured post and Hero Background Behaviour is set to Default
        if ($op_options['homepage_hero_design'] == 'featured-post'
            && (int) $op_options['homepage_hero_background_behaviour'] === 1) {

            if (isset($op_options['sitewide_post_header_background_color'])) {
                $header_bg = $op_options['sitewide_post_header_background_color'];
                if (isset($header_bg['from']) && isset($header_bg['to'])) {
                    $styles['.op-homepage-hero-area'][] = op_render_css_gradient($header_bg['from'], $header_bg['to']);
                }
            }

        }

    }

    if (!empty($styles)) {
        if (defined('OP3_VERSION') && (is_op3_blank_template())) {
            echo '';
        } else {
            echo '<style type="text/css">' . op_render_css_rules($styles) . '</style>';
        }
    }
}

add_action('wp_head', 'op_load_css_per_page', 151);

/**
 * Load custom "in_body_tag" scripts added through settings.
 */
function op_load_in_body_tag_scripts()
{
    op_render_redux_custom_script('in_body_tag');
}
add_action('op_body_tag_start', 'op_load_in_body_tag_scripts');

/**
 * Load custom "footer" scripts added through settings.
 */
function op_load_footer_scripts()
{
    if (defined('OP3_VERSION') && (op3_is_admin())) {
        echo '';
    } else {
        op_render_redux_custom_script('footer');
    }
}
add_action('wp_footer', 'op_load_footer_scripts');

/**
 * Append additional avatar CSS classes to the avatar markup ("author-photo" and "photo" classes).
 *
 * @param  string $class
 * @return string
 */
function op_change_avatar_css($class)
{
    return str_replace("class='avatar", "class='avatar img-circle author-photo photo", $class);
}
add_filter('get_avatar', 'op_change_avatar_css');

/**
 * Append search form to main menu if "search_in_header" option turned on.
 *
 * @param  array $items
 * @param  stdClass $args
 * @return array
 */
function op_add_search_to_top_menu($items, $args)
{
    global $op_options;

    if ('primary' === $args->theme_location && (int) $op_options['search_in_header'] === 1) {
        return op_header_menu_search_item($items);
    }

    return $items;
}
add_filter('wp_nav_menu_items', 'op_add_search_to_top_menu', 10, 2);

/**
 * Initialize sidebars based on "footer_sidebars" setting.
 *
 * Setting has a structure of bootstrap columns with "_" used as a separator. For example, one column is "12", two equal columns are "6_6".
 */
function op_footer_sidebars_init()
{
    global $op_options;

    if ($op_options and isset($op_options['footer_sidebars'])) {
        $sidebars = explode('_', $op_options['footer_sidebars']);

        for ($a = 1; $a < count($sidebars) + 1; $a += 1) {
            register_sidebar(array(
                'name'          => sprintf(_x('Footer Sidebar #%d', 'Widgets', 'op3_smart'), $a),
                'id'            => sprintf('op_footer_sidebar_%d', $a),
                'before_widget' => '<aside id="%1$s" class="widget %2$s">',
                'after_widget'  => '</aside>',
                'before_title'  => '<h2 class="widget-title">',
                'after_title'   => '</h2>',
            ));
        }
    }
}

add_action('widgets_init', 'op_footer_sidebars_init');

/**
 * Determines if blog post layout has sidebars turned on
 * @param  bool $hasSidebar
 * @return bool
 */
function op_template_has_sidebar($hasSidebar)
{
    global $op_options;

    /**
     * We want to force no_sidebar on woocommerce
     * cart and checkout pages
     */
    if (class_exists('WooCommerce') ) {
        if (is_cart() || is_checkout()) {
            return false;
        }
    }

    // Check if sidebar is set on the page itself
    if (is_single() || is_page()) {
        $options = redux_post_meta('op_options', get_queried_object_id());
        if (isset($options['single_layout_override']) && (int) $options['single_layout_override'] === 0) {
            if ($options['single_layout_sidebar'] === 'no_sidebar') {
                return false;
            }
            return true;
        }
    }

    // Check if sidebar is set in theme options
    $template = op_get_template_type();
    if (isset($op_options[$template . '_sidebar']) && $op_options[$template . '_sidebar'] === 'no_sidebar') {
        return false;
    }

    return true;
}
add_filter('op_template_has_sidebar', 'op_template_has_sidebar');

/**
 * Appends "left-sb" or "right-sb" class to container depending on which sidebar is turned on
 * @param  array $classes
 * @return array
 */
function op_template_sidebar_container_class($classes)
{
    global $op_options;

    // Check if sidebar is set on the page itself
    if (is_single() || is_page()) {
        $options = redux_post_meta('op_options', get_queried_object_id());
        if (isset($options['single_layout_override']) && (int) $options['single_layout_override'] === 0) {
            if ($options['single_layout_sidebar'] === 'sidebar_left') {
                $classes[] = 'left-sb';
            } elseif ($options['single_layout_sidebar'] === 'sidebar_right') {
                $classes[] = 'right-sb';
            }
            return $classes;
        }
    }

    // Check if sidebar is set in theme options
    $template = op_get_template_type();
    if ($op_options[$template . '_sidebar'] === 'sidebar_left') {
        $classes[] = 'left-sb';
    } elseif ($op_options[$template . '_sidebar'] === 'sidebar_right') {
        $classes[] = 'right-sb';
    }

    return $classes;
}
add_filter('op_template_container_class', 'op_template_sidebar_container_class');

/**
 * Appends push class if left sidebar is turned on
 * @param  array $classes
 * @return array
 */
function op_template_sidebar_main_column_class($classes)
{
    global $op_options;

    // Check if sidebar is set on the page itself
    if (is_single() || is_page()) {
        $options = redux_post_meta('op_options', get_queried_object_id());
        if (isset($options['single_layout_override']) && (int) $options['single_layout_override'] === 0) {
            if ($options['single_layout_sidebar'] === 'sidebar_left') {
                $classes[] = 'col-md-push-4';
            }
            return $classes;
        }
    }

    // Check if sidebar is set in theme options
    $template = op_get_template_type();
    if ($op_options[$template . '_sidebar'] === 'sidebar_left') {
        $classes[] = 'col-md-push-4';
    }

    return $classes;
}
add_filter('op_template_main_column_class', 'op_template_sidebar_main_column_class');

/**
 * Appends pull class if left sidebar is turned on
 * @param  array $classes
 * @return array
 */
function op_template_sidebar_side_column_class($classes)
{
    global $op_options;

    $template = op_get_template_type();

    // Check if sidebar is set on the page itself
    if (is_single() || is_page()) {
        $options = redux_post_meta('op_options', get_queried_object_id());
        if (isset($options['single_layout_override']) && (int) $options['single_layout_override'] === 0) {
            if ($options['single_layout_sidebar'] === 'sidebar_left') {
                $classes[] = 'col-md-pull-8';
            }
            return $classes;
        }
    }

    // Check if sidebar is set theme options
    if ($op_options[$template . '_sidebar'] === 'sidebar_left') {
        $classes[] = 'col-md-pull-8';
    }

    return $classes;
}
add_filter('op_template_side_column_class', 'op_template_sidebar_side_column_class');

/**
 * Render sticky social sharing buttons depending on post type activated.
 *
 * @return void
 */
function op_social_area_sticky()
{
    global $op_options;
    $postType = get_post_type();

    // Check if we are dealing with WooCommerce pages
    if ( class_exists( 'WooCommerce' ) ) {
        if ('page' === $postType && (is_woocommerce() || is_cart() || is_checkout())) {
            return;
        }
    }

    // Leave early if "sticky" isn't selected or the "post_type" isn't checked as well
    if ($op_options['social_share_sticky'] === 'no'
        || !isset($op_options['social_share_post_types'][$postType])
        || (int) $op_options['social_share_post_types'][$postType] !== 1) {
        return;
    }
?>
    <div class="sm-wrap fixed-dynamic <?php echo esc_attr($op_options['social_share_sticky']); ?>">
        <?php op_share_buttons_single(); ?>
    </div>
<?php
}
add_action('op_product_after_header', 'op_social_area_sticky', 30);
add_action('op_single_after_header', 'op_social_area_sticky', 30);
add_action('op_page_after_header', 'op_social_area_sticky', 30);

/**
 * Render social sharing buttons before content.
 *
 * @return void
 */
function op_social_area_before_content()
{
    global $op_options;

    $postType = get_post_type();

    // Check if we are dealing with WooCommerce pages
    if ( class_exists( 'WooCommerce' ) ) {
        if ('page' === $postType && (is_woocommerce() || is_cart() || is_checkout())) {
            return;
        }
    }
    // Leave early if "before_content" isn't checked or the "post_type" isn't checked as well
    if ((int) $op_options['social_share_positions']['before_content'] !== 1
        || $op_options['social_share_sticky'] !== 'no'
        || !isset($op_options['social_share_post_types'][$postType])
        || (int) $op_options['social_share_post_types'][$postType] !== 1) {
        return;
    }
?>
    <div class="sm-wrap">
        <?php op_share_buttons_single(); ?>
    </div>
<?php
}
add_action('woocommerce_before_single_product_summary', 'op_social_area_before_content', 9);
add_action('op_single_before_content', 'op_social_area_before_content', 30);
add_action('op_page_before_content', 'op_social_area_before_content', 30);

/**
 * Render social sharing buttons after content.
 *
 * @return void
 */
function op_social_area_after_content()
{
    global $op_options;

    $postType = get_post_type();

    // Check if we are dealing with WooCommerce pages
    if ( class_exists( 'WooCommerce' ) ) {
        if ('page' === $postType && (is_woocommerce() || is_cart() || is_checkout())) {
            return;
        }
    }

    // Leave early if "after_content" isn't checked or the "post_type" isn't checked as well
    if ($op_options['social_share_sticky'] !== 'no'
        || (int) $op_options['social_share_positions']['after_content'] !== 1
        || !isset($op_options['social_share_post_types'][$postType])
        || (int) $op_options['social_share_post_types'][$postType] !== 1) {
        return;
    }
?>
    <div class="sm-wrap">
        <?php op_share_buttons_single(); ?>
    </div>
<?php
}
add_action('woocommerce_after_single_product_summary', 'op_social_area_after_content', 11);
add_action('op_single_after_content', 'op_social_area_after_content', 30);
add_action('op_page_after_content', 'op_social_area_after_content', 30);

/**
 * Add boostrap "active" classes to selected items in a WP navigation walker.
 *
 * @param  array $classes
 * @param  array $item
 * @return array
 */
function op_bootstrap_nav_selected_class($classes, $item)
{
    if (in_array('current-menu-item', $classes)) {
        $classes[] = 'active ';
    }

    return $classes;
}
add_filter('nav_menu_css_class' , 'op_bootstrap_nav_selected_class' , 10, 2);

/**
 * Add bootstrap classes to posts prev/next pagination buttons.
 *
 * @return string
 */
function op_posts_pagination_link_attributes()
{
    return 'class="btn btn-default btn-sm"';
}
add_filter('next_posts_link_attributes', 'op_posts_pagination_link_attributes');
add_filter('previous_posts_link_attributes', 'op_posts_pagination_link_attributes');

/**
 * Render prev/next post archive navigation if infinite scroll is turned off.
 *
 * @return void
 */
function op_posts_archive_navigation()
{
    global $op_options;
    $additional_pagination_class = '';

    if (is_home() || is_search()) {
        $additional_pagination_class = 'pagination-container--' . op_get_homepage_template();
    } elseif (is_archive()) {
        $additional_pagination_class = 'pagination-container--' . op_get_archive_template();
    }

    if (!is_infinite_scroll_enabled()) {
        ?>
            <div class="container op-container pagination-container <?php echo $additional_pagination_class; ?>">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="pagination">
                            <?php next_posts_link(_x('« Older Articles', 'Content', 'op3_smart')); ?>
                            <?php previous_posts_link(_x('Newer Articles »', 'Content', 'op3_smart')); ?>
                        </div>
                    </div>
                </div>
            </div> <!-- container -->
        <?php
    }
}
add_action('op_index_pagination', 'op_posts_archive_navigation', 20);
add_action('op_archive_pagination', 'op_posts_archive_navigation', 20);
add_action('op_search_pagination', 'op_posts_archive_navigation', 20);

/**
 * Filter posts on home page in main query depending on settting "homepage_content".
 *
 * @param  WP_Query $query
 * @return void
 */
function op_homepage_content_posts_filter($query)
{
    global $op_options;

    // First lets check if we are on home page, that we are altering main query and that the "homepage_contents"
    // isn't set to latest because if it is we don't need to alter the query
    if ($query->is_home() && $query->is_main_query() && $op_options['homepage_content'] !== 'latest') {

        if ($op_options['homepage_content'] === 'categories') {
            // If set to categories then we define "cat" param
            $query->set('cat', $op_options['homepage_category']);
        } else if ($op_options['homepage_content'] === 'tags') {
            // If set to tags then we define "tag_id" param
            $query->set('tag_id', $op_options['homepage_tag']);
        }
    }
}
add_action('pre_get_posts', 'op_homepage_content_posts_filter');

/**
 * Filter search results by post type based on "pages_in_search_results" setting.
 *
 * @param  WP_Query $query
 * @return void
 */
function op_search_results_filter($query)
{
    global $op_options;

    if (!is_admin() && $query->is_search() && (int) $op_options['pages_in_search_results'] !== 1) {
        $query->set('post_type', 'post');
    }
}
add_filter('pre_get_posts','op_search_results_filter');

/**
 * Render featured (sticky) post in a hero.
 *
 * Commented out, because we
 * no longer render sticky
 * posts -> it's all
 * about Homepage
 * Hero section
 * now.
 *
 * @return void
 */
function op_hero_featured_post()
{
    global $op_options;

    // Featured should be shown only on the first page and only if homepage optin form is disabled,
    // and if homepage hero is disabled
    if (is_paged() || $op_options['homepage_hero_enabled'] == 1) {
        return;
    }

    $sticky = get_option('sticky_posts');
    rsort( $sticky );

    // If there are no sticky posts exit early
    if (!count($sticky)) {
        return;
    }

    $args = array(
        'numberposts' => 1,
        'orderby' => 'post_date',
        'order' => 'DESC',
        'post_type' => 'post',
        'post_status' => 'publish',
        'post__in'  => $sticky,
        // 'ignore_sticky_posts' => 1
    );
    $sticky = wp_get_recent_posts($args);

    // If there are no sticky posts exit early
    if (!count($sticky)) {
        return;
    }

    setup_postdata( $sticky[0] );
    ?>
            <div class="op-hero-area op-blog-post" role="banner">
                <div class="feature-contents op-featured-post">
                    <div class="container op-container">
                        <div class="row">
                            <div class="col-md-9 text-left">
                                <?php if ((int) $op_options['blog_metadata_options']['categories'] === 1): ?>
                                    <div class="op-hero-category-wrap">
                                        <?php op_small_category_link(); ?>
                                    </div>
                                <?php endif; ?>
                                <h1 class="op-hero-header" itemprop="headline">
                                    <a class="feature-title" href="<?php echo get_the_permalink(); ?>">
                                        <?php the_title(); ?>
                                    </a>
                                </h1>
                                <div class="row">
                                    <div class="col-md-8">
                                        <div class="op-hero-short-article-description-wrap">
                                            <?php op_short_excerpt(); ?>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="op-hero-layout-meta-wrap">
                                            <?php op_list_layout_meta();?>
                                            <?php op_list_layout_author('op-hero-layout-author-wrap'); ?>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
    <?php

    // Reseting global $post object
    wp_reset_postdata();
}
// add_action('op_index_before_content', 'op_hero_featured_post', 20);

/**
 * Render optin form after header on homepage
 *
 * @return void
 */
function op_home_optin_after_header()
{
    global $op_options;

    // Leave early if optin isn't enabled
    if (!is_home()
        || is_woo()
        || !isset($op_options['homepage_after_header_form_enabled'])
        || (int) $op_options['homepage_after_header_form_enabled'] !== 1) {
        return;
    }

    $html = op3_generate_optin_form('homepage_after_header', 'after-header');
    return op_unescape_brackets($html);
}
add_action('op_index_after_header', 'op_home_optin_after_header', 10);
// add_action('op_archive_after_header', 'op_home_optin_after_header', 10);
// add_action('op_search_after_header', 'op_home_optin_after_header', 10);
// add_action('op_404_after_header', 'op_home_optin_after_header', 10);

/**
 * Render homepage optin form after featured.
 *
 * @return void
 */
function op_home_optin_after_hero()
{
    // Featured should be shown only on the first page and only if homepage optin form is disabled
    if (is_paged()) {
        return;
    }

    global $op_options;

    if (!is_home()
        || is_woo()
        || !isset($op_options['homepage_after_hero_form_enabled'])
        || (int) $op_options['homepage_after_hero_form_enabled'] !== 1) {
        return;
    }

    $html = op3_generate_optin_form('homepage_after_hero', 'after-hero');
    return op_unescape_brackets($html);
}
add_action('op_index_before_content', 'op_home_optin_after_hero', 30);

/**
 * Render optin form after posts on homepage, archive, category, search or 404 page.
 *
 * @return void
 */
function op_home_optin_before_footer()
{
    global $op_options;

    if (!is_home()
        || is_woo()
        || !isset($op_options['homepage_before_footer_form_enabled'])
        || (int) $op_options['homepage_before_footer_form_enabled'] !== 1) {
        return;
    }

    $html = op3_generate_optin_form('homepage_before_footer', 'before-footer');
    return op_unescape_brackets($html);
}
add_action('op_index_before_footer', 'op_home_optin_before_footer', 30);
// add_action('op_archive_after_content', 'op_home_optin_before_footer', 40);
// add_action('op_search_after_content', 'op_home_optin_before_footer', 40);
// add_action('op_404_after_content', 'op_home_optin_before_footer', 40);

/**
 * Search optins
 */
function op_search_optin_after_header()
{
    global $op_options;

    // Leave early if optin isn't enabled
    if (!is_search()
        || !isset($op_options['search_after_header_form_enabled'])
        || (int) $op_options['search_after_header_form_enabled'] !== 1) {
        return;
    }

    $html = op3_generate_optin_form('search_after_header', 'after-header');
    return op_unescape_brackets($html);
}
add_action('op_search_after_header', 'op_search_optin_after_header', 10);

function op_search_optin_after_hero()
{
    global $op_options;

    if (!is_search()
        || !isset($op_options['search_after_hero_form_enabled'])
        || (int) $op_options['search_after_hero_form_enabled'] !== 1) {
        return;
    }

    $html = op3_generate_optin_form('search_after_hero', 'after-hero');
    return op_unescape_brackets($html);
}
add_action('op_search_after_hero', 'op_search_optin_after_hero', 30);

function op_search_optin_before_footer()
{
    global $op_options;

    if (!is_search()
        || !isset($op_options['search_before_footer_form_enabled'])
        || (int) $op_options['search_before_footer_form_enabled'] !== 1) {
        return;
    }

    $html = op3_generate_optin_form('search_before_footer', 'before-footer');
    return op_unescape_brackets($html);
}
add_action('op_search_after_content', 'op_search_optin_before_footer', 30);

/**
 * Archive optins
 */
function op_archive_optin_after_header()
{
    global $op_options;

    // Leave early if optin isn't enabled
    if (!is_archive()
        || !isset($op_options['archive_after_header_form_enabled'])
        || (int) $op_options['archive_after_header_form_enabled'] !== 1) {
        return;
    }

    $html = op3_generate_optin_form('archive_after_header', 'after-header');
    return op_unescape_brackets($html);
}
add_action('op_archive_after_header', 'op_archive_optin_after_header', 10);

function op_archive_optin_after_hero()
{
    global $op_options;

    if (!is_archive()
        || !isset($op_options['archive_after_hero_form_enabled'])
        || (int) $op_options['archive_after_hero_form_enabled'] !== 1) {
        return;
    }

    $html = op3_generate_optin_form('archive_after_hero', 'after-hero');
    return op_unescape_brackets($html);
}
add_action('op_archive_after_hero', 'op_archive_optin_after_hero', 30);

function op_archive_optin_before_footer()
{
    global $op_options;

    if (!is_archive()
        || !isset($op_options['archive_before_footer_form_enabled'])
        || (int) $op_options['archive_before_footer_form_enabled'] !== 1) {
        return;
    }

    $html = op3_generate_optin_form('archive_before_footer', 'before-footer');
    return op_unescape_brackets($html);
}
add_action('op_archive_after_content', 'op_archive_optin_before_footer', 30);

/**
 * 404 optins
 */
function op_404_optin_after_header()
{
    global $op_options;

    // Leave early if optin isn't enabled
    if (!is_404()
        || !isset($op_options['404_after_header_form_enabled'])
        || (int) $op_options['404_after_header_form_enabled'] !== 1) {
        return;
    }

    $html = op3_generate_optin_form('404_after_header', 'after-header');
    return op_unescape_brackets($html);
}
add_action('op_404_after_header', 'op_404_optin_after_header', 10);

function op_404_optin_after_hero()
{
    global $op_options;

    if (!is_404()
        || !isset($op_options['404_after_hero_form_enabled'])
        || (int) $op_options['404_after_hero_form_enabled'] !== 1) {
        return;
    }

    $html = op3_generate_optin_form('404_after_hero', 'after-hero');
    return op_unescape_brackets($html);
}
add_action('op_404_after_hero', 'op_404_optin_after_hero', 30);

function op_404_optin_before_footer()
{
    global $op_options;

    if (!is_404()
        || !isset($op_options['404_before_footer_form_enabled'])
        || (int) $op_options['404_before_footer_form_enabled'] !== 1) {
        return;
    }

    $html = op3_generate_optin_form('404_before_footer', 'before-footer');
    return op_unescape_brackets($html);
}
add_action('op_404_after_content', 'op_404_optin_before_footer', 30);


/**
 * Blog posts
 */
function op_single_optin_after_header()
{
    global $op_options;

    $form_single_disabled = (!isset($op_options['single_after_header_form_enabled']) || (int) $op_options['single_after_header_form_enabled'] !== 1);
    $form_specific_disabled = (!isset($op_options['specific_after_header_form_enabled']) || (int) $op_options['specific_after_header_form_enabled'] !== 1);

    // Leave early if optin isn't enabled
    if (!is_single()
        || is_woo()
        || ($form_single_disabled && $form_specific_disabled)) {
        return;
    }

    $html = op3_generate_optin_form('single_after_header', 'after-header');
    return op_unescape_brackets($html);
}
add_action('op_single_after_header', 'op_single_optin_after_header', 20);

function op_single_optin_after_hero()
{
    global $op_options;

    $form_single_disabled = (!isset($op_options['single_after_hero_form_enabled']) || (int) $op_options['single_after_hero_form_enabled'] !== 1);
    $form_specific_disabled = (!isset($op_options['specific_after_hero_form_enabled']) || (int) $op_options['specific_after_hero_form_enabled'] !== 1);

    if (!is_single()
        || is_woo()
        || ($form_single_disabled && $form_specific_disabled)) {
        return;
    }

    $html = op3_generate_optin_form('single_after_hero', 'after-hero');
    return op_unescape_brackets($html);
}
add_action('op_single_after_hero', 'op_single_optin_after_hero', 20);

function op_single_optin_before_footer()
{
    global $op_options;

    $form_single_disabled = (!isset($op_options['single_before_footer_form_enabled']) || (int) $op_options['single_before_footer_form_enabled'] !== 1);
    $form_specific_disabled = (!isset($op_options['specific_before_footer_form_enabled']) || (int) $op_options['specific_before_footer_form_enabled'] !== 1);

    if (!is_single()
        || is_woo()
        || ($form_single_disabled && $form_specific_disabled)) {
        return;
    }

    $html = op3_generate_optin_form('single_before_footer', 'before-footer');
    return op_unescape_brackets($html);
}
add_action('op_single_after_post', 'op_single_optin_before_footer', 20);


/**
 * Pages
 */
function op_page_optin_after_header()
{
    global $op_options;

    $form_single_disabled = (!isset($op_options['page_after_header_form_enabled']) || (int) $op_options['page_after_header_form_enabled'] !== 1);
    $form_specific_disabled = (!isset($op_options['specific_after_header_form_enabled']) || (int) $op_options['specific_after_header_form_enabled'] !== 1);

    // Leave early if optin isn't enabled
    if (!is_page()
        || is_woo()
        || ($form_single_disabled && $form_specific_disabled)) {
        return;
    }

    $html = op3_generate_optin_form('page_after_header', 'after-header');
    return op_unescape_brackets($html);
}
add_action('op_page_after_header', 'op_page_optin_after_header', 10);

function op_page_optin_after_hero()
{
    global $op_options;

    $form_single_disabled = (!isset($op_options['page_after_hero_form_enabled']) || (int) $op_options['page_after_hero_form_enabled'] !== 1);
    $form_specific_disabled = (!isset($op_options['specific_after_hero_form_enabled']) || (int) $op_options['specific_after_hero_form_enabled'] !== 1);

    if (!is_page()
        || is_woo()
        || ($form_single_disabled && $form_specific_disabled)) {
        return;
    }

    $html = op3_generate_optin_form('page_after_hero', 'after-hero');
    return op_unescape_brackets($html);
}
add_action('op_page_after_hero', 'op_page_optin_after_hero', 20);

function op_page_optin_before_footer()
{
    global $op_options;

    $form_single_disabled = (!isset($op_options['page_before_footer_form_enabled']) || (int) $op_options['page_before_footer_form_enabled'] !== 1);
    $form_specific_disabled = (!isset($op_options['specific_before_footer_form_enabled']) || (int) $op_options['specific_before_footer_form_enabled'] !== 1);

    if (!is_page()
        || is_woo()
        || ($form_single_disabled && $form_specific_disabled)) {
        return;
    }

    $html = op3_generate_optin_form('page_before_footer', 'before-footer');
    return op_unescape_brackets($html);
}
add_action('op_page_after_post', 'op_page_optin_before_footer', 20);


/**
 * Filter optin form template path. Enables us to use optin_box shortcode for theme optin forms.
 *
 * @param  string $path
 * @param  string $style
 * @param  array $data
 * @return string
 */
function op_change_optin_form_template_path($path, $style, $data)
{
    if (0 === strpos($style, 'optin-')) {
        $style = str_replace('optin-', '', $style);

        if (file_exists(STYLESHEETPATH . '/template-parts/optin/' . $style . '.php')) {
            return STYLESHEETPATH . '/template-parts/optin/' . $style . '.php';
        } else if (file_exists(TEMPLATEPATH . '/template-parts/optin/' . $style . '.php')) {
            return TEMPLATEPATH . '/template-parts/optin/' . $style . '.php';
        }

    }

    return $path;
}
add_filter('op_style_template_path_optin_form', 'op_change_optin_form_template_path', 10, 3);

/**
 * Wrap optin shortcode with bootstrap modal if activated.
 *
 * @param  string $shortcode
 * @param  string $prefix
 * @param $position
 * @return string
 */
function op_wrap_optin_in_popup($shortcode, $prefix, $position)
{
    global $op_options;

    if ((int) $op_options[$prefix . 'form_in_popup'] !== 1) {
        return $shortcode;
    }

    $id = uniqid('op_theme_popup_');
    $style = $op_options[$prefix . 'style'];
    $headline = '';
    $subheadline = '';

    if (!empty($op_options[$prefix . 'lightbox_headline'])) {
        $headline = '<h2 class="optin-box-optimizetheme-headline">' . $op_options[$prefix . 'headline'] . '</h2>';
    }

    if (!empty($op_options[$prefix . 'lightbox_subheadline'])) {
        $subheadline = '<p class="optin-box-optimizetheme-subheadline">' . $op_options[$prefix . 'subheadline'] . '</p>';
    }

    $img_wrap_start = '';
    $img_wrap_end = '';

    if (isset($op_options[$prefix . 'image']) && !empty($op_options[$prefix . 'image']['url'])) {
        $img = $op_options[$prefix . 'image'];
        $height = $img['height'];
        $width = $img['width'];
        $additional_class = '';

        if ($width > $height) {
            $additional_class = ' optin-box-optimizetheme-img-container-landscape';
        }

        $img_html = '';
        $img_html .= '<div class="optin-box-optimizetheme-column optin-box-optimizetheme-img-container' . $additional_class . '">';
            $img_html .= '<img class="optin-box-optimizetheme-img" src="' . $img['url'] . '" alt="" width="' . $width . '" height="' . $height . '" />';
        $img_html .= '</div>';

        $img_wrap_start .= '<div class="optin-box-optimizetheme-row">';
            $img_wrap_start .= $img_html;
            $img_wrap_start .= '<div class="optin-box-optimizetheme-column optin-box-optimizetheme-content">';
            $img_wrap_end .= '</div>';
        $img_wrap_end .= '</div>';
    }

    $btn_color = $op_options[$prefix . 'trigger_button_text_color'];
    $btn_bg_color = $op_options[$prefix . 'trigger_button_background_color'];
    $btn_hover_bg_color = $op_options[$prefix . 'trigger_button_hover_background_color'];
    $custom_style = "#op-trigger-$id .optin-box-optimizetheme-open-lightbox-container .default-button { color: $btn_color; background-color: $btn_bg_color; }";
    $custom_style .= "#op-trigger-$id .optin-box-optimizetheme-open-lightbox-container .default-button:hover { background-color: $btn_hover_bg_color; }";

    $output = '
    <div id="op-trigger-' . $id . '" class="optin-box-optimizetheme-lightbox optin-box-optimizetheme optin-box-optimizetheme-' . $position . ' optin-box-optimizetheme-' . $style . '">
        <div class="container op-container optin-box-content optin-box-optimizetheme-content">' .
            $img_wrap_start .
            '<div class="optin-box-optimizetheme-headline-container">' .
                $headline .
                $subheadline .
            '</div>
            <div class="optin-box-optimizetheme-open-lightbox-container">
                <button type="button" class="default-button" data-toggle="modal" data-target="#' . $id . '">' .
                    $op_options[$prefix . 'trigger_button_text'] .
                '</button>
            </div>
        </div>' .
        $img_wrap_end .
    '</div>

    <div class="optin-box-optimizetheme-modal modal fade" id="' . $id . '" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <button type="button" class="close optin-box-optimizetheme-close-modal" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>

            <div class="modal-content">
                <div class="modal-body">
                ' . $shortcode . '
                </div>
            </div>
        </div>
    </div>' .
    '<style>' . $custom_style . '</style>';

    echo $output;
}
add_filter('op_optin_form_wrap', 'op_wrap_optin_in_popup', 10, 3);

/**
 * Wrap optin shortcode with bootstrap modal if activated.
 *
 * @param  string $shortcode
 * @param  string $prefix
 * @return string
 */
function op_optin_style($shortcode, $prefix)
{
    global $op_options;

    return '<div class="op_optin_' . $prefix . 'container op_optin_style_' . $op_options[$prefix . 'style'] . '">' . $shortcode . '</div>';
}
add_filter('op_optin_form_wrap', 'op_optin_style', 10, 2);

/**
 * Show author meta box on author template page.
 * @param  string $slug
 * @param  string $name
 * @return void
 */
// function op_show_author_meta_box($slug, $name)
// {
//     if (is_author()) {
//         op_author_meta();
//     }
// }
// add_action('get_template_part_template-parts/homepage/homepage', 'op_show_author_meta_box', 10, 2);

// function add_last_menu_item($output) {
//   $output = substr_replace($output, 'class="last-menu-item menu-item', strripos($output, 'class="menu-item'), strlen('class="menu-item'));
//   return $output;
// }
// add_filter('wp_nav_menu', 'add_last_menu_item');
