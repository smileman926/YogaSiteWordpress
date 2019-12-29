<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class WF_OrderImpExpCsv_Importer {

	/**
	 * Order Exporter Tool
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
	 * Order Importer Tool
	 */
	public static function order_importer() {
		if ( ! defined( 'WP_LOAD_IMPORTERS' ) ) {
			return;
		}

		self::load_wp_importer();

		// includes
		require_once 'class-wf-orderimpexpcsv-order-import.php';
		require_once 'class-wf-csv-parser.php';

		// Dispatch
		$GLOBALS['WF_CSV_Order_Import'] = new WF_OrderImpExpCsv_Order_Import();
		$GLOBALS['WF_CSV_Order_Import'] ->dispatch();
	}	
}