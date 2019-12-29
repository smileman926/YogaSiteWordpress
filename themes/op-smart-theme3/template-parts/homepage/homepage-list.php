<?php

/**
 * Template part for displaying posts in category or archive.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package smart
 */

?>
<div class="row" id="infinite-scroll-container">
<?php
    global $op_options;
    global $ops_homepage_hero_post_shown_id;
    $sticky_shown = false;

    while (have_posts()) : the_post();

        // Show this post only if it's not already shown as sticky post
        if ((!is_sticky() || $sticky_shown === true) || (int) $op_options['homepage_hero_enabled'] === 1 ) {

            // Don't show this post if it's already shown in homepage hero section
            if (!isset($ops_homepage_hero_post_shown_id) || $ops_homepage_hero_post_shown_id !== get_the_ID()) {
                echo '<div class="col-md-12">';
                    get_template_part('template-parts/loop/content', 'list');
                echo '</div>';
            }

        } else {
            $sticky_shown = true;
        }

    endwhile;
?>
</div>
