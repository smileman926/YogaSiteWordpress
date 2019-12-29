<?php

$result = [];

// Fetch all fonts from json file
// @TODO: @Zoran, Check if we can find a better solution because this needs to handle a ton of data
// (now the lists are merged on every request, maybe we can merge it with gulp, sort, create file and read this file?)
foreach(glob(__DIR__ . '/fonts_*.json') as $filename) {
    $content = (array) @json_decode(file_get_contents($filename), true);
    $result  = array_merge($result, $content);
}

return $result;
