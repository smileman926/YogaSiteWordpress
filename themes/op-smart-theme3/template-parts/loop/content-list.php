<?php
    /**
     * Template part for displaying loop post as a list item
     *
     * @package smart
     */
?>
    <article id="post-<?php the_ID(); ?>" <?php post_class(); ?> itemscope="itemscope" itemtype="http://schema.org/BlogPosting" itemprop="blogPost">
        <div class="row op-content-list-row">
            <div class="col-sm-5">
                <?php
                    if (has_post_thumbnail()) {
                        echo '<a class="op-content-list-img-container" href="'. get_the_permalink() . '">';
                            the_post_thumbnail('homepage-list-size');
                        echo '</a>';
                    } else{
                        echo '<a class="op-content-list-placeholder-img" href="'. get_the_permalink() . '">';
                            op_logo('big');
                        echo '</a>';
                    }
                ?>
            </div>
            <div class="col-sm-7">
                <?php
                    global $op_options;

                    if ((int) $op_options['blog_metadata_options']['categories'] === 1) {
                        echo '<div class="op-list-category-wrap">';
                            op_small_category_link();
                        echo '</div>';
                    }
                    echo '<div class="op-list-layout-meta-wrapper">';
                        op_list_layout_meta();
                    echo '</div>';

                    echo '<h1 class="op-list-headline" itemprop="headline"><a href="'. get_the_permalink() . '">' . get_the_title() .'</a></h1>';

                    echo '<div class="op-homepage-list-text">';
                        op_short_excerpt();
                    echo '</div>';

                    op_list_layout_author('op-list-author');
                ?>
            </div>
        </div>
    </article>
