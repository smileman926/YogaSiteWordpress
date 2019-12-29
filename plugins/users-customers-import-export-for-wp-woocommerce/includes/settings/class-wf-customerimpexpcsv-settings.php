<?php

if (!defined('ABSPATH')) {
    exit;
}

class WF_CustomerImpExpCsv_Settings {

    /**
     * User Exporter Tool
     */
    public static function save_settings() {
        wp_redirect(admin_url('/admin.php?page=' . HF_WORDPRESS_CUSTOMER_IM_EX . '&tab=settings'));
        exit;
    }

}
