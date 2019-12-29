<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package smart
 */

get_header();

while (have_posts()) : the_post(); ?>
        <?php
            /**
             * op_page_after_header
             *
             * @hooked op_page_optin_after_header   - 10
             * @hooked op_social_area_sticky        - 30
             */
            do_action('op_page_after_header');
        ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?> itemscope="itemscope" itemtype="http://schema.org/BlogPosting" itemprop="blogPost">
            <div class="op-hero-area op-blog-post" role="banner">
                <?php
                    $shop = is_woo() ? 'shop' : '';
                    get_template_part('template-parts/single/header', $shop);
                ?>
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
                     * op_page_after_hero
                     *
                     * @hooked op_page_optin_after_hero - 20
                     */
                    do_action('op_page_after_hero'); ?>

                <?php if (false === apply_filters('op_template_has_sidebar', false)) : ?>
                    <div class="op-entry single container op-container">
                        <div class="row">
                            <?php $single_column_class = is_woo() ? 'col-sm-12 col-md-12' : 'col-sm-12 col-md-8 col-md-offset-2'; ?>
                            <div class="<?php echo $single_column_class; ?>">
                                <?php
                                    if ( (int) $featured_as_hero === 0
                                        && (int) $featured_in_content === 1
                                        && has_post_thumbnail() ) {
                                        echo '<figure class="entry-featured-image">';
                                            the_post_thumbnail('large');
                                        echo '</figure>';
                                    }
                                    get_template_part('template-parts/content/content', 'page');
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
                                    get_template_part('template-parts/content/content', 'page');
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
                 * op_page_after_post
                 *
                 * @hooked op_page_optin_before_footer - 20
                 */
                do_action('op_page_after_post');
            ?>
            </div><!-- #primary -->
        </article>

<?php endwhile; // End of the loop.

get_footer();
