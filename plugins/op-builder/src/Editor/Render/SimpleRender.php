<?php

namespace OPBuilder\Editor\Render;

class SimpleRender extends BasePropertyRender
{
    /**
     * Render the property on the page
     *
     * @return void
     */
    public function render()
    {
        echo $this->output();
    }
}
