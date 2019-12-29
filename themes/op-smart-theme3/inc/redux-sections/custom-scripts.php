<?php
Redux::setSection($opt_name, array(
    'title'     => _x('Custom Scripts', 'Custom Scripts', 'op3_smart'),
    'id'        => 'custom_scripts',
    'icon'      => 'el-icon-cog',
    'fields'    => array(
        array(
            'id'            => 'custom_script',
            'type'          => 'repeater',
            'title'         => _x('Custom Script', 'Custom Scripts', 'op3_smart'),
            'group_values'  => true,
            'sortable'      => true,
            'bind_title'    => 'location',
            'fields'        => array(
                array(
                    'id'        => 'location',
                    'type'      => 'select',
                    'title'     => _x('Location', 'Custom Scripts', 'op3_smart'),
                    'options'   => array(
                        'header' => _x('Header', 'Custom Scripts', 'op3_smart'),
                        'in_body_tag' => _x('After &lt;body&gt; Tag', 'Custom Scripts', 'op3_smart'),
                        'footer' => _x('Footer', 'Custom Scripts', 'op3_smart'),
                        'css' => 'CSS',
                    ),
                ),
                array(
                    'id'        => 'script',
                    'type'      => 'textarea',
                    'title'     => _x('Script', 'Custom Scripts', 'op3_smart'),
                ),
            ),
        ),
    ),
));
