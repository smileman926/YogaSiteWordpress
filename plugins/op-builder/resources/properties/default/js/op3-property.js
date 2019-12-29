/**
 * OptimizePress3 element.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-elements.js
 *     - op3-designer.js
 *     - op3-live-editor.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.Default = OP3.defineClass({

        Name: "OP3.Property.Default",

        Constructor: function(properties) {
            /**
             * OP3_Element_Type
             *
             * @type {Object}
             */
            this.element = null;

            /**
             * NodeList of elements on which
             * we're applying property to
             *
             * @type {Object}
             */
            this._target = null;

            /**
             * Option id. By default this is same as name
             * property. Each element option must have
             * unique id set. This is usefull when
             * element have the same property more
             * than once (for example '#element color'
             * and '#element:hover color').
             *
             * @type {String}
             */
            this._id = this.name();

            /**
             * Option label
             *
             * For advanced usage this can
             * be function. Use method
             * this._getLabel()
             *
             * @type {Mixed}
             */
            this._label = OP3._("Default");

            /**
             * Option HTML tag
             *
             * For advanced usage this can
             * be function. Use method
             * this._getTag()
             *
             * @type {Mixed}
             */
            this._tag = "input";

            /**
             * Option tag attributes
             *
             * For advanced usage this can
             * be function. Use method
             * this._getAttr()
             *
             * @type {Mixed}
             */
            this._attr = {};

            /**
             * Replace option values
             *
             * @type {Array}
             */
            this._replace = [];

            /**
             * Option enums
             * (used when tag is select)
             *
             * For advanced usage this can
             * be function. Use method
             * this._getOptions()
             *
             * @type {Mixed}
             */
            this._options = [];

            /**
             * Valid property keywords that don't require
             * a unit (eg. auto, initial, inherit, unset,
             * bold...)
             *
             * @type {Array}
             */
            this._keywords = [];

            /**
             * Valid property units
             *
             * For advanced usage this can
             * be function. Use method
             * this._getUnits()
             *
             * @type {Mixed}
             */
            this._units = [];

            /**
             * Default property unit:
             * convert value to this unit on
             * calculating computed value
             *
             * For advanced usage this can
             * be function. Use method
             * this._getDefaultUnit()
             *
             * @type {Mixed}
             */
            this._defaultUnit = "";

            /**
             * Option hidden
             *
             * @type {Boolean}
             */
            this._hidden = false;

            /**
             * Send this option to API
             *
             * @type {Boolean}
             */
            this._serialize = true;

            /**
             * CSS selector for element:
             * while querying css stylesheet on
             * element '#id{value}' selector
             * will be used. Commas will be
             * replaced with ', #id'.
             *
             * @type {String}
             */
            this._selector = "";

            /**
             * Computed fallback:
             * value to be used for rendering properties
             * when matching selector fails. Use this
             * ONLY FOR HIDDEN PROPERTIES. For example
             * element children color property can be
             * set if element has children, and property
             * widget hidden if element has no children
             * (in this case use computedFallback to
             * prevent exception)
             *
             * @type {String}
             */
            this._computedFallback = null;

            // set private properties from defaults
            var defaults = this._defaults;
            if (typeof defaults === "function")
                defaults = defaults.call(this);
            for (var prop in (defaults || {})) {
                if (this.hasOwnProperty("_" + prop))
                    this["_" + prop] = defaults[prop];
            }

            // set private properties from arguments
            for (var prop in (properties || {})) {
                if (this.hasOwnProperty("_" + prop))
                    this["_" + prop] = properties[prop];
            }
        },

        Prototype: {
            /**
             * Option name
             *
             * @return {Void}
             */
            _name: "default",

            /**
             * Default options
             *
             * @type {Mixed}
             */
            _defaults: {},

            /**
             * Force computed value instead getter. This
             * can be used for attribute properties where
             * we have the same property value for all
             * medias.
             *
             * IMPORTANT:
             * Setting this attribute to true doesn't mean
             * that getter will return computed style for
             * each media. It will return computed style
             * just for default media "all" and null for
             * other medias (so we don't get unnecessary
             * duplicated data on serializing document).
             *
             * @type {Boolean}
             */
            _forceComputed: false,

            /**
             * Predefined values:
             * if defined setter will try to find key in
             * this object and set all properties in it
             *
             * @type {Object}
             */
            _predefinedValues: {},

            /**
             * Skip setOption change validation:
             * setting this to true will skip change validation
             * on element's setOption method (will execute
             * setter no matter if property value has changed)
             *
             * @type {Boolean}
             */
            _skipSetOptionChangeValidation: false,

            /**
             * Get this._replace as object
             *
             * @return {Object}
             */
            _replacingValues: function() {
                var result = {};
                for (var i in this._replace) {
                    var key = Object.keys(this._replace[i])[0];
                    var val = this._replace[i][key];

                    result[key] = val;
                }

                return result;
            },

            /**
             * Get property label
             *
             * @param  {String} media (optional)
             * @return {String}
             */
            _getLabel: function(media) {
                if (typeof this._label === "function")
                    return this._label.call(this, media);

                return this._label;
            },

            /**
             * Get property tag
             *
             * @param  {String} media (optional)
             * @return {String}
             */
            _getTag: function(media) {
                if (typeof this._tag === "function")
                    return this._tag.call(this, media);

                return this._tag;
            },

            /**
             * Get property options
             *
             * @param  {String} media (optional)
             * @return {Array}
             */
            _getOptions: function(media) {
                if (typeof this._options === "function")
                    return this._options.call(this, media);

                return this._options;
            },

            /**
             * Get valid property units
             *
             * @param  {String} media (optional)
             * @return {Array}
             */
            _getUnits: function(media) {
                if (typeof this._units === "function")
                    return this._units.call(this, media);

                return this._units;
            },

            /**
             * Get default property unit
             *
             * @param  {String} media (optional)
             * @return {String}
             */
            _getDefaultUnit: function(media) {
                if (typeof this._defaultUnit === "function")
                    return this._defaultUnit.call(this, media);

                return this._defaultUnit;
            },

            /**
             * Get property attr
             *
             * @param  {String} media (optional)
             * @return {Array}
             */
            _getAttr: function(media) {
                if (typeof this._attr === "function")
                    return this._attr.call(this, media);

                return this._attr;
            },

            /**
             * Get object with current property values
             * defined in this._predefinedValues
             *
             * @param  {String} media       (optional)
             * @param  {String} useComputed (optional)
             * @return {Object}
             */
            _getPredefinedValues: function(media, useComputed) {
                media = media || OP3.LiveEditor.deviceMedia();
                useComputed = !!useComputed;

                var result = {};
                var predefinedValues = this._predefinedValues;
                Object.keys(predefinedValues).forEach(function(item) {
                    Object.keys(predefinedValues[item]).forEach(function(item) {
                        result[item] = null;
                    });
                });

                Object.keys(result).forEach(function(item) {
                    result[item] = this.element.getOption(item, media);

                    if (useComputed && result[item] === null)
                        result[item] = this.element.findProperty(item).computed();
                }.bind(this));

                return result;
            },

            /**
             * Compare predefined values with values in
             * data and return matched predefined ones
             *
             * @param  {Object} data
             * @return {Mixed}
             */
            _comparePredefinedValues: function(data) {
                for (var value in this._predefinedValues) {
                    var valid = true;

                    for (var prop in this._predefinedValues[value]) {
                        if (!(prop in data) || this._predefinedValues[value][prop] !== data[prop]) {
                            valid = false;
                            break;
                        }
                    }

                    if (valid)
                        return value;
                }

                return null;
            },

            /**
             * Render options (for select tag only)
             *
             * @param  {String} media (optional)
             * @return {Array}
             */
            _renderOptions: function(media) {
                var options = this._getOptions(media);
                var result = "";

                for (var j in options || []) {
                    var key = Object.keys(options[j])[0];
                    var val = Object.values(options[j])[0];
                    var html = val;
                    var attr = {
                        value: key,
                    };

                    if (typeof val === "object") {
                        html = val.html || val.title;
                        attr = $.extend({}, attr, val);
                    }

                    var $option = $("<option />")
                        .html(html);
                    for (var prop in attr) {
                        if (prop !== "html")
                            $option
                                .attr(prop, attr[prop]);
                    }

                    if (options[j].disabled)
                        $option.attr("disabled", options[j].disabled);

                    result += $option.get(0).outerHTML;
                }

                return result;
            },

            /**
             * Get valid options values
             *
             * @param  {String} media (optional)
             * @return {Array}
             */
            _validOptions: function(media) {
                var result = [];
                var options = this._getOptions()
                for (var i in options) {
                    result.push(Object.keys(options[i])[0]);
                }

                return result;
            },

            /**
             * Parse value/unit from value
             *
             * @param  {String} value
             * @return {Array}
             */
            _parseValueUnit: function(value) {
                var regex = new RegExp("^(\\-?\\d*\\.?\\d+)(.*)?$");
                var match = value.toString().match(regex);
                if (!match)
                    return [ value ];

                return [ match[1], match[2] || "" ];
            },

            /**
             * Convert value from one unit to another
             *
             * @param  {String} unitTo
             * @param  {String} unitFrom
             * @param  {Number} value     (optional)
             * @return {Number}
             */
            _convert: function(unitTo, unitFrom, value) {
                if (typeof value === "undefined")
                    value = this.getter(true);

                // For the most properties we want current element, but for % units,
                // and for the font-size, we want the parent element,
                // that's why in those properties/elements,
                // _convert method is overridden
                var $element = $(this.target());
                var $parent = $element.parent();

                // Percentage conversion is not included here, because
                // it is dependent on the parent property, and not
                // fixed. For example, width: 10%; is 10% of
                // the parent element's width.
                var property = this._cssPropertyName();

                if (unitFrom === unitTo)
                    value = parseFloat(value);
                else if (unitFrom === "px" && unitTo === "%")
                    value = parseFloat(value) / parseFloat($parent.css(property)) * 100;
                else if (unitFrom === "px" && unitTo === "em")
                    value = parseFloat(value) / parseFloat($element.css("font-size"));
                else if (unitFrom === "px" && unitTo === "rem")
                    value = parseFloat(value) / parseFloat($("html").css("font-size"));
                else if (unitFrom === "%" && unitTo === "px")
                    value = parseFloat(value) / 100 * parseFloat($parent.css(property));
                else if (unitFrom === "%" && unitTo === "em")
                    value = this._convert("em", "px", this._convert("px", "%", value));
                else if (unitFrom === "%" && unitTo === "rem")
                    value = this._convert("rem", "px", this._convert("px", "%", value));
                else if (unitFrom === "em" && unitTo === "px")
                    value = parseFloat(value) * parseFloat($element.css("font-size"));
                else if (unitFrom === "em" && unitTo === "%")
                    value = this._convert("%", "px", this._convert("px", "em", value));
                else if (unitFrom === "em" && unitTo === "rem")
                    value = this._convert("rem", "px", this._convert("px", "em", value));
                else if (unitFrom === "rem" && unitTo === "px")
                    value = parseFloat(value) * parseFloat($("html").css("font-size"));
                else if (unitFrom === "rem" && unitTo === "%")
                    value = this._convert("%", "px", this._convert("px", "rem", value));
                else if (unitFrom === "rem" && unitTo === "em")
                    value = this._convert("em", "px", this._convert("px", "rem", value));
                else if (unitFrom === "px" && unitTo === "vh")
                    value = (100 / window.innerHeight) * value;
                else if (unitFrom === "em" && unitTo === "vh")
                    value = (100 / window.innerHeight) * this._convert("px", "em", value);
                else if (unitFrom === "rem" && unitTo === "vh")
                    value = (100 / window.innerHeight) * this._convert("px", "rem", value);
                else if (unitFrom === "vh" && unitTo === "px")
                    value = value * (window.innerHeight / 100);
                else if (unitFrom === "vh" && unitTo === "em")
                    value = this._convert("em", "px", value * (window.innerHeight / 100));
                else if (unitFrom === "vh" && unitTo === "rem")
                    value = this._convert("rem", "px", value * (window.innerHeight / 100));
                else if (unitFrom === "hour" && unitTo === "min")
                    value = parseFloat(value) * 60;
                else if (unitFrom === "hour" && unitTo === "sec")
                    value = parseFloat(value) * 60 * 60;
                else if (unitFrom === "min" && unitTo === "hour")
                    value = parseFloat(value) / 60;
                else if (unitFrom === "min" && unitTo === "sec")
                    value = parseFloat(value) * 60;
                else if (unitFrom === "sec" && unitTo === "hour")
                    value = parseFloat(value) / 60 / 60;
                else if (unitFrom === "sec" && unitTo === "min")
                    value = parseFloat(value) / 60;

                // @todo - deg to rad/grad and vice-versa

                else
                    throw this.ns() + ": can't convert '" + unitFrom + "' to '" + unitTo + "'.";

                return value;
            },

            /**
             * Validate value unit:
             * convert to default unit if value is not
             * in keywords and value's unit is not in
             * valid unit list
             *
             * @param  {String} value
             * @param  {Array}  validUnits (optional)
             * @return {String}
             */
            _validateUnit: function(value, validUnits) {
                validUnits = validUnits || this._getUnits();

                if (value !== null && validUnits.length && this._keywords.indexOf(value) === -1) {
                    var parsedValue = this._parseValueUnit(value);
                    var currentUnit = parsedValue[1];
                    var defaultUnit = this._getDefaultUnit();

                    // wrong unit, convert to default one
                    if (validUnits.indexOf(currentUnit) === -1)
                        value = this._convert(defaultUnit, currentUnit, value) + defaultUnit;
                }

                return value;
            },

            /**
             * Replace values from defined list
             *
             * @param  {String} value
             * @return {String}
             */
            _doReplace: function(value) {
                if (value && this._replace.length) {
                    var arr = this._replacingValues();
                    if (value in arr)
                        value = arr[value];
                }

                return value;
            },

            /**
             * Getter value fix:
             * usefull when different browsers return
             * different results for css properties
             * (by default this method does nothing).
             *
             * @param  {Mixed} value
             * @return {Mixed}
             */
            _fix: function(value) {
                return value;
            },

            /**
             * CSSStyleDeclaration property must
             * be kebabcase
             *
             * @return {String}
             */
            _cssPropertyName: function() {
                return this.name().replace(/[A-Z]/g, function(match) {
                    return "-" + match.toLowerCase();
                });
            },

            /**
             * Get node and pseudo class from
             * target and selector
             *
             * @return {Object}
             */
            _parseTarget: function() {
                var $target = $(this.target()),
                    node = null,
                    pseudo = null;

                // set node as first target that matches
                // selector (checking pseudo elements)
                var id = this.element.selector().split(" ").pop(),
                    selectors = id + this._selector.split(",").join(", " + id);
                selectors.split(",").forEach(function(selector) {
                    if (node)
                        return;

                    var re = /\:+(before|after|placeholder|hover|active|visited|link|focus)/g;
                    var query = selector.replace(re, "");
                    node = $target.filter(query).get(0) || null;

                    if (node) {
                        var match = selector.match(/\:+(before|after|placeholder)/);
                        if (match)
                            pseudo = match[0];
                    }
                });

                return {
                    node: node,
                    pseudo: pseudo,
                }
            },

            /**
             * Get computed value
             *
             * @param  {Object} node
             * @param  {String} property
             * @param  {Mixed}  pseudo
             * @return {String}
             */
            _getComputedValue: function(node, property, pseudo) {
                var doc = node.ownerDocument,
                    win = doc.defaultView,
                    computed = win.getComputedStyle(node, pseudo);

                return computed.getPropertyValue(property);
            },

            /**
             * Get namespace
             *
             * @return {String}
             */
            ns: function() {
                var name = this.name();
                var prefix = "OP3.Elements._extension.prop"
                var suffix = name.charAt(0).toUpperCase() + name.slice(1);

                return prefix + "." + suffix;
            },

            /**
             * Get option id
             *
             * @return {String}
             */
            id: function() {
                return this._id;
            },

            /**
             * Get option name
             *
             * @return {String}
             */
            name: function() {
                return this._name;
            },

            /**
             * Get input type
             *
             * @return {String}
             * /
            type: function() {
                var attr = this._getAttr();
                return attr && attr.type ? attr.type : "text";
            },

            /**
             * Full CSS selector
             *
             * create selector, parse commas,
             * remove extra spaces and trim
             * right
             *
             * @return {String}
             */
            selector: function() {
                var prefix = this.element.selector();

                // element selector with property selector
                // (joined with comma)
                return prefix
                    + this._selector
                        .replace(/,/g, ", " + prefix)
                        .replace(/\s+/g, " ")
                        .replace(/\s+$/g, "");
            },

            /**
             * CSS selector to NodeList object
             *
             * The easyest way to do this would be
             * to use:
             *
             * >> return document.querySelectorAll(this.selector())
             *
             * ...but this won't work on detached elements
             * (and it's slow), so we're implementing better
             * child targeting using querySelectorAll on
             * this.element.node
             *
             * @return {Object}
             */
            target: function() {
                // already found, check if still attached
                if (this._target && this._target.length && document.documentElement.contains(this._target[0]))
                    return this._target;

                // empty selector means element node
                var selector = this._selector.replace(/\:+(before|after|placeholder|hover|active|visited|link|focus)/g, "");
                if (!selector)
                    return this.element.node();

                var $node = $(this.element.node());
                var id = "#" + $node.attr("id");
                if ($node.is(OP3.Designer.$ui.html.get(0)))
                    id = "html";

                selector = selector.split(",");
                var query = id + selector.join(", " + id);

                // using querySelectorAll which is (in our case)
                // much faster than jQuery's find method
                if (!$node.is(query))
                    this._target = $node.get(0).querySelectorAll(query);

                // querySelectorAll for #uuid.op3-element will fail
                else
                    this._target = $node.parent().get(0).querySelectorAll(query);

                return this._target;
            },

            /**
             * Can be usefull for easyer properties
             * manipulation (by default this
             * returns self)
             *
             * @return {Object}
             */
            proxy: function() {
                return this;
            },

            /**
             * Find CSSStyleDeclaration inside style
             * element(s) for specific media
             *
             * @param  {String}  media        (optional)
             * @param  {Boolean} createOnFail (optional)
             * @return {Object}
             */
            cssStyle: function(media, createOnFail) {
                // default media
                if (!media)
                    media = OP3.LiveEditor.deviceMedia();

                // rules should be in op3 element dom node
                // (jquery op3-stylesheet-rules data,
                // appended on DOMContentLoaded event)
                var $node = $(this.element.node());
                var rules = $node.data("op3-stylesheet-rules");

                // no rules, append empty object
                if (!rules) {
                    rules = {};
                    OP3.LiveEditor.forEachDevice(function(key, value) {
                        rules[value] = {};
                    });

                    $node.data("op3-stylesheet-rules", rules);
                }

                // search and return style
                var selector = this.selector();
                if (rules[media][selector])
                    return rules[media][selector].style;

                // not found
                if (!createOnFail)
                    return null;

                // if selector has :hover pseudo we need to
                // extend prefix (to make sure we can disable
                // it in live-editor view)
                var ruleSelector = selector;
                if (/\:hover/.test(selector))
                    ruleSelector = ruleSelector.replace(/#op3-designer-element/g, "#op3-designer-element:not(.op3-disable-hover)");

                // create empty rule
                var style = OP3.Designer.$ui.stylesheet.filter('[media="' + media + '"]').get(0) || {};
                var sheet = (style.sheet || style.styleSheet) || {};
                var index = sheet.insertRule(ruleSelector + " {}", 0);

                // we had problem with Google Tag Manager
                // wordpress plugin whose snippet decorated
                // CSSStyleSheet.prototype.insertRule without
                // returning index (result is undefined).
                // new rule should always be at index 0, so
                // lets check this...
                if (OP3.$.type(index) === "undefined") {
                    var pattern = OP3.$.escapeRegExp(ruleSelector) + "\\s?" + "{\\s?}";
                    var re = new RegExp(pattern);
                    if (re.test(sheet.cssRules[0].cssText))
                        index = 0;
                }

                // invalid index???
                if (OP3.$.type(index) === "undefined")
                    throw this.ns() + ": CSSStyleSheet.insertRule does not return valid index.";

                // new rule
                var rule = sheet.cssRules[index];
                rules[media][selector] = rule;

                return rule.style;
            },

            /**
             * Is current value null
             *
             * @param  {String}  media (optional)
             * @return {Boolean}
             */
            isNull: function(media) {
                return this.getter(media) === null;
            },

            /**
             * Is current value default one
             *
             * @param  {String}  media (optional)
             * @return {Boolean}
             */
            isDefault: function(media) {
                if (!OP3.LinkProperties || !(this.element.getOption("linkProperties", media)*1))
                    return this.isNull(media);

                var key = this.id();
                var node = this.element.node();
                var cousins = OP3.LinkProperties._cousins;
                if (node !== OP3.Designer.activeElement().node())
                    cousins = OP3.LinkProperties._getCousinsObject(node);

                if (cousins && cousins.config && cousins.config.parent && key in cousins.config.parent && cousins.links.is(this.element))
                    return cousins.owner.element().isOptionDefault(cousins.config.parent[key], media);

                return this.isNull(media);
            },

            /**
             * Create option element suitable
             * for live-editor sidebar
             *
             * @param  {String} media (optional)
             * @return {Object}
             */
            prerender: function(media) {
                var config = {
                    media: media || OP3.LiveEditor.deviceMedia(),
                    id: this._id,
                    name: this._name,
                    label: this._getLabel(),
                    style: this._hidden ? "display: none;" : "",
                    tag: this._getTag() || "input",
                    autocomplete: this._getTag() === "input" ? "autocomplete" : "data-autocomplete",
                    options: this._renderOptions(),
                }
                var template = ''
                    + '<div'
                    +   ' class="op3-element-options-property"'
                    +   ' style="{style}"'
                    +   ' data-op3-element-options-property-id="{id}"'
                    +   ' data-op3-element-options-property-name="{name}"'
                    +   ' data-op3-element-options-property-value="null"'
                    +   ' data-op3-element-options-property-default="null"'
                    +   ' data-op3-element-options-property-isnull="null"'
                    + '>'
                    +       '<div class="op3-element-options-label-group">'
                    +           '<label>{label}</label>'
                    +           '<a href="#" class="op3-element-options-property-reset" title="' + OP3._("Reset Property") + '">'
                    +               '<i class="op3-icon op3-icon-refresh-02-1"></i>'
                    +           '</a>'
                    +       '</div>'
                    +       '<{tag}'
                    +           ' class="op3-element-options-property-input"'
                    +           ' name="{id}"'
                    +           ' {autocomplete}="off"'
                    +           ' data-op3-element-options-property-id="{id}"'
                    +           ' data-op3-element-options-property-name="{name}"'
                    +           ' data-op3-element-options-property-media="{media}"'
                    +       '>'
                    +           '{options}'
                    +       '</{tag}>'
                    + '</div>';
                var html = OP3.$.templating(template, config);

                var $result = $(html);
                var $input = $result.find(".op3-element-options-property-input");
                var attr = this._getAttr();
                for (var j in attr || {}) {
                    $input.attr(j, attr[j]);
                }

                return $result.get(0);
            },

            /**
             * Create option element suitable
             * for live-editor sidebar with
             * property values set
             *
             * @param  {String} media (optional)
             * @return {Object}
             */
            render: function(media) {
                var result = this.prerender(media);
                var value = "";
                var isDefault = "0";
                var isNull = "0";

                try {
                    value = this.getter(media);
                    if (value === null)
                        value = this.computed();
                    if (this.isDefault(media))
                        isDefault = "1";
                    if (this.isNull(media))
                        isNull = "1";
                }
                catch(e) {
                    // fallback
                }

                $(result)
                    .attr("data-op3-element-options-property-value", value)
                    .attr("data-op3-element-options-property-default", isDefault)
                    .attr("data-op3-element-options-property-isnull", isNull)
                    .find(".op3-element-options-property-input")
                        .attr(this._getTag() === "img" ? "src" : "data-src", value)
                        .removeAttr("data-src")
                        .val(value);

                return result;
            },

            /**
             * Reset option value to it's initial
             * state (usually null)
             *
             * @param  {String} media (optional)
             * @return {Object}
             */
            reset: function(media) {
                if (!this._serialize)
                    return;

                //  predefined options (from config.php)
                var element = this.element;
                var style = element.style();
                var config = element.config(style);
                var options = config.style ? config.style.options : config.options;

                // check if initial value is set in options
                // style and set the style to it or null
                media = media || OP3.LiveEditor.deviceMedia();
                var value = null;
                if (options && options[this._id] && (media === "all" || this._forceComputed))
                    value = options[this._id];

                // set it
                element.setOption(this.id(), value, media);
            },

            /**
             * Get computed css property
             *
             * @return {String}
             */
            computed: function() {
                if (Object.keys(this._predefinedValues).length) {
                    var data = this._getPredefinedValues(null, true);
                    var result = this._comparePredefinedValues(data);

                    // no match found, first value in options
                    // should be default one
                    if (result === null)
                        result = this._validOptions()[0] || null;

                    return result;
                }

                var parse = this._parseTarget(),
                    node = parse.node,
                    pseudo = parse.pseudo,
                    value = null;

                // no selector match
                if (!node && this._computedFallback !== null)
                    value = this._computedFallback;
                else if (!node)
                    throw this.ns() + ": can't find DOM element with selector '" + this._selector + "' (element " + this.element.type() + "#" + this.element.uuid() + " property " + this.id() + ").";

                // get computed style
                if (value === null)
                    value = this._getComputedValue(node, this._cssPropertyName(), pseudo);

                // fix, replace and validate
                value = this._fix(value);
                value = this._doReplace(value);
                value = this._validateUnit(value, this._getUnits().length ? [ this._getDefaultUnit() ] : []);

                return value;
            },

            /**
             * Getter method: get option value.
             *
             * @param  {String} media (optional)
             * @return {Void}
             */
            getter: function(media) {
                media = media || OP3.LiveEditor.deviceMedia();

                if (this._forceComputed) {
                    if (media === "all")
                        return this.computed();
                    else
                        return null;
                }

                // predefined values
                if (Object.keys(this._predefinedValues).length) {
                    var data = this._getPredefinedValues(media);
                    var result = this._comparePredefinedValues(data);

                    return result;
                }

                var style = this.cssStyle(media);
                var css = this._cssPropertyName();
                var value = (style ? style.getPropertyValue(css) : null) || null;

                // fix extra space prefix on css variables
                // created by backend
                if (value && css.substr(0, 2) === "--")
                    value = value.trim();

                // fix, replace and validate
                value = this._fix(value);
                value = this._doReplace(value);
                value = this._validateUnit(value);

                // default
                //var options = this._getOptions(media);
                //if (value && options.length) {
                //    var arr = this._validOptions(media);
                //    if (arr.indexOf(value) === -1)
                //        value = arr[0];
                //}

                // fix
                if (typeof value === "undefined")
                    value = null;

                return value;
            },

            /**
             * Setter method: set option value.
             *
             * Set css rule to stylesheet with
             * matching media attribute.
             *
             * @param  {Mixed}  value
             * @param  {String} media (optional)
             * @return {Void}
             */
            setter: function(value, media) {
                media = media || OP3.LiveEditor.deviceMedia();
                value = value || null;

                // predefined values
                if (Object.keys(this._predefinedValues).length) {
                    if (value in this._predefinedValues)
                        Object.keys(this._predefinedValues[value]).forEach(function(item) {
                            this.element.setOption(item, this._predefinedValues[value][item], media);
                        }.bind(this));

                    return;
                }

                // validate options
                var options = this._getOptions(media);
                if (value && options.length && this._validOptions(media).indexOf(value) === -1)
                    return;

                // fix, replace and validate
                try {
                    value = this._fix(value);
                    value = this._doReplace(value);
                    value = this._validateUnit(value);
                }
                catch(e) {
                    // do not throw exception on gibberish
                    return;
                }

                // find stylesheet
                var style, css = this._cssPropertyName();
                if (!value) {
                    style = this.cssStyle(media);

                    // no value, stylesheet not found,
                    // no need to do anything
                    if (!style)
                        return;
                }
                else
                    style = this.cssStyle(media, true);

                // ...and set stylesheet property
                style.setProperty(css, value);
            },
        },

    });

    // map each css to rule to it's element
    // node for easier op3 property access
    OP3.bind("devicesinit", function() {
        // empty object with media keys
        var empty = {};
        window.parent.OP3.LiveEditor.forEachDevice(function(key, value) {
            empty[value] = {};
        });

        // map each css rule for each element uuid
        var map = $.extend(true, {}, empty);
        for (var media in map) {
            var node = OP3.Designer.$ui.stylesheet.filter('[media="' + media + '"]').get(0) || {};
            var sheet = (node.sheet || node.styleSheet) || {};
            var rules = sheet.cssRules || [];

            for (var i = 0; i < rules.length; i++) {
                var rule = rules[i];
                var selector = rule.selectorText;
                var re = /^(#op3-designer-element)(\S*)(\s+)(#op3-element-)(.+?)\b/;

                var uuid = "html";
                var match = selector.match(re);
                if (match)
                    uuid = match[5];
                if (!(uuid in map[media]))
                    map[media][uuid] = {};

                //selector = selector.replace(re, "$1$3$4$5");
                selector = selector.replace(/#op3-designer-element\S+/g, "#op3-designer-element");
                map[media][uuid][selector] = rule;
            }
        }

        // save op3 document's rules to jquery's data
        $("html").each(function() {
            var $node = $(this);
            var uuid = "html";
            var rules = $.extend(true, {}, empty);
            for (var media in rules) {
                rules[media] = map[media][uuid] || {};
            }

            $node.data("op3-stylesheet-rules", rules);
        });

        // save op3 element's rules to jquery's data
        $(".op3-element").each(function(){
            var $node = $(this);
            var uuid = $node.attr("data-op3-uuid");
            var rules = $.extend(true, {}, empty);
            for (var media in rules) {
                rules[media] = map[media][uuid] || {};
            }

            $node.data("op3-stylesheet-rules", rules);
        });
    });

})(jQuery, window, document);
