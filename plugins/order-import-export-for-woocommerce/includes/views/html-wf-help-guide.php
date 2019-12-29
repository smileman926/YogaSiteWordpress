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
<div class="orderimpexp-main-box">
    <div class="tool-box bg-white p-20p orderimpexp-view">
            <div id="tab-help" class="coltwo-col panel help-guide">
            <h4 class="title"><?php _e('<strong>WooCommerce Order</strong>', 'order-import-export-for-woocommerce'); ?></h4>
            <div class="cols wt-border">
                <div class="inner-panel">
                    <img src="<?php echo plugins_url(basename(plugin_dir_path(WF_OrderImpExpCsv_FILE))) . '/images/documentation.png'; ?>"/>
                    <h3><?php _e('Documentation', 'order-import-export-for-woocommerce'); ?></h3>
                    <p style=""><?php _e('Read the set-up guide to get started with the plugin', 'order-import-export-for-woocommerce'); ?></p>
                    <a href="https://www.webtoffee.com/setting-up-order-import-export-plugin-for-woocommerce/" target="_blank" class="button button-primary">
                        <?php _e('Setup Guide', 'order-import-export-for-woocommerce'); ?></a>
                </div>

                <div class="inner-panel">
                    <img src="<?php echo plugins_url(basename(plugin_dir_path(WF_OrderImpExpCsv_FILE))) . '/images/csv.png'; ?>"/>
                    <h3><?php _e('Sample-CSV', 'order-import-export-for-woocommerce'); ?></h3>
                    <p style=""><?php _e('Familiarize yourself with the CSV format', 'order-import-export-for-woocommerce'); ?></p>
                    <a href="<?php echo plugins_url('Sample_Order.csv', WF_OrderImpExpCsv_FILE); ?>" class="button button-primary">
                        <?php _e('Get Sample CSV', 'order-import-export-for-woocommerce'); ?></a> 
                </div>
            </div>
            <h4 class="title"><?php _e('<strong>WooCommerce Coupon</strong>', 'order-import-export-for-woocommerce'); ?></h4>
            <div class="cols wt-border">
                <div class="inner-panel">
                    <img src="<?php echo plugins_url(basename(plugin_dir_path(WF_OrderImpExpCsv_FILE))) . '/images/documentation.png'; ?>"/>
                    <h3><?php _e('Documentation', 'order-import-export-for-woocommerce'); ?></h3>
                    <p style=""><?php _e('Read the set-up guide to get started with the plugin', 'order-import-export-for-woocommerce'); ?></p>
                    <a href="https://www.webtoffee.com/import-and-export-woocommerce-coupons/" target="_blank" class="button button-primary">
                        <?php _e('Setup Guide', 'order-import-export-for-woocommerce'); ?></a>
                </div>
                
                <div class="inner-panel">
                    <img src="<?php echo plugins_url(basename(plugin_dir_path(WF_OrderImpExpCsv_FILE))) . '/images/csv.png'; ?>"/>
                    <h3><?php _e('Sample-CSV', 'order-import-export-for-woocommerce'); ?></h3>
                    <p style=""><?php _e('Familiarize yourself with the CSV format', 'order-import-export-for-woocommerce'); ?></p>
                    <a href="<?php echo plugins_url('Sample_Coupon.csv', WF_OrderImpExpCsv_FILE); ?>" class="button button-primary">
                        <?php _e('Get Sample CSV', 'order-import-export-for-woocommerce'); ?></a>
                </div>
            </div>
        </div>
    </div>
    <?php include_once('market.php'); ?>
    <div class="clearfix"></div>
</div>