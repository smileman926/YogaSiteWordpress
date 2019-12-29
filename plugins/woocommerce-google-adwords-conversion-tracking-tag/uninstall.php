<?php
/**
 * Uninstall routine for the WGACT plugin
 */

// If uninstall is not called from WordPress, exit
if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit();
}

$option_name_1 = 'wgact_plugin_options_1';
$option_name_2 = 'wgact_plugin_options_2';
$option_name_3 = 'wgact_plugin_options';


delete_option( $option_name_1 );
delete_option( $option_name_2 );
delete_option( $option_name_3 );

// For site options in Multisite
delete_site_option( $option_name_1 );
delete_site_option( $option_name_2 );
delete_site_option( $option_name_3 );