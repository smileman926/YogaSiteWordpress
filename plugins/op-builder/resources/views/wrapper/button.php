<a href="#op-builder"
   onclick="return !!OP3.Wrapper.Editor.open()"
   class="op-editor-mode-button-wrap"
   data-op3-page-id="<?php echo $page_id; ?>"
   data-op3-page-status="<?php echo $page_status; ?>"
   data-op3-editor-mode="<?php echo $editor_mode ? 1 : 0; ?>"
   data-op3-page-has-data="<?php echo $page_has_data ? 1 : 0 ?>"
   data-op3-edit-url="<?php echo $edit_page_url; ?>"
   data-op3-live-editor-url="<?php echo site_url('op-builder/'.$page_id); ?>"
   data-op3-api-base-url="<?php echo $api_base_url; ?>"
   data-op3-api-page-url="<?php echo $api_page_url; ?>"
   data-op3-op-mode-url="<?php echo $op_mode_url; ?>"
   data-op3-icon-url="<?php echo op3_asset('/img/logo-white.svg'); ?>"
>

    <div class="button button-primary button-hero op-editor-mode-button">
        <img src="<?php echo op3_asset('/img/logo-white.svg'); ?>" alt="" />
        <?php _e('Edit with OptimizePress', 'optimizepress3'); ?>
    </div>
</a>
