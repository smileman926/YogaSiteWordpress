<?php
/*
Plugin Name: itsupportguides.com must-use plugins
Description: code that always runs
Version: 1.0.0
Author: IT Support Guides
Author URI: itsupportguides.com
*/


// Remove Additional Information Tab WooCommerce
 
add_filter( 'woocommerce_product_tabs', 'remove_info_tab', 98);
function remove_info_tab($tabs) {
 
 unset($tabs['additional_information']);
 
 return $tabs;
}
