<?php
/**
 * WooCommerce CSV Importer class for managing parsing of CSV files.
 */
class WF_CSV_Parser {

    var $row;
    var $post_type;
    var $log;
    var $skipped = 0;
    var $delimiter;

    /**
     * Constructor
     */
    public function __construct( $post_type = 'user' ) {
        $this->post_type         = $post_type;
        $this->user_base_fields  = array(
            'ID' => 'ID',                    
            'user_login' => 'user_login',
            'user_pass' => 'user_pass',
            'user_nicename' => 'user_nicename',
            'user_email' => 'user_email',
            'user_url' => 'user_url',
            'user_registered' => 'user_registered',
            'display_name' => 'display_name',
            'first_name' => 'first_name',
            'last_name' => 'last_name',
            'user_status' => 'user_status',
            'description' => 'description',
            'roles' => 'roles'
        );
    }


/**
     * Format data from the csv file
     * @param  string $data
     * @param  string $enc
     * @return string
     */
    public function format_data_from_csv( $data, $enc ) {
        return ( $enc == 'UTF-8' ) ? $data : utf8_encode( $data );
    }

    /**
     * Parse the data
     * @param  string  $file      [description]
     * @param  string  $delimiter [description]
     * @param  integer $start_pos [description]
     * @param  integer  $end_pos   [description]
     * @return array
     */
    public function parse_data( $file, $delimiter, $start_pos = 0, $end_pos = null ) {
        // Set locale
        $enc = mb_detect_encoding( $file, 'UTF-8, ISO-8859-1', true );
        if ( $enc )
            setlocale( LC_ALL, 'en_US.' . $enc );
        @ini_set( 'auto_detect_line_endings', true );
        $parsed_data = array();
        $raw_headers = array();
        // Put all CSV data into an associative array
        if ( ( $handle = fopen( $file, "r" ) ) !== FALSE ) {
            $header   = fgetcsv( $handle, 0, $delimiter );
            if ( $start_pos != 0 )
                fseek( $handle, $start_pos );
            while ( ( $postmeta = fgetcsv( $handle, 0, $delimiter ) ) !== FALSE ) {
                $row = array();
                foreach ( $header as $key => $heading ) {
                    $s_heading = strtolower($heading);
                    if ( $s_heading == '' )
                        continue;
                    // Add the heading to the parsed data
                    $row[$s_heading] = ( isset( $postmeta[$key] ) ) ? $this->format_data_from_csv( $postmeta[$key], $enc ) : '';
                    // Raw Headers stores the actual column name in the CSV
                    $raw_headers[ $s_heading ] = $heading;
                }
                $parsed_data[] = $row;
                unset( $postmeta, $row );
                $position = ftell( $handle );
                if ( $end_pos && $position >= $end_pos )
                    break;
            }
            fclose( $handle );
        }
        return array( $parsed_data, $raw_headers, $position );
    }

    /**
     * Parse users
     * @param  array  $item
     * @return array
     */     
    public function parse_users( $item, $raw_headers, $record_offset ) {
        global $WF_CSV_Customer_Import, $wpdb;
        $results = array();
        $row = 0;
        $skipped = 0;

        $row++;
        if ( $row <= $record_offset ) {
            if($WF_CSV_Customer_Import->log)
            $WF_CSV_Customer_Import->hf_log_data_change( 'user-csv-import', sprintf( __( '> Row %s - skipped due to record offset.', 'users-customers-import-export-for-wp-woocommerce' ), $row ) );
            unset($item);
            return;
        }
        if ( empty($item['user_email']) ) {
            if($WF_CSV_Customer_Import->log)
            $WF_CSV_Customer_Import->hf_log_data_change( 'user-csv-import', sprintf( __( '> Row %s - skipped: cannot insert user without email.', 'users-customers-import-export-for-wp-woocommerce' ), $row ) );
            unset($item);
            return;
        }elseif(!is_email($item['user_email'])){
            if($WF_CSV_Customer_Import->log)
            $WF_CSV_Customer_Import->hf_log_data_change( 'user-csv-import', sprintf( __( '> Row %s - skipped: Email is not valid.', 'users-customers-import-export-for-wp-woocommerce' ), $row ) );
            unset($item);
            return;
        }
        $user_details = array();
        foreach ($this->user_base_fields as $key => $value) {
            $user_details[$key] = isset( $item[$value] ) ? $item[$value] : "" ;
        }
        $parsed_details = array();
        $parsed_details['user_details'] = $user_details;
        // the $user_details array will now contain the necessary name-value pairs for the wp_users table
        $results[] = $parsed_details;
        // Result
        return array(
            $this->post_type => $results,
           'skipped'   => $skipped,
        );
    }
}