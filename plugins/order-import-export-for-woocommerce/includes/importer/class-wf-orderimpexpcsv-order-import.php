<?php
/**
 * WordPress Importer class for managing the import process of a CSV file
 *
 * @package WordPress
 * @subpackage Importer
 */
if (!class_exists('WP_Importer'))
    return;

class WF_OrderImpExpCsv_Order_Import extends WP_Importer {

    var $id;
    var $file_url;
    var $delimiter;
    var $merge_empty_cells;
    // mappings from old information to new
    var $processed_terms = array();
    var $processed_posts = array();
    var $merged = 0;
    var $skipped = 0;
    var $imported = 0;
    var $errored = 0;
    // Results
    var $import_results = array();

    /**
     * Constructor
     */
    public function __construct() {
        if (WC()->version < '2.7.0') {
            $this->log = new WC_Logger();
        } else {
            $this->log = wc_get_logger();
        }
        $this->import_page = 'woocommerce_wf_order_csv';
        $this->file_url_import_enabled = apply_filters('woocommerce_csv_product_file_url_import_enabled', true);
    }

    /**
     * Registered callback function for the WordPress Importer
     *
     * Manages the three separate stages of the CSV import process
     */
    public function dispatch() {
        global $woocommerce, $wpdb;

        if (!empty($_POST['delimiter'])) {
            $this->delimiter = stripslashes(trim($_POST['delimiter']));
        } else if (!empty($_GET['delimiter'])) {
            $this->delimiter = stripslashes(trim($_GET['delimiter']));
        }

        if (!$this->delimiter)
            $this->delimiter = ',';

        if (!empty($_POST['merge_empty_cells']) || !empty($_GET['merge_empty_cells'])) {
            $this->merge_empty_cells = 1;
        } else {
            $this->merge_empty_cells = 0;
        }

        $step = empty($_GET['step']) ? 0 : (int) $_GET['step'];

        switch ($step) {
            case 0 :
                $this->header();
                $this->greet();
                break;
            case 1 :
                $this->header();

                check_admin_referer('import-upload');

                if (!empty($_GET['file_url']))
                    $this->file_url = esc_attr($_GET['file_url']);
                if (!empty($_GET['file_id']))
                    $this->id = $_GET['file_id'];

                if (!empty($_GET['clearmapping']) || $this->handle_upload())
                    $this->import_options();
                else
                    _e('Error with handle_upload!', 'order-import-export-for-woocommerce');
                break;
            case 2 :
                $this->header();

                check_admin_referer('import-woocommerce');

                $this->id = (int) $_POST['import_id'];

                if ($this->file_url_import_enabled)
                    $this->file_url = esc_attr($_POST['import_url']);

                if ($this->id)
                    $file = get_attached_file($this->id);
                else if ($this->file_url_import_enabled)
                    $file = ABSPATH . $this->file_url;

                $file = str_replace("\\", "/", $file);

                if ($file) {
                    ?>
                    <table id="import-progress" class="widefat_importer widefat">
                        <thead>
                            <tr>
                                <th class="status">&nbsp;</th>
                                <th class="row"><?php _e('Row', 'order-import-export-for-woocommerce'); ?></th>
                                <th><?php _e('OrderID', 'order-import-export-for-woocommerce'); ?></th>
                                <th><?php _e('Order Status', 'order-import-export-for-woocommerce'); ?></th>
                                <th class="reason"><?php _e('Status Msg', 'order-import-export-for-woocommerce'); ?></th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr class="importer-loading">
                                <td colspan="5"></td>
                            </tr>
                        </tfoot>
                        <tbody></tbody>
                    </table>
                    <script type="text/javascript">
                        jQuery(document).ready(function($) {
                            if (! window.console) { window.console = function(){}; }
                            var processed_terms = [];
                            var processed_posts = [];
                            var i = 1;
                            var done_count = 0;
                            function import_rows(start_pos, end_pos) {
                                var data = {
                                    action:     'woocommerce_csv_order_import_request',
                                    file:       '<?php echo addslashes($file); ?>',
                                    delimiter:  '<?php echo $this->delimiter; ?>',
                                    merge_empty_cells: '<?php echo $this->merge_empty_cells; ?>',
                                    start_pos:  start_pos,
                                    end_pos:    end_pos,
                                };
                                return $.ajax({
                                    url:        '<?php echo add_query_arg(array('import_page' => $this->import_page, 'step' => '3', 'merge' => !empty($_GET['merge']) ? '1' : '0'), admin_url('admin-ajax.php')); ?>',
                                    data:       data,
                                    type:       'POST',
                                    success:    function(response) {
                                        if (response) {
                                            try {
                                                // Get the valid JSON only from the returned string
                                                if (response.indexOf("<!--WC_START-->") >= 0)
                                                    response = response.split("<!--WC_START-->")[1]; // Strip off before after WC_START
                                                if (response.indexOf("<!--WC_END-->") >= 0)
                                                    response = response.split("<!--WC_END-->")[0]; // Strip off anything after WC_END
                                                // Parse
                                                var results = $.parseJSON(response);
                                                if (results.error) {
                                                    $('#import-progress tbody').append('<tr id="row-' + i + '" class="error"><td class="status" colspan="5">' + results.error + '</td></tr>');
                                                    i++;
                                                } else if (results.import_results && $(results.import_results).size() > 0) {
                                                    $.each(results.processed_terms, function(index, value) {
                                                        processed_terms.push(value);
                                                    });
                                                    $.each(results.processed_posts, function(index, value) {
                                                        processed_posts.push(value);
                                                    });
                                                    $(results.import_results).each(function(index, row) {
                                                        $('#import-progress tbody').append('<tr id="row-' + i + '" class="' + row['status'] + '"><td><mark class="result" title="' + row['status'] + '">' + row['status'] + '</mark></td><td class="row">' + i + '</td><td>' + row['order_number'] + '</td><td>' + row['post_id'] + ' - ' + row['post_title'] + '</td><td class="reason">' + row['reason'] + '</td></tr>');
                                                        i++;
                                                    });
                                                }
                                            } catch (err) {}
                                        } else {
                                            $('#import-progress tbody').append('<tr class="error"><td class="status" colspan="5">' +  '<?php _e('AJAX Error', 'order-import-export-for-woocommerce'); ?>' + '</td></tr>');
                                        }
                                        var w = $(window);
                                        var row = $("#row-" + (i - 1));
                                        if (row.length) {
                                            w.scrollTop(row.offset().top - (w.height() / 2));
                                        }
                                        done_count++;
                                        $('body').trigger('woocommerce_csv_order_import_request_complete');
                                    }
                                });
                            }
                            var rows = [];
                            <?php
                            $limit = apply_filters('woocommerce_csv_import_limit_per_request', 10);
                            $enc = mb_detect_encoding($file, 'UTF-8, ISO-8859-1', true);
                            if ($enc)
                                setlocale(LC_ALL, 'en_US.' . $enc);
                            @ini_set('auto_detect_line_endings', true);
                            $count = 0;
                            $previous_position = 0;
                            $position = 0;
                            $import_count = 0;
                            // Get CSV positions
                            if (( $handle = fopen($file, "r") ) !== FALSE) {
                                while (( $postmeta = fgetcsv($handle, 0, $this->delimiter) ) !== FALSE) {
                                    $count++;
                                    if ($count >= $limit) {
                                        $previous_position = $position;
                                        $position = ftell($handle);
                                        $count = 0;
                                        $import_count ++;
                                        // Import rows between $previous_position $position
                                        ?>rows.push( [ <?php echo $previous_position; ?>, <?php echo $position; ?> ] ); <?php
                                    }
                                }
                                // Remainder
                                if ($count > 0) {
                                    ?>rows.push( [ <?php echo $position; ?>, '' ] ); <?php
                                    $import_count ++;
                                }
                                fclose($handle);
                            }
                            ?>
                            var data = rows.shift();
                            var regen_count = 0;
                            import_rows( data[0], data[1] );
                            $('body').on( 'woocommerce_csv_order_import_request_complete', function() {
                                if ( done_count == <?php echo $import_count; ?> ) {
                                    import_done();
                                } else {
                                    // Call next request
                                    data = rows.shift();
                                    import_rows( data[0], data[1] );
                                }
                            } );
                            function import_done() {
                                var data = {
                                    action: 'woocommerce_csv_order_import_request',
                                    file: '<?php echo $file; ?>',
                                    processed_terms: processed_terms,
                                    processed_posts: processed_posts,
                                };
                                $.ajax({
                                    url: '<?php echo add_query_arg(array('import_page' => $this->import_page, 'step' => '4', 'merge' => !empty($_GET['merge']) ? 1 : 0), admin_url('admin-ajax.php')); ?>',
                                    data:       data,
                                    type:       'POST',
                                    success:    function( response ) {
                                        $('#import-progress tbody').append( '<tr class="complete"><td colspan="5">' + response + '</td></tr>' );
                                        $('.importer-loading').hide();
                                    }
                                });
                            }
                        });
                    </script>
                    <?php
                } else {
                    echo '<p class="error">' . __('Error finding uploaded file!', 'order-import-export-for-woocommerce') . '</p>';
                }
                break;
            case 3 :
                // Check access - cannot use nonce here as it will expire after multiple requests
                if (!current_user_can('manage_woocommerce'))
                    die();
                add_filter('http_request_timeout', array($this, 'bump_request_timeout'));
                if (function_exists('gc_enable'))
                    gc_enable();
                @set_time_limit(0);
                @ob_flush();
                @flush();
                $wpdb->hide_errors();
                $file = stripslashes($_POST['file']);
                $start_pos = isset($_POST['start_pos']) ? absint($_POST['start_pos']) : 0;
                $end_pos = isset($_POST['end_pos']) ? absint($_POST['end_pos']) : '';
                $position = $this->import_start($file, $start_pos, $end_pos);
                $this->import();
                $this->import_end();
                $results = array();
                $results['import_results'] = $this->import_results;
                $results['processed_terms'] = $this->processed_terms;
                $results['processed_posts'] = $this->processed_posts;
                echo "<!--WC_START-->";
                echo json_encode($results);
                echo "<!--WC_END-->";
                exit;
                break;
            case 4 :
                // Check access - cannot use nonce here as it will expire after multiple requests
                if (!current_user_can('manage_woocommerce'))
                    die();
                add_filter('http_request_timeout', array($this, 'bump_request_timeout'));
                if (function_exists('gc_enable'))
                    gc_enable();
                @set_time_limit(0);
                @ob_flush();
                @flush();
                $wpdb->hide_errors();
                $this->processed_terms = isset($_POST['processed_terms']) ? $_POST['processed_terms'] : array();
                $this->processed_posts = isset($_POST['processed_posts']) ? $_POST['processed_posts'] : array();

                _e('Step 1...', 'order-import-export-for-woocommerce') . ' ';

                wp_defer_term_counting(true);
                wp_defer_comment_counting(true);

                _e('Step 2...', 'order-import-export-for-woocommerce') . ' ';

                echo 'Step 3...' . ' '; // Easter egg

                _e('Finalizing...', 'order-import-export-for-woocommerce') . ' ';

                // SUCCESS
                _e('Finished. Import complete.', 'order-import-export-for-woocommerce');

                $this->import_end();
                exit;
                break;
        }
        $this->footer();
    }

    /**
     * format_data_from_csv
     */
    public function format_data_from_csv($data, $enc) {
        return ( $enc == 'UTF-8' ) ? $data : utf8_encode($data);
    }

    /**
     * Display pre-import options
     */
    public function import_options() {
        $j = 0;
        if ($this->id)
            $file = get_attached_file($this->id);
        else if ($this->file_url_import_enabled)
            $file = ABSPATH . $this->file_url;
        else
            return;
        // Set locale
        $enc = mb_detect_encoding($file, 'UTF-8, ISO-8859-1', true);
        if ($enc)
            setlocale(LC_ALL, 'en_US.' . $enc);
        @ini_set('auto_detect_line_endings', true);
        // Get headers
        if (( $handle = fopen($file, "r") ) !== FALSE) {
            $row = $raw_headers = array();
            $header = fgetcsv($handle, 0, $this->delimiter);
            while (( $postmeta = fgetcsv($handle, 0, $this->delimiter) ) !== FALSE) {
                foreach ($header as $key => $heading) {
                    if (!$heading)
                        continue;
                    $s_heading = $heading;
                    $row[$s_heading] = ( isset($postmeta[$key]) ) ? $this->format_data_from_csv($postmeta[$key], $enc) : '';
                    $raw_headers[$s_heading] = $heading;
                }
                break;
            }
            fclose($handle);
        }
        $merge = (!empty($_GET['merge']) && $_GET['merge']) ? 1 : 0;
        include( 'views/html-wf-import-options.php' );
    }

    /**
     * The main controller for the actual import stage.
     */
    public function import() {
        global $woocommerce, $wpdb;
        wp_suspend_cache_invalidation(true);
        $this->hf_order_log_data_change('order-csv-import', '---');
        $this->hf_order_log_data_change('order-csv-import', __('Processing orders.', 'order-import-export-for-woocommerce'));
        $merging = 1;
        $record_offset = 0;
        foreach ($this->parsed_data as $key => &$item) {
            $order = $this->parser->parse_orders($item, $this->raw_headers, $merging, $record_offset);            
            if (empty($order)) {
                $this->add_import_result('skipped', __('Order Skipped, please check the log file', 'order-import-export-for-woocommerce'));
                unset($item, $order);
                continue;
            }            
            if (!is_wp_error($order))
                $this->process_orders($order['shop_order'][0]);
            else
                $this->add_import_result('failed', $order->get_error_message(), 'Not parsed', json_encode($item), '-');
            unset($item, $order);
        }
        $this->hf_order_log_data_change('order-csv-import', __('Finished processing Orders.', 'order-import-export-for-woocommerce'));
        wp_suspend_cache_invalidation(false);
    }

    /**
     * Parses the CSV file and prepares us for the task of processing parsed data
     * @param string $file Path to the CSV file for importing
     */
    public function import_start($file, $start_pos, $end_pos) {
        $memory = size_format((WC()->version < '2.7.0') ? woocommerce_let_to_num(ini_get('memory_limit')) : wc_let_to_num(ini_get('memory_limit')));
        $wp_memory = size_format((WC()->version < '2.7.0') ? woocommerce_let_to_num(WP_MEMORY_LIMIT) : wc_let_to_num(WP_MEMORY_LIMIT));
        $this->hf_order_log_data_change('order-csv-import', '---[ New Import ] PHP Memory: ' . $memory . ', WP Memory: ' . $wp_memory);
        $this->hf_order_log_data_change('order-csv-import', __('Parsing products CSV.', 'order-import-export-for-woocommerce'));
        $this->parser = new WF_CSV_Parser('shop_order');
        list( $this->parsed_data, $this->raw_headers, $position ) = $this->parser->parse_data($file, $this->delimiter, $start_pos, $end_pos);
        $this->hf_order_log_data_change('order-csv-import', __('Finished parsing products CSV.', 'order-import-export-for-woocommerce'));
        unset($import_data);
        wp_defer_term_counting(true);
        wp_defer_comment_counting(true);
        return $position;
    }

    /**
     * Performs post-import cleanup of files and the cache
     */
    public function import_end() {
        //wp_cache_flush(); Stops output in some hosting environments
        foreach (get_taxonomies() as $tax) {
            delete_option("{$tax}_children");
            _get_term_hierarchy($tax);
        }
        wp_defer_term_counting(false);
        wp_defer_comment_counting(false);
        do_action('import_end');
    }

    /**
     * Handles the CSV upload and initial parsing of the file to prepare for
     * displaying author import options
     * @return bool False if error uploading or invalid file, true otherwise
     */
    public function handle_upload() {
        if (empty($_POST['file_url'])) {
            $file = wp_import_handle_upload();
            if (isset($file['error'])) {
                echo '<p><strong>' . __('Sorry, there has been an error.', 'order-import-export-for-woocommerce') . '</strong><br />';
                echo esc_html($file['error']) . '</p>';
                return false;
            }
            $this->id = (int) $file['id'];
            return true;
        } else {
            if (file_exists(ABSPATH . $_POST['file_url'])) {
                $this->file_url = esc_attr($_POST['file_url']);
                return true;
            } else {
                echo '<p><strong>' . __('Sorry, there has been an error.', 'order-import-export-for-woocommerce') . '</strong></p>';
                return false;
            }
        }
        return false;
    }

    public function order_exists($orderID) {
        global $wpdb;
        $query = "SELECT ID FROM $wpdb->posts WHERE post_type = 'shop_order' AND post_status IN ( 'wc-pending', 'wc-processing', 'wc-completed', 'wc-on-hold', 'wc-failed' , 'wc-refunded', 'wc-cancelled')";
        $args = array();
        $posts_are_exist = @$wpdb->get_col($wpdb->prepare($query, $args));

        if ($posts_are_exist) {
            foreach ($posts_are_exist as $exist_id) {
                $found = false;
                if ($exist_id == $orderID) {
                    $found = TRUE;
                }
                if ($found)
                    return TRUE;
            }
        } else {
            return FALSE;
        }
    }

    /**
     * Create new posts based on import information
     */
    private function process_orders($post) {
        global $wpdb;
        $this->imported = $this->merged = 0;
        $merging = (!empty($_GET['merge'])) ? 1 : 0;

        // plan a dry run
        //$dry_run = isset( $_POST['dry_run'] ) && $_POST['dry_run'] ? true : false;
        $dry_run = FALSE;

        $this->hf_order_log_data_change('order-csv-import', '---');
        $this->hf_order_log_data_change('order-csv-import', __('Processing orders.', 'order-import-export-for-woocommerce'));

        // check class-wc-checkout.php for reference
        $order_data = array(
            'import_id' => $post['order_id'], //Suggest import to keep the given ID
            'post_type' => 'shop_order',
            'ping_status' => 'closed',
            'post_author' => 1,
            'post_password' => uniqid('order_'), // Protects the post just in case
        );
        if(!empty($post['date'])){
            $order_data['post_date'] = date('Y-m-d H:i:s', $post['date']);
            $order_data['post_date_gmt'] = date('Y-m-d H:i:s', $post['date']);
            $order_data['post_title'] = 'Order &ndash; ' . date('F j, Y @ h:i A', $post['date']);
        }
        if(!empty($post['status'])){
            $order_data['post_status'] = 'wc-' . preg_replace('/^wc-/', '', $post['status']);
        }
        if(!empty($post['order_comments'])){
            $order_data['post_excerpt'] = $post['order_comments'];
        }
        
        if (!$dry_run) {
            // track whether download permissions need to be granted
            $add_download_permissions = false;

            // Check if post exists when importing
            $new_added = false;
            $order_id = $post['order_id'];
            $is_order_exist = $this->order_exists($order_id);
            $meta_array = array();
            if (!empty($post['postmeta'])) {
                foreach ($post['postmeta'] as $meta) {
                    $meta_array[$meta['key']] = $meta['value'];
                }
            }
            $user_id = $this->hf_check_customer($meta_array);
            if (is_wp_error($user_id)) {
                $this->hf_order_log_data_change('order-csv-import', __($user_id->get_error_message(), 'order-import-export-for-woocommerce'));
                $this->add_import_result('skipped', __($user_id->get_error_message(), 'order-import-export-for-woocommerce'), $post['order_number'], $post['order_number'], $post['order_number']);
                $skipped++;
                unset($post);
                return;
            } elseif (empty($user_id)) {
                $user_id = 0;
            }
            if ($order_id && is_string(get_post_status($order_id)) && (get_post_type($order_id) !== 'shop_order' )){
                $usr_msg = 'Importing order(ID) conflicts with an existing post.';
                $this->add_import_result('skipped', __($usr_msg, 'order-import-export-for-woocommerce'), $order_id, get_the_title($order_id));
                $this->hf_order_log_data_change('order-csv-import', __('> &#8220;%s&#8221;' . $usr_msg, 'order-import-export-for-woocommerce'), esc_html($order_id), true);
                unset($post);
                return;
            }
            if (!$merging && $is_order_exist) {
                $usr_msg = 'Order with same ID already exists.';
                $this->add_import_result('skipped', __($usr_msg, 'order-import-export-for-woocommerce'), $order_id, isset($order_data['post_title']) ? $order_data['post_title'] : '', $order_id);
                $this->hf_order_log_data_change('order-csv-import', sprintf(__('> &#8220;%s&#8221;' . $usr_msg, 'order-import-export-for-woocommerce'), esc_html(isset($order_data['post_title']) ? $order_data['post_title'] : '')), true);
                unset($post);
                return;
            } elseif (!$is_order_exist && !isset($order_data['post_status'])) {
                $usr_msg = 'Cannot insert order without order status.';
                $this->add_import_result('skipped', __($usr_msg, 'order-import-export-for-woocommerce'), $order_id, isset($order_data['post_title']) ? $order_data['post_title'] : '', $order_id);
                $this->hf_order_log_data_change('order-csv-import', sprintf(__('> &#8220;%s&#8221;' . $usr_msg, 'order-import-export-for-woocommerce'), esc_html(isset($order_data['post_title']) ? $order_data['post_title'] : '')), true);
                unset($post);
                return;
            } else {
                if ($is_order_exist) {
                    $order_data['ID'] = $order_id;
                    $wp_result = wp_update_post($order_data);
                } else {
                    $order_id = wp_insert_post($order_data);
                    $new_added = true;
                    if (is_wp_error($order_id)) {
                        $this->errored++;
                        $new_added = false;
                        //$this->add_import_result('failed', __($order_id->get_error_message() , 'order-import-export-for-woocommerce'), $post['order_number'], $order_data['post_title'], $post['order_number']);
                        $this->hf_order_log_data_change('order-csv-import', sprintf(__('> Error inserting %s: %s', 'order-import-export-for-woocommerce'), $post['order_number'], $order_id->get_error_message()), true);
                    }
                }
            }
            // empty update to bump up the post_modified date to today's date (otherwise it would match the post_date, which isn't quite right)
            //wp_update_post( array( 'ID' => $order_id ) );
            // handle special meta fields
            $order_currency = (isset($post['order_currency']) && $post['order_currency']) ? $post['order_currency'] : get_woocommerce_currency();
            update_post_meta($order_id, '_order_key', apply_filters('woocommerce_generate_order_key', uniqid('order_')));
            update_post_meta($order_id, '_order_currency', $order_currency);
            update_post_meta($order_id, '_prices_include_tax', get_option('woocommerce_prices_include_tax'));
            update_post_meta($order_id, '_order_number', $post['order_number']);
            // add order postmeta
            foreach ($post['postmeta'] as $meta) {
                $meta_processed = false;
                // we don't set the "download permissions granted" meta, we call the woocommerce function to take care of this for us
                if (( 'Download Permissions Granted' == $meta['key'] || '_download_permissions_granted' == $meta['key'] ) && $meta['value']) {
                    $add_download_permissions = true;
                    $meta_processed = true;
                }
                if (( '_customer_user' == $meta['key'])) {
                    update_post_meta($order_id, $meta['key'], $user_id);
                    $meta_processed = true;
                }
                if (!$meta_processed) {
                    update_post_meta($order_id, $meta['key'], $meta['value']);
                }
                // set the paying customer flag on the user meta if applicable
                if ('_customer_id' == $meta['key'] && $user_id && in_array($post['status'], array('processing', 'completed', 'refunded'))) {
                    update_user_meta($user_id, "paying_customer", 1);
                }
            }

            // handle order items
            $order_items = array();
            $order_item_meta = null;
            if ($merging && $is_order_exist && !empty($post['order_items'])) {
                $wpdb->query($wpdb->prepare("DELETE items,itemmeta FROM {$wpdb->prefix}woocommerce_order_itemmeta itemmeta INNER JOIN {$wpdb->prefix}woocommerce_order_items items ON itemmeta.order_item_id = items.order_item_id WHERE items.order_id = %d and items.order_item_type = 'line_item'", $order_id));
            }
            if ($merging && $is_order_exist && !empty($post['order_shipping'])) {
                $wpdb->query($wpdb->prepare("DELETE items,itemmeta FROM {$wpdb->prefix}woocommerce_order_itemmeta itemmeta INNER JOIN {$wpdb->prefix}woocommerce_order_items items ON itemmeta.order_item_id = items.order_item_id WHERE items.order_id = %d and items.order_item_type = 'shipping'", $order_id));
            }
            $order = wc_get_order($order_id);

            foreach ($post['order_items'] as $item) {
                $product = null;
                $variation_item_meta = array();
                if ($item['product_id']) {
                    $product = wc_get_product($item['product_id']);
                    // handle variations
                    if ($product && ( $product->is_type('variable') || $product->is_type('variation') || $product->is_type('subscription_variation') ) && method_exists($product, 'get_variation_id')) {
                        foreach ($product->get_variation_attributes() as $key => $value) {
                            $variation_item_meta[] = array('meta_name' => esc_attr(substr($key, 10)), 'meta_value' => $value);  // remove the leading 'attribute_' from the name to get 'pa_color' for instance
                        }
                    }
                }

                // order item
                $order_items[] = array(
                    'order_item_name' => $product ? $product->get_title() : (!empty($item['unknown_product_name']) ? $item['unknown_product_name'] : __('Unknown Product', 'order-import-export-for-woocommerce')),
                    'order_item_type' => 'line_item',
                );

                $var_id = 0;
                if ($product) {
                    if (WC()->version < '2.7.0' && method_exists($product, 'get_variation_id')) {
                        $var_id = $product->get_variation_id();
                    } else {
                        $var_id = $product->get_id();
                    }
                }
                // standard order item meta
                $_order_item_meta = array(
                    '_qty' => (int) $item['qty'],
                    '_tax_class' => '', // Tax class (adjusted by filters)
                    '_product_id' => $item['product_id'],
                    '_variation_id' => $var_id,
                    '_line_subtotal' => number_format((float) $item['sub_total'], 2, '.', ''), // Line subtotal (before discounts)
                    '_line_subtotal_tax' => number_format((float) $item['tax'], 2, '.', ''), // Line tax (before discounts)
                    '_line_total' => number_format((float) $item['total'], 2, '.', ''), // Line total (after discounts)
                    '_line_tax' => number_format((float) $item['tax'], 2, '.', ''), // Line Tax (after discounts)
                    '_line_tax_data' => $item['tax_data'],
                );
                // add any product variation meta
                foreach ($variation_item_meta as $meta) {
                    $_order_item_meta[$meta['meta_name']] = $meta['meta_value'];
                }
                // include any arbitrary order item meta
                $_order_item_meta = array_merge($_order_item_meta, $item['meta']);
                $order_item_meta[] = $_order_item_meta;
            }

            foreach ($order_items as $key => $order_item) {
                $order_item_id = wc_add_order_item($order_id, $order_item);
                if ($order_item_id) {
                    foreach ($order_item_meta[$key] as $meta_key => $meta_value) {
                        wc_add_order_item_meta($order_item_id, $meta_key, $meta_value);
                    }
                }
            }

            // create the shipping order items
            foreach ($post['order_shipping'] as $order_shipping) {
                $shipping_order_item = array(
                    'order_item_name' => ($order_shipping['title']) ? $order_shipping['title'] : $order_shipping['method_id'],
                    'order_item_type' => 'shipping',
                );
                $shipping_order_item_id = wc_add_order_item($order_id, $shipping_order_item);
                if ($shipping_order_item_id) {
                    wc_add_order_item_meta($shipping_order_item_id, 'method_id', $order_shipping['method_id']);
                    wc_add_order_item_meta($shipping_order_item_id, 'cost', $order_shipping['cost']);
                }
            }
            
            // create the fee order items
            if (!empty($post['fee_items'])) {
                if ($merging && $is_order_exist) {
                    $fee_str = 'fee';
                    $wpdb->query($wpdb->prepare("DELETE items,itemmeta FROM {$wpdb->prefix}woocommerce_order_itemmeta itemmeta INNER JOIN {$wpdb->prefix}woocommerce_order_items items WHERE itemmeta.order_item_id = items.order_item_id and items.order_id = %d and items.order_item_type = %s", $order_id, $fee_str));
                }
                foreach ($post['fee_items'] as $key => $fee_item) {
                    $fee_order_item = array(
                        'order_item_name' => $fee_item['name'],
                        'order_item_type' => "fee"
                    );
                    $fee_order_item_id = wc_add_order_item($order_id, $fee_order_item);
                    if ($fee_order_item_id) {
                        wc_add_order_item_meta($fee_order_item_id, '_line_tax', $fee_item['tax']);
                        wc_add_order_item_meta($fee_order_item_id, '_line_total', $fee_item['total']);
                    }
                }
            }
          
            // create the tax order items
            if(!empty($post['tax_items'])){
                if ($merging && $is_order_exist) {
                    $tax_str = 'tax';
                    $wpdb->query($wpdb->prepare("DELETE items,itemmeta FROM {$wpdb->prefix}woocommerce_order_itemmeta itemmeta INNER JOIN {$wpdb->prefix}woocommerce_order_items items WHERE itemmeta.order_item_id = items.order_item_id and items.order_id = %d and items.order_item_type = %s", $order_id, $tax_str));
                }
                foreach ($post['tax_items'] as $tax_item) {
                    $tax_order_item = array(
                        'order_item_name' => $tax_item['title'],
                        'order_item_type' => 'tax',
                    );

                    $tax_order_item_id = wc_add_order_item($order_id, $tax_order_item);

                    if ($tax_order_item_id) {
                        wc_add_order_item_meta($tax_order_item_id, 'rate_id', $tax_item['rate_id']);
                        wc_add_order_item_meta($tax_order_item_id, 'label', $tax_item['label']);
                        wc_add_order_item_meta($tax_order_item_id, 'compound', $tax_item['compound']);
                        wc_add_order_item_meta($tax_order_item_id, 'tax_amount', $tax_item['tax_amount']);
                        wc_add_order_item_meta($tax_order_item_id, 'shipping_tax_amount', $tax_item['shipping_tax_amount']);
                    }
                }
            }
            
            //importing coupon items
            if (!empty($post['coupon_items'])) {
                if ($merging && $is_order_exist) {
                    $applied_coupons = $order->get_used_coupons();
                    if (!empty($applied_coupons)) {
                        foreach ($applied_coupons as $coupon) {
                            $order->remove_coupon($coupon);
                        }
                    }
                }
                $coupon_item = array();
                foreach ($post['coupon_items'] as $coupon) {
                    $_citem_meta = explode('|', $coupon);
                    $coupon_code = array_shift($_citem_meta);
                    $coupon_code = substr($coupon_code, strpos($coupon_code, ":") + 1);
                    $discount_amount = array_shift($_citem_meta);
                    $discount_amount = substr($discount_amount, strpos($discount_amount, ":") + 1);
                    $id = wc_get_coupon_id_by_code($coupon_code);
                    if ($id && $merging && $is_order_exist) {
                        $order->apply_coupon($coupon_code);
                    } else {
                        $coupon_item['order_item_name'] = $coupon_code;
                        $coupon_item['order_item_type'] = 'coupon';
                        $order_item_id = wc_add_order_item($order_id, $coupon_item);
                        wc_add_order_item_meta($order_item_id, 'discount_amount', $discount_amount);
                    }
                }
            }
            
            // importing refund items
            if (!empty($post['refund_items'])) {
                if ($merging && $is_order_exist) {
                    $refund = 'shop_order_refund';
                    $wpdb->query($wpdb->prepare("DELETE po,pm FROM $wpdb->posts AS po INNER JOIN $wpdb->postmeta AS pm ON po.ID = pm.post_id WHERE post_parent = %d and post_type = %s", $order_id, $refund));
                }
                foreach ($post['refund_items'] as $refund) {
                    $single_refund = explode('|', $refund);
                    $amount = array_shift($single_refund);
                    $amount = substr($amount, strpos($amount, ":") + 1);
                    $reason = array_shift($single_refund);
                    $reason = substr($reason, strpos($reason, ":") + 1);
                    $date = array_shift($single_refund);
                    $date = substr($date, strpos($date, ":") + 1);

                    $args = array(
                        'amount' => $amount,
                        'reason' => $reason,
                        'date_created' => $date,
                        'order_id' => $order_id,
                    );
                    remove_all_actions('woocommerce_order_status_refunded_notification');
                    remove_all_actions('woocommerce_order_partially_refunded_notification');
                    remove_action('woocommerce_order_status_refunded', array('WC_Emails', 'send_transactional_email'));
                    remove_action('woocommerce_order_partially_refunded', array('WC_Emails', 'send_transactional_email'));
                    remove_action('woocommerce_order_fully_refunded', array('WC_Emails', 'send_transactional_email'));
                    wc_create_refund($args);
                }
            }
            
            // Grant downloadalbe product permissions
            if ($add_download_permissions) {
                wc_downloadable_product_permissions($order_id);
            }

            // add order notes
            if(!empty($post['notes'])){
                add_filter('woocommerce_email_enabled_customer_note', '__return_false');
                if ($merging && $is_order_exist) {
                    $wpdb->query($wpdb->prepare("DELETE comments,meta FROM {$wpdb->prefix}comments comments LEFT JOIN {$wpdb->prefix}commentmeta meta ON comments.comment_ID = meta.comment_id WHERE comments.comment_post_ID = %d",$order_id));
                }

                foreach ($post['notes'] as $order_note) {
                    $note = explode('|', $order_note);
                    $con = array_shift($note);
                    $con = substr($con, strpos($con, ":") + 1);
                    $date = array_shift($note);
                    $date = substr($date, strpos($date, ":") + 1);
                    $cus = array_shift($note);
                    $cus = substr($cus, strpos($cus, ":") + 1);
                    $system = array_shift($note);
                    $added_by = substr($system, strpos($system, ":") + 1);
                    if($added_by == 'system'){
                        $added_by_user = FALSE;
                    }else{
                        $added_by_user = TRUE;
                    }
                    if($cus == '1'){
                        $comment_id = $order->add_order_note($con,1,1);
                    } else {
                        $comment_id = $order->add_order_note($con,0,$added_by_user);
                    }
                    wp_update_comment(array('comment_ID' => $comment_id,'comment_date' => $date));
                }
            }

            // record the product sales
            if (WC()->version < '2.7.0') {
                $order->record_product_sales();
            } else {
                wc_update_total_sales_counts($order_id);
            }
        } // ! dry run
        // was an original order number provided?
        if (!empty($post['order_number_formatted'])) {
            if (!$dry_run) {
                // do our best to provide some custom order number functionality while also allowing 3rd party plugins to provide their own custom order number facilities
                do_action('woocommerce_set_order_number', $order, $post['order_number'], $post['order_number_formatted']);
                $order->add_order_note(sprintf(__("Original order #%s", 'order-import-export-for-woocommerce'), $post['order_number_formatted']));

                // get the order so we can display the correct order number
//                $order = wc_get_order($order_id);
            }

            $this->processed_posts[$post['order_number_formatted']] = $post['order_number_formatted'];
        }
        if ($merging && !$new_added)
            $out_msg = 'Order Successfully Updated.';
        else
            $out_msg = 'Order Imported Successfully.';

        $this->add_import_result('imported', __($out_msg, 'order-import-export-for-woocommerce'), $order_id, isset($order_data['post_title']) ? $order_data['post_title'] : '', $order_id);
        $this->hf_order_log_data_change('order-csv-import', sprintf(__('> &#8220;%s&#8221;' . $out_msg, 'order-import-export-for-woocommerce'), esc_html($order_id)), true);
        $this->imported++;
        $this->hf_order_log_data_change('order-csv-import', sprintf(__('> Finished importing order %s', 'order-import-export-for-woocommerce'), $dry_run ? "" : $order->get_order_number() ));
//		}
        $this->hf_order_log_data_change('order-csv-import', __('Finished processing orders.', 'order-import-export-for-woocommerce'));

        unset($post);
    }

    public function hf_check_customer($data) {
        $customer_email = (!empty($data['_customer_email']) ) ? $data['_customer_email'] : '';
        $found_customer = false;
        $username = '';
        if (!empty($customer_email)) {
            if (is_email($customer_email) && false !== email_exists($customer_email)) {
                $found_customer = email_exists($customer_email);
                return $found_customer;
            } else {
                $found_customer = 0;
            }
        } else {
            $found_customer = 0;
        }
        return $found_customer;
    }

    /**
     * Log a row's import status
     */
    protected function add_import_result($status, $reason, $post_id = '', $post_title = '', $order_number = '') {
        $this->import_results[] = array(
            'post_title' => $post_title,
            'post_id' => $post_id,
            'order_number' => $order_number,
            'status' => $status,
            'reason' => $reason
        );
    }

    /**
     * Decide what the maximum file size for downloaded attachments is.
     * Default is 0 (unlimited), can be filtered via import_attachment_size_limit
     *
     * @return int Maximum attachment file size to import
     */
    public function max_attachment_size() {
        return apply_filters('import_attachment_size_limit', 0);
    }

    // Display import page title
    public function header() {
        echo '<div><div class="icon32" id="icon-woocommerce-importer"><br></div>';
        echo '<h2>' . ( empty($_GET['merge']) ? __('Import', 'order-import-export-for-woocommerce') : __('Merge Orders', 'order-import-export-for-woocommerce') ) . '</h2>';
    }

    // Close div.wrap
    public function footer() {
        echo '</div>';
    }

    /**
     * Display introductory text and file upload form
     */
    public function greet() {
        $action = 'admin.php?import=woocommerce_wf_order_csv&amp;step=1&amp;merge=' . (!empty($_GET['merge']) ? 1 : 0 );
        $bytes = apply_filters('import_upload_size_limit', wp_max_upload_size());
        $size = size_format($bytes);
        $upload_dir = wp_upload_dir();
        include( 'views/html-wf-import-greeting.php' );
    }

    /**
     * Added to http_request_timeout filter to force timeout at 60 seconds during import
     * @return int 60
     */
    public function bump_request_timeout($val) {
        return 60;
    }

    public function hf_order_log_data_change($content = 'order-csv-import', $data = '') {
        if (WC()->version < '2.7.0') {
            $this->log->add($content, $data);
        } else {
            $context = array('source' => $content);
            $this->log->log("debug", $data, $context);
        }
    }
}
