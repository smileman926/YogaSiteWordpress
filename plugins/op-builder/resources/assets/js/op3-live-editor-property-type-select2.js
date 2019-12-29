/**
 * OptimizePress3 element type:
 * op3 property type select manipulation.
 */
;(function($, window, document) {

    "use strict";

    /**
     * CSS selector
     *
     * @type {String}
     */
    var _selector = '[data-property-type="select2"]';
    var _selectorSimple = '[data-property-type="select2-simple"]';
    var _selectorPaginate = '[data-property-type="select2-paginate"]';

    /**
     * Option render
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _render = function(e, o) {
        var options = {
            width: "100%",
            templateResult: _format,
            templateSelection: _format,
        }

        $(o.parent).find(_selector).each(function() {
            var $prop = $(this).closest(".op3-element-options-property")
            var propertyName = $prop.attr("data-op3-element-options-property-name");
            var propertyId = $prop.attr("data-op3-element-options-property-id");

            // default select2 functionality
            $(this).select2($.extend({}, options, {
                dropdownParent: $(this).closest("[data-op3-element-options-type]"),
                dropdownCssClass: propertyName + " " + propertyId,
            }));
        });

        $(o.parent).find(_selectorSimple).each(function() {
            var $prop = $(this).closest(".op3-element-options-property")
            var propertyName = $prop.attr("data-op3-element-options-property-name");
            var propertyId = $prop.attr("data-op3-element-options-property-id");

            // simple select2 functionality
            $(this).select2($.extend({}, options, {
                dropdownParent: $(this).closest("[data-op3-element-options-type]"),
                dropdownCssClass: "select2-simple " + propertyName + " " + propertyId,
                containerCssClass: "select2-simple",
            }));
        });

        $(o.parent).find(_selectorPaginate).each(function() {
            var $prop = $(this).closest(".op3-element-options-property")
            var propertyName = $prop.attr("data-op3-element-options-property-name");
            var propertyId = $prop.attr("data-op3-element-options-property-id");

            // default select2 functionality
            $(this).select2($.extend({}, options, {
                ajax:{},
                dataAdapter: $.fn.select2.amd.require("CustomDataAdapter"),
                dropdownParent: $(this).closest("[data-op3-element-options-type]"),
                dropdownCssClass: "select2-paginate " + propertyName + " " + propertyId,
            }));
        });
    }

    /**
     * Clean:
     * on select2.open library prevents parent
     * scroll, we need to remove this before
     * detaching form
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _clean = function(e, o) {
        $(o.parent)
            .find(_selector + "," + _selectorSimple + "," + _selectorPaginate)
                .select2("close");
    }

    /**
     * Select2 template format
     *
     * @param  {Object} state
     * @param  {Object} element
     * @return {Void}
     */
    var _format = function(state, element) {
        var result = state.text;

        if (state && state.element) {
            var format = state.element.getAttribute("data-format");
            if (format)
                result = format;
        }

        if (result.substr(0,1) === "<")
            result = $(result);

        return result;
    }

    // After changing the selected option, scrolling is not working
    // https://github.com/select2/select2/issues/3125
    // Currently can only be reproduced on Sections -> Categories change
    $.fn.select2.amd.require([
            "select2/dropdown/attachBody",
            "select2/utils"
        ],
        function (AttachBody, Utils) {
            AttachBody.prototype._attachPositioningHandler = function (decorated, container) {
                var self = this;
                var scrollEvent = "scroll.select2." + container.id;
                var resizeEvent = "resize.select2." + container.id;
                var orientationEvent = "orientationchange.select2." + container.id;
                var $watchers = this.$container.parents().filter(Utils.hasScroll);

                $watchers.each(function () {
                    $(this).data("select2-scroll-position", {
                        x: $(this).scrollLeft(),
                        y: $(this).scrollTop()
                    });
                });

                $watchers.on(scrollEvent, function (ev) {
                    var position = $(this).data("select2-scroll-position");
                    $(self).scrollTop(position.y); // patch: this => self
                });

                $(window).on(scrollEvent + " " + resizeEvent + " " + orientationEvent,
                    function (e) {
                        self._positionDropdown();
                        self._resizeDropdown();
                    }
                );
            }
        }
    );

    // Custom Adapter for paginating local data.
    $.fn.select2.amd.define("CustomDataAdapter", [
            "select2/data/array",
            "select2/utils",
        ],
        function (ArrayData, Utils) {
            function CustomDataAdapter($element, options) {
                CustomDataAdapter.__super__.constructor.call(this, $element, options);
            }

            Utils.Extend(CustomDataAdapter, ArrayData);

            CustomDataAdapter.prototype.query = function(params, callback) {
                if (!("page" in params)) {
                    params.page = 1;
                }

                var pageSize = 50;
                var $element = this.$element;
                var $form = $element.closest("form");
                var results = $element.children();

                // matcher (from data attribute)
                var matcher = $element.attr("data-filter-method");
                if (matcher) {
                    var fn = window;
                    var arr = matcher.split(".");
                    while(fn && arr.length) {
                        fn = fn[arr.shift()];
                    }

                    if (typeof fn === "function")
                        matcher = fn;
                    else
                        matcher = null;
                }
                if (matcher)
                    results = results
                        .filter(function() {
                            return matcher.apply(null, [ $form.get(0), $element.get(0), this ]);
                        });

                // search
                results = results.filter(function() {
                    var term = params.term;
                    if (!term)
                        return true;

                    var pattern = OP3.$.escapeRegExp(term);
                    var re = new RegExp(pattern, "i");

                    return re.test(this.innerText);
                });

                // convert to object
                results = results.map(function() {
                    var $this = $(this);

                    return {
                        id: $this.attr("value"),
                        text: $this.attr("data-format") || $this.text(),
                    }
                });

                callback({
                    results: results.get().slice((params.page - 1) * pageSize, params.page * pageSize),
                    pagination: {
                        more:results.length >= params.page * pageSize
                    },
                });
            };

            CustomDataAdapter.prototype.matcher = function(params, data) {
                return data;
            };

            return CustomDataAdapter;
        }
    );

    // init
    OP3.bind("elementoptionsrefresh", _render);
    OP3.bind("elementoptionsformdetach", _clean);

})(jQuery, window, document);
