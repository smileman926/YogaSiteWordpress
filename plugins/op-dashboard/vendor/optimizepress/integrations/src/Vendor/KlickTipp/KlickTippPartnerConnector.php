<?php

namespace OptimizePress\Integrations\Vendor\KlickTipp;

/*
KlicktippPartnerConnector

A class using http header authentication for api access.

Example: subscribe, update, unsubscribe, delete

require ("klicktipp.api.inc"); // this file

$developer_key = 'abc';
$customer_key = 'cde';

$connector = new KlicktippPartnerConnector($username, $developer_key, $customer_key);
$subscriber = $connector->subscribe('example@example.com');
$result = $connector->subscriber_update($subscriber->id, array('fieldFirstName' => 'John'));
$result = $connector->unsubscribe('example@example.com');
$result = $connector->subscriber_delete($subscriber->id);
*/
class KlickTippPartnerConnector extends KlickTippConnector {
    protected $ciphertext;
    protected $username;

    /**
     * Instantiates a KlicktippPartnerConnector
     * The service URL will be tested: use get_last_error for any errors detected.
     *
     * @param string $username of your Klick-Tipp account
     * @param string $developer_key Developer key from your Klick-Tipp account
     * @param string $customer_key Customer key
     * @param string $service (optional) Path to the REST server
     */
    public function __construct($username, $developer_key, $customer_key, $service = 'http://api.klick-tipp.com') {
        parent::__construct($service);

        // create hash with developer key
        $hmac = hash_hmac('sha256', $customer_key, pack('H*', $developer_key), TRUE);
        $this->ciphertext = base64_encode($hmac . $customer_key);
        $this->username = $username;
    }

    /**
     * login
     *
     * overrides KlickTippConnector::login
     * there is no login for the partner api access
     */
    public function login($username, $password) {
        return TRUE;
    }

    /**
     * logout
     *
     * overrrides KlickTippConnector::logout
     * there is no logout for the partner api access
     */
    public function logout() {
        return TRUE;
    }

    /**
     * Helper function.
     * Establishes the system connection to the website.
     */
    protected function _http_request($path, $method = 'GET', $data = NULL, $usesession = TRUE, $default_header = array()) {

        $default_header['X-Un'] = 'X-Un' . ': ' . $this->username;
        $default_header['X-Ci'] = 'X-Ci' . ': ' . $this->ciphertext;

        return parent::_http_request($path, $method, $data, FALSE, $default_header);
    }
}
