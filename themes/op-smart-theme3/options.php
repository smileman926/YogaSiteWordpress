<?php

if (! class_exists('Redux')) {
    return;
}

require_once 'vendor/ReduxFramework/loader.php';

/**
 * Load Redux and setup option pages and fields.
 *
 * @return void
 */
function opThemeLoadOptions()
{
    $opt_name   = "op_options";
    $theme      = wp_get_theme();

    $args = array(
        'opt_name'             => $opt_name,
        'display_name'         => $theme->get('Name'),
        'display_version'      => $theme->get('Version'),
        'menu_type'            => 'submenu',
        'allow_sub_menu'       => true,
        'menu_title'           => _x('Theme Options', 'op3_smart'),
        'page_title'           => _x('Theme Options', 'op3_smart'),
        'google_api_key'       => '',
        'google_update_weekly' => false,
        'async_typography'     => true,
        'admin_bar'            => true,
        'admin_bar_icon'       => 'dashicons-portfolio',
        'admin_bar_priority'   => 50,
        'global_variable'      => '',
        'dev_mode'             => false,
        'update_notice'        => false,
        'customizer'           => true,
        //'open_expanded'     => true,                    // Allow you to start the panel in an expanded way initially.
        'disable_save_warn'    => true,                    // Disable the save warning when a user changes a field

        'page_priority'        => null,
        'page_parent'          => 'themes.php',
        'page_permissions'     => 'manage_options',
        'menu_icon'            => '',
        'last_tab'             => '',
        'page_icon'            => 'icon-themes',
        'page_slug'            => '_options',
        'save_defaults'        => true,
        'default_show'         => false,
        'default_mark'         => '',
        'show_import_export'   => true,

        'transient_time'       => 60 * MINUTE_IN_SECONDS,
        'output'               => true,
        'output_tag'           => true,
        'footer_credit'         => '&nbsp;',

        'database'             => '',

        'use_cdn'              => true,

        'compiler'             => true,

        'hints'                => array(
            'icon'          => 'el el-question-sign',
            'icon_position' => 'right',
            'icon_color'    => 'lightgray',
            'icon_size'     => 'normal',
            'tip_style'     => array(
                'color'   => 'light',
                'shadow'  => true,
                'rounded' => false,
                'style'   => '',
           ),
            'tip_position'  => array(
                'my' => 'top left',
                'at' => 'bottom right',
           ),
            'tip_effect'    => array(
                'show' => array(
                    'effect'   => 'slide',
                    'duration' => '500',
                    'event'    => 'mouseover',
               ),
                'hide' => array(
                    'effect'   => 'slide',
                    'duration' => '500',
                    'event'    => 'click mouseleave',
               ),
           ),
       )
    );

    Redux::setArgs($opt_name, $args);

    // If theme folder changes (after manual update for example)
    // we want to update the options relian on it to new folder
    $op_options = get_option('op_options');

    if (strpos($op_options['header_style'], get_template_directory_uri() . '/') === false) {
        $pattern = '/.*\//i';
        $op_options['header_style'] = preg_replace($pattern, get_template_directory_uri() . '/images/', $op_options['header_style']);
        update_option('op_options', $op_options);
    }

    require_once 'inc/redux-sections/header.php';
    require_once 'inc/redux-sections/footer.php';
    require_once 'inc/redux-sections/styling.php';
    require_once 'inc/redux-sections/blog.php';
    require_once 'inc/redux-sections/pages.php';
    require_once 'inc/redux-sections/optin-forms.php';
    require_once 'inc/redux-sections/social.php';
    require_once 'inc/redux-sections/woocommerce.php';
    require_once 'inc/redux-sections/miscellaneous.php';
    require_once 'inc/redux-sections/custom-scripts.php';
}
opThemeLoadOptions();

/**
 * Load JS for redux options page - advanced field handleing
 * @return void
 */
function opLoadReduxExtraJs()
{
    wp_enqueue_script('opst-redux', get_template_directory_uri() . '/js/redux.js', array('jquery'), OP3_SMART_THEME_VERSION, true);
    wp_localize_script( 'opst-redux', 'op3_rest_object',
        array(
            'api_nonce' => wp_create_nonce( 'wp_rest' ),
            'api_url'   => site_url('/wp-json/op3/v1/')
        )
    );
}
add_action('redux/page/op_options/enqueue', 'opLoadReduxExtraJs');


/**
 * Custom style for Redux Admin
 * @return void
 */
function opLoadReduxExtraCss() {
    wp_register_style( 'redux-custom-css', get_template_directory_uri() . '/css/redux-custom' . OP3_SMART_DEBUG . '.css', array('redux-admin-css'), OP3_SMART_THEME_VERSION, 'all');
    wp_enqueue_style('redux-custom-css');
}
add_action( 'redux/page/op_options/enqueue', 'opLoadReduxExtraCss' );


/**
 * Save logo as site icon.
 *
 * @param  array $options
 * @param  string $css
 * @param  array $changedValues
 * @return void
 */
function opSaveSiteIcon($options, $css, $changedValues)
{

    // Site icon is changed or removed
    if (isset($changedValues['site_icon'])) {

        if (empty($options['site_icon']['url'])) {

            // Site Icon removec
            update_option('site_icon', 0);

        } else {

            // Changed site icon
            $attachmentId = $options['site_icon']['id'];

            // We resize the image to 512 max
            $image_url = get_attached_file( $attachmentId );
            $image = wp_get_image_editor( $image_url );
            if ( ! is_wp_error( $image ) ) {
                $image->resize( 512, 512, false );
                $image->save();
                $image_size = $image->get_size();
            }

            // We make sure that the image is cropped based on the largest dimension
            // (for the case when the user doesn't upload 512 x 512 favicon)
            $image_dimension = $image_size['width'] > $image_size['height'] ? $image_size['width'] : $image_size['height'];
            $cropped = wp_crop_image($attachmentId, 0, 0, $image_dimension, $image_dimension, 512, 512);

            if ( ! is_wp_error( $cropped ) ) {

                // global $wp_site_icon;
                // $object = $wp_site_icon->create_attachment_object($cropped, $attachmentId);
                $object = WP_Site_Icon::create_attachment_object($cropped, $attachmentId);
                unset($object['ID']);

                // $attachmentId = $wp_site_icon->insert_attachment($object, $cropped);
                WP_Site_Icon::insert_attachment($object, $cropped);
                update_option('site_icon', $attachmentId);

            } else {

                update_option('site_icon', 0);

            }
        }
    }
}
add_filter('redux/options/op_options/compiler', 'opSaveSiteIcon', 10, 3);

/**
 * Convert redux extra field to OP acceptable.
 *
 * @param  array $data
 * @return array
 */
function opConvertReduxExtraFields($data)
{
    unset($data['redux_repeater_data']);

    for ($a = 0; $a < count($data['field_name']); $a += 1) {
        $data['required'][$a]   = $data['required'][$a] ? 'Y' : 'N';
        $data['hidden'][$a]     = $data['hidden'][$a] ? 'Y' : 'N';
    }

    return $data;
}

/**
 * Clears advanced/basic generated CSS outputs from fields depending on "typography_advanced" setting.
 *
 * @param  array $field
 * @return array
 */
function opTypographyCssOutput($field)
{
    global $op_options;

    $basicTypographyFields = array(
        'typography_basic_body_font_family',
        'typography_basic_body_font_size',
        'typography_basic_headline_font_family',
        'typography_basic_h1_font_size',
        'typography_basic_h2_font_size',
        'typography_basic_h3_font_size',
        'typography_basic_h4_font_size',
        'typography_basic_h5_font_size',
        'typography_basic_h6_font_size',
    );

    $advancedTypographyFields = array(
        'typography_title',
        'typography_tagline',
        'typography_post_title',
        'typography_p',
        'typography_menu',
        'typography_h1',
        'typography_h2',
        'typography_h3',
        'typography_h4',
        'typography_h5',
        'typography_h6',
    );

    if ((int) $op_options['typography_advanced'] === 1 && true === in_array($field['id'], $basicTypographyFields)) {
        // We clean the basic settings css generated outputs
        $field['output'] = '';
    } else if ((int) $op_options['typography_advanced'] === 0 && true === in_array($field['id'], $advancedTypographyFields)) {
        // We clean the advanced settings css generated outputs
        $field['output'] = '';
    }

    return $field;
}
add_filter('redux/field/op_options/output_css', 'opTypographyCssOutput');

/**
 * Return OPM levels.
 *
 * @return array
 */
function opGetOpmLevels()
{
    $levels = array();

    if (defined("WS_PLUGIN__OPTIMIZEMEMBER_VERSION")) {
        for ($n = 0; $n <= $GLOBALS["WS_PLUGIN__"]["optimizemember"]["c"]["levels"]; $n++) {
            $levels[$n] = ws_plugin__optimizemember_getMembershipLabel($n);
        }
    }

    return $levels;
}

/**
 * Return OPM packages.
 *
 * @return array
 */
function opGetOpmPackages()
{
    $packages = array();

    if (defined("WS_PLUGIN__OPTIMIZEMEMBER_VERSION") && count($GLOBALS["WS_PLUGIN__"]["optimizemember"]["o"]["ccp"])) {
        foreach($GLOBALS["WS_PLUGIN__"]["optimizemember"]["o"]["ccp"] as $key => $value) {
            $packages[$value] = $value;
        }
    }

    return $packages;
}

/**
 * Register Redux metaboxes for pages and posts.
 *
 * @return array
 */
function opRegisterMetaboxes()
{
    $op_options = get_option('op_options');
    $metabox_sections = array();

    // Header styling
    //
    // NOTE: Category color and background color header fields are hidden
    // on edit/add page screens using css, by hooking into exact order
    // of the fields. If you're changing this, please update the
    // CSS (redux-custom.css) accordingly.
    //
    // This is because metaboxes extension don't support hidding
    // fields in sections based on the post type (page/post)
    $metabox_sections[] = array(
        'id'    => 'post_header',
        'title' => _x('Header', 'Metabox Header', 'op3_smart'),
        'icon'  => 'el-icon-arrow-up',
        'class' => 'op-single-header-fields',
        'fields' => array(
            array(
                'id'            => 'post_header_text_color',
                'type'          => 'color',
                'title'         => _x('Header Text Colour', 'Metabox Header', 'op3_smart'),
                'transparent'   => false,
            ),
            array(
                'id'            => 'post_header_category_text_color',
                'type'          => 'color',
                'title'         => _x('Header Category Text Colour', 'Metabox Header', 'op3_smart'),
                'transparent'   => false,
                'class'         => 'op-hide-on-post-type-page',
            ),
            array(
                'id'            => 'post_header_category_background_color',
                'type'          => 'color',
                'title'         => _x('Header Category Background Colour', 'Metabox Header', 'op3_smart'),
                'transparent'   => false,
                'class'         => 'op-hide-on-post-type-page',
            ),
        ),
    );

    // Sidebar
    $metabox_sections[] = array(
        'id'    => 'single_layout',
        'title' => _x('Sidebar', 'Metabox Sidebar', 'op3_smart'),
        'icon'  => 'el el-th-list',
        'fields' => array(
            array(
                'id'        => 'single_layout_override',
                'type'      => 'switch',
                'title'     => _x('Sidebar Behaviour', 'Metabox Sidebar', 'op3_smart'),
                'subtitle'  => _x('Default will use settings set in Theme Options, and custom will set options only for this post.', 'Metabox Sidebar', 'op3_smart'),
                'on'        => _x('Default', 'op3_smart'),
                'off'       => _x('Custom', 'op3_smart'),
                'default'   => true,
            ),
            array(
                'id'        => 'single_layout_sidebar',
                'type'      => 'image_select',
                'title'     => _x('Sidebar', 'Metabox Sidebar', 'op3_smart'),
                'subtitle'  => _x('Choose position of a sidebar', 'Metabox Sidebar', 'op3_smart'),
                'default'   => 'no_sidebar',
                'options'   => array(
                    'no_sidebar' => array(
                        'alt' => _x('No Sidebar', 'Metabox Sidebar', 'op3_smart'),
                        'img' => ReduxFramework::$_url . 'assets/img/1c.png'
                    ),
                    'sidebar_left' => array(
                        'alt' => _x('Sidebar Left', 'Metabox Sidebar', 'op3_smart'),
                        'img' => ReduxFramework::$_url . 'assets/img/2cl.png'
                    ),
                    'sidebar_right' => array(
                        'alt' => _x('Sidebar Right', 'Metabox Sidebar', 'op3_smart'),
                        'img' => ReduxFramework::$_url . 'assets/img/2cr.png'
                    ),
                ),
                'required'  => array('single_layout_override', 'equals', false),
            ),
        ),
    );

    // Featured image
    $metabox_sections[] = array(
        'id'        => 'featured_image_format',
        'title'     => _x('Featured Image', 'Metabox Featured Image', 'op3_smart'),
        'icon'      => 'el el-picture',
        'fields'    => array(
            array(
                'id'        => 'single_featured_image_override',
                'type'      => 'switch',
                'title'     => _x('Featured Image Behaviour', 'Metabox Featured Image', 'op3_smart'),
                'subtitle'  => _x('Default will use settings set in Theme Options, and custom will set options only for this post.', 'Metabox Featured Image', 'op3_smart'),
                'on'        => _x('Default', 'op3_smart'),
                'off'       => _x('Custom', 'op3_smart'),
                'default'   => true,
            ),
            array(
                'id'        => 'single_featured_image_as_hero',
                'type'      => 'switch',
                'title'     => _x('Use Featured Image as Hero Image', 'Metabox Featured Image', 'op3_smart'),
                'subtitle'  => _x('This setting will override general settings set in Theme Options for this post.', 'Metabox Featured Image', 'op3_smart'),
                'on'        => _x('Yes', 'op3_smart'),
                'off'       => _x('No', 'op3_smart'),
                'default'  => $op_options['sitewide_post_featured_image_as_hero'],
                'required'  => array('single_featured_image_override', 'equals', false),
            ),
            array(
                'id'        => 'single_featured_image_in_content',
                'type'      => 'switch',
                'title'     => _x('Show Featured Image in Post Content', 'Metabox Featured Image', 'op3_smart'),
                'subtitle'  => _x('This setting will override general settings set in Theme Options for this post.', 'Metabox Featured Image', 'op3_smart'),
                'on'        => _x('Show', 'op3_smart'),
                'off'       => _x('Hide', 'op3_smart'),
                'default'   => $op_options['sitewide_post_featured_image_in_content'],
                'required'  => array(
                    array('single_featured_image_override', 'equals', false),
                    array('single_featured_image_as_hero', 'equals', false),
                )
            ),
            array(
                'id'            => 'post_header_background_color',
                'title'         => _x('Hero Background Colour', 'Metabox Featured Image', 'op3_smart'),
                'type'          => 'color_gradient',
                'transparent'   => false,
                'default'       => $op_options['sitewide_post_header_background_color'],
                'required'  => array('single_featured_image_override', 'equals', false),
            ),
            array(
                'id'                => 'post_header_background_image',
                'title'             => _x('Hero Background Image', 'Metabox Featured Image', 'op3_smart'),
                'type'              => 'background',
                'url'               => true,
                'background-color'  => false,
                'preview_media'     => true,
                'default'  => array(
                    'background-size'  => 'cover',
                    'background-position'  => 'center center',
                ),
                'required'  => array(
                    array('single_featured_image_override', 'equals', false),
                    array('single_featured_image_as_hero', 'equals', false),
                )
            ),
            array(
                'id'                => 'post_header_background_image_positioning',
                'title'             => _x('Hero Background Image Positioning', 'Metabox Featured Image', 'op3_smart'),
                'type'              => 'background',
                'url'               => true,
                'background-color'  => false,
                'preview_media'     => false,
                'preview'           => false,
                'background-image'  => false,
                'default'           => array(
                    'background-size'       => 'cover',
                    'background-position'   => 'center center',
                ),
                'required'          => array(
                    array('single_featured_image_override', 'equals', false),
                    array('single_featured_image_as_hero', 'equals', true),
                )
            ),
            array(
                'id'            => 'post_header_background_overlay',
                'title'         => _x('Hero Background Image Overlay Colour', 'Metabox Featured Image', 'op3_smart'),
                'type'          => 'color_rgba',
                'options'       => array(
                    'clickout_fires_change' => true,
                    'allow_empty'           => true,
                ),
                'default'       => array(
                    'color' => '#323232',
                    'alpha' => 0.75,
                    'rgba'  => 'rgba(50, 50, 50, 0.75)'
                ),
                'required'      => array('single_featured_image_override', 'equals', false),
            ),
            array(
                'id'        => 'single_hero_size',
                'type'      => 'switch',
                'title'     => _x('Hero Size', 'Metabox Featured Image', 'op3_smart'),
                'on'        => _x('Small', 'Metabox Featured Image', 'op3_smart'),
                'off'       => _x('Large', 'Metabox Featured Image', 'op3_smart'),
                'default'   => false,
                'required'  => array('single_featured_image_override', 'equals', false),
            ),
        )
    );

    /**
     * Optin Box section is only available
     * if optimziepress plugin is enabled
     */
    if (defined('OP_PLUGIN_DIR')) {
        $metabox_sections[] = array(
            'title'     => _x('Optin Forms', 'Metabox Optin Forms', 'op3_smart'),
            'class'     => 'metabox-optin-forms',
            'icon'      => 'el el-address-book',
            'fields'    => array_merge(
                opOptinSection(
                    'specific_after_header',
                    _x('After Header', 'Metabox Optin Forms', 'op3_smart'),
                    array('privacy_text' => true, 'image' => true)
                ),
                opOptinSection(
                    'specific_after_hero',
                    _x('After Hero', 'Metabox Optin Forms', 'op3_smart')
                ),
                opOptinSection(
                    'specific_before_footer',
                    _x('Before Footer', 'Metabox Optin Forms', 'op3_smart'),
                    array('image' => true)
                )
            ),
        );
    }

    $metaboxes[] = array(
        'id'            => 'custom_options',
        'title'         => _x('Custom Theme Options', 'Metabox', 'op3_smart'),
        'post_types'    => array('post', 'page'),
        'position'      => 'normal',
        'priority'      => 'high',
        'sections'      => $metabox_sections,
    );

    // Audio post format
    $audioFormatSections[] = array(
        'id'        => 'audio_format',
        'fields'    => array(
            array(
                'id'        => 'audio_type',
                'type'      => 'select',
                'title'     => _x('Type', 'Metabox Audio', 'op3_smart'),
                'options'   => array(
                    'embed' => _x('Embed', 'Metabox Audio', 'op3_smart'),
                    'self'  => _x('Self Hosted', 'Metabox Audio', 'op3_smart')
                ),
                'default'   => 'embed',
            ),
            array(
                'id'        => 'audio_embed',
                'type'      => 'textarea',
                'title'     => _x('Embed code', 'Metabox Audio', 'op3_smart'),
                'required'  => array('audio_type', 'equals', 'embed'),
            ),
            array(
                'id'                => 'audio_mp3',
                'type'              => 'media',
                'title'             => _x('Audio File', 'Metabox Audio', 'op3_smart'),
                'required'          => array('audio_type', 'equals', 'self'),
                'url'               => true,
                'placeholder'       => false,
                'mode'              => 'audio',
                'library_filter'    => array('mp3', 'm4a', 'm4b', 'ra', 'ram', 'wav', 'ogg', 'oga', 'mid', 'midi', 'wma', 'wax', 'mka'),
            ),
            array(
                'id'                => 'audio_ogg',
                'type'              => 'media',
                'title'             => _x('HTML5 Fallback Audio File (.ogg)', 'Metabox Audio', 'op3_smart'),
                'required'          => array('audio_type', 'equals', 'self'),
                'url'               => true,
                'placeholder'       => false,
                'mode'              => 'audio',
                'library_filter'    => array('ogg', 'oga'),
            ),
        ),
    );

    $metaboxes[] = array(
        'id'            => 'audio_format',
        'title'         => _x('Audio', 'Metabox Audio', 'op3_smart'),
        'post_types'    => array('post'),
        'post_format'   => array('audio'),
        'position'      => 'normal',
        'priority'      => 'high',
        'sections'      => $audioFormatSections,
    );

    // Video post format
    $videoFormatSections[] = array(
        'id'        => 'video_format',
        'fields'    => array(
            array(
                'id'        => 'video_type',
                'type'      => 'select',
                'title'     => _x('Type', 'Metabox Video', 'op3_smart'),
                'options'   => array(
                    'embed' => _x('Embed', 'Metabox Video', 'op3_smart'),
                    'self'  => _x('Self Hosted', 'Metabox Video', 'op3_smart')
                ),
                'default'   => 'embed',
            ),
            array(
                'id'        => 'video_embed',
                'type'      => 'textarea',
                'title'     => _x('Embed code', 'Metabox Video', 'op3_smart'),
                'required'  => array('video_type', 'equals', 'embed'),
            ),
            array(
                'id'                => 'video_mp4',
                'type'              => 'media',
                'title'             => _x('Video File', 'Metabox Video', 'op3_smart'),
                'required'          => array('video_type', 'equals', 'self'),
                'url'               => true,
                'placeholder'       => false,
                'mode'              => 'video',
                'library_filter'    => array('mp4', 'm4v', 'webm', 'ogv', 'wmv', 'flv'),
            ),
            array(
                'id'                => 'video_ogg',
                'type'              => 'media',
                'title'             => _x('HTML5 Fallback Video File (.ogg)', 'Metabox Video', 'op3_smart'),
                'required'          => array('video_type', 'equals', 'self'),
                'url'               => true,
                'placeholder'       => false,
                'mode'              => 'video',
                'library_filter'    => array('ogv'),
            ),
            array(
                'id'                => 'video_webm',
                'type'              => 'media',
                'title'             => _x('HTML5 Fallback Video File (.webm)', 'Metabox Video', 'op3_smart'),
                'required'          => array('video_type', 'equals', 'self'),
                'url'               => true,
                'placeholder'       => false,
                'mode'              => 'video',
                'library_filter'    => array('webm'),
            ),
        ),
    );

    $metaboxes[] = array(
        'id'            => 'video_format',
        'title'         => _x('Video', 'Metabox Video', 'op3_smart'),
        'post_types'    => array('post'),
        'post_format'   => array('video'),
        'position'      => 'normal',
        'priority'      => 'high',
        'sections'      => $videoFormatSections,
    );

    // Gallery post format
    $galleryFormatSections[] = array(
        'id'        => 'gallery_format',
        // 'title'     => _x('Gallery Details', 'Metabox Gallery', 'op3_smart'),
        'fields'    => array(
            array(
                'id'    => 'post_gallery',
                'type'  => 'gallery',
                // 'title' => _x('Gallery', 'Metabox Gallery', 'op3_smart'),
            ),
        ),
    );

    $metaboxes[] = array(
        'id'            => 'gallery_format',
        'title'         => _x('Gallery', 'Metabox Gallery', 'op3_smart'),
        'post_types'    => array('post'),
        'post_format'   => array('gallery'),
        'position'      => 'normal',
        'priority'      => 'high',
        'sections'      => $galleryFormatSections,
    );

    // Additional fields for WooCommerce
    if (in_array('woocommerce/woocommerce.php', apply_filters('active_plugins', get_option('active_plugins')))) {
        $woocommerceProductSections = array();

        if (isset($op_options['show_custom_short_description'])
            && (int) $op_options['show_custom_short_description'] === 1) {

            $woocommerceProductSections[] = array(
                'id'        => 'woocommerce_product_section',
                'fields'    => array(
                    array(
                        'id'            => 'woocommerce_custom_short_description',
                        'type'          => 'textarea',
                        'title'         => _x('Short product description that will be shown on the shop page', 'Metabox WooCommerce', 'op3_smart'),
                        'subtitle'      => _x('HTML is not supported in this field.', 'Metabox WooCommerce', 'op3_smart'),
                        'allowed_html'  => false,
                        'rows'          => 2,
                    ),
                ),
            );
        }

        $metaboxes[] = array(
            'id'            => 'woocommerce_product_section_metabox',
            'title'         => _x('Custom Short Description', 'Metabox WooCommerce', 'op3_smart'),
            'post_types'    => array('product'),
            'position'      => 'normal',
            'priority'      => 'high',
            'sections'      => $woocommerceProductSections,
        );

    }

    return $metaboxes;
}
add_action('redux/metaboxes/op_options/boxes', 'opRegisterMetaboxes', 10, 3);

/**
 * Return Redux fields for optin forms.
 *
 * @param  boolean $defaults
 * @param  string  $prefix
 * @return array
 */
function opOptinFormSettingsFields($defaults = true, $prefix = '', $nr = 1)
{
    $op_options = get_option('op_options');
    $section_id = isset($op_options[$prefix . '_integration_name_' . $nr]) ? $op_options[$prefix . '_integration_name_' . $nr] : $nr;
    $section_title = isset($section_id) ? $section_id : 'Integration #' . $nr;

    $fields = array(
        array(
            'id'        => $prefix . '_accordion_start_' . $nr,
            'type'      => 'accordion',
            'title'     => $section_title,
            'class'     => 'op-optin-accordion op-optin-accordion-' . $nr,
            'position'  => 'start',
        ),
        array(
            'id'        => $prefix . '_integration_name_' . $nr,
            'type'      => 'text',
            'title'     => _x('Integration Name', 'Optin Forms', 'op3_smart'),
            'class'     => 'op-integration-name op-integration-name-' . $nr,
            // 'options'   => array('email' => _x('Email data', 'Optin Forms', 'op3_smart'), 'custom' => _x('Custom form', 'Optin Forms', 'op3_smart')),
            'default'   => 'Integration #' . $nr,
            // 'required'  => array(
                //  array('integration_current', 'equals', $nr),
            // )
        ),
        array(
            'id'        => $prefix . '_integration_id_' . $nr,
            'type'      => 'text',
            'title'     => _x('Integration ID', 'Optin Forms', 'op3_smart'),
            'subtitle'  => _x('This field is for internal theme usage, and should not be changed.', 'Optin Forms', 'op3_smart'),
            // 'type'      => 'hidden',
            'class'     => 'op-optin-integration-id',
            'default'   => $nr,
            'readonly'  => true,
        ),
        array(
            'id'        => $prefix . '_integration_type_' . $nr,
            'type'      => 'select',
            'title'     => _x('Integration Type', 'Optin Forms', 'op3_smart'),
            'options'   => array(
                'email'     => _x('Email data', 'Optin Forms', 'op3_smart')
            ),
            'class'     => 'op-integration-type-options',
            'default'   => 'email',
            // 'required'  => array(
                // array($prefix . '_form_enabled', 'equals', true),
                // array('integration_current', 'equals', $nr),
            // )
        ),
        array(
            'id'        => $prefix . '_list_' . $nr,
            'type'      => 'select',
            'title'     => _x('Integration List', 'Optin Forms', 'op3_smart'),
            'options'   => array('' => _x('Select Integration Type first', 'Optin Forms', 'op3_smart')),
            'default'   => '',
            'class'     => 'op-integration-type-list',
            'required'  => array(
                // array($prefix . '_form_enabled', 'equals', true),
                // array('integration_current', 'equals', $nr),
                array($prefix . '_integration_type_' . $nr, 'not', 'email'),
                array($prefix . '_integration_type_' . $nr, 'not', 'custom'),
                array($prefix . '_integration_type_' . $nr, 'not', 'oneshoppingcart'),
                array($prefix . '_integration_type_' . $nr, 'not', 'arpreach'),
            ),
        ),
        array(
            'id'        => $prefix . '_autoresponder_name_' . $nr,
            'type'      => 'text',
            'title'     => _x('Autoresponder Name', 'Optin Forms', 'op3_smart'),
            'default'   => '',
            'required'  => array(
                // array($prefix . '_form_enabled', 'equals', true),
                // array('integration_current', 'equals', $nr),
                array($prefix . '_integration_type_' . $nr, 'equals', 'arpreach'),
            )
        ),
        /*array(
            'id'        => $prefix . '_double_optin_' . $nr,
            'type'      => 'switch',
            'title'     => _x('Double Optin', 'Optin Forms', 'op3_smart'),
            'on'        => _x('Yes', 'op3_smart'),
            'off'       => _x('No', 'op3_smart'),
            'default'   => true,
            'required'  => array(
                // array($prefix . '_form_enabled', 'equals', true),
                // array('integration_current', 'equals', $nr),
                array($prefix . '_integration_type_' . $nr, 'equals', array('egoi', 'mailchimp')),
            ),
        ),*/
        /*array(
            'id'        => $prefix . '_welcome_email_' . $nr,
            'type'      => 'switch',
            'title'     => _x('Welcome Email', 'Optin Forms', 'op3_smart'),
            'on'        => _x('Yes', 'op3_smart'),
            'off'       => _x('No', 'op3_smart'),
            'default'   => false,
            'required'  => array(
                // array($prefix . '_form_enabled', 'equals', true),
                // array('integration_current', 'equals', $nr),
                // array($prefix . '_integration_type_' . $nr, 'equals', 'mailchimp'),

                // this option is not used in OP, so I'm not sure it does anything here,
                // disabling it for now (Zoran)
                array($prefix . '_integration_type_' . $nr, 'equals', 'DISABLE'),
            )
        ),*/
        /*array(
            'id'        => $prefix . '_signup_form_id_' . $nr,
            'type'      => 'text',
            'title'     => _x('Signup Form ID', 'Optin Forms', 'op3_smart'),
            'desc'      => _x('Enter the form ID if you wish to use the Opt-in confirmation email settings you have created inside the settings for this form.', 'Optin Forms', 'op3_smart'),
            'default'   => '',
            'required'  => array(
                // array($prefix . '_form_enabled', 'equals', true),
                // array('integration_current', 'equals', $nr),
                array($prefix . '_integration_type_' . $nr, 'equals', array('activecampaign', 'emma')),
            ),
        ),*/
        array(
            'id'        => $prefix . '_success_message_' . $nr,
            'type'      => 'text',
            'title'     => _x('Success Message', 'Optin Forms', 'op3_smart'),
            'subtitle'     => _x('This message will be shown after successful optin. ', 'Optin Forms', 'op3_smart'),
            'default'   => _x('Thanks. You will receive email from us soon!', 'Optin Forms', 'op3_smart'),
        ),
        array(
            'id'        => $prefix . '_thank_you_page_' . $nr,
            'type'      => 'text',
            'title'     => _x('Thank You Page URL', 'Optin Forms', 'op3_smart'),
            'subtitle'     => _x('If this is set, success message above is ignored and user will be redirected to this URL.', 'Optin Forms', 'op3_smart'),
            'default'   => '',
            'required'  => array(
                // array($prefix . '_form_enabled', 'equals', true),
                // array('integration_current', 'equals', $nr),
                //array($prefix . '_integration_type_' . $nr, 'not', 'custom'),
                //array($prefix . '_integration_type_' . $nr, 'not', 'email'),
                //array($prefix . '_integration_type_' . $nr, 'not', 'infusionsoft'),
                //array($prefix . '_integration_type_' . $nr, 'not', 'oneshoppingcart'),
            ),
        ),
        /*array(
            'id'        => $prefix . '_already_subscribed_url_' . $nr,
            'type'      => 'text',
            'title'     => _x('Already Subscribed URL', 'Optin Forms', 'op3_smart'),
            'validate'  => 'url',
            'default'   => '',
            'required'  => array(
                // array($prefix . '_form_enabled', 'equals', true),
                // array('integration_current', 'equals', $nr),
                array($prefix . '_integration_type_' . $nr, 'not', 'custom'),
                array($prefix . '_integration_type_' . $nr, 'not', 'email'),
                array($prefix . '_integration_type_' . $nr, 'not', 'infusionsoft'),
                array($prefix . '_integration_type_' . $nr, 'not', 'oneshoppingcart'),
                array($prefix . '_integration_type_' . $nr, 'not', 'maropost'),
                array($prefix . '_integration_type_' . $nr, 'not', 'officeautopilot'),
                array($prefix . '_integration_type_' . $nr, 'not', 'ontraport'),
            ),
        ),*/
        array(
            'id'        => $prefix . '_action_page_' . $nr,
            'type'      => 'text',
            'title'     => _x('Action Page', 'Optin Forms', 'op3_smart'),
            'hidden'    => true,
        ),

        // New window option is not currently
        // implemented into OptimizePress,
        // so I'm commenting it out here
        // array(
        //     'id'        => $prefix . '_new_window_' . $nr,
        //     'type'      => 'switch',
        //     'title'     => _x('New Window', 'Optin Forms', 'op3_smart'),
        //     'default'   => false,
        //     'on'        => _x('Yes', 'op3_smart'),
        //     'off'       => _x('No', 'op3_smart'),
        //     'required'  => array(
        //         // array($prefix . '_form_enabled', 'equals', true),
        //         // array('integration_current', 'equals', $nr),
        //         array($prefix . '_integration_type_' . $nr, 'equals', array('custom', 'oneshoppingcart')),
        //     ),
        // ),

        array(
            'id'        => $prefix . '_email_address_' . $nr,
            'type'      => 'text',
            'title'     => _x('Email Address', 'Optin Forms', 'op3_smart'),
            'validate'  => 'email',
            'class'     => 'op-integration-email-address',
            'default'   => $defaults === true ? get_option('admin_email') : '',
            'required'  => array(
                // array($prefix . '_form_enabled', 'equals', true),
                // array('integration_current', 'equals', $nr),
                array($prefix . '_integration_type_' . $nr, 'equals', 'email'),
            )
        ),
        /*array(
            'id'        => $prefix . '_redirect_url_' . $nr,
            'type'      => 'text',
            'title'     => _x('Redirect URL', 'Optin Forms', 'op3_smart'),
            'validate'  => 'url',
            'default'   => '',
            'required'  => array(
                // array($prefix . '_form_enabled', 'equals', true),
                // array('integration_current', 'equals', $nr),
                array($prefix . '_integration_type_' . $nr, 'equals', 'email'),
            )
        ),*/
        /*array(
            'id'        => $prefix . '_html_' . $nr,
            'type'      => 'textarea',
            'title'     => _x('Form HTML', 'Optin Forms', 'op3_smart'),
            'default'   => '',
            'class'     => 'op-integration-form-html',
            'required'  => array(
                // array($prefix . '_form_enabled', 'equals', true),
                // array('integration_current', 'equals', $nr),
                array($prefix . '_integration_type_' . $nr, 'equals', array('custom', 'oneshoppingcart')),
            ),
        ),*/
        array(
            'id'        => $prefix . '_hidden_' . $nr,
            'type'      => 'text',
            'title'     => _x('Hidden fields markup', 'Optin Forms', 'op3_smart'),
            'hidden'    => true,
        ),
        array(
            'id'        => $prefix . '_disable_name_' . $nr,
            'type'      => 'switch',
            'title'     => _x('Disable Name', 'Optin Forms', 'op3_smart'),
            'default'   => false,
            'on'        => _x('Yes', 'op3_smart'),
            'off'       => _x('No', 'op3_smart'),
            'required'  => array(
                // array('integration_current', 'equals', $nr),
            )
        ),
        array(
            'id'        => $prefix . '_name_' . $nr,
            'type'      => 'select',
            'title'     => _x('Name', 'Optin Forms', 'op3_smart'),
            'options'   => array('' => _x('Select list first or paste in the from HTML', 'Optin Forms', 'op3_smart')),
            'default'   => '',
            'class'     => 'op-form-field-selector op-form-regular-field-selector',
            'required'  => array(
                // array('integration_current', 'equals', $nr),
                array($prefix . '_disable_name_' . $nr, 'not', true),
                array($prefix . '_integration_type_' . $nr, 'not', 'email'),
            ),
        ),
        array(
            'id'        => $prefix . '_name_default_' . $nr,
            'type'      => 'text',
            'title'     => _x('Name Field Label', 'Optin Forms', 'op3_smart'),
            'default'   => _x('Enter your name', 'Optin Forms', 'op3_smart'),
            'required'  => array(
                // array('integration_current', 'equals', $nr),
                array($prefix . '_disable_name_' . $nr, 'not', true)
            ),
        ),
        array(
            'id'        => $prefix . '_name_order_' . $nr,
            'type'      => 'text',
            'title'     => _x('Name Order', 'Optin Forms', 'op3_smart'),
            'default'   => 1,
            'required'  => array(
                // array('integration_current', 'equals', $nr),
                array($prefix . '_disable_name_' . $nr, 'not', true)
            ),
        ),
        array(
            'id'        => $prefix . '_name_required_' . $nr,
            'type'      => 'switch',
            'title'     => _x('Name Required', 'Optin Forms', 'op3_smart'),
            'default'   => false,
            'on'        => _x('Yes', 'op3_smart'),
            'off'       => _x('No', 'op3_smart'),
            'required'  => array(
                // array('integration_current', 'equals', $nr),
                array($prefix . '_integration_type_' . $nr, 'not', 'email'),
                array($prefix . '_disable_name_' . $nr, 'not', true)
            ),
        ),
        array(
            'id'        => $prefix . '_email_' . $nr,
            'type'      => 'select',
            'title'     => _x('Email', 'Optin Forms', 'op3_smart'),
            'options'   => array('' => _x('Select list first or paste in the from HTML', 'Optin Forms', 'op3_smart')),
            'default'   => '',
            'class'     => 'op-form-field-selector op-form-regular-field-selector',
            'required'  => array(
                // array('integration_current', 'equals', $nr),
                // array($prefix . '_integration_type_' . $nr, 'not', 'email'),
                // array($prefix . '_integration_type_' . $nr, 'equals', 'custom'),
                array($prefix . '_integration_type_' . $nr, 'equals', array('custom', 'oneshoppingcart')),
            )
        ),
        array(
            'id'        => $prefix . '_email_default_' . $nr,
            'type'      => 'text',
            'title'     => _x('Email Field Label', 'Optin Forms', 'op3_smart'),
            'default'   => _x('Enter your email', 'Optin Forms', 'op3_smart'),
            // 'required'  => array(
                // array('integration_current', 'equals', $nr),
                // array($prefix . '_integration_type_' . $nr, 'not', 'email'),
                // array($prefix . '_integration_type_' . $nr, 'equals', array('custom', 'oneshoppingcart')),
            // )
        ),
        array(
            'id'        => $prefix . '_email_order_' . $nr,
            'type'      => 'text',
            'title'     => _x('Email Order', 'Optin Forms', 'op3_smart'),
            'default'   => 2,
            // 'required'  => array(
                // array('integration_current', 'equals', $nr),
            // )
        ),
        array(
            'id'        => $prefix . '_method_' . $nr,
            'type'      => 'select',
            'title'     => _x('Method', 'Optin Forms', 'op3_smart'),
            'options'   => array('post' => 'POST', 'get' => 'GET'),
            'default'   => 'post',
            'required'  => array(
                // array('integration_current', 'equals', $nr),
                array($prefix . '_integration_type_' . $nr, 'equals', array('custom', 'oneshoppingcart')),
            ),
        ),
        array(
            'id'        => $prefix . '_action_' . $nr,
            'type'      => 'text',
            'title'     => _x('Form URL', 'Optin Forms', 'op3_smart'),
            'default'   => '',
            'required'  => array(
                // array('integration_current', 'equals', $nr),
                array($prefix . '_integration_type_' . $nr, 'equals', array('custom', 'oneshoppingcart')),
            ),
        ),
        /*array(
            'id'        => $prefix . '_gotowebinar_' . $nr,
            'type'      => 'switch',
            'title'     => _x('Integrate with GoToWebinar', 'Optin Forms', 'op3_smart'),
            'default'   => false,
            'on'        => _x('Yes', 'op3_smart'),
            'off'       => _x('No', 'op3_smart'),
            // 'required'  => array(
                // array('integration_current', 'equals', $nr),
            // )
        ),*/
        /*array(
            'id'        => $prefix . '_gotowebinar_list_' . $nr,
            'type'      => 'select',
            'title'     => _x('GoToWebinar List', 'Optin Forms', 'op3_smart'),
            'options'   => array('' => _x('Enable GoToWebinar integration first', 'Optin Forms', 'op3_smart')),
            'default'   => '',
            'required'  => array(
                // array('integration_current', 'equals', $nr),
                array($prefix . '_gotowebinar_' . $nr, 'equals', true),
            )
        ),*/


        // GDPR
        array(
            'id'        => $prefix . '_gdpr_enabled_' . $nr,
            'type'      => 'select',
            'title'     => _x('Enable GDPR Checkboxes', 'Optin Forms', 'op3_smart'),
            'options'   => array(
                'disabled'      => _x('Do not show GDPR Fields', 'Optin Forms', 'op3_smart'),
                'eu_only'       => _x('Show to EU Only', 'Optin Forms', 'op3_smart'),
                'all_visitors'  => _x('Show to all Visitors', 'Optin Forms', 'op3_smart'),
            ),
            'default'   => 'disabled',
            'required'  => array(
                array($prefix . '_integration_type_' . $nr, 'equals', array(
                    'activecampaign', 'arpreach', 'aweber', 'campaignmonitor', 'convertkit', 'egoi', 'emma', 'icontact', 'infusionsoft', 'mailpoet', 'mailchimp', 'officeautopilot', 'ontraport', 'sendlane', 'getresponse', 'campaignrefinery'
                )),
            ),
        ),

        array(
            'id'    => $prefix . '_gdpr_notice_' . $nr,
            'type'  => 'raw',
            'title' => '',
            'content'  => _x('You can configure the GDPR privacy checkboxes for your opt-in form below. Please watch our training on how to integrate your provider on our <a href="http://optimizelink.com/gdpr-smarttheme" target="_blank">training hub here</a>.', 'Optin Forms', 'op3_smart'),
            'required' => array(
                array($prefix . '_gdpr_enabled_' . $nr, 'not', 'disabled'),
                array($prefix . '_integration_type_' . $nr, 'equals', array(
                    'activecampaign', 'arpreach', 'aweber', 'campaignmonitor', 'convertkit', 'egoi', 'emma', 'icontact', 'infusionsoft', 'mailpoet', 'mailchimp', 'officeautopilot', 'ontraport', 'sendlane', 'getresponse', 'campaignrefinery'
                )),
            ),
        ),
        array(
            'id'    => $prefix . '_gdpr_warning_' . $nr,
            'type'  => 'raw',
            'title' => '',
            'content'  => _x('<div id="info-integrations_warning" class="redux-warning redux-notice-field redux-field-info"><p class="redux-info-desc"><b>Important Notice</b><br>Your selected integration does not currently have GDPR options available. Please see <a href="http://www.optimizelink.com/gdpr-unsupported" target="_blank">this article</a> for more information.</p></div>', 'Optin Forms', 'op3_smart'),
            'required' => array(
                array($prefix . '_integration_type_' . $nr, 'equals', array(
                    'email', 'custom', 'oneshoppingcart',
                )),
            ),
        ),

        array(
            'id'        => $prefix . '_consent_1_enabled_' . $nr,
            'type'      => 'select',
            'title'     => _x('Enable Consent 1 Checkbox', 'Optin Forms', 'op3_smart'),
            'options'   => array(
                'no'    => _x('No', 'Optin Forms', 'op3_smart'),
                'yes'   => _x('Yes', 'Optin Forms', 'op3_smart'),
            ),
            'default'   => 'no',
            'required'  => array(
                array($prefix . '_gdpr_enabled_' . $nr, 'not', 'disabled'),
            ),
        ),
        array(
            'id'        => $prefix . '_consent_1_label_' . $nr,
            'type'      => 'text',
            'title'     => _x('Consent 1 Label/Message', 'Optin Forms', 'op3_smart'),
            'placeholder'   => _x('Enter privacy notice (including any HTML links)', 'Optin Forms', 'op3_smart'),
            'required'  => array(
                array($prefix . '_consent_1_enabled_' . $nr, 'equals', 'yes'),
            ),
        ),
        array(
            'id'        => $prefix . '_consent_1_tag_accepted_text_' . $nr,
            'type'      => 'text',
            'title'     => _x('Consent 1 Accept Custom Field/Tag', 'Optin Forms', 'op3_smart'),
            'required'  => array(
                array($prefix . '_consent_1_enabled_' . $nr, 'equals', 'yes'),
                array($prefix . '_integration_type_' . $nr, 'equals', array(
                    'aweber', 'email', 'custom',
                )),
            ),
        ),
        array(
            'id'        => $prefix . '_consent_1_tag_accepted_' . $nr,
            'type'      => 'select',
            'title'     => _x('Consent 1 Accept Custom Field/Tag', 'Optin Forms', 'op3_smart'),
            'options'   => array(
                'missing_integration_type' => _x('Select integration type first', 'Optin Forms', 'op3_smart'),
            ),
            'default'   => 'missing_integration_type',
            'required'  => array(
                array($prefix . '_consent_1_enabled_' . $nr, 'equals', 'yes'),
                array($prefix . '_integration_type_' . $nr, 'not', 'aweber'),
                array($prefix . '_integration_type_' . $nr, 'not', 'email'),
                array($prefix . '_integration_type_' . $nr, 'not', 'custom'),
            ),
            'class'     => 'op-gdpr-provider-tags-dropdown-' . $nr
        ),
        array(
            'id'        => $prefix . '_consent_1_tag_declined_text_' . $nr,
            'type'      => 'text',
            'title'     => _x('Consent 1 Decline Custom Field/Tag', 'Optin Forms', 'op3_smart'),
            'required'  => array(
                array($prefix . '_consent_1_enabled_' . $nr, 'equals', 'yes'),
                array($prefix . '_integration_type_' . $nr, 'equals', array(
                    'aweber', 'email', 'custom',
                )),
            ),
        ),
        array(
            'id'        => $prefix . '_consent_1_tag_declined_' . $nr,
            'type'      => 'select',
            'title'     => _x('Consent 1 Decline Custom Field/Tag', 'Optin Forms', 'op3_smart'),
            'options'   => array(
                'missing_integration_type' => _x('Select integration type first', 'Optin Forms', 'op3_smart'),
            ),
            'default'   => 'missing_integration_type',
            'required'  => array(
                array($prefix . '_consent_1_enabled_' . $nr, 'equals', 'yes'),
                array($prefix . '_integration_type_' . $nr, 'not', 'aweber'),
                array($prefix . '_integration_type_' . $nr, 'not', 'email'),
                array($prefix . '_integration_type_' . $nr, 'not', 'custom'),
            ),
            'class'     => 'op-gdpr-provider-tags-dropdown-' . $nr
        ),
        array(
            'id'        => $prefix . '_consent_1_tag_not_shown_text_' . $nr,
            'type'      => 'text',
            'title'     => _x('Consent 1 Not Shown/Non-EU Custom Field/Tag', 'Optin Forms', 'op3_smart'),
            'required'  => array(
                array($prefix . '_consent_1_enabled_' . $nr, 'equals', 'yes'),
                array($prefix . '_integration_type_' . $nr, 'equals', array(
                    'aweber', 'email', 'custom',
                )),
            ),
        ),
        array(
            'id'        => $prefix . '_consent_1_tag_not_shown_' . $nr,
            'type'      => 'select',
            'title'     => _x('Consent 1 Not Shown/Non-EU Custom Field/Tag', 'Optin Forms', 'op3_smart'),
            'options'   => array(
                'missing_integration_type' => _x('Select integration type first', 'Optin Forms', 'op3_smart'),
            ),
            'default'   => 'missing_integration_type',
            'required'  => array(
                array($prefix . '_consent_1_enabled_' . $nr, 'equals', 'yes'),
                array($prefix . '_integration_type_' . $nr, 'not', 'aweber'),
                array($prefix . '_integration_type_' . $nr, 'not', 'email'),
                array($prefix . '_integration_type_' . $nr, 'not', 'custom'),
            ),
            'class'     => 'op-gdpr-provider-tags-dropdown-' . $nr
        ),

        array(
            'id'        => $prefix . '_consent_2_enabled_' . $nr,
            'type'      => 'select',
            'title'     => _x('Enable Consent 2 Checkbox', 'Optin Forms', 'op3_smart'),
            'options'   => array(
                'no'    => _x('No', 'Optin Forms', 'op3_smart'),
                'yes'   => _x('Yes', 'Optin Forms', 'op3_smart'),
            ),
            'default'   => 'no',
            'required'  => array(
                array($prefix . '_gdpr_enabled_' . $nr, 'not', 'disabled'),
            ),
        ),
        array(
            'id'        => $prefix . '_consent_2_label_' . $nr,
            'type'      => 'text',
            'title'     => _x('Consent 2 Label/Message', 'Optin Forms', 'op3_smart'),
            'placeholder'   => _x('Enter privacy notice (including any HTML links)', 'Optin Forms', 'op3_smart'),
            'required'  => array(
                array($prefix . '_consent_2_enabled_' . $nr, 'equals', 'yes'),
            ),
        ),
        array(
            'id'        => $prefix . '_consent_2_tag_accepted_text_' . $nr,
            'type'      => 'text',
            'title'     => _x('Consent 2 Accept Custom Field/Tag', 'Optin Forms', 'op3_smart'),
            'required'  => array(
                array($prefix . '_consent_2_enabled_' . $nr, 'equals', 'yes'),
                array($prefix . '_integration_type_' . $nr, 'equals', array(
                    'aweber', 'email', 'custom',
                )),
            ),
        ),
        array(
            'id'        => $prefix . '_consent_2_tag_accepted_' . $nr,
            'type'      => 'select',
            'title'     => _x('Consent 2 Accept Custom Field/Tag', 'Optin Forms', 'op3_smart'),
            'options'   => array(
                'missing_integration_type' => _x('Select integration type first', 'Optin Forms', 'op3_smart'),
            ),
            'default'   => 'missing_integration_type',
            'required'  => array(
                array($prefix . '_consent_2_enabled_' . $nr, 'equals', 'yes'),
                array($prefix . '_integration_type_' . $nr, 'not', 'aweber'),
                array($prefix . '_integration_type_' . $nr, 'not', 'email'),
                array($prefix . '_integration_type_' . $nr, 'not', 'custom'),
            ),
            'class'     => 'op-gdpr-provider-tags-dropdown-' . $nr
        ),
        array(
            'id'        => $prefix . '_consent_2_tag_declined_text_' . $nr,
            'type'      => 'text',
            'title'     => _x('Consent 2 Decline Custom Field/Tag', 'Optin Forms', 'op3_smart'),
            'required'  => array(
                array($prefix . '_consent_2_enabled_' . $nr, 'equals', 'yes'),
                array($prefix . '_integration_type_' . $nr, 'equals', array(
                    'aweber', 'email', 'custom',
                )),
            ),
        ),
        array(
            'id'        => $prefix . '_consent_2_tag_declined_' . $nr,
            'type'      => 'select',
            'title'     => _x('Consent 2 Decline Custom Field/Tag', 'Optin Forms', 'op3_smart'),
            'options'   => array(
                'missing_integration_type' => _x('Select integration type first', 'Optin Forms', 'op3_smart'),
            ),
            'default'   => 'missing_integration_type',
            'required'  => array(
                array($prefix . '_consent_2_enabled_' . $nr, 'equals', 'yes'),
                array($prefix . '_integration_type_' . $nr, 'not', 'aweber'),
                array($prefix . '_integration_type_' . $nr, 'not', 'email'),
                array($prefix . '_integration_type_' . $nr, 'not', 'custom'),
            ),
            'class'     => 'op-gdpr-provider-tags-dropdown-' . $nr
        ),
        array(
            'id'        => $prefix . '_consent_2_tag_not_shown_text_' . $nr,
            'type'      => 'text',
            'title'     => _x('Consent 2 Not Shown/Non-EU Custom Field/Tag', 'Optin Forms', 'op3_smart'),
            'required'  => array(
                array($prefix . '_consent_2_enabled_' . $nr, 'equals', 'yes'),
                array($prefix . '_integration_type_' . $nr, 'equals', array(
                    'aweber', 'email', 'custom',
                )),
            ),
        ),
        array(
            'id'        => $prefix . '_consent_2_tag_not_shown_' . $nr,
            'type'      => 'select',
            'title'     => _x('Consent 2 Not Shown/Non-EU Custom Field/Tag', 'Optin Forms', 'op3_smart'),
            'options'   => array(
                'missing_integration_type' => _x('Select integration type first', 'Optin Forms', 'op3_smart'),
            ),
            'default'   => 'missing_integration_type',
            'required'  => array(
                array($prefix . '_consent_2_enabled_' . $nr, 'equals', 'yes'),
                array($prefix . '_integration_type_' . $nr, 'not', 'aweber'),
                array($prefix . '_integration_type_' . $nr, 'not', 'email'),
                array($prefix . '_integration_type_' . $nr, 'not', 'custom'),
            ),
            'class'     => 'op-gdpr-provider-tags-dropdown-' . $nr
        ),

        array(
            'id'        => $prefix . '_consent_notes_field_' . $nr,
            'type'      => 'select',
            'title'     => _x('Consent Notes Custom Field', 'Optin Forms', 'op3_smart'),
            'options'   => array(
                'missing_integration_type' => _x('Select integration type/list first', 'Optin Forms', 'op3_smart'),
            ),
            'default'   => 'missing_integration_type',
            'required'  => array(
                array($prefix . '_gdpr_enabled_' . $nr, 'not', 'disabled'),
                array($prefix . '_integration_type_' . $nr, 'equals', array('campaignmonitor', 'egoi', 'emma', 'icontact', 'infusionsoft', 'mailpoet', 'getresponse', 'campaignrefinery', 'convertkit')),
            ),
            'class'     => 'op-gdpr-provider-consent-notes-dropdown-' . $nr
        ),
    );

    // OPM integration fields
    if (defined("WS_PLUGIN__OPTIMIZEMEMBER_VERSION")) {
        $fields = array_merge($fields, array(
            array(
                'id'        => $prefix . '_opm_integration_' . $nr,
                'type'      => 'switch',
                'title'     => _x('Integrate with OptimizeMember', 'Optin Forms', 'op3_smart'),
                'default'   => false,
                'on'        => _x('Yes', 'op3_smart'),
                'off'       => _x('No', 'op3_smart'),
                // 'required'  => array(
                    // array('integration_current', 'equals', $nr),
                // )
            ),
            array(
                'id'        => $prefix . '_opm_level_' . $nr,
                'type'      => 'select',
                'title'     => _x('Membership Level', 'Optin Forms', 'op3_smart'),
                'options'   => opGetOpmLevels(),
                'default'   => '',
                'required'  => array(
                    // array('integration_current', 'equals', $nr),
                    array($prefix . '_opm_integration_' . $nr, 'equals', true),
                )
            ),
            array(
                'id'        => $prefix . '_opm_packages_' . $nr,
                'type'      => 'checkbox',
                'title'     => _x('Packages', 'Optin Forms', 'op3_smart'),
                'options'   => opGetOpmPackages(),
                'default'   => '',
                'required'  => array(
                    // array('integration_current', 'equals', $nr),
                    array($prefix . '_opm_integration_' . $nr, 'equals', true),
                )
            ),
        ));
    }

    $fields = array_merge($fields, array(
        array(
            'id'        => $prefix . '_accordion_end_' . $nr,
            'type'      => 'accordion',
            'position'  => 'end'
        ),
    ));

    // if ($defaults === false) {
    //     foreach ($fields as &$item) {
    //         unset($item['default']);
    //     }
    // }

    return $fields;
}

/**
 * Generate optin section with all required fields
 * @param  string $prefix
 * @param  string $name
 * @param  array $disabled_fields - fields that shouldn't be shown for current form
 * @return array
 */
function opOptinSection($prefix, $name, $disabled_fields = array(), $defaults = false)
{
    $fields = array(
        array(
            'id'        => $prefix . '_accordion_start',
            'type'      => 'accordion',
            'title'     => $name,
            'position'  => 'start',
        )
    );

    $form_behaviour = array();

    // This will allow us to override deafult optin behaviour on posts and pages
    if (strpos($prefix, 'specific_') !== false) {
        $fields = array_merge($fields, array(
            array(
                'id'        => $prefix . '_form_behaviour',
                'type'      => 'switch',
                'title'     => $name . ' ' . _x('Optin Behaviour', 'Optin Forms', 'op3_smart'),
                'desc'      => _x('Default will use settings set in Theme Options, and custom will set options only for this post.', 'Optin Forms', 'op3_smart'),
                'on'        => _x('Default', 'op3_smart'),
                'off'       => _x('Custom', 'op3_smart'),
                'default'   => true,
            )
        ));
        $form_behaviour = array($prefix . '_form_behaviour', 'equals', false);
    }

    $fields = array_merge($fields, array(
        array(
            'id'        => $prefix . '_form_enabled',
            'type'      => 'switch',
            'title'     => sprintf(_x('Enable %s Optin', 'Optin Forms', 'op3_smart'), $name),
            'on'        => _x('Enable', 'op3_smart'),
            'off'       => _x('Disable', 'op3_smart'),
            'default'   => $defaults === true ? true : false,
            'required'  => $form_behaviour
        )
    ));

    /**
     * Integration settings
     */
    // $integration_settings = opOptinFormSettingsFields(true, $prefix);
    // foreach ($integration_settings as $key => $value) {
    //     array_push($fields, $value);
    // }

    /**
     * Inline (NOT in poppup)
     */
    $op_options = get_option('op_options');
    $integrations_nr = isset($op_options['integrations_number']) ? $op_options['integrations_number'] : 0;
    $integrations_array = array();

    for ($j = 1; $j <= $integrations_nr; $j++) {
        $id = (isset($op_options['integration_settings_integration_id_' . $j])) ? $op_options['integration_settings_integration_id_' . $j] : $j;
        $name = (isset($op_options['integration_settings_integration_name_' . $j])) ? $op_options['integration_settings_integration_name_' . $j] : 'Integration #' . $j;
        $integrations_array[$id] = $name;
    }

    // This description is initially hidden and shown via JS
    // when there are not properly configured integrations
    $integrations_desc = _x('Please configure at least one Integration in "Integration Settings" submenu to use Optin Forms.', 'Optin Forms', 'op3_smart');

    $fields = array_merge($fields, array(
        array(
            'id'        => $prefix . '_integration',
            'type'      => 'select',
            'title'     => _x('Integration', 'Optin Forms', 'op3_smart'),
            'subtitle'  => _x('Select the integration defined in Integration Settings submenu.', 'Optin Forms', 'op3_smart'),
            // 'desc'      => _x('Please note that you will have to refresh the page if you added new integrations, or changed integration\'s name.', 'Optin Forms', 'op3_smart'),
            'desc'      => $integrations_desc,
            'class'     => 'op-integration-select',
            'options'   => $integrations_array,
            'default'   => $defaults === true ? 1 : '',
            'required'  => array(
                array($prefix . '_form_enabled', 'equals', true),
            ),
        ),
        array(
            'id'        => $prefix . '_style',
            'type'      => 'select',
            'title'     => _x('Optin Style', 'Optin Forms', 'op3_smart'),
            'options'   => array('light' => 'Light', 'dark' => 'Dark'),
            'default'   => 'light',
            'required'  => array(
                array($prefix . '_form_enabled', 'equals', true),
            ),
        ),
        array(
            'id'        => $prefix . '_headline',
            'type'      => 'text',
            'title'     => _x('Form Headline', 'Optin Forms', 'op3_smart'),
            'default'   => "Launch your first blog with our new OptimizePress SmartTheme",
            'required'  => array(
                array($prefix . '_form_enabled', 'equals', true),
                // array(false, 'equals', true)
                // array($prefix . '_form_in_popup', 'equals', false),
            )
        )
    ));

    if (!isset($disabled_fields['subheadline'])) {
        $fields = array_merge($fields, array(
            array(
                'id'        => $prefix . '_subheadline',
                'type'      => 'text',
                'title'     => _x('Form SubHeadline', 'Optin Forms', 'op3_smart'),
                'default'   => "Beautiful theme for marketers, powered by OptimizePress.",
                'required'  => array(
                    array($prefix . '_form_enabled', 'equals', true),
                    // array($prefix . '_form_in_popup', 'equals', false),
                )
            )
        ));
    }

    if (!isset($disabled_fields['image'])) {
        $fields = array_merge($fields, array(
            array(
                'id'        => $prefix . '_image',
                'type'      => 'media',
                'title'     => _x('Image', 'Optin Forms', 'op3_smart'),
                // 'default'   => "Beautiful theme for marketers, powered by OptimizePress.",
                // 'default'   => $defaults === true ? 1 : '',
                'default'   => array(
                    'url'   => get_template_directory_uri() . '/images/social-media-cover.png',
                ),
                'required'  => array(
                    array($prefix . '_form_enabled', 'equals', true),
                )
            )
        ));
    }

    $fields = array_merge($fields, array(
        array(
            'id'        => $prefix . '_submit_button_text',
            'type'      => 'text',
            'title'     => _x('Form Submit Button Text', 'Optin Forms', 'op3_smart'),
            'default'   => "Let's Start",
            'required'  => array(
                array($prefix . '_form_enabled', 'equals', true),
                array($prefix . '_form_in_popup', 'equals', false),
            )
        ),
        array(
            'id'            => $prefix . '_submit_button_text_color',
            'type'          => 'color',
            'title'         => _x('Form Submit Button Text Colour', 'Optin Forms', 'op3_smart'),
            'default'       => '#FFFFFF',
            'transparent'   => false,
            'required'      => array(
                array($prefix . '_form_enabled', 'equals', true),
                array($prefix . '_form_in_popup', 'equals', false),
                // array('homepage_' . $slug . '_form_in_popup', 'equals', false),
            )
        ),
        array(
            'id'            => $prefix . '_submit_button_background_color',
            'type'          => 'color',
            'title'         => _x('Form Submit Button Background Colour', 'Optin Forms', 'op3_smart'),
            'default'       => '#276CF2',
            'transparent'   => false,
            'required'      => array(
                array($prefix . '_form_enabled', 'equals', true),
                array($prefix . '_form_in_popup', 'equals', false),
                // array($prefix . '_form_in_popup', 'equals', false),
            )
        ),
        array(
            'id'            => $prefix . '_submit_button_hover_background_color',
            'type'          => 'color',
            'title'         => _x('Form Submit Button Hover Background Colour', 'Optin Forms', 'op3_smart'),
            'default'       => '#0054cc',
            'transparent'   => false,
            'required'      => array(
                array($prefix . '_form_enabled', 'equals', true),
                array($prefix . '_form_in_popup', 'equals', false),
                // array($prefix . '_form_in_popup', 'equals', false),
            )
        )
    ));

    if (!isset($disabled_fields['privacy_text'])) {
        $fields = array_merge($fields, array(
            array(
                'id'        => $prefix . '_privacy_text',
                'type'      => 'text',
                'title'     => _x('Form Privacy Text', 'Optin Forms', 'op3_smart'),
                'default'   => "100% Privacy Guaranteed. We will never share your information.",
                'required'  => array(
                    array($prefix . '_form_enabled', 'equals', true),
                    array($prefix . '_form_in_popup', 'equals', false),
                )
            )
        ));
    }


    /**
     * In Poppup Fields
     */
    $fields = array_merge($fields, array(
        array(
            'id'        => $prefix . '_form_in_popup',
            'type'      => 'switch',
            'title'     => _x('Show Form in Lightbox / Popup Optin', 'Optin Forms', 'op3_smart'),
            'on'        => _x('Yes', 'op3_smart'),
            'off'       => _x('No', 'op3_smart'),
            'default'   => $prefix === 'homepage_before_footer' ? true : false,
            'required'  => array($prefix . '_form_enabled', 'equals', true),
        ),
        array(
            'id'        => $prefix . '_trigger_button_text',
            'type'      => 'text',
            'title'     => _x('Trigger Button Text', 'Optin Forms', 'op3_smart'),
            'default'   => "Let's Start",
            'required'  => array(
                array($prefix . '_form_enabled', 'equals', true),
                array($prefix . '_form_in_popup', 'equals', true),
            )
        ),
        array(
            'id'            => $prefix . '_trigger_button_text_color',
            'type'          => 'color',
            'title'         => _x('Trigger Button Text Colour', 'Optin Forms', 'op3_smart'),
            'default'       => '#FFFFFF',
            'transparent'   => false,
            'required'      => array(
                array($prefix . '_form_enabled', 'equals', true),
                array($prefix . '_form_in_popup', 'equals', true),
            )
        ),
        array(
            'id'            => $prefix . '_trigger_button_background_color',
            'type'          => 'color',
            'title'         => _x('Trigger Button Background Colour', 'Optin Forms', 'op3_smart'),
            'default'       => '#276CF2',
            'transparent'   => false,
            'required'      => array(
                array($prefix . '_form_enabled', 'equals', true),
                array($prefix . '_form_in_popup', 'equals', true),
            )
        ),
        array(
            'id'            => $prefix . '_trigger_button_hover_background_color',
            'type'          => 'color',
            'title'         => _x('Trigger Button Hover Background Colour', 'Optin Forms', 'op3_smart'),
            'default'       => '#0054cc',
            'transparent'   => false,
            'required'      => array(
                array($prefix . '_form_enabled', 'equals', true),
                array($prefix . '_form_in_popup', 'equals', true),
                // array($prefix . '_form_in_popup', 'equals', false),
            )
        ),
        array(
            'id'        => $prefix . '_lightbox_headline',
            'type'      => 'text',
            'title'     => _x('Lightbox Form Headline', 'Optin Forms', 'op3_smart'),
            'default'   => "Launch your first blog with our new OptimizePress SmartTheme",
            'required'  => array(
                array($prefix . '_form_enabled', 'equals', true),
                array($prefix . '_form_in_popup', 'equals', true),
            )
        ),
        array(
            'id'        => $prefix . '_lightbox_subheadline',
            'type'      => 'text',
            'title'     => _x('Lightbox Form SubHeadline', 'Optin Forms', 'op3_smart'),
            'default'   => "Beautiful theme for marketers, powered by OptimizePress. Working with SmartTheme is a pleasure. Creating converting landing pages, sales pages and membership portals with OptimizePress is a breeze.",
            'required'  => array(
                array($prefix . '_form_enabled', 'equals', true),
                array($prefix . '_form_in_popup', 'equals', true),
            )
        ),
        array(
            'id'        => $prefix . '_lightbox_submit_button_text',
            'type'      => 'text',
            'title'     => _x('Lightbox Form Submit Button Text', 'Optin Forms', 'op3_smart'),
            'default'   => "Let's Start",
            'required'  => array(
                array($prefix . '_form_enabled', 'equals', true),
                array($prefix . '_form_in_popup', 'equals', true),
            )
        ),
        array(
            'id'            => $prefix . '_lightbox_submit_button_text_color',
            'type'          => 'color',
            'title'         => _x('Lightbox Form Submit Button Text Colour', 'Optin Forms', 'op3_smart'),
            'default'       => '#FFFFFF',
            'transparent'   => false,
            'required'      => array(
                array($prefix . '_form_enabled', 'equals', true),
                array($prefix . '_form_in_popup', 'equals', true),
            )
        ),
        array(
            'id'            => $prefix . '_lightbox_submit_button_background_color',
            'type'          => 'color',
            'title'         => _x('Lightbox Form Submit Button Background Colour', 'Optin Forms', 'op3_smart'),
            'default'       => '#276CF2',
            'transparent'   => false,
            'required'      => array(
                array($prefix . '_form_enabled', 'equals', true),
                array($prefix . '_form_in_popup', 'equals', true),
            )
        ),
        array(
            'id'            => $prefix . '_lightbox_submit_button_hover_background_color',
            'type'          => 'color',
            'title'         => _x('Lightbox Form Submit Button Hover Background Colour', 'Optin Forms', 'op3_smart'),
            'default'       => '#0054cc',
            'transparent'   => false,
            'required'      => array(
                array($prefix . '_form_enabled', 'equals', true),
                array($prefix . '_form_in_popup', 'equals', true),
                // array($prefix . '_form_in_popup', 'equals', false),
            )
        ),
        array(
            'id'        => $prefix . '_lightbox_privacy_text',
            'type'      => 'text',
            'title'     => _x('Lightbox Form Privacy Text', 'Optin Forms', 'op3_smart'),
            'default'   => "100% Privacy Guaranteed. We will never share your information.",
            'required'  => array(
                array($prefix . '_form_enabled', 'equals', true),
                array($prefix . '_form_in_popup', 'equals', true),
            )
        ),
    ));


    $fields = array_merge($fields, array(
        array(
            'id'        => $prefix . '_accordion_end',
            'type'      => 'accordion',
            'position'  => 'end',
        )
    ));

    return $fields;
}

/**
 *  Overriding Reudux backend templates
 *
 * @param $value
 * @return string
 */
function op_redux_override_panels($value)
{
    $value = OP3_SMART_THEME_DIR . 'template-parts/redux_panels/';

    return $value;
}

add_filter('redux/op_options/panel/templates_path', 'op_redux_override_panels', 100);
