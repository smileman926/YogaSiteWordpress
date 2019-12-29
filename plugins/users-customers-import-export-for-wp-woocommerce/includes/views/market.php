<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>

<style>
    .wf_customer_import_export.market-box{
    width:30%;
    float: right;
}

.wf_customer_import_export .uipe-premium-features{
    background: #fff;
    padding: 5px;
/*    margin-bottom: 23px;*/
    margin-top: 5px;
}
.wf_customer_import_export .uipe-premium-features ul {
    padding-left: 20px;
    padding-right: 20px;
}
.wf_customer_import_export .uipe-premium-features .ticked-list li {
    margin-bottom: 15px;
    padding-left: 15px;
}
.wf_customer_import_export .uipe-premium-features .ticked-list li:before
{
    font-family: dashicons;
    text-decoration: inherit;
    font-weight: 400;
    font-style: normal;
    vertical-align: top;
    text-align: center;
    content: "\f147";
    margin-right: 10px;
    margin-left: -25px;
    font-size: 16px;
    color: #3085bb;
}
.wf_customer_import_export .uipe-premium-features .button {
    /*margin-bottom: 20px;*/
}
.wf_customer_import_export .uipe-premium-features .button-go-pro {
    box-shadow: none;
    border: 0;
    text-shadow: none;
    padding: 10px 15px;
    height: auto;
    font-size: 16px;
    border-radius: 4px;
    font-weight: 400;
    background: #00cb95;
/*    margin-top: 20px;*/
}
.wf_customer_import_export .uipe-premium-features .button-go-pro:hover,
.wf_customer_import_export .uipe-premium-features .button-go-pro:focus,
.wf_customer_import_export .uipe-premium-features .button-go-pro:active {
    background: #00a378;
}
.wf_customer_import_export .uipe-premium-features .button-doc-demo {
    border: 0;
    background: #d8d8dc;
    box-shadow: none;
    padding: 10px 15px;
    font-size: 15px;
    height: auto;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;
}
.wf_customer_import_export .uipe-premium-features .button-doc-demo:hover,
.wf_customer_import_export .uipe-premium-features .button-doc-demo:focus,
.wf_customer_import_export .uipe-premium-features .button-doc-demo:active {
    background: #dfdfe4;
}
.wf_customer_import_export .xa-uipe-rating-link{color:#ffc600;}

.wf_customer_import_export .uipe-review-widget{    
    background: #fff;
    padding: 5px;
    margin-bottom: 23px;
}
.wf_customer_import_export .uipe-review-widget p{
    margin-right:5px;
    margin-left:5px;
}
</style>
<div class="wf_customer_import_export market-box table-box-main">
    <div class="uipe-review-widget">
        <?php
        echo sprintf(__('<div class=""><p><i>If you like the plugin please leave us a %1$s review!</i><p></div>', 'users-customers-import-export-for-wp-woocommerce'), '<a href="https://wordpress.org/support/plugin/users-customers-import-export-for-wp-woocommerce/reviews?rate=5#new-post" target="_blank" class="xa-uipe-rating-link" data-reviewed="' . esc_attr__('Thanks for the review.', 'users-customers-import-export-for-wp-woocommerce') . '">&#9733;&#9733;&#9733;&#9733;&#9733;</a>');
        ?>
    </div>
    
    <div class="uipe-premium-features">
    <ul style="font-weight: bold; color:#666; list-style: none; background:#f8f8f8; padding:20px; margin:20px 15px; font-size: 15px; line-height: 26px;">
                <li style=""><?php echo __('30 Day Money Back Guarantee','users-customers-import-export-for-wp-woocommerce'); ?></li>
                <li style=""><?php echo __('Fast and Superior Support','users-customers-import-export-for-wp-woocommerce'); ?></li>
                <li style="">
                    <a href="https://www.webtoffee.com/product/wordpress-users-woocommerce-customers-import-export/" target="_blank" class="button button-primary button-go-pro"><?php _e('Upgrade to Premium', 'users-customers-import-export-for-wp-woocommerce'); ?></a>
                </li>
        </ul>
    <span>
        <ul class="ticked-list">
            <li style='color:red;'><strong><?php _e('Your Business is precious! Go Premium!','users-customers-import-export-for-wp-woocommerce'); ?></strong></li>
        
                <li><?php _e('WebToffee Import Export Users Plugin Premium version helps you to seamlessly import/export Customer details into your Woocommerce Store.', 'users-customers-import-export-for-wp-woocommerce'); ?></li>
        
                <li><?php _e('Export/Import WooCommerce Customer details into a CSV file.', 'users-customers-import-export-for-wp-woocommerce'); ?><strong><?php _e('( Basic version supports only WordPress User details )', 'users-customers-import-export-for-wp-woocommerce'); ?></strong></li>
                <li><?php _e('Various Filter options for exporting Customers.', 'users-customers-import-export-for-wp-woocommerce'); ?></li>
                <li><?php _e('Map and Transform fields while Importing Customers.', 'users-customers-import-export-for-wp-woocommerce'); ?></li>
                <li><?php _e('Change values while importing Customers using Evaluation Fields.', 'users-customers-import-export-for-wp-woocommerce'); ?></li>
                <li><?php _e('Choice to Update or Skip existing imported Customers.', 'users-customers-import-export-for-wp-woocommerce'); ?></li>
                <li><?php _e('Choice to Send or Skip Emails for newly imported Customers.', 'users-customers-import-export-for-wp-woocommerce'); ?></li>
                <li><?php _e('Import/Export file from/to a remote server via FTP in Scheduled time interval with Cron Job.', 'users-customers-import-export-for-wp-woocommerce'); ?></li>
                <li><?php _e('Excellent Support for setting it up!', 'users-customers-import-export-for-wp-woocommerce'); ?></li>
                <li><?php _e('BuddyPress Plugin compatible,', 'users-customers-import-export-for-wp-woocommerce'); ?></li>
                <li><?php _e('Ultimate Member – User Profile & Membership Plugin compatible,', 'users-customers-import-export-for-wp-woocommerce'); ?></li>
                <li><?php _e('Ultimate Membership Pro Plugin compatible,', 'users-customers-import-export-for-wp-woocommerce'); ?></li>
                <li><?php _e('Better Notifications for WP Plugin compatible,', 'users-customers-import-export-for-wp-woocommerce'); ?></li>
                <li><?php _e('Advanced Custom Fields (ACF) Plugin compatible,', 'users-customers-import-export-for-wp-woocommerce'); ?></li>


        </ul>
    </span>
    <center style="padding-bottom: 20px"> 
        
        <a href="https://www.webtoffee.com/category/documentation/wordpress-users-woocommerce-customers-import-export/" target="_blank" class="button button-doc-demo"><?php _e('Documentation', 'users-customers-import-export-for-wp-woocommerce'); ?></a></center>
    </div>
    
    </div>
