<?php

/**
 * WooCommerce CSV Importer class for managing parsing of CSV files.
 */
class WF_CSV_Parser {

    var $row;
    var $post_type;
    var $posts = array();
    var $processed_posts = array();
    var $file_url_import_enabled = true;
    var $log;
    var $merged = 0;
    var $skipped = 0;
    var $imported = 0;
    var $errored = 0;
    var $id;
    var $file_url;
    var $delimiter;

    /**
     * Constructor
     */
    public function __construct($post_type = 'shop_order') {
        $this->post_type = $post_type;
        $this->order_meta_fields = array(
            "order_tax",
            "order_shipping",
            "order_shipping_tax",
            "shipping_total",
            "shipping_tax_total",
            "fee_total",
            "fee_tax_total",
            "tax_total",
            "discount_total",
            "customer_user",
            "cart_discount",
            "order_discount",
            "order_total",
            "order_currency",
            "payment_method",
            "customer_email",
            "billing_first_name",
            "billing_last_name",
            "billing_company",
            "billing_address_1",
            "billing_address_2",
            "billing_city",
            "billing_state",
            "billing_postcode",
            "billing_country",
            "billing_email",
            "billing_phone",
            "shipping_first_name",
            "shipping_last_name",
            "shipping_company",
            "shipping_address_1",
            "shipping_address_2",
            "shipping_city",
            "shipping_state",
            "shipping_postcode",
            "shipping_country",
            "shipping_method",
            "download_permissions",
        );
    }

    /**
     * Format data from the csv file
     * @param  string $data
     * @param  string $enc
     * @return string
     */
    public function format_data_from_csv($data, $enc) {
        return ( $enc == 'UTF-8' ) ? $data : utf8_encode($data);
    }

    /**
     * Parse the data
     * @param  string  $file      [description]
     * @param  string  $delimiter [description]
     * @param  integer $start_pos [description]
     * @param  integer  $end_pos   [description]
     * @return array
     */
    public function parse_data($file, $delimiter, $start_pos = 0, $end_pos = null) {
        // Set locale
        $enc = mb_detect_encoding($file, 'UTF-8, ISO-8859-1', true);
        if ($enc)
            setlocale(LC_ALL, 'en_US.' . $enc);
        @ini_set('auto_detect_line_endings', true);
        $parsed_data = array();
        $raw_headers = array();
        // Put all CSV data into an associative array
        if (( $handle = fopen($file, "r") ) !== FALSE) {
            $header = fgetcsv($handle, 0, $delimiter);
            if ($start_pos != 0)
                fseek($handle, $start_pos);
            while (( $postmeta = fgetcsv($handle, 0, $delimiter) ) !== FALSE) {
                $row = array();
                foreach ($header as $key => $heading) {
                    $s_heading = $heading;
                    if ($s_heading == '')
                        continue;
                    // Add the heading to the parsed data
                    $row[$s_heading] = ( isset($postmeta[$key]) ) ? $this->format_data_from_csv($postmeta[$key], $enc) : '';
                    // Raw Headers stores the actual column name in the CSV
                    $raw_headers[$s_heading] = $heading;
                }
                $parsed_data[] = $row;
                unset($postmeta, $row);
                $position = ftell($handle);
                if ($end_pos && $position >= $end_pos)
                    break;
            }
            fclose($handle);
        }
        return array($parsed_data, $raw_headers, $position);
    }

    /**
     * Parse orders
     * @param  array  $item
     * @param  integer $merge_empty_cells
     * @return array
     */
    public function parse_orders($parsed_data, $raw_headers, $merging, $record_offset) {
        $item = $parsed_data;
        global $WF_CSV_Order_Import, $wpdb;
        //$allow_unknown_products = isset( $_POST['allow_unknown_products'] ) && $_POST['allow_unknown_products'] ? true : false;
        $allow_unknown_products = true;
        $results = array();
        // Count row
        $row = 0;
        // skipped records
        $skipped = 0;
        $csv_export_file = true;
        $available_methods = WC()->shipping()->load_shipping_methods();
        $available_gateways = WC()->payment_gateways->payment_gateways();
        $shop_order_status = $this->wc_get_order_statuses_neat();
        $tax_rates = array();
        foreach ($wpdb->get_results("SELECT * FROM {$wpdb->prefix}woocommerce_tax_rates") as $_row) {
            $tax_rates[$_row->tax_rate_id] = $_row;
        }
        $row++;
        if ($row <= $record_offset) {
            $WF_CSV_Order_Import->hf_order_log_data_change('order-csv-import', sprintf(__('> Row %s - skipped due to record offset.', 'order-import-export-for-woocommerce'), $row));
            unset($item);
            return;
        }
        $postmeta = $order = array();
        if (!$csv_export_file) {
            // standard format:  optional integer order number and formatted order number
            $order_number = (!empty($item['order_number']) ) ? $item['order_number'] : null;
            $order_number_formatted = (!empty($item['order_number_formatted']) ) ? $item['order_number_formatted'] : $order_number;
            $WF_CSV_Order_Import->hf_order_log_data_change('order-csv-import', sprintf(__('> Row %s - preparing for import.', 'order-import-export-for-woocommerce'), $row));
            // validate the supplied formatted order number/order number
            if (is_numeric($order_number_formatted) && !$order_number)
                $order_number = $order_number_formatted;  // use formatted for underlying order number if possible
            if ($order_number && !is_numeric($order_number)) {
                $WF_CSV_Order_Import->hf_order_log_data_change('order-csv-import', sprintf(__('> > Skipped. Order number field must be an integer: %s.', 'order-import-export-for-woocommerce'), $order_number));
                $skipped++;
                unset($item);
                return;
            }
            if ($order_number_formatted && !$order_number) {
                $WF_CSV_Order_Import->hf_order_log_data_change('order-csv-import', __('> > Skipped. Formatted order number provided but no numerical order number, see the documentation for further details.', 'order-import-export-for-woocommerce'));
                $skipped++;
                unset($item);
                return;
            }
        } else {
            $order_number_formatted = !empty($item['order_id']) ? $item['order_id'] : 0;
            $order_number = (!empty($item['order_number']) ? $item['order_number'] : ( is_numeric($order_number_formatted) ? $order_number_formatted : 0 ) );
        }
        if ($order_number_formatted) {
            // verify that this order number isn't already in use
            $query_args = array(
                'numberposts' => 1,
                'meta_key' => apply_filters('woocommerce_order_number_formatted_meta_name', '_order_number_formatted'),
                'meta_value' => $order_number_formatted,
                'post_type' => 'shop_order',
                'post_status' => array_keys(wc_get_order_statuses()),
                'fields' => 'ids',
            );
            $order_id = 0;
            $orders = get_posts($query_args);
            if (!empty($orders)) {
                list( $order_id ) = get_posts($query_args);
            }
            $order_id = apply_filters('woocommerce_find_order_by_order_number', $order_id, $order_number_formatted);
            if ($order_id) {
                // skip if order ID already exist. 
                $WF_CSV_Order_Import->hf_order_log_data_change('order-csv-import', sprintf(__('> > Skipped. Order %s already exists.', 'order-import-export-for-woocommerce'), $order_number_formatted));
                $skipped++;
                unset($item);
                return;
            }
        }
        // handle the special (optional) customer_user field
        if (isset($item['customer_id']) && $item['customer_id']) {
            // attempt to find the customer user
            $found_customer = false;
            if (is_int($item['customer_id'])) {
                $found_customer = get_user_by('id', $item['customer_id']);
                if (!$found_customer) {
                    $WF_CSV_Order_Import->hf_order_log_data_change('order-csv-import', sprintf(__('> > Skipped. Cannot find customer with id %s.', 'order-import-export-for-woocommerce'), $item['customer_id']));
                    $skipped++;
                    unset($item);
                    return;
                    ;
                }
            } elseif (is_email($item['customer_id'])) {
                // check by email
                $found_customer = email_exists($item['customer_id']);
            }
            if (!$found_customer) {
                $found_customer = username_exists($item['customer_id']);
            }
            if (!$found_customer) {
                // guest checkout
                $item['customer_id'] = 0;
            } else {
                $item['customer_id'] = $found_customer; // user id
            }
        } elseif ($csv_export_file && isset($item['billing_email']) && $item['billing_email']) {
            // see if we can link to user by billing email id
            $found_customer = email_exists($item['billing_email']);
            if ($found_customer)
                $item['customer_id'] = $found_customer;
            else
                $item['customer_id'] = 0;  // guest checkout
        } else {
            // guest checkout
            $item['customer_id'] = 0;
        }
        if (!empty($item['status'])) {
            $order['status'] = $item['status'];
            $found_status = false;
            $available_statuses = array();
            foreach ($shop_order_status as $status_slug => $status_name) {
                if (0 == strcasecmp($status_slug, $item['status']))
                    $found_status = true;
                $available_statuses[] = $status_slug;
            }
            if (!$found_status) {
                $WF_CSV_Order_Import->hf_order_log_data_change('order-csv-import', sprintf(__('> > Skipped. Unknown order status %s (%s).', 'order-import-export-for-woocommerce'), $item['status'], implode($available_statuses, ', ')));
                $skipped++;
                unset($item);
                return;
            }
        }
        if (!empty($item['order_date'])){
            $item['date'] = $item['order_date'];
        } elseif (isset($item['order_date'])) {
            $item['date'] = time();
        }
        if (!empty($item['date'])) {
            if(preg_match("/^(\d{2})-(\d{2})-(\d{2}) (\d{1}|\d{2}):(\d{2})$/", $item['date'])){
                $item['date'] = date_create_from_format('d-m-y H:i', $item['date']);
                $item['date'] = date_format($item['date'], 'Y-m-d H:i:s');
            }
            if (false === ( $item['date'] = strtotime($item['date']) )) {
                // invalid date format
                $WF_CSV_Order_Import->hf_order_log_data_change('order-csv-import', sprintf(__('> > Skipped. Invalid date format %s.', 'order-import-export-for-woocommerce'), $item['date']));
                $skipped++;
                unset($item);
                return;
            }
            $order['date'] = $item['date'];
        }
        $order_notes = array();
        if (!empty($item['order_notes'])) {
            $order_notes = explode("||", $item['order_notes']);
        }
        // build the order data object
        $order['order_id'] = !empty($item['order_id']) ? $item['order_id'] : null;
        $order['order_comments'] = !empty($item['customer_note']) ? $item['customer_note'] : null;
        $order['notes'] = $order_notes;
        if (!is_null($order_number))
            $order['order_number'] = $order_number;  // optional order number, for convenience
        if ($order_number_formatted)
            $order['order_number_formatted'] = $order_number_formatted;
        // totals
        $order_tax = $order_shipping_tax = null;
        // Get any known order meta fields, and default any missing ones to 0/null
        // the provided shipping/payment method will be used as-is, and if found in the list of available ones, the respective titles will also be set
        foreach ($this->order_meta_fields as $column) {
            switch ($column) {
                case 'shipping_method':
                    if(isset($item[$column])){
                        $value = $item[$column];
                        // look up shipping method by id or title
                        $shipping_method = isset($available_methods[$value]) ? $value : null;
                        if (!$shipping_method) {
                            // try by title
                            foreach ($available_methods as $method) {
                                if (0 === strcasecmp($method->title, $value)) {
                                    $shipping_method = $method->id;
                                    break;  // go with the first one we find
                                }
                            }
                        }
                        if ($shipping_method) {
                            //known shipping method found
                            $postmeta[] = array('key' => '_shipping_method', 'value' => $shipping_method);
                            $postmeta[] = array('key' => '_shipping_method_title', 'value' => $available_methods[$shipping_method]->title);
                        } elseif ($csv_export_file && $value) {
                            //Order CSV Export format, shipping method title with no corresponding shipping method type found, so just use the title
                            $postmeta[] = array('key' => '_shipping_method', 'value' => '');
                            $postmeta[] = array('key' => '_shipping_method_title', 'value' => $value);
                        } elseif ($value) {
                            //Shipping method but no title
                            $postmeta[] = array('key' => '_shipping_method', 'value' => $value);
                            $postmeta[] = array('key' => '_shipping_method_title', 'value' => '');
                        } else {
                            //none
                            $postmeta[] = array('key' => '_shipping_method', 'value' => '');
                            $postmeta[] = array('key' => '_shipping_method_title', 'value' => '');
                        }
                    }
                    break;
                case 'payment_method':
                    if (isset($item[$column])) {
                        $value = $item[$column];
                        // look up shipping method by id or title
                        $payment_method = isset($available_gateways[$value]) ? $value : null;
                        if (!$payment_method) {
                            // try by title
                            foreach ($available_gateways as $method) {
                                if (0 === strcasecmp($method->title, $value)) {
                                    $payment_method = $method->id;
                                    break;  // go with the first one we find
                                }
                            }
                        }
                        if ($payment_method) {
                            //Known payment method found
                            $postmeta[] = array('key' => '_payment_method', 'value' => $payment_method);
                            $postmeta[] = array('key' => '_payment_method_title', 'value' => $available_gateways[$payment_method]->title);
                        } elseif ($csv_export_file && $value) {
                            //Order CSV Export format, payment method title with no corresponding payments method type found, so just use the title
                            $postmeta[] = array('key' => '_payment_method', 'value' => '');
                            $postmeta[] = array('key' => '_payment_method_title', 'value' => $value);
                        } elseif ($value) {
                            //payment method but no title
                            $postmeta[] = array('key' => '_payment_method', 'value' => $value);
                            $postmeta[] = array('key' => '_payment_method_title', 'value' => '');
                        } else {
                            //none
                            $postmeta[] = array('key' => '_payment_method', 'value' => '');
                            $postmeta[] = array('key' => '_payment_method_title', 'value' => '');
                        }
                    }
                    break;
                // handle numerics
                case 'order_shipping':  // legacy
                case 'shipping_total':
                    if (isset($item[$column])) {
                        $order_shipping = $item[$column];  // save the order shipping total for later use
                        $postmeta[] = array('key' => '_order_shipping', 'value' => number_format((float) $order_shipping, 2, '.', ''));
                    }
                    break;
                case 'order_shipping_tax':  // legacy
                case 'shipping_tax_total':
                    // ignore blanks but allow zeroes
                    if (isset($item[$column]) && is_numeric($item[$column])) {
                        $order_shipping_tax = $item[$column];
                    }
                    break;
                case 'order_tax':  // legacy
                case 'tax_total':
                    // ignore blanks but allow zeroes
                    if (isset($item[$column]) && is_numeric($item[$column])) {
                        $order_tax = $item[$column];
                    }
                    break;
                case 'order_discount':
                case 'cart_discount':
                case 'order_total':
                    if (isset($item[$column])) {
                        $value = $item[$column];
                        $postmeta[] = array('key' => '_' . $column, 'value' => number_format((float) $value, 2, '.', ''));
                    }
                    break;

                case 'billing_country':
                case 'shipping_country':
                    if (isset($item[$column])) {
                        $value = $item[$column];
                        // support country name or code by converting to code
                        $country_code = array_search($value, WC()->countries->countries);
                        if ($country_code)
                            $value = $country_code;
                        $postmeta[] = array('key' => '_' . $column, 'value' => $value);
                    }
                    break;
                case 'Download Permissions Granted':
                case 'download_permissions_granted':
                    if (isset($item['download_permissions_granted'])) {
                        $postmeta[] = array('key' => '_download_permissions_granted', 'value' => $item['download_permissions_granted']);
                    }
                    break;
                case 'download_permissions':
                    if (isset($item['download_permissions'])) {
                        $postmeta[] = array('key' => '_download_permissions_granted', 'value' => $item['download_permissions']);
                        $postmeta[] = array('key' => '_download_permissions', 'value' => $item['download_permissions']);
                    }
                    break;
                default:
                    if (isset($item[$column])){
                        $postmeta[] = array('key' => '_' . $column, 'value' => $item[$column]);
                    }
            }
        }
        if (!empty($item['customer_id']))
            $postmeta[] = array('key' => '_customer_user', 'value' => $item['customer_id']);
        $order_shipping_methods = array();
        $_shipping_methods = array();
        // pre WC 2.1 format of a single shipping method, left for backwards compatibility of import files
        if (isset($item['shipping_method']) && $item['shipping_method']) {
            // collect the shipping method id/cost
            $_shipping_methods[] = array(
                $item['shipping_method'],
                isset($item['shipping_cost']) ? $item['shipping_cost'] : null
            );
        }
        // collect any additional shipping methods
        $i = null;
        if (isset($item['shipping_method_1'])) {
            $i = 1;
        } elseif (isset($item['shipping_method_2'])) {
            $i = 2;
        }
        if (!is_null($i)) {
            while (!empty($item['shipping_method_' . $i])) {
                $_shipping_methods[] = array(
                    $item['shipping_method_' . $i],
                    isset($item['shipping_cost_' . $i]) ? $item['shipping_cost_' . $i] : null
                );
                $i++;
            }
        }

        // if the order shipping total wasn't set, calculate it
        if (!isset($order_shipping)) {
            $order_shipping = 0;
            foreach ($_shipping_methods as $_shipping_method) {
                $order_shipping += $_shipping_method[1];
            }
            $postmeta[] = array('key' => '_order_shipping' . $column, 'value' => number_format((float) $order_shipping, 2, '.', ''));
        } elseif (isset($order_shipping) && 1 == count($_shipping_methods) && is_null($_shipping_methods[0][1])) {
            // special case: if there was a total order shipping but no cost for the single shipping method, use the total shipping for the order shipping line item
            $_shipping_methods[0][1] = $order_shipping;
        }
        foreach ($_shipping_methods as $_shipping_method) {
            // look up shipping method by id or title
            $shipping_method = isset($available_methods[$_shipping_method[0]]) ? $_shipping_method[0] : null;
            if (!$shipping_method) {
                // try by title
                foreach ($available_methods as $method) {
                    if (0 === strcasecmp($method->title, $_shipping_method[0])) {
                        $shipping_method = $method->id;
                        break;  // go with the first one we find
                    }
                }
            }
            if ($shipping_method) {
                //Known shipping method found
                $order_shipping_methods[] = array('method_id' => $shipping_method, 'cost' => $_shipping_method[1], 'title' => $available_methods[$shipping_method]->title);
            } elseif ($csv_export_file && $_shipping_method[0]) {
                //Order CSV Export format, shipping method title with no corresponding shipping method type found, so just use the title
                $order_shipping_methods[] = array('method_id' => '', 'cost' => $_shipping_method[1], 'title' => $_shipping_method[0]);
            } elseif ($_shipping_method[0]) {
                //shipping method but no title
                $order_shipping_methods[] = array('method_id' => $_shipping_method[0], 'cost' => $_shipping_method[1], 'title' => '');
            }
        }
        $order_items = array();
        if ($csv_export_file) {
            // standard format
            if (isset($item['line_item_1']) && !empty($item['line_item_1'])) {
                // one or more order items
                $i = 1;
                while (isset($item['line_item_' . $i]) && !empty($item['line_item_' . $i])) {
                //    $_item_meta = preg_split("~\\\\.(*SKIP)(*FAIL)|\|~s", $item['line_item_' . $i]);
                    $_item_meta = array();
                    if ($item['line_item_' . $i] && empty($_item_meta)) {
                        $_item_meta = explode('|', $item['line_item_' . $i]);
                    }
                    $name = array_shift($_item_meta);
                    $name = substr($name, strpos($name, ":") + 1);
                    $unknown_product_name = $name;
                    $product_identifier_by_id = array_shift($_item_meta);  //  product_id:id
                    $product_identifier_by_sku = array_shift($_item_meta); // sku
                    $qty = array_shift($_item_meta);
                    $qty = substr($qty, strpos($qty, ":") + 1);
                    $total = array_shift($_item_meta);
                    $total = substr($total, strpos($total, ":") + 1);
                    $sub_total = array_shift($_item_meta);
                    $sub_total = substr($sub_total, strpos($sub_total, ":") + 1);
                    $tax = array_shift($_item_meta);
                    $tax = substr($tax, strpos($tax, ":") + 1);
                    $tax_data = array_shift($_item_meta);
                    $tax_data = substr($tax_data, strpos($tax_data, ":") + 1);
                    // find by id
                    if (false !== strpos($product_identifier_by_id, 'product_id:')) {
                        // product by product_id
                        $product_id = substr($product_identifier_by_id, 11);

                        // not a product
                        if (!in_array(get_post_type($product_id), array('product', 'product_variation'))) {
                            $product_id = '';
                        }
                    }                  
                    if (!$product_id) {
                        // find by sku
                        $product_sku = substr($product_identifier_by_sku, strpos($product_identifier_by_sku, ":") + 1);
                        if ($product_sku)
                            $product_id = $wpdb->get_var($wpdb->prepare("SELECT post_id FROM $wpdb->postmeta WHERE meta_key='_sku' AND meta_value=%s LIMIT 1", $product_sku));
                        else
                            $product_id = '';
                    }
                    if (!$allow_unknown_products && !$product_id) {
                        // unknown product
                        $WF_CSV_Order_Import->hf_order_log_data_change('order-csv-import', sprintf(__('> > Skipped. Unknown order item: %s.', 'order-import-export-for-woocommerce'), $product_identifier));
                        $skipped++;
                        $i++;
                        continue;  // break outer loop
                    }
                    // get any additional item meta
                    $item_meta = array();
                    foreach ($_item_meta as $pair) {
                        // replace any escaped pipes
                        $pair = str_replace('\|', '|', $pair);
                        // find the first ':' and split into name-value
                        $split = strpos($pair, ':');
                        $name = substr($pair, 0, $split);
                        $value = substr($pair, $split + 1);
                        $item_meta[$name] = $value;
                    }
                    $order_items[] = array('product_id' => $product_id, 'qty' => $qty, 'total' => $total,'sub_total' => $sub_total,'tax' => $tax, 'tax_data' => $tax_data, 'meta' => $item_meta, 'unknown_product_name' => $unknown_product_name);
                    $i++;
                }
            }
        } else {
            //CSV Order Export format
            $sku = $item['item_sku'];
            $qty = $item['item_amount'];
            $total = $item['row_price'];
            if (!$sku || !$qty || !is_numeric($total)) {
                // invalid item
                $WF_CSV_Order_Import->hf_order_log_data_change('order-csv-import', sprintf(__('> > Row %d - %s - skipped. Missing SKU, quantity or total', 'order-import-export-for-woocommerce'), $row, $item['order_id']));
                $skipped++;
                unset($item);
                return; // break outer loop
            }
            // find by sku
            $product_id = $wpdb->get_var($wpdb->prepare("SELECT post_id FROM $wpdb->postmeta WHERE meta_key='_sku' AND meta_value=%s LIMIT 1", $sku));
            if (!$product_id) {
                // unknown product
                $WF_CSV_Order_Import->hf_order_log_data_change('order-csv-import', sprintf(__('> > Row %d - %s - skipped. Unknown order item: %s.', 'order-import-export-for-woocommerce'), $row, $item['order_id'], $sku));
                $skipped++;
                unset($item);
                return;  // break outer loop
            }
            $order_items[] = array('product_id' => $product_id, 'qty' => $qty, 'total' => $total);
        }
        
        // standard format
        $coupon_item = array();

        if(isset($item['coupon_items']) && !empty($item['coupon_items'])){
            $coupon_item = explode(';', $item['coupon_items']);
        }
        
        //added since refund not importing 
        $refund_item = array();
        if(isset($item['refund_items']) && !empty($item['refund_items'])){
            $refund_item = explode(';', $item['refund_items']);
        }
        
        $tax_items = array();
        // standard tax item format which supports multiple tax items in numbered columns containing a pipe-delimated, colon-labeled format
        if (isset($item['tax_items']) && !empty($item['tax_items'])) {
            // one or more order tax items
            // get the first tax item
            $tax_item = explode(';', $item['tax_items']);
//            $tax_amount_sum = $shipping_tax_amount_sum = 0;
            foreach ($tax_item as $tax) {
                $tax_item_data = array();
                // turn "label: Tax | tax_amount: 10" into an associative array
                foreach (explode('|', $tax) as $piece) {
                    list( $name, $value ) = explode(':', $piece);
                    $tax_item_data[trim($name)] = trim($value);
                }
                // default rate id to 0 if not set
                if (!isset($tax_item_data['rate_id'])) {
                    $tax_item_data['rate_id'] = 0;
                }
                // have a tax amount or shipping tax amount
                if (isset($tax_item_data['total']) || isset($tax_item_data['shipping_tax_amount'])) {
                    // try and look up rate id by label if needed
                    if (isset($tax_item_data['label']) && $tax_item_data['label'] && !$tax_item_data['rate_id']) {
                        foreach ($tax_rates as $tax_rate) {
                            if (0 === strcasecmp($tax_rate->tax_rate_name, $tax_item_data['label'])) {
                                // found the tax by label
                                $tax_item_data['rate_id'] = $tax_rate->tax_rate_id;
                                break;
                            }
                        }
                    }
                    // check for a rate being specified which does not exist, and clear it out (technically an error?)
                    if ($tax_item_data['rate_id'] && !isset($tax_rates[$tax_item_data['rate_id']])) {
                        $tax_item_data['rate_id'] = 0;
                    }
                    // default label of 'Tax' if not provided
                    if (!isset($tax_item_data['label']) || !$tax_item_data['label']) {
                        $tax_item_data['label'] = 'Tax';
                    }
                    // default tax amounts to 0 if not set
                    if (!isset($tax_item_data['total'])) {
                        $tax_item_data['total'] = 0;
                    }
                    if (!isset($tax_item_data['shipping_tax_amount'])) {
                        $tax_item_data['shipping_tax_amount'] = 0;
                    }
                    // handle compound flag by using the defined tax rate value (if any)
                    if (!isset($tax_item_data['tax_rate_compound'])) {
                        $tax_item_data['tax_rate_compound'] = '';
                        if ($tax_item_data['rate_id']) {
                            $tax_item_data['tax_rate_compound'] = $tax_rates[$tax_item_data['rate_id']]->tax_rate_compound;
                        }
                    }
                    $tax_items[] = array(
                        'title' => $tax_item_data['code'],
                        'rate_id' => $tax_item_data['rate_id'],
                        'label' => $tax_item_data['label'],
                        'compound' => $tax_item_data['tax_rate_compound'],
                        'tax_amount' => $tax_item_data['total'],
                        'shipping_tax_amount' => $tax_item_data['shipping_tax_amount'],
                    );
                }
            }
        }
        // add the order tax totals to the order meta
        $postmeta[] = array('key' => '_order_tax', 'value' => number_format((float) $order_tax, 2, '.', ''));
        $postmeta[] = array('key' => '_order_shipping_tax', 'value' => number_format((float) $order_shipping_tax, 2, '.', ''));
        
        // fee items
        $fee_items = $fee_line_items = array();
        if (isset($item['fee_items']) && !empty($item['fee_items'])) {
            $fee_line_items = explode(';', $item['fee_items']);

            $fee_item_data = array();
            foreach ($fee_line_items as $fee_line_item) {
                foreach (explode('|', $fee_line_item) as $piece) {
                    list( $name, $value ) = explode(':', $piece);
                    $fee_item_data[trim($name)] = trim($value);
                }

                if (!isset($fee_item_data['name'])) {
                    $fee_item_data['name'] = 'fee';
                }

                if (!isset($fee_item_data['total'])) {
                    $fee_item_data['total'] = 0;
                }
                if (!isset($fee_item_data['tax'])) {
                    $fee_item_data['tax'] = 0;
                }

                $fee_items[] = array(
                    'name' => $fee_item_data['name'],
                    'total' => $fee_item_data['total'],
                    'tax' => $fee_item_data['tax'],
                );
            }
        }
        
        if ($order) {
            $order['postmeta'] = $postmeta;
            $order['order_items'] = $order_items;
            $order['coupon_items'] = $coupon_item;
            $order['refund_items'] = $refund_item;
            $order['order_shipping'] = $order_shipping_methods;
            $order['tax_items'] = $tax_items;
            $order['fee_items'] = $fee_items;
            // the order array will now contain the necessary name-value pairs for the wp_posts table, and also any meta data in the 'postmeta' array
            $results[] = $order;
        }
        // Result
        return array(
            $this->post_type => $results,
            'skipped' => $skipped,
        );
    }

    private function wc_get_order_statuses_neat() {
        $order_statuses = array();
        foreach (wc_get_order_statuses() as $slug => $name) {
            $order_statuses[preg_replace('/^wc-/', '', $slug)] = $name;
        }
        return $order_statuses;
    }
}
