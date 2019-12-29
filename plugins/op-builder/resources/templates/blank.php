<?php
/*
Template Name: OP3 Blank Template
Template Post Type: post, page
*/
?><!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js no-svg">
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="http://gmpg.org/xfn/11">
<?php
    // This would download 16 fonts, so... Big overkill. Including
    // default fonts in OPBuilder\Editor\Page\enqueueAssets()
    // method
    //
    // <link href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans:100,200,300,400,500,600,700|Poppins:100,200,300,400,500,600,700,800,900" rel="stylesheet">
?>
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php op_body(); ?>

<?php while (have_posts()) : the_post(); the_content(); endwhile; ?>

<?php wp_footer(); ?>
<?php include(OP3__DIR__ . '/resources/views/pages/partials/templates_badge.php'); ?>
</body>
</html>
