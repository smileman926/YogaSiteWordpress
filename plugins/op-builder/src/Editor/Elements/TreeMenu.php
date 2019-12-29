<?php

namespace OPBuilder\Editor\Elements;

class TreeMenu extends OPElement implements OPElementInterface
{
    protected $selectorChanges = [
        [ 'width', ' .op3-treemenu-content > [data-op3-children], .op3-hamburger-close', 'none', ' .op3-treemenu-content > [data-op3-children]' ],
    ];
}
