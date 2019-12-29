<?php 
 $PostId = $post->ID;
 $Accordion_Settings = unserialize(get_post_meta( $PostId, 'Accordion_Settings', true));
		
		$option_names = array(
		"acc_sec_title" 	 => "yes",
		"op_cl_icon" 		 => "yes",
        "acc_title_icon"     => "yes",
        "acc_radius"      	 => "yes",
        "acc_margin"   		 => "yes",
        "enable_toggle"    	 => "no",
        "enable_ac_border"   => "yes",
        "acc_op_cl_align"    => "right",
		"acc_title_bg_clr"   => "#e8e8e8",
		"acc_title_icon_clr" => "#000000",
		"acc_desc_bg_clr"    => "#ffffff",
        "acc_desc_font_clr"  => "#000000",
        "title_size"         => "18",
        "des_size"     		 => "16",
        "font_family"     	 => "Open Sans",
        "expand_option"      =>1,
        "ac_styles"      =>1,
		);
		
		foreach($option_names as $option_name => $default_value) {
			if(isset($Accordion_Settings[$option_name])) 
				${"" . $option_name}  = $Accordion_Settings[$option_name];
			else
				${"" . $option_name}  = $default_value;
		}
?>

<Script>

 //slider font size script
  jQuery(function() {
    jQuery( "#title_size_id" ).slider({
		orientation: "horizontal",
		range: "min",
		max: 30,
		min:5,
		slide: function( event, ui ) {
		jQuery( "#title_size" ).val( ui.value );
      }
		});
		
		jQuery( "#title_size_id" ).slider("value",<?php echo $title_size; ?> );
		jQuery( "#title_size" ).val( jQuery( "#title_size_id" ).slider( "value") );
    
  });
</script>
<Script>

 //slider font size script
  jQuery(function() {
    jQuery( "#des_size_id" ).slider({
		orientation: "horizontal",
		range: "min",
		max: 30,
		min:5,
		slide: function( event, ui ) {
		jQuery( "#des_size" ).val( ui.value );
      }
		});
		
		jQuery( "#des_size_id" ).slider("value",<?php echo $des_size; ?>);
		jQuery( "#des_size" ).val( jQuery( "#des_size_id" ).slider( "value") );
    
  });
</script>  
<input type="hidden" id="accordion_setting_save_action" name="accordion_setting_save_action" value="accordion_setting_save_action">
		
<table class="form-table acc_table">
	<tbody>
		
		<tr>
			<th scope="row"><label><?php _e('Display Accordion Section Title ',wpshopmart_accordion_text_domain); ?></label></th>
			<td>
				<div class="switch">
					<input type="radio" class="switch-input" name="acc_sec_title" value="yes" id="enable_acc_sec_title" <?php if($acc_sec_title == 'yes' ) { echo "checked"; } ?>   >
					<label for="enable_acc_sec_title" class="switch-label switch-label-off"><?php _e('Yes',wpshopmart_accordion_text_domain); ?></label>
					<input type="radio" class="switch-input" name="acc_sec_title" value="no" id="disable_acc_sec_title"  <?php if($acc_sec_title == 'no' ) { echo "checked"; } ?> >
					<label for="disable_acc_sec_title" class="switch-label switch-label-on"><?php _e('No',wpshopmart_accordion_text_domain); ?></label>
					<span class="switch-selection"></span>
				</div>
				<!-- Tooltip -->
				<a  class="ac_tooltip" href="#help" data-tooltip="#acc_sec_title_tp">help</a>
				<div id="acc_sec_title_tp" style="display:none;">
					<div style="color:#fff !important;padding:10px;">
						<h2 style="color:#fff !important;"><?php _e('Display Accordion Section Title ',wpshopmart_accordion_text_domain); ?></h2>
						<img src="<?php echo wpshopmart_accordion_directory_url.'tooltip/img/sec-title.png'; ?>">
					</div>
		    	</div>
			</td>
		</tr>
		<tr>
			<th scope="row"><label><?php _e('Accordion Open/Close Icon Alignment',wpshopmart_accordion_text_domain); ?></label></th>
			<td>
				<div class="switch">
					<input type="radio" class="switch-input" name="acc_op_cl_align" value="left" id="enable_acc_op_cl_align" <?php if($acc_op_cl_align == 'left' ) { echo "checked"; } ?>  >
					<label for="enable_acc_op_cl_align" class="switch-label switch-label-off"><?php _e('left',wpshopmart_accordion_text_domain); ?></label>
					<input type="radio" class="switch-input" name="acc_op_cl_align" value="right" id="disable_acc_op_cl_align" <?php if($acc_op_cl_align == 'right' ) { echo "checked"; } ?> >
					<label for="disable_acc_op_cl_align" class="switch-label switch-label-on"><?php _e('right',wpshopmart_accordion_text_domain); ?></label>
					<span class="switch-selection"></span>
				</div>
				<!-- Tooltip -->
				<a  class="ac_tooltip" href="#help" data-tooltip="#acc_op_cl_align_tp">help</a>
				<div id="acc_op_cl_align_tp" style="display:none;">
					<div style="color:#fff !important;padding:10px;">
						<h2 style="color:#fff !important;"><?php _e('Accordion Open/Close Icon Alignment',wpshopmart_accordion_text_domain); ?></h2>
						
						<img src="<?php echo wpshopmart_accordion_directory_url.'tooltip/img/op-cl-icon.png' ?>">
						<br>
						<img src="<?php echo wpshopmart_accordion_directory_url.'tooltip/img/right-align.png'; ?>">
					</div>
		    	</div>
			</td>
		</tr>
		
		<tr>
			<th scope="row"><label><?php _e('Display Open Close Icon ',wpshopmart_accordion_text_domain); ?></label></th>
			<td>
				<div class="switch">
					<input type="radio" class="switch-input" name="op_cl_icon" value="yes" id="enable_op_cl_icon" <?php if($op_cl_icon == 'yes' ) { echo "checked"; } ?>  >
					<label for="enable_op_cl_icon" class="switch-label switch-label-off"><?php _e('Yes',wpshopmart_accordion_text_domain); ?></label>
					<input type="radio" class="switch-input" name="op_cl_icon" value="no" id="disable_op_cl_icon"  <?php if($op_cl_icon == 'no' ) { echo "checked"; } ?> >
					<label for="disable_op_cl_icon" class="switch-label switch-label-on"><?php _e('No',wpshopmart_accordion_text_domain); ?></label>
					<span class="switch-selection"></span>
				</div>
				<!-- Tooltip -->
				<a  class="ac_tooltip" href="#help" data-tooltip="#op_cl_icon_tp">help</a>
				<div id="op_cl_icon_tp" style="display:none;">
					<div style="color:#fff !important;padding:10px;">
						<h2 style="color:#fff !important;"><?php _e('Display Open Close Icon ',wpshopmart_accordion_text_domain); ?></h2>
						<img src="<?php echo wpshopmart_accordion_directory_url.'tooltip/img/op-cl-icon.png'; ?>">
					</div>
		    	</div>
			</td>
		</tr>
		
		<tr>
			<th scope="row"><label><?php _e('Display Accordion Title Font Icon ',wpshopmart_accordion_text_domain); ?></label></th>
			<td>
				<div class="switch" >
					<input type="radio" class="switch-input" name="acc_title_icon" value="yes" id="enable_acc_title_icon" <?php if($acc_title_icon == 'yes' ) { echo "checked"; } ?>  >
					<label for="enable_acc_title_icon" class="switch-label switch-label-off"><?php _e('Yes',wpshopmart_accordion_text_domain); ?></label>
					<input type="radio" class="switch-input" name="acc_title_icon" value="no" id="disable_acc_title_icon" <?php if($acc_title_icon == 'no' ) { echo "checked"; } ?> >
					<label for="disable_acc_title_icon" class="switch-label switch-label-on"><?php _e('No',wpshopmart_accordion_text_domain); ?></label>
					<span class="switch-selection"></span>
				</div>
				<!-- Tooltip -->
				<a  class="ac_tooltip" href="#help" data-tooltip="#acc_title_icon_tp">help</a>
				<div id="acc_title_icon_tp" style="display:none;">
					<div style="color:#fff !important;padding:10px;">
						<h2 style="color:#fff !important;"><?php _e('Display Accordion Title Font Icon ',wpshopmart_accordion_text_domain); ?></h2>
						<img src="<?php echo wpshopmart_accordion_directory_url.'tooltip/img/title-icon.png'; ?>">
					</div>
		    	</div>
			</td>
		</tr>
		
		<tr>
			<th scope="row"><label><?php _e('Enable Accordion Radius ',wpshopmart_accordion_text_domain); ?></label></th>
			<td>
				<div class="switch">
					<input type="radio" class="switch-input" name="acc_radius" value="yes" id="enable_acc_radius" <?php if($acc_radius == 'yes' ) { echo "checked"; } ?>  >
					<label for="enable_acc_radius" class="switch-label switch-label-off"><?php _e('Yes',wpshopmart_accordion_text_domain); ?></label>
					<input type="radio" class="switch-input" name="acc_radius" value="no" id="disable_acc_radius" <?php if($acc_radius == 'no' ) { echo "checked"; } ?> >
					<label for="disable_acc_radius" class="switch-label switch-label-on"><?php _e('No',wpshopmart_accordion_text_domain); ?></label>
					<span class="switch-selection"></span>
				</div>
				<!-- Tooltip -->
				<a  class="ac_tooltip" href="#help" data-tooltip="#acc_radius_tp">help</a>
				<div id="acc_radius_tp" style="display:none;">
					<div style="color:#fff !important;padding:10px;">
						<h2 style="color:#fff !important;"><?php _e('Enable Accordion Radius ',wpshopmart_accordion_text_domain); ?></h2>
						<img src="<?php echo wpshopmart_accordion_directory_url.'tooltip/img/radius.png'; ?>">
					</div>
		    	</div>
			</td>
		</tr>
		
		<tr>
			<th scope="row"><label><?php _e('Enable Accordion Margin/Space',wpshopmart_accordion_text_domain); ?></label></th>
			<td>
				<div class="switch">
					<input type="radio" class="switch-input" name="acc_margin" value="yes" id="enable_acc_margin" <?php if($acc_margin == 'yes' ) { echo "checked"; } ?>  >
					<label for="enable_acc_margin" class="switch-label switch-label-off"><?php _e('Yes',wpshopmart_accordion_text_domain); ?></label>
					<input type="radio" class="switch-input" name="acc_margin" value="no" id="disable_acc_margin"  <?php if($acc_margin == 'no' ) { echo "checked"; } ?> >
					<label for="disable_acc_margin" class="switch-label switch-label-on"><?php _e('No',wpshopmart_accordion_text_domain); ?></label>
					<span class="switch-selection"></span>
				</div>
				<!-- Tooltip -->
				<a  class="ac_tooltip" href="#help" data-tooltip="#acc_margin_tp">help</a>
				<div id="acc_margin_tp" style="display:none;">
					<div style="color:#fff !important;padding:10px;">
						<h2 style="color:#fff !important;"><?php _e('Enable Accordion Margin/Space',wpshopmart_accordion_text_domain); ?></h2>
						<img src="<?php echo wpshopmart_accordion_directory_url.'tooltip/img/margin.png'; ?>">
					</div>
		    	</div>
			</td>
		</tr>
		
		<tr>
			<th scope="row"><label><?php _e('Enable Toggle/Collapse ',wpshopmart_accordion_text_domain); ?></label></th>
			<td>
				<div class="switch">
					<input type="radio" class="switch-input" name="enable_toggle" value="yes" id="enable_acc_toggle" <?php if($enable_toggle == 'yes' ) { echo "checked"; } ?>   >
					<label for="enable_acc_toggle" class="switch-label switch-label-off"><?php _e('Yes',wpshopmart_accordion_text_domain); ?></label>
					<input type="radio" class="switch-input" name="enable_toggle" value="no" id="disable_acc_toggle"  <?php if($enable_toggle == 'no' ) { echo "checked"; } ?> >
					<label for="disable_acc_toggle" class="switch-label switch-label-on"><?php _e('No',wpshopmart_accordion_text_domain); ?></label>
					<span class="switch-selection"></span>
				</div>
				<!-- Tooltip -->
				<a  class="ac_tooltip" href="#help" data-tooltip="#enable_toggle_tp">help</a>
				<div id="enable_toggle_tp" style="display:none;">
					<div style="color:#fff !important;padding:10px;">
						<h2 style="color:#fff !important;"><?php _e('Enable Toggle/Collapse ',wpshopmart_accordion_text_domain); ?></strong> very html</h2>
						<img src="<?php echo wpshopmart_accordion_directory_url.'tooltip/img/collapase.png'; ?>">
					</div>
		    	</div>
			</td>
		</tr>
		<tr>
			<th scope="row"><label><?php _e('Display Accordion Border',wpshopmart_accordion_text_domain); ?></label></th>
			<td>
				<div class="switch">
					<input type="radio" class="switch-input" name="enable_ac_border" value="yes" id="enable_acc_border" <?php if($enable_ac_border == 'yes' ) { echo "checked"; } ?>   >
					<label for="enable_acc_border" class="switch-label switch-label-off"><?php _e('Yes',wpshopmart_accordion_text_domain); ?></label>
					<input type="radio" class="switch-input" name="enable_ac_border" value="no" id="disable_acc_border"  <?php if($enable_ac_border == 'no' ) { echo "checked"; } ?> >
					<label for="disable_acc_border" class="switch-label switch-label-on"><?php _e('No',wpshopmart_accordion_text_domain); ?></label>
					<span class="switch-selection"></span>
				</div>
				<!-- Tooltip -->
				<a  class="ac_tooltip" href="#enable_ac_border_tp" data-tooltip="#enable_ac_border_tp">help</a>
				<div id="enable_ac_border_tp" style="display:none;">
					<div style="color:#fff !important;padding:10px;">
						<h2 style="color:#fff !important;"><?php _e('Display Accordion Border',wpshopmart_accordion_text_domain); ?></h2>
						<img src="<?php echo wpshopmart_accordion_directory_url.'tooltip/img/border.png'; ?>">
					</div>
		    	</div>
			</td>
		</tr>
		
		<tr>
			<th scope="row"><label><?php _e('Expand/Collapse Accordion Option On Page Load',wpshopmart_accordion_text_domain); ?></label></th>
			<td>
				<span style="display:block;margin-bottom:10px"><input type="radio" name="expand_option" id="expand_option" value="1" <?php if($expand_option == '1' ) { echo "checked"; } ?> /> First Accordion Open </span>
				<span style="display:block;margin-bottom:10px"><input type="radio" name="expand_option" id="expand_option2" value="2" <?php if($expand_option == '2' ) { echo "checked"; } ?>  /> Open All Accordion </span>
				<span style="display:block"><input type="radio" name="expand_option" id="expand_option2" value="3"  <?php if($expand_option == '3' ) { echo "checked"; } ?> /> Hide/close All Accordion </span>
				<!-- Tooltip -->
				<a  class="ac_tooltip" href="#help" data-tooltip="#expand_option_tp">help</a>
				<div id="expand_option_tp" style="display:none;">
					<div style="color:#fff !important;padding:10px;">
						<h2 style="color:#fff !important;"><?php _e('Expand/Collapse Accordion Option On Page Load',wpshopmart_accordion_text_domain); ?></h2>
						<img src="<?php echo wpshopmart_accordion_directory_url.'tooltip/img/collapase.png'; ?>">
						<br>
						<img src="<?php echo wpshopmart_accordion_directory_url.'tooltip/img/all-close.png'; ?>">
					</div>
		    	</div>
				
			</td>
		</tr>
		
		<tr>
			<th scope="row"><label><?php _e('Accordion Styles',wpshopmart_accordion_text_domain); ?></label></th>
			<td>
				<span style="display:block;margin-bottom:10px"><input type="radio" name="ac_styles" id="ac_styles" value="1" <?php if($ac_styles == '1' ) { echo "checked"; } ?> /> Simple </span>
				<span style="display:block;margin-bottom:10px"><input type="radio" name="ac_styles" id="ac_styles2" value="2" <?php if($ac_styles == '2' ) { echo "checked"; } ?>  /> Soft </span>
				<span style="display:block"><input type="radio" name="ac_styles" id="ac_styles3" value="3"  <?php if($ac_styles == '3' ) { echo "checked"; } ?> /> Noise </span>
				<!-- Tooltip -->
				<a  class="ac_tooltip" href="#help" data-tooltip="#ac_styles_tp">help</a>
				<div id="ac_styles_tp" style="display:none;">
					<div style="color:#fff !important;padding:10px;">
						<h2 style="color:#fff !important;"><?php _e('Accordion Styles',wpshopmart_accordion_text_domain); ?></h2>
						<img src="<?php echo wpshopmart_accordion_directory_url.'tooltip/img/ac-style.png'; ?>">
						<br>
						<img src="<?php echo wpshopmart_accordion_directory_url.'tooltip/img/ac-style2.png'; ?>">
					</div>
		    	</div>
				<div style="margin-top:10px;display:block;overflow:hidden;width:100%;"> <a style="margin-top:10px" href="https://wpshopmart.com/plugins/accordion-pro/" target="_balnk">Unlock 2 More Overlays Styles In Premium Version</a> </div>
			
			</td>
		</tr>
		
		<tr >
			<th scope="row"><label><?php _e('Accordion Title Background Colour',wpshopmart_accordion_text_domain); ?></label></th>
			<td>
				<input id="acc_title_bg_clr" name="acc_title_bg_clr" type="text" value="<?php echo $acc_title_bg_clr; ?>" class="my-color-field" data-default-color="#e8e8e8" />
				<!-- Tooltip -->
				<a  class="ac_tooltip" href="#help" data-tooltip="#acc_title_bg_clr_tp">help</a>
				<div id="acc_title_bg_clr_tp" style="display:none;">
					<div style="color:#fff !important;padding:10px;">
						<h2 style="color:#fff !important;"><?php _e('Accordion Title Background Colour',wpshopmart_accordion_text_domain); ?></h2>
						<img src="<?php echo wpshopmart_accordion_directory_url.'tooltip/img/title-bg-color.png'; ?>">
					</div>
		    	</div>
			</td>
		</tr>
		
		<tr >
			<th scope="row"><label><?php _e('Accordion Title/Icon Font Colour',wpshopmart_accordion_text_domain); ?></label></th>
			<td>
				<input id="acc_title_icon_clr" name="acc_title_icon_clr" type="text" value="<?php echo $acc_title_icon_clr; ?>" class="my-color-field" data-default-color="#ffffff" />
				<!-- Tooltip -->
				<a  class="ac_tooltip" href="#help" data-tooltip="#acc_title_icon_clr_tp">help</a>
				<div id="acc_title_icon_clr_tp" style="display:none;">
					<div style="color:#fff !important;padding:10px;">
						<h2 style="color:#fff !important;"><?php _e('Accordion Title/Icon Font Colour',wpshopmart_accordion_text_domain); ?></h2>
						<img src="<?php echo wpshopmart_accordion_directory_url.'tooltip/img/title-ft-color.png'; ?>">
					</div>
		    	</div>
			</td>
		</tr>
		
		
		
		<tr >
			<th scope="row"><label><?php _e('Accordion Description Background Colour',wpshopmart_accordion_text_domain); ?></label></th>
			<td>
				<input id="acc_desc_bg_clr" name="acc_desc_bg_clr" type="text" value="<?php echo $acc_desc_bg_clr; ?>" class="my-color-field" data-default-color="#ffffff" />
				<!-- Tooltip -->
				<a  class="ac_tooltip" href="#help" data-tooltip="#acc_desc_bg_clr_tp">help</a>
				<div id="acc_desc_bg_clr_tp" style="display:none;">
					<div style="color:#fff !important;padding:10px;">
						<h2 style="color:#fff !important;"><?php _e('Accordion Description Background Colour',wpshopmart_accordion_text_domain); ?></h2>
						<img src="<?php echo wpshopmart_accordion_directory_url.'tooltip/img/description.png'; ?>">
					</div>
		    	</div>
			</td>
		</tr>
		
		<tr >
			<th scope="row"><label><?php _e('Accordion Description Font Colour',wpshopmart_accordion_text_domain); ?></label></th>
			<td>
				<input id="acc_desc_font_clr" name="acc_desc_font_clr" type="text" value="<?php echo $acc_desc_font_clr; ?>" class="my-color-field" data-default-color="#000000" />
				<!-- Tooltip -->
				<a  class="ac_tooltip" href="#acc_desc_font_clr_tp" data-tooltip="#acc_desc_font_clr_tp">help</a>
				<div id="acc_desc_font_clr_tp" style="display:none;">
					<div style="color:#fff !important;padding:10px;">
						<h2 style="color:#fff !important;"><?php _e('Accordion Description Font Colour',wpshopmart_accordion_text_domain); ?></h2>
						<img src="<?php echo wpshopmart_accordion_directory_url.'tooltip/img/description.png'; ?>">
					</div>
		    	</div>
			</td>
		</tr>
		<tr class="setting_color">
			<th><?php _e('Title/Icon Font Size',wpshopmart_accordion_text_domain); ?> </th>
			<td>
				<div id="title_size_id" class="size-slider" ></div>
				<input type="text" class="slider-text" id="title_size" name="title_size"  readonly="readonly">
				<!-- Tooltip -->
				<a  class="ac_tooltip" href="#help" data-tooltip="#title_size_tp">help</a>
				<div id="title_size_tp" style="display:none;">
					<div style="color:#fff !important;padding:10px;max-width: 300px;">
						<h2 style="color:#fff !important;">You can update Title and Icon Font Size from here. Just Scroll it to change size.</h2>
					
					</div>
		    	</div>
			</td>
		</tr>
		
		<tr class="setting_color">
			<th><?php _e('Description Font Size',wpshopmart_accordion_text_domain); ?> </th>
			<td>
				<div id="des_size_id" class="size-slider" ></div>
				<input type="text" class="slider-text" id="des_size" name="des_size"  readonly="readonly">
				<!-- Tooltip -->
				<a  class="ac_tooltip" href="#help" data-tooltip="#des_size_tp">help</a>
				<div id="des_size_tp" style="display:none;">
					<div style="color:#fff !important;padding:10px;max-width: 300px;">
						<h2 style="color:#fff !important;">You can update Description Font Size from here. Just Scroll it to change size.</h2>
						
					</div>
		    	</div>
			</td>
		</tr>
		<tr >
			<th><?php _e('Font Style/Family',wpshopmart_accordion_text_domain); ?> </th>
			<td>
				<?php if(!isset($font_family)) $font_family = "Open Sans";?>	
				<select name="font_family" id="font_family" class="standard-dropdown" style="width:100%" >
					<optgroup label="Default Fonts">
						<option value="Arial"           <?php if($font_family == 'Arial' ) { echo "selected"; } ?>>Arial</option>
						<option value="Arial Black"    <?php if($font_family == 'Arial Black' ) { echo "selected"; } ?>>Arial Black</option>
						<option value="Courier New"     <?php if($font_family == 'Courier New' ) { echo "selected"; } ?>>Courier New</option>
						<option value="Georgia"         <?php if($font_family == 'Georgia' ) { echo "selected"; } ?>>Georgia</option>
						<option value="Grande"          <?php if($font_family == 'Grande' ) { echo "selected"; } ?>>Grande</option>
						<option value="Helvetica" 	<?php if($font_family == 'Helvetica' ) { echo "selected"; } ?>>Helvetica Neue</option>
						<option value="Impact"         <?php if($font_family == 'Impact' ) { echo "selected"; } ?>>Impact</option>
						<option value="Lucida"         <?php if($font_family == 'Lucida' ) { echo "selected"; } ?>>Lucida</option>
						<option value="Lucida Grande"         <?php if($font_family == 'Lucida Grande' ) { echo "selected"; } ?>>Lucida Grande</option>
						<option value="Open Sans"   <?php if($font_family == 'Open Sans' ) { echo "selected"; } ?>>Open Sans</option>
						<option value="OpenSansBold"   <?php if($font_family == 'OpenSansBold' ) { echo "selected"; } ?>>OpenSansBold</option>
						<option value="Palatino Linotype"       <?php if($font_family == 'Palatino Linotype' ) { echo "selected"; } ?>>Palatino</option>
						<option value="Sans"           <?php if($font_family == 'Sans' ) { echo "selected"; } ?>>Sans</option>
						<option value="sans-serif"           <?php if($font_family == 'sans-serif' ) { echo "selected"; } ?>>Sans-Serif</option>
						<option value="Tahoma"         <?php if($font_family == 'Tahoma' ) { echo "selected"; } ?>>Tahoma</option>
						<option value="Times New Roman"          <?php if($font_family == 'Times New Roman' ) { echo "selected"; } ?>>Times New Roman</option>
						<option value="Trebuchet"      <?php if($font_family == 'Trebuchet' ) { echo "selected"; } ?>>Trebuchet</option>
						<option value="Verdana"        <?php if($font_family == 'Verdana' ) { echo "selected"; } ?>>Verdana</option>
					</optgroup>
				</select>
				
				<!-- Tooltip -->
				<a  class="ac_tooltip" href="#help" data-tooltip="#font_family_tp">help</a>
				<div id="font_family_tp" style="display:none;">
					<div style="color:#fff !important;padding:10px;max-width: 300px;">
						<h2 style="color:#fff !important;">You can update Title and Description Font Family/Style from here. Select any one form these options.</h2>
					
					</div>
		    	</div>
				<div style="margin-top:10px;display:block;overflow:hidden;width:100%;"> <a style="margin-top:10px" href="https://wpshopmart.com/plugins/accordion-pro/" target="_balnk">Get 500+ Google Fonts In Premium Version</a> </div>
			
			</td>
		</tr>
		
		<tr>
			<th scope="row"><label><?php _e('Page Scroll To Accordion',wpshopmart_accordion_text_domain); ?></label></th>
			<td>
				<div class="switch wpsm_off">
					<input type="radio" class="switch-input" name="acc_scroll" value="yes" id="enable_acc_scroll"   checked>
					<label for="enable_acc_scroll" class="switch-label switch-label-off"><?php _e('Yes',wpshopmart_accordion_text_domain); ?></label>
					<input type="radio" class="switch-input" name="acc_scroll" value="no" id="disable_acc_scroll"  >
					<label for="disable_acc_scroll" class="switch-label switch-label-on"><?php _e('No',wpshopmart_accordion_text_domain); ?></label>
					<span class="switch-selection"></span>
				</div>
				<a style="margin-top:10px" href="https://wpshopmart.com/plugins/accordion-pro/" target="_balnk">Available In Premium Version</a>
			</td>
		</tr>
		<tr>
			<th scope="row"><label><?php _e('ON Hover Accordion ',wpshopmart_accordion_text_domain); ?></label></th>
			<td>
				<div class="switch wpsm_off">
					<input type="radio" class="switch-input" name="acc_hover" value="yes" id="enable_acc_hover"   checked>
					<label for="enable_acc_hover" class="switch-label switch-label-off"><?php _e('Yes',wpshopmart_accordion_text_domain); ?></label>
					<input type="radio" class="switch-input" name="acc_hover" value="no" id="disable_acc_hover"  >
					<label for="disable_acc_hover" class="switch-label switch-label-on"><?php _e('No',wpshopmart_accordion_text_domain); ?></label>
					<span class="switch-selection"></span>
				</div>
				<a style="margin-top:10px" href="https://wpshopmart.com/plugins/accordion-pro/" target="_balnk">Available In Premium Version</a>
			</td>
		</tr>
		<tr>
			<th scope="row"><label><?php _e('Open Close Icon',wpshopmart_accordion_text_domain); ?></label></th>
			<td>
				<img class="wpsm_img_responsive"  src="<?php echo wpshopmart_accordion_directory_url.'img/snap-1.png'; ?>" />
				<a style="margin-top:10px" href="https://wpshopmart.com/plugins/accordion-pro/" target="_balnk">Available In Premium Version</a>
			</td>
		</tr>
		<tr>
			<th scope="row"><label><?php _e('Content Animation ',wpshopmart_accordion_text_domain); ?></label></th>
			<?php $content_animation = "0" ?>
		<td><select name="content_animation" id="content_animation" class="standard-dropdown" style="width:100%" >
					
					<option value="0"  <?php if($content_animation == '0' ) { echo "selected"; } ?> >Content Animation</option>
					<option disabled value="fadeIn"  <?php if($content_animation == 'fadeIn' ) { echo "selected"; } ?> >fadeIn</option>
					<option disabled value="fadeInLeft"    <?php if($content_animation == 'fadeInLeft' ) { echo "selected"; } ?> >fadeInLeft</option>
					<option disabled value="fadeInRight"    <?php if($content_animation == 'fadeInRight' ) { echo "selected"; } ?> >fadeInRight</option>
					<option disabled value="fadeInUp"    <?php if($content_animation == 'fadeInUp' ) { echo "selected"; } ?> >fadeInUp</option>
					<option disabled value="fadeInDown"    <?php if($content_animation == 'fadeInDown' ) { echo "selected"; } ?> >fadeInDown</option>
					<option disabled value="flip"    <?php if($content_animation == 'flip' ) { echo "selected"; } ?> >flip</option>
					<option disabled value="flipX"    <?php if($content_animation == 'flipX' ) { echo "selected"; } ?> >flipX</option>
					<option disabled value="flipY"    <?php if($content_animation == 'flipY' ) { echo "selected"; } ?> >flipY</option>
					<option disabled value="zoomIn"    <?php if($content_animation == 'zoomIn' ) { echo "selected"; } ?> >ZoomIn</option>
					<option disabled value="zoomInLeft"    <?php if($content_animation == 'zoomInLeft' ) { echo "selected"; } ?> >ZoomInLeft</option>
					<option disabled value="zoomInRight"    <?php if($content_animation == 'zoomInRight' ) { echo "selected"; } ?> >ZoomInRight</option>
					<option  disabled value="zoomInUp"    <?php if($content_animation == 'zoomInUp' ) { echo "selected"; } ?> >ZoomInUp</option>
					<option disabled value="zoomInDown"    <?php if($content_animation == 'zoomInDown' ) { echo "selected"; } ?> >ZoomInDown</option>
					<option  disabled value="bounce"    <?php if($content_animation == 'bounce' ) { echo "selected"; } ?> >bounce</option>
					<option disabled value="bounceIn"    <?php if($content_animation == 'bounceIn' ) { echo "selected"; } ?> >bounceIn</option>
					<option disabled value="bounceInLeft"    <?php if($content_animation == 'bounceInLeft' ) { echo "selected"; } ?> >bounceInLeft</option>
					<option disabled value="bounceInRight"    <?php if($content_animation == 'bounceInRight' ) { echo "selected"; } ?> >bounceInRight</option>
					<option disabled value="bounceInUp"    <?php if($content_animation == 'bounceInUp' ) { echo "selected"; } ?> >bounceInUp</option>
					<option disabled value="bounceInDown"    <?php if($content_animation == 'bounceInDown' ) { echo "selected"; } ?> >bounceInDown</option>
					<option disabled value="flash"    <?php if($content_animation == 'flash' ) { echo "selected"; } ?> >flash</option>
					<option disabled value="pulse"    <?php if($content_animation == 'pulse' ) { echo "selected"; } ?> >pulse</option>
					<option disabled value="rubberBand"    <?php if($content_animation == 'rubberBand' ) { echo "selected"; } ?> >rubberBand</option>
					<option disabled value="shake"    <?php if($content_animation == 'shake' ) { echo "selected"; } ?> >shake</option>
					<option disabled value="swing"    <?php if($content_animation == 'swing' ) { echo "selected"; } ?> >swing</option>
					<option disabled value="tada"    <?php if($content_animation == 'tada' ) { echo "selected"; } ?> >tada</option>
					<option disabled value="wobble"    <?php if($content_animation == 'wobble' ) { echo "selected"; } ?> >wobble</option>
					<option disabled value="lightSpeedIn"    <?php if($content_animation == 'lightSpeedIn' ) { echo "selected"; } ?> >lightSpeedIn</option>
					<option disabled value="rollIn"    <?php if($content_animation == 'rollIn' ) { echo "selected"; } ?> >rollIn</option>
						
				</select>
				<div style="margin-top:10px;display:block;overflow:hidden;width:100%;"> <a style="margin-top:10px" href="https://wpshopmart.com/plugins/accordion-pro/" target="_balnk">Available In Premium Version</a> </div>
			
			</td>	
		</tr>
		<script>
		
		jQuery(function() {
jQuery(".wpsm_off *").attr("disabled", "disabled").off('click');
		  
		  // Target a single one
		  jQuery("#custom_css").linedtextarea();

		});
		jQuery('.ac_tooltip').darkTooltip({
				opacity:1,
				gravity:'east',
				size:'small'
			});
		</script>
	</tbody>
</table>