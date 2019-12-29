<div class="orderimpexp-main-box">
    <div class="orderimpexp-view" style="width:68%;">
        <div class="tool-box bg-white p-20p">
            <div id="message" class="updated woocommerce-message wc-connect">
                <div class="squeezer">
                    <h4><?php _e('<strong>This Feature is only available in Premium version</strong>', 'order-import-export-for-woocommerce'); ?></h4>
                    <p class="submit">
                        <a href="https://www.webtoffee.com/product/woocommerce-order-coupon-subscription-export-import/" target="_blank" class="button button-primary"><?php _e('Upgrade to Premium Version', 'order-import-export-for-woocommerce'); ?></a>
                        <a href="https://www.webtoffee.com/setting-up-order-import-export-plugin-for-woocommerce/" target="_blank" class="button"><?php _e('Documentation', 'order-import-export-for-woocommerce'); ?></a>
                        <a href="<?php echo plugins_url('Sample_Subscription.csv', WF_OrderImpExpCsv_FILE); ?>" target="_blank" class="button"><?php _e('Sample Subscription CSV', 'order-import-export-for-woocommerce'); ?></a>
                    </p>
                </div>
            </div>
        </div>
    </div>
    <?php include(WT_OrdImpExpCsv_BASE . 'includes/views/market.php'); ?>
    <div class="clearfix"></div>
</div>