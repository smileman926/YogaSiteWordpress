/**
 * OptimizePress3:
 * adding undo/redo functionality
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-designer.js
 */
;(function($, window, document) {

    "use strict";

    var OP3_History = OP3.defineClass({

        Name: "OP3.History",

        Constructor: function() {

            /**
             * Changes list
             *
             * @type {Array}
             */
            this._data = [];

            /**
             * History position
             *
             * @type {Number}
             */
            this._position = 0;

            /**
             * History interval id:
             * storing it in data so we know which events
             * are executed 'at the same time'
             *
             * @type {Number}
             */
            this._interval = -1;

            /**
             * Group record index:
             * see groupRecord and groupApply
             *
             * @type {Number}
             */
            this._group = -1;

            /**
             * Pending flag:
             * while executing undo/redo we should
             * not listen to elementchange event
             *
             * @type {Boolean}
             */
            this._pending = false;

            /**
             * Recording flag:
             * is started
             *
             * @type {Boolean}
             */
            this._recording = false;

            /**
             * Event unique id
             *
             * @type {Number}
             */
            this._uid = -1;

            /**
             * Object unique id
             *
             * @type {Number}
             */
            this._hid = setTimeout(function() {});
            clearInterval(this._hid);

            // bind events
            this._bind("ConstructDestruct");

            // start
            if (this.AUTOSTART)
                this.start();
        },

        Prototype: {

            /**
             * Data count to remember
             *
             * @type {Number}
             */
            MAX_SIZE: 999,

            /**
             * Autostart
             *
             * Warning: please do not change this,
             * do manual autostart!
             *
             * @type {Boolean}
             */
            AUTOSTART: false,

            /**
             * Clear on save
             *
             * @type {Boolean}
             */
            CLEAR_ON_SAVE: true,

            _eventsConstructDestruct: {
                "elementreplace": "_handleReplace"
            },

            _eventsStartStop: {
                "close": "_handleClose",
                "saving": "_handleSaving",
                "elementappend elementwrap elementunwrap elementstyle elementchange elementdetach elementgid": "_handleChange",
                "elementremove": "_handleRemove",
            },

            /**
             * Destructor
             *
             * @return {Void}
             */
            destroy: function() {
                if (this._tempHistory)
                    throw "OP3.History - object has temporary history object stored, can not destruct object.";

                clearInterval(this._interval);

                this.stop();
                this._unbind("ConstructDestruct");

                delete this._data;
                delete this._position;
                delete this._interval;
                delete this._group;
                delete this._uid;
                delete this._pending;
                delete this._recording;
                delete this._tempHistory;
            },

            /**
             * Start history recording
             *
             * @return {Void}
             */
            start: function() {
                if (this._recording)
                    return;

                this._bind("StartStop");
                this._recording = true;

                OP3.transmit("historystart");
            },

            /**
             * Stop history recording
             *
             * @return {Void}
             */
            stop: function() {
                if (!this._recording)
                    return;

                this._unbind("StartStop");
                this._recording = false;

                OP3.transmit("historystop");
            },

            /**
             * Document has changes
             * (designer has history)
             *
             * @return {Boolean}
             */
            hasChanges: function() {
                return !!this._data.length;
            },

            /**
             * Can undo:
             * check data length and current
             * position
             *
             * @return {Boolean}
             */
            canUndo: function() {
                return this.isRecording() && this._position > 0;
            },

            /**
             * Can redo:
             * check data length and current
             * position
             *
             * @return {Boolean}
             */
            canRedo: function() {
                return this.isRecording() && this._position < this._data.length;
            },

            /**
             * Is history pending (in transaction)
             *
             * @return {Boolean}
             */
            isPending: function() {
                return this._pending;
            },

            /**
             * Is history recording
             *
             * @return {Boolean}
             */
            isRecording: function() {
                return this._recording;
            },

            /**
             * Clear history
             *
             * @return {Void}
             */
            clear: function() {
                if (!this._data.length)
                    return;

                this._data = [];
                this._position = this._data.length;

                clearInterval(this._interval);
                this._handleInterval();

                OP3.transmit("historyclear", {
                    data: [],
                    position: this._position,
                    count: this._data.length,
                });
            },

            /**
             * Undo
             *
             * @return {Void}
             */
            undo: function() {
                if (!this.canUndo())
                    return;

                // cancel group and flag pending so
                // _handleChange stops recording
                // changes
                this.groupCancel();
                this._pending = true;

                // next interval
                var data = this._data;
                var index = this._position;
                var interval = data[index - 1].interval;
                var emit = {
                    data: [],
                    position: -1,
                    count: data.length,
                };

                // execute method until interval changes
                var event, target, method, args;
                while (index - 1 >= 0 && data[index - 1].interval === interval) {
                    event = this._parseEventData(data[--index], true);
                    target = event.target;
                    method = event.method;
                    args = event.args;
                    interval = data[index].interval;

                    target[method].apply(target, args);
                    emit.data.push(data[index]);
                }

                // unflag pending and fix position
                this._pending = false;
                this._position = index;
                emit.position = this._position;

                // emit
                OP3.transmit("historyundo", emit);
            },

            /**
             * Redo
             *
             * @return {Void}
             */
            redo: function() {
                if (!this.canRedo())
                    return;

                // cancel group and flag pending so
                // _handleChange stops recording
                // changes
                this.groupCancel();
                this._pending = true;

                // next interval
                var data = this._data;
                var index = this._position - 1;
                var interval = data[index + 1].interval;
                var emit = {
                    data: [],
                    position: -1,
                    count: data.length,
                };

                // execute method until interval changes
                var event, target, method, args;
                while (index + 1 < data.length && data[index + 1].interval === interval) {
                    event = this._parseEventData(data[++index], false);
                    target = event.target;
                    method = event.method;
                    args = event.args;
                    interval = data[index].interval;

                    target[method].apply(target, args);
                    emit.data.push(data[index]);
                }

                // unflag pending and fix position
                this._pending = false;
                this._position = index + 1;
                emit.position = this._position;

                // emit
                OP3.transmit("historyredo", emit);
            },

            /**
             * Store current position and group
             * all events (set same interval)
             * from now until groupApply is
             * called.
             *
             * Note: Calling undo/redo will
             * cancel group.
             *
             * Important: To make this work
             * position must be at the end
             *
             * @return {Void}
             */
            groupRecord: function() {
                if (!this.isRecording())
                    return;
                if (this._position !== this._data.length)
                    return;
                if (this._group !== -1)
                    this.groupApply();

                this._group = this._position;
            },

            /**
             * Group all events (set same interval)
             * in data from group index to position
             *
             * @return {Void}
             */
            groupApply: function() {
                if (!this.isRecording())
                    return;
                if (this._position !== this._data.length)
                    return;
                if (this._group === -1 || this._position === this._group)
                    return;

                var interval = this._data[this._group].interval;
                for (var i = this._group; i < this._position; i++) {
                    this._data[i].interval = interval;
                }

                this.groupCancel();

                this._mergeLastInterval();
                this._valueToDiff();
                this._mergeDiff();
                this._setSize();
            },

            /**
             * Cancel groupRecord
             *
             * @return {Void}
             */
            groupCancel: function() {
                this._group = -1;
            },

            /**
             * Bind op3 event handlers
             *
             * @param  {String} type StartStop or ConstructDestruct
             * @return {Void}
             */
            _bind: function(type) {
                var ns = ".op3history" + this._hid,
                    config = this["_events" + type];
                if (!config)
                    return;

                this._unbind(type);

                for (var key in config) {
                    var method = config[key],
                        callback = this[method].bind(this),
                        eventName = key
                            .split(" ")
                            .map(function(event) {
                                return event + ns;
                            })
                            .join(" ");

                    OP3.bind(eventName, callback);
                }
            },

            /**
             * Unbind op3 event handlers
             *
             * @param  {String} type StartStop or ConstructDestruct
             * @return {Void}
             */
            _unbind: function(type) {
                var ns = ".op3history" + this._hid,
                    config = this["_events" + type];
                if (!config)
                    return;

                for (var key in config) {
                    key
                        .split(" ")
                        .forEach(function(event) {
                            OP3.unbind(event + ns);
                        }.bind(this));
                }
            },

            /**
             * Reverse difference object
             * (insert is delete, delete is insert)
             *
             * @param  {Array} diff
             * @return {Array}
             */
            _reverseDiff: function(diff) {
                return $.extend(true, [], diff)
                    .map(function(item) {
                        if (item.action === "+")
                            item.action = "-";
                        else if (item.action === "-")
                            item.action = "+";

                        return item;
                    });
            },

            /**
             * Parse eventData:
             * get element and method with arguments
             * to apply to OP3 while moving history
             * position
             *
             * @param  {Object}  eventData
             * @param  {Boolean} backwards (optional)
             * @return {Object}
             */
            _parseEventData: function(eventData, backwards) {
                var type = eventData.type;
                var event = eventData.event;
                var target = OP3.$(event.node).element() || OP3.Document;
                var method;
                var args = [];

                if ((type === "elementappend" && !backwards) || (type === "elementdetach" && backwards)) {
                    var parent = OP3.$(event.parent).element() || OP3.Document;
                    var $child = $(parent.children());
                    var index = event.index;

                    if ($child.length === 0) {
                        method = "appendTo";
                        args.push(parent.node());
                    }
                    else if (index < $child.length) {
                        method = "insertBefore";
                        args.push($child.eq(index));
                    }
                    else if (index >= $child.length) {
                        method = "insertAfter";
                        args.push($child.last());
                    }
                }
                else if ((type === "elementdetach" && !backwards) || (type === "elementappend" && backwards)) {
                    method = "detach";
                }
                else if (type === "elementstyle" && !backwards) {
                    method = "style";
                    args.push(event.value.after)
                }
                else if (type === "elementstyle" && backwards) {
                    method = "style";
                    args.push(event.value.before)
                }
                else if (type === "elementchange" && event.diff && !backwards) {
                    method = "diffOption";
                    args.push(event.id, event.diff, event.media);
                }
                else if (type === "elementchange" && event.diff && backwards) {
                    method = "diffOption";
                    args.push(event.id, this._reverseDiff(event.diff), event.media);
                }
                else if (type === "elementchange" && !backwards) {
                    method = "setOption";
                    args.push(event.id, event.value.after, event.media);
                }
                else if (type === "elementchange" && backwards) {
                    method = "setOption";
                    args.push(event.id, event.value.before, event.media);
                }
                else if ((type === "elementwrap" && !backwards) || (type === "elementunwrap" && backwards)) {
                    method = "wrap";
                    args.push(event.parent);
                }
                else if ((type === "elementwrap" && backwards) || (type === "elementunwrap" && !backwards)) {
                    method = "unwrap";
                }
                else if (type === "elementgid" && !backwards) {
                    method = "gid";
                    args.push(event.value.after);
                }
                else if (type === "elementgid" && backwards) {
                    method = "gid";
                    args.push(event.value.before);
                }

                return {
                    target: target,
                    method: method,
                    args: args,
                }
            },

            /**
             * Merge last interval:
             * find same events for same node and
             * remove unnecessary ones (for example
             * while setting color to red, then
             * green, then blue we do not need to
             * track red and green)
             *
             * Important: to prevent moving position
             * this can be called only when current
             * position is at the end
             *
             * @return {Void}
             */
            _mergeLastInterval: function() {
                if (!this._position || this._position !== this._data.length || this._group !== -1)
                    return;

                var index = this._position - 1;
                var interval = this._data[index].interval;
                var changes = {};
                while (index >= 0 && index < this._data.length && this._data[index].interval === interval) {
                    var item = this._data[index];
                    var event = item.event;
                    var key = item.type + $(event.node).attr("id") + event.id + (event.media || "");

                    if (changes[key]) {
                        // fix before value
                        if (event.value)
                            changes[key].value.before = event.value.before;

                        // remove unnecessary data
                        this._data.splice(index, 1);
                    }
                    else
                        // store our event in changes object
                        changes[key] = event;

                    index--;
                }

                // fix position
                this._position = this._data.length;
            },

            /**
             * Instead of value (before/after) use
             * diff object for some properties.
             * This way we preserve memory.
             *
             * Important: to prevent moving position
             * this can be called only when current
             * position is at the end
             *
             * @return {Void}
             */
            _valueToDiff: function() {
                if (typeof window.diff !== "function" || !this._position || this._position !== this._data.length || this._group !== -1)
                    return;

                var index = this._position - 1;
                var interval = this._data[index].interval;
                var props = [ "html", "html2" ];
                while (index >= 0 && index < this._data.length && this._data[index].interval === interval) {
                    var item = this._data[index];
                    if (item.type === "elementchange" && props.indexOf(item.event.name) !== -1) {
                        item.event.diff = diff(item.event.value.before, item.event.value.after)
                            .map(function(item) {
                                var action = item[0];
                                var text = item[1];

                                if (action === diff.INSERT)
                                    action = "+";
                                else if (action === diff.DELETE)
                                    action = "-";
                                else
                                    action = "=";

                                var map = {
                                    action: action,
                                    text: text,
                                };

                                if (action === "=") {
                                    map.length = text.length;
                                    delete map.text;
                                }

                                return map;
                            });

                        delete item.event.value;
                    }

                    index--;
                }
            },

            /**
             * Merge diff by specific keywords so
             * we can (for example) undo/redo text
             * by each sentence instead by each
             * character
             *
             * Important: to prevent moving position
             * this can be called only when current
             * position is at the end
             *
             * Info: since merging diff object method
             * was not as easy as it looks we're using
             * simpler method - set same interval on
             * current as on previous diff object
             *
             * @return {Void}
             */
            _mergeDiff: function() {
                if (!this._position || this._position !== this._data.length)
                    return;

                // this is complex stuff, and we'll try to make
                // it as simple as possible...
                var index = this._position - 1;
                if (index - 1 < 0)
                    return;

                // ...lets asume that user is typing something.
                // we're going to merge only last two intervals
                // (current and previous), if changes in those
                // two intervals refers to the same event target
                // and the same property. the ideal way would be
                // to iterate whole history data and find/merge
                // events, but that may slow down everything, so
                // we're just keeping it simple.
                var interval = this._data[index].interval;
                if (this._data[index - 1].interval === interval)
                    return;
                if (this._data[index].event.node !== this._data[index - 1].event.node)
                    return;
                if (!this._data[index].event.id || !this._data[index - 1].event.id)
                    return;
                if (!this._data[index].event.diff || !this._data[index - 1].event.diff)
                    return;

                // copy diff object with position and length
                var diffCopyExtended = function(diffs) {
                    var result = $.extend(true, [], diffs);
                    var offset = 0;

                    result.forEach(function(item) {
                        item.position = [ offset, offset ];

                        if (item.action === "=")
                            offset += item.length;
                        else if (item.action === "+")
                            offset += item.text.length;

                        item.position[1] = offset;
                        if ("text" in item)
                            item.length = item.text.length;
                    });

                    return result;
                }

                // every change in current diff object must have
                // change (on same position) on previous diff
                // object as well, if not there is nothing to
                // merge
                var result = true;
                var current = this._data[index].event.diff;
                var previous = this._data[index - 1].event.diff;
                var source = diffCopyExtended(current);
                var destination = diffCopyExtended(previous);

                // iterate source...
                for (var i = 0; i < source.length; i++) {
                    var itemSrc = source[i];
                    if (itemSrc.action === "=")
                        continue;

                    // ... and find position match in destination
                    var overlap = null;
                    for (var j = destination.length - 1; j >= 0; j--) {
                        var itemDst = destination[j];
                        if (itemDst.action === "=")
                            continue;

                        // overlap
                        if (itemSrc.position[0] >= itemDst.position[0] && itemSrc.position[0] <= itemDst.position[1]) {
                            overlap = itemDst;
                            break;
                        }
                    }

                    // doing some additional checks on overlap
                    var fail = (!overlap)

                        // whitespace at the end, no whitespace on previous,
                        // new word, do not merge
                        || ((/(\s+|\s*&nbsp;)$/.test(itemSrc.text) && !/(\s+|\s*&nbsp;)$/.test(overlap.text)))

                        // empty block (br tag inside block element), user
                        // pressed enter, do not merge
                        || (/<\w+><br\s*\/?><\/\w>$/.test(itemSrc.text));

                    // check fail, no need to go any further
                    if (fail)
                        return;
                }

                // all checks passed, merge last two intervals
                this._data[index].interval = this._data[index - 1].interval;
            },

            /**
             * Reduce data length to fit MAX_SIZE
             * making sure we do not break events
             * with same interval
             *
             * @return {Void}
             */
            _setSize: function() {
                if (!this._position || this._position !== this._data.length || this._group !== -1)
                    return;

                // resize required
                var data = this._data;
                if (!this.MAX_SIZE || data.length <= this.MAX_SIZE)
                    return;

                // find resize index
                var index = data.length - this.MAX_SIZE;
                var interval = data[index].interval;
                while (index < data.length && data[index + 1].interval === interval) {
                    index++;
                }

                // splice uses two arguments: index and count.
                // index is starting point (zero), and count is
                // our index increased by one
                data.splice(0, ++index);
            },

            /**
             * Interval (setTimeout) event handler:
             * reset interval and fix appended
             * data, size and position
             *
             * @return {Void}
             */
            _handleInterval: function() {
                this._interval = -1;
                this._pending = false;

                this._mergeLastInterval();
                this._valueToDiff();
                this._mergeDiff();
                this._setSize();

                this._position = this._data.length;

                if (!this._data.length)
                    return;

                // @todo - allow data manipulation by
                // binding historyappend event???

                var data = [];
                var index = this._position - 1;
                var interval = this._data[index].interval;
                while (index >= 0 && this._data[index].interval === interval) {
                    data.push(this._data[index--]);
                }

                OP3.transmit("historyappend", {
                    data: data,
                    position: this._position,
                    count: this._data.length,
                });
            },

            /**
             * Element replace event handler
             *
             * @param  {Object} e
             * @param  {Object} o
             * @return {Void}
             */
            _handleReplace: function(e, o) {
                var _old = o.value.before;
                var _new = o.value.after;
                var uuid = OP3.$(_new).uuid();

                this._data.forEach(function(item) {
                    var event = item.event;
                    if (!event || !event.node || event.node !== _old)
                        return;

                    event.node = _new;
                    if ("uuid" in event)
                        event.uuid = uuid;
                });
            },

            /**
             * Close event handler
             *
             * @param  {Object} e
             * @param  {Object} o
             * @return {Void}
             */
            _handleClose: function(e, o) {
                this.clear();
            },

            /**
             * Saving event handler
             *
             * @param  {Object} e
             * @return {Void}
             */
            _handleSaving: function(e) {
                if (!this.CLEAR_ON_SAVE)
                    return;

                this.clear();
            },

            /**
             * Element change event handler
             *
             * @param  {Object} e
             * @param  {Object} o
             * @return {Void}
             */
            _handleChange(e, o) {
                // pending undo/redo
                if (this.isPending())
                    return;

                // do not track changes for virtual properties,
                // do not track changes for proxies, do not
                // track changes for elements that haven't
                // been appended to document yet
                if (e.type === "op3elementchange" && (!o.serialize || !$(o.node).data("op3-element-append-count")))
                    return;

                // reset interval on next tick
                if (this._interval === -1)
                    this._interval = setTimeout(this._handleInterval.bind(this));

                // clear all data after current position
                // (executing undo few times moves position
                // backwards, and changing anything after
                // that should remove all events after
                // current position)
                var data = this._data;
                data.length = this._position;

                // append data
                data.push({
                    uid: ++this._uid,
                    type: e.type.replace(/^op3/, ""),
                    interval: this._interval,
                    event: $.extend(true, {}, o),
                });

                // set new position
                this._position = data.length;
            },

            /**
             * Element remove event handler:
             * clear history data with currently
             * deleted node
             *
             * @param  {Object} e
             * @param  {Object} o
             * @return {Void}
             */
            _handleRemove: function(e, o) {
                var data = this._data;
                var index = data.length;

                // iterate and remove
                while (index--) {
                    if (data[index].event.node === o.node)
                        data.splice(index, 1);
                }

                // set new position
                this._position = data.length;
            },

        },

    });

    // globalize
    window.OP3.History = new OP3_History();
    $(function() {
        window.parent.OP3.History = OP3.History;
    });

    // override designer's changed method with
    // history's hasChanges
    OP3.Designer.changed = function() {
        return OP3.History.hasChanges();
    }

    // override designer's isHistoryPending
    // method with history's isPending
    OP3.Designer.isHistoryPending = function() {
        return OP3.History.isPending();
    }

    // prepare on ready
    OP3.bind("ready", function(e, o) {
        // start on ready
        OP3.History.start();

        /**
         * Widget dragstart event handler
         *
         * @param  {Event} e
         * @return {Void}
         */
        var _handleDragStart = function(e) {
            OP3.History.groupRecord();
        }

        /**
         * Widget dragend event handler
         *
         * @param  {Event} e
         * @return {Void}
         */
        var _handleDragEnd = function(e) {
            OP3.History.groupApply();
        }

        // group history events on op3 drag widgets
        var start = "colorpickerdragstarting jqueryanglepickerdragstarting inputrangedragstart boxmodeldragstart";
        var stop = "colorpickerdragstop jqueryanglepickerdragend inputrangedragstop boxmodeldragend";
        OP3.Designer.$ui.body
            .on(start, _handleDragStart)
            .on(stop, _handleDragEnd);
        OP3.LiveEditor.$ui.body
            .on(start, _handleDragStart)
            .on(stop, _handleDragEnd);
    });

    // global elements editor:
    // replace history with new one
    OP3.bind("globalelementeditor", function(e, o) {
        if (OP3.History.isPending())
            throw "OP3.History - can not change history object, object is busy.";

        // first stop recording
        var oldHistory = OP3.History,
            recording = oldHistory.isRecording();
        oldHistory.stop();

        // then replace history objects
        if (o.node) {
            var newHistory = new OP3_History();
            OP3.History = newHistory;
            parent.OP3.History = newHistory;

            // store old history
            newHistory._tempHistory = oldHistory;
        }
        else {
            var newHistory = oldHistory._tempHistory;
            OP3.History = newHistory;
            parent.OP3.History = newHistory;

            // destruct old history
            delete oldHistory._tempHistory;
            oldHistory.destroy();
        }

        // ...and start new one
        if (recording)
            newHistory.start();
    });

})(jQuery, window, document);
