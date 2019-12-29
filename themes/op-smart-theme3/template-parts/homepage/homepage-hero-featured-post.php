<?php

/**
 * Template part for displaying homepage hero standard section
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package smart
 */

global $op_options;
$recent_post = false;
Redux::init( 'OPT_NAME' );
$tag = 0;
$category = 0;
$object_id = get_queried_object_id();

if ($op_options['homepage_hero_featured_post'] === 'most_recent_category') {
    $category = $op_options['homepage_hero_category'];
}

if ($op_options['homepage_hero_featured_post'] === 'most_recent_tag') {
    $tag = $op_options['homepage_hero_tag'];
}

$sticky = false;
$sticky_empty = false;
if ($op_options['homepage_hero_featured_post'] === 'most_recent_sticky') {
    $sticky = get_option('sticky_posts');
    rsort($sticky);

    if (empty($sticky)) {
        $sticky_empty = true;

        // If there's no sticky post don't show homepage hero.
        // We also want to set the option to 0, so that
        // after-hero optin is not shown
        $op_options['homepage_hero_enabled'] = 0;
    }
}

$args = array(
    'numberposts' => 1,
    'category' => $category,
    'tag_id' => $tag,
    'orderby' => 'post_date',
    'order' => 'DESC',
    'post_type' => 'post',
    'post_status' => 'publish',
    'suppress_filters' => true,
    'post__in'  => $sticky,
);

if (!$sticky_empty) {
    $recent_post = wp_get_recent_posts( $args );
    if (!empty($recent_post) && is_array($recent_post[0])) {
        $recent_post = $recent_post[0];
        $object_id = $recent_post['ID'];
    }
}

/**
 * Settings for Featured Post when Hero Background Behaviour is set to Default
 */
if ($op_options['homepage_hero_design'] == 'featured-post' && (int) $op_options['homepage_hero_background_behaviour'] === 1 && !empty($object_id)) {

    $post_options = redux_post_meta('op_options', $object_id);
    $post_img = $post_options['post_header_background_image'];
    $additional_styles = '';

    // If options are NOT overriden on Edit Post screen
    if ((int) $post_options['single_featured_image_override'] === 1) {

        // Use featured post image as hero
        if ((int) $op_options['sitewide_post_featured_image_as_hero'] === 1) {

            if (has_post_thumbnail($recent_post['ID'])) {
                $post_thumbnail_id = get_post_thumbnail_id($recent_post['ID']);
                $post_img = wp_get_attachment_image_src($post_thumbnail_id, 'full');
                $post_img['background-image'] = $post_img[0];
                $post_img = array_merge($post_img, $op_options['sitewide_post_header_background_image_positioning']);
            }

        } else {

            // Use uploaded image to this post Hero Background section
            $post_img = array_merge($post_img, $op_options['sitewide_post_header_background_image']);

        }

        if (!empty($post_img['background-image'])) {
            $post_img['overlay'] = $op_options['sitewide_post_header_background_overlay'];
        }

    } else {

        /**
         * If options are overriden on Edit Post screen
         */

        if (isset($post_options['post_header_background_color'])) {

            $header_bg = $post_options['post_header_background_color'];

            if (isset($header_bg['from']) && isset($header_bg['to'])) {
                $additional_styles .= ' .op-homepage-hero-area { ';
                    $additional_styles .= op_render_css_gradient($header_bg['from'],  $header_bg['to']);
                $additional_styles .= ' }';
            }
        }

        if ((int) $post_options['single_featured_image_as_hero'] === 1) {

            if (has_post_thumbnail()) {
                $post_thumbnail_id = get_post_thumbnail_id($recent_post['ID']);
                $post_img = wp_get_attachment_image_src($post_thumbnail_id, 'full');
                $post_img['background-image'] = $post_img[0];
                $post_img = array_merge($post_img, $post_options['post_header_background_image_positioning']);
            }

        } else {
            $post_img = array_merge($post_img, $post_options['post_header_background_image']);
        }

        $post_img['overlay'] = $post_options['post_header_background_overlay'];

    }

    if (isset($post_img) && !empty($post_img['background-image'])) {

        $additional_styles .= '.op-homepage-hero { ';
            if (!empty($post_img['background-image'])) {
                $additional_styles .= 'background-image: url("' . $post_img['background-image'] . '"); ';
            }

            if (!empty($post_img['background-repeat'])) {
                $additional_styles .= 'background-repeat: ' . $post_img['background-repeat'] . '; ';
            }

            if (!empty($post_img['background-size'])) {
                $additional_styles .= 'background-size: ' . $post_img['background-size'] . '; ';
            }

            if (!empty($post_img['background-attachment'])) {
                $additional_styles .= 'background-attachment: ' . $post_img['background-attachment'] . '; ';
            }

            if (!empty($post_img['background-position'])) {
                $additional_styles .= 'background-position: ' . $post_img['background-position'] . '; ';
            }
        $additional_styles .= '} ';

        if (isset($post_img['overlay']['rgba']) && !empty($post_img['overlay']['rgba'])) {
            $additional_styles .= ' .op-homepage-hero-container { ';
                $additional_styles .= 'background-color: ' . $post_img['overlay']['rgba'] . '; ';
            $additional_styles .= '} ';
        }

    }

    if (!empty($additional_styles)) {
        echo '<style>' . $additional_styles . '</style>';
    }

}

if (!empty($recent_post)):
    $hero_alignment = $op_options['homepage_hero_design'] === 'standard' ? 'op-homepage-hero-' . $op_options['homepage_hero_alignment'] : ''; ?>
    <div class="op-hero-area op-homepage-hero-area">
        <header class="op-homepage-hero <?php echo $hero_alignment . ' op-homepage-hero-' . $op_options['homepage_hero_design']; ?>">
            <div class="op-homepage-hero-container">
                <div class="op-homepage-hero-content">
                    <div class="op-homepage-hero-standard-content">
                        <div class="op-homepage-hero-featured-post-content">

                        <?php
                            //$op_options['homepage_hero_post_shown_id'] = $recent_post['ID'];
                            // For some reason this was not shown on templates when Yoast SEO was activated, this is a workaround:
                            $GLOBALS['ops_homepage_hero_post_shown_id'] = $recent_post['ID'];

                            if ((int) $op_options['blog_metadata_options']['categories'] === 1) {
                                $post_categories = get_the_category($recent_post['ID']);

                                if (is_array($post_categories)) {
                                    foreach($post_categories as $post_category) {
                                        if ($post_category->name !== 'Uncategorized') {
                                            echo '<a href="' . get_category_link($post_category->cat_ID)  . '" class="op-homepage-hero-category">' . $post_category->name . '</a>';
                                        }
                                    }
                                }
                            }

                            $permalink = get_permalink($recent_post['ID']);
                            echo '<h1 class="op-homepage-hero-title"><a href="' . $permalink . '">' . $recent_post['post_title'] . '</a></h1>';

                            if (!empty($op_options['homepage_hero_excerpt'])) {
                                echo '<p class="op-homepage-hero-excerpt">';
                                    op_short_excerpt($recent_post['ID']);
                                echo '</p>';
                            }

                            echo '<div class="op-homepage-hero-footer">';

                                if (!empty($op_options['homepage_hero_button_text'])) {
                                    echo '<a class="op-homepage-hero-button op-homepage-hero-button-' . $op_options['homepage_hero_button_style'] .  '" href="' . $permalink . '">' . $op_options['homepage_hero_button_text'] . ' </a>';
                                }

                                echo '<span class="op-homepage-hero-post-info">';
                                    if ((int) $op_options['blog_metadata_options']['date'] === 1) {
                                        echo '<time class="op-homepage-hero-date" datetime="' . get_the_time('Y-m-j h:m', $recent_post['ID']) . '"><span class="glyphicon glyphicon-time"></span>' . get_the_time(get_option('date_format'), $recent_post['ID']) . '</time>';
                                    }

                                    if ((int) $op_options['blog_hide_comments'] === 0) {
                                        echo '<a href="' . get_comments_link($recent_post['ID']) . '" class="op-homepage-hero-comment-count"><span class="glyphicon glyphicon-comment"></span>' . $recent_post['comment_count'] . '</a>';
                                    }

                                    if ((int) $op_options['blog_metadata_options']['author'] === 1) {
                                        $author_id = $recent_post['post_author'];
                                        $author_name = get_the_author_meta('display_name', $author_id);

                                        echo '<a href="' . get_author_posts_url($author_id) . '" class="op-homepage-hero-author">' . get_avatar($author_id, '80', '', $author_name) . '<span class="op-author-by">' . _x('by', 'Content', 'op3_smart') . '</span> <span class="op-upercase">' . $author_name . '<span></a>';
                                    }
                                echo '</span>';

                            echo '</div>'; // .op-homepage-hero-footer
                        ?>

                    </div>
                </div>
            </div>
        </header>
    </div>
<?php endif; ?>
