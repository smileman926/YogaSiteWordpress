/**
 * OptimizePress3 element type:
 * op3 element type range manipulation.
 */
;(function($, window, document) {

    "use strict";

    /**
     * CSS selector
     *
     * @type {String}
     */
    var _selector = '[data-property-type="range"]';

    // override default method(s) method
    var $dummy = $("<input />");
    var lib = $dummy.inputRange().data("jquery-input-range");
    var proto = lib.__proto__;

    /**
     * Change hook
     *
     * @return {Void}
     */
    proto._hookChange = function() {
        var $el = $(this._element),
            unit = this.unit(),
            data = this.options("data"),
            attr = data.alias[unit] || unit,
            min = $el.attr("data-min-" + attr) || 8,
            max = $el.attr("data-max-" + attr) || 150,
            step = $el.attr("data-step-" + attr) || 1,
            precision = $el.attr("data-precision-" + attr) || 0,
            avoidTextMax = $el.attr("data-avoid-text-max") || 0;


        this.options("min", min);
        this.options("max", max);
        this.options("step", step);
        this.options("precision", precision);
        this.options("avoidTextMax", avoidTextMax);
    }

    // execute change hook on render
    proto._hookRender = proto._hookChange;

    /**
     * Convert method
     *
     * @param  {Number} numeric
     * @param  {String} oldUnit
     * @param  {String} newUnit
     * @return {Object}
     */
    proto._convert  = function(numeric, oldUnit, newUnit) {
        if (oldUnit == newUnit)
            return {
                numeric: numeric*1,
            }

        // get property which contains valid
        // convert method
        var data = this.options("data");
        var element = OP3.Designer.activeElement();
        var prop = element.findProperty(data.property);
        if (!prop)
            return {
                numeric: numeric*1,
            }

        // defaults
        var $this = $(this._element);
        var attr = data.alias[newUnit] || newUnit;
        var min = $this.attr("data-min-" + attr),
            max = $this.attr("data-max-" + attr),
            step = $this.attr("data-step-" + attr),
            precision = $this.attr("data-precision-" + attr),
            value = prop._convert(newUnit, oldUnit, numeric);
        if (isNaN(min)) min = this.options("min");
        if (isNaN(max)) max = this.options("max");
        if (isNaN(step)) step = this.options("step");
        if (isNaN(precision)) precision = this.options("precision");

        // final result
        return {
            numeric: Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision),
            unit: newUnit,
            min: min,
            max: max,
            step: step,
            precision: precision,
        }
    }

    /**
     * Option render
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _render = function(e, o) {
        $(o.parent).find(_selector).each(function() {
            $(this)
                //.on("inputrangedragstart inputrangedragmove inputrangedragstop", function(e) {
                //    console.log(e.type);
                //})
                .on("inputrangedragstart", function(e) {
                    OP3.LiveEditor.$ui.body
                        .addClass("op3-input-range-dragging")
                        .addClass("op3-live-editor-pointer-events-off");
                })
                .on("inputrangedragstop", function (e) {
                    OP3.LiveEditor.$ui.body
                        .removeClass("op3-input-range-dragging")
                        .removeClass("op3-live-editor-pointer-events-off");
                })
                .inputRange({
                    data: {
                        property: $(this).attr("data-op3-element-options-property-id"),
                        element: null,
                        alias: {
                            "%": "percent",
                        }
                    }
                });
        });
    }

    // init
    OP3.bind("elementoptionsrefresh", _render);

})(jQuery, window, document);
