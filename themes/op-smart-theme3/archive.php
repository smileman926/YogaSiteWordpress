<?php
/**
 * The template for displaying archive pages.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package smart
 */

get_header(); ?>

            <div id="primary" class="content-area">
                <?php
                /**
                 * op_archive_after_header
                 *
                 * @hooked op_archive_optin_after_header - 10
                 */
                do_action('op_archive_after_header');
                ?>

                <div class="op-hero-area op-blog-post" role="banner">
                    <header class="op-hero-area op-blog-post-header">
                        <div class="op-blog-hero-background">
                            <?php
                                global $op_options;
                                $header_content_additional_class = '';

                                if (isset($op_options['blog_archive_hero_size']) && (int) $op_options['blog_archive_hero_size'] === 1) {
                                    $header_content_additional_class .= ' op-blog-header-content--small';
                                }
                            ?>
                            <div class="op-blog-header-content<?php echo $header_content_additional_class; ?>">
                                <div class="container op-container">
                                    <div class="row">
                                        <div class="col-sm-12">
                                                <div class="op-archive-header-container">
                                            <?php
                                                if ( is_category() ) {
                                                    $headline = single_cat_title( '', false );
                                                    $tag = _x('Category', 'Content', 'op3_smart');
                                                } elseif ( is_tag() ) {
                                                    $headline = single_tag_title( '', false );
                                                    $tag = _x('Tag', 'Content', 'op3_smart');
                                                }

                                                if ( is_author() ):
                                                    $author_id = get_the_author_meta('ID');
                                                    $author_url = get_author_posts_url($author_id);
                                                    $author_name = get_the_author_meta('display_name', $author_id);
                                                    $author_description = get_the_author_meta('description');
                                                ?>

                                                    <a class="author-img" href="<?php echo $author_url; ?>"><?php echo get_avatar($author_id, 80, '', $author_name); ?></a>
                                                    <h1 class="op-headline op-author-headline" itemprop="headline"><a class="" href="<?php echo $author_url; ?>"><?php echo $author_name; ?></a></h1>
                                                    <?php if (!empty($author_description)) : ?>
                                                        <p><?php echo $author_description; ?></p>
                                                    <?php endif; ?>

                                                <?php else: ?>
                                                    <?php if (!isset($op_options['blog_archive_hero_category']) || (int) $op_options['blog_archive_hero_category'] !== 1): ?>
                                                        <div class="op-category-wrap">
                                                            <div class="op-small-category-link"><span><?php echo $tag; ?></span></div>
                                                        </div>
                                                    <?php endif; ?>
                                                    <h1 class="op-headline op-category-headline" itemprop="headline"><?php echo $headline; ?></h1>
                                                <?php the_archive_description( '<div class="op-blog-meta-wrapper"><div class="taxonomy-description">', '</div></div>' );
                                                endif; ?>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                </div>

                <?php
                /**
                 * op_archive_after_hero
                 *
                 * @hooked op_archive_optin_after_hero - 30
                 */
                do_action('op_archive_after_hero');
                ?>

                <?php if (false === apply_filters('op_template_has_sidebar', false)) : ?>
                    <div class="op-entry container op-container">
                        <div class="row">
                            <div class="col-md-12">
                                <?php get_template_part('template-parts/homepage/homepage', op_get_archive_template()); ?>
                                <?php do_action('op_archive_pagination'); ?>
                            </div>
                        </div>
                    </div>
                <?php else : ?>
                    <div class="<?php op_template_container_class(); ?>">
                        <div class="row">
                            <div class="<?php op_template_main_column_class(); ?>">
                                <?php get_template_part('template-parts/homepage/homepage', op_get_archive_template()); ?>
                                <?php do_action('op_archive_pagination'); ?>
                            </div>
                            <div class="<?php op_template_side_column_class(); ?>">
                                <?php get_sidebar(); ?>
                            </div>
                        </div>
                    </div>
                <?php endif; ?>

                <?php
                /**
                 * op_archive_after_content
                 *
                 * @hooked op_posts_archive_navigation      - 20
                 * @hooked op_archive_optin_before_footer   - 30
                 */
                do_action('op_archive_after_content');
                ?>
            </div><!-- #primary -->

<?php get_footer();
