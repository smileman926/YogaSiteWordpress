<?php $tab = (isset($_GET['tab'])?$_GET['tab']:'import'); ?>
<div class="woocommerce">
	<div class="icon32" id="icon-woocommerce-importer"><br></div>
    <h2 class="nav-tab-wrapper woo-nav-tab-wrapper">
        <a href="<?php echo admin_url('admin.php?page=wf_woocommerce_order_im_ex') ?>" class="nav-tab <?php echo ($tab == 'import') ? 'nav-tab-active' : ''; ?>"><?php _e('Order Import / Export', 'order-import-export-for-woocommerce'); ?></a>
        <a href="<?php echo admin_url('admin.php?page=wf_coupon_csv_im_ex&tab=coupon') ?>" class="nav-tab <?php echo ($tab == 'coupon') ? 'nav-tab-active' : ''; ?>"><?php _e('Coupon Import / Export', 'order-import-export-for-woocommerce'); ?></a>
        <a href="<?php echo admin_url('admin.php?page=wf_woocommerce_order_im_ex&tab=subscription') ?>" class="nav-tab <?php echo ($tab == 'subscription') ? 'nav-tab-active' : ''; ?>"><?php _e('Subscription Import / Export', 'order-import-export-for-woocommerce'); ?></a>
        <a href="<?php echo admin_url('admin.php?page=wf_woocommerce_order_im_ex&tab=help') ?>" class="nav-tab <?php echo ($tab == 'help') ? 'nav-tab-active' : ''; ?>"><?php _e('Help', 'order-import-export-for-woocommerce'); ?></a>
        <a href="https://www.webtoffee.com/product/woocommerce-order-coupon-subscription-export-import/" target="_blank" class="nav-tab nav-tab-premium"><?php _e('Upgrade to Premium for More Features', 'order-import-export-for-woocommerce'); ?></a>
    </h2>

<form action="<?php echo admin_url('admin.php?import=' . $this->import_page . '&step=2&merge=' . $merge); ?>" method="post" id="nomap">
    <?php wp_nonce_field('import-woocommerce'); ?>
    <input type="hidden" name="import_id" value="<?php echo $this->id; ?>" />
    <?php if ($this->file_url_import_enabled) : ?>
        <input type="hidden" name="import_url" value="<?php echo $this->file_url; ?>" />
    <?php endif; ?>
    <p class="submit">
        <input style="display:none" type="submit" class="button button-primary" value="<?php esc_attr_e('Submit', 'order-import-export-for-woocommerce'); ?>" />
        <input type="hidden" name="delimiter" value="<?php echo $this->delimiter ?>" />
        <input type="hidden" name="merge_empty_cells" value="<?php echo $this->merge_empty_cells ?>" />
    </p>
</form>
<script type="text/javascript"> 
jQuery(document).ready(function(){
   jQuery("form#nomap").submit();
});
</script>
</div>