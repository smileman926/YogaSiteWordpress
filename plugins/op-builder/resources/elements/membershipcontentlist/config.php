<?php

return array(

    /**
     * Element type:
     * If starts with underscore this is considered
     * as template. With template only markup is needed,
     * the rest will be inherited from real element type
     * config.
     */
    'type' => 'membershipcontentlist',

    /**
     * Element category ID:
     * Group elements on sidebar. If NULL this element
     * type won't be shown on sidebar.
     */
    'category' => null,

    /**
     * Element order:
     * Order elements on sidebar.
     */
    'order' => null,

    /**
     * Element title:
     * Title displayed on sidebar.
     */
    'title' => 'Membership Content List',

    /**
     * Element thumb:
     * Thumb displayed on sidebar.
     */
    'thumb' => 'lock-circle-1',

    /**
     * Element wrapper:
     * Wrap element with this element type
     * (NULL for templates). This is usually element
     * name (string), but it can also be list of
     * element names (fontend uses first as default
     * wrapper element).
     */
    'parent' => array('section', 'column'),

    /**
     * Element enabled:
     * If this is set to false, then the API won't
     * return this element in it's element list,
     * making this element 'non-existing' in
     * live editor.
     */
    'enabled' => true,

    /**
     * CSS selector strength:
     * This property tell us is we should boost
     * css selector specificity. By default this
     * option is 1 which means the selector will
     * have only one id (eq. #op3-element-uuid).
     * Any number higher than 1 will 'level up'
     * specificity:
     *      1 - #op3-element-uuid
     *      2 - #op3-element-uuid#op3-element-uuid
     *      3 - #op3-element-uuid#op3-element-uuid#op3-element-uuid
     *
     * ...this way we can make sure that child
     * property will override parent's one.
     *
     * Set NULL to templates, 1 for element with
     * children and 3 for element with no children.
     * Level 2 will be reserved for special cases
     * (eq. featureblockitem element, which will
     * override featureblock in
     * section/row/featureblock/featureblockitem/headline)
     */
    'cssSelectorStrength' => 1,

    /**
     * Allow copy element:
     * Can we copy serialized element into virtual
     * clipboard (NULL for templates).
     */
    'allowCopyElement' => true,

    /**
     * Allow cut element:
     * Can we copy/detach element (NULL for templates).
     */
    'allowCutElement' => true,

    /**
     * Allow paste into element:
     * Can we append element from virtual clipboard
     * into current element (NULL for templates).
     */
    'allowPasteIntoElement' => false,

    /**
     * Allow drop:
     * Element types that element accepts drop from
     * (NULL for templates). This can be TRUE (allow
     * all elements), FALSE (allow nothing), element
     * name (allow only one element type, eq: 'row')
     * or list (array) of element names.
     * Ignore this option (set it FALSE) if element
     * has no children.
     */
    'acceptDrop' => false,

    /**
     * Drop target selector:
     * Usually drop target is element it self, but you
     * can add string selector to it, if you want
     * target to be (for example) children container
     * (NULL for templates and for elements with no
     * acceptDrop)
     */
    'dropTarget' => '',

    /**
     * Valid toolbar position:
     * We can customize where we want to display live
     * editor's toolbar. Some elements may have only
     * one or two valid positions, and other may have
     * different order. By default this is empty array
     * (NULL for templates). Empty arrays will be
     * interpreted as ["top","bottom","left","right"]
     * by live editor.
     */
    'validToolbarPosition' => array(),

    /**
     * Show style picker on drop:
     * This should be true if element has styles, but
     * there are exceptions so this is configarable.
     */
    'showStylePickerOnDrop' => true,

    /**
     * Drag offset:
     * You can leave some horizontal (or vertical,
     * depending on element) space for some elements.
     * For example columns have dragOffset=0.25 which
     * will allow user to create column while dragging
     * 25% of column's width left or right of column's
     * child element
     * (NULL for templates and for elements with no
     * acceptDrop)
     */
    'dragOffset' => 0,

    /**
     * Drag stop propagation:
     * Do not allow drag propagation which is usefull
     * for elements with overlay
     * (NULL for templates and for elements with no
     * acceptDrop)
     */
    'dragStopPropagation' => false,

    /**
     * Drag lock children:
     * Do not allow child elements to be moved to
     * another element.
     */
    'dragLockChildren' => true,

    /**
     * Drop wrap:
     * It TRUE element will be wrapped with parent
     * until parent match dropzone. This can also
     * be list of parent element types which will
     * accept element for drop
     * (NULL for templates).
     */
    'dropWrap' => 'popoverlay',

    /**
     * Is children direction horizontal:
     * In most cases it is FALSE, TRUE for some
     * specific elements like rows, which is
     * parent for columns
     * (NULL for templates and for elements with
     * no children)
     */
    'childrenDirectionHorizontal' => true,

    /**
     * Can sync children:
     * Element can have this option which will allow
     * all children to sync on each child property
     * change
     * (NULL for templates and for elements with
     * no children)
     */
    'canSyncChildren' => true,

    /**
     * Should this element be removed if empty.
     * If TRUE this element will be autoremoved
     * when user deletes all it's children.
     */
    'removeIfEmpty' => false,

    /**
     * Load extra files.
     * Those files will be loaded on frontend,
     * if you need them in live editor (and
     * you probably do) don't forget to add
     * them in your gulpfile
     */
    'assets' => array(),

    /**
     * Default options:
     * Frontend will set this options on element
     * create (ignored if this is template).
     *
     * Note: this object must be in following format:
     * >>> options = {
     *        "all": {
     *            "color": "red",
     *            .
     *            .
     *            .
     *            },
     *        .
     *        .
     *        .
     *     }
     *
     * ...where all is media, color is property id
     * and red is property value
     */
    'options' => array(
        'all' => array(
            'stackColumnsTablet' => '0',
            'stackColumnsTabletReverse' => '0',
            'stackColumnsMobile' => '1',
            'stackColumnsColumnsReverse' => '0',
            'wrapColumns' => '0',
            'blockLayoutMobile' => '0',
            'blockLayoutDesktop' => '4',
            'membershipSort' => 'title:asc',
            'membershipShowPageChildren' => '1',
            'imageWidth' => '300px',
        ),
    ),

    /**
     * Descendants:
     * Set options for any element child (or children's
     * children) on element create.
     *
     * An object with key (selector) and another object
     * as value (options). Selector should normally target
     * .op3-element, but for more advanced search we can
     * target any of it's descendent node.
     *
     * Note that selector will not be validated by
     * javascript. If selector is invalid or if it
     * does not return any node this will be
     * ignored...
     *
     * You can also set child element style (use
     * styleID key in options object).
     *
     * Note: this object must be in following format:
     * >>> descendants = {
     *        "div": {
     *            "all": {
     *                "color": "red",
     *                .
     *                .
     *                .
     *                },
     *            .
     *            .
     *            .
     *        },
     *        .
     *        .
     *        .
     *     }
     *
     * ...where div is selector, all is media, color
     * is property id and red is property value.
     */
    'descendants' => array(),

    /**
     * Element markup:
     * Create element with markup and append it to
     * Document. If not defined list dialog will be
     * shown (see 'styles' property).
     *
     * For templates a wrap elemen should be included
     * into markup (div.op3-element).
     *
     * You can use op3 tags which will be replaced with
     * it's options. For example '<op3 html>' in markup
     * will be replaced with element's html option.
     *
     * Make sure you never use op3 tag in frontend.
     * Create template and replace tag with default
     * option. For example we have button element which
     * is never used by frontend. Frontend only uses
     * element button_templates which have html and
     * href options replaced with default ones.
     */
    'markup' => op3_element_markup(__DIR__ . '/markup/index.html'),

    /**
     * Element styles:
     * This list will be shown in dialog when element
     * (from sidebar) is dropped to document.

     * Note: this object must be in following format:
     * >>> styles = [
     *        {
     *            'id' = 'styleId',
     *            'title' = 'Style Title',
     *            'thumb' = 'path/to/thumb.svg',
     *            'markup' = '<div />',
     *            'options' = {},       // optional
     *            'descendant' = {}     // optional
     *        },
     *        {
     *            .
     *            .
     *            .
     *        },
     *     ]
     */
    'styles' => null,

    /**
     * Element presets:
     * This predefined element options will be shown
     * in sidebar so user can pick and set new
     * element options.
     *
     * Note: this object must be in following format:
     * >>> presets = [
     *        {
     *            'title' = 'Preset Title',
     *            'thumb' = 'path/to/thumb.svg',
     *            'options' = {},
     *        },
     *        {
     *            .
     *            .
     *            .
     *        },
     *     ]
     *
     * @todo
     * This should be removed from config and create
     * new api route that returns this array (maybe
     * move to SL eventually)
     */
    'presets' => array(
        array(
            "title" => "Preset #1",
            "thumb" => op3_asset('img/elements/membershipcontentlist/styles/style-1.png'),
            "options" => array(
                "all" => array(
                    "flexBasis" => "33.33%",
                    'blockLayoutDesktop' => '0',
                    'blockDisplayLogo' => '1',
                    'blockDisplayText' => '1',
                    "gutterLeft" => "20px",
                    "gutterRight" => "20px",
                    "gutterAdjustLeft" => "-20px",
                    "gutterAdjustRight" => "-20px",
                    "titleFontSize" => "18px",
                    "titleFontWeight" => "400",
                    "titleTextAlign" => "left",
                    "titleMarginBottom" => "0px",
                    "titleMarginLeft" => "auto",
                    "titleMarginRight" => "auto",
                    "titlePaddingTop" => "20px",
                    "titlePaddingBottom" => "8px",
                    "titleMaxWidth" => "100%",
                    "textColor" => "rgba(33, 37, 41, 0.8)",
                    "textFontSize" => "17px",
                    "textLineHeight" => "1.709em",
                    "textTextAlign" => "left",
                    "textMarginBottom" => "0px",
                    "textMarginLeft" => "0px",
                    "textMarginRight" => "auto",
                    "textMaxWidth" => "85%",
                    "imageWidth" => "100%",
                    "imageBorderTopLeftRadius" => "5px",
                    "imageBorderTopRightRadius" => "5px",
                    "imageBorderBottomLeftRadius" => "5px",
                    "imageBorderBottomRightRadius" => "5px",
                    "imageBoxShadow" => "rgba(0, 0, 0, 0.45) 0px 4px 15px -9px",
                    "imageMarginBottom" => "0px",
                    "imagePaddingTop" => "0px",
                    "imagePaddingBottom" => "0px",
                    "membershipContentListItemBackgroundColorBase" => "rgb(255, 255, 255)",
                    "membershipContentListItemBorderTopWidth" => "0px",
                    "membershipContentListItemBorderTopStyle" => "none",
                    "membershipContentListItemBorderTopColor" => "rgb(232, 232, 232)",
                    "membershipContentListItemBorderBottomWidth" => "0px",
                    "membershipContentListItemBorderBottomStyle" => "none",
                    "membershipContentListItemBorderBottomColor" => "rgb(232, 232, 232)",
                    "membershipContentListItemBorderLeftWidth" => "0px",
                    "membershipContentListItemBorderLeftStyle" => "none",
                    "membershipContentListItemBorderLeftColor" => "rgb(232, 232, 232)",
                    "membershipContentListItemBorderRightWidth" => "0px",
                    "membershipContentListItemBorderRightStyle" => "none",
                    "membershipContentListItemBorderRightColor" => "rgb(232, 232, 232)",
                    "membershipContentListItemBorderTopLeftRadius" => "5px",
                    "membershipContentListItemBorderTopRightRadius" => "5px",
                    "membershipContentListItemBorderBottomLeftRadius" => "5px",
                    "membershipContentListItemBorderBottomRightRadius" => "5px",
                    "membershipContentListItemBoxShadow" => "rgba(0, 0, 0, 0) 0px 0px 0px 0px",
                    "membershipContentListItemMarginBottom" => "29px",
                    "membershipContentListItemPaddingTop" => "0px",
                    "membershipContentListItemPaddingBottom" => "25px",
                    "membershipContentListItemPaddingLeft" => "0px",
                    "membershipContentListItemPaddingRight" => "0px",
                    "membershipContentListItemJustifyContent" => "flex-start",
                    "membershipContentListItemColumnGap" => "30px"
                )
            )
        ),
        array(
            "title" => "Preset #2",
            "thumb" => op3_asset('img/elements/membershipcontentlist/styles/style-2.png'),
            "options" => array(
                "all" => array(
                    "flexBasis" => "100%",
                    'blockLayoutDesktop' => '4',
                    'blockDisplayLogo' => '1',
                    'blockDisplayText' => '1',
                    "titleTextAlign" => "left",
                    "titleMarginBottom" => "0px",
                    "titlePaddingBottom" => "5px",
                    "textColor" => "rgba(33, 37, 41, 0.8)",
                    "textFontSize" => "17px",
                    "textLineHeight" => "1.6em",
                    "textTextAlign" => "left",
                    "textMarginBottom" => "0px",
                    "imageWidth" => "300px",
                    "imageBorderTopLeftRadius" => "5px",
                    "imageBorderTopRightRadius" => "5px",
                    "imageBorderBottomLeftRadius" => "5px",
                    "imageBorderBottomRightRadius" => "5px",
                    "imageMarginBottom" => "0px",
                    "imagePaddingTop" => "0px",
                    "imagePaddingBottom" => "0px",
                    "membershipContentListItemBackgroundColorBase" => "rgb(255, 255, 255)",
                    "membershipContentListItemBorderTopWidth" => "1px",
                    "membershipContentListItemBorderTopStyle" => "solid",
                    "membershipContentListItemBorderTopColor" => "rgb(232, 232, 232)",
                    "membershipContentListItemBorderBottomWidth" => "1px",
                    "membershipContentListItemBorderBottomStyle" => "solid",
                    "membershipContentListItemBorderBottomColor" => "rgb(232, 232, 232)",
                    "membershipContentListItemBorderLeftWidth" => "1px",
                    "membershipContentListItemBorderLeftStyle" => "solid",
                    "membershipContentListItemBorderLeftColor" => "rgb(232, 232, 232)",
                    "membershipContentListItemBorderRightWidth" => "1px",
                    "membershipContentListItemBorderRightStyle" => "solid",
                    "membershipContentListItemBorderRightColor" => "rgb(232, 232, 232)",
                    "membershipContentListItemBorderTopLeftRadius" => "10px",
                    "membershipContentListItemBorderTopRightRadius" => "10px",
                    "membershipContentListItemBorderBottomLeftRadius" => "10px",
                    "membershipContentListItemBorderBottomRightRadius" => "10px",
                    "membershipContentListItemBoxShadow" => "rgba(0, 0, 0, 0.12) 0px 9px 17px -10px",
                    "membershipContentListItemMarginBottom" => "29px",
                    "membershipContentListItemPaddingTop" => "25px",
                    "membershipContentListItemPaddingBottom" => "25px",
                    "membershipContentListItemPaddingLeft" => "22px",
                    "membershipContentListItemPaddingRight" => "22px",
                    "membershipContentListItemColumnGap" => "30px"
                )
            )
        ),
        array(
            "title" => "Preset #3",
            "thumb" => op3_asset('img/elements/membershipcontentlist/styles/style-3.png'),
            "options" => array(
                "all" => array(
                    "flexBasis" => "100%",
                    'blockLayoutDesktop' => '4',
                    'blockDisplayLogo' => '1',
                    'blockDisplayText' => '1',
                    "titleTextAlign" => "left",
                    "titleMarginBottom" => "0px",
                    "titlePaddingBottom" => "5px",
                    "textColor" => "rgba(33, 37, 41, 0.8)",
                    "textFontSize" => "18px",
                    "textLineHeight" => "1.6em",
                    "textTextAlign" => "left",
                    "textMarginBottom" => "0px",
                    "imageWidth" => "300px",
                    "imageBorderTopLeftRadius" => "5px",
                    "imageBorderTopRightRadius" => "5px",
                    "imageBorderBottomLeftRadius" => "5px",
                    "imageBorderBottomRightRadius" => "5px",
                    "imageMarginBottom" => "0px",
                    "imagePaddingTop" => "0px",
                    "imagePaddingBottom" => "0px",
                    "membershipContentListItemBackgroundColorBase" => "rgb(255, 255, 255)",
                    "membershipContentListItemBorderTopWidth" => "1px",
                    "membershipContentListItemBorderTopStyle" => "none",
                    "membershipContentListItemBorderTopColor" => "rgb(232, 232, 232)",
                    "membershipContentListItemBorderBottomWidth" => "1px",
                    "membershipContentListItemBorderBottomStyle" => "none",
                    "membershipContentListItemBorderBottomColor" => "rgb(232, 232, 232)",
                    "membershipContentListItemBorderLeftWidth" => "1px",
                    "membershipContentListItemBorderLeftStyle" => "none",
                    "membershipContentListItemBorderLeftColor" => "rgb(232, 232, 232)",
                    "membershipContentListItemBorderRightWidth" => "1px",
                    "membershipContentListItemBorderRightStyle" => "none",
                    "membershipContentListItemBorderRightColor" => "rgb(232, 232, 232)",
                    "membershipContentListItemBorderTopLeftRadius" => "10px",
                    "membershipContentListItemBorderTopRightRadius" => "10px",
                    "membershipContentListItemBorderBottomLeftRadius" => "10px",
                    "membershipContentListItemBorderBottomRightRadius" => "10px",
                    "membershipContentListItemBoxShadow" => "rgba(0, 0, 0, 0) 0px 0px 0px 0px",
                    "membershipContentListItemMarginBottom" => "35px",
                    "membershipContentListItemPaddingTop" => "0px",
                    "membershipContentListItemPaddingBottom" => "0px",
                    "membershipContentListItemPaddingLeft" => "0px",
                    "membershipContentListItemPaddingRight" => "0px",
                    "membershipContentListItemColumnGap" => "30px"
                )
            )
        ),
        array(
            "title" => "Preset #4",
            "thumb" => op3_asset('img/elements/membershipcontentlist/styles/style-4.png'),
            "options" => array(
                "all" => array(
                    "flexBasis" => "33.33%",
                    'blockLayoutDesktop' => '0',
                    'blockDisplayLogo' => '1',
                    'blockDisplayText' => '1',
                    "gutterLeft" => "20px",
                    "gutterRight" => "20px",
                    "gutterAdjustLeft" => "-20px",
                    "gutterAdjustRight" => "-20px",
                    "titleFontSize" => "22px",
                    "titleTextAlign" => "center",
                    "titleMarginBottom" => "0px",
                    "titleMarginLeft" => "auto",
                    "titleMarginRight" => "auto",
                    "titlePaddingTop" => "20px",
                    "titlePaddingBottom" => "16px",
                    "titleMaxWidth" => "80%",
                    "textColor" => "rgba(33, 37, 41, 0.8)",
                    "textFontSize" => "17px",
                    "textLineHeight" => "1.709em",
                    "textTextAlign" => "left",
                    "textMarginBottom" => "0px",
                    "textMarginLeft" => "auto",
                    "textMarginRight" => "auto",
                    "textMaxWidth" => "80%",
                    "imageWidth" => "100%",
                    "imageBorderTopLeftRadius" => "5px",
                    "imageBorderTopRightRadius" => "5px",
                    "imageBorderBottomLeftRadius" => "0px",
                    "imageBorderBottomRightRadius" => "0px",
                    "imageMarginBottom" => "0px",
                    "imagePaddingTop" => "0px",
                    "imagePaddingBottom" => "0px",
                    "membershipContentListItemBackgroundColorBase" => "rgb(255, 255, 255)",
                    "membershipContentListItemBorderTopWidth" => "1px",
                    "membershipContentListItemBorderTopStyle" => "solid",
                    "membershipContentListItemBorderTopColor" => "rgb(232, 232, 232)",
                    "membershipContentListItemBorderBottomWidth" => "1px",
                    "membershipContentListItemBorderBottomStyle" => "solid",
                    "membershipContentListItemBorderBottomColor" => "rgb(232, 232, 232)",
                    "membershipContentListItemBorderLeftWidth" => "1px",
                    "membershipContentListItemBorderLeftStyle" => "solid",
                    "membershipContentListItemBorderLeftColor" => "rgb(232, 232, 232)",
                    "membershipContentListItemBorderRightWidth" => "1px",
                    "membershipContentListItemBorderRightStyle" => "solid",
                    "membershipContentListItemBorderRightColor" => "rgb(232, 232, 232)",
                    "membershipContentListItemBorderTopLeftRadius" => "5px",
                    "membershipContentListItemBorderTopRightRadius" => "5px",
                    "membershipContentListItemBorderBottomLeftRadius" => "5px",
                    "membershipContentListItemBorderBottomRightRadius" => "5px",
                    "membershipContentListItemBoxShadow" => "rgba(0, 0, 0, 0.12) 0px 9px 17px -10px",
                    "membershipContentListItemMarginBottom" => "29px",
                    "membershipContentListItemPaddingTop" => "0px",
                    "membershipContentListItemPaddingBottom" => "25px",
                    "membershipContentListItemPaddingLeft" => "0px",
                    "membershipContentListItemPaddingRight" => "0px",
                    "membershipContentListItemJustifyContent" => "flex-start",
                    "membershipContentListItemColumnGap" => "30px"
                )
            )
        ),
        array(
            "title" => "Preset #5",
            "thumb" => op3_asset('img/elements/membershipcontentlist/styles/style-5.png'),
            "options" => array(
                "all" => array(
                    "flexBasis" => "100%",
                    'blockLayoutDesktop' => '4',
                    'blockDisplayLogo' => '0',
                    'blockDisplayText' => '0',
                    "titleFontSize" => "17px",
                    "titleFontWeight" => "500",
                    "titleTextAlign" => "left",
                    "titleMarginBottom" => "0px",
                    "titlePaddingBottom" => "0px",
                    "textColor" => "rgba(33, 37, 41, 0.8)",
                    "textFontSize" => "17px",
                    "textLineHeight" => "1.6em",
                    "textTextAlign" => "left",
                    "textMarginBottom" => "0px",
                    "imageWidth" => "230px",
                    "imageBorderTopLeftRadius" => "5px",
                    "imageBorderTopRightRadius" => "5px",
                    "imageBorderBottomLeftRadius" => "5px",
                    "imageBorderBottomRightRadius" => "5px",
                    "imageMarginBottom" => "0px",
                    "imageMarginLeft" => "0px",
                    "imageMarginRight" => "30px",
                    "imagePaddingTop" => "0px",
                    "imagePaddingBottom" => "0px",
                    "membershipContentListItemBackgroundColorBase" => "rgb(255, 255, 255)",
                    "membershipContentListItemBorderTopWidth" => "1px",
                    "membershipContentListItemBorderTopStyle" => "solid",
                    "membershipContentListItemBorderTopColor" => "rgb(233, 233, 233)",
                    "membershipContentListItemBorderBottomWidth" => "1px",
                    "membershipContentListItemBorderBottomStyle" => "solid",
                    "membershipContentListItemBorderBottomColor" => "rgb(233, 233, 233)",
                    "membershipContentListItemBorderLeftWidth" => "1px",
                    "membershipContentListItemBorderLeftStyle" => "solid",
                    "membershipContentListItemBorderLeftColor" => "rgb(233, 233, 233)",
                    "membershipContentListItemBorderRightWidth" => "1px",
                    "membershipContentListItemBorderRightStyle" => "solid",
                    "membershipContentListItemBorderRightColor" => "rgb(233, 233, 233)",
                    "membershipContentListItemBorderTopLeftRadius" => "7px",
                    "membershipContentListItemBorderTopRightRadius" => "7px",
                    "membershipContentListItemBorderBottomLeftRadius" => "7px",
                    "membershipContentListItemBorderBottomRightRadius" => "7px",
                    "membershipContentListItemBoxShadow" => "rgba(0, 0, 0, 0) 0px 0px 0px -4px",
                    "membershipContentListItemMarginBottom" => "15px",
                    "membershipContentListItemPaddingTop" => "25px",
                    "membershipContentListItemPaddingBottom" => "25px",
                    "membershipContentListItemPaddingLeft" => "19px",
                    "membershipContentListItemPaddingRight" => "20px",
                    "membershipContentListItemColumnGap" => "0px"
                )
            )
        ),
        array(
            "title" => "Preset #6",
            "thumb" => op3_asset('img/elements/membershipcontentlist/styles/style-6.png'),
            "options" => array(
                "all" => array(
                    "flexBasis" => "100%",
                    'blockLayoutDesktop' => '4',
                    'blockDisplayLogo' => '0',
                    'blockDisplayText' => '0',
                    "titleFontSize" => "23px",
                    "titleFontWeight" => "600",
                    "titleTextAlign" => "left",
                    "titleMarginBottom" => "0px",
                    "titlePaddingBottom" => "0px",
                    "textColor" => "rgba(33, 37, 41, 0.8)",
                    "textFontSize" => "17px",
                    "textLineHeight" => "1.6em",
                    "textTextAlign" => "left",
                    "textMarginBottom" => "0px",
                    "imageWidth" => "230px",
                    "imageBorderTopLeftRadius" => "5px",
                    "imageBorderTopRightRadius" => "5px",
                    "imageBorderBottomLeftRadius" => "5px",
                    "imageBorderBottomRightRadius" => "5px",
                    "imageMarginBottom" => "0px",
                    "imageMarginLeft" => "0px",
                    "imageMarginRight" => "30px",
                    "imagePaddingTop" => "0px",
                    "imagePaddingBottom" => "0px",
                    "membershipContentListItemBackgroundColorBase" => "rgb(255, 255, 255)",
                    "membershipContentListItemBorderTopWidth" => "1px",
                    "membershipContentListItemBorderTopStyle" => "solid",
                    "membershipContentListItemBorderTopColor" => "rgb(225, 225, 225)",
                    "membershipContentListItemBorderBottomWidth" => "1px",
                    "membershipContentListItemBorderBottomStyle" => "solid",
                    "membershipContentListItemBorderBottomColor" => "rgb(225, 225, 225)",
                    "membershipContentListItemBorderLeftWidth" => "1px",
                    "membershipContentListItemBorderLeftStyle" => "solid",
                    "membershipContentListItemBorderLeftColor" => "rgb(225, 225, 225)",
                    "membershipContentListItemBorderRightWidth" => "1px",
                    "membershipContentListItemBorderRightStyle" => "solid",
                    "membershipContentListItemBorderRightColor" => "rgb(225, 225, 225)",
                    "membershipContentListItemBorderTopLeftRadius" => "7px",
                    "membershipContentListItemBorderTopRightRadius" => "7px",
                    "membershipContentListItemBorderBottomLeftRadius" => "7px",
                    "membershipContentListItemBorderBottomRightRadius" => "7px",
                    "membershipContentListItemBoxShadow" => "rgba(0, 0, 0, 0.09) 0px 0px 10px -1px",
                    "membershipContentListItemMarginBottom" => "26px",
                    "membershipContentListItemPaddingTop" => "14px",
                    "membershipContentListItemPaddingBottom" => "14px",
                    "membershipContentListItemPaddingLeft" => "19px",
                    "membershipContentListItemPaddingRight" => "20px",
                    "membershipContentListItemColumnGap" => "0px"
                )
            )
        ),
        array(
            "title" => "Preset #7",
            "thumb" => op3_asset('img/elements/membershipcontentlist/styles/style-7.png'),
            "options" => array(
                "all" => array(
                    "flexBasis" => "100%",
                    'blockLayoutDesktop' => '4',
                    'blockDisplayLogo' => '0',
                    'blockDisplayText' => '0',
                    "titleFontSize" => "21px",
                    "titleFontWeight" => "700",
                    "titleTextAlign" => "left",
                    "titleMarginBottom" => "0px",
                    "titlePaddingBottom" => "0px",
                    "textColor" => "rgba(33, 37, 41, 0.8)",
                    "textFontSize" => "17px",
                    "textLineHeight" => "1.6em",
                    "textTextAlign" => "left",
                    "textMarginBottom" => "0px",
                    "imageWidth" => "230px",
                    "imageBorderTopLeftRadius" => "5px",
                    "imageBorderTopRightRadius" => "5px",
                    "imageBorderBottomLeftRadius" => "5px",
                    "imageBorderBottomRightRadius" => "5px",
                    "imageMarginBottom" => "0px",
                    "imageMarginLeft" => "0px",
                    "imageMarginRight" => "30px",
                    "imagePaddingTop" => "0px",
                    "imagePaddingBottom" => "0px",
                    "membershipContentListItemBackgroundColorBase" => "rgb(255, 255, 255)",
                    "membershipContentListItemBorderTopWidth" => "0px",
                    "membershipContentListItemBorderTopStyle" => "none",
                    "membershipContentListItemBorderTopColor" => "rgb(225, 225, 225)",
                    "membershipContentListItemBorderBottomWidth" => "2px",
                    "membershipContentListItemBorderBottomStyle" => "solid",
                    "membershipContentListItemBorderBottomColor" => "rgb(233, 233, 233)",
                    "membershipContentListItemBorderLeftWidth" => "0px",
                    "membershipContentListItemBorderLeftStyle" => "none",
                    "membershipContentListItemBorderLeftColor" => "rgb(225, 225, 225)",
                    "membershipContentListItemBorderRightWidth" => "0px",
                    "membershipContentListItemBorderRightStyle" => "none",
                    "membershipContentListItemBorderRightColor" => "rgb(225, 225, 225)",
                    "membershipContentListItemBorderTopLeftRadius" => "0px",
                    "membershipContentListItemBorderTopRightRadius" => "0px",
                    "membershipContentListItemBorderBottomLeftRadius" => "0px",
                    "membershipContentListItemBorderBottomRightRadius" => "0px",
                    "membershipContentListItemBoxShadow" => "rgba(0, 0, 0, 0) 0px 0px 0px 0px",
                    "membershipContentListItemMarginBottom" => "26px",
                    "membershipContentListItemPaddingTop" => "14px",
                    "membershipContentListItemPaddingBottom" => "14px",
                    "membershipContentListItemPaddingLeft" => "0px",
                    "membershipContentListItemPaddingRight" => "20px",
                    "membershipContentListItemColumnGap" => "0px"
                )
            )
        ),
        array(
            "title" => "Preset #8",
            "thumb" => op3_asset('img/elements/membershipcontentlist/styles/style-8.png'),
            "options" => array(
                "all" => array(
                    "flexBasis" => "100%",
                    'blockLayoutDesktop' => '4',
                    'blockDisplayLogo' => '0',
                    'blockDisplayText' => '1',
                    "titleFontSize" => "17px",
                    "titleFontWeight" => "500",
                    "titleTextAlign" => "left",
                    "titleMarginBottom" => "0px",
                    "titlePaddingBottom" => "0px",
                    "textColor" => "rgba(33, 37, 41, 0.8)",
                    "textFontSize" => "17px",
                    "textLineHeight" => "1.6em",
                    "textTextAlign" => "left",
                    "textMarginBottom" => "0px",
                    "imageWidth" => "230px",
                    "imageBorderTopLeftRadius" => "5px",
                    "imageBorderTopRightRadius" => "5px",
                    "imageBorderBottomLeftRadius" => "5px",
                    "imageBorderBottomRightRadius" => "5px",
                    "imageMarginBottom" => "0px",
                    "imageMarginLeft" => "0px",
                    "imageMarginRight" => "30px",
                    "imagePaddingTop" => "0px",
                    "imagePaddingBottom" => "0px",
                    "membershipContentListItemBackgroundColorBase" => "rgb(255, 255, 255)",
                    "membershipContentListItemBorderTopWidth" => "1px",
                    "membershipContentListItemBorderTopStyle" => "none",
                    "membershipContentListItemBorderTopColor" => "rgb(233, 233, 233)",
                    "membershipContentListItemBorderBottomWidth" => "1px",
                    "membershipContentListItemBorderBottomStyle" => "none",
                    "membershipContentListItemBorderBottomColor" => "rgb(233, 233, 233)",
                    "membershipContentListItemBorderLeftWidth" => "1px",
                    "membershipContentListItemBorderLeftStyle" => "none",
                    "membershipContentListItemBorderLeftColor" => "rgb(233, 233, 233)",
                    "membershipContentListItemBorderRightWidth" => "1px",
                    "membershipContentListItemBorderRightStyle" => "none",
                    "membershipContentListItemBorderRightColor" => "rgb(233, 233, 233)",
                    "membershipContentListItemBorderTopLeftRadius" => "0px",
                    "membershipContentListItemBorderTopRightRadius" => "0px",
                    "membershipContentListItemBorderBottomLeftRadius" => "0px",
                    "membershipContentListItemBorderBottomRightRadius" => "0px",
                    "membershipContentListItemBoxShadow" => "rgba(0, 0, 0, 0) 0px 0px 0px -4px",
                    "membershipContentListItemMarginBottom" => "0px",
                    "membershipContentListItemPaddingTop" => "25px",
                    "membershipContentListItemPaddingBottom" => "25px",
                    "membershipContentListItemPaddingLeft" => "0px",
                    "membershipContentListItemPaddingRight" => "0px",
                    "membershipContentListItemColumnGap" => "0px"
                )
            )
        )
    ),

    /**
     * Preset include properties:
     * While applying preset live-editor will reset all
     * css properties. Use this to add any non-css
     * property to reset list.
     *
     * Note: this object must be in following format:
     * >>> presetIncludeProperties = {
     *         "all": [ "color", ... ],
     *         .
     *         .
     *         .
     *     }
     *
     * ...where all is media and color is property id.
     */
    'presetIncludeProperties' => array(),

    /**
     * Preset exclude properties:
     * This is opposite of presetIncludeProperties
     * (use this to remove any css property from
     * reset list).
     *
     * Note: this object must be in following format:
     * >>> presetExcludeProperties = {
     *         "all": [ "href", ... ],
     *         .
     *         .
     *         .
     *     }
     *
     * ...where all is media and href is property id.
     */
    'presetExcludeProperties' => array(),

    /**
     * PHP class user for rendering the element
     * (NULL for templates).
     */
    'objectClass' => 'MembershipContentList',
);
