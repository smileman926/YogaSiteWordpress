<?php
if (!defined('ABSPATH')) {
    exit;
}
// Reserved column names
return array(
    'id',
    'discount_type',
    'post_id',
    'post_title',
    'post_name',
    'post_status',
    'post_date',
    'post_date_gmt',
    'post_excerpt',
    'post_type',
    'post_author',
    'postmeta',
    'coupon_amount',
    'individual_use',
    'product_ids',
    'exclude_product_ids',
    'usage_limit',
    'usage_limit_per_user',
    'limit_usage_to_x_items',
    'expiry_date',          /* removed in wc version 3.6 onwards */
    'date_expires',
    'free_shipping',
    'exclude_sale_items',
    'product_categories',
    'exclude_product_categories',
    'minimum_amount',
    'maximum_amount',
    'customer_email',
);
