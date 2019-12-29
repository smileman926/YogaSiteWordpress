<?php
Redux::setSection($opt_name, array(
    'title'     => _x('Header', 'op3_smart'),
    'id'        => 'header',
    'icon'      => 'el-icon-arrow-up',
    'fields'    => array(
        array(
            'id'        => 'logo',
            'type'      => 'media',
            'title'     => _x('Logo', 'Header', 'op3_smart'),
            'desc'      => _x('Logo should not be more than 220px wide', 'Header', 'op3_smart'),
            'mode'      => 'image',
            'default'   => array(
                'url'   => get_template_directory_uri() . '/images/optimizepress-smarttheme-logo.png',
            ),
        ),
        array(
            'id'    => 'logo_retina',
            'type'  => 'media',
            'title' => _x('Retina Logo', 'Header', 'op3_smart'),
            'desc'  => _x('Retina Logo should not be more than 440px wide', 'Header', 'op3_smart'),
            'mode'  => 'image',
            'default'   => array(
                'url'   => get_template_directory_uri() . '/images/optimizepress-smarttheme-logo-2x.png',
            ),
        ),
        array(
            'id'        => 'site_icon',
            'type'      => 'media',
            'title'     => _x('Site Icon', 'Header', 'op3_smart'),
            'desc'      => _x('Select or upload image with 512x512 px to be used as a site icon', 'Header', 'op3_smart'),
            'mode'      => 'image',
            'width'     => 512,
            'height'    => 512,
            'compiler'  => true,
            'default'   => array(
                'id'    => get_option('site_icon'),
                // 'url'   => get_template_directory_uri() . '/images/optimizepress-smarttheme-favicon.png',
            ),
        ),
        array(
            'id'        => 'sticky_header',
            'type'      => 'switch',
            'title'     => _x('Sticky Header', 'Header', 'op3_smart'),
            'default'   => true,
            'on'        => _x('Yes', 'op3_smart'),
            'off'       => _x('No', 'op3_smart'),
        ),
        array(
            'id'        => 'search_in_header',
            'type'      => 'switch',
            'title'     => _x('Show Search Box in header', 'Header', 'op3_smart'),
            'default'   => true,
            'on'        => _x('Yes', 'op3_smart'),
            'off'       => _x('No', 'op3_smart'),
        ),
        array(
            'id'        => 'header_style',
            'type'      => 'select_image',
            'title'     => _x('Header Style', 'Header', 'op3_smart'),
            'default'   => get_template_directory_uri() . '/images/header-basic.png',
            'options'   => array(
                array(
                    'alt' => _x('Basic', 'Header', 'op3_smart'),
                    'img' => get_template_directory_uri() . '/images/header-basic.png'
                ),
                array(
                    'alt' => _x('Navbar below header & tagline', 'Header', 'op3_smart'),
                    'img' => get_template_directory_uri() . '/images/header-with-tagline.png'
                ),
                array(
                    'alt' => _x('Centered', 'Header', 'op3_smart'),
                    'img' => get_template_directory_uri() . '/images/header-centered.png'
                ),
                array(
                    'alt' => _x('Full Width', 'Header', 'op3_smart'),
                    'img' => get_template_directory_uri() . '/images/header-full.png'
                ),
            ),
        ),
        array(
            'id'            => 'menu_line_color',
            'title'         => _x('Dropdown Menu Line Color', 'Header', 'op3_smart'),
            'type'          => 'color',
            'transparent'   => true,
            'output'        => array( 'border-bottom-color' => '.sub-menu'),
            'default'       => '#005BDC',
        ),
        array(
            'id'        => 'blogdescription',
            'type'      => 'text',
            'compiler'  => true,
            'title'     => _x('Site Tagline', 'Header', 'op3_smart'),
            'default'   => get_option('blogdescription'),
        ),
        array(
            'id'            => 'header_background_color',
            'title'         => _x('Header Background Colour', 'Header', 'op3_smart'),
            'type'          => 'color',
            'transparent'   => false,
            'output'        => array('background' => '.op-navbar'),
            'default'       => '#ffffff',
        ),
        array(
            'id'            => 'header_bottom_border',
            'title'         => _x('Header Bottom Border Colour', 'Header', 'op3_smart'),
            'type'          => 'color',
            'transparent'   => true,
            'output'        => array(
                                'border-bottom-color' => '.op-navbar',
                                'border-top-color' => '.header-style-centered #navbar, .header-style-with-tagline #navbar'
                            ),
            'default'       => '#f0f0f0',
        ),
    ),
));
