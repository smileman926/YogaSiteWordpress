<?php 
	
    $ac_post_type = "responsive_accordion";
	
    $AllAccordion = array(  'p' => $WPSM_AC_ID, 'post_type' => $ac_post_type, 'orderby' => 'ASC');
    $loop = new WP_Query( $AllAccordion );
	
	while ( $loop->have_posts() ) : $loop->the_post();
		//get the post id
		$post_id = get_the_ID();
		
		$Accordion_Settings = unserialize(get_post_meta( $post_id, 'Accordion_Settings', true));
		if(count($Accordion_Settings)) 
		{
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
				"ac_styles"          =>1,
				"custom_css"          =>"",
			);
			
			foreach($option_names as $option_name => $default_value) {
				if(isset($Accordion_Settings[$option_name])) 
					${"" . $option_name}  = $Accordion_Settings[$option_name];
				else
					${"" . $option_name}  = $default_value;
			}
		}		
		
		$accordion_data = unserialize(get_post_meta( get_the_ID(), 'wpsm_accordion_data', true));
		$TotalCount =  get_post_meta( get_the_ID(), 'wpsm_accordion_count', true );
		if($TotalCount>0) 
		{
		?>
			<?php  if($acc_sec_title == 'yes' ) { ?>
				<h3 style="margin-bottom:20px;display:block;width:100%;margin-top:10px"><?php echo get_the_title( $post_id ); ?> </h3>
			<?php } ?>
			<style>
				<?php require('style.php'); ?>	
			</style>
			<div class="wpsm_panel-group" id="wpsm_accordion_<?php echo $post_id; ?>" >
				<?php 	
				$i=1;
				foreach($accordion_data as $accordion_single_data)
				{
					 $accordion_title = $accordion_single_data['accordion_title'];
					 $accordion_title_icon = $accordion_single_data['accordion_title_icon'];
					 $enable_single_icon = $accordion_single_data['enable_single_icon'];
					 $accordion_desc = $accordion_single_data['accordion_desc'];
					 $i;
					
					 switch($expand_option){
					    case "1":
						$j=1;
						break;
						case "2":
						 $j=$i;
						break;
						case "3":
						 $j=0;
						break;
					 }
					 
					?>
				
					<!-- Inner panel Start -->
					<div class="wpsm_panel wpsm_panel-default">
						<div class="wpsm_panel-heading" role="tab" >
						  <h4 class="wpsm_panel-title">
							<a  class="<?php if($i!=1){ echo "collapsed"; } ?>"  data-toggle="collapse" data-parent="<?php if($enable_toggle=="no") { ?>#wpsm_accordion_<?php echo $post_id; ?> <?php } ?>" href="#ac_<?php echo $post_id; ?>_collapse<?php echo $i; ?>"  >
								<?php if($op_cl_icon == 'yes' ) 
								{ ?>
									<span class="ac_open_cl_icon fa fa-<?php if($i==$j){ echo "minus"; } else { echo "plus"; } ?>"></span>
									
								<?php
								} ?> 
								<span class="ac_title_class">
									<?php if($acc_title_icon == 'yes' )
									{ 
										 if($enable_single_icon=="yes")
										{
									?>
											<span style="margin-right:6px;" class="fa <?php echo $accordion_title_icon; ?>"></span>
									<?php
										}
									}
									if($accordion_title == '' ) { echo "no title";  } else { echo esc_attr($accordion_title); } ?>
								</span>
							</a>
						  </h4>
						</div>
						<div id="ac_<?php echo $post_id; ?>_collapse<?php echo $i; ?>" class="wpsm_panel-collapse collapse <?php if($i==$j){ echo "in"; } ?>"  >
						  <div class="wpsm_panel-body">
							<?php  echo do_shortcode($accordion_desc); ?>
						  </div>
						</div>
					</div>
					<!-- Inner panel End -->
					
				<?php
				 $i++;
				}
				?>
			</div>
			<?php
		}
		else{
			echo "<h3> No Accordion Found </h3>";
		}
	endwhile; ?>