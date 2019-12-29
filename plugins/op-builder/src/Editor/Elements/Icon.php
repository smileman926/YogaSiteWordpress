<?php

namespace OPBuilder\Editor\Elements;

class Icon extends OPElement implements OPElementInterface
{
    protected $selectorChanges = [
        [ 'op3Icon', ' > .op3-icon-container > i', null, ' .op3-icon, .op3-icon-container' ],
        [ 'fontSize', ' > .op3-icon-container > i', null, ' .op3-icon' ],
        [ 'lineHeight', ' > .op3-icon-container > i', null, ' .op3-icon' ],
        [ 'iconFrame', ' > .op3-icon-container', null, ' .op3-icon-container' ],
        [ 'iconShape', ' > .op3-icon-container', null, ' .op3-icon-container' ],
        [ 'padding', ' > .op3-icon-container', null, ' .op3-icon-container' ],
        [ 'borderTopWidth', ' > .op3-icon-container', null, ' .op3-icon-container' ],
        [ 'borderBottomWidth', ' > .op3-icon-container', null, ' .op3-icon-container' ],
        [ 'borderLeftWidth', ' > .op3-icon-container', null, ' .op3-icon-container' ],
        [ 'borderRightWidth', ' > .op3-icon-container', null, ' .op3-icon-container' ],
        [ 'color', ' > .op3-icon-container', null, ' .op3-icon-container' ],
        [ 'backgroundColor', ' > .op3-icon-container', null, ' .op3-icon-container' ],
        [ 'borderColor', ' > .op3-icon-container', null, ' .op3-icon-container' ],
        [ 'transitionDuration', ' > .op3-icon-container, > .op3-icon-container > i', null, ' .op3-icon, .op3-icon-container' ],
        [ 'color', ':hover > .op3-icon-container > i', null, ':hover .op3-icon' ],
        [ 'backgroundColor', ':hover > .op3-icon-container', null, ':hover .op3-icon-container' ],
        [ 'borderColor', ':hover > .op3-icon-container', null, ':hover .op3-icon-container' ],
    ];
}
