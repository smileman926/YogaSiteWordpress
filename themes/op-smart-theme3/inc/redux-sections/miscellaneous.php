<?php

Redux::setSection($opt_name, array(
    'title'     => _x('Miscellaneous', 'op3_smart'),
    'id'        => 'misc',
    'icon'      => 'el-icon-asterisk',
));

Redux::setSection($opt_name, array(
    'title'         => _x('Search Results', 'Miscellaneous Search Results', 'op3_smart'),
    'id'            => 'search_results',
    'subsection'    => true,
    'fields'        => array(
        array(
                'id'        => 'pages_in_search_results',
                'type'      => 'switch',
                'title'     => _x('Show Pages in Search Results', 'Miscellaneous Search Results', 'op3_smart'),
                'default'   => true,
                'on'        => _x('Yes', 'op3_smart'),
                'off'       => _x('No', 'op3_smart'),
        ),
        array(
            'id'        => 'search_results_sidebar',
            'type'      => 'image_select',
            'title'     => _x('Search Results Layout', 'Miscellaneous Search Results', 'op3_smart'),
            'subtitle'  => _x('Choose position of a sidebar', 'Miscellaneous Search Results', 'op3_smart'),
            'default'   => 'no_sidebar',
            'options'   => array(
                'no_sidebar' => array(
                    'alt' => _x('No Sidebar', 'Miscellaneous Search Results', 'op3_smart'),
                    'img' => ReduxFramework::$_url . 'assets/img/1c.png'
                ),
                'sidebar_left' => array(
                    'alt' => _x('Sidebar Left', 'Miscellaneous Search Results', 'op3_smart'),
                    'img' => ReduxFramework::$_url . 'assets/img/2cl.png'
                ),
                'sidebar_right' => array(
                    'alt' => _x('Sidebar Right', 'Miscellaneous Search Results', 'op3_smart'),
                    'img' => ReduxFramework::$_url . 'assets/img/2cr.png'
                ),
            ),
        ),
        array(
            'id'        => 'search_hero_size',
            'type'      => 'switch',
            'title'     => _x('Search Results Hero Size', 'Miscellaneous Search Results', 'op3_smart'),
            'on'        => _x('Small', 'Miscellaneous Search Results', 'op3_smart'),
            'off'       => _x('Large', 'Miscellaneous Search Results', 'op3_smart'),
            'default'   => false,
        ),
    ),
));

Redux::setSection($opt_name, array(
    'title'         => _x('Promotion Settings', 'op3_smart'),
    'id'            => 'promotion_settings',
    'subsection'    => true,
    'fields'        => array(
        array(
            'id'        => 'powered_by',
            'type'      => 'switch',
            'title'     => _x('<em>Theme by OptimizePress</em> message in site footer', 'Miscellaneous Promotion Settings', 'op3_smart'),
            'default'   => true
        ),
        array(
            'id'        => 'powered_by_url',
            'type'      => 'text',
            'title'     => _x('Affiliate URL', 'Miscellaneous Promotion Settings', 'op3_smart'),
            'desc'      => _x('Enter your OptimizePress affiliate URL here. This will link to the "WordPress Theme by OptimizePress" message in the footer. <br /><br />To promote OptimizePress join at <a href="https://www.optimizepress.com/affiliates" target="_blank" rel="noopener">https://www.optimizepress.com/affiliates</a>.', 'Miscellaneous Promotion Settings', 'op3_smart'),
            'default'   => 'https://www.optimizepress.com/',
            'required'  => array(
                array('powered_by', 'equals', true),
            )
        ),
    )
));
