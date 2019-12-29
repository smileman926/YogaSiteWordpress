/**
 * OptimizePress3 ratingSvgPattern property
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.RatingSvgPattern = OP3.defineClass({

        Name: "OP3.Property.RatingSvgPattern",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "ratingSvgPattern",

            _defaults: {
                label: function() {
                    return OP3._("Icon");
                },
                tag: "select",
                selector: " svg",
                attr: {
                    "data-property-type": "select-buttons-listed",
                },
                options: [],
            },

            _forceComputed: true,

            proxy: function() {
                if (this.hasOwnProperty("_proxy"))
                    return this._proxy;

                // usualy proxy is a op3 property, but
                // this time we use js library
                this._proxy = RatingSVG.fromNode(this.target()[0]);

                return this.proxy();
            },

            computed: function() {
                return this.proxy().getOption("patternId");
            },

            setter: function(value, media) {
                this.proxy().setOption("patternId", value);
            },

        },

    });

    OP3.bind("loadajaxinit", function(e, o) {
        if (!o.ratings)
            return;

        RatingSVG.prototype._defaults.patternUrl = OP3.Meta.assets + "/img/elements/rating/rating-svg.svg";
        RatingSVG.prototype._defaults.strokeWidth = 0;
        RatingSVG.prototype._defaults.fillColor = "#ffce00";
        RatingSVG.prototype._defaults.fillColor2 = "#e1e1e1";

        OP3.Elements._extension.prop.RatingSvgPattern.prototype._defaults.options = [];
        o.ratings.forEach(function(item) {
            var $node = $(item);
            var id = $node.attr("id");
            var title = id.charAt(0).toUpperCase() + id.slice(1);
            var html = ''
                + '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="currentColor">'
                + $node.get(0).outerHTML
                + '</svg>';

            var map = {};
            map[id] = {
                title: title,
                "data-format": html,
            }

            OP3.Elements._extension.prop.RatingSvgPattern.prototype._defaults.options.push(map);
        });
    });

})(jQuery, window, document);
