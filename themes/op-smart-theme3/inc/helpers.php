<?php
/**
 * Helper functions for this theme.
 *
 * @package smart
 */

/**
 * Return first post category name. To be used in the loop.
 *
 * @return string
 */
function op_get_first_category_name()
{
    $category = get_the_category();

    // Uncategorized posts won't have any category
    if (count($category)) {
        return $category[0]->cat_name;
    }
}

/**
 * Return first post category url. To be used in the loop.
 *
 * @return string
 */
function op_get_first_category_url()
{
    $category = get_the_category();

    // Uncategorized posts won't have any category
    if (count($category)) {
        return get_category_link($category[0]->cat_ID);
    }
}


/**
 * Render custom script.
 *
 * @param  string  $location
 * @param  boolean $shortcode
 * @param  string  $before
 * @param  string  $after
 */
function op_render_redux_custom_script($location, $shortcode = true, $before = '', $after= '')
{
    global $op_options;

    if (isset($op_options['custom_script']) && isset($op_options['custom_script']['location'])
    && is_array($op_options['custom_script']['location']) && count($op_options['custom_script']['location']) > 0) {
        foreach ($op_options['custom_script']['location'] as $index => $value) {
            if ($value === $location) {
                if ($shortcode) {
                    echo $before . do_shortcode($op_options['custom_script']['script'][$index]) . $after;
                } else {
                    echo $before . $op_options['custom_script']['script'][$index] . $after;
                }
            }
        }
    }
}

/**
 * Create CSS with gradient code.
 *
 * @param  string $from
 * @param  string $to
 * @return string
 */
function op_render_css_gradient($from, $to)
{
    if (!empty($from) && !empty($to)) {
        return "background-color: $from;
                background-image: -moz-linear-gradient(top, $from 0%, $to 100%);
                background-image: -webkit-linear-gradient(top, $from 0%, $to 100%);
                background-image: linear-gradient(to bottom, $from 0%, $to 100%);
                filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='$from', endColorstr='$to', GradientType=0);";
    }

    if (!empty($from)) {
        return "background-image: none; background-color: $from;";
    }

    if (!empty($to)) {
        return "background-image: none; background-color: $to;";
    }

    return '';
}

/**
 * Return string with valid CSS based on give array of identifiers and rules.
 *
 * @param  array $rules
 * @return string
 */
function op_render_css_rules($rules)
{
    $output = '';

    if (count($rules)) {
        foreach ($rules as $identifier => $rule) {
            $output .= "$identifier {";

            if (is_array($rule)) {
                $output .= implode(' ', $rule);
            } else {
                $output .= $rule;
            }

            $output .= "}";
        }
    }

    return $output;
}

/**
 * Return parsed file name from URL.
 * Redux "select_image" field has a URL value and not the key (as one might think) so we need to parse out the name to use it in markup.
 *
 * @param  string $url
 * @return string
 */
function op_redux_parse_name_from_select_image($url)
{
    $name = explode(".", $url);
    $name = str_replace('.' . end($name), '', $url);

    return basename($name);
}

/**
 * Return correct redux options template name for current WP template.
 *
 * @return string
 */
function op_get_template_type()
{
    if (is_post_type_archive('post') || is_category()) {
        return 'blog_archive';
    } else if (is_singular('post')) {
        return 'blog_post';
    } else if (is_search()) {
        return 'search_results';
    } else if (is_post_type_archive('product') || is_tax('product_cat')) {
        return 'product_archive';
    } else if (is_singular('product')) {
        return 'product';
    } else if (is_page()) {
        return 'page';
    }

    return 'blog_archive';
}

/**
 * Return selected header template name.
 *
 * @return string
 */
function op_get_header_template()
{
    global $op_options;

    // images are named with 'header-' prefix, so we're removing it here
    $header_template = str_replace('header-', '', op_redux_parse_name_from_select_image($op_options['header_style']));

    // In case no template is selected, we just use the default one
    // (this is necessary because there is a bug in redux
    // framework 3.6.6.2 that causes default value of
    // image_field to not be properly set
    // upon theme activation)
    return !empty($header_template) ? $header_template : 'basic';
}

/**
 * Return selected homepage template name.
 *
 * @return string
 */
function op_get_homepage_template()
{
    global $op_options;

    return isset($op_options['homepage_layout']) ? $op_options['homepage_layout'] : 'list';
}

/**
 * Return selected homepage sidebar name.
 *
 * @return string
 */
function op_get_homepage_sidebar()
{
    global $op_options;

    return isset($op_options['homepage_sidebar']) ? $op_options['homepage_sidebar'] : 'no_sidebar';
}


/**
 * Return selected archive template name.
 * @return string
 */
function op_get_archive_template()
{
    global $op_options;

    return isset($op_options['blog_archive_layout']) ? $op_options['blog_archive_layout'] : 'list';
}

/**
 * Return selected homepage sidebar name.
 *
 * @return string
 */
function op_get_archive_sidebar()
{
    global $op_options;

    return isset($op_options['blog_archive_sidebar']) ? $op_options['blog_archive_sidebar'] : 'no_sidebar';
}

/**
 * Return comment form arguments. Added author, email and URL fields as well.
 *
 * @return array
 */
function op_get_comment_form_args()
{
    $required       = get_option('require_name_email');
    $commenter      = wp_get_current_commenter();
    $currentUser    = wp_get_current_user();

    $requiredAnnotation = $ariaRequiredText = '';

    if ($required) {
        $ariaRequiredText   = ' aria-required="true"';
        $requiredAnnotation = ' *';
    }

    $fields =  array(
        'author' =>
            '<p class="comment-form-author form-input-container"> ' .
            '<input id="author" name="author" type="text" required="required" placeholder="' . esc_attr_x('Name', 'Comment form placeholder', 'op3_smart') . $requiredAnnotation . '" class="form-control" value="' . esc_attr($commenter['comment_author']) .
            '" size="22"' . $ariaRequiredText . ' /></p>',
        'email' =>
            '<p class="comment-form-email form-input-container">' .
            '<input id="email" name="email" type="email" required="required" placeholder="' . esc_attr_x('Email', 'Comment form placeholder', 'op3_smart') . $requiredAnnotation . '" class="form-control" value="' . esc_attr($commenter['comment_author_email']) .
            '" size="30"' . $ariaRequiredText . ' /></p>',
        'url' =>
            '<p class="comment-form-url form-input-container">' .
            '<input id="url" name="url" type="text" placeholder="' . esc_attr_x('URL', 'Comment form placeholder', 'op3_smart') . '" class="form-control" value="' . esc_attr($commenter['comment_author_url']) .
            '" size="30" /></p>',
    );


    return array(
        'id_form'             => 'commentform',
        'id_submit'           => 'submit',
        'class_submit'        => 'btn btn-primary',
        'name_submit'         => 'submit',
        'title_reply'         => _x('Leave a Reply', 'Comment form', 'op3_smart'),
        'title_reply_to'      => _x('Leave a Reply to %s', 'Comment form', 'op3_smart'),
        'cancel_reply_link'   => _x('Cancel Reply', 'Comment form', 'op3_smart'),
        'label_submit'        => _x('Post Comment', 'Comment form', 'op3_smart'),
        'comment_notes_after' => ' ',
        'format'              => 'xhtml',
        'comment_field'       =>  '<p><textarea id="comment" name="comment" cols="50" rows="8" class="form-control" placeholder="Comment *"></textarea></p>',
        'must_log_in'         => '<p class="must-log-in">' . sprintf(_x('You must be <a href="%s">logged in</a> to post a comment.', 'Comment form', 'op3_smart'), wp_login_url(apply_filters('the_permalink', get_permalink()))) . '</p>',
        'logged_in_as'        => '<p class="logged-in-as">' . sprintf(_x('Logged in as <a href="%1$s">%2$s</a>. <a href="%3$s" title="Log out of this account">Log out?</a>', 'Comment form', 'op3_smart'), admin_url('profile.php'), $currentUser->user_login, wp_logout_url(apply_filters('the_permalink', get_permalink()))) . '</p>',
        'comment_notes_before' => '<p class="comment-notes">' . _x('Your email address will not be published.', 'Comment form', 'op3_smart') . '</p>',
        /*
        'comment_notes_after' => '<p class="form-allowed-tags">' . sprintf(_x('You may use these <abbr title="HyperText Markup Language">HTML</abbr> tags and attributes: %s', 'Comment Form', 'op3_smart'),' <code>' . allowed_tags() . '</code>') . '</p>',
        */
        'fields'              => apply_filters('comment_form_default_fields', $fields),
    );
}

/**
 * Return popup invocation script for "onClick" event.
 *
 * @param  string $url
 * @return string
 */
function op_popup_location($url)
{
    // return "window.open('" . $url . "','sharer','toolbar=0,status=0,width=548,height=325');";
    return $url;
}

/**
 * Returns integration option specified by provider.
 * If option isn't hardcoded by provider
 * it returns false
 *
 * This is identical to settings defined in
 * OptimizePress signup_form.php
 *
 * @param  string $provider
 * @param  string $option
 * @return string / false
 */
function get_provider_option($provider, $option)
{
    switch($provider) {
        case 'arpreach':
        case 'aweber':
        case 'mailchimp':
        case 'mailpoet':
        case 'icontact':
        case 'getresponse':
        case 'campaignmonitor':
        case 'campaignrefinery':
        case 'constantcontact':
        case 'convertkit':
        case 'activecampaign':
        case 'officeautopilot':
        case 'ontraport':
        case 'emma':
        case 'egoi':
        case 'maropost':
        case 'sendlane':
            if ($option === 'method') {
                return 'POST';
            }
            break;
        case 'infusionsoft':
            if ($option === 'email') {
                return 'inf_field_Email';
            }
            break;
    }

    return false;
}

/**
 * Get Integration Option. Returns
 * a specific integration option
 * from $op_options object
 *
 * @param  string $option
 * @return string
 */
function gio($option)
{
    global $op_options;
    global $current_prefix;

    $integration_nr = $op_options[$current_prefix . 'integration'];
    $key = 'op3_integration_settings_' . $option . '_' . $integration_nr;
    $provider = $op_options['op3_integration_settings_integration_type_' . $integration_nr];

    /**
     * Some options are fixed by provider and not
     * configurable, so we force them here
     */
    $provider_option = get_provider_option($provider, $option);
    if ($provider_option !== false) {
        return $provider_option;
    }

    // Replace [ with &#91; and ] with &#93; to avoid problems with do_shortcode
    return isset($op_options[$key]) ? op_escape_brackets($op_options[$key]) : '';
}

/**
 * Return OP 3 optin form based on optin form settings.
 *
 * @param  string $prefix
 * @return string
 */
$current_prefix = '';
$current_integration_id = '';
function op3_generate_optin_form($prefix = '', $position = '')
{
    global $op_options;
    global $current_prefix;
    global $current_integration_id;
    $current_prefix = '';
    $lightbox_prefix = '';

    // This check is here in case somebody creates
    // some optin forms, enables them, then
    // turns of the OptimizePress Dashboard plugin
    if (!defined('OPD_VERSION')) {
        return;
    }

    // Make sure that prefix ends with "_" (underscore)
    if (!empty($prefix)) {
        $prefix = rtrim($prefix, '_') . '_';
        $current_prefix = $prefix;
    }

    if ((is_page() || is_single()) && $position !== 'widget') {
        $specific_prefix = str_replace('page_', 'specific_', $prefix);
        $specific_prefix = str_replace('single_', 'specific_', $specific_prefix);
        $specific_prefix = rtrim($specific_prefix, '_') . '_';

        if (isset($op_options[$specific_prefix . 'form_behaviour']) && (int)$op_options[$specific_prefix . 'form_behaviour'] === 0) {
            $prefix = $specific_prefix;
            $prefix = rtrim($prefix, '_') . '_';
            $current_prefix = $prefix;
        }

        // If custom optin behaviour is selected, and
        // optin set to off, don't go any further
        if ((isset($op_options[$specific_prefix . 'form_behaviour']) && (int)$op_options[$specific_prefix . 'form_behaviour'] === 0)
            && (isset($op_options[$specific_prefix . 'form_enabled']) && !($op_options[$specific_prefix . 'form_enabled']))) {
            return;
        }

    }

    // If current option is disabled,
    // don't go any further
    if (!isset($op_options[$prefix . 'form_enabled'])
        || (int)$op_options[$prefix . 'form_enabled'] === 0) {
        return;
    }

    // Render the optin only if integration is actually selected
    if (empty($op_options[$prefix . 'integration'])) {
        return;
    }

    // On homepage, if hero is turned off,
    // we don't want to show after hero
    // optin in any case
    if (is_home() && $prefix === 'homepage_after_hero_' && (int)$op_options['homepage_hero_enabled'] !== 1) {
        return;
    }

    $is_integration_set = true;
    $current_integration_id = $op_options[$prefix . 'integration'];
    $integration_type = gio('integration_type');

    // If integration is not properly
    // set, don't render the form
    switch ($integration_type) {
        case 'email':
            $email = gio('email_address');
            if (empty($email)) {
                $is_integration_set = false;
            }
            break;

        case 'custom':
        case 'oneshoppingcart':
            $html = gio('html');
            $email = gio('email');
            if (empty($html) || empty($email)) {
                $is_integration_set = false;
            }
            break;

        case 'arpreach':
            $autoresponder = gio('autoresponder_name');
            if (empty($autoresponder)) {
                $is_integration_set = false;
            }
            break;

        default:
            $list = gio('list');
            if (empty($integration_type) || empty($list)) {
                $is_integration_set = false;
            }
            break;
    }

    // Stop here if integration is not set
    if (!$is_integration_set) {
        return false;
    }

    // Normalize data
    if ($integration_type === 'arpreach') {
        // $op_options[iss('list')] = gio('autoresponder_name');
        $key = 'op3_integration_settings_list_' . $op_options[$current_prefix . 'integration'];
        $op_options[$key] = gio('autoresponder_name');
    }

    if ((int)$op_options[$prefix . 'form_in_popup'] === 1) {
        $lightbox_prefix = 'lightbox_';
    }

    // OptimizeMember
    /*if (gio('opm_integration') !== '') {
        $output .= ' opm_integration="' . op_checkbox_to_yorn(gio('opm_integration')) . '"';
        $output .= ' opm_level="' . gio('opm_level') . '"';
        $output .= ' opm_packages="' . gio('opm_packages') . '"';
    }*/

    $content = array(
        'id' => uniqid(),
        'headline' => $op_options[$prefix . $lightbox_prefix . 'headline'],
        'position' => $position,
        'prefix' => $current_prefix,
        'theme' => $op_options[$prefix . 'style'],

    );

    if (isset($op_options[$prefix . 'subheadline'])) {
        $content['subheadline'] = $op_options[$prefix . $lightbox_prefix . 'subheadline'];
    }

    if (isset($op_options[$prefix . 'privacy_text'])) {
        $content['privacy_text'] = $op_options[$prefix . $lightbox_prefix . 'privacy_text'];
    }

    if (gio('gdpr_consent') !== 'disabled') {
        if (gio('consent_1_enabled') === 'yes') {
            $content['consent_1_label'] = gio('consent_1_label');
        }
        if (gio('consent_2_enabled') === 'yes') {
            $content['consent_2_label'] = gio('consent_2_label');
        }
    }

    $content['submit_button_text'] = $op_options[$prefix . $lightbox_prefix . 'submit_button_text'];
    $fields = array();

    $fields[gio('email_order')] = '<input type="email" required name="' . ((!gio('email')) ? 'email' : gio('email')) . '" value="" placeholder="' . gio('email_default') . '" />';

    if (op_checkbox_to_yorn(gio('disable_name')) !== 'Y') {
        $required = "";
        if (op_checkbox_to_yorn(gio('name_required')) === 'Y') {
            $required = "required";
        }
        $fields[gio('name_order')] = '<input type="text" name="' . ((!gio('name')) ? 'first_name' : gio('name')) . '" value="" placeholder="' . gio('name_default') . '" ' . $required . ' />';
    }

        // sorting
        ksort($fields);

        // hidden stuff related to integration
        $gdprLocation = gio('gdpr_enabled');
        switch ($gdprLocation) {
            case 'disabled':
                $gdpr_location = "off";
                break;
            case 'eu_only':
                $gdpr_location = "eu";
                break;
            case 'all_visitors':
                $gdpr_location = "all";
                break;
            default:
                $gdpr_location = "off";
                break;
        }
        $hidden = array();
        $hidden['optinIntegration'] = $integration_type;
        $hidden['adminEmail'] = op3_admin_email();
        $hidden['optinList'] = gio('list');
        $hidden['optinTag'] = gio('tag');
        $hidden['redirect'] = gio('thank_you_page');
        $hidden['successMessage'] = gio('success_message');
        $hidden['optinGdprActivate'] = $gdpr_location;
        if ($gdpr_location !== 'off') {
            $hidden['optinGdprConsent1TagConfirmed'] = ($integration_type === 'aweber' ? gio('consent_1_tag_accepted_text') : gio('consent_1_tag_accepted'));
            $hidden['optinGdprConsent1TagDeclined'] = ($integration_type === 'aweber' ? gio('consent_1_tag_declined_text') : gio('consent_1_tag_declined'));
            $hidden['optinGdprConsent1TagNotShown'] = ($integration_type === 'aweber' ? gio('consent_1_tag_not_shown_text') : gio('consent_1_tag_not_shown'));
            $hidden['optinGdprConsent2TagConfirmed'] = ($integration_type === 'aweber' ? gio('consent_2_tag_accepted_text') : gio('consent_2_tag_accepted'));
            $hidden['optinGdprConsent2TagDeclined'] = ($integration_type === 'aweber' ? gio('consent_2_tag_declined_text') : gio('consent_2_tag_declined'));
            $hidden['optinGdprConsent2TagNotShown'] = ($integration_type === 'aweber' ? gio('consent_2_tag_not_shown_text') : gio('consent_2_tag_not_shown'));
            $hidden['optinGdprFieldNote'] = gio('consent_notes_field');
            $hidden['optin-gdpr-field-note'] = gio('consent_notes_field');
            $hidden['optin-button-message'] = $content['submit_button_text'];
            $hidden['optin-gdpr-message-1'] = isset($content['consent_1_label']) ? $content['consent_1_label'] : '';
            $hidden['optin-gdpr-message-2'] = isset($content['consent_2_label']) ? $content['consent_2_label'] : '';
        }

    $output = include(get_stylesheet_directory() . '/inc/optimizetheme_optin_1.php');

    if ((int)$op_options[$prefix . 'form_in_popup'] === 1) {
        return apply_filters('op_optin_form_wrap', $output, $prefix, $position);
    } else {
        echo $output;
    }
}

/**
 * Convert 0 and 1 to Y or N needed for OP.
 *
 * @param  string $value
 * @return string
 */
function op_checkbox_to_yorn($value)
{
    if (!empty($value) && (int)$value === 1) {
        return 'Y';
    } else {
        return 'N';
    }
}

/**
 * Check if homepage optin is enabled.
 *
 * @return boolean
 */
function op_is_homepage_optin_enabled()
{
    global $op_options;

    if ((int) $op_options['homepage_optin_enabled'] === 1) {
        return true;
    } else {
        return false;
    }
}

/**
 * Get's even shorter excerpt
 *
 * @param null $post_id
 * @return string
 */

function op_short_excerpt($post_id = null)
{
    global $post;
    if (! empty($post_id)) {
        $save_post = $post;
        $post = get_post($post_id);
        setup_postdata($post);

        if ( ! empty( $post->post_excerpt ) ) {
            echo $post->post_excerpt;
        } else {
            $the_excerpt = get_the_proper_excerpt($post);

            echo $the_excerpt;
        }

        $post = $save_post;
        setup_postdata($post);
    } else {
        if ( ! empty( $post->post_excerpt ) ) {
            // if !empty excerpt
            echo $post->post_excerpt;
        } else {
            $the_excerpt = get_the_proper_excerpt($post);

            echo $the_excerpt;
        }
    }
}

/**
 * @param $post
 * @return string
 */
function get_the_proper_excerpt($post) {
    $the_excerpt    = strip_tags( strip_shortcodes( $post->post_content ) ); // Strips tags and shortcodes
    $excerpt_length = 30; // Sets excerpt length by word count, default in WP is 55
    $words          = explode( ' ', $the_excerpt, $excerpt_length + 1 );

    if ( count( $words ) > $excerpt_length ) {
        array_pop( $words );
        $the_excerpt = implode( ' ', $words ); // put in excerpt only the number of word that is set in $excerpt_length
    }

    return $the_excerpt;
}

function op_small_category_link()
{
    ?>
        <div class="op-small-category-link"><?php the_category('</div> <div class="op-small-category-link">') ?></div>
    <?php
}

function op_featured_image_url($thumb_id)
{
    $thumb_url_array = wp_get_attachment_image_src($thumb_id, 'full', false);
    $thumb_url = $thumb_url_array[0];
    return $thumb_url;
}

/**
 * Checks if current page is WooCommerce
 * @return boolean
 */
function is_woo()
{
    if (class_exists('WooCommerce')) {
        return is_woocommerce() || is_cart() || is_checkout();
    } else {
        return false;
    }
}

/**
 * Checks if current page is LiveEditor page or LiveEditor
 * @return boolean
 */
function is_op_page()
{
    if ((function_exists('is_le_page') && is_le_page()) || defined('OP_LIVEEDITOR')) {
        return true;
    }

    return false;
}

/**
 * Checks if infinite scroll is enabled.
 * If jetpack is not active, this
 * function will return false
 *
 * @return boolean
 */
function is_infinite_scroll_enabled()
{
    global $op_options;

    if (!class_exists('Jetpack') || !Jetpack::is_module_active('infinite-scroll')) {
        return false;
    }

    if (!isset($op_options['blog_infinite_scroll']) || (int) $op_options['blog_infinite_scroll'] !== 1) {
        return false;
    }

    return true;
}

/**
 * Helper function that encodes [] into html entities
 *
 * @param $string
 * @return string
 */
function op_escape_brackets($string)
{
    return str_replace(array('[', ']'), array('&#091;', '&#093;'), $string);
}

/**
 * Helper function that decodes html entities into []
 *
 * @param $string
 * @return string
 */
function op_unescape_brackets($string)
{
    return str_replace(array('&#091;', '&#093;'), array('[', ']'), $string);
}