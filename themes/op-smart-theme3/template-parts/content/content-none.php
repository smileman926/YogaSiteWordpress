<?php
/**
 * Template part for displaying a message that posts cannot be found.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package smart
 */

?>

<section class="no-results not-found">
    <h1><?php _ex('Nothing Found', 'Content', 'op3_smart'); ?></h1>
    <?php if (is_home() && current_user_can('publish_posts')) : ?>
        <p><?php printf(wp_kses(_x('Ready to publish your first post? <a href="%1$s">Get started here</a>.', 'Content', 'op3_smart'), array('a' => array('href' => array()))), esc_url(admin_url('post-new.php'))); ?></p>
    <?php else: ?>
        <?php if (is_search()): ?>
            <p><?php echo esc_html_x('It seems that we can&rsquo;t find what you&rsquo;re looking for. Try adjusting your search.', 'Content', 'op3_smart'); ?></p>
        <?php else: ?>
            <p><?php echo esc_html_x('It seems that we can&rsquo;t find what you&rsquo;re looking for. Perhaps searching can help.', 'Content', 'op3_smart'); ?></p>
        <?php endif; ?>
        <?php get_search_form(); ?>
    <?php endif; ?>
</section><!-- .no-results -->
