<?php
/**
 * The sidebar containing the shop widget area.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package smart
 */

if (!is_active_sidebar('shop-archive')) {
    return;
}
?>
<div id="secondary" class="widget-area" role="complementary" itemscope="itemscope" itemtype="http://schema.org/WPSideBar">
    <?php //dynamic_sidebar(is_active_sidebar('shop-1') ? 'shop-1' : 'sidebar-1'); ?>
    <?php dynamic_sidebar('shop-archive'); ?>
</div><!-- #secondary -->
