<?php

namespace OPBuilder\Editor\Elements;

class TreeMenuItem extends OPElement implements OPElementInterface
{
    protected $selectorChanges = [
        [ 'transform', ' > .op3-treemenuitem-content > .op3-treemenuitem-children-content', 'none', ' > .op3-treemenuitem-content > .op3-treemenuitem-children-content' ],
    ];
}
