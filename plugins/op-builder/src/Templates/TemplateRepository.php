<?php

namespace OPBuilder\Templates;

use OPDashboard\SL\SL;
use OPBuilder\Repositories\WordpressRepository;
use OPDashboard\Templates\Template;
use OptimizePress\Support\Collection;

class TemplateRepository extends WordpressRepository
{
    /**
     * Find all categories
     *
     * @return Collection
     */
    public function categories()
    {
        return SL::getTemplateCategories();
    }

    /**
     * Find all categories
     *
     * @return Collection
     */
    public function blockCategories()
    {
        return SL::getBlockCategories();
    }

    /**
     * Find template by ID
     *
     * @param  int $id
     * @return Template
     */
    public static function find($id)
    {
        return SL::getTemplate($id);
    }

    /**
     * Find block by ID
     *
     * @param  int $id
     * @return Template
     */
    public static function findBlock($id)
    {
        return SL::getTemplate($id, 'block');
    }

    /**
     * Find block by ID
     *
     * @param  int $id
     * @return Template
     */
    public static function findCustomerBlock($id)
    {
        return SL::getCustomerTemplate($id, 'block');
    }

    /**
     * Fetch list of templates in category
     *
     * @param  string $category
     * @param  string $style
     * @return Collection
     */
    public function templates($category, $style = null)
    {
        return SL::getTemplates($category, 'template', $style);
    }

    /**
     * Fetch list of blocks in category
     *
     * @param  string  $category
     * @param  string  $style
     * @return Collection
     */
    public function blocks($category, $style = null)
    {
        if ($category === 'customer-templates') {
            return SL::getTemplates($category, 'block', $style, true);
        }

        return SL::getTemplates($category, 'block', $style);
    }
}
