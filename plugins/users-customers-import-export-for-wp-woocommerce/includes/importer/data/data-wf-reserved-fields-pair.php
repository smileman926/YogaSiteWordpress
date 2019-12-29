<?php
if (!defined('ABSPATH')) {
    exit;
}

$columns = array(
    'ID' => 'ID  | Customer/User ID ',
    'user_login' => 'User Login | User Login',
    'user_pass' => 'user_pass | user_pass',
    'user_nicename' => 'user_nicename | user_nicename',
    'user_email' => 'user_email | user_email',
    'user_url' => 'user_url | user_url',
    'user_registered' => 'user_registered | user_registered',
    'display_name' => 'display_name | display_name',
    'first_name' => 'first_name | first_name',
    'last_name' => 'last_name | last_name',
    'user_status' => 'user_status | user_status',
    'description' => 'description',
    'roles' => 'roles | roles'
);
return apply_filters('hf_csv_customer_import_columns', $columns);