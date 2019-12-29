<?php
    $uid       = $product->uid;
    $title     = $product->title;
    $file      = $product->registry()->file;
    $updateUrl = wp_nonce_url(self_admin_url('update.php?action=upgrade-plugin&plugin=' . $file), 'upgrade-plugin_' . $file);
    $label     = isset($label) ? $label : __('Update', 'opd');
    $channel   = isset($channel) ? $channel : 'stable';
    $visible   = (bool) isset($visible) ? $visible : true;
?>

<!--<a class="ops-button opd-button-update opd-product-button---><?php //echo $product->uid ?><!--" href="--><?php //echo OPDashboard\product_update_url($product->uid) ?><!--">--><?php //_e('Update', 'opd') ?><!--</a>-->
<a href="<?php echo $updateUrl; ?>"
   class="update-op-product-link opd-button-update opd-product-button-<?php echo $product->uid ?>"
   data-slug="<?php echo $uid ?>"
   data-file="<?php echo $file ?>"
   data-type="<?php echo $product->type; ?>"
   data-channel="<?php echo $channel ?>"
   style="<?php echo $visible ? 'display: inline-block;' : 'display: inline-block;' ?>"

    <?php if ($channel === 'beta') : ?>
        data-confirm="Are you sure you want to install a beta release?"
    <?php elseif ($channel === 'demo') : ?>
        data-confirm="Are you sure you want to install a demo release? WARNING: You could loose any changes and break the plugin."
    <?php endif; ?>
>
    <?php echo $label ?>

    <?php if ($channel !== 'stable') : ?>
        <span class="badge badge-warning"><?php echo $channel ?></span>
    <?php endif; ?>
</a>
