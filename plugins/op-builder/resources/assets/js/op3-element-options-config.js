/**
 * OptimizePress3 element options box.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-live-editor.js
 *     - op3-live-editor-sidebar.js
 *     - op3-designer.js
 *     - op3-element-options.js
 */
;(function($, window, document) {

    "use strict";

    // set configuration for each element type
    window.OP3.ElementOptions._config = function() {
        var result = {
            arrow: {
                label: OP3._("Arrow"),
                tab: [
                    {
                        id: "design",
                        label: OP3._("Design"),
                        icon: "op3-icon-wand-99-2",
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-paint-37-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "marginAlign", "maxWidth" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            bulletblock: {
                label: OP3._("Bullet Block"),
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "marginAlign", "maxWidth" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            bulletlist: {
                label: OP3._("Bullet List"),
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "class" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration" ],
                            },
                        ],
                    },
                ],
            },
            button: {
                label: OP3._("Button"),
                tab: [
                    {
                        id: "design",
                        label: OP3._("Design"),
                        icon: "op3-icon-wand-99-2",
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight" ],
                            },
                            {
                                id: "border",
                                label: OP3._("Border"),
                                property: [ "borderActive", "borderTopWidth", "borderTopStyle", "borderTopColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderAllWidth", "borderAllStyle", "borderAllColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                id: "shadow",
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                            {
                                id: "inner-shadow",
                                label: OP3._("Inner Shadow"),
                                property: [ "boxShadowInsetAngle", "boxShadowInsetDistance", "boxShadowInsetBlur", "boxShadowInsetSpread", "boxShadowInsetColor" ],
                            },
                            {
                                id: "text-shadow",
                                label: OP3._("Text Shadow"),
                                property: [ "textShadowAngle", "textShadowDistance", "textShadowBlurRadius", "textShadowColor" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration", "colorHover", "iconColorHover" ],
                            },
                            {
                                id: "background",
                                label: OP3._("Background"),
                                reset: true,
                                property: [ "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                            },
                            {
                                id: "border",
                                label: OP3._("Broder & Corners"),
                                reset: true,
                                property: [ "borderActiveHover", "borderTopWidthHover", "borderTopStyleHover", "borderTopColorHover", "borderBottomWidthHover", "borderBottomStyleHover", "borderBottomColorHover", "borderLeftWidthHover", "borderLeftStyleHover", "borderLeftColorHover", "borderRightWidthHover", "borderRightStyleHover", "borderRightColorHover", "borderAllWidthHover", "borderAllStyleHover", "borderAllColorHover", "borderTopLeftRadiusHover", "borderTopRightRadiusHover", "borderBottomLeftRadiusHover", "borderBottomRightRadiusHover" ],
                            },
                            {
                                id: "box-shadow",
                                label: OP3._("Box Shadow"),
                                reset: true,
                                property: [ "boxShadowHover", "boxShadowHoverAngle", "boxShadowHoverDistance", "boxShadowHoverBlur", "boxShadowHoverSpread", "boxShadowHoverColor" ],
                            },
                        ],
                    },
                ],
            },
            checkbox: {
                label: OP3._("Checkbox"),
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "class" ],
                            },
                        ],
                    },
                ],
            },
            column: {
                label: OP3._("Column"),
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "minHeight", "matchScreenHeight", "justifyContent" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "wrapColumns", "flexBasisColumn", "stackColumnsTablet", "stackColumnsTabletReverse", "stackColumnsMobile", "stackColumnsMobileReverse" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "class", "zIndex" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration" ],
                            },
                            {
                                id: "background",
                                label: OP3._("Background"),
                                reset: true,
                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition", "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover", "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                filter: [
                                    {
                                        label: OP3._("Background"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Colour"),
                                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition" ],
                                            },
                                            {
                                                label: OP3._("Image"),
                                                property: [ "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover" ],
                                            },
                                            {
                                                label: OP3._("Overlay"),
                                                property: [ "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                id: "border",
                                label: OP3._("Border & Corners"),
                                reset: true,
                                property: [ "borderActiveHover", "borderTopWidthHover", "borderTopStyleHover", "borderTopColorHover", "borderBottomWidthHover", "borderBottomStyleHover", "borderBottomColorHover", "borderLeftWidthHover", "borderLeftStyleHover", "borderLeftColorHover", "borderRightWidthHover", "borderRightStyleHover", "borderRightColorHover", "borderAllWidthHover", "borderAllStyleHover", "borderAllColorHover", "borderTopLeftRadiusHover", "borderTopRightRadiusHover", "borderBottomLeftRadiusHover", "borderBottomRightRadiusHover" ],
                            },
                            {
                                id: "box-shadow",
                                label: OP3._("Box Shadow"),
                                reset: true,
                                property: [ "boxShadowHover", "boxShadowHoverOffsetX", "boxShadowHoverOffsetY", "boxShadowHoverBlur", "boxShadowHoverSpread", "boxShadowHoverColor" ],
                            },
                        ],
                    },
                ],
            },
            contenttoggle: {
                label: OP3._("Content Toggle"),
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            contenttoggleitem: {
                label: OP3._("Content Toggle Item"),
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "class", "zIndex" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration" ],
                            },
                            {
                                id: "border",
                                label: OP3._("Border & Corners"),
                                reset: true,
                                property: [ "borderActiveHover", "borderTopWidthHover", "borderTopStyleHover", "borderTopColorHover", "borderBottomWidthHover", "borderBottomStyleHover", "borderBottomColorHover", "borderLeftWidthHover", "borderLeftStyleHover", "borderLeftColorHover", "borderRightWidthHover", "borderRightStyleHover", "borderRightColorHover", "borderAllWidthHover", "borderAllStyleHover", "borderAllColorHover", ],
                            },
                        ],
                    },
                ],
            },
            countdowntimer: {
                label: OP3._("Countdown Timer"),
                tab: [
                    {
                        id: "design",
                        label: OP3._("Design"),
                        icon: "op3-icon-wand-99-2",
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "text-customization",
                                label: OP3._("Text Customization"),
                                reset: true,
                                property: [ "countdownTimerUnitDay", "countdownTimerUnitHour", "countdownTimerUnitMin", "countdownTimerUnitSec" ],
                            },
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "marginAlign", "maxWidth" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            customhtml: {
                label: OP3._("Custom HTML"),
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "marginAlign", "maxWidth" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            evergreencountdowntimer: {
                label: OP3._("Evergreen Countdown Timer"),
                tab: [
                    {
                        id: "design",
                        label: OP3._("Design"),
                        icon: "op3-icon-wand-99-2",
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "text-customization",
                                label: OP3._("Text Customization"),
                                reset: true,
                                property: [ "countdownTimerUnitDay", "countdownTimerUnitHour", "countdownTimerUnitMin", "countdownTimerUnitSec" ],
                            },
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "marginAlign", "maxWidth" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            facebookbutton: {
                label: OP3._("Facebook Button"),
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            facebookcomments: {
                label: OP3._("Facebook Comments"),
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            faq: {
                label: OP3._("Faq"),
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            faqitem: {
                label: OP3._("Faq Item"),
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "class", "zIndex" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration" ],
                            },
                            {
                                id: "border",
                                label: OP3._("Border & Corners"),
                                reset: true,
                                property: [ "borderActiveHover", "borderTopWidthHover", "borderTopStyleHover", "borderTopColorHover", "borderBottomWidthHover", "borderBottomStyleHover", "borderBottomColorHover", "borderLeftWidthHover", "borderLeftStyleHover", "borderLeftColorHover", "borderRightWidthHover", "borderRightStyleHover", "borderRightColorHover", "borderAllWidthHover", "borderAllStyleHover", "borderAllColorHover", "borderTopLeftRadiusHover", "borderTopRightRadiusHover", "borderBottomLeftRadiusHover", "borderBottomRightRadiusHover" ],
                            },
                        ],
                    },
                ],
            },
            featureblock: {
                label: OP3._("Feature Block"),
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "marginAlign", "width", "matchScreenWidth", "maxWidth", "minHeight", "matchScreenHeight", "justifyContent" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility", "wrapColumns", "flexBasis", "stackColumnsTablet", "stackColumnsTabletReverse", "stackColumnsMobile", "stackColumnsMobileReverse" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration" ],
                            },
                            {
                                id: "background",
                                label: OP3._("Background"),
                                reset: true,
                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition", "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover", "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                filter: [
                                    {
                                        label: OP3._("Background"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Colour"),
                                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition" ],
                                            },
                                            {
                                                label: OP3._("Image"),
                                                property: [ "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover" ],
                                            },
                                            {
                                                label: OP3._("Overlay"),
                                                property: [ "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                id: "border",
                                label: OP3._("Border & Corners"),
                                reset: true,
                                property: [ "borderActiveHover", "borderTopWidthHover", "borderTopStyleHover", "borderTopColorHover", "borderBottomWidthHover", "borderBottomStyleHover", "borderBottomColorHover", "borderLeftWidthHover", "borderLeftStyleHover", "borderLeftColorHover", "borderRightWidthHover", "borderRightStyleHover", "borderRightColorHover", "borderAllWidthHover", "borderAllStyleHover", "borderAllColorHover", "borderTopLeftRadiusHover", "borderTopRightRadiusHover", "borderBottomLeftRadiusHover", "borderBottomRightRadiusHover" ],
                            },
                            {
                                id: "box-shadow",
                                label: OP3._("Box Shadow"),
                                reset: true,
                                property: [ "boxShadowHover", "boxShadowHoverOffsetX", "boxShadowHoverOffsetY", "boxShadowHoverBlur", "boxShadowHoverSpread", "boxShadowHoverColor" ],
                            },
                        ],
                    },
                ],
            },
            featureblockitem: {
                label: OP3._("Feature Block Item"),
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "minHeight", "matchScreenHeight", "justifyContent" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "wrapColumns", "flexBasisColumn", "stackColumnsTablet", "stackColumnsTabletReverse", "stackColumnsMobile", "stackColumnsMobileReverse" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "class", "zIndex" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration" ],
                            },
                            {
                                id: "background",
                                label: OP3._("Background"),
                                reset: true,
                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition", "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover", "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                filter: [
                                    {
                                        label: OP3._("Background"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Colour"),
                                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition" ],
                                            },
                                            {
                                                label: OP3._("Image"),
                                                property: [ "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover" ],
                                            },
                                            {
                                                label: OP3._("Overlay"),
                                                property: [ "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                id: "border",
                                label: OP3._("Border & Corners"),
                                reset: true,
                                property: [ "borderActiveHover", "borderTopWidthHover", "borderTopStyleHover", "borderTopColorHover", "borderBottomWidthHover", "borderBottomStyleHover", "borderBottomColorHover", "borderLeftWidthHover", "borderLeftStyleHover", "borderLeftColorHover", "borderRightWidthHover", "borderRightStyleHover", "borderRightColorHover", "borderAllWidthHover", "borderAllStyleHover", "borderAllColorHover", "borderTopLeftRadiusHover", "borderTopRightRadiusHover", "borderBottomLeftRadiusHover", "borderBottomRightRadiusHover" ],
                            },
                            {
                                id: "box-shadow",
                                label: OP3._("Box Shadow"),
                                reset: true,
                                property: [ "boxShadowHover", "boxShadowHoverOffsetX", "boxShadowHoverOffsetY", "boxShadowHoverBlur", "boxShadowHoverSpread", "boxShadowHoverColor" ],
                            },
                        ],
                    },
                ],
            },
            form: {
                label: OP3._("Optin Form"),
                tab: [
                    {
                        id: "design",
                        label: OP3._("Design"),
                        icon: "op3-icon-wand-99-2",
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "children",
                                label: OP3._("Fields"),
                                reset: false,
                                property: [ "children" ],
                            },
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "marginAlign" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            headline: {
                label: OP3._("Headline"),
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "marginAlign", "maxWidth" ],
                            },
                            {
                                id: "border",
                                label: OP3._("Border"),
                                property: [ "borderActive", "borderTopWidth", "borderTopStyle", "borderTopColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderAllWidth", "borderAllStyle", "borderAllColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration" ],
                            },
                            {
                                id: "typography",
                                label: OP3._("Typography"),
                                reset: true,
                                property: [ "colorHover", "fontWeightHover", "fontStyleHover", "textTransformHover", "textDecorationHover" ],
                            },
                        ],
                    },
                ],
            },
            horizontalline: {
                label: OP3._("Horizontal Line"),
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            icon: {
                label: OP3._("Icon"),
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration" ],
                            },
                        ],
                    },
                ],
            },
            image: {
                label: OP3._("Image"),
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "maxWidth" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration" ],
                            },
                            {
                                id: "background",
                                label: OP3._("Background"),
                                reset: true,
                                property: [ "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                            },
                            {
                                id: "border",
                                label: OP3._("Border & Corners"),
                                reset: true,
                                property: [ "borderActiveHover", "borderTopWidthHover", "borderTopStyleHover", "borderTopColorHover", "borderBottomWidthHover", "borderBottomStyleHover", "borderBottomColorHover", "borderLeftWidthHover", "borderLeftStyleHover", "borderLeftColorHover", "borderRightWidthHover", "borderRightStyleHover", "borderRightColorHover", "borderAllWidthHover", "borderAllStyleHover", "borderAllColorHover", "borderTopLeftRadiusHover", "borderTopRightRadiusHover", "borderBottomLeftRadiusHover", "borderBottomRightRadiusHover" ],
                            },
                            {
                                id: "box-shadow",
                                label: OP3._("Box Shadow"),
                                reset: true,
                                property: [ "boxShadowHover", "boxShadowHoverAngle", "boxShadowHoverDistance", "boxShadowHoverBlur", "boxShadowHoverSpread", "boxShadowHoverColor" ],
                            },
                        ],
                    },
                ],
            },
            input: {
                label: OP3._("Input"),
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Input Positioning"),
                                reset: true,
                                property: [ "inputBoxModel", "inputMarginTop", "inputMarginBottom", "inputMarginLeft", "inputMarginRight", "inputPaddingTop", "inputPaddingBottom", "inputPaddingLeft", "inputPaddingRight", "width" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "class" ],
                            },
                        ],
                    },
                ],
            },
            listmenu: {
                label: OP3._("List Menu"),
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            membershipcontentlist: {
                label: OP3._("Membership Content List"),
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "marginAlign", "width", "matchScreenWidth", "maxWidth", "minHeight", "matchScreenHeight", "justifyContent" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility", "wrapColumns", "flexBasis", "stackColumnsTablet", "stackColumnsTabletReverse", "stackColumnsMobile", "stackColumnsMobileReverse" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration" ],
                            },
                            {
                                id: "background",
                                label: OP3._("Background"),
                                reset: true,
                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition", "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover", "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                filter: [
                                    {
                                        label: OP3._("Background"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Colour"),
                                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition" ],
                                            },
                                            {
                                                label: OP3._("Image"),
                                                property: [ "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover" ],
                                            },
                                            {
                                                label: OP3._("Overlay"),
                                                property: [ "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                id: "border",
                                label: OP3._("Border & Corners"),
                                reset: true,
                                property: [ "borderActiveHover", "borderTopWidthHover", "borderTopStyleHover", "borderTopColorHover", "borderBottomWidthHover", "borderBottomStyleHover", "borderBottomColorHover", "borderLeftWidthHover", "borderLeftStyleHover", "borderLeftColorHover", "borderRightWidthHover", "borderRightStyleHover", "borderRightColorHover", "borderAllWidthHover", "borderAllStyleHover", "borderAllColorHover", "borderTopLeftRadiusHover", "borderTopRightRadiusHover", "borderBottomLeftRadiusHover", "borderBottomRightRadiusHover" ],
                            },
                            {
                                id: "box-shadow",
                                label: OP3._("Box Shadow"),
                                reset: true,
                                property: [ "boxShadowHover", "boxShadowHoverOffsetX", "boxShadowHoverOffsetY", "boxShadowHoverBlur", "boxShadowHoverSpread", "boxShadowHoverColor" ],
                            },
                        ],
                    },
                ],
            },
            membershipcontentlistitem: {
                label: OP3._("Membership Content List Item"),
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "minHeight", "matchScreenHeight", "justifyContent" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "wrapColumns", "flexBasisColumn", "stackColumnsTablet", "stackColumnsTabletReverse", "stackColumnsMobile", "stackColumnsMobileReverse" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "class", "zIndex" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration" ],
                            },
                            {
                                id: "background",
                                label: OP3._("Background"),
                                reset: true,
                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition", "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover", "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                filter: [
                                    {
                                        label: OP3._("Background"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Colour"),
                                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition" ],
                                            },
                                            {
                                                label: OP3._("Image"),
                                                property: [ "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover" ],
                                            },
                                            {
                                                label: OP3._("Overlay"),
                                                property: [ "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                id: "border",
                                label: OP3._("Border & Corners"),
                                reset: true,
                                property: [ "borderActiveHover", "borderTopWidthHover", "borderTopStyleHover", "borderTopColorHover", "borderBottomWidthHover", "borderBottomStyleHover", "borderBottomColorHover", "borderLeftWidthHover", "borderLeftStyleHover", "borderLeftColorHover", "borderRightWidthHover", "borderRightStyleHover", "borderRightColorHover", "borderAllWidthHover", "borderAllStyleHover", "borderAllColorHover", "borderTopLeftRadiusHover", "borderTopRightRadiusHover", "borderBottomLeftRadiusHover", "borderBottomRightRadiusHover" ],
                            },
                            {
                                id: "box-shadow",
                                label: OP3._("Box Shadow"),
                                reset: true,
                                property: [ "boxShadowHover", "boxShadowHoverOffsetX", "boxShadowHoverOffsetY", "boxShadowHoverBlur", "boxShadowHoverSpread", "boxShadowHoverColor" ],
                            },
                        ],
                    },
                ],
            },
            numberblock: {
                label: OP3._("Number Block"),
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "marginAlign", "width", "matchScreenWidth", "maxWidth", "minHeight", "matchScreenHeight", "justifyContent" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility", "wrapColumns", "flexBasis", "stackColumnsTablet", "stackColumnsTabletReverse", "stackColumnsMobile", "stackColumnsMobileReverse" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration" ],
                            },
                            {
                                id: "background",
                                label: OP3._("Background"),
                                reset: true,
                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition", "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover", "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                filter: [
                                    {
                                        label: OP3._("Background"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Colour"),
                                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition" ],
                                            },
                                            {
                                                label: OP3._("Image"),
                                                property: [ "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover" ],
                                            },
                                            {
                                                label: OP3._("Overlay"),
                                                property: [ "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                id: "border",
                                label: OP3._("Border & Corners"),
                                reset: true,
                                property: [ "borderActiveHover", "borderTopWidthHover", "borderTopStyleHover", "borderTopColorHover", "borderBottomWidthHover", "borderBottomStyleHover", "borderBottomColorHover", "borderLeftWidthHover", "borderLeftStyleHover", "borderLeftColorHover", "borderRightWidthHover", "borderRightStyleHover", "borderRightColorHover", "borderAllWidthHover", "borderAllStyleHover", "borderAllColorHover", "borderTopLeftRadiusHover", "borderTopRightRadiusHover", "borderBottomLeftRadiusHover", "borderBottomRightRadiusHover" ],
                            },
                            {
                                id: "box-shadow",
                                label: OP3._("Box Shadow"),
                                reset: true,
                                property: [ "boxShadowHover", "boxShadowHoverOffsetX", "boxShadowHoverOffsetY", "boxShadowHoverBlur", "boxShadowHoverSpread", "boxShadowHoverColor" ],
                            },
                        ],
                    },
                ],
            },
            numberblockitem: {
                label: OP3._("Number Block Item"),
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "wrapColumns", "flexBasisColumn", "stackColumnsTablet", "stackColumnsTabletReverse", "stackColumnsMobile", "stackColumnsMobileReverse" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "class", "zIndex" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration" ],
                            },
                            {
                                id: "background",
                                label: OP3._("Background"),
                                reset: true,
                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition", "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover", "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                filter: [
                                    {
                                        label: OP3._("Background"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Colour"),
                                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition" ],
                                            },
                                            {
                                                label: OP3._("Image"),
                                                property: [ "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover" ],
                                            },
                                            {
                                                label: OP3._("Overlay"),
                                                property: [ "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                id: "border",
                                label: OP3._("Border & Corners"),
                                reset: true,
                                property: [ "borderActiveHover", "borderTopWidthHover", "borderTopStyleHover", "borderTopColorHover", "borderBottomWidthHover", "borderBottomStyleHover", "borderBottomColorHover", "borderLeftWidthHover", "borderLeftStyleHover", "borderLeftColorHover", "borderRightWidthHover", "borderRightStyleHover", "borderRightColorHover", "borderAllWidthHover", "borderAllStyleHover", "borderAllColorHover", "borderTopLeftRadiusHover", "borderTopRightRadiusHover", "borderBottomLeftRadiusHover", "borderBottomRightRadiusHover" ],
                            },
                            {
                                id: "box-shadow",
                                label: OP3._("Box Shadow"),
                                reset: true,
                                property: [ "boxShadowHover", "boxShadowHoverOffsetX", "boxShadowHoverOffsetY", "boxShadowHoverBlur", "boxShadowHoverSpread", "boxShadowHoverColor" ],
                            },
                        ],
                    },
                ],
            },
            popoverlay: {
                label: OP3._("Pop Overlay"),
                tab: [
                    {
                        id: "style",
                        label: OP3._("Style"),
                        icon: "op3-icon-paint-37-2",
                        group: [
                            {
                                id: "general",
                                label: OP3._("Popup General"),
                                reset: true,
                                property: [ "text", "marginTopWrapper", "backgroundColor", "popoverlayContentBackground" ],
                            },
                            {
                                id: "delay",
                                label: OP3._("Delay & Animation"),
                                reset: true,
                                property: [ "animation", "timerCheck", "timer" ],
                            },
                            {
                                id: "background",
                                label: OP3._("Background"),
                                reset: true,
                                property: [ "backgroundImageUrl", "backgroundPosition", "backgroundAttachment", "backgroundRepeat", "backgroundSize" ],
                            },
                            {
                                id: "border",
                                label: OP3._("Popup Borders & Corners"),
                                reset: true,
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderAllWidth", "borderAllStyle", "borderAllColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomLeftRadius", "borderBottomRightRadius" ],
                            },
                            {
                                id: "box-shadow",
                                label: OP3._("Popup Shadow"),
                                reset: true,
                                property: [ "boxShadow", "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "width", "minHeight" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "class", "delete" ],
                            },
                        ],
                    },
                ],
            },
            progressbar: {
                label: OP3._("Progress Bar"),
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            rating: {
                label: OP3._("Rating"),
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            row: {
                label: OP3._("Row"),
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "marginAlign", "width", "matchScreenWidth", "maxWidth" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility", "wrapColumns", "flexBasis", "stackColumnsTablet", "stackColumnsTabletReverse", "stackColumnsMobile", "stackColumnsMobileReverse" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration" ],
                            },
                            {
                                id: "background",
                                label: OP3._("Background"),
                                reset: true,
                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition", "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover", "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                filter: [
                                    {
                                        label: OP3._("Background"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Colour"),
                                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition" ],
                                            },
                                            {
                                                label: OP3._("Image"),
                                                property: [ "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover" ],
                                            },
                                            {
                                                label: OP3._("Overlay"),
                                                property: [ "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                id: "border",
                                label: OP3._("Border & Corners"),
                                reset: true,
                                property: [ "borderActiveHover", "borderTopWidthHover", "borderTopStyleHover", "borderTopColorHover", "borderBottomWidthHover", "borderBottomStyleHover", "borderBottomColorHover", "borderLeftWidthHover", "borderLeftStyleHover", "borderLeftColorHover", "borderRightWidthHover", "borderRightStyleHover", "borderRightColorHover", "borderAllWidthHover", "borderAllStyleHover", "borderAllColorHover", "borderTopLeftRadiusHover", "borderTopRightRadiusHover", "borderBottomLeftRadiusHover", "borderBottomRightRadiusHover" ],
                            },
                            {
                                id: "box-shadow",
                                label: OP3._("Box Shadow"),
                                reset: true,
                                property: [ "boxShadowHover", "boxShadowHoverOffsetX", "boxShadowHoverOffsetY", "boxShadowHoverBlur", "boxShadowHoverSpread", "boxShadowHoverColor" ],
                            },
                        ],
                    },
                ],
            },
            section: {
                label: OP3._("Section"),
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "marginAlign", "width", "maxWidth", "minHeight", "matchScreenHeight", "justifyContent" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "separator",
                                label: OP3._("Separator"),
                                reset: true,
                                property: [ "codeHtmlSeparatorTopType", "colorSeparatorTop", "heightSeparatorTop", "transformSeparatorTopFlipX", "zIndexSeparatorTop", "separatorHtmlSeparatorBottomType", "colorSeparatorBottom", "heightSeparatorBottom", "transformSeparatorBottomFlipX", "zIndexSeparatorBottom" ],
                                filter: [
                                    {
                                        label: OP3._("Dividers"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Top"),
                                                property: [ "codeHtmlSeparatorTopType", "colorSeparatorTop", "heightSeparatorTop", "transformSeparatorTopFlipX", "zIndexSeparatorTop" ],
                                            },
                                            {
                                                label: OP3._("Bottom"),
                                                property: [ "separatorHtmlSeparatorBottomType", "colorSeparatorBottom", "heightSeparatorBottom", "transformSeparatorBottomFlipX", "zIndexSeparatorBottom" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                            {
                                id: "export",
                                label: OP3._("Export Section"),
                                reset: false,
                                property: [ "export" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration" ],
                            },
                            {
                                id: "background",
                                label: OP3._("Background"),
                                reset: true,
                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition", "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover", "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                filter: [
                                    {
                                        label: OP3._("Background"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Colour"),
                                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition" ],
                                            },
                                            {
                                                label: OP3._("Image"),
                                                property: [ "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover" ],
                                            },
                                            {
                                                label: OP3._("Overlay"),
                                                property: [ "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                id: "border",
                                label: OP3._("Border & Corners"),
                                reset: true,
                                property: [ "borderActiveHover", "borderTopWidthHover", "borderTopStyleHover", "borderTopColorHover", "borderBottomWidthHover", "borderBottomStyleHover", "borderBottomColorHover", "borderLeftWidthHover", "borderLeftStyleHover", "borderLeftColorHover", "borderRightWidthHover", "borderRightStyleHover", "borderRightColorHover", "borderAllWidthHover", "borderAllStyleHover", "borderAllColorHover", "borderTopLeftRadiusHover", "borderTopRightRadiusHover", "borderBottomLeftRadiusHover", "borderBottomRightRadiusHover" ],
                            },
                            {
                                id: "box-shadow",
                                label: OP3._("Box Shadow"),
                                reset: true,
                                property: [ "boxShadowHover", "boxShadowHoverOffsetX", "boxShadowHoverOffsetY", "boxShadowHoverBlur", "boxShadowHoverSpread", "boxShadowHoverColor" ],
                            },
                        ],
                    },
                ],
            },
            socialicons: {
                label: OP3._("Social Icons"),
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            soundcloud: {
                label: OP3._("SoundCloud"),
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            spacer: {
                label: OP3._("Spacer"),
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "class" ],
                            },
                        ],
                    },
                ],
            },
            testimonial: {
                label: OP3._("Testimonial"),
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "marginAlign", "width", "matchScreenWidth", "maxWidth", "minHeight", "matchScreenHeight", "justifyContent" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility", "wrapColumns", "flexBasis", "stackColumnsTablet", "stackColumnsTabletReverse", "stackColumnsMobile", "stackColumnsMobileReverse" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration" ],
                            },
                            {
                                id: "background",
                                label: OP3._("Background"),
                                reset: true,
                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition", "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover", "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                filter: [
                                    {
                                        label: OP3._("Background"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Colour"),
                                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition" ],
                                            },
                                            {
                                                label: OP3._("Image"),
                                                property: [ "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover" ],
                                            },
                                            {
                                                label: OP3._("Overlay"),
                                                property: [ "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                id: "border",
                                label: OP3._("Border & Corners"),
                                reset: true,
                                property: [ "borderActiveHover", "borderTopWidthHover", "borderTopStyleHover", "borderTopColorHover", "borderBottomWidthHover", "borderBottomStyleHover", "borderBottomColorHover", "borderLeftWidthHover", "borderLeftStyleHover", "borderLeftColorHover", "borderRightWidthHover", "borderRightStyleHover", "borderRightColorHover", "borderAllWidthHover", "borderAllStyleHover", "borderAllColorHover", "borderTopLeftRadiusHover", "borderTopRightRadiusHover", "borderBottomLeftRadiusHover", "borderBottomRightRadiusHover" ],
                            },
                            {
                                id: "box-shadow",
                                label: OP3._("Box Shadow"),
                                reset: true,
                                property: [ "boxShadowHover", "boxShadowHoverOffsetX", "boxShadowHoverOffsetY", "boxShadowHoverBlur", "boxShadowHoverSpread", "boxShadowHoverColor" ],
                            },
                        ],
                    },
                ],
            },
            testimonialitem: {
                label: OP3._("Testimonial Item"),
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "minHeight", "matchScreenHeight", "justifyContent" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "wrapColumns", "flexBasisColumn", "stackColumnsTablet", "stackColumnsTabletReverse", "stackColumnsMobile", "stackColumnsMobileReverse" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "class", "zIndex" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration" ],
                            },
                            {
                                id: "background",
                                label: OP3._("Background"),
                                reset: true,
                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition", "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover", "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                filter: [
                                    {
                                        label: OP3._("Background"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Colour"),
                                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition" ],
                                            },
                                            {
                                                label: OP3._("Image"),
                                                property: [ "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover" ],
                                            },
                                            {
                                                label: OP3._("Overlay"),
                                                property: [ "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                id: "border",
                                label: OP3._("Border & Corners"),
                                reset: true,
                                property: [ "borderActiveHover", "borderTopWidthHover", "borderTopStyleHover", "borderTopColorHover", "borderBottomWidthHover", "borderBottomStyleHover", "borderBottomColorHover", "borderLeftWidthHover", "borderLeftStyleHover", "borderLeftColorHover", "borderRightWidthHover", "borderRightStyleHover", "borderRightColorHover", "borderAllWidthHover", "borderAllStyleHover", "borderAllColorHover", "borderTopLeftRadiusHover", "borderTopRightRadiusHover", "borderBottomLeftRadiusHover", "borderBottomRightRadiusHover" ],
                            },
                            {
                                id: "box-shadow",
                                label: OP3._("Box Shadow"),
                                reset: true,
                                property: [ "boxShadowHover", "boxShadowHoverOffsetX", "boxShadowHoverOffsetY", "boxShadowHoverBlur", "boxShadowHoverSpread", "boxShadowHoverColor" ],
                            },
                        ],
                    },
                ],
            },
            text: {
                label: OP3._("Text Editor"),
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "marginAlign", "maxWidth" ],
                            },
                            {
                                id: "border",
                                label: OP3._("Border"),
                                property: [ "borderActive", "borderTopWidth", "borderTopStyle", "borderTopColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderAllWidth", "borderAllStyle", "borderAllColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration" ],
                            },
                            {
                                id: "typography",
                                label: OP3._("Typography"),
                                reset: true,
                                property: [ "colorHover", "fontWeightHover", "fontStyleHover", "textTransformHover", "textDecorationHover" ],
                            },
                        ],
                    },
                ],
            },
            treemenu: {
                label: OP3._("WP Menu"),
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "marginAlign", "width", "matchScreenWidth" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility", "stackColumnsDesktop", "stackColumnsTablet", "stackColumnsMobile", "hamburgerFontSize", "hamburgerColor", "hamburgerJustifyContent", "hamburgerIconVisible", "hamburgerIcon", "hamburgerTextVisible", "hamburgerTextLabel", "hamburgerIconOrder", "hamburgerMarginLeft", "hamburgerMarginRight", "treeMenuStyling", "hamburgerSidebarWidth", "hamburgerBackgroundColor", "hamburgerIconClose", "hamburgerIconCloseColor", "hamburgerIconCloseFontSize", "hamburgerIconCloseVerticalOffset", "hamburgerTriangleVisible", "hamburgerTriangleSize", "hamburgerTriangleTop" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "class", "zIndex"],
                            },
                        ],
                    },
                ],
            },
            treemenuitem: {
                label: OP3._("Menu Item"),
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "childwrap-positioning",
                                label: OP3._("Subitems Positioning"),
                                reset: true,
                                property: [ "childWrapBoxModel", "childWrapMarginTop", "childWrapMarginBottom", "childWrapMarginLeft", "childWrapMarginRight", "childWrapPaddingTop", "childWrapPaddingBottom", "childWrapPaddingLeft", "childWrapPaddingRight", "submenuAlign" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "shadow",
                                label: OP3._("Shadow Styling"),
                                property: [ "childWrapBoxShadowAngle", "childWrapBoxShadowDistance", "childWrapBoxShadowBlur", "childWrapBoxShadowSpread", "childWrapBoxShadowColor" ],
                            },
                            {
                                id: "triangle",
                                label: OP3._("Triangle"),
                                property: [ "triangleVisible", "triangleSize", "triangleTop", "triangleLeft", "triangleMarginRight", "triangleMarginBottom" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "class", "zIndex" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration" ],
                            },
                            {
                                id: "border",
                                label: OP3._("Border"),
                                reset: true,
                                property: [ "borderActiveHover", "borderTopWidthHover", "borderTopStyleHover", "borderTopColorHover", "borderBottomWidthHover", "borderBottomStyleHover", "borderBottomColorHover", "borderLeftWidthHover", "borderLeftStyleHover", "borderLeftColorHover", "borderRightWidthHover", "borderRightStyleHover", "borderRightColorHover", "borderAllWidthHover", "borderAllStyleHover", "borderAllColorHover" ],
                            },
                        ],
                    },
                ],
            },
            video: {
                label: OP3._("Video"),
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            videothumbnail: {
                label: OP3._("Video Thumbnail"),
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
        }

        return result;
    };

})(jQuery, window, document);
