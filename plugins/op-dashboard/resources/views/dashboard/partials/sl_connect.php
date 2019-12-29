<?php
    use function OPDashboard\partial;

    if ( ! defined('ABSPATH')) {
        exit;
    }
?>

<?php if ( ! OPDashboard\check_basic_op_requirements() ) : ?>
    <?php OPDashboard\view( 'dashboard/partials/check_requirements' ) ?>
<?php else : ?>
    <?php if (isset($error) and isset($error['message'])) : ?>
        <div class="ops-alert ops-alert-warning ops-box-size-max"><?php echo $error['message']; ?></div>
    <?php endif; ?>

    <div class="ops-white-box ops-box-size-max">
        <?php if (isset($error) and isset($error['message'])) : ?>
            <p><?php _e('Please try reconnecting your OptimizePress account.', 'opdash'); ?></p>
        <?php else : ?>
            <p><?php _e('Please connect your OptimizePress account. You will need your logins setup when you purchased OptimizePress.', 'opdash'); ?></p>
        <?php endif; ?>

        <?php partial('dashboard/partials/sl_connect_button') ?>
    </div>
<?php endif; ?>
