<?php

return array(

    /**
     * Element type:
     * If starts with underscore this is considered
     * as template. With template only markup is needed,
     * the rest will be inherited from real element type
     * config.
     */
    'type' => 'button',

    /**
     * Element category ID:
     * Group elements on sidebar. If NULL this element
     * type won't be shown on sidebar.
     */
    'category' => 'general',

    /**
     * Element order:
     * Order elements on sidebar.
     */
    'order' => 800,

    /**
     * Element title:
     * Title displayed on sidebar.
     */
    'title' => 'Button',

    /**
     * Element thumb:
     * Thumb displayed on sidebar.
     */
    'thumb' => 'button-2',

    /**
     * Element wrapper:
     * Wrap element with this element type
     * (NULL for templates). This is usually element
     * name (string), but it can also be list of
     * element names (fontend uses first as default
     * wrapper element).
     */
    'parent' => array(
        'column',
        'form',
        'featureblockitem',
    ),

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
    'cssSelectorStrength' => 3,

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
    'childrenDirectionHorizontal' => null,

    /**
     * Can sync children:
     * Element can have this option which will allow
     * all children to sync on each child property
     * change
     * (NULL for templates and for elements with
     * no children)
     */
    'canSyncChildren' => null,

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
            'action' => 'link',
            'href' => null,
            'html' => 'Default Button Text',
            'html2' => 'Sub Text',
            'popOverlayTrigger' => 'none',
            'relNoFollowFull' => null,
            'target' => '_self',
            'selectFunnelStep' => null,
            'marginLeft' => 'auto',
            'marginRight' => 'auto',
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
            'thumb' => op3_asset('img/elements/button/styles/style-1.png'),
            'options' => array(
                'all' => array(
                    'color' => 'rgb(255, 255, 255)',
                    'maxWidth' => '375px',
                    'height' => '68px',
                    'backgroundImageOverlay' => 'none',
                    'backgroundColorOverlay' => 'rgb(0, 146, 255)',
                    'fontSize' => '17px',
                    'lineHeight' => '1em',
                    'fontWeight' => '700',
                    'textTransform' => 'none',
                    'subtextDisplay' => 'none',
                    'textTransformSubtext' => 'none',
                    'offsetXSubtext' => '5px',
                    'display' => 'none',
                    'borderTopWidth' => '1px',
                    'borderTopColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderBottomWidth' => '1px',
                    'borderBottomColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderLeftWidth' => '1px',
                    'borderLeftColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderRightWidth' => '1px',
                    'borderRightColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderTopLeftRadius' => '10px',
                    'borderTopRightRadius' => '10px',
                    'borderBottomLeftRadius' => '10px',
                    'borderBottomRightRadius' => '10px',
                    'boxShadowInset' => 'rgba(255, 255, 255, 0.22) 0px 1px 0px 0px inset',
                    'textShadow' => 'rgba(0, 0, 0, 0) 0px 0px 0px',
                    'filterHover' => 'brightness(1.05)',
                    'op3Icon' => 'op3-icon-small-right',
                )
            )
        ),
        array(
            'title' => 'Preset 2',
            'thumb' => op3_asset('img/elements/button/styles/style-2.png'),
            'options' => array(
                'all' => array(
                    'color' => 'rgb(255, 255, 255)',
                    'maxWidth' => '375px',
                    'height' => '68px',
                    'backgroundImageOverlay' => 'none',
                    'backgroundColorOverlay' => 'rgb(53, 106, 230)',
                    'fontSize' => '17px',
                    'lineHeight' => '1em',
                    'fontWeight' => '700',
                    'textTransform' => 'none',
                    'subtextDisplay' => 'none',
                    'textTransformSubtext' => 'none',
                    'offsetXSubtext' => '5px',
                    'display' => 'none',
                    'borderTopWidth' => '1px',
                    'borderTopColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderBottomWidth' => '1px',
                    'borderBottomColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderLeftWidth' => '1px',
                    'borderLeftColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderRightWidth' => '1px',
                    'borderRightColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderTopLeftRadius' => '10px',
                    'borderTopRightRadius' => '10px',
                    'borderBottomLeftRadius' => '10px',
                    'borderBottomRightRadius' => '10px',
                    'boxShadowInset' => 'rgba(255, 255, 255, 0.22) 0px 1px 0px 0px inset',
                    'textShadow' => 'rgba(0, 0, 0, 0) 0px 0px 0px',
                    'filterHover' => 'brightness(1.05)',
                    'op3Icon' => 'op3-icon-small-right',
                )
            )
        ),
        array(
            'title' => 'Preset 3',
            'thumb' => op3_asset('img/elements/button/styles/style-3.png'),
            'options' => array(
                'all' => array(
                    'color' => 'rgb(255, 255, 255)',
                    'maxWidth' => '375px',
                    'height' => '68px',
                    'backgroundImageOverlay' => 'none',
                    'backgroundColorOverlay' => 'rgb(0, 74, 245)',
                    'fontSize' => '17px',
                    'lineHeight' => '1em',
                    'fontWeight' => '700',
                    'textTransform' => 'none',
                    'subtextDisplay' => 'none',
                    'textTransformSubtext' => 'none',
                    'offsetXSubtext' => '5px',
                    'display' => 'none',
                    'borderTopWidth' => '1px',
                    'borderTopColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderBottomWidth' => '1px',
                    'borderBottomColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderLeftWidth' => '1px',
                    'borderLeftColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderRightWidth' => '1px',
                    'borderRightColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderTopLeftRadius' => '10px',
                    'borderTopRightRadius' => '10px',
                    'borderBottomLeftRadius' => '10px',
                    'borderBottomRightRadius' => '10px',
                    'boxShadowInset' => 'rgba(255, 255, 255, 0.22) 0px 1px 0px 0px inset',
                    'textShadow' => 'rgba(0, 0, 0, 0) 0px 0px 0px',
                    'filterHover' => 'brightness(1.05)',
                    'op3Icon' => 'op3-icon-small-right',
                )
            )
        ),
        array(
            'title' => 'Preset 4',
            'thumb' => op3_asset('img/elements/button/styles/style-4.png'),
            'options' => array(
                'all' => array(
                    'color' => 'rgb(255, 255, 255)',
                    'maxWidth' => '375px',
                    'height' => '68px',
                    'backgroundImageOverlay' => 'none',
                    'backgroundColorOverlay' => 'rgb(75, 96, 146)',
                    'fontSize' => '17px',
                    'lineHeight' => '1em',
                    'fontWeight' => '700',
                    'textTransform' => 'none',
                    'subtextDisplay' => 'none',
                    'textTransformSubtext' => 'none',
                    'offsetXSubtext' => '5px',
                    'display' => 'none',
                    'borderTopWidth' => '1px',
                    'borderTopColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderBottomWidth' => '1px',
                    'borderBottomColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderLeftWidth' => '1px',
                    'borderLeftColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderRightWidth' => '1px',
                    'borderRightColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderTopLeftRadius' => '10px',
                    'borderTopRightRadius' => '10px',
                    'borderBottomLeftRadius' => '10px',
                    'borderBottomRightRadius' => '10px',
                    'boxShadowInset' => 'rgba(255, 255, 255, 0.22) 0px 1px 0px 0px inset',
                    'textShadow' => 'rgba(0, 0, 0, 0) 0px 0px 0px',
                    'filterHover' => 'brightness(1.05)',
                    'op3Icon' => 'op3-icon-small-right',
                )
            )
        ),
        array(
            'title' => 'Preset 5',
            'thumb' => op3_asset('img/elements/button/styles/style-5.png'),
            'options' => array(
                'all' => array(
                    'color' => 'rgb(255, 255, 255)',
                    'maxWidth' => '375px',
                    'height' => '68px',
                    'backgroundImageOverlay' => 'none',
                    'backgroundColorOverlay' => 'rgb(45, 165, 98)',
                    'fontSize' => '17px',
                    'lineHeight' => '1em',
                    'fontWeight' => '700',
                    'textTransform' => 'none',
                    'subtextDisplay' => 'none',
                    'textTransformSubtext' => 'none',
                    'offsetXSubtext' => '5px',
                    'display' => 'none',
                    'borderTopWidth' => '1px',
                    'borderTopColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderBottomWidth' => '1px',
                    'borderBottomColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderLeftWidth' => '1px',
                    'borderLeftColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderRightWidth' => '1px',
                    'borderRightColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderTopLeftRadius' => '10px',
                    'borderTopRightRadius' => '10px',
                    'borderBottomLeftRadius' => '10px',
                    'borderBottomRightRadius' => '10px',
                    'boxShadowInset' => 'rgba(255, 255, 255, 0.22) 0px 1px 0px 0px inset',
                    'textShadow' => 'rgba(0, 0, 0, 0) 0px 0px 0px',
                    'filterHover' => 'brightness(1.05)',
                    'op3Icon' => 'op3-icon-small-right',
                )
            )
        ),
        array(
            'title' => 'Preset 6',
            'thumb' => op3_asset('img/elements/button/styles/style-6.png'),
            'options' => array(
                'all' => array(
                    'color' => 'rgb(255, 255, 255)',
                    'maxWidth' => '375px',
                    'height' => '68px',
                    'backgroundImageOverlay' => 'none',
                    'backgroundColorOverlay' => 'rgb(23, 180, 146)',
                    'fontSize' => '17px',
                    'lineHeight' => '1em',
                    'fontWeight' => '700',
                    'textTransform' => 'none',
                    'subtextDisplay' => 'none',
                    'textTransformSubtext' => 'none',
                    'offsetXSubtext' => '5px',
                    'display' => 'none',
                    'borderTopWidth' => '1px',
                    'borderTopColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderBottomWidth' => '1px',
                    'borderBottomColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderLeftWidth' => '1px',
                    'borderLeftColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderRightWidth' => '1px',
                    'borderRightColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderTopLeftRadius' => '5px',
                    'borderTopRightRadius' => '5px',
                    'borderBottomLeftRadius' => '5px',
                    'borderBottomRightRadius' => '5px',
                    'boxShadowInset' => 'rgba(255, 255, 255, 0.22) 0px 1px 1px 0px inset',
                    'textShadow' => 'rgba(0, 0, 0, 0) 0px 0px 0px',
                    'filterHover' => 'brightness(1.05)',
                    'op3Icon' => 'op3-icon-small-right',
                )
            )
        ),
        array(
            'title' => 'Preset 7',
            'thumb' => op3_asset('img/elements/button/styles/style-7.png'),
            'options' => array(
                'all' => array(
                    'color' => 'rgb(255, 255, 255)',
                    'maxWidth' => '373px',
                    'height' => '69px',
                    'backgroundImageOverlay' => 'none',
                    'backgroundColorOverlay' => 'rgb(0, 188, 125)',
                    'fontSize' => '17px',
                    'lineHeight' => '1em',
                    'fontWeight' => '700',
                    'textTransform' => 'none',
                    'subtextDisplay' => 'none',
                    'textTransformSubtext' => 'none',
                    'offsetXSubtext' => '5px',
                    'display' => 'none',
                    'borderTopWidth' => '1px',
                    'borderTopColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderBottomWidth' => '1px',
                    'borderBottomColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderLeftWidth' => '1px',
                    'borderLeftColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderRightWidth' => '1px',
                    'borderRightColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderTopLeftRadius' => '10px',
                    'borderTopRightRadius' => '10px',
                    'borderBottomLeftRadius' => '10px',
                    'borderBottomRightRadius' => '10px',
                    'boxShadow' => 'rgba(0, 0, 0, 0.11) 0px 13px 36px -1px',
                    'boxShadowInset' => 'rgba(255, 255, 255, 0.22) 0px 1px 1px 0px inset',
                    'textShadow' => 'rgba(0, 0, 0, 0) 0px 0px 0px',
                    'marginBottom' => '0px',
                    'filterHover' => 'brightness(1.05)',
                    'op3Icon' => 'op3-icon-small-right',
                )
            )
        ),
        array(
            'title' => 'Preset 8',
            'thumb' => op3_asset('img/elements/button/styles/style-8.png'),
            'options' => array(
                'all' => array(
                    'color' => 'rgb(255, 255, 255)',
                    'maxWidth' => '375px',
                    'height' => '68px',
                    'backgroundImageOverlay' => 'none',
                    'backgroundColorOverlay' => 'rgb(0, 190, 91)',
                    'fontSize' => '17px',
                    'lineHeight' => '1em',
                    'fontWeight' => '700',
                    'textTransform' => 'none',
                    'subtextDisplay' => 'none',
                    'textTransformSubtext' => 'none',
                    'offsetXSubtext' => '5px',
                    'display' => 'none',
                    'borderTopWidth' => '1px',
                    'borderTopColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderBottomWidth' => '1px',
                    'borderBottomColor' => 'rgba(0, 0, 0, 0.13)',
                    'borderLeftWidth' => '1px',
                    'borderLeftColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderRightWidth' => '1px',
                    'borderRightColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderTopLeftRadius' => '10px',
                    'borderTopRightRadius' => '10px',
                    'borderBottomLeftRadius' => '10px',
                    'borderBottomRightRadius' => '10px',
                    'boxShadowInset' => 'rgba(255, 255, 255, 0.22) 0px 1px 1px 0px inset',
                    'textShadow' => 'rgba(0, 0, 0, 0) 0px 0px 0px',
                    'marginBottom' => '0',
                    'filterHover' => 'brightness(1.05)',
                    'op3Icon' => 'op3-icon-small-right',
                )
            )
        ),
        array(
            'title' => 'Preset 9',
            'thumb' => op3_asset('img/elements/button/styles/style-9.png'),
            'options' => array(
                'all' => array(
                    'color' => 'rgb(255, 255, 255)',
                    'maxWidth' => '375px',
                    'height' => '68px',
                    'backgroundImageOverlay' => 'none',
                    'backgroundColorOverlay' => 'rgb(0, 212, 91)',
                    'fontSize' => '17px',
                    'lineHeight' => '1em',
                    'fontWeight' => '700',
                    'textTransform' => 'none',
                    'subtextDisplay' => 'none',
                    'textTransformSubtext' => 'none',
                    'offsetXSubtext' => '5px',
                    'display' => 'none',
                    'borderTopWidth' => '1px',
                    'borderTopColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderBottomWidth' => '1px',
                    'borderBottomColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderLeftWidth' => '1px',
                    'borderLeftColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderRightWidth' => '1px',
                    'borderRightColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderTopLeftRadius' => '10px',
                    'borderTopRightRadius' => '10px',
                    'borderBottomLeftRadius' => '10px',
                    'borderBottomRightRadius' => '10px',
                    'boxShadowInset' => 'rgba(255, 255, 255, 0.22) 0px 1px 1px 0px inset',
                    'textShadow' => 'rgba(0, 0, 0, 0) 0px 0px 0px',
                    'filterHover' => 'brightness(1.05)',
                    'op3Icon' => 'op3-icon-small-right',
                )
            )
        ),
        array(
            'title' => 'Preset 10',
            'thumb' => op3_asset('img/elements/button/styles/style-10.png'),
            'options' => array(
                'all' => array(
                    'color' => 'rgb(54, 54, 54)',
                    'maxWidth' => '375px',
                    'height' => '68px',
                    'backgroundImageOverlay' => 'none',
                    'backgroundColorOverlay' => 'rgb(254, 210, 0)',
                    'fontSize' => '17px',
                    'lineHeight' => '1em',
                    'fontWeight' => '700',
                    'textTransform' => 'none',
                    'subtextDisplay' => 'none',
                    'textTransformSubtext' => 'none',
                    'offsetXSubtext' => '5px',
                    'display' => 'none',
                    'borderTopWidth' => '1px',
                    'borderTopColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderBottomWidth' => '1px',
                    'borderBottomColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderLeftWidth' => '1px',
                    'borderLeftColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderRightWidth' => '1px',
                    'borderRightColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderTopLeftRadius' => '10px',
                    'borderTopRightRadius' => '10px',
                    'borderBottomLeftRadius' => '10px',
                    'borderBottomRightRadius' => '10px',
                    'boxShadowInset' => 'rgba(255, 255, 255, 0.22) 0px 1px 1px 0px inset',
                    'textShadow' => 'rgba(0, 0, 0, 0) 0px 0px 0px',
                    'filterHover' => 'brightness(1.05)',
                    'op3Icon' => 'op3-icon-small-right',
                )
            )
        ),
        array(
            'title' => 'Preset 11',
            'thumb' => op3_asset('img/elements/button/styles/style-11.png'),
            'options' => array(
                'all' => array(
                    'color' => 'rgb(255, 255, 255)',
                    'maxWidth' => '375px',
                    'height' => '68px',
                    'backgroundImageOverlay' => 'none',
                    'backgroundColorOverlay' => 'rgb(255, 183, 2)',
                    'fontSize' => '17px',
                    'lineHeight' => '1em',
                    'fontWeight' => '700',
                    'textTransform' => 'none',
                    'subtextDisplay' => 'none',
                    'textTransformSubtext' => 'none',
                    'offsetXSubtext' => '5px',
                    'display' => 'none',
                    'borderTopWidth' => '1px',
                    'borderTopColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderBottomWidth' => '1px',
                    'borderBottomColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderLeftWidth' => '1px',
                    'borderLeftColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderRightWidth' => '1px',
                    'borderRightColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderTopLeftRadius' => '10px',
                    'borderTopRightRadius' => '10px',
                    'borderBottomLeftRadius' => '10px',
                    'borderBottomRightRadius' => '10px',
                    'boxShadowInset' => 'rgba(255, 255, 255, 0.22) 0px 1px 1px 0px inset',
                    'textShadow' => 'rgba(0, 0, 0, 0) 0px 0px 0px',
                    'filterHover' => 'brightness(1.05)',
                    'op3Icon' => 'op3-icon-small-right',
                )
            )
        ),
        array(
            'title' => 'Preset 12',
            'thumb' => op3_asset('img/elements/button/styles/style-12.png'),
            'options' => array(
                'all' => array(
                    'color' => 'rgb(255, 255, 255)',
                    'maxWidth' => '375px',
                    'height' => '68px',
                    'backgroundImageOverlay' => 'none',
                    'backgroundColorOverlay' => 'rgb(255, 127, 3)',
                    'fontSize' => '17px',
                    'lineHeight' => '1em',
                    'fontWeight' => '700',
                    'textTransform' => 'none',
                    'subtextDisplay' => 'none',
                    'textTransformSubtext' => 'none',
                    'offsetXSubtext' => '5px',
                    'display' => 'none',
                    'borderTopWidth' => '1px',
                    'borderTopColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderBottomWidth' => '1px',
                    'borderBottomColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderLeftWidth' => '1px',
                    'borderLeftColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderRightWidth' => '1px',
                    'borderRightColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderTopLeftRadius' => '10px',
                    'borderTopRightRadius' => '10px',
                    'borderBottomLeftRadius' => '10px',
                    'borderBottomRightRadius' => '10px',
                    'boxShadowInset' => 'rgba(255, 255, 255, 0.22) 0px 1px 1px 0px inset',
                    'textShadow' => 'rgba(0, 0, 0, 0) 0px 0px 0px',
                    'filterHover' => 'brightness(1.05)',
                    'op3Icon' => 'op3-icon-small-right',
                )
            )
        ),
        array(
            'title' => 'Preset 13',
            'thumb' => op3_asset('img/elements/button/styles/style-13.png'),
            'options' => array(
                'all' => array(
                    'color' => 'rgb(255, 255, 255)',
                    'maxWidth' => '375px',
                    'height' => '68px',
                    'backgroundImageOverlay' => 'none',
                    'backgroundColorOverlay' => 'rgb(255, 126, 69)',
                    'fontSize' => '17px',
                    'lineHeight' => '1em',
                    'fontWeight' => '700',
                    'textTransform' => 'none',
                    'subtextDisplay' => 'none',
                    'textTransformSubtext' => 'none',
                    'offsetXSubtext' => '5px',
                    'display' => 'none',
                    'borderTopWidth' => '1px',
                    'borderTopColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderBottomWidth' => '1px',
                    'borderBottomColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderLeftWidth' => '1px',
                    'borderLeftColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderRightWidth' => '1px',
                    'borderRightColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderTopLeftRadius' => '10px',
                    'borderTopRightRadius' => '10px',
                    'borderBottomLeftRadius' => '10px',
                    'borderBottomRightRadius' => '10px',
                    'boxShadowInset' => 'rgba(255, 255, 255, 0.22) 0px 1px 1px 0px inset',
                    'textShadow' => 'rgba(0, 0, 0, 0) 0px 0px 0px',
                    'filterHover' => 'brightness(1.05)',
                    'op3Icon' => 'op3-icon-small-right',
                )
            )
        ),
        array(
            'title' => 'Preset 14',
            'thumb' => op3_asset('img/elements/button/styles/style-14.png'),
            'options' => array(
                'all' => array(
                    'color' => 'rgb(255, 255, 255)',
                    'maxWidth' => '375px',
                    'height' => '68px',
                    'backgroundImageOverlay' => 'none',
                    'backgroundColorOverlay' => 'rgb(242, 101, 34)',
                    'fontSize' => '17px',
                    'lineHeight' => '1em',
                    'fontWeight' => '700',
                    'textTransform' => 'none',
                    'subtextDisplay' => 'none',
                    'textTransformSubtext' => 'none',
                    'offsetXSubtext' => '5px',
                    'display' => 'none',
                    'borderTopWidth' => '1px',
                    'borderTopColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderBottomWidth' => '1px',
                    'borderBottomColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderLeftWidth' => '1px',
                    'borderLeftColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderRightWidth' => '1px',
                    'borderRightColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderTopLeftRadius' => '10px',
                    'borderTopRightRadius' => '10px',
                    'borderBottomLeftRadius' => '10px',
                    'borderBottomRightRadius' => '10px',
                    'boxShadowInset' => 'rgba(255, 255, 255, 0.22) 0px 1px 0px 0px inset',
                    'textShadow' => 'rgba(0, 0, 0, 0) 0px 0px 0px',
                    'filterHover' => 'brightness(1.05)',
                    'op3Icon' => 'op3-icon-small-right',
                )
            )
        ),
        array(
            'title' => 'Preset 15',
            'thumb' => op3_asset('img/elements/button/styles/style-15.png'),
            'options' => array(
                'all' => array(
                    'color' => 'rgb(255, 255, 255)',
                    'maxWidth' => '375px',
                    'height' => '68px',
                    'backgroundImageOverlay' => 'none',
                    'backgroundColorOverlay' => 'rgb(254, 73, 2)',
                    'fontSize' => '17px',
                    'lineHeight' => '1em',
                    'fontWeight' => '700',
                    'textTransform' => 'none',
                    'subtextDisplay' => 'none',
                    'textTransformSubtext' => 'none',
                    'offsetXSubtext' => '5px',
                    'display' => 'none',
                    'borderTopWidth' => '1px',
                    'borderTopColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderBottomWidth' => '1px',
                    'borderBottomColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderLeftWidth' => '1px',
                    'borderLeftColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderRightWidth' => '1px',
                    'borderRightColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderTopLeftRadius' => '10px',
                    'borderTopRightRadius' => '10px',
                    'borderBottomLeftRadius' => '10px',
                    'borderBottomRightRadius' => '10px',
                    'boxShadowInset' => 'rgba(255, 255, 255, 0.22) 0px 1px 1px 0px inset',
                    'textShadow' => 'rgba(0, 0, 0, 0) 0px 0px 0px',
                    'filterHover' => 'brightness(1.05)',
                    'op3Icon' => 'op3-icon-small-right',
                )
            )
        ),
        array(
            'title' => 'Preset 16',
            'thumb' => op3_asset('img/elements/button/styles/style-16.png'),
            'options' => array(
                'all' => array(
                    'color' => 'rgb(255, 255, 255)',
                    'maxWidth' => '375px',
                    'height' => '68px',
                    'backgroundImageOverlay' => 'none',
                    'backgroundColorOverlay' => 'rgba(254, 2, 88, 0.75)',
                    'fontSize' => '17px',
                    'lineHeight' => '1em',
                    'fontWeight' => '700',
                    'textTransform' => 'none',
                    'subtextDisplay' => 'none',
                    'textTransformSubtext' => 'none',
                    'offsetXSubtext' => '5px',
                    'display' => 'none',
                    'borderTopWidth' => '1px',
                    'borderTopColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderBottomWidth' => '1px',
                    'borderBottomColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderLeftWidth' => '1px',
                    'borderLeftColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderRightWidth' => '1px',
                    'borderRightColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderTopLeftRadius' => '10px',
                    'borderTopRightRadius' => '10px',
                    'borderBottomLeftRadius' => '10px',
                    'borderBottomRightRadius' => '10px',
                    'boxShadowInset' => 'rgba(255, 255, 255, 0.22) 0px 1px 1px 0px inset',
                    'textShadow' => 'rgba(0, 0, 0, 0) 0px 0px 0px',
                    'filterHover' => 'brightness(1.05)',
                    'op3Icon' => 'op3-icon-small-right',
                )
            )
        ),
        array(
            'title' => 'Preset 17',
            'thumb' => op3_asset('img/elements/button/styles/style-17.png'),
            'options' => array(
                'all' => array(
                    'color' => 'rgb(255, 255, 255)',
                    'maxWidth' => '375px',
                    'height' => '68px',
                    'backgroundImageOverlay' => 'none',
                    'backgroundColorOverlay' => 'rgb(244, 73, 197)',
                    'fontSize' => '17px',
                    'lineHeight' => '1em',
                    'fontWeight' => '700',
                    'textTransform' => 'none',
                    'subtextDisplay' => 'none',
                    'textTransformSubtext' => 'none',
                    'offsetXSubtext' => '5px',
                    'display' => 'none',
                    'borderTopWidth' => '1px',
                    'borderTopColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderBottomWidth' => '1px',
                    'borderBottomColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderLeftWidth' => '1px',
                    'borderLeftColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderRightWidth' => '1px',
                    'borderRightColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderTopLeftRadius' => '10px',
                    'borderTopRightRadius' => '10px',
                    'borderBottomLeftRadius' => '10px',
                    'borderBottomRightRadius' => '10px',
                    'boxShadowInset' => 'rgba(255, 255, 255, 0.22) 0px 1px 1px 0px inset',
                    'textShadow' => 'rgba(0, 0, 0, 0) 0px 0px 0px',
                    'filterHover' => 'brightness(1.05)',
                    'op3Icon' => 'op3-icon-small-right',
                )
            )
        ),
        array(
            'title' => 'Preset 18',
            'thumb' => op3_asset('img/elements/button/styles/style-18.png'),
            'options' => array(
                'all' => array(
                    'color' => 'rgb(255, 255, 255)',
                    'maxWidth' => '375px',
                    'height' => '68px',
                    'backgroundImageOverlay' => 'none',
                    'backgroundColorOverlay' => 'rgb(227, 169, 218)',
                    'fontSize' => '17px',
                    'lineHeight' => '1em',
                    'fontWeight' => '700',
                    'textTransform' => 'none',
                    'subtextDisplay' => 'none',
                    'textTransformSubtext' => 'none',
                    'offsetXSubtext' => '5px',
                    'display' => 'none',
                    'borderTopWidth' => '1px',
                    'borderTopColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderBottomWidth' => '1px',
                    'borderBottomColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderLeftWidth' => '1px',
                    'borderLeftColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderRightWidth' => '1px',
                    'borderRightColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderTopLeftRadius' => '10px',
                    'borderTopRightRadius' => '10px',
                    'borderBottomLeftRadius' => '10px',
                    'borderBottomRightRadius' => '10px',
                    'boxShadowInset' => 'rgba(255, 255, 255, 0.22) 0px 1px 1px 0px inset',
                    'textShadow' => 'rgba(0, 0, 0, 0) 0px 0px 0px',
                    'filterHover' => 'brightness(1.05)',
                    'op3Icon' => 'op3-icon-small-right',
                )
            )
        ),
        array(
            'title' => 'Preset 19',
            'thumb' => op3_asset('img/elements/button/styles/style-19.png'),
            'options' => array(
                'all' => array(
                    'color' => 'rgb(255, 255, 255)',
                    'maxWidth' => '375px',
                    'height' => '68px',
                    'backgroundImageOverlay' => 'none',
                    'backgroundColorOverlay' => 'rgb(31, 31, 31)',
                    'fontSize' => '17px',
                    'lineHeight' => '1em',
                    'fontWeight' => '700',
                    'textTransform' => 'none',
                    'subtextDisplay' => 'none',
                    'textTransformSubtext' => 'none',
                    'offsetXSubtext' => '5px',
                    'display' => 'none',
                    'borderTopWidth' => '0px',
                    'borderTopColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderBottomWidth' => '0px',
                    'borderBottomColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderLeftWidth' => '0px',
                    'borderLeftColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderRightWidth' => '0px',
                    'borderRightColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderTopLeftRadius' => '10px',
                    'borderTopRightRadius' => '10px',
                    'borderBottomLeftRadius' => '10px',
                    'borderBottomRightRadius' => '10px',
                    'boxShadowInset' => 'rgba(255, 255, 255, 0.22) 0px 1px 1px 0px inset',
                    'textShadow' => 'rgba(0, 0, 0, 0) 0px 0px 0px',
                    'filterHover' => 'brightness(1.05)',
                    'op3Icon' => 'op3-icon-small-right',
                )
            )
        ),
        array(
            'title' => 'Preset 20',
            'thumb' => op3_asset('img/elements/button/styles/style-20.png'),
            'options' => array(
                'all' => array(
                    'color' => 'rgb(255, 255, 255)',
                    'maxWidth' => '375px',
                    'height' => '68px',
                    'backgroundImageOverlay' => 'none',
                    'backgroundColorOverlay' => 'rgb(153, 153, 153)',
                    'fontSize' => '17px',
                    'lineHeight' => '1em',
                    'fontWeight' => '700',
                    'textTransform' => 'none',
                    'subtextDisplay' => 'none',
                    'textTransformSubtext' => 'none',
                    'offsetXSubtext' => '5px',
                    'display' => 'none',
                    'borderTopWidth' => '0px',
                    'borderTopColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderBottomWidth' => '0px',
                    'borderBottomColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderLeftWidth' => '0px',
                    'borderLeftColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderRightWidth' => '0px',
                    'borderRightColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderTopLeftRadius' => '10px',
                    'borderTopRightRadius' => '10px',
                    'borderBottomLeftRadius' => '10px',
                    'borderBottomRightRadius' => '10px',
                    'boxShadowInset' => 'rgba(255, 255, 255, 0.22) 0px 1px 1px 0px inset',
                    'textShadow' => 'rgba(0, 0, 0, 0) 0px 0px 0px',
                    'filterHover' => 'brightness(1.05)',
                    'op3Icon' => 'op3-icon-small-right',
                )
            )
        ),
        array(
            'title' => 'Preset 21',
            'thumb' => op3_asset('img/elements/button/styles/style-21.png'),
            'options' => array(
                'all' => array(
                    'color' => 'rgb(104, 104, 104)',
                    'maxWidth' => '375px',
                    'height' => '68px',
                    'backgroundImageOverlay' => 'none',
                    'backgroundColorOverlay' => 'rgb(255, 255, 255)',
                    'fontSize' => '17px',
                    'lineHeight' => '1em',
                    'fontWeight' => '500',
                    'textTransform' => 'none',
                    'subtextDisplay' => 'none',
                    'textTransformSubtext' => 'none',
                    'offsetXSubtext' => '5px',
                    'display' => 'none',
                    'borderTopWidth' => '1px',
                    'borderTopColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderBottomWidth' => '1px',
                    'borderBottomColor' => 'rgba(0, 0, 0, 0.13)',
                    'borderLeftWidth' => '1px',
                    'borderLeftColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderRightWidth' => '1px',
                    'borderRightColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderTopLeftRadius' => '10px',
                    'borderTopRightRadius' => '10px',
                    'borderBottomLeftRadius' => '10px',
                    'borderBottomRightRadius' => '10px',
                    'boxShadowInset' => 'rgba(255, 255, 255, 0.22) 0px 1px 1px 0px inset',
                    'textShadow' => 'rgba(0, 0, 0, 0) 0px 0px 0px',
                    'marginBottom' => '6px',
                    'filterHover' => 'brightness(1.05)',
                    'op3Icon' => 'op3-icon-small-right',
                )
            )
        ),
        array(
            'title' => 'Preset 22',
            'thumb' => op3_asset('img/elements/button/styles/style-22.png'),
            'options' => array(
                'all' => array(
                    'color' => 'rgb(255, 255, 255)',
                    'maxWidth' => '375px',
                    'height' => '68px',
                    'backgroundImageOverlay' => 'linear-gradient(90deg, rgb(254, 83, 83) 0%, rgb(253, 123, 71) 60%)',
                    'backgroundColorOverlay' => 'rgba(0, 0, 0, 0)',
                    'fontSize' => '17px',
                    'lineHeight' => '1em',
                    'fontWeight' => '700',
                    'textTransform' => 'none',
                    'subtextDisplay' => 'none',
                    'textTransformSubtext' => 'none',
                    'offsetXSubtext' => '5px',
                    'display' => 'none',
                    'borderTopWidth' => '0px',
                    'borderTopColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderBottomWidth' => '0px',
                    'borderBottomColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderLeftWidth' => '0px',
                    'borderLeftColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderRightWidth' => '0px',
                    'borderRightColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderTopLeftRadius' => '100px',
                    'borderTopRightRadius' => '100px',
                    'borderBottomLeftRadius' => '100px',
                    'borderBottomRightRadius' => '100px',
                    'boxShadowInset' => 'rgba(255, 255, 255, 0.22) 0px 1px 1px 0px inset',
                    'textShadow' => 'rgba(0, 0, 0, 0) 0px 0px 0px',
                    'paddingLeft' => '22px',
                    'paddingRight' => '22px',
                    'filterHover' => 'brightness(1.05)',
                    'op3Icon' => 'op3-icon-small-right',
                )
            )
        ),
        array(
            'title' => 'Preset 23',
            'thumb' => op3_asset('img/elements/button/styles/style-23.png'),
            'options' => array(
                'all' => array(
                    'color' => 'rgb(255, 255, 255)',
                    'maxWidth' => '375px',
                    'height' => '68px',
                    'backgroundImageOverlay' => 'linear-gradient(0deg, rgb(254, 83, 83) 0%, rgb(253, 123, 71) 60%)',
                    'backgroundColorOverlay' => 'rgba(0, 0, 0, 0)',
                    'fontSize' => '17px',
                    'lineHeight' => '1em',
                    'fontWeight' => '700',
                    'textTransform' => 'none',
                    'subtextDisplay' => 'none',
                    'textTransformSubtext' => 'none',
                    'offsetXSubtext' => '5px',
                    'display' => 'none',
                    'borderTopWidth' => '1px',
                    'borderTopColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderBottomWidth' => '1px',
                    'borderBottomColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderLeftWidth' => '1px',
                    'borderLeftColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderRightWidth' => '1px',
                    'borderRightColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderTopLeftRadius' => '100px',
                    'borderTopRightRadius' => '100px',
                    'borderBottomLeftRadius' => '100px',
                    'borderBottomRightRadius' => '100px',
                    'boxShadowInset' => 'rgba(255, 255, 255, 0.22) 0px 1px 1px 0px inset',
                    'textShadow' => 'rgba(0, 0, 0, 0) 0px 0px 0px',
                    'paddingLeft' => '22px',
                    'paddingRight' => '22px',
                    'filterHover' => 'brightness(1.05)',
                    'op3Icon' => 'op3-icon-small-right',
                )
            )
        ),
        array(
            'title' => 'Preset 24',
            'thumb' => op3_asset('img/elements/button/styles/style-24.png'),
            'options' => array(
                'all' => array(
                    'color' => 'rgb(255, 255, 255)',
                    'maxWidth' => '375px',
                    'height' => '68px',
                    'backgroundImageOverlay' => 'linear-gradient(90deg, rgb(255, 176, 0) 0%, rgb(255, 121, 0) 100%)',
                    'backgroundColorOverlay' => 'rgba(0, 0, 0, 0)',
                    'fontSize' => '17px',
                    'lineHeight' => '1em',
                    'fontWeight' => '700',
                    'textTransform' => 'none',
                    'subtextDisplay' => 'none',
                    'textTransformSubtext' => 'none',
                    'offsetXSubtext' => '5px',
                    'display' => 'none',
                    'borderTopWidth' => '0px',
                    'borderTopColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderBottomWidth' => '0px',
                    'borderBottomColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderLeftWidth' => '0px',
                    'borderLeftColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderRightWidth' => '0px',
                    'borderRightColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderTopLeftRadius' => '100px',
                    'borderTopRightRadius' => '100px',
                    'borderBottomLeftRadius' => '100px',
                    'borderBottomRightRadius' => '100px',
                    'boxShadow' => 'rgba(0, 0, 0, 0) 0px 0px 0px 0px',
                    'boxShadowInset' => 'rgba(255, 255, 255, 0.22) 0px 1px 1px 0px inset',
                    'textShadow' => 'rgba(0, 0, 0, 0) 0px 0px 0px',
                    'paddingLeft' => '22px',
                    'paddingRight' => '22px',
                    'filterHover' => 'brightness(1.05)',
                    'op3Icon' => 'op3-icon-small-right',
                )
            )
        ),
        array(
            'title' => 'Preset 25',
            'thumb' => op3_asset('img/elements/button/styles/style-25.png'),
            'options' => array(
                'all' => array(
                    'color' => 'rgb(255, 255, 255)',
                    'maxWidth' => '375px',
                    'height' => '68px',
                    'backgroundImageOverlay' => 'linear-gradient(rgb(255, 176, 0) 0%, rgb(255, 121, 0) 100%)',
                    'backgroundColorOverlay' => 'rgba(0, 0, 0, 0)',
                    'fontSize' => '17px',
                    'lineHeight' => '1em',
                    'fontWeight' => '700',
                    'textTransform' => 'none',
                    'subtextDisplay' => 'none',
                    'textTransformSubtext' => 'none',
                    'offsetXSubtext' => '5px',
                    'display' => 'none',
                    'borderTopWidth' => '1px',
                    'borderTopColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderBottomWidth' => '1px',
                    'borderBottomColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderLeftWidth' => '1px',
                    'borderLeftColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderRightWidth' => '1px',
                    'borderRightColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderTopLeftRadius' => '100px',
                    'borderTopRightRadius' => '100px',
                    'borderBottomLeftRadius' => '100px',
                    'borderBottomRightRadius' => '100px',
                    'boxShadow' => 'rgba(0, 0, 0, 0) 0px 0px 0px 0px',
                    'boxShadowInset' => 'rgba(255, 255, 255, 0.22) 0px 1px 1px 0px inset',
                    'textShadow' => 'rgba(0, 0, 0, 0) 0px 0px 0px',
                    'paddingLeft' => '22px',
                    'paddingRight' => '22px',
                    'filterHover' => 'brightness(1.05)',
                    'op3Icon' => 'op3-icon-small-right',
                )
            )
        ),
        array(
            'title' => 'Preset 26',
            'thumb' => op3_asset('img/elements/button/styles/style-26.png'),
            'options' => array(
                'all' => array(
                    'color' => 'rgb(255, 255, 255)',
                    'maxWidth' => '375px',
                    'height' => '68px',
                    'backgroundImageOverlay' => 'linear-gradient(rgb(22, 170, 28) 0%, rgb(0, 122, 22) 100%)',
                    'backgroundColorOverlay' => 'rgba(0, 0, 0, 0)',
                    'fontSize' => '17px',
                    'lineHeight' => '1em',
                    'fontWeight' => '700',
                    'textTransform' => 'none',
                    'subtextDisplay' => 'none',
                    'textTransformSubtext' => 'none',
                    'offsetXSubtext' => '5px',
                    'display' => 'none',
                    'borderTopWidth' => '1px',
                    'borderTopColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderBottomWidth' => '1px',
                    'borderBottomColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderLeftWidth' => '1px',
                    'borderLeftColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderRightWidth' => '1px',
                    'borderRightColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderTopLeftRadius' => '100px',
                    'borderTopRightRadius' => '100px',
                    'borderBottomLeftRadius' => '100px',
                    'borderBottomRightRadius' => '100px',
                    'boxShadowInset' => 'rgba(255, 255, 255, 0.22) 0px 1px 1px 0px inset',
                    'textShadow' => 'rgba(0, 0, 0, 0) 0px 0px 0px',
                    'filterHover' => 'brightness(1.05)',
                    'op3Icon' => 'op3-icon-small-right',
                )
            )
        ),
        array(
            'title' => 'Preset 27',
            'thumb' => op3_asset('img/elements/button/styles/style-27.png'),
            'options' => array(
                'all' => array(
                    'color' => 'rgb(255, 255, 255)',
                    'maxWidth' => '375px',
                    'height' => '68px',
                    'backgroundImageOverlay' => 'linear-gradient(rgb(254, 210, 0) 0%, rgb(255, 174, 0) 100%)',
                    'backgroundColorOverlay' => 'rgba(0, 0, 0, 0)',
                    'fontSize' => '17px',
                    'lineHeight' => '1em',
                    'fontWeight' => '700',
                    'textTransform' => 'none',
                    'subtextDisplay' => 'none',
                    'textTransformSubtext' => 'none',
                    'offsetXSubtext' => '5px',
                    'display' => 'none',
                    'borderTopWidth' => '1px',
                    'borderTopColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderBottomWidth' => '1px',
                    'borderBottomColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderLeftWidth' => '1px',
                    'borderLeftColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderRightWidth' => '1px',
                    'borderRightColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderTopLeftRadius' => '100px',
                    'borderTopRightRadius' => '100px',
                    'borderBottomLeftRadius' => '100px',
                    'borderBottomRightRadius' => '100px',
                    'boxShadowInset' => 'rgba(255, 255, 255, 0.22) 0px 1px 1px 0px inset',
                    'textShadow' => 'rgba(0, 0, 0, 0.13) 0px 1px 0px',
                    'filterHover' => 'brightness(1.05)',
                    'op3Icon' => 'op3-icon-small-right',
                )
            )
        ),
        array(
            'title' => 'Preset 28',
            'thumb' => op3_asset('img/elements/button/styles/style-28.png'),
            'options' => array(
                'all' => array(
                    'color' => 'rgb(255, 255, 255)',
                    'maxWidth' => '375px',
                    'height' => '68px',
                    'backgroundImageOverlay' => 'linear-gradient(rgb(251, 25, 144) 0%, rgb(212, 0, 111) 100%)',
                    'backgroundColorOverlay' => 'rgba(0, 0, 0, 0)',
                    'fontSize' => '17px',
                    'lineHeight' => '1em',
                    'fontWeight' => '700',
                    'textTransform' => 'none',
                    'subtextDisplay' => 'none',
                    'textTransformSubtext' => 'none',
                    'offsetXSubtext' => '5px',
                    'display' => 'none',
                    'borderTopWidth' => '1px',
                    'borderTopColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderBottomWidth' => '1px',
                    'borderBottomColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderLeftWidth' => '1px',
                    'borderLeftColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderRightWidth' => '1px',
                    'borderRightColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderTopLeftRadius' => '100px',
                    'borderTopRightRadius' => '100px',
                    'borderBottomLeftRadius' => '100px',
                    'borderBottomRightRadius' => '100px',
                    'boxShadowInset' => 'rgba(255, 255, 255, 0.22) 0px 1px 1px 0px inset',
                    'textShadow' => 'rgba(0, 0, 0, 0) 0px 0px 0px',
                    'filterHover' => 'brightness(1.05)',
                    'op3Icon' => 'op3-icon-small-right',
                )
            )
        ),
        array(
            'title' => 'Preset 29',
            'thumb' => op3_asset('img/elements/button/styles/style-29.png'),
            'options' => array(
                'all' => array(
                    'color' => 'rgb(255, 255, 255)',
                    'maxWidth' => '375px',
                    'height' => '68px',
                    'backgroundImageOverlay' => 'linear-gradient(rgb(44, 92, 255) 0%, rgb(0, 13, 255) 100%)',
                    'backgroundColorOverlay' => 'rgba(0, 0, 0, 0)',
                    'fontSize' => '17px',
                    'lineHeight' => '1em',
                    'fontWeight' => '700',
                    'textTransform' => 'none',
                    'subtextDisplay' => 'none',
                    'textTransformSubtext' => 'none',
                    'offsetXSubtext' => '5px',
                    'display' => 'none',
                    'borderTopWidth' => '1px',
                    'borderTopColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderBottomWidth' => '1px',
                    'borderBottomColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderLeftWidth' => '1px',
                    'borderLeftColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderRightWidth' => '1px',
                    'borderRightColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderTopLeftRadius' => '100px',
                    'borderTopRightRadius' => '100px',
                    'borderBottomLeftRadius' => '100px',
                    'borderBottomRightRadius' => '100px',
                    'boxShadowInset' => 'rgba(255, 255, 255, 0.22) 0px 1px 1px 0px inset',
                    'textShadow' => 'rgba(0, 0, 0, 0) 0px 0px 0px',
                    'filterHover' => 'brightness(1.05)',
                    'op3Icon' => 'op3-icon-small-right',
                )
            )
        ),
        array(
            'title' => 'Preset 30',
            'thumb' => op3_asset('img/elements/button/styles/style-30.png'),
            'options' => array(
                'all' => array(
                    'color' => 'rgb(255, 255, 255)',
                    'maxWidth' => '433px',
                    'height' => '72px',
                    'backgroundImageOverlay' => 'linear-gradient(89deg, rgb(73, 216, 170) 0%, rgb(62, 206, 180) 100%)',
                    'backgroundColorOverlay' => 'rgba(0, 0, 0, 0)',
                    'fontFamily' => 'Montserrat, sans-serif',
                    'fontSize' => '17px',
                    'lineHeight' => '1em',
                    'letterSpacing' => '4px',
                    'fontWeight' => '400',
                    'textTransform' => 'uppercase',
                    'subtextDisplay' => 'none',
                    'textTransformSubtext' => 'none',
                    'offsetXSubtext' => '5px',
                    'display' => 'none',
                    'borderTopWidth' => '0px',
                    'borderTopColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderBottomWidth' => '0px',
                    'borderBottomColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderLeftWidth' => '0px',
                    'borderLeftColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderRightWidth' => '0px',
                    'borderRightColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderTopLeftRadius' => '100px',
                    'borderTopRightRadius' => '100px',
                    'borderBottomLeftRadius' => '100px',
                    'borderBottomRightRadius' => '100px',
                    'boxShadowInset' => 'rgba(255, 255, 255, 0.22) 0px 1px 1px 0px inset',
                    'textShadow' => 'rgba(0, 0, 0, 0) 0px 0px 0px',
                    'filterHover' => 'brightness(1.05)',
                    'op3Icon' => 'op3-icon-small-right',
                )
            )
        ),
        array(
            'title' => 'Preset 31',
            'thumb' => op3_asset('img/elements/button/styles/style-31.png'),
            'options' => array(
                'all' => array(
                    'color' => 'rgb(255, 255, 255)',
                    'maxWidth' => '433px',
                    'height' => '82px',
                    'backgroundImageOverlay' => 'none',
                    'backgroundColorOverlay' => 'rgb(255, 126, 69)',
                    'fontSize' => '17px',
                    'lineHeight' => '1em',
                    'letterSpacing' => '5px',
                    'fontWeight' => '500',
                    'textTransform' => 'uppercase',
                    'subtextDisplay' => 'none',
                    'textTransformSubtext' => 'none',
                    'offsetXSubtext' => '5px',
                    'offsetYSubtext' => '6px',
                    'display' => 'none',
                    'borderTopWidth' => '1px',
                    'borderTopColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderBottomWidth' => '1px',
                    'borderBottomColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderLeftWidth' => '1px',
                    'borderLeftColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderRightWidth' => '1px',
                    'borderRightColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderTopLeftRadius' => '100px',
                    'borderTopRightRadius' => '100px',
                    'borderBottomLeftRadius' => '100px',
                    'borderBottomRightRadius' => '100px',
                    'boxShadowInset' => 'rgba(255, 255, 255, 0.3) 0px 2px 1px 0px inset',
                    'textShadow' => 'rgba(0, 0, 0, 0) 0px 0px 0px',
                    'filterHover' => 'brightness(1.05)',
                    'op3Icon' => 'op3-icon-small-right',
                ),
                'screen and (max-width=> 767px)' => array(
                    'height' => '86px',
                    'fontSize' => '18px',
                    'subtextDisplay' => 'none',
                    'display' => 'none',
                )
            )
        ),
        array(
            'title' => 'Preset 32',
            'thumb' => op3_asset('img/elements/button/styles/style-32.png'),
            'options' => array(
                'all' => array(
                    'color' => 'rgb(255, 255, 255)',
                    'maxWidth' => '375px',
                    'height' => '68px',
                    'backgroundImageOverlay' => 'linear-gradient(rgb(22, 170, 28) 0%, rgb(0, 122, 22) 100%)',
                    'backgroundColorOverlay' => 'rgba(0, 0, 0, 0)',
                    'fontSize' => '17px',
                    'lineHeight' => '1em',
                    'fontWeight' => '700',
                    'textTransform' => 'none',
                    'subtextDisplay' => 'none',
                    'textTransformSubtext' => 'none',
                    'offsetXSubtext' => '5px',
                    'display' => 'none',
                    'borderTopWidth' => '1px',
                    'borderTopColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderBottomWidth' => '4px',
                    'borderBottomColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderLeftWidth' => '1px',
                    'borderLeftColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderRightWidth' => '1px',
                    'borderRightColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderTopLeftRadius' => '0px',
                    'borderTopRightRadius' => '0px',
                    'borderBottomLeftRadius' => '0px',
                    'borderBottomRightRadius' => '0px',
                    'boxShadowInset' => 'rgba(255, 255, 255, 0.22) 0px 1px 1px 0px inset',
                    'textShadow' => 'rgba(0, 0, 0, 0) 0px 0px 0px',
                    'filterHover' => 'brightness(1.05)',
                    'op3Icon' => 'op3-icon-small-right',
                )
            )
        ),
        array(
            'title' => 'Preset 33',
            'thumb' => op3_asset('img/elements/button/styles/style-33.png'),
            'options' => array(
                'all' => array(
                    'color' => 'rgba(77, 38, 0, 0.84)',
                    'maxWidth' => '375px',
                    'height' => '77px',
                    'backgroundImageOverlay' => 'none',
                    'backgroundColorOverlay' => 'rgb(255, 175, 81)',
                    'fontSize' => '17px',
                    'lineHeight' => '1em',
                    'fontWeight' => '700',
                    'textTransform' => 'none',
                    'subtextDisplay' => 'none',
                    'textTransformSubtext' => 'none',
                    'offsetXSubtext' => '5px',
                    'display' => 'none',
                    'borderTopWidth' => '1px',
                    'borderTopColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderBottomWidth' => '4px',
                    'borderBottomColor' => 'rgba(0, 0, 0, 0.13)',
                    'borderLeftWidth' => '1px',
                    'borderLeftColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderRightWidth' => '1px',
                    'borderRightColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderTopLeftRadius' => '10px',
                    'borderTopRightRadius' => '10px',
                    'borderBottomLeftRadius' => '10px',
                    'borderBottomRightRadius' => '10px',
                    'boxShadowInset' => 'rgba(255, 255, 255, 0.22) 0px 1px 1px 0px inset',
                    'textShadow' => 'rgba(255, 255, 255, 0.32) 0px 1px 0px',
                    'marginBottom' => '21px',
                    'filterHover' => 'brightness(1.05)',
                    'op3Icon' => 'op3-icon-small-right',
                )
            )
        ),
        array(
            'title' => 'Preset 34',
            'thumb' => op3_asset('img/elements/button/styles/style-34.png'),
            'options' => array(
                'all' => array(
                    'color' => 'rgb(0, 188, 125)',
                    'maxWidth' => '379px',
                    'height' => '68px',
                    'backgroundImageOverlay' => 'none',
                    'backgroundColorOverlay' => 'transparent',
                    'fontSize' => '17px',
                    'lineHeight' => '1em',
                    'fontWeight' => '500',
                    'textTransform' => 'none',
                    'subtextDisplay' => 'none',
                    'textTransformSubtext' => 'none',
                    'offsetXSubtext' => '5px',
                    'display' => 'none',
                    'borderTopWidth' => '2px',
                    'borderTopColor' => 'rgb(0, 188, 125)',
                    'borderBottomWidth' => '2px',
                    'borderBottomColor' => 'rgb(0, 188, 125)',
                    'borderLeftWidth' => '2px',
                    'borderLeftColor' => 'rgb(0, 188, 125)',
                    'borderRightWidth' => '2px',
                    'borderRightColor' => 'rgb(0, 188, 125)',
                    'borderTopLeftRadius' => '100px',
                    'borderTopRightRadius' => '100px',
                    'borderBottomLeftRadius' => '100px',
                    'borderBottomRightRadius' => '100px',
                    'boxShadow' => 'rgba(0, 0, 0, 0.11) 0px 13px 36px -1px',
                    'boxShadowInset' => 'rgba(255, 255, 255, 0.22) 0px 1px 1px 0px inset',
                    'textShadow' => 'rgba(0, 0, 0, 0) 0px 0px 0px',
                    'marginBottom' => '21px',
                    'filterHover' => 'brightness(1.05)',
                    'op3Icon' => 'op3-icon-small-right',
                )
            )
        ),
        array(
            'title' => 'Preset 35',
            'thumb' => op3_asset('img/elements/button/styles/style-35.png'),
            'options' => array(
                'all' => array(
                    'color' => 'rgb(255, 255, 255)',
                    'maxWidth' => '400px',
                    'height' => '70px',
                    'backgroundImageOverlay' => 'none',
                    'backgroundColorOverlay' => 'rgb(255, 126, 69)',
                    'fontSize' => '15px',
                    'lineHeight' => '1em',
                    'letterSpacing' => '1.5px',
                    'fontWeight' => '500',
                    'textTransform' => 'uppercase',
                    'subtextDisplay' => 'none',
                    'textTransformSubtext' => 'none',
                    'offsetXSubtext' => '5px',
                    'offsetYSubtext' => '6px',
                    'display' => 'none',
                    'borderTopWidth' => '0px',
                    'borderTopColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderBottomWidth' => '0px',
                    'borderBottomColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderLeftWidth' => '0px',
                    'borderLeftColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderRightWidth' => '0px',
                    'borderRightColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderTopLeftRadius' => '100px',
                    'borderTopRightRadius' => '100px',
                    'borderBottomLeftRadius' => '100px',
                    'borderBottomRightRadius' => '100px',
                    'boxShadowInset' => 'rgba(255, 255, 255, 0.3) 0px 0px 1px -54px inset',
                    'textShadow' => 'rgba(0, 0, 0, 0) 0px 0px 0px',
                    'filterHover' => 'brightness(1.05)',
                    'op3Icon' => 'op3-icon-small-right',
                )
            )
        ),
        array(
            'title' => 'Preset 36',
            'thumb' => op3_asset('img/elements/button/styles/style-36.png'),
            'options' => array(
                'all' => array(
                    'color' => 'rgb(255, 127, 3)',
                    'maxWidth' => '400px',
                    'height' => '68px',
                    'backgroundImageOverlay' => 'none',
                    'backgroundColorOverlay' => 'rgb(255, 255, 255)',
                    'fontSize' => '17px',
                    'lineHeight' => '1em',
                    'fontWeight' => '700',
                    'textTransform' => 'none',
                    'subtextDisplay' => 'none',
                    'textTransformSubtext' => 'none',
                    'offsetXSubtext' => '5px',
                    'display' => 'none',
                    'borderTopWidth' => '0px',
                    'borderTopColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderBottomWidth' => '0px',
                    'borderBottomColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderLeftWidth' => '0px',
                    'borderLeftColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderRightWidth' => '0px',
                    'borderRightColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderTopLeftRadius' => '100px',
                    'borderTopRightRadius' => '100px',
                    'borderBottomLeftRadius' => '100px',
                    'borderBottomRightRadius' => '100px',
                    'boxShadow' => 'rgba(0, 0, 0, 0.27) 0px 0px 20px -4px',
                    'boxShadowInset' => 'rgba(255, 255, 255, 0.22) 0px 1px 1px 0px inset',
                    'textShadow' => 'rgba(0, 0, 0, 0) 0px 0px 0px',
                    'filterHover' => 'brightness(1.05)',
                    'op3Icon' => 'op3-icon-small-right',
                )
            )
        ),
        array(
            'title' => 'Preset 37',
            'thumb' => op3_asset('img/elements/button/styles/style-37.png'),
            'options' => array(
                'all' => array(
                    'color' => 'rgb(255, 255, 255)',
                    'maxWidth' => '375px',
                    'height' => '75px',
                    'backgroundImageOverlay' => 'none',
                    'backgroundColorOverlay' => 'rgb(254, 97, 67)',
                    'fontSize' => '22px',
                    'lineHeight' => '1em',
                    'fontWeight' => '700',
                    'textTransform' => 'uppercase',
                    'subtextDisplay' => 'none',
                    'textTransformSubtext' => 'none',
                    'offsetXSubtext' => '5px',
                    'display' => 'none',
                    'borderTopWidth' => '0px',
                    'borderTopColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderBottomWidth' => '0px',
                    'borderBottomColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderLeftWidth' => '0px',
                    'borderLeftColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderRightWidth' => '0px',
                    'borderRightColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderTopLeftRadius' => '10px',
                    'borderTopRightRadius' => '10px',
                    'borderBottomLeftRadius' => '10px',
                    'borderBottomRightRadius' => '10px',
                    'boxShadow' => 'rgba(0, 0, 0, 0.18) 0px 11px 10px -6px',
                    'boxShadowInset' => 'rgba(255, 255, 255, 0.22) 0px 1px 1px 0px inset',
                    'textShadow' => 'rgba(0, 0, 0, 0) 0px 0px 0px',
                    'filterHover' => 'brightness(1.05)',
                    'op3Icon' => 'op3-icon-small-right',
                )
            )
        ),
        array(
            'title' => 'Preset 38',
            'thumb' => op3_asset('img/elements/button/styles/style-38.png'),
            'options' => array(
                'all' => array(
                    'color' => 'rgb(255, 255, 255)',
                    'maxWidth' => '375px',
                    'height' => '67px',
                    'backgroundImageOverlay' => 'none',
                    'backgroundColorOverlay' => 'rgb(255, 171, 48)',
                    'fontSize' => '26px',
                    'lineHeight' => '1em',
                    'fontWeight' => '700',
                    'textTransform' => 'none',
                    'subtextDisplay' => 'none',
                    'textTransformSubtext' => 'none',
                    'offsetXSubtext' => '5px',
                    'display' => 'none',
                    'borderTopWidth' => '0px',
                    'borderTopColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderBottomWidth' => '0px',
                    'borderBottomColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderLeftWidth' => '0px',
                    'borderLeftColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderRightWidth' => '0px',
                    'borderRightColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderTopLeftRadius' => '10px',
                    'borderTopRightRadius' => '10px',
                    'borderBottomLeftRadius' => '10px',
                    'borderBottomRightRadius' => '10px',
                    'boxShadow' => 'rgba(0, 0, 0, 0.18) 0px 11px 10px -6px',
                    'boxShadowInset' => 'rgba(255, 255, 255, 0.22) 0px 1px 1px 0px inset',
                    'textShadow' => 'rgba(0, 0, 0, 0) 0px 0px 0px',
                    'filterHover' => 'brightness(1.05)',
                    'op3Icon' => 'op3-icon-small-right',
                )
            )
        ),
        array(
            'title' => 'Preset 39',
            'thumb' => op3_asset('img/elements/button/styles/style-39.png'),
            'options' => array(
                'all' => array(
                    'color' => 'rgb(255, 255, 255)',
                    'maxWidth' => '432px',
                    'height' => '105px',
                    'backgroundImageOverlay' => 'none',
                    'backgroundColorOverlay' => 'rgb(254, 73, 2)',
                    'fontFamily' => '"Open Sans", sans-serif',
                    'fontSize' => '26px',
                    'lineHeight' => '1em',
                    'letterSpacing' => '0px',
                    'fontWeight' => '700',
                    'textTransform' => 'none',
                    'subtextDisplay' => 'block',
                    'textTransformSubtext' => 'none',
                    'offsetXSubtext' => '5px',
                    'offsetYSubtext' => '4px',
                    'display' => 'block',
                    'iconSpacing' => '15px',
                    'borderTopWidth' => '1px',
                    'borderTopColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderBottomWidth' => '1px',
                    'borderBottomColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderLeftWidth' => '1px',
                    'borderLeftColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderRightWidth' => '1px',
                    'borderRightColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderTopLeftRadius' => '5px',
                    'borderTopRightRadius' => '5px',
                    'borderBottomLeftRadius' => '5px',
                    'borderBottomRightRadius' => '5px',
                    'boxShadowInset' => 'rgba(255, 255, 255, 0.22) 0px 1px 1px 0px inset',
                    'textShadow' => 'rgba(0, 0, 0, 0) 0px 0px 0px',
                    'filterHover' => 'brightness(1.05)',
                    'op3Icon' => 'op3-icon-select-2',
                    'iconColor' => 'rgb(255, 255, 255)',
                ),
                'screen and (max-width=> 767px)' => array(
                    'height' => '87px',
                    'fontSize' => '17px',
                    'subtextDisplay' => 'block',
                    'fontSizeSubtext' => '14px',
                )
            )
        ),
        array(
            'title' => 'Preset 40',
            'thumb' => op3_asset('img/elements/button/styles/style-40.png'),
            'options' => array(
                'all' => array(
                    'color' => 'rgb(242, 101, 34)',
                    'maxWidth' => '426px',
                    'height' => '72px',
                    'backgroundImageOverlay' => 'none',
                    'backgroundColorOverlay' => 'rgba(255, 255, 255, 0)',
                    'fontSize' => '17px',
                    'lineHeight' => '1em',
                    'fontWeight' => '700',
                    'textTransform' => 'capitalize',
                    'subtextDisplay' => 'none',
                    'textTransformSubtext' => 'none',
                    'offsetXSubtext' => '5px',
                    'display' => 'none',
                    'borderTopWidth' => '4px',
                    'borderTopColor' => 'rgb(242, 101, 34)',
                    'borderBottomWidth' => '4px',
                    'borderBottomColor' => 'rgb(242, 101, 34)',
                    'borderLeftWidth' => '4px',
                    'borderLeftColor' => 'rgb(242, 101, 34)',
                    'borderRightWidth' => '4px',
                    'borderRightColor' => 'rgb(242, 101, 34)',
                    'borderTopLeftRadius' => '0px',
                    'borderTopRightRadius' => '0px',
                    'borderBottomLeftRadius' => '0px',
                    'borderBottomRightRadius' => '0px',
                    'boxShadowInset' => 'rgba(255, 255, 255, 0) 0px 0px 0px 0px inset',
                    'textShadow' => 'rgba(0, 0, 0, 0) 0px 0px 0px',
                    'filterHover' => 'brightness(1.05)',
                    'op3Icon' => 'op3-icon-small-right',
                )
            )
        ),
        array(
            'title' => 'Preset 41',
            'thumb' => op3_asset('img/elements/button/styles/style-41.png'),
            'options' => array(
                'all' => array(
                    'color' => 'rgb(0, 0, 0)',
                    'maxWidth' => '641px',
                    'height' => '100px',
                    'backgroundImageOverlay' => 'none',
                    'backgroundColorOverlay' => 'rgb(255, 220, 0)',
                    'fontFamily' => 'Poppins, sans-serif',
                    'fontSize' => '32px',
                    'lineHeight' => '1em',
                    'letterSpacing' => '0px',
                    'fontWeight' => '700',
                    'textTransform' => 'none',
                    'subtextDisplay' => 'block',
                    'textTransformSubtext' => 'none',
                    'offsetXSubtext' => '5px',
                    'offsetYSubtext' => '5px',
                    'display' => 'block',
                    'borderTopWidth' => '1px',
                    'borderTopColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderBottomWidth' => '1px',
                    'borderBottomColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderLeftWidth' => '1px',
                    'borderLeftColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderRightWidth' => '1px',
                    'borderRightColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderTopLeftRadius' => '10px',
                    'borderTopRightRadius' => '10px',
                    'borderBottomLeftRadius' => '10px',
                    'borderBottomRightRadius' => '10px',
                    'boxShadowInset' => 'rgba(255, 255, 255, 0.22) 0px 1px 0px 0px inset',
                    'textShadow' => 'rgba(0, 0, 0, 0) 0px 0px 0px',
                    'paddingLeft' => '40px',
                    'paddingRight' => '40px',
                    'filterHover' => 'brightness(1.05)',
                    'op3Icon' => 'op3-icon-small-right',
                ),
                'screen and (max-width=> 767px)' => array(
                    'height' => '96px',
                    'fontSize' => '19px',
                    'fontSizeSubtext' => '14px',
                    'offsetXSubtext' => '0px',
                    'offsetYSubtext' => '8px',
                    'paddingTop' => '0px',
                    'paddingBottom' => '0px',
                    'paddingLeft' => '0px',
                    'paddingRight' => '0px',
                ),
            )
        ),
        array(
            'title' => 'Preset 42',
            'thumb' => op3_asset('img/elements/button/styles/style-42.png'),
            'options' => array(
                'all' => array(
                    'color' => 'rgb(255, 255, 255)',
                    'maxWidth' => '587px',
                    'height' => '110px',
                    'backgroundImageOverlay' => 'linear-gradient(rgb(255, 191, 0) 0%, rgb(255, 104, 62) 100%)',
                    'fontFamily' => '"IBM Plex Sans", sans-serif',
                    'fontSize' => '34px',
                    'lineHeight' => '1em',
                    'letterSpacing' => '0px',
                    'fontWeight' => '700',
                    'textTransform' => 'uppercase',
                    'subtextDisplay' => 'block',
                    'textTransformSubtext' => 'uppercase',
                    'offsetXSubtext' => '5px',
                    'offsetYSubtext' => '8px',
                    'display' => 'none',
                    'borderTopWidth' => '1px',
                    'borderTopColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderBottomWidth' => '4px',
                    'borderBottomColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderLeftWidth' => '1px',
                    'borderLeftColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderRightWidth' => '1px',
                    'borderRightColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderTopLeftRadius' => '10px',
                    'borderTopRightRadius' => '10px',
                    'borderBottomLeftRadius' => '10px',
                    'borderBottomRightRadius' => '10px',
                    'boxShadowInset' => 'rgba(255, 255, 255, 0.07) 0px 64px 0px 0px inset',
                    'textShadow' => 'rgba(0, 0, 0, 0.17) 0px 2px 0px',
                    'filterHover' => 'brightness(1.05)',
                    'op3Icon' => 'op3-icon-small-right',
                )
            )
        ),
        array(
            'title' => 'Preset 43',
            'thumb' => op3_asset('img/elements/button/styles/style-43.png'),
            'options' => array(
                'all' => array(
                    'color' => 'rgb(255, 255, 255)',
                    'maxWidth' => '550px',
                    'height' => '105px',
                    'backgroundImageOverlay' => 'none',
                    'backgroundColorOverlay' => 'rgb(64, 174, 125)',
                    'fontSize' => '26px',
                    'lineHeight' => '1em',
                    'letterSpacing' => '0px',
                    'fontWeight' => '700',
                    'textTransform' => 'none',
                    'subtextDisplay' => 'block',
                    'textTransformSubtext' => 'none',
                    'offsetXSubtext' => '5px',
                    'offsetYSubtext' => '6px',
                    'display' => 'block',
                    'iconSize' => '100%',
                    'iconDirection' => 'row-reverse',
                    'iconSpacing' => '9px',
                    'op3Icon' => 'op3-icon-small-right',
                    'iconColor' => 'rgb(255, 255, 255)',
                    'borderTopWidth' => '1px',
                    'borderTopColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderBottomWidth' => '1px',
                    'borderBottomColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderLeftWidth' => '1px',
                    'borderLeftColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderRightWidth' => '1px',
                    'borderRightColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderTopLeftRadius' => '0px',
                    'borderTopRightRadius' => '0px',
                    'borderBottomLeftRadius' => '0px',
                    'borderBottomRightRadius' => '0px',
                    'boxShadowInset' => 'rgba(255, 255, 255, 0.22) 0px 1px 1px 0px inset',
                    'textShadow' => 'rgba(0, 0, 0, 0) 0px 0px 0px',
                    'filterHover' => 'brightness(1.05)',
                )
            )
        ),
        array(
            'title' => 'Preset 44',
            'thumb' => op3_asset('img/elements/button/styles/style-44.png'),
            'options' => array(
                'all' => array(
                    'color' => 'rgb(53, 106, 230)',
                    'maxWidth' => '200px',
                    'height' => '36px',
                    'backgroundImageOverlay' => 'none',
                    'backgroundColorOverlay' => 'rgba(53, 106, 230, 0)',
                    'fontFamily' => '"IBM Plex Sans", sans-serif',
                    'fontSize' => '17px',
                    'lineHeight' => '1em',
                    'fontWeight' => '700',
                    'textTransform' => 'none',
                    'textDecoration' => 'none',
                    'subtextDisplay' => 'none',
                    'textTransformSubtext' => 'none',
                    'offsetXSubtext' => '5px',
                    'display' => 'block',
                    'iconDirection' => 'row-reverse',
                    'op3Icon' => 'op3-icon-small-right',
                    'iconColor' => 'rgb(53, 106, 230)',
                    'borderTopWidth' => '0px',
                    'borderTopColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderBottomWidth' => '3px',
                    'borderBottomColor' => 'rgb(53, 106, 230)',
                    'borderLeftWidth' => '0px',
                    'borderLeftColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderRightWidth' => '0px',
                    'borderRightColor' => 'rgba(0, 0, 0, 0.2)',
                    'borderTopLeftRadius' => '0px',
                    'borderTopRightRadius' => '0px',
                    'borderBottomLeftRadius' => '0px',
                    'borderBottomRightRadius' => '0px',
                    'boxShadow' => 'rgba(0, 0, 0, 0) 0px 0px 0px 0px',
                    'boxShadowInset' => 'rgba(255, 255, 255, 0) 0px 0px 0px 0px inset',
                    'textShadow' => 'rgba(0, 0, 0, 0) 0px 0px 0px',
                    'paddingTop' => '0px',
                    'paddingBottom' => '0px',
                    'paddingLeft' => '0px',
                    'paddingRight' => '0px',
                    'filterHover' => 'brightness(1.05)',
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
    'presetIncludeProperties' => array(
        'all' => array('op3Icon'),
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
    'presetExcludeProperties' => array(
        'all' => array('marginLeft', 'marginRight'),
    ),

    /**
     * PHP class user for rendering the element
     * (NULL for templates).
     */
    'objectClass' => 'Button',
);
