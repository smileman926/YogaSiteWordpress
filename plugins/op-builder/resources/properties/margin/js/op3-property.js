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
    OP3.Elements._extension.prop.Margin = OP3.defineClass({

        Name: "OP3.Property.Margin",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "margin",

            _defaults: {
                label: function() {
                    return OP3._("Margin");
                },
                attr: {
                    "data-property-type": "range",
                    "data-units": "px",
                    "data-min-px": "0",
                    "data-max-px": "250",
                    "data-step-px": "1",
                    "data-precision-px": "0",
                },
                keywords: [
                    "auto",
                ],
                units: [
                    "px",
                    "%",
                    "em",
                    "rem",
                ],
                defaultUnit: "px",
            },

            /**
             * Get computed value
             *
             * @return {String}
             */
            computed: function() {
                var result = "";
                try {
                    result = OP3.Elements._extension.prop.Default.prototype.computed.apply(this, arguments);
                }
                catch(e) {
                    // Shortcut properties are not computed, only
                    // the fundamental properties that they are
                    // based on. Don't query the margin property,
                    // for example, but use marginLeft, marginTop,
                    // and so on.
                }
                if (result)
                    return result;

                // fallback
                var parse = this._parseTarget(),
                    node = parse.node,
                    pseudo = parse.pseudo,
                    doc = node.ownerDocument,
                    win = doc.defaultView,
                    computed = win.getComputedStyle(node, pseudo),
                    units = this._getUnits(),
                    defaultUnit = this._getDefaultUnit(),
                    values = [];

                [ "top", "right", "bottom", "left" ].forEach(function(item) {
                    var css = "margin-" + item;
                    css = computed.getPropertyValue(css);
                    css = this._fix(css);
                    css = this._doReplace(css);
                    css = this._validateUnit(css, units.length ? [ defaultUnit ] : []);

                    values.push(css);
                }.bind(this));

                if (values[0] == values[1] && values[1] == values[2] && values[2] == values[3])
                    return values[0];
                else if (values[0] == values[2] && values[1] == values[3])
                    return values[0] +  " " + values[1];
                else if (values[1] == values[3])
                    return values[0] + " " + values[1] + " " + values[2];
                else
                    return values[0] + " " + values[1] + " " + values[2] + " " + values[3];
            },

        },

    });

})(jQuery, window, document);
