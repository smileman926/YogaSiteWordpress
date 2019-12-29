<?php
if ( ! defined('ABSPATH')) {
    exit;
}
?>
<?php OPDashboard\partial('partials/blank_style') ?>

<script>
    window.location = "<?php echo admin_url('admin.php') . '?page=op-dashboard-integrations' ?>";
</script>

