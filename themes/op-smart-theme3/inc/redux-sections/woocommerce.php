<?php
// Check to see if WooCommerce is installed and active
if (in_array('woocommerce/woocommerce.php', apply_filters('active_plugins', get_option('active_plugins')))) {
    Redux::setSection($opt_name, array(
        'title'     => _x('WooCommerce', 'op3_smart'),
        'id'        => 'woocommerce',
        'icon'      => 'el-icon-shopping-cart',
        'fields'    => array(
            array(
                'id'        => 'cart_icon_in_header',
                'type'      => 'switch',
                'title'     => _x('Show Cart Icon in header', 'WooCommerce', 'op3_smart'),
                'default'   => true,
                'on'        => _x('Yes', 'op3_smart'),
                'off'       => _x('No', 'op3_smart'),
            ),
            array(
                'id'        => 'product_archive_sidebar',
                'type'      => 'image_select',
                'title'     => _x('Product Archive Layout', 'WooCommerce', 'op3_smart'),
                'subtitle'  => _x('Choose position of a sidebar', 'WooCommerce', 'op3_smart'),
                'default'   => 'no_sidebar',
                'options'   => array(
                    'no_sidebar' => array(
                        'alt' => _x('No Sidebar', 'WooCommerce', 'op3_smart'),
                        'img' => ReduxFramework::$_url . 'assets/img/1c.png'
                    ),
                    'sidebar_left' => array(
                        'alt' => _x('Sidebar Left', 'WooCommerce', 'op3_smart'),
                        'img' => ReduxFramework::$_url . 'assets/img/2cl.png'
                    ),
                    'sidebar_right' => array(
                        'alt' => _x('Sidebar Right', 'WooCommerce', 'op3_smart'),
                        'img' => ReduxFramework::$_url . 'assets/img/2cr.png'
                    ),
                ),
            ),
            array(
                'id'        => 'product_sidebar',
                'type'      => 'image_select',
                'title'     => _x('Product Layout', 'WooCommerce', 'op3_smart'),
                'subtitle'  => _x('Choose position of a sidebar', 'WooCommerce', 'op3_smart'),
                'default'   => 'no_sidebar',
                'options'   => array(
                    'no_sidebar' => array(
                        'alt' => _x('No Sidebar', 'WooCommerce', 'op3_smart'),
                        'img' => ReduxFramework::$_url . 'assets/img/1c.png'
                    ),
                    'sidebar_left' => array(
                        'alt' => _x('Sidebar Left', 'WooCommerce', 'op3_smart'),
                        'img' => ReduxFramework::$_url . 'assets/img/2cl.png'
                    ),
                    'sidebar_right' => array(
                        'alt' => _x('Sidebar Right', 'WooCommerce', 'op3_smart'),
                        'img' => ReduxFramework::$_url . 'assets/img/2cr.png'
                    ),
                ),
            ),
            array(
                'id'        => 'show_custom_short_description',
                'type'      => 'switch',
                'title'     => _x('Show Product Custom Short Description', 'WooCommerce', 'op3_smart'),
                'subtitle'  => _x('Custom short description that is shown on Shop page and in Related products boxes under the title of every product. Field must be filled on individual products.', 'WooCommerce', 'op3_smart'),
                'default'   => true,
                'on'        => _x('Yes', 'op3_smart'),
                'off'       => _x('No', 'op3_smart'),
            ),
        ),
    ));

    Redux::setSection($opt_name, array(
        'title'         => _x('WooCommerce Hero', 'WooCommerce Hero', 'op3_smart'),
        'id'            => 'woocommerce_page_hero_section',
        'subsection'    => true,
        'fields'        => array(
            array(
                'id'            => 'woocommerce_page_header_background_color',
                'title'         => _x('Hero Background Colour', 'WooCommerce Hero', 'op3_smart'),
                'type'          => 'color_gradient',
                'transparent'   => false,
                'default'       => array('from' => '#23282d', 'to' => '#23282d'),
            ),
            array(
                'id'            => 'woocommerce_page_header_text_color',
                'type'          => 'color',
                'title'         => _x('Hero Text Colour', 'WooCommerce Hero', 'op3_smart'),
                'transparent'   => false,
                'output'        => array(
                    // .woocommerce-page class is intentionally duplicated to increase the specificity of the rule
                    // and thus override the rule (.page .op-hero-area .op-headline) from general page settings
                    'color' => '.woocommerce-page.woocommerce-page .op-hero-area .op-headline'
                ),
                'default'       => '#ffffff',
            ),
        )
    ));

    Redux::setSection($opt_name, array(
        'title'         => _x('WooCommerce Styling', 'WooCommerce Styling', 'op3_smart'),
        'id'            => 'woocommerce_styling_section',
        'subsection'    => true,
        'fields'        => array(
            array(
                'id'            => 'woocommerce_buttons_background_color',
                'title'         => _x('Buttons Background Colour', 'WooCommerce Styling', 'op3_smart'),
                'type'          => 'color',
                'transparent'   => false,
                'default'       => '#005bdc',
                'output'        => array(
                    'background-color'  => '.woocommerce .button,
                                            .woocommerce .button:hover,
                                            .woocommerce ul.products li.product .button,
                                            .woocommerce ul.products li.product .button:hover,
                                            .woocommerce #respond input#submit.alt,
                                            .woocommerce #respond input#submit.alt:hover,
                                            .woocommerce a.button.alt,
                                            .woocommerce a.button.alt:hover,
                                            .woocommerce button.button.alt,
                                            .woocommerce button.button.alt:hover,
                                            .woocommerce input.button.alt,
                                            .woocommerce input.button.alt:hover',
                    'border-top-color'  => '.entry-content .woocommerce-info,
                                            .entry-content .woocommerce-message',
                    'color'             => '.woocommerce-info::before,
                                            .woocommerce-message::before',
                ),
            ),
            array(
                'id'            => 'woocommerce_buttons_text_color',
                'title'         => _x('Buttons Text Colour', 'WooCommerce Styling', 'op3_smart'),
                'type'          => 'color',
                'transparent'   => false,
                'default'       => '#ffffff',
                'output'        => array(
                    'color'     => '.woocommerce .button,
                                    .woocommerce .button:hover,
                                    .woocommerce ul.products li.product .button,
                                    .woocommerce ul.products li.product .button:hover,
                                    .woocommerce #respond input#submit.alt,
                                    .woocommerce #respond input#submit.alt:hover,
                                    .woocommerce a.button.alt,
                                    .woocommerce a.button.alt:hover,
                                    .woocommerce button.button.alt,
                                    .woocommerce button.button.alt:hover,
                                    .woocommerce input.button.alt,
                                    .woocommerce input.button.alt:hover'
                ),
            ),
            array(
                'id'            => 'woocommerce_prices_color',
                'title'         => _x('Prices Colour', 'WooCommerce Styling', 'op3_smart'),
                'type'          => 'color',
                'transparent'   => false,
                'default'       => '#77a464',
                'output'        => array(
                    'color'             => '.woocommerce div.product p.price,
                                            .woocommerce div.product span.price,
                                            .woocommerce ul.products li.product .price',
                    'background-color'  => '.woocommerce span.onsale'
                ),
            ),

            array(
                'id'            => 'woocommerce_rating_color',
                'title'         => _x('Rating Colour', 'WooCommerce Styling', 'op3_smart'),
                'type'          => 'color',
                'transparent'   => false,
                'default'       => '#444',
                'output'        => array(
                    'color'             => '.woocommerce .star-rating',
                ),
            ),
        )
    ));
}
