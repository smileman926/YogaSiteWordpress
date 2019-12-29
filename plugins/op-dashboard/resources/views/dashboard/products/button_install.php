<?php
    if (! defined('ABSPATH')) {
        exit;
    }

    if (! isset($product)) {
        return;
    }

    $uid           = $product->uid;
    $title         = $product->title;
    $file          = $product->registry()->file;
    $version       = $product->latestAvailableVersion();
    $installUrl    = OPDashboard\product_install_url($product->uid, $version);
    $label         = isset( $label ) ? $label : __('Install', 'opd');
    $channelId     = (isset($channel) and isset($channel['id'])) ? $channel['id'] : 'stable';
?>

<a href="<?php echo $installUrl; ?>"
   class="ops-button ops-button-block install-op-product-link opd-button-install opd-product-button-<?php echo $product->uid ?>"
   data-slug="<?php echo $uid ?>"
   data-type="<?php echo $product->type; ?>"
   data-version="<?php echo $version; ?>"
>
	<?php echo $label ?>
</a>
