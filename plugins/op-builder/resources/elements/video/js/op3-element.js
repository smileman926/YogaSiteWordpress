/**
 * OptimizePress3 element type:
 * op3 element type video manipulation.
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
    OP3.Elements._extension.type.Video = OP3.defineClass({

        Name: "OP3.Element.Video",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "video",

            _props: function() {
                return [
                    // Style tab - General
                    [ OP3.Elements._extension.prop.Code, { label: OP3._("Embed Code") } ],
                    [ OP3.Elements._extension.prop.VideoSource ],
                    [ OP3.Elements._extension.prop.VideoSrc ],
                    [ OP3.Elements._extension.prop.VideoUrlYoutube ],
                    [ OP3.Elements._extension.prop.VideoUrlVimeo ],
                    [ OP3.Elements._extension.prop.VideoUrlWistia ],
                    [ OP3.Elements._extension.prop.VideoAutoplay ],
                    [ OP3.Elements._extension.prop.VideoMute ],
                    [ OP3.Elements._extension.prop.VideoLoop ],
                    [ OP3.Elements._extension.prop.VideoControls ],
                    [ OP3.Elements._extension.prop.VideoModestBranding ],
                    [ OP3.Elements._extension.prop.VideoRelated ],
                    [ OP3.Elements._extension.prop.VideoColor ],
                    [ OP3.Elements._extension.prop.VideoBackground ],
                    [ OP3.Elements._extension.prop.VideoByline ],
                    [ OP3.Elements._extension.prop.VideoPortrait ],
                    [ OP3.Elements._extension.prop.VideoTitle ],
                    [ OP3.Elements._extension.prop.VideoSpeed ],
                    [ OP3.Elements._extension.prop.VideoStartTime ],
                    [ OP3.Elements._extension.prop.MarginAlign, { label: OP3._("Video Align") } ],
                    [ OP3.Elements._extension.prop.AspectRatio, { selector: " [data-op3-aspect-ratio]" } ],
                    [ OP3.Elements._extension.prop.MaxWidth ],

                    // Style tab - Border
                    [ OP3.Elements._extension.prop.BorderActive ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { selector: " .op3-video-wrapper, .op3-video-image-overlay" } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { selector: " .op3-video-wrapper, .op3-video-image-overlay" } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { selector: " .op3-video-wrapper, .op3-video-image-overlay" } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { selector: " .op3-video-wrapper, .op3-video-image-overlay" } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { selector: " .op3-video-wrapper, .op3-video-image-overlay" } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { selector: " .op3-video-wrapper, .op3-video-image-overlay" } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { selector: " .op3-video-wrapper, .op3-video-image-overlay" } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { selector: " .op3-video-wrapper, .op3-video-image-overlay" } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { selector: " .op3-video-wrapper, .op3-video-image-overlay" } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { selector: " .op3-video-wrapper, .op3-video-image-overlay" } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { selector: " .op3-video-wrapper, .op3-video-image-overlay" } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { selector: " .op3-video-wrapper, .op3-video-image-overlay" } ],
                    [ OP3.Elements._extension.prop.BorderAllWidth, { selector: " .op3-video-wrapper, .op3-video-image-overlay" } ],
                    [ OP3.Elements._extension.prop.BorderAllStyle, { selector: " .op3-video-wrapper, .op3-video-image-overlay" } ],
                    [ OP3.Elements._extension.prop.BorderAllColor, { selector: " .op3-video-wrapper, .op3-video-image-overlay" } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { selector: " .op3-video-wrapper, .op3-video-image-overlay" } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { selector: " .op3-video-wrapper, .op3-video-image-overlay" } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { selector: " .op3-video-wrapper, .op3-video-image-overlay" } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { selector: " .op3-video-wrapper, .op3-video-image-overlay" } ],

                    // Style tab - Shadow
                    [ OP3.Elements._extension.prop.BoxShadow, {selector: " .op3-video-wrapper"} ],
                    [ OP3.Elements._extension.prop.BoxShadowAngle ],
                    [ OP3.Elements._extension.prop.BoxShadowDistance ],
                    [ OP3.Elements._extension.prop.BoxShadowBlur ],
                    [ OP3.Elements._extension.prop.BoxShadowSpread ],
                    [ OP3.Elements._extension.prop.BoxShadowColor ],
                    // [ OP3.Elements._extension.prop.BoxShadowInset ],

                    // Style tab - Image Overlay
                    [ OP3.Elements._extension.prop.Display, { selector: " .op3-video-image-overlay", label: OP3._("Placeholder Image"), hidden: true, } ],
                    [ OP3.Elements._extension.prop.Visible, { selector: " .op3-video-image-overlay", } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { selector: ' .op3-video-image-overlay' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageUrl, { label: OP3._("Image Overlay") } ],
                    [ OP3.Elements._extension.prop.Display, { id: "videoIconDisplay", selector: " .op3-icon", hidden: true } ],
                    [ OP3.Elements._extension.prop.Visible, { id: "videoIconVisible", selector: " .op3-icon", label: OP3._("Show Play Icon") } ],
                    [ OP3.Elements._extension.prop.Op3Icon, { label: OP3._("Icon"), selector: ' .op3-icon' } ],
                    [ OP3.Elements._extension.prop.Color, { selector: ' .op3-icon' } ],
                    [ OP3.Elements._extension.prop.FontSize, { label: OP3._("Icon Size"), selector: ' .op3-icon', attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "8", "data-max-px": "200", "data-step-px": "1", "data-precision-px": "0", }, } ],
                    [ OP3.Elements._extension.prop.TextShadow, { selector: " .op3-icon" } ],
                    [ OP3.Elements._extension.prop.TextShadowIcon ],

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

    // set icon visibility on by default
    OP3.bind("elementchange::video::visible", function(e, o) {
        if (o.id === "visible")
            OP3.$(o.node).setOption("videoIconVisible", o.value.after, o.media);
    });

    OP3.bind("elementchange::video::videoSource elementchange::video::videoUrlYoutube elementchange::video::videoUrlVimeo elementchange::video::videoUrlWistia elementchange::video::videoColor elementchange::video::videoTitle elementchange::video::videoByline elementchange::video::videoPortrait elementchange::video::videoAutoplay elementchange::video::videoMute elementchange::video:videoLoop elementchange::video::videoControls elementchange::video::videoModestBranding elementchange::video::videoStartTime elementchange::video::videoRelated elementchange::video::videoSpeed", function(e, o) {
        var element = OP3.$(o.node),
            code,
            source,
            url,
            src;

        source = element.getOption("videoSource");
        url = element.getOption("videoUrl" + source.charAt(0).toUpperCase() + source.slice(1));

        if (source === "youtube") {
            // Not a youtube url
            if (url && url.indexOf("youtube.com") < 0 && url.indexOf("youtu.be") < 0)
                return;

            var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
            var match = url.match(regExp);
            var id = (match && match[7]) ? match[7] : false;
            var props = {
                enablejsapi: 1,
                origin: window.location.origin,
                start: element.getOption("videoStartTime"),
                loop: element.getOption("videoLoop"),
                controls: element.getOption("videoControls"),
                modestbranding: element.getOption("videoModestBranding"),
                related: element.getOption("videoRelated"),
                autoplay: element.getOption("videoAutoplay"),
                muted: element.getOption("videoMute")
            };
            var time = props.start.split(":");
            props.start = (+time[0] * 60 + (+time[1]));
            if (id) {
                src = "https://www.youtube.com/embed/" + id + "?" + $.param(props);
                props.autoplay = "0";
                code = '<iframe type="text/html" width="900" height="506" src="https://www.youtube.com/embed/' + id + '?' + $.param(props) + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
            }

        } else if (source === "vimeo") {
            if (url && url.indexOf("vimeo.com") < 1)
                return;

            var regExp = /(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/;
            var match = url.match(regExp);
            var id = (match && match[5]) ? match[5] : false;
            var props = {
                autoplay: element.getOption("videoAutoplay"),
                background: element.getOption("videoBackground"),
                muted: element.getOption("videoMute"),
                portrait: element.getOption("videoPortrait"),
                byline: element.getOption("videoByline"),
                title: element.getOption("videoTitle"),
                speed: element.getOption("videoSpeed"),
                color: element.getOption("videoColor").replace("#", ""),
            };

            if (id) {
                src = "https://player.vimeo.com/video/" + id + "?" + $.param(props);
                props.background = "0";
                props.autoplay = "0";
                code = '<iframe src="https://player.vimeo.com/video/' + id + '?' + $.param(props) + '" width="900" height="506" frameborder="0" allow="autoplay" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
            }
        } else if (source === "wistia") {
            if (url && url.indexOf("wistia") < 0)
                return;

            var regExp = /https?:\/\/(.+)?(wistia\.(com|net)|wi\.st)\/(.*)(wvideo=|wvideoid=|iframe\/|medias\/)([\d\w]*)/;
            var match = url.match(regExp);
            var id = (match && match[6]) ? match[6] : false;
            var props = {
                playerColor: element.getOption("videoColor").replace("#", ""),
                autoplay: element.getOption("videoAutoplay"),
                endVideoBehavior: element.getOption("videoLoop") === "1" ? "loop" : "default",
                playbackRateControl: element.getOption("videoSpeed") === "1" ? "true" : "false",
                playbar: element.getOption("videoControls") === "1" ? "true" : "false",
                muted: element.getOption("videoMute") === "1" ? "true" : "false",
            };

            if (id) {
                src = "https://fast.wistia.net/embed/iframe/" + id + "?" + $.param(props);
                props.autoplay = "0";
                code = '<iframe src="https://fast.wistia.net/embed/iframe/' + id + '?' + $.param(props) + '" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen width="900" height="506"></iframe>';
            }

        }

        if (url && code) {
            var oldCode = element.getOption('code');
            if (code !== oldCode)
                element.setOption('code', code);

            var oldSrc = element.getOption('videoSrc');
            if (src != oldSrc)
                element.setOption('videoSrc', src);
        }
    });

    OP3.bind("elementchange::video::videoBackground", function(e, o) {
        if (o.value.after == 0)
            return;

        var element = OP3.$(o.node);
        element.setOption("videoAutoplay", o.value.after, "all");
        element.setOption("videoMute", o.value.after, "all");
    });

    OP3.bind("elementchange::video::backgroundImageUrl elementchange::video::visible", function(e, o) {
        if (o.value.after) {
            var element = OP3.$(o.node);
            element.setOption("videoAutoplay", "0", "all");
            element.setOption("videoBackground", "0", "all");
        }
    });

    OP3.bind("elementoptionssync::video::videoSource", function(e, o) {
        $(o.parent).attr("data-op3-parent-options-property-value-video-source", o.value);
    });

})(jQuery, window, document);
