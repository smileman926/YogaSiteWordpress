<?php
/** COMMENTS WALKER */
class Smart_Walker_Comment extends Walker_Comment {

    // init classwide variables
    var $tree_type = 'comment';
    var $db_fields = array('parent' => 'comment_parent', 'id' => 'comment_ID');

    /** CONSTRUCTOR
     * You'll have to use this if you plan to get to the top of the comments list, as
     * start_lvl() only goes as high as 1 deep nested comments */
    function __construct() { ?>
        <h3 id="comments-title">
            <?php printf(_nx('%1$s Response to', '%1$s replies to ', get_comments_number(), 'Content', 'op3_smart'), number_format_i18n(get_comments_number())); ?>
            <?php the_title('"','"'); ?>
        </h3>
        <ul id="comment-list">
    <?php }

    /** START_LVL
     * Starts the list before the CHILD elements are added. Unlike most of the walkers,
     * the start_lvl function means the start of a nested comment. It applies to the first
     * new level under the comments that are not replies. Also, it appear that, by default,
     * WordPress just echos the walk instead of passing it to &$output properly. Go figure.  */
    function start_lvl( &$output, $depth = 0, $args = array() ) {
        $GLOBALS['comment_depth'] = $depth + 1; ?>

                <ul class="children">
    <?php }

    /** END_LVL
     * Ends the children list of after the elements are added. */
    function end_lvl( &$output, $depth = 0, $args = array() ) {
        $GLOBALS['comment_depth'] = $depth + 1; ?>

        </ul><!-- /.children -->

    <?php }

    /** START_EL */
    function start_el( &$output, $comment, $depth = 0, $args = array(), $id = 0 ) {

        $depth++;
        $GLOBALS['comment_depth'] = $depth;
        $GLOBALS['comment'] = $comment;
        $parent_class = ( empty( $args['has_children'] ) ? '' : 'parent' );
        $add_below = ( array_key_exists ( 'add_below', $args ) ? $args['add_below'] : '' ) ;
        ?>

        <li class="comment thread-depth-1 parent"<?php //comment_class( $parent_class ); ?> id="comment-<?php comment_ID() ?>">
            <div id="div-comment-body-<?php comment_ID() ?>" class="comment-body">
                <div class="comment-author vcard">
                    <?php echo ( $args['avatar_size'] != 0 ? get_avatar( $comment, 70 ) :'' ); ?>

                    <cite class="url fn"><?php echo get_comment_author_link(); ?></cite>
                    <div class="comment-meta commentmetadata"><?php comment_date(); ?> </div>

                </div><!-- /.comment-author -->

                <div id="comment-content-<?php comment_ID(); ?>" class="comment-text">
                    <?php if( !$comment->comment_approved ) : ?>
                        <em class="comment-awaiting-moderation">Your comment is awaiting moderation.</em>
                    <?php endif; ?>

                    <?php comment_text(); ?>

                    <div class="reply">
                        <?php $reply_args = array(
                        // 'add_below' => $add_below,
                            'depth' => $depth,
                            'max_depth' => $args['max_depth'] );

                        comment_reply_link( array_merge( $args, $reply_args ) );  ?>
                    </div><!-- /.reply -->

                </div><!-- /.comment-content -->


            </div><!-- /.comment-body -->

    <?php }

    function end_el(&$output, $comment, $depth = 0, $args = array() ) { ?>

        </li><!-- /#comment-' . get_comment_ID() . ' -->

    <?php }

    /** DESTRUCTOR
     * I just using this since we needed to use the constructor to reach the top
     * of the comments list, just seems to balance out :) */
    function __destruct() { ?>

    </ul><!-- /#comment-list -->

    <?php }
}
