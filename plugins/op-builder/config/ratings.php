<?php

$path = OP3_ASSETS_PATH . 'img/elements/rating/rating-svg.svg';
$data = file_get_contents($path);
$pattern = '/<path\s.*?\bid=".*?".*?>/';
// since pattern is not perfect make sure we use only
// path tags and make sure they are in single line!!!

preg_match_all($pattern, $data, $matches);

return $matches[0];
