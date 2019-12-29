<?php

namespace OPDashboard\Templates;

use OptimizePress\Support\Collection;
use OPDashboard\Services\DataObject;
use OPDashboard\SL\SL;
use function OptimizePress\Support\array_get;

class TemplateCollection extends DataObject
{
    /**
     * Collection of all collection templates
     *
     * @var Collection
     */
    protected $templates;

    /**
     * Return all collection templates
     *
     * @return Collection
     */
    public function templates()
    {
        // Load templates from SL if empty
        if (! $this->templates or ! count($this->templates)) {
            $this->templates = $this->loadTemplates();
        }

        return $this->templates;
    }

    /**
     * Load templates from SL
     *
     * @return Collection
     */
    public function loadTemplates()
    {
        $this->templates = SL::getCollectionTemplates($this->uid);

        return $this->templates;
    }

    /**
     * Return preview image
     *
     * @param  string $size
     * @return string
     */
    public function preview($size)
    {
        return array_get($this->preview, $size);
    }
}
