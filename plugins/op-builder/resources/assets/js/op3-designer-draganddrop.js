/**
 * OptimizePress3 designer extension:
 * adding element drag and drop functionality.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-designer.js
 *     - lib/jquery-mmdnd/jquery-mmdnd.js
 */
;(function($, window, document) {

    "use strict";

    // extending window.OP3.Designer
    var that = window.OP3.Designer;

    /**
     * Map dragarea grid for current node
     * (event.target), calculate coordinates
     * and offsets for each element child
     *
     * @param  {Object} node
     * @param  {Object} event
     * @return {Object}
     */
    that._dragAreaGrid = function(event) {
        var eventType = event.getData("type");
        var eventConfig = event.getData("config");
        var ancestor = event.getData("ancestor");
        var lock = event.getData("lock");
        var target = $(event.target);
        var element = OP3.$.closest(target);
        if (!element.length)
            element = OP3.Document;
        var config = element.config();
        var type = element.type();

        // do not allow drop into global element (while not in edit mode)
        if (element.gid() && !element.is(ancestor))
            return null;

        // element is locked to another element:
        // lock is selector that tells us where
        // we can drop our element (direct parent)
        if (lock) {
            if (element === OP3.Document && lock === "document") {
                // pass
            }
            else if (element !== OP3.Document && element.is(lock)) {
                // pass
            }
            else
                return null;
        }

        // ancestor is selector that tells us where
        // we can drop our element (direct or
        // indirect parent, document by default)
        if (ancestor === "document") {
            // pass
        }
        else if (ancestor && element !== OP3.Document && element.closest(ancestor).length) {
            // pass
        }
        else
            return null;

        // check if current drag element is allowed
        // to be dropped on drop target
        var acceptDrop = config.acceptDrop;
        if (element === OP3.Document)
            acceptDrop = true;
        if (acceptDrop && acceptDrop !== true) {
            var allowed = acceptDrop;
            if (!$.isArray(allowed))
                allowed = [ allowed ];

            acceptDrop = allowed.indexOf(eventType) !== -1;
        }
        if (!acceptDrop)
            return null;

        // element will be wrapped on drop, check if
        // that new wrapped element is allowed to
        // be dropped
        var dropWrap = eventConfig.dropWrap;
        if (dropWrap && dropWrap !== true) {
            if (!$.isArray(dropWrap))
                dropWrap = [ dropWrap ];

            dropWrap = dropWrap.indexOf(type) !== -1;
        }
        if (!dropWrap) {
            var allowed = eventConfig.parent;
            if (!$.isArray(allowed))
                allowed = [ allowed ];
            allowed = allowed.map(function(item) {
                return item === null ? "document" : item;
            });

            acceptDrop = allowed.indexOf(type) !== -1;
        }
        if (!acceptDrop)
            return null;

        // is there an element with dragStopPropagation
        // config property between target and currentTarget
        var prop = OP3.$.closest(event.originalEvent.target);
        while (prop.length && prop.node() !== element.node()) {
            if ((prop.config() || {}).dragStopPropagation) {
                acceptDrop = false;
                break;
            }

            prop = prop.parent();
        }
        if (!acceptDrop)
            return null;

        // defaults
        var result = {
            node: target.get(0),
            uuid: element.uuid(),
            type: element.type(),
            style: element.style(),
            direction: config.childrenDirectionHorizontal ? "x" : "y",
            position: [],
        }

        // calculate position
        var children = $(element.children()).filter(":visible");
        var position = target.offset();

        children.each(function() {
            var child = OP3.$(this);
            var width = $(this).outerWidth();
            var height = $(this).outerHeight();
            var offset = $(this).offset();

            var before = {
                node: this,
                uuid: child.uuid(),
                type: child.type(),
                style: child.style(),
                method: "insertBefore",
                x1: offset.left - position.left,
                x2: offset.left - position.left + width / (result.direction === "x" ? 2 : 1),
                y1: offset.top - position.top,
                y2: offset.top - position.top + height / (result.direction === "x" ? 1 : 2),
            }
            var after = {
                node: before.node,
                uuid: before.uuid,
                type: before.type,
                style: before.style,
                method: "insertAfter",
                x1: result.direction === "x" ? before.x2 : before.x1,
                x2: before.x1 + width,
                y1: result.direction === "x" ? before.y1 : before.y2,
                y2: before.y1 + height,
            }

            // set
            result.position.push(before);
            result.position.push(after);
        });

        // fix positions (margin between two elements)
        // @todo: if we're gonna use columnbreaks
        // this method won't work...
        for (var i = 1; i < result.position.length; i++) {
            var before = result.position[i - 1];
            var after = result.position[i];
            var diff = (after[result.direction + "1"] - before[result.direction + "2"]) / 2;

            before[result.direction + "2"] += diff;
            after[result.direction + "1"] -= diff;

            // fix first and last (target padding)
            if (i === 1 && before[result.direction + "1"] > 0)
                before[result.direction + "1"] = 0;
            if (i === result.position.length - 1 && after[result.direction + "2"] < target[result.direction === "x" ? "outerWidth" : "outerHeight"]())
                after[result.direction + "2"] = target[result.direction === "x" ? "outerWidth" : "outerHeight"]();
        }

        // empty element
        if (!result.position.length) {
            var before = {
                node: result.node,
                uuid: result.uuid,
                type: result.type,
                style: result.style,
                method: "appendTo",
                x1: 0,
                x2: target.outerWidth(),
                y1: 0,
                y2: target.outerHeight(),
            };

            result.position.push(before);
        }

        // leaving some horizontal space for column:
        // appending offset of 1/4 of column width
        // addition: this can be applied to any element,
        // not just column (if element has dragOffset
        // set in config)
        if (eventConfig.dropWrap && config.dragOffset) {
            for (var i = 0; i < result.position.length; i++) {
                var direction = element.parent().config().childrenDirectionHorizontal ? "x" : "y";
                var offset = (result.position[i][direction + "2"] - result.position[i][direction + "1"]) * config.dragOffset;
                result.position[i][direction + "1"] += offset;
                result.position[i][direction + "2"] -= offset;
            }
        }

        return result;
    }

    /**
     * Get dragarea object (node/direction/position)
     * from grid
     *
     * @param  {Object} event
     * @return {Object}
     */
    that._dragAreaTarget = function(event) {
        var grid = event.getData("grid");
        var target = $(event.target);
        var element = OP3.$.closest(target);
        if (!element.length)
            element = OP3.Document;

        // get data if not already done so
        var key = element.uuid() || "(none)";
        if (!(key in grid))
            grid[key] = that._dragAreaGrid(event);
        var data = grid[key];
        if (!data)
            return null;

        // compare current event offset
        // with the one in data (event's
        // offsetX and offsetY are inside
        // the position box)
        var index = null
        for (var i = 0; i < data.position.length; i++) {
            var isInside = true
                && data.position[i].x1 <= event.offsetX
                && data.position[i].x2 >= event.offsetX
                && data.position[i].y1 <= event.offsetY
                && data.position[i].y2 >= event.offsetY;

            if (isInside) {
                index = i;
                break;
            }
        }

        // no match
        if (index === null)
            return null;

        // result is data with matched position
        return {
            node: data.node,
            direction: data.direction,
            position: data.position[index],
        }
    }

    /**
     * Designer dragenter event handler
     *
     * @param  {Object} e
     * @return {Void}
     */
    that._handleDragenter = function(e) {
        var grid = e.getData("grid");
        var target = e.target;
        var parent = $(target).closest(".op3-element");
        var element = OP3.$(parent);
        var key = element.uuid() || "(none)";

        // refresh grid data for current element
        // (if not already done so)
        if (!(key in grid))
            grid[key] = that._dragAreaGrid(e);
    }

    /**
     * Designer dragover event handler
     *
     * @param  {Object} e
     * @return {Void}
     */
    that._handleDragover = function(e) {
        // calculate drag area
        var data = that._dragAreaTarget(e);

        // no data, nothing to do here
        if (!data) {
            // some elements can have their children outside
            // element box model, so dragleave won't trigger
            // until we acctualy exit child element.
            that._handleDragleave(e);

            return e.preventDefault();
        }

        // highlight description
        var desc = "unknown";
        if (data.position.method === "insertBefore" && data.direction === "x")
            desc = "left of";
        else if (data.position.method === "insertBefore" && data.direction === "y")
            desc = "above the";
        else if (data.position.method === "insertAfter" && data.direction === "x")
            desc = "right of";
        else if (data.position.method === "insertAfter" && data.direction === "y")
            desc = "below the";
        else if (data.position.method === "appendTo")
            desc = "append to";

        // reset old target
        var target = e.getData("destination");
        if (target && !$(target).is(data.position.node)) {
            $(target)
                .removeClass("op3-element-drop-target")
                .removeAttr("data-orientation")
                .removeAttr("data-position-method")
                .removeAttr("data-position-description");
        }

        // highlight new target
        target = $(data.position.node)
            .addClass("op3-element-drop-target")
            .attr("data-orientation", data.direction === "x" ? "vertical" : "horizontal")
            .attr("data-position-method", data.position.method)
            .attr("data-position-description", desc)
            .get(0);

        // set new target
        e.setData("destination", target);
        e.setData("method", data.position.method);
    }

    /**
     * Designer dragleave event handler:
     * reset destination/method
     *
     * @param  {Object} e
     * @return {Void}
     */
    that._handleDragleave = function(e) {
        $(e.getData("destination"))
            .removeClass("op3-element-drop-target")
            .removeAttr("data-orientation")
            .removeAttr("data-position-method")
            .removeAttr("data-position-description");

        e.setData("destination", null);
        e.setData("method", null);
    }

    /**
     * Designer drop event handler:
     * insert source to destination using method
     *
     * @param  {Object} e
     * @return {Void}
     */
    that._handleDrop = function(e) {
        var source = e.getData("source");
        var destination = e.getData("destination");
        var method = e.getData("method");
        var asyncDrop = e.getData("asyncDrop");

        // async drop
        if (asyncDrop && asyncDrop[0]) {
            var fn = asyncDrop[0];
            var args = asyncDrop[1] || [];

            // init progressbar
            OP3.Loadinfo.message("Loading template from API");
            OP3.Loadinfo.start(0.01);
            OP3.Loadinfo.status(0);
            OP3.Loadinfo.stop(0.1);
            OP3.Loadinfo.display(true);

            // add proggress callback to arguments
            args.push(function(data) {
                OP3.Loadinfo.status(data.status);
            });

            // add success callback to arguments
            args.push(function(data) {
                var message = "Building element";
                var start = OP3.Loadinfo.stop()*1 || 0;
                var status = 0;
                var stop = 1;

                OP3.Loadinfo.message(message);
                OP3.Loadinfo.start(start);
                OP3.Loadinfo.status(status);
                OP3.Loadinfo.stop(stop);

                OP3.$.unserializeAsync(
                    data,
                    function(e) {
                        OP3.Loadinfo.status(e.progress);
                    },
                    function(e) {
                        // update OP3.Map data
                        // (OP3.Map would handle this itself, but it
                        // would take too long, and since we already
                        // have data prepared...)
                        var flat = OP3.$.flatElements(e.data);
                        for (var uuid in flat) {
                            OP3.Map._data[uuid] = flat[uuid];
                        }

                        // do the actual drop
                        that.drop(e.element.node(), destination, method);

                        // clean and hide progressbar
                        OP3.Loadinfo.clean();
                        OP3.Loadinfo.display(false);
                    }
                );
            });

            return fn.apply(null, args);
        }

        // simple source/destination drop
        return that.drop(source, destination, method);
    }

    /**
     * Designer drop method
     *
     * @param  {Mixed}  source
     * @param  {Mixed}  destination
     * @param  {String} method
     * @return {Void}
     */
    that.drop = function(source, destination, method) {
        // nothing to do?
        if (!source || !destination || !method)
            return;

        // source is usually string, convert
        // it to op3 element query
        var $source = OP3.$(source);
        if (!$source.length)
            return;

        // no changes
        var cancel = false
            || $source.get(0) === $(destination).get(0)
            || method === "insertBefore" && $(destination).is($source.next())
            || method === "insertAfter" && $(destination).is($source.prev())
            || method === "appendTo" && $(destination).is($source.jq().parent()) && $source.jq().is(":last-child");

        if (!cancel) {
            var emit = {
                type: $source.type(),
                target: $source.get(0),
                source: source,
                destination: destination,
                method: method,
            }
            var stop = OP3.transmit("elementdrop::" + emit.type, emit);
            OP3.transmit("elementdrop", emit);

            if (stop)
                return;

            // if source is already appended to document
            // remove it first to delete empty parent
            // (option removeIfEmpty in config)
            $source.detach();

            // fix document destination
            if (OP3.Designer.$ui.babysitter.is(destination))
                destination = OP3.Designer.$ui.parent;

            // insert source to destination
            $source[method](destination);

            emit = $.extend({}, emit, { node: $source.get(0) });
            OP3.transmit("elementafterdrop", emit);
            OP3.transmit("elementafterdrop::" + emit.type, emit);
        }

        $source.focus();
    }

    /**
     * LiveEditor sidebar dragstart
     * (element) event handler:
     * set type/source
     *
     * @param  {Object} e
     * @return {Void}
     */
    var _handleSidebarElementItemDragstart = function(e) {
        var type = $(this).attr("data-op3-element-type");
        var selector = "<" + type + " />";
        var element = OP3.$(selector).element();
        var config = element.config();
        var ancestor = OP3.Designer.$ui.html.attr("data-op3-global-element-edit") || "document";
        var lock = null;
        var ghost = element.thumb();

        // type can be template, get original
        // element type
        type = element.type();

        // async drop
        var method = $(this).attr("data-op3-async-drop-method") || null;
        var args = null;
        if (method) {
            try {
                var obj = window;
                var arr = method.split(".");

                for (var i = 0; i < arr.length; i++) {
                    try {
                        obj = obj[arr[i]];
                    }
                    catch(e) {
                        obj = null;
                        break;
                    }
                }

                method = obj;
            }
            catch(err) {
                method = null;
            }
        }
        if (method) {
            try {
                args = JSON.parse($(this).attr("data-op3-async-drop-args"));
            }
            catch(err) {
                args = [];
            }
        }

        e.setData("type", type);
        e.setData("source", selector);
        e.setData("destination", null);
        e.setData("method", null);
        e.setData("config", config);
        e.setData("ancestor", ancestor);
        e.setData("lock", lock);
        e.setData("grid", {});
        e.setData("asyncDrop", [ method, args ]);
        e.setGhostElement(ghost);

        OP3.LiveEditor.sidebarHide();
        OP3.Designer.unfocus();
    }

    /**
     * Object initialization
     *
     * @return {Void}
     */
    var _init = function() {
        _ui();
        _bind();
    }

    /**
     * Init UI elements
     *
     * @return {Void}
     */
    var _ui = function() {
        var le = window.parent.OP3.LiveEditor;
        le._handleSidebarElementItemDragstart = _handleSidebarElementItemDragstart;
    }

    /**
     * Bind events
     *
     * @return {Void}
     */
    var _bind = function() {
        $(document)
            .on("mmdnddragenter", that._handleDragenter)
            .on("mmdnddragover", that._handleDragover)
            .on("mmdnddragleave", that._handleDragleave)
            .on("mmdnddrop", that._handleDrop);

        var le = window.parent.OP3.LiveEditor;
        le.$ui.sidebar
            .on("mmdnddragstart", "[data-op3-element-type]", le._handleSidebarElementItemDragstart);
    }

    /**
     * Drop destination selector
     *
     * @type {String}
     */
    var _selector = "#op3-designer-element > [data-op3-children]";

    // autoinit
    OP3.bind("ready", function() {
        _init();
    });

    // set drop destionation selector:
    // add all element nodes that have
    // acceptDrop property
    OP3.bind("ready", function(e,o) {
        var selector = OP3.Elements._types
            .filter(function(item) {
                return item.acceptDrop;
            })
            .map(function(item) {
                return '[data-op3-element-type="' + item.type + '"]' + item.dropTarget;
            })
            .join(",");

        _selector = ""
            + "#op3-designer-element>[data-op3-children]"
            + (selector ? "," : "") + selector;
    });

    // initialize drop target(s) on ready
    // and elementappend events
    OP3.bind("ready elementappend", function(e,o) {
        var $parent = $(o && o.node ? o.node : that.$ui.babysitter);
        var $target = $($parent.get(0).querySelectorAll(_selector));
        if ($parent.is(_selector))
            $target = $target.add($parent);

        $target.attr("data-jquery-mmdnd-droppable", "op3-query");
    });

})(jQuery, window, document);
