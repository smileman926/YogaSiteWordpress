<?php
    if ( ! defined('ABSPATH')) {
        exit;
    }

    $customer = \OPDashboard\sl_customer_details();

    if ( ! $customer or ! $customer->is_admin) {
        return;
    }

    $plugins  = \OPDashboard\Products\Registry::plugins();
    $products = $customer->products;
?>

<div class="ops-white-box ops-box-size-max">

    <h3><?php _e('OptimizePress Updates', 'opdash'); ?></h3>



        <h5><?php _e('A list of all OptimizePress products is displayed below', 'optimizepress3') ?></h5>
        <p>
            <?php _e('Please select a product version you want, and click "Install".', 'optimizepress3') ?><br>
            <?php _e('Keep in mind if you install a beta version, or an older version of the product, you might break some of the system functionality.', 'optimizepress3') ?>
        </p>
        <br><br>

        <?php if ($products->count()) : ?>
            <?php foreach ($products as $product) : ?>
                <?php
                    $installed          = $product->isInstalled();
                    $activated          = $product->isActive();
                    $latestRelease      = $product->latestAvailableRelease();
                    $currentVersion     = $product->registry()->version;
                    $latestVersion      = $latestRelease ? $latestRelease['version'] : null;
                    $hasUpdateAvailable = $product->hasAvailableUpdates();
                ?>

                <?php if ($installed) : ?>
                    <form action="<?php echo admin_url('admin-ajax.php') ?>?action=op_dashboard_update_product_version" class="ops-form" data-opd-remote="post" data-current-version="<?php echo $currentVersion ?>" data-product-name="<?php echo $product->title ?>">
                        <?php wp_nonce_field('opd_update_product_version'); ?>
                        <input type="hidden" name="action" value="opd_update_product_version">
                        <input type="hidden" name="product_uid" value="<?php echo $product->uid; ?>">

                        <h5>
                            <strong><?php echo $product->title ?></strong>
                            v<?php echo $currentVersion ?>
                        </h5>

                        <div class="ops-form-group">
                            <label for="">Version</label>
                            <select name="version" class="ops-form-control" style="min-width: 30%;">
                                <option value="<?php echo $currentVersion ?>" selected><?php echo $currentVersion ?></option>
                            </select><br>
                            <button class="ops-button ops-button-disabled" disabled>Install version</button>
                        </div>
                    </form>

<!--                    <div class="opd-product-list-item opd-product-list-item---><?php //echo $product->uid ?><!--">-->
<!--                        <div class="ops-white-box">-->
<!--                            --><?php //OPDashboard\view( 'dashboard/products/item', ['product' => $product] ) ?>
<!--                        </div>-->
<!--                    </div>-->
                    <br><hr><br>
                <?php endif; ?>
            <?php endforeach; ?>
        <?php endif; ?>








        <?php /*<div class="form-group">
            <h5><?php _e('Select a channel for your updates', 'optimizepress3') ?></h5>
            <p>
                <?php _e('Note that if you choose the "DEMO" channel you might get broken builds.', 'optimizepress3') ?>
            </p>

            <?php if (get_option('opd_release_channel') == 'demo') : ?>
                <div class="alert alert-warning"><?php _e('You are in the DEMO channel. You might encounter bugs and experience problems releases.') ?></div>
            <?php elseif (get_option('opd_release_channel') == 'beta') : ?>
                <div class="alert alert-info"><?php _e('You are in the BETA channel. You might encounter bugs and experience problems releases.') ?></div>
            <?php endif; ?>

            <select name="opd_release_channel" class="form-control">
                <option value="stable" <?php echo get_option('opd_release_channel') == 'stable' ? "selected" : null ?>>Stable</option>
                <option value="beta"   <?php echo get_option('opd_release_channel') == 'beta'   ? "selected" : null ?>>Beta</option>
                <option value="demo"   <?php echo get_option('opd_release_channel') == 'demo'   ? "selected" : null ?>>Demo</option>
            </select>
        </div>

        <div class="ops-form-actions">
            <button class="ops-button" type="submit">Save</button>
        </div>
 */ ?>

</div>
