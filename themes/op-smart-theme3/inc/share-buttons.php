<?php
if (!function_exists('op_share_buttons_single')) {
    /**
     * Prints HTML with meta information for the share buttons.
     */
    function op_share_buttons_single()
    {
        global $op_options;

        // If Facebook option is turned on show respective button
        if ((int) $op_options['social_share_networks']['facebook'] === 1) {
            op_facebook_button();
        }

        // If Twitter option is turned on show respective button
        if ((int) $op_options['social_share_networks']['twitter'] === 1) {
            op_twitter_button();
        }

        // If LinkedIn option is turned on show respective button
        if ((int) $op_options['social_share_networks']['linked_in'] === 1) {
            op_linkedin_button();
        }

        // If Google+ option is turned on show respective button
        /*if ((int) $op_options['social_share_networks']['google_plus'] === 1) {
            op_google_plus_button();
        }*/

        // If Pinterest option is turned on show respective button
        if ((int) $op_options['social_share_networks']['pinterest'] === 1) {
            op_pinterest_button();
        }
    }
}

/**
 * Render Facebook share link which triggers iframe sharing in a popup.
 *
 * @return void
 */
function op_facebook_button()
{
    $args = array(
        'u' => urlencode(get_the_permalink()),
        't' => urlencode(get_the_title()),
    );

    $location = op_popup_location(add_query_arg($args, 'http://www.facebook.com/sharer.php'));

    echo op_share_button($location, 'sm-fb', _x('Share <span class="visuallyhidden">on Facebook</span>', 'Share verb for Facebook', 'op3_smart'));
}

/**
 * Render Twitter share link which triggers iframe sharing in a popup.
 *
 * @return void
 */
function op_twitter_button()
{
    $args = array(
        'url'   => urlencode(get_the_permalink()),
        'text'  => urlencode(get_the_title()),
    );

    $location = op_popup_location(add_query_arg($args, 'https://twitter.com/intent/tweet'));

    echo op_share_button($location, 'sm-tweet', _x('Tweet <span class="visuallyhidden">(Share on Twitter)</span>', 'Share verb for Twitter', 'op3_smart'));
}

/**
 * Render LinkedIn share link which triggers iframe sharing in a popup.
 *
 * @return void
 */
function op_linkedin_button()
{
    $args = array(
        'mini'  => 'true',
        'url'   => urlencode(get_the_permalink()),
        'title' => urlencode(get_the_title()),
    );

    $location = op_popup_location(add_query_arg($args, 'https://www.linkedin.com/shareArticle'));

    echo op_share_button($location, 'sm-ln', _x('Share <span class="visuallyhidden">on Linkedin</span>', 'Share verb for Linkedin', 'op3_smart'));
}

/**
 * Render Google+ share link which triggers iframe sharing in a popup.
 *
 * @return void
 */
function op_google_plus_button()
{
    $args = array(
        'url' => urlencode(get_the_permalink()),
    );

    $location = op_popup_location(add_query_arg($args, 'https://plus.google.com/share'));

    echo op_share_button($location, 'sm-gplus', _x('Share <span class="visuallyhidden">on Google+</span>', 'Share verb for Google+', 'op3_smart'));
}

/**
 * Render Pinterest share link which triggers iframe sharing in a popup.
 *
 * @return void
 */
function op_pinterest_button()
{
    $args = array(
        'url' => urlencode(get_the_permalink()),
        'media' => urlencode(wp_get_attachment_url(get_post_thumbnail_id())),
        'description' => urlencode(get_the_title()),
    );

    $location = op_popup_location(add_query_arg($args, 'https://pinterest.com/pin/create/button'));

    echo op_share_button($location, 'sm-pint', _x('Pin it <span class="visuallyhidden">(Share on Pinterest)</span>', 'Share verb for Pinterest', 'op3_smart'));
}

/**
 * Return share button link.
 *
 * @param  string $location
 * @param  string $class
 * @param  string $label
 * @return void
 */
function op_share_button($location, $class, $label)
{
    return '<a href="' . $location . '" class="sm-item sm-item-share ' . $class . '" target="_blank" rel="noopener">&nbsp;<span class="sm-label">' . $label . '</span></a>';
}

/**
 * Render non-empty social profiles.
 */
function op_social_profiles()
{
    global $op_options;

    if (!empty($op_options['social_profile_facebook'])) {
        echo op_social_profile_button($op_options['social_profile_facebook'], 'sm-fb', 'Facebook Profile');
    }

    if (!empty($op_options['social_profile_twitter'])) {
        echo op_social_profile_button($op_options['social_profile_twitter'], 'sm-tweet', 'Twitter Profile');
    }

    if (!empty($op_options['social_profile_linked_in'])) {
        echo op_social_profile_button($op_options['social_profile_linked_in'], 'sm-ln', 'Linkedin Profile');
    }

    /* if (!empty($op_options['social_profile_google_plus'])) {
        echo op_social_profile_button($op_options['social_profile_google_plus'], 'sm-gplus', 'Google+ Profile');
    } */

    if (!empty($op_options['social_profile_pinterest'])) {
        echo op_social_profile_button($op_options['social_profile_pinterest'], 'sm-pint', 'Pinterest Profile');
    }
}

/**
 * Return social profile link.
 *
 * @param  string $link
 * @param  string $class
 * @return string
 */
function op_social_profile_button($link, $class, $text)
{
    return
        '<a href="' . esc_url($link) . '" target="_blank" rel="noopener" class="sm-item ' . $class . '">'
            . '<span class="visuallyhidden">' . $text . '</span>'
        . '</a>';
}
