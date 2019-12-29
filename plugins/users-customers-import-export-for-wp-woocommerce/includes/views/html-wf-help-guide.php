<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<style>
    .help-guide .cols {
        display: flex;
    }
    .help-guide .inner-panel {
        padding: 10px 11px 20px 11px;
        background-color: #FFF;
        margin: 15px 10px;
        box-shadow: 1px 1px 5px 1px rgba(0,0,0,.1);
        text-align: center;
        width: 50%;
    }
    .help-guide .inner-panel p{
        margin-bottom: 20px;
    }
    .help-guide .inner-panel img{
        margin:12px 15px 0;
        height: 90px;
        width: 90px;
    }
</style>
<div class="pipe-main-box">
    <div class="tool-box bg-white p-20p pipe-view">
        <div id="tab-help" class="coltwo-col panel help-guide">
            <div class="cols">
                <div class="inner-panel" style="">
                    <img src="<?php echo plugins_url(basename(plugin_dir_path(WF_CustomerImpExpCsv_FILE))) . '/images/setup.png'; ?>"/>
                    <h3><?php _e('How-to-setup', 'users-customers-import-export-for-wp-woocommerce'); ?></h3>
                    <p style=""><?php _e('Read the set-up guide to get started with the plugin', 'users-customers-import-export-for-wp-woocommerce'); ?></p>
                    <a href="https://www.webtoffee.com/setting-wordpress-users-woocommerce-customers-import-export-plugin/" target="_blank" class="button button-primary"><?php _e('Setup Guide', 'users-customers-import-export-for-wp-woocommerce'); ?></a>
                </div>
                <div class="inner-panel" style="">
                    <img src="<?php echo plugins_url(basename(plugin_dir_path(WF_CustomerImpExpCsv_FILE))) . '/images/documentation.png'; ?>"/>
                    <h3><?php _e('Documentation', 'users-customers-import-export-for-wp-woocommerce'); ?></h3>
                    <p style=""><?php _e('Troubleshoot any issues with our extensive documentation', 'users-customers-import-export-for-wp-woocommerce'); ?></p>
                    <a target="_blank" href="https://www.webtoffee.com/category/documentation/wordpress-users-woocommerce-customers-import-export/" class="button button-primary"><?php _e('Documentation', 'users-customers-import-export-for-wp-woocommerce'); ?></a> 
                </div>
            </div>
            <div class="cols">
                <div class="inner-panel" style="">
                    <img src="<?php echo plugins_url(basename(plugin_dir_path(WF_CustomerImpExpCsv_FILE))) . '/images/support.png'; ?>"/>
                    <h3><?php _e('Support', 'users-customers-import-export-for-wp-woocommerce'); ?></h3>
                    <p style=""><?php _e('We would love to help you on any queries or issues.', 'users-customers-import-export-for-wp-woocommerce'); ?></p>
                    <a href="https://www.webtoffee.com/support/" target="_blank" class="button button-primary"><?php _e('Contact Us', 'users-customers-import-export-for-wp-woocommerce'); ?></a>
                </div>
                <div class="inner-panel" style="">
                    <img src="<?php echo plugins_url(basename(plugin_dir_path(WF_CustomerImpExpCsv_FILE))) . '/images/csv.png'; ?>"/>
                    <h3><?php _e('Sample-CSV', 'users-customers-import-export-for-wp-woocommerce'); ?></h3>
                    <p style=""><?php _e('Familiarize yourself with the CSV format.', 'users-customers-import-export-for-wp-woocommerce'); ?></p>
                    <a href="<?php echo plugins_url('Sample_Users.csv', WF_CustomerImpExpCsv_FILE); ?>" class="button button-primary"><?php _e('Get Sample CSV', 'users-customers-import-export-for-wp-woocommerce'); ?></a>
                </div>
            </div>
        </div>
    </div>   
    <?php include_once("market.php"); ?>
    <div class="clearfix"></div>
</div>