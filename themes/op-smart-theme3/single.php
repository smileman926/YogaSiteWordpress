<?php
/**
 * The template for displaying all single posts.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package smart
 */

get_header();

while (have_posts()) : the_post(); ?>
            <?php
                /**
                 * op_single_before_post
                 *
                 * @hooked op_single_optin_after_header - 20
                 * @hooked op_social_area_sticky        - 30
                 */
                do_action('op_single_after_header');
            ?>

            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?> itemscope="itemscope" itemtype="http://schema.org/BlogPosting" itemprop="blogPost">
                <div class="op-hero-area op-blog-post" role="banner">
                    <?php get_template_part('template-parts/single/header'); ?>
                </div>

                <?php
                    global $op_options;
                    $prefix = is_page() ? 'page_' : 'post_';

                    if ((int) $op_options['single_featured_image_override'] === 0) {
                        $featured_as_hero = $op_options['single_featured_image_as_hero'];
                        $featured_in_content = $op_options['single_featured_image_in_content'];
                    } else {
                        $featured_as_hero = $op_options['sitewide_' . $prefix . 'featured_image_as_hero'];
                        $featured_in_content = $op_options['sitewide_' . $prefix . 'featured_image_in_content'];
                    }
                ?>

                <div id="primary" class="content-area">
                    <?php
                        /**
                         * op_single_after_hero
                         *
                         * @hooked op_single_optin_after_hero - 20
                         */
                        do_action('op_single_after_hero');
                    ?>

                    <?php if (false === apply_filters('op_template_has_sidebar', false)) : ?>
                        <div class="op-entry single container op-container">
                            <div class="row">
                                <div class="col-sm-12 col-md-8 col-md-offset-2">
                                    <?php
                                        if ( (int) $featured_as_hero === 0
                                            && (int) $featured_in_content === 1
                                            && has_post_thumbnail() ) {
                                            echo '<figure class="entry-featured-image">';
                                                the_post_thumbnail('large');
                                            echo '</figure>';
                                        }
                                        get_template_part('template-parts/single/post-format', get_post_format());
                                        get_template_part('template-parts/content/content', 'single');
                                    ?>
                                </div>
                            </div>
                        </div>
                    <?php else : ?>
                        <div class="<?php op_template_container_class(); ?>">
                            <div class="row">
                                <div class="<?php op_template_main_column_class(); ?>">
                                    <?php
                                        if ( (int) $featured_as_hero === 0
                                            && (int) $featured_in_content === 1
                                            && has_post_thumbnail() ) {
                                            echo '<figure class="entry-featured-image">';
                                                the_post_thumbnail('large');
                                            echo '</figure>';
                                        }
                                        get_template_part('template-parts/single/post-format', get_post_format());
                                        get_template_part('template-parts/content/content', 'single');
                                    ?>
                                </div>
                                <div class="<?php op_template_side_column_class(); ?>">
                                    <?php get_sidebar(); ?>
                                </div>
                            </div>
                        </div>
                    <?php endif; ?>
                    <?php
                        /**
                         * op_single_after_post
                         *
                         * @hooked op_single_optin_before_footer - 20
                         */
                        do_action('op_single_after_post');
                    ?>
                </div><!-- #primary -->
            </article>

<?php endwhile; // End of the loop.

get_footer();
