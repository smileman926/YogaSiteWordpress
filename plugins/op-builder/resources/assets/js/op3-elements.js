/**
 * OptimizePress3 element type:
 * op3 element manipulation for each
 * element type.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-query.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * Default CSS display properties
     * for each element type
     *
     * @type {Object}
     */
    var _defaultCssDisplay = {
        //section: "flex"
    }

    /**
     * window.OP3.Elements object
     *
     * @type {Object}
     */
    var that = {

        /**
         * List of element categories
         * append item after API request
         *
         * @type {Array}
         */
        _categories: [],

        /**
         * List of element types
         * append item after API request
         *
         * @type {Array}
         */
        _types: [],

        /**
         * List of element uuids
         * append on op3 element init
         *
         * @type {Array}
         */
        _uuids: [],

        /**
         * Op3 elements extensions
         *
         * @type {Object}
         */
        _extension: {
            type: {},
            prop: {},
        },

        /**
         * List of op3 elements extension types
         *
         * @type {Array}
         */
        listExtensionTypes: function() {
            return Object.keys(that._extension.type).map(function(e) {
                return that._extension.type[e].prototype._type;
            });
        },

        /**
         * List of op3 elements extension properties
         *
         * @type {Array}
         */
        listExtensionProps: function() {
            return Object.keys(that._extension.prop).map(function(e) {
                return that._extension.prop.Default.prototype._name;
            });
        },

        /**
         * Get element config by type
         *
         * @param  {String} type
         * @param  {String} style (optional)
         * @return {Object}
         */
        config: function(type, style) {
            var result = null;

            // find element config by type
            for (var i in that._types) {
                if (that._types[i].type === type) {
                    result = that._types[i];
                    break;
                }
            }

            // search for specific style
            if (result && style && result.styles) {
                for (var i in result.styles) {
                    if (style === "*" || result.styles[i] && result.styles[i].id === style) {
                        result = $.extend({}, result, {
                            style: result.styles[i]
                        });

                        break;
                    }
                }
            }

            // found?
            if (result && style && style !== "*") {
                if (result.style) {
                    delete result.styles;
                }
                else {
                    result = null;
                }
            }

            return result;
        },

        /**
         * Create new element
         *
         * @param  {String} type
         * @param  {String} style (optional)
         * @return {Object}
         */
        create: function(type, style) {
            return OP3.$('<' + type + (style ? ' style="' + style + '"' : '') + ' />').get();
        },

        /**
         * Element properties
         *
         * @return {Object}
         */
        serialize: function() {
            return OP3.$.serialize();
        },

        /**
         * Get default CSS default property
         * for specific element type
         *
         * @param  {String} type
         * @return {String}
         */
        getDefaultCssDisplay: function(type) {
            if (type in _defaultCssDisplay)
                return _defaultCssDisplay[type];

            var $node = OP3.$("<" + type + " />").jq();
            $node
                .css("visibility", "hidden")
                .css("height", "0")
                .appendTo(OP3.Designer.$ui.babysitter);
            _defaultCssDisplay[type] = $node.css("display");
            $node.remove();

            return that.getDefaultCssDisplay(type);
        },

    };

    // globalize
    window.OP3.Elements = that;

    // import categories/types from initial ajax request
    OP3.bind("loadajaxinit", function(e, o) {
        that._categories = o.element_categories;
        that._types = o.elements;
    });

})(jQuery, window, document);
