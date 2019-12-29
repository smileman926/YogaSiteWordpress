<?php
/**
 * WordPress Importer class for managing the import process of a CSV file
 *
 * @package WordPress
 * @subpackage Importer
 */
if (!class_exists('WP_Importer'))
    return;

class WF_CustomerImpExpCsv_Customer_Import extends WP_Importer {

    var $id;
    var $file_url;
    var $delimiter;
    var $processed_posts = array();
    var $skipped = 0;
    var $imported = 0;
    var $errored = 0;
    // Results
    var $import_results = array();
    var $log = false;

    /**
     * Constructor
     */
	public function __construct() {
        // Check that the class exists before trying to use it
            if (function_exists('WC')) {
                if(WC()->version < '2.7.0'){
                    $this->log	= new WC_Logger();
                } else {
                    $this->log	= wc_get_logger();
                }
            }
            $this->import_page = 'wordpress_hf_user_csv';
            $this->file_url_import_enabled = apply_filters('woocommerce_csv_product_file_url_import_enabled', true);
	}

	public function hf_log_data_change ($content = 'user-csv-import',$data='') {
            if (WC()->version < '2.7.0'){
                $this->log->add($content,$data);
            }else{
                $context = array( 'source' => $content );
                $this->log->log("debug", $data ,$context);
            }
	}

    /**
     * Registered callback function for the WordPress Importer
     *
     * Manages the three separate stages of the CSV import process
     */
    public function dispatch() {
        global $wpdb;

        if (!empty($_POST['delimiter'])) {
            $this->delimiter = stripslashes(trim($_POST['delimiter']));
        } else if (!empty($_GET['delimiter'])) {
            $this->delimiter = stripslashes(trim($_GET['delimiter']));
        }

        if (!$this->delimiter)
            $this->delimiter = ',';

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
                    _e('Error with handle_upload!', 'users-customers-import-export-for-wp-woocommerce');
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
                    $file_delimiter = $this->detectDelimiter($file);
                    if(!empty($file_delimiter) && ($file_delimiter != $this->delimiter)){
                        echo '<p class="error"><strong>' . __("Basic version supports only ',' as delimiter. Your file's delimiter seems to be unsupported.", 'users-customers-import-export-for-wp-woocommerce') . '</strong></p>';
                        break;
                    }
                    ?>
                    <table id="import-progress" class="widefat_importer widefat">
                        <thead>
                            <tr>
                                <th class="status">&nbsp;</th>
                                <th class="row"><?php _e('Row', 'users-customers-import-export-for-wp-woocommerce'); ?></th>
                                <th><?php _e('User ID', 'users-customers-import-export-for-wp-woocommerce'); ?></th>
                                <th><?php _e('User Status', 'users-customers-import-export-for-wp-woocommerce'); ?></th>
                                <th class="reason"><?php _e('Status Msg', 'users-customers-import-export-for-wp-woocommerce'); ?></th>
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
                            var processed_posts = [];
                            var i = 1;
                            var done_count = 0;
                            function import_rows(start_pos, end_pos) {
                                var data = {
                                    action:     'user_csv_import_request',
                                    file:       '<?php echo addslashes($file); ?>',
                                    start_pos:  start_pos,
                                    end_pos:    end_pos,
                                };
                                return $.ajax({
                                    url:        '<?php echo add_query_arg(array('import_page' => $this->import_page, 'step' => '3'), admin_url('admin-ajax.php')); ?>',
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
                                                    $.each(results.processed_posts, function(index, value) {
                                                        processed_posts.push(value);
                                                    });
                                                    $(results.import_results).each(function(index, row) {
                                                        $('#import-progress tbody').append('<tr id="row-' + i + '" class="' + row['status'] + '"><td><mark class="result" title="' + row['status'] + '">' + row['status'] + '</mark></td><td class="row">' + i + '</td><td>' + row['user_id'] + '</td><td>' + row['post_id'] + ' - ' + row['post_title'] + '</td><td class="reason">' + row['reason'] + '</td></tr>');
                                                        i++;
                                                    });
                                                }
                                            } catch (err) {}
                                        } else {
                                            $('#import-progress tbody').append('<tr class="error"><td class="status" colspan="5">' +   '<?php _e('AJAX Error', 'users-customers-import-export-for-wp-woocommerce'); ?>' + '</td></tr>');
                                        }

                                        var w = $(window);
                                        var row = $("#row-" + (i - 1));
                                        if (row.length) {
                                            w.scrollTop(row.offset().top - (w.height() / 2));
                                        }
                                        done_count++;
                                        $('body').trigger('user_csv_import_request_complete');
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
                                while (( $postmeta = fgetcsv($handle, 0, $this->delimiter)) !== FALSE) {
                                    $count++;
                                    if ($count >= $limit) {
                                        $previous_position = $position;
                                        $position = ftell($handle);
                                        $count = 0;
                                        $import_count ++;
                                        // Import rows between $previous_position $position
                                        ?>rows.push([ <?php echo $previous_position; ?>, <?php echo $position; ?> ]); <?php
                                    }
                                }
                                // Remainder
                                if ($count > 0) {
                                    ?>rows.push([ <?php echo $position; ?>, '' ]); <?php
                                    $import_count ++;
                                }
                                fclose($handle);
                            }
                            ?>
                            var data = rows.shift();
                            var regen_count = 0;
                            import_rows( data[0], data[1] );

                            $('body').on( 'user_csv_import_request_complete', function() {
                                if ( done_count == <?php echo $import_count; ?> ) {
                                    import_done();
                                } else {
                                    // Call next request
                                    data = rows.shift();
                                    import_rows( data[0], data[1] );
                                }
                            });

                            function import_done() {
                                var data = {
                                    action: 'user_csv_import_request',
                                    file: '<?php echo $file; ?>',
                                    processed_posts: processed_posts,
                                };
                                $.ajax({
                                    url: '<?php echo add_query_arg(array('import_page' => $this->import_page, 'step' => '4'), admin_url('admin-ajax.php')); ?>',
                                    data:       data,
                                    type:       'POST',
                                    success:    function( response ) {
                                        console.log( response );
                                        $('#import-progress tbody').append( '<tr class="complete"><td colspan="5">' + response + '</td></tr>' );
                                        $('.importer-loading').hide();
                                    }
                                });
                            }
                        });
                    </script>
                    <?php
                } else {
                    echo '<p class="error">' . __('Error finding uploaded file!', 'users-customers-import-export-for-wp-woocommerce') . '</p>';
                }
                break;
            case 3 :
                // Check access - cannot use nonce here as it will expire after multiple requests
                if (function_exists('WC')) {
                    if (!current_user_can('manage_woocommerce'))
                        die();
                }
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
                $results['processed_posts'] = $this->processed_posts;

                echo "<!--WC_START-->";
                echo json_encode($results);
                echo "<!--WC_END-->";
                exit;
                break;
            case 4 :
                // Check access - cannot use nonce here as it will expire after multiple requests
                if (function_exists('WC')) {
                    if (!current_user_can('manage_woocommerce'))
                        die();
                }
                add_filter('http_request_timeout', array($this, 'bump_request_timeout'));
                if (function_exists('gc_enable'))
                    gc_enable();

                @set_time_limit(0);
                @ob_flush();
                @flush();
                $wpdb->hide_errors();

                $this->processed_posts = isset($_POST['processed_posts']) ? $_POST['processed_posts'] : array();

                _e('Step 1...', 'users-customers-import-export-for-wp-woocommerce') . ' ';

                wp_defer_term_counting(true);
                wp_defer_comment_counting(true);

                _e('Step 2...', 'users-customers-import-export-for-wp-woocommerce') . ' ';

                echo 'Step 3...' . ' '; // Easter egg

                _e('Finalizing...', 'users-customers-import-export-for-wp-woocommerce') . ' ';

                // SUCCESS
                _e('Finished. Import complete.', 'users-customers-import-export-for-wp-woocommerce');

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
        include( 'views/html-wf-import-options.php' );
    }

    /**
     * The main controller for the actual import stage.
     */
    public function import() {
        wp_suspend_cache_invalidation(true);
        if ($this->log) {
            $this->hf_log_data_change('user-csv-import', '---');
            $this->hf_log_data_change('user-csv-import', __('Processing users.', 'users-customers-import-export-for-wp-woocommerce'));
        }
        $record_offset = 0;

        $i = 0;
        //echo '<pre>';print_r($this->parsed_data);exit;
        foreach ($this->parsed_data as $key => &$item) {
            $user = $this->parser->parse_users($item, $this->raw_headers, $record_offset);
            if (!is_wp_error($user))
                $this->process_users($user['user'][0]);
            else
                $this->add_import_result('failed', $user->get_error_message(), 'Not parsed', json_encode($item), '-');

            unset($item, $user);
            $i++;
        }
        if ($this->log)
            $this->hf_log_data_change('user-csv-import', __('Finished processing Users.', 'users-customers-import-export-for-wp-woocommerce'));
        wp_suspend_cache_invalidation(false);
    }

    /**
     * Parses the CSV file and prepares us for the task of processing parsed data
     *
     * @param string $file Path to the CSV file for importing
     */
    public function import_start($file,$start_pos, $end_pos) {
        if (function_exists('WC')) {
            if (WC()->version < '2.7.0') {
                $memory = size_format(woocommerce_let_to_num(ini_get('memory_limit')));
                $wp_memory = size_format(woocommerce_let_to_num(WP_MEMORY_LIMIT));
            } else {
                $memory = size_format(wc_let_to_num(ini_get('memory_limit')));
                $wp_memory = size_format(wc_let_to_num(WP_MEMORY_LIMIT));
            }
        } else {
            $memory = size_format($this->wf_let_to_num(ini_get('memory_limit')));
            $wp_memory = size_format($this->wf_let_to_num(WP_MEMORY_LIMIT));
        }
        if ($this->log) {
            $this->hf_log_data_change('user-csv-import', '---[ New Import ] PHP Memory: ' . $memory . ', WP Memory: ' . $wp_memory);
            $this->hf_log_data_change('user-csv-import', __('Parsing users CSV.', 'users-customers-import-export-for-wp-woocommerce'));
        }
        $this->parser = new WF_CSV_Parser('user');

        list( $this->parsed_data, $this->raw_headers, $position ) = $this->parser->parse_data($file, $this->delimiter, $start_pos, $end_pos);
        if ($this->log)
            $this->hf_log_data_change('user-csv-import', __('Finished parsing users CSV.', 'users-customers-import-export-for-wp-woocommerce'));

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
     *
     * @return bool False if error uploading or invalid file, true otherwise
     */
    public function handle_upload() {
        if (empty($_POST['file_url'])) {
            $file = wp_import_handle_upload();
            if (isset($file['error'])) {
                echo '<p><strong>' . __('Sorry, there has been an error.', 'users-customers-import-export-for-wp-woocommerce') . '</strong><br />';
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
                echo '<p><strong>' . __('Sorry, there has been an error.', 'users-customers-import-export-for-wp-woocommerce') . '</strong></p>';
                return false;
            }
        }
        return false;
    }

    /**
     * Create new posts based on import information
     */
    private function process_users($post) {
        $this->imported = 0;
        // plan a dry run
        //$dry_run = isset( $_POST['dry_run'] ) && $_POST['dry_run'] ? true : false;
        $dry_run = 0; //mockup import and check weather the users can be imported without fail
        if ($this->log) {
            $this->hf_log_data_change('user-csv-import', '---');
        }
        if (empty($post['user_details']['user_email'])) {
            $this->add_import_result('skipped', __('Cannot insert user without email', 'users-customers-import-export-for-wp-woocommerce'), 1, 1, 1);
            unset($post);
            return;
        } elseif (!is_email($post['user_details']['user_email'])) {
            $this->add_import_result('skipped', __('skipped: Email is not valid.', 'users-customers-import-export-for-wp-woocommerce'), 1, $post['user_details']['user_email'], 1);
            unset($post);
            return;
        }
        $user_id = $this->hf_check_customer($post);
        $new_added = false;

        if ($user_id) {
            $usr_msg = 'User already exists.';
            $user_info = get_userdata($user_id);
            $user_string = sprintf('<a href="%s">%s</a>', get_edit_user_link($user_id), $user_info->first_name);
            $this->add_import_result('skipped', __($usr_msg, 'users-customers-import-export-for-wp-woocommerce'),$user_id  , $user_string, $user_id);
            if ($this->log)
                $this->hf_log_data_change('user-csv-import', sprintf(__('> &#8220;%s&#8221;' . $usr_msg, 'users-customers-import-export-for-wp-woocommerce'), $user_id), true);
            unset($post);
            return;
        } else {
            $user_id = $this->hf_create_customer($post);
            $new_added = true;
            if (is_wp_error($user_id)) {
                $this->errored++;
                $this->add_import_result('failed', __($user_id->get_error_message(), 'users-customers-import-export-for-wp-woocommerce'), 0, 'failed', 1);
                if ($this->log)
                    $this->hf_log_data_change('user-csv-import', sprintf(__('> Error inserting %s: %s', 'users-customers-import-export-for-wp-woocommerce'), 1, $user_id->get_error_message()), true);
                $skipped++;
                unset($post);
                return;
            } elseif (empty($user_id)) {
                $this->errored++;
                if ($this->log)
                    $this->hf_log_data_change('user-csv-import', sprintf(__('An error occurred with the customer information provided.', 'users-customers-import-export-for-wp-woocommerce')));
                $this->add_import_result('skipped', __('An error occurred with the customer information provided.', 'users-customers-import-export-for-wp-woocommerce'), 0, 'failed', 1);
                $skipped++;
                unset($post);
                return;
            }
        }
        
        $out_msg = 'User Imported Successfully.';

        $user_info = get_userdata($user_id);
        $user_string = sprintf('<a href="%s">%s</a>', get_edit_user_link($user_id), $user_info->first_name);

        $this->add_import_result('imported', __($out_msg, 'users-customers-import-export-for-wp-woocommerce'), $user_id , $user_string, $user_id);
        if ($this->log)
            $this->hf_log_data_change('user-csv-import', sprintf(__('> &#8220;%s&#8221;' . $out_msg, 'users-customers-import-export-for-wp-woocommerce'), $user_id), true);
        $this->imported++;

        unset($post);
    }

    public function hf_check_customer($data) {
        $customer_email = (!empty($data['user_details']['user_email']) ) ? $data['user_details']['user_email'] : '';
        $username = (!empty($data['user_details']['user_login']) ) ? $data['user_details']['user_login'] : '';
        $customer_id = (!empty($data['user_details']['ID']) ) ? $data['user_details']['ID'] : '';

        $found_customer = false;

        if (!empty($customer_email)) {
            if (is_email($customer_email) && false !== email_exists($customer_email)) {
                $found_customer = email_exists($customer_email);
            } elseif (!empty($username) && false !== username_exists($username)) {
                $found_customer = username_exists($username);
            }
        }
        return $found_customer;
    }

    public function hf_create_customer($data) {
        $customer_email = (!empty($data['user_details']['user_email']) ) ? $data['user_details']['user_email'] : '';
        $username = (!empty($data['user_details']['user_login']) ) ? $data['user_details']['user_login'] : '';
        $customer_id = (!empty($data['user_details']['ID']) ) ? $data['user_details']['ID'] : '';
        if (!empty($data['user_details']['user_pass'])) {
            $password = (strlen( $data['user_details']['user_pass'])==34 ) ? $data['user_details']['user_pass'] : wp_hash_password($data['user_details']['user_pass']);
            $password_generated = false;
        } else {
            $password = wp_generate_password(12, true);
            $password_generated = true;
        }
        $found_customer = false;
        if (is_email($customer_email)) {
            // Not in test mode, create a user account for this email
            if (empty($username)) {
                $maybe_username = explode('@', $customer_email);
                $maybe_username = sanitize_user($maybe_username[0]);
                $counter = 1;
                $username = $maybe_username;
                while (username_exists($username)) {
                    $username = $maybe_username . $counter;
                    $counter++;
                }
            }

            $found_customer = wp_create_user($username, $password, $customer_email);
            wp_insert_user(array('ID' => $found_customer,'user_login'=>$username,'user_email'=>$customer_email, 'user_pass' => $password));

            if (!is_wp_error($found_customer)) {
                $wp_user_object = new WP_User($found_customer);
                $roles = get_editable_roles();
                $new_roles = explode(',', $data['user_details']['roles']);
                $new_roles = array_intersect( $new_roles, array_keys( $roles ) );
                $roles_to_remove = array();
                $user_roles = array_intersect( array_values( $wp_user_object->roles ), array_keys( $roles ) );
                if ( ! $new_roles ) {
                    // If there are no roles, delete all of the user's roles
                    $roles_to_remove = $user_roles;
                } else {
                    $roles_to_remove = array_diff( $user_roles, $new_roles );
                }
                foreach ( $roles_to_remove as $_role ) {
                    $wp_user_object->remove_role( $_role );
                }
                if(!empty($new_roles)){
                    // Make sure that we don't call $wp_user_object->add_role() any more than it's necessary
                    $_new_roles = array_diff( $new_roles, array_intersect( array_values( $wp_user_object->roles ), array_keys( $roles ) ) );
                    foreach ( $_new_roles as $_role ) {
                        $wp_user_object->add_role( $_role );
                    }               
                }
                    $user_nicename = (!empty($data['user_details']['user_nicename'])) ? $data['user_details']['user_nicename'] : '';
                    $website = (!empty($data['user_details']['user_url'])) ? $data['user_details']['user_url'] : '';
                    $user_registered = (!empty($data['user_details']['user_registered'])) ? $data['user_details']['user_registered'] : '';
                    $display_name = (!empty($data['user_details']['display_name'])) ? $data['user_details']['display_name'] : '';
                    $first_name = (!empty($data['user_details']['first_name'])) ? $data['user_details']['first_name'] : '';
                    $last_name = (!empty($data['user_details']['last_name'])) ? $data['user_details']['last_name'] : '';
                    $user_status = (!empty($data['user_details']['user_status'])) ? $data['user_details']['user_status'] : '';	
                    $description = (!empty($data['user_details']['description'])) ? $data['user_details']['description'] : '';
                    wp_update_user( array( 
                        'ID' => $found_customer,
                        'user_nicename' => $user_nicename,
                        'user_url' => $website,
                        'user_registered' => $user_registered,
                        'display_name' => $display_name,
                        'first_name' => $first_name,
                        'last_name' => $last_name,
                        'description' => $description,
                        'user_status' => $user_status,                    
                    ) 
                );
            }
        } else {
            $found_customer = new WP_Error('hf_invalid_customer', sprintf(__('User could not be created without Email.', 'users-customers-import-export-for-wp-woocommerce'), $customer_id));
        }
        return $found_customer;
    }

    /**
     * Log a row's import status
     */
    protected function add_import_result($status, $reason, $post_id = '', $post_title = '', $user_id = '') {
        $this->import_results[] = array(
            'post_title' => $post_title,
            'post_id' => $post_id,
            'user_id' => $user_id,
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
        echo '<div class="woocommerce"><div class="icon32" id="icon-woocommerce-importer"><br></div>';
        $tab = "import";
        include_once(plugin_dir_path(WF_CustomerImpExpCsv_FILE).'includes/views/html-wf-common-header.php');
    }

    // Close div.wrap
    public function footer() {
        echo '</div>';
    }

    /**
     * Display introductory text and file upload form
     */
    public function greet() {
        $action = 'admin.php?import=wordpress_hf_user_csv&amp;step=1';
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

    public function wf_let_to_num($size) {
        $l = substr($size, -1);
        $ret = substr($size, 0, -1);
        switch (strtoupper($l)) {
            case 'P':
                $ret *= 1024;
            case 'T':
                $ret *= 1024;
            case 'G':
                $ret *= 1024;
            case 'M':
                $ret *= 1024;
            case 'K':
                $ret *= 1024;
        }
        return $ret;
    }
    
    public function detectDelimiter($csvFile) {
        $delimiters = array(
            ';' => 0,
            ',' => 0,
            "\t" => 0,
            "|" => 0
        );

        $handle = fopen($csvFile, "r");
        $firstLine = fgets($handle);
        fclose($handle); 
        foreach ($delimiters as $delimiter => &$count) {
            $count = count(str_getcsv($firstLine, $delimiter));
        }
        return array_search(max($delimiters), $delimiters);
    }

}
