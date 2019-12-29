<?php

namespace OPBuilder\Editor\Render;

abstract class BasePropertyRender
{
    /**
     * @var string
     */
    protected $hook;

    /**
     * @var string
     */
    protected $selector;

    /**
     * @var string
     */
    protected $output;

    /**
     * Init new renderer for custom properties
     *
     * @param string $hook
     * @param string $selector
     * @param string $output
     */
    public function __construct($hook, $selector, $output)
    {
        $this->hook     = $hook;
        $this->selector = $selector;
        $this->output   = $output;
    }

    /**
     * Returns the hook passed to the constructor
     * This method can be overridden by the render class
     *
     * @return string
     */
    public function hook()
    {
        return $this->hook;
    }

    /**
     * Returns the selector passed to the constructor
     * This method can be overridden by the render class
     *
     * @return string
     */
    public function selector()
    {
        return $this->selector;
    }

    /**
     * Returns simple output passed to constructor
     * This method can be overridden by the render class
     *
     * @return string
     */
    public function output()
    {
        return $this->output;
    }
}
