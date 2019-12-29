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
     * Getter and setter methods acts the same as in text-align
     * property. Setter (beside text-align proxy) triggers
     * display:block for justify getter value.
     *
     * Warning:
     * make sure your element have text-align and display props
     * (and display option is always enabled)
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.TextAlignInline = OP3.defineClass({

        Name: "OP3.Property.TextAlignInline",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "textAlignInline",

            _defaults: {
                label: function() {
                    return OP3._("Text Align");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: [
                    { "inherit": "None" },
                    { "left": "Left" },
                    { "center": "Center" },
                    { "right": "Right" },
                    { "justify": "Justify" },
                ],
                replace: [
                    { "justify-all": "justify" },
                    { "match-parent": "left" },
                ],
                serialize: false,
            },

            getter: function(media) {
                return this.element.getOption("text-align", media);
            },

            setter: function(value, media) {
                this.element.setOption("text-align", value, media);

                var align = this.getter(media);
                var display = "inline-block";
                if (align === null)
                    display = null;
                else if (value === "justify")
                    display = "block";

                this.element.setOption("display", display, media);
            },

        },

    });

})(jQuery, window, document);
