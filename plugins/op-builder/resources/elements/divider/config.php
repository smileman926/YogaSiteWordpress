<?php

return array(

    /**
     * Element type:
     * If starts with underscore this is considered
     * as template. With template only markup is needed,
     * the rest will be inherited from real element type
     * config.
     */
    'type' => 'divider',

    /**
     * Element category ID:
     * Group elements on sidebar. If NULL this element
     * type won't be shown on sidebar.
     *
     * As per OP3-476 this is temporarily hidden
     */
    'category' => NULL,

    /**
     * Element order:
     * Order elements on sidebar.
     */
    'order' => 600,

    /**
     * Element title:
     * Title displayed on sidebar.
     */
    'title' => 'Divider',

    /**
     * Element thumb:
     * Thumb displayed on sidebar.
     */
    'thumb' => 'select-84-1',

    /**
     * Element wrapper:
     * Wrap element with this element type
     * (NULL for templates).
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
    'options' => array(),

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
    'markup' => null,

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
    'styles' => array(
        array(
            'id' => 'line',
            'title' => 'Line',
            'thumb' => op3_asset('img/elements/divider/styles/line.svg'),
            'markup' => op3_element_markup(OP3_ASSETS_PATH . 'img/elements/divider/styles/line.svg'),
        ),
        array(
            'id' => 'square',
            'title' => 'Square',
            'thumb' => op3_asset('img/elements/divider/styles/square.svg'),
            'markup' => op3_element_markup(OP3_ASSETS_PATH . 'img/elements/divider/styles/square.svg'),
        ),
        array(
            'id' => 'circle',
            'title' => 'Circle',
            'thumb' => op3_asset('img/elements/divider/styles/circle.svg'),
            'markup' => op3_element_markup(OP3_ASSETS_PATH . 'img/elements/divider/styles/circle.svg'),
        ),
        array(
            'id' => 'triangle',
            'title' => 'Triangle',
            'thumb' => op3_asset('img/elements/divider/styles/triangle.svg'),
            'markup' => op3_element_markup(OP3_ASSETS_PATH . 'img/elements/divider/styles/triangle.svg'),
        ),
        array(
            'id' => 'diamond',
            'title' => 'Diamond',
            'thumb' => op3_asset('img/elements/divider/styles/diamond.svg'),
            'markup' => op3_element_markup(OP3_ASSETS_PATH . 'img/elements/divider/styles/diamond.svg'),
        ),
        array(
            'id' => 'star',
            'title' => 'Star',
            'thumb' => op3_asset('img/elements/divider/styles/star.svg'),
            'markup' => op3_element_markup(OP3_ASSETS_PATH . 'img/elements/divider/styles/star.svg'),
        ),
        array(
            'id' => 'hexagon',
            'title' => 'Hexagon',
            'thumb' => op3_asset('img/elements/divider/styles/hexagon.svg'),
            'markup' => op3_element_markup(OP3_ASSETS_PATH . 'img/elements/divider/styles/hexagon.svg'),
        ),
        array(
            'id' => 'octagon',
            'title' => 'Octagon',
            'thumb' => op3_asset('img/elements/divider/styles/octagon.svg'),
            'markup' => op3_element_markup(OP3_ASSETS_PATH . 'img/elements/divider/styles/octagon.svg'),
        ),
        array(
            'id' => 'heart',
            'title' => 'Heart',
            'thumb' => op3_asset('img/elements/divider/styles/heart.svg'),
            'markup' => op3_element_markup(OP3_ASSETS_PATH . 'img/elements/divider/styles/heart.svg'),
        ),
        array(
            'id' => 'moustache1',
            'title' => 'Moustache #1',
            'thumb' => op3_asset('img/elements/divider/styles/moustache1.svg'),
            'markup' => op3_element_markup(OP3_ASSETS_PATH . 'img/elements/divider/styles/moustache1.svg'),
        ),
        array(
            'id' => 'moustache2',
            'title' => 'Moustache #2',
            'thumb' => op3_asset('img/elements/divider/styles/moustache2.svg'),
            'markup' => op3_element_markup(OP3_ASSETS_PATH . 'img/elements/divider/styles/moustache2.svg'),
        ),
        array(
            'id' => 'moustache3',
            'title' => 'Moustache #3',
            'thumb' => op3_asset('img/elements/divider/styles/moustache3.svg'),
            'markup' => op3_element_markup(OP3_ASSETS_PATH . 'img/elements/divider/styles/moustache3.svg'),
        ),
    ),

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
    'presets' => array(),

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
    'objectClass' => 'Divider',

    /**
     * Size of the thumbs in the Style picker
     * full (default, when no value is
     * defined), medium (50%)
     * or small (33%)
     */
    'thumbSize' => 'full',
);
