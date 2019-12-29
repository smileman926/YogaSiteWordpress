<?php
if (!defined('ABSPATH')) {
    exit;
}
// Reserved column names
return apply_filters('hf_coupon_csv_alter_order_data_columns', array(
    'id' => 'Coupon ID | Coupon ID',
    'post_title' => 'Coupon Title | Name of the coupon ',
    //'post_name' => 'Coupon Permalink | Unique part of the coupon URL',
    'post_status' => 'Coupon Status | Coupon Status ( published , draft ...)',
    //'post_content' => 'Coupon Description | Description about the Coupon',
    'post_excerpt' => 'Coupon Short Description | Short description about the Coupon',
    'post_date' => 'Post Date | Coupon posted date',
    'discount_type' => 'Coupon Type | fixed_cart OR percent OR fixed_product OR percent_product',
    'coupon_amount' => 'Coupon Amount | Numeric values',
    'individual_use' => 'Individual Use? | yes or no',
    'product_ids' => 'Assocoated Product Ids | With comma(,) Separator',
    'exclude_product_ids' => 'Exclude Product Ids | With comma(,) Separator',
    'usage_limit' => 'Usage Limit Per Coupon | Numeric Values',
    'usage_limit_per_user' => 'Usage Limit Per User | Numeric Values',
    'limit_usage_to_x_items' => 'Limit Usage To X Items | Maximum Number Of Individual Items This Coupon Can Apply',
    'expiry_date' => 'Expiry Date | YYYY-MM-DD',
    'free_shipping' => 'Is Free Shipping? | yes or no',
    'exclude_sale_items' => 'Is Exclude Sale Items? | yes or no',
    'product_categories' => 'Product Categories | with comma(,) Separator',
    'exclude_product_categories' => 'Exclude Product  Categories | With comma(,) Separator',
    'minimum_amount' => 'Minimum Amount | Numeric',
    'maximum_amount' => 'Maximum Amount | Numeric',
    'customer_email' => 'Restricted Customers Email Ids| With comma(,) Separator',
        //'post_date_gmt' => 'Post Date GMT | Tooltip data Status',
        ));
