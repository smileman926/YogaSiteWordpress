<?php
// We want to display the following part only
// if OptimizePress plugin is activated
// because it uses optin actions
// defined in OptimizePress

if (defined('OPD_VERSION')) {

    Redux::setSection($opt_name, array(
        'title' => _x('Optin Forms', 'op3_smart'),
        'id'    => 'optin_form',
        'class' => 'op-optin-forms',
        'icon'  => 'el-icon-address-book',
    ));

    $integration_options = array(
        array(
                'id'            => 'integrations_number',
                'class'         => 'op-integrations-number',
                'title'         => _x('Number of Integrations', 'Optin Forms', 'op3_smart'),
                'description'   => _x('The number of different integration settings you can use for your optin forms.', 'Optin Forms', 'op3_smart'),
                'type'          => 'slider',
                'min'           => 1,
                'max'           => 7,
                'default'       => 3
            )
    );

    $integration_select = array(
        // array()
    );

    $integration_fields = array(
        // array()
    );

    $op_options = get_option('op_options');

    if (!isset($op_options['integrations_number'])) {
        $op_options['integrations_number'] = 0;
    }

    $defaults = true;
    for ($i = 1; $i <= $op_options['integrations_number']; $i++) {
        $integration_name = isset($op_options['integration_settings_integration_name_' . $i]) ? $op_options['integration_settings_integration_name_' . $i] : 'Integration #' . $i;
        $integration_select[$i] = $integration_name;

        $integration_settings = opOptinFormSettingsFields($defaults, 'op3_integration_settings', $i);
        $defaults = false;
        foreach ($integration_settings as $key => $value) {
            array_push($integration_fields, $value);
        }
    }

    Redux::setSection($opt_name, array(
        'id'            => 'integration_settings',
        'title'         => _x('Integration Settings', 'Optin Forms', 'op3_smart'),
        'desc'          => _x('You can bind integrations created here on each position in optin forms.', 'Optin Forms', 'op3_smart'),
        'class'         => 'op-integration-settings',
        'subsection'    => true,
        'fields'        => array_merge(
            $integration_options,
            array(
                // array(
                //     'id'        => 'integration_current',
                //     'type'      => 'select',
                //     'title'     => _x('Select Integration to Edit', 'op3_smart'),
                //     'subtitle'      => _x('All integrations will be saved when you hit Save Changes, even the ones you\'re not currently editing.'),
                //     'options'   => $integration_select,
                //     'default'   => 1,
                // ),
                array(
                    'id'    => 'integrations_warning',
                    'type'  => 'info',
                    'title' => _x('Important Notice', 'Optin Forms', 'op3_smart'),
                    'style' => 'warning',
                    'desc'  => _x("Please note that the Optin Forms won't be shown on your page if integration is not properly configured.", 'Optin Forms', 'op3_smart')
                ),
                array(
                    'id'        => 'integration_section',
                    'type'      => 'section',
                    'indent'    => true,
                    // 'title'     => $section_title,
                    // 'desc'      => _x('Set settings for each integration.', 'op3_smart'),
                    // 'required'  => array(
                    //     array('integration_current', 'equals', $nr),
                    // )
                ),
            ),
            $integration_fields
            /*array(
                array(
                   'id'    => 'op_clear_cache',
                   'type'  => 'info',
                   'title' => _x('Clear Optin Form Cache', 'Optin Forms', 'op3_smart'),
                   // 'style' => 'critical',
                   // 'icon' => 'el-icon-info-sign',
                   'desc'  => _x("If you're experiencing some issues with Optin Form settings, particularly if you've updated something on the external service (created a new list, for example) you should clear this cache in order to refresh Optin Form settings.<br /><br /> <a href='#' class='button' id='op-clear-optin-form-cache'>Clear Optin Forms Cache</a>", 'Optin Forms', 'op3_smart')
               ),
           )*/
        )

    ));

    Redux::setSection($opt_name, array(
        'title'         => _x('Homepage', 'Optin Forms', 'op3_smart'),
        'subsection'    => true,
        'id'            => 'homepage_optin_form',
        'fields'        => array_merge(
            opOptinSection(
                'homepage_after_header',
                _x('After Header', 'Optin Forms', 'op3_smart'),
                array('privacy_text' => true, 'image' => true)
            ),
            opOptinSection(
                'homepage_after_hero',
                _x('After Hero', 'Optin Forms', 'op3_smart'),
                array()
            ),
            opOptinSection(
                'homepage_before_footer',
                _x('Before Footer', 'Optin Forms', 'op3_smart'),
                array('image' => true)
            )
        ),
    ));

    Redux::setSection($opt_name, array(
        'title'         => _x('Posts', 'Optin Forms', 'op3_smart'),
        'subsection'    => true,
        'id'            => 'posts_optin_form',
        'fields'        => array_merge(
            opOptinSection(
                'single_after_header',
                _x('After Header', 'Optin Forms', 'op3_smart'),
                array('privacy_text' => true, 'image' => true)
            ),
            opOptinSection(
                'single_after_hero',
                _x('After Hero', 'Optin Forms', 'op3_smart')
            ),
            opOptinSection(
                'single_before_footer',
                _x('Before Footer', 'Optin Forms', 'op3_smart'),
                array('image' => true)
            )
        ),
    ));

    Redux::setSection($opt_name, array(
        'title'         => _x('Pages', 'Optin Forms', 'op3_smart'),
        'subsection'    => true,
        'id'            => 'pages_optin_form',
        'fields'        => array_merge(
            opOptinSection(
                'page_after_header',
                _x('After Header', 'Optin Forms', 'op3_smart'),
                array('privacy_text' => true, 'image' => true)
            ),
            opOptinSection(
                'page_after_hero',
                _x('After Hero', 'Optin Forms', 'op3_smart')
            ),
            opOptinSection(
                'page_before_footer',
                _x('Before Footer', 'Optin Forms', 'op3_smart'),
                array('image' => true)
            )
        ),
    ));

    Redux::setSection($opt_name, array(
        'title'         => _x('Archive', 'Optin Forms', 'op3_smart'),
        'desc'          => _x('An Archive is a Category, Tag or Author based pages.', 'Optin Forms', 'op3_smart'),
        'subsection'    => true,
        'id'            => 'archive_optin_form',
        'fields'        => array_merge(
            opOptinSection(
                'archive_after_header',
                _x('After Header', 'Optin Forms', 'op3_smart'),
                array('privacy_text' => true, 'image' => true)
            ),
            opOptinSection(
                'archive_after_hero',
                _x('After Hero', 'Optin Forms', 'op3_smart')
            ),
            opOptinSection(
                'archive_before_footer',
                _x('Before Footer', 'Optin Forms', 'op3_smart'),
                array('image' => true)
            )
        ),
    ));

    Redux::setSection($opt_name, array(
        'title'         => _x('Search', 'Optin Forms', 'op3_smart'),
        'subsection'    => true,
        'id'            => 'search_optin_form',
        'fields'        => array_merge(
            opOptinSection(
                'search_after_header',
                _x('After Header', 'Optin Forms', 'op3_smart'),
                array('privacy_text' => true, 'image' => true)
            ),
            opOptinSection(
                'search_after_hero',
                _x('After Hero', 'Optin Forms', 'op3_smart')
            ),
            opOptinSection(
                'search_before_footer',
                _x('Before Footer', 'Optin Forms', 'op3_smart'),
                array('image' => true)
            )
        ),
    ));

    Redux::setSection($opt_name, array(
        'title'         => _x('404', 'Optin Forms', 'op3_smart'),
        'subsection'    => true,
        'id'            => '404_optin_form',
        'fields'        => array_merge(
            opOptinSection(
                '404_after_header',
                _x('After Header', 'Optin Forms', 'op3_smart'),
                array('privacy_text' => true, 'image' => true)
            ),
            opOptinSection(
                '404_after_hero',
                _x('After Hero', 'Optin Forms', 'op3_smart')
            ),
            opOptinSection(
                '404_before_footer',
                _x('Before Footer', 'Optin Forms', 'op3_smart'),
                array('image' => true)
            )
        ),
    ));

    Redux::setSection($opt_name, array(
        'title'         => _x('Widget', 'Optin Forms', 'op3_smart'),
        'desc'          => sprintf(_x('You can use Optins configured here on the <a href="%s">Widgets page</a>.', 'Optin Forms', 'op3_smart'), admin_url('widgets.php')),
        'subsection'    => true,
        'id'            => 'widget_optin_form',
        'fields'        => array_merge(
            opOptinSection(
                'widget_optin_1',
                _x('Form #1', 'Optin Forms', 'op3_smart'),
                array('image' => true)
            ),
            opOptinSection(
                'widget_optin_2',
                _x('Form #2', 'Optin Forms', 'op3_smart'),
                array('image' => true)
            ),
            opOptinSection(
                'widget_optin_3',
                _x('Form #3', 'Optin Forms', 'op3_smart'),
                array('image' => true)
            )
        ),
    ));

} else {

    Redux::setSection($opt_name, array(
        'title'     => _x('Optin Forms', 'op3_smart'),
        'id'        => 'optin_form_warning',
        'icon'      => 'el-icon-address-book',
        'fields'    => array_merge(array(
             array(
                'id'    => 'op_optin_form_info_warning',
                'type'  => 'info',
                'title' => _x('Please Enable OptimizePress', 'Optin Forms', 'op3_smart'),
                'style' => 'critical',
                // 'icon' => 'el-icon-info-sign',
                'desc'  => _x('Optin forms work only when <a href="https://www.optimizepress.com/" target="_blank" rel="noopener">OP Dashboard</a> plugin is installed and enabled.', 'Optin Forms', 'op3_smart')
            ),
        ))
    ));

}
