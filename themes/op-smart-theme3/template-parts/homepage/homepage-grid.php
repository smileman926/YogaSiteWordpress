<?php

/**
 * Template part for displaying homepage grid.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package smart
 */
global $op_options;
global $ops_homepage_hero_post_shown_id;
$infinite_scroll_id = '';
if (is_infinite_scroll_enabled()) {
    $infinite_scroll_id = ' id="infinite-scroll-container"';
}

echo '<div class="row op-content-grid-row"'  . $infinite_scroll_id .'>';

    $sticky_shown = false;
    while (have_posts()) : the_post();

        // We don't want to show shown sticky post again here
        if ((!is_sticky() || $sticky_shown === true) || (int) $op_options['homepage_hero_enabled'] === 1 ) {

            // Don't show this post if it's already shown in homepage hero section
            if (!isset($ops_homepage_hero_post_shown_id) || (int) $ops_homepage_hero_post_shown_id !== get_the_ID()) {
                echo '<div class="'; op_template_grid_item_class(); echo '">';
                    get_template_part('template-parts/loop/content', 'grid');
                echo '</div>';
            }

        } else {
            $sticky_shown = true;
        }

    endwhile;

echo '</div>';
