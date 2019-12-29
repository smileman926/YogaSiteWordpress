/**
 * OptimizePress3 element.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-elements.js
 *
 * Human-readable options property for select element.
 *
 * Warning:
 * make sure your element have options prop and prop
 * is always enabled).
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.OptionsSelect = OP3.defineClass({

        Name: "OP3.Property.OptionsSelect",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "optionsSelect",

            _defaults: {
                label: function() {
                    return OP3._("Enter each option in a separate line");
                },
                tag: "textarea",
                selector: " [data-op3-options-list]",
                serialize: false,
            },

            getter: function(media) {
                var proxy = this.element.getOption("options", media);
                var result = '';

                $(proxy).filter('option').each(function() {
                    result += $(this).attr('value') + "\n";
                });
                result = result.replace(/^\s+|\s+$/g, "");

                return result;
            },

            setter: function(value, media) {
                value = value.toString()
                    .replace(/\n+/g, "\n")
                    .replace(/^\s+|\s+$/g, "");

                var lines = value.split("\n");
                var result = "";
                for (var i = 0; i < lines.length; i++) {
                    var line = lines[i];

                    // convert unique line to option tag
                    if (lines.indexOf(line) === i)
                        result += '<option value="' + line + '">' + line + '</option>';
                }

                this.element.setOption("options", result, media);
            },

        },

    });

})(jQuery, window, document);
