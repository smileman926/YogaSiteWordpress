<?php

/**
 * Template part for displaying homepage hero video section
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package smart
 */

global $op_options;

$video_align = '';
if (!empty($op_options['homepage_hero_video_align'])) {
    $video_align = ' op-homepage-hero-column--' . $op_options['homepage_hero_video_align'];
}
$hero_alignment = $op_options['homepage_hero_design'] === 'standard' ? 'op-homepage-hero-' . $op_options['homepage_hero_alignment'] : '';
?>

<div class="op-hero-area op-homepage-hero-area">
    <header class="op-homepage-hero <?php echo $hero_alignment . ' op-homepage-hero-' . $op_options['homepage_hero_design']; ?>">
        <div class="op-homepage-hero-container">
            <div class="op-homepage-hero-content">
                <div class="op-homepage-hero-column op-homepage-hero-column--video <?php echo $video_align; ?>">
                    <?php
                        if (!empty($op_options['homepage_hero_video_embed_code'])) {
                            $code = $op_options['homepage_hero_video_embed_code'];

                            // Find width and height of the iframe,
                            // so we can caluculate the correct
                            // aspect ratio we need to set
                            preg_match('/width="(\d+)"/i', $code, $result);
                            if (!is_array($result) && !empty($result[1])) {
                                $width = $result[1];
                            }

                            preg_match('/height="(\d+)"/i', $code, $result);
                            if (!is_array($result) && !empty($result[1])) {
                                $height = $result[1];
                            }

                            if (isset($width) && isset($height)) {
                                $aspect_ratio_style = ' style="padding-bottom: ' . ($height / $width) * 100 . '%;"';
                            } else {
                                $aspect_ratio_style = '';
                            }

                            echo '<div class="op-homepage-hero-video-container"' . $aspect_ratio_style . '>' . $op_options['homepage_hero_video_embed_code'] . '</div>';
                        }
                    ?>
                </div>

                <div class="op-homepage-hero-column">
                    <?php
                        if (!empty($op_options['homepage_hero_title'])) {
                            $href_open = '';
                            $href_close = '';
                            if (!empty($op_options['homepage_hero_button_link'])) {
                                $href_open = '<a href="' . $op_options['homepage_hero_button_link'] . '">';
                                $href_close = '</a>';
                            }
                            echo '<h1 class="op-homepage-hero-title">' . $href_open . $op_options['homepage_hero_title'] . $href_close . '</h1>';
                        }

                        if (!empty($op_options['homepage_hero_subtitle'])) {
                            echo '<h2 class="op-homepage-hero-subtitle">' . nl2br($op_options['homepage_hero_subtitle']) . '</h2>';
                        }

                        if (!empty($op_options['homepage_hero_button_link']) && !empty($op_options['homepage_hero_button_text'])) {
                            echo '<a class="op-homepage-hero-button op-homepage-hero-button-' . $op_options['homepage_hero_button_style'] .  '" href="' . $op_options['homepage_hero_button_link'] . '">' . $op_options['homepage_hero_button_text'] . ' </a>';
                        }
                    ?>
                </div>
            </div>
        </div>
    </header>
</div>