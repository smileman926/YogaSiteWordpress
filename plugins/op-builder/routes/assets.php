<?php

$requestPath = $_SERVER['REQUEST_URI'];
$pluginName  = pathinfo(OP3__DIR__, PATHINFO_BASENAME);

// Public assets
if (preg_match("/\/" . $pluginName . "\/public\/assets\/(css|js)\/page-(\d+)(\-\d+)?\.(css|js)/", $requestPath, $matches)) {
    if ($matches[4] == "js") {
        \OPBuilder\Http\AssetsController::scripts($matches[2], $matches[3]);
    }
}
