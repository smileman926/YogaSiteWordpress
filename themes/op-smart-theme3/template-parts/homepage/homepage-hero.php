<?php

/**
 * Template part for displaying homepage hero section
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package smart
 */

global $op_options;

if ((int) $op_options['homepage_hero_enabled'] === 1 && !is_paged()) {

    // homepage-hero-standard or homepage-hero-video or homepage-hero-featured-post
    get_template_part('template-parts/homepage/homepage-hero', $op_options['homepage_hero_design']);

}
