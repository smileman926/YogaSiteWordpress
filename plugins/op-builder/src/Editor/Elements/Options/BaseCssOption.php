<?php

namespace OPBuilder\Editor\Elements\Options;

/**
 * CSS class option for rotating elements
 */
abstract class BaseCssOption extends BaseOption
{
    /**
     * @var string
     */
    protected $type = 'css';

    /**
     * @var string
     */
    protected $ruleName;

    /**
     * Return generated CSS rule
     *
     * @return array
     */
    public function cssRule()
    {
        return [
            'name'  => $this->ruleName,
            'value' => $this->value,
        ];
    }

    /**
     * Return option as string
     *
     * @return string
     */
    public function __toString()
    {
        $rule = $this->cssRule();

        return $rule ? $rule['name'] . ': ' . $rule['value'] . ';' : null;
    }
}
