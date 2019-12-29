<div class="woocommerce">
    <div class="icon32" id="icon-woocommerce-importer"><br></div>
    <?php
    $tab = "import";
    include_once(plugin_dir_path(WF_CustomerImpExpCsv_FILE).'includes/views/html-wf-common-header.php');
    include_once(plugin_dir_path(WF_CustomerImpExpCsv_FILE).'includes/views/market.php');
    ?>
</div>
<div class="tool-box bg-white p-20p pipe-view">
    <h3 class="title"><?php _e('Import Users in CSV Format:', 'users-customers-import-export-for-wp-woocommerce'); ?></h3>
    <p><?php _e('Import Users in CSV format from your computer.You can import users/customers (in CSV format) in to the shop.', 'users-customers-import-export-for-wp-woocommerce'); ?></p>
    <?php if (!empty($upload_dir['error'])) : ?>
        <div class="error"><p><?php _e('Before you can upload your import file, you will need to fix the following error:', 'users-customers-import-export-for-wp-woocommerce'); ?></p>
            <p><strong><?php echo $upload_dir['error']; ?></strong></p></div>

    <?php else : ?>
        <form enctype="multipart/form-data" id="import-upload-form" method="post" action="<?php echo esc_attr(wp_nonce_url($action, 'import-upload')); ?>">
            <table class="form-table">
                <tbody>
                    <tr>
                        <th>
                            <label for="upload"><?php _e('Select a file from your computer', 'users-customers-import-export-for-wp-woocommerce'); ?></label>
                        </th>
                        <td>
                            <input type="file" id="upload" name="import" size="25" />
                            <input type="hidden" name="action" value="save" />
                            <input type="hidden" name="max_file_size" value="<?php echo $bytes; ?>" /><br>
                            <small><?php _e('Please upload UTF-8 encoded CSV', 'users-customers-import-export-for-wp-woocommerce'); ?> &nbsp; -- &nbsp; <?php printf(__('Maximum size: %s', 'users-customers-import-export-for-wp-woocommerce'), $size); ?></small>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p class="submit">
                <input type="submit" class="button button-primary" value="<?php esc_attr_e('Upload file and import'); ?>" />
            </p>
        </form>
    <?php endif; ?>
</div>