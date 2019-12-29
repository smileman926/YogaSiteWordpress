<?php
/* Template Name: OP3 - Full Width Template */

do_action('op-builder/templates/header');
do_action('op-builder/templates/full-width/before-content');

op_body();

while (have_posts()) : the_post();
    do_action('op-builder/templates/content');
endwhile;

do_action('op-builder/templates/full-width/after-content');
do_action('op-builder/templates/footer');

include(OP3__DIR__ . '/resources/views/pages/partials/templates_badge.php');
