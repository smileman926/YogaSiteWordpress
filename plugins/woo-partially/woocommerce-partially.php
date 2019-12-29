<?php
/**
* Plugin Name: Woo Partial.ly
* License: GPLv2 or later
* Plugin URI: https://partial.ly
* Version: 2.0.8
* Description: Add Partial.ly payment plans to your WooCommerce store
*/

if ( ! defined( 'ABSPATH' ) ) exit;

add_action('plugins_loaded', 'woocommerce_partially_init');

function woocommerce_partially_init() {

    if ( ! class_exists('WC_Payment_Gateway'))  return;

    class WC_Gateway_Partially extends WC_Payment_Gateway {

        public static $log = false;
        private static $_instance = NULL;

        public static function instance() {
            if (is_null(self::$_instance)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function __construct() {
            global $woocommerce;
            $this->id 					= 'partially';
						// title and description merchant sees in wp admin
            $this->method_title = __('Partial.ly Payment Plans', 'woo_partially');
            $this->method_description = __('Offer customers the option to pay with a Partial.ly payment plan at checkout. Optionally show a widget on your product page showing payment plans options, or a Partial.ly checkout button on your cart. <a href="https://partial.ly/register?ga_campaign=woocommerce_plugin">Register for a Partial.ly account</a> if you don\'t already have one and start offering payment plans today.', 'woo_partially');
            $this->icon = 'https://d2nacfpe3n8791.cloudfront.net/images/glyph-gradient-sm.png';
            $this->supports = array('products');
            $this->init_form_fields();
            $this->init_settings();
            $this->title = $this->get_option('title');
            // description customer sees at checkout
            $this->description = $this->get_option('description');

            // check for v1.x plugin version options
            if (get_option('partially_settings')) {
              self::log('Detected plugin v1.x settings');
              $old_settings = get_option('partially_settings');
              // get the old offer id
              $this->settings['offer-id'] = $old_settings['partially_offer'];
              self::log('updating offer to '.$this->settings['offer-id'].' and enabling button on cart');
              // automatically enable checkout button on cart
              $this->settings['button-enabled-cart'] = 'yes';
              update_option( $this->get_option_key(), apply_filters( 'woocommerce_settings_api_sanitized_fields_' . $this->id, $this->settings ) );
              // remove old settings
              delete_option('partially_settings');
              self::log('deleted v1.x settings');
            }

            add_action('woocommerce_update_options_payment_gateways_' . $this->id, array( $this, 'process_admin_options' ));
            // add filter for thank you order id so we can mark as payment payment_complete
            add_filter('woocommerce_thankyou_order_id', array($this, 'partially_payment_callback'));
        }

        public static function log($message) {
            if (empty(self::$log)) {
                self::$log = new WC_Logger();
            }
            self::$log->add('Partial.ly', $message);
        }

        function init_form_fields() {
          $fields = array(
								'api-key' => array(
										'title' => __( 'Partial.ly API Key', 'woo_partially' ),
										'label' => __('Your Partial.ly API key can be found in the settings area of Partial.ly merchant portal', 'woo_partially'),
										'type' => 'text',
										'default' => ''
								),
                'enabled' => array(
                    'title' => __( 'Partial.ly gateway enabled', 'woo_partially' ),
                    'type' => 'checkbox',
                    'label' => __( 'Enable Partial.ly payment method at checkout', 'woo_partially' ),
                    'default' => 'yes'
                ),
                'title' => array(
                    'title' => __( 'Title', 'woo_partially' ),
                    'type' => 'text',
                    'description' => __( 'This controls the payment method title which the user sees during checkout.', 'woo_partially' ),
                    'default' => __( 'Partial.ly Payment Plan', 'woo_partially' )
                ),
                'description' => array(
                    'title' => __( 'Description', 'woo_partially' ),
                    'type' => 'text',
                    'description' => __( 'This controls the description which the user sees during checkout.', 'woo_partially' ),
                    'default' => __( 'Easy and flexible payment plan options from Partial.ly', 'woo_partially' )
                ),
                'base-url' => array(
                    'title' => __( 'Partial.ly gateway API URL', 'woo_partially' ),
                    'type' => 'text',
                    'default' => 'https://partial.ly/api/v1'
                ),
                'gateway_complete_status' => array(
                  'title' => __( 'Partial.ly gateway order status', 'woo_partially'),
                  'type' => 'select',
                  'options' => array(
                    'paid' => __( 'Mark orders as paid', 'woo_partially'),
                    'pending' => __( 'Mark orders as pending', 'woo_partially'),
                    'processing' => __( 'Mark orders as processing', 'woo_partially'),
                    'on-hold' => __ ( 'Mark orders as on hold', 'woo_partially')
                  ),
                  'default' => 'paid',
                  'description' => __( 'After a payment plan is created, set the order status to this', 'woo_partially'),
                  'desc_tip' => true
                ));

                // see if api key valid and we can add list of offers
                $offers = $this->get_offers();
                if (count($offers) > 0) {
                  $opts = array('' => __( 'Not set', 'woo_partially' ) );
                  foreach ($offers as $o) $opts[$o->id] = $o->name;
                  $fields['offer-id'] = array(
                      'title' => __( 'Partial.ly Offer', 'woo_partially' ),
                      'type' => 'select',
                      'options'=>$opts
                  );
                }
                else {
                  $fields['offer-id'] = array(
                      'title' => __( 'Partial.ly Offer ID', 'woo_partially' ),
                      'type' => 'text',
                      'description'=>__('Offer ID to use. Create an offer in the Partial.ly merchant portal', 'woo_partially'),
                      'desc_tip'=>true
                  );
                }

					  $rest_fields = array(
              'gateway_send_image' => array(
                  'title' => __('Send product images to Partial.ly', 'woo_partially'),
                  'type' => 'checkbox',
                  'default' => 'yes',
                  'description' => __('Send product thumbnails to Partial.ly to display in Partial.ly checkout', 'woo_partially'),
                  'desc_tip' => true
              ),
              'widget'=>array(
                  'title'=> __('Widget options', 'woo_partially'),
                  'type'=>'title',
                  'description'=>''
                ),
								'widget-enabled' => array(
									'title' => __('Partial.ly widget enabled', 'woo_partially'),
									'label' => __('Enable Partial.ly widget for your product page, shows available Partial.ly options', 'woo_partially'),
									'type' => 'checkbox',
									'default' => 'yes'
								),
                'widget-style' => array(
                  'title' => __('Widget style', 'woo_partially'),
                  'type' => 'select',
                  'default'=>'stacked',
                  'options' => array(
                    'stacked' => __('stacked', 'woo_partially'),
                    'thin' => __('thin', 'woo_partially')
                  )
                ),
                'widget-title' => array(
                    'title' => __( 'Widget title', 'woo_partially' ),
                    'type' => 'text',
                    'default'=>'Flexible Payments'
                ),
                'widget-body' => array(
                    'title' => __( 'Widget body', 'woo_partially' ),
                    'type' => 'text',
                    'description'=>__('Customize the text for the widget. Leave empty for default text', 'woo_partially'),
                    'desc_tip'=>true
                ),
                'widget-trigger-text' => array(
                    'title' => __( 'Widget trigger text', 'woo_partially' ),
                    'type' => 'text',
                    'default'=>'learn more'
                ),
                'widget-popup-details' => array(
                    'title' => __( 'Widget popup details', 'woo_partially' ),
                    'type' => 'textarea'
                ),
                'widget-checkout-enabled' => array(
									'title' => __('Widget checkout enabled', 'woo_partially'),
									'label' => __('Enable Partial.ly checkout directly from the widget', 'woo_partially'),
									'type' => 'checkbox',
									'default' => 'no'
								),
                'widget-checkout-button-text' => array(
                  'title' => __( 'Widget checkout button text', 'woo_partially' ),
                  'type' => 'text',
                  'default'=>__('Purchase with Partial.ly', 'woo_partially')
                ),
                'checkout-button'=>array(
                  'title'=> __('Checkout button options', 'woo_partially'),
                  'type'=>'title',
                  'description'=>''
                ),
                'button-enabled-cart' => array(
									'title' => __('Partial.ly button on cart', 'woo_partially'),
									'label' => __('Enable Partial.ly button on your cart for direct checkout on Partial.ly', 'woo_partially'),
									'type' => 'checkbox',
									'default' => 'no'
								),
                'button-enabled-product' => array(
									'title' => __('Partial.ly button on product pages', 'woo_partially'),
									'label' => __('Enable Partial.ly button on your product landing pages for direct checkout on Partial.ly', 'woo_partially'),
									'type' => 'checkbox',
									'default' => 'no'
								)
            );

            $this->form_fields = array_merge($fields, $rest_fields);
        }

        function process_payment($order_id) {
            global $woocommerce;
            if( function_exists("wc_get_order") ) {
                $order = wc_get_order($order_id);
            }
            else {
                $order = new WC_Order($order_id);
            }

            return $this->get_redirect_url($order);
        }

        function get_redirect_url($order) {
            // create array of data to post to partial.ly gateway api
						$body = array(
								'payment_plan' => array(
									'offer_id' => apply_filters('partially_gateway_offer', $this->get_option('offer-id')),
									'integration' => 'woocommerce',
									'integration_id' => (string) $order->get_id(),
                  'amount' => $order->get_total(),
                  'currency' => get_woocommerce_currency(),
									'customer' => array(
	                    'first_name' => $order->get_billing_first_name(),
	                    'last_name' => $order->get_billing_last_name(),
	                    'email' => $order->get_billing_email(),
	                    'phone' => $order->get_billing_phone(),
	                ),
									'shipto_address' => $order->get_shipping_address_1(),
                  'shipto_address2' => $order->get_shipping_address_2(),
                  'shipto_city' => $order->get_shipping_city(),
                  'shipto_state' => $order->get_shipping_state(),
                  'shipto_postal_code' => $order->get_shipping_postcode(),
                  'shipto_country' => $order->get_shipping_country(),
									'meta' => array(
										'checkout_complete_url' => $this->get_return_url($order),
										'items' => array()
									)
								)
            );

            if( method_exists($order, "get_cancel_order_url_raw") ) {
                $body['payment_plan']['meta']['checkout_cancel_url'] = $order->get_cancel_order_url_raw();
            }
            else {
                $body['payment_plan']['meta']['checkout_cancel_url'] = $order->get_cancel_order_url();
            }

            if (count($order->get_items())) {
                foreach ($order->get_items() as $item) {
                    if ($item['variation_id']) {
                        if(function_exists("wc_get_product")) {
                            $product = wc_get_product($item['variation_id']);
                        }
                        else {
                            $product = new WC_Product($item['variation_id']);
                        }
                    } else {
                        if(function_exists("wc_get_product")) {
                            $product = wc_get_product($item['product_id']);
                        }
                        else {
                            $product = new WC_Product($item['product_id']);
                        }
                    }
                    $qty = $item['qty'];
                    $price = round($item['line_subtotal'] / $qty, 2);
                    $item_data = array(
                        'name' => $item['name'],
                        'sku' => $product->get_sku(),
												'price' => $price,
                        'quantity' => $qty,
												'total' => $item['line_total'],
												'product_id' => $item['product_id']
                    );
										if ($item['variation_id']) $item_data['variation_id'] = $item['variation_id'];
                    if ($this->get_option('gateway_send_image') != 'no') {
											$thumb = wp_get_attachment_image_src(get_post_thumbnail_id($item['product_id']));
											if ($thumb && $thumb[0]) $item_data['image'] = $thumb[0];
                    }
                    array_push($body['payment_plan']['meta']['items'], $item_data);
                }
            }

            $request = array(
                'headers' => array(
                    'Content-Type' 	=> 'application/json',
                    'Authorization' => 'Bearer ' . $this->get_option('api-key')
                ),
                'body' => json_encode( apply_filters('partially_gateway_settings', $body) )
            );

            $response = wp_remote_post($this->get_create_checkout_url(), $request);

            if ( wp_remote_retrieve_response_code($response) == 200) {
              $json = json_decode(wp_remote_retrieve_body($response));

              return array(
                  'result' => 'success',
                  'redirect' => $json->gateway_purchase_url
              );
            }
            else {
              return array(
                'result' => 'fail',
                'message' => 'Could not connect to Partial.ly'
              );
            }
        }

        function partially_payment_callback($order_id) {
            if(function_exists("wc_get_order")) {
                $order = wc_get_order($order_id);
            }
            else {
                $order = new WC_Order($order_id);
            }

            $status = $this->get_option('gateway_complete_status');

            // only do this for partially payments
            if ($order && $order->get_payment_method() == 'partially') {
              if ($status == 'paid') {
                $order->payment_complete();
              }
              else {
                $order->update_status($status, __('Partial.ly payment plan created', 'woo_partially'));
                if (function_exists('wc_reduce_stock_levels')) {
                  wc_reduce_stock_levels($order_id);
                }
                else {
                  $order->reduce_order_stock();
                }
              }
            }

            return $order_id;
        }

				function get_base_url() {
            $url = $this->get_option('base-url');

            if (substr($url, -1) == '/') {
                $url = substr($string, 0, -1);
            }

            return $url;
        }

				function get_create_checkout_url() {
					return $this->get_base_url() . '/gateway_purchase_url';
				}

        function get_offers() {
          $req = array(
              'headers' => array(
                  'Content-Type' 	=> 'application/json',
                  'Authorization' => 'Bearer ' . $this->get_option('api-key')
              )
          );
          $url = $this->get_base_url() . '/offer';
          $res = wp_remote_get($url, $req);
          if (is_array($res) && wp_remote_retrieve_response_code($res) == 200) {
            return json_decode( wp_remote_retrieve_body($res) );
          }
          else {
            return array();
          }
        }

    } // end class WC_Gateway_Partially

    function add_partially_gateway($methods) {
        $methods[] = 'WC_Gateway_Partially';
        return $methods;
    }

    add_filter('woocommerce_payment_gateways', 'add_partially_gateway');

    add_filter('woocommerce_single_product_summary', 'add_partially_widget', 12);

    function add_partially_widget() {
        $gateway = WC_Gateway_Partially::instance();
        $showWidget = $gateway->get_option('widget-enabled');
        if ($showWidget == 'no') {
            return;
        }

        global $product;
        $amount = $product->get_price();
        $offer = $gateway->get_option('offer-id');
        $style = $gateway->get_option('widget-style');
        $title = $gateway->get_option('widget-title');
        $trigger_text = $gateway->get_option('widget-trigger-text');
        $popup_details = $gateway->get_option('widget-popup-details');

        $widget_config = array(
          'amount' => $amount,
          'offer' => $offer,
          'quantity' => 1,
          'currency' => get_woocommerce_currency(),
          'targetSelector' => '#widgetContainer',
          'style' => $style,
          'title' => $title,
          'actionText' => $trigger_text,
          'popupDetails' => $popup_details,
          'quantitySelector'=>'.quantity input',
          'source' => 'woocommerce'
        );

        if ($gateway->get_option('widget-body')) {
          $widget_config['body'] = $gateway->get_option('widget-body');
        }

        // check for checkout button config
        if ($gateway->get_option('widget-checkout-enabled') == 'yes') {
          $widget_config['includeCheckout'] = true;
          $widget_config['checkoutButtonText'] = $gateway->get_option('widget-checkout-button-text');
          $product_data = $product->get_data();
          $thumb = wp_get_attachment_image_src(get_post_thumbnail_id($product->get_id()));
          if ($thumb && $thumb[0]) {
            $product_data['image'] = $thumb[0];
          }
          $widget_config['checkoutButtonConfig'] = array(
            'amount' => $amount,
            'offer' => $offer,
            'quantity' => 1,
            'currency' => get_woocommerce_currency(),
            'returnUrl' => get_site_url() . '/' . $product->get_slug(),
            'woocommerceProduct' => $product_data,
            'quantitySelector'=>'.quantity input'
          );
        }

        $widget_config_json = json_encode( apply_filters('partially_widget_config', $widget_config) );

        $default_container_html = '<div id="widgetContainer"></div>';
        $container_html = apply_filters('partially_widget_container_html', $default_container_html);

				$asset_base = apply_filters('partially_asset_base', 'https://partial.ly/');
				$js_url = $asset_base . 'js/partially-widget.js';

        echo "
          $container_html
          <script type=\"text/javascript\">
          document.partiallyWidgetConfig = $widget_config_json;
          (function() {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = '$js_url';
            script.async = true;
            document.head.appendChild(script);
          })();
          </script>
        ";
    }

    function maybe_add_partially_cart_button() {
      $gateway = WC_Gateway_Partially::instance();
      $show = $gateway->get_option('button-enabled-cart');
      if ($show == 'no') {
          return;
      }

      $partially_offer = apply_filters('partially_button_cart_offer', $gateway->get_option('offer-id'));

      // check if they have a custom legacy template
    	$legacy_template_name = 'partially-checkout.php';
    	$custom_legacy_template = locate_template($legacy_template_name);
    	if ($custom_legacy_template) {
    		include $custom_legacy_template;
    	}
      else {
          // new version
          global $woocommerce;

          $button_config = array(
            'offer' => $partially_offer,
            'amount' => WC()->cart->total,
            'currency' => get_woocommerce_currency(),
            'returnUrl' => get_site_url(null, '/cart'),
            'renderSelector'=>'#partiallyCartButtonContainer',
            'meta' => array(
              'source' => 'woocommerce',
              'items' => array()
            )
          );

          if (WC()->cart->shipping_total > 0 || (WC()->cart->tax_total + WC()->cart->shipping_tax_total) > 0) {
              $button_config['meta']['subtotal'] = WC()->cart->subtotal_ex_tax;
          }
          if (WC()->cart->tax_total + WC()->cart->shipping_tax_total > 0) {
            $button_config['meta']['tax'] = WC()->cart->tax_total + WC()->cart->shipping_tax_total;
          }
          if (WC()->cart->shipping_total > 0) {
            $button_config['meta']['shipping'] = WC()->cart->shipping_total;
          }

          foreach (WC()->cart->get_cart() as $cart_item_key => $item) {
              $price = $item['data']->get_price();
              if ( ! $price) {
                $price = round($item['line_subtotal'] / $item['quantity'], 2);
              }
              $data = array(
                'id' => $cart_item_key,
                'name' => addslashes($item['data']->get_name()),
                'price' => $price,
                'quantity' => $item['quantity'],
                'total' => $item['line_total'],
                'product_id' => $item['product_id']
              );

              if ($item['data']->get_sku()) {
                $data['sku'] = $item['data']->get_sku();
              }

              $thumb = wp_get_attachment_image_src(get_post_thumbnail_id($item['product_id']));
              if ($thumb && $thumb[0]) {
                $data['image'] = $thumb[0];
              }
              if ($item['variation_id']) {
                $data['variant_id'] = $item['variation_id'];
              }

              $button_config['meta']['items'] []= $data;
          }

          $button_config_json = json_encode( apply_filters('partially_button_cart_config', $button_config) );

          $default_container_html = '<div id="partiallyCartButtonContainer"></div>';
          $container_html = apply_filters('partially_cart_button_container_html', $default_container_html);

					$asset_base = apply_filters('partially_asset_base', 'https://partial.ly/');
					$js_url = $asset_base . 'js/partially-checkout-button.js';

          echo "
            $container_html
            <script type=\"text/javascript\">
            var cartButtonConfig = $button_config_json;
            if (window.PartiallyButton) {
              var btn = new window.PartiallyButton(cartButtonConfig);
              btn.init();
            }
            else {
              document.partiallyButtonConfig = cartButtonConfig;
              (function() {
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = '$js_url';
                script.async = true;
                document.head.appendChild(script);
              })();
            }
            </script>
          ";

      }
    }

    add_action('woocommerce_after_cart_totals', 'maybe_add_partially_cart_button');

    function maybe_add_partially_product_button() {
      $gateway = WC_Gateway_Partially::instance();
      $show = $gateway->get_option('button-enabled-product');
      if ($show == 'no') {
          return;
      }

      global $product;

      $partially_offer = apply_filters('partially_button_product_offer', $gateway->get_option('offer-id'));

      $product_data = $product->get_data();
      $thumb = wp_get_attachment_image_src(get_post_thumbnail_id($product->get_id()));
      if ($thumb && $thumb[0]) {
        $product_data['image'] = $thumb[0];
      }

      $button_config = array(
        'offer' => $partially_offer,
        'quantity' => 1,
        'currency' => get_woocommerce_currency(),
        'returnUrl' => get_site_url() . '/' . $product->get_slug(),
        'woocommerceProduct' => $product_data,
        'quantitySelector'=>'.quantity input',
        'renderSelector'=>'#partiallyProductButtonContainer'
      );

      $button_config_json = json_encode( apply_filters('partially_button_product_config', $button_config) );

      $default_container_html = '<div id="partiallyProductButtonContainer"></div>';
      $container_html = apply_filters('partially_product_button_container_html', $default_container_html);

			$asset_base = apply_filters('partially_asset_base', 'https://partial.ly/');
			$js_url = $asset_base . 'js/partially-checkout-button.js';

      echo "
        $container_html
        <script type=\"text/javascript\">
        document.partiallyButtonConfig = $button_config_json;
        (function() {
          var script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = '$js_url';
          script.async = true;
          document.head.appendChild(script);
        })();
        </script>
      ";

    }

    add_action('woocommerce_after_add_to_cart_form', 'maybe_add_partially_product_button');

} // end woocommerce_partially_init
