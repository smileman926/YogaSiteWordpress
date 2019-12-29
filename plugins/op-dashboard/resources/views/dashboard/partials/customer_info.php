<?php
    if ( ! defined('ABSPATH')) {
        exit;
    }

    $licenceValidDate    = \OPDashboard\sl_license_valid_date();
    $isLicenseValid      = \OPDashboard\sl_license_is_valid();
    $isLicenseValidClass = $isLicenseValid ? '' : ' ops-danger';
?>

<div class="opd-dashboard-connected-introduction ops-box-size-max">
    <div class="ops-white-box ops-two-column">
        <div class="d-flex justify-content-between">
            <div>
                <p class="opd-welcome"><?php _e( 'Welcome to your OptimizePress site!', 'opdash' ); ?></p>
                <p class="opd-customer"><?php _e( 'Hello ', 'opdash' ); ?><?php echo $customer->getFullNameAttribute(); ?></p>

                <p class="m-0">
                    <?php _e('You currently have the', 'optimizepress'); ?>
                    <strong>"<?php echo $customer->tier->title ?>"</strong>.<br />

                    <?php _e('To disconnect your site, click', 'optimizepress'); ?>
                    <a href="<?php echo \OPDashboard\sl_disconnect_url() ?>"><?php _e('here', 'optimizepress'); ?></a>.
                </p>
            </div>

            <div>
                <p class="opd-licenseValidation <?php echo $isLicenseValidClass; ?>">
                    <?php if ($isLicenseValid) : ?>
                        <?php _e('Your OptimizePress license is currently valid.', 'opdash'); ?>
                    <?php else: ?>
                        <?php _e('Your OptimizePress license is NOT valid.', 'optimizepress'); ?>
                    <?php endif; ?>

                    <br>

                    <strong>
                        <?php _e('License renewal date is', 'optimizepress'); ?>
                        <?php echo date(get_option('date_format'), $licenceValidDate); ?>
                    </strong>
                </p>
            </div>
        </div>
    </div>
</div>
