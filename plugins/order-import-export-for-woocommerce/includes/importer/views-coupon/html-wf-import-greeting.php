<div class="wrap woocommerce">
    <div class="icon32" id="icon-woocommerce-importer"><br></div>
    <h2 class="nav-tab-wrapper woo-nav-tab-wrapper">
        <a href="<?php echo admin_url('admin.php?page=wf_woocommerce_order_im_ex') ?>" class="nav-tab"><?php _e('Order Import / Export', 'order-import-export-for-woocommerce'); ?></a>
        <a href="<?php echo admin_url('admin.php?page=wf_coupon_csv_im_ex&tab=coupon') ?>" class="nav-tab nav-tab-active"><?php _e('Coupon Import / Export', 'order-import-export-for-woocommerce'); ?></a>
        <a href="<?php echo admin_url('admin.php?page=wf_woocommerce_order_im_ex&tab=subscription') ?>" class="nav-tab"><?php _e('Subscription Import / Export', 'order-import-export-for-woocommerce'); ?></a>
        <a href="<?php echo admin_url('admin.php?page=wf_woocommerce_order_im_ex&tab=help') ?>" class="nav-tab"><?php _e('Help', 'order-import-export-for-woocommerce'); ?></a>
        <a href="https://www.webtoffee.com/product/woocommerce-order-coupon-subscription-export-import/" target="_blank" class="nav-tab nav-tab-premium"><?php _e('Upgrade to Premium for More Features', 'order-import-export-for-woocommerce'); ?></a>
    </h2>
    <div class="orderimpexp-main-box">
        <div class="tool-box bg-white p-20p orderimpexp-view">
	<p><?php _e( 'You can import coupons (in CSV format) in to the shop by uploading a CSV file.', 'order-import-export-for-woocommerce' ); ?></p>

	<?php if ( ! empty( $upload_dir['error'] ) ) : ?>
		<div class="error"><p><?php _e('Before you can upload your import file, you will need to fix the following error:'); ?></p>
		<p><strong><?php echo $upload_dir['error']; ?></strong></p></div>
	<?php else : ?>
		<form enctype="multipart/form-data" id="import-upload-form" method="post" action="<?php echo esc_attr(wp_nonce_url($action, 'import-upload')); ?>">
			<table class="form-table">
				<tbody>
					<tr>
						<th>
							<label for="upload"><?php _e( 'Select a file from your computer' ); ?></label>
						</th>
						<td>
							<input type="file" id="upload" name="import" size="25" />
							<input type="hidden" name="action" value="save" />
                                                        <input type="hidden" name="max_file_size" value="<?php echo $bytes; ?>" /><br>
							<small><?php _e('Please upload UTF-8 encoded CSV', 'order-import-export-for-woocommerce'); ?> &nbsp; -- &nbsp; <?php printf( __('Maximum size: %s' ), $size ); ?></small>
						</td>
					</tr>
  
				</tbody>
			</table>
			<p class="submit">
				<input type="submit" class="button button-primary" value="<?php esc_attr_e( 'Upload file and import' ); ?>" />
			</p>
		</form>
	<?php endif; ?>
        </div>
        <?php include(WT_OrdImpExpCsv_BASE . 'includes/views/market.php'); ?>
        <div class="clearfix"></div>
    </div>
</div>