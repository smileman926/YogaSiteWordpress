<?php

namespace OPDashboard\Templates;

use OptimizePress\Support\Collection;
use OPDashboard\Services\DataObject;
use OPDashboard\SL\SL;

class BlockCategory extends DataObject
{
    /**
     * Collection of all category blocks
     *
     * @var Collection
     */
    protected $blocks;

    /**
     * Return all category blocks
     *
     * @return Collection
     */
    public function blocks()
    {
        // Load templates from SL if empty
        if (! $this->blocks or ! count($this->blocks)) {
            $this->blocks = $this->loadBlocks();
        }

        return $this->blocks ?: new BlocksCollection();
    }

    /**
     * Load blocks from SL
     *
     * @return Collection
     */
    public function loadBlocks()
    {
        $this->blocks = SL::getBlocks(['category' => $this->uid]);

        return $this->blocks;
    }

    /**
     * Convert the collection to an array
     *
     * @return array
     */
    public function toArray()
    {
        $data = parent::toArray();

        // Add blocks
        if (isset($this->blocks) and $this->blocks) {
            $data['blocks'] = $this->blocks->toArray();
        }

        return $data;
    }
}
