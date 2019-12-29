<?php

namespace OptimizePress\Integrations\Collections;

use OptimizePress\Support\Collection;

/**
 * Base class for collections that helps convert data to arrays and JSON format
 *
 * @package OptimizePress\Integrations
 */
class IntegrationDataCollection extends Collection
{
    /**
     * Convert to simple array, also include child elements
     *
     * @return array
     */
    public function toArray()
    {
        $array = $this->map(function($integration) {
            return $integration->toArray();
        });

        return $array->items;
    }

    /**
     * Convert to JSON, also include child elements
     *
     * @param  int  $options
     * @return string
     */
    public function toJson($options = 0)
    {
        return json_encode($this->toArray(), $options);
    }
}
