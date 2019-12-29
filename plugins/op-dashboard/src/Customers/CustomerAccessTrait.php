<?php

namespace OPDashboard\Customers;

/**
 * Trait that handles some customer access rights
 *
 * @package OPDashboard\Customers
 */
trait CustomerAccessTrait
{
    /**
     * Check if user has access to beta product channel
     *
     * @return bool
     */
    public function canInstallBetaProducts()
    {
        return (bool) $this->has_beta_access;
    }

    /**
     * Check if user has access to demo product channel
     *
     * @return bool
     */
    public function canInstallDemoProducts()
    {
        return (bool) $this->has_demo_access;
    }
}
