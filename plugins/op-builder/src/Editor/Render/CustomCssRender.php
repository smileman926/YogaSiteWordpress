<?php

namespace OPBuilder\Editor\Render;

class CustomCssRender extends BasePropertyRender
{
    /**
     * Render the property on the page
     *
     * @return void
     */
    public function render()
    {
        if (is_single() || is_page()) {
            echo '<style id="' . $this->selector().'">';
            echo $this->output();
            echo '</style>';
        }
    }
}
