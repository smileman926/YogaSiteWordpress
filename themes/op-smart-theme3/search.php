<?php
/**
 * The template for displaying search results pages.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#search-result
 *
 * @package smart
 */

get_header(); ?>

            <section id="primary" class="content-area">
                <?php
                /**
                 * op_search_after_header
                 *
                 * @hooked op_search_optin_after_header - 10
                 */
                do_action('op_search_after_header');
                ?>
                <div class="op-hero-area op-blog-post" role="banner">
                    <header class="op-hero-area op-blog-post-header">
                        <div class="op-blog-hero-background">
                            <?php
                                global $op_options;
                                $header_content_additional_class = '';

                                if (isset($op_options['search_hero_size']) && (int) $op_options['search_hero_size'] === 1) {
                                    $header_content_additional_class .= ' op-blog-header-content--small';
                                }
                            ?>
                            <div class="op-blog-header-content<?php echo $header_content_additional_class; ?>">
                                <div class="container op-container">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div class="op-blog-meta-wrapper">Search Results for:</div>
                                            <h1 class="op-hero-header"><span class="op-search-term"><?php echo esc_html(get_search_query()); ?></span></h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                </div>

                <?php
                /**
                 * op_search_after_hero
                 *
                 * @hooked op_search_optin_after_hero - 30
                 */
                do_action('op_search_after_hero');

                $infinite_scroll_id = '';
                if (is_infinite_scroll_enabled()) {
                    $infinite_scroll_id = ' id="infinite-scroll-container"';
                }
                ?>
                <?php if (false === apply_filters('op_template_has_sidebar', false)) : ?>
                    <div class="op-entry container op-container">
                        <div class="row"<?php echo $infinite_scroll_id; ?>>
                            <div class="col-md-12">
                                <?php
                                    if (have_posts()) {
                                        while (have_posts()) : the_post();
                                            get_template_part('template-parts/loop/content', 'list');
                                        endwhile;
                                    } else {
                                        get_template_part('template-parts/content/content', 'none');
                                    }
                                    do_action('op_search_pagination');
                                ?>
                            </div>
                        </div>
                    </div>
                <?php else : ?>
                    <div class="<?php op_template_container_class(); ?>">
                        <div class="row">
                            <div class="<?php op_template_main_column_class(); ?>">
                                <?php
                                    if (have_posts()) {
                                        echo '<div class="row"' . $infinite_scroll_id . '>';
                                            while (have_posts()) : the_post();
                                                get_template_part('template-parts/loop/content', 'list');
                                            endwhile;
                                        echo '</div>';
                                    } else {
                                        get_template_part('template-parts/content/content', 'none');
                                    }
                                    do_action('op_search_pagination');
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
                 * op_search_after_content
                 *
                 * @hooked op_posts_archive_navigation - 20
                 * @hooked op_search_optin_before_footer - 30
                 */
                do_action('op_search_after_content');
                ?>
            </section><!-- #primary -->

<?php get_footer();
