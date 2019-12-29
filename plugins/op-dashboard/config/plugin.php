<?php

return [

    'log'       => defined('OPD_LOG_TYPE')  ? OPD_LOG_TYPE  : 'single', // available: "single", "daily", "syslog", "errorlog"
    'log_level' => defined('OPD_LOG_LEVEL') ? OPD_LOG_LEVEL : 'debug',
    'log_path'  => defined('OPD_LOG_PATH')  ? OPD_LOG_PATH  : __DIR__.'/../storage/logs/op.log',

    'release_channels' => ['stable', 'beta'],
];
