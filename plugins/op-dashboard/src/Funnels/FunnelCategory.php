<?php

namespace OPDashboard\Funnels;

use OptimizePress\Support\Collection;
use OPDashboard\Services\DataObject;
use OPDashboard\SL\SL;

class FunnelCategory extends DataObject
{
    /**
     * Collection of all category funnels
     *
     * @var Collection
     */
    protected $funnels;

    /**
     * Return all category templates
     *
     * @return Collection
     */
    public function funnels()
    {
        // Load templates from SL if empty
        if (! $this->funnels or ! count($this->funnels)) {
            $this->funnels = $this->loadFunnels();
        }

        return $this->funnels;
    }

    /**
     * Load templates from SL
     *
     * @return Collection
     */
    public function loadFunnels()
    {
        $this->funnels = SL::getFunnels($this->uid);

        return $this->funnels;
    }
}
