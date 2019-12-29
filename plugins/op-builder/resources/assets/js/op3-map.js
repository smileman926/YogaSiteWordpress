;(function() {

    "use strict";

    /**
     * OP3.Map object
     *
     * @type {Object}
     */
    var that = {

        /**
         * Map object:
         * each element's uuid is the key, and
         * uuid|type|style|options|children
         * object is value
         *
         * @type {Object}
         */
        _data: {},

        /**
         * Object initialization
         *
         * @return {Void}
         */
        _init: function() {
            OP3.bind("loadajaxinit", that._handleAjaxInit);
            OP3.bind("elementchange", that._handleElementChange);
            OP3.bind("elementstyle", that._handleElementStyle);
            OP3.bind("elementgid", that._handleElementGid);
            OP3.bind("elementappend", that._handleElementAppend);
            OP3.bind("elementdetach", that._handleElementDetach);
            OP3.bind("elementremove", that._handleElementRemove);
            OP3.bind("elementreplace", that._handleElementReplace);
        },

        /**
         * Sync map data with real values
         *
         * Note: data should be autosynced and
         * this should never be used
         *
         * @return {Void}
         */
        _sync: function() {
            var data = OP3.Document.serialize();

            that._data = {};
            OP3.$.flatElements(data, that._data);
        },

        /**
         * Append to data object
         *
         * @param  {Object} node
         * @return {Void}
         */
        _append: function(node) {
            var element = OP3.$(node).element();
            var children = element.children();
            var uuid = element.uuid();
            var gid = element.gid();

            // add to data if not already done so
            // (element can be detached, so data
            // may exists already)
            if (!(uuid in that._data))
                that._data[uuid] = {
                    uuid: uuid,
                    gid: gid,
                    type: element.type(),
                    spec: element.spec(),
                    style: element.style(),
                    options: element.serializeOptions(),
                    children: children.map(function(child) {
                        return OP3.$(child).uuid();
                    }),
                }

            // fix parent's children list
            var parent = OP3.$(element.parent()).element() || OP3.Document;
            that._data[parent.uuid()].children = parent.children().map(function(child) {
                return OP3.$(child).uuid();
            });

            // user can add template or wrapped element,
            // so we need to append all children recursively
            // (if one child is already in data we can assume
            // that all of them are also there)
            if (children.length && !(OP3.$(children[0]).uuid() in that._data))
                children.forEach(function(child) {
                    that._append(child);
                });
        },

        /**
         * Change data object
         *
         * @param  {String} uuid
         * @param  {String} media
         * @param  {String} name
         * @param  {String} selector
         * @param  {Mixed}  value
         * @return {Void}
         */
        _change: function(uuid, media, name, selector, value) {
            // change souldn't happen before element is
            // appended, skipping 'still-not-appended'
            // elements (data will be serailized on first
            // append)
            if (!(uuid in that._data))
                return

            // element options
            if (!("options" in that._data[uuid]))
                that._data[uuid].options[media] = {};
            if (!(media in that._data[uuid].options))
                that._data[uuid].options[media] = {};

            // php booboo fix (empty array to object)
            if (OP3.$.type(that._data[uuid].options[media]) === "array") {
                that._data[uuid].options[media] = {};
            }
            var data = that._data[uuid].options[media];

            // set property
            if (value !== null) {

                // property exists for another selector
                if (!selector && name in data && typeof data[name] === "object")
                    data[name][""] = value;

                // property exists with no selector
                else if (selector && name in data && typeof data[name] !== "object") {
                    data[name] = { "": data[name] };
                    data[name][selector] = value;
                }

                // set property for selector
                else if (selector) {
                    data[name] = data[name] || {};
                    data[name][selector] = value;
                }

                // set property with no selector
                else
                    data[name] = value;
            }

            // remove property
            else {
                try {
                    if (selector)
                        delete data[name][selector];
                    else if (!selector && typeof data[name] === "object")
                        delete data[name][""];
                    else
                        delete data[name];

                    if (name in data && $.isEmptyObject(data[name]))
                        delete data[name];
                }
                catch(e) {
                    // no property to remove
                }
            }
        },

        /**
         * Set data object style
         *
         * @param  {String} uuid
         * @param  {String} value
         * @return {Void}
         */
        _style: function(uuid, value) {
            if (that._data[uuid])
                that._data[uuid].style = value;
        },

        /**
         * Set data object gid
         *
         * @param  {String} uuid
         * @param  {String} value
         * @return {Void}
         */
        _gid: function(uuid, value) {
            if (that._data[uuid])
                that._data[uuid].gid = value;
        },

        /**
         * Detach from data object:
         * fix parent's children list
         *
         * @param  {Object} node
         * @return {Void}
         */
        _detach: function(node) {
            var parent = OP3.$(node).element() || OP3.Document;
            that._data[parent.uuid()].children = parent.children().map(function(child) {
                return OP3.$(child).uuid();
            });
        },

        /**
         * Remove from data object:
         * remove node and all it's children
         * uuids from data
         *
         * @param  {Object} node
         * @return {Void}
         */
        _remove: function(node) {
            $(null)
                .add(node)
                .add($(node).find(".op3-element"))
                    .each(function() {
                        delete that._data[$(this).attr("data-op3-uuid")];
                    });
        },

        /**
         * On ajaxinit event handler
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleAjaxInit: function(e, o) {
            var data = o.document;

            that._data = {};
            OP3.$.flatElements(data, that._data);

            OP3.transmit("mapready");
        },

        /**
         * On elementappend event handler
         * update map object
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementAppend: function(e, o) {
            that._append(o.node);
        },

        /**
         * On elementchange event handler:
         * update map object
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementChange: function(e, o) {
            if (!o.serialize)
                return;

            var element = OP3.$(o.node).element() || OP3.Document;
            var uuid = element.uuid();
            var media = o.media;
            var name = o.name;
            var selector = o.selector;
            var value = o.value.after;

            that._change(uuid, media, name, selector, value);
        },

        /**
         * On elementstyle event handler:
         * update map object
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementStyle: function(e, o) {
            var node = o.node;
            var element = OP3.$(node).element() || OP3.Document;
            var uuid = element.uuid();
            var value = o.value.after;

            that._style(uuid, value);
        },

        /**
         * On elementgid event handler:
         * update map object
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementGid: function(e, o) {
            var node = o.node;
            var element = OP3.$(node).element() || OP3.Document;
            var uuid = element.uuid();
            var value = o.value.after;

            that._gid(uuid, value);
        },

        /**
         * On elementdetach event handler
         * update map object
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementDetach: function(e, o) {
            that._detach(o.parent);
        },

        /**
         * On elementremove event handler
         * update map object
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementRemove: function(e, o) {
            that._detach(o.parent);
            that._remove(o.node);
        },

        /**
         * On elementreplace event handler
         * update map object
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementReplace: function(e, o) {
            var _old = o.value.before;
            var _new = o.value.after;
            var parent = OP3.$(_new).parent().node();

            that._detach(parent);
            that._remove(_old);
            that._append(_new);
        },

        /**
         * Build element tree
         *
         * @param  {String} uuid start element
         * @return {Object}
         */
        toJSON: function(uuid) {
            return OP3.$.unflatElements(uuid || "null", that._data);
        },

    }

    // globalize
    window.OP3.Map = that;
    $(function() {
        window.parent.OP3.Map = that;
    });

    // autoinit
    $(function() {
        OP3.Map._init();
    });

})();
