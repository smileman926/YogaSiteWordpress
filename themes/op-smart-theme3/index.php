<?php
/**
 * The main template file.
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package smart
 */

get_header(); ?>

    <?php do_action('op_index_after_header'); ?>
    <?php get_template_part('template-parts/homepage/homepage-hero', op_get_homepage_template()); ?>

    <div id="primary" class="content-area">
        <?php do_action('op_index_before_content'); ?>

        <div class="op-entry container op-container">

            <?php if (op_get_homepage_sidebar() === 'sidebar_right'): ?>
                <div class="row">
                    <div class="col-md-8 main-context">
                        <?php if (have_posts()) : ?>
                            <?php get_template_part('template-parts/homepage/homepage', op_get_homepage_template()); ?>
                        <?php endif; ?>
                        <?php do_action('op_index_pagination'); ?>
                    </div>
                    <div class="col-md-4 main-sb main-sb--home">
                        <?php get_sidebar(); ?>
                    </div>
                </div>
            <?php endif; ?>

            <?php if (op_get_homepage_sidebar() === 'sidebar_left'): ?>
                <div class="row row--alt">
                    <div class="col-md-4 main-sb main-sb--home">
                        <?php get_sidebar(); ?>
                    </div>
                    <div class="col-md-8 main-context">
                        <?php if (have_posts()) : ?>
                            <?php get_template_part('template-parts/homepage/homepage', op_get_homepage_template()); ?>
                        <?php endif; ?>
                        <?php do_action('op_index_pagination'); ?>
                    </div>
                </div>
            <?php endif; ?>

            <?php
                if (op_get_homepage_sidebar() === 'no_sidebar') {
                    if (have_posts()) {
                        get_template_part('template-parts/homepage/homepage', op_get_homepage_template());
                    }
                    do_action('op_index_pagination');
                }
            ?>

        </div><!-- container -->

        <?php
        /**
         * op_index_before_footer
         *
         * @hooked op_posts_archive_navigation - 20
         * @hooked op_home_optin_after_posts - 30
         */
        do_action('op_index_before_footer');
        ?>
    </div><!-- #primary -->

<?php get_footer();
