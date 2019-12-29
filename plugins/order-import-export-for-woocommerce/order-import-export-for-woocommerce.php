<?php
/*
 * 
Plugin Name: Order / Coupon / Subscription Export Import Plugin for WooCommerce (BASIC)
Plugin URI: https://wordpress.org/plugins/order-import-export-for-woocommerce/
Description: Export and Import Order detail including line items, From and To your WooCommerce Store.
Author: WebToffee
Author URI: https://www.webtoffee.com/product/woocommerce-order-coupon-subscription-export-import/
Version: 1.5.6
Text Domain: order-import-export-for-woocommerce
WC tested up to: 3.8.1
License: GPLv3
License URI: https://www.gnu.org/licenses/gpl-3.0.html
*/

if ( ! defined( 'ABSPATH' ) || ! is_admin() ) {
	return;
}

define( "WF_ORDER_IMP_EXP_ID", "wf_order_imp_exp" );
define( "WF_WOOCOMMERCE_ORDER_IM_EX", "wf_woocommerce_order_im_ex" );

define("WF_CPN_IMP_EXP_ID", "wf_cpn_imp_exp");
define("wf_coupon_csv_im_ex", "wf_coupon_csv_im_ex");

if (!defined('WF_ORDERIMPEXP_CURRENT_VERSION')) {
    define("WF_ORDERIMPEXP_CURRENT_VERSION", "1.5.6");
}

/**
 * Check if WooCommerce is active
 */
register_activation_hook(__FILE__, 'wt_order_basic_register_activation_hook_callback');

function wt_order_basic_register_activation_hook_callback() {
    if(!class_exists( 'WooCommerce' )){
        deactivate_plugins(basename(__FILE__));
        wp_die(__("WooCommerce is not installed/actived. it is required for this plugin to work properly. Please activate WooCommerce.", "order-import-export-for-woocommerce"), "", array('back_link' => 1));
    }
    if (is_plugin_active('order-import-export-for-woocommerce-pro/order-import-export.php')) {
        deactivate_plugins(basename(__FILE__));
        wp_die(__("Looks like you have both free and premium version installed on your site! Prior to activating premium, deactivate and delete the free version. For any issue kindly contact our support team here: <a target='_blank' href='https://www.webtoffee.com/support/'>support</a>", "order-import-export-for-woocommerce"), "", array('back_link' => 1));
    }
    update_option('wt_ord_plugin_installed_date', date('Y-m-d H:i:s'));
}
//if (in_array( 'woocommerce/woocommerce.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ) )) {	

	if ( ! class_exists( 'WF_Order_Import_Export_CSV' ) ) :

	/**
	 * Main CSV Import class
	 */
	class WF_Order_Import_Export_CSV {

		/**
		 * Constructor
		 */
		public function __construct() {
			
                        define( 'WF_OrderImpExpCsv_FILE', __FILE__ );
                        define('WF_OrderImpExpCsv_FILE_Url', plugin_dir_url(__FILE__));
                        
                        if (!defined('WT_OrdImpExpCsv_BASE')) {
                            define('WT_OrdImpExpCsv_BASE', plugin_dir_path(__FILE__));
                        }

			add_filter( 'woocommerce_screen_ids', array( $this, 'woocommerce_screen_ids' ) );
			add_filter( 'plugin_action_links_' . plugin_basename( __FILE__ ), array( $this, 'wf_plugin_action_links' ) );
			add_action( 'init', array( $this, 'load_plugin_textdomain' ) );
			add_action( 'init', array( $this, 'catch_export_request' ), 20 );
			add_action( 'init', array( $this, 'catch_save_settings' ), 20 );
			add_action( 'admin_init', array( $this, 'register_importers' ) );
                                               
                        include_once( 'includes/class-wf-orderimpexpcsv-system-status-tools.php' );
			include_once( 'includes/class-wf-orderimpexpcsv-admin-screen.php' );
			include_once( 'includes/importer/class-wf-orderimpexpcsv-importer.php' );

			if ( defined('DOING_AJAX') ) {
				include_once( 'includes/class-wf-orderimpexpcsv-ajax-handler.php' );
			}
                        
                        // uninstall feedback catch
                        include_once 'includes/class-wf-orderimpexp-plugin-uninstall-feedback.php';
		}
		
		public function wf_plugin_action_links( $links ) {
			$plugin_links = array(
				'<a href="' . admin_url( 'admin.php?page=wf_woocommerce_order_im_ex' ) . '">' . __( 'Import Export', 'order-import-export-for-woocommerce' ) . '</a>',
                                '<a href="https://www.webtoffee.com/product/woocommerce-order-coupon-subscription-export-import/" target="_blank" style="color:#3db634;">' . __( 'Premium Upgrade', 'order-import-export-for-woocommerce' ) . '</a>',	
                                '<a target="_blank" href="https://www.webtoffee.com/support/">' . __( 'Support', 'order-import-export-for-woocommerce' ) . '</a>',
                                '<a target="_blank" href="https://wordpress.org/plugins/order-import-export-for-woocommerce/reviews/">' . __('Review', 'order-import-export-for-woocommerce') . '</a>',

			);
                        if (array_key_exists('deactivate', $links)) {
                            $links['deactivate'] = str_replace('<a', '<a class="wforderimpexp-deactivate-link"', $links['deactivate']);
                        }
			return array_merge( $plugin_links, $links );
		}
		
		/**
		 * Add screen ID
		 */
		public function woocommerce_screen_ids( $ids ) {
			$ids[] = 'admin'; // For import screen
			return $ids;
		}

		/**
		 * Handle localisation
		 */
		public function load_plugin_textdomain() {
			load_plugin_textdomain( 'order-import-export-for-woocommerce', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
		}

		/**
		 * Catches an export request and exports the data. This class is only loaded in admin.
		 */
		public function catch_export_request() {
			if ( ! empty( $_GET['action'] ) && ! empty( $_GET['page'] ) && $_GET['page'] == 'wf_woocommerce_order_im_ex' ) {
				switch ( $_GET['action'] ) {
					case "export" :
                                                $user_ok = $this->hf_user_permission();
                                                if ($user_ok) {
						include_once( 'includes/exporter/class-wf-orderimpexpcsv-exporter.php' );
						WF_OrderImpExpCsv_Exporter::do_export( 'shop_order' );
                                                }  else {
                                                    wp_redirect(wp_login_url());
                                                }
					break;
				}
			}
		}
		
		public function catch_save_settings() {
			if ( ! empty( $_GET['action'] ) && ! empty( $_GET['page'] ) && $_GET['page'] == 'wf_woocommerce_order_im_ex' ) {
				switch ( $_GET['action'] ) {
					case "settings" :
						include_once( 'includes/settings/class-wf-orderimpexpcsv-settings.php' );
						WF_OrderImpExpCsv_Settings::save_settings( );
					break;
				}
			}
		}

		/**
		 * Register importers for use
		 */
		public function register_importers() {
			register_importer( 'woocommerce_wf_order_csv', 'WooCommerce Order (CSV)', __('Import <strong>Orders</strong> to your store via a csv file.', 'order-import-export-for-woocommerce'), 'WF_OrderImpExpCsv_Importer::order_importer' );
		}
               
                private function hf_user_permission() {
                // Check if user has rights to export
                $current_user = wp_get_current_user();
                $current_user->roles = apply_filters('hf_add_user_roles', $current_user->roles);
                $current_user->roles = array_unique($current_user->roles);
                $user_ok = false;
                $wf_roles = apply_filters('hf_user_permission_roles', array('administrator', 'shop_manager'));
                if ($current_user instanceof WP_User) {
                    $can_users = array_intersect($wf_roles, $current_user->roles);
                    if (!empty($can_users) || is_super_admin($current_user->ID)) {
                        $user_ok = true;
                    }
                }
                return $user_ok;
                }

	}
	endif;

	new WF_Order_Import_Export_CSV();
        
        
        
        if (!class_exists('WF_Coupon_Import_Export_CSV')) :

        class WF_Coupon_Import_Export_CSV {

            public $cron;
            public $cron_import;

            /**
             * Constructor
             */
            public function __construct() {
                
                define('WF_CpnImpExpCsv_FILE', __FILE__);

                if (is_admin()) {
                    add_action('admin_notices', array($this, 'wf_coupon_ie_admin_notice'), 15);
                }

                add_filter('woocommerce_screen_ids', array($this, 'woocommerce_screen_ids'));
                add_action('init', array($this, 'load_plugin_textdomain'));
                add_action('init', array($this, 'catch_export_request'), 20);
                add_action('init', array($this, 'catch_save_settings'), 20);
                add_action('admin_init', array($this, 'register_importers'));

                include_once( 'includes/class-wf-cpnimpexpcsv-admin-screen.php' );
                include_once( 'includes/importer/class-wf-cpnimpexpcsv-importer.php' );
               
                if (defined('DOING_AJAX')) {
                    include_once( 'includes/class-wf-cpnimpexpcsv-ajax-handler.php' );
                }
                
            }


            function wf_coupon_ie_admin_notice() {
                global $pagenow;
                global $post;

                if (!isset($_GET["wf_coupon_ie_msg"]) && empty($_GET["wf_coupon_ie_msg"])) {
                    return;
                }

                $wf_coupon_ie_msg = $_GET["wf_coupon_ie_msg"];

                switch ($wf_coupon_ie_msg) {
                    case "1":
                        echo '<div class="update"><p>' . __('Successfully uploaded via FTP.', 'order-import-export-for-woocommerce') . '</p></div>';
                        break;
                    case "2":
                        echo '<div class="error"><p>' . __('Error while uploading via FTP.', 'order-import-export-for-woocommerce') . '</p></div>';
                        break;
                    case "3":
                        echo '<div class="error"><p>' . __('Please choose the file in CSV format using Method 1.', 'order-import-export-for-woocommerce') . '</p></div>';
                        break;
                }
            }

            /**
             * Add screen ID
             */
            public function woocommerce_screen_ids($ids) {
                $ids[] = 'admin'; // For import screen
                return $ids;
            }

            /**
             * Handle localisation
             */
            public function load_plugin_textdomain() {
                load_plugin_textdomain('order-import-export-for-woocommerce', false, dirname(plugin_basename(__FILE__)) . '/lang/');
            }

            /**
             * Catches an export request and exports the data. This class is only loaded in admin.
             */
            public function catch_export_request() {
                if (!empty($_GET['action']) && !empty($_GET['page']) && $_GET['page'] == 'wf_coupon_csv_im_ex') {
                    switch ($_GET['action']) {
                        case "export" :
                            $user_ok = $this->hf_user_permission();
                            if ($user_ok) {
                                include_once( 'includes/exporter/class-wf-cpnimpexpcsv-exporter.php' );
                                WF_CpnImpExpCsv_Exporter::do_export('shop_coupon');
                            } else {
                                wp_redirect(wp_login_url());
                            }
                            break;
                    }
                }
            }

            public function catch_save_settings() {
                if (!empty($_GET['action']) && !empty($_GET['page']) && $_GET['page'] == 'wf_coupon_csv_im_ex') {
                    switch ($_GET['action']) {
                        case "settings" :
                            include_once( 'includes/settings/class-wf-allimpexpcsv-settings.php' );
                            wf_allImpExpCsv_Settings::save_settings();
                            break;
                    }
                }
            }

            /**
             * Register importers for use
             */
            public function register_importers() {
                register_importer('coupon_csv', 'WooCommerce Coupons (CSV)', __('Import <strong>coupon</strong> to your store via a csv file.', 'order-import-export-for-woocommerce'), 'WF_CpnImpExpCsv_Importer::coupon_importer');
            }    

            private function hf_user_permission() {
                // Check if user has rights to export
                $current_user = wp_get_current_user();
                $current_user->roles = apply_filters('hf_add_user_roles', $current_user->roles);
                $current_user->roles = array_unique($current_user->roles);
                $user_ok = false;
                $wf_roles = apply_filters('hf_user_permission_roles', array('administrator', 'shop_manager'));
                if ($current_user instanceof WP_User) {
                    $can_users = array_intersect($wf_roles, $current_user->roles);
                    if (!empty($can_users) || is_super_admin($current_user->ID)) {
                        $user_ok = true;
                    }
                }
                return $user_ok;
                }
            
            
        }

        endif;

    new WF_Coupon_Import_Export_CSV();

//}



// if (!get_option('OCSEIPF_Webtoffee_storefrog_admin_notices_dismissed')) {
//     add_action('admin_notices', 'webtoffee_storefrog_admin_notices');
//     add_action('wp_ajax_OCSEIPF_webtoffee_storefrog_notice_dismiss', 'webtoffee_storefrog_notice_dismiss');
// } 
function webtoffee_storefrog_admin_notices() {

    if (apply_filters('webtoffee_storefrog_suppress_admin_notices', false)) {
        return;
    }
    $screen = get_current_screen();

    $allowed_screen_ids = array('woocommerce_page_wf_woocommerce_order_im_ex','woocommerce_page_wf_coupon_csv_im_ex');
    if (in_array($screen->id, $allowed_screen_ids) || (isset($_GET['import']) && $_GET['import'] == 'woocommerce_wf_order_csv') || (isset($_GET['import']) && $_GET['import'] == 'coupon_csv')  ) {

        $notice = __('<h3>Save Time, Money & Hassle on Your WooCommerce Data Migration?</h3>', 'order-import-export-for-woocommerce');
        $notice .= __('<h3>Use StoreFrog Migration Services.</h3>', 'order-import-export-for-woocommerce');

        $content = '<style>.webtoffee-storefrog-nav-tab.updated {display: flex;align-items: center;margin: 18px 20px 10px 0;padding:23px;border-left-color: #2c85d7!important}.webtoffee-storefrog-nav-tab ul {margin: 0;}.webtoffee-storefrog-nav-tab h3 {margin-top: 0;margin-bottom: 9px;font-weight: 500;font-size: 16px;color: #2880d3;}.webtoffee-storefrog-nav-tab h3:last-child {margin-bottom: 0;}.webtoffee-storefrog-banner {flex-basis: 20%;padding: 0 15px;margin-left: auto;} .webtoffee-storefrog-banner a:focus{box-shadow: none;}</style>';
        $content .= '<div class="updated woocommerce-message webtoffee-storefrog-nav-tab notice is-dismissible"><ul>' . $notice . '</ul><div class="webtoffee-storefrog-banner"><a href="http://www.storefrog.com/" target="_blank"> <img src="' . plugins_url(basename(plugin_dir_path(WF_OrderImpExpCsv_FILE))) . '/images/storefrog.png"/></a></div><div style="position: absolute;top: 0;right: 1px;z-index: 10000;" ><button type="button" id="webtoffee-storefrog-notice-dismiss" class="notice-dismiss"><span class="screen-reader-text">' . __('Dismiss this notice.', 'order-import-export-for-woocommerce') . '</span></button></div></div>';
        echo $content;


        wc_enqueue_js("jQuery( '#webtoffee-storefrog-notice-dismiss' ).click( function() {
                            jQuery.post( '" . admin_url("admin-ajax.php") . "', { action: 'OCSEIPF_webtoffee_storefrog_notice_dismiss' } );
                            jQuery('.webtoffee-storefrog-nav-tab').fadeOut();
			});
		    ");
    }
}

function webtoffee_storefrog_notice_dismiss() {

    if (!current_user_can('manage_woocommerce')) {
        wp_die(-1);
    }
    update_option('OCSEIPF_Webtoffee_storefrog_admin_notices_dismissed', 1);
    wp_die();
}




add_filter('admin_footer_text', 'WT_admin_footer_text', 100);
add_action('wp_ajax_ocsie_wt_review_plugin', "review_plugin");

function WT_admin_footer_text($footer_text) {
    if (!current_user_can('manage_woocommerce') || !function_exists('wc_get_screen_ids')) {
        return $footer_text;
    }
    $screen = get_current_screen();
    $allowed_screen_ids = array('woocommerce_page_wf_woocommerce_order_im_ex','woocommerce_page_wf_coupon_csv_im_ex');
    if (in_array($screen->id, $allowed_screen_ids) || (isset($_GET['import']) && $_GET['import'] == 'woocommerce_wf_order_csv') || (isset($_GET['import']) && $_GET['import'] == 'coupon_csv')  ) {
        if (!get_option('ocsie_wt_plugin_reviewed')) {
            $footer_text = sprintf(
                    __('If you like the plugin please leave us a %1$s review.', 'order-import-export-for-woocommerce'), '<a href="https://wordpress.org/support/plugin/order-import-export-for-woocommerce/reviews/?rate=5#new-post" target="_blank" class="wt-review-link" data-rated="' . esc_attr__('Thanks :)', 'order-import-export-for-woocommerce') . '">&#9733;&#9733;&#9733;&#9733;&#9733;</a>'
            );
            wc_enqueue_js(
                    "jQuery( 'a.wt-review-link' ).click( function() {
                                                   jQuery.post( '" . WC()->ajax_url() . "', { action: 'ocsie_wt_review_plugin' } );
                                                   jQuery( this ).parent().text( jQuery( this ).data( 'rated' ) );
                                           });"
            );
        } else {
            $footer_text = __('Thank you for your review.', 'order-import-export-for-woocommerce');
        }
    }

    return '<i>' . $footer_text . '</i>';
}

function review_plugin() {
    if (!current_user_can('manage_woocommerce')) {
        wp_die(-1);
    }
    update_option('ocsie_wt_plugin_reviewed', 1);
    wp_die();
}


/*
 *  Displays update information for a plugin. 
 */
function wt_order_import_export_for_woocommerce_update_message( $data, $response )
{
    if(isset( $data['upgrade_notice']))
    {
        printf(
        '<div class="update-message wt-update-message">%s</div>',
           $data['upgrade_notice']
        );
    }
}
add_action( 'in_plugin_update_message-order-import-export-for-woocommerce/order-import-export-for-woocommerce.php', 'wt_order_import_export_for_woocommerce_update_message', 10, 2 );
