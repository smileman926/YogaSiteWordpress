<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>

<?php if (! OPDashboard\check_basic_op_requirements()) : ?>
    <div class="ops-white-box ops-danger ops-box-size-max">
        <h4 class="text-center"><?php _e('Requirements not met', 'opdash') ?></h4>
        <br>

        <?php \OPDashboard\current_php_version(); ?>

        <ul class="text-center">
            <?php if (! OPDashboard\check_basic_op_requirements_php()) : ?>
                <li class="text-center"><?php _e('The required PHP version for OptimizePress is ' . OPD_PHP_VERSION . '+, you have ' . \OPDashboard\current_php_version(), 'opdash'); ?></li>
            <?php endif; ?>

            <?php if (! OPDashboard\check_basic_op_requirements_permalinks()) : ?>
                <li class="text-center">Please enable <a href="<?php echo admin_url('options-permalink.php'); ?>" style="color: #0174fc;">permalinks in your settings</a>.</li>
            <?php endif; ?>
        </ul>

    </div>
<?php endif; ?>
