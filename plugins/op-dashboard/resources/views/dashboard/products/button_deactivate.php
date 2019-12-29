<?php
    if (! defined('ABSPATH')) {
        exit;
    }
    /**
     * @var OPDashboard\Products\Product $product
     */
    if (! isset($product)) {
        return;
    }
?>

<?php if ($product->type === 'plugin') : ?>
    <a class="ops-button ops-button-block ops-transparent" href="<?php echo OPDashboard\product_deactivate_url( $product ) ?>">
        <?php _e('Deactivate', 'opdash') ?>
    </a>
<?php elseif ($product->type === 'theme') : ?>
    <a class="ops-button ops-button-block ops-transparent" href="<?php echo admin_url('themes.php') ?>">
        <?php _e('Deactivate', 'opdash') ?>
    </a>
<?php endif; ?>
