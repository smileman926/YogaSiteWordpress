/**
 * OptimizePress3 element type:
 * op3 element type textarea manipulation.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-elements.js
 *     - elements/default/js/op3-element.js
 *     - properties/default/js/op3-property.js
 *     - properties/html/js/op3-property.js
 *     - properties/value/js/op3-property.js
 *     - properties/placeholder/js/op3-property.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.Textarea = OP3.defineClass({

        Name: "OP3.Element.Textarea",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "textarea",

            _props: function() {
                return [
                    // Style tab
                    [ OP3.Elements._extension.prop.Id ],
                    [ OP3.Elements._extension.prop.Html ],
                    [ OP3.Elements._extension.prop.Name, { selector: " textarea" } ],
                    [ OP3.Elements._extension.prop.Value, { selector: " textarea" } ],
                    [ OP3.Elements._extension.prop.Placeholder, { selector: " textarea" } ],
                    [ OP3.Elements._extension.prop.Rows, { selector: " textarea" } ],

                    // Advanced tab - Responsive
                    [ OP3.Elements._extension.prop.Display, { id: "displayDeviceVisibility" } ],
                    [ OP3.Elements._extension.prop.DeviceVisibility, { label: OP3._("Element Visible On") } ],
                    [ OP3.Elements._extension.prop.ForceVisibility ],

                    // Advanced tab
                    [ OP3.Elements._extension.prop.Class ],
                    [ OP3.Elements._extension.prop.LinkProperties ],
                ];
            },

        },

    });

})(jQuery, window, document);
