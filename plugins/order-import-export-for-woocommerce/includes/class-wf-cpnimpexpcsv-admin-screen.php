<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class WF_CpnImpExpCsv_Admin_Screen {

	public function __construct() 
    {
		add_action( 'admin_menu', array( $this, 'admin_menu' ) );
		add_action( 'admin_print_styles', array( $this, 'admin_scripts' ) );
		add_action( 'admin_notices', array( $this, 'admin_notices' ) );

	}

	public function admin_notices() 
    {
		if ( ! function_exists( 'mb_detect_encoding' ) ) {
			echo '<div class="error"><p>' . __( 'Coupon CSV Import Export requires the function <code>mb_detect_encoding</code> to import and export CSV files. Please ask your hosting provider to enable this function.', 'order-import-export-for-woocommerce' ) . '</p></div>';
		}
	}

	public function admin_menu() 
    {
		$page = add_submenu_page( 'woocommerce', __( 'Coupon Im-Ex', 'order-import-export-for-woocommerce' ), __( 'Coupon Im-Ex', 'order-import-export-for-woocommerce' ), apply_filters( 'coupon_csv_coupon_role', 'manage_woocommerce' ), 'wf_coupon_csv_im_ex', array( $this, 'output' ) );
	}

    public static function hf_get_wc_path()
    {
            if (function_exists('WC')){
               $wc_path =  WC()->plugin_url();
            }else{
               $wc_path = plugins_url() . '/woocommerce'; 
            }
            return $wc_path;
    }

	public function admin_scripts() 
    {
        $screen = get_current_screen();
        $allowed_creen_id = array('admin','woocommerce_page_wf_coupon_csv_im_ex');
        if (in_array($screen->id, $allowed_creen_id)) {            
                $wc_path = self::hf_get_wc_path();
		wp_enqueue_style( 'woocommerce_admin_styles',  $wc_path. '/assets/css/admin.css' );
		wp_enqueue_style( 'woocommerce-coupon-csv-importer1', plugins_url( basename( plugin_dir_path( WF_CpnImpExpCsv_FILE ) ) . '/styles/wf-style.css', basename( __FILE__ ) ), '', '1.0.0', 'screen' );
        }
		
    }

	public function output() 
    {
		$tab = 'import';


        if(! empty( $_GET['page'] ))
        {
            if ( $_GET['page'] == 'wf_coupon_csv_im_ex' ) {
                $tab = 'coupon';
            }
        }
		if( ! empty( $_GET['tab'] )) {
			if( $_GET['tab'] == 'export' ) {
				$tab = 'export';
			}
			else if ( $_GET['tab'] == 'settings' ) {
				$tab = 'settings';
			}
            else if ( $_GET['tab'] == 'coupon' ) {
                $tab = 'coupon';
            }
		}
		include( 'views/html-wf-admin-screen.php' );
	}


	public function admin_import_page() {
        include( 'views/html-wf-getting-started.php' );
        include( 'views/import/html-wf-import-coupons.php' );
        $post_columns = include( 'exporter/data/data-wf-post-columns.php' );
        include( 'views/export/html-wf-export-coupons.php' );
    }

    public function admin_export_page() {
        $post_columns = include( 'exporter/data/data-wf-post-columns.php' );
        include( 'views/export/html-wf-export-orders.php' );
    }

    public function admin_coupon_page() 
    {
        include( 'views/import/html-wf-import-coupons.php' );
        include( 'views/export/html-wf-export-coupons.php' );
    }

	public function admin_settings_page() 
    {
		include( 'views/settings/html-wf-all-settings.php' );
	}
}

new WF_CpnImpExpCsv_Admin_Screen();