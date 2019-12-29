<?php

return array(

    /**
     * Element type:
     * If starts with underscore this is considered
     * as template. With template only markup is needed,
     * the rest will be inherited from real element type
     * config.
     */
    'type' => 'form',

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
    'title' => 'Optin Form',

    /**
     * Element thumb:
     * Thumb displayed on sidebar.
     */
    'thumb' => 'email-83-1',

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
    'childrenDirectionHorizontal' => false,

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
        op3_asset_path('js/op3-element-form.js'),
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
            'optinFieldLayout' => 'stacked',
            'spacing' => '10px',
            'adminEmail' => op3_admin_email(),
            'optinDoubleOptin' => '1',
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
            'title' => 'Preset 1',
            'thumb' => op3_asset('img/elements/form/styles/style-1.svg'),
            'options' => array(
                'all' => array(
                    'marginLeft' => 'auto',
                    'marginRight' => 'auto',
                    'spacing' => '10px',
                    'inputLabelDisplay' => 'none',
                    'inputIconDisplay' => 'block',
                    'inputInputPaddingTop' => '20px',
                    'inputInputPaddingBottom' => '20px',
                    'inputInputPaddingLeft' => '20px',
                    'inputInputPaddingRight' => '20px',
                    'inputBackgroundColorOverlay' => '#fff',
                    'inputBorderAllWidth' => '1px',
                    'inputBorderAllStyle' => 'solid',
                    'inputBorderAllColor' => '#e8e8e8',
                    'inputBorderTopWidth' => '1px',
                    'inputBorderTopStyle' => 'solid',
                    'inputBorderTopColor' => '#e8e8e8',
                    'inputBorderBottomWidth' => '1px',
                    'inputBorderBottomStyle' => 'solid',
                    'inputBorderBottomColor' => '#e8e8e8',
                    'inputBorderLeftWidth' => '1px',
                    'inputBorderLeftStyle' => 'solid',
                    'inputBorderLeftColor' => '#e8e8e8',
                    'inputBorderRightWidth' => '1px',
                    'inputBorderRightStyle' => 'solid',
                    'inputBorderRightColor' => '#e8e8e8',
                    'buttonMaxWidth' => '100%',
                    'buttonFontSize' => '19px',
                    'buttonFontWeight' => '700',
                    'buttonLineHeight' => '1.5em',
                    'buttonBackgroundColorOverlay' => '#f58207',
                    'buttonTextShadow' => 'rgba(0, 0, 0, 0.15) 0px 1px 0px',
                    'buttonPaddingTop' => '22px',
                    'buttonPaddingBottom' => '22px',
                ),
            ),
        ),
        array(
            'title' => 'Preset 2',
            'thumb' => op3_asset('img/elements/form/styles/style-2.svg'),
            'options' => array(
                'all' => array(
                    'marginLeft' => 'auto',
                    'marginRight' => 'auto',
                    'spacing' => '10px',
                    'inputLabelDisplay' => 'none',
                    'inputIconDisplay' => 'block',
                    'inputInputPaddingTop' => '20px',
                    'inputInputPaddingBottom' => '20px',
                    'inputInputPaddingLeft' => '20px',
                    'inputInputPaddingRight' => '20px',
                    'inputBackgroundColorOverlay' => '#fff',
                    'inputBorderAllWidth' => '1px',
                    'inputBorderAllStyle' => 'solid',
                    'inputBorderAllColor' => '#e8e8e8',
                    'inputBorderTopWidth' => '1px',
                    'inputBorderTopStyle' => 'solid',
                    'inputBorderTopColor' => '#e8e8e8',
                    'inputBorderBottomWidth' => '1px',
                    'inputBorderBottomStyle' => 'solid',
                    'inputBorderBottomColor' => '#e8e8e8',
                    'inputBorderLeftWidth' => '1px',
                    'inputBorderLeftStyle' => 'solid',
                    'inputBorderLeftColor' => '#e8e8e8',
                    'inputBorderRightWidth' => '1px',
                    'inputBorderRightStyle' => 'solid',
                    'inputBorderRightColor' => '#e8e8e8',
                    'buttonMaxWidth' => '100%',
                    'buttonFontSize' => '19px',
                    'buttonFontWeight' => '700',
                    'buttonLineHeight' => '1.5em',
                    'buttonBackgroundColorOverlay' => '#ffb700',
                    'buttonBoxShadowInset' => 'rgba(0, 0, 0, 0.15) 0px 1px 0px',
                    'buttonPaddingTop' => '22px',
                    'buttonPaddingBottom' => '22px',
                ),
            ),
        ),
        array(
            'title' => 'Preset 3',
            'thumb' => op3_asset('img/elements/form/styles/style-3.svg'),
            'options' => array(
                'all' => array(
                    'marginLeft' => 'auto',
                    'marginRight' => 'auto',
                    'spacing' => '10px',
                    'inputLabelDisplay' => 'none',
                    'inputIconDisplay' => 'block',
                    'inputInputPaddingTop' => '20px',
                    'inputInputPaddingBottom' => '20px',
                    'inputInputPaddingLeft' => '20px',
                    'inputInputPaddingRight' => '20px',
                    'inputBackgroundColorOverlay' => '#fff',
                    'inputBorderAllWidth' => '2px',
                    'inputBorderAllStyle' => 'solid',
                    'inputBorderAllColor' => '#ddd',
                    'inputBorderTopWidth' => '2px',
                    'inputBorderTopStyle' => 'solid',
                    'inputBorderTopColor' => '#ddd',
                    'inputBorderBottomWidth' => '2px',
                    'inputBorderBottomStyle' => 'solid',
                    'inputBorderBottomColor' => '#ddd',
                    'inputBorderLeftWidth' => '2px',
                    'inputBorderLeftStyle' => 'solid',
                    'inputBorderLeftColor' => '#ddd',
                    'inputBorderRightWidth' => '2px',
                    'inputBorderRightStyle' => 'solid',
                    'inputBorderRightColor' => '#ddd',
                    'buttonMaxWidth' => '100%',
                    'buttonFontSize' => '19px',
                    'buttonFontWeight' => '700',
                    'buttonLineHeight' => '1.5em',
                    'buttonBoxShadow' => 'rgba(0, 0, 0, 0.25) 0px 14px 28px -10px',
                    'buttonBackgroundColorOverlay' => '#23be81',
                    'buttonPaddingTop' => '22px',
                    'buttonPaddingBottom' => '22px',
                ),
            ),
        ),
        array(
            'title' => 'Preset 4',
            'thumb' => op3_asset('img/elements/form/styles/style-4.svg'),
            'options' => array(
                'all' => array(
                    'marginLeft' => 'auto',
                    'marginRight' => 'auto',
                    'spacing' => '10px',
                    'inputLabelDisplay' => 'none',
                    'inputIconDisplay' => 'none',
                    'inputInputPaddingTop' => '10px',
                    'inputInputPaddingBottom' => '10px',
                    'inputInputPaddingLeft' => '10px',
                    'inputInputPaddingRight' => '10px',
                    'inputBackgroundColorOverlay' => '#fff',
                    'inputBorderAllWidth' => '1px',
                    'inputBorderAllStyle' => 'solid',
                    'inputBorderAllColor' => '#d3d3d3',
                    'inputBorderTopWidth' => '1px',
                    'inputBorderTopStyle' => 'solid',
                    'inputBorderTopColor' => '#d3d3d3',
                    'inputBorderBottomWidth' => '1px',
                    'inputBorderBottomStyle' => 'solid',
                    'inputBorderBottomColor' => '#d3d3d3',
                    'inputBorderLeftWidth' => '1px',
                    'inputBorderLeftStyle' => 'solid',
                    'inputBorderLeftColor' => '#d3d3d3',
                    'inputBorderRightWidth' => '1px',
                    'inputBorderRightStyle' => 'solid',
                    'inputBorderRightColor' => '#d3d3d3',
                    'inputBoxShadow' => 'rgba(0, 0, 0, 0.05) 0px 0px 0px 3px',
                    'buttonMaxWidth' => '100%',
                    'buttonFontSize' => '24px',
                    'buttonColor' => '#9b691c',
                    'buttonBackgroundColorOverlay' => '#ffd559',
                ),
            ),
        ),
        array(
            'title' => 'Preset 5',
            'thumb' => op3_asset('img/elements/form/styles/style-5.svg'),
            'options' => array(
                'all' => array(
                    'marginLeft' => 'auto',
                    'marginRight' => 'auto',
                    'spacing' => '10px',
                    'inputLabelDisplay' => 'none',
                    'inputIconDisplay' => 'none',
                    'inputInputPaddingTop' => '20px',
                    'inputInputPaddingBottom' => '20px',
                    'inputInputPaddingLeft' => '20px',
                    'inputInputPaddingRight' => '20px',
                    'inputBorderAllWidth' => '1px',
                    'inputBorderAllStyle' => 'solid',
                    'inputBorderAllColor' => '#e8e8e8',
                    'inputBorderTopWidth' => '1px',
                    'inputBorderTopStyle' => 'solid',
                    'inputBorderTopColor' => '#e8e8e8',
                    'inputBorderBottomWidth' => '1px',
                    'inputBorderBottomStyle' => 'solid',
                    'inputBorderBottomColor' => '#e8e8e8',
                    'inputBorderLeftWidth' => '1px',
                    'inputBorderLeftStyle' => 'solid',
                    'inputBorderLeftColor' => '#e8e8e8',
                    'inputBorderRightWidth' => '1px',
                    'inputBorderRightStyle' => 'solid',
                    'inputBorderRightColor' => '#e8e8e8',
                    'inputBackgroundColorOverlay' => '#fff',
                    'inputBoxShadow' => 'rgba(0, 0, 0, 0.13) 0px 8px 14px -9px inset',
                    'buttonMaxWidth' => '100%',
                    'buttonFontSize' => '40px',
                    'buttonFontWeight' => 'normal',
                    'buttonLineHeight' => '1.8em',
                    'buttonTextTransform' => 'uppercase',
                    'buttonBackgroundColorOverlay' => '#0084ff',
                    'buttonBorderTopWidth' => '0px',
                    'buttonBorderRightWidth' => '0px',
                    'buttonBorderBottomWidth' => '0px',
                    'buttonBorderLeftWidth' => '0px',
                ),
            ),
        ),
        array(
            'title' => 'Preset 6',
            'thumb' => op3_asset('img/elements/form/styles/style-6.svg'),
            'options' => array(
                'all' => array(
                    'marginLeft' => 'auto',
                    'marginRight' => 'auto',
                    'spacing' => '10px',
                    'inputLabelDisplay' => 'none',
                    'inputIconDisplay' => 'none',
                    'inputInputPaddingTop' => '15px',
                    'inputInputPaddingBottom' => '15px',
                    'inputInputPaddingLeft' => '10px',
                    'inputInputPaddingRight' => '10px',
                    'inputWidth' => '394px',
                    'inputFieldFontSize' => '12px',
                    'inputFieldLineHeight' => '1.5em',
                    'inputFieldTextTransform' => 'uppercase',
                    'inputBackgroundColorOverlay' => '#fff',
                    'inputBorderAllWidth' => '1px',
                    'inputBorderAllStyle' => 'solid',
                    'inputBorderAllColor' => '#e8e8e8',
                    'inputBorderTopWidth' => '1px',
                    'inputBorderTopStyle' => 'solid',
                    'inputBorderTopColor' => '#e8e8e8',
                    'inputBorderBottomWidth' => '1px',
                    'inputBorderBottomStyle' => 'solid',
                    'inputBorderBottomColor' => '#e8e8e8',
                    'inputBorderLeftWidth' => '1px',
                    'inputBorderLeftStyle' => 'solid',
                    'inputBorderLeftColor' => '#e8e8e8',
                    'inputBorderRightWidth' => '1px',
                    'inputBorderRightStyle' => 'solid',
                    'inputBorderRightColor' => '#e8e8e8',
                    'buttonMaxWidth' => '240px',
                    'buttonFontSize' => '12px',
                    'buttonFontWeight' => '400',
                    'buttonTextTransform' => 'uppercase',
                    'buttonMarginTop' => '14px',
                    'buttonBoxShadow' => 'rgba(0, 0, 0, 0.1) 0px 11px 10px -6px',
                    'buttonBorderTopLeftRadius' => '100px',
                    'buttonBorderTopRightRadius' => '100px',
                    'buttonBorderBottomLeftRadius' => '100px',
                    'buttonBorderBottomRightRadius' => '100px',
                    'buttonBorderTopWidth' => '0px',
                    'buttonBorderRightWidth' => '0px',
                    'buttonBorderBottomWidth' => '0px',
                    'buttonBorderLeftWidth' => '0px',
                    'buttonBackgroundColorOverlay' => '#d49eff',
                ),
            ),
        ),
        array(
            'title' => 'Preset 7',
            'thumb' => op3_asset('img/elements/form/styles/style-7.svg'),
            'options' => array(
                'all' => array(
                    'marginLeft' => 'auto',
                    'marginRight' => 'auto',
                    'spacing' => '10px',
                    'optinFieldLayout' => 'inline',
                    'inputLabelDisplay' => 'none',
                    'inputIconDisplay' => 'none',
                    'inputInputPaddingTop' => '21px',
                    'inputInputPaddingBottom' => '21px',
                    'inputInputPaddingLeft' => '15px',
                    'inputInputPaddingRight' => '15px',
                    'inputWidth' => '100%',
                    'inputFieldFontSize' => '18px',
                    'inputFieldLineHeight' => '1.5em',
                    'inputBackgroundColorOverlay' => '#fff',
                    'inputBoxShadow' => 'rgba(0, 0, 0, 0.05) 0px 4px 11px 0px inset',
                    'inputBorderAllWidth' => '1px',
                    'inputBorderAllStyle' => 'solid',
                    'inputBorderAllColor' => '#e8e8e8',
                    'inputBorderTopWidth' => '1px',
                    'inputBorderTopStyle' => 'solid',
                    'inputBorderTopColor' => '#e8e8e8',
                    'inputBorderBottomWidth' => '1px',
                    'inputBorderBottomStyle' => 'solid',
                    'inputBorderBottomColor' => '#e8e8e8',
                    'inputBorderLeftWidth' => '1px',
                    'inputBorderLeftStyle' => 'solid',
                    'inputBorderLeftColor' => '#e8e8e8',
                    'inputBorderRightWidth' => '1px',
                    'inputBorderRightStyle' => 'solid',
                    'inputBorderRightColor' => '#e8e8e8',
                    'buttonMaxWidth' => '50%',
                    'buttonBorderTopWidth' => '0px',
                    'buttonBorderRightWidth' => '0px',
                    'buttonBorderBottomWidth' => '0px',
                    'buttonBorderLeftWidth' => '0px',
                    'buttonBackgroundColorOverlay' => '#0084ff',
                    'buttonTextTransform' => 'uppercase',
                ),
            ),
        ),
        array(
            'title' => 'Preset 8',
            'thumb' => op3_asset('img/elements/form/styles/style-8.svg'),
            'options' => array(
                'all' => array(
                    'marginLeft' => 'auto',
                    'marginRight' => 'auto',
                    'spacing' => '10px',
                    'optinFieldLayout' => 'inline',
                    'inputLabelDisplay' => 'none',
                    'inputIconDisplay' => 'none',
                    'inputInputPaddingTop' => '21px',
                    'inputInputPaddingBottom' => '21px',
                    'inputInputPaddingLeft' => '15px',
                    'inputInputPaddingRight' => '15px',
                    'inputWidth' => '100%',
                    'inputFieldFontSize' => '18px',
                    'inputFieldLineHeight' => '1.5em',
                    'inputBackgroundColorOverlay' => '#fff',
                    'inputBoxShadow' => 'rgba(0, 0, 0, 0.05) 0px 4px 11px 0px inset',
                    'inputBorderAllWidth' => '1px',
                    'inputBorderAllStyle' => 'solid',
                    'inputBorderAllColor' => '#e8e8e8',
                    'inputBorderTopWidth' => '1px',
                    'inputBorderTopStyle' => 'solid',
                    'inputBorderTopColor' => '#e8e8e8',
                    'inputBorderBottomWidth' => '1px',
                    'inputBorderBottomStyle' => 'solid',
                    'inputBorderBottomColor' => '#e8e8e8',
                    'inputBorderLeftWidth' => '1px',
                    'inputBorderLeftStyle' => 'solid',
                    'inputBorderLeftColor' => '#e8e8e8',
                    'inputBorderRightWidth' => '1px',
                    'inputBorderRightStyle' => 'solid',
                    'inputBorderRightColor' => '#e8e8e8',
                    'buttonMaxWidth' => '30%',
                    'buttonBorderTopWidth' => '0px',
                    'buttonBorderRightWidth' => '0px',
                    'buttonBorderBottomWidth' => '0px',
                    'buttonBorderLeftWidth' => '0px',
                    'buttonBackgroundColorOverlay' => '#ff6400',
                    'buttonTextTransform' => 'uppercase',
                ),
            ),
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
    'presetIncludeProperties' => array(
        'all' => array('optinFieldLayout'),
    ),

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
    'objectClass' => 'Form',
);
