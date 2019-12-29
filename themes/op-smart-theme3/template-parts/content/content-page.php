<?php
/**
 * Template part for displaying page content in page.php.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package smart
 */

?>

<?php
/**
 * op_page_before_content
 *
 * @hooked op_social_area_before_content - 30
 * @hooked op_optin_before_content - 40
 */
do_action('op_page_before_content');
?>

<div class="entry-content" itemprop="text">
    <?php the_content(); ?>
</div>

<?php
/**
 * op_page_after_content
 *
 * @hooked op_social_area_after_content - 30
 * @hooked op_optin_after_content - 40
 */
do_action('op_page_after_content');
?>

<?php
    wp_link_pages(array(
        'before' => '<div class="page-links">' . esc_html_x('Pages:', 'Content', 'op3_smart'),
        'after'  => '</div>',
    ));
