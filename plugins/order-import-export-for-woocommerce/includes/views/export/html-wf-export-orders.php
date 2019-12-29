<div class="tool-box bg-white p-20p">
    <h3 class="title"><?php _e('Export Settings:', 'order-import-export-for-woocommerce'); ?></h3>
    <p><?php _e('Export and download your orders in CSV format. This file can be used to import orders back into your Woocommerce shop.', 'order-import-export-for-woocommerce'); ?></p>
    <form action="<?php echo admin_url('admin.php?page=wf_woocommerce_order_im_ex&action=export'); ?>" method="post">
        <table class="form-table">
            <tr>
                <th>
                    <label for="ord_offset"><?php _e('Offset', 'order-import-export-for-woocommerce'); ?></label>
                </th>
                <td>
                    <input type="text" name="offset" id="ord_offset" placeholder="0" class="input-text" />
                    <p style="font-size: 12px"><?php _e('Number of orders to skip before exporting. If the value is 0 no orders are skipped. If value is 100, orders from order id 101 will be exported.', 'order-import-export-for-woocommerce'); ?></p>
                </td>
            </tr>
            <tr>
                <th>
                    <label for="ord_limit"><?php _e('Limit', 'order-import-export-for-woocommerce'); ?></label>
                </th>
                <td>
                    <input type="text" name="limit" id="ord_limit" placeholder="<?php _e('Unlimited', 'order-import-export-for-woocommerce'); ?>" class="input-text" />
                    <p style="font-size: 12px"><?php _e('Number of orders to export. If no value is given all orders will be exported. This is useful if you have large number of orders and want to export partial list of orders.', 'order-import-export-for-woocommerce'); ?></p>
                </td>
            </tr>
        </table>
        <p class="submit"><input type="submit" class="button button-primary" value="<?php _e('Export Orders', 'order-import-export-for-woocommerce'); ?>" /></p>
    </form>
</div>
</div>
        <?php include(WT_OrdImpExpCsv_BASE . 'includes/views/market.php'); ?>
        <div class="clearfix"></div>
</div>