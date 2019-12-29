<?php

return array(

    /**
     * Element type:
     * If starts with underscore this is considered
     * as template. With template only markup is needed,
     * the rest will be inherited from real element type
     * config.
     */
    'type' => 'evergreencountdowntimer',

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
    'order' => 1250,

    /**
     * Element title:
     * Title displayed on sidebar.
     */
    'title' => 'Evergreen Countdown Timer',

    /**
     * Element thumb:
     * Thumb displayed on sidebar.
     */
    'thumb' => 'hourglass-1',

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
        op3_asset_path('js/op3-cookie.js'),
        op3_asset_path('js/jquery.countdown.js'),
        op3_asset_path('js/op3-element-evergreencountdowntimer.js'),
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
            'day' => '0',
            'hour' => '0',
            'minute' => '5',
            'second' => '0',
            'restartDay' => '0',
            'restartHour' => '1',
            'restartTimer' => '0',
            'countdownFinishAction'  => 'text',
            'text' => 'The timer has expired!',
            'countdownTimerUnitDay' => 'days',
            'countdownTimerUnitHour' => 'hrs',
            'countdownTimerUnitMin' => 'mins',
            'countdownTimerUnitSec' => 'secs',
            'redirectUrl' => '',
            'marginLeft' => 'auto',
            'marginRight' => 'auto',
            'linkEvergreen' => 'none',
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
            'title'   => 'Preset 1',
            'thumb'   => op3_asset('img/elements/evergreencountdowntimer/styles/style-1.png'),
            'options' => array(
                'all' => array(
                    'fontFamily' => 'Karla, sans-serif',
                    // wrapper
                    'wrapperBackgroundColor' => 'none',
                    'fontWeight' => '700',
                    // digits
                    'digitsFontSize' => '48px',
                    'digitsFontWeight' => '700',
                    'digitsColor' => '#fff',
                    'digitsBoxShadow' => 'inset 0 0 0 1px rgba(64, 64, 64, 1), inset 0 -1px 0 0 rgba(255, 255, 255, 0.3), inset 0 -2px 0 0 rgba(0, 0, 0, 1), inset 0 -3px 0 0 rgba(255, 255, 255, 0.3), inset 0 -4px 0 0 rgba(0, 0, 0, 1), inset 0 -5px 0 0 rgba(255, 255, 255, 0.1)',
                    'digitsBackgroundColor' => '#191919',
                    'digitsBackgroundImage' => 'linear-gradient(to bottom, rgba(25, 25, 25, 1) 0, rgba(31, 31, 31, 1) 50%, rgba(38, 38, 38, 1) 50%, rgba(51, 51, 51, 1) 100%)',
                    'digitsTopLeftRadius' => '8px',
                    'digitsTopRightRadius' => '8px',
                    'digitsBottomLeftRadius' => '8px',
                    'digitsBottomRightRadius' => '8px',
                    'digitsMinWidth' => '90px',
                    'digitsTextShadow' => '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
                    'digitsLineHeight' => '1em',
                    'digitsBorderTopWidth' => '3px',
                    'digitsBorderBottomWidth' => '3px',
                    'digitsBorderLeftWidth' => '3px',
                    'digitsBorderRightWidth' => '3px',
                    'digitsBorderTopStyle' => 'solid',
                    'digitsBorderBottomStyle' => 'solid',
                    'digitsBorderLeftStyle' => 'solid',
                    'digitsBorderRightStyle' => 'solid',
                    'digitsBorderTopColor' => '#000',
                    'digitsBorderBottomColor' => '#000',
                    'digitsBorderRightColor' => '#000',
                    'digitsBorderLeftColor' => '#000',
                    'digitsPaddingTop' => '15px',
                    'digitsPaddingBottom' => '15px',
                    //digitsAfter
                    'digitsAfterDisplay' => 'block',
                    'digitsAfterBorderTopWidth' => '1px',
                    'digitsAfterBorderTopStyle' => 'solid',
                    'digitsAfterBorderTopColor' => 'rgba(255, 255, 255, 0.175)',
                    'digitsAfterBorderBottomWidth' => '1px',
                    'digitsAfterBorderBottomStyle' => 'solid',
                    'digitsAfterBorderBottomColor' => 'rgba(255, 255, 255, 0.175)',
                    // units
                    'unitsFontSize' => '13px',
                    'unitsColor' => '#000',
                    'unitsTextTransform' => 'uppercase',
                    'unitsTextAlign' => 'center',
                ),
            ),
            ),
        array(
            'title'   => 'Preset 2',
            'thumb'   => op3_asset('img/elements/evergreencountdowntimer/styles/style-2.png'),
            'options' => array(
                'all' => array(
                    'fontFamily' => 'Karla, sans-serif',
                    'fontWeight' => '700',
                    // wrapper
                    'wrapperBackgroundColor' => 'transparent',
                    // digits
                    'digitsFontSize' => '48px',
                    'digitsColor' => '#333',
                    'digitsBoxShadow' => '0 0 0 1px rgba(255, 255, 255, 0.5), inset 0 0 0 1px rgba(0, 0, 0, 0.25), inset 0 -3px 0 0 rgba(204, 204, 204, 1), inset 0 -4px 0 0 rgba(179, 179, 179, 1), inset 0 -5px 0 0 rgba(255, 255, 255, 1), inset 0 2px 0 0 rgba(234, 234, 234, 1), inset 0 3px 0 0 rgba(179, 179, 179, 1), inset 0 4px 0 0 rgba(255, 255, 255, 1)',
                    'digitsBackgroundColor' => '#f2f2f2',
                    'digitsBackgroundImage' => 'linear-gradient(to bottom, rgba(255, 255, 255, 1) 0, rgba(234, 234, 234, 1) 50%, rgba(242, 242, 242, 1) 51%, rgba(250, 250, 250, 1) 100%)',
                    'digitsTopLeftRadius' => '4px',
                    'digitsTopRightRadius' => '4px',
                    'digitsBottomLeftRadius' => '4px',
                    'digitsBottomRightRadius' => '4px',
                    'digitsMinWidth' => '60px',
                    'digitsTextShadow' => '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
                    'digitsLineHeight' => '1em',
                    'digitsPaddingTop' => '15px',
                    'digitsPaddingBottom' => '15px',
                    'digitsPaddingLeft' => '15px',
                    'digitsPaddingRight' => '15px',
                    // digits::after
                    'digitsAfterDisplay' => 'block',
                    'digitsAfterBackgroundColor' => 'rgba(255, 255, 255, 0.75)',
                    // units
                    'unitsFontSize' => '13px',
                    'unitsColor' => '#212529',
                    'unitsTextTransform' => 'uppercase',
                    'unitsTextAlign' => 'center',
                ),
            ),
        ),
        array(
            'title'   => 'Preset 3',
            'thumb'   => op3_asset('img/elements/evergreencountdowntimer/styles/style-3.png'),
            'options' => array(
                'all' => array(
                    'fontWeight' => '400',
                    // wrapper
                    'wrapperBackgroundColor' => 'transparent',
                    // digits
                    'digitsFontSize' => '20px',
                    'digitsColor' => '#505e6e',
                    'digitsBorderTopWidth' => '4px',
                    'digitsBorderBottomWidth' => '4px',
                    'digitsBorderLeftWidth' => '4px',
                    'digitsBorderRightWidth' => '4px',
                    'digitsBorderTopStyle' => 'solid',
                    'digitsBorderBottomStyle' => 'solid',
                    'digitsBorderLeftStyle' => 'solid',
                    'digitsBorderRightStyle' => 'solid',
                    'digitsBorderTopColor' => 'currentColor',
                    'digitsBorderBottomColor' => 'currentColor',
                    'digitsBorderRightColor' => 'currentColor',
                    'digitsBorderLeftColor' => 'currentColor',
                    'digitsLineHeight' => '1.1em',
                    'digitsTopLeftRadius' => '50%',
                    'digitsTopRightRadius' => '50%',
                    'digitsBottomLeftRadius' => '50%',
                    'digitsBottomRightRadius' => '50%',
                    'digitsPaddingTop' => '15px',
                    'digitsPaddingBottom' => '15px',
                    'digitsPaddingLeft' => '15px',
                    'digitsPaddingRight' => '15px',
                    // units
                    'unitsFontSize' => '16px',
                    'unitsColor' => '#505e6e',
                    'unitsTextTransform' => 'lowercase',
                    'unitsTextAlign' => 'center',
                ),
            ),
        ),
        array(
            'title'   => 'Preset 4',
            'thumb'   => op3_asset('img/elements/evergreencountdowntimer/styles/style-4.png'),
            'options' => array(
                'all' => array(
                    'fontWeight' => '400',
                    // wrapper
                    'wrapperBackgroundColor' => 'transparent',
                    // digits
                    'digitsFontSize' => '40px',
                    'digitsColor' => '#b7babc',
                    'digitsBorderTopWidth' => '2px',
                    'digitsBorderBottomWidth' => '2px',
                    'digitsBorderLeftWidth' => '2px',
                    'digitsBorderRightWidth' => '2px',
                    'digitsBorderTopStyle' => 'solid',
                    'digitsBorderBottomStyle' => 'solid',
                    'digitsBorderLeftStyle' => 'solid',
                    'digitsBorderRightStyle' => 'solid',
                    'digitsBorderTopColor' => 'currentColor',
                    'digitsBorderBottomColor' => 'currentColor',
                    'digitsBorderRightColor' => 'currentColor',
                    'digitsBorderLeftColor' => 'currentColor',
                    'digitsLineHeight' => '1.1em',
                    'digitsTopLeftRadius' => '50%',
                    'digitsTopRightRadius' => '50%',
                    'digitsBottomLeftRadius' => '50%',
                    'digitsBottomRightRadius' => '50%',
                    'digitsPaddingTop' => '20px',
                    'digitsPaddingBottom' => '20px',
                    'digitsPaddingLeft' => '20px',
                    'digitsPaddingRight' => '20px',
                    // units
                    'unitsFontSize' => '16px',
                    'unitsColor' => '#abaeb1',
                    'unitsTextTransform' => 'uppercase',
                    'unitsTextAlign' => 'center',
                ),
            ),
        ),
        array(
            'title'   => 'Preset 5',
            'thumb'   => op3_asset('img/elements/evergreencountdowntimer/styles/style-5.png'),
            'options' => array(
                'all' => array(
                    'fontWeight' => '700',
                    'digitsFontSize' => '30px',
                    'digitsColor' => '#333',
                    // wrapper
                    'wrapperBackgroundColor' => 'transparent',
                    // digits
                    'digitsBackgroundColor' => '#f9f9f9',
                    'digitsTopLeftRadius' => '3px',
                    'digitsTopRightRadius' => '3px',
                    'digitsBottomLeftRadius' => '3px',
                    'digitsBottomRightRadius' => '3px',
                    'digitsPaddingTop' => '20px',
                    'digitsPaddingBottom' => '20px',
                    'digitsPaddingLeft' => '20px',
                    'digitsPaddingRight' => '20px',
                    'digitsLineHeight' => '1em',
                    // units
                    'unitsFontSize' => '14px',
                    'unitsColor' => '#ffd800',
                    'unitsTextTransform' => 'uppercase',
                    'unitsTextAlign' => 'center',
                    'unitsMarginLeft' => '3px',
                    'unitsMarginRight' => '3px',
                ),
            ),
        ),
        array(
            'title'   => 'Preset 6',
            'thumb'   => op3_asset('img/elements/evergreencountdowntimer/styles/style-6.png'),
            'options' => array(
                'all' => array(
                    'fontWeight' => '600',
                    'digitsFontSize' => '34px',
                    'digitsColor' => '#fffffe',
                    'wrapperBackgroundColor' => 'transparent',
                    // wrapper
                    'digitsBackgroundColor' => 'rgba(0, 0, 0, 0.1)',
                    'digitsTopLeftRadius' => '3px',
                    'digitsTopRightRadius' => '3px',
                    'digitsBottomLeftRadius' => '3px',
                    'digitsBottomRightRadius' => '3px',
                    'digitsMinWidth' => '50px',
                    'digitsLineHeight' => '1em',
                    'digitsPaddingTop' => '20px',
                    'digitsPaddingBottom' => '20px',
                    'digitsPaddingLeft' => '15px',
                    'digitsPaddingRight' => '15px',
                    // units
                    'unitsFontSize' => '13px',
                    'unitsColor' => '#fff',
                    'unitsTextTransform' => 'uppercase',
                    'unitsMarginLeft' => '6px',
                    'unitsMarginRight' => '6px',
                ),
            ),
        ),
        array(
            'title'   => 'Preset 7',
            'thumb'   => op3_asset('img/elements/evergreencountdowntimer/styles/style-7.png'),
            'options' => array(
                'all' => array(
                    'fontWeight' => '700',
                    'digitsFontSize' => '48px',
                    'digitsColor' => '#fff',
                    'fontFamily' => 'Karla, sans-serif',
                    // wrapper
                    'wrapperBackgroundColor' => 'transparent',
                    // digits
                    'digitsLineHeight' => '1em',
                    // units
                    'unitsFontSize' => '12px',
                    'unitsColor' => '#fff',
                    'unitsTextTransform' => 'uppercase',
                    'unitsMarginLeft' => '4px',
                    'unitsMarginRight' => '4px',
                ),
            ),
        ),
        array(
            'title'   => 'Preset 8',
            'thumb'   => op3_asset('img/elements/evergreencountdowntimer/styles/style-8.png'),
            'options' => array(
                'all' => array(
                    'digitsFontSize' => '36px',
                    'fontWeight' => '700',
                    'digitsColor' => '#fff',
                    'wrapperTopLeftRadius' => '10px',
                    'wrapperTopRightRadius' => '10px',
                    'wrapperBottomLeftRadius' => '10px',
                    'wrapperBottomRightRadius' => '10px',
                    'fontFamily' => 'Karla, sans-serif',
                    // wrapper
                    'wrapperBackgroundColor' => 'rgba(0,0,0,0.1)',
                    // digits
                    'digitsPaddingLeft' => '10px',
                    'digitsPaddingRight' => '10px',
                    'digitsMinWidth' => '52px',
                    // units
                    'unitsFontSize' => '10px',
                    'unitsColor' => '#fff',
                    'unitsTextTransform' => 'uppercase',
                    'unitsMarginLeft' => '6px',
                    'unitsMarginRight' => '6px',
                    'unitsPaddingBottom' => '8px',
                    'unitsLineHeight' => '20px',
                ),
            ),
        ),
        array(
            'title'   => 'Preset 9',
            'thumb'   => op3_asset('img/elements/evergreencountdowntimer/styles/style-9.png'),
            'options' => array(
                'all' => array(
                    'fontWeight' => '600',
                    // wrapper
                    'wrapperBackgroundColor' => 'transparent',
                    'wrapperAlignItems' => 'flex-start',
                    'wrapperMarginRight' => '25px',
                    'wrapperMarginLeft' => '70px',
                    'wrapperAfterDisplay' => 'block',
                    'wrapperAfterContent' => '":"',
                    'wrapperLineHeight' => '1',
                    // digits
                    'digitsFontSize' => '100px',
                    'digitsColor' => '#ffd565',
                    // units
                    'unitsFontSize' => '21px',
                    'unitsColor' => '#ffd565',
                    'unitsTextTransform' => 'lowercase',
                    'unitsLineHeight' => '25px',
                    'unitsTextAlign' => 'left',
                ),
            ),
        ),
        array(
            'title'   => 'Preset 10',
            'thumb'   => op3_asset('img/elements/evergreencountdowntimer/styles/style-10.png'),
            'options' => array(
                'all' => array(
                    'fontWeight' => '700',
                    // wrapper
                    'wrapperWidth' => '180px',
                    'wrapperPaddingTop' => '28px',
                    'wrapperPaddingBottom' => '28px',
                    'wrapperPaddingLeft' => '12px',
                    'wrapperPaddingRight' => '12px',
                    'wrapperBorderLeftWidth' => '1px',
                    'wrapperBorderLeftStyle' => 'dotted',
                    'wrapperBorderLeftColor' => 'rgba(218, 218, 218, 0.8)',
                    // digits
                    'digitsColor' => '#fff',
                    'digitsFontSize' => '60px',
                    'digitsTextShadow' => '0 0 1px rgba(0, 0, 0, 0.4)',
                    'digitsLineHeight' => '1',
                    // units
                    'unitsFontSize' => '35px',
                    'unitsColor' => '#dadada',
                    'unitsTextTransform' => 'uppercase',
                    'unitsTextAlign' => 'center',
                    'unitsLetterSpacing' => '1px',
                ),
            ),
        ),
        array(
            'title'   => 'Preset 11',
            'thumb'   => op3_asset('img/elements/evergreencountdowntimer/styles/style-11.png'),
            'options' => array(
                'all' => array(
                    // wrapper
                    'flexDirection' => 'row',
                    // digits
                    'digitsLineHeight' => '1',
                    'digitsColor' => '#fff',
                    // units
                    'unitsColor' => '#fff',
                    'unitsTextTransform' => 'lowercase',
                    'unitsTextAlign' => 'center',
                    'unitsMargintLeft' => '10px',
                    // units::after
                    'unitsAfterContent' => '","',
                    'unitsAfterDisplay' => 'block',
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
    'objectClass' => 'EvergreenCountdownTimer',

    /**
     * Size of the thumbs in the Style picker
     * full (default, when no value is
     * defined), medium (50%)
     * or small (33%)
     */
    'thumbSize' => '',
);
