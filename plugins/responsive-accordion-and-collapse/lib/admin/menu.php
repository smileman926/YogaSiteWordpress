<?php
class wpsm_accordion {
	private static $instance;
    public static function forge() {
        if (!isset(self::$instance)) {
            $className = __CLASS__;
            self::$instance = new $className;
        }
        return self::$instance;
    }
	
	private function __construct() {
		
		add_action('admin_enqueue_scripts', array(&$this, 'wpsm_accordion_admin_scripts'));
        if (is_admin()) {
			add_action('init', array(&$this, 'Responsive_accordion'), 1);
			add_action('add_meta_boxes', array(&$this, 'wpsm_accordion_meta_boxes_group'));
			add_action('admin_init', array(&$this, 'wpsm_accordion_meta_boxes_group'), 1);
			add_action('save_post', array(&$this, 'add_accordion_meta_box_save'), 9, 1);
			add_action('save_post', array(&$this, 'accordion_settings_meta_box_save'), 9, 1);
		}
    }
	// admin scripts
	public function wpsm_accordion_admin_scripts(){
		if(get_post_type()=="responsive_accordion"){
			
			wp_enqueue_media();
			wp_enqueue_script('jquery-ui-datepicker');
			
			//color-picker css n js
			wp_enqueue_style( 'wp-color-picker' );
			wp_enqueue_script( 'wpsm_ac-color-pic', wpshopmart_accordion_directory_url.'js/color-picker.js', array( 'wp-color-picker' ), false, true );
			wp_enqueue_style('wpsm_ac-panel-style', wpshopmart_accordion_directory_url.'css/panel-style.css');
			wp_enqueue_style('wpsm_ac_remodal-css', wpshopmart_accordion_directory_url .'modal/remodal.css');
			wp_enqueue_style('wpsm_ac_remodal-default-theme-css', wpshopmart_accordion_directory_url .'modal/remodal-default-theme.css');
		
			
			//font awesome css
			wp_enqueue_style('wpsm_ac-font-awesome', wpshopmart_accordion_directory_url.'css/font-awesome/css/font-awesome.min.css');
			wp_enqueue_style('wpsm_ac_bootstrap', wpshopmart_accordion_directory_url.'css/bootstrap.css');
			wp_enqueue_style('font-awesome-picker', wpshopmart_accordion_directory_url.'css/fontawesome-iconpicker.css');
			wp_enqueue_style('ac_jquery-css', wpshopmart_accordion_directory_url .'css/ac_jquery-ui.css');
			
			
			//line editor
			wp_enqueue_style('wpsm_ac_line-edtor', wpshopmart_accordion_directory_url.'css/jquery-linedtextarea.css');
			wp_enqueue_script( 'wpsm_ac-line-edit-js', wpshopmart_accordion_directory_url.'js/jquery-linedtextarea.js');
			wp_enqueue_script( 'wpsm_ac-bootstrap-js', wpshopmart_accordion_directory_url.'js/bootstrap.js');
			
			//tooltip
			wp_enqueue_style('wpsm_ac_tooltip', wpshopmart_accordion_directory_url.'tooltip/darktooltip.css');
			wp_enqueue_script( 'wpsm_ac-tooltip-js', wpshopmart_accordion_directory_url.'tooltip/jquery.darktooltip.js');
			
			// settings
			wp_enqueue_style('wpsm_ac_settings-css', wpshopmart_accordion_directory_url.'css/settings.css');
			
			//icon picker	
			wp_enqueue_script('font-icon-picker-js',wpshopmart_accordion_directory_url.'js/fontawesome-iconpicker.js',array('jquery'));
			wp_enqueue_script('call-icon-picker-js',wpshopmart_accordion_directory_url.'js/call-icon-picker.js',array('jquery'), false, true);
			wp_enqueue_script('remodal-min-js',wpshopmart_accordion_directory_url.'modal/remodal.min.js',array('jquery'), false, true);
			wp_enqueue_style('wpsm_ac_help_css', wpshopmart_accordion_directory_url.'css/help.css');
	
		}
	}
	
	
	// Register Custom Post Type
	public function Responsive_accordion() {
		require_once('reg-cpt.php');

	}
	function responsive_accordion_columns( $columns ){
        $columns = array(
            'cb' => '<input type="checkbox" />',
            'title' => __( 'Accordion' ),
            'shortcode' => __( 'Accordion Shortcode' ),
            'date' => __( 'Date' )
        );
        return $columns;
    }

    function responsive_accordion_manage_columns( $column, $post_id ){
        global $post;
        switch( $column ) {
          case 'shortcode' :
            echo '<input type="text" value="[WPSM_AC id='.$post_id.']" readonly="readonly" />';
            break;
          default :
            break;
        }
    }
	
	public function wpsm_accordion_meta_boxes_group(){
		add_meta_box('add_accordion', __('Add Accordion', wpshopmart_accordion_text_domain), array(&$this, 'wpsm_add_ac_meta_box_function'), 'responsive_accordion', 'normal', 'low' );
		add_meta_box ('accordion_shortcode', __('Accordion Shortcode', wpshopmart_accordion_text_domain), array(&$this, 'wpsm_pic_ac_shortcode'), 'responsive_accordion', 'normal', 'low');
		add_meta_box ('wpsm_pic_ac_help', __('Support & Docs', wpshopmart_accordion_text_domain), array(&$this, 'wpsm_pic_ac_help'), 'responsive_accordion', 'normal', 'low');
		
		add_meta_box('accordion_follow', __('BLACK FRIDAY DEAL', wpshopmart_accordion_text_domain), array(&$this, 'wpsm_accordion_follow_meta_box_function'), 'responsive_accordion', 'side', 'low');
		
		add_meta_box('accordion_rateus', __('Rate Us If You Like This Plugin', wpshopmart_accordion_text_domain), array(&$this, 'wpsm_accordion_rateus_meta_box_function'), 'responsive_accordion', 'side', 'low');
		add_meta_box('accordion_setting', __('Accordion Settings', wpshopmart_accordion_text_domain), array(&$this, 'wpsm_add_ac_setting_meta_box_function'), 'responsive_accordion', 'side', 'low');
		add_meta_box ('accordion_more_free_plugins', __('More Free Plugins From Wpshopmart', wpshopmart_accordion_text_domain), array(&$this, 'wpsm_add_ac_more_free_plugins'), 'responsive_accordion', 'normal', 'low');		
		add_meta_box('accordion_more_pro', __('MOre Pro Plugins From Wpshopmart', wpshopmart_accordion_text_domain), array(&$this, 'wpsm_add_ac_more_pro'), 'responsive_accordion', 'normal', 'low');
	}
	
	public function wpsm_add_ac_meta_box_function($post){
		require_once('add-acc.php');
	}
	
	public function wpsm_pic_ac_shortcode(){
		?>
		<style>
			#accordion_shortcode{
			background:#fff!important;
			box-shadow: 0 0 20px rgba(0,0,0,.2);
			}
			#accordion_shortcode .hndle , #accordion_shortcode .handlediv{
			display:none;
			}
			#accordion_shortcode p{
			color:#000;
			font-size:15px;
			}
			#accordion_shortcode input {
			font-size: 16px;
			padding: 8px 10px;
			width:100%;
			}
			
		</style>
		<h3>Accordion Shortcode</h3>
		<p><?php _e("Use below shortcode in any Page/Post to publish your Accordion", wpshopmart_accordion_text_domain);?></p>
		<input readonly="readonly" type="text" value="<?php echo "[WPSM_AC id=".get_the_ID()."]"; ?>">
		<?php
		 $PostId = get_the_ID();
		$Accordion_Settings = unserialize(get_post_meta( $PostId, 'Accordion_Settings', true));
		if($Accordion_Settings['acc_sec_title'] && $Accordion_Settings['op_cl_icon'] && $Accordion_Settings['acc_title_bg_clr']) {  
			 $custom_css     	= $Accordion_Settings['custom_css'];
		}
		else{
		$custom_css="";
		}		
		?>
		<h3>Custom Css</h3>
		<textarea name="custom_css" id="custom_css" style="width:100% !important ;height:300px;background:#ECECEC;"><?php echo $custom_css ; ?></textarea>
		<p>Enter Css without <strong>&lt;style&gt; &lt;/style&gt; </strong> tag</p>
		<br>
		
		<?php 
	}
	
	
	
	public function wpsm_add_ac_more_free_plugins(){
		require_once('more-free-plugins.php');
		
	}
	public function wpsm_add_ac_more_pro(){
		require_once('more-pro.php');
		
	}
	
	public function wpsm_add_ac_setting_meta_box_function($post){
		require('settings.php');
	}
	public function wpsm_pic_ac_help(){
		require_once('help.php');
	}
	public function add_accordion_meta_box_save($PostID) {
		require('data-post/ac-save-data.php');
    }
	public function wpsm_accordion_follow_meta_box_function(){
		?>
		<style>
		
		#accordion_follow{
			background-color: #7242e7;
			   text-align:center;
			}
			#accordion_follow .hndle , #accordion_follow .handlediv{
			display:none;
			}
			#accordion_follow h1{
			color:#fff;
			
			}
			 #accordion_follow h3 {
			color:#fff;
			font-size:15px;
			}
			#accordion_follow .button-hero{
			display:block;
			text-align:center;
			margin-bottom:15px;
			
			}
			.wpsm-rate-us{
			text-align:center;
			}
			.wpsm-rate-us span.dashicons {
				width: 40px;
				height: 40px;
				font-size:20px;
				color : #ffffff !important;
			}
			.wpsm-rate-us span.dashicons-star-filled:before {
				content: "\f155";
				font-size: 40px;
			}
			#accordion_follow .button-hero{
				    background: #fff;
					color: #000;
					box-shadow: none;
					text-shadow: none;
					font-weight: 500;
					font-size: 16px;
					border:1px solid #000;
				
			}
		</style>
		<br />
		<a href="http://demo.wpshopmart.com/responsive-accordion-and-collapse/" target="_blank" class="button button-primary button-hero ">View Demo For Help</a>
			
		<?php
	}
	
	public function wpsm_accordion_rateus_meta_box_function(){
		?>
		<style>
		#accordion_rateus{
			   background-color: #E74B42;
			   text-align:center;
			}
			#accordion_rateus .hndle , #accordion_rateus .handlediv{
			display:none;
			}
			#accordion_rateus h1{
			color:#fff;
			border-bottom: 1px dotted rgba(250,250,250,0.5);
			}
			 #accordion_rateus h3 {
			color:#fff;
			font-size:15px;
			}
			#accordion_rateus .button-hero{
			display:block;
			text-align:center;
			margin-bottom:15px;
			}
			.wpsm-rate-us{
			text-align:center;
			}
			.wpsm-rate-us span.dashicons {
				width: 40px;
				height: 40px;
				font-size:20px;
				color : #fff !important;
			}
			.wpsm-rate-us span.dashicons-star-filled:before {
				content: "\f155";
				font-size: 40px;
			}
			#accordion_rateus .button-hero{
				    background: #fff;
					color: #000;
					box-shadow: none;
					text-shadow: none;
					font-weight: 500;
					font-size: 17px;
					border:1px solid #000;
				
			}
		</style>
		   <h1>Need Help </h1>
			<h3>Feel free to ask any query to us related to this plugin here </h3>
			<a href="https://wordpress.org/support/plugin/responsive-accordion-and-collapse" target="_blank" class="button button-primary button-hero ">Submit Your Query Here</a>
			
		<?php 
	}
	
	public function accordion_settings_meta_box_save($PostID){
		require('data-post/ac-settings-save-data.php');
	}
} 
 
global $wpsm_accordion;
$wpsm_accordion = wpsm_accordion::forge();
?>