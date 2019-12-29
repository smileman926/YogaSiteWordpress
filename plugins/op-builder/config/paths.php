<?php

define('OP3_PLUGIN_BASE', plugin_basename(OP3__FILE__));
define('OP3_URL', plugins_url('/', OP3__FILE__));
define('OP3_PATH', plugin_dir_path(OP3__FILE__));
define('OP3_ELEMENTS_PATH', OP3_PATH . 'resources/elements/');
define('OP3_ASSETS_URL', OP3_URL . 'public/assets/');
define('OP3_ASSETS_PATH', OP3_PATH . 'public/assets/');
define('OP3_RESOURCES_URL', OP3_URL . 'resources/');
define('OP3_RESOURCES_PATH', OP3_PATH . 'resources/');
define('OP3_VIEWS_URL', OP3_URL . 'resources/views/');
define('OP3_VIEWS_PATH', OP3_PATH . 'resources/views/');

define('OP3_BUILD_PATH', OP3_PATH . '.build');

require(OP3_PATH . '/config/unsplash.php');
require(OP3_PATH . '/src/build.php');
