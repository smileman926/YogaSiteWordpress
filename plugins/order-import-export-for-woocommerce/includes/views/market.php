<?php
if (!defined('ABSPATH')) {
    exit;
}
?>
<div class="market-box table-box-main">
    <div class="orderimpexp-review-widget">
        <?php
        echo sprintf(__('<div class=""><p><i>If you like the plugin please leave us a %1$s review!</i><p></div>', 'wf_csv_import_export'), '<a href="https://wordpress.org/support/plugin/order-import-export-for-woocommerce/reviews?rate=5#new-post" target="_blank" class="xa-orderimpexp-rating-link" data-reviewed="' . esc_attr__('Thanks for the review.', 'wf_csv_import_export') . '">&#9733;&#9733;&#9733;&#9733;&#9733;</a>');
        ?>
    </div>
    <div class="orderimpexp-premium-features">
        
        <ul style="font-weight: bold; color:#666; list-style: none; background:#f8f8f8; padding:20px; margin:20px 15px; font-size: 15px; line-height: 26px;">
                <li style=""><?php echo __('30 Day Money Back Guarantee','cookie-law-info'); ?></li>
                <li style=""><?php echo __('Fast and Superior Support','cookie-law-info'); ?></li>
                <li style="">
                    <a href="https://www.webtoffee.com/product/woocommerce-order-coupon-subscription-export-import//" target="_blank" class="button button-primary button-go-pro"><?php _e('Upgrade to Premium', 'wf_csv_import_export'); ?></a>
                </li>
            </ul>
        
        <span>
            <ul class="ticked-list">
                <li><?php _e('Import and Export Subscriptions.', 'order-import-export-for-woocommerce'); ?></li>
                <li><?php _e('Filter options for Export using Order Status, Date, Coupon Type etc.', 'order-import-export-for-woocommerce'); ?></li>
                <li><?php _e('Manipulate/evaluate data prior to import.', 'order-import-export-for-woocommerce'); ?></li>
                <li><?php _e('Map and transform custom columns to WC during import.', 'order-import-export-for-woocommerce'); ?> </li>
                <li><?php _e('Choice to update or skip existing orders upon import.', 'order-import-export-for-woocommerce'); ?></li>
                <li><?php _e('Import and Export via FTP.', 'order-import-export-for-woocommerce'); ?></li>
                <li><?php _e('Schedule automatic import and export.', 'order-import-export-for-woocommerce'); ?></li>
                <li><?php _e('XML Export/Import supports Stamps.com desktop application, UPS WorldShip, Endicia and FedEx.', 'order-import-export-for-woocommerce'); ?></li>
                <li><?php _e('Third party plugin customization support.', 'order-import-export-for-woocommerce'); ?></li>
            </ul>
        </span>
        <div style="padding-bottom: 20px">
            
            <center> 
                <a href="https://www.webtoffee.com/setting-up-order-import-export-plugin-for-woocommerce/" target="_blank" class="button button-doc-demo"><?php _e('Documentation', 'order-import-export-for-woocommerce'); ?></a>
            </center>
            <center style="margin-top: 10px">
                <a href="<?php echo plugins_url('Sample_Order.csv', WF_OrderImpExpCsv_FILE); ?>" target="_blank" class=""><?php _e('Sample Order CSV', 'order-import-export-for-woocommerce'); ?></a> &MediumSpace;/ &MediumSpace;
                <a href="<?php echo plugins_url('Sample_Coupon.csv', WF_OrderImpExpCsv_FILE); ?>" target="_blank" class=""><?php _e('Sample Coupon CSV', 'order-import-export-for-woocommerce'); ?></a>
            </center>
        </div>
        
    </div>
    
</div>
