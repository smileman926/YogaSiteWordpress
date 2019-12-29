<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// New postmeta defaults
return apply_filters( 'coupon_csv_product_postmeta_defaults', array(
	'discount_type' => '',
	'coupon_amount' => '',
	'individual_use' => 'yes',
	'product_ids' => '',
	'exclude_product_ids' => '',
	'usage_limit' => '',
	'usage_limit_per_user' => '',
	'limit_usage_to_x_items' => '',
	'expiry_date' => '',         /* removed from WC version 3.6 onwards */
        'date_expires' => '',
	'free_shipping' => 'no',
	'exclude_sale_items' => 'no',
	'product_categories' => '',
	'exclude_product_categories' => '',
	'minimum_amount' => '',
	'maximum_amount' => '',
	'customer_email' => '',
) );