<?php

use function OPDashboard\view;

if (! defined('ABSPATH')) {
        exit;
    }

    // Fetch all integration and connections
    $integrations          = OPDashboard\get_available_providers();
    $connectedIntegrations = OPDashboard\get_connected_integrations();
?>

<div class="ops-white-box ops-box-size-max integrations">
    <div class="text-center">
        <p><?php _e('To add a new connection, click the button below', 'opdash'); ?></p>
        <a href="#"
           class="ops-button opd-add-new-service-integration-btn"
           data-title="<?php _e('Select the service you want to integrate with', 'opdash'); ?>"
        >
            <?php _e('Add New Integration', 'opdash'); ?>
        </a>
    </div>
</div>

<?php if ($connectedIntegrations->count()) : ?>
    <div class="opd-connected-integrations d-flex flex-wrap">
        <?php foreach ($connectedIntegrations as $integration) : ?>
            <?php /** @var OptimizePress\Integrations\Integration $integration */ ?>

            <?php if ($integration->type !== 'webhook') : ?>
                <?php if ($integration->isConnected() or (! $integration->isConnected() and $integration->isOAuth() and ! $integration->authorizesThroughSL())) : ?>
                    <div class="opd-connected-integration-item">
                        <div class="ops-white-box">
                            <div class="ops-vertical-flex">
                                <div class="d-flex flex-wrap flex-column justify-content-between">
                                    <div>
                                        <figure>
                                            <img
                                                srcset="
                                                    <?php echo OPD_URL;?>public/assets/images/providers/integration-<?php echo $integration->provider->key;?>.png,
                                                    <?php echo OPD_URL;?>public/assets/images/providers/integration-<?php echo $integration->provider->key;?>-2x.png 2x
                                                "
                                                src="<?php echo OPD_URL;?>public/assets/images/providers/integration-<?php echo $integration->provider->key;?>.png"
                                                alt="<?php echo $integration->provider ?>">
                                        </figure>

                                        <div class="opd-inner pb-0">
                                            <h4><?php echo $integration->title ?></h4>
                                            <p><?php _e('Connect to the', 'opdash'); ?> <?php echo $integration->title ?> <?php _e('service.', 'opdash'); ?></p>
                                        </div>
                                    </div>

                                    <div class="opd-inner pt-0">
                                        <div class="d-flex flex-wrap align-items-center ops-two-column-flex">
                                            <?php if ($integration->isOAuth()) : ?>
                                                <?php if ((bool) $integration->authorizesThroughSL()) : ?>
                                                    <?php view('integrations/partials/connector_sl_oauth', ['integration' => $integration]) ?>
                                                <?php else : ?>
                                                    <?php view('integrations/partials/connector_oauth', ['integration' => $integration]) ?>
                                                <?php endif; ?>
                                            <?php else : ?>
                                                <?php view('integrations/partials/connector_default', ['integration' => $integration]) ?>
                                            <?php endif; ?>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                <?php endif; ?>
            <?php endif; ?>
        <?php endforeach; ?>
    </div>
<?php endif; ?>
