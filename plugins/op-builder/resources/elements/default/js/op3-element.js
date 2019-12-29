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
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.Default = OP3.defineClass({

        Name: "OP3.Element.Default",

        Constructor: function(arg) {
            this._node = this._node || null;
            this._options = this._options || this._props;

            this._init(arg);
        },

        Prototype: {

            /**
             * Op3 element type
             * (set this while extending object)
             *
             * @type {String}
             */
            _type: "default",

            /**
             * Property definition list
             * (set this while extending object)
             *
             * @return {Function}
             */
            _props: function() {
                return [
                    // empty
                ];
            },

            /**
             * Constructor:
             * use DOM node, jQuery element or string selector
             * as argument for existing elements, or style id
             * for creating new elements.
             *
             * @param  {Mixed} arg
             * @return {Void}
             */
            _init: function(arg) {
                if ($(arg).length) {
                    return this._select(arg);
                }

                this._create(arg);
            },

            /**
             * Select node
             *
             * @param  {Mixed} node DOM node, jQuery element or string selector
             * @return {Void}
             */
            _select: function(node) {
                var $node = $(node);
                var uuid = $node.attr("data-op3-uuid");
                var type = $node.attr("data-op3-element-type");
                var codeBeforeElement = $node.attr("data-op3-code-before");
                var codeAfterElement = $node.attr("data-op3-code-after");

                // wrong type
                if (type !== this._type) {
                    throw this.ns() + ": invalid op3 element node.";
                }

                // set node
                this._node = $node.get(0);

                // fill empty uuids (templates)
                if (!uuid) {
                    var getuuid = this._uuid;
                    $node
                        .find('.op3-element:not([data-op3-uuid]),[data-op3-uuid=""]')
                        .add($node)
                        .each(function() {
                            var uuid = getuuid();

                            $(this)
                                .attr("id", "op3-element-" + uuid)
                                .attr("data-op3-code-before", codeBeforeElement)
                                .attr("data-op3-code-after", codeAfterElement)
                                .attr("data-op3-uuid", uuid);

                            if (!$(this).is("[data-op3-gid]"))
                                $(this)
                                    .attr("data-op3-gid", "");
                            if (!$(this).is("[data-op3-style-id]"))
                                $(this)
                                    .attr("data-op3-style-id", "");
                        });
                }
            },

            /**
             * Create node
             *
             * @param  {String} style (optional)
             * @return {Void}
             */
            _create: function(style) {
                var config = this.config();
                if (config.styles && config.styles.length && !style)
                    style = config.styles[0].id;
                if (config.styles)
                    config = this.config(style);
                else
                    style = "";
                if (!config) {
                    var err = "invalid op3 element style (" + style + ")";
                    var ns = this.type();
                    ns = ns.charAt(0).toUpperCase() + ns.slice(1);
                    ns = "OP3.Elements._extension.type." + ns;

                    throw ns + ": " + err + ".";
                }

                // create node
                var uuid = this._uuid();
                this._node = $("<div />")
                    .attr("id", "op3-element-" + uuid)
                    .attr("class", "op3-element")
                    .attr("data-op3-uuid", uuid)
                    .attr("data-op3-gid", "")
                    .attr("data-op3-element-type", this._type)
                    .attr("data-op3-style-id", config.style ? config.style.id : "")
                    .attr("data-op3-has-children", "0")
                    .attr("data-op3-code-before", "")
                    .attr("data-op3-code-after", "")
                    .attr("class", "op3-element")
                    .get(0);

                var markup = this.markup(style);
                $(this._node)
                    .html(markup);
                this._prepare(style);

                // emit create
                var emit = {
                    node: this.node(),
                    uuid: this.uuid(),
                    type: this.type(),
                    historyPending: OP3.Designer.isHistoryPending(),
                }
                OP3.transmit("elementcreate", emit);
                OP3.transmit("elementcreate::" + emit.type, emit);
            },

            /**
             * Prepare node:
             * set element options from config
             *
             * @param  {String} style (optional)
             * @return {Void}
             */
            _prepare: function(style) {
                var config = this.config(style || "*");
                if (!config)
                    return;

                // set element options from config
                var options = {};
                if (config.options)
                    $.extend(true, options, config.options);
                if (config.style && config.style.options)
                    $.extend(true, options, config.style.options);

                for (var media in (options || {})) {
                    for (var propName in (options[media] || {})) {
                        var value = options[media][propName];

                        try {
                            if (typeof value === "undefined")
                                continue;
                            else
                                this.setOption(propName, value, media);
                        }
                        catch(e) {
                            // when unserializing data some elements can
                            // have properties targeting child elements,
                            // so before children are created this will
                            // fail (this is not a quickfix, this is ok
                            // since there is no need to set default
                            // options on unserialize, real options will
                            // be set afterwards)
                        }
                    }
                }

                // do the same with all it's descendants
                var options = {};
                if (config.descendants)
                    $.extend(true, options, config.descendants);
                if (config.style && config.style.descendants)
                    $.extend(true, options, config.style.descendants);

                for (var selector in (options || {})) {
                    var query = OP3.$(this).jq();

                    try {
                        if (selector)
                            query = query.find(selector).closest(".op3-element");
                        query = OP3.$(query);
                        if (!query.length)
                            throw "";
                    }
                    catch(e) {
                        continue;
                    }

                    for (var media in (options[selector] || {})) {
                        for (var propName in options[selector][media]) {
                            var value = options[selector][media][propName];
                            if (typeof value === "undefined")
                                continue;

                            query.each(function() {
                                var element = OP3.$(this).element();

                                try {
                                    if (propName === "styleId")
                                        element.style(value);
                                    else
                                        element.setOption(propName, value, media);
                                }
                                catch(e) {
                                    // pass
                                }
                            });
                        }
                    }
                }
            },

            /**
             * Get raw markup for style
             *
             * @param  {String} style (optional)
             * @return {String}
             */
            _markup: function(style) {
                var config = this.config(style || "*");
                var result = null;

                if (config && result === null && config.style && config.style.markup !== null)
                    result = config.style.markup;
                if (config && result === null && config.markup !== null)
                    result = config.markup;

                return result;
            },

            /**
             * Wrap element with parent from config
             *
             * @return {Object}
             */
            _wrap: function() {
                // get wrapper element type (as array object)
                var config = this.config()
                var type = this.type();
                var parents = config.parent;
                if (!parents)
                    return this._node;
                if (typeof parents === "string")
                    parents = [ parents ];
                parents = parents.map(function(item) {
                    if (item === null)
                        return "document";

                    return item;
                });

                // already wrapped
                if (parents.indexOf($(this.parent()).attr("data-op3-element-type")) !== -1)
                    return this._node;

                // make sure that event elementappendfirst
                // applies preset
                var applyFirstPreset = true
                    && config.presets
                    && config.presets.length
                    && !$(this._node).data("op3-element-append-count")
                    && !$(this._node).attr("data-op3-element-preset-index")
                    && !this.gid();
                if (applyFirstPreset)
                    $(this._node).attr("data-op3-element-preset-index", 0);

                // get current element path
                var path = ("document" + this.path()).split("/");
                path.pop();
                path.reverse();
                path = path.join("/");

                // choose the right element type to wrap it
                // using ancestors map and current path
                var element, wrapper = null;
                this._ancestorsMap()
                    .map(function(item) {
                        var result = item.join("/");
                        if (result.length)
                            result = "/" + result + "/";

                        return result;
                    })
                    .forEach(function(item) {
                        if (wrapper !== null)
                            return;

                        // current element type, then current element path
                        var pattern, match, current = path.replace(/\//g, "\\/");
                        if (wrapper === null) {
                            pattern = "\\/" + type + "\\/" + current + "\\/";
                            match = item.match(new RegExp(pattern));

                            // nothing to wrap with
                            if (match)
                                wrapper = "";
                        }

                        // current element type, then list of wrapper
                        // elements, then current element path
                        if (wrapper === null) {
                            pattern = "\\/" + type + "\\/(.*)\\/" + current + "\\/";
                            match = item.match(new RegExp(pattern));

                            // first of wrapper elements
                            if (match)
                                wrapper = match[1].split("/").shift();
                        }
                    });

                // fallback (this should never happend)
                if (wrapper === null)
                    wrapper = parents[0];

                // nothing to wrap with
                if (!wrapper || wrapper === "document")
                    return this._node;

                // wrap it!
                wrapper = OP3.Elements.create(wrapper);
                element = OP3.$(wrapper).element();
                this.wrap(wrapper);

                return element._wrap();
            },

            /**
             * Insert element to DOM
             *
             * @param  {Mixed}  target DOM node, jQuery element or string selector
             * @param  {String} method insert method (prependTo/appendTo/insertBefore/insertAfter)
             * @return {Void}
             */
            _insert: function(target, method) {
                $(this._node)[method](target);

                if (!this.attached())
                    return;

                var node = this._wrap();
                var element = OP3.$(node).element();
                var parent = element.parent();
                var index = (OP3.$(parent).element() || OP3.Document).children().indexOf(node);
                var uuid = element.uuid();
                var type = element.type();

                var emit = {
                    node: node,
                    uuid: uuid,
                    type: type,
                    parent: parent,
                    index: index,
                    historyPending: OP3.Designer.isHistoryPending(),
                }

                OP3.transmit("elementappend", emit);
                OP3.transmit("elementappend::" + type, emit);
            },

            /**
             * Generate element unique ID
             *
             * @return {String}
             */
            _uuid: function() {
                var valid = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                var length = 8;
                var result = "";

                // logic
                for (var i = 0; i < length; i++) {
                    result += valid.charAt(Math.floor(Math.random() * valid.length));
                }

                // already exists
                if (OP3.Elements._uuids.indexOf(result) !== -1) {
                    return this._uuid();
                }

                // make sure we can only use this uuid once
                OP3.Elements._uuids.push(result);

                // unique
                return result;
            },

            /**
             * Return list of element properties
             *
             * @return {Object}
             */
            _listProperties: function() {
                if (typeof this._options === "function")
                    this._options = this._options.call(this);

                return this._options;
            },

            /**
             * Index element properties
             * using indexes we are helping findProperty
             * method to work faster (doesn't need to
             * iterate all options, but find it by
             * index)
             *
             * @return {Void}
             */
            _indexProperties: function() {
                if ("_optionIndexId" in this)
                    // already indexed
                    return;

                // index storage
                this._optionIndexId = {};
                this._optionIndexNameSelector = {};

                // iterate and set indexes
                this._listProperties().forEach(function(value, index) {
                    var id, name, selector, serialize;

                    if (OP3.$.isProperty(value)) {
                        id = value._id;
                        name = value._name;
                        selector = value._selector;
                        serialize = value._serialize;

                        value.element = this;
                    }
                    else if (OP3.$.type(value) === "array" && OP3.$.isProperty(value[0].prototype)) {
                        var propClass = value[0];
                        var propUserOptions = value[1];

                        name = propClass.prototype._name;
                        id = name;
                        selector = "";
                        serialize = true;

                        if (propClass.prototype._defaults)
                            //if ("id" in propClass.prototype._defaults)
                            //    id = propClass.prototype._defaults.id;
                            if ("selector" in propClass.prototype._defaults)
                                selector = propClass.prototype._defaults.selector;
                            if ("serialize" in propClass.prototype._defaults)
                                serialize = propClass.prototype._defaults.serialize;

                        if (propUserOptions) {
                            if ("id" in propUserOptions)
                                id = propUserOptions.id;
                            if ("selector" in propUserOptions)
                                selector = propUserOptions.selector;
                            if ("serialize" in propUserOptions)
                                serialize = propUserOptions.serialize;
                        }
                    }
                    else
                        throw this.ns() + ": invalid op3 property definition at index " + index + ".";

                    if (id in this._optionIndexId)
                        throw this.ns() + ": non unique op3 property id (" + id + ").";
                    if (serialize && ((name + "|" + selector) in this._optionIndexNameSelector))
                        throw this.ns() + ": non unique op3 property name+selector (" + name + "+" + selector + ").";

                    this._optionIndexId[id] = index;
                    this._optionIndexNameSelector[name + "|" + selector] = index;
                }.bind(this));
            },

            /**
             * Get property by index:
             * convert array (constructor + arguments)
             * property definition to op3 property
             *
             * @param  {Number} index
             * @return {Object}
             */
            _getPropertyByIndex: function(index) {
                var options = this._listProperties();
                if (index >= options.length || index < 0)
                    return null;

                var result = options[index];

                // already instanced
                if (OP3.$.isProperty(result)) {
                    // pass
                }

                // instance new
                else if (OP3.$.type(result) === "array" && OP3.$.isProperty(result[0].prototype)) {
                    this._options[index] = new result[0](result[1] || {});
                    result = this._options[index];
                }

                // invalid argument?
                else
                    result = null;

                // set property element
                if (result && !result.element)
                    result.element = this;

                return result;
            },

            /**
             * Get ancestors map for current
             * element type
             *
             * Ancestors map is list of all
             * possible element parent types.
             * For example, let's asume that
             * button element can be on column
             * and/or form, so it would look
             * like this
             *
             * return [
             *     [ "button", "column", "row", "section", null, ],
             *     [ "button", "form", "column", "row", "section", null, ],
             * ];
             *
             * @param  {Boolean} skipCurrent (optional)
             * @return {Array}
             */
            _ancestorsMap: function(skipCurrent) {
                var result = this.config().parent;
                var type = this.type();
                if (OP3.$.type(result) !== "array")
                    result = [ result ];
                result = result.map(function(item) {
                    if (skipCurrent)
                        return [ item || "document" ];
                    else
                        return [ type, item || "document" ];
                });

                var index = 0;
                while (index < result.length) {
                    // get last element type at index
                    var path = result[index];
                    var item = path[path.length - 1];
                    if (item === "document") {
                        index++;
                        continue;
                    }

                    // get next parent(s)
                    var parent = OP3.Elements.config(item).parent;
                    if (OP3.$.type(parent) !== "array")
                        parent = [ parent ];

                    // replace null with document
                    parent = parent.map(function(item) {
                        return item || "document";
                    });

                    // append new element type to path
                    path.push(parent[0]);

                    // more than one element type possible,
                    // clone current path with new items
                    for (var i = 1; i < parent.length; i++) {
                        if (path.indexOf(parent[i]) !== -1)
                            // prevent recursion
                            continue;

                        // clone with new type
                        var clone = path.slice(0);
                        clone.pop();
                        clone.push(parent[i]);

                        // insert to result
                        result.splice(index + 1, 0, clone);
                    }

                    // next
                    if (path[path.length - 1] === null)
                        index++;
                }

                return result;
            },

            /**
             * Get paste object for data in
             * OP3.LocalStorage
             *
             * Paste object is object with properties
             * source (copied element), destination
             * (target element) and method (method
             * to execute on target element).
             *
             * While it seams logically that data should
             * be stored in OP3.SessionStorage, the
             * problem is that the sessionStorage can
             * not be shared accross browser tabs...
             *
             * @return {Object}
             */
            _pasteObject: function() {
                if (!OP3.LocalStorage)
                    return null;

                // get source from virtual clipboard
                var destination = null;
                var source = OP3.LocalStorage.get("clipboard");
                if (!source)
                    return null;

                // for document type append each child to
                // document (ui should prevent this to
                // happend, but it's nice to have this
                // solution coded)
                if (source.type === "document") {
                    // @todo
                    return;
                }

                // before anything let's check if source can
                // be child of current element
                var sourceAncestorsMap, currentPath;
                if (!destination) {
                    sourceAncestorsMap = OP3.$("<" + source.type + " />").element()._ancestorsMap(true);

                    for (var i = 0; i < sourceAncestorsMap.length; i++) {
                        var dst = this.type();

                        if (dst === "document" || (OP3.Elements.config(dst).allowPasteIntoElement && sourceAncestorsMap[i].indexOf(dst) !== -1)) {
                            destination = dst;
                            break;
                        }
                    }
                }

                // compare source ancestors map with current
                // element path and find first parent where
                // we are allowed to insert/append source
                if (!destination) {
                    currentPath = this.path().split("/")
                        .map(function(item) {
                            return item || "document";
                        })
                        .reverse();

                    // we could use Array.prototype.forEach and
                    // Array.prototype.indexOf and get prettier
                    // code, but this way (the ugly way), using
                    // for loop is more efficient
                    for (var i = 0; i < sourceAncestorsMap.length; i++) {
                        var src = sourceAncestorsMap[i];

                        for (var j = 0; j < currentPath.length; j++) {
                            var dst = currentPath[j];

                            if (dst === "document" || (OP3.Elements.config(dst).allowPasteIntoElement && src.indexOf(dst) !== -1)) {
                                destination = dst;
                                break;
                            }
                        }

                        if (destination)
                            break;
                    }
                }

                // errrr... i think this should never happen
                if (!destination)
                    return null;

                // create path by traversing up from current
                // element until we find destination type
                // element
                var element = OP3.$(this);
                var path = [];
                while (element.length) {
                    path.push(element.node());
                    if (element.type() === destination)
                        break;

                    element = element.parent();
                }

                // OP3.Document is a virtual element and can not
                // be queried with OP3.Query, so expression
                //
                // >> element.type() === destination
                //
                // in loop above was never satisfied
                if (destination === "document")
                    path.push(OP3.Document.node());

                // last element in path is the real destination,
                // parent element of source. if last element
                // is the only element in our path then we need
                // to execute appendTo on it.
                var result = {
                    source: JSON.stringify(source),
                    destination: path[path.length - 1],
                    method: "appendTo",
                }

                // if there is more then one element in path
                // then we need to execute insertAfter the
                // element before last.
                if (path.length > 1) {
                    result.destination = path[path.length - 2];
                    result.method = "insertAfter";
                }

                // that's it, we're done...
                return result;
            },

            /**
             * Replace current element
             *
             * Warning: This method has no validation
             * mechanisam implemented. Do not use this
             * if you do not know what are you doing!!!
             *
             * The idea is that we can replace element
             * on page and allow OP3.History to replace
             * nodes in it's history event list. To make
             * this work flawlessly we need to make sure
             * that there is no any element's children
             * in history event list, cuz replacing all
             * children would make this very slow...
             *
             * @param  {Mixed}  node DOM node, jQuery element or string selector
             * @return {Object}      newly created element
             */
            _replaceElement: function(node) {
                var query = OP3.$(node);
                if (!query.length)
                    throw this.ns() + ": unable to replace element (invalid node argument).";

                // unfocus first
                var focused = this.focused();
                this.unfocus();

                // replace elements (not using op3
                // append/remove methods, do not
                // want to trigger any event)
                var _old = this.node();
                var _new = query.node();
                query.jq().insertAfter(_old);
                $(_old).remove();

                // focus
                if (focused)
                    OP3.$(_new).focus();

                // emit elementreplace event
                OP3.transmit("elementreplace", {
                    node: _new,
                    uuid: query.uuid(),
                    type: query.type(),
                    value: {
                        before: _old,
                        after: _new,
                    },
                });
            },

            /**
             * Get namespace
             *
             * @return {String}
             */
            ns: function() {
                var name = this.type();
                var prefix = "OP3.Elements._extension.type"
                var suffix = name.charAt(0).toUpperCase() + name.slice(1);

                return prefix + "." + suffix;
            },

            /**
             * Get op3 element DOM node
             *
             * @return {Object}
             */
            node: function() {
                return this._node;
            },

            /**
             * Get op3 element uuid
             *
             * @return {String}
             */
            uuid: function() {
                return $(this._node).attr("data-op3-uuid");
            },

            /**
             * Get/set op3 global element id
             *
             * Important:
             * any global id changes must be send to
             * backend, so do not use this as setter
             * (let OP3.GlobalElements handle it)!!!
             *
             * @param  {String} value (optional)
             * @return {Mixed}
             */
            gid: function(value) {
                if (typeof value === "undefined")
                    return $(this._node).attr("data-op3-gid") || "";

                // convert to string
                value = value ? value.toString() : "";

                // same as before?
                var before = this.gid();
                if (before === value)
                    return;

                // global element can not be inside
                // other global elements
                var selector = '.op3-element[data-op3-gid]:not([data-op3-gid=""]):not([data-op3-uuid="' + this.uuid() + '"])';
                if ($(this._node).closest(selector).length)
                    throw this.ns() + ": can not set element as global (is global element child)";
                if ($(this._node).find(selector).length)
                    throw this.ns() + ": can not set element as global (has global element child)";

                // save value to data attribute
                $(this._node).attr("data-op3-gid", value);

                // emit event
                var emit = {
                    node: this.node(),
                    uuid: this.uuid(),
                    type: this.type(),
                    historyPending: OP3.History && OP3.History.isPending(),
                    value: {
                        before: before,
                        after: value,
                    },
                }
                OP3.transmit("elementgid", emit);
                OP3.transmit("elementgid::" + emit.type, emit);
            },

            /**
             * Get op3 element type
             *
             * @return {String}
             */
            type: function() {
                return this._type;
            },

            /**
             * Get op3 element spec
             *
             * @return {String}
             */
            spec: function() {
                return $(this._node).attr("data-op3-element-spec") || "";
            },

            /**
             * Get elemetn title
             *
             * @return {String}
             */
            title: function() {
                return this.config().title;
            },

            /**
             * Get/set op3 element style id
             * and trigger change
             *
             * @param  {String} value (optional)
             * @return {Mixed}
             */
            style: function(value) {
                if (typeof value === "undefined")
                    return $(this._node).attr("data-op3-style-id") || "";

                // no change
                if (this.style() === value)
                    return;

                // style does not exists
                var config = this.config(value);
                if (!config || !config.style)
                    return;

                // signal style changing
                var emit = {
                    node: this.node(),
                    uuid: this.uuid(),
                    type: this.type(),
                    historyPending: OP3.Designer.isHistoryPending(),
                    value: {
                        before: this.style(),
                        after: value
                    },
                }
                var cancel = false
                    || OP3.transmit("elementstyling", emit)
                    || OP3.transmit("elementstyling::" + emit.type, emit);
                if (cancel)
                    // default prevented
                    return;

                // this does not belong here!!!
                var focus = this.focused();
                var scrollPosition = OP3.LiveEditor.$ui.sidebarWrapper.scrollTop();
                this.unfocus();

                // get markup and replace op3 options
                // in it with current element option
                // values
                var markup = this._markup(value);
                var replace = {};
                var re = /<op3 (.*?)>/g;
                var match = re.exec(markup);
                while (match != null) {
                    var key = match[1];
                    replace[key] = this.getOption(key, "all");

                    match = re.exec(markup);
                }
                for (var key in replace) {
                    markup = markup.replace(new RegExp('<op3 ' + key + '>', 'g'), replace[key]);
                }

                // set new style
                $(this._node)
                    .attr("data-op3-style-id", value)
                    .html(markup);

                // signal style change
                OP3.transmit("elementstyle", emit);
                OP3.transmit("elementstyle::" + emit.type, emit);

                if (focus)
                    this.focus();

                // When style is changed
                // new style element will be focused
                // which will force element style tab to be open.
                // But we want to design tab to stay open when style is changed.
                OP3.LiveEditor.sidebarTabOpen("design");
                OP3.LiveEditor.$ui.sidebarWrapper.scrollTop(scrollPosition);
                // this also does not belong here!!!
            },

            /**
             * Get element description
             *
             * @return {String}
             */
            desc: function() {
                return this.title() + " #" + this.uuid();
            },

            /**
             * CSS selector prefix
             *
             * @return {String}
             */
            selector: function() {
                var selector = "#" + $(this.node()).attr("id");
                var config = this.config();
                var prefix = "#op3-designer-element ";
                var suffix = selector;

                // boost selector specificity
                for (var i = 1; i < config.cssSelectorStrength || 0; i++) {
                    suffix += selector;
                }

                return prefix + suffix;
            },

            /**
             * Create element thumb
             *
             * @return {Object}
             */
            thumb: function() {
                var data = this.config(),
                    template = ''
                        + '<div class="op3-element-thumb">'
                        + '<span class="op3-icon op3-icon-{thumb}"></span>'
                        + '<span>{title}</span>'
                        + '</div>',
                    html = OP3.$.templating(template, data);

                return $(html).get(0);
            },

            /**
             * Set op3 element parent: prepend to node
             *
             * @param  {Mixed} node DOM node, jQuery element or string selector
             * @return {Void}
             */
            prependTo: function(node) {
                this.detach();

                var $node = $(node).closest(".op3-element,#op3-designer-element");
                if ($(node).is("html,body"))
                    $node = $("#op3-designer-element");
                var $babysitter = $node.find("[data-op3-children]").first();

                this._insert($babysitter, "prependTo");
            },

            /**
             * Set op3 element parent: append to node
             *
             * @param  {Mixed} node DOM node, jQuery element or string selector
             * @return {Void}
             */
            appendTo: function(node) {
                this.detach();

                var $node = $(node).closest(".op3-element,#op3-designer-element");
                if ($(node).is("html,body"))
                    $node = $("#op3-designer-element");
                var $babysitter = $node.find("[data-op3-children]").first();

                this._insert($babysitter, "appendTo");
            },

            /**
             * Set op3 element parent: insert before node
             *
             * @param  {Mixed} node DOM node, jQuery element or string selector
             * @return {Void}
             */
            insertBefore: function(node) {
                this.detach();

                var $node = $(node).closest(".op3-element");
                this._insert($node, "insertBefore");
            },

            /**
             * Set op3 element parent: insert after node
             *
             * @param  {Mixed} node DOM node, jQuery element or string selector
             * @return {Void}
             */
            insertAfter: function(node) {
                this.detach();

                var $node = $(node).closest(".op3-element");
                this._insert($node, "insertAfter");
            },

            /**
             * Set op3 element parent:
             * wrap node around element
             *
             * Warning: this method has no validation.
             * You can basically wrap current node
             * with any element. Please use this
             * carefully...
             *
             * @param  {Mixed} node DOM node, jQuery element or string selector
             * @return {Void}
             */
            wrap: function(node) {
                var $parent = $(node);
                if (!OP3.$($parent).length)
                    return;

                var $sitter = $parent.find("[data-op3-children]:first");
                if (!$sitter.length)
                    return;

                $parent.insertAfter(this.node());
                $(this.node()).appendTo($sitter);

                var emit = {
                    node: this.node(),
                    uuid: this.uuid(),
                    type: this.type(),
                    parent: $parent.get(0),
                    historyPending: OP3.Designer.isHistoryPending(),
                }

                OP3.transmit("elementwrap", emit)
                OP3.transmit("elementwrap::" + emit.type, emit);
            },

            /**
             * Remove op3 element parent:
             * unwrap node
             *
             * Warning: this method has no validation.
             * While you unwrap current node it will
             * change parent, and it's possible that
             * current node is not allowed to be on
             * that element. Please use this
             * carefully...
             *
             * @return {Void}
             */
            unwrap: function() {
                var $parent = $(this.parent());
                if (!OP3.$($parent).length)
                    return;

                $(this.node()).insertAfter($parent);
                $parent.detach();

                var emit = {
                    node: this.node(),
                    uuid: this.uuid(),
                    type: this.type(),
                    parent: $parent.get(0),
                    historyPending: OP3.Designer.isHistoryPending(),
                }

                OP3.transmit("elementunwrap", emit)
                OP3.transmit("elementunwrap::" + emit.type, emit);
            },

            /**
             * Remove element node from document
             *
             * Warning: this will also remove all
             * events and data, so use it only if
             * you won't use this element again
             * (use detach instead)
             *
             * @return {Void}
             */
            remove: function() {
                var parent = this.parent();
                var attached = this.attached();
                var emit = {
                    node: this.node(),
                    uuid: this.uuid(),
                    type: this.type(),
                    parent: parent,
                    index: (OP3.$(parent).element() || OP3.Document).children().indexOf(this._node),
                    historyPending: OP3.Designer.isHistoryPending(),
                }

                // we can prevent remove with preventDefault
                // on elementremoving event
                if (attached) {
                    var cancel = false
                        || OP3.transmit("elementremoving", emit)
                        || OP3.transmit("elementremoving::" + emit.type, emit);

                    if (cancel)
                        return;
                }

                // remove stylesheet rules
                // @todo - this can be very slow?!?!
                var rules = $(this._node).data("op3-stylesheet-rules") || {};
                Object.keys(rules).forEach(function(media) {
                    Object.keys(rules[media]).forEach(function(selector) {
                        var rule = rules[media][selector];
                        var sheet = rule.parentStyleSheet;

                        for (var index = 0; sheet.cssRules.length; index++) {
                            if (sheet.cssRules[index] === rule) {
                                sheet.deleteRule(index);
                                break;
                            }
                        }
                    });
                });

                // element unfocus (self and all it's children)
                if (this.focused())
                    this.unfocus();
                else
                    OP3.$(this._node).find(":focused").unfocus();

                // remove dom node
                $(this._node).remove();

                // emit
                if (attached) {
                    OP3.transmit("elementremove", emit);
                    OP3.transmit("elementremove::" + emit.type, emit);
                }

                // clear
                this._node = null;
            },

            /**
             * Detach element node from document
             *
             * @return {Void}
             */
            detach: function() {
                var parent = this.parent();
                var attached = this.attached();
                var emit = {
                    node: this.node(),
                    uuid: this.uuid(),
                    type: this.type(),
                    parent: parent,
                    index: (OP3.$(parent).element() || OP3.Document).children().indexOf(this._node),
                    historyPending: OP3.Designer.isHistoryPending(),
                }

                // we can prevent detach with preventDefault
                // on elementdetaching event
                if (attached) {
                    var cancel = false
                        || OP3.transmit("elementdetaching", emit)
                        || OP3.transmit("elementdetaching::" + emit.type, emit);

                    if (cancel)
                        return;
                }

                // element unfocus (self and all it's children)
                if (this.focused())
                    this.unfocus();
                else
                    OP3.$(this._node).find(":focused").unfocus();

                // detach dom node
                $(this._node).detach();

                // emit
                if (attached) {
                    OP3.transmit("elementdetach", emit);
                    OP3.transmit("elementdetach::" + emit.type, emit);
                }
            },

            /**
             * Is element node attached to document
             *
             * @return {Boolean}
             */
            attached: function() {
                return !!$(this._node).closest("body").length;
            },

            /**
             * Empty element children
             *
             * @return {Void}
             */
            empty: function() {
                this.children().reverse().forEach(function(item) {
                    OP3.$(item).detach();
                });
            },

            /**
             * Set focus on op3 element
             *
             * @return {Void}
             */
            focus: function() {
                if ($(this._node).hasClass("op3-focus"))
                    return;
                if (!$(this._node).parent().length)
                    return;

                var emit = {
                    node: this.node(),
                    uuid: this.uuid(),
                    type: this.type(),
                };

                var cancel = false
                    || OP3.transmit("elementfocusing", emit)
                    || OP3.transmit("elementfocusing::" + emit.type, emit);
                if (cancel)
                    return;

                // Make sure elements/element settings tab is active
                OP3.LiveEditor.sidebarTabOpen("elements");
                // this also does not belong here!!!

                // unfocus focused element
                OP3.Designer.activeElement().unfocus();

                // ...and focus current one
                $(this._node).addClass("op3-focus");

                OP3.transmit("elementbeforefocus", emit);
                OP3.transmit("elementbeforefocus::" + emit.type, emit);
                OP3.transmit("elementfocus", emit);
                OP3.transmit("elementfocus::" + emit.type, emit);
            },

            /**
             * Remove focus from op3 element
             *
             * @return {Void}
             */
            unfocus: function() {
                if (!$(this._node).hasClass("op3-focus"))
                    return;

                var emit = {
                    node: this.node(),
                    uuid: this.uuid(),
                    type: this.type(),
                };

                var cancel = false
                    || OP3.transmit("elementunfocusing", emit)
                    || OP3.transmit("elementunfocusing::" + emit.type, emit);
                if (cancel)
                    return;

                window.getSelection().removeAllRanges();
                document.activeElement.blur();
                $(this._node).removeClass("op3-focus");

                OP3.transmit("elementbeforeunfocus", emit);
                OP3.transmit("elementbeforeunfocus::" + emit.type, emit);
                OP3.transmit("elementunfocus", emit);
                OP3.transmit("elementunfocus::" + emit.type, emit);
            },

            /**
             * Is op3 element focused
             *
             * @return {Boolean}
             */
            focused: function() {
                return $(this._node).hasClass("op3-focus");
            },

            /**
             * Clipboard-like copy functionality:
             * store serialized date to OP3.LocalStorage
             *
             * @return {Mixed}
             */
            copy: function() {
                if (!this.config().allowCopyElement)
                    return null;

                var data, limit = 1024*1024;
                if (OP3.Map)
                    data = OP3.Map.toJSON(this.uuid());
                else
                    data = this.serialize();

                if (limit && JSON.stringify(data).length > limit)
                    throw this.ns() + ": unable to copy element (limit " + limit + "B exceeded).";

                OP3.LocalStorage.set("clipboard", data);

                OP3.transmit("elementclipboardcopy", {
                    node: this.node(),
                });

                return this;
            },

            /**
             * Clipboard-like cut functionality:
             * copy and detach element
             *
             * @return {Mixed}
             */
            cut: function() {
                if (!this.config().allowCutElement)
                    return null;

                this.copy();
                this.detach();

                return this;
            },

            /**
             * Clipboard-like paste functionality:
             * append element from OP3.LocalStorage
             * into/after current element
             *
             * @return {Void}
             */
            paste: function() {
                // no need to check allowPasteIntoElement,
                // this is handled in _pasteObject
                //if (!this.config().allowPasteIntoElement)
                //    return null;

                // do we have anything to paste?
                var paste = this._pasteObject();
                if (!paste)
                    return null;

                // we do, let's create new element
                var source = OP3.$(paste.source);

                // appending new element to dom will
                // force default preset, making sure
                // this doesn't happen
                source.jq().attr("data-op3-element-preset-index", "-1");

                // append it to dom
                source[paste.method](paste.destination);

                // ...and emit event
                OP3.transmit("elementclipboardpaste", {
                    node: this.node(),
                    source: paste.source,
                    destination: paste.destination,
                    method: paste.method,
                    element: source.element().node(),
                });

                return source.element();
            },

            /**
             * Get config (from OP3.Elements._types)
             *
             * @param  {Mixed}  style
             * @return {Object}
             */
            config: function(style) {
                return OP3.Elements.config(this._type, style);
            },

            /**
             * Get markup from config
             *
             * @param  {String} style (optional)
             * @return {String}
             */
            markup: function(style) {
                var config = this.config(style || "*");
                if (!config)
                    throw this.ns() + ": invalid op3 element style.";

                var markup = this._markup(style);
                if (markup === null)
                    throw this.ns() + ": unset op3 element markup.";

                // markup replace default options
                var options = (config.style ? config.style.options : config.options) || {};
                for (var key in options) {
                    markup = markup.replace(new RegExp('<op3 ' + key + '>', 'g'), options[key]);
                }
                markup = markup.replace(/<op3 .*?>/g, "");

                // make markup id attributes unique (svg templates)
                var uuid = this.uuid();
                var ids = [];
                var re = /\sid="(.+?)"/gi;
                markup = markup.replace(re, function($0, $1) {
                    ids.push($1);
                    return ' id="' + $1 + '---' + uuid + '"';
                });

                // fix urls
                if (ids.length) {
                    re = new RegExp('="url\\(#(' + ids.join("|") + ')\\)"', 'gi');
                    markup = markup.replace(re, '="url(#$1---' + uuid + ')"');

                    re = new RegExp('="#(' + ids.join("|") + ')"', 'gi');
                    markup = markup.replace(re, '="#$1---' + uuid + '"');
                }

                return markup;
            },

            /**
             * Is option value null
             *
             * Argument key is mandatory. If media argument
             * is omitted current media device will be used.
             * Result is boolean TRUE/FALSE, NULL on invalid
             * property.
             *
             * @param  {String}  key   property id
             * @param  {String}  media (optional) media device
             * @return {Boolean}
             */
            isOptionNull: function(key, media) {
                var property = this.findProperty(key);
                if (property)
                    return property.isNull(media);

                return null;
            },

            /**
             * Is option value default one
             *
             * Argument key is mandatory. If media argument
             * is omitted current media device will be used.
             * Result is boolean TRUE/FALSE, NULL on invalid
             * property.
             *
             * @param  {String}  key   property id
             * @param  {String}  media (optional) media device
             * @return {Boolean}
             */
            isOptionDefault: function(key, media) {
                var property = this.findProperty(key);
                if (property)
                    return property.isDefault(media);

                return null;
            },

            /**
             * Reset option value to it's initial
             * state (usually null)
             *
             * Argument key is mandatory. If media argument
             * is omitted current media device will be used.
             *
             * @param  {String} key   property id
             * @param  {Mixed}  media (optional) media device
             * @return {Mixed}
             */
            resetOption: function(key, media) {
                var property = this.findProperty(key);
                if (!property)
                    //throw this.ns() + ": Invalid property '" + key + "' for element '" + this.type() + "'.";
                    return;

                property.reset();
            },

            /**
             * Get element property value.
             *
             * Argument key is mandatory. If media argument
             * is omitted current media device will be used.
             * You can pass TRUE as media (media === true),
             * then result will be computed option on fail.
             *
             * @param  {String} key   property id
             * @param  {Mixed}  media (optional) media device
             * @return {Mixed}
             */
            getOption: function(key, media) {
                var property = this.findProperty(key);
                if (!property)
                    //throw this.ns() + ": Invalid property '" + key + "' for element '" + this.type() + "'.";
                    return null;

                var computed = media === true;
                if (typeof media !== "string")
                    media = OP3.LiveEditor.deviceMedia();

                var result = property.getter(media);
                if (result === null && computed)
                    result = property.computed();

                return result;
            },

            /**
             * Set element property value.
             *
             * Arguments key/value are mandatory. Value can
             * be NULL (this will reset property to it's
             * initial value). If media argument is omitted
             * current media device will be used.
             *
             * @param  {String} key   property id
             * @param  {String} value property value
             * @param  {String} media (optional) media device
             * @return {Void}
             */
            setOption: function(key, value, media) {
                var property = this.findProperty(key);
                if (!property)
                    //throw this.ns() + ": Invalid property '" + key + "' for element '" + this.type() + "'.";
                    return;

                var forceComputed = property._forceComputed;
                var mediaSetter = media;
                if (typeof mediaSetter !== "string")
                    mediaSetter = OP3.LiveEditor.deviceMedia();
                var mediaGetter = forceComputed ? "all" : mediaSetter;

                // flag important, remove !important
                // from value (css properties only)
                var important = false;
                if (!property._forceComputed) {
                    important = /!important\s*$/.test((value || "").toString());
                    if (important)
                        value = value.toString().replace(/\s*!important\s*$/, "");
                }

                // get value before/after
                var _old = property.getter(mediaGetter);
                var _new = value;

                // execute change validation
                if (!property._skipSetOptionChangeValidation) {
                    // some setters (proxy properties) executes
                    // setOption, and we don't want event to
                    // be emited (yet)
                    OP3.disableEvents = (OP3.disableEvents || 0) + 1;

                    // set new value...
                    property.setter(value, mediaSetter);

                    // ...get value after and reset old value
                    var _new = property.getter(mediaGetter);
                    if (_old !== _new)
                        property.setter(_old, mediaSetter);

                    // clean disableEvents
                    OP3.disableEvents--;
                    if (!OP3.disableEvents)
                        delete OP3.disableEvents;
                }

                // trigger changing
                var emit = {
                    node: this.node(),
                    uuid: this.uuid(),
                    type: this.type(),
                    media: mediaGetter,
                    id: property.id(),
                    name: property.name(),
                    selector: property._selector,
                    serialize: property._serialize,
                    forceComputed: forceComputed,
                    important: important,
                    historyPending: OP3.Designer.isHistoryPending(),
                    value: {
                        before: _old,
                        after: _new,
                    },
                }
                var cancel = false
                    || OP3.transmit("elementchanging", emit)
                    || OP3.transmit("elementchanging::" + emit.type, emit)
                    || OP3.transmit("elementchanging::*::" + emit.name, emit)
                    || OP3.transmit("elementchanging::" + emit.type + "::" + emit.name, emit);
                if (cancel)
                    return;

                // ignore on no changes
                if (_old === _new)
                    return;

                // do actual change
                property.setter(_new, mediaSetter);

                // trigger change
                OP3.transmit("elementchange", emit);
                OP3.transmit("elementchange::" + emit.type, emit);
                OP3.transmit("elementchange::*::" + emit.name, emit);
                OP3.transmit("elementchange::" + emit.type + "::" + emit.name, emit);
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
                if (!options)
                    return;

                Object.keys(options).forEach(function(media) {
                    var props = options[media];

                    Object.keys(props).forEach(function(prop) {
                        try {
                            this.setOption(prop, props[prop], media);
                        }
                        catch(e) {
                            // creating elements that require template may
                            // cause "can't find DOM element with selector"
                            // exception... carry on!
                            //
                            // @todo
                            // add property to config.php that will use
                            // template markup to avoid this
                        }
                    }.bind(this));
                }.bind(this));
            },

            /**
             * Set element property value by using
             * diff object.
             *
             * Diff object is action/text object list.
             * Action can be "=" (equal), "+" (insert)
             * or "-" (delete). This method will iterate
             * diff object and, according to action,
             * insert or delete substring in current
             * element value (getOption).
             *
             * @param  {String}  key   property id
             * @param  {Object}  value diff object
             * @param  {String}  media (optional) media device
             * @return {Void}
             */
            diffOption: function(key, value, media) {
                var property = this.findProperty(key);
                if (!property)
                    return null;

                // get current
                var result = property.getter(media);
                if (result === null && computed)
                    result = property.computed();

                // iterate and alter
                var index = 0;
                value.forEach(function(item) {
                    if (item.action === "+")
                        result = result.slice(0, index) + item.text + result.slice(index);
                    else if (item.action === "-")
                        result = result.slice(0, index) + result.slice(index + item.text.length);

                    // item with action "=" doesn't have to have
                    // text (to preserve memory), but we must
                    // have length
                    if (item.action !== "-")
                        index += (item.text ? item.text.length : 0) || item.length || 0;
                });

                // apply
                this.setOption(key, result, media);
            },

            /**
             * Iterate element properties and return
             * object that match property's id (key
             * argument will be converted to camelcase,
             * so we can use css properties like
             * line-height or lineHeight)
             *
             * Note:
             * you can pass two arguments (name/selector)
             * instead of one (key)
             *
             * @param  {String} key property id
             * @return {Object}
             */
            findProperty: function(key) {
                if (!key)
                    return null;

                // name and selector
                var name = key;
                var selector = arguments[1];

                // camelcase property key (except css vatiables)
                if (name.substr(0, 2) !== "--") {
                    name = name.replace(/[^A-Za-z0-9]+([A-Za-z0-9])/g, function($0, $1) {
                        return $1.toUpperCase();
                    });
                }

                // find index by id or name+selector
                var index = null;
                this._indexProperties();

                if (typeof selector === "undefined")
                    index = this._optionIndexId[name];
                else
                    index = this._optionIndexNameSelector[name + "|" + selector];

                // not found
                if (index === null)
                    return null;

                // found
                return this._getPropertyByIndex(index);
            },

            /**
             * Element properties iterator
             *
             * @param  {Function} callback
             * @return {Void}
             */
            forEachProperty: function(callback) {
                if (typeof callback !== "function")
                    return;

                this._listProperties().forEach(function(value, index) {
                    var property = this._getPropertyByIndex(index);
                    callback.call(this, property);
                }.bind(this));
            },

            /**
             * Create simple element/children
             * object tree
             *
             * Creating tree with jquery (recursively
             * search for node/children) takes about
             * 30 times more time than using html5's
             * treewalker
             *
             * @return {Object}
             */
            tree: function() {
                //return {
                //    node: this.node(),
                //    children: $.map(this.children(), function(item) {
                //        return OP3.$(item).element().tree();
                //    }),
                //}

                var show = NodeFilter.SHOW_ELEMENT;
                var filter = function(node) {
                    if ($(node).is(".op3-element"))
                        return NodeFilter.FILTER_ACCEPT;
                    else
                        return NodeFilter.FILTER_SKIP;
                };
                var tree = document.createTreeWalker(this.node(), show, filter, false);

                var walk = function(node, data) {
                    tree.currentNode = node;
                    data.node = node;
                    data.children = [];

                    var child;
                    child = tree.firstChild();
                    if (!child)
                        return;

                    data.children.push({});
                    walk(child, data.children[data.children.length - 1]);
                    tree.currentNode = child;

                    while (child = tree.nextSibling()) {
                        data.children.push({});
                        walk(child, data.children[data.children.length - 1]);
                        tree.currentNode = child;
                    }
                }

                var result = {};
                walk(tree.currentNode, result);

                return result;
            },

            /**
             * Op3 element options serialized.
             *
             * @return {Object}
             */
            serializeOptions: function() {
                var result = {};

                this.forEachProperty(function(property) {
                    if (!property._serialize)
                        return;

                    var id = property.id();
                    var name = property.name();
                    var sel = property._selector;

                    OP3.LiveEditor.forEachDevice(function(device, media) {
                        result[media] = result[media] || {};

                        var val = this.getOption(id, media);
                        if (val === null)
                            return;

                        if (!sel && name in result[media])
                            // property exists for another selector
                            result[media][name][""] = val;
                        else if (sel && name in result[media] && typeof result[media][name] !== "object") {
                            // property exists with no selector
                            result[media][name] = { "": result[media][name] };
                            result[media][name][sel] = val;
                        }
                        else if (sel) {
                            // set property for selector
                            result[media][name] = result[media][name] || {};
                            result[media][name][sel] = val;
                        }
                        else
                            // set property with no selector
                            result[media][name] = val;
                    }.bind(this));
                }.bind(this));

                return result;
            },

            /**
             * Op3 element children serialized.
             *
             * @return {Array}
             */
            serializeChildren: function() {
                return $.map(this.children(), function(item) {
                    return OP3.$(item).element().serialize();
                });
            },

            /**
             * Op3 element serialized
             *
             * DEPRICATED:
             * this method is kind a expensive method
             * (can freeze browser UI for few seconds
             * on large page), so use serializeAsync
             * method instead
             *
             * @return {Object}
             */
            serialize: function() {
                return {
                    uuid: this.uuid(),
                    gid: this.gid(),
                    type: this.type(),
                    spec: this.spec(),
                    style: this.style(),
                    options: this.serializeOptions(),
                    children: this.serializeChildren(),
                }
            },

            /**
             * Op3 element serialized
             *
             * Since serialize method is kind a expensive
             * method we'll try to break it into smaller,
             * more lightweight jobs and execute each job
             * in it's own interval
             *
             * NOTE:
             * this method is walking through DOM and
             * calculates data, for better user experience
             * use OP3.Map.toJSON (which uses cached data)
             * instead
             *
             * @param  {Function} callback
             * @return {Void}
             */
            serializeAsync: function(callback) {
                // using busy flag we're preventin overlaping
                // two (or more) intervals
                var busy = false;

                // note that this method is not perfect. here
                // we're trying to get the balance between
                // speed and preformance, without breaking
                // the browser's UI.
                var delay = 100;
                var max = 25;

                // job's variables
                var tree, flat;

                var processor = setInterval(function(that) {
                    // flag busy
                    if (busy)
                        return;
                    busy = true;

                    // first interval -> build tree
                    if (!tree) {
                        tree = that.tree();
                        busy = false;
                        return;
                    }

                    // second interval -> flaten tree to an
                    // array for easier iteration
                    if (!flat) {
                        flat = [];
                        OP3.$.traverse(tree, null, function(item) {
                            if (OP3.$.type(item) === "object" && ("node" in item))
                                flat.push(item);
                        });
                        busy = false;
                        return;
                    }

                    // now let's do some real job
                    var count = 0;
                    while (count++ < max && flat.length) {
                        var item = flat.pop();
                        var node = item.node;
                        var element = OP3.$(node).element();
                        if (!element && node === that.node())
                            element = that;
                        delete item.node;

                        item.uuid = element.uuid();
                        item.gid = element.gid();
                        item.type = element.type();
                        item.style = element.style();
                        item.options = element.serializeOptions();
                    }

                    // job's done, clear interval
                    if (!flat.length) {
                        clearInterval(processor);
                        if (OP3.$.type(callback) === "function")
                            callback.call(that, tree);
                    }

                    // flag busy
                    busy = false;
                }, delay, this);
            },

            /**
             * Op3 element serialize as preset
             *
             * @return {Object}
             */
            serializeAsPreset: function() {
                var config = this.config(),
                    result = {
                        title: "New Preset",
                        thumb: OP3.Meta.assets + "/img/optimizepress.svg",
                        options: {},
                    };

                this.forEachProperty(function(property) {
                    var key = property.id();

                    OP3.LiveEditor.forEachDevice(function(device, media) {
                        if (!result.options[media])
                            result.options[media] = {};

                        if (!property._serialize)
                            return;
                        if (property._forceComputed && !(config.presetIncludeProperties && config.presetIncludeProperties[media] && config.presetIncludeProperties[media].indexOf(key) != -1))
                            return;
                        if (config.presetExcludeProperties && config.presetExcludeProperties[media] && config.presetExcludeProperties[media].indexOf(key) != -1)
                            return;

                        var value = property.getter(media);
                        if (value !== null)
                            result.options[media][key] = property.getter(media);
                    });
                });

                OP3.LiveEditor.forEachDevice(function(device, media) {
                    if (!Object.keys(result.options[media]).length)
                        delete result.options[media];
                });

                return result;
            },

            /**
             * Apply preset to element
             *
             * @param  {Object} preset
             * @return {Void}
             */
            unserializePreset: function(preset) {
                var config = this.config();
                var reset = {};
                this.forEachProperty(function(property) {
                    if (!property._serialize || property._forceComputed)
                        return;

                    reset[property.id()] = null;
                });

                var options = {};
                OP3.LiveEditor.forEachDevice(function(device, media) {
                    var mediaReset = $.extend({}, reset, preset.options[media]);
                    if (config.presetIncludeProperties && config.presetIncludeProperties[media])
                        config.presetIncludeProperties[media].forEach(function(key) {
                            if (!(key in mediaReset))
                                mediaReset[key] = null;
                        });
                    if (config.presetExcludeProperties && config.presetExcludeProperties[media])
                        config.presetExcludeProperties[media].forEach(function(key) {
                            delete mediaReset[key];
                        });

                    options[media] = mediaReset;
                });

                this.applyOptions(options);
            },

            /**
             * Get current node's op3 parent node
             *
             * @return {Object}
             */
            parent: function() {
                var result = $(this._node)
                    .parent()
                    .closest(".op3-element,#op3-designer-element");

                return result.length ? result.get(0) : null;
            },

            /**
             * List current node parents
             *
             * @return {Array}
             */
            parents: function() {
                return $(this._node)
                    .parents(".op3-element")
                    .toArray();
            },

            /**
             * Get element path
             * (eq. section/row/column/image)
             *
             * @param  {Boolean} full (optional)
             * @return {String}
             */
            path: function(full) {
                var result = "";
                var element = this;

                while (element) {
                    var type = element.type();
                    var style = element.style();
                    var uuid = element.uuid();

                    var item = type;
                    if (full && style)
                        item += "." + style;
                    if (full)
                        item += "#" + uuid;
                    result = item + "/" + result;

                    element = OP3.$(element.parent()).element();
                }

                return "/" + result.replace(/\/$/, "");
            },

            /**
             * Get node which contains element
             * children.
             *
             * @return {Object}
             */
            babysitter: function() {
                var result = $(this._node)
                    .find("[data-op3-children]:first");

                return result.length ? result.get(0) : null;
            },

            /**
             * List children of current node.
             * This method returns only direct
             * element descendants (not children
             * of a childen).
             *
             * @return {Array}
             */
            children: function() {
                var node = this._node;

                return $(node)
                    .find("[data-op3-children]:first > .op3-element")
                    .toArray();
            },

        },
    });

    // initialize element append counter
    OP3.bind("load::designer", function(e, o) {
        OP3.$("*")
            .jq()
            .data("op3-element-append-count", 1);
    });

    // increase element append counter
    OP3.bind("elementappend", function(e, o) {
        var element = OP3.$(o.node);
        var count = element.jq().data("op3-element-append-count") || 0;
        element.jq().data("op3-element-append-count", ++count);
        if (count > 1)
            return;

        // first element append, make sure all
        // elements have counter increased
        element
            .find("*")
            .jq()
                .each(function() {
                    var $node = $(this);
                    count = $node.data("op3-element-append-count") || 0;

                    $node.data("op3-element-append-count", ++count);
                });

        // trigger event if element is part of page
        if ($(o.node).closest("body").length) {
            OP3.transmit("elementappendfirst", o);
            OP3.transmit("elementappendfirst::" + o.type, o);
        }
    });

    // apply preset and default options
    OP3.bind("elementappendfirst", function(e, o) {
        var $node = $(o.node);

        // apply preset
        $node
            .find("[data-op3-element-preset-index]")
            .add($node)
                .each(function() {
                    var element = OP3.$(this);
                    var config = element.config();
                    var presetIndex = $(this).attr("data-op3-element-preset-index")*1 || 0;
                    element.jq().removeAttr("data-op3-element-preset-index");

                    if (config.presets && config.presets.length && presetIndex >= 0 && presetIndex < config.presets.length) {
                        var link = element.getOption("linkProperties", "all");
                        element.setOption("linkProperties", "0", "all");
                        element.applyOptions(config.presets[presetIndex].options);
                        element.setOption("linkProperties", link, "all");
                    }
                });

        // apply options from attr
        $node
            .find("[data-op3-element-preset-options]")
            .add($node)
                .each(function() {
                    var element = OP3.$(this);
                    var config = element.config();
                    var presetOptions = $(this).attr("data-op3-element-preset-options") || "";
                    element.jq().removeAttr("data-op3-element-preset-options");

                    var link = element.getOption("linkProperties", "all");
                    element.setOption("linkProperties", "0", "all");

                    try {
                        element.applyOptions(JSON.parse(presetOptions));
                    }
                    catch(e) {
                        // pass
                    }

                    element.setOption("linkProperties", link, "all");
                });
    });

    // set babysitter's data-op3-children attribute on elemet add
    OP3.bind("elementappend", function(e, o) {
        var $parent = $(o.node).closest("[data-op3-children]");
        var $children = $parent.find('[data-op3-children=""]');

        $(null)
            .add($parent)
            .add($children)
                .each(function() {
                    var count = $(this).children(".op3-element").length;

                    $(this)
                        .attr("data-op3-children", count)
                        .closest(".op3-element")
                            .attr("data-op3-has-children", count ? "1" : "0");
                });
    });

    // set babysitter's data-op3-children attribute on elemet remove
    OP3.bind("elementremove elementdetach", function(e, o) {
        $(o.parent)
            .find("[data-op3-children]:first")
                .each(function() {
                    var count = $(this).children(".op3-element").length;

                    $(this)
                        .attr("data-op3-children", count)
                        .closest(".op3-element")
                            .attr("data-op3-has-children", count ? "1" : "0");
                });
    });

})(jQuery, window, document);
