<?php
/**
 * The template for displaying comments.
 *
 * This is the template that displays the area of the page that contains both the current comments
 * and the comment form.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package smart
 */

/*
 * If the current post is protected by a password and
 * the visitor has not yet entered the password we will
 * return early without loading the comments.
 */

if (post_password_required()) {
    return;
}
?>

<div id="op-comments-single" class="op-comments">

    <div id="comments"></div>
    <span class="lined-border"></span>

    <?php if (have_comments()) : ?>
        <ol class="commentlist" itemscope itemtype="http://schema.org/UserComments">
            <?php
                wp_list_comments(array(
                    'style'      => 'ol',
                    'short_ping' => true,
                    'walker' => new Smart_Walker_Comment()
                ));
            ?>
        </ol><!-- .comment-list -->

         <div class="navigation">
            <?php paginate_comments_links(); ?>
         </div>

    <?php endif; // Check for have_comments(). ?>

    <?php if (!comments_open() && get_comments_number() && post_type_supports(get_post_type(), 'comments')) : ?>
        <p class="no-comments"><?php echo esc_html_x('Comments are closed.', 'Content', 'op3_smart'); ?></p>
    <?php endif; ?>

    <?php comment_form(op_get_comment_form_args()); ?>
</div><!-- #comments -->
