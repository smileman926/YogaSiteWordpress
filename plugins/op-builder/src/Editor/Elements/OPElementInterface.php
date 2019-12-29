<?php

namespace OPBuilder\Editor\Elements;

interface OPElementInterface
{
    /**
     * Render the element and return the rendered HTML code
     *
     * @return string
     */
    public function render();
}
