<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class WF_CustomerImpExpCsv_AJAX_Handler {

	/**
	 * Constructor
	 */
	public function __construct() {
		add_action( 'wp_ajax_user_csv_import_request', array( $this, 'csv_customer_import_request' ) );
	}
	
	/**
	 * Ajax event for importing a CSV
	 */
	public function csv_customer_import_request() {
		define( 'WP_LOAD_IMPORTERS', true );
                WF_CustomerImpExpCsv_Importer::customer_importer();
	}
	
}

new WF_CustomerImpExpCsv_AJAX_Handler();