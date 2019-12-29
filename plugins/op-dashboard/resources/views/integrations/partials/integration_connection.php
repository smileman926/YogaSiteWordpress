<?php
if ( ! defined('ABSPATH')) {
    exit;
}

if ( ! isset($integration)) {
    return;
}
/** @var OptimizePress\Integrations\Integration $integration */
?>

<?php if ($integration->type !== 'email') : ?>
    <div class="opd-dashboard-integrations-list-item" data-url="">
        <div class="ops-white-box text-center">
            <div class="d-flex flex-wrap">
                <div>
                    <img
                        class="opd-integration-logo"
                        srcset="
                            <?php echo OPD_URL;?>public/assets/images/providers/integration-<?php echo $integration->provider;?>.png,
                            <?php echo OPD_URL;?>public/assets/images/providers/integration-<?php echo $integration->provider;?>-2x.png 2x
                        "
                        src="<?php echo OPD_URL;?>public/assets/images/providers/integration-<?php echo $integration->provider;?>.png"
                        alt="<?php echo $integration->title ?>">
                </div>

                <div>
                    <h4><?php echo $integration->title ?></h4>
                </div>
            </div>

            <?php if ($integration->type === 'oauth') : ?>
                <?php if ($integration->authorizesThroughSL()) : ?>
                    <?php OPDashboard\partial('integrations/partials/integration_oauth_sl_connection', ['integration' => $integration]) ?>
                <?php else : ?>
                    <?php OPDashboard\partial('integrations/partials/integration_oauth_connection', ['integration' => $integration]) ?>
                <?php endif; ?>
            <?php else : ?>
                <?php OPDashboard\partial('integrations/partials/integration_default_connection', ['integration' => $integration]) ?>
            <?php endif; ?>
        </div>
    </div>
<?php endif; ?>
