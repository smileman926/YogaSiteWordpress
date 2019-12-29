/**
 * OptimizePress3 live-editor extension
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-query.js
 *     - op3-live-editor.js
 *     - op3-live-editor-toolbar.js
 */
;(function($, window, document) {

    "use strict";

    // set configuration for each element type
    window.OP3.Toolbar._config = function() {
        var result = {
            arrow: {
                label: OP3._("Arrow"),
                nav: [
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Colour"),
                                property: [ "color" ],
                            },
                        ],
                    },
                    {
                        id: "size",
                        label: OP3._("Size Options"),
                        icon: "op3-icon-size-large-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Size"),
                                property: [ "height", "transformRotate" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment Options"),
                        icon: "op3-icon-align-center-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Text"),
                                property: [ "textAlign" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom", "maxWidth", "marginAlign" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="settings"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            bulletblock: {
                label: OP3._("Bullet Block"),
                nav: [
                    {
                        id: "add",
                        label: OP3._("Add Bullet List"),
                        icon: "op3-icon-circle-add-1",
                        action: "addElement",
                        args: [ "bulletblock", "bulletlist" ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment Options"),
                        icon: "op3-icon-align-horizontal",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Align"),
                                property: [ "marginAlign", "maxWidth" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom", "maxWidth", "marginAlign" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="settings"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            bulletlist: {
                label: OP3._("Bullet List"),
                nav: [
                    {
                        id: "add",
                        label: OP3._("Add Bullet List"),
                        icon: "op3-icon-circle-add-1",
                        action: "addElement",
                        args: [ "bulletblock", "bulletlist" ],
                    },
                    {
                        id: "bullet-list",
                        label: OP3._("Bullet List"),
                        icon: "op3-icon-list-bullet-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Bullet List Settings"),
                                property: [ "op3Icon", "fontSize", "marginBottom", "iconFontSize", "iconSpacing", "iconVerticalPosition" ],
                                filter: [
                                    {
                                        label: OP3._("Icon Properties"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Size"),
                                                property: [ "iconFontSize" ],
                                            },
                                            {
                                                label: OP3._("Spacing"),
                                                property: [ "iconSpacing" ],
                                            },
                                            {
                                                label: OP3._("Vertical Position"),
                                                property: [ "iconVerticalPosition" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: "text",
                        label: OP3._("Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Font"),
                                property: [ "fontFamily", "fontWeight" ],
                            },
                            {
                                label: OP3._("Size"),
                                property: [ "fontSize", "lineHeight", "letterSpacing" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "fontStyle", "textTransform", "textDecoration" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Text Colour"),
                                property: [ "color" ],
                            },
                            {
                                label: OP3._("Icon Colour"),
                                property: [ "iconColor" ],
                            },
                            {
                                label: OP3._("Background Colour"),
                                property: [ "backgroundColor" ],
                            },
                        ],
                    },
                    {
                        id: "link",
                        label: OP3._("Link Options"),
                        icon: "op3-icon-link-72-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Link Action"),
                                property: [ "action", "href", "target", "popOverlayTrigger", "relNoFollow", "createVideoPopoverlay" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderActive", "borderTopWidth", "borderTopStyle", "borderTopColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderAllWidth", "borderAllStyle", "borderAllColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover State"),
                        icon: "op3-icon-cursor-pointer",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Text Colour"),
                                property: [ "colorHover" ],
                            },
                            {
                                label: OP3._("Icon Colour"),
                                property: [ "iconColorHover" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "settings",
                    },
                ],
            },
            button: {
                label: OP3._("Button"),
                nav: [
                    {
                        id: "button",
                        label: OP3._("Button Settings"),
                        icon: "op3-icon-button-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Sizing"),
                                property: [ "buttonSize", "maxWidth", "height" ],
                            },
                            {
                                label: OP3._("Icon"),
                                property: [ "visible", "op3Icon", "iconSize", "iconDirection", "iconSpacing", "iconColor" ],
                                filter: [
                                    {
                                        label: OP3._("Icon Properties"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Size"),
                                                property: [ "iconSize" ],
                                            },
                                            {
                                                label: OP3._("Position"),
                                                property: [ "iconDirection" ],
                                            },
                                            {
                                                label: OP3._("Spacing"),
                                                property: [ "iconSpacing" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                label: OP3._("Subtext"),
                                property: [ "subtextVisible", "fontWeightSubtext", "fontStyleSubtext", "textTransformSubtext", "textDecorationSubtext", "fontSizeSubtext", "letterSpacingSubtext", "offsetXSubtext", "offsetYSubtext" ],
                                filter: [
                                    {
                                        label: OP3._("Subtext Properties"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Styling"),
                                                property: [ "fontWeightSubtext", "fontStyleSubtext", "textTransformSubtext", "textDecorationSubtext" ],
                                            },
                                            {
                                                label: OP3._("Sizing"),
                                                property: [ "fontSizeSubtext", "letterSpacingSubtext" ],
                                            },
                                            {
                                                label: OP3._("Position"),
                                                property: [ "offsetXSubtext", "offsetYSubtext" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: "text",
                        label: OP3._("Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Font"),
                                property: [ "fontFamily", "fontWeight" ],
                            },
                            {
                                label: OP3._("Size"),
                                property: [ "fontSize", "lineHeight", "letterSpacing" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "fontStyle", "textTransform", "textDecoration", "textShadow" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Background"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                            {
                                label: OP3._("Text"),
                                property: [ "color" ],
                            },
                        ],
                    },
                    {
                        id: "text-align",
                        label: OP3._("Text Align"),
                        icon: "op3-icon-align-center-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Text Align"),
                                property: [ "buttonAlignText" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment Options"),
                        icon: "op3-icon-align-horizontal",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Align"),
                                property: [ "marginAlign" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderPresets", "borderRadiusPresets" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Inner Shadow"),
                                property: [ "boxShadowInsetPresets" ],
                            },
                        ],
                    },
                    {
                        id: "link",
                        label: OP3._("Link Options"),
                        icon: "op3-icon-link-72-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Link Action"),
                                property: [ "action", "href", "target", "relNoFollow", "popOverlayTrigger", "selectFunnelStep", "createVideoPopoverlay" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover State"),
                        icon: "op3-icon-cursor-pointer",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Hover State"),
                                property: [ "transitionDuration", "filterBrightnessHover" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="settings"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            checkbox: {
                label: OP3._("Checkbox"),
                nav: [
                    {
                        id: "input-settings",
                        label: OP3._("Checkbox Settings"),
                        icon: "op3-icon-window-paragraph-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Input"),
                                property: [ "required", "requiredLock", "checked" ],
                            },
                            {
                                label: OP3._("Label"),
                                property: [ "labelSpacing" ],
                            },
                            {
                                label: OP3._("Validation"),
                                property: [ "urlMapping", "inputValidationMessage" ],
                            },
                        ],
                    },
                    {
                        id: "text-label",
                        label: OP3._("Label Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Font"),
                                property: [ "fontFamily", "fontWeight" ],
                            },
                            {
                                label: OP3._("Size"),
                                property: [ "fontSize", "lineHeight", "letterSpacing" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "fontStyle", "textTransform", "textDecoration" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Label"),
                                property: [ "color" ],
                            },
                        ],
                    },
                ],
            },
            column: {
                label: OP3._("Column"),
                nav: [
                    {
                        id: "background",
                        label: OP3._("Background Options"),
                        icon: "op3-icon-image-5",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Colour"),
                                property: [ "backgroundImageBaseType", "backgroundColorBase", "backgroundImageBaseAngle", "backgroundImageBasePosition", "backgroundImageBaseStartColor", "backgroundImageBaseStartPosition", "backgroundImageBaseStopColor", "backgroundImageBaseStopPosition" ],
                            },
                            {
                                label: OP3._("Image"),
                                property: [ "backgroundImageUrl", "opacity100", "backgroundPosition", "backgroundAttachment", "backgroundRepeat", "backgroundSize" ],
                                filter: [
                                    {
                                        label: OP3._("Image Properties"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Position"),
                                                property: [ "backgroundPosition" ],
                                            },
                                            {
                                                label: OP3._("Attachment"),
                                                property: [ "backgroundAttachment" ],
                                            },
                                            {
                                                label: OP3._("Repeat"),
                                                property: [ "backgroundRepeat" ],
                                            },
                                            {
                                                label: OP3._("Size"),
                                                property: [ "backgroundSize" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                label: OP3._("Overlay"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderActive", "borderTopWidth", "borderTopStyle", "borderTopColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderAllWidth", "borderAllStyle", "borderAllColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment Options"),
                        icon: "op3-icon-align-center-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Text"),
                                property: [ "textAlign" ],
                            },
                        ],
                    },
                    {
                        id: "vertical-alignment",
                        label: OP3._("Vertical Alignment"),
                        icon: "op3-icon-align-vertical",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Vertical Alignment"),
                                property: [ "minHeight", "matchScreenHeight", "justifyContent" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "gutter", "marginTop", "marginBottom" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="settings"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            contenttoggle: {
                label: OP3._("Content Toggle"),
                nav: [
                    {
                        id: "add",
                        label: OP3._("Add Content Toggle Item"),
                        icon: "op3-icon-circle-add-1",
                        action: "addElement",
                        args: [ "contenttoggle", "contenttoggleitem" ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment Options"),
                        icon: "op3-icon-align-horizontal",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Align"),
                                property: [ "marginAlign", "width" ],
                            },
                        ],
                    },
                    {
                        id: "contenttoggle",
                        label: OP3._("Content Toggle Options"),
                        icon: "op3-icon-ui-04-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Content Toggle Options"),
                                property: [ "closeOtherTabs" ]
                            }
                        ]
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="settings"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            contenttoggleitem: {
                label: OP3._("Content Toggle Item"),
                nav: [
                    {
                        id: "add",
                        label: OP3._("Add Content Toggle Item"),
                        icon: "op3-icon-circle-add-1",
                        action: "addElement",
                        args: [ "contenttoggle", "contenttoggleitem" ],
                    },
                    {
                        id: "contenttoggleitem",
                        label: OP3._("Content Toggle Item Options"),
                        icon: "op3-icon-ui-03-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Content Toggle Item Options"),
                                property: [ "marginBottom", "faqItemIconPosition" ],
                            },
                        ],
                    },
                    {
                        id: "text",
                        label: OP3._("Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Header Text Options"),
                                property: [ "fontFamily", "fontWeight", "fontSize" ],
                            },
                        ],
                    },
                    {
                        id: "icon",
                        label: OP3._("Open / Close Icon"),
                        icon: "op3-icon-shape-star-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Open / Close Icon"),
                                property: [ "op3Icon", "op3Icon2", "fontSizeIcon" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Header Background"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                            {
                                label: OP3._("Content Background"),
                                property: [ "backgroundImageContentType", "backgroundColorContent", "backgroundImageContentAngle", "backgroundImageContentPosition", "backgroundImageContentStartColor", "backgroundImageContentStartPosition", "backgroundImageContentStopColor", "backgroundImageContentStopPosition" ],
                            },
                            {
                                label: OP3._("Text"),
                                property: [ "color" ],
                            },
                            {
                                label: OP3._("Icon"),
                                property: [ "iconColor" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderActive", "borderTopWidth", "borderTopStyle", "borderTopColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderAllWidth", "borderAllStyle", "borderAllColor", ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },

                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover State"),
                        icon: "op3-icon-cursor-pointer",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Header Bg"),
                                property: [ "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                            },
                            {
                                label: OP3._("Content Bg"),
                                property: [ "backgroundImageContentHoverType", "backgroundColorContentHover", "backgroundImageContentHoverAngle", "backgroundImageContentHoverPosition", "backgroundImageContentHoverStartColor", "backgroundImageContentHoverStartPosition", "backgroundImageContentHoverStopColor", "backgroundImageContentHoverStopPosition" ],
                            },
                            {
                                label: OP3._("Text"),
                                property: [ "colorHover" ],
                            },
                            {
                                label: OP3._("Icon"),
                                 property: [ "iconColorHover" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [  ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="settings"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            countdowntimer: {
                label: OP3._("Countdown Timer"),
                nav: [
                    {
                        id: "countdown",
                        label: OP3._("Countdown Settings"),
                        icon: "op3-icon-calendar-grid-61-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Countdown Settings"),
                                property: [ "dateTime", "countdownFinishAction", "redirectUrl", "text" ],
                            },
                        ],
                    },
                    {
                        id: "text",
                        label: OP3._("Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Font"),
                                property: [ "fontFamily", "fontWeight", "unitsTextTransform" ],
                            },
                            {
                                label: OP3._("Size"),
                                property: [ "digitsFontSize", "unitsFontSize" ],
                            },
                            {
                                label: OP3._("Custom"),
                                property: [ "flexDirectionVertical", "wrapperMarginRight" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Digits Colour"),
                                property: [ "digitsColor" ],
                            },
                            {
                                label: OP3._("Units Colour"),
                                property: [ "unitsColor" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom", "maxWidth", "marginAlign" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="settings"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            customhtml: {
                label: OP3._("Custom HTML"),
                nav: [
                    {
                        id: "code",
                        label: OP3._("Custom HTML code"),
                        icon: "op3-icon-code-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Custom HTML code"),
                                property: [ "codeHtml" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom", "maxWidth", "marginAlign" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="settings"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            evergreencountdowntimer: {
                label: OP3._("Evergreen Countdown Timer"),
                nav: [
                    {
                        id: "evergreencountdowntimer",
                        label: OP3._("Evergreen Countdown Settings"),
                        icon: "op3-icon-calendar-grid-61-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Evergreen Countdown Settings"),
                                property: [ "uuid", "linkEvergreen", "day", "hour", "minute", "second", "countdownFinishAction", "redirectUrl", "text", "restartTimer", "restartDay", "restartHour" ],
                            },
                        ],
                    },
                    {
                        id: "text",
                        label: OP3._("Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Font"),
                                property: [ "fontFamily", "fontWeight", "unitsTextTransform" ],
                            },
                            {
                                label: OP3._("Size"),
                                property: [ "digitsFontSize", "unitsFontSize" ],
                            },
                            {
                                label: OP3._("Custom"),
                                property: [ "flexDirectionVertical", "wrapperMarginRight" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Digits Colour"),
                                property: [ "digitsColor" ],
                            },
                            {
                                label: OP3._("Units Colour"),
                                property: [ "unitsColor" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom", "maxWidth", "marginAlign" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="settings"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            facebookbutton: {
                label: OP3._("Facebook Button"),
                nav: [
                    {
                        id: "facebook-button",
                        label: OP3._("Button Settings"),
                        icon: "op3-icon-thumb-up-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Button Settings"),
                                property: [ "facebookLayout", "facebookWidth", "facebookAction", "facebookSize" ],
                            },
                            {
                                label: OP3._("Advanced Settings"),
                                property: [ "facebookHrefType", "facebookHref", "facebookColorscheme", "facebookShareProxy", "facebookFacesProxy" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment Options"),
                        icon: "op3-icon-align-horizontal",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Align"),
                                property: [ "textAlign" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="settings"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            facebookcomments: {
                label: OP3._("Facebook Comments"),
                nav: [
                    {
                        id: "facebook-comments",
                        label: OP3._("Comments Settings"),
                        icon: "op3-icon-chat-33-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Comments Settings"),
                                property: [ "facebookNumposts", "facebookOrderby", "facebookHrefType", "facebookHref" ],
                            },
                            {
                                label: OP3._("Advanced Settings"),
                                property: [ "facebookColorscheme", "maxWidth"],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment Options"),
                        icon: "op3-icon-align-horizontal",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Align"),
                                property: [ "marginAlign" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="settings"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            faq: {
                label: OP3._("Faq"),
                nav: [
                    {
                        id: "add",
                        label: OP3._("Add Faq Item"),
                        icon: "op3-icon-circle-add-1",
                        action: "addElement",
                        args: [ "faq", "faqitem" ],
                    },
                    {
                        id: "faq",
                        label: OP3._("Faq Options"),
                        icon: "op3-icon-ui-04-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Faq Options"),
                                property: [ "closeOtherTabs" ]
                            }
                        ]
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment Options"),
                        icon: "op3-icon-align-horizontal",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Align"),
                                property: [ "marginAlign", "maxWidth" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="settings"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            faqitem: {
                label: OP3._("Faq Item"),
                nav: [
                    {
                        id: "add",
                        label: OP3._("Add Faq Item"),
                        icon: "op3-icon-circle-add-1",
                        action: "addElement",
                        args: [ "faq", "faqitem" ],
                    },
                    {
                        id: "faqitem",
                        label: OP3._("Faq Item Options"),
                        icon: "op3-icon-ui-03-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Faq Item Options"),
                                property: [ "marginBottom", "faqItemIconPosition" ],
                            },
                        ],
                    },
                    {
                        id: "text",
                        label: OP3._("Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Header Text Options"),
                                property: [ "fontFamily", "fontWeight", "fontSize" ],
                            },
                        ],
                    },
                    {
                        id: "icon",
                        label: OP3._("Open / Close Icon"),
                        icon: "op3-icon-shape-star-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Open / Close Icon"),
                                property: [ "op3Icon", "op3Icon2", "fontSizeIcon" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Header Bg"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                            {
                                label: OP3._("Content Bg"),
                                property: [ "backgroundImageContentType", "backgroundColorContent", "backgroundImageContentAngle", "backgroundImageContentPosition", "backgroundImageContentStartColor", "backgroundImageContentStartPosition", "backgroundImageContentStopColor", "backgroundImageContentStopPosition" ],
                            },
                            {
                                label: OP3._("Text"),
                                property: [ "color" ],
                            },
                            {
                                label: OP3._("Icon"),
                                property: [ "iconColor" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderActive", "borderTopWidth", "borderTopStyle", "borderTopColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderAllWidth", "borderAllStyle", "borderAllColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover State"),
                        icon: "op3-icon-cursor-pointer",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Header Bg"),
                                property: [ "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                            },
                            {
                                label: OP3._("Content Bg"),
                                property: [ "backgroundImageContentHoverType", "backgroundColorContentHover", "backgroundImageContentHoverAngle", "backgroundImageContentHoverPosition", "backgroundImageContentHoverStartColor", "backgroundImageContentHoverStartPosition", "backgroundImageContentHoverStopColor", "backgroundImageContentHoverStopPosition" ],
                            },
                            {
                                label: OP3._("Text"),
                                property: [ "colorHover" ],
                            },
                            {
                                label: OP3._("Icon"),
                                property: [ "iconColorHover" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="settings"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            featureblock: {
                label: OP3._("Feature Block"),
                nav: [
                    {
                        id: "add",
                        label: OP3._("Add Feature Block Item"),
                        icon: "op3-icon-circle-add-1",
                        action: "addElement",
                        args: [ "featureblock", "featureblockitem" ],
                    },
                    {
                        id: "block-order",
                        label: OP3._("Block Order"),
                        icon: "op3-icon-paragraph-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Block Order"),
                                property: [ "blockLayoutDesktop", "blockLayoutTablet", "blockLayoutMobile", "flexBasisSteps" ],
                            },
                            {
                                label: OP3._("Block Visibility"),
                                property: [ "blockDisplayMedia", "blockDisplaySubtitle", "blockDisplayText", "blockDisplayButton" ],
                            },
                        ],
                    },
                    {
                        id: "background",
                        label: OP3._("Background Options"),
                        icon: "op3-icon-image-5",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Colour"),
                                property: [ "backgroundImageBaseType", "backgroundColorBase", "backgroundImageBaseAngle", "backgroundImageBasePosition", "backgroundImageBaseStartColor", "backgroundImageBaseStartPosition", "backgroundImageBaseStopColor", "backgroundImageBaseStopPosition" ],
                            },
                            {
                                label: OP3._("Image"),
                                property: [ "backgroundImageUrl", "opacity100", "backgroundPosition", "backgroundAttachment", "backgroundRepeat", "backgroundSize" ],
                                filter: [
                                    {
                                        label: OP3._("Image Properties"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Position"),
                                                property: [ "backgroundPosition" ],
                                            },
                                            {
                                                label: OP3._("Attachment"),
                                                property: [ "backgroundAttachment" ],
                                            },
                                            {
                                                label: OP3._("Repeat"),
                                                property: [ "backgroundRepeat" ],
                                            },
                                            {
                                                label: OP3._("Size"),
                                                property: [ "backgroundSize" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                label: OP3._("Overlay"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderActive", "borderTopWidth", "borderTopStyle", "borderTopColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderAllWidth", "borderAllStyle", "borderAllColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Vertical Alignment"),
                        icon: "op3-icon-align-vertical",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Vertical Alignment"),
                                property: [ "minHeight", "matchScreenHeight", "justifyContent" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "gutter", "marginTop", "marginBottom", "width", "marginAlign" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="settings"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            featureblockitem: {
                label: OP3._("Feature Block Item"),
                nav: [
                    {
                        id: "add",
                        label: OP3._("Add Feature Block Item"),
                        icon: "op3-icon-circle-add-1",
                        action: "addElement",
                        args: [ "featureblock", "featureblockitem" ],
                    },
                    {
                        id: "background",
                        label: OP3._("Background Options"),
                        icon: "op3-icon-image-5",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Colour"),
                                property: [ "backgroundImageBaseType", "backgroundColorBase", "backgroundImageBaseAngle", "backgroundImageBasePosition", "backgroundImageBaseStartColor", "backgroundImageBaseStartPosition", "backgroundImageBaseStopColor", "backgroundImageBaseStopPosition" ],
                            },
                            {
                                label: OP3._("Image"),
                                property: [ "backgroundImageUrl", "opacity100", "backgroundPosition", "backgroundAttachment", "backgroundRepeat", "backgroundSize" ],
                                filter: [
                                    {
                                        label: OP3._("Image Properties"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Position"),
                                                property: [ "backgroundPosition" ],
                                            },
                                            {
                                                label: OP3._("Attachment"),
                                                property: [ "backgroundAttachment" ],
                                            },
                                            {
                                                label: OP3._("Repeat"),
                                                property: [ "backgroundRepeat" ],
                                            },
                                            {
                                                label: OP3._("Size"),
                                                property: [ "backgroundSize" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                label: OP3._("Overlay"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderActive", "borderTopWidth", "borderTopStyle", "borderTopColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderAllWidth", "borderAllStyle", "borderAllColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "vertical-alignment",
                        label: OP3._("Vertical Alignment"),
                        icon: "op3-icon-align-vertical",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Vertical Alignment"),
                                property: [ "minHeight", "matchScreenHeight", "justifyContent" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "gutter", "columnGap", "marginTop", "marginBottom" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="settings"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            form: {
                label: OP3._("Optin Form"),
                nav: [
                    {
                        id: "integration",
                        label: OP3._("Integration Options"),
                        icon: "op3-icon-link-2-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Integration"),
                                property: [ "optinIntegration" ],
                            },
                        ],
                    },
                    {
                        id: "form",
                        label: OP3._("Form Styling"),
                        icon: "op3-icon-window-paragraph-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Form Styling"),
                                property: [ "width", "optinFieldLayout", "alignItems" ],
                            },
                            {
                                label: OP3._("Field Sizing"),
                                property: [ "fieldWidthDefault", "fieldWidthDefaultInline", "spacing" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Form"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "form-borders",
                        label: OP3._("Form Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderActive", "borderStyle", "borderColor", "borderTopWidth", "borderTopStyle", "borderTopColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderAllWidth", "borderAllStyle", "borderAllColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomLeftRadius", "borderBottomRightRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom", "marginAlign" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="settings"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            headline: {
                label: OP3._("Headline"),
                nav: [
                    {
                        id: "text",
                        label: OP3._("Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Font"),
                                property: [ "fontFamily", "fontWeight" ],
                            },
                            {
                                label: OP3._("Size"),
                                property: [ "fontSize", "lineHeight", "letterSpacing" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "tag", "fontStyle", "textTransform", "textDecoration" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Text Colour"),
                                property: [ "color" ],
                            },
                            {
                                label: OP3._("Background"),
                                property: [ "backgroundColorOverlay" ],
                            },
                        ],
                    },
                    {
                        id: "text-align",
                        label: OP3._("Text Align"),
                        icon: "op3-icon-align-center-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Text Align"),
                                property: [ "textAlign" ],
                            },
                        ],
                    },
                    {
                        id: "shadow",
                        label: OP3._("Text Shadow"),
                        icon: "op3-icon-single-copy-06-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Presets"),
                                property: [ "textShadow" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "textShadowAngle", "textShadowDistance", "textShadowBlurRadius", "textShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom", "maxWidth", "marginAlign" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="settings"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            horizontalline: {
                label: OP3._("Horizontal Line"),
                nav: [
                    {
                        id: "horizontal-line",
                        label: OP3._("Horizontal Line Settings"),
                        icon: "op3-icon-simple-delete-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Horizontal Line Settings"),
                                property: [ "borderTopStyle", "horizontalLineHeight", "maxWidth" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Colour"),
                                property: [ "horizontalLineColor" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment Options"),
                        icon: "op3-icon-align-horizontal",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Align"),
                                property: [ "marginAlign" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="settings"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            icon: {
                label: OP3._("Icon"),
                nav: [
                    {
                        id: "add",
                        label: OP3._("Add Icon Element"),
                        icon: "op3-icon-circle-add-1",
                        action: "addElement",
                        args: [ "socialicons", "icon" ],
                    },
                    {
                        id: "icon",
                        label: OP3._("Icon"),
                        icon: "op3-icon-shape-star-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Icon"),
                                property: [ "op3Icon", "fontSize", "lineHeight" ],
                            },
                            {
                                label: OP3._("Icon Background"),
                                property: [ "iconFrame", "iconShape", "padding", "borderAllWidth" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Colour"),
                                property: [ "color" ],
                            },
                            {
                                label: OP3._("Background"),
                                property: [ "backgroundColor" ],
                            },
                            {
                                label: OP3._("Border"),
                                property: [ "borderColor" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment Options"),
                        icon: "op3-icon-align-horizontal",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Align"),
                                property: [ "marginAlign" ],
                            },
                        ],
                    },
                    {
                        id: "link",
                        label: OP3._("Link Options"),
                        icon: "op3-icon-link-72-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Link Action"),
                                property: [ "href", "target", "relNoFollow" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover State"),
                        icon: "op3-icon-cursor-pointer",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Colour"),
                                property: [ "colorHover" ],
                            },
                            {
                                label: OP3._("Background"),
                                property: [ "backgroundColorHover" ],
                            },
                            {
                                label: OP3._("Border"),
                                property: [ "borderColorHover" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom", "columnGapParent" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="settings"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            image: {
                label: OP3._("Image"),
                nav: [
                    {
                        id: "image",
                        label: OP3._("Image Options"),
                        icon: "op3-icon-image-5",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Image"),
                                property: [ "src", "width", "title", "alt",  ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Image Overlay"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderActive", "borderTopWidth", "borderTopStyle", "borderTopColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderAllWidth", "borderAllStyle", "borderAllColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment Options"),
                        icon: "op3-icon-align-horizontal",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Align"),
                                property: [ "marginAlign" ],
                            },
                        ],
                    },
                    {
                        id: "link",
                        label: OP3._("Link Options"),
                        icon: "op3-icon-link-72-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Link Action"),
                                property: [ "action", "href", "target", "relNoFollow", "popOverlayTrigger", "selectFunnelStep", "createVideoPopoverlay" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover State"),
                        icon: "op3-icon-cursor-pointer",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Overlay"),
                                property: [ "backgroundColorOverlayHover" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadowHover" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowHoverAngle", "boxShadowHoverDistance", "boxShadowHoverBlur", "boxShadowHoverSpread", "boxShadowHoverColor" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom", "columnGapParent" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="settings"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            input: {
                label: OP3._("Input"),
                nav: [
                    {
                        id: "input-settings",
                        label: OP3._("Input Settings"),
                        icon: "op3-icon-window-paragraph-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Label"),
                                property: [ "labelVisible", "labelSpacing" ],
                            },
                            {
                                label: OP3._("Input"),
                                property: [ "required", "requiredLock", "value", "placeholder"],
                            },
                            {
                                label: OP3._("Icon"),
                                property: [ "iconVisible", "op3Icon", "iconFontSize", "iconSpacing", "iconFlexDirection" ],
                            },
                            {
                                label: OP3._("Validation"),
                                property: [ "urlMapping", "inputValidationMessage" ],
                            },
                        ],
                    },
                    {
                        id: "text-label",
                        label: OP3._("Label Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Label Font"),
                                property: [ "fontFamily", "fontWeight" ],
                            },
                            {
                                label: OP3._("Label Size"),
                                property: [ "fontSize", "lineHeight", "letterSpacing" ],
                            },
                            {
                                label: OP3._("Label Styling"),
                                property: [ "fontStyle", "textTransform", "textDecoration" ],
                            },
                        ],
                    },
                    {
                        id: "text-field",
                        label: OP3._("Field Text Options"),
                        icon: "op3-icon-caps-small-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Field Font"),
                                property: [ "fieldFontFamily", "fieldFontWeight" ],
                            },
                            {
                                label: OP3._("Field Size"),
                                property: [ "fieldFontSize", "fieldLineHeight", "fieldLetterSpacing" ],
                            },
                            {
                                label: OP3._("Field Styling"),
                                property: [ "fieldFontStyle", "fieldTextTransform" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Label"),
                                property: [ "color" ],
                            },
                            {
                                label: OP3._("Field"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                            {
                                label: OP3._("Placeholder"),
                                property: [ "placeholderColor"],
                            },
                            {
                                label: OP3._("Icon"),
                                property: [ "iconColor"],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderActive", "borderTopWidth", "borderTopStyle", "borderTopColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderAllWidth", "borderAllStyle", "borderAllColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                ],
            },
            listmenu: {
                label: OP3._("List Menu"),
                nav: [
                    {
                        id: "list-menu",
                        label: OP3._("List Menu"),
                        icon: "op3-icon-menu-34-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("List Menu"),
                                property: [ "menuName", "titleSpacing", "linkSpacing", "submenuIndent" ],
                            },
                        ],
                    },
                    {
                        id: "text",
                        label: OP3._("Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Font"),
                                property: [ "titleFontFamily", "titleFontWeight" ],
                            },
                            {
                                label: OP3._("Size"),
                                property: [ "titleFontSize", "titleLineHeight", "titleLetterSpacing" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "titleFontStyle", "titleTextTransform", "titleTextDecoration" ],
                            },
                        ],
                    },
                    {
                        id: "link",
                        label: OP3._("Link Options"),
                        icon: "op3-icon-link-72-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Font"),
                                property: [ "linkFontFamily", "linkFontWeight" ],
                            },
                            {
                                label: OP3._("Size"),
                                property: [ "linkFontSize", "linkLineHeight", "linkLetterSpacing" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "linkFontStyle", "linkTextTransform", "linkTextDecoration" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Title"),
                                property: [ "titleColor" ],
                            },
                            {
                                label: OP3._("Link"),
                                property: [ "linkColor" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover State"),
                        icon: "op3-icon-cursor-pointer",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Link Colour"),
                                property: [ "transitionDuration", "linkColorHover" ],
                            },
                            {
                                label: OP3._("Link Text"),
                                property: [ "linkFontWeightHover", "linkFontStyleHover", "linkTextDecorationHover" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="settings"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            membershipcontentlist: {
                label: OP3._("Membership Content List"),
                nav: [
                    {
                        id: "membership",
                        label: OP3._("Select Membership Options"),
                        icon: "op3-icon-link-2-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Membership Options"),
                                property: [ "membershipInfo" ],
                            },
                        ],
                    },
                    {
                        id: "block-order",
                        label: OP3._("Block Order"),
                        icon: "op3-icon-paragraph-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Block Order"),
                                property: [ "blockLayoutDesktop", "blockLayoutTablet", "blockLayoutMobile", "flexBasisSteps" ],
                            },
                            {
                                label: OP3._("Block Visibility"),
                                property: [ "blockDisplayLogo", "blockDisplayText" ],
                            },
                        ],
                    },
                    {
                        id: "background",
                        label: OP3._("Background Options"),
                        icon: "op3-icon-image-5",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Colour"),
                                property: [ "backgroundImageBaseType", "backgroundColorBase", "backgroundImageBaseAngle", "backgroundImageBasePosition", "backgroundImageBaseStartColor", "backgroundImageBaseStartPosition", "backgroundImageBaseStopColor", "backgroundImageBaseStopPosition" ],
                            },
                            {
                                label: OP3._("Image"),
                                property: [ "backgroundImageUrl", "opacity100", "backgroundPosition", "backgroundAttachment", "backgroundRepeat", "backgroundSize" ],
                                filter: [
                                    {
                                        label: OP3._("Image Properties"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Position"),
                                                property: [ "backgroundPosition" ],
                                            },
                                            {
                                                label: OP3._("Attachment"),
                                                property: [ "backgroundAttachment" ],
                                            },
                                            {
                                                label: OP3._("Repeat"),
                                                property: [ "backgroundRepeat" ],
                                            },
                                            {
                                                label: OP3._("Size"),
                                                property: [ "backgroundSize" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                label: OP3._("Overlay"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderActive", "borderTopWidth", "borderTopStyle", "borderTopColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderAllWidth", "borderAllStyle", "borderAllColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Vertical Alignment"),
                        icon: "op3-icon-align-vertical",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Vertical Alignment"),
                                property: [ "minHeight", "matchScreenHeight", "justifyContent" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "gutter", "marginTop", "marginBottom", "width", "marginAlign" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="settings"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            membershipcontentlistitem: {
                label: OP3._("Membership Content List Item"),
                nav: [
                    {
                        id: "background",
                        label: OP3._("Background Options"),
                        icon: "op3-icon-image-5",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Colour"),
                                property: [ "backgroundImageBaseType", "backgroundColorBase", "backgroundImageBaseAngle", "backgroundImageBasePosition", "backgroundImageBaseStartColor", "backgroundImageBaseStartPosition", "backgroundImageBaseStopColor", "backgroundImageBaseStopPosition" ],
                            },
                            {
                                label: OP3._("Image"),
                                property: [ "backgroundImageUrl", "opacity100", "backgroundPosition", "backgroundAttachment", "backgroundRepeat", "backgroundSize" ],
                                filter: [
                                    {
                                        label: OP3._("Image Properties"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Position"),
                                                property: [ "backgroundPosition" ],
                                            },
                                            {
                                                label: OP3._("Attachment"),
                                                property: [ "backgroundAttachment" ],
                                            },
                                            {
                                                label: OP3._("Repeat"),
                                                property: [ "backgroundRepeat" ],
                                            },
                                            {
                                                label: OP3._("Size"),
                                                property: [ "backgroundSize" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                label: OP3._("Overlay"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderActive", "borderTopWidth", "borderTopStyle", "borderTopColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderAllWidth", "borderAllStyle", "borderAllColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "link",
                        label: OP3._("Link Options"),
                        icon: "op3-icon-link-72-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Link Action"),
                                property: [ "href", "target", "relNoFollow" ],
                            },
                        ],
                    },
                    {
                        id: "vertical-alignment",
                        label: OP3._("Vertical Alignment"),
                        icon: "op3-icon-align-vertical",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Vertical Alignment"),
                                property: [ "minHeight", "matchScreenHeight", "justifyContent" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "gutter", "columnGap", "marginTop", "marginBottom" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="settings"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            numberblock: {
                label: OP3._("Number Block"),
                nav: [
                    {
                        id: "add",
                        label: OP3._("Add Number Block Item"),
                        icon: "op3-icon-circle-add-1",
                        action: "addElement",
                        args: [ "numberblock", "numberblockitem" ],
                    },
                    {
                        id: "block-order",
                        label: OP3._("Block Order"),
                        icon: "op3-icon-paragraph-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Block Order"),
                                property: [ "blockLayoutDesktop", "blockLayoutTablet", "blockLayoutMobile", "flexBasisSteps" ],
                            },
                            {
                                label: OP3._("Block Visibility"),
                                property: [ "blockDisplayTitle" , "blockDisplayText"],
                            },
                        ],
                    },
                    {
                        id: "block-styling",
                        icon: "op3-icon-brush-1",
                        label: OP3._("Number Block Styling"),
                        action: "context",
                        context: [
                            {
                                label: OP3._("Number Block Styling"),
                                property: [ "marginLeftNumber", "marginRightNumber", "marginBottomNumber", "numberblockFrame","padding", "borderAllWidthNumber", "size" ],
                            },
                            {
                                label: OP3._("Number Block Settings"),
                                property: [ "numberblockSequence", "numberblockShape"],
                            },
                        ],
                    },
                    {
                        id: "background",
                        label: OP3._("Background Options"),
                        icon: "op3-icon-image-5",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Colour"),
                                property: [ "backgroundImageBaseType", "backgroundColorBase", "backgroundImageBaseAngle", "backgroundImageBasePosition", "backgroundImageBaseStartColor", "backgroundImageBaseStartPosition", "backgroundImageBaseStopColor", "backgroundImageBaseStopPosition" ],
                            },
                            {
                                label: OP3._("Image"),
                                property: [ "backgroundImageUrl", "opacity100", "backgroundPosition", "backgroundAttachment", "backgroundRepeat", "backgroundSize" ],
                                filter: [
                                    {
                                        label: OP3._("Image Properties"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Position"),
                                                property: [ "backgroundPosition" ],
                                            },
                                            {
                                                label: OP3._("Attachment"),
                                                property: [ "backgroundAttachment" ],
                                            },
                                            {
                                                label: OP3._("Repeat"),
                                                property: [ "backgroundRepeat" ],
                                            },
                                            {
                                                label: OP3._("Size"),
                                                property: [ "backgroundSize" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                label: OP3._("Overlay"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderActive", "borderTopWidth", "borderTopStyle", "borderTopColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderAllWidth", "borderAllStyle", "borderAllColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Vertical Alignment"),
                        icon: "op3-icon-align-vertical",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Vertical Alignment"),
                                property: [ "minHeight", "matchScreenHeight", "justifyContent" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "gutter", "marginTop", "marginBottom", "width", "marginAlign" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="settings"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            numberblockitem: {
                label: OP3._("Number Block Item"),
                nav: [
                    {
                        id: "add",
                        label: OP3._("Add Number Block Item"),
                        icon: "op3-icon-circle-add-1",
                        action: "addElement",
                        args: [ "numberblock", "numberblockitem" ],
                    },
                    {
                        id: "number",
                        label: OP3._("Number Colours"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Number Background Colour"),
                                property: [ "backgroundNumberImageBaseType", "backgroundNumberColorBase", "backgroundNumberImageBaseAngle", "backgroundNumberImageBasePosition", "backgroundNumberImageBaseStartColor", "backgroundNumberImageBaseStartPosition", "backgroundNumberImageBaseStopColor", "backgroundNumberImageBaseStopPosition" ],
                            },
                            {
                                label: OP3._("Number Colour"),
                                property: [ "color" ],
                            },
                        ],

                    },
                    {
                        id: "background",
                        label: OP3._("Background Options"),
                        icon: "op3-icon-image-5",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Colour"),
                                property: [ "backgroundImageBaseType", "backgroundColorBase", "backgroundImageBaseAngle", "backgroundImageBasePosition", "backgroundImageBaseStartColor", "backgroundImageBaseStartPosition", "backgroundImageBaseStopColor", "backgroundImageBaseStopPosition" ],
                            },
                            {
                                label: OP3._("Image"),
                                property: [ "backgroundImageUrl", "opacity100", "backgroundPosition", "backgroundAttachment", "backgroundRepeat", "backgroundSize" ],
                                filter: [
                                    {
                                        label: OP3._("Image Properties"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Position"),
                                                property: [ "backgroundPosition" ],
                                            },
                                            {
                                                label: OP3._("Attachment"),
                                                property: [ "backgroundAttachment" ],
                                            },
                                            {
                                                label: OP3._("Repeat"),
                                                property: [ "backgroundRepeat" ],
                                            },
                                            {
                                                label: OP3._("Size"),
                                                property: [ "backgroundSize" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                label: OP3._("Overlay"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderActive", "borderTopWidth", "borderTopStyle", "borderTopColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderAllWidth", "borderAllStyle", "borderAllColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "gutter", "marginTop", "marginBottom" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="settings"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            progressbar: {
                label: OP3._("Progress Bar"),
                nav: [
                    {
                        id: "progress-bar",
                        label: OP3._("Progress Bar Sizing"),
                        icon: "op3-icon-chart-bar-32-1 op3-icon-rotate-90",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Progress Bar Sizing"),
                                property: [ "progressWidthSteps", "progressWidth", "animationToggle", "height" ],
                            },
                            {
                                label: OP3._("Label Positioning"),
                                property: [ "textAlign", "labelPlacement", "labelSpacingTop", "labelSpacingBottom" ],
                            },
                        ],
                    },
                    {
                        id: "styling",
                        label: OP3._("Progress Bar Styling"),
                        icon: "op3-icon-brush-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Progress Bar Styling"),
                                property: [ "backgroundStripes", "backgroundStripesPresets", "animationToggle2", "borderRadiusPresets" ],
                            },
                        ],
                    },
                    {
                        id: "text",
                        label: OP3._("Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Font"),
                                property: [ "fontFamily", "fontWeight" ],
                            },
                            {
                                label: OP3._("Size"),
                                property: [ "fontSize", "lineHeight", "letterSpacing" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "fontStyle", "textTransform", "textDecoration", "textShadow" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Progress"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                            {
                                label: OP3._("Bar"),
                                property: [ "backgroundImageBaseType", "backgroundColorBase", "backgroundImageBaseAngle", "backgroundImageBasePosition", "backgroundImageBaseStartColor", "backgroundImageBaseStartPosition", "backgroundImageBaseStopColor", "backgroundImageBaseStopPosition" ],
                            },
                            {
                                label: OP3._("Text"),
                                property: [ "color" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Progress"),
                                property: [ "borderActive", "borderTopWidth", "borderTopStyle", "borderTopColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderAllWidth", "borderAllStyle", "borderAllColor" ],
                            },
                            {
                                label: OP3._("Bar"),
                                property: [ "borderActiveBase", "borderTopWidthBase", "borderTopStyleBase", "borderTopColorBase", "borderBottomWidthBase", "borderBottomStyleBase", "borderBottomColorBase", "borderLeftWidthBase", "borderLeftStyleBase", "borderLeftColorBase", "borderRightWidthBase", "borderRightStyleBase", "borderRightColorBase", "borderAllWidthBase", "borderAllStyleBase", "borderAllColorBase" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom", "width" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="settings"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            rating: {
                label: OP3._("Rating"),
                nav: [
                    {
                        id: "rating",
                        label: OP3._("Rating"),
                        icon: "op3-icon-favourite-28-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Rating"),
                                property: [ "ratingSvgPattern", "ratingSvgCount", "ratingSvgRate", "ratingSvgOffset", "height" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Fill"),
                                property: [ "ratingSvgFillColor" ],
                            },
                            {
                                label: OP3._("Empty"),
                                property: [ "ratingSvgFillColor2" ],
                            },
                        ],
                    },
                    {
                        id: "stroke",
                        label: OP3._("Stroke"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Stroke"),
                                property: [ "ratingSvgStrokeWidth", "ratingSvgStrokeColor" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment Options"),
                        icon: "op3-icon-align-horizontal",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Align"),
                                property: [ "ratingSvgPreserveAspectRatio" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="settings"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            row: {
                label: OP3._("Row"),
                nav: [
                    {
                        id: "background",
                        label: OP3._("Background Options"),
                        icon: "op3-icon-image-5",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Colour"),
                                property: [ "backgroundImageBaseType", "backgroundColorBase", "backgroundImageBaseAngle", "backgroundImageBasePosition", "backgroundImageBaseStartColor", "backgroundImageBaseStartPosition", "backgroundImageBaseStopColor", "backgroundImageBaseStopPosition" ],
                            },
                            {
                                label: OP3._("Image"),
                                property: [ "backgroundImageUrl", "opacity100", "backgroundPosition", "backgroundAttachment", "backgroundRepeat", "backgroundSize" ],
                                filter: [
                                    {
                                        label: OP3._("Image Properties"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Position"),
                                                property: [ "backgroundPosition" ],
                                            },
                                            {
                                                label: OP3._("Attachment"),
                                                property: [ "backgroundAttachment" ],
                                            },
                                            {
                                                label: OP3._("Repeat"),
                                                property: [ "backgroundRepeat" ],
                                            },
                                            {
                                                label: OP3._("Size"),
                                                property: [ "backgroundSize" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                label: OP3._("Overlay"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderActive", "borderTopWidth", "borderTopStyle", "borderTopColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderAllWidth", "borderAllStyle", "borderAllColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Vertical Alignment"),
                        icon: "op3-icon-align-vertical",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Vertical Alignment"),
                                property: [ "minHeight", "matchScreenHeight", "justifyContent" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "gutter", "marginTop", "marginBottom", "width", "marginAlign" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="settings"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            section: {
                label: OP3._("Section"),
                nav: [
                    {
                        id: "background",
                        label: OP3._("Background Options"),
                        icon: "op3-icon-image-5",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Colour"),
                                property: [ "backgroundImageBaseType", "backgroundColorBase", "backgroundImageBaseAngle", "backgroundImageBasePosition", "backgroundImageBaseStartColor", "backgroundImageBaseStartPosition", "backgroundImageBaseStopColor", "backgroundImageBaseStopPosition" ],
                            },
                            {
                                label: OP3._("Image"),
                                property: [ "backgroundImageUrl", "opacity100", "backgroundPosition", "backgroundAttachment", "backgroundRepeat", "backgroundSize" ],
                                filter: [
                                    {
                                        label: OP3._("Image Properties"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Position"),
                                                property: [ "backgroundPosition" ],
                                            },
                                            {
                                                label: OP3._("Attachment"),
                                                property: [ "backgroundAttachment" ],
                                            },
                                            {
                                                label: OP3._("Repeat"),
                                                property: [ "backgroundRepeat" ],
                                            },
                                            {
                                                label: OP3._("Size"),
                                                property: [ "backgroundSize" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                label: OP3._("Overlay"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderActive", "borderTopWidth", "borderTopStyle", "borderTopColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderAllWidth", "borderAllStyle", "borderAllColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },

                    {
                        id: "up",
                        label: OP3._("Move Element Up"),
                        icon: "op3-icon-simple-up",
                        action: "up",
                    },
                    {
                        id: "down",
                        label: OP3._("Move Element Down"),
                        icon: "op3-icon-simple-down",
                        action: "down",
                    },

                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "paddingTop", "paddingBottom", "width", "marginAlign" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="settings"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            socialicons: {
                label: OP3._("Social Icons"),
                nav: [
                    {
                        id: "add",
                        label: OP3._("Add Icon Element"),
                        icon: "op3-icon-circle-add-1",
                        action: "addElement",
                        args: [ "socialicons", "icon" ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment Options"),
                        icon: "op3-icon-align-horizontal",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Align"),
                                property: [ "marginAlign" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "gutter", "marginTop", "marginBottom" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="settings"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            soundcloud: {
                label: OP3._("SoundCloud"),
                nav: [
                    {
                        id: "SoundCloud",
                        label: OP3._("SoundCloud Settings"),
                        icon: "op3-icon-logo-soundcloud",
                        action: "context",
                        context: [
                            {
                                label: OP3._("SoundCloud Settings"),
                                property: [ "soundCloudLayout", "srcSoundCloudUrl", "srcSoundCloudAutoplay", "maxWidth", "height" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment Options"),
                        icon: "op3-icon-align-horizontal",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Align"),
                                property: [ "marginAlign" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="settings"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            spacer: {
                label: OP3._("Spacer"),
                nav: [
                    {
                        id: "spacer",
                        label: OP3._("Spacer Settings"),
                        icon: "op3-icon-simple-delete-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Spacer Settings"),
                                property: [ "height" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "settings",
                    },
                ],
            },
            testimonial: {
                label: OP3._("Testimonial"),
                nav: [
                    {
                        id: "add",
                        label: OP3._("Add Testimonial Item"),
                        icon: "op3-icon-circle-add-1",
                        action: "addElement",
                        args: [ "testimonial", "testimonialitem" ],
                    },
                    {
                        id: "block-order",
                        label: OP3._("Block Order"),
                        icon: "op3-icon-contacts-44-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Block Order"),
                                property: [ "blockLayoutDesktop", "blockLayoutTablet", "blockLayoutMobile", "flexBasisSteps" ],
                            },
                            {
                                label: OP3._("Block Visibility"),
                                property: [ "blockDisplayTitle", "blockDisplayAvatar", "blockDisplayCompany", "blockDisplayAuthor", "blockDisplayLogo" ],
                            },
                        ],
                    },
                    {
                        id: "background",
                        label: OP3._("Background Options"),
                        icon: "op3-icon-image-5",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Colour"),
                                property: [ "backgroundImageBaseType", "backgroundColorBase", "backgroundImageBaseAngle", "backgroundImageBasePosition", "backgroundImageBaseStartColor", "backgroundImageBaseStartPosition", "backgroundImageBaseStopColor", "backgroundImageBaseStopPosition" ],
                            },
                            {
                                label: OP3._("Image"),
                                property: [ "backgroundImageUrl", "opacity100", "backgroundPosition", "backgroundAttachment", "backgroundRepeat", "backgroundSize" ],
                                filter: [
                                    {
                                        label: OP3._("Image Properties"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Position"),
                                                property: [ "backgroundPosition" ],
                                            },
                                            {
                                                label: OP3._("Attachment"),
                                                property: [ "backgroundAttachment" ],
                                            },
                                            {
                                                label: OP3._("Repeat"),
                                                property: [ "backgroundRepeat" ],
                                            },
                                            {
                                                label: OP3._("Size"),
                                                property: [ "backgroundSize" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                label: OP3._("Overlay"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderActive", "borderTopWidth", "borderTopStyle", "borderTopColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderAllWidth", "borderAllStyle", "borderAllColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Vertical Alignment"),
                        icon: "op3-icon-align-vertical",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Vertical Alignment"),
                                property: [ "minHeight", "matchScreenHeight", "justifyContent" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "gutter", "marginTop", "marginBottom", "width", "marginAlign" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="settings"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            testimonialitem: {
                label: OP3._("Testimonial Item"),
                nav: [
                    {
                        id: "add",
                        label: OP3._("Add Testimonial Item"),
                        icon: "op3-icon-circle-add-1",
                        action: "addElement",
                        args: [ "testimonial", "testimonialitem" ],
                    },
                    {
                        id: "background",
                        label: OP3._("Background Options"),
                        icon: "op3-icon-image-5",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Colour"),
                                property: [ "backgroundImageBaseType", "backgroundColorBase", "backgroundImageBaseAngle", "backgroundImageBasePosition", "backgroundImageBaseStartColor", "backgroundImageBaseStartPosition", "backgroundImageBaseStopColor", "backgroundImageBaseStopPosition" ],
                            },
                            {
                                label: OP3._("Image"),
                                property: [ "backgroundImageUrl", "opacity100", "backgroundPosition", "backgroundAttachment", "backgroundRepeat", "backgroundSize" ],
                                filter: [
                                    {
                                        label: OP3._("Image Properties"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Position"),
                                                property: [ "backgroundPosition" ],
                                            },
                                            {
                                                label: OP3._("Attachment"),
                                                property: [ "backgroundAttachment" ],
                                            },
                                            {
                                                label: OP3._("Repeat"),
                                                property: [ "backgroundRepeat" ],
                                            },
                                            {
                                                label: OP3._("Size"),
                                                property: [ "backgroundSize" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                label: OP3._("Overlay"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderActive", "borderTopWidth", "borderTopStyle", "borderTopColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderAllWidth", "borderAllStyle", "borderAllColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "vertical-alignment",
                        label: OP3._("Vertical Alignment"),
                        icon: "op3-icon-align-vertical",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Vertical Alignment"),
                                property: [ "minHeight", "matchScreenHeight", "justifyContent" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "gutter", "columnGap", "marginTop", "marginBottom", ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="settings"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            text: {
                label: OP3._("Text Editor"),
                nav: [
                    {
                        id: "text",
                        label: OP3._("Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Font"),
                                property: [ "fontFamily", "fontWeight" ],
                            },
                            {
                                label: OP3._("Size"),
                                property: [ "fontSize", "lineHeight", "letterSpacing" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "fontStyle", "textTransform", "textDecoration" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Text Colour"),
                                property: [ "color" ],
                            },
                            {
                                label: OP3._("Background"),
                                property: [ "backgroundColorOverlay" ],
                            },
                        ],
                    },
                    {
                        id: "text-align",
                        label: OP3._("Text Align"),
                        icon: "op3-icon-align-center-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Text Align"),
                                property: [ "textAlign" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom", "maxWidth", "marginAlign" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="settings"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            treemenu: {
                label: OP3._("WP Menu"),
                nav: [
                    {
                        id: "simple-menu",
                        label: OP3._("WP Menu"),
                        icon: "op3-icon-segmentation-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Simple Menu"),
                                property: [ "menuName", "animation" ],
                            },
                        ],
                    },
                    {
                        id: "text",
                        label: OP3._("Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Font"),
                                property: [ "fontFamily", "fontWeight" ],
                            },
                            {
                                label: OP3._("Size"),
                                property: [ "fontSize", "lineHeight", "letterSpacing" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "fontStyle", "textTransform", "textDecoration" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Text Colour"),
                                property: [ "color" ],
                            },
                            //{
                            //    label: OP3._("Icon Colour"),
                            //    property: [ "iconColor" ],
                            //},
                            {
                                label: OP3._("Background Colour"),
                                property: [ "backgroundImageBaseType", "backgroundColorBase", "backgroundImageBaseAngle", "backgroundImageBasePosition", "backgroundImageBaseStartColor", "backgroundImageBaseStartPosition", "backgroundImageBaseStopColor", "backgroundImageBaseStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment"),
                        icon: "op3-icon-align-horizontal",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Alignment"),
                                property: [ "justifyContent" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom", "width", "marginAlign" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="settings"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            treemenuitem: {
                label: OP3._("Menu Item"),
                nav: [
                    {
                        id: "simple-menu",
                        label: OP3._("Menu Item"),
                        icon: "op3-icon-segmentation-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Size"),
                                property: [ "minHeight", "gutter", "linkPaddingLeft", "linkPaddingRight" ],
                            },
                            {
                                label: OP3._("Menu Icon"),
                                property: [ "iconVisible", "op3Icon", "iconFontSize", "iconSpacing" ],
                            },
                            {
                                label: OP3._("Dropdown Icon"),
                                property: [ "dropdownIconVisible", "dropdownIcon", "dropdownIconFontSize", "dropdownIconSpacing", "dropdownIconSpacingTop" ],
                            },
                        ],
                    },
                    {
                        id: "text",
                        label: OP3._("Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Font"),
                                property: [ "fontFamily", "fontWeight" ],
                            },
                            {
                                label: OP3._("Size"),
                                property: [ "fontSize", "letterSpacing" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "fontStyle", "textTransform", "textDecoration" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Text Colour"),
                                property: [ "color" ],
                            },
                            {
                                label: OP3._("Icon Colour"),
                                property: [ "iconColor" ],
                            },
                            {
                                label: OP3._("Background Colour"),
                                // property: [ "backgroundColor" ],
                                property: [ "backgroundImageBaseType", "backgroundColorBase", "backgroundImageBaseAngle", "backgroundImageBasePosition", "backgroundImageBaseStartColor", "backgroundImageBaseStartPosition", "backgroundImageBaseStopColor", "backgroundImageBaseStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderActive", "borderTopWidth", "borderTopStyle", "borderTopColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderAllWidth", "borderAllStyle", "borderAllColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                        ],
                    },
                    {
                        id: "childwrap",
                        label: OP3._("Submenu Wrapper"),
                        icon: "op3-icon-chat-1 op3-icon-rotate-180",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Background"),
                                property: [ "childWrapBackgroundImageChildWrapType", "childWrapBackgroundBackgroundColorChildWrap", "childWrapBackgroundImageChildWrapAngle", "childWrapBackgroundImageChildWrapPosition", "childWrapBackgroundImageChildWrapStartColor", "childWrapBackgroundImageChildWrapStartPosition", "childWrapBackgroundImageChildWrapStopColor", "childWrapBackgroundImageChildWrapStopPosition" ]
                            },
                            {
                                label: OP3._("Borders"),
                                property: [ "childWrapBorderActive", "childWrapBorderTopWidth", "childWrapBorderTopStyle", "childWrapBorderTopColor", "childWrapBorderBottomWidth", "childWrapBorderBottomStyle", "childWrapBorderBottomColor", "childWrapBorderLeftWidth", "childWrapBorderLeftStyle", "childWrapBorderLeftColor", "childWrapBorderRightWidth", "childWrapBorderRightStyle", "childWrapBorderRightColor", "childWrapBorderAllWidth", "childWrapBorderAllStyle", "childWrapBorderAllColor", "childWrapBorderTopLeftRadius", "childWrapBorderTopRightRadius", "childWrapBorderBottomRightRadius", "childWrapBorderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadows"),
                                property: [ "childWrapBoxShadow" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment"),
                        icon: "op3-icon-align-horizontal",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Alignment"),
                                property: [ "flexGrow", "justifyContent" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover State"),
                        icon: "op3-icon-cursor-pointer",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Border"),
                                property: [ "borderHoverStyle", "borderBottomColorHover" ],
                            },
                            {
                                label: OP3._("Text"),
                                property: [ "colorHover" ],
                            },
                            {
                                label: OP3._("Icon"),
                                property: [ "iconColorHover" ],
                            },
                            {
                                label: OP3._("Background"),
                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition" ],
                            },
                        ],
                    },
                    //{
                    //    id: "move",
                    //    label: OP3._("Move Element"),
                    //    icon: "op3-icon-zoom-99-2",
                    //    action: "move",
                    //},
                    {
                       id: "advanced",
                       label: OP3._("Advanced Settings"),
                       icon: "op3-icon-settings-gear-63-1",
                       action: "context",
                       context: [
                           {
                               label: OP3._("Settings"),
                               property: [ "width", "widthAuto" ],
                               appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="settings"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                           },
                       ],
                    },
                ],
            },
            video: {
                label: OP3._("Video"),
                nav: [
                    {
                        id: "video",
                        label: OP3._("Video Settings"),
                        icon: "op3-icon-button-circle-play-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Video"),
                                property: [ "videoSource", "videoUrlYoutube", "videoUrlVimeo", "videoUrlWistia", "code", "aspectRatio", "maxWidth" ],
                            },
                            {
                                label: OP3._("Video Advanced"),
                                property: [ "videoStartTime", "videoAutoplay", "videoBackground", "videoMute", "videoLoop", "videoControls", "videoModestBranding", "videoRelated", "videoPortrait", "videoByline", "videoTitle", "videoSpeed", "videoColor" ],
                            },
                        ],
                    },
                    {
                        id: "image",
                        label: OP3._("Image Options"),
                        icon: "op3-icon-image-5",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Image Overlay"),
                                property: [ "visible", "backgroundImageUrl", "videoIconVisible", "op3Icon", "fontSize", "color", "textShadowIcon" ],
                                filter: [
                                    {
                                        label: OP3._("Play Icon Settings"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Icon"),
                                                property: [ "op3Icon" ],
                                            },
                                            {
                                                label: OP3._("Size"),
                                                property: [ "fontSize" ],
                                            },
                                            {
                                                label: OP3._("Color"),
                                                property: [ "color" ],
                                            },
                                            {
                                                label: OP3._("Shadow"),
                                                property: [ "textShadowIcon" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderActive", "borderTopWidth", "borderTopStyle", "borderTopColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderAllWidth", "borderAllStyle", "borderAllColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment Options"),
                        icon: "op3-icon-align-horizontal",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Align"),
                                property: [ "marginAlign" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="settings"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            videothumbnail: {
                label: OP3._("Video Thumbnail"),
                nav: [
                    {
                        id: "video",
                        label: OP3._("Video Settings"),
                        icon: "op3-icon-button-circle-play-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Video Thumbnail"),
                                property: [ "backgroundImageUrl", "opacity100", "backgroundPosition", "backgroundAttachment", "backgroundRepeat", "backgroundSize", "aspectRatio", "maxWidth" ],
                                filter: [
                                    {
                                        label: OP3._("Video Thumbnail"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Position"),
                                                property: [ "backgroundPosition" ],
                                            },
                                            {
                                                label: OP3._("Attachment"),
                                                property: [ "backgroundAttachment" ],
                                            },
                                            {
                                                label: OP3._("Repeat"),
                                                property: [ "backgroundRepeat" ],
                                            },
                                            {
                                                label: OP3._("Size"),
                                                property: [ "backgroundSize" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                label: OP3._("Play Icon"),
                                property: [ "visible", "op3Icon", "fontSize", "color", "textShadowIcon" ],
                            },
                        ],
                    },
                    {
                        id: "video-thumbnail-overlay",
                        label: OP3._("Video Thumbnail Overlay"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Video Thumbnail Overlay"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderActive", "borderTopWidth", "borderTopStyle", "borderTopColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderAllWidth", "borderAllStyle", "borderAllColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "link",
                        label: OP3._("Link Options"),
                        icon: "op3-icon-link-72-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Link Action"),
                                property: [ "action", "href", "target", "relNoFollow", "popOverlayTrigger", "selectFunnelStep", "createVideoPopoverlay" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment Options"),
                        icon: "op3-icon-align-horizontal",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Align"),
                                property: [ "marginAlign" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="settings"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
        }

        // specific buttons that are part of every element
        // (css will take care of their visibility)
        for (var type in result) {
            var nav = result[type].nav;
            if (!nav)
                continue;

            // lock, styles-and-presets items go at the beggining
            nav.unshift(
                {
                    id: "lock",
                    label: OP3._("Styling Lock & Override"),
                    icon: "op3-icon-lock-circle-open-1",
                    action: "toggleLinkProperties",
                },
                {
                    id: "styles-and-presets",
                    label: OP3._("Styles and Presets"),
                    icon: "op3-icon-wand-99-2",
                    action: "toggleSidebarDesignerTab",
                },
            );

            // global element as well
            nav.unshift(
                {
                    id: "global-element",
                    label: OP3._("Global Element"),
                    icon: "op3-icon-globe-1",
                    action: "toggleSidebarGlobalElementTab",
                },
            );

            // get advanced item index (which should always be last)
            var index = nav.length;
            for (var i = 0; i < nav.length; i++) {
                if (nav[i].id !== "advanced")
                    continue;

                index = i;
                break;
            }

            // move item goes before advanced item (or at the end)
            nav.splice(index++, 0, {
                id: "move",
                label: OP3._("Move Element"),
                icon: "op3-icon-zoom-99-2",
                action: "move",
            });

            // clone item goes before advanced item (or at the end)
            nav.splice(index++, 0, {
                    id: "clone",
                    label: OP3._("Clone Element"),
                    icon: "op3-icon-ungroup-1",
                    action: "clone",
            });

            // delete item goes before advanced item (or at the end)
            nav.splice(index++, 0, {
                    id: "delete",
                    label: OP3._("Delete Element"),
                    icon: "op3-icon-trash-simple-1",
                    action: "delete",
            });
        }

        return result;
    };

})(jQuery, window, document);
