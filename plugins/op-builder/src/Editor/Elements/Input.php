<?php

namespace OPBuilder\Editor\Elements;

class Input extends OPElement implements OPElementInterface
{
    protected $selectorChanges = [
            // [ 'borderTopLeftRadius', ' .op3-element-input-edit [data-op3-border]', null, ' .op3-element-input-edit' ],
            // [ 'borderTopRightRadius', ' .op3-element-input-edit [data-op3-border]', null, ' .op3-element-input-edit' ],
            // [ 'borderBottomLeftRadius', ' .op3-element-input-edit [data-op3-border]', null, ' .op3-element-input-edit' ],
            // [ 'borderBottomRightRadius', ' .op3-element-input-edit [data-op3-border]', null, ' .op3-element-input-edit' ],

            // New-new border
            [ 'borderTopWidth', ' .op3-element-input-edit [data-op3-border]', null, ' .op3-element-input-edit [data-op3-element-container], .op3-element-input-edit [data-op3-border]' ],
            [ 'borderTopStyle', ' .op3-element-input-edit [data-op3-border]', null, ' .op3-element-input-edit [data-op3-element-container], .op3-element-input-edit [data-op3-border]' ],
            [ 'borderTopColor', ' .op3-element-input-edit [data-op3-border]', null, ' .op3-element-input-edit [data-op3-element-container], .op3-element-input-edit [data-op3-border]' ],
            [ 'borderBottomWidth', ' .op3-element-input-edit [data-op3-border]', null, ' .op3-element-input-edit [data-op3-element-container], .op3-element-input-edit [data-op3-border]' ],
            [ 'borderBottomStyle', ' .op3-element-input-edit [data-op3-border]', null, ' .op3-element-input-edit [data-op3-element-container], .op3-element-input-edit [data-op3-border]' ],
            [ 'borderBottomColor', ' .op3-element-input-edit [data-op3-border]', null, ' .op3-element-input-edit [data-op3-element-container], .op3-element-input-edit [data-op3-border]' ],
            [ 'borderLeftWidth', ' .op3-element-input-edit [data-op3-border]', null, ' .op3-element-input-edit [data-op3-element-container], .op3-element-input-edit [data-op3-border]' ],
            [ 'borderLeftStyle', ' .op3-element-input-edit [data-op3-border]', null, ' .op3-element-input-edit [data-op3-element-container], .op3-element-input-edit [data-op3-border]' ],
            [ 'borderLeftColor', ' .op3-element-input-edit [data-op3-border]', null, ' .op3-element-input-edit [data-op3-element-container], .op3-element-input-edit [data-op3-border]' ],
            [ 'borderRightWidth', ' .op3-element-input-edit [data-op3-border]', null, ' .op3-element-input-edit [data-op3-element-container], .op3-element-input-edit [data-op3-border]' ],
            [ 'borderRightStyle', ' .op3-element-input-edit [data-op3-border]', null, ' .op3-element-input-edit [data-op3-element-container], .op3-element-input-edit [data-op3-border]' ],
            [ 'borderRightColor', ' .op3-element-input-edit [data-op3-border]', null, ' .op3-element-input-edit [data-op3-element-container], .op3-element-input-edit [data-op3-border]' ],
            [ 'borderTopLeftRadius', ' .op3-element-input-edit', null, ' .op3-element-input-edit [data-op3-border]' ],
            [ 'borderTopRightRadius', ' .op3-element-input-edit', null, ' .op3-element-input-edit [data-op3-border]' ],
            [ 'borderBottomLeftRadius', ' .op3-element-input-edit', null, ' .op3-element-input-edit [data-op3-border]' ],
            [ 'borderBottomRightRadius', ' .op3-element-input-edit', null, ' .op3-element-input-edit [data-op3-border]' ],

            // New-new border fix
            [ 'borderTopColor', ' .op3-element-input-edit [data-op3-element-container], .op3-element-input-edit [data-op3-border]', null, ' .op3-element-input-edit [data-op3-border]' ],
            [ 'borderBottomColor', ' .op3-element-input-edit [data-op3-element-container], .op3-element-input-edit [data-op3-border]', null, ' .op3-element-input-edit [data-op3-border]' ],
            [ 'borderLeftColor', ' .op3-element-input-edit [data-op3-element-container], .op3-element-input-edit [data-op3-border]', null, ' .op3-element-input-edit [data-op3-border]' ],
            [ 'borderRightColor', ' .op3-element-input-edit [data-op3-element-container], .op3-element-input-edit [data-op3-border]', null, ' .op3-element-input-edit [data-op3-border]' ],
    ];
}
