<?php
/**
 * Standard post header template.
 */
global $op_options;
?>
<header class="op-hero-area op-blog-post-header">
    <div class="op-blog-hero-background">
        <?php
            $header_additional_style = '';
            $img = false;
            $prefix = is_page() ? 'page_' : 'post_';
            $header_content_additional_class = '';

            // If the global settings are overridden on the single
            if ((int) $op_options['single_featured_image_override'] === 0) {
                $featured_as_hero = $op_options['single_featured_image_as_hero'];
                $header_bg = $op_options['post_header_background_color'];
                $img_overlay = $op_options['post_header_background_overlay'];
            } else {
                $featured_as_hero = $op_options['sitewide_' . $prefix . 'featured_image_as_hero'];
                $header_bg = $op_options['sitewide_' . $prefix . 'header_background_color'];
                $img_overlay = $op_options['sitewide_' . $prefix . 'header_background_overlay'];
                $bg_position = $op_options['sitewide_' . $prefix . 'header_background_image_positioning'];
            }

            if (!empty($header_bg['from']) || !empty($header_bg['to'])) {
                $header_additional_style .= ' .op-blog-post-header { ' . op_render_css_gradient($header_bg['from'], $header_bg['to']) . ' }';
            }

            if (!empty($img_overlay['rgba'])) {
                $header_additional_style .= ' .op-blog-header-content-img { background-color:' . $img_overlay['rgba'] . ' }';
            }

            // Set up the hero image
            if ((int) $featured_as_hero === 1) {

                if (has_post_thumbnail()) {
                    $post_thumbnail_id = get_post_thumbnail_id();
                    $featured_image = wp_get_attachment_image_src($post_thumbnail_id, 'full');
                    if ((int) $op_options['single_featured_image_override'] === 1) {
                        $img = $op_options['sitewide_' . $prefix . 'header_background_image_positioning'];
                    } else {
                        $img = $op_options['post_header_background_image_positioning'];
                    }
                    $img['background-image'] = $featured_image[0];
                    $img['media'] = array();
                    $img['media']['width'] = $featured_image[1];
                    $img['media']['height'] = $featured_image[2];
                }

            } elseif ((int) $op_options['single_featured_image_override'] === 0) {

                $img = $op_options['post_header_background_image'];

            } else {

                $img = $op_options['sitewide_' . $prefix . 'header_background_image'];

            }

            // hero can be set to large or small,
            // with an ability to override the
            // sitewide setting on
            // single posts
            $hero_size_key = 'sitewide_' . $prefix . 'hero_size';
            if ((int) $op_options['single_featured_image_override'] === 0) {
                $hero_size_key = 'single_hero_size';
            }

            if (isset($op_options[$hero_size_key]) && (int) $op_options[$hero_size_key] === 1) {
                $header_content_additional_class .= ' op-blog-header-content--small';
            }

            // If there's an image in header,
            // we handle the header
            // differently
            if (!empty($img['background-image'])) {
                $header_content_additional_class .= ' op-blog-header-content-img';
            }

        ?>
        <div class="op-blog-header-content<?php echo $header_content_additional_class; ?>">
            <div class="container op-container">
                <div class="row">
                    <div class="col-sm-12">
                        <?php
                            if (!is_page() && (int) $op_options['blog_metadata_options']['categories'] === 1) {
                                echo '<div class="op-category-wrap">';
                                    op_small_category_link();
                                echo '</div>';
                            }

                            echo '<h1 class="op-headline" itemprop="headline"><a href="' . get_permalink() . '">' . get_the_title() . '</a></h1>';

                            op_post_metadata();
                        ?>
                    </div>
                </div>
            </div>
        </div>

        <?php
            if (!empty($img['background-image'])) {
                $bg_attributes = '';
                $bg_attributes .= (!empty($img['background-repeat'])) ? 'background-repeat: ' . $img['background-repeat'] . ';' : '';
                $bg_attributes .= (!empty($img['background-size'])) ? 'background-size: ' . $img['background-size'] . ';' : '';
                $bg_attributes .= (!empty($img['background-attachment'])) ? 'background-attachment: ' . $img['background-attachment'] . ';' : '';
                $bg_attributes .= (!empty($img['background-position'])) ? 'background-position: ' . $img['background-position'] . ';' : '';

                echo '<img class="attachment-post-thumbnail size-post-thumbnail wp-post-image" src="' . $img['background-image'] . '" alt="' . get_the_title() . '" width="' . $img['media']['width'] . '" height="' . $img['media']['height'] . '" />';
                echo '<div class="op-blog-hero-background-image"></div>';
                echo '<div class="post-thumbnail-placeholder"></div>';

                $header_additional_style .= '.op-blog-hero-background-image { ';
                    $header_additional_style .= "background-image: url('" . $img['background-image'] . "'); ";
                    $header_additional_style .= $bg_attributes;
                $header_additional_style .= ' } ';
            }

            echo '<style>' . $header_additional_style . '</style>';
        ?>
    </div>
</header>
