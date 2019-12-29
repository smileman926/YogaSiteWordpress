/**
 * OptimizePress3 element type:
 * op3 element type image manipulation.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-elements.js
 *     - elements/default/js/op3-element.js
 *     - properties/default/js/op3-property.js
 *     - properties/id/js/op3-property.js
 *     - properties/class/js/op3-property.js
 *     - properties/src/js/op3-property.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.Image = OP3.defineClass({

        Name: "OP3.Element.Image",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "image",

            _props: function() {
                return [
                    // Style tab - General
                    [ OP3.Elements._extension.prop.Src, { selector: " img", attr: { "data-property-type": "image-url-preview" } } ],
                    [ OP3.Elements._extension.prop.Width, {
                        attr: {
                            "data-property-type": "range",
                            "data-units": "px, %",
                            "data-min-px": "0",
                            "data-min-percent": "0",
                            "data-max-px": "2500",
                            "data-max-percent": "100",
                            "data-step-px": "1",
                            "data-step-percent": "1",
                            "data-precision-px": "0",
                            "data-precision-percent": "0",
                        },
                        units: [
                            "px",
                            "%",
                        ],
                        defaultUnit: function(media) {
                            var element = OP3.$(this);
                            var row = element.closestHorizontal();

                            return row.is("row") ? "%" : "px";
                        },
                    }],
                    [ OP3.Elements._extension.prop.Title, { selector: " img" } ],
                    [ OP3.Elements._extension.prop.Alt, { selector: " img" } ],
                    [ OP3.Elements._extension.prop.MarginAlign, { label: OP3._("Image Align") } ],
                    [ OP3.Elements._extension.prop.AttrWidth, { selector: " img" } ],
                    [ OP3.Elements._extension.prop.AttrHeight, { selector: " img" } ],

                    // Style tab - Background
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageOverlay", selector: ' [data-op3-background="overlay"]::before, [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageType, { id: "backgroundImageOverlayType", label: OP3._("Type"), options: [ { "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorOverlay", selector: ' [data-op3-background="overlay"]::before, [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageOverlayAngle" } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageOverlayPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageOverlayStartColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageOverlayStartPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageOverlayStopColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageOverlayStopPosition" } ],

                    // Style tab - Border
                    [ OP3.Elements._extension.prop.BorderActive ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { selector: " .op3-image-overlay-container" } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { selector: " .op3-image-overlay-container" } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { selector: " .op3-image-overlay-container" } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { selector: " .op3-image-overlay-container" } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { selector: " .op3-image-overlay-container" } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { selector: " .op3-image-overlay-container" } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { selector: " .op3-image-overlay-container" } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { selector: " .op3-image-overlay-container" } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { selector: " .op3-image-overlay-container" } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { selector: " .op3-image-overlay-container" } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { selector: " .op3-image-overlay-container" } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { selector: " .op3-image-overlay-container" } ],
                    [ OP3.Elements._extension.prop.BorderAllWidth, { selector: " .op3-image-overlay-container" } ],
                    [ OP3.Elements._extension.prop.BorderAllStyle, { selector: " .op3-image-overlay-container" } ],
                    [ OP3.Elements._extension.prop.BorderAllColor, { selector: " .op3-image-overlay-container" } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { selector: " .op3-image-overlay-container" } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { selector: " .op3-image-overlay-container" } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { selector: " .op3-image-overlay-container" } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { selector: " .op3-image-overlay-container" } ],

                    // Style tab - Shadow (use OffsetX/OffsetY or Angle/Distance)
                    [ OP3.Elements._extension.prop.BoxShadow, {selector: " .op3-image-overlay-container"} ],
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
                    [ OP3.Elements._extension.prop.MaxWidth ],

                    // Advanced tab - General
                    [ OP3.Elements._extension.prop.Action, { selector: " a" } ],
                    [ OP3.Elements._extension.prop.Href, { selector: " a", serialize: false, } ],
                    [ OP3.Elements._extension.prop.HrefFull, { selector: " a", } ],
                    [ OP3.Elements._extension.prop.Target, { label: OP3._("Link Target"), selector: " a", } ],
                    [ OP3.Elements._extension.prop.RelNoFollow, { selector: " figure > a", serialize: false } ],
                    [ OP3.Elements._extension.prop.RelNoFollowFull, { selector: " figure > a", } ],
                    [ OP3.Elements._extension.prop.PopOverlayTrigger, { selector: " a" } ],
                    [ OP3.Elements._extension.prop.SelectFunnelStep, { selector: " a" } ],
                    [ OP3.Elements._extension.prop.CreateVideoPopoverlay ],

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

                    // Hover Tab - General
                    [ OP3.Elements._extension.prop.TransitionDuration, { selector: " .op3-image-overlay-container, [data-op3-background]" } ],

                    // Hover Tab - Background
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageOverlayHover", selector: ' [data-op3-background][data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageType, { id: "backgroundImageOverlayHoverType", label: OP3._("Type"), options: [ { "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorOverlayHover", selector: ' [data-op3-background][data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageOverlayHoverAngle" } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageOverlayHoverPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageOverlayHoverStartColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageOverlayHoverStartPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageOverlayHoverStopColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageOverlayHoverStopPosition" } ],

                    // Hover Tab - Border
                    [ OP3.Elements._extension.prop.BorderActive, { id: "borderActiveHover" } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { selector: ":hover .op3-image-overlay-container", id: "borderTopWidthHover" } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { selector: ":hover .op3-image-overlay-container", id: "borderTopStyleHover"  } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { selector: ":hover .op3-image-overlay-container", id: "borderTopColorHover" } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { selector: ":hover .op3-image-overlay-container", id: "borderBottomWidthHover"  } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { selector: ":hover .op3-image-overlay-container", id: "borderBottomStyleHover"  } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { selector: ":hover .op3-image-overlay-container", id: "borderBottomColorHover"  } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { selector: ":hover .op3-image-overlay-container", id: "borderLeftWidthHover"  } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { selector: ":hover .op3-image-overlay-container", id: "borderLeftStyleHover"  } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { selector: ":hover .op3-image-overlay-container", id: "borderLeftColorHover"  } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { selector: ":hover .op3-image-overlay-container", id: "borderRightWidthHover"  } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { selector: ":hover .op3-image-overlay-container", id: "borderRightStyleHover" } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { selector: ":hover .op3-image-overlay-container", id: "borderRightColorHover"  } ],
                    [ OP3.Elements._extension.prop.BorderAllWidth, { selector: ":hover .op3-image-overlay-container", id: "borderAllWidthHover"  } ],
                    [ OP3.Elements._extension.prop.BorderAllStyle, { selector: ":hover .op3-image-overlay-container", id: "borderAllStyleHover"  } ],
                    [ OP3.Elements._extension.prop.BorderAllColor, { selector: ":hover .op3-image-overlay-container", id: "borderAllColorHover" } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { selector: ":hover .op3-image-overlay-container", id: "borderTopLeftRadiusHover" } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { selector: ":hover .op3-image-overlay-container", id: "borderTopRightRadiusHover" } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { selector: ":hover .op3-image-overlay-container", id: "borderBottomLeftRadiusHover" } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { selector: ":hover .op3-image-overlay-container", id: "borderBottomRightRadiusHover" } ],

                    // Hover Tab - Shadow
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "boxShadowHover", selector: ":hover .op3-image-overlay-container" } ],
                    [ OP3.Elements._extension.prop.BoxShadowAngle, { id: "boxShadowHoverAngle"} ],
                    [ OP3.Elements._extension.prop.BoxShadowDistance, { id: "boxShadowHoverDistance"} ],
                    [ OP3.Elements._extension.prop.BoxShadowBlur, { id: "boxShadowHoverBlur"} ],
                    [ OP3.Elements._extension.prop.BoxShadowSpread, { id: "boxShadowHoverSpread"} ],
                    [ OP3.Elements._extension.prop.BoxShadowColor, { id: "boxShadowHoverColor"} ],
                    // [ OP3.Elements._extension.prop.BoxShadowInset, { id: "boxShadowHoverInset"} ],

                    // Media spacing for feature block, testimonial, and similar (proxy)
                    [ OP3.Elements._extension.prop.ColumnGapParent, { label: OP3._("Media Spacing") } ],
                ];
            },

        },

    });

    // open media dialog on element drop
    OP3.bind("elementdrop::image", function(e, o) {
        if (typeof o.source !== "string" || !o.source.match(/^<image\W/))
            return;

        window.parent.OP3.Media.modalImage(function(attach) {
            var url = attach.url;
            if (attach.settings && attach.settings.size && attach.sizes && attach.sizes[attach.settings.size] && attach.sizes[attach.settings.size].url)
                url = attach.sizes[attach.settings.size].url;

            OP3.$(o.target).setOption("src", url, "all"),

            OP3.transmit("insertmedia", {
                node: o.target,
                property: "src",
                attachment: attach,
            });
        });
    });

    // set max value of width property for px unit
    OP3.bind("elementoptionssync::image::width", function(e, o) {
        var value = OP3.$(o.node).getOption("attrWidth", "all");
        var lib = window.parent.$(o.input).data("jquery-input-range");
        if (lib.unit() !== "px" || lib.options("max")*1 === value*1)
            return;

        var options = lib._options;
        window.parent.$(o.input)
            .attr("data-max-px", value)
            .inputRange("destroy")
            .inputRange(options);
    });

    // set properties on media modal insert
    OP3.bind("insertmedia", function(e, o) {
        var element = OP3.$(o.node);
        if (element.type() !== "image" || o.property !== "src")
            return;

        var width = o.attachment.sizes[o.attachment.settings.size].width;
        var height = o.attachment.sizes[o.attachment.settings.size].height;
        var href = o.attachment.settings.linkUrl;

        // WP Media library retains "Attachment Display Settings" state,
        // and if the user inserts an image with a Custom URL, next
        // time the media library is opened, display settings will
        // have Custom URL value of "http://", which has to be
        // manually removed. Therefore, this ensures the
        // user doesn't accidentally insert an
        // invalid/empty link into the page. (OP3-1091)
        if (/^https?:\/\/$/.test(href))
            href = "";

        //element.setOption("src", src, "all");
        element.setOption("title", o.attachment.title || "", "all");
        element.setOption("alt", o.attachment.alt || "", "all");
        element.setOption("marginAlign", o.attachment.settings.align || "none", "all");
        element.setOption("href", href || "", "all");
        element.setOption("attrWidth", width, "all");
        element.setOption("attrHeight", height, "all");

        // if set image size is smaller than the current
        // one, reduce it, otherwise leave it as is.
        // execute this only if image is part of
        // section/row/column template (leave width
        // as it is if image is child of element like
        // testimonial)
        if (element.closestHorizontal().is("row")) {
            var oldWidth = element.getOption("width");
            if (!oldWidth || parseFloat(oldWidth) > width)
                element.setOption("width", width + "px", "all");
        }

        // Refresh width property to trigger
        // max value update on input.
        // see elementoptionssync::image::width
        OP3.transmit("elementoptionssyncrequest", { property: [ "width" ] });
    });

})(jQuery, window, document);
