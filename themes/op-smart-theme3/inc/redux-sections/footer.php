<?php
Redux::setSection($opt_name, array(
    'title'     => _x('Footer', 'op3_smart'),
    'id'        => 'footer',
    'icon'      => 'el-icon-arrow-down',
    'fields'    => array(
        array(
            'id'        => 'footer_sidebars',
            'type'      => 'image_select',
            'title'     => _x('Footer Columns', 'Footer', 'op3_smart'),
            'subtitle'  => _x('Select the number of columns in your footer', 'Footer', 'op3_smart'),
            'desc'      => _x('Choose 1-4 columns for your blog footer. Add content to your footer by adding widgets to the "Footer Sidebar Section" panels on the Widgets page. Only insert the same number of widgets as you have set columns to maintain the layout.', 'Footer', 'op3_smart'),
            'default'   => '4_4_4',
            'options'   => array(
                '12' => array(
                    'alt' => _x('One', 'Footer', 'op3_smart'),
                    'img' => ReduxFramework::$_url . 'assets/img/1c.png'
                ),
                '6_6' => array(
                    'alt' => _x('Two', 'Footer', 'op3_smart'),
                    'img' => get_template_directory_uri() . '/images/2col.png'
                ),
                '8_4' => array(
                    'alt' => _x('Two (left wide)', 'Footer', 'op3_smart'),
                    'img' => ReduxFramework::$_url . 'assets/img/2cr.png'
                ),
                '4_8' => array(
                    'alt' => _x('Two (right wide)', 'Footer', 'op3_smart'),
                    'img' => ReduxFramework::$_url . 'assets/img/2cl.png'
                ),
                '4_4_4' => array(
                    'alt' => _x('Three', 'Footer', 'op3_smart'),
                    'img' => get_template_directory_uri() . '/images/3col.png'
                ),
                '6_3_3' => array(
                    'alt' => _x('Three (left wide)', 'Footer', 'op3_smart'),
                    'img' => ReduxFramework::$_url . 'assets/img/3cr.png'
                ),
                '3_3_6' => array(
                    'alt' => _x('Three (right wide)', 'Footer', 'op3_smart'),
                    'img' => ReduxFramework::$_url . 'assets/img/3cl.png'
                ),
                '3_3_3_3' => array(
                    'alt' => _x('Four', 'Footer', 'op3_smart'),
                    'img' => get_template_directory_uri() . '/images/4col.png'
                ),
            ),
        ),
        array(
            'id'        => 'logo_footer',
            'type'      => 'media',
            'title'     => _x('Logo', 'Footer', 'op3_smart'),
            'mode'      => 'image',
            'default'   => array(
                'url'   => get_template_directory_uri() . '/images/optimizepress-smarttheme-logo-grey.png',
            ),
        ),
        array(
            'id'        => 'logo_footer_retina',
            'type'      => 'media',
            'title'     => _x('Retina Logo', 'Footer', 'op3_smart'),
            'mode'      => 'image',
            'default'   => array(
                'url'   => get_template_directory_uri() . '/images/optimizepress-smarttheme-logo-grey-2x.png',
            ),
        ),
        array(
            'id'        => 'copyright',
            'type'      => 'editor',
            'title'     => _x('Copyright Text', 'Footer', 'op3_smart'),
            'args'      => array(
                'teeny'         => true,
                'media_buttons' => false,
            ),
            'default'   => '&copy;2010-2017 SmartTheme. All Rights Reserved.'
        ),
        array(
            'id'            => 'footer_background_color',
            'title'         => _x('Footer Background Colour', 'Footer', 'op3_smart'),
            'type'          => 'color',
            'transparent'   => false,
            'output'        => array('background' => '.op-footer'),
            'default'       => '#fcfcfc',
        ),
        array(
            'id'            => 'footer_headlines_color',
            'title'         => _x('Footer Headlines Colour', 'Footer', 'op3_smart'),
            'type'          => 'color',
            'transparent'   => false,
            'output'        => array('color' => '.op-footer h1, .op-footer h2, .op-footer h3, .op-footer h4, .op-footer h5, .op-footer h6, .op-footer .calendar_wrap'),
            'default'       => '#191919',
        ),
        array(
            'id'            => 'footer_text_color',
            'title'         => _x('Footer Text Colour', 'Footer', 'op3_smart'),
            'type'          => 'color',
            'transparent'   => false,
            'output'        => array('color' => '.op-footer, .footer-copyright, .op-footer p, .op-footer ul, .op-footer'),
            'default'       => '#6d6d6d',
        ),
        array(
            'id'        => 'footer_link_color',
            'title'     => _x('Footer Link Colour', 'Footer', 'op3_smart'),
            'type'      => 'link_color',
            'output'    => array('.op-footer a'),
            'default'   => array(
                'regular'   => '#6d6d6d',
                'hover'     => '#6d6d6d',
                'active'    => '#6d6d6d',
            ),
        ),
    ),
));
