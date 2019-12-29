/**
 * OP3 Designer extension.
 *
 * When element is dropped display layout so user
 * can choose how much items will element have.
 */
;(function($, window, document) {

    "use strict";

    var that = {

        /**
         * Layout template
         *
         * @type {String}
         */
        _template: ''
            +   '<div class="op3-element-layouts-wrapper">'
            +       '<span>Select element layout</span>'
            +       '<div class="op3-element-layouts">'
            +           '<div class="element-layout" data-layout="1" data-width="100%"><div class="one-col"></div></div>'
            +           '<div class="element-layout" data-layout="2" data-width="50%,50%"><div class="one-half"></div><div class="one-half"></div></div>'
            +           '<div class="element-layout" data-layout="3" data-width="33.3333%,33.3333%,33.3334%"><div class="one-thirds"></div><div class="one-thirds"></div><div class="one-thirds"></div></div>'
            +           '<div class="element-layout" data-layout="4" data-width="25%,25%,25%,25%"><div class="one-quarter"></div><div class="one-quarter"></div><div class="one-quarter"></div><div class="one-quarter"></div></div>'
            +           '<div class="element-layout" data-layout="5" data-width="66.6667%,33.3333%"><div class="two-thirds"></div><div class="one-thirds"></div></div>'
            +           '<div class="element-layout" data-layout="6" data-width="33.3333%,66.6667%"><div class="one-thirds"></div><div class="two-thirds"></div></div>'
            +           '<div class="element-layout" data-layout="7" data-width="25%,25%,50%"><div class="one-quarter"></div><div class="one-quarter"></div><div class="one-half"></div></div>'
            +           '<div class="element-layout" data-layout="8" data-width="50%,25%,25%"><div class="one-half"></div><div class="one-quarter"></div><div class="one-quarter"></div></div>'
            +           '<div class="element-layout" data-layout="9" data-width="25%,50%,25%"><div class="one-quarter"></div><div class="one-half"></div><div class="one-quarter"></div></div>'
            +       '</div>'
            +   '</div>',

        /**
         * UI elements
         *
         * @type {Object}
         */
        $ui: {},

        /**
         * On element drop display layouts
         *
         * @param {Object} e
         * @param {Object} o
         * @return {Void}
         */
        show: function(e, o, callback) {
            // Don't run on block drop
            if (typeof o.source !== "string" || !o.source.startsWith("<"))
                return;

            e.preventDefault();

            // Add attr to body so toolbar can hide
            OP3.LiveEditor.$ui.body.attr("data-op3-element-layouts-is-active", "");
            this.$ui.layout = $(this._template);
            var $source   = OP3.$(o.source);

            // if source is already appended to document
            // remove it first to delete empty parent
            // (option removeIfEmpty in config)
            $source.detach();

            this.$ui.layout
                .find(".element-layout")
                .on("click", function(e) {
                    OP3.ElementLayouts.destroy(e, o);
                    callback(e, $source);

                    var emit = {
                        node: $source.node(),
                        uuid: $source.uuid(),
                        type: $source.type(),
                        width: ($(this).attr("data-width") || "").split(","),
                    }
                    OP3.transmit("elementlayout", emit);
                    OP3.transmit("elementlayout::" + emit.type, emit);
                });

            // Append column layout to it's destination
            var columnLayoutDestination = $source.babysitter()[0].parentNode;
            this.$ui.layout.appendTo(columnLayoutDestination);

            // fix document destination
            var destination = o.destination;
            if (OP3.Designer.$ui.babysitter.is(destination))
                destination = OP3.Designer.$ui.parent;

            // insert source to destination
            $source[o.method](destination);
            $source.focus();

            // Calculate offset for scroll
            var rect = $source.get(0).getBoundingClientRect();
            var offsetTop = rect.top + window.pageYOffset - window.innerHeight / 2 + $($source).height() + OP3.LiveEditor.$ui.header.height() / 2;

            // Scroll to element
            window.scrollTo({
                left: 0,
                top: offsetTop,
                behavior: "smooth",
            });
        },

        /**
         * On element unfocus hide layouts
         *
         * @param {Object} e
         * @param {Object} o
         * @return {Void}
         */
        destroy: function(e, o) {
            if (this.$ui.layout)
                this.$ui.layout.remove();

            // Make sure OP3 Toolbar is visible again
            OP3.LiveEditor.$ui.body.removeAttr("data-op3-element-layouts-is-active");
        },
    }

    window.OP3.ElementLayouts = that;

})(jQuery, window, document);

