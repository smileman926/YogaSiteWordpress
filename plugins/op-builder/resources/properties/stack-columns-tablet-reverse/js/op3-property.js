/**
 * OptimizePress3 StackColumnsTabletReverse property
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
    OP3.Elements._extension.prop.StackColumnsTabletReverse = OP3.defineClass({

        Name: "OP3.Property.StackColumnsTabletReverse",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "stackColumnsTabletReverse",

            _defaults: {
                label: function() {
                    return OP3._("Reverse Columns Order");
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
                return $(this.proxy().target()).attr("data-op3-stack-columns-tablet-reverse") || "0";
            },

            setter: function(value, media) {
                if (this.proxy() !== this)
                    return this.proxy().element.setOption(this.proxy().id(), value, media);

                $(this.proxy().target()).attr("data-op3-stack-columns-tablet-reverse", value || "0");
            },

        },

    });

})(jQuery, window, document);
