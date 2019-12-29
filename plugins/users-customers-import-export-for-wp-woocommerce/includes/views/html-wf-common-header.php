<h2 class="nav-tab-wrapper woo-nav-tab-wrapper">
    <a href="<?php echo admin_url('admin.php?page=hf_wordpress_customer_im_ex') ?>" class="nav-tab <?php echo ($tab == 'export') ? 'nav-tab-active' : ''; ?>"><?php _e('User/Customer Export', 'users-customers-import-export-for-wp-woocommerce'); ?></a>
    <a href="<?php echo admin_url('admin.php?import=wordpress_hf_user_csv') ?>" class="nav-tab <?php echo ($tab == 'import') ? 'nav-tab-active' : ''; ?>"><?php _e('User/Customer Import', 'users-customers-import-export-for-wp-woocommerce'); ?></a>
    <a href="<?php echo admin_url('admin.php?page=hf_wordpress_customer_im_ex&tab=help'); ?>" class="nav-tab <?php echo ('help' == $tab) ? 'nav-tab-active' : ''; ?>"><?php _e('Help', 'wf_csv_import_export'); ?></a>
    <a href="https://www.webtoffee.com/product/wordpress-users-woocommerce-customers-import-export/" target="_blank" class="nav-tab nav-tab-premium"><?php _e('Upgrade to Premium for More Features', 'wf_csv_import_export'); ?></a>
</h2>

