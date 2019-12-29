<?php
Redux::setSection($opt_name, array(
    'title'     => _x('Social', 'op3_smart'),
    'id'        => 'social',
    'icon'      => 'el-icon-share',
    'fields'    => array(
        array(
            'id'        => 'sharing_section_start',
            'type'      => 'section',
            'title'     => _x('Sharing Options', 'Social', 'op3_smart'),
            'indent'    => true,
        ),
        array(
            'id'        => 'social_share_post_types',
            'type'      => 'checkbox',
            'title'     => _x('Show On Content Types', 'Social', 'op3_smart'),
            'subtitle'  => _x('Select post types where share buttons will be shown on', 'Social', 'op3_smart'),
            'data'      => 'post_types',
            'default'   => array(
                'page'          => 1,
                'post'          => 1,
                'attachment'    => 1,
                'product'       => 1
            ),
        ),
        array(
            'id'        => 'social_share_sticky',
            'type'      => 'radio',
            'title'     => _x('Sticky', 'Social', 'op3_smart'),
            'subtitle'  => _x('Should the buttons stick left or right when out of the viewport', 'Social', 'op3_smart'),
            'default'   => 'right',
            'options'   => array(
                'no'    => _x("Don't stick to the side", 'Social', 'op3_smart'),
                'left'  => _x('Stick to the left side', 'Social', 'op3_smart'),
                'right' => _x('Stick to the right side', 'Social', 'op3_smart'),
            ),
        ),
        array(
            'id'        => 'social_share_positions',
            'type'      => 'checkbox',
            'title'     => _x('Share Buttons Position', 'Social', 'op3_smart'),
            'subtitle'  => _x('Where should the share buttons be shown on', 'Social', 'op3_smart'),
            'options'   => array(
                'before_content'    => _x('Before Content', 'Social', 'op3_smart'),
                'after_content'     => _x('After Content', 'Social', 'op3_smart'),
            ),
            'default'   => array(
                'before_content' => 1
            ),
            'required'  => array(
                array('social_share_sticky', 'equals', 'no'),
            ),
        ),
        array(
            'id'        => 'social_share_networks',
            'type'      => 'checkbox',
            'title'     => _x('Active Social Networks', 'Social', 'op3_smart'),
            'options'   => array(
                'facebook'      => 'Facebook',
                'twitter'       => 'Twitter',
                'linked_in'     => 'LinkedIn',
                /*'google_plus'   => 'Google+',*/
                'pinterest'     => 'Pinterest'
            ),
            'default' => array(
                'facebook'      => 1,
                'twitter'       => 1,
                'linked_in'     => 1,
                /*'google_plus'   => 1,*/
                'pinterest'     => 1
            )
        ),
        array(
            'id'        => 'sharing_section_end',
            'type'      => 'section',
            'indent'    => false,
        ),
        array(
            'id'        => 'social_profiles_section_start',
            'type'      => 'section',
            'title'     => _x('Profiles Options', 'Social', 'op3_smart'),
            'indent'    => true,
        ),
        array(
            'id'        => 'social_profile_facebook',
            'type'      => 'text',
            'title'     => _x('Facebook profile URL', 'Social', 'op3_smart'),
            'default'   => 'http://www.facebook.com/optimizepress'
        ),
        array(
            'id'        => 'social_profile_twitter',
            'type'      => 'text',
            'title'     => _x('Twitter profile URL', 'Social', 'op3_smart'),
            'default'   => 'http://www.twitter.com/optimizepress'
        ),
        array(
            'id'        => 'social_profile_linked_in',
            'type'      => 'text',
            'title'     => _x('LinkedIn profile URL', 'Social', 'op3_smart'),
        ),
        /*array(
            'id'    => 'social_profile_google_plus',
            'type'  => 'text',
            'title' => _x('Google+ profile URL', 'Social', 'op3_smart'),
        ),*/
        array(
            'id'    => 'social_profile_pinterest',
            'type'  => 'text',
            'title' => _x('Pinterest profile URL', 'Social', 'op3_smart'),
        ),
        array(
            'id'        => 'social_profiles_section_end',
            'type'      => 'section',
            'indent'    => false,
        ),
    ),
));
