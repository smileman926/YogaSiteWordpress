/**
 * OptimizePress3 element.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-elements.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.OptinGdprFieldNote = OP3.defineClass({

        Name: "OP3.Property.OptinGdprFieldNote",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "optinGdprFieldNote",

            _defaults: {
                label: function() {
                    return OP3._("Field for GDPR note");
                },
                selector: ' [name="optin-gdpr-field-note"]',
                tag: function() {
                    var source = this._tagSource();
                    if (source)
                        return "select";

                    return "input";
                },
                attr: function() {
                    var source = this._tagSource();
                    if (source)
                        return {
                            "data-property-type": "select2-paginate",
                        };

                    return {};
                },
                options: function() {
                    var source = this._tagSource();
                    if (source)
                        return source;

                    return [];
                },
            },

            _forceComputed: true,

            _tagSource: function() {
                var proxy = this.proxy();
                var valueIntegration = proxy.integration.getter();
                var valueList = proxy.list.getter();
                var valueTag = proxy.tag.getter();
                var integration = OP3.Integrations.find(valueIntegration);
                var tagSource = integration.gdprNotes;
                if (tagSource !== "fields")
                    return null;

                var source = integration[tagSource];

                var result = [
                    { "": "(None)" },
                ];
                $.merge(result, (source || []).map(function(item) {
                    var key = item.id;
                    var val = item.label || item.name;

                    var map = {};
                    map[key] = val;

                    return map;
                }));

                return result;
            },

            proxy: function() {
                if (this.hasOwnProperty("_proxy"))
                    return this._proxy;

                // this is not actualy proxy property,
                // but a properties we need...
                this._proxy = {
                    integration: this.element.findProperty("optinIntegration"),
                    list: this.element.findProperty("optinList"),
                    tag: this.element.findProperty("optinTag"),
                }

                return this.proxy();
            },

            computed: function() {
                return $(this.target()).val() || "";
            },

            setter: function(value, media) {
                $(this.target()).val(value || "");
            },

        },

    });

})(jQuery, window, document);
