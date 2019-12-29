<?php

define('OP3_SMART_THEME_VERSION', '1.0.9');
define('OP3_SMART_THEME_DIR', rtrim(get_template_directory(), '/').'/');

// Minified resources (script and style)
if (!defined('OP3_SMART_DEBUG')) {
    define('OP3_SMART_DEBUG', '.min');
}

// Define dependencies
define('OPS_DEPENDENCY__DASHBOARD', '1.0.6');

/**
 * Loading Redux Framework and OP config
 */
if (!class_exists('ReduxFramework') && file_exists(dirname(__FILE__) . '/vendor/ReduxFramework/ReduxCore/framework.php')) {
    require_once(dirname(__FILE__) . '/vendor/ReduxFramework/ReduxCore/framework.php');
}
if (!isset($redux_demo) && file_exists(dirname(__FILE__) . '/options.php')) {
    require_once(dirname(__FILE__) . '/options.php');
}

/**
 * smart functions and definitions.
 *
 * @link https://codex.wordpress.org/Functions_File_Explained
 *
 * @package smart
 */

if (!function_exists('op_setup')) {
    /**
     * Sets up theme defaults and registers support for various WordPress features.
     */
    function op_setup()
    {
        /*
         * Make theme available for translation.
         * Translations can be filed in the /languages/ directory.
         */
        load_theme_textdomain('op3_smart', get_template_directory() . '/languages');

        // Add default posts and comments RSS feed links to head.
        add_theme_support('automatic-feed-links');

        /*
         * Let WordPress manage the document title.
         * By adding theme support, we declare that this theme does not use a
         * hard-coded <title> tag in the document head, and expect WordPress to
         * provide it for us.
         */
        add_theme_support('title-tag');

        /*
         * Enable support for Post Thumbnails on posts and pages.
         *
         * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
         */
        add_theme_support('post-thumbnails');

        add_image_size('related-article-size', 350, 195, true);

        add_image_size('homepage-grid-size', 383, 215, array( 'center', 'center'));
        add_image_size('homepage-list-size', 420, 260, array( 'center', 'center'));

        // This theme uses wp_nav_menu() in one location.
        register_nav_menus(array(
            'primary' => esc_html_x('Header Menu', 'Menus', 'op3_smart'),
        ));

        /*
         * Switch default core markup for search form, comment form, and comments
         * to output valid HTML5.
         */
        add_theme_support('html5', array(
            'search-form',
            'comment-form',
            'comment-list',
            'gallery',
            'caption',
        ));

        /*
         * Enable support for Post Formats.
         * See https://developer.wordpress.org/themes/functionality/post-formats/
         */
        add_theme_support('post-formats', array(
            // 'aside',
            // 'image',
            'audio',
            'video',
            // 'quote',
            // 'link',
            'gallery',
        ));

        // WooCommerce support
        add_theme_support('woocommerce');
        add_theme_support('wc-product-gallery-zoom');
        add_theme_support('wc-product-gallery-lightbox');
        add_theme_support('wc-product-gallery-slider');
    }
}
add_action('after_setup_theme', 'op_setup');

/**
 * Register widget area and widgets.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function op_widgets_init()
{
    register_sidebar(array(
        'name'          => _x('Sidebar', 'Widgets', 'op3_smart'),
        'id'            => 'sidebar-1',
        'description'   => '',
        'before_widget' => '<aside id="%1$s" class="widget %2$s">',
        'after_widget'  => '</aside>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ));

    if (in_array('woocommerce/woocommerce.php', apply_filters('active_plugins', get_option('active_plugins')))) {
        register_sidebar(array(
            'name'          => _x('Shop Sidebar', 'Widgets', 'op3_smart'),
            'id'            => 'shop-archive',
            'description'   => '',
            'before_widget' => '<aside id="%1$s" class="widget %2$s">',
            'after_widget'  => '</aside>',
            'before_title'  => '<h2 class="widget-title">',
            'after_title'   => '</h2>',
        ));

        register_sidebar(array(
            'name'          => _x('Shop Product Details Sidebar', 'Widgets', 'op3_smart'),
            'id'            => 'shop-single',
            'description'   => '',
            'before_widget' => '<aside id="%1$s" class="widget %2$s">',
            'after_widget'  => '</aside>',
            'before_title'  => '<h2 class="widget-title">',
            'after_title'   => '</h2>',
        ));
    }

    register_widget('Op_Social_Profiles_Widget');
    register_widget('Op_Optin_Form_Widget');
}
add_action('widgets_init', 'op_widgets_init');

/**
 * Enqueue scripts and styles.
 */
function op_scripts()
{
    // We don't want to load theme scripts
    // or styles on LiveEditor pages
    // or in LiveEditor
    if (is_op_page()) {
        return;
    }

    // CSS debug version
    if (OP3_SMART_DEBUG === '') {

        wp_enqueue_style('opst-css-reset', get_template_directory_uri() . '/css/reset' . OP3_SMART_DEBUG . '.css', array(), OP3_SMART_THEME_VERSION);
        wp_enqueue_style('opst-css-bootstrap', get_template_directory_uri() . '/css/bootstrap' . OP3_SMART_DEBUG . '.css', array('opst-css-reset'), OP3_SMART_THEME_VERSION);
        wp_enqueue_style('opst-css-swipebox', get_template_directory_uri() . '/js/swipebox/css/swipebox' . OP3_SMART_DEBUG . '.css', array('opst-css-bootstrap'), OP3_SMART_THEME_VERSION);
        wp_enqueue_style('opst-css-style', get_template_directory_uri() . '/css/style' . OP3_SMART_DEBUG . '.css', array('opst-css-swipebox'), OP3_SMART_THEME_VERSION);

    } else {

        wp_enqueue_style('opst-css-style', get_template_directory_uri() . '/css/all' . OP3_SMART_DEBUG . '.css', array(), OP3_SMART_THEME_VERSION);

    }


    // JS debug version
    if (OP3_SMART_DEBUG === '') {

        wp_enqueue_script('opst-js-bootstrap', get_template_directory_uri() . '/js/bootstrap' . OP3_SMART_DEBUG . '.js', array('jquery'), OP3_SMART_THEME_VERSION, true);
        wp_enqueue_script('opst-js-ie10-viewport-bug-workaround', get_template_directory_uri() . '/js/ie10-viewport-bug-workaround' . OP3_SMART_DEBUG . '.js', array('opst-js-bootstrap'), OP3_SMART_THEME_VERSION, true);
        wp_enqueue_script('opst-js-fitvids', get_template_directory_uri() . '/js/jquery.fitvids' . OP3_SMART_DEBUG . '.js', array('opst-js-ie10-viewport-bug-workaround'), OP3_SMART_THEME_VERSION, true);
        wp_enqueue_script('opst-js-swipebox', get_template_directory_uri() . '/js/swipebox/js/jquery.swipebox' . OP3_SMART_DEBUG . '.js', array('opst-js-bootstrap'), OP3_SMART_THEME_VERSION, true);
        wp_enqueue_script('opst-js-ofi', get_template_directory_uri() . '/js/ofi' . OP3_SMART_DEBUG . '.js', array('opst-js-bootstrap'), OP3_SMART_THEME_VERSION, true);
        wp_enqueue_script('opst-js-script', get_template_directory_uri() . '/js/script' . OP3_SMART_DEBUG . '.js', array('opst-js-fitvids', 'opst-js-ofi'), OP3_SMART_THEME_VERSION, true);
        wp_enqueue_script('opst-js-skip-link-focus-fix', get_template_directory_uri() . '/js/skip-link-focus-fix' . OP3_SMART_DEBUG . '.js', array('opst-js-script'), OP3_SMART_THEME_VERSION, true);

    } else {

        wp_enqueue_script('opst-js-script', get_template_directory_uri() . '/js/all' . OP3_SMART_DEBUG . '.js', array('jquery'), OP3_SMART_THEME_VERSION, true);

    }

    if (is_singular() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }
}
add_action('wp_enqueue_scripts', 'op_scripts');

/**
 * Removes the Redux inline styles
 * from LiveEditor pages and
 * from LiveEditor
 */
function remove_output_css($field) {
    if (is_op_page()) {
        return false;
    }
    return $field;
}
add_action('redux/field/op_options/output_css', 'remove_output_css');

/**
 * Add theme support for infinite scroll.
 *
 * @uses add_theme_support
 * @return void
 */
function op_infinite_scroll_init()
{
    global $op_options;

    add_theme_support('infinite-scroll', array(
        'container'         => 'infinite-scroll-container',
        'footer'            => 'colophon',
        'render'            => 'op_infinite_scroll_render',
        'type'              => 'click',
        // 'footer_widgets'    => array(
        //     'op_footer_sidebar_1',
        //     'op_footer_sidebar_2',
        //     'op_footer_sidebar_3',
        //     'op_footer_sidebar_4'
        // ),
        'footer_widgets'    => true,
        'wrapper'           => false,
        'posts_per_page'    => false,
    ));
}
add_action('after_setup_theme', 'op_infinite_scroll_init');

/**
 * Render more posts for infinite scroll.
 * It uses either content-full, content-grid or content-list templates.
 *
 * @return void
 */
function op_infinite_scroll_render()
{
    global $op_options;
    while (have_posts()) : the_post();

        // TODO: Refactor this class handling (related
        // to homepage grid template)
        if (is_home()) {
            if (op_get_homepage_template() === 'grid') {
                echo '<div class="'; op_template_grid_item_class(); echo '">';
            } else {
                echo '<div class="col-md-12">';
            }
            get_template_part('template-parts/loop/content', op_get_homepage_template());
            echo '</div>';
        } else {
            if (op_get_archive_template() === 'grid') {
                echo '<div class="'; op_template_grid_item_class(); echo '">';
            } else {
                echo '<div class="col-md-12">';
            }
            get_template_part('template-parts/loop/content', op_get_archive_template());
            echo '</div>';
        }
    endwhile;
}

/**
 * For the homepage and archives, when grid layout is used, we
 * want to force the number of posts per package (for now)
 * TODO: This can be better. Perhaps an option for this?
 */
function force_posts_per_page($query) {
    global $op_options;

    // This shouldn't affect any admin pages,
    // nor queries other than main query,
    // nor any queries when jetpack
    // infinite scroll is active,
    if (is_admin()
        || !$query->is_main_query()
        || is_infinite_scroll_enabled()
    ) {
        return;
    }

    // Calculate what is the correct number of posts to show in grid layout,
    // based on value set in Setting -> Reading -> Blog pages show at most
    $default_posts_per_page = (int) get_option( 'posts_per_page' );
    $default_mod = $default_posts_per_page % 3;
    $new_posts_per_page = $default_posts_per_page - $default_mod;

    // Homepage
    if (is_home() && op_get_homepage_template() === 'grid') {

        // If homepage hero is off, or hero doesn't contain a post,
        // set the number of posts to new default value,
        // since we don't have to take an
        // additional displayed
        // post into account
        if ((int) $op_options['homepage_hero_enabled'] === 0 || $op_options['homepage_hero_design'] !== 'featured-post') {
            $query->set( 'posts_per_page', $new_posts_per_page );
            return;
        }

        // Homepage Hero is on, so first page must be set to
        // new default value + 1 to account for the
        // featured post, and rest of the pages
        // is set to just new default value
        if (is_paged()) {
            $page_nr = $query->get('paged');
            $offset = (($page_nr - 1) * $new_posts_per_page) + 1;
            $query->set('offset', $offset);
            $query->set('posts_per_page', $new_posts_per_page);
        } else {
            $query->set('posts_per_page', $new_posts_per_page + 1);
        }
    }

    // Archives page
    if (is_archive() && op_get_archive_template() === 'grid') {
        $query->set( 'posts_per_page', $new_posts_per_page );
    }
}
add_action('pre_get_posts', 'force_posts_per_page', 11);

function custom_tag_cloud_widget($args) {
    $args['largest'] = 1; //largest tag
    $args['smallest'] = 1; //smallest tag
    $args['unit'] = 'em'; //tag font unit
    return $args;
}
add_filter('widget_tag_cloud_args', 'custom_tag_cloud_widget');

/**
 * Custom optin style for theme
 */
function custom_optin_style($path, $style, $data){
    if ('optimizetheme_optin_1' == $style) {
        return get_template_directory() . '/inc/optimizetheme_optin_1.php';
    }

    return $path;
}
add_filter('op_style_template_path_optin_form', 'custom_optin_style', 10, 3);

/**
 * Helper functions for this theme.
 */
require get_template_directory() . '/inc/helpers.php';

/**
 * Widgets for this theme.
 */
require get_template_directory() . '/inc/widgets.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Comment Walker.
 */
require get_template_directory() . '/inc/smart_walker_comment.php';

/**
 * Load Share Buttons.
 */
require get_template_directory() . '/inc/share-buttons.php';

/**
 * Load Actions & Filters
 */
require get_template_directory() . '/inc/hooks.php';

/**
 * Load WooCommerce custom parts
 */
require get_template_directory() . '/inc/woocommerce.php';

/**
 * Load auto-updates parts (only if OP is active!)
 */
if (function_exists('op_define_vars')) {
    require get_template_directory() . '/inc/auto-updates.php';
}

function op3_get_var($array,$key,$default='',$wrap='',$force=false){
    $val = isset($array[$key]) ? $array[$key] : $default;

    $run = true;
    if(!$force && $val == ''){
        $run = false;
    }
    if($wrap != '' && $run){
        $val = sprintf($wrap,$val);
    }
    return $val;
}
function op3_get_var_e($array,$key,$default='',$wrap='',$force=false){
    echo op3_get_var($array,$key,$default,$wrap,$force);
}

/**
 * Check plugin dependencies
 *
 * @return bool
 */
function op3_smart_check_dependencies()
{
    // Check dashboard version
    if (defined('OPD_VERSION') && function_exists('op3_is_dev_version') && ! op3_is_dev_version()) {
        if (version_compare(OPD_VERSION, OPS_DEPENDENCY__DASHBOARD, '<')) {
            return false;
        }
    }

    return true;
}

/**
 * Add some notices to the admin screens
 *
 * @return void
 */
function op3SmartInitNotices()
{

    if (! op3_smart_check_dependencies()) {
        echo '<div class="notice notice-error"><p><strong>Smart Theme</strong>: Please make sure all plugin dependencies are up to date.<br>
            - OptimizePress Dashboard <strong>v' . OPS_DEPENDENCY__DASHBOARD . '</strong> needed (you have <strong>v' . OPD_VERSION . '</strong>)<br>
            <a href="' . admin_url('plugins.php') . '">Check for updates</a></p></div>';
    }
}

// Add notices
add_action('admin_notices', 'op3SmartInitNotices');





// Remove Additional Information Tab WooCommerce
 
add_filter( 'woocommerce_product_tabs', 'remove_info_tab', 98);
function remove_info_tab($tabs) {
 
 unset($tabs['additional_information']);
 
 return $tabs;
}









/**
 * @snippet       Rename Description Product Tab Label @ WooCommerce Single Product
 * @how-to        Watch tutorial @ https://businessbloomer.com/?p=19055
 * @sourcecode    https://businessbloomer.com/?p=97724
 * @author        Rodolfo Melogli
 * @compatible    WooCommerce 3.5.3
 * @donate $9     https://businessbloomer.com/bloomer-armada/
 */
 
add_filter( 'woocommerce_product_description_tab_title', 'bbloomer_rename_description_product_tab_label' );
 
function bbloomer_rename_description_product_tab_label() {
    return 'Program';
}









// Remove the product description Title
add_filter( 'woocommerce_product_description_heading', 'remove_product_description_heading' );
function remove_product_description_heading() {
 return '';
}






add_filter( 'add_to_cart_text', 'woo_custom_single_add_to_cart_text' );                // < 2.1
add_filter( 'woocommerce_product_single_add_to_cart_text', 'woo_custom_single_add_to_cart_text' );  // 2.1 +
  
function woo_custom_single_add_to_cart_text() {
  
    return __( 'Book Now', 'woocommerce' );
  
}








add_filter('woocommerce_product_related_posts_query', '__return_empty_array', 100);




/**
 * @snippet       Pay for Order if Logged Out - WooCommerce Checkout
 * @how-to        Watch tutorial @ https://businessbloomer.com/?p=19055
 * @author        Rodolfo Melogli
 * @compatible    WooCommerce 3.6.2
 * @donate $9     https://businessbloomer.com/bloomer-armada/
 */
 
add_filter( 'user_has_cap', 'bbloomer_order_pay_without_login', 9999, 3 );
 
function bbloomer_order_pay_without_login( $allcaps, $caps, $args ) {
   if ( isset( $caps[0], $_GET['key'] ) ) {
      if ( $caps[0] == 'pay_for_order' ) {
         $order_id = isset( $args[2] ) ? $args[2] : null;
         $order = wc_get_order( $order_id );
         if ( $order ) {
            $allcaps['pay_for_order'] = true;
         }
      }
   }
   return $allcaps;
}




