<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">

    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?> itemscope="itemscope" itemtype="http://schema.org/WebPage">

    <?php do_action('op_body_tag_start'); ?>

    <div id="page" class="page-container hfeed site">
        <a class="skip-link screen-reader-text" href="#content"><?php echo esc_html_x('Skip to content', 'Content', 'op3_smart'); ?></a>

        <header id="masthead" class="site-header"  itemscope="itemscope" itemtype="http://schema.org/WPHeader" role="banner">

            <nav class="<?php op_navbar_class(); ?>" itemscope="itemscope" itemtype="http://schema.org/SiteNavigationElement" role="navigation">
                <?php get_template_part('template-parts/header/header', op_get_header_template()); ?>
            </nav>
            <?php get_template_part('template-parts/single/header', 'shop'); ?>
        </header>
        <main id="main" class="site-content site-content-woo container op-container" role="main">
