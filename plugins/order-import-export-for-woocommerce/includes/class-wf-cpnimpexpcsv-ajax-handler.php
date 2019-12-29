<?php

if (!defined('ABSPATH')) {
    exit;
}

class WF_CpnImpExpCsv_AJAX_Handler {

    public function __construct() {
        add_action('wp_ajax_coupon_csv_import_request', array($this, 'csv_import_request'));
    }

    public function csv_import_request() {
        define('WP_LOAD_IMPORTERS', true);
        WF_CpnImpExpCsv_Importer::coupon_importer();
    }

}

new WF_CpnImpExpCsv_AJAX_Handler();
