/**
 * OptimizePress3 element.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-elements.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.Cursor = OP3.defineClass({

        Name: "OP3.Property.Cursor",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "cursor",

            _defaults: {
                label: function() {
                    return OP3._("Cursor");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select2",
                },
                options: [
                    { "auto": "auto" },
                    { "default": "default" },
                    { "none": "none" },
                    { "context-menu": "context-menu" },
                    { "help": "help" },
                    { "pointer": "pointer" },
                    { "progress": "progress" },
                    { "wait": "wait" },
                    { "cell": "cell" },
                    { "crosshair": "crosshair" },
                    { "text": "text" },
                    { "vertical-text": "vertical-text" },
                    { "alias": "alias" },
                    { "copy": "copy" },
                    { "move": "move" },
                    { "no-drop": "no-drop" },
                    { "not-allowed": "not-allowed" },
                    { "all-scroll": "all-scroll" },
                    { "col-resize": "col-resize" },
                    { "row-resize": "row-resize" },
                    { "n-resize": "n-resize" },
                    { "e-resize": "e-resize" },
                    { "s-resize": "s-resize" },
                    { "w-resize": "w-resize" },
                    { "ne-resize": "ne-resize" },
                    { "nw-resize": "nw-resize" },
                    { "se-resize": "se-resize" },
                    { "sw-resize": "sw-resize" },
                    { "ew-resize": "ew-resize" },
                    { "ns-resize": "ns-resize" },
                    { "nesw-resize": "nesw-resize" },
                    { "nwse-resize": "nwse-resize" },
                    { "zoom-in": "zoom-in" },
                    { "zoom-out": "zoom-out" },
                    { "grab": "grab" },
                    { "grabbing": "grabbing" },
                ],
            },

        },

    });

})(jQuery, window, document);
