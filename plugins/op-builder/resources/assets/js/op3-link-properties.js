;(function() {

    "use strict";

    /**
     * OP3.LinkProperties object
     *
     * @type {Object}
     */
    var that = {

        /**
         * Configuration for each element type
         * (this object is defined inside
         * op3-link-properties-config.js)
         *
         * @type {Object}
         */
        _config: {

            /*
            // column is element type
            column: [
                {
                    // element which will set css properties. this
                    // is usualy element's parent, but can be any
                    // element ancestor.
                    owner: "row",

                    // link properties only if condition is matched.
                    // this attribute is optional, usualy string,
                    // but can be function for advance usage.
                    condition: ":nth-child(1)",

                    // link element/parent or element/cousins
                    link: {
                        // link element/parent properties (used for css
                        // properties). in this example we would reset
                        // column's width/height (set to null) on
                        // column width/height change, and set
                        // row's columnWidth/columnHeight to
                        // new value.
                        parent: {
                            width: "columnWidth",
                            height: "columnHeight",
                        },

                        // link element/cousins properties (used for
                        // attribute properties). in this example we
                        // would set class to new value to all
                        // column cousins on element class
                        // property change
                        cousins: [
                            "class",
                        ],
                    },
                },
            ],
            */

        },

        /**
         * Active element's cousins object
         *
         * @type {Object}
         */
        _cousins: null,

        /**
         * Cached cousin elements
         *
         * @type {Object}
         */
        _cache: null,

        /**
         * Object initialization
         *
         * @return {Void}
         */
        _init: function() {
            //OP3.bind("elementstyling", that._handleElementStyling);
            OP3.bind("elementchanging", that._handleElementChanging);
            OP3.bind("elementchange", that._handleElementChange);
            OP3.bind("elementchange::*::linkProperties", that._handleElementChangeLinkProperties);
            OP3.bind("elementfocus", that._handleElementFocus);
            OP3.bind("elementunfocus", that._handleElementUnfocus);
            OP3.bind("elementappend", that._handleElementAppend);
            OP3.bind("elementdetach elementremove", that._handleElementDetach);
        },

        /**
         * Get node's cousin elements
         * defined in config
         *
         * @param  {Node}    node
         * @param  {Boolean} force (optional)
         * @return {Object}
         */
        _getCousinsObject: function(node, force) {
            var result = null;
            var element = OP3.$(node);
            var uuid = element.uuid();
            var type = element.type();
            if (!(type in that._config))
                return result;

            // clear cache
            if (force)
                that._cache = null;

            // active element
            else if (element.node() === OP3.Designer.activeElement().node())
                return that._cousins;

            // check cache object
            if (that._cache) {
                for (var key in that._cache) {
                    if (key === uuid)
                        return that._cache[key];
                }
            }

            // get result
            for (var i = 0; i < that._config[type].length; i++) {
                var item = that._config[type][i];
                var owner = element.parent().closest(item.owner);
                if (!owner.length)
                    continue;

                if (item.condition && !element.jq().is(item.condition))
                    continue;

                var children = owner.find(type);
                if (item.condition)
                    children = children.jq().filter(item.condition);
                if (!children.length)
                    continue;

                result = {
                    element: element,
                    owner: owner,
                    children: OP3.$(children),
                    links: OP3.$(null),
                    config: item.link,
                };

                if (that._isLinked(element))
                    result.links = OP3.$(children).filter(function() {
                        return that._isLinked(this);
                    });

                break;
            }

            // store result to cache
            that._cache = that._cache || {};
            that._cache[uuid] = result;

            // ...temporary, clear it on next interval
            setTimeout(function() {
                that._cache = null;
            });

            return result;
        },

        /**
         * Does element have linkProperties
         * turned on
         *
         * @param  {Node}    node
         * @return {Boolean}
         */
        _isLinked: function(node) {
            return !!(OP3.$(node).getOption("linkProperties", "all")*1);
        },

        /**
         * Elementstyling event handler
         *
         * @todo - never used, so never tested
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementStyling: function(e, o) {
            if (that._pending)
                return;

            // get linked elements (cousins object)
            var cousins = that._getCousinsObject(o.node);
            if (!cousins || !cousins.links || !cousins.links.length)
                return;

            // flag pending to prevent recursion
            that._pending = true;

            // set style
            cousins.children.style(o.value.after);

            // clear pending flag
            delete that._pending;

            // prevent default
            return false;
        },

        /**
         * Elementchanging event handler
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementChanging: function(e, o) {
            if (o.important || that._pending)
                return;

            var node = o.node;
            var name = o.name;
            var key = o.id;
            var value = o.value.after;
            var media = o.media;

            // skip linkProperties
            if (name === "linkProperties")
                return;

            // get linked elements (cousins object)
            var cousins = that._getCousinsObject(node);
            if (!cousins || !cousins.links || !cousins.links.length)
                return;

            // don't prevent default if there's nothing to link
            var doChildren = !!(cousins.config.parent && (key in cousins.config.parent));
            var doLinks = !!(cousins.config.cousins && cousins.config.cousins.indexOf(key) !== -1);
            if (!doChildren && !doLinks)
                return;

            // flag pending to prevent recursion
            that._pending = true;

            // reset children and set parent'a property
            if (doChildren) {
                //var prop = cousins.element.element().findProperty(key);
                //if (!prop)
                //    throw "OP3.LinkProperties: element property " + key + " does not exist (element " + cousins.element.type() + ", owner " + cousins.owner.type() + ").";
                //if (!prop._serialize)
                //    throw "OP3.LinkProperties: can not link unserialized element property " + key + " (element " + cousins.element.type() + ", owner " + cousins.owner.type() + ").";
                //
                //prop = owner.element().findProperty(cousins.config.parent[key]);
                //if (!prop)
                //    throw "OP3.LinkProperties: owner property " + cousins.config.parent[key] + " does not exist (element " + cousins.element.type() + ", owner " + cousins.owner.type() + ").";
                //if (!prop._serialize)
                //    throw "OP3.LinkProperties: can not link unserialized owner property " + cousins.config.parent[key] + " (element " + cousins.element.type() + ", owner " + cousins.owner.type() + ").";

                cousins.owner.setOption(cousins.config.parent[key], value, media);

                cousins.children
                    .each(function() {
                        var child = OP3.$(this);
                        var linkValue = null;
                        if (!that._isLinked(child))
                            linkValue = child.getOption(key, true);

                        child.setOption(key, linkValue, media);
                    });
            }

            // set property to all cousins
            if (doLinks) {
                cousins.links
                    .each(function() {
                        var child = OP3.$(this);
                        child.setOption(key, value, media);
                    });
            }

            // clear pending flag
            delete that._pending;

            // prevent default
            return false;
        },

        /**
         * Elementchange event handler:
         * changing linked element property to null
         * won't trigger elementchange (null to null),
         * so we need to force property widget resync
         * on owner change
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementChange: function(e, o) {
            var refresh = true
                && o.value.after === null
                && o.id !== "linkProperties"
                && that._cousins
                && that._cousins.config
                && that._cousins.config.parent
                && that._cousins.owner.is(o.node)
                && that._cousins.links.is(OP3.Designer.activeElement())
            if (!refresh)
                return;

            // find property key by value
            var key = Object.keys(that._cousins.config.parent)
                .filter(function(item) {
                    return that._cousins.config.parent[item] === o.id
                })[0];

            // ...and re-sync property widget
            if (key)
                OP3.transmit("elementoptionssyncrequest", { property: [ key ] });
        },

        /**
         * Elementchange::*::linkProperties
         * event handler:
         * re-sync property widgets
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementChangeLinkProperties: function(e, o) {
            var cousins = that._cousins;
            if (!cousins)
                return;

            if (cousins.children.jq().is(o.node)) {
                cousins.links.jq().removeClass("op3-link-properties");

                cousins.links = OP3.$(null);
                if (that._isLinked(o.node))
                    cousins.links = cousins.children.filter(function() {
                        return that._isLinked(this);
                    });

                cousins.links.jq().addClass("op3-link-properties");

                if (OP3.Designer.activeElement().node() === o.node)
                    OP3.transmit("elementoptionssyncrequest", { property: Object.keys(that._cousins.config.parent) });
            }
        },

        /**
         * Elementfocus event handler
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementFocus: function(e, o) {
            that._cousins = that._getCousinsObject(o.node, true);

            if (that._cousins)
                that._cousins.links.jq().addClass("op3-link-properties");
        },

        /**
         * Elementunfocus event handler
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementUnfocus: function(e, o) {
            if (that._cousins)
                that._cousins.links.jq().removeClass("op3-link-properties");

            that._cousins = null;
        },

        /**
         * Elementappend event handler
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementAppend: function(e, o) {
            if (!that._cousins)
                return;

            // is appended element inside of cousins owner
            if (!OP3.$(o.node).closest(that._cousins.owner).length)
                return;

            // refresh and repaint
            that._cousins.links.jq().removeClass("op3-link-properties");
            that._cousins = that._getCousinsObject(that._cousins.element, true);
            if (that._cousins)
                that._cousins.links.jq().addClass("op3-link-properties");
        },

        /**
         * Elementdetach event handler
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementDetach: function(e, o) {
            if (!that._cousins)
                return;

            // is detached element a part of cousin links
            if (!that._cousins.links.is(o.node))
                return;

            // refresh and repaint
            that._cousins.links.jq().removeClass("op3-link-properties");
            that._cousins = that._getCousinsObject(that._cousins.element, true);
            if (that._cousins)
                that._cousins.links.jq().addClass("op3-link-properties");
        },

    }

    // globalize
    window.OP3.LinkProperties = that;
    $(function() {
        window.parent.OP3.LinkProperties = that;
    });

    // autoinit
    $(function() {
        OP3.LinkProperties._init();
    });

    // set property computed decorator
    $(function() {
        // real computed method
        var propertyComputed = OP3.Elements._extension.prop.Default.prototype.computed;

        /**
         * Get computed css property
         *
         * Property computed decorator:
         * For example if we set margin auto on linked
         * property, we actually set it on it's parent,
         * and property.computed will give as real
         * (computed) value in px. We don't want
         * that, we want acctual value set on
         * parent...
         *
         * @return {String}
         */
        OP3.Elements._extension.prop.Default.prototype.computed = function() {
            if (this.element.getOption("linkProperties", "all")*1) {
                var result = null;
                var key = this.id();
                var node = this.element.node();
                var cousins = OP3.LinkProperties._cousins;
                if (node !== OP3.Designer.activeElement().node())
                    cousins = OP3.LinkProperties._getCousinsObject(node);

                // check if value is set to parent for
                // current media (or larger)
                if (cousins && cousins.config && cousins.config.parent && key in cousins.config.parent) {
                    var mediaCurrent = OP3.LiveEditor.deviceMedia();
                    var mediaFound = false;
                    var mediaList = [];
                    OP3.LiveEditor.forEachDevice(function(device, media) {
                        if (!mediaFound)
                            mediaList.push(media);
                        if (media === mediaCurrent)
                            mediaFound = true;
                    });
                    mediaList.reverse();

                    for (var i = 0; i < mediaList.length; i++) {
                        result = cousins.owner.element().getOption(cousins.config.parent[key], mediaList[i]);
                        if (result !== null)
                            break;
                    }
                }

                if (result !== null)
                    return result;
            }

            return propertyComputed.apply(this, arguments);
        }
    });

    // trigger elementoptionssyncrequest on linked
    // child while doing elementchange on parent
    OP3.bind("elementchange", function(e, o) {
        if (!OP3.LinkProperties._cousins)
            return;
        if (OP3.LinkProperties._cousins.owner.node() !== o.node)
            return;
        if (!OP3.LinkProperties._cousins.config.parent)
            return;

        var emit = { property: [] };
        for (var link in OP3.LinkProperties._cousins.config.parent) {
            if (OP3.LinkProperties._cousins.config.parent[link] === o.id)
                emit.property.push(link);
        }

        if (emit.property.length)
            OP3.transmit("elementoptionssyncrequest", emit);
    });

})();
