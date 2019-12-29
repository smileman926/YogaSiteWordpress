<?php
Redux::setSection($opt_name, array(
    'title'     => _x('Blog', 'op3_smart'),
    'id'        => 'blog',
    'icon'      => 'el-icon-list',
));

Redux::setSection($opt_name, array(
    'title'         => _x('General', 'Blog General', 'op3_smart'),
    'id'            => 'blog_general',
    'subsection'    => true,
    'fields'        => array(
        array(
            'id'        => 'blog_metadata_options',
            'type'      => 'checkbox',
            'title'     => _x('Metadata Options', 'Blog General', 'op3_smart'),
            'desc'      => _x('Check the boxes to show these elements across your blog including blog posts and archive pages.', 'Blog General', 'op3_smart'),
            'options'   => array(
                'date'          => _x('Date', 'Blog General', 'op3_smart'),
                'author'        => _x('Author', 'Blog General', 'op3_smart'),
                'categories'    => _x('Categories', 'Blog General', 'op3_smart'),
                // we have a separate section called Hide Blog Comments for this
                // 'comments'      => _x('Comments', 'op3_smart'),
                'tags'          => _x('Tags', 'Blog General', 'op3_smart'),
            ),
            'default'   => array(
                'date'          => 1,
                'author'        => 1,
                'categories'    => 1,
                'tags'          => 1,
            ),
        ),
        array(
            'id'        => 'blog_infinite_scroll',
            'type'      => 'switch',
            'title'     => _x('Use Jetpack Infinite Scroll', 'Blog General', 'op3_smart'),
            'desc'      => _x('Please note that you need to have <a href="https://wordpress.org/plugins/jetpack/" target="_blank" rel="noopener">Jetpack by WordPress.com</a> plugin installed and activated for Infinite Scroll to work.', 'Blog General', 'op3_smart'),
            'default'   => true,
            'on'        => _x('Yes', 'op3_smart'),
            'off'       => _x('No', 'op3_smart'),
        ),
        array(
            'id'        => 'blog_hide_comments',
            'type'      => 'switch',
            'title'     => _x('Hide Blog Comments', 'Blog General', 'op3_smart'),
            'subtitle'  => _x('Hide all comments from blog all blog posts', 'Blog General', 'op3_smart'),
            'default'   => false,
            'on'        => _x('Yes', 'op3_smart'),
            'off'       => _x('No', 'op3_smart'),
        ),
    )
));

Redux::setSection($opt_name, array(
    'title'         => _x('Homepage Layout', 'Blog Homepage Layout', 'op3_smart'),
    'id'            => 'blog_homepage_layout',
    'subsection'    => true,
    'fields'        => array(
        array(
            'id'        => 'homepage_layout',
            'type'      => 'image_select',
            'title'     => _x('Homepage Layout', 'Blog Homepage Layout', 'op3_smart'),
            'default'   => 'list',
            'options'   => array(
                'list' => array(
                    'alt' => _x('List Post Layout', 'Blog Homepage Layout', 'op3_smart'),
                    'img' => get_template_directory_uri() . '/images/icon-layout-list.png'
                ),
                'grid' => array(
                    'alt' => _x('Grid Post Layout', 'Blog Homepage Layout', 'op3_smart'),
                    'img' => get_template_directory_uri() . '/images/icon-layout-grid.png'
                ),
            ),
        ),
        array(
            'id'        => 'homepage_sidebar',
            'type'      => 'image_select',
            'title'     => _x('Homepage Sidebar', 'Blog Homepage Layout', 'op3_smart'),
            'subtitle'  => _x('Choose position of a sidebar', 'Blog Homepage Layout', 'op3_smart'),
            'default'   => 'no_sidebar',
            'options'   => array(
                'no_sidebar' => array(
                    'alt' => _x('No Sidebar', 'Blog Homepage Layout', 'op3_smart'),
                    'img' => ReduxFramework::$_url . 'assets/img/1c.png'
                ),
                'sidebar_left' => array(
                    'alt' => _x('Sidebar Left', 'Blog Homepage Layout', 'op3_smart'),
                    'img' => ReduxFramework::$_url . 'assets/img/2cl.png'
                ),
                'sidebar_right' => array(
                    'alt' => _x('Sidebar Right', 'Blog Homepage Layout', 'op3_smart'),
                    'img' => ReduxFramework::$_url . 'assets/img/2cr.png'
                ),
            ),
        ),
        array(
            'id'        => 'homepage_content',
            'type'      => 'select',
            'title'     => _x('Choose Homepage Content', 'Blog Homepage Layout', 'op3_smart'),
            'default'   => 'latest',
            'options'   => array(
                'latest'        => _x('Latest Posts', 'Blog Homepage Layout', 'op3_smart'),
                'categories'    => _x('Category', 'Blog Homepage Layout', 'op3_smart'),
                'tags'          => _x('Tag', 'Blog Homepage Layout', 'op3_smart'),
            ),
        ),
        array(
            'id'        => 'homepage_category',
            'title'     => _x('Select Posts Category', 'Blog Homepage Layout', 'op3_smart'),
            'type'      => 'select',
            'data'      => 'categories',
            'required'  => array('homepage_content', 'equals', 'categories'),
        ),
        array(
            'id'        => 'homepage_tag',
            'title'     => _x('Select Posts Tag', 'Blog Homepage Layout', 'op3_smart'),
            'type'      => 'select',
            'data'      => 'tags',
            'required'  => array('homepage_content', 'equals', 'tags'),
        ),
    )
));

Redux::setSection($opt_name, array(
    'title'         => _x('Homepage Hero', 'Blog Homepage Hero', 'op3_smart'),
    'id'            => 'homepage_hero',
    'subsection'    => true,
    'fields'        => array(
        array(
            'id'        => 'homepage_hero_enabled',
            'type'      => 'switch',
            'title'     => _x('Homepage Hero', 'Blog Homepage Hero', 'op3_smart'),
            'default'   => true,
        ),
        array(
            'id'        => 'homepage_hero_design',
            'type'      => 'select',
            'title'     => _x('Hero Layout', 'Blog Homepage Hero', 'op3_smart'),
            'options'   => array(
                'standard'      => _x('Standard / Header Title', 'Blog Homepage Hero', 'op3_smart'),
                'video'         => _x('Video', 'Blog Homepage Hero', 'op3_smart'),
                'featured-post' => _x('Featured Post', 'Blog Homepage Hero', 'op3_smart'),
            ),
            'default'   => 'featured-post',
            'required'  => array('homepage_hero_enabled', 'equals', true),
        ),
        array(
            'id'        => 'homepage_hero_title',
            'title'     => _x('Title', 'Blog Homepage Hero', 'op3_smart'),
            'type'      => 'text',
            'default'   => 'An Example Title',
            'required'  => array('homepage_hero_design', 'not', 'featured-post'),
        ),
        array(
            'id'        => 'homepage_hero_subtitle',
            'title'     => _x('Subtitle', 'Blog Homepage Hero', 'op3_smart'),
            'type'      => 'textarea',
            'default'   => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium mollitia eligendi consequuntur consequatur est quis quisquam cumque',
            'required'  => array('homepage_hero_design', 'not', 'featured-post'),
        ),
        array(
            'id'        => 'homepage_hero_alignment',
            'title'     => _x('Alignment', 'Blog Homepage Hero', 'op3_smart'),
            'type'      => 'image_select',
            'default'   => 'center',
            'options'   => array(
                'left' => array(
                    'alt' => _x('Left', 'Blog Homepage Hero', 'op3_smart'),
                    'img' => get_template_directory_uri() . '/images/icon-align-left.png'
                ),
                'center' => array(
                    'alt' => _x('Center', 'Blog Homepage Hero', 'op3_smart'),
                    'img' => get_template_directory_uri() . '/images/icon-align-center.png'
                ),
                'right' => array(
                    'alt' => _x('Right', 'Blog Homepage Hero', 'op3_smart'),
                    'img' => get_template_directory_uri() . '/images/icon-align-right.png'
                ),
            ),
            'required'  => array('homepage_hero_design', 'equals', 'standard'),
        ),
        array(
            'id'        => 'homepage_hero_video_embed_code',
            'title'     => _x('Video Embed Code', 'Blog Homepage Hero', 'op3_smart'),
            'type'      => 'textarea',
            'required'  => array('homepage_hero_design', 'equals', 'video'),
        ),
        array(
            'id'        => 'homepage_hero_video_align',
            'type'      => 'image_select',
            'title'     => _x('Video Align', 'Blog Homepage Hero', 'op3_smart'),
            'default'   => 'left',
            'required'  => array('homepage_hero_design', 'equals', 'video'),
            'options'   => array(
                'left'  => array(
                    'alt' => _x('Standard / Header Title', 'Blog Homepage Hero', 'op3_smart'),
                    'img' => get_template_directory_uri() . '/images/icon-video-align-left.png'
                ),
                'right' => array(
                    'alt' => _x('Video', 'Blog Homepage Hero', 'op3_smart'),
                    'img' => get_template_directory_uri() . '/images/icon-video-align-right.png'
                ),
            )
        ),
        array(
            'id'        => 'homepage_hero_featured_post',
            'type'      => 'select',
            'title'     => _x('Featured Post', 'Blog Homepage Hero', 'op3_smart'),
            'options'   => array(
                'most_recent'           => _x('Show most recent post', 'Blog Homepage Hero', 'op3_smart'),
                'most_recent_category'  => _x('Show most recent post with specific category', 'Blog Homepage Hero', 'op3_smart'),
                'most_recent_tag'       => _x('Show most recent post with specific tag', 'Blog Homepage Hero', 'op3_smart'),
                'most_recent_sticky'    => _x('Show most recent sticky post', 'Blog Homepage Hero', 'op3_smart'),
            ),
            'default'   => 'most_recent',
            'required'  => array('homepage_hero_design', 'equals', 'featured-post'),
        ),
        array(
            'id'        => 'homepage_hero_tag',
            'title'     => _x('Select Posts Tag', 'Blog Homepage Hero', 'op3_smart'),
            'type'      => 'select',
            'data'      => 'tags',
            'required'  => array('homepage_hero_featured_post', 'equals', 'most_recent_tag'),
        ),
        array(
            'id'        => 'homepage_hero_category',
            'title'     => _x('Select Posts Category', 'Blog Homepage Hero', 'op3_smart'),
            'type'      => 'select',
            'data'      => 'categories',
            'required'  => array('homepage_hero_featured_post', 'equals', 'most_recent_category'),
        ),
        array(
            'id'        => 'homepage_hero_excerpt',
            'title'     => _x('Post Excerpt', 'Blog Homepage Hero', 'op3_smart'),
            'type'      => 'switch',
            'default'   => true,
            'on'        => 'Show',
            'off'       => 'Hide',
            'required'  => array('homepage_hero_design', 'equals', 'featured-post'),
        ),
        array(
            'id'        => 'homepage_hero_button_style',
            'title'     => _x('Button Style', 'Blog Homepage Hero', 'op3_smart'),
            'type'      => 'image_select',
            'default'   => 'style-1',
            'options'   => array(
                'style-1' => array(
                    'alt' => _x('Solid Colour', 'Blog Homepage Hero', 'op3_smart'),
                    'img' => get_template_directory_uri() . '/images/icon-button-style-1.png'
                ),
                'style-2' => array(
                    'alt' => _x('Border Only', 'Blog Homepage Hero', 'op3_smart'),
                    'img' => get_template_directory_uri() . '/images/icon-button-style-2.png'
                ),
            ),
            // 'required'  => array('homepage_hero_design', 'not', 'featured-post'),
            'required'  => array('homepage_hero_enabled', 'equals', true),
        ),
        array(
            'id'        => 'homepage_hero_button_text',
            'title'     => _x('Button Text', 'Blog Homepage Hero', 'op3_smart'),
            'type'      => 'text',
            'default'   => _x('Read More', 'Blog Homepage Hero', 'op3_smart'),
            // 'required'  => array('homepage_hero_design', 'not', 'featured-post'),
            'required'  => array('homepage_hero_enabled', 'equals', true),
        ),
        array(
            'id'        => 'homepage_hero_button_link',
            'title'     => _x('Button Link', 'Blog Homepage Hero', 'op3_smart'),
            'type'      => 'text',
            'default'   => '/',
            'required'  => array('homepage_hero_design', 'not', 'featured-post'),
        ),
        array(
            'id'        => 'homepage_hero_button_color',
            'title'     => _x('Button Text Colour', 'Blog Homepage Hero', 'op3_smart'),
            'type'      => 'color_rgba',
            'default'   => array(
                'color' => '#ffffff',
                'alpha' => 1
            ),
            'options'   => array(
                'clickout_fires_change' => true
            ),
            'output'    => array(
                'color' => '.op-homepage-hero-button,
                            .op-homepage-hero-button:hover,
                            .op-homepage-hero-button:active,
                            .op-homepage-hero-button:focus',
                'border-color' => '.op-homepage-hero-button-style-2',
            ),
            // 'required'  => array('homepage_hero_design', 'not', 'featured-post'),
            'required'  => array('homepage_hero_enabled', 'equals', true),
        ),
        array(
            'id'        => 'homepage_hero_button_background',
            'title'     => _x('Button Background Colour', 'Blog Homepage Hero', 'op3_smart'),
            'type'      => 'color_rgba',
            'default'   => array(
                'color' => '#005BDC',
                'alpha' => 1
            ),
            'options'   => array(
                'clickout_fires_change' => true
            ),
            'output'    => array(
                'background-color' =>  '.op-homepage-hero-button'
            ),
            'required'  => array('homepage_hero_button_style', 'equals', 'style-1'),
        ),
        array(
            'id'        => 'homepage_hero_button_hover_background',
            'title'     => _x('Button Hover Background Colour', 'Blog Homepage Hero', 'op3_smart'),
            'type'      => 'color_rgba',
            'default'   => array(
                'color' => '#0054cc',
                'alpha' => 1
            ),
            'options'   => array(
                'clickout_fires_change' => true
            ),
            'output'    => array(
                'background-color' =>  '.op-homepage-hero-button:hover,
                                        .op-homepage-hero-button:active,
                                        .op-homepage-hero-button:focus'
            ),
            'required'  => array('homepage_hero_button_style', 'equals', 'style-1'),
        ),
        array(
            'id'        => 'homepage_hero_background_behaviour',
            'type'      => 'switch',
            'title'     => _x('Hero Background Behaviour', 'Blog Homepage Hero', 'op3_smart'),
            'desc'      => _x('Default will use settings set in the <em>Blog Post Hero</em> section.', 'Blog Homepage Hero', 'op3_smart'),
            'default'   => true,
            'on'        => _x('Default', 'op3_smart'),
            'off'       => _x('Custom', 'op3_smart'),
            'required'  => array(
                array('homepage_hero_enabled', 'equals', true),
                array('homepage_hero_design', 'equals', 'featured-post'),
            )
        ),
        array(
            'id'            => 'homepage_hero_background_color',
            'title'         => _x('Hero Background Colour', 'Blog Homepage Hero', 'op3_smart'),
            'type'          => 'color_gradient',
            'transparent'   => false,
            'default'       => array('from' => '#23282d', 'to' => '#23282d'),
            'required'      => array(
                array('homepage_hero_enabled', 'equals', true),
                array('homepage_hero_design', 'not', 'featured-post'),
            ),
        ),
        array(
            'id'                => 'homepage_hero_background',
            'title'             => _x('Hero Background Image', 'Blog Homepage Hero', 'op3_smart'),
            'type'              => 'background',
            'url'               => true,
            'background-color'  => false,
            'preview_media'     => true,
            'default'           => array(
                'background-image' => get_template_directory_uri() . '/images/a-girl-with-a-hat.jpg',
                'background-size'  => 'cover',
            ),
            'output'            => array('.op-homepage-hero'),
            'required'          => array(
                array('homepage_hero_enabled', 'equals', true),
                array('homepage_hero_design', 'not', 'featured-post'),
            )
        ),
        array(
            'id'            => 'homepage_hero_background_overlay',
            'title'         => _x('Hero Background Image Overlay Colour', 'Blog Homepage Hero', 'op3_smart'),
            'type'          => 'color_rgba',
            'default'       => array(
                'color' => '#323232',
                'alpha' => 0.75,
                'rgba'  => 'rgba(50, 50, 50, 0.75)'
            ),
            'options'   => array(
                'clickout_fires_change' => true
            ),
            'output'        => array('background-color' => '.op-homepage-hero-container'),
            'required'      => array(
                array('homepage_hero_enabled', 'equals', true),
                array('homepage_hero_design', 'not', 'featured-post'),
            )
        ),

        array(
            'id'            => 'homepage_hero_background_color_featured_post',
            'title'         => _x('Hero Background Colour', 'Blog Homepage Hero', 'op3_smart'),
            'type'          => 'color_gradient',
            'transparent'   => false,
            'default'       => array('from' => '#23282d', 'to' => '#23282d'),
            'required'      => array(
                array('homepage_hero_enabled', 'equals', true),
                array('homepage_hero_design', 'equals', 'featured-post'),
                array('homepage_hero_background_behaviour', 'equals', false),
            ),
            // The output param is not working on color_gradient in reduxframework
            // 'output'        => array('background' => 'op-homepage-hero-area'),
        ),
        array(
            'id'                => 'homepage_hero_background_featured_post',
            'title'             => _x('Hero Background Image', 'Blog Homepage Hero', 'op3_smart'),
            'type'              => 'background',
            'url'               => true,
            'background-color'  => false,
            'preview_media'     => true,
            'default'           => array(
                'background-image' => get_template_directory_uri() . '/images/a-girl-with-a-hat.jpg',
                'background-size'  => 'cover',
            ),
            'output'            => array('.op-homepage-hero-featured-post'),
            'required'      => array(
                array('homepage_hero_enabled', 'equals', true),
                array('homepage_hero_design', 'equals', 'featured-post'),
                array('homepage_hero_background_behaviour', 'equals', false),
            )
        ),
        array(
            'id'            => 'homepage_hero_background_overlay_featured_post',
            'title'         => _x('Hero Background Image Overlay Colour', 'Blog Homepage Hero', 'op3_smart'),
            'type'          => 'color_rgba',
            'default'       => array(
                'color' => '#323232',
                'alpha' => 0.75,
                'rgba'  => 'rgba(50, 50, 50, 0.75)'
            ),
            'options'   => array(
                'clickout_fires_change' => true
            ),
            'output'            => array('background-color' => '.op-homepage-hero-container'),
            'required'      => array(
                array('homepage_hero_enabled', 'equals', true),
                array('homepage_hero_design', 'equals', 'featured-post'),
                array('homepage_hero_background_behaviour', 'equals', false),
            )
        ),

        array(
            'id'            => 'homepage_hero_text_color',
            'title'         => _x('Hero Text Colour', 'Blog Homepage Hero', 'op3_smart'),
            'type'          => 'color_rgba',
            'default'       => array(
                'color' => '#ffffff',
                'alpha' => 1
            ),
            'options'   => array(
                'clickout_fires_change' => true
            ),
            'output'        => array(
                'color' => '.op-homepage-hero, .op-homepage-hero-content, .op-homepage-hero-title, .op-homepage-hero-subtitle, .op-homepage-hero-excerpt',
                'background-color' => '.op-homepage-hero-title::after'
            ),
            'required'      => array('homepage_hero_enabled', 'equals', true),
        ),
        array(
            'id'                => 'homepage_hero_typography_title',
            'type'              => 'typography',
            'title'             => _x('Title Typography', 'Blog Homepage Hero', 'op3_smart'),
            'google'            => true,
            'font-backup'       => false,
            'text-align'        => false,
            'color'             => false,
            'font-size'         => false,
            'line-height'       => false,
            'all_styles'        => true,
            'text-transform'    => false,
            'output'            => array('.op-homepage-hero-title'),
            'units'             => 'em',
            'default' => array(
                'font-weight'   => '600',
                'font-family'   => 'Poppins',
            ),
            'required'          => array('homepage_hero_enabled', 'equals', true),
        ),
        array(
            'id'                => 'homepage_hero_typography_subtitle',
            'type'              => 'typography',
            'title'             => _x('Description Typography', 'Blog Homepage Hero', 'op3_smart'),
            'google'            => true,
            'font-backup'       => false,
            'text-align'        => false,
            'color'             => false,
            'font-size'         => false,
            'line-height'       => false,
            'all_styles'        => true,
            'text-transform'    => false,
            'output'            => array('.op-homepage-hero-subtitle', '.op-homepage-hero-excerpt'),
            'units'             => 'em',
            'default' => array(
                'font-weight'   => '400',
                'font-family'   => 'Karla',
            ),
            'required'          => array('homepage_hero_enabled', 'equals', true),
        ),
        array(
            'id'                => 'homepage_hero_typography_button',
            'type'              => 'typography',
            'title'             => _x('Button Typography', 'Blog Homepage Hero', 'op3_smart'),
            'google'            => true,
            'font-backup'       => false,
            'text-align'        => false,
            'color'             => false,
            'font-size'         => false,
            'line-height'       => false,
            'all_styles'        => true,
            'text-transform'    => false,
            'output'            => array('.op-homepage-hero-button'),
            'units'             => 'em',
            'default' => array(
                'font-weight'   => '400',
                'font-family'   => 'Karla',
                'text-transform'=> 'uppercase'
            ),
            'required'          => array('homepage_hero_enabled', 'equals', true),
        ),
    )
));

Redux::setSection($opt_name, array(
    'title'         => _x('Blog Post Layout', 'Blog Post Layout', 'op3_smart'),
    'id'            => 'blog_post_sidebar_section',
    'subsection'    => true,
    'fields'        => array(
        array(
            'id'        => 'blog_post_sidebar',
            'type'      => 'image_select',
            'title'     => _x('Blog Post Layout', 'Blog Post Layout', 'op3_smart'),
            'subtitle'  => _x('Choose position of a sidebar', 'Blog Post Layout', 'op3_smart'),
            'default'   => 'sidebar_right',
            'options'   => array(
                'no_sidebar' => array(
                    'alt' => _x('No Sidebar', 'Blog Post Layout', 'op3_smart'),
                    'img' => ReduxFramework::$_url . 'assets/img/1c.png'
                ),
                'sidebar_left' => array(
                    'alt' => _x('Sidebar Left', 'Blog Post Layout', 'op3_smart'),
                    'img' => ReduxFramework::$_url . 'assets/img/2cl.png'
                ),
                'sidebar_right' => array(
                    'alt' => _x('Sidebar Right', 'Blog Post Layout', 'op3_smart'),
                    'img' => ReduxFramework::$_url . 'assets/img/2cr.png'
                ),
            ),
        ),
        array(
            'id'        => 'blog_post_prev_next_posts',
            'type'      => 'switch',
            'title'     => _x('Enable Previous/Next Post Pagination', 'Blog Post Layout', 'op3_smart'),
            'default'   => false,
            'on'        => _x('On', 'op3_smart'),
            'off'       => _x('Off', 'op3_smart'),
        ),
        array(
            'id'        => 'blog_post_author_box',
            'type'      => 'switch',
            'title'     => _x('Author Info Box', 'Blog Post Layout', 'op3_smart'),
            'default'   => true,
            'on'        => _x('On', 'op3_smart'),
            'off'       => _x('Off', 'op3_smart'),
        ),
        array(
            'id'        => 'blog_post_related_posts',
            'type'      => 'switch',
            'title'     => _x('Related Posts', 'Blog Post Layout', 'op3_smart'),
            'default'   => true,
            'on'        => _x('On', 'op3_smart'),
            'off'       => _x('Off', 'op3_smart'),
        ),
    ),
));

Redux::setSection($opt_name, array(
    'title'         => _x('Blog Post Hero', 'Blog Post Hero', 'op3_smart'),
    'id'            => 'blog_post_hero_section',
    'subsection'    => true,
    'fields'        => array(
        array(
            'id'            => 'sitewide_post_header_background_color',
            'title'         => _x('Hero Background Colour', 'Blog Post Hero', 'op3_smart'),
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
            'id'        => 'sitewide_post_featured_image_as_hero',
            'type'      => 'switch',
            'title'     => _x('Use Featured Image as Hero Image', 'Blog Post Hero', 'op3_smart'),
            'subtitle'  => _x('Use featured image as a hero image unless set differently on a blog post itself.', 'Blog Post Hero', 'op3_smart'),
            'on'        => _x('Yes', 'op3_smart'),
            'off'       => _x('No', 'op3_smart'),
            'default'   => true,
        ),
        array(
            'id'        => 'sitewide_post_featured_image_in_content',
            'type'      => 'switch',
            'title'     => _x('Show Featured Image in Post Content', 'Blog Post Hero', 'op3_smart'),
            'on'        => _x('Show', 'op3_smart'),
            'off'       => _x('Hide', 'op3_smart'),
            'default'   => true,
            'required'  => array('sitewide_post_featured_image_as_hero', 'equals', false),
        ),
        array(
            'id'                => 'sitewide_post_header_background_image',
            'type'              => 'background',
            'title'             => _x('Hero Background Image', 'Blog Post Hero', 'op3_smart'),
            'background-color'  => false,
            'preview_media'     => true,
            'preview'           => false,
            'default'  => array(
                'background-size'  => 'cover',
                'background-position'  => 'center center',
            ),
            'output'            => array('.op-blog-post-header'),
            'required'          => array('sitewide_post_featured_image_as_hero', 'equals', false),
        ),
        array(
            'id'                => 'sitewide_post_header_background_image_positioning',
            'title'             => _x('Hero Background Image Positioning', 'Blog Post Hero', 'op3_smart'),
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
            'required'  => array('sitewide_post_featured_image_as_hero', 'equals', true),
        ),
        array(
            'id'            => 'sitewide_post_header_background_overlay',
            'title'         => _x('Hero Image Overlay Colour', 'Blog Post Hero', 'op3_smart'),
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
            'id'            => 'post_header_text_color',
            'type'          => 'color',
            'title'         => _x('Hero Text Colour', 'Blog Post Hero', 'op3_smart'),
            'transparent'   => false,
            'output'        => array(
               '.op-hero-header,
                .op-hero-area .feature-title,
                .op-hero-area .op-headline,
                .op-hero-area p,
                .op-hero-layout-meta-wrap,
                .op-blog-meta-wrapper,
                .op-hero-layout-meta-wrap a'
            ),
            'default'       => '#ffffff',
        ),
        array(
            'id'        => 'sitewide_post_hero_size',
            'type'      => 'switch',
            'title'     => _x('Hero Size', 'Blog Post Hero', 'op3_smart'),
            'on'        => _x('Small', 'Blog Post Hero', 'op3_smart'),
            'off'       => _x('Large', 'Blog Post Hero', 'op3_smart'),
            'default'   => false,
        ),
    ),
));

Redux::setSection($opt_name, array(
    'title'         => _x('Blog Archive Layout', 'Blog Archive Layout', 'op3_smart'),
    'id'            => 'blog_archives_sidebar',
    'subsection'    => true,
    'fields'        => array(
        array(
            'id'        => 'blog_archive_layout',
            'type'      => 'image_select',
            'title'     => _x('Blog Archive Layout', 'Blog Archive Layout', 'op3_smart'),
            'default'   => 'list',
            'options'   => array(
                'list' => array(
                    'alt' => _x('List Post Layout', 'Blog Archive Layout', 'op3_smart'),
                    'img' => get_template_directory_uri() . '/images/icon-layout-list.png'
                ),
                'grid' => array(
                    'alt' => _x('Grid Post Layout', 'Blog Archive Layout', 'op3_smart'),
                    'img' => get_template_directory_uri() . '/images/icon-layout-grid.png'
                ),
            ),
        ),
        array(
            'id'        => 'blog_archive_sidebar',
            'type'      => 'image_select',
            'title'     => _x('Blog Archive Sidebar', 'Blog Archive Layout', 'op3_smart'),
            'subtitle'  => _x('Choose position of a sidebar', 'Blog Archive Layout', 'op3_smart'),
            'default'   => 'no_sidebar',
            'options'   => array(
                'no_sidebar' => array(
                    'alt' => _x('No Sidebar', 'Blog Archive Layout', 'op3_smart'),
                    'img' => ReduxFramework::$_url . 'assets/img/1c.png'
                ),
                'sidebar_left' => array(
                    'alt' => _x('Sidebar Left', 'Blog Archive Layout', 'op3_smart'),
                    'img' => ReduxFramework::$_url . 'assets/img/2cl.png'
                ),
                'sidebar_right' => array(
                    'alt' => _x('Sidebar Right', 'Blog Archive Layout', 'op3_smart'),
                    'img' => ReduxFramework::$_url . 'assets/img/2cr.png'
                ),
            ),
        ),
        array(
            'id'        => 'blog_archive_hero_category',
            'type'      => 'switch',
            'title'     => _x('Hide Category and Tag Labels in Archive Hero Section', 'Blog Archive Layout', 'op3_smart'),
            'on'        => _x('Hide', 'op3_smart'),
            'off'       => _x('Show', 'op3_smart'),
            'default'   => false,
        ),
        array(
            'id'        => 'blog_archive_hero_size',
            'type'      => 'switch',
            'title'     => _x('Archive Hero Size', 'Blog Archive Layout', 'op3_smart'),
            'on'        => _x('Small', 'Blog Archive Layout', 'op3_smart'),
            'off'       => _x('Large', 'Blog Archive Layout', 'op3_smart'),
            'default'   => false,
        ),
    ),
));
