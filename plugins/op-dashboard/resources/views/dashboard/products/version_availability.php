<?php
    if (! defined('ABSPATH')) {
        exit;
    }

    /** @var OPDashboard\Products\Product $product */
    if (! isset($product)) {
        return;
    }
?>

<p class="opd-version-availability">
    <?php if (OPDashboard\sl_license_is_valid()) : ?>
        <?php
            $latestRelease = $product->latestAvailableRelease();
            $latestVersion = $latestRelease ? $latestRelease['version'] : null;
        ?>

        <?php if ( $product->isInstalled() ) : ?>
            <?php if ( ! $product->hasAvailableUpdates() ) : ?>
                <?php _e('Version', 'opdash') ?>: <?php echo $product->registry()->version; ?>
            <?php else : ?>
                <?php if (! $product->isInDevelopment()) : ?>
                    <?php
                        $updateUrl = $product->type === 'theme' ?
                            admin_url('themes.php') :
                            admin_url('plugins.php?plugin_status=upgrade');
                    ?>

                    <a href="<?php echo $updateUrl ?>"><?php _e('Update available', 'opdash') ?>: <?php echo $latestVersion; ?></a>
                    <br><?php _e('You have', 'opdash') ?>: <?php echo $product->registry()->version; ?>
                <?php else : ?>
                    <?php _e('You have', 'opdash') ?>: Development version
                <?php endif; ?>

            <?php endif; ?>
        <?php elseif ( $latestVersion ) : ?>
            <?php _e('Available version', 'opdash') ?>: <?php echo $latestVersion; ?>
        <?php endif; ?>
    <?php endif; ?>
</p>
