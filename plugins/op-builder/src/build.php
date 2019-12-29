<?php

// build path not set
if ( ! defined('OP3_BUILD_PATH')) return;

// include once
if (defined('OP3_BUILD_ENV')) return;

// use build get parameter for url file
// extension (comma separated)
define('OP3_BUILD_URL_EXT', '.css, .js');

// default properties
$env = 'prod';
$time = number_format(time(), 3, '.', '');
$hash = dechex(crc32($time));

// props object
$data = array(
    'env' => $env,
    'time' => $time,
    'hash' => $hash,
);

// get properties from file
if (is_file(OP3_BUILD_PATH)) {
    try {
        $content = file_get_contents(OP3_BUILD_PATH);
        $content = json_decode($content);

        if (isset($content->env))  $data['env']  = $content->env;
        if (isset($content->time)) $data['time'] = $content->time;
        if (isset($content->hash)) $data['hash'] = $content->hash;
    }
    catch (Exception $e) {
        // pass
    }
}

// create file if missing
else {
    $handle = fopen(OP3_BUILD_PATH, 'w');
    fwrite($handle, json_encode($data));
    fclose($handle);
}

// properties as OP3 constants
define('OP3_BUILD_ENV', $data['env']);
define('OP3_BUILD_TIME', $data['time']);
define('OP3_BUILD_HASH', $data['hash']);
