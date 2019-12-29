<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class WF_CpnImpExpCsv_System_Status_Tools {

	/**
	 * Constructor
	 */
	public function __construct() {
		add_filter( 'woocommerce_debug_tools', array( $this, 'tools' ) );
	}

	/**
	 * Tools we add to WC
	 * @param  array $tools
	 * @return array
	 */
	public function tools( $tools ) {
		$tools['delete_coupons'] = array(
			'name'		=> __( 'Delete Coupons','order-import-export-for-woocommerce'),
			'button'	=> __( 'Delete ALL coupons','order-import-export-for-woocommerce' ),
			'desc'		=> __( 'This tool will delete all coupons allowing you to start fresh.', 'order-import-export-for-woocommerce' ),
			'callback'  => array( $this, 'delete_coupons' )
		);
		
		return $tools;
	}

	/**
	 * Delete coupons
	 */
	public function delete_coupons() 
	{
		global $wpdb;

		// Delete coupons
		$result  = absint( $wpdb->delete( $wpdb->posts, array( 'post_type' => 'shop_coupon' ) ) );
		

		// Delete meta and term relationships with no post
		$wpdb->query( "DELETE pm
			FROM {$wpdb->postmeta} pm
			LEFT JOIN {$wpdb->posts} wp ON wp.ID = pm.post_id
			WHERE wp.ID IS NULL" );
		

		echo '<div class="updated"><p>' . sprintf( __( '%d Coupons Deleted', 'order-import-export-for-woocommerce' ), ( $result) ) . '</p></div>';
	}

	
}

new WF_CpnImpExpCsv_System_Status_Tools();