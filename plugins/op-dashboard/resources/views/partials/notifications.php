<?php if (isset($_GET['op-notify']) and $_GET['op-notify']) : ?>
    <?php
        $message = sanitize_text_field($_GET['op-notify']);
        $type    = sanitize_text_field($_GET['op-notify-type']);
    ?>
    <script>
        jQuery(function() { window.OPDashboard.Helpers.notify("<?php echo $message ?>", "<?php echo $type ?>") });
    </script>
<?php endif; ?>
