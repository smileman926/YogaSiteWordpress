<?php

return [

    /**
     * WordPress hook that should trigger the render
     */
    'hook' => 'op_body',

    /**
     * Priority in which the hook will be triggered
     */
    'hookPriority' => 999999,

    /**
     * Property selector.
     * Must be same as selector defined
     * in property constructor.
     */
    'selector' => 'op3-body-js',

    /**
     * Full path to the class that handles the render
     * If it's left blank we simply use base property render class
     * \OPBuilder\Editor\Render\SimpleRender::class,
     */
    'renderClass' => \OPBuilder\Editor\Render\CustomJsRender::class,

];
