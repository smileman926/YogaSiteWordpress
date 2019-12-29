<?php
    if ( ! defined( 'ABSPATH' ) ) {
        exit;
    }

    if (! isset($templates)) {
        $templates = false;
    }
?>

<div class="opb-template-list opb-slide-content-container d-flex flex-wrap justify-content-center" style="width: 100%; margin-left: 0;" data-url="<?php echo admin_url('admin-ajax.php?action=opb_templates&category=' . $categoryUid) ?>">
    <?php echo op3_view('pages/partials/template_list', ['categoryUid' => $categoryUid, 'templates' => $templates]) ?>
</div>
