<?php
/**
 * The template for displaying 404 pages (not found).
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package smart
 */

get_header(); ?>

            <div id="primary" class="content-area">
                <?php
                /**
                 * op_404_after_header
                 *
                 * @hooked op_404_optin_after_header - 10

                 */
                do_action('op_404_after_header');
                ?>
                <div class="op-hero-area op-blog-post" role="banner">
                    <header class="op-hero-area op-blog-post-header">
                        <div class="op-blog-hero-background">
                            <div class="op-blog-header-content">
                                <div class="container op-container">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <h1 class="op-headline op-category-headline" itemprop="headline">404</h1>
                                            <div class="op-blog-meta-wrapper"><?php echo esc_html_x('Oops! That page can&rsquo;t be found.', 'Content', 'op3_smart'); ?></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                </div>


                <?php
                /**
                 * op_404_after_hero
                 *
                 * op_404_optin_after_hero - 30
                 */
                do_action('op_404_after_hero');
                ?>

                <section class="error-404 not-found">
                    <div class="op-entry container op-container">
                        <div class="row">
                            <div class="col-md-12 main-context">
                                <?php get_template_part('template-parts/content/content', 'none'); ?>
                            </div>
                        </div>
                    </div>
                </section><!-- .error-404 -->

                <?php
                /**
                 * op_404_after_content
                 *
                 * @hooked op_404_optin_before_footer - 30
                 */
                do_action('op_404_after_content');
                ?>
            </div><!-- #primary -->

<?php get_footer();
