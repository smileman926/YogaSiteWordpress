<?php

return array(

    /**
     * Element type:
     * If starts with underscore this is considered
     * as template. With template only markup is needed,
     * the rest will be inherited from real element type
     * config.
     */
    'type' => 'progressbar',

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
    'order' => 1100,

    /**
     * Element title:
     * Title displayed on sidebar.
     */
    'title' => 'Progress Bar',

    /**
     * Element thumb:
     * Thumb displayed on sidebar.
     */
    'thumb' => 'chart-bar-32-1 op3-icon-rotate-90',

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
        op3_asset_path('js/op3-element-progressbar.js'),
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
            'thumb' => op3_asset('img/elements/progressbar/styles/style-1.png'),
            'options' => array(
                'all' => array(
                    'marginLeft' => 'auto',
                    'marginRight' => 'auto',
                    'html' => '50% Complete',
                    'backgroundStripes' => 'wide-forward',
                    'labelPlacement' => 'above',
                    'animationToggle' => '0',
                    'animationToggle2' => '1',
                    'labelSpacingTop' => '9px',
                    'labelSpacingBottom' => '9px',
                    'borderTopLeftRadius' => '100px',
                    'borderTopRightRadius' => '100px',
                    'borderBottomRightRadius' => '100px',
                    'borderBottomLeftRadius' => '100px',
                    'progressWidth' => '50%',
                    'height' => '13px',
                    'labelWidth' => '50%',
                    'backgroundColorBase' => '#d4d4d4',
                    'backgroundColorOverlay' => '#ffce00 ',
                    'color' => '#020202',
                    'fontSize' => '15px',
                    'fontWeight' => '700',
                    'textAlign' => 'center',
                ),
            ),
        ),
        array(
            'title' => 'Preset 2',
            'thumb' => op3_asset('img/elements/progressbar/styles/style-2.png'),
            'options' => array(
                'all' => array(
                    'marginLeft' => 'auto',
                    'marginRight' => 'auto',
                    'html' => "You're Almost There... Just Complete the Steps Below",
                    'backgroundStripes' => 'none',
                    'labelPlacement' => 'above',
                    'animationToggle' => '1',
                    'animationToggle2' => '0',
                    'labelSpacingTop' => '7px',
                    'labelSpacingBottom' => '7px',
                    'borderTopLeftRadius' => '100px',
                    'borderTopRightRadius' => '100px',
                    'borderBottomRightRadius' => '100px',
                    'borderBottomLeftRadius' => '100px',
                    'progressWidth' => '50%',
                    'height' => '12px',
                    'labelWidth' => '50%',
                    'backgroundColorBase' => '#e8e8e8',
                    'backgroundColorOverlay' => '#545ed5 ',
                    'color' => '#212529',
                    'fontSize' => '16px',
                    'fontWeight' => '400',
                    'textAlign' => 'center',
                ),
            ),
        ),
        array(
            'title' => 'Preset 3',
            'thumb' => op3_asset('img/elements/progressbar/styles/style-3.png'),
            'options' => array(
                'all' => array(
                    'marginLeft' => 'auto',
                    'marginRight' => 'auto',
                    'html' => '50% Complete ... ',
                    'backgroundStripes' => 'wide-forward',
                    'labelPlacement' => 'above',
                    'animationToggle' => '1',
                    'animationToggle2' => '0',
                    'labelSpacingTop' => '8px',
                    'labelSpacingBottom' => '8px',
                    'borderTopLeftRadius' => '0px',
                    'borderTopRightRadius' => '0px',
                    'borderBottomRightRadius' => '0px',
                    'borderBottomLeftRadius' => '0px',
                    'progressWidth' => '50%',
                    'height' => '21px',
                    'labelWidth' => '50%',
                    'backgroundColorBase' => '#f5f5f5',
                    'backgroundImageOverlay' => 'linear-gradient(90deg, #ff4c00 0%, #ffbd00 100%)',
                    'backgroundColorOverlay' => '#ff4c00 ',
                    'color' => '#212529',
                    'fontSize' => '16px',
                    'fontWeight' => '700',
                    'textAlign' => 'center',
                ),
            ),
        ),
        array(
            'title' => 'Preset 4',
            'thumb' => op3_asset('img/elements/progressbar/styles/style-4.png'),
            'options' => array(
                'all' => array(
                    'marginLeft' => 'auto',
                    'marginRight' => 'auto',
                    'html' => "<b>Step 1 of 2</b> - You're Almost There",
                    'backgroundStripes' => 'none',
                    'labelPlacement' => 'above',
                    'animationToggle' => '1',
                    'animationToggle2' => '0',
                    'labelSpacingBottom' => '10px',
                    'labelSpacingTop' => '10px',
                    'borderTopLeftRadius' => '100px',
                    'borderTopRightRadius' => '100px',
                    'borderBottomRightRadius' => '100px',
                    'borderBottomLeftRadius' => '100px',
                    'progressWidth' => '50%',
                    'height' => '13px',
                    'labelWidth' => '50%',
                    'backgroundColorBase' => '#f0f0f0',
                    'backgroundImageOverlay' => 'linear-gradient(90deg, #01f2a5 0%, #39a3b5 100%)',
                    'backgroundColorOverlay' => '#01f2a5 ',
                    'color' => '#3f3f3f',
                    'fontSize' => '17px',
                    'fontWeight' => '400',
                    'textAlign' => 'center',
                ),
            ),
        ),
        array(
            'title' => 'Preset 5',
            'thumb' => op3_asset('img/elements/progressbar/styles/style-5.png'),
            'options' => array(
                'all' => array(
                    'marginLeft' => 'auto',
                    'marginRight' => 'auto',
                    'html' => "You're Almost There - Just One More Step",
                    'backgroundStripes' => 'wide-backward',
                    'labelPlacement' => 'below',
                    'animationToggle' => '1',
                    'animationToggle2' => '0',
                    'labelSpacingTop' => '8px',
                    'labelSpacingBottom' => '8px',
                    'borderTopLeftRadius' => '100px',
                    'borderTopRightRadius' => '100px',
                    'borderBottomRightRadius' => '100px',
                    'borderBottomLeftRadius' => '100px',
                    'progressWidth' => '50%',
                    'height' => '13px',
                    'labelWidth' => '50%',
                    'backgroundColorBase' => '#e8e8e8',
                    // 'backgroundImageOverlay' => 'linear-gradient(90deg, #01f2a5 0%, #39a3b5 100%)',
                    'backgroundColorOverlay' => '#ffcd00 ',
                    'color' => '#5e646a',
                    'fontSize' => '15px',
                    'fontWeight' => '400',
                    'textAlign' => 'center',
                ),
            ),
        ),
        array(
            'title' => 'Preset 6',
            'thumb' => op3_asset('img/elements/progressbar/styles/style-6.png'),
            'options' => array(
                'all' => array(
                    'marginLeft' => 'auto',
                    'marginRight' => 'auto',
                    'html' => "50% Complete",
                    'backgroundStripes' => 'none',
                    'labelPlacement' => 'above',
                    'animationToggle' => '1',
                    'animationToggle2' => '0',
                    'labelSpacingBottom' => '10px',
                    'labelSpacingTop' => '10px',
                    'borderTopLeftRadius' => '100px',
                    'borderTopRightRadius' => '100px',
                    'borderBottomRightRadius' => '100px',
                    'borderBottomLeftRadius' => '100px',
                    'progressWidth' => '50%',
                    'height' => '20px',
                    'labelWidth' => '50%',
                    'backgroundColorBase' => 'rgba(0, 0, 0, 0)',
                    'backgroundImageOverlay' => 'linear-gradient(90deg, #f50 20%, #ffb000 100%)',
                    'backgroundColorOverlay' => '#f50',
                    'color' => '#f50',
                    'fontSize' => '16px',
                    'fontWeight' => '700',
                    'textAlign' => 'left',
                    'borderTopWidthBase' => '1px',
                    'borderTopStyleBase' => 'solid',
                    'borderTopColorBase' => 'rgba(158, 158, 158, 0.21)',
                    'borderBottomWidthBase' => '1px',
                    'borderBottomStyleBase' => 'solid',
                    'borderBottomColorBase' => 'rgba(158, 158, 158, 0.21)',
                    'borderLeftWidthBase' => '1px',
                    'borderLeftStyleBase' => 'solid',
                    'borderLeftColorBase' => 'rgba(158, 158, 158, 0.21)',
                    'borderRightWidthBase' => '1px',
                    'borderRightStyleBase' => 'solid',
                    'borderRightColorBase' => 'rgba(158, 158, 158, 0.21)',
                ),
            ),
        ),
        array(
            'title' => 'Preset 7',
            'thumb' => op3_asset('img/elements/progressbar/styles/style-7.png'),
            'options' => array(
                'all' => array(
                    'marginLeft' => 'auto',
                    'marginRight' => 'auto',
                    'html' => "Almost there... <b>75% Complete</b>",
                    'backgroundStripes' => 'wide-forward',
                    'labelPlacement' => 'above',
                    'animationToggle' => '1',
                    'animationToggle2' => '0',
                    'labelSpacingBottom' => '8px',
                    'labelSpacingTop' => '8px',
                    'borderTopLeftRadius' => '100px',
                    'borderTopRightRadius' => '100px',
                    'borderBottomRightRadius' => '100px',
                    'borderBottomLeftRadius' => '100px',
                    'progressWidth' => '75%',
                    'height' => '13px',
                    'labelWidth' => '75%',
                    'backgroundColorBase' => '#484848',
                    // 'backgroundImageOverlay' => 'linear-gradient(90deg, #f50 20%, #ffb000 100%)',
                    'backgroundColorOverlay' => '#06f',
                    'color' => '#2b2b2b',
                    'fontSize' => '15px',
                    'fontWeight' => '400',
                    'textAlign' => 'center',
                ),
            ),
        ),
        array(
            'title' => 'Preset 8',
            'thumb' => op3_asset('img/elements/progressbar/styles/style-8.png'),
            'options' => array(
                'all' => array(
                    'marginLeft' => 'auto',
                    'marginRight' => 'auto',
                    'html' => "<b>Step 1 of 2</b> - You're Almost There",
                    'backgroundStripes' => 'none',
                    'labelPlacement' => 'above',
                    'animationToggle' => '1',
                    'animationToggle2' => '0',
                    'labelSpacingBottom' => '10px',
                    'labelSpacingTop' => '10px',
                    'borderTopLeftRadius' => '100px',
                    'borderTopRightRadius' => '100px',
                    'borderBottomRightRadius' => '100px',
                    'borderBottomLeftRadius' => '100px',
                    'progressWidth' => '50%',
                    'height' => '13px',
                    'labelWidth' => '50%',
                    'backgroundColorBase' => '#6b6b6b',
                    'backgroundImageOverlay' => 'linear-gradient(90deg, #604ad4 0%, #917cff 100%)',
                    'backgroundColorOverlay' => '#604ad4',
                    'color' => '#3f3f3f',
                    'fontSize' => '19px',
                    'fontWeight' => '400',
                    'textAlign' => 'center',
                ),
            ),
        ),
        array(
            'title' => 'Preset 9',
            'thumb' => op3_asset('img/elements/progressbar/styles/style-9.png'),
            'options' => array(
                'all' => array(
                    'marginLeft' => 'auto',
                    'marginRight' => 'auto',
                    'html' => "<b>Step 1 of 2</b> - You're Almost There",
                    'backgroundStripes' => 'none',
                    'labelPlacement' => 'inside',
                    'animationToggle' => '1',
                    'animationToggle2' => '0',
                    'labelSpacingTop' => '5px',
                    'labelSpacingBottom' => '5px',
                    'borderTopLeftRadius' => '100px',
                    'borderTopRightRadius' => '100px',
                    'borderBottomRightRadius' => '100px',
                    'borderBottomLeftRadius' => '100px',
                    'progressWidth' => '75%',
                    'height' => '45px',
                    'labelWidth' => '75%',
                    'backgroundColorBase' => '#6b6b6b',
                    'backgroundImageOverlay' => 'linear-gradient(90deg, #604ad4 0%, #917cff 100%)',
                    'backgroundColorOverlay' => '#604ad4',
                    'color' => '#fff',
                    'fontSize' => '15px',
                    'fontWeight' => '400',
                    'textAlign' => 'center',
                ),
            ),
        ),
        array(
            'title' => 'Preset 10',
            'thumb' => op3_asset('img/elements/progressbar/styles/style-10.png'),
            'options' => array(
                'all' => array(
                    'marginLeft' => 'auto',
                    'marginRight' => 'auto',
                    'html' => '50% Complete',
                    'backgroundStripes' => 'wide-forward',
                    'labelPlacement' => 'inside',
                    'animationToggle' => '1',
                    'animationToggle2' => '0',
                    'labelSpacingTop' => '5px',
                    'labelSpacingBottom' => '5px',
                    'borderTopLeftRadius' => '0px',
                    'borderTopRightRadius' => '0px',
                    'borderBottomRightRadius' => '0px',
                    'borderBottomLeftRadius' => '0px',
                    'progressWidth' => '50%',
                    'height' => '45px',
                    'labelWidth' => '50%',
                    'backgroundColorBase' => '#f0f0f0',
                    // 'backgroundImageOverlay' => 'linear-gradient(90deg, #604ad4 0%, #917cff 100%)',
                    'backgroundColorOverlay' => '#008ae3',
                    'color' => '#fff',
                    'fontSize' => '16px',
                    'fontWeight' => '400',
                    'textAlign' => 'center',
                ),
            ),
        ),
        array(
            'title' => 'Preset 11',
            'thumb' => op3_asset('img/elements/progressbar/styles/style-11.png'),
            'options' => array(
                'all' => array(
                    'marginLeft' => 'auto',
                    'marginRight' => 'auto',
                    'html' => 'Setup Process... 75% Complete',
                    'backgroundStripes' => 'wide-backward',
                    'labelPlacement' => 'inside',
                    'animationToggle' => '1',
                    'animationToggle2' => '0',
                    'labelSpacingTop' => '5px',
                    'labelSpacingBottom' => '5px',
                    'borderTopLeftRadius' => '10px',
                    'borderTopRightRadius' => '10px',
                    'borderBottomRightRadius' => '10px',
                    'borderBottomLeftRadius' => '10px',
                    'progressWidth' => '75%',
                    'height' => '45px',
                    'labelWidth' => '75%',
                    'backgroundColorBase' => '#f0f0f0',
                    // 'backgroundImageOverlay' => 'linear-gradient(90deg, #604ad4 0%, #917cff 100%)',
                    'backgroundColorOverlay' => '#2adea4',
                    'color' => '#fff',
                    'fontSize' => '16px',
                    'fontWeight' => '400',
                    'textAlign' => 'center',
                ),
            ),
        ),
        array(
            'title' => 'Preset 12',
            'thumb' => op3_asset('img/elements/progressbar/styles/style-12.png'),
            'options' => array(
                'all' => array(
                    'marginLeft' => 'auto',
                    'marginRight' => 'auto',
                    'html' => 'Almost Complete...',
                    'backgroundStripes' => 'none',
                    'labelPlacement' => 'inside',
                    'animationToggle' => '0',
                    'animationToggle2' => '0',
                    'labelSpacingTop' => '5px',
                    'labelSpacingBottom' => '5px',
                    'borderTopLeftRadius' => '0px',
                    'borderTopRightRadius' => '0px',
                    'borderBottomRightRadius' => '0px',
                    'borderBottomLeftRadius' => '0px',
                    'progressWidth' => '50%',
                    'height' => '45px',
                    'labelWidth' => '50%',
                    'backgroundColorBase' => '#f5f5f5',
                    // 'backgroundImageOverlay' => 'linear-gradient(90deg, #604ad4 0%, #917cff 100%)',
                    'backgroundColorOverlay' => '#25ad2a',
                    'color' => '#fff',
                    'fontSize' => '16px',
                    'fontWeight' => '400',
                    'textAlign' => 'center',
                    'borderTopWidthBase' => '1px',
                    'borderTopStyleBase' => 'solid',
                    'borderTopColorBase' => 'rgba(33, 37, 41, 0.08)',
                    'borderBottomWidthBase' => '1px',
                    'borderBottomStyleBase' => 'solid',
                    'borderBottomColorBase' => 'rgba(33, 37, 41, 0.08)',
                    'borderLeftWidthBase' => '1px',
                    'borderLeftStyleBase' => 'solid',
                    'borderLeftColorBase' => 'rgba(33, 37, 41, 0.08)',
                    'borderRightWidthBase' => '1px',
                    'borderRightStyleBase' => 'solid',
                    'borderRightColorBase' => 'rgba(33, 37, 41, 0.08)',
                ),
            ),
        ),
        array(
            'title' => 'Preset 13',
            'thumb' => op3_asset('img/elements/progressbar/styles/style-13.png'),
            'options' => array(
                'all' => array(
                    'marginLeft' => 'auto',
                    'marginRight' => 'auto',
                    'html' => '50% Complete...',
                    'backgroundStripes' => 'wide-forward',
                    'labelPlacement' => 'inside',
                    'animationToggle' => '1',
                    'animationToggle2' => '0',
                    'labelSpacingTop' => '5px',
                    'labelSpacingBottom' => '5px',
                    'borderTopLeftRadius' => '10px',
                    'borderTopRightRadius' => '10px',
                    'borderBottomRightRadius' => '10px',
                    'borderBottomLeftRadius' => '10px',
                    'progressWidth' => '50%',
                    'height' => '40px',
                    'labelWidth' => '50%',
                    'backgroundColorBase' => '#e8e8e8',
                    'backgroundImageOverlay' => 'linear-gradient(90deg, #0014ff 0%, #ff0090 100%)',
                    'backgroundColorOverlay' => '#0014ff',
                    'color' => '#fff',
                    'fontSize' => '13px',
                    'fontWeight' => '700',
                    'textAlign' => 'left',
                    'textTransform' => 'uppercase',
                    'letterSpacing' => '1.5px',
                ),
            ),
        ),
        array(
            'title' => 'Preset 14',
            'thumb' => op3_asset('img/elements/progressbar/styles/style-14.png'),
            'options' => array(
                'all' => array(
                    'marginLeft' => 'auto',
                    'marginRight' => 'auto',
                    'html' => '<span style="color: rgb(33, 37, 41);">Almost There...</span> 50% Complete',
                    'backgroundStripes' => 'wide-backward',
                    'labelPlacement' => 'above',
                    'animationToggle' => '1',
                    'animationToggle2' => '0',
                    'labelSpacingTop' => '5px',
                    'labelSpacingBottom' => '5px',
                    'borderTopLeftRadius' => '100px',
                    'borderTopRightRadius' => '100px',
                    'borderBottomRightRadius' => '100px',
                    'borderBottomLeftRadius' => '100px',
                    'progressWidth' => '50%',
                    'height' => '13px',
                    'labelWidth' => '50%',
                    'backgroundColorBase' => '#bbd6ff',
                    // 'backgroundImageOverlay' => 'linear-gradient(90deg, #0014ff 0%, #ff0090 100%)',
                    'backgroundColorOverlay' => '#06f',
                    'color' => '#06f',
                    'fontSize' => '20px',
                    'fontWeight' => '700',
                    'textAlign' => 'left',
                ),
            ),
        ),
        array(
            'title' => 'Preset 15',
            'thumb' => op3_asset('img/elements/progressbar/styles/style-15.png'),
            'options' => array(
                'all' => array(
                    'marginLeft' => 'auto',
                    'marginRight' => 'auto',
                    'html' => '$50,000 <span style="color: rgb(175, 175, 175);">of $100k goal</span>',
                    // <span style="color: rgb(33, 37, 41);">$50,000 </span><span style="color: rgb(175, 175, 175);">of $100k goal</span>
                    'backgroundStripes' => 'wide-backward',
                    'labelPlacement' => 'above',
                    'animationToggle' => '1',
                    'animationToggle2' => '0',
                    'labelSpacingTop' => '5px',
                    'labelSpacingBottom' => '5px',
                    'borderTopLeftRadius' => '100px',
                    'borderTopRightRadius' => '100px',
                    'borderBottomRightRadius' => '100px',
                    'borderBottomLeftRadius' => '100px',
                    'progressWidth' => '50%',
                    'height' => '6px',
                    'labelWidth' => '50%',
                    'backgroundColorBase' => '#ebebeb',
                    // 'backgroundImageOverlay' => 'linear-gradient(90deg, #0014ff 0%, #ff0090 100%)',
                    'backgroundColorOverlay' => '#5bded5',
                    'color' => '#212529',
                    'fontSize' => '16px',
                    'fontWeight' => '700',
                    'textAlign' => 'left',
                ),
            ),
        ),
        array(
            'title' => 'Preset 16',
            'thumb' => op3_asset('img/elements/progressbar/styles/style-16.png'),
            'options' => array(
                'all' => array(
                    'marginLeft' => 'auto',
                    'marginRight' => 'auto',
                    'html' => 'Onboarding Progress',
                    'backgroundStripes' => 'none',
                    'labelPlacement' => 'above',
                    'animationToggle' => '1',
                    'animationToggle2' => '0',
                    'labelSpacingBottom' => '8px',
                    'labelSpacingTop' => '8px',
                    'borderTopLeftRadius' => '100px',
                    'borderTopRightRadius' => '100px',
                    'borderBottomRightRadius' => '100px',
                    'borderBottomLeftRadius' => '100px',
                    'progressWidth' => '50%',
                    'height' => '12px',
                    'labelWidth' => '50%',
                    'backgroundColorBase' => '#d8d8d8',
                    // 'backgroundImageOverlay' => 'linear-gradient(90deg, #0014ff 0%, #ff0090 100%)',
                    'backgroundColorOverlay' => '#6a3ccf',
                    'color' => '#6a3ccf',
                    'fontSize' => '17px',
                    'fontWeight' => '400',
                    'textAlign' => 'left',
                ),
            ),
        ),
        array(
            'title' => 'Preset 17',
            'thumb' => op3_asset('img/elements/progressbar/styles/style-17.png'),
            'options' => array(
                'all' => array(
                    'marginLeft' => 'auto',
                    'marginRight' => 'auto',
                    'html' => '<span style="color: rgb(31, 31, 31);"><b>Your Progress:</b></span> Step 1 of 2',
                    'backgroundStripes' => 'none',
                    'labelPlacement' => 'above',
                    'animationToggle' => '1',
                    'animationToggle2' => '0',
                    'labelSpacingBottom' => '8px',
                    'labelSpacingTop' => '8px',
                    'borderTopLeftRadius' => '100px',
                    'borderTopRightRadius' => '100px',
                    'borderBottomRightRadius' => '100px',
                    'borderBottomLeftRadius' => '100px',
                    'progressWidth' => '50%',
                    'height' => '12px',
                    'labelWidth' => '50%',
                    'backgroundColorBase' => '#e9e9e9',
                    'backgroundImageOverlay' => 'linear-gradient(90deg, #f9042a 0%, #fe2a91 100%)',
                    'backgroundColorOverlay' => '#f9042a',
                    'color' => '#f9042a',
                    'fontSize' => '19px',
                    'fontWeight' => '400',
                    'textAlign' => 'left',
                ),
            ),
        ),
        array(
            'title' => 'Preset 18',
            'thumb' => op3_asset('img/elements/progressbar/styles/style-18.png'),
            'options' => array(
                'all' => array(
                    'marginLeft' => 'auto',
                    'marginRight' => 'auto',
                    'html' => 'You\'re Almost There - <span style="color: rgb(158, 158, 158);">Step 1 of 2 Complete</span>',
                    'backgroundStripes' => 'none',
                    'labelPlacement' => 'above',
                    'animationToggle' => '1',
                    'animationToggle2' => '0',
                    'labelSpacingBottom' => '10px',
                    'labelSpacingTop' => '10px',
                    'borderTopLeftRadius' => '0px',
                    'borderTopRightRadius' => '0px',
                    'borderBottomRightRadius' => '0px',
                    'borderBottomLeftRadius' => '0px',
                    'progressWidth' => '50%',
                    'height' => '12px',
                    'labelWidth' => '50%',
                    'backgroundColorBase' => '#e9ecf0',
                    // 'backgroundImageOverlay' => 'linear-gradient(90deg, #f9042a 0%, #fe2a91 100%)',
                    'backgroundColorOverlay' => '#6fc754',
                    'color' => '#2e2e2e',
                    'fontSize' => '16px',
                    'fontWeight' => '600',
                    'textAlign' => 'left',
                ),
            ),
        ),
        array(
            'title' => 'Preset 19',
            'thumb' => op3_asset('img/elements/progressbar/styles/style-19.png'),
            'options' => array(
                'all' => array(
                    'marginLeft' => 'auto',
                    'marginRight' => 'auto',
                    'html' => '75% Complete',
                    'backgroundStripes' => 'none',
                    'labelPlacement' => 'inside',
                    'animationToggle' => '1',
                    'animationToggle2' => '0',
                    'labelSpacingTop' => '5px',
                    'labelSpacingBottom' => '5px',
                    'borderTopLeftRadius' => '10px',
                    'borderTopRightRadius' => '10px',
                    'borderBottomRightRadius' => '10px',
                    'borderBottomLeftRadius' => '10px',
                    'progressWidth' => '75%',
                    'height' => '50px',
                    'labelWidth' => '75%',
                    'backgroundColorBase' => '#e9ecf0',
                    'backgroundImageOverlay' => 'linear-gradient(90deg, #f58373 0%, #ef3a43 100%)',
                    'backgroundColorOverlay' => '#f58373',
                    'color' => '#fff',
                    'fontSize' => '15px',
                    'fontWeight' => '700',
                    'textAlign' => 'right',
                ),
            ),
        ),
        array(
            'title' => 'Preset 20',
            'thumb' => op3_asset('img/elements/progressbar/styles/style-20.png'),
            'options' => array(
                'all' => array(
                    'marginLeft' => 'auto',
                    'marginRight' => 'auto',
                    'html' => '75% Complete',
                    'backgroundStripes' => 'none',
                    'labelPlacement' => 'above',
                    'animationToggle' => '1',
                    'animationToggle2' => '0',
                    'labelSpacingBottom' => '8px',
                    'labelSpacingTop' => '8px',
                    'borderTopLeftRadius' => '10px',
                    'borderTopRightRadius' => '10px',
                    'borderBottomRightRadius' => '10px',
                    'borderBottomLeftRadius' => '10px',
                    'progressWidth' => '75%',
                    'height' => '17px',
                    'labelWidth' => '75%',
                    'backgroundColorBase' => '#e9ecf0',
                    'backgroundImageOverlay' => 'linear-gradient(90deg, #2ce1b0 0%, #27cbd8 100%)',
                    'backgroundColorOverlay' => '#2ce1b0',
                    'color' => '#585858',
                    'fontSize' => '15px',
                    'fontWeight' => '700',
                    'textAlign' => 'right',
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
        'all' => array('html', 'backgroundStripes', 'labelPlacement', 'animationToggle', 'animationToggle2'),
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
    'objectClass' => 'ProgressBar',

    /**
     * Size of the thumbs in the Style picker
     * full (default, when no value is
     * defined), medium (50%)
     * or small (33%)
     */
    'thumbSize' => null,
);
