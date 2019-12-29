<?php
/**
 * Custom template tags for this theme.
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package smart
 */

if (!function_exists('op_logo')) {
    /**
     * Outputs logo or blog name if logo isn't defined.
     */
    function op_logo($size = 'normal')
    {
        global $op_options;

        if (isset($op_options['logo']) && isset($op_options['logo']['url']) && !empty($op_options['logo']['url'])) {
            $logo   = $op_options['logo'];
            $retina = '';

            if (isset($op_options['logo_retina']) && isset($op_options['logo_retina']['url']) && !empty($op_options['logo_retina']['url'])) {
                $retina = ' srcset="' . esc_url($logo['url']) . ' 1x, ' . esc_url($op_options['logo_retina']['url']) . ' 2x"';
            }

            if ($size === 'big') {
                $logo['width'] = (isset($logo['width'])) ? $logo['width'] : 183;
                $logo['height'] = (isset($logo['height'])) ? $logo['height'] : 50;
            } else {
                $logo['width'] = (isset($logo['width'])) ? $logo['width'] : 180;
                $logo['height'] = (isset($logo['height'])) ? $logo['height'] : 50;
            }

            echo '<img src="' . esc_url($logo['url']) . '"' . $retina . ' title="' . esc_attr(get_bloginfo('name')) . '" alt="' . esc_attr(get_bloginfo('name')) . '" width="' . esc_attr($logo['width']) . '" height="' . esc_attr($logo['height']) . '">';
        } else {
            echo '<h1>' . get_bloginfo('name') . '</h1>';
        }
    }
}

if (!function_exists('op_footer_logo')) {
    /**
     * Output logo if it is defined.
     */
    function op_footer_logo()
    {
        global $op_options;

        if (isset($op_options['logo_footer']) && isset($op_options['logo_footer']['url']) && !empty($op_options['logo_footer']['url'])) {
            $logo   = $op_options['logo_footer'];
            $retina = '';
            $logo['width'] = !empty($logo['width']) ? $logo['width'] : '220';
            $logo['height'] = !empty($logo['height']) ? $logo['height'] : '60';

            if (isset($op_options['logo_footer_retina']) && isset($op_options['logo_footer_retina']['url']) && !empty($op_options['logo_footer_retina']['url'])) {
                $retina = ' srcset="' . esc_url(esc_url($logo['url'])) . ' 1x, ' . esc_url($op_options['logo_footer_retina']['url']) . ' 2x"';
            }

            echo '<span class="icon-logo-f"><img  src="' . esc_url($logo['url']) . '"' . $retina . ' title="' . esc_attr(get_bloginfo('name')) . '" alt="' . esc_attr(get_bloginfo('name')) . '" width="' . esc_attr($logo['width']) . '" height="' . esc_attr($logo['height']) . '"></span>';
        }
    }
}

if (!function_exists('op_footer_copyright')) {
    /**
     * Output copyright text if defined (it will run it through the "the_content" filter).
     */
    function op_footer_copyright()
    {
        global $op_options;

        if (isset($op_options['copyright']) && !empty($op_options['copyright'])) {
            // remove_filter('the_content', 'wpautop');
            // echo apply_filters('the_content', '<p>' . $op_options['copyright'] . '</p>');
            echo '<p>' . do_shortcode($op_options['copyright']) . '</p>';
        }
    }
}

if (!function_exists('op_footer_powered_by')) {
    /**
     * Output powered_by text in footer.
     */
    function op_footer_powered_by()
    {
        global $op_options;

        if (isset($op_options['powered_by']) && (int) $op_options['powered_by'] === 1) {
            $url = !empty($op_options['powered_by_url']) ? $op_options['powered_by_url'] : 'https://optimizepress.com';
            echo '<p><a href="' . $url . '" target="_blank" rel="noopener">WordPress Theme by OptimizePress</a></p>';
        }
    }
}

if (!function_exists('op_navbar_class')) {
    /**
     * Outputs navbar classes.
     */
    function op_navbar_class()
    {
        $classes = array('op-navbar', 'navbar', 'navbar-default');
        echo implode(' ', apply_filters('op_navbar_class', $classes));
    }
}

if (!function_exists('op_template_container_class')) {
    /**
     * Outputs blog post container classes.
     */
    function op_template_container_class()
    {
        echo implode(' ', apply_filters('op_template_container_class', array('op-entry', 'container', 'op-container')));
    }
}

if (!function_exists('op_template_shop_container_class')) {
    /**
     * Outputs blog post container classes.
     */
    function op_template_shop_container_class()
    {
        echo implode(' ', apply_filters('op_template_container_class', array('op-entry')));
    }
}

if (!function_exists('op_template_main_column_class')) {
    /**
     * Outputs blog post main column classes.
     */
    function op_template_main_column_class()
    {
        echo implode(' ', apply_filters('op_template_main_column_class', array('col-md-8', 'main-context')));
    }
}

if (!function_exists('op_template_side_column_class')) {
    /**
     * Outputs blog post sidebar column classes.
     */
    function op_template_side_column_class()
    {
        echo implode(' ', apply_filters('op_template_side_column_class', array('col-md-4', 'main-sb')));
    }
}

if (!function_exists('op_template_grid_item_class')) {
    /**
     * Outputs grid item column classes.
     */
    function op_template_grid_item_class()
    {
        if (is_home()) {
            $md_class = op_get_homepage_sidebar() === 'no_sidebar' ? 'col-md-4' : 'col-md-6';
        } elseif (is_archive()) {
            $md_class = op_get_archive_sidebar() === 'no_sidebar' ? 'col-md-4' : 'col-md-6';
        } else {
            $md_class = 'col-md-4';
        }
        echo implode(' ', apply_filters('op_template_grid_item_class', array('col-sm-6', $md_class, 'box-item')));
    }
}

if (!function_exists('op_post_metadata')) {
    /**
     * Prints HTML with meta information for the current post-date/time and author.
     */
    function op_post_metadata()
    {
        global $op_options;
        $prefix = is_page() ? 'page_' : 'blog_';

        // Init empty metadata var which will be used to hold metadata items
        // $metadata = array();

        // Author
        // if ((int) $op_options['blog_metadata_options']['author'] === 1) {
        //     $metadata[] = get_the_author_posts_link();
        // }

        // Date/time
        // if ((int) $op_options['blog_metadata_options']['date'] === 1) {
        //     $metadata[] = sprintf('<time class="entry-date published updated" datetime="%1$s" itemprop="datePublished">%2$s</time>', esc_attr(get_the_date('c')), esc_html(get_the_date()));
        // }

        // Comments
        // if ((int) $op_options['blog_metadata_options']['comments'] === 1) {
        //     $metadata[] = sprintf(_n('%1$s Response', '%1$s Responses', get_comments_number(), 'op3_smart'), number_format_i18n(get_comments_number()));
        // }

        // if (count($metadata)) {
        //     echo '<span class="feature-title">' . implode(' | ', $metadata) . '</span>';
        // }

        echo '<div class="op-blog-meta-wrapper">';
            if ((int) $op_options[$prefix . 'metadata_options']['date'] === 1) {
                echo '<span class="op-post-date">';
                    echo '<span class="glyphicon glyphicon-time op-list-space-right-small" aria-hidden="true"></span>';
                    echo sprintf('<time class="entry-date published updated op-list-space-right-large" datetime="%1$s" itemprop="datePublished">%2$s</time>', esc_attr(get_the_date('c')), esc_html(get_the_date()));
                echo '</span>';
            }


            // if ((int) $op_options['blog_metadata_options']['comments'] === 1) {
            if (!is_page() && (int) $op_options['blog_hide_comments'] === 0) {
                echo '<a href="' . get_comments_link() . '" class="op-comment-number">';
                    echo '<span class="glyphicon glyphicon-comment op-list-space-right-small" aria-hidden="true"></span>';
                    comments_number('0', '1', '%');
                    echo '<span class="visuallyhidden">Comments</span>';
                echo '</a>';
            }

            op_list_layout_author('op-list-author');

        echo '</div>';
    }
}

if (!function_exists('op_list_layout_meta')) {
    /**
     * Prints HTML with meta information for the current post-date/time and author.
     */
    function op_list_layout_meta()
    {
        global $op_options;
        $prefix = is_page() ? 'page_' : 'blog_';

        if ((int) $op_options[$prefix . 'metadata_options']['date'] === 1) {
            echo '<span class="op-post-date">';
                echo '<span class="glyphicon glyphicon-time op-list-space-right-small" aria-hidden="true"></span>';
                echo sprintf('<time class="entry-date published updated op-list-space-right-large" datetime="%1$s" itemprop="datePublished">%2$s</time>', esc_attr(get_the_date('c')), esc_html(get_the_date()));
            echo '</span>';
        }

        // echo '<span class="glyphicon glyphicon-heart" aria-hidden="false"></span> ';
        // echo '<span class="op-list-space-right-small">1</span>';

        // if ((int) $op_options['blog_metadata_options']['comments'] === 1) {
        if (!is_page() && (int) $op_options['blog_hide_comments'] === 0) {
            echo '<a href="' . get_comments_link() . '" class="op-comment-number">';
                echo '<span class="glyphicon glyphicon-comment op-list-space-right-small" aria-hidden="true"></span>';
                comments_number('0', '1', '%');
                echo '<span class="visuallyhidden">Comments</span>';
            echo '</a>';
        }
    }
}

if (!function_exists('op_list_layout_author')) {
    function op_list_layout_author($class)
    {
        global $op_options;
        $prefix = is_page() ? 'page_' : 'blog_';

        if ((int) $op_options[$prefix . 'metadata_options']['author'] === 1) { ?>
            <a class="<?php echo $class; ?>" href="<?php echo get_author_posts_url( get_the_author_meta( 'ID' ) ); ?>">
                <span class="op-author-avatar"><?php echo get_avatar(get_the_author_meta('user_email'), 40); ?></span>
                <span class="op-author-by"><?php echo _x('by', 'op3_smart'); ?></span>
                <span class="op-upercase"><?php the_author(); ?></span>
            </a> <?php
        }
    }
}

if (!function_exists('op_post_comments')) {
    /**
     * Display comment template if comments are turned on and if they are either open or if they have any comments.
     */
    function op_post_comments()
    {
        global $op_options;

        if ((int) $op_options['blog_hide_comments'] !== 1 && (comments_open() || get_comments_number() > 0)) {
            comments_template();
        }
    }
}

if (!function_exists('op_prev_next_post')) {
    /**
     * Outputs prev/next post navigation. To be used in the loop.
     */
    function op_prev_next_post()
    {
        global $op_options;

        if ((int) $op_options['blog_post_prev_next_posts'] === 1) {
            $nextPost       = get_adjacent_post('', '', false);
            $nextPostId     = isset($nextPost->ID) ? $nextPost->ID : '';
            $nextPostTitle  =  get_the_title($nextPostId);

            $prevPost       = get_adjacent_post('', '', true);
            $prevPostId     = isset($prevPost->ID) ? $prevPost->ID : '';
            $prevPostTitle  =  get_the_title($prevPostId);
            ?>
                <aside class="pn-art-wrap">
                    <hr>
                    <div class="row">
                        <a href="<?php echo esc_url(get_permalink($prevPostId)); ?>" title="<?php echo esc_attr($prevPostTitle); ?>" class="col-xs-6">
                            <strong><?php _ex('« Previous Post', 'Content', 'op3_smart'); ?></strong>
                            <span class="pna-title"><?php echo $prevPostTitle; ?></span>
                        </a>
                        <a href="<?php echo esc_url(get_permalink($nextPostId)); ?>" title="<?php echo esc_attr($nextPostTitle); ?>" class="col-xs-6">
                            <strong><?php _ex('Next Post »', 'Content', 'op3_smart'); ?></strong>
                            <span class="pna-title"><?php echo $nextPostTitle; ?></span>
                        </a>
                    </div> <!--// .row -->
                </aside>
            <?php
        }
    }
}

if (!function_exists('op_tags')) {
    /**
     * Ouput post tags. To be used in the loop.
     */
    function op_tags()
    {
        global $op_options;
        if (isset($op_options['blog_metadata_options']['tags']) && (int) $op_options['blog_metadata_options']['tags'] === 1){
            if (has_tag()) : ?>
                <div class="tags">
                <?php foreach (get_the_tags() as $tag) : ?>
                    <a href="<?php echo esc_url(get_tag_link($tag->term_id)); ?>" title="<?php echo esc_attr($tag->name . ' ' . _x('Tag', 'Tag link title', 'op3_smart')); ?>" class="btn btn-default btn-sm"><?php echo $tag->name; ?></a>
                <?php endforeach; ?>
                </div>
            <?php endif;
        }
    }
}

if (!function_exists('op_related_posts')) {
    /**
     * Output related posts if they exists. Relevancy is based on post tags. To be used in the loop.
     */
    function op_related_posts()
    {
        global $post;
        global $op_options;

        $tags = wp_get_post_tags($post->ID, array('fields' => 'ids'));
        if ((int) $op_options['blog_post_related_posts'] === 1 && $tags) {
            $args = array(
                'tag__in'               => $tags,
                'post__not_in'          => array($post->ID),
                'posts_per_page'        => 4,
                'ignore_sticky_posts'   => true
            );

            $relatedPosts = new WP_Query($args);

            if ($relatedPosts->have_posts()) : ?>
                <?php
                    // If sidebar is activated, there's not
                    // enough space for the 4 related
                    // posts in the row, so we
                    // adjust the design
                    // accordingly
                    // $post_count = $relatedPosts->post_count;
                    // switch ($op_options['blog_post_sidebar']) {
                    //     case 'sidebar_right':
                    //     case 'sidebar_left':
                    //         if ($post_count > 3) {
                    //             $post_count = 2;
                    //         }
                    //         break;
                    // }

                    // Single column layout has been made narrower,
                    // so we're always using 2 here.
                    $post_count = 2;
                ?>
                <aside class="op-related-articles">
                    <hr>
                    <h2 class="op-related-articles-title"><?php _ex('Related Articles', 'Content', 'op3_smart'); ?></h2>
                    <div class="op-related-articles-grid-row op-related-articles-grid-row--<?php echo $post_count; ?>-col">
                        <?php while($relatedPosts->have_posts()) : $relatedPosts->the_post(); ?>
                            <div class="box-item">
                                <?php $url = esc_url(get_the_permalink()); ?>
                                <div class="post-box">

                                    <?php
                                        if (has_post_thumbnail()) {
                                            echo '<a class="op-related-articles-img-container" href="' . $url . '">';
                                                echo '<span class="visuallyhidden">' . get_the_title() . '</span>';
                                                the_post_thumbnail('related-article-size');
                                            echo '</a>';
                                        } else {
                                            echo '<a class="op-related-articles-placeholder-img" href="' . $url . '">';
                                                echo '<span class="visuallyhidden">' . get_the_title() . '</span>';
                                                op_logo();
                                            echo '</a>';
                                        }
                                    ?>

                                    <div class="post-box-description">
                                        <h3 class="op-related-articles-headline"><a href="<?php echo $url; ?>"><?php the_title(); ?></a></h3>
                                    </div>

                                </div>
                            </div>
                        <?php endwhile; wp_reset_query(); ?>
                    </div>
                </aside>

            <?php endif;
        }
    }
}

if (!function_exists('op_author_meta')) {
    /**
     * Output author meta info and description. To be used in the loop.
     */
    function op_author_meta()
    {
        global $op_options;
        $author_id = get_the_author_meta('ID');
        $author_url = get_author_posts_url($author_id);
        $author_name = get_the_author_meta('display_name', $author_id);
        $author_description = get_the_author_meta('description');

        if ((int) $op_options['blog_post_author_box'] === 1) : ?>
            <span class="op-author vcard" itemprop="name">
                <hr>
                <div class="op-author-wrap<?php echo empty($author_description) ? ' op-author-wrap--no-description' : ''; ?>">
                    <a class="op-author-wrap-avatar" href="<?php echo $author_url; ?>"><?php echo get_avatar($author_id, 80, '', $author_name); ?></a>

                    <div class="op-author-content">
                        <a href="<?php echo $author_url; ?>" class="op-author-name"><?php the_author_meta('display_name'); ?></a>
                        <?php if (!empty($author_description)) : ?>
                            <p><?php echo $author_description; ?></p>
                        <?php endif; ?>
                    </div>
                </div>
            </span>
        <?php endif;
    }
}

if (!function_exists('op_header_menu_search_item')) {
    /**
     * Append search form as an item in a menu.
     *
     * @param  array $items
     * @return array
     */
    function op_header_menu_search_item($items)
    {
        $items .= '
            <li class="menu-item menu-item-search-form">
                <span class="menu-item-search-form-container menu-item-search-form-item menu-item-search-toggle menu-item-hidden">
                    <form method="get" class="searchform" action="' . esc_url(site_url()) . '/">
                        <div class="inline-flex">
                            <input size="15" class="op-search-form-top-menu" type="text" value="" name="s" id="s" placeholder="' . esc_attr_x('Enter your search keyword(s) here and press enter', 'Search form placeholder', 'op3_smart') . '" />
                        </div>
                    </form>
                    <a class="op-search-form-close-button" id="op_remove_search_link" href="#">
                        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        <span class="visuallyhidden">Close Search Form</span>
                    </a>
                </span>

                <span class="menu-item-search-form-item menu-item-search-link menu-item-search-toggle">
                    <a class="menu-item-search-link" id="op_search_link" href="#">
                        <span class="glyphicon glyphicon-search"></span>
                        <span class="visuallyhidden">Open Search Form</span>
                    </a>
                </span>
            </li>

            ';

        return $items;
    }
}


if (!function_exists('op_footer_sidebars')) {
    /**
     * Render sidebars based on "footer_sidebars" option.
     */
    function op_footer_sidebars()
    {
        global $op_options;

        $sidebars = explode('_', $op_options['footer_sidebars']);

        foreach ($sidebars as $index => $width) : ?>

        <div class="col-sm-<?php echo esc_attr($width); ?>">
            <?php dynamic_sidebar(sprintf('op_footer_sidebar_%d', $index + 1)); ?>
        </div>

        <?php endforeach;
    }
}

if (!function_exists('op_post_hero_audio')) {
    /**
     * Render HTML audio element or embed code.
     */
    function op_post_hero_audio()
    {
        global $op_options;

        if ($op_options['audio_type'] === 'self' && !empty($op_options['audio_mp3']['url'])) {
            // If post has self hosted audio and audio file is set then output the audio player

            $args = array(
                'src' => $op_options['audio_mp3']['url'],
                'ogg' => !empty($op_options['audio_ogg']['url']) ? $op_options['audio_ogg']['url'] : '',
            );

            // Filter audio params
            $args = apply_filters('op_post_audio_args', $args);

            // Output audio HTML element
            echo wp_audio_shortcode($args);

        } else if ($op_options['audio_type'] === 'embed' && !empty($op_options['audio_embed'])) {
            // If post has embeded audio and audio_embed option not empty

            // Allowed tags and attributes for KSES
            $allowedAudioTags = array(
                'iframe' => array(
                    'src' => array(),
                    'width' => array(),
                    'height' => array(),
                    'scrolling' => array(),
                    'frameborder' => array(),
                    'allowfullscreen' => array(),
                ),
            );

            // Output embed code
            echo wp_kses($op_options['audio_embed'], $allowedAudioTags);
        }
    }
}

if (!function_exists('op_post_hero_video')) {
    /**
     * Render HTML video element or embed code.
     */
    function op_post_hero_video()
    {
        global $op_options;

        if ($op_options['video_type'] === 'self' && !empty($op_options['video_mp4']['url'])) {
            // If post has self hosted video and video file is set then output the video player

            $args = array(
                'src'   => $op_options['video_mp4']['url'],
                'ogg'   => !empty($op_options['video_ogg']['url']) ? $op_options['video_ogg']['url'] : '',
                'webm'  => !empty($op_options['video_webm']['url']) ? $op_options['video_webm']['url'] : '',
            );

            // Filter video params
            $args = apply_filters('op_post_video_args', $args);

            // Output video HTML element
            echo wp_video_shortcode($args);

        } else if ($op_options['video_type'] === 'embed' && !empty($op_options['video_embed'])) {
            // If post has embeded video and video_embed option not empty

            // Allowed tags and attributes for KSES
            $allowedVideoTags = array(
                'iframe' => array(
                    'src' => array(),
                    'width' => array(),
                    'height' => array(),
                    'scrolling' => array(),
                    'frameborder' => array(),
                    'allowfullscreen' => array(),
                ),
            );

            // Output embed code
            echo wp_kses($op_options['video_embed'], $allowedVideoTags);
        }
    }
}

if (!function_exists('op_post_hero_gallery')) {
    /**
     * Render gallery markup.
     */
    function op_post_hero_gallery()
    {
        global $op_options;

        if (!empty($op_options['post_gallery'])) {
            $args = array(
                'ids'   => $op_options['post_gallery'],
                'size'  => 'medium',
                'link'  => 'file',
            );

            // Filter gallery params
            $args = apply_filters('op_post_gallery_args', $args);

            // See https://codex.wordpress.org/Function_Reference/gallery_shortcode for params
            echo gallery_shortcode($args);
        }
    }
}
