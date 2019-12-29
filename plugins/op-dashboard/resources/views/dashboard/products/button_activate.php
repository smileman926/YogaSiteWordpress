<?php
    if ( ! defined('ABSPATH')) {
        exit;
    }

    if ( ! isset($product)) {
        return;
    }
?>

<?php if ($product->type === 'theme' && is_multisite() && ! OPDashboard\is_theme_network_theme_available($product->uid)) : ?>
    <a class="ops-button ops-button-block" href="<?php echo OPDashboard\theme_network_enable_url($product->uid) ?>">
        <?php _e('Network enable', 'opdash') ?>
    </a>
<?php else : ?>
    <a class="ops-button ops-button-block" href="<?php echo OPDashboard\product_activate_url($product) ?>">
        <?php _e( 'Activate', 'opdash' ) ?>
    </a>
<?php endif; ?>
