/**
 * OptimizePress3 element type:
 * op3 element manipulation for each
 * element type.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-elements.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * Media devices
     * (initialized on op3devices event)
     *
     * @type {Object}
     */
    var _media = {};

    /**
     * Initialize OP3.Query object
     *
     * @param  {Mixed}  selector DOM node, jQuery element, string selector, op3query object, op3element object
     * @return {Object}          op3query object
     */
    var query = function(selector) {
        return new OP3_Query(selector);
    };

    /**
     * OP3.Query constructor
     *
     * @param  {Mixed}  selector DOM node, jQuery element, string selector, op3query object, op3element object
     * @return {Object}          op3query object
     */
    var OP3_Query = function(selector) {
        if (typeof selector === "string" && selector.trim().substr(0,1) === "<")
            this.push.apply(this, query.create(selector));
        else if (typeof selector === "string" && (selector.trim().substr(0,1) === "{" || selector.trim().substr(0,1) === "["))
            this.push.apply(this, query.unserialize(JSON.parse(selector)));
        else
            this.push.apply(this, query.find(selector));

        return this;
    }

    /**
     * OP3.Query prototype
     *
     * @type {Object}
     */
    query.fn = query.prototype = $.extend(OP3_Query.prototype, {
        query: "0.1.0",
        constructor: query,

        // for internal use only:
        // make op3query object act like Array
        length: [].length,
        push: [].push,
        sort: [].sort,
        splice: [].splice,
    });

    /**
     * Convert CSS string selector to
     * OP3 query selector
     *
     * @param  {Mixed} selector
     * @return {Mixed}
     */
    query._selector = function(selector) {
        if (typeof selector === "string")
            selector = selector
                .replace(/\[\s*uuid\s*=\s*"(.*?)"\s*\]/g, '[data-op3-uuid="$1"]')
                .replace(/\[\s*uuid\s*=\s*'(.*?)'\s*\]/g, "[data-op3-uuid='$1']")
                .replace(/\[\s*uuid\s*\]/g, '[data-op3-uuid]:not([data-op3-uuid=""])')
                .replace(/\[\s*gid\s*=\s*"(.*?)"\s*\]/g, '[data-op3-gid="$1"]')
                .replace(/\[\s*gid\s*=\s*'(.*?)'\s*\]/g, "[data-op3-gid='$1']")
                .replace(/\[\s*gid\s*\]/g, '[data-op3-gid]:not([data-op3-gid=""])')
                .replace(/\[\s*style\s*=\s*"(.*?)"\s*\]/g, '[data-op3-style-id="$1"]')
                .replace(/\[\s*style\s*=\s*'(.*?)'\s*\]/g, "[data-op3-style-id='$1']")
                .replace(/\[\s*style\s*\]/g, '[data-op3-style-id]:not([data-op3-style-id=""])')
                .replace(/\[\s*spec\s*=\s*"(.*?)"\s*\]/g, '[data-op3-element-spec="$1"]')
                .replace(/\[\s*spec\s*=\s*'(.*?)'\s*\]/g, "[data-op3-element-spec='$1']")
                .replace(/\[\s*spec\s*\]/g, '[data-op3-element-spec]:not([data-op3-element-spec=""])')
                //.replace(/\[.*?\]/g, "")
                .replace(/(^|\s|,|\()([\w\-]+)/g, '$1[data-op3-element-type="$2"]')
                .replace(/#([\w\-]+)/g, "#op3-element-$1")
                .replace(/\.([\w\-]+)/g, '[data-op3-style-id="$1"]')
                .replace(/:focused\b/g, '.op3-focus');
        else if (selector && typeof selector.toArray === "function")
            selector = selector.toArray();
        else if (selector && typeof selector.node === "function")
            selector = selector.node();

        return selector;
    }

    /**
     * Create new op3 element
     *
     * @param  {Mixed}  selector op3query selector
     * @return {Object}          DOM node list or null
     */
    query.create = function(selector) {
        if (!(typeof selector === "string" && selector.trim().substr(0,1) === "<"))
            return null;

        // using prefix cause browser replaces
        //     <image style="" />
        // to
        //     <img style="" />
        var result = [];
        var error = "OP3.Query: syntax error, unrecognized expression: " + selector;
        var prefix = "op3";
        selector = selector.replace(/</g, "<op3");

        $(selector).each(function() {
            if (this.nodeType === Node.ELEMENT_NODE) {
                var attrs = this.attributes
                var tag = this.tagName.toLowerCase();
                var unprefix = new RegExp("^" + prefix);
                var type = tag.replace(unprefix, "");
                var gid = this.getAttribute("gid");
                var style = this.getAttribute("style");
                var spec = this.getAttribute("spec");

                // find in element constructors
                for (var key in OP3.Elements._extension.type) {
                    if (OP3.Elements._extension.type[key].prototype._type === type) {
                        var element = new OP3.Elements._extension.type[key](style);
                        var node = element.node();
                        node.setAttribute("data-op3-gid", gid || "");
                        node.setAttribute("data-op3-element-spec", spec || "");
                        // @todo - style???

                        Array.prototype.slice.call(attrs).forEach(function(item) {
                            if ([ "uuid", "gid", "style", "spec", "preset" ].indexOf(item.name) === -1)
                                element.setOption(item.name, item.value, "all");
                        });

                        result.push(element.node());

                        return;
                    }
                }

                // constructors not found, search in config (maybe template?)
                for (var key in OP3.Elements._types) {
                    if (OP3.Elements._types[key].type === type) {
                        var markup = OP3.Elements._types[key].markup;
                        if (style) {
                            for (var i in OP3.Elements._types[key].styles || []) {
                                if (OP3.Elements._types[key].styles[i].id === style) {
                                    markup = OP3.Elements._types[key].styles[i].markup;
                                    break;
                                }
                            }
                        }
                        else if (!markup && OP3.Elements._types[key].styles) {
                            markup = OP3.Elements._types[key].styles[0].markup;
                        }

                        // fix links
                        markup = markup.replace(/{{op3_asset}}/g, OP3.Meta.assets);

                        // element tag in templates
                        var $wrapper = $("<div />")
                            .append(markup);
                        $wrapper
                            .find("element")
                            .each(function() {
                                // parse xml
                                var $template = $(this);
                                var gid = $template.attr("gid");
                                var type = $template.attr("type");
                                if (!type)
                                    throw template.ns() + ": Element tag (template) must have type attribite.";
                                var style = $template.attr("style");
                                var spec = $template.attr("spec");
                                var preset = $template.attr("preset");

                                $template
                                    .removeAttr("gid")
                                    .removeAttr("type")
                                    .removeAttr("style")
                                    .removeAttr("spec")
                                    .removeAttr("preset");

                                // element options
                                var options = {
                                    all: {},
                                };
                                var attributes = $template.get(0).attributes;

                                // If template, get attributes from config
                                if (type.match(/_template$/))
                                    attributes = $(OP3.Elements.config(type).markup, style)
                                        .get(0)
                                        .attributes;

                                Array.prototype.slice.call(attributes).forEach(function(item) {
                                    var name = item.name
                                        .replace(/-(\w)/g, function(match) {
                                            return match[1].toString().toUpperCase();
                                        });
                                    //var value = $("<div />")
                                    //    .text(item.value)
                                    //    .html()
                                    //        .replace(/"/g, "&quot;");

                                    options.all[name] = item.value;
                                });

                                // create element (preset and options are
                                // not defined, since we won't be using
                                // this element, just looking for it's
                                // markup)
                                var _selector = ''
                                    + '<' + type
                                    + (gid ? ' gid="' + gid + '"' : '')
                                    + (style ? ' style="' + style + '"' : '')
                                    + (spec ? ' spec="' + spec + '"' : '')
                                    + ' preset="-1"'
                                    + ' />';

                                // create new element
                                var element = OP3.$(_selector);

                                // replace template with new element,
                                // define options and preset, remove
                                // uuid
                                $(element.node())
                                    .attr("data-op3-element-preset-options", JSON.stringify(options))
                                    .attr(preset ? "data-op3-element-preset-index" : "_temp", preset)
                                    .removeAttr("_temp")
                                    .removeAttr("data-op3-uuid")
                                    .insertAfter($template)
                                    .find("[data-op3-children]:first")
                                        .append($template.children());
                                $template.remove();
                            });
                        markup = $wrapper.html();

                        var element = $(markup);
                        query(element).each(function() {
                            query(this).element()._prepare(style);
                        });

                        result = result.concat(element.toArray());

                        return result;
                    }
                }

                // unknown
                throw error;
            }

            // unknown
            else {
                throw error;
            }
        });

        return result.length ? result : null;
    }

    /**
     * Find all nodes with op3-elements
     * class attribute
     *
     * @param  {Mixed} selector op3query selector
     * @param  {Mixed} context  (optional)
     * @return {Array}          DOM node list
     */
    query.find = function(selector, context) {
        var result;

        // selector is op3query object
        if (query.isQuery(selector)) {
            result = selector.toArray();
        }

        // selector is op3element object
        else if (query.isElement(selector)) {
            result = [ selector.node() ];
        }

        // selector is string - convert CSS selector to OP3 selector
        else if (typeof selector === "string") {
            selector = query._selector(selector);
            result = $(selector, context).toArray();
        }

        // fallback - try with jQuery
        else {
            result = $(selector, context).toArray();
        }

        // result to jQuery
        result = context ? $(context).find(result) : $(result);

        // valid element types
        var valid = OP3.Elements.listExtensionTypes();

        // filter result
        return result
            .filter(function() {
                var element = $(this).hasClass("op3-element");
                var type = $(this).attr("data-op3-element-type");

                return element && valid.indexOf(type) > -1;
            })
            .toArray();

        return result;
    }

    /**
     * Find closest op3-element node(s) to selector
     * by testing itself and traversing up through
     * its ancestors in the DOM tree and convert
     * it to op3query object
     *
     * @param  {Mixed} selector jquery selector
     * @param  {Mixed} context  (optional)
     * @return {Array}          DOM node list
     */
    query.closest = function(selector, context) {
        selector = query._selector(selector);

        var node = $(selector, context);
        var result = node.closest(".op3-element");

        return query(result);
    }

    /**
     * Serialize context:
     * display element options for element
     * and all it's siblings
     *
     * @param  {Mixed}  context op3query selector
     * @return {Object}         JSON
     */
    query.serialize = function(context) {
        if (context) {
            var element = query(context).element();
            return element ? element.serialize() : null;
        }

        return OP3.Document.serialize();
    }

    /**
     * Unserialize context:
     * convert data to query element
     *
     * @param  {Object} data serialized data
     * @return {Object}      op3query object
     */
    query.unserialize = function(data) {
        var gid = data.gid;
        var type = data.type;
        var style = data.style;
        var spec = data.spec;
        var children = data.children;

        // At some point data was created using
        // query.serialize, so there is no need
        // to set default element properties or
        // preset (create element will do that).
        // We need to find a way to override
        // element's _prepare method: let's
        // temporary clear some stuff in
        // element's config.
        var config = OP3.Elements.config(type, style);
        var styles = config.styles;
        var presets = config.presets;
        var options = config.options;
        var descendants = config.descendants;
        config.styles = null;
        config.presets = null;
        config.options = null;
        config.descendants = null;

        // Note: while creating new element a new uuid
        // is being calculated, so the uuid in data is
        // invalid
        var result = query('<' + type
            + (gid ? ' gid="' + gid + '" ' : '')
            + (style ? ' style="' + style + '" ' : '')
            + (spec ? ' spec="' + spec + '"' : '')
            + ' />');
        var element = result.element();

        // Now set config as it was
        config.descendants = descendants;
        config.options = options;
        config.presets = presets;
        config.styles = styles;

        // Append all direct children to this element,
        // and call this recursively until we create
        // the entire sturcture of this block
        for (var i in children) {
            var child = query.unserialize(children[i]);
            child.appendTo(result);
        }

        // Append all options to this element
        for (var media in data.options) {
            for (var property in data.options[media]) {
                // simple rule -> apply property style to the element
                if (typeof data.options[media][property] === "string") {
                    var prop = element.findProperty(property);
                    if (prop && prop._serialize)
                        prop.setter(data.options[media][property], media);
                }

                // there's more propertyerties defined for the same element
                else if (typeof data.options[media][property] === "object") {
                    for (var selector in data.options[media][property]) {
                        var prop = element.findProperty(property, selector);
                        if (prop && prop._serialize)
                            prop.setter(data.options[media][property][selector], media);
                    }
                }
            }
        }

        return result;
    }

    /**
     * Unserialize context using OP3.Worker
     *
     * @param  {Object}   data
     * @param  {Function} onProgress (optional)
     * @param  {Function} onComplete (optional)
     * @return {Void}
     */
    query.unserializeAsync = function(data, onProgress, onComplete) {
        if (!OP3.Worker)
            throw "OP3.Query: can not execute async methods, OP3.Worker missing.";
        if (OP3.Worker.busy)
            throw "OP3.Worker: can not execute async methods, OP3.Worker busy.";

        // deep clone data
        data = $.extend(true, {}, data);

        // flatten object for easier manupulation
        var flat = query.flatElements(data);
        var result = null;

        // create child/parent list
        var children = [];
        for (var uuid in flat) {
            for (var i = 0; i < flat[uuid].children.length; i++) {
                children.push([flat[uuid].children[i], uuid]);
            }
        }

        // create uuid/media/option/selector/value list
        var options = [];
        for (var uuid in flat) {
            for (var media in flat[uuid].options) {
                for (var option in flat[uuid].options[media]) {
                    var selector = "";
                    var value = flat[uuid].options[media][option];

                    if (typeof value === "object")
                        for (selector in value) {
                            options.push([uuid, media, option, selector, value[selector]]);
                        }
                    else
                        options.push([uuid, media, option, selector, value]);
                }
            }
        }

        var _handleWorkerFrameRequest = function(e, o) {
            var event = {
                progress: o.jobsComplete / o.jobsCount,
                element: result,
                data: null,
            }
            if (typeof onProgress === "function")
                onProgress.call(data, event);
        }

        var _handleWorkerComplete = function(e, o) {
            setTimeout(function() {
                var event = {
                    progress: o.jobsComplete / o.jobsCount,
                    element: result,
                    data: query.unflatElements(result.uuid(), flat),
                }

                if (typeof onComplete !== "function" && typeof onProgress === "function")
                    onProgress.call(data, event);
                else if (typeof onComplete === "function")
                    onComplete.call(data, event);
            });

            OP3.unbind("workerframerequest", _handleWorkerFrameRequest);
            OP3.unbind("workercomplete", _handleWorkerComplete);
        }

        var jobCreate = function(list) {
            for (var i = 0; i < list.length; i++) {
                var uuid = list[i];
                var gid = flat[uuid].gid;
                var type = flat[uuid].type;
                var spec = flat[uuid].spec;
                var style = flat[uuid].style;
                var selector = '<' + type
                    + (gid ? ' gid="' + gid + '" ' : '')
                    + (style ? ' style="' + style + '" ' : '')
                    + (spec ? ' spec="' + spec + '"' : '')
                    + ' />';

                var element = query(selector).element();

                // element uuid exists in template,
                // request new element uuid
                while (element.uuid() in flat)
                    element.node().setAttribute("data-op3-uuid", element._uuid());

                flat[uuid].element = element;
            }
        }

        var jobAppend = function(list) {
            for (var i = 0; i < list.length; i++) {
                var args = list[i];
                var child = args[0];
                var parent = args[1];

                query(flat[child].element).appendTo(flat[parent].element);
            }
        }

        var jobOption = function(list) {
            for (var i = 0; i < list.length; i++) {
                var args = list[i];
                var uuid = args[0];
                var media = args[1];
                var option = args[2];
                var selector = args[3];
                var value = args[4];

                var property = flat[uuid].element.findProperty(option, selector);
                if (!property || !property._serialize)
                    continue;

                property.setter(value, media);
            }
        }

        // create element for each uuid
        var list = Object.getOwnPropertyNames(flat);
        var size = 30;
        var chunks = query.splitList(list, size);
        for (var i = 0; i < chunks.length; i++) {
            OP3.Worker.append(jobCreate, [ chunks[i] ]);
        }

        // append children to their parents
        var list = children;
        var size = 20;
        var chunks = query.splitList(list, size);
        for (var i = 0; i < chunks.length; i++) {
            OP3.Worker.append(jobAppend, [ chunks[i] ]);
        }

        // set options
        var list = options;
        var size = 10;
        var chunks = query.splitList(list, size);
        for (var i = 0; i < chunks.length; i++) {
            OP3.Worker.append(jobOption, [ chunks[i] ]);
        }

        // fix flat object uuids
        if (OP3.Map)
            OP3.Worker.append(function() {
                // fix element uuids
                Object.getOwnPropertyNames(flat).forEach(function(key) {
                    flat[key].uuid = flat[key].element.uuid();

                    if (data.uuid === key)
                        result = flat[key].element;
                    delete flat[key].element;
                });

                // fix children uuids
                Object.getOwnPropertyNames(flat).forEach(function(key) {
                    flat[key].children = flat[key].children.map(function(uuid) {
                        return flat[uuid].uuid;
                    });
                });

                // fix keys
                Object.getOwnPropertyNames(flat).forEach(function(key) {
                    flat[flat[key].uuid] = flat[key];
                    delete flat[key];
                });
            });

        // start worker
        setTimeout(function() {
            OP3.bind("workerframerequest", _handleWorkerFrameRequest);
            OP3.bind("workercomplete", _handleWorkerComplete);

            OP3.Worker.start();
        });
    }

    /**
     * Visit every data 'node' on a recursive walk
     *
     * @param  {Mixed}    data
     * @param  {Function} filter   (optional)
     * @param  {Function} callback
     * @return {Void}
     */
    query.traverse = function(data, filter, callback) {
        if (typeof filter === "function")
            if (!filter(data))
                return;

        if (typeof callback === "function")
            callback(data);

        // iterate array
        if (query.type(data) === "array") {
            data.forEach(function(item) {
                query.traverse(item, filter, callback);
            });
        }

        // iterate object properties (use only plain objects)
        else if (query.type(data) === "object" && data.__proto__.__proto__ === null) {
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    query.traverse(data[key], filter, callback);
                }
            }
        }

        // ignore everything elese
        else {
            // pass
        }
    }

    /**
     * Convert serialized data (source) to
     * flat object (uuid: data)
     *
     * @param  {Object} source
     * @param  {Object} dest   (optional)
     * @return {Object}
     */
    query.flatElements = function(source, dest) {
        if (!source)
            return null;
        dest = dest || {};

        dest[source.uuid] = {
            uuid: source.uuid,
            gid: source.gid,
            type: source.type,
            spec: source.spec || "",
            style: source.style || "",
            options: source.options,
            children: source.children.map(function(child) {
                return child.uuid;
            }),
        }

        // recursion
        if (source.children)
            source.children.forEach(function(child) {
                query.flatElements(child, dest);
            });

        return dest;
    }

    /**
     * Convert flat object to element
     * serialized data
     * (reverse query.flatElements)
     *
     * @param  {String} uuid
     * @param  {Object} data
     * @return {Object}
     */
    query.unflatElements = function(uuid, data) {
        if (!data || !data[uuid])
            return null;

        var map = function(item) {
            item.children = item.children.map(function(child) {
                return $.extend({}, data[child]);
            });

            // fallback (newly added properties)
            item.gid = item.gid || "";
            item.spec = item.spec || "";

            // recursion
            item.children.forEach(function(child) {
                map(child);
            });
        }

        var result = $.extend({}, data[uuid]);
        map(result);

        // document null(s)
        if (result.type === "document") {
            result.uuid = null;
            result.gid = null;
            result.spec = null;
            result.style = null;
        }

        return result;
    }

    /**
     * Get real element type
     *
     * @param  {Mixed}  data
     * @return {String}
     */
    query.type = function(data) {
        var type = Object.prototype.toString.call(data);
        // micro optimisation
        // info: https://jsperf.com/regex-caching-lp
        var regex = /\[(.+)\s(.+)]/i;
        var match = type.match(regex);

        return match ? match[2].toLowerCase() : typeof data;
    }

    /**
     * Is data instance of OP3_Query
     *
     * @param  {Mixed}   data
     * @return {Boolean}
     */
    query.isQuery = function(data) {
        return data instanceof OP3_Query;
    }

    /**
     * Is data instance of OP3_Element
     *
     * @param  {Mixed}   data
     * @return {Boolean}
     */
    query.isElement = function(data) {
        return data instanceof OP3.Elements._extension.type.Default;
    }

    /**
     * Is data instance of OP3_Property
     *
     * @param  {Mixed}   data
     * @return {Boolean}
     */
    query.isProperty = function(data) {
        return data instanceof OP3.Elements._extension.prop.Default;
    }

    /**
     * Split list to smaller chunks
     *
     * Example:
     *      >> OP3.$.splitList([0,1,2,3,4,5,6,7,8,9], 4);
     *      << [[0,1,2,3,4],[5,6,7,8],[9,10]]
     *
     * @param  {Array}  data
     * @param  {Number} size
     * @return {Array}
     */
    query.splitList = function(data, size) {
        return [].concat.apply([], data.map(function(item, index) {
            return index % size ? [] : [ data.slice(index, index + size) ];
        }));
    }

    /**
     * https://github.com/sindresorhus/escape-string-regexp
     *
     * @param  {String} str
     * @return {String}
     */
    query.escapeRegExp = function(str) {
        return str.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
    }

    /**
     * Escape special characters from string.
     * Used for validate text properties,
     * so user can't break html
     *
     * @param {String} str
     * @return {String}
     */
    query.escapeSpecialChars = function(str) {
        return str.replace(/[<>]/g, "");
    }

    /**
     * Convert string to HTML entities
     *
     * @param {String} str
     * @return {String}
     */
    query.htmlEntitiesEncode= function(str) {
        return String(str).replace(/"/g, "'").replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/\[/g, '&#91;').replace(/]/g, '&#93;');
    }

    /**
     * Convert HTML entities to string
     *
     * @param {String} str
     * @return {String}
     */
    query.htmlEntitiesDecode= function(str) {
        var txt = document.createElement('textarea');
        txt.innerHTML = str;
        var decodedStr = txt.value;
        txt.remove();

        return decodedStr;
    }

    /**
     * Replace template substrings in brackets
     * with data object properties
     *
     * @param  {String} template
     * @param  {Object} data
     * @return {String}
     */
    query.templating = function(template, data) {
        return template.replace(/{.*?}/g, function(match) {
            var prop = match.substr(1, match.length - 2);
            var obj = data;
            var arr = prop.split(".");

            for (var i = 0; i < arr.length; i++) {
                try {
                    obj = obj[arr[i]];
                }
                catch(e) {
                    obj = undefined;
                    break;
                }
            }

            if (typeof obj !== "undefined")
                return obj;

            return match;
        });
    }

    /**
     * Extend OP3.Query.fn
     * query object selector methods
     *
     * @param  {Object}
     * @param  {Object}
     * @return {Object}
     */
    $.extend(query.fn, {

        /**
         * Get op3query as array (list of DOM nodes)
         *
         * @return {Array}
         */
        toArray: function() {
            return [].slice.call(this);
        },

        /**
         * Convert this to jQuery object
         *
         * @return {Object} jQuery object
         */
        jq: function() {
            return $(this.get());
        },

        /**
         * Get first DOM node
         *
         * @return {Object} DOM node
         */
        node: function() {
            return this.get(0);
        },

        /**
         * Get DOM node by index
         *
         * @param  {Number} index (optional)
         * @return {Mixed}        DOM node or array of DOM nodes
         */
        get: function(index) {
            if (typeof index === "undefined") {
                return this.toArray();
            }

            return index < 0 ? this[this.length + index] : this[index];
        },

        /**
         * Get op3query element by index
         *
         * @param  {Integer} index (optional)
         * @return {Object}        op3query object
         */
        eq: function(index) {
            return query(this.get(index));
        },

        /**
         * Get first op3query element
         *
         * @return {Object} op3query object
         */
        first: function() {
            return this.eq(0);
        },

        /**
         * Get last op3query element
         *
         * @return {Object} op3query object
         */
        last: function() {
            return this.eq(-1);
        },

        /**
         * Get the immediately preceding sibling of
         * each element in the set of matched elements.
         * If a selector is provided, it retrieves
         * the previous sibling only if it matches
         * that selector.
         *
         * @param  {Mixed}  selector op3query selector
         * @return {Object}          op3query object
         */
        prev: function(selector) {
            selector = query._selector(selector) || ".op3-element";
            var result = $(false);

            this.jq().each(function() {
                var sibling = $(this)
                    .prevAll(".op3-element:first")
                    .filter(selector);

                result = result.add(sibling);
            });

            return query(result);
        },

        /**
         * Get the immediately following sibling of
         * each element in the set of matched elements.
         * If a selector is provided, it retrieves
         * the next sibling only if it matches that
         * selector.
         *
         * @param  {Mixed}  selector op3query selector
         * @return {Object}          op3query object
         */
        next: function(selector) {
            selector = query._selector(selector) || ".op3-element";
            var result = $(false);

            this.jq().each(function() {
                var sibling = $(this)
                    .nextAll(".op3-element:first")
                    .filter(selector);

                result = result.add(sibling);
            });

            return query(result);
        },

        /**
         * For each op3query element iteration
         *
         * @param  {Function} callback
         * @return {Object}            op3query object
         */
        each: function(callback) {
            $.each(this, callback);

            return this;
        },

        /**
         * Find all op3query elements filtered
         * by selection on current object
         *
         * @param  {Mixed}  selector op3query selector
         * @return {Object}          op3query object
         */
        find: function(selector) {
            var result = query.find(selector, this.get());
            return query(result);
        },

        /**
         * Reduce the set of matched op3query
         * elements to those that match the
         * selector
         *
         * @param  {Mixed}  selector op3query selector
         * @return {Object}          op3query object
         */
        filter: function(selector) {
            selector = query._selector(selector);
            var result = this.jq()
                .filter(selector);

            return query(result);
        },

        /**
         * Remove op3query element(s) from the
         * set of matched op3query element(s)
         *
         * @param  {Mixed}  selector op3query selector
         * @return {Object}          op3query object
         */
        not: function(selector) {
            selector = query._selector(selector);
            var result = this.jq()
                .not(selector);

            return query(result);
        },

        /**
         * Check the current matched set of op3query
         * element(s) against a selector
         *
         * @param  {Mixed}  selector op3query selector
         * @return {Object}          op3query object
         */
        is: function(selector) {
            selector = query._selector(selector);

            return this.jq().is(selector);
        },

        /**
         * Find first element against selector return
         * it's index in current matched set of
         * op3query element(s).
         *
         * @param  {Mixed}  selector op3query selector
         * @return {Number}          index
         */
        index: function(selector) {
            if (typeof selector === "undefined")
                return this.jq().index();

            return this.get().indexOf(this.filter(selector).first().get(0));
        },

        /**
         * Get node(s) which contains element
         * children
         *
         * @return {Array}
         */
        babysitter: function() {
            return this.jq()
                .map(function() {
                    var sitter = $(this).find("[data-op3-children]:first")
                    if (!sitter.length) return;

                    return sitter.get(0);
                })
                .toArray();
        },

        /**
         * Find all op3query element children
         *
         * @param  {Mixed}  selector op3query selector
         * @return {Object}          op3query object
         */
        children: function(selector) {
            selector = query._selector(selector);
            var result = this.jq()
                .find("[data-op3-children]:first > .op3-element")
                .filter(selector || "*");

            return query(result);
        },

        /**
         * Get each op3query element parent
         *
         * @return {Object} op3query object
         */
        parent: function() {
            var result = this.jq()
                .parent()
                .closest(".op3-element");

            return query(result);
        },

        /**
         * Get the ancestors of each op3query element
         * in the current set of matched elements
         * filtered by a selector
         *
         * @param  {Mixed}  selector op3query selector
         * @return {Object}          op3query object
         */
        parents: function(selector) {
            selector = query._selector(selector);
            var result = this.jq()
                .parents()
                .filter(selector || "*");

            return query(result);
        },

        /**
         * Get the first op3query element path
         *
         * @return {Mixed}
         */
        path: function() {
            var element = this.element();
            return element ? element.path() : null;
        },

        /**
         * Get the first op3query element that matches
         * the selector by testing the op3query element
         * itself and traversing up through its ancestors
         * in the DOM tree
         *
         * @param  {Mixed}  selector op3query selector
         * @return {Object}          op3query object
         */
        closest: function(selector) {
            selector = query._selector(selector);
            var result = this.jq()
                .closest(selector);

            return query(result);
        },

        /**
         * Find closest op3-element with
         * childrenDirectionHorizontal
         * property
         *
         * @return {Object}
         */
        closestHorizontal: function() {
            var selector = OP3.Designer.types()
                .filter(function(item) {
                    return item.childrenDirectionHorizontal;
                })
                .map(function(item) {
                    return item.type;
                })
                .join(",");

            return this.closest(selector);
        },

        /**
         * Find closest op3-element with
         * canSyncChildren property
         *
         * @return {Object}
         */
        closestSyncChild: function() {
            var selector = OP3.Designer.types()
                .filter(function(item) {
                    return item.canSyncChildren;
                })
                .map(function(item) {
                    return item.type;
                })
                .join(",");

            return this.closest(selector);
        },

        /**
         * Create a new op3query object
         * with DOM nodes added to the set
         * of matched op3query elements
         *
         * @param  {Mixed}  selector op3query selector
         * @return {Object}          op3query object
         */
        add: function(selector) {
            selector = query._selector(selector);
            var result = this.jq()
                .add(selector);

            return query(result);
        },

    });

    /**
     * Extend OP3.Query.fn
     * query object document methods
     *
     * @param  {Object}
     * @param  {Object}
     * @return {Object}
     */
    $.extend(query.fn, {

        /**
         * Detach op3query element(s) from document
         *
         * @return {Object} op3query object
         */
        detach: function() {
            this.each(function() {
                query(this).element().detach();
            });

            return this;
        },

        /**
         * Remove op3query element(s) from document
         *
         * @return {Object} op3query object
         */
        remove: function() {
            this.each(function() {
                query(this).element().remove();
            });

            return this;
        },

        /**
         * Empty op3query element(s) children
         *
         * @return {Object} op3query object
         */
        empty: function() {
            this.each(function() {
                query(this).element().empty();
            });

            return this;
        },

        /**
         * Set op3query element parent: prepend to
         *
         * @param  {Mixed}  selector op3query selector
         * @return {Object}          op3query object
         */
        prependTo: function(selector) {
            var op3sel = query._selector(selector);
            var node = query(op3sel).last().jq().find("[data-op3-children]")
            if (!node.length && (selector === OP3.Document || $(selector).is("html") || $(selector).is("body") || $(selector).is("#op3-designer-element")))
                node = $("#op3-designer-element").find("[data-op3-children]").first();

            this.each(function() {
                query(this).element().prependTo(node);
            });

            return this;
        },

        /**
         * Set op3query element parent: append to
         *
         * @param  {Mixed}  selector op3query selector
         * @return {Object}          op3query object
         */
        appendTo: function(selector) {
            var op3sel = query._selector(selector);
            var node = query(op3sel).last().jq().find("[data-op3-children]");
            if (!node.length && (selector === OP3.Document || $(selector).is("html") || $(selector).is("body") || $(selector).is("#op3-designer-element")))
                node = $("#op3-designer-element").find("[data-op3-children]").first();

            this.each(function() {
                query(this).element().appendTo(node);
            });

            return this;
        },

        /**
         * Set op3query element parent: insert before
         *
         * @param  {Mixed}  selector op3query selector
         * @return {Object}          op3query object
         */
        insertBefore: function(selector) {
            var op3sel = query._selector(selector);
            var node = query(op3sel).last().get(0);

            this.each(function() {
                query(this).element().insertBefore(node);
            });

            return this;
        },

        /**
         * Set op3query element parent: insert after
         *
         * @param  {Mixed}  selector op3query selector
         * @return {Object}          op3query object
         */
        insertAfter: function(selector) {
            var op3sel = query._selector(selector);
            var node = query(op3sel).last().get(0);

            this.each(function() {
                query(this).element().insertAfter(node);
            });

            return this;
        },

        /**
         * Clone element
         *
         * The easyest way (and the most 'op3 way')
         * would be to do serialize/unserialize
         * object. This method is effective, but
         * way too slow, so we're using cheats:
         * duplicate html/css.
         *
         * @return {Object} op3query object
         */
        clone: function() {
            var $node = this.jq();
            var $clone = $node.clone();

            $clone
                .attr("data-op3-element-preset-index", "-1")
                .filter(".op3-element[data-op3-uuid]")
                .add($clone.find(".op3-element[data-op3-uuid]"))
                    .each(function() {
                        var oldUuid = $(this).attr("data-op3-uuid");
                        var newUuid = OP3.Elements._extension.type.Default.prototype._uuid();

                        var $original = $node.filter('.op3-element[data-op3-uuid="' + oldUuid + '"]');
                        if (!$original.length)
                            $original = $node.find('.op3-element[data-op3-uuid="' + oldUuid + '"]');
                        var oldRules = $original.data("op3-stylesheet-rules");
                        var newRules = null;

                        // replace uuid, clean class attribute
                        var reservedClasses = [ "op3-element", "op3-focus" ];
                        if (OP3.Elements._extension.prop.Class && OP3.Elements._extension.prop.Class._reserved)
                            reservedClasses = OP3.Property.Class._reserved;
                        $(this)
                            .attr("id", "op3-element-" + newUuid)
                            .attr("data-op3-uuid", newUuid)
                            .removeClass(reservedClasses.join(" "))
                            .addClass("op3-element");

                        // replace node(s) id(s)
                        $(this).find("[id]:not(.op3-element)").each(function() {
                            var id = $(this).attr("id");
                            var re = new RegExp(oldUuid, "g");

                            $(this).attr("id", id.replace(re, newUuid));
                        });

                        // replace node(s) href(s)
                        var attr = [ "href", "fill" ];
                        $(this).find("[" + attr.join('*="' + oldUuid + '"],[') + '*="' + oldUuid + '"]').each(function() {
                            for (var i = 0; i < attr.length; i++) {
                                var key = attr[i],
                                    val = $(this).attr(attr[i]),
                                    re = new RegExp(oldUuid, "g");

                                if (val && re.test(val) !== -1)
                                    $(this).attr(key, val.replace(re, newUuid));
                            }
                        });

                        // replace node(s) xlink:href(s) attribute
                        // speficif handling needed for rating element
                        $(this)
                            .find("[*|href]")
                            .filter(function() {
                                return this.hasAttributeNS("http://www.w3.org/1999/xlink", "href");
                            })
                            .each(function() {
                                var ns = "http://www.w3.org/1999/xlink",
                                    val = this.getAttributeNS(ns, "href"),
                                    re = new RegExp(oldUuid, "g");

                                if (val && re.test(val) !== -1)
                                    this.setAttributeNS(ns, "xlink:href", val.replace(re, newUuid));
                            });

                        // copy stylesheet rules
                        Object.keys(oldRules).forEach(function(media) {
                            if (!newRules)
                                newRules = {}
                            newRules[media] = {};

                            Object.keys(oldRules[media]).forEach(function(selector) {
                                var style = oldRules[media][selector],
                                    re = new RegExp("#op3-element-" + oldUuid, "g"),
                                    newSelector = selector.replace(re, "#op3-element-" + newUuid),
                                    newCssText = style.cssText.replace(re, "#op3-element-" + newUuid),
                                    sheet = style.parentStyleSheet,
                                    index = sheet.insertRule(newCssText, 0),
                                    rule = sheet.cssRules[index];

                                newRules[media][newSelector] = rule;
                            });
                        });

                        // save new rules
                        if (newRules)
                            $(this).data("op3-stylesheet-rules", newRules);
                    });

            return query($clone);
        },

        //before
        //after
        //append
        //prepend
        //wrap

    });

    /**
     * Extend OP3.Query.fn
     * query object extension element
     * manipulation methods
     *
     * @param  {Object}
     * @param  {Object}
     * @return {Object}
     */
    $.extend(query.fn, {

        /**
         * Get first op3query extension element
         *
         * @return {String}
         */
        element: function() {
            var node = this.get(0);
            if (!node) return null;

            var type = $(node).attr("data-op3-element-type");
            if (!type) return null;

            var result;
            for (var key in OP3.Elements._extension.type) {
                if (OP3.Elements._extension.type[key].prototype._type === type) {
                    return new OP3.Elements._extension.type[key](node);
                }
            }

            return null;
        },

        /**
         * Get first op3query extension element uuid
         *
         * @return {String}
         */
        uuid: function() {
            var element = this.element();
            if (!element) return null;

            return element.uuid();
        },

        /**
         * Get first op3query extension element gid
         *
         * @return {String}
         */
        gid: function() {
            var element = this.element();
            if (!element) return null;

            return element.gid();
        },

        /**
         * Get all op3query extension element uuid(s)
         *
         * @return {Array}
         */
        listUuids: function() {
            var result = [];
            this.each(function() {
                var val = query(this).uuid();
                if (val && result.indexOf(val) === -1)
                    result.push(val);
            });

            return result;
        },

        /**
         * Get first op3query extension element type
         *
         * @return {String}
         */
        type: function() {
            var element = this.element();
            if (!element) return null;

            return element.type();
        },

        /**
         * Get first op3query extension element spec
         *
         * @return {String}
         */
        spec: function() {
            var element = this.element();
            if (!element) return null;

            return element.spec();
        },

        /**
         * Get first op3query extension element title
         *
         * @return {String}
         */
        title: function() {
            var element = this.element();
            if (!element) return null;

            return element.title();
        },

        /**
         * Get first op3query extension element description
         *
         * @return {String}
         */
        desc: function() {
            var element = this.element();
            if (!element) return null;

            return element.desc();
        },

        /**
         * Get all op3query extension element type(s)
         *
         * @return {Array}
         */
        listTypes: function() {
            var result = [];
            this.each(function() {
                var val = query(this).type();
                if (val && result.indexOf(val) === -1)
                    result.push(val);
            });

            return result;
        },

        /**
         * Get/set op3query extension element(s) style
         *
         * @param  {String} value
         * @return {Mixed}
         */
        style: function(value) {
            if (value) {
                return this.each(function() {
                    var element = query(this).element();
                    if (!element) return null;

                    element.style(value);
                });
            }

            var element = this.element();
            if (!element) return null;

            return element.style(value);
        },

        /**
         * Get all op3query extension element style(s)
         *
         * @return {Array}
         */
        listStyles: function() {
            var result = [];
            this.each(function() {
                var val = query(this).style();
                if (val && result.indexOf(val) === -1)
                    result.push(val);
            });

            return result;
        },

        /**
         * Get first op3query extension config
         *
         * @return {Object}
         */
        config: function() {
            var element = this.element();
            if (!element)
                return null;

            return element.config(element.style());
        },

        /**
         * Get/set op3query extension element(s) options
         *
         * @param  {String} key
         * @param  {Mixed}  value (optional)
         * @param  {String} media (optional)
         * @return {Mixed}
         */
        options: function(key, value, media) {
            throw "OP3.Query: method options is depricated, use getOption/setOption instead.";

            if (typeof value !== "undefined") {
                return this.each(function() {
                    var element = query(this).element();
                    if (!element) return null;

                    element.options(key, value, media);
                });
            }

            var element = this.element();
            if (!element) return null;

            return element.options(key, value, media);
        },

        /**
         * Get op3query extension element(s) options
         *
         * @param  {String} key   property id
         * @param  {String} media (optional) media device
         * @return {Mixed}
         */
        getOption: function(key, media) {
            var element = this.element();
            if (!element) return null;

            return element.getOption(key, media);
        },

        /**
         * Set op3query extension element(s) options
         *
         * @param  {String} key   property id
         * @param  {String} value property value
         * @param  {String} media (optional) media device
         * @return {Mixed}
         */
        setOption: function(key, value, media) {
            return this.each(function() {
                var element = query(this).element();
                if (!element) return null;

                element.setOption(key, value, media);
            });
        },

        /**
         * Apply multiple options.
         *
         * Options argument must be in following
         * format:
         *     {
         *         "all": {
         *             "color": "red",
         *             "backgroundColor": "green",
         *         },
         *         "screen and (max-width: 1023px)" {
         *             "color": "green",
         *             "backgroundColor": "red",
         *         },
         *     }
         *
         * ...where 'all' and 'screen and (max-width: 1023px)'
         * are media, 'color' and 'backgroundColor'
         * are property ids, and 'red' and 'green' are
         * property values
         *
         * @param  {Object} options
         * @return {Void}
         */
        applyOptions: function(options) {
            var element = this.element();
            if (!element) return null;

            return element.applyOptions(options);
        },

        /**
         * Get first op3query extension element
         * options for each media device
         *
         * @return {Object}
         */
        serialize: function() {
            return query.serialize(this);
        },

        /**
         * Op3 element serialize as preset
         *
         * @return {Object}
         */
        serializeAsPreset: function() {
            var element = this.element();
            if (!element) return null;

            return element.serializeAsPreset();
        },

        /**
         * Apply preset to elements
         *
         * @param  {Object} preset
         * @return {Void}
         */
        unserializePreset: function(preset) {
            return this.each(function() {
                var element = query(this).element();
                if (!element) return null;

                element.unserializePreset(preset);
            });
        },

        /**
         * Focus first op3query element
         *
         * @return {Object} op3query object
         */
        focus: function() {
            var element = this.element();
            if (element)
                element.focus();

            return this;
        },

        /**
         * Unfocus op3query element(s)
         *
         * @return {Object} op3query object
         */
        unfocus: function() {
            this.each(function() {
                query(this).element().unfocus();
            });

            return this;
        },

        /**
         * Is op3query element focused
         *
         * @return {Boolean}
         */
        focused: function() {
            return this.jq().is(".op3-focus");
        },

    });

    // globalize (designer)
    window.OP3.Query = query;

    // aliases
    window.OP3.$ = query;
    window.opjq = query;

    // link (live-editor)
    $(function() {
        window.parent.OP3.Query = query;
        window.parent.OP3.$ = query;
        window.parent.opjq = query;
    });

    // media devices
    OP3.bind("devicesinit", function(e, o) {
        _media = $.extend({}, o);
    });

})(jQuery, window, document);
