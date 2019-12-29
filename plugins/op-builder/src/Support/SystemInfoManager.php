<?php

namespace OPBuilder\Support;

use OptimizePress\Support\DataObject;

class SystemInfoManager
{
    public $info;

    /**
     * Build up system info
     *
     * @return DataObject
     */
    public function getInfo()
    {
        $this->info = new DataObject([
            'server'    => $this->getServerInfo(),
            'wordpress' => $this->getWordPressInfo(),
            'theme'     => $this->getThemeInfo(),
            'plugins'   => $this->getPluginsInfo(),
        ]);

        return $this->info;
    }

    /**
     * Fetch server information
     *
     * @return DataObject
     */
    public function getServerInfo()
    {
        $info = new DataObject(array());

        return $info;
    }

    /**
     * Fetch WP information
     *
     * @return DataObject
     */
    public function getWordPressInfo()
    {
        $info = new DataObject(array());

        return $info;
    }

    /**
     * Fetch theme information
     *
     * @return DataObject
     */
    public function getThemeInfo()
    {
        $info = new DataObject(array());

        return $info;
    }

    /**
     * Fetch info on plugins
     *
     * @return DataObject
     */
    public function getPluginsInfo()
    {
        $info = new DataObject(array());

        return $info;
    }
}
