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
    OP3.Elements._extension.prop.Tag = OP3.defineClass({

        Name: "OP3.Property.Tag",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "tag",

            _defaults: {
                label: function() {
                    return OP3._("Tag Name");
                },
                tag: "select",
                options: [
                    { "h1": "Headline 1" },
                    { "h2": "Headline 2" },
                    { "h3": "Headline 3" },
                    { "h4": "Headline 4" },
                    { "h5": "Headline 5" },
                    { "h6": "Headline 6" },
                    //{ "p": "Paragraph" },
                    //{ "pre": "Code" },
                    //{ "blockquote": "Quote" },
                    //{ "ol": "Ordered List" },
                    //{ "ul": "Unordered List" },
                ],
                attr: {
                    "data-property-type": "select2-simple",
                },
                selector: " [contenteditable] > *",
                serialize: false,
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).prop("tagName").toLowerCase() || "p";
            },

            setter: function(value, media) {
                // clear selection
                if (window.getSelection)
                    window.getSelection().removeAllRanges();
                else if (document.selection)
                    document.selection.empty();

                // not an css property, ignore media
                $(this.target())
                    .each(function() {
                        var $el = $("<" + value + " />")
                            .html($(this).html())
                            .css("display", "none")
                            .insertAfter(this);

                        $(this).remove();
                        $el.css("display", "");
                    });

                // target has changed, force refresh
                this._target = null;
            },

        },

    });

    // trigger element html property change
    OP3.bind("elementchange::*::tag", function(e, o) {
        var query = OP3.$(o.node);
        var element = query.element();
        var prop = element.findProperty("html");
        if (!prop)
            return;

        var reTagOpen = new RegExp("<" + o.value.after + "(.*?)>", "gi");
        var reTagClose = new RegExp("<\/" + o.value.after + ">", "gi");
        var valueAfter = prop.getter();
        var valueBefore = valueAfter
            .replace(reTagOpen, "<" + o.value.before + "$1>")
            .replace(reTagClose, "<\/" + o.value.before + ">");

        var emit = {
            node: o.node,
            uuid: o.uuid,
            type: o.type,
            media: o.media,
            id: prop._id,
            name: prop._name,
            selector: prop._selector,
            serialize: prop._serialize,
            forceComputed: prop._forceComputed,
            important: o.important,
            historyPending: OP3.Designer.isHistoryPending(),
            value: {
                before: valueBefore,
                after: valueAfter,
            },
        }

        OP3.transmit("elementchanging", emit);
        OP3.transmit("elementchanging::" + emit.type, emit);
        OP3.transmit("elementchanging::*::" + emit.name, emit);
        OP3.transmit("elementchanging::" + emit.type + "::" + emit.name, emit);
        OP3.transmit("elementchange", emit);
        OP3.transmit("elementchange::" + emit.type, emit);
        OP3.transmit("elementchange::*::" + emit.name, emit);
        OP3.transmit("elementchange::" + emit.type + "::" + emit.name, emit);
    });

})(jQuery, window, document);
