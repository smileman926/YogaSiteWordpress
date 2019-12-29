/**
 * OptimizePress3 designer:
 * page builder.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-elements.js
 *     - op3-ajax.js
 */
;(function($, window, document) {

    "use strict";

    // extending window.OP3.Designer
    var that = window.OP3.Designer;

    /**
     * Empty element plus icon click
     * event handler
     *
     * @param  {Object} e
     * @return {Void}
     */
    that._handleEmptyChildlistClick = function(e) {
        // click coordinates
        var x = e.offsetX;
        var y = e.offsetY;

        // get pseudo element box
        var style = window.getComputedStyle(this, "::before");
        var left = parseInt(style.left);
        var top = parseInt(style.top);
        var width = parseInt(style.width);
        var height = parseInt(style.height);

        var transform = style.transform.match(/matrix\(([-+]?[0-9]*[.,]?[0-9]+),\s*([-+]?[0-9]*[.,]?[0-9]+),\s*([-+]?[0-9]*[.,]?[0-9]+),\s*([-+]?[0-9]*[.,]?[0-9]+),\s*([-+]?[0-9]*[.,]?[0-9]+),\s*([-+]?[0-9]*[.,]?[0-9]+)\)/);
        if (transform) {
            // if transform is not equal matrix(1, 0, 0, 1, X, Y)
            // this won't be accurate (do not set transform
            // other than translateX/translateY in css)
            left += transform[5]*1;
            top += transform[6]*1;
        }

        // pseudo clicked
        var hit = true
            && x > left && x < left + width
            && y > top && y < top + height;
        if (!hit)
            return;

        // click on first button
        // @todo - create method in OP3.LiveEditor
        OP3.LiveEditor.$ui.sidebarTabs.find(".op3-tabs [data-tab]:first").click();
    };

    // autoinit
    $(document).on("mousedown", '#op3-designer-element [data-op3-children="0"]', that._handleEmptyChildlistClick);

})(jQuery, window, document);
