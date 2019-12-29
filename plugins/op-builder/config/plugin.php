<?php

return [

    // Revisions
    'revision_limit' => defined('OP3_REVISION_LIMIT') ? OP3_REVISION_LIMIT  : 20,

    // Debugging
    'log'       => defined('OP3_LOG_TYPE')  ? OP3_LOG_TYPE  : 'single', // available: "single", "daily", "syslog", "errorlog"
    'log_level' => defined('OP3_LOG_LEVEL') ? OP3_LOG_LEVEL : 'debug',
    'log_path'  => defined('OP3_LOG_PATH')  ? OP3_LOG_PATH  : __DIR__.'/../storage/logs/op.log',

];
