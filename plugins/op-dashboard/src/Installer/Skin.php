<?php

namespace OPDashboard\Installer;

use WP_Upgrader_Skin;

class Skin extends WP_Upgrader_Skin
{
    function add_strings()
    {
        $this->upgrader->strings['downloading_package']   = __('Downloading package...', 'opd');
        $this->upgrader->strings['unpack_package']        = __('Unpacking...', 'opd');
        $this->upgrader->strings['installing_package']    = __('Installing package...', 'opd');
        $this->upgrader->strings['remove_old']            = __('Removing old package...', 'opd');
    }
}
