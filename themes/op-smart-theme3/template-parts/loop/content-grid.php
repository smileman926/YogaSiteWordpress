<?php

/**
 * Template part for displaying post in a grid
 *
 * @package smart
 */

?>
    <article id="post-<?php the_ID(); ?>" <?php post_class(); ?> itemscope="itemscope" itemtype="http://schema.org/BlogPosting" itemprop="blogPost">
        <div class="post-box">
            <a href="<?php echo esc_url(get_permalink()); ?>">
            <?php
                if (has_post_thumbnail()) {
                    echo '<span class="op-content-list-img-container">';
                        the_post_thumbnail('homepage-grid-size');
                    echo '</span>';
                } else {
                    echo '<span class="op-content-list-placeholder-img">';
                        op_logo('big');
                    echo '</span>';
                }
            ?>
            </a>
            <?php
                global $op_options;
                echo '<header class="op-content-list-header">';

                    echo '<div class="op-list-layout-header-group">';
                        echo '<div class="op-list-layout-category-wrapper">';
                            if ((int) $op_options['blog_metadata_options']['categories'] === 1) { ?>
                                <?php if (has_category()) : ?>
                                    <div class="op-small-category-link"><a href="<?php echo op_get_first_category_url(); ?>" rel="category tag"><?php echo op_get_first_category_name(); ?></a></div>
                                <?php endif; ?>
                                <?php
                            }
                        echo '</div>';

                        echo '<div class="op-list-layout-meta-wrapper">';
                            op_list_layout_meta();
                        echo '</div>';
                    echo '</div>';

                    echo '<h1 class="op-list-headline" itemprop="headline"><a href="'. get_the_permalink() . '">' . get_the_title() .'</a></h1>';

                echo '</header>';

                echo '<div class="op-homepage-list-text">';
                    echo '<p>';
                        op_short_excerpt();
                    echo '</p>';
                    echo '<p><a class="op-read-more" href="' . esc_url(get_permalink()) . '">' . _x('Continue Reading', 'Content', 'op3_smart') . '</a></p>';
                echo '</div>';

                // op_list_layout_author('op-list-author');
            ?>
        </div>
    </article>
