<?php

return  array(
    'title' => 'Some page title',
    'content' => 'Test 123',

    'children' => array(
        array_merge(array('uuid' => substr(md5(rand()), 0, 12)), include(OP3_ELEMENTS_PATH.'headline/config.php')),
        array_merge(array('uuid' => substr(md5(rand()), 0, 12)), include(OP3_ELEMENTS_PATH.'texteditor/config.php')),
        array_merge(array('uuid' => substr(md5(rand()), 0, 12)), include(OP3_ELEMENTS_PATH.'texteditor/config.php')),
        array_merge(array('uuid' => substr(md5(rand()), 0, 12)), include(OP3_ELEMENTS_PATH.'arrows/config.php')),
        array_merge(array('uuid' => substr(md5(rand()), 0, 12)), include(OP3_ELEMENTS_PATH.'headline/config.php')),
        array_merge(array('uuid' => substr(md5(rand()), 0, 12)), include(OP3_ELEMENTS_PATH.'texteditor/config.php')),
        array_merge(array('uuid' => substr(md5(rand()), 0, 12)), include(OP3_ELEMENTS_PATH.'image/config.php')),
        array_merge(array('uuid' => substr(md5(rand()), 0, 12)), include(OP3_ELEMENTS_PATH.'video/config.php')),
        array_merge(array('uuid' => substr(md5(rand()), 0, 12)), include(OP3_ELEMENTS_PATH.'texteditor/config.php')),
    ),
);
