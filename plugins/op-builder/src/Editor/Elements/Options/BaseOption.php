<?php

namespace OPBuilder\Editor\Elements\Options;

use OPBuilder\Editor\Elements\OPElement;

/**
 * Base option for OP3 elements
 */
abstract class BaseOption
{
    /**
     * @var string
     */
    protected $type = 'base';

    /**
     * @var mixed
     */
    protected $value;

    /**
     * Init new element option
     *
     * @param mixed     $value
     * @param OPElement $element [description]
     */
    public function __construct($value, OPElement &$element = null)
    {
        $this->value   = $value;
        $this->element = &$element;
    }

    /**
     * Return the option type
     * Can be css and css_class for now
     *
     * @return string
     */
    public function type()
    {
        return $this->type;
    }
}
