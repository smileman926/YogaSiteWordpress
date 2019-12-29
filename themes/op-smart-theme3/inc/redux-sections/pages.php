<?php
Redux::setSection($opt_name, array(
    'title'     => _x('Pages', 'op3_smart'),
    'id'        => 'pages',
    'icon'      => 'el-icon-lines',
));

Redux::setSection($opt_name, array(
    'title'         => _x('General', 'Pages', 'op3_smart'),
    'id'            => 'page_general',
    'subsection'    => true,
    'fields'        => array(
        array(
            'id'        => 'page_metadata_options',
            'type'      => 'checkbox',
            'title'     => _x('Metadata Options', 'Pages', 'op3_smart'),
            // 'desc'      => _x('These options would hide these from pages', 'op3_smart'),
            'options'   => array(
                'date'          => _x('Date', 'Pages', 'op3_smart'),
                'author'        => _x('Author', 'Pages', 'op3_smart'),
                // 'categories'    => _x('Categories', 'op3_smart'),
                // we have a separate section called Hide Blog Comments for this
                // 'comments'      => _x('Comments', 'op3_smart'),
                // 'tags'          => _x('Tags', 'op3_smart'),
            ),
            'default'   => array(
                'date'          => 0,
                'author'        => 0,
            ),
        ),
    ),
));

Redux::setSection($opt_name, array(
    'title'         => _x('Page Layout', 'Pages Page Layout', 'op3_smart'),
    'id'            => 'page_layout_section',
    'subsection'    => true,
    'fields'        => array(
        array(
            'id'        => 'page_sidebar',
            'type'      => 'image_select',
            'title'     => _x('Page Layout', 'Pages Page Layout', 'op3_smart'),
            'subtitle'  => _x('Choose position of a sidebar', 'Pages Page Layout', 'op3_smart'),
            'default'   => 'no_sidebar',
            'options'   => array(
                'no_sidebar' => array(
                    'alt' => _x('No Sidebar', 'Pages Page Layout', 'op3_smart'),
                    'img' => ReduxFramework::$_url . 'assets/img/1c.png'
                ),
                'sidebar_left' => array(
                    'alt' => _x('Sidebar Left', 'Pages Page Layout', 'op3_smart'),
                    'img' => ReduxFramework::$_url . 'assets/img/2cl.png'
                ),
                'sidebar_right' => array(
                    'alt' => _x('Sidebar Right', 'Pages Page Layout', 'op3_smart'),
                    'img' => ReduxFramework::$_url . 'assets/img/2cr.png'
                ),
            ),
        ),
    )
));

Redux::setSection($opt_name, array(
    'title'         => _x('Page Hero', 'Pages Page Hero', 'op3_smart'),
    'id'            => 'page_hero_section',
    'subsection'    => true,
    'fields'        => array(
        array(
            'id'            => 'sitewide_page_header_background_color',
            'title'         => _x('Hero Background Colour', 'Pages Page Hero', 'op3_smart'),
            'type'          => 'color_gradient',
            'transparent'   => false,
            'default'       => array('from' => '#23282d', 'to' => '#23282d'),
            // 'output'        => array( 'background' => '.op-blog-post-header, .opppp'),
            // 'output'        => array(
            //     'color' => '.op-homepage-hero, .op-homepage-hero-content, .op-homepage-hero-title, .op-homepage-hero-subtitle',
            //     'background-color' => '.op-homepage-hero-title::after'
            // ),
        ),
        array(
            'id'        => 'sitewide_page_featured_image_as_hero',
            'type'      => 'switch',
            'title'     => _x('Use Featured Image as Hero Image', 'Pages Page Hero', 'op3_smart'),
            'subtitle'  => _x('Use featured image as a hero image unless set differently on a page itself.', 'Pages Page Hero', 'op3_smart'),
            'on'        => _x('Yes', 'op3_smart'),
            'off'       => _x('No', 'op3_smart'),
            'default'   => true,
        ),
        array(
            'id'        => 'sitewide_page_featured_image_in_content',
            'type'      => 'switch',
            'title'     => _x('Show Featured Image in Page Content', 'Pages Page Hero', 'op3_smart'),
            'on'        => _x('Show', 'op3_smart'),
            'off'       => _x('Hide', 'op3_smart'),
            'default'   => true,
            'required'  => array('sitewide_page_featured_image_as_hero', 'equals', false),
        ),
        array(
            'id'                => 'sitewide_page_header_background_image',
            'type'              => 'background',
            'title'             => _x('Hero Background Image', 'Pages Page Hero', 'op3_smart'),
            'background-color'  => false,
            'preview_media'     => true,
            'preview'           => false,
            'output'            => array('.op-blog-post-header'),
            'default'  => array(
                'background-size'  => 'cover',
                'background-position'  => 'center center',
            ),
            'required'  => array(
                array('sitewide_page_featured_image_as_hero', 'equals', false),
            )
        ),
        array(
            'id'                => 'sitewide_page_header_background_image_positioning',
            'title'             => _x('Hero Background Image Positioning', 'Pages Page Hero', 'op3_smart'),
            'type'              => 'background',
            'url'               => true,
            'background-color'  => false,
            'preview_media'     => false,
            'preview'           => false,
            'background-image'  => false,
            'default'  => array(
                'background-size'  => 'cover',
                'background-position'  => 'center center',
            ),
            'required'  => array(
                array('sitewide_page_featured_image_as_hero', 'equals', true),
            )
        ),
        array(
            'id'            => 'sitewide_page_header_background_overlay',
            'title'         => _x('Hero Image Overlay Colour', 'Pages Page Hero', 'op3_smart'),
            'type'          => 'color_rgba',
            'default'       => array(
                'color' => '#323232',
                'alpha' => 0.75,
                'rgba'  => 'rgba(50, 50, 50, 0.75)'
            ),
            'options'   => array(
                'clickout_fires_change' => true
            ),
            // 'output'        => array('background-color' => '.op-blog-header-content'),
            // 'required'      => array('homepage_hero_enabled', 'equals', true),
        ),
        array(
            'id'            => 'sitewide_page_header_text_color',
            'type'          => 'color',
            'title'         => _x('Hero Text Colour', 'Pages Page Hero', 'op3_smart'),
            'transparent'   => false,
            'output'        => array(
                // '.page .op-hero-area .op-headline'
                '.page .op-hero-header, .page .op-hero-area .feature-title, .page .op-hero-area .op-headline, .page .op-hero-layout-meta-wrap, .page .op-blog-meta-wrapper, .page .op-hero-layout-meta-wrap a'
            ),
            'default'       => '#ffffff',
        ),
        array(
            'id'        => 'sitewide_page_hero_size',
            'type'      => 'switch',
            'title'     => _x('Hero Size', 'Pages Page Hero', 'op3_smart'),
            'on'        => _x('Small', 'Pages Page Hero', 'op3_smart'),
            'off'       => _x('Large', 'Pages Page Hero', 'op3_smart'),
            'default'   => false,
        ),
    )
));
