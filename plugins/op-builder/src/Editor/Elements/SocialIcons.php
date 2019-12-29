<?php

namespace OPBuilder\Editor\Elements;

class SocialIcons extends OPElement implements OPElementInterface
{
    protected $selectorChanges = [
        [ 'marginLeft', ' [data-op3-children] > [data-op3-element-type="icon"]', null, ' [data-op3-element-type="icon"]' ],
        [ 'marginRight', ' [data-op3-children] > [data-op3-element-type="icon"]', null, ' [data-op3-element-type="icon"]' ],
        [ 'fontSize', ' .op3-element[data-op3-element-spec="icon"] .op3-icon', null, ' .op3-element[data-op3-element-type="icon"] .op3-icon' ],
        [ 'lineHeight', ' .op3-element[data-op3-element-spec="icon"] .op3-icon', null, ' .op3-element[data-op3-element-type="icon"] .op3-icon' ],
        [ 'padding', ' .op3-element[data-op3-element-spec="icon"] .op3-icon-container', null, ' .op3-element[data-op3-element-type="icon"] .op3-icon-container' ],
        [ 'borderTopWidth', ' .op3-element[data-op3-element-spec="icon"] .op3-icon-container', null, ' .op3-element[data-op3-element-type="icon"] .op3-icon-container' ],
        [ 'borderBottomWidth', ' .op3-element[data-op3-element-spec="icon"] .op3-icon-container', null, ' .op3-element[data-op3-element-type="icon"] .op3-icon-container' ],
        [ 'borderLeftWidth', ' .op3-element[data-op3-element-spec="icon"] .op3-icon-container', null, ' .op3-element[data-op3-element-type="icon"] .op3-icon-container' ],
        [ 'borderRightWidth', ' .op3-element[data-op3-element-spec="icon"] .op3-icon-container', null, ' .op3-element[data-op3-element-type="icon"] .op3-icon-container' ],
        [ 'color', ' .op3-element[data-op3-element-spec="icon"] .op3-icon-container', null, ' .op3-element[data-op3-element-type="icon"] .op3-icon-container' ],
        [ 'backgroundColor', ' .op3-element[data-op3-element-spec="icon"] .op3-icon-container', null, ' .op3-element[data-op3-element-type="icon"] .op3-icon-container' ],
        [ 'borderColor', ' .op3-element[data-op3-element-spec="icon"] .op3-icon-container', null, ' .op3-element[data-op3-element-type="icon"] .op3-icon-container' ],
        [ 'marginTop', ' .op3-element[data-op3-element-spec="icon"]', null, ' .op3-element[data-op3-element-type="icon"]' ],
        [ 'marginBottom', ' .op3-element[data-op3-element-spec="icon"]', null, ' .op3-element[data-op3-element-type="icon"]' ],
        [ 'marginLeft', ' .op3-element[data-op3-element-spec="icon"]', null, ' .op3-element[data-op3-element-type="icon"]' ],
        [ 'marginRight', ' .op3-element[data-op3-element-spec="icon"]', null, ' .op3-element[data-op3-element-type="icon"]' ],
        [ 'paddingTop', ' .op3-element[data-op3-element-spec="icon"]', null, ' .op3-element[data-op3-element-type="icon"]' ],
        [ 'paddingBottom', ' .op3-element[data-op3-element-spec="icon"]', null, ' .op3-element[data-op3-element-type="icon"]' ],
        [ 'paddingLeft', ' .op3-element[data-op3-element-spec="icon"]', null, ' .op3-element[data-op3-element-type="icon"]' ],
        [ 'paddingRight', ' .op3-element[data-op3-element-spec="icon"]', null, ' .op3-element[data-op3-element-type="icon"]' ],
        [ 'display', ' .op3-element[data-op3-element-spec="icon"]', null, ' .op3-element[data-op3-element-type="icon"]' ],
        [ 'transitionDuration', ' .op3-element[data-op3-element-spec="icon"] .op3-icon-container, .op3-element[data-op3-element-type="icon"] .op3-icon', null, ' .op3-element[data-op3-element-type="icon"] .op3-icon-container, .op3-element[data-op3-element-type="icon"] .op3-icon' ],
        [ 'color', ' .op3-element[data-op3-element-spec="icon"]:hover .op3-icon', null, ' .op3-element[data-op3-element-type="icon"]:hover .op3-icon' ],
        [ 'backgroundColor', ' .op3-element[data-op3-element-spec="icon"]:hover .op3-icon-container', null, ' .op3-element[data-op3-element-type="icon"]:hover .op3-icon-container' ],
        [ 'borderColor', ' .op3-element[data-op3-element-spec="icon"]:hover .op3-icon-container', null, ' .op3-element[data-op3-element-type="icon"]:hover .op3-icon-container' ],
    ];
}
