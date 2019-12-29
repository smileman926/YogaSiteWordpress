<div class="tool-box">
    <h3 class="title"><?php _e('Import Users in CSV Format:', 'users-customers-import-export-for-wp-woocommerce'); ?></h3>
    <p><?php _e('Import Users in CSV format from your computer', 'users-customers-import-export-for-wp-woocommerce'); ?></p>
    <p class="submit">
        <?php $import_url = admin_url('admin.php?import=wordpress_hf_user_csv'); ?>
        <a class="button button-primary" id="mylink" href="<?php echo $import_url; ?>"><?php _e('Import Users', 'users-customers-import-export-for-wp-woocommerce'); ?></a>
    </p>
</div>