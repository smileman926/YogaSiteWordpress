<?php
    if (! defined('ABSPATH')) {
        exit;
    }

    if (! isset($product)) {
        return;
    }
?>

<?php if ($product->isInstalled()) : ?>
    <?php if ($product->isActive()) : ?>
        <?php OPDashboard\view('dashboard/products/button_deactivate', ['product' => $product]) ?>
    <?php else : ?>
        <?php OPDashboard\view('dashboard/products/button_activate', ['product' => $product]) ?>
    <?php endif; ?>
<?php elseif (! $product->isInstalled() and OPDashboard\sl_license_is_valid()) : ?>
    <?php OPDashboard\view('dashboard/products/button_install', ['product' => $product]) ?>
<?php endif; ?>
