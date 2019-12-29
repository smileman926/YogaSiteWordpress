<?php

// Add WordPress functionality
require(__DIR__.'/../wp.php');

// Fetch customer data
$customer = \OPDashboard\SL\SL::getCustomer();

?><!DOCTYPE html>
<html id="op3-live-editor" lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="application-name" content="OptimizePress"
            data-op3-nonce="<?php echo wp_create_nonce('wp_rest') ?>"
            data-op3-assets-base-url="<?php echo rtrim(op3_asset(), '/'); ?>"
            data-op3-resources-base-url="<?php echo rtrim(op3_resource(), '/'); ?>"
            data-op3-api-base-url="<?php echo op3_api_url(); ?>"
            data-admin-url="<?php echo admin_url('admin.php'); ?>"
            data-site-url="<?php echo site_url(); ?>"
            data-country-code="<?php echo op3_get_country_code(); ?>"
            data-op3-page-id="<?php echo $_GET['id'] ?>"
            data-op3-page-title="<?php echo get_the_title($_GET['id']); ?>"
            data-op3-page-url="<?php echo get_permalink($_GET['id']); ?>"
            data-op3-page-preview-url="<?php echo op3_get_preview_url($_GET['id']); ?>"
            data-op3-page-status="<?php echo get_post_status($_GET['id']) ?>"
            data-op3-user-role="<?php echo isset($customer->type) ? $customer->type : 'customer'; ?>"
            data-op3-funnels-active="<?php echo defined('OPF_VERSION') ? 1 : 0 ?>"
            data-op3-build-env="<?php echo OP3_BUILD_ENV; ?>"
            data-op3-build-hash="<?php echo OP3_BUILD_HASH; ?>"
            data-op3-membership-legacy="<?php echo get_option('opd_enable_legacy_membership') ? 1 : 0 ?>"
            data-op3-page-template="<?php echo get_page_template_slug($_GET['id']) === '' ? 'default' : get_page_template_slug($_GET['id']); ?>"
            data-op3-facebook-app-id="<?php echo get_option('opd_facebook_app_id'); ?>"
            data-op3-facebook-lang="<?php echo get_option('opd_facebook_locale'); ?>"
        />

        <meta name="author" content="OptimizePress development team" />
        <meta name="keywords" content="OptimizePress, page builder, live editor" />
        <meta name="description" content="OptimizePress Builder" />
        <title>OptimizePress Builder</title>
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i&amp;subset=latin-ext" rel="stylesheet">
        <link href="<?php echo op3_asset('css/op3-live-editor.css') ?>" rel="stylesheet" />
    </head>
    <body class="op3-loading <?php echo op3_editor_body_class() ?>" data-op3-device="desktop">
        <?php include(__DIR__ . '/loadinfo.php') ?>
        <?php include(__DIR__ . '/header.php') ?>
        <?php include(__DIR__ . '/sidebar.php') ?>
        <?php include(__DIR__ . '/frame.php') ?>
        <?php include(__DIR__ . '/footer.php') ?>
        <script src="<?php echo op3_asset('js/op3-live-editor.js') ?>"></script>
    </body>
</html>
