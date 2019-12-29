<?php

namespace OPBuilder\Editor\Elements;

class TestimonialItem  extends OPElement implements OPElementInterface
{
    protected $selectorChanges = [
        [ 'borderTopWidth', ' > .op3-column-content', null, ' > .op3-column-content > [data-op3-background]' ],
        [ 'borderTopStyle', ' > .op3-column-content', null, ' > .op3-column-content > [data-op3-background]' ],
        [ 'borderTopColor', ' > .op3-column-content', null, ' > .op3-column-content > [data-op3-background]' ],
        [ 'borderBottomWidth', ' > .op3-column-content', null, ' > .op3-column-content > [data-op3-background]' ],
        [ 'borderBottomStyle', ' > .op3-column-content', null, ' > .op3-column-content > [data-op3-background]' ],
        [ 'borderBottomColor', ' > .op3-column-content', null, ' > .op3-column-content > [data-op3-background]' ],
        [ 'borderLeftWidth', ' > .op3-column-content', null, ' > .op3-column-content > [data-op3-background]' ],
        [ 'borderLeftStyle', ' > .op3-column-content', null, ' > .op3-column-content > [data-op3-background]' ],
        [ 'borderLeftColor', ' > .op3-column-content', null, ' > .op3-column-content > [data-op3-background]' ],
        [ 'borderRightWidth', ' > .op3-column-content', null, ' > .op3-column-content > [data-op3-background]' ],
        [ 'borderRightStyle', ' > .op3-column-content', null, ' > .op3-column-content > [data-op3-background]' ],
        [ 'borderRightColor', ' > .op3-column-content', null, ' > .op3-column-content > [data-op3-background]' ],
        [ 'borderTopLeftRadius', ' > .op3-column-content, > .op3-background-parent > [data-op3-background]', null, ' > .op3-column-content, > .op3-column-content > [data-op3-background]' ],
        [ 'borderTopRightRadius', ' > .op3-column-content, > .op3-background-parent > [data-op3-background]', null, ' > .op3-column-content, > .op3-column-content > [data-op3-background]' ],
        [ 'borderBottomLeftRadius', ' > .op3-column-content, > .op3-background-parent > [data-op3-background]', null, ' > .op3-column-content, > .op3-column-content > [data-op3-background]' ],
        [ 'borderBottomRightRadius', ' > .op3-column-content, > .op3-background-parent > [data-op3-background]', null, ' > .op3-column-content, > .op3-column-content > [data-op3-background]' ],

        [ 'borderTopWidth', ':hover > .op3-column-content', null, ':hover > .op3-column-content > [data-op3-background]' ],
        [ 'borderTopStyle', ':hover > .op3-column-content', null, ':hover > .op3-column-content > [data-op3-background]' ],
        [ 'borderTopColor', ':hover > .op3-column-content', null, ':hover > .op3-column-content > [data-op3-background]' ],
        [ 'borderBottomWidth', ':hover > .op3-column-content', null, ':hover > .op3-column-content > [data-op3-background]' ],
        [ 'borderBottomStyle', ':hover > .op3-column-content', null, ':hover > .op3-column-content > [data-op3-background]' ],
        [ 'borderBottomColor', ':hover > .op3-column-content', null, ':hover > .op3-column-content > [data-op3-background]' ],
        [ 'borderLeftWidth', ':hover > .op3-column-content', null, ':hover > .op3-column-content > [data-op3-background]' ],
        [ 'borderLeftStyle', ':hover > .op3-column-content', null, ':hover > .op3-column-content > [data-op3-background]' ],
        [ 'borderLeftColor', ':hover > .op3-column-content', null, ':hover > .op3-column-content > [data-op3-background]' ],
        [ 'borderRightWidth', ':hover > .op3-column-content', null, ':hover > .op3-column-content > [data-op3-background]' ],
        [ 'borderRightStyle', ':hover > .op3-column-content', null, ':hover > .op3-column-content > [data-op3-background]' ],
        [ 'borderRightColor', ':hover > .op3-column-content', null, ':hover > .op3-column-content > [data-op3-background]' ],
        [ 'borderTopLeftRadius', ':hover > .op3-column-content,:hover > .op3-background-parent > [data-op3-background]', null, ':hover > .op3-column-content,:hover > .op3-column-content > [data-op3-background]' ],
        [ 'borderTopRightRadius', ':hover > .op3-column-content,:hover > .op3-background-parent > [data-op3-background]', null, ':hover > .op3-column-content,:hover > .op3-column-content > [data-op3-background]' ],
        [ 'borderBottomLeftRadius', ':hover > .op3-column-content,:hover > .op3-background-parent > [data-op3-background]', null, ':hover > .op3-column-content,:hover > .op3-column-content > [data-op3-background]' ],
        [ 'borderBottomRightRadius', ':hover > .op3-column-content,:hover > .op3-background-parent > [data-op3-background]', null, ':hover > .op3-column-content,:hover > .op3-column-content > [data-op3-background]' ],

        // New-new border
        [ 'backgroundImage', ' > .op3-background-parent > [data-op3-background="base"]::before,  > .op3-background-parent > [data-op3-background="base"]::after', null, ' > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before, > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after' ],
        [ 'backgroundColor', ' > .op3-background-parent > [data-op3-background="base"]::before,  > .op3-background-parent > [data-op3-background="base"]::after', null, ' > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before, > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after' ],
        [ 'backgroundImage', ' > .op3-background-parent > [data-op3-background="image"]', null, ' > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' ],
        [ 'display', ' > .op3-background-parent > [data-op3-background="image"]', null, ' > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' ],
        [ 'opacity', ' > .op3-background-parent > [data-op3-background="image"]', null, ' > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' ],
        [ 'backgroundPosition', ' > .op3-background-parent > [data-op3-background="image"]', null, ' > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' ],
        [ 'backgroundAttachment', ' > .op3-background-parent > [data-op3-background="image"]', null, ' > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' ],
        [ 'backgroundRepeat', ' > .op3-background-parent > [data-op3-background="image"]', null, ' > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' ],
        [ 'backgroundSize', ' > .op3-background-parent > [data-op3-background="image"]', null, ' > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' ],
        [ 'backgroundImage', ' > .op3-background-parent > [data-op3-background="overlay"]::before,  > .op3-background-parent > [data-op3-background="overlay"]::after', null, ' > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::before, > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::after' ],
        [ 'backgroundColor', ' > .op3-background-parent > [data-op3-background="overlay"]::before,  > .op3-background-parent > [data-op3-background="overlay"]::after', null, ' > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::before, > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::after' ],
        [ 'borderTopWidth', ' > .op3-column-content > [data-op3-background]', null, ' > .op3-column-content > [data-op3-element-container], > .op3-column-content > [data-op3-element-container] > [data-op3-border] > [data-op3-background]' ],
        [ 'borderTopStyle', ' > .op3-column-content > [data-op3-background]', null, ' > .op3-column-content > [data-op3-element-container], > .op3-column-content > [data-op3-element-container] > [data-op3-border] > [data-op3-background]' ],
        [ 'borderTopColor', ' > .op3-column-content > [data-op3-background]', null, ' > .op3-column-content > [data-op3-element-container], > .op3-column-content > [data-op3-element-container] > [data-op3-border] > [data-op3-background]' ],
        [ 'borderBottomWidth', ' > .op3-column-content > [data-op3-background]', null, ' > .op3-column-content > [data-op3-element-container], > .op3-column-content > [data-op3-element-container] > [data-op3-border] > [data-op3-background]' ],
        [ 'borderBottomStyle', ' > .op3-column-content > [data-op3-background]', null, ' > .op3-column-content > [data-op3-element-container], > .op3-column-content > [data-op3-element-container] > [data-op3-border] > [data-op3-background]' ],
        [ 'borderBottomColor', ' > .op3-column-content > [data-op3-background]', null, ' > .op3-column-content > [data-op3-element-container], > .op3-column-content > [data-op3-element-container] > [data-op3-border] > [data-op3-background]' ],
        [ 'borderLeftWidth', ' > .op3-column-content > [data-op3-background]', null, ' > .op3-column-content > [data-op3-element-container], > .op3-column-content > [data-op3-element-container] > [data-op3-border] > [data-op3-background]' ],
        [ 'borderLeftStyle', ' > .op3-column-content > [data-op3-background]', null, ' > .op3-column-content > [data-op3-element-container], > .op3-column-content > [data-op3-element-container] > [data-op3-border] > [data-op3-background]' ],
        [ 'borderLeftColor', ' > .op3-column-content > [data-op3-background]', null, ' > .op3-column-content > [data-op3-element-container], > .op3-column-content > [data-op3-element-container] > [data-op3-border] > [data-op3-background]' ],
        [ 'borderRightWidth', ' > .op3-column-content > [data-op3-background]', null, ' > .op3-column-content > [data-op3-element-container], > .op3-column-content > [data-op3-element-container] > [data-op3-border] > [data-op3-background]' ],
        [ 'borderRightStyle', ' > .op3-column-content > [data-op3-background]', null, ' > .op3-column-content > [data-op3-element-container], > .op3-column-content > [data-op3-element-container] > [data-op3-border] > [data-op3-background]' ],
        [ 'borderRightColor', ' > .op3-column-content > [data-op3-background]', null, ' > .op3-column-content > [data-op3-element-container], > .op3-column-content > [data-op3-element-container] > [data-op3-border] > [data-op3-background]' ],
        [ 'borderTopLeftRadius', ' > .op3-column-content, > .op3-column-content > [data-op3-background]', null, ' > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderTopRightRadius', ' > .op3-column-content, > .op3-column-content > [data-op3-background]', null, ' > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderBottomLeftRadius', ' > .op3-column-content, > .op3-column-content > [data-op3-background]', null, ' > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderBottomRightRadius', ' > .op3-column-content, > .op3-column-content > [data-op3-background]', null, ' > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'boxShadow', ' > .op3-column-content', null, ' > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'columnGap', ' > .op3-column-content > [data-op3-children]', null, ' > .op3-column-content > [data-op3-element-container] > [data-op3-children]' ],
        [ 'transitionDuration', '', null, ', > .op3-background-parent > [data-op3-element-container], > .op3-background-parent > [data-op3-element-container] > [data-op3-border], > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background]' ],
        [ 'backgroundImage', ' > .op3-background-parent > [data-op3-background][data-op3-background="base"]::after', null, ' > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background][data-op3-background="base"]::after' ],
        [ 'backgroundColor', ' > .op3-background-parent > [data-op3-background][data-op3-background="base"]::after', null, ' > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background][data-op3-background="base"]::after' ],
        [ 'backgroundImage', ':hover .op3-background-parent > [data-op3-background="image"]', null, ':hover .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' ],
        [ 'opacity', ':hover .op3-background-parent > [data-op3-background="image"]', null, ':hover .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' ],
        [ 'backgroundPosition', ':hover .op3-background-parent > [data-op3-background="image"]', null, ':hover .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' ],
        [ 'backgroundAttachment', ':hover .op3-background-parent > [data-op3-background="image"]', null, ':hover .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' ],
        [ 'backgroundRepeat', ':hover .op3-background-parent > [data-op3-background="image"]', null, ':hover .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' ],
        [ 'backgroundSize', ':hover .op3-background-parent > [data-op3-background="image"]', null, ':hover .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' ],
        [ 'backgroundImage', ' > .op3-background-parent > [data-op3-background][data-op3-background="overlay"]::after', null, ' > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background][data-op3-background="overlay"]::after' ],
        [ 'backgroundColor', ' > .op3-background-parent > [data-op3-background][data-op3-background="overlay"]::after', null, ' > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background][data-op3-background="overlay"]::after' ],
        [ 'borderTopWidth', ':hover > .op3-column-content > [data-op3-background]', null, ':hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderTopStyle', ':hover > .op3-column-content > [data-op3-background]', null, ':hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderTopColor', ':hover > .op3-column-content > [data-op3-background]', null, ':hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderBottomWidth', ':hover > .op3-column-content > [data-op3-background]', null, ':hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderBottomStyle', ':hover > .op3-column-content > [data-op3-background]', null, ':hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderBottomColor', ':hover > .op3-column-content > [data-op3-background]', null, ':hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderLeftWidth', ':hover > .op3-column-content > [data-op3-background]', null, ':hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderLeftStyle', ':hover > .op3-column-content > [data-op3-background]', null, ':hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderLeftColor', ':hover > .op3-column-content > [data-op3-background]', null, ':hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderRightWidth', ':hover > .op3-column-content > [data-op3-background]', null, ':hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderRightStyle', ':hover > .op3-column-content > [data-op3-background]', null, ':hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderRightColor', ':hover > .op3-column-content > [data-op3-background]', null, ':hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderTopLeftRadius', ':hover > .op3-column-content,:hover > .op3-column-content > [data-op3-background]', null, ':hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderTopRightRadius', ':hover > .op3-column-content,:hover > .op3-column-content > [data-op3-background]', null, ':hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderBottomLeftRadius', ':hover > .op3-column-content,:hover > .op3-column-content > [data-op3-background]', null, ':hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderBottomRightRadius', ':hover > .op3-column-content,:hover > .op3-column-content > [data-op3-background]', null, ':hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'boxShadow', ':hover > .op3-column-content', null, ':hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
    ];

    /**
     * Overriding abstract method.
     * Remove <img> element (if not necessary)
     * to prevent extra frontend requests
     *
     * @param  string $html
     * @return string
     */
    public function afterRender($html)
    {
        if (!op3_is_admin()) {
            // removed video and map backgrounds on frontend for now, as it is not used
            $html = str_replace('<div data-op3-background="video"></div>', '', $html);
            $html = str_replace('<div data-op3-background="map"></div>', '', $html);
        }

        return $html;
    }
}
