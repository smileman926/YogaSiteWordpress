/**
 * OptimizePress3 element type:
 * op3 element type rating manipulation.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-elements.js
 *     - elements/default/js/op3-element.js
 *     - properties/default/js/op3-property.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.Rating = OP3.defineClass({

        Name: "OP3.Element.Rating",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "rating",

            _props: function() {
                return [
                    // Style Tab - General
                    [ OP3.Elements._extension.prop.RatingSvgPattern ],
                    [ OP3.Elements._extension.prop.RatingSvgCount ],
                    [ OP3.Elements._extension.prop.RatingSvgRate ],
                    [ OP3.Elements._extension.prop.RatingSvgOffset ],
                    [ OP3.Elements._extension.prop.RatingSvgFillColor ],
                    [ OP3.Elements._extension.prop.RatingSvgFillColor2 ],
                    [ OP3.Elements._extension.prop.RatingSvgStrokeColor ],
                    [ OP3.Elements._extension.prop.RatingSvgStrokeWidth ],
                    [ OP3.Elements._extension.prop.RatingSvgPreserveAspectRatio ],
                    [ OP3.Elements._extension.prop.Height, {
                        label: OP3._("Size"),
                        selector: " .op3-rating-content",
                        attr: {
                            "data-property-type": "range",
                            "data-units": "px",
                            "data-min-px": "20",
                            "data-max-px": "100",
                            "data-step-px": "1",
                            "data-percision-px": "0",
                        },
                        units: [
                            "px",
                        ],
                    }],

                    // Advanced Tab - Position
                    [ OP3.Elements._extension.prop.BoxModel ],
                    [ OP3.Elements._extension.prop.MarginTop ],
                    [ OP3.Elements._extension.prop.MarginBottom ],
                    [ OP3.Elements._extension.prop.MarginLeft ],
                    [ OP3.Elements._extension.prop.MarginRight ],
                    [ OP3.Elements._extension.prop.PaddingTop ],
                    [ OP3.Elements._extension.prop.PaddingBottom ],
                    [ OP3.Elements._extension.prop.PaddingLeft ],
                    [ OP3.Elements._extension.prop.PaddingRight ],
                    [ OP3.Elements._extension.prop.PaddingDrag ],

                    // Advanced Tab - Responsive
                    [ OP3.Elements._extension.prop.Display, { id: "displayDeviceVisibility" } ],
                    [ OP3.Elements._extension.prop.DeviceVisibility, { label: OP3._("Element Visible On") } ],
                    [ OP3.Elements._extension.prop.ForceVisibility ],

                    // Advanced Tab - Advanced
                    [ OP3.Elements._extension.prop.Id ],
                    [ OP3.Elements._extension.prop.Class ],
                    [ OP3.Elements._extension.prop.LinkProperties ],
                    [ OP3.Elements._extension.prop.ZIndex ],
                    [ OP3.Elements._extension.prop.CodeBeforeElement ],
                    [ OP3.Elements._extension.prop.CodeAfterElement ],
                ];
            },

        },

    });

    // init RatingSVG on element create
    OP3.bind("elementcreate::rating", function(e, o) {
        var lib = new RatingSVG({
            idSuffix: "-" + OP3.$(o.node).uuid(),
        });

        $(o.node)
            .find("svg")
                .after(lib.element)
                .remove();
    });

    // init RatingSVG on element append (templates)
    OP3.bind("elementappend", function(e, o) {
        var element = OP3.$(o.node);
        var rating = element.find("rating");
        if (element.is("rating"))
            rating = rating.add(element);

        rating.jq().each(function() {
            var svg = $(this).find("svg").get(0);
            if (!svg || svg._ratingSVG)
                return;

            // try if markup is valid
            var lib = RatingSVG.fromNode(svg);
            if (lib)
                return;

            // wrong markup, init new
            var uuid = OP3.$(this).uuid();
            var suffix = "-" + uuid
            lib = new RatingSVG({
                idSuffix: suffix,
            });

            // ...and replace svg
            $(svg)
                .after(lib.element)
                .remove();
        });
    });

})(jQuery, window, document);
