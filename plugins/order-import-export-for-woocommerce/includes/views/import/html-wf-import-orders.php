<div class="orderimpexp-main-box">
    <div class="orderimpexp-view" style="width:68%;">
        <div class="tool-box bg-white p-20p" style="margin-bottom: 20px;">
            <h3 class="title"><?php _e('Import Orders in CSV Format:', 'order-import-export-for-woocommerce'); ?></h3>
            <p class="submit">
                <?php
                $merge_url = admin_url('admin.php?import=woocommerce_wf_order_csv&merge=1');
                $import_url = admin_url('admin.php?import=woocommerce_wf_order_csv');
                ?>
                <a class="button button-primary" id="mylink" href="<?php echo admin_url('admin.php?import=woocommerce_wf_order_csv'); ?>"><?php _e('Import Orders', 'order-import-export-for-woocommerce'); ?></a>
                &nbsp;
                <input type="checkbox" id="merge" value="0"><?php _e('Update order if exists', 'order-import-export-for-woocommerce'); ?> <br>
            </p>
        </div>
        <script type="text/javascript">
            jQuery('#merge').click(function () {
                if (this.checked) {
                    jQuery("#mylink").attr("href", '<?php echo $merge_url ?>');
                } else {
                    jQuery("#mylink").attr("href", '<?php echo $import_url ?>');
                }
            });
        </script>