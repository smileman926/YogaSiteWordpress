/**
 * OptimizePress3 property type:
 * border-width manipulation
 */
;(function($, window, document) {

    "use strict";

    /**
     * Border style change event handler:
     * Force 1px when border-style is changed
     * from none to solid | dotted | dashed
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _handleBorderStyleChange = function(e, o) {
        var element       = OP3.$(o.node),
            borderWidthId = o.id.replace(/Style/, "Width"),
            borderWidth   = element.getOption(borderWidthId) || "0px";

        // Force border-width to 1px and border-color to black
        // when border-style is changed from none to something else
        if ((o.value.before === "none" || o.value.before === null) && borderWidth === "0px") {
            element.setOption(borderWidthId, "1px", "all");

            var borderColorId = o.id.replace(/Style/, "Color"),
                borderColor   = new Color(element.getOption(borderColorId, true));

            if (borderColor && borderColor._a === 0) {
                borderColor._a = 1;
                element.setOption(borderColorId, borderColor.toString(), "all");
            }
        }
        // Remove border-width if border-style is set to none
        else if (o.value.after === "none")
            element.setOption(borderWidthId, "0px", "all");

        // In case all border is active
        // refresh it's color and width
        if (o.name === "borderAllStyle" || o.name === "borderAllStyleHover")
            _refreshProperty(o);
    }

    /**
     * Refresh property in sidebar and toolbar
     *
     * @param  {Object} o
     * @return {Void}
     */
    var _refreshProperty = function(o) {
        if (OP3.Designer.activeElement().node() !== o.node)
            return;

        // Refresh Width & Color properties by ID, related to the borderAllStyle
        OP3.transmit("elementoptionsrefreshrequest", { property: [ o.id.replace('Style', 'Width'), o.id.replace('Style', 'Color') ] });
    }

    // Bind events
    OP3.bind(
             "elementchange::*::borderTopStyle " +
             "elementchange::*::borderBottomStyle " +
             "elementchange::*::borderLeftStyle " +
             "elementchange::*::borderRightStyle " +
             "elementchange::*::borderAllStyle "
             , _handleBorderStyleChange);

})(jQuery, window, document);
