/**
 * OptimizePress3 WrapColumns property.
 *
 * Can be set to column and row, but
 * we manipulate it only on the row.
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.WrapColumns = OP3.defineClass({

        Name: "OP3.Property.WrapColumns",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "wrapColumns",

            _defaults: {
                label: function() {
                    return OP3._("Wrap Columns");
                },
                selector: " > [data-op3-children]",
                tag: "select",
                attr: {
                    "data-property-type": "boolean",
                },
                options: [
                    { "0": "No" },
                    { "1": "Yes" },
                ],
                // serialize: false,
            },

            _forceComputed: true,

            proxy: function() {
                if (this.hasOwnProperty("_proxy"))
                    return this._proxy;

                // if column is selected, we want to
                // check the parent's property value
                var element = OP3.$(this.element).closestHorizontal();
                if (!element.is(this.element))
                    this._proxy = element.element().findProperty(this._id);
                else
                    this._proxy = this;

                return this.proxy();
            },

            computed: function() {
                return $(this.proxy().target()).attr("data-op3-wrap-columns") || "0";
            },

            setter: function(value, media) {
                if (this.proxy() !== this)
                    return this.proxy().element.setOption(this.proxy().id(), value, media);

                $(this.proxy().target()).attr("data-op3-wrap-columns", value);
            },

        },

    });

    // Make sure column handlers are working ok,
    // when column wrap is disabled
    OP3.bind("elementchange::*::wrapColumns", function(e, o) {
        if (o.value.after !== "0")
            return;

        var el = OP3.$(o.node);
        var wrap = el.element().babysitter();
        var win = wrap.ownerDocument.defaultView;
        var lib = win.jQuery(wrap).data("jquery-flex-grid-cell-sizer");

        if (lib)
            lib.normalize();
    });

})(jQuery, window, document);
