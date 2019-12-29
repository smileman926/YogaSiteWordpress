<style>
	#accordion_more_free_themes{
	background:transparent #fff;
	
	margin-top:40px;
	}
	#accordion_more_free_themes .hndle , #accordion_more_free_themes .handlediv{
	display:none;
	}
	#accordion_more_free_themes p{
	color:#000;
	font-size:15px;
	}
	.wpsm-theme-container {
		background: #fff;
		padding-left: 0px;
		padding-right: 0px;
		box-shadow: 0 0 20px rgba(0,0,0,.2);
		margin-bottom: 20px;
	}
	.wpsm_site-img-responsive {
		display: block;
		width: 100%;
		height: auto;
	}
	.wpsm_product_wrapper {
		padding: 20px;
		overflow: hidden;
	}
	.wpsm_product_wrapper h3 {
		float: left;
		margin-bottom: 0px;
		color: #000 !important;
		letter-spacing: 0px;
		text-transform: uppercase;
		font-size: 18px;
		font-weight: 700;
		text-align: left;
		margin:0px;
	}
	.wpsm_product_wrapper h3 span {
		display: block;
		float: left;
		width: 100%;
		overflow: hidden;
		font-size: 14px;
		color: #919499;
		margin-top: 6px;
	}
	.wpsm_product_wrapper .price {
		float: right;
		font-size: 24px;
		color: #000;
		font-family: sans-serif;
		font-weight: 500;
	}
	.wpsm-btn-block {
		overflow: hidden;
		float: left;
		width: 100%;
		margin-top: 20px;
		display: block;
	}
	.portfolio_read_more_btn {
		border: 1px solid #1e73be;
		border-radius: 0px;
		margin-bottom: 10px;
		text-transform: uppercase;
		font-weight: 700;
		font-size: 15px;
		padding: 12px 12px;
		display: block;
		text-align:center;
		width:100%;
		border-radius: 2px;
		cursor: pointer;
		letter-spacing: 1px;
		outline: none;
		position: relative;
		text-decoration: none !important;
		color: #fff !important;
		-webkit-transition: all ease 0.5s;
		-moz-transition: all ease 0.5s;
		transition: all ease 0.5s;
		background: #1e73be;
		padding-left: 22px;
		padding-right: 22px;
	}
	.portfolio_demo_btn {
		border: 1px solid #919499;
		border-radius: 0px;
		margin-bottom: 10px;
		text-transform: uppercase;
		font-weight: 700;
		font-size: 15px;
		padding: 12px 12px;
		display: block;
		text-align:center;
		width:100%;
		border-radius: 2px;
		cursor: pointer;
		letter-spacing: 1px;
		outline: none;
		position: relative;
		text-decoration: none !important;
		background-color: #242629;
		border-color: #242629;
		color: #fff !important;
		-webkit-transition: all ease 0.5s;
		-moz-transition: all ease 0.5s;
		transition: all ease 0.5s;
		padding-left: 22px;
		padding-right: 22px;
	}
	#accordion_more_free_themes .theme-id-container {
    position: relative;
    height: 49px;
}
#accordion_more_free_themes .theme-browser .theme .theme-name{
	    height: auto;
}#accordion_more_free_themes .theme-browser .theme .theme-actions{
	   opacity: 1;
}
</style>
<h1>Recommended Free Wordpress Themes From Wpshopmart</h1>
<div style="overflow:hidden;display:block;width:100%;padding-top:20px;padding-bottom:20px;height: 330px; overflow: auto;">
	<div class="col-md-12">
		
		<?php 
 /**
  * @access protected
  *
  * @return bool
  */
/**
 * Ajax handler for getting themes from themes_api().
 *
 * @since 3.9.0
 *
 * @global array $themes_allowedtags
 * @global array $theme_field_defaults
 */
function wp_ajax_query_themes()
{
    global $themes_allowedtags, $theme_field_defaults;
    if (!current_user_can('install_themes')) {
        wp_send_json_error();
    }
    $args = array('per_page' => 20, 'fields' => $theme_field_defaults,'author'=>'wpshopmart');
    if (isset($args['browse']) && 'favorites' === $args['browse'] && !isset($args['user'])) {
        $user = 'wpshopmart';
        if ($user) {
            $args['user'] = $user;
        }
    }
    $old_filter = isset($args['browse']) ? $args['browse'] : 'search';
    /** This filter is documented in wp-admin/includes/class-wp-theme-install-list-table.php */
    $args = apply_filters('install_themes_table_api_args_' . $old_filter, $args);
    $api = themes_api('query_themes', $args);
    if (is_wp_error($api)) {
        wp_send_json_error();
    }
    $update_php = network_admin_url('update.php?action=install-theme');
	
	?>
	<div class="theme-browser rendered">
		<div class="themes">
		<?php
		foreach ($api->themes as &$theme) {
			//print_r($theme);
			$theme->install_url = add_query_arg(array('theme' => $theme->slug, '_wpnonce' => wp_create_nonce('install-theme_' . $theme->slug)), $update_php);
        
			?>
			<div class="theme">
				<div class="theme-screenshot">
					<img src="<?php echo $theme->screenshot_url ?>" alt="">
				</div>
						<div class="theme-id-container">
				
					<h2 class="theme-name" id="<?php echo $theme->name ?>-name"><?php echo $theme->name ?></h2>
				

				<div class="theme-actions">
					
										<a class="button button-primary" href="<?php echo $theme->install_url ?>" aria-label="Activate bizlite">Install/Activate</a>
						
				</div>
			</div>
			
			</div>
			<?php
			
		}
		//wp_send_json_success($api);
		?>
		</div>
	</div>
	<?php
}
wp_ajax_query_themes();
 
 ?>
		
		
	</div>
</div>	