/**
 * OptimizePress3 linkEvergreen property.
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.LinkEvergreen = OP3.defineClass({

        Name: "OP3.Property.LinkEvergreen",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "linkEvergreen",

            _defaults: {
                label: function() {
                    return OP3._("Link Evergreen");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: [
                    { "none": "None" },
                ],
                dataAttribute: "data-op3-link-evergreen",
            },

            _forceComputed: true,

            computed: function() {
                var value = $(this.target()).attr(this._defaults.dataAttribute);
                var evergreen = value.split(":");
                var pageId = evergreen[0] ? evergreen[0] : null;
                var elementId = evergreen[1] ? evergreen[1] : null;
                var exists = OP3.ElementStorage.find(pageId, elementId);

                if (!exists)
                    return "none";

                return exists.pageId + ":" + exists.uuid;
            },

            setter: function(value, media) {
                $(this.target()).attr(this._defaults.dataAttribute, value);
            },

        },

    });

    var defaultOptions = $.merge([], OP3.Elements._extension.prop.LinkEvergreen.prototype._defaults.options);

    OP3.bind("loadelementstorage", function(e, o) {
        // Dynamic options
        OP3.Elements._extension.prop.LinkEvergreen.prototype._defaults.options = function() {
            // Get all saved evergreen countdown timers and append it to select
            var evergreens = OP3.ElementStorage.getAllElementsByType("evergreencountdowntimer");
            var options = defaultOptions.concat(
                evergreens
                    // First remove evergreens on current page from list
                    .filter(function(item) {
                        return item.pageId != OP3.Meta.pageId;
                    })
                    .map(function(item) {
                        var map = {};
                        map[item.pageId + ":" + item.uuid] = 'Evergreen "' + item.uuid + '" on page "' + item.pageTitle + '"';

                        return map;
                    })
            );

            return options;
        }
    });

})(jQuery, window, document);
