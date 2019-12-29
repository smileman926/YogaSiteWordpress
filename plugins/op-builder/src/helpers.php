<?php

use function OPDashboard\clear_assets_cache;
use OptimizePress\Support\Debug\Log as OptimizePressLog;
use OPBuilder\Editor\Menus;
use function OptimizePress\Support\array_get;

if ( ! function_exists('kebab_case')) {
    /**
     * Convert to kebab-case
     *
     * @param  string $key
     * @return string
     */
    function kebab_case($key)
    {
        return strtolower(preg_replace('/[A-Z]+/', '-$0', $key));
    }
}

if ( ! function_exists('preg_escape_backreference')) {
    /**
     * Escape dollar signs followed by digit, so
     * reg_replace don't replace it as group
     * http://php.net/manual/en/function.preg-replace.php#103985
     *
     * @param  string $str
     * @return string
     */
    function preg_escape_backreference($str)
    {
        return preg_replace('/\$(\d)/', '\\\$$1', $str);
    }
}

if ( ! function_exists('op3_view')) {
    /**
     * Load a view for the OP3 plugin
     *
     * @param  string $view
     * @param  array  $data
     * @return string
     */
    function op3_view($view, $data = array())
    {
        if (op3_dashboard_enabled() and class_exists(League\Plates\Engine::class)) {
            $views = new League\Plates\Engine(__DIR__ . '/../resources/views');

            echo $views->render($view, $data);
        }
    }
}

if ( ! function_exists('op3_log')) {
    /**
     * Write to the OP3 logs for debugging
     *
     * @param null   $message
     * @param string $level
     * @param array  $context
     * @return \Monolog\Logger
     */
    function op3_log($message = null, $level = 'debug', $context = [])
    {
        if ($message) {
            OptimizePressLog::log($level, $message, $context);
        }

        return OptimizePressLog::logger();
    }
}

if ( ! function_exists('op3_log_stacktrace')) {
    /**
     * Write to the OP3 logs for debugging
     *
     * @param  null   $message
     * @param  array  $stacktrace
     * @param  string $level
     * @param  array  $context
     * @return \Monolog\Logger
     */
    function op3_log_stacktrace($message = null, $stacktrace = null, $level = 'debug', $context = [])
    {
        if ($message) {
            if (! $stacktrace) {
                $stacktrace = debug_backtrace();
            }

            // Log main message
            OptimizePressLog::log($level, $message, $context);

            // Format the stacktrace messages
            if ($stacktrace) {
                foreach ($stacktrace as $index => $stack) {
                    $stackMessage = $index + 1 . '. ' . $stack['file'] . ' on line ' . $stack['line'];

                    // Add class
                    if (isset($stack['class'])) {
                        $stackMessage .= ' / Class: ' . $stack['class'];
                    }

                    // Add function
                    $stackMessage .= ' / Function: ' . $stack['function'];


                    OptimizePressLog::log($level, $stackMessage, $context);
                }
            }
        }

        return OptimizePressLog::logger();
    }
}

if ( ! function_exists('op3_config')) {
    /**
     * Get config option
     *
     * @param  string $key
     * @param  mixed  $default
     * @return mixed
     */
    function op3_config($key, $default = null)
    {
        $sections = explode(".", $key);

        if (isset($sections[0])) {
            $group    = $sections[0];
            $config   = include(__DIR__.'/../config/'.$group.'.php');

            if (isset($sections[1])) {
                return isset($config[$sections[1]]) ? $config[$sections[1]] : $default;
            } else {
                return $config;
            }
        }

        return $default;
    }
}

if ( ! function_exists('op3_build_tree')) {
    /**
     * Create tree-like object from flat array
     *
     * @param  array  $flat
     * @param  string  $fieldId
     * @param  string  $fieldChildLink
     * @param  string  $fieldOrder
     * @param  string  $fieldChildren
     * @return array
     */
    function op3_build_tree($flat, $fieldId = 'ID', $fieldChildLink = 'parentID', $fieldOrder = '', $fieldChildren = 'children')
    {
        $build = function($parentId = 0) use (&$build, $flat, $fieldId, $fieldChildLink, $fieldOrder, $fieldChildren) {
            $result = array();

            // structure
            foreach ($flat as $item) {
                $type = gettype($item);
                $valFieldID = $type === 'array' ? $item[$fieldId] : $item->$fieldId;
                $valFieldChildLink = $type === 'array' ? $item[$fieldChildLink] : $item->$fieldChildLink;

                if($valFieldChildLink == $parentId) {
                    $clone = clone $item;
                    $children = $build($valFieldID);

                    if ($type === 'array') {
                        $clone[$fieldChildren] = $children;
                    } else {
                        $clone->$fieldChildren = $children;
                    }

                    $result[] = $clone;
                }
            }

            // sort
            if ( ! empty($fieldOrder)) {
                $field = $fieldOrder;
                $asc = true;
                if (strtolower(substr($field, -4)) === ' asc') {
                    $field = substr($field, 0, -4);
                    $asc = true;
                }
                else if (strtolower(substr($field, -5)) === ' desc') {
                    $field = substr($field, 0, -5);
                    $asc = false;
                }

                usort($result, function($a, $b) use ($field, $asc) {
                    $valA = is_array($a) ? $a[$field] : $a->$field;
                    $valB = is_array($b) ? $b[$field] : $b->$field;

                    if ((is_int($valA) || is_float($valA)) && (is_int($valB) || is_float($valB))) {
                        if ($asc) {
                            return $valA > $valB;
                        } else {
                            return $valB > $valA;
                        }
                    } else {
                        if ($asc) {
                            return strcmp($valA, $valB);
                        } else {
                            return strcmp($valB, $valA);
                        }
                    }
                });
            }

            return $result;
        };

        // build tree recursively
        return $build();
    }
}

if ( ! function_exists('op3_get_menu')) {
    /**
     * Get menus defined in wordpress/appearance/menus
     *
     * @param  string $search
     * @param  bool   $recursively
     * @return array
     */
    function op3_get_menu($search = '', $recursively = true)
    {
        return Menus::search($search, $recursively);
    }
}

if ( ! function_exists('op3_element_config')) {
    /**
     * Get element config
     *
     * @param  string $element
     * @return mixed
     */
    function op3_element_config($element)
    {
        $config = [];

        if ($element) {
            try {
                $configFile = __DIR__ . '/../resources/elements/' . $element . '/config.php';

                if (file_exists($configFile)) {
                    $config = include($configFile);
                }
            } catch (\Exception $e) {
                op3_log("[OP3] Element config not found for '" . $element . "'", 'error');
            }
        }

        return $config;
    }
}

if ( ! function_exists('op3_element_markup')) {
    /**
     * Get element markup
     *
     * @param  string $path
     * @return mixed
     */
    function op3_element_markup($path)
    {
        // read file
        $result = file_get_contents($path);

        // formating (single line)
        $result = preg_replace('/>\n\s*</', '><', $result);
        $result = preg_replace('/\n\s*>/', '>', $result);
        $result = preg_replace('/\n\s*$/', '', $result);
        $result = preg_replace('/\n\s*/', ' ', $result);

        // custom string replace
        $result = str_replace('{{home-url}}', home_url(), $result);
        $result = str_replace('{{assets}}', op3_asset(), $result);
        $result = str_replace('{{admin-email}}', op3_admin_email(), $result);

        // ...finally
        return $result;
    }
}

if ( ! function_exists('op3_property_config')) {
    /**
     * Get property config
     *
     * @param  string $property
     * @return mixed
     */
    function op3_property_config($property)
    {
        $config = [];

        if ($property) {
            try {
                $configFile = __DIR__ . '/../resources/properties/' . $property . '/config.php';

                if (file_exists($configFile)) {
                    $config = include($configFile);
                }

            } catch (\Exception $e) {
                op3_log("[OP3] Property config not found for '" . $property . "'", 'error');
            }
        }

        return $config;
    }
}

if ( ! function_exists('op3_edit_page_url')) {
    /**
     * Get editor URL for a page/post
     *
     * @param  int $pageId
     * @return string
     */
    function op3_edit_page_url($pageId)
    {
        return get_edit_post_link($pageId) . '#op-builder';
    }
}

if ( ! function_exists('op3_get_editor_url')) {
    /**
     * Get editor URL for a page/post
     *
     * @param  int $pageId
     * @return string
     */
    function op3_get_editor_url($pageId)
    {
        return add_query_arg('op3editor', 1, get_permalink($pageId));
    }
}

if ( ! function_exists('op3_get_country_code')) {
    /**
     * Get country code
     *
     * @return string
     */
    function op3_get_country_code()
    {
        $default = 'GB';
        if ( ! class_exists('\OPDashboard\Services\GeoIp')) {
            return $default;
        }

        $ip = \OPDashboard\Services\GeoIp::getClientIp();
        $code = \OPDashboard\Services\GeoIp::getCountryCode($ip);
        $result = $code !== null ? $code : $default;

        return $result;
    }
}

if ( ! function_exists('op3_media_picker_url')) {
    /**
     * Get URL for media picker
     *
     * @return string
     */
    function op3_media_picker_url()
    {
        return admin_url('admin.php?page=op-builder-media-picker');
    }
}

if ( ! function_exists('op3_asset')) {
    /**
     * Get path to plugin asset
     *
     * @param  string $path
     * @return string
     */
    function op3_asset($path = '', $appendBuildHash = true)
    {
        // Assets root
        $result = OP3_ASSETS_URL;

        // Path
        if ($path)
            $result .= ltrim($path, '/');

        // Append build hash
        if ($appendBuildHash) {
            $result = op3_append_build_hash($result);
        }

        return $result;
    }
}

if ( ! function_exists('op3_resource')) {
    /**
     * Get path to plugin resource
     *
     * @param  string $path
     * @return string
     */
    function op3_resource($path = '')
    {
        // Resources root
        $result = OP3_RESOURCES_URL;

        // Path
        if ($path)
            $result .= ltrim($path, '/');

        return $result;
    }
}

if ( ! function_exists('op3_append_build_hash')) {
    /**
     * Get path to plugin asset
     *
     * @param  string $path
     * @return string
     */
    function op3_append_build_hash($path = '')
    {
        $result = $path;

        if ($path && defined('OP3_BUILD_HASH')) {
            foreach(preg_split('/\s*,\s*/', trim(OP3_BUILD_URL_EXT)) as $ext) {
                if (substr($path, -1 * strlen($ext)) === $ext) {
                    $result .= (strpos($result, '?') === false ? '?' : '&') . 'build=' . OP3_BUILD_HASH;
                }
            }
        }

        return $result;
    }
}

if ( ! function_exists('op3_asset_path')) {
    /**
     * Get path to plugin asset
     *
     * @param  string $path
     * @return string
     */
    function op3_asset_path($path = '')
    {
        return OP3_ASSETS_PATH.$path;
    }
}

if ( ! function_exists('op3_api_prefix')) {
    /**
     * Get API URL
     *
     * @return string
     */
    function op3_api_prefix()
    {
        return '/wp-json/op3/v1';
    }
}

if ( ! function_exists('op3_api_url')) {
    /**
     * Get API URL
     *
     * @param  string $path
     * @return string
     */
    function op3_api_url($path = null)
    {
        return home_url() . op3_api_prefix() . ($path ? '/' . $path : '');
    }
}

if ( ! function_exists('op3_get_page_description')) {
    /**
     * Get Page Description
     *
     * @param $pageId
     * @return string
     */
    function op3_get_page_description($pageId)
    {
        return get_post_meta($pageId, "op3_page_description", true);
    }
}

if ( ! function_exists('op3_get_preview_url')) {
    /**
     * Get preview URL for a page/post
     *
     * @param  int $pageId
     * @return string
     */
    function op3_get_preview_url($pageId)
    {
        $post = get_post($pageId);

        if ($post->post_status == 'publish') {
            $previewLink = esc_url(get_permalink($pageId));
        } else {
            $previewLink = set_url_scheme(get_permalink($pageId));
            $previewLink = esc_url(apply_filters('preview_post_link', add_query_arg('preview', 'true', $previewLink), $post));
        }

        return $previewLink;
    }
}

if ( ! function_exists('op3_admin_email')) {
    /**
     * Admin email
     *
     * @return string
     */
    function op3_admin_email()
    {
        // @todo - from some reason this is
        // always false, so default value
        // is returned (admin@localhost)
        return get_option('admin_email', 'admin@localhost');
    }
}

if ( ! function_exists('op3_current_page_id')) {
    /**
     * Return current OP3 page id
     *
     * @return string
     */
    function op3_current_page_id()
    {
        return get_the_ID();
    }
}

if ( ! function_exists('op3_current_url')) {
    /**
     * Return current request URL
     *
     * @return string
     */
    function op3_current_url()
    {
        $url = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

        return $url;
    }
}

if ( ! function_exists('op3_is_admin')) {
    /**
     * Is admin
     *
     * @return boolean
     */
    function op3_is_admin()
    {
        return (isset($_GET['op3editor']) and $_GET['op3editor'] == '1');
    }
}

if (! function_exists('op3_is_public')) {
    /**
     * Check if the page is viewed publicly
     *
     * @return bool
     */
    function op3_is_public()
    {
        return (
            ! op3_is_admin() &&
            ! is_admin() &&
            strpos(op3_current_url(), '/op-builder/') === false &&
            strpos(op3_current_url(), '/wp-json/') === false
        );
    }
}

if (! function_exists('op3_is_ie')) {
    /**
     * Check if the user agent is internet explorer
     *
     * @return bool
     */
    function op3_is_ie()
    {
        if (empty($_SERVER['HTTP_USER_AGENT'])) {
            return false;
        }

        $ua = $_SERVER['HTTP_USER_AGENT'];
        $re = '/MSIE|Internet Explorer|Trident/i';

        return (bool) preg_match($re, $ua);
    }
}

if (! function_exists('op3_can_edit_page')) {
    /**
     * Check if user can edit specific page
     *
     * @param  int $userId
     * @param  int $pageId
     * @return bool
     */
    function op3_can_edit_page($userId, $pageId)
    {
        return OPBuilder\Support\Tools::userCanEditPage($userId, $pageId);
    }
}

if (! function_exists('is_op3_page')) {
    /**
     * Check if user can edit specific page
     *
     * @param  int $pageId
     * @return bool
     */
    function is_op3_page($pageId)
    {
        return OPBuilder\Support\Tools::isOPPage($pageId);
    }
}

if (! function_exists('is_op2_page')) {
    /**
     * Check page is a OP2 page
     *
     * @param  int $pageId
     * @return bool
     */
    function is_op2_page($pageId)
    {
        return OPBuilder\Support\Tools::isOP2Page($pageId);
    }
}

if (! function_exists('is_op3_blank_template')) {
    /**
     * Check if current template is OP3 blank template
     *
     * @return bool
     */
    function is_op3_blank_template()
    {
        return is_page_template('op_builder_blank');
    }
}

if (! function_exists('op3_sl_is_connected')) {
    /**
     * Check SL connection
     *
     * @return bool
     */
    function op3_sl_is_connected($ping = false)
    {
        $connected = \OPDashboard\SL\SL::isConnected();

        if ($ping) {
            $pingResult = false;

            try {
                $pingResult = \OPDashboard\SL\SL::ping();
            } catch(Exception $e) {}

            if (! $pingResult) {
                return false;
            }
        }

        return $connected;
    }
}

if (! function_exists('op_body')) {
    /**
     * Check SL connection
     *
     * @return void
     */
    function op_body()
    {
        do_action('op_body');
    }
}

if (! function_exists('op3_dashboard_enabled')) {
    /**
     * Check if dashboard plugin is enabled
     *
     * @return bool
     */
    function op3_dashboard_enabled()
    {
        return defined('OPD_VERSION');
    }
}

if (! function_exists('op3_edit_page_button')) {
    /**
     * Generate editor button
     *
     * @param      $pageId
     * @param null $label
     */
    function op3_edit_page_button($pageId, $label = null)
    {
        echo op3_view('designer/button', [
            'op_button_label' => $label,
            'page_id'         => $pageId,
            'page_status'     => get_post_status($pageId),
            'page_has_data'   => (bool) get_post_meta($pageId, '_op3_summary', true),
            'api_base_url'    => get_rest_url(null, 'op3/v1'),
            'api_page_url'    => get_rest_url(null, 'op3/v1/pages/' . $pageId),
            'op_mode_url'     => get_rest_url(null, 'op3/v1/pages/' . $pageId . '/mode'),
            'edit_page_url'   => op3_edit_page_url($pageId),
            'editor_url'      => op3_get_editor_url($pageId),
            'editor_mode'     => \OPBuilder\Support\Tools::isOPPage($pageId),
        ]);
    }
}

if (! function_exists('op3_factory')) {
    /**
     * Simply build up new class instance
     *
     * @param $class
     * @return mixed
     */
    function op3_factory($class)
    {
        return new $class;
    }
}

if (! function_exists('op3_duplicate_page')) {
    /**
     * Duplicate existing OP3 page
     *
     * @param  int   $pageId
     * @param  array $data
     * @return mixed
     */
    function op3_duplicate_page($pageId, $data = [])
    {
        return \OPBuilder\Support\Tools::duplicatePage($pageId, $data);
    }
}

if (! function_exists('op3_is_json')) {
    /**
     * Duplicate existing OP3 page
     *
     * @param  string  $string
     * @return bool
     */
    function op3_is_json($string)
    {
        return is_string($string) && is_array(json_decode($string, true)) && (json_last_error() == JSON_ERROR_NONE) ? true : false;
    }
}

if (! function_exists('op3_editor_body_class')) {
    /**
     * Spit out body class for live editor
     * It mostly sets CSS classes when some plugins from the suite are activated
     *
     * @return string
     */
    function op3_editor_body_class()
    {
        $classes = [];

        // OptimizeFunnels
        if (defined('OPF_VERSION')) {
            $classes[] = 'active-op-funnels';
        }

        // Membership Legacy
        if (get_option('opd_enable_legacy_membership') !== "on") {
            $classes[] ='membership-inactive';
        }

        // OP Test plugin
        if (defined('OPTP_VERSION')) {
            $classes[] = 'active-op-test-plugin';
        }

        return implode(" ", $classes);
    }
}

if (! function_exists('op3_is_funnel_builder_active')) {
    /**
     * Check if the OptimizeFunnels plugin is installed and active
     *
     * @return bool
     */
    function op3_is_funnel_builder_active()
    {
        return defined('OPF_VERSION');
    }
}

if (! function_exists('op3_can_edit_pages')) {
    /**
     * Check if current user can edit page
     *
     * @return bool
     */
    function op3_can_edit_pages()
    {
        return (bool) current_user_can('manage_options');
    }
}

if (! function_exists('op3_mime_type_to_extension')) {
    /**
     * Convert mime type string to file extension
     *
     * @param  string $mimeType
     * @return string
     */
    function op3_mime_type_to_extension($mimeType)
    {
        $mimeMap = [
            'video/3gpp2'                                                               => '3g2',
            'video/3gp'                                                                 => '3gp',
            'video/3gpp'                                                                => '3gp',
            'application/x-compressed'                                                  => '7zip',
            'audio/x-acc'                                                               => 'aac',
            'audio/ac3'                                                                 => 'ac3',
            'application/postscript'                                                    => 'ai',
            'audio/x-aiff'                                                              => 'aif',
            'audio/aiff'                                                                => 'aif',
            'audio/x-au'                                                                => 'au',
            'video/x-msvideo'                                                           => 'avi',
            'video/msvideo'                                                             => 'avi',
            'video/avi'                                                                 => 'avi',
            'application/x-troff-msvideo'                                               => 'avi',
            'application/macbinary'                                                     => 'bin',
            'application/mac-binary'                                                    => 'bin',
            'application/x-binary'                                                      => 'bin',
            'application/x-macbinary'                                                   => 'bin',
            'image/bmp'                                                                 => 'bmp',
            'image/x-bmp'                                                               => 'bmp',
            'image/x-bitmap'                                                            => 'bmp',
            'image/x-xbitmap'                                                           => 'bmp',
            'image/x-win-bitmap'                                                        => 'bmp',
            'image/x-windows-bmp'                                                       => 'bmp',
            'image/ms-bmp'                                                              => 'bmp',
            'image/x-ms-bmp'                                                            => 'bmp',
            'application/bmp'                                                           => 'bmp',
            'application/x-bmp'                                                         => 'bmp',
            'application/x-win-bitmap'                                                  => 'bmp',
            'application/cdr'                                                           => 'cdr',
            'application/coreldraw'                                                     => 'cdr',
            'application/x-cdr'                                                         => 'cdr',
            'application/x-coreldraw'                                                   => 'cdr',
            'image/cdr'                                                                 => 'cdr',
            'image/x-cdr'                                                               => 'cdr',
            'zz-application/zz-winassoc-cdr'                                            => 'cdr',
            'application/mac-compactpro'                                                => 'cpt',
            'application/pkix-crl'                                                      => 'crl',
            'application/pkcs-crl'                                                      => 'crl',
            'application/x-x509-ca-cert'                                                => 'crt',
            'application/pkix-cert'                                                     => 'crt',
            'text/css'                                                                  => 'css',
            'text/x-comma-separated-values'                                             => 'csv',
            'text/comma-separated-values'                                               => 'csv',
            'application/vnd.msexcel'                                                   => 'csv',
            'application/x-director'                                                    => 'dcr',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'   => 'docx',
            'application/x-dvi'                                                         => 'dvi',
            'message/rfc822'                                                            => 'eml',
            'application/x-msdownload'                                                  => 'exe',
            'video/x-f4v'                                                               => 'f4v',
            'audio/x-flac'                                                              => 'flac',
            'video/x-flv'                                                               => 'flv',
            'image/gif'                                                                 => 'gif',
            'application/gpg-keys'                                                      => 'gpg',
            'application/x-gtar'                                                        => 'gtar',
            'application/x-gzip'                                                        => 'gzip',
            'application/mac-binhex40'                                                  => 'hqx',
            'application/mac-binhex'                                                    => 'hqx',
            'application/x-binhex40'                                                    => 'hqx',
            'application/x-mac-binhex40'                                                => 'hqx',
            'text/html'                                                                 => 'html',
            'image/x-icon'                                                              => 'ico',
            'image/x-ico'                                                               => 'ico',
            'image/vnd.microsoft.icon'                                                  => 'ico',
            'text/calendar'                                                             => 'ics',
            'application/java-archive'                                                  => 'jar',
            'application/x-java-application'                                            => 'jar',
            'application/x-jar'                                                         => 'jar',
            'image/jp2'                                                                 => 'jp2',
            'video/mj2'                                                                 => 'jp2',
            'image/jpx'                                                                 => 'jp2',
            'image/jpm'                                                                 => 'jp2',
            'image/jpeg'                                                                => 'jpeg',
            'image/pjpeg'                                                               => 'jpeg',
            'application/x-javascript'                                                  => 'js',
            'application/json'                                                          => 'json',
            'text/json'                                                                 => 'json',
            'application/vnd.google-earth.kml+xml'                                      => 'kml',
            'application/vnd.google-earth.kmz'                                          => 'kmz',
            'text/x-log'                                                                => 'log',
            'audio/x-m4a'                                                               => 'm4a',
            'application/vnd.mpegurl'                                                   => 'm4u',
            'audio/midi'                                                                => 'mid',
            'application/vnd.mif'                                                       => 'mif',
            'video/quicktime'                                                           => 'mov',
            'video/x-sgi-movie'                                                         => 'movie',
            'audio/mpeg'                                                                => 'mp3',
            'audio/mpg'                                                                 => 'mp3',
            'audio/mpeg3'                                                               => 'mp3',
            'audio/mp3'                                                                 => 'mp3',
            'video/mp4'                                                                 => 'mp4',
            'video/mpeg'                                                                => 'mpeg',
            'application/oda'                                                           => 'oda',
            'audio/ogg'                                                                 => 'ogg',
            'video/ogg'                                                                 => 'ogg',
            'application/ogg'                                                           => 'ogg',
            'application/x-pkcs10'                                                      => 'p10',
            'application/pkcs10'                                                        => 'p10',
            'application/x-pkcs12'                                                      => 'p12',
            'application/x-pkcs7-signature'                                             => 'p7a',
            'application/pkcs7-mime'                                                    => 'p7c',
            'application/x-pkcs7-mime'                                                  => 'p7c',
            'application/x-pkcs7-certreqresp'                                           => 'p7r',
            'application/pkcs7-signature'                                               => 'p7s',
            'application/pdf'                                                           => 'pdf',
            'application/octet-stream'                                                  => 'pdf',
            'application/x-x509-user-cert'                                              => 'pem',
            'application/x-pem-file'                                                    => 'pem',
            'application/pgp'                                                           => 'pgp',
            'application/x-httpd-php'                                                   => 'php',
            'application/php'                                                           => 'php',
            'application/x-php'                                                         => 'php',
            'text/php'                                                                  => 'php',
            'text/x-php'                                                                => 'php',
            'application/x-httpd-php-source'                                            => 'php',
            'image/png'                                                                 => 'png',
            'image/x-png'                                                               => 'png',
            'application/powerpoint'                                                    => 'ppt',
            'application/vnd.ms-powerpoint'                                             => 'ppt',
            'application/vnd.ms-office'                                                 => 'ppt',
            'application/msword'                                                        => 'ppt',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation' => 'pptx',
            'application/x-photoshop'                                                   => 'psd',
            'image/vnd.adobe.photoshop'                                                 => 'psd',
            'audio/x-realaudio'                                                         => 'ra',
            'audio/x-pn-realaudio'                                                      => 'ram',
            'application/x-rar'                                                         => 'rar',
            'application/rar'                                                           => 'rar',
            'application/x-rar-compressed'                                              => 'rar',
            'audio/x-pn-realaudio-plugin'                                               => 'rpm',
            'application/x-pkcs7'                                                       => 'rsa',
            'text/rtf'                                                                  => 'rtf',
            'text/richtext'                                                             => 'rtx',
            'video/vnd.rn-realvideo'                                                    => 'rv',
            'application/x-stuffit'                                                     => 'sit',
            'application/smil'                                                          => 'smil',
            'text/srt'                                                                  => 'srt',
            'image/svg+xml'                                                             => 'svg',
            'application/x-shockwave-flash'                                             => 'swf',
            'application/x-tar'                                                         => 'tar',
            'application/x-gzip-compressed'                                             => 'tgz',
            'image/tiff'                                                                => 'tiff',
            'text/plain'                                                                => 'txt',
            'text/x-vcard'                                                              => 'vcf',
            'application/videolan'                                                      => 'vlc',
            'text/vtt'                                                                  => 'vtt',
            'audio/x-wav'                                                               => 'wav',
            'audio/wave'                                                                => 'wav',
            'audio/wav'                                                                 => 'wav',
            'application/wbxml'                                                         => 'wbxml',
            'video/webm'                                                                => 'webm',
            'audio/x-ms-wma'                                                            => 'wma',
            'application/wmlc'                                                          => 'wmlc',
            'video/x-ms-wmv'                                                            => 'wmv',
            'video/x-ms-asf'                                                            => 'wmv',
            'application/xhtml+xml'                                                     => 'xhtml',
            'application/excel'                                                         => 'xl',
            'application/msexcel'                                                       => 'xls',
            'application/x-msexcel'                                                     => 'xls',
            'application/x-ms-excel'                                                    => 'xls',
            'application/x-excel'                                                       => 'xls',
            'application/x-dos_ms_excel'                                                => 'xls',
            'application/xls'                                                           => 'xls',
            'application/x-xls'                                                         => 'xls',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'         => 'xlsx',
            'application/vnd.ms-excel'                                                  => 'xlsx',
            'application/xml'                                                           => 'xml',
            'text/xml'                                                                  => 'xml',
            'text/xsl'                                                                  => 'xsl',
            'application/xspf+xml'                                                      => 'xspf',
            'application/x-compress'                                                    => 'z',
            'application/x-zip'                                                         => 'zip',
            'application/zip'                                                           => 'zip',
            'application/x-zip-compressed'                                              => 'zip',
            'application/s-compressed'                                                  => 'zip',
            'multipart/x-zip'                                                           => 'zip',
            'text/x-scriptzsh'                                                          => 'zsh',
        ];

        return isset($mimeMap[$mimeType]) ? $mimeMap[$mimeType] : '';
    }
}

/**
 * Check if current plugin version is a "dev" version
 *
 * @return bool
 */
function op3_is_dev_version()
{
    // Check for .git directory so we don't delete development versions
    if (file_exists(__DIR__ . '/../.git')) {
        return true;
    }

    return false;
}

/**
 * Check plugin dependencies
 *
 * @return bool
 */
function op3_check_dependencies()
{
    // Check dashboard version
    if (defined('OPD_VERSION') and ! op3_is_dev_version()) {
        if (version_compare(OPD_VERSION, OP3_DEPENDENCY__DASHBOARD, '<')) {
            return false;
        }
    }

    return true;
}

/**
 * Generate a unique ID
 *
 * @return string
 */
function op3_unique_id()
{
    return str_replace(".", "-", uniqid('op', true));
}

/**
 * Generate a UUID for elements
 *
 * @param  array  $exclude
 * @return string
 */
function op3_element_uuid($exclude = [])
{
    $uuid = \OptimizePress\Support\Str::random(8);

    // We can exclude certain UUIDs so we don't get duplicates
    if (in_array($uuid, $exclude)) {
        $uuid = op3_element_uuid($exclude);
    }

    return $uuid;
}

/**
 * Return list of registered page templates
 *
 * @return array
 */
function op3_registered_page_templates($pageId = null)
{
    // Add the default template
    $templates = ['default' => 'Default Template'];

    // Fetch registered templates and merge them
    $registeredTemplates = (array) wp_get_theme()->get_page_templates($pageId, 'page');
    $templates = array_merge($templates, $registeredTemplates);

    return $templates;
}

/**
 * Get option value for the element
 *
 * @param  object $element
 * @param  string $key
 * @return mixed
 */
function op3_element_option_value($element, $key)
{
    $options = isset($element->options->all) && isset($element->options->all->$key) ? $element->options->all->$key : null;

    if ($options) {
        $optionValues = (array) $options;

        return reset($optionValues);
    }
}

if (!function_exists('is_countable')) {

    /**
     * Checking if something is an instance of Countable.
     *
     * @param $c
     * @return bool
     */
    function is_countable($c) {
        return is_array($c) || $c instanceof Countable;
    }

}

/**
 * Simply flatten an array
 *
 * @param  array        $array
 * @param  string       $childProperty
 * @param  bool|string  $setKeyProperty
 * @return array
 */
function op3_flatten_tree_array($array, $childProperty = 'children', $setKeyProperty = false)
{
    $flattened = [];

    foreach ($array as $item)
    {
        // Check if item is array or object
        if (is_array($item)) {
            $item = (object) $item;
        }

        // Add to main flattened array
        if ($setKeyProperty && isset($item->{$setKeyProperty})) {
            $flattened[$item->{$setKeyProperty}] = $item;
        } else {
            $flattened[] = $item;
        }

        // Check if there's any children
        if (isset($item->{$childProperty}) && $item->{$childProperty}) {
            // Recursively flatten the child items
            $children = op3_flatten_tree_array($item->{$childProperty}, $childProperty, $setKeyProperty);

            // Merge with main flattened array
            if ($children) {
                $flattened = array_merge($flattened, $children);
            }

        }

        // Remove empty children
        if (isset($item->{$childProperty})) {
            unset($item->{$childProperty});
        }


    }

    return $flattened;
}

/**
 * Clear out cache for all pages
 *
 * @param  bool  $assets
 */
function op3_clear_all_pages_cache($assets = false)
{
    global $wpdb;

    // Delete all post meta cache
    $wpdb->query("DELETE FROM `$wpdb->postmeta` WHERE `meta_key` LIKE ('_op3_cache%')");

    if ($assets) {
        clear_assets_cache();
    }

    // And update cache hash
    set_transient('op__opb_cache_hash', time());
}

/**
 * Clear out cache for all pages
 *
 * @param  int   $pageId
 * @param  bool  $assets
 */
function op3_clear_single_page_cache($pageId, $assets = false)
{
    global $wpdb;

    // Delete all post meta cache
    if ($pageId) {
        $wpdb->query("DELETE FROM `$wpdb->postmeta` WHERE `meta_key` LIKE ('_op3_cache%') AND `post_id` = ".$pageId);

        if ($assets) {
            clear_assets_cache();
        }
    }

    // And update cache hash
    set_transient('op__opb_cache_hash', time());
}

/**
 * Check if page requires enqueueing builder assets
 *
 * @param  string  $adminPage
 * @return bool
 */
function op3_current_admin_page_requires_builder_assets($adminPage = null)
{
    global $pagenow;
    $adminPage = $adminPage ?: array_get($_GET, 'page');

    // Check current page
    if ($pagenow === 'admin.php') {
        $opPages = [
            'op-suite',
            'op-dashboard',
            'op-builder',
            'op-cart',
            'op-funnels',
        ];

        foreach ($opPages as $opPage) {
            if (strpos($adminPage, $opPage) !== false) {
                return true;
            }
        }
    }

    return false;
}
