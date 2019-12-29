<?php

if (!defined('ABSPATH')) {
    exit;
}

// Don't duplicate me!
if (!class_exists('ReduxFramework_color_states')) {

    if (!class_exists('ReduxFramework_link_color')) {
        require ReduxFramework::$_dir . 'inc/fields/link_color/field_link_color.php';
    }

    class ReduxFramework_color_states extends ReduxFramework_link_color
    {
        public function enqueue()
        {

            $this->extension_dir = trailingslashit(str_replace('\\', '/', dirname(__FILE__ )));
            $this->extension_url = site_url(str_replace(trailingslashit(str_replace('\\', '/', ABSPATH)), '', $this->extension_dir));

            wp_enqueue_style('wp-color-picker');

            wp_enqueue_script(
                'redux-field-color-states-js',
                $this->extension_url . 'field_color_states' . Redux_Functions::isMin() . '.js',
                array('jquery', 'wp-color-picker', 'redux-js'),
                time(),
                true
            );

            if ($this->parent->args['dev_mode']) {
                wp_enqueue_style('redux-color-picker-css');

                wp_enqueue_style(
                    'redux-field-color_states-js',
                    $this->extension_url . 'field_color_states.css',
                    array(),
                    time(),
                    'all'
                );
            }
        }

        public function output()
        {

            $style = array();

            $rule = 'color';
            if (isset($this->field['css_rule']) && !empty($this->field['css_rule']) && $this->field['css_rule'] !== 'color') {
                $rule = $this->field['css_rule'];
            }

            if ( ! empty( $this->value['regular'] ) && $this->field['regular'] === true && $this->field['default']['regular'] !== false ) {
                $style['regular'] = $rule . ':' . $this->value['regular'] . ';';
            }

            if ( ! empty( $this->value['visited'] ) && $this->field['visited'] === true && $this->field['default']['visited'] !== false ) {
                $style['visited'] = $rule . ':' . $this->value['visited'] . ';';
            }

            if ( ! empty( $this->value['hover'] ) && $this->field['hover'] === true && $this->field['default']['hover'] !== false ) {
                $style['hover'] = $rule . ':' . $this->value['hover'] . ';';
            }

            if ( ! empty( $this->value['active'] ) && $this->field['active'] === true && $this->field['default']['active'] !== false ) {
                $style['active'] = $rule . ':' . $this->value['active'] . ';';
            }

            if ( ! empty( $style ) ) {
                if ( ! empty( $this->field['output'] ) && is_array( $this->field['output'] ) ) {
                    $styleString = "";

                    foreach ($this->field['output'] as $state => $selector) {
                        if (isset($style[$state]) && !empty($style[$state])) {
                            $styleString .= $selector . ' {' . $style[$state] . '} ';
                        }
                    }

                    $this->parent->outputCSS .= $styleString;
                }

                if ( ! empty( $this->field['compiler'] ) && is_array( $this->field['compiler'] ) ) {
                    $styleString = "";

                    foreach ( $style as $key => $value ) {
                        if ( is_numeric( $key ) ) {
                            $styleString .= implode( ",", $this->field['compiler'] ) . "{" . $value . '}';

                        } else {
                            if ( count( $this->field['compiler'] ) == 1 ) {
                                $styleString .= $this->field['compiler'][0] . ":" . $key . "{" . $value . '}';
                            } else {
                                $blah = '';
                                foreach($this->field['compiler'] as $k => $sel) {
                                    $blah .= $sel . ':' . $key . ',';
                                }

                                $blah = substr($blah, 0, strlen($blah) - 1);
                                $styleString .= $blah . '{' . $value . '}';
                            }
                        }
                    }
                    $this->parent->compilerCSS .= $styleString;
                }
            }
        }
    }
}