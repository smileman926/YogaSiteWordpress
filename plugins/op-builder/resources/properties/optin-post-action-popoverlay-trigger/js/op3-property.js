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
    OP3.Elements._extension.prop.OptinPostActionPopOverlayTrigger = OP3.defineClass({

        Name: "OP3.Property.OptinPostActionPopOverlayTrigger",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "optinPostActionPopOverlayTrigger",

            _defaults: {
                label: function() {
                    return OP3._("PopOverlay Trigger");
                },
                selector: ' [name="optin-post-action-popoverlay-trigger"]',
                tag: "select",
                attr: {
                    "data-property-type": "select2",
                },
                options: [
                ],
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).val() || "none";
            },

            setter: function(value, media) {
                $(this.target()).val(value);
            },

        },

    });

})(jQuery, window, document);
