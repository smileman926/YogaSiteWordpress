/**
 * OptimizePress3 videothumbnail element
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.VideoThumbnail = OP3.defineClass({

        Name: "OP3.Element.VideoThumbnail",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "videothumbnail",

            _props: function() {
                return [
                    // Background Image
                    [ OP3.Elements._extension.prop.BackgroundImage, { selector: ' .op3-video-thumbnail' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageUrl, { label: OP3._("Image Overlay") } ],
                    [ OP3.Elements._extension.prop.Opacity, { selector: ' .op3-video-thumbnail' } ],
                    [ OP3.Elements._extension.prop.Opacity100 ],
                    [ OP3.Elements._extension.prop.BackgroundPosition, { selector: ' .op3-video-thumbnail' } ],
                    [ OP3.Elements._extension.prop.BackgroundAttachment, { selector: ' .op3-video-thumbnail' } ],
                    [ OP3.Elements._extension.prop.BackgroundRepeat, { selector: ' .op3-video-thumbnail' } ],
                    [ OP3.Elements._extension.prop.BackgroundSize, { selector: ' .op3-video-thumbnail' } ],

                    [ OP3.Elements._extension.prop.Display, { selector: " .op3-icon" } ],
                    [ OP3.Elements._extension.prop.Visible, { label: OP3._("Show Play Icon"), selector: " .op3-icon" } ],
                    [ OP3.Elements._extension.prop.Op3Icon, { label: OP3._("Icon"), selector: ' .op3-icon' } ],
                    [ OP3.Elements._extension.prop.Color, { selector: ' .op3-icon' } ],
                    [ OP3.Elements._extension.prop.FontSize, {
                        label: OP3._("Icon Size"),
                        selector: ' .op3-icon',
                        attr: {
                            "data-property-type": "range",
                            "data-units": "px",
                            "data-min-px": "8",
                            "data-max-px": "200",
                            "data-step-px": "1",
                            "data-precision-px": "0",
                        },
                    } ],
                    [ OP3.Elements._extension.prop.TextShadow, { selector: " .op3-icon" } ],
                    [ OP3.Elements._extension.prop.TextShadowIcon ],

                    [ OP3.Elements._extension.prop.Action, { selector: " a" } ],
                    [ OP3.Elements._extension.prop.Href, { selector: " a", serialize: false, } ],
                    [ OP3.Elements._extension.prop.HrefFull, { selector: " a", } ],
                    [ OP3.Elements._extension.prop.Target, { label: OP3._("Link Target"), selector: " a", } ],
                    [ OP3.Elements._extension.prop.RelNoFollow, { selector: " a", serialize: false } ],
                    [ OP3.Elements._extension.prop.RelNoFollowFull, { selector: " a", } ],
                    [ OP3.Elements._extension.prop.PopOverlayTrigger, { selector: " a" } ],
                    [ OP3.Elements._extension.prop.SelectFunnelStep, { selector: " a" } ],
                    [ OP3.Elements._extension.prop.CreateVideoPopoverlay ],

                    // Background overlay
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageOverlay", selector: ' [data-op3-background="overlay"]::before, [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageType, { id: "backgroundImageOverlayType", label: OP3._("Type"), options: [ { "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorOverlay", selector: ' [data-op3-background="overlay"]::before, [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageOverlayAngle" } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageOverlayPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageOverlayStartColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageOverlayStartPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageOverlayStopColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageOverlayStopPosition" } ],

                    [ OP3.Elements._extension.prop.MarginAlign, { label: OP3._("Video Align") } ],
                    [ OP3.Elements._extension.prop.AspectRatio, { selector: " .op3-video-thumbnail" } ],
                    [ OP3.Elements._extension.prop.MaxWidth ],

                    // Style tab - Border
                    [ OP3.Elements._extension.prop.BorderActive ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { selector: " .op3-video-thumbnail-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { selector: " .op3-video-thumbnail-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { selector: " .op3-video-thumbnail-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { selector: " .op3-video-thumbnail-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { selector: " .op3-video-thumbnail-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { selector: " .op3-video-thumbnail-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { selector: " .op3-video-thumbnail-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { selector: " .op3-video-thumbnail-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { selector: " .op3-video-thumbnail-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { selector: " .op3-video-thumbnail-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { selector: " .op3-video-thumbnail-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { selector: " .op3-video-thumbnail-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderAllWidth, { selector: " .op3-video-thumbnail-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderAllStyle, { selector: " .op3-video-thumbnail-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderAllColor, { selector: " .op3-video-thumbnail-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { selector: " .op3-video-thumbnail-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { selector: " .op3-video-thumbnail-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { selector: " .op3-video-thumbnail-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { selector: " .op3-video-thumbnail-wrapper" } ],

                    // Style tab - Shadow
                    [ OP3.Elements._extension.prop.BoxShadow, {selector: " .op3-video-thumbnail-wrapper"} ],
                    [ OP3.Elements._extension.prop.BoxShadowAngle ],
                    [ OP3.Elements._extension.prop.BoxShadowDistance ],
                    [ OP3.Elements._extension.prop.BoxShadowBlur ],
                    [ OP3.Elements._extension.prop.BoxShadowSpread ],
                    [ OP3.Elements._extension.prop.BoxShadowColor ],
                    // [ OP3.Elements._extension.prop.BoxShadowInset ],

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
