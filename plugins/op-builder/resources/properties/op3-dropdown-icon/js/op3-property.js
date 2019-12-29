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
    OP3.Elements._extension.prop.DropdownIcon = OP3.defineClass({

        Name: "OP3.Property.DropdownIcon",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "dropdownIcon",

            _defaults: {
                label: function() {
                    return OP3._("Icon");
                },
                tag: "select",
                selector: " .op3-dropdown-icon",
                attr: {
                    "data-property-type": "select2",
                },
                options: [
                    { "op3-icon-download-1": "" },
                    { "op3-icon-download-2": "" },
                    { "op3-icon-download-3-1": "" },
                    { "op3-icon-folder-download-1": "" },
                    { "op3-icon-minimal-down": "" },
                    { "op3-icon-simple-down": "" },
                    { "op3-icon-small-down": "" },
                    { "op3-icon-square-download-1": "" },
                    { "op3-icon-stre-down": "" },
                ],
            },

            _forceComputed: true,

            _renderOptions: function(media) {
                if (!OP3.Icons)
                    return OP3.Elements._extension.prop.Default.prototype._renderOptions.apply(this, arguments);

                var valid = this._validOptions();
                return OP3.Icons.data()
                    .filter(function(item) {
                        return valid.indexOf(Object.keys(item)[0]) !== -1;
                    })
                    .map(function(item) {
                        var key = Object.keys(item)[0];
                        var val = Object.values(item)[0];

                        return ''
                            + '<option'
                            +   ' value="' + (key || "").replace(/"/g, "&quot;") + '"'
                            +   ' title="' + val.title + '"'
                            +   ' data-format="' + (val["data-format"] || "").replace(/"/g, "&quot;") + '"'
                            + '>'
                            + val.title
                            + '</option>';
                    })
                    .join("");
            },

            computed: function() {
                var className = $(this.target()).attr("class");
                var match = className.match(/op3-icon-[a-zA-Z0-9-]+/);

                return match ? match[0] : "op3-icon-small-down";
            },

            setter: function(value, media) {
                if (this._validOptions().indexOf(value) === -1)
                    return;

                // not an css property, ignore media
                $(this.target())
                    .attr("class", function(index, attr) {
                        return attr
                            .replace(/\bop3-icon-\S+/g, "")
                            .replace(/\s+/, " ")
                            .trim();
                    })
                    .addClass(value);
            },

        },

    });

})(jQuery, window, document);
