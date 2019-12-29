<?php

namespace OPBuilder\Editor\Elements;

class Row extends OPElement implements OPElementInterface
{
    protected $selectorChanges = [
        [ 'borderTopWidth', '', null, ' > [data-op3-background]' ],
        [ 'borderTopStyle', '', null, ' > [data-op3-background]' ],
        [ 'borderTopColor', '', null, ' > [data-op3-background]' ],
        [ 'borderBottomWidth', '', null, ' > [data-op3-background]' ],
        [ 'borderBottomStyle', '', null, ' > [data-op3-background]' ],
        [ 'borderBottomColor', '', null, ' > [data-op3-background]' ],
        [ 'borderLeftWidth', '', null, ' > [data-op3-background]' ],
        [ 'borderLeftStyle', '', null, ' > [data-op3-background]' ],
        [ 'borderLeftColor', '', null, ' > [data-op3-background]' ],
        [ 'borderRightWidth', '', null, ' > [data-op3-background]' ],
        [ 'borderRightStyle', '', null, ' > [data-op3-background]' ],
        [ 'borderRightColor', '', null, ' > [data-op3-background]' ],
        // [ 'borderTopLeftRadius', ', > [data-op3-background]', null, ' > [data-op3-background]' ],
        // [ 'borderTopRightRadius', ', > [data-op3-background]', null, ' > [data-op3-background]' ],
        // [ 'borderBottomLeftRadius', ', > [data-op3-background]', null, ' > [data-op3-background]' ],
        // [ 'borderBottomRightRadius', ', > [data-op3-background]', null, ' > [data-op3-background]' ],

        [ 'borderTopWidth', ':hover', null, ':hover > [data-op3-background]' ],
        [ 'borderTopStyle', ':hover', null, ':hover > [data-op3-background]' ],
        [ 'borderTopColor', ':hover', null, ':hover > [data-op3-background]' ],
        [ 'borderBottomWidth', ':hover', null, ':hover > [data-op3-background]' ],
        [ 'borderBottomStyle', ':hover', null, ':hover > [data-op3-background]' ],
        [ 'borderBottomColor', ':hover', null, ':hover > [data-op3-background]' ],
        [ 'borderLeftWidth', ':hover', null, ':hover > [data-op3-background]' ],
        [ 'borderLeftStyle', ':hover', null, ':hover > [data-op3-background]' ],
        [ 'borderLeftColor', ':hover', null, ':hover > [data-op3-background]' ],
        [ 'borderRightWidth', ':hover', null, ':hover > [data-op3-background]' ],
        [ 'borderRightStyle', ':hover', null, ':hover > [data-op3-background]' ],
        [ 'borderRightColor', ':hover', null, ':hover > [data-op3-background]' ],
        [ 'borderTopLeftRadius', ':hover, :hover > [data-op3-background]', null, ':hover,:hover > [data-op3-background]' ],
        [ 'borderTopRightRadius', ':hover, :hover > [data-op3-background]', null, ':hover,:hover > [data-op3-background]' ],
        [ 'borderBottomLeftRadius', ':hover, :hover > [data-op3-background]', null, ':hover,:hover > [data-op3-background]' ],
        [ 'borderBottomRightRadius', ':hover, :hover > [data-op3-background]', null, ':hover,:hover > [data-op3-background]' ],

        // New-new border
        [ 'backgroundImage', ' > [data-op3-background="base"]::before, > [data-op3-background="base"]::after', null, ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before, > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after' ],
        [ 'backgroundColor', ' > [data-op3-background="base"]::before, > [data-op3-background="base"]::after', null, ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before, > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after' ],
        [ 'backgroundImage', ' > [data-op3-background="image"]', null, ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' ],
        [ 'display', ' > [data-op3-background="image"]', null, ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' ],
        [ 'opacity', ' > [data-op3-background="image"]', null, ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' ],
        [ 'backgroundPosition', ' > [data-op3-background="image"]', null, ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' ],
        [ 'backgroundAttachment', ' > [data-op3-background="image"]', null, ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' ],
        [ 'backgroundRepeat', ' > [data-op3-background="image"]', null, ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' ],
        [ 'backgroundSize', ' > [data-op3-background="image"]', null, ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' ],
        [ 'backgroundVideo', ' > [data-op3-background="video"]', null, ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="video"]' ],
        [ 'display', ' > [data-op3-background="video"]', null, ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="video"]' ],
        [ 'backgroundMap', ' > [data-op3-background="map"]', null, ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="map"]' ],
        [ 'display', ' > [data-op3-background="map"]', null, ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="map"]' ],
        [ 'backgroundImage', ' > [data-op3-background="overlay"]::before, > [data-op3-background="overlay"]::after', null, ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::before, > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::after' ],
        [ 'backgroundColor', ' > [data-op3-background="overlay"]::before, > [data-op3-background="overlay"]::after', null, ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::before, > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::after' ],
        [ 'borderTopWidth', ' > [data-op3-background]', null, ' > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderTopStyle', ' > [data-op3-background]', null, ' > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderTopColor', ' > [data-op3-background]', null, ' > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderBottomWidth', ' > [data-op3-background]', null, ' > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderBottomStyle', ' > [data-op3-background]', null, ' > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderBottomColor', ' > [data-op3-background]', null, ' > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderLeftWidth', ' > [data-op3-background]', null, ' > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderLeftStyle', ' > [data-op3-background]', null, ' > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderLeftColor', ' > [data-op3-background]', null, ' > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderRightWidth', ' > [data-op3-background]', null, ' > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderRightStyle', ' > [data-op3-background]', null, ' > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderRightColor', ' > [data-op3-background]', null, ' > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderTopLeftRadius', ', > [data-op3-background]', null, ' > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderTopRightRadius', ', > [data-op3-background]', null, ' > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderBottomLeftRadius', ', > [data-op3-background]', null, ' > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderBottomRightRadius', ', > [data-op3-background]', null, ' > [data-op3-element-container] > [data-op3-border]' ],
        [ 'boxShadow', '', null, ' > [data-op3-element-container] > [data-op3-border]' ],
        [ 'flexBasis', ' > [data-op3-children] > [data-op3-element-type="column"]', null, ' > [data-op3-element-container] > [data-op3-children] > [data-op3-element-type="column"]' ],
        [ 'marginLeft', ' > [data-op3-children] > [data-op3-element-type="column"] > .op3-column-content', null, ' > [data-op3-element-container] > [data-op3-children] > [data-op3-element-type="column"] > .op3-column-content' ],
        [ 'marginRight', ' > [data-op3-children] > [data-op3-element-type="column"] > .op3-column-content', null, ' > [data-op3-element-container] > [data-op3-children] > [data-op3-element-type="column"] > .op3-column-content' ],
        [ 'marginLeft', ' > [data-op3-children]', null, ' > [data-op3-element-container] > [data-op3-children]' ],
        [ 'marginRight', ' > [data-op3-children]', null, ' > [data-op3-element-container] > [data-op3-children]' ],
        [ 'backgroundImage', ' > [data-op3-background][data-op3-background="base"]::after', null, ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background][data-op3-background="base"]::after' ],
        [ 'backgroundColor', ' > [data-op3-background][data-op3-background="base"]::after', null, ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background][data-op3-background="base"]::after' ],
        [ 'backgroundImage', ':hover > [data-op3-background="image"]', null, ':hover > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' ],
        [ 'opacity', ':hover > [data-op3-background="image"]', null, ':hover > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' ],
        [ 'backgroundPosition', ':hover > [data-op3-background="image"]', null, ':hover > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' ],
        [ 'backgroundAttachment', ':hover > [data-op3-background="image"]', null, ':hover > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' ],
        [ 'backgroundRepeat', ':hover > [data-op3-background="image"]', null, ':hover > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' ],
        [ 'backgroundSize', ':hover > [data-op3-background="image"]', null, ':hover > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' ],
        [ 'backgroundImage', ' > [data-op3-background][data-op3-background="overlay"]::after', null, ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background][data-op3-background="overlay"]::after' ],
        [ 'backgroundColor', ' > [data-op3-background][data-op3-background="overlay"]::after', null, ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background][data-op3-background="overlay"]::after' ],
        [ 'borderTopWidth', ':hover > [data-op3-background]', null, ':hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderTopStyle', ':hover > [data-op3-background]', null, ':hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderTopColor', ':hover > [data-op3-background]', null, ':hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderBottomWidth', ':hover > [data-op3-background]', null, ':hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderBottomStyle', ':hover > [data-op3-background]', null, ':hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderBottomColor', ':hover > [data-op3-background]', null, ':hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderLeftWidth', ':hover > [data-op3-background]', null, ':hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderLeftStyle', ':hover > [data-op3-background]', null, ':hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderLeftColor', ':hover > [data-op3-background]', null, ':hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderRightWidth', ':hover > [data-op3-background]', null, ':hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderRightStyle', ':hover > [data-op3-background]', null, ':hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderRightColor', ':hover > [data-op3-background]', null, ':hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderAllWidth', ':hover > [data-op3-background]', null, '' ],
        [ 'borderAllStyle', ':hover > [data-op3-background]', null, '' ],
        [ 'borderAllColor', ':hover > [data-op3-background]', null, '' ],
        [ 'borderTopLeftRadius', ':hover,:hover > [data-op3-background]', null, ':hover > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderTopRightRadius', ':hover,:hover > [data-op3-background]', null, ':hover > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderBottomLeftRadius', ':hover,:hover > [data-op3-background]', null, ':hover > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderBottomRightRadius', ':hover,:hover > [data-op3-background]', null, ':hover > [data-op3-element-container] > [data-op3-border]' ],
        [ 'boxShadow', ':hover', null, ':hover > [data-op3-element-container] > [data-op3-border]' ],
        [ 'wrapColumns', ' > [data-op3-children]', null, ' > [data-op3-element-container] > [data-op3-children]' ],
        [ 'stackColumnsTablet', ' > [data-op3-children]', null, ' > [data-op3-element-container] > [data-op3-children]' ],
        [ 'stackColumnsTabletReverse', ' > [data-op3-children]', null, ' > [data-op3-element-container] > [data-op3-children]' ],
        [ 'stackColumnsMobile', ' > [data-op3-children]', null, ' > [data-op3-element-container] > [data-op3-children]' ],
        [ 'stackColumnsMobileReverse', ' > [data-op3-children]', null, ' > [data-op3-element-container] > [data-op3-children]' ],
    ];

    /**
     * Overriding abstract method.
     * Remove obsolete or empty divs on frontend
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
