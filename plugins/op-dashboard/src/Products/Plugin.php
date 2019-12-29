<?php

namespace OPDashboard\Products;

use OPDashboard\Services\DataObject;

class Plugin extends DataObject
{
    /**
     * @var string
     */
    public $uid;

    /**
     * Build up new plugin
     *
     * @param $data
     */
    public function __construct($data)
    {
        parent::__construct($data);

        // Add extra data
        $this->uid = isset($data['op_uid']) ? $data['op_uid'] : null;
    }

    /**
     * Check if plugin is part of the OP suite
     *
     * @return bool
     */
    public function isOpPlugin()
    {
        return (isset($this->data['op_uid']) and $this->data['op_uid']) ? true : false;
    }
}
