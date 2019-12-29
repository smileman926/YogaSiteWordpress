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
    OP3.Elements._extension.prop.FooterScript = OP3.defineClass({

        Name: "OP3.Property.FooterScript",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "footerScript",

            _defaults: {
                label: function() {
                    return OP3._("Footer Script");
                },
                tag: "textarea",
            },

            _forceComputed: true,

            computed: function() {
                // get and clone scripts
                // so they don't change in DOM
                var value = $(this.selector()).clone();

                // manipulate wrapper children (scripts)
                var filtered = value
                    .map(function() {
                        var tag = $(this);

                        var dataOp3type = tag.attr("data-op3-type");
                        if (dataOp3type) {
                            tag.attr("type", dataOp3type);
                            tag.removeAttr("data-op3-type");
                        }

                        var type = tag.attr("type");
                        if (type === "script/op3" || type === "link/op3")
                            tag.removeAttr("type");

                        tag.removeAttr("class");

                        return tag.get(0).outerHTML;
                    })
                    .get()
                    .join("\n");

                return filtered;
            },

            setter: function(value, media) {
                var html = $.parseHTML(value, true);
                var filtered = $(html)
                    .filter("script,link")
                    .filter(function(i, v) {
                        try {
                            eval(v);
                        } catch(error) {
                            return false;
                        }

                        return true;
                    })
                    .map(function() {
                        var tag = $(this);
                        var tagName = this.tagName.toLowerCase();
                        tag.addClass("op3-footer-js");

                        // If type attribute exists
                        // store it to data-op3-type
                        var type = tag.attr("type");
                        if (type)
                            tag.attr("data-op3-type", type);

                        // Set type attribute
                        // to disable script running in Live Editor
                        if (tagName === "script")
                            tag.attr("type", "script/op3");
                        else if (tagName === "link")
                            tag.attr("type", "link/op3");

                        return tag.get(0).outerHTML;
                    })
                    .get()
                    .join("\n");

                // Remove scripts if already exist in DOM
                if ($(this.selector()).length !== 0)
                    $(this.selector()).remove();

                // Append new scripts to footer
                return $("head").append($(filtered));
            },

        },

    });

})(jQuery, window, document);
