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
    OP3.Elements._extension.prop.Class = OP3.defineClass({

        Name: "OP3.Property.Class",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "class",

            _defaults: {
                label: function() {
                    return OP3._("CSS Classes");
                },
            },

            _forceComputed: true,

            /**
             * List of reserved classes:
             * this classes are used by op3 system,
             * no need for user to see this
             *
             * @type {Array}
             */
            _reserved: [
                "op3-element",
                "op3-focus",
                "op3-link-properties",
                "op3-drag-source",
                "op3-popoverlay-show",
                "op3-popoverlay-hide",
                "op3-popoverlay-effect",
                "op3-popoverlay-effect-0",
                "op3-popoverlay-effect-1",
                "op3-popoverlay-effect-2",
                "op3-popoverlay-effect-3",
                "op3-popoverlay-effect-4",
                "op3-popoverlay-effect-5",
                "op3-popoverlay-effect-6",
                "op3-popoverlay-effect-7",
                "op3-popoverlay-effect-8",
                "op3-popoverlay-effect-9",
                "op3-popoverlay-effect-10",
                "op3-popoverlay-effect-11",
                "op3-popoverlay-effect-12",
                "op3-popoverlay-effect-13",
                "op3-popoverlay-effect-14",
                "op3-popoverlay-effect-15",
                "op3-popoverlay-effect-16",
                "op3-popoverlay-effect-17",
                "op3-popoverlay-effect-18",
                "op3-popoverlay-effect-19",
                "op3-popoverlay-effect-20",
                "op3-popoverlay-effect-21",
                "op3-popoverlay-effect-22",
                "op3-popoverlay-effect-23",
                "op3-popoverlay-effect-24",
                "op3-popoverlay-effect-25",
                "op3-popoverlay-effect-26",
                "op3-popoverlay-effect-27",
                "op3-popoverlay-effect-28",
                "op3-popoverlay-effect-29",
                "jquery-paddingdrag",
                "jquery-flex-grid-cell-sizer-cell",
                "jquery-flex-grid-cell-sizer-grid-last-row",
                "jquery-flex-grid-cell-sizer-grid-last-column",
                "jquery-simple-nav-tree",
                "jquery-accordion",
                "jquery-accordion-active",
            ],

            _validate: function(className) {
                return (className || "")
                    .replace(/[^\w-\s]/g, "")               // allow only alphanum, underscore and hypern
                    .replace(/\s+/g, " ")                   // double space to single
                    .replace(/\b(\d|\-\d|\-\-)*/g, "")      // cannot start with a digit, two hyphens, or a hyphen followed by a digit
                    .replace(/^\s+|\s+$/g, "");             // trim it
            },

            _parseClass: function(className) {
                var arr = this._validate(className).split(" ");
                var re = new RegExp("^" + this._reserved.join("|") + "$");

                // separate reserved class names from others
                return {
                    op3: arr.filter(function(item) {
                        return item.match(re);
                    }),
                    usr: arr.filter(function(item) {
                        return !!item && !item.match(re);
                    }),
                }
            },

            computed: function() {
                var $el = $(this.target());
                var className = $el.attr("class");
                var parsed = this._parseClass(className);

                return parsed.usr.join(" ");
            },

            setter: function(value, media) {
                var $el = $(this.target());
                var className = $el.attr("class");
                var parsed = this._parseClass(className);
                var reserved = parsed.op3;

                // validate
                value = this._validate(value)
                    .split(" ")
                    .filter(function(item, index, array) {
                        return true
                            && !!item                               // not empty
                            && parsed.op3.indexOf(item) === -1      // not reserved
                            && array.indexOf(item) === index;       // unique
                    })
                    .join(" ");

                // reserved classes
                value = ""
                    + reserved.join(" ")
                    + (reserved.length && value ? " " : "")
                    + value;

                // not an css property, ignore media
                $el.attr("class", value);
            },

        },

    });

})(jQuery, window, document);
