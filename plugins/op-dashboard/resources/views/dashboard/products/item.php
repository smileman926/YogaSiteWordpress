<?php
    if (! defined('ABSPATH')) {
        exit;
    }

    if (! isset($product)) {
        return;
    }
?>

<div class="opd-product-info ops-vertical-flex">
    <?php
        $installed          = $product->isInstalled();
        $activated          = $product->isActive();
        $latestRelease      = $product->latestAvailableRelease();
        $currentVersion     = $product->registry()->version;
        $latestVersion      = $latestRelease ? $latestRelease['version'] : null;
        $hasUpdateAvailable = $product->hasAvailableUpdates();
    ?>

    <div class="d-flex flex-wrap flex-column justify-content-between">
        <div>
            <div class="opd-product-name d-flex align-items-center">
                <div>
                    <div class="opd-product-icon"></div>
                </div>

                <div>
                    <span class="opd-product-type">
                        <?php if ($product->type === 'plugin') : ?>
                            <?php _e('Plugin', 'optimizepress'); ?>
                        <?php elseif ($product->type === 'theme') : ?>
                            <?php _e('Theme', 'optimizepress'); ?>
                        <?php endif; ?>
                    </span>
                    <h4><?php echo $product->title ?></h4>
                </div>
            </div>

            <p class="opd-product-description"><?php echo $product->description; ?></p>
        </div>
        <div>
            <?php OPDashboard\view('dashboard/products/version_availability', ['product' => $product]) ?>

	        <?php OPDashboard\view('dashboard/products/buttons', ['product' => $product]) ?>
        </div>
    </div>
</div>

