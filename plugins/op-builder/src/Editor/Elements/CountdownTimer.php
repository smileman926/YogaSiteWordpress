<?php

namespace OPBuilder\Editor\Elements;

class CountdownTimer extends OPElement implements OPElementInterface
{
    protected $selectorChanges = [
        [ 'digitsFontWeight', ' .wrapper', 'fontWeight', ' .wrapper' ],
    ];
}
