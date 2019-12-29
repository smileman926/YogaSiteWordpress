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
    OP3.Elements._extension.prop.CodeHtml = OP3.defineClass({

        Name: "OP3.Property.CodeHtml",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "codeHtml",

            _defaults: {
                label: function() {
                    return OP3._("Custom HTML Code");
                },
                tag: "textarea",
                selector: " [data-op3-code-html]",
            },

            _forceComputed: true,

            /**
             * Revert back correct type attribute stored
             * in data-op3-type.
             *
             * @return {String}
             */
            computed: function() {
                var html = $(this.target()).html(),
                    $wrapper = $("<div />").append(html);

                $wrapper
                    .find("script, style, link")
                    .each(function(i, elem) {
                        var $elem = $(elem),
                            dataOp3type = $elem.attr("data-op3-type");

                        if (dataOp3type) {
                            $elem.attr("type", dataOp3type);
                            $elem.removeAttr("data-op3-type");
                        }

                        var type = $elem.attr("type");
                        if (type === "type/op3")
                            $elem.removeAttr("type");
                    });

                return $wrapper.html();
            },

            /**
             * Change type attribute of script, style and link
             * to type/op3 so it can't run in live editor.
             *
             * @param  {String} value
             * @param  {String} media
             * @return {Void}
             */
            setter: function(value, media) {
                var html = $.parseHTML(value, true);

                // Change type attribute to avoid
                // script, style, link running in live-editor
                $(html)
                    .filter("script, style, link")
                    .each(function() {
                        var $elem = $(this),
                            type = $elem.attr("type");

                        if (type)
                            $elem.attr("data-op3-type", type);

                        $elem.attr("type", "type/op3");

                        return $elem;
                    });

                $(this.target()).html($(html));
            },

        },

    });

})(jQuery, window, document);
