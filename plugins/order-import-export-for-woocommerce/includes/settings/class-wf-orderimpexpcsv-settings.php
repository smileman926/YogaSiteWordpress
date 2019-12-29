<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class WF_OrderImpExpCsv_Settings {

	/**
	 * Order Exporter Tool
	 */
	public static function save_settings( ) {
		global $wpdb;

		$settings						= array();

		update_option( 'woocommerce_'.WF_ORDER_IMP_EXP_ID.'_settings', $settings );
		
		wp_redirect( admin_url( '/admin.php?page='.WF_WOOCOMMERCE_ORDER_IM_EX.'&tab=settings' ) );
		exit;
	}
}
