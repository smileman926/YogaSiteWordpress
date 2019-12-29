<?php

namespace OPDashboard\Templates;

use OptimizePress\Support\Collection;
use OPDashboard\Services\DataObject;
use OPDashboard\SL\SL;

class TemplateCategory extends DataObject
{
    /**
     * Collection of all category templates
     *
     * @var Collection
     */
    protected $templates;

    /**
     * Return all category templates
     *
     * @return Collection
     */
    public function templates()
    {
        // Load templates from SL if empty
        if (! $this->templates or ! count($this->templates)) {
            $this->templates = $this->loadTemplates();
        }

        return $this->templates ?: new TemplatesCollection;
    }

    /**
     * Load templates from SL
     *
     * @return Collection
     */
    public function loadTemplates()
    {
        $this->templates = SL::getTemplates($this->uid);

        return $this->templates;
    }

    /**
     * Convert the collection to an array
     *
     * @return array
     */
    public function toArray()
    {
        $data = parent::toArray();

        // Add templates
        if (isset($this->templates) and $this->templates) {
            $data['templates'] = $this->templates->toArray();
        }

        return $data;
    }
}
