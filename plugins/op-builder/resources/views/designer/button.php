<a href="#"
   onclick="return !!OP3.Wrapper.Editor.open(<?php echo $page_id; ?>)"
   class="op-editor-button-open"
   <?php /*data-op3-page-id="<?php echo $page_id; ?>"
   data-op3-page-status="<?php echo $page_status; ?>"
   data-op3-editor-mode="<?php echo $editor_mode ? 1 : 0; ?>"
   data-op3-page-has-data="<?php echo $page_has_data ? 1 : 0 ?>"
   data-op3-edit-url="<?php echo $edit_page_url; ?>"
   data-op3-live-editor-url="<?php echo site_url('op-builder/'.$page_id); ?>"
   data-op3-api-base-url="<?php echo $api_base_url; ?>"
   data-op3-api-page-url="<?php echo $api_page_url; ?>"*/ ?>
>

    <div class="button button-primary button-hero op-editor-mode-button">
        <?php echo (isset($op_button_label) and $op_button_label) ? $op_button_label : __('Edit with OptimizePress', 'optimizepress3'); ?>
    </div>
</a>
