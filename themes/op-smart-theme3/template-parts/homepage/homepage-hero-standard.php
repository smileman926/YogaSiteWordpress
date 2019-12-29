<?php

/**
 * Template part for displaying homepage hero standard section
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package smart
 */

global $op_options;

$hero_alignment = $op_options['homepage_hero_design'] === 'standard' ? 'op-homepage-hero-' . $op_options['homepage_hero_alignment'] : '';
?>

<div class="op-hero-area op-homepage-hero-area">
    <header class="op-homepage-hero <?php echo $hero_alignment . ' op-homepage-hero-' . $op_options['homepage_hero_design']; ?>">
        <div class="op-homepage-hero-container">
            <div class="op-homepage-hero-content">
                <div class="op-homepage-hero-standard-content">
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