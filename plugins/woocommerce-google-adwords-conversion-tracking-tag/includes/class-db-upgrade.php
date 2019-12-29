<?php
/**
 * DB upgrade function
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

class WGACT_DB_Upgrade {

	protected $options_db_name = 'wgact_plugin_options';

	public function __construct() {
	}

	public function run_options_db_upgrade() {

		// determine version and run version specific upgrade function
		// check if options db version zero by looking if the old entries are still there.
		if ( ( get_option( 'wgact_plugin_options_1' ) ) or ( get_option( 'wgact_plugin_options_2' ) )  ) {
			// error_log( 'current db version is zero ' );
			$this->upgrade_options_db_from_zero_to_1_point_zero();
		}
	}

	public function upgrade_options_db_from_zero_to_1_point_zero() {

		$option_name_1 = 'wgact_plugin_options_1';
		$option_name_2 = 'wgact_plugin_options_2';

		// get current options
		// get option 1
		if ( ! ( get_option( $option_name_1 ) ) ) {
			$option_value_1 = "";
		} else {
			$option_value_1_array = get_option( $option_name_1 );
			$option_value_1       = $option_value_1_array['text_string'];
		}

		// get option 2
		if ( ! ( get_option( $option_name_2 ) ) ) {
			$option_value_2 = "";
		} else {
			$option_value_2_array = get_option( $option_name_2 );
			$option_value_2       = $option_value_2_array['text_string'];
		}

		// db version place options into new array
		$options_array = array(
			'conversion_id'     => $option_value_1,
			'conversion_label'  => $option_value_2,
		);

		// store new option array into the options table
		update_option( $this->options_db_name, $options_array );

		// delete old options
		// only on single site
		// we will run the multisite deletion only during uninstall
		delete_option( $option_name_1 );
		delete_option( $option_name_2 );

	}
}