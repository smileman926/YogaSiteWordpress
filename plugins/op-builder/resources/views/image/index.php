<?php

/**
 * Simple 404 template
 *
 * @return void
 */
function notFound() {
    header('HTTP/1.0 404 Not Found');
    header('Content-Type: text/html; charset=UTF-8');

    echo '<!DOCTYPE html>';
    echo '<html lang="en">';
    echo '<head>';
    echo '<meta charset="UTF-8" />';
    echo '<title>404 Not Found</title>';
    echo '</head>';
    echo '<body>';
    echo '<h1>Not Found</h1>';
    echo '<p>The requested URL was not found on this server.</p>';
    echo '</body>';
    echo '</html>';

    die();
}

// get url parameter
if ( ! isset($_GET['url'])) {
    notFound();
}

// do not allow non-http requests
$url = $_GET['url'];
if ( ! preg_match('/^https?\:\/\//', $url)) {
    notFound();
}

// read url (get binary data)
$bin = null;

// ...with curl
if (function_exists('curl_version')) {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0');
    $bin = curl_exec($ch);
    curl_close($ch);

// ...or with file_get_content
} else if (function_exists('file_get_contents') && ini_get('allow_url_fopen')) {
    $bin = file_get_contents($url);
}

// no method for reading url, redirect
if (is_null($bin)) {
    header('Location: ' . $url);
    die();
}

// reading url failed
if (empty($bin)) {
    notFound();
}

// get mime type from binary
$finfo = new finfo(FILEINFO_MIME_TYPE);
$mime = $finfo->buffer($bin);

// validate mime (is image file)
if ( ! preg_match('/^image\//', $mime)) {
    notFound();
}

// serve image
header('Content-Type: ' . $mime);
die($bin);
