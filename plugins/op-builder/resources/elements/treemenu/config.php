<?php

return array(

    /**
     * Element type:
     * If starts with underscore this is considered
     * as template. With template only markup is needed,
     * the rest will be inherited from real element type
     * config.
     */
    'type' => 'treemenu',

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
    'title' => 'WP Menu',

    /**
     * Element thumb:
     * Thumb displayed on sidebar.
     */
    'thumb' => 'op3-icon op3-icon-segmentation-2',

    /**
     * Element wrapper:
     * Wrap element with this element type
     * (NULL for templates). This is usually element
     * name (string), but it can also be list of
     * element names (fontend uses first as default
     * wrapper element).
     */
    'parent' => 'column',

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
    'dropTarget' => null,

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
    'dragOffset' => null,

    /**
     * Drag stop propagation:
     * Do not allow drag propagation which is usefull
     * for elements with overlay
     * (NULL for templates and for elements with no
     * acceptDrop)
     */
    'dragStopPropagation' => null,

    /**
     * Drag lock children:
     * Do not allow child elements to be moved to
     * another element.
     */
    'dragLockChildren' => false,

    /**
     * Drop wrap:
     * It TRUE element will be wrapped with parent
     * until parent match dropzone. This can also
     * be list of parent element types which will
     * accept element for drop
     * (NULL for templates).
     */
    'dropWrap' => true,

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
    'canSyncChildren' => false,

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
    'assets' => array(
        op3_asset_path('css/op3-icons.css'),
        op3_asset_path('js/jquery-simple-nav-tree.js'),
        op3_asset_path('js/op3-element-treemenu.js'),
    ),

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
            'marginLeft' => 'auto',
            'marginRight' => 'auto',
            'stackColumnsDesktop' => '0',
            'stackColumnsTablet' => '1',
            'stackColumnsMobile' => '1',
            'autosizeColumns' => '0',
            'hamburgerLabel' => 'Menu',
            'hamburgerIcon' => 'op3-icon-menu-34-2',
            'hamburgerIconOrder' => '1',
            'hamburgerMarginRight' => '10px',
            'hamburgerMarginLeft' => '0',
            "hamburgerSidebarWidth" => "300px",
            "hamburgerTriangleVisible" => "0",
            "hamburgerBackgroundColor" => "#fff",
            'hamburgerTextVisible' => '0',
            'hamburgerFontSize' => '25px',
            'hamburgerJustifyContent' => 'flex-end',
            'treeMenuStyling' => 'right',
            'treeMenuItemLvl1LinkJustifyContent' => 'flex-start',
            'treeMenuItemLvl2LinkJustifyContent' => 'flex-start',
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
            "title" => "Preset 1",
            "thumb" => op3_asset('img/elements/treemenu/styles/style-1.png'),
            "options" => array(
                "all" => array(
                    "hamburgerJustifyContent" => "flex-end",
                    "hamburgerFontSize" => "25px",
                    "hamburgerBackgroundColor" => "rgb(255, 255, 255)",
                    "hamburgerTextDisplay" => "none",
                    "hamburgerMarginLeft" => "0px",
                    "hamburgerMarginRight" => "0px",
                    "hamburgerIconOrder" => "1",
                    "hamburgerSidebarWidth" => "300px",
                    "marginLeft" => "auto",
                    "marginRight" => "auto",
                    "hamburgerTriangleDisplay" => "none",
                    "treeMenuItemChildWrapMarginTop" => "0px",
                    "treeMenuItemChildWrapMarginLeft" => "0px",
                    "treeMenuItemChildWrapMarginRight" => "0px",
                    "treeMenuItemChildWrapPaddingLeft" => "0px",
                    "treeMenuItemChildWrapBorderTopWidth" => "1px",
                    "treeMenuItemChildWrapBorderTopColor" => "rgba(221, 221, 221, 0.72)",
                    "treeMenuItemChildWrapBorderBottomWidth" => "1px",
                    "treeMenuItemChildWrapBorderBottomColor" => "rgba(221, 221, 221, 0.72)",
                    "treeMenuItemChildWrapBorderLeftWidth" => "1px",
                    "treeMenuItemChildWrapBorderLeftColor" => "rgba(221, 221, 221, 0.72)",
                    "treeMenuItemChildWrapBorderRightWidth" => "1px",
                    "treeMenuItemChildWrapBorderRightColor" => "rgba(221, 221, 221, 0.72)",
                    "treeMenuItemChildWrapBorderTopLeftRadius" => "10px",
                    "treeMenuItemChildWrapBorderTopRightRadius" => "10px",
                    "treeMenuItemChildWrapBorderBottomLeftRadius" => "10px",
                    "treeMenuItemChildWrapBorderBottomRightRadius" => "10px",
                    "treeMenuItemChildWrapBoxShadow" => "rgba(0, 0, 0, 0.09) 0px 14px 28px -10px",
                    "treeMenuItemLvl1Color" => "rgba(33, 37, 41, 0.79)",
                    "treeMenuItemLvl1BorderTopWidth" => "1px",
                    "treeMenuItemLvl1BorderBottomWidth" => "1px",
                    "treeMenuItemLvl1BorderLeftWidth" => "1px",
                    "treeMenuItemLvl1BorderRightWidth" => "1px",
                    "treeMenuItemLvl1BorderTopLeftRadius" => "5px",
                    "treeMenuItemLvl1BorderTopRightRadius" => "5px",
                    "treeMenuItemLvl1BorderBottomLeftRadius" => "5px",
                    "treeMenuItemLvl1BorderBottomRightRadius" => "5px",
                    "treeMenuItemLvl1MinHeight" => "60px",
                    "treeMenuItemLvl1SubmenuAlignLeft" => "0px",
                    "treeMenuItemLvl1SubmenuAlignRight" => "auto",
                    "treeMenuItemLvl1SubmenuAlignTransform" => "none",
                    "treeMenuItemLvl1BackgroundColorBaseHover" => "rgba(0, 0, 0, 0.03)",
                    "treeMenuItemLvl1ColorHover" => "rgb(33, 37, 41)",
                    "treeMenuItemLvl2Color" => "rgba(33, 37, 41, 0.7)",
                    "treeMenuItemLvl2MinHeight" => "50px",
                    "treeMenuItemLvl2BackgroundColorBaseHover" => "rgba(0, 0, 0, 0.01)",
                    "treeMenuItemLvl2ColorHover" => "rgb(33, 37, 41)"
                ),
                "screen and (max-width: 1023px)" => array(
                    "hamburgerJustifyContent" => "center",
                    "hamburgerSidebarWidth" => "100%",
                    "treeMenuItemChildWrapMarginTop" => "0px",
                    "treeMenuItemChildWrapBorderTopWidth" => "0px",
                    "treeMenuItemChildWrapBorderBottomWidth" => "0px",
                    "treeMenuItemChildWrapBorderLeftWidth" => "0px",
                    "treeMenuItemChildWrapBorderRightWidth" => "0px",
                    "treeMenuItemChildWrapBorderTopLeftRadius" => "0px",
                    "treeMenuItemChildWrapBorderTopRightRadius" => "0px",
                    "treeMenuItemChildWrapBorderBottomLeftRadius" => "0px",
                    "treeMenuItemChildWrapBorderBottomRightRadius" => "0px",
                    "treeMenuItemChildWrapBoxShadow" => "rgba(0, 0, 0, 0) 0px 0px 0px 0px",
                    "treeMenuItemChildWrapBackgroundBackgroundColorChildWrap" => "#f3f3f3",
                    "treeMenuItemLvl1BorderTopWidth" => "0px",
                    "treeMenuItemLvl1BorderBottomWidth" => "0px",
                    "treeMenuItemLvl1BorderLeftWidth" => "0px",
                    "treeMenuItemLvl1BorderRightWidth" => "0px",
                    "treeMenuItemLvl1LinkJustifyContent" => "center",
                    "treeMenuItemLvl2LinkJustifyContent" => "center",
                    "treeMenuItemLvl2BackgroundColorBaseHover" => "rgba(255, 255, 255, 0.3)"
                ),
                "screen and (max-width: 767px)" => array(
                    "hamburgerSidebarWidth" => "100%",
                    "hamburgerTriangleDisplay" => "none",
                    "treeMenuItemLvl1LinkJustifyContent" => "center",
                    "treeMenuItemLvl2LinkJustifyContent" => "center"
                )
            )
        ),
        array(
            "title" => "Preset 2",
            "thumb" => op3_asset('img/elements/treemenu/styles/style-2.png'),
            "options" => array(
                "all" => array(
                    "hamburgerJustifyContent" => "flex-end",
                    "hamburgerFontSize" => "25px",
                    "hamburgerBackgroundColor" => "rgb(33, 37, 41)",
                    "hamburgerTextDisplay" => "none",
                    "hamburgerMarginLeft" => "0px",
                    "hamburgerMarginRight" => "0px",
                    "hamburgerIconOrder" => "1",
                    "hamburgerIconCloseColor" => "rgb(255, 255, 255)",
                    "hamburgerSidebarWidth" => "300px",
                    "marginLeft" => "auto",
                    "marginRight" => "auto",
                    "hamburgerTriangleDisplay" => "none",
                    "treeMenuItemChildWrapMarginTop" => "5px",
                    "treeMenuItemChildWrapMarginLeft" => "0px",
                    "treeMenuItemChildWrapMarginRight" => "0px",
                    "treeMenuItemChildWrapPaddingLeft" => "0px",
                    "treeMenuItemChildWrapBorderTopWidth" => "1px",
                    "treeMenuItemChildWrapBorderTopColor" => "rgba(221, 221, 221, 0.72)",
                    "treeMenuItemChildWrapBorderBottomWidth" => "1px",
                    "treeMenuItemChildWrapBorderBottomColor" => "rgba(221, 221, 221, 0.72)",
                    "treeMenuItemChildWrapBorderLeftWidth" => "1px",
                    "treeMenuItemChildWrapBorderLeftColor" => "rgba(221, 221, 221, 0.72)",
                    "treeMenuItemChildWrapBorderRightWidth" => "1px",
                    "treeMenuItemChildWrapBorderRightColor" => "rgba(221, 221, 221, 0.72)",
                    "treeMenuItemChildWrapBorderTopLeftRadius" => "10px",
                    "treeMenuItemChildWrapBorderTopRightRadius" => "10px",
                    "treeMenuItemChildWrapBorderBottomLeftRadius" => "10px",
                    "treeMenuItemChildWrapBorderBottomRightRadius" => "10px",
                    "treeMenuItemChildWrapBoxShadow" => "rgba(0, 0, 0, 0.09) 0px 14px 28px -10px",
                    "treeMenuItemLvl1Color" => "rgba(255, 255, 255, 0.79)",
                    "treeMenuItemLvl1BorderTopWidth" => "1px",
                    "treeMenuItemLvl1BorderBottomWidth" => "1px",
                    "treeMenuItemLvl1BorderLeftWidth" => "1px",
                    "treeMenuItemLvl1BorderRightWidth" => "1px",
                    "treeMenuItemLvl1BorderTopLeftRadius" => "10px",
                    "treeMenuItemLvl1BorderTopRightRadius" => "10px",
                    "treeMenuItemLvl1BorderBottomLeftRadius" => "10px",
                    "treeMenuItemLvl1BorderBottomRightRadius" => "10px",
                    "treeMenuItemLvl1MinHeight" => "60px",
                    "treeMenuItemLvl1SubmenuAlignLeft" => "0px",
                    "treeMenuItemLvl1SubmenuAlignRight" => "auto",
                    "treeMenuItemLvl1SubmenuAlignTransform" => "none",
                    "treeMenuItemLvl1BackgroundColorBaseHover" => "rgba(255, 255, 255, 0.07)",
                    "treeMenuItemLvl1ColorHover" => "rgb(255, 255, 255)",
                    "treeMenuItemLvl2Color" => "rgba(33, 37, 41, 0.7)",
                    "treeMenuItemLvl2MinHeight" => "50px",
                    "treeMenuItemLvl2BackgroundColorBaseHover" => "rgba(0, 0, 0, 0.03)",
                    "treeMenuItemLvl2ColorHover" => "rgb(33, 37, 41)"
                ),
                "screen and (max-width: 1023px)" => array(
                    "hamburgerJustifyContent" => "center",
                    "hamburgerColor" => "rgb(255, 255, 255)",
                    "hamburgerBackgroundColor" => "rgba(25, 25, 25, 0.95)",
                    "hamburgerSidebarWidth" => "100%",
                    "treeMenuItemChildWrapMarginTop" => "0px",
                    "treeMenuItemChildWrapBorderTopWidth" => "0px",
                    "treeMenuItemChildWrapBorderBottomWidth" => "0px",
                    "treeMenuItemChildWrapBorderLeftWidth" => "0px",
                    "treeMenuItemChildWrapBorderRightWidth" => "0px",
                    "treeMenuItemChildWrapBorderTopLeftRadius" => "0px",
                    "treeMenuItemChildWrapBorderTopRightRadius" => "0px",
                    "treeMenuItemChildWrapBorderBottomLeftRadius" => "0px",
                    "treeMenuItemChildWrapBorderBottomRightRadius" => "0px",
                    "treeMenuItemChildWrapBoxShadow" => "rgba(0, 0, 0, 0) 0px 0px 0px 0px",
                    "treeMenuItemChildWrapBackgroundBackgroundColorChildWrap" => "#f3f3f3",
                    "treeMenuItemLvl1Color" => "rgba(255, 255, 255, 0.79)",
                    "treeMenuItemLvl1BorderTopWidth" => "0px",
                    "treeMenuItemLvl1BorderBottomWidth" => "0px",
                    "treeMenuItemLvl1BorderLeftWidth" => "0px",
                    "treeMenuItemLvl1BorderRightWidth" => "0px",
                    "treeMenuItemLvl1LinkJustifyContent" => "center",
                    "treeMenuItemLvl1ColorHover" => "rgb(255, 255, 255)",
                    "treeMenuItemLvl2Color" => "rgba(255, 255, 255, 0.7)",
                    "treeMenuItemLvl2LinkJustifyContent" => "center",
                    "treeMenuItemLvl2BackgroundColorBaseHover" => "rgba(255, 255, 255, 0.1)",
                    "treeMenuItemLvl2ColorHover" => "rgb(255, 255, 255)"
                ),
                "screen and (max-width: 767px)" => array(
                    "hamburgerSidebarWidth" => "100%",
                    "hamburgerTriangleDisplay" => "none",
                    "treeMenuItemLvl1LinkJustifyContent" => "center",
                    "treeMenuItemLvl2LinkJustifyContent" => "center"
                )
            )
        ),
        array(
            "title" => "Preset 3",
            "thumb" => op3_asset('img/elements/treemenu/styles/style-3.png'),
            "options" => array(
                "all" => array(
                    "gutterLeft" => "7.5px",
                    "gutterRight" => "7.5px",
                    "gutterAdjustLeft" => "-7.5px",
                    "gutterAdjustRight" => "-7.5px",
                    "fontSize" => "18px",
                    "color" => "rgb(255, 255, 255)",
                    "hamburgerJustifyContent" => "flex-end",
                    "hamburgerFontSize" => "25px",
                    "hamburgerBackgroundColor" => "rgb(255, 255, 255)",
                    "hamburgerTextDisplay" => "none",
                    "hamburgerMarginLeft" => "0px",
                    "hamburgerMarginRight" => "0px",
                    "hamburgerIconOrder" => "1",
                    "hamburgerSidebarWidth" => "300px",
                    "marginLeft" => "auto",
                    "marginRight" => "auto",
                    "hamburgerTriangleDisplay" => "none",
                    "treeMenuItemChildWrapMarginTop" => "13px",
                    "treeMenuItemChildWrapBorderTopWidth" => "0px",
                    "treeMenuItemChildWrapBorderTopStyle" => "none",
                    "treeMenuItemChildWrapBorderBottomWidth" => "0px",
                    "treeMenuItemChildWrapBorderBottomStyle" => "none",
                    "treeMenuItemChildWrapBorderLeftWidth" => "0px",
                    "treeMenuItemChildWrapBorderLeftStyle" => "none",
                    "treeMenuItemChildWrapBorderRightWidth" => "0px",
                    "treeMenuItemChildWrapBorderRightStyle" => "none",
                    "treeMenuItemChildWrapBoxShadow" => "rgba(0, 0, 0, 0.25) 0px 14px 28px -10px",
                    "treeMenuItemLvl1Color" => "rgba(0, 0, 0, 0.8)",
                    "treeMenuItemLvl1BorderBottomWidth" => "3px",
                    "treeMenuItemLvl1BorderBottomStyle" => "solid",
                    "treeMenuItemLvl1BorderBottomColor" => "rgba(255, 255, 255, 0)",
                    "treeMenuItemLvl1BorderTopLeftRadius" => "0px",
                    "treeMenuItemLvl1BorderTopRightRadius" => "0px",
                    "treeMenuItemLvl1BorderBottomLeftRadius" => "0px",
                    "treeMenuItemLvl1BorderBottomRightRadius" => "0px",
                    "treeMenuItemLvl1SubmenuAlignLeft" => "0px",
                    "treeMenuItemLvl1SubmenuAlignRight" => "auto",
                    "treeMenuItemLvl1SubmenuAlignTransform" => "none",
                    "treeMenuItemLvl1LinkPaddingLeft" => "10px",
                    "treeMenuItemLvl1LinkPaddingRight" => "10px",
                    "treeMenuItemLvl1LinkJustifyContent" => "flex-start",
                    "treeMenuItemLvl1ColorHover" => "rgba(0, 0, 0, 0.9)",
                    "treeMenuItemLvl1BorderBottomWidthHover" => "3px",
                    "treeMenuItemLvl1BorderBottomStyleHover" => "solid",
                    "treeMenuItemLvl1BorderBottomColorHover" => "rgba(0, 0, 0, 0.9)",
                    "treeMenuItemLvl2Color" => "rgba(0, 0, 0, 0.6)",
                    "treeMenuItemLvl2MinHeight" => "50px",
                    "treeMenuItemLvl2LinkPaddingLeft" => "25px",
                    "treeMenuItemLvl2LinkPaddingRight" => "25px",
                    "treeMenuItemLvl2LinkJustifyContent" => "flex-start",
                    "treeMenuItemLvl2ColorHover" => "rgba(0, 0, 0, 0.95)"
                ),
                "screen and (max-width: 1023px)" => array(
                    "hamburgerFontSize" => "30px",
                    "hamburgerColor" => "rgba(27, 27, 27, 0.83)",
                    "hamburgerBackgroundColor" => "rgb(255, 255, 255)",
                    "hamburgerIconCloseColor" => "rgba(39, 39, 39, 0.76)",
                    "hamburgerSidebarWidth" => "100%",
                    "treeMenuItemChildWrapMarginTop" => "0px",
                    "treeMenuItemChildWrapBoxShadow" => "rgba(0, 0, 0, 0) 0px 0px 0px 0px",
                    "treeMenuItemChildWrapBackgroundBackgroundColorChildWrap" => "#f7f7f7",
                    "treeMenuItemLvl1FontSize" => "16px",
                    "treeMenuItemLvl1Color" => "rgba(0, 0, 0, 0.6)",
                    "treeMenuItemLvl1BorderBottomWidth" => "0px",
                    "treeMenuItemLvl1MinHeight" => "55px",
                    "treeMenuItemLvl1LinkPaddingLeft" => "20px",
                    "treeMenuItemLvl1LinkPaddingRight" => "20px",
                    "treeMenuItemLvl1LinkJustifyContent" => "center",
                    "treeMenuItemLvl1BorderBottomWidthHover" => "0px",
                    "treeMenuItemLvl2FontSize" => "16px",
                    "treeMenuItemLvl2MinHeight" => "53px",
                    "treeMenuItemLvl2LinkJustifyContent" => "center"
                ),
                "screen and (max-width: 767px)" => array(
                    "hamburgerSidebarWidth" => "100%",
                    "hamburgerTriangleDisplay" => "none",
                    "treeMenuItemLvl1LinkJustifyContent" => "center",
                    "treeMenuItemLvl2LinkJustifyContent" => "center"
                )
            )
        ),
        array(
            "title" => "Preset 4",
            "thumb" => op3_asset('img/elements/treemenu/styles/style-4.png'),
            "options" => array(
                "all" => array(
                    "gutterLeft" => "15px",
                    "gutterRight" => "15px",
                    "gutterAdjustLeft" => "-15px",
                    "gutterAdjustRight" => "-15px",
                    "fontSize" => "18px",
                    "color" => "rgb(255, 255, 255)",
                    "hamburgerJustifyContent" => "flex-end",
                    "hamburgerFontSize" => "25px",
                    "hamburgerBackgroundColor" => "rgb(255, 255, 255)",
                    "hamburgerTextDisplay" => "none",
                    "hamburgerMarginLeft" => "0px",
                    "hamburgerMarginRight" => "0px",
                    "hamburgerIconOrder" => "1",
                    "hamburgerSidebarWidth" => "300px",
                    "marginLeft" => "auto",
                    "marginRight" => "auto",
                    "hamburgerTriangleDisplay" => "none",
                    "treeMenuItemChildWrapMarginTop" => "13px",
                    "treeMenuItemChildWrapBorderTopWidth" => "0px",
                    "treeMenuItemChildWrapBorderTopStyle" => "none",
                    "treeMenuItemChildWrapBorderBottomWidth" => "0px",
                    "treeMenuItemChildWrapBorderBottomStyle" => "none",
                    "treeMenuItemChildWrapBorderLeftWidth" => "0px",
                    "treeMenuItemChildWrapBorderLeftStyle" => "none",
                    "treeMenuItemChildWrapBorderRightWidth" => "0px",
                    "treeMenuItemChildWrapBorderRightStyle" => "none",
                    "treeMenuItemChildWrapBoxShadow" => "rgba(0, 0, 0, 0.25) 0px 14px 28px -10px",
                    "treeMenuItemLvl1BorderBottomWidth" => "3px",
                    "treeMenuItemLvl1BorderBottomStyle" => "solid",
                    "treeMenuItemLvl1BorderBottomColor" => "rgba(255, 255, 255, 0)",
                    "treeMenuItemLvl1BorderTopLeftRadius" => "0px",
                    "treeMenuItemLvl1BorderTopRightRadius" => "0px",
                    "treeMenuItemLvl1BorderBottomLeftRadius" => "0px",
                    "treeMenuItemLvl1BorderBottomRightRadius" => "0px",
                    "treeMenuItemLvl1SubmenuAlignLeft" => "0px",
                    "treeMenuItemLvl1SubmenuAlignRight" => "auto",
                    "treeMenuItemLvl1SubmenuAlignTransform" => "none",
                    "treeMenuItemLvl1LinkPaddingLeft" => "0px",
                    "treeMenuItemLvl1LinkPaddingRight" => "0px",
                    "treeMenuItemLvl1LinkJustifyContent" => "flex-start",
                    "treeMenuItemLvl1BorderBottomWidthHover" => "3px",
                    "treeMenuItemLvl1BorderBottomStyleHover" => "solid",
                    "treeMenuItemLvl1BorderBottomColorHover" => "rgb(255, 255, 255)",
                    "treeMenuItemLvl2Color" => "rgba(0, 0, 0, 0.6)",
                    "treeMenuItemLvl2MinHeight" => "50px",
                    "treeMenuItemLvl2LinkPaddingLeft" => "25px",
                    "treeMenuItemLvl2LinkPaddingRight" => "25px",
                    "treeMenuItemLvl2LinkJustifyContent" => "flex-start",
                    "treeMenuItemLvl2ColorHover" => "rgba(0, 0, 0, 0.95)"
                ),
                "screen and (max-width: 1023px)" => array(
                    "hamburgerFontSize" => "30px",
                    "hamburgerBackgroundColor" => "rgb(255, 255, 255)",
                    "hamburgerIconCloseColor" => "rgba(0, 0, 0, 0.8)",
                    "hamburgerSidebarWidth" => "100%",
                    "treeMenuItemChildWrapMarginTop" => "0px",
                    "treeMenuItemChildWrapBoxShadow" => "rgba(0, 0, 0, 0) 0px 0px 0px 0px",
                    "treeMenuItemChildWrapBackgroundBackgroundColorChildWrap" => "#f7f7f7",
                    "treeMenuItemLvl1FontSize" => "16px",
                    "treeMenuItemLvl1Color" => "rgba(0, 0, 0, 0.6)",
                    "treeMenuItemLvl1MinHeight" => "55px",
                    "treeMenuItemLvl1LinkPaddingLeft" => "20px",
                    "treeMenuItemLvl1LinkPaddingRight" => "20px",
                    "treeMenuItemLvl1LinkJustifyContent" => "center",
                    "treeMenuItemLvl2FontSize" => "16px",
                    "treeMenuItemLvl2MinHeight" => "53px",
                    "treeMenuItemLvl2LinkJustifyContent" => "center"
                ),
                "screen and (max-width: 767px)" => array(
                    "hamburgerSidebarWidth" => "100%",
                    "hamburgerTriangleDisplay" => "none",
                    "treeMenuItemLvl1LinkJustifyContent" => "center",
                    "treeMenuItemLvl2LinkJustifyContent" => "center"
                )
            )
        ),
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
    'objectClass' => 'TreeMenu',

);
