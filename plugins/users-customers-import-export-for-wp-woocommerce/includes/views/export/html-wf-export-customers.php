<div class="tool-box bg-white p-20p pipe-view">
    <h3 class="title"><?php _e('Export Users in CSV Format:', 'users-customers-import-export-for-wp-woocommerce'); ?></h3>
    <p><?php _e('Export and download your Users in CSV format. This file can be used to import users back into your Website.', 'users-customers-import-export-for-wp-woocommerce'); ?></p>
    <form action="<?php echo admin_url('admin.php?page=hf_wordpress_customer_im_ex&action=export'); ?>" method="post">

        <table class="form-table">
            <tr>
                <th>
                    <label for="v_user_roles"><?php _e('User Roles', 'users-customers-import-export-for-wp-woocommerce'); ?></label>
                </th>
                <td>
                    <select id="v_user_roles" name="user_roles[]" data-placeholder="<?php _e('All Roles', 'users-customers-import-export-for-wp-woocommerce'); ?>" class="wc-enhanced-select" multiple="multiple">
                        
                        <?php
                            global $wp_roles;

                            foreach ( $wp_roles->role_names as $role => $name ) {
                                    echo '<option value="' . esc_attr( $role ) . '">' . $name . '</option>';
                            }
                        ?>
                    </select>
                                                        
                    <p style="font-size: 12px"><?php _e('Users with these roles will be exported.', 'users-customers-import-export-for-wp-woocommerce'); ?></p>
                </td>
            </tr>  
            <tr>
                <th>
                    <label for="v_offset"><?php _e('Offset', 'users-customers-import-export-for-wp-woocommerce'); ?></label>
                </th>
                <td>
                    <input type="text" name="offset" id="v_offset" placeholder="<?php _e('0', 'users-customers-import-export-for-wp-woocommerce'); ?>" class="input-text" />
                    <p style="font-size: 12px"><?php _e('The number of users to skip before returning.', 'users-customers-import-export-for-wp-woocommerce'); ?></p>
                </td>
            </tr>            
            <tr>
                <th>
                    <label for="v_limit"><?php _e('Limit', 'users-customers-import-export-for-wp-woocommerce'); ?></label>
                </th>
                <td>
                    <input type="text" name="limit" id="v_limit" placeholder="<?php _e('Unlimited', 'users-customers-import-export-for-wp-woocommerce'); ?>" class="input-text" />
                    <p style="font-size: 12px"><?php _e('The number of users to return.', 'users-customers-import-export-for-wp-woocommerce'); ?></p>
                </td>
            </tr>           
            <tr>
                <th>
                    <label for="v_columns"><?php _e('Columns', 'users-customers-import-export-for-wp-woocommerce'); ?></label>
                </th>
            <table id="datagrid">
                <th style="text-align: left;">
                    <label for="v_columns"><?php _e('Column', 'users-customers-import-export-for-wp-woocommerce'); ?></label>
                </th>
                <th style="text-align: left;">
                    <label for="v_columns_name"><?php _e('Column Name', 'users-customers-import-export-for-wp-woocommerce'); ?></label>
                </th>
                 <!-- select all boxes -->
                        <tr>
                            <td style="padding: 10px;">
                                <a href="#" id="pselectall" onclick="return false;" ><?php _e('Select all', 'users-customers-import-export-for-wp-woocommerce'); ?></a> &nbsp;/&nbsp;
                                <a href="#" id="punselectall" onclick="return false;"><?php _e('Unselect all', 'users-customers-import-export-for-wp-woocommerce'); ?></a>
                            </td>
                        </tr>
                
                <?php foreach ($post_columns as $pkey => $pcolumn) { ?>
                <tr>
                    <td>
                        <input name= "columns[<?php echo $pkey; ?>]" type="checkbox" value="<?php echo $pkey; ?>" checked>
                        <label for="columns[<?php echo $pkey; ?>]"><?php _e($pcolumn, 'users-customers-import-export-for-wp-woocommerce'); ?></label>
                    </td>
                    <td>
                         <input type="text" name="columns_name[<?php echo $pkey; ?>]"  value="<?php echo $pkey; ?>" class="input-text" />
                    </td>
                </tr>
                <?php } ?>                
            </table><br/>
            </tr>
        </table>
        <p class="submit"><input type="submit" class="button button-primary" value="<?php _e('Export Users', 'users-customers-import-export-for-wp-woocommerce'); ?>" /></p>
    </form>
</div>

<script>
    jQuery(document).ready(function (a) {
    "use strict";
            // Listen for click on toggle checkbox
            jQuery('#pselectall').live("click", function () {
                // Iterate each checkbox
                jQuery(':checkbox').each(function () {
                    this.checked = true;
                });
            });
            jQuery('#punselectall').live("click", function () {
                // Iterate each checkbox
                jQuery(':checkbox').each(function () {
                    this.checked = false;
                });
            });
        });
</script>

<?php if(!class_exists('WooCommerce')){ ?>
<script>
    jQuery(document).ready(function () {
        jQuery('.wc-enhanced-select').select2();

    });
</script>
<?php } ?>
