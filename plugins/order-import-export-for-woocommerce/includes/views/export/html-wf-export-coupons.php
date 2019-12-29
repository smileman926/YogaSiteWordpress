<div class="tool-box bg-white p-20p">
    <h3 class="title"><?php _e('Export Coupon in CSV Format:', 'order-import-export-for-woocommerce'); ?></h3>
    <p><?php _e('Export and download your coupons in CSV format. This file can be used to import coupons back into your Woocommerce shop.', 'order-import-export-for-woocommerce'); ?></p>
    <form action="<?php echo admin_url('admin.php?page=wf_coupon_csv_im_ex&action=export'); ?>" method="post">

        <table class="form-table">
            
        </table>
        <p class="submit"><input type="submit" class="button button-primary" value="<?php _e('Export Coupons', 'order-import-export-for-woocommerce'); ?>" /></p>
    </form>
</div>
</div>
        <?php include(WT_OrdImpExpCsv_BASE . 'includes/views/market.php'); ?>
        <div class="clearfix"></div>
</div>