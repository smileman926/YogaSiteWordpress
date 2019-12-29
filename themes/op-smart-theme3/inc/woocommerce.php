<?php
/**
 * Custom functions, filters and hooks used to modify WooCommerce plugin behaviour or apperance.
 *
 * @package smart
 */

/**
 * Append cart icon to the main menu (primary location) if WooCommerce is active and if "cart_icon_in_header" is enabled.
 *
 * @param array $items
 * @param stdClass $args
 * @return array
 */
function op_header_menu_woocommerce_cart($items, $args)
{
    global $woocommerce;
    global $op_options;

    if ($args->theme_location === 'primary' && in_array('woocommerce/woocommerce.php', apply_filters('active_plugins', get_option('active_plugins')))
    && (int) $op_options['cart_icon_in_header'] === 1) {
        $count = ($woocommerce->cart->cart_contents_count > 0) ? ' (' . $woocommerce->cart->cart_contents_count . ') ' : '';

        $items .= '
        <li class="menu-item menu-item-type-post_type menu-item-shopping-cart">
            <a href="' . wc_get_cart_url() . '"><span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span>' . $count . ' <span class="menu-item-shopping-cart-icon-text">Shopping Cart</span></a>
       </li>';
    }

    return $items;
}
add_filter('wp_nav_menu_items','op_header_menu_woocommerce_cart', 9, 2);

/**
 * Enqueue WooCommerce CSS compat styles.
 */
function op_change_woo_styles()
{
    // wp_enqueue_style('woocommerce_layout', get_template_directory_uri() . '/css/woocommerce-layout.css');
    wp_enqueue_style('woocommerce_responsive_frontend_styles', get_template_directory_uri() . '/css/woocommerce' . OP3_SMART_DEBUG . '.css', array('opst-css-style'), OP3_SMART_THEME_VERSION);
}
add_action('wp_enqueue_scripts', 'op_change_woo_styles', 99);
// add_filter('woocommerce_enqueue_styles', '__return_false');

// Remove WooCommerce content wrapper
// remove_action('woocommerce_before_main_content', 'woocommerce_output_content_wrapper');
// remove_action('woocommerce_after_main_content', 'woocommerce_output_content_wrapper_end');

// Move WooCommerce breadcrumbs
remove_action('woocommerce_before_main_content', 'woocommerce_breadcrumb', 20);
add_action('woocommerce_before_shop_loop', 'woocommerce_breadcrumb', 15);
add_action('woocommerce_single_product_summary', 'woocommerce_breadcrumb', 1);

// Remove WooCommerce product single product hooks
// remove_action('woocommerce_before_single_product_summary', 'woocommerce_show_product_images', 20);
// remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_title', 5);

// Move WooCommerce cross sells section
remove_action('woocommerce_cart_collaterals', 'woocommerce_cross_sell_display');
add_action('woocommerce_cross_sell_show', 'woocommerce_cross_sell_display', 5);


/**
 * Hook to woocommerce_after_shop_loop_item_title to
 * display a custom short description on every post
 */
function woocommerce_show_custom_short_description()
{

    global $product;
    global $op_options;

    if (!isset($op_options['show_custom_short_description']) || (int) $op_options['show_custom_short_description'] === 0) {
        return;
    }

    $product_id = $product->get_id();
    $post_options = redux_post_meta('op_options', $product_id);
    $desc = $post_options['woocommerce_custom_short_description'];

    if (!isset($desc) || empty($desc)) {
        return;
    }

    echo '<p class="woocommerce-loop-product__custom_description">' . $desc . '</p>';
}
add_action('woocommerce_after_shop_loop_item_title', 'woocommerce_show_custom_short_description', 4);

/**
 * Number of items in shop row is related
 * to the sidebar. If sidebar is
 * present, 3 items are shown,
 * if not 4 are shown.
 */
function loop_columns() {
    if (false === apply_filters('op_template_has_sidebar', false)) {
        return 4;
    }

    return 3;
}
add_filter('loop_shop_columns', 'loop_columns', 999);

/**
 * Get HTML for ratings.
 *
 * @param  float $rating Rating being shown.
 * @return string
 */
function op_wc_get_rating_html( $rating ) {

	$rating_html  = '<div class="star-rating" title="' . sprintf(esc_attr_x('Rated %s out of 5', 'WooCommerce', 'op3_smart'), $rating) . '">';
	$rating_html .= '<span style="width:' . (($rating / 5) * 100) . '%"><strong class="rating">' . $rating . '</strong> ' . esc_html_x('out of 5', 'WooCommerce', 'op3_smart') . '</span>';
	$rating_html .= '</div>';
	return apply_filters( 'woocommerce_product_get_rating_html', $rating_html, $rating );
}
