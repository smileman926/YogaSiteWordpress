<?php
Redux::setSection($opt_name, array(
    'title'     => _x('Styling', 'op3_smart'),
    'id'        => 'styling',
    'icon'      => 'el-icon-brush',
));

Redux::setSection($opt_name, array(
    'title'         => _x('Link Colours', 'Styling Link Colours', 'op3_smart'),
    'id'            => 'styling_general',
    'subsection'    => true,
    'fields'        => array(
        array(
            'id'        => 'link_color',
            'title'     => _x('Link Colour', 'Styling Link Colours', 'op3_smart'),
            'type'      => 'link_color',
            'output'    => array('.op-entry a'),
            'default'   => array(
                'regular'   => '#222',
                'hover'     => '#222',
                'active'    => '#222',
            ),
        ),
        array(
            'id'            => 'button_bg_color',
            'title'         => _x('Button Background Colour', 'Styling Link Colours', 'op3_smart'),
            'type'          => 'color',
            'transparent'   => false,
            'default'       => '#005BDC',
            'output'        => array(
                'background-color'  => '.btn a, .btn, .btn-primary,
                                        .op-navbar .nav-close-wrap,
                                        .pagination > .btn,
                                        #infinite-handle span button,
                                        .woocommerce-product-search [type=submit],
                                        .woocommerce .widget_price_filter .ui-slider .ui-slider-range,
                                        .woocommerce .widget_price_filter .ui-slider .ui-slider-handle',
                'border-color'      => '.op-read-more'
            ),
        ),
        array(
            'id'            => 'button_bg_color_hover',
            'title'         => _x('Button Hover Background Colour', 'Styling Link Colours', 'op3_smart'),
            'type'          => 'color',
            'transparent'   => false,
            'default'       => '#0054cc',
            'output'        => array(
                'background-color'  => '.btn a:hover,
                                        .btn:hover,
                                        .btn-primary:hover,
                                        .btn a:active,
                                        .btn:active,
                                        .btn-primary:active,
                                        .pagination > .btn:hover,
                                        .pagination > .btn:active,
                                        #infinite-handle span button:hover,
                                        #infinite-handle span button:active,
                                        .woocommerce-product-search [type=submit]:hover,
                                        .woocommerce-product-search [type=submit]:active,
                                        .woocommerce .widget_price_filter .ui-slider .ui-slider-range:hover,
                                        .woocommerce .widget_price_filter .ui-slider .ui-slider-range:active,
                                        .woocommerce .widget_price_filter .ui-slider .ui-slider-handle:hover,
                                        .woocommerce .widget_price_filter .ui-slider .ui-slider-handle:active,
                                        .woocommerce .widget_price_filter .price_slider_wrapper .ui-widget-content,
                                        .woocommerce .widget_price_filter .price_slider_wrapper .ui-widget-content:hover,
                                        .woocommerce .widget_price_filter .price_slider_wrapper .ui-widget-content:active',
                'border-color'      => '.op-read-more:hover,
                                        .op-read-more:active'
            ),
        ),
        array(
            'id'            => 'button_color',
            'title'         => _x('Button Colour', 'Styling Link Colours', 'op3_smart'),
            'type'          => 'color',
            'transparent'   => false,
            'default'       => '#fff',
            'output'        => array(
                'color' => '.btn a, .btn, .btn-primary,
                            .pagination > .btn,
                            .pagination > .btn:hover,
                            .pagination > .btn:active,
                            #infinite-handle span button,
                            #infinite-handle span button:hover,
                            #infinite-handle span button:hover:active,
                            .op-navbar .nav-close-wrap,
                            .woocommerce-product-search [type=submit]'
            ),
        ),
        array(
            'id'        => 'menu_link_color',
            'title'     => _x('Menu Link Colour', 'Styling Link Colours', 'op3_smart'),
            'type'      => 'color_states',
            'output'    => array(
                // vbar-default .navbar-nav>li>
                'regular'   => '.op-navbar .navbar-nav > .menu-item > a, .op-navbar .navbar-nav li .navbar-tagline,
                                .op-navbar .navbar-nav .menu-item .menu-item-search-link,
                                .op-navbar .navbar-nav .menu-item .op-search-form-close-button,
                                .op-navbar.navbar-default .navbar-toggle,
                                .op-search-form-top-menu',

                'hover'     => '.op-navbar .navbar-nav > .menu-item:hover > a,
                                .op-navbar .navbar-nav li .navbar-tagline:hover,
                                .op-navbar .navbar-nav .menu-item .menu-item-search-link:hover,
                                .op-navbar .navbar-nav .menu-item .op-search-form-close-button:hover,
                                .op-navbar.navbar-default .navbar-toggle:hover,
                                .op-navbar .navbar-nav li .sub-menu a:hover',

                'active'    => '.op-navbar .navbar-nav > .menu-item.active a,
                                .op-navbar .navbar-nav > .menu-item.active:hover a',
            ),
            'css_rule'  => 'color',
            'default'   => array(
                'regular'   => '#6b6b6b',
                'active'    => '#6b6b6b',
                'hover'     => '#6b6b6b',
            ),
        ),
    ),
));

Redux::setSection($opt_name, array(
    'title'         => _x('Category Tag Colours', 'Styling Category Tag Colours', 'op3_smart'),
    'id'            => 'styling_category_colours',
    'subsection'    => true,
    'fields'        => array(
        array(
            'id'        => 'category_color',
            'title'     => _x('Category Tag Text Colour', 'Styling Category Tag Colours', 'op3_smart'),
            'type'      => 'color_rgba',
            'default'   => array(
                'color' => '#ffffff',
                'alpha' => 1
            ),
            'options'   => array(
                'clickout_fires_change' => true
            ),
            'output'    => array(
                'color' => '.op-small-category-link a,
                            .op-small-category-link a:hover,
                            .op-small-category-link a:focus,
                            .op-small-category-link a:active,
                            .op-small-category-link span,
                            .op-content-grid-row .op-small-category-link a,
                            .op-homepage-hero-category,
                            .op-homepage-hero-category:hover,
                            .op-homepage-hero-category:focus,
                            .op-homepage-hero-category:active',
            ),
        ),
        array(
            'id'        => 'category_background',
            'title'     => _x('Category Tag Background Colour', 'Styling Category Tag Colours', 'op3_smart'),
            'type'      => 'color_rgba',
            'default'   => array(
                'color' => '#005BDC',
                'alpha' => 1
            ),
            'options'   => array(
                'clickout_fires_change' => true
            ),
            'output'    => array(
                'background-color' =>  '.op-small-category-link a,
                                        .op-small-category-link a:hover,
                                        .op-small-category-link a:focus,
                                        .op-small-category-link a:active,
                                        .op-small-category-link span,
                                        .op-homepage-hero-category,
                                        .op-homepage-hero-category:hover,
                                        .op-homepage-hero-category:focus,
                                        .op-homepage-hero-category:active',
            ),
        ),
    ),
));

Redux::setSection($opt_name, array(
    'title'         => _x('Typography', 'Styling Typography', 'op3_smart'),
    'id'            => 'fonts',
    'subsection'    => true,
    'fields'        => array(
        array(
            'id'        => 'typography_advanced',
            'type'      => 'switch',
            'title'     => _x('See Advanced Settings', 'Styling Typography', 'op3_smart'),
            'subtitle'  => _x('Activate this setting for advanced typography styles and customizations', 'Styling Typography', 'op3_smart'),
            'default'   => false,
            'on'        => _x('Yes', 'op3_smart'),
            'off'       => _x('No', 'op3_smart'),
        ),
         array(
            'id'        => 'typography_uppercase_styling',
            'type'      => 'switch',
            'title'     => _x('Uppercase Heading & Title Styling', 'Styling Typography', 'op3_smart'),
            'subtitle'  => _x('Activate this setting if you prefer your headings and titles (such as H1 tags, hero section titles and sidebar titles) to have uppercase styling', 'Styling Typography', 'op3_smart'),
            'default'   => false,
            'on'        => _x('Yes', 'op3_smart'),
            'off'       => _x('No', 'op3_smart'),
        ),
        array(
            'id'        => 'typography_body_section_start',
            'type'      => 'section',
            'title'     => _x('Body Font', 'Styling Typography', 'op3_smart'),
            'indent'    => true,
            'required'  => array('typography_advanced', 'equals', false),
        ),
        array(
            'id'            => 'typography_basic_body_font_family',
            'title'         => _x('Body Font Family', 'Styling Typography', 'op3_smart'),
            'type'          => 'typography',
            'font-backup'   => false,
            'font-style'    => false,
            'font-weight'   => false,
            'subsets'       => false,
            'line-height'   => false,
            'text-align'    => false,
            'color'         => false,
            'font-size'     => false,
            'output'        => array('body, p, .sm-wrap'),
            'default'       => array(
                'font-family'       => 'Karla',
                'font-backup'       => 'Arial, Helvetica, sans-serif',
            ),
        ),
        array(
            'id'            => 'typography_basic_body_font_size',
            'title'         => _x('Body Font Size', 'Styling Typography', 'op3_smart'),
            'type'          => 'typography',
            'font-backup'   => false,
            'font-style'    => false,
            'font-weight'   => false,
            'subsets'       => false,
            'line-height'   => false,
            'text-align'    => false,
            'color'         => false,
            'font-family'   => false,
            'output'        => array('body, p'),
            'default'       => array(
                'font-size'         => '17px',
                'line-height'       => '27px',
                'letter-spacing'    => '-0.5px'
            ),
        ),
        array(
            'id'        => 'typography_body_section_end',
            'type'      => 'section',
            'indent'    => false,
        ),
        array(
            'id'        => 'typography_headline_section_start',
            'type'      => 'section',
            'title'     => _x('Headline Font', 'Styling Typography', 'op3_smart'),
            'indent'    => true,
            'required'  => array('typography_advanced', 'equals', false),
        ),
        array(
            'id'            => 'typography_basic_headline_font_family',
            'title'         => _x('Headline Font Family', 'Styling Typography', 'op3_smart'),
            'type'          => 'typography',
            'font-backup'   => false,
            'font-style'    => false,
            'font-weight'   => false,
            'subsets'       => false,
            'line-height'   => false,
            'text-align'    => false,
            'color'         => false,
            'font-size'     => false,
            'output'        => array('h1, h2, h3, h4, h5, h6, .op-entry .op-author-name'),
            'default'       => array(
                'font-family'       => 'Poppins',
                'font-backup'       => 'Verdana, Geneva, sans-serif',
            ),
        ),
        array(
            'id'            => 'typography_basic_h1_font_size',
            'title'         => _x('H1 Font Size', 'Styling Typography', 'op3_smart'),
            'type'          => 'typography',
            'font-backup'   => false,
            'font-style'    => false,
            'font-weight'   => false,
            'subsets'       => false,
            'line-height'   => true,
            'text-align'    => false,
            'color'         => false,
            'font-family'   => false,
            'output'        => array('h1'),
            'default'       => array(
                'font-size'         => '35px',
                'line-height'       => '40px',
                'letter-spacing'    => '-1px'
            ),
        ),
        array(
            'id'            => 'typography_basic_h2_font_size',
            'title'         => _x('H2 Font Size', 'Styling Typography', 'op3_smart'),
            'type'          => 'typography',
            'font-backup'   => false,
            'font-style'    => false,
            'font-weight'   => false,
            'subsets'       => false,
            'line-height'   => true,
            'text-align'    => false,
            'color'         => false,
            'font-family'   => false,
            'output'        => array('h2'),
            'default'       => array(
                'font-size'         => '26px',
                'line-height'       => '34px',
            ),
        ),
        array(
            'id'            => 'typography_basic_h3_font_size',
            'title'         => _x('H3 Font Size', 'Styling Typography', 'op3_smart'),
            'type'          => 'typography',
            'font-backup'   => false,
            'font-style'    => false,
            'font-weight'   => false,
            'subsets'       => false,
            'line-height'   => true,
            'text-align'    => false,
            'color'         => false,
            'font-family'   => false,
            'output'        => array('h3'),
            'default'       => array(
                'font-size'         => '22px',
                'line-height'       => '33px',
            ),
        ),
        array(
            'id'            => 'typography_basic_h4_font_size',
            'title'         => _x('H4 Font Size', 'Styling Typography', 'op3_smart'),
            'type'          => 'typography',
            'font-backup'   => false,
            'font-style'    => false,
            'font-weight'   => false,
            'subsets'       => false,
            'line-height'   => true,
            'text-align'    => false,
            'color'         => false,
            'font-family'   => false,
            'output'        => array('h4'),
            'default'       => array(
                'font-size'         => '20px',
                'line-height'       => '30px',
            ),
        ),
        array(
            'id'            => 'typography_basic_h5_font_size',
            'title'         => _x('H5 Font Size', 'Styling Typography', 'op3_smart'),
            'type'          => 'typography',
            'font-backup'   => false,
            'font-style'    => false,
            'font-weight'   => false,
            'subsets'       => false,
            'line-height'   => true,
            'text-align'    => false,
            'color'         => false,
            'font-family'   => false,
            'output'        => array('h5'),
            'default'       => array(
                'font-size'         => '17px',
                'line-height'       => '27px',
            ),
        ),
        array(
            'id'            => 'typography_basic_h6_font_size',
            'title'         => _x('H6 Font Size', 'Styling Typography', 'op3_smart'),
            'type'          => 'typography',
            'font-backup'   => false,
            'font-style'    => false,
            'font-weight'   => false,
            'subsets'       => false,
            'line-height'   => true,
            'text-align'    => false,
            'color'         => false,
            'font-family'   => false,
            'output'        => array('h6'),
            'default'       => array(
                'font-size'         => '14px',
                'line-height'       => '24px',
            ),
        ),
        array(
            'id'        => 'typography_headline_section_end',
            'type'      => 'section',
            'indent'    => false,
        ),
        array(
            'id'        => 'typography_titles_section_start',
            'type'      => 'section',
            'title'     => _x('Title and Tagline Styles', 'Styling Typography', 'op3_smart'),
            'indent'    => true,
            'required'  => array('typography_advanced', 'equals', true),
        ),
        array(
            'id'                => 'typography_title',
            'title'             => _x('Site Title', 'Styling Typography', 'op3_smart'),
            'type'              => 'typography',
            'font-backup'       => true,
            'letter-spacing'    => true,
            'text-transform'    => true,
            'output'            => array('.navbar-brand h1'),
            'default'           => array(
                'font-family'       => 'Montserrat',
                'font-backup'       => 'Arial, Helvetica, sans-serif',
                'font-size'         => '40px',
                'font-weight'       => '700',
                'color'             => '#333333',
                'line-height'       => '55px',
                'letter-spacing'    => '0px',
                'text-transform'    => 'none',
            ),
        ),
        array(
            'id'                => 'typography_tagline',
            'title'             => _x('Site Tagline', 'Styling Typography', 'op3_smart'),
            'type'              => 'typography',
            'font-backup'       => true,
            'letter-spacing'    => true,
            'text-transform'    => true,
            'output'            => array('.navbar-tagline'),
            'default'           => array(
                'font-family'       => 'Source Sans Pro',
                'font-backup'       => 'Arial, Helvetica, sans-serif',
                'font-size'         => '18px',
                'font-weight'       => '400',
                'color'             => '#333333',
                'line-height'       => '29px',
                'letter-spacing'    => '0px',
                'text-transform'    => 'none',
            ),
        ),
        array(
            'id'        => 'typography_titles_section_end',
            'type'      => 'section',
            'indent'    => false,
        ),
        array(
            'id'        => 'typography_content_section_start',
            'type'      => 'section',
            'title'     => _x('Text and Content Styles', 'Styling Typography', 'op3_smart'),
            'indent'    => true,
            'required'  => array('typography_advanced', 'equals', true),
        ),
        array(
            'id'                => 'typography_post_title',
            'title'             => _x('Title', 'Styling Typography', 'op3_smart'),
            'type'              => 'typography',
            'output'            => array(
               '.op-hero-area h1,
                .op-hero-area .op-headline,
                .op-hero-area.op-blog-post .op-hero-header'
            ),
            'font-backup'       => true,
            'letter-spacing'    => true,
            'default'           => array(
                'font-family'       => 'Montserrat',
                'font-backup'       => 'Arial, Helvetica, sans-serif',
                'font-size'         => '45px',
                'font-weight'       => '600',
                'color'             => '#ffffff',
                'line-height'       => '55px',
                'letter-spacing'    => '0px',
            ),
        ),
        array(
            'id'                => 'typography_p',
            'title'             => _x('Text', 'Styling Typography', 'op3_smart'),
            'type'              => 'typography',
            'output'            => array('body, p'),
            'font-backup'       => true,
            'letter-spacing'    => true,
            'default'           => array(
                'font-family'       => 'Source Sans Pro',
                'font-backup'       => 'Arial, Helvetica, sans-serif',
                'font-size'         => '18px',
                'font-weight'       => '400',
                'color'             => '#333333',
                'line-height'       => '29px',
                'letter-spacing'    => '0px',
            ),
        ),
        array(
            'id'                => 'typography_menu',
            'title'             => _x('Menu', 'Styling Typography', 'op3_smart'),
            'type'              => 'typography',
            'font-backup'       => true,
            'letter-spacing'    => true,
            'default'           => array(
                'font-family'       => 'Montserrat',
                'font-backup'       => 'Arial, Helvetica, sans-serif',
                'font-size'         => '13px',
                'font-weight'       => '400',
                'line-height'       => '20px',
                'text-align'        => 'left',
                'text-transform'    => 'uppercase',
                'letter-spacing'    => '0px',
            ),
            'color'             => false, // colors are defined by different options set
            'output'            => array('.op-navbar .navbar-nav .menu-item a'),
        ),
        array(
            'id'        => 'typography_content_section_end',
            'type'      => 'section',
            'indent'    => false,
        ),
        array(
            'id'        => 'typography_heading_section_start',
            'type'      => 'section',
            'title'     => _x('Heading Styles', 'Styling Typography', 'op3_smart'),
            'indent'    => true,
            'required'  => array('typography_advanced', 'equals', true),
        ),
        array(
            'id'                => 'typography_h1',
            'title'             => _x('Heading 1 (H1)', 'Styling Typography', 'op3_smart'),
            'type'              => 'typography',
            'output'            => array('h1', '.op-entry h1'),
            'font-backup'       => true,
            'letter-spacing'    => true,
            'default'           => array(
                'font-family'       => 'Montserrat',
                'font-backup'       => 'Arial, Helvetica, sans-serif',
                'font-size'         => '30px',
                'font-weight'       => '500',
                'color'             => '#333333',
                'line-height'       => '45px',
                'letter-spacing'    => '0px',
            ),
        ),
        array(
            'id'                => 'typography_h2',
            'title'             => _x('Heading 2 (H2)', 'Styling Typography', 'op3_smart'),
            'type'              => 'typography',
            'output'            => array('h2', '.op-entry h2', '.woocommerce-Reviews-title', '.comment-reply-title'),
            'font-backup'       => true,
            'letter-spacing'    => true,
            'default'           => array(
                'font-family'       => 'Montserrat',
                'font-backup'       => 'Arial, Helvetica, sans-serif',
                'font-size'         => '26px',
                'font-weight'       => '700',
                'color'             => '#333333',
                'line-height'       => '39px',
                'letter-spacing'    => '0px',
            ),
        ),
        array(
            'id'                => 'typography_h3',
            'title'             => _x('Heading 3 (H3)', 'Styling Typography', 'op3_smart'),
            'type'              => 'typography',
            'output'            => array('h3', '.op-entry h3'),
            'font-backup'       => true,
            'letter-spacing'    => true,
            'default'           => array(
                'font-family'       => 'Montserrat',
                'font-backup'       => 'Arial, Helvetica, sans-serif',
                'font-size'         => '22px',
                'font-weight'       => '700',
                'color'             => '#333333',
                'line-height'       => '33px',
                'letter-spacing'    => '0px',
            ),
        ),
        array(
            'id'                => 'typography_h4',
            'title'             => _x('Heading 4 (H4)', 'Styling Typography', 'op3_smart'),
            'type'              => 'typography',
            'output'            => array('h4', '.op-entry h4'),
            'font-backup'       => true,
            'letter-spacing'    => true,
            'default'           => array(
                'font-family'       => 'Montserrat',
                'font-backup'       => 'Arial, Helvetica, sans-serif',
                'font-size'         => '20px',
                'font-weight'       => '400',
                'color'             => '#333333',
                'line-height'       => '30px',
                'letter-spacing'    => '0px',
            ),
        ),
        array(
            'id'                => 'typography_h5',
            'title'             => _x('Heading 5 (H5)', 'Styling Typography', 'op3_smart'),
            'type'              => 'typography',
            'output'            => array('h5', '.op-entry h5'),
            'font-backup'       => true,
            'letter-spacing'    => true,
            'default'           => array(
                'font-family'       => 'Montserrat',
                'font-backup'       => 'Arial, Helvetica, sans-serif',
                'font-size'         => '16px',
                'font-weight'       => '700',
                'color'             => '#333333',
                'line-height'       => '27px',
                'letter-spacing'    => '0px',
            ),
        ),
        array(
            'id'                => 'typography_h6',
            'title'             => _x('Heading 6 (H6)', 'Styling Typography', 'op3_smart'),
            'type'              => 'typography',
            'output'            => array('h6', '.op-entry h6'),
            'font-backup'       => true,
            'letter-spacing'    => true,
            'default'           => array(
                'font-family'       => 'Montserrat',
                'font-backup'       => 'Arial, Helvetica, sans-serif',
                'font-size'         => '14px',
                'font-weight'       => '400',
                'color'             => '#333333',
                'line-height'       => '24px',
                'letter-spacing'    => '0px',
            ),
        ),
        array(
            'id'        => 'typography_heading_section_end',
            'type'      => 'section',
            'indent'    => false,
        ),
    ),
));
