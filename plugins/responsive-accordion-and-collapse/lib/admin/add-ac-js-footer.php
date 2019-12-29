<script>
	var j = 1000;
	function add_new_accordion(){
	var output = 	'<li class="wpsm_ac-panel single_acc_box" >'+
		'<span class="ac_label"><?php _e("Accordion Title",wpshopmart_accordion_text_domain); ?></span>'+
		'<input type="text" id="accordion_title[]" name="accordion_title[]" value="" placeholder="Enter Accordion Title Here" class="wpsm_ac_label_text">'+
		'<span class="ac_label"l><?php _e("Accordion Description",wpshopmart_accordion_text_domain); ?></span>'+
		'<textarea  id="accordion_desc[]" name="accordion_desc[]"  placeholder="Enter Accordion Description Here" class="wpsm_ac_label_text"></textarea>'+
		'<a type="button" class="btn btn-primary btn-block html_editor_button" data-remodal-target="modal" href="#"  id="'+j+'" onclick="open_editor('+j+')">Use WYSIWYG Editor </a>'+
		'<span class="ac_label"><?php _e("Accordion Icon",wpshopmart_accordion_text_domain); ?></span>'+
		'<div class="form-group input-group" >'+
		'	<input data-placement="bottomRight" id="accordion_title_icon[]" name="accordion_title_icon[]" class="form-control icp icp-auto" value="fa-laptop" type="text" readonly="readonly" />'+
			'<span class="input-group-addon "></span>'+
		'</div>'+
		'<span class="ac_label"><?php _e('Display Above Icon',wpshopmart_accordion_text_domain); ?></span>'+
		'<select name="enable_single_icon[]" style="width:100%" >'+
				'<option value="yes" selected=selected>Yes</option>'+
				'<option value="no" >No</option>'+
		'</select>'+
		'<a class="remove_button" href="#delete" id="remove_bt"><i class="fa fa-trash-o"></i></a>'+
		'</li>';
	jQuery(output).hide().appendTo("#accordion_panel").slideDown("slow");
	j++;
	call_icon();
	}
	jQuery(document).ready(function(){

	  jQuery('#accordion_panel').sortable({
	  
	   revert: true,
	 
	  });
	});
	
	
</script>
<script>
	jQuery(function(jQuery)
		{
			var accordion = 
			{
				accordion_ul: '',
				init: function() 
				{
					this.accordion_ul = jQuery('#accordion_panel');

					this.accordion_ul.on('click', '.remove_button', function() {
					if (confirm('Are you sure you want to delete this?')) {
						jQuery(this).parent().slideUp(600, function() {
							jQuery(this).remove();
						});
					}
					return false;
					});
					 jQuery('#delete_all_acc').on('click', function() {
						if (confirm('Are you sure you want to delete all the Accordions?')) {
							jQuery(".single_acc_box").slideUp(600, function() {
								jQuery(".single_acc_box").remove();
							});
							jQuery('html, body').animate({ scrollTop: 0 }, 'fast');
							
						}
						return false;
					});
					
			   }
			};
		accordion.init();
	});
</script>


<script>
	function open_editor(id){
		var value = jQuery("#"+id).closest('li').find('textarea').val();
		jQuery("#get_text-html").click();
		jQuery("#get_text").val(value);
		jQuery("#get_id").val(jQuery("#"+id).attr('id'));
	 }
	
	function insert_html(){
		jQuery("#get_text-html").click();
		var html_text = jQuery("#get_text").val();
		var id = jQuery("#get_id").val();
		jQuery("#"+id).closest('li').find('textarea').val(html_text);
			
	}
</script>