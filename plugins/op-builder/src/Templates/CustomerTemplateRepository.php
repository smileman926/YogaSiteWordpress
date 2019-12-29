<?php

namespace OPBuilder\Templates;

use OPDashboard\SL\SL;
use OPBuilder\Repositories\WordpressRepository;
use OPDashboard\Templates\Template;
use OptimizePress\Support\Collection;

class CustomerTemplateRepository extends WordpressRepository
{

    /**
     * Find template by ID
     *
     * @param  int $id
     * @return Template
     */
    public static function find($id)
    {
        return SL::getCustomerTemplate($id);
    }

    /**
     * Find block by ID
     *
     * @param  int $id
     * @return Template
     */
    public static function findBlock($id)
    {
        return SL::getCustomerTemplate($id, 'block');
    }
}
