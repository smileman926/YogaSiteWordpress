<?php

namespace OPBuilder\Editor\Elements;

class Testimonial extends OPElement implements OPElementInterface
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

        // Link properties
        [ 'borderTopWidth', ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content', null, ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-background]' ],
        [ 'borderTopStyle', ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content', null, ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-background]' ],
        [ 'borderTopColor', ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content', null, ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-background]' ],
        [ 'borderBottomWidth', ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content', null, ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-background]' ],
        [ 'borderBottomStyle', ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content', null, ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-background]' ],
        [ 'borderBottomColor', ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content', null, ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-background]' ],
        [ 'borderLeftWidth', ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content', null, ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-background]' ],
        [ 'borderLeftStyle', ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content', null, ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-background]' ],
        [ 'borderLeftColor', ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content', null, ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-background]' ],
        [ 'borderRightWidth', ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content', null, ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-background]' ],
        [ 'borderRightStyle', ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content', null, ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-background]' ],
        [ 'borderRightColor', ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content', null, ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-background]' ],
        [ 'borderTopLeftRadius', ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content, .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-background]', null, ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content, .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-background]' ],
        [ 'borderTopRightRadius', ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content, .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-background]', null, ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content, .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-background]' ],
        [ 'borderBottomLeftRadius', ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content, .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-background]', null, ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content, .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-background]' ],
        [ 'borderBottomRightRadius', ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content, .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-background]', null, ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content, .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-background]' ],

        [ 'borderTopWidth', ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content', null, ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-background]' ],
        [ 'borderTopStyle', ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content', null, ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-background]' ],
        [ 'borderTopColor', ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content', null, ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-background]' ],
        [ 'borderBottomWidth', ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content', null, ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-background]' ],
        [ 'borderBottomStyle', ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content', null, ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-background]' ],
        [ 'borderBottomColor', ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content', null, ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-background]' ],
        [ 'borderLeftWidth', ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content', null, ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-background]' ],
        [ 'borderLeftStyle', ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content', null, ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-background]' ],
        [ 'borderLeftColor', ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content', null, ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-background]' ],
        [ 'borderRightWidth', ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content', null, ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-background]' ],
        [ 'borderRightStyle', ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content', null, ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-background]' ],
        [ 'borderRightColor', ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content', null, ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-background]' ],
        [ 'borderTopLeftRadius', ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content, .op3-element[data-op3-element-type="testimonialitem"] :hover > .op3-background-parent > [data-op3-background]', null, ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content, .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-background]' ],
        [ 'borderTopRightRadius', ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content, .op3-element[data-op3-element-type="testimonialitem"] :hover > .op3-background-parent > [data-op3-background]', null, ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content, .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-background]' ],
        [ 'borderBottomLeftRadius', ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content, .op3-element[data-op3-element-type="testimonialitem"] :hover > .op3-background-parent > [data-op3-background]', null, ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content, .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-background]' ],
        [ 'borderBottomRightRadius', ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content, .op3-element[data-op3-element-type="testimonialitem"] :hover > .op3-background-parent > [data-op3-background]', null, ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content, .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-background]' ],

        // Link properties - text
        [ 'backgroundColor', ' .op3-element[data-op3-element-spec="text"]', null, ' .op3-element[data-op3-element-spec="text"] .op3-text-wrapper' ],
        // Link properties - author
        [ 'backgroundColor', ' .op3-element[data-op3-element-spec="author"]', null, ' .op3-element[data-op3-element-spec="author"] .op3-text-wrapper' ],
        // Link properties - company
        [ 'backgroundColor', ' .op3-element[data-op3-element-spec="company"]', null, ' .op3-element[data-op3-element-spec="company"] .op3-text-wrapper' ],
        // Link properties - title
        [ 'backgroundColor', ' .op3-element[data-op3-element-spec="title"]', null, ' .op3-element[data-op3-element-spec="title"] .op3-headline-wrapper' ] ,

        // New-new border
        [ 'blockDisplayTitle', ' > [data-op3-children]', null, ' > [data-op3-element-container] > [data-op3-children]' ],
        [ 'blockDisplayAvatar', ' > [data-op3-children]', null, ' > [data-op3-element-container] > [data-op3-children]' ],
        [ 'blockDisplayAuthor', ' > [data-op3-children]', null, ' > [data-op3-element-container] > [data-op3-children]' ],
        [ 'blockDisplayCompany', ' > [data-op3-children]', null, ' > [data-op3-element-container] > [data-op3-children]' ],
        [ 'blockDisplayLogo', ' > [data-op3-children]', null, ' > [data-op3-element-container] > [data-op3-children]' ],
        [ 'blockLayout', ' > [data-op3-children]', null, ' > [data-op3-element-container] > [data-op3-children]' ],
        [ 'backgroundImage', ' > [data-op3-background="base"]::before, > [data-op3-background="base"]::after', null, ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before, > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after' ],
        [ 'backgroundColor', ' > [data-op3-background="base"]::before, > [data-op3-background="base"]::after', null, ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before, > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after' ],
        [ 'backgroundImage', ' > [data-op3-background="image"]', null, ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' ],
        [ 'display', ' > [data-op3-background="image"]', null, ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' ],
        [ 'opacity', ' > [data-op3-background="image"]', null, ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' ],
        [ 'backgroundPosition', ' > [data-op3-background="image"]', null, ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' ],
        [ 'backgroundAttachment', ' > [data-op3-background="image"]', null, ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' ],
        [ 'backgroundRepeat', ' > [data-op3-background="image"]', null, ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' ],
        [ 'backgroundSize', ' > [data-op3-background="image"]', null, ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' ],
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
        [ 'wrapColumns', ' > [data-op3-children]', null, ' > [data-op3-element-container] > [data-op3-children]' ],
        [ 'flexBasis', ' > [data-op3-children] > [data-op3-element-type="testimonialitem"]', null, ' > [data-op3-element-container] > [data-op3-children] > [data-op3-element-type="testimonialitem"]' ],
        [ 'flexBasisSteps', ' > [data-op3-children] > [data-op3-element-type="testimonialitem"]', null, ' > [data-op3-element-container] > [data-op3-children] > [data-op3-element-type="testimonialitem"]' ],
        [ 'stackColumnsTablet', ' > [data-op3-children]', null, ' > [data-op3-element-container] > [data-op3-children]' ],
        [ 'stackColumnsTabletReverse', ' > [data-op3-children]', null, ' > [data-op3-element-container] > [data-op3-children]' ],
        [ 'stackColumnsMobile', ' > [data-op3-children]', null, ' > [data-op3-element-container] > [data-op3-children]' ],
        [ 'stackColumnsMobileReverse', ' > [data-op3-children]', null, ' > [data-op3-element-container] > [data-op3-children]' ],
        [ 'marginLeft', ' > [data-op3-children] > [data-op3-element-type="testimonialitem"] > .op3-column-content', null, ' > [data-op3-element-container] > [data-op3-children] > [data-op3-element-type="testimonialitem"] > .op3-column-content' ],
        [ 'marginRight', ' > [data-op3-children] > [data-op3-element-type="testimonialitem"] > .op3-column-content', null, ' > [data-op3-element-container] > [data-op3-children] > [data-op3-element-type="testimonialitem"] > .op3-column-content' ],
        [ 'marginLeft', ' > [data-op3-children]', null, ' > [data-op3-element-container] > [data-op3-children]' ],
        [ 'marginRight', ' > [data-op3-children]', null, ' > [data-op3-element-container] > [data-op3-children]' ],
        [ 'transitionDuration', '', null, ', > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border], > [data-op3-element-container] > [data-op3-border] > [data-op3-background]' ],
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
        [ 'borderTopLeftRadius', ':hover,:hover > [data-op3-background]', null, ':hover > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderTopRightRadius', ':hover,:hover > [data-op3-background]', null, ':hover > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderBottomLeftRadius', ':hover,:hover > [data-op3-background]', null, ':hover > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderBottomRightRadius', ':hover,:hover > [data-op3-background]', null, ':hover > [data-op3-element-container] > [data-op3-border]' ],
        [ 'boxShadow', ':hover', null, ':hover > [data-op3-element-container] > [data-op3-border]' ],
        [ 'backgroundImage', ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-background="base"]::before, .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-background="base"]::after', null, ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before, .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after' ],
        [ 'backgroundColor', ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-background="base"]::before, .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-background="base"]::after', null, ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before, .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after' ],
        [ 'backgroundImage', ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-background="image"]', null, ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' ],
        [ 'display', ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-background="image"]', null, ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' ],
        [ 'opacity', ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-background="image"]', null, ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' ],
        [ 'backgroundPosition', ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-background="image"]', null, ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' ],
        [ 'backgroundAttachment', ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-background="image"]', null, ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' ],
        [ 'backgroundRepeat', ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-background="image"]', null, ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' ],
        [ 'backgroundSize', ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-background="image"]', null, ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' ],
        [ 'backgroundImage', ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-background="overlay"]::before, .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-background="overlay"]::after', null, ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::before, .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::after' ],
        [ 'backgroundColor', ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-background="overlay"]::before, .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-background="overlay"]::after', null, ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::before, .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::after' ],
        [ 'borderTopWidth', ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-background]', null, ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderTopStyle', ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-background]', null, ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderTopColor', ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-background]', null, ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderBottomWidth', ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-background]', null, ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderBottomStyle', ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-background]', null, ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderBottomColor', ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-background]', null, ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderLeftWidth', ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-background]', null, ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderLeftStyle', ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-background]', null, ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderLeftColor', ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-background]', null, ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderRightWidth', ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-background]', null, ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderRightStyle', ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-background]', null, ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderRightColor', ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-background]', null, ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderTopLeftRadius', ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content, .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-background]', null, ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderTopRightRadius', ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content, .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-background]', null, ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderBottomLeftRadius', ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content, .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-background]', null, ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderBottomRightRadius', ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content, .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-background]', null, ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'boxShadow', ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content', null, ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'columnGap', ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-children]', null, ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-column-content > [data-op3-element-container] > [data-op3-children]' ],
        [ 'transitionDuration', ' .op3-element[data-op3-element-type="testimonialitem"]', null, ' .op3-element[data-op3-element-type="testimonialitem"], .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-element-container], .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border], .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background]' ],
        [ 'backgroundImage', ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-background][data-op3-background="base"]::after', null, ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background][data-op3-background="base"]::after' ],
        [ 'backgroundColor', ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-background][data-op3-background="base"]::after', null, ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background][data-op3-background="base"]::after' ],
        [ 'backgroundPosition', ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-background-parent > [data-op3-background="image"]', null, ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' ],
        [ 'backgroundImage', ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-background][data-op3-background="overlay"]::after', null, ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background][data-op3-background="overlay"]::after' ],
        [ 'backgroundColor', ' .op3-element[data-op3-element-type="testimonialitem"] > .op3-background-parent > [data-op3-background][data-op3-background="overlay"]::after', null, ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-background-parent > [data-op3-element-container] > [data-op3-border] > [data-op3-background][data-op3-background="overlay"]::after' ],
        [ 'borderTopWidth', ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-background]', null, ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderTopStyle', ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-background]', null, ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderTopColor', ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-background]', null, ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderBottomWidth', ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-background]', null, ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderBottomStyle', ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-background]', null, ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderBottomColor', ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-background]', null, ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderLeftWidth', ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-background]', null, ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderLeftStyle', ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-background]', null, ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderLeftColor', ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-background]', null, ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderRightWidth', ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-background]', null, ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderRightStyle', ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-background]', null, ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderRightColor', ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-background]', null, ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container], .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderTopLeftRadius', ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content, .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-background]', null, ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderTopRightRadius', ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content, .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-background]', null, ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderBottomLeftRadius', ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content, .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-background]', null, ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'borderBottomRightRadius', ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content, .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-background]', null, ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],
        [ 'boxShadow', ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content', null, ' .op3-element[data-op3-element-type="testimonialitem"]:hover > .op3-column-content > [data-op3-element-container] > [data-op3-border]' ],

        // New block layout
        [ 'blockLayout', ' > [data-op3-element-container] > [data-op3-children]', 'blockLayoutDesktop', ' > [data-op3-element-container] > [data-op3-children]' ],
        [ 'blockLayoutDesktop', '', 'blockLayoutDesktop', ' > [data-op3-element-container] > [data-op3-children]' ],
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
        if (!op3_is_admin() && $this->getFirstOptionValue('blockDisplayAvatar', 'all') !== '1') {
            $html = preg_replace('/(<div\s[^<]*spec="avatar".*?>[\s\S]*?)<img.*?>/', '$1', $html);;
        }
        if (!op3_is_admin() && $this->getFirstOptionValue('blockDisplayLogo', 'all') !== '1') {
            $html = preg_replace('/(<div\s[^<]*spec="logo".*?>[\s\S]*?)<img.*?>/', '$1', $html);;
        }

        if (!op3_is_admin()) {
            // removed video and map backgrounds on frontend for now, as it is not used
            $html = str_replace('<div data-op3-background="video"></div>', '', $html);
            $html = str_replace('<div data-op3-background="map"></div>', '', $html);
        }

        return $html;
    }
}
