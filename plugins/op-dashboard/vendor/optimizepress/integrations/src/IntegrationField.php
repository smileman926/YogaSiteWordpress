<?php

namespace OptimizePress\Integrations;

use OptimizePress\Integrations\Services\DataObjectTrait;
use OptimizePress\Support\Collection;

/**
 * Integration field item
 */
class IntegrationField
{
    use DataObjectTrait;

    /**
     * @var array
     */
    protected $data;

    /**
     * Init field object
     *
     * @param array $data
     */
    public function __construct(array $data)
    {
        $this->data = $data;

        if (! isset($this->data['values'])) {
            $this->data['values'] = new Collection;
        }
    }

    /**
     * Push new option value
     *
     * @param string $value
     * @param string $label
     */
    public function addOptionValue($value, $label)
    {
        $this->data['values']->push(new IntegrationFieldValue([
            'value' => $value,
            'label' => $label,
        ]));
    }

    public function option()
    {

    }

    /**
     * Check if field is required
     *
     * @return bool
     */
    public function isRequired()
    {
        return (bool) $this->data['required'];
    }

    /**
     * Check if field is enabled
     *
     * @return bool
     */
    public function isEnabled()
    {
        return (bool) $this->data['enabled'];
    }

    /**
     * Enable field for form
     *
     * @return void
     */
    public function enable()
    {
        $this->data['enabled'] = true;
    }

    /**
     * Disable field for form
     *
     * @return void
     */
    public function disable()
    {
        $this->data['enabled'] = false;
    }

    /**
     * Convert to array
     *
     */
    public function toArray()
    {
        $return = (array) $this->data;

        // Add values
        if ($this->values) {
            $return['values'] = [];

            foreach ($this->values as $value) {
                if (is_object($value) and method_exists($value, 'toArray')) {
                    $return['values'][] = $value->toArray();
                } else {
                    var_dump($value);
                    $return['values'][] = $value;
                }
            }
        }

        return $return;
    }
}
