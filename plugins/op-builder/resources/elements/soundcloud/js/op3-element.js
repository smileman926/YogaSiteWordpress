/**
 * OptimizePress3 element type:
 * op3 element type soundcloud iframe manipulation.
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.SoundCloud = OP3.defineClass({

        Name: "OP3.Element.SoundCloud",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "soundcloud",

            _props: function() {
                return [
                    // Style Tab
                    [ OP3.Elements._extension.prop.Src, { selector: " iframe" } ],
                    [ OP3.Elements._extension.prop.SrcSoundCloudUrl ],
                    [ OP3.Elements._extension.prop.SrcSoundCloudAutoplay ],
                    [ OP3.Elements._extension.prop.SrcSoundCloudVisual ],
                    [ OP3.Elements._extension.prop.SoundCloudLayout ],
                    [ OP3.Elements._extension.prop.Height, {
                        selector: " .op3-soundcloud-wrapper",
                        attr: {
                            "data-property-type": "range",
                            "data-units": "px",
                            "data-min-px": "50",
                            "data-max-px": "400",
                            "data-step-px": "1",
                            "data-percision-px": "0",
                        },
                        units: [
                            "px",
                        ],
                    }],
                    [ OP3.Elements._extension.prop.MaxWidth, {
                        label: OP3._("Width"),
                        attr: {
                            "data-property-type": "range",
                            "data-units": "px, %",
                            "data-min-px": "100",
                            "data-min-percent": "10",
                            "data-max-px": "2000",
                            "data-max-percent": "100",
                            "data-step-px": "1",
                            "data-step-percent": "1",
                            "data-precision-px": "0",
                            "data-precision-percent": "0",
                        },
                        units: ["px", "%"],
                        defaultUnit: "%",
                    }],

                    // Advanced Tab - Positioning
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
                    [ OP3.Elements._extension.prop.MarginAlign ],

                    // Advanced tab - Responsive
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

})(jQuery, window, document);
