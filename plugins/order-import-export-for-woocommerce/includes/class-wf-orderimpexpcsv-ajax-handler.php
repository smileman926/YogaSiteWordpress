<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class WF_OrderImpExpCsv_AJAX_Handler {

	/**
	 * Constructor
	 */
	public function __construct() {
		add_action( 'wp_ajax_woocommerce_csv_order_import_request', array( $this, 'csv_order_import_request' ) );
	}
	
	/**
	 * Ajax event for importing a CSV
	 */
	public function csv_order_import_request() {
		define( 'WP_LOAD_IMPORTERS', true );
                WF_OrderImpExpCsv_Importer::order_importer();
	}

}

new WF_OrderImpExpCsv_AJAX_Handler();