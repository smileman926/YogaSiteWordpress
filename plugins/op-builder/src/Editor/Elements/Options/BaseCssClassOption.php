<?php

namespace OPBuilder\Editor\Elements\Options;

/**
 * CSS class option for rotating elements
 */
abstract class BaseCssClassOption extends BaseOption
{
    /**
     * @var string
     */
    protected $type = 'css_class';

    /**
     * @var string
     */
    protected $classPrefix = 'css_op3-element-style-';

    /**
     * Return generated CSS class
     *
     * @return string
     */
    public function cssClass()
    {
        if ($this->value) {
            return $this->classPrefix . $this->value;
        }
    }

    /**
     * Return option as string
     *
     * @return string
     */
    public function __toString()
    {
        return $this->cssClass();
    }
}
