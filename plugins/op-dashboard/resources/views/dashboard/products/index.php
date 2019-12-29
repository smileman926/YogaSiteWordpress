<?php
    if ( ! defined('ABSPATH')) {
        exit;
    }

    if ( ! isset($customer)) {
        return;
    }
?>

<?php if ($customer->products->count()) : ?>
	<?php foreach ($customer->products as $product) : ?>
		<?php if ($product->uid != 'op-dashboard') : ?>
            <div class="opd-product-list-item opd-product-list-item-<?php echo $product->uid ?>">
                <div class="ops-white-box">
	                <?php OPDashboard\view('dashboard/products/item', ['product' => $product]) ?>
                </div>
            </div>
		<?php endif; ?>
	<?php endforeach; ?>
<?php endif; ?>
