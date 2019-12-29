<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class WF_CpnImpExpCsv_Importer {

	/**
	 * Coupon Exporter Tool
	 */
	public static function load_wp_importer() {
		// Load Importer API
		require_once ABSPATH . 'wp-admin/includes/import.php';

		if ( ! class_exists( 'WP_Importer' ) ) {
			$class_wp_importer = ABSPATH . 'wp-admin/includes/class-wp-importer.php';
			if ( file_exists( $class_wp_importer ) ) {
				require $class_wp_importer;
			}
		}
	}

	/**
	 * Coupon Importer Tool
	 */
	public static function coupon_importer() {
		if ( ! defined( 'WP_LOAD_IMPORTERS' ) ) {
			return;
		}

		self::load_wp_importer();

		// includes
		require_once 'class-wf-cpnimpexpcsv-coupon-import.php';
		require_once 'class-wf-csv-parser-coupon.php';

		// Dispatch
		$GLOBALS['WF_CSV_Coupon_Import'] = new WF_CpnImpExpCsv_Coupon_Import();
		$GLOBALS['WF_CSV_Coupon_Import'] ->dispatch();
	}	
}