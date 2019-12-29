<?php
/**
 * Template part for displaying single posts.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package smart
 */
?>
<?php
/**
 * op_single_before_content
 *
 * @hooked op_social_area_before_content - 30
 */
do_action('op_single_before_content');
?>

<div class="entry-content" itemprop="text">
    <?php the_content(); ?>
</div>

<?php
/**
 * op_single_after_content
 *
 * @hooked op_social_area_after_content - 30
 */
do_action('op_single_after_content');
?>

<?php
    wp_link_pages(array(
        'before' => '<div class="page-links">' . esc_html_x('Pages:', 'Content', 'op3_smart'),
        'after'  => '</div>',
    ));
?>

<?php
    op_tags();
    op_author_meta();
    op_prev_next_post();
    op_related_posts();
    op_post_comments();
?>
