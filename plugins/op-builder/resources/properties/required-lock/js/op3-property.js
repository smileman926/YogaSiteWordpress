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
    OP3.Elements._extension.prop.RequiredLock = OP3.defineClass({

        Name: "OP3.Property.RequiredLock",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "requiredLock",

            _defaults: {
                label: function() {
                    return OP3._("Required Lock");
                },
                options: [
                    { "0": "No" },
                    { "1": "Yes" },
                ],
                hidden: true,
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-property-required-lock")*1 ? "1" : "0";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-property-required-lock", value*1 ? "1" : "0");
            },

        },

    });

    // enable/disable lock
    // @todo - this doesn't belong here, entire
    //         form must be refactored, this
    //         property deleted and new property
    //         created (width serialize:false)
    //         which will check lock in
    //         OP3.Integrations
    OP3.bind("elementoptionssync::*::requiredLock", function(e, o) {
        var key = o.id.replace(/Lock$/, "");
        var $input = $(o.parent).find('.op3-element-options-property[data-op3-element-options-property-id="' + key + '"] input[type="checkbox"]');

        if (!!(o.value*1))
            $input.attr("disabled", "disabled");
        else
            $input.removeAttr("disabled");
    });

})(jQuery, window, document);
