<?php if (OPDashboard\updates_are_available()) : ?>
    <div class="ops-white-box opd-update-suite">
        <h3>Updates available</h3>
        <p>Updates are available for some of the OptimizePress products</p>

        <ul class="op-product-update-list">
            <?php foreach (\OPDashboard\Products\Updates::listProducts() as $product) : ?>
                <?php
                    $uid           = $product->uid;
                    $title         = $product->title;
                    $file          = $product->registry()->file;
                    $updateUrl     = wp_nonce_url(self_admin_url('update.php?action=upgrade-plugin&plugin=' . $file), 'upgrade-plugin_' . $file);
                    $latestRelease = $product->latestAvailableRelease();
                    $latestVersion = $latestRelease ? $latestRelease['version'] : null;
                ?>

                <?php if (! $product->isInDevelopment()) : ?>
                    <li class="op-product-update-item op-product-update-pending"
                        data-slug="<?php echo $uid ?>"
                        data-file="<?php echo $file ?>"
                        data-type="<?php echo $product->type; ?>"
                        data-title="<?php echo $title ?>"
                        data-version="<?php echo $latestVersion ?>"
                    >
                        <?php echo $title ?> <em><?php echo $latestVersion ?></em>

                        <?php if ($product->uid == 'op-dashboard') : ?>
                            <p><small style="color: #c00;">
                                You have: <?php echo $product->registry()->version; ?>
                                The OptimizePress Dashboard needs to be updated from the plugins page directly.
                            </small></p>
                        <?php elseif ($product->isInDevelopment()) : ?>
                            <p><small style="color: #c00;">
                                Can't update. You have a .git directory in your product directory. This means you have a developer version installed.
                            </small></p>
                        <?php else : ?>
                            <p><small>
                                You have: <?php echo $product->registry()->version; ?>
                                <?php OPDashboard\view('dashboard/products/button_update', ['product' => $product, 'visible' => false]) ?>
                            </small></p>
                        <?php endif; ?>
                    </li>
                <?php endif; ?>
            <?php endforeach; ?>
        </ul>

        <a href="<?php echo self_admin_url('update-core.php') ?>" class="update-op-suite-link ops-button opd-button-update" data-confirm="Are you sure you want to update all OptimizePress products?">Update OptimizePress Suite</a>
    </div>
<?php endif; ?>
