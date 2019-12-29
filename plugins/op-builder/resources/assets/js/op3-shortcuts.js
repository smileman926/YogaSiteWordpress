/**
 * OptimizePress3
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-ui.js
 *     - op3-designer.js
 */
;(function($, window, document) {

    return "use strict";

    /**
     * window.OP3.Shortcuts object
     *
     * @type {Object}
     */
    var that = {

        /**
         * Shortcuts configuration
         *
         * Each property in config object is in format
         * "{keyCode},{altKey},{ctrlKey},{shiftKey}".
         *
         * Value should be array with folowing items:
         *     - order          (Number)  order position in modal
         *                                (if null shortcut won't be displayed)
         *     - focusedElement (Boolean) execute handler only if op3 element
         *                                is focused (no eq. input has focus)
         *     - preventDefault (Boolean) should we call preventDefault on event
         *     - label          (String)  shortcut label on modal
         *     - description    (String)  shortcut description on modal
         *
         * Handler for each property can be defined in
         * OP3.Shortcuts object with name
         * "_handler_{keyCode}_{altKey}_{ctrlKey}_{shiftKey}"
         *
         * @type {Object}
         */
        _config: {
            "112,0,0,0": [   10, false, true,  "F1",                    "Show this help" ],
            "027,0,0,0": [   20, true,  true,  "Esc",                   "Focus parent element" ],
            "arrows":    [   30, true,  null,  "Up, Down, Left, Right", "Active element navigation" ],
            "038,0,0,0": [ null, true,  true,  "Up",                    "Active element navigation (up)" ],
            "040,0,0,0": [ null, true,  true,  "Down",                  "Active element navigation (down)" ],
            "037,0,0,0": [ null, true,  true,  "Left",                  "Active element navigation (left)" ],
            "039,0,0,0": [ null, true,  true,  "Right",                 "Active element navigation (right)" ],
            "046,0,1,0": [   80, true,  true,  "Ctrl + Del",            "Delete active element" ],
            "038,0,1,0": [   90, true,  true,  "Ctrl + Up",             "Move active element before previous" ],
            "040,0,1,0": [  100, true,  true,  "Ctrl + Down",           "Move active element after next" ],
            "037,0,1,0": [  110, true,  true,  "Ctrl + Left",           "Move active element (columns only) before previous" ],
            "039,0,1,0": [  120, true,  true,  "Ctrl + Right",          "Move active element (columns only) after next" ],
            "088,0,1,0": [  130, true,  true,  "Ctrl + X",              "Cut active element" ],
            "067,0,1,0": [  140, true,  true,  "Ctrl + C",              "Copy active element" ],
            "086,0,1,0": [  150, true,  true,  "Ctrl + V",              "Paste copied element" ],
            "090,0,1,0": [ null, true,  true,  "Ctrl + Z",              "Undo" ],
            "089,0,1,0": [ null, true,  true,  "Ctrl + Y",              "Redo" ],
        },

        /**
         * Is Mac platform
         * (value defined in _init)
         *
         * @type {Boolean}
         */
        _isMac: false,

        /**
         * Virtual clipboard:
         * storing copied element node
         *
         * @type {Node}
         */
        _clipboard: null,
        // @todo - depricated, use
        //      OP3.Elements._extension.type.Default.prototype.copy
        //      ...and
        //      OP3.Elements._extension.type.Default.prototype.paste
        //      ...instead

        /**
         * Object initialization
         *
         * @return {Void}
         */
        _init: function() {
            that._isMac = [ "Mac68K", "MacPPC", "MacIntel" ].indexOf(window.navigator.platform) > -1;

            $(null)
                .add(window.parent.document)
                .add(document)
                    .off(".op3-shortcuts")
                    .on("keydown.op3-shortcuts", that._handleKeyDown);
        },

        /**
         * Show modal with shortcut keys
         *
         * @return {Void}
         */
        modal: function() {
            var modal = window.parent.OP3.UI.modal({
                className: "op3-modal op3-modal-shortcuts button-ok-disabled",
                title: "Shortcuts",
                message: "",
            });

            var html = that._render();
            modal.content(html);
            modal.show();
        },

        /**
         * Convert config to HTML
         *
         * @return {String}
         */
        _render: function() {
            return Object.keys(OP3.Shortcuts._config)
                .map(function(item) {
                    var config = OP3.Shortcuts._config[item];

                    return {
                        order: config[0],
                        focusedElement: config[1],
                        preventDefault: config[2],
                        label: config[3],
                        description: config[4],
                    }
                })
                .filter(function(item) {
                    return item.order !== null;
                })
                .sort(function(a, b) {
                    return a.order - b.order;
                })
                .map(function(item) {
                    return ""
                        + "<dl>"
                        + "<dt>" + (that._isMac ? item.label.replace("Ctrl", "Cmd") : item.label) + "</dt>"
                        + "<dd>" + item.description + "</dd>"
                        + "</dl>";
                })
                .join("");
        },

        /**
         * Parse config from event
         *
         * @param  {Event}  e
         * @return {Object}
         */
        _parseEvent: function(e) {
            var key = ("000" + e.keyCode).slice(-3)
                + "," + e.altKey*1
                + "," + e[that._isMac ? "metaKey" : "ctrlKey"]*1
                + "," + e.shiftKey*1;
            var result = {
                key: key,
                label: null,
                description: null,
                order: null,
                focusedElement: null,
                preventDefault: null,
                handler: null,
            }

            var shortcut = that._config[key];
            if (!shortcut)
                return result;

            result.label = shortcut[3];
            result.description = shortcut[4];
            result.order = shortcut[0];
            result.focusedElement = shortcut[1];
            result.preventDefault = shortcut[2];

            var method = "_handler_" + key.replace(/,/g, "_");
            if (typeof that[method] === "function")
                result.handler = that[method];

            return result;
        },

        /**
         * Event keydown event handler
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleKeyDown: function(e) {
            if ($(window.parent.document.body).is(".ajs-no-overflow,.modal"))
                // do nothing if modal is open
                return;

            var event = that._parseEvent(e);
            if (event.focusedElement && !$(document.activeElement).is("html,body,iframe"))
                return;

            if (event.handler)
                event.handler();
            if (event.preventDefault)
                e.preventDefault();
        },

        /**
         * Shortcut F1:
         * show modal
         *
         * @return {Void}
         */
        _handler_112_0_0_0: function() {
            that.modal();
        },

        /**
         * Shortcut Esc:
         * focus parent element
         *
         * @return {Void}
         */
        _handler_027_0_0_0: function() {
            var element = OP3.Designer.activeElement();
            if (!element || element.type() === "document")
                return;

            var parent = element.parent();
            element.unfocus();
            OP3.$(parent).focus();
        },

        /**
         * Shortcut Up:
         * active element navigation
         *
         * @return {Void}
         */
        _handler_038_0_0_0: function() {
            var element = OP3.Designer.activeElement();
            if (!element || element.type() === "document" || element.type() === "column")
                return;

            element = OP3.$(element);
            var $el = element.jq();
            var $rel = $el.prev();
            if ($el.is(":first-child") || $el.prev().is('[data-op3-element-type="popoverlay"]'))
                return;

            element.unfocus();
            OP3.$($rel).focus();
        },

        /**
         * Shortcut Down
         * active element navigation
         *
         * @return {Void}
         */
        _handler_040_0_0_0: function() {
            var element = OP3.Designer.activeElement();
            if (!element || element.type() === "document" || element.type() === "column")
                return;

            element = OP3.$(element);
            var $el = element.jq();
            var $rel = $el.next();
            if ($el.is(":last-child"))
                return;

            element.unfocus();
            OP3.$($rel).focus();
        },

        /**
         * Shortcut Left
         * active element navigation
         *
         * @return {Void}
         */
        _handler_037_0_0_0: function() {
            var element = OP3.Designer.activeElement();
            if (!element || element.type() !== "column")
                return;

            element = OP3.$(element);
            var $el = element.jq();
            var $rel = $el.prev();
            if ($el.is(":first-child") || $el.prev().is('[data-op3-element-type="popoverlay"]'))
                return;

            element.unfocus();
            OP3.$($rel).focus();
        },

        /**
         * Shortcut Right
         * active element navigation
         *
         * @return {Void}
         */
        _handler_039_0_0_0: function() {
            var element = OP3.Designer.activeElement();
            if (!element || element.type() !== "column")
                return;

            element = OP3.$(element);
            var $el = element.jq();
            var $rel = $el.next();
            if ($el.is(":last-child"))
                return;

            element.unfocus();
            OP3.$($rel).focus();
        },

        /**
         * Shortcut Ctrl+Del:
         * delete active element
         *
         * @return {Void}
         */
        _handler_046_0_1_0: function() {
            var element = OP3.Designer.activeElement();
            if (!element || element.type() === "document")
                return;

            OP3.transmit("elementrequestdetach", { node: element.node() });
        },

        /**
         * Shortcut Ctrl+Up:
         * move active element before previous
         *
         * @return {Void}
         */
        _handler_038_0_1_0: function() {
            var element = OP3.Designer.activeElement();
            if (!element || element.type() === "document" || element.type() === "column")
                return;

            element = OP3.$(element);
            var $el = element.jq();
            var $rel = $el.prev();
            if ($el.is(":first-child") || $el.prev().is('[data-op3-element-type="popoverlay"]'))
                return;

            element
                .unfocus()
                .detach()
                .insertBefore($rel)
                .focus();
        },

        /**
         * Shortcut Ctrl+Down:
         * move active element after next
         *
         * @return {Void}
         */
        _handler_040_0_1_0: function() {
            var element = OP3.Designer.activeElement();
            if (!element || element.type() === "document" || element.type() === "column")
                return;

            element = OP3.$(element);
            var $el = element.jq();
            var $rel = $el.next();
            if ($el.is(":last-child"))
                return;

            element
                .unfocus()
                .detach()
                .insertAfter($rel)
                .focus();
        },

        /**
         * Shortcut Ctrl+Left:
         * move active element (columns only)
         * before previous
         *
         * @return {Void}
         */
        _handler_037_0_1_0: function() {
            var element = OP3.Designer.activeElement();
            if (!element || element.type() !== "column")
                return;

            element = OP3.$(element);
            var $el = element.jq();
            var $rel = $el.prev();
            if ($el.is(":first-child") || $el.prev().is('[data-op3-element-type="popoverlay"]'))
                return;

            element
                .unfocus()
                .detach()
                .insertBefore($rel)
                .focus();
        },

        /**
         * Shortcut Ctrl+Right:
         * move active element (columns only)
         * after next
         *
         * @return {Void}
         */
        _handler_039_0_1_0: function() {
            var element = OP3.Designer.activeElement();
            if (!element || element.type() !== "column")
                return;

            element = OP3.$(element);
            var $el = element.jq();
            var $rel = $el.next();
            if ($el.is(":last-child"))
                return;

            element
                .unfocus()
                .detach()
                .insertAfter($rel)
                .focus();
        },

        /**
         * Shortcut Ctrl+X:
         * cut active element
         *
         * @return {Void}
         */
        _handler_088_0_1_0: function() {
            var element = OP3.Designer.activeElement();
            if (!element)
                return;

            if (element.type() !== "document") {
                that._clipboard = element.node();
                element.detach();
            }
            else
                that._clipboard = null;
        },

        /**
         * Shortcut Ctrl+C:
         * copy active element
         *
         * @return {Void}
         */
        _handler_067_0_1_0: function() {
            var element = OP3.Designer.activeElement();
            if (!element)
                return;

            if (element.type() !== "document")
                that._clipboard = element.node();
            else
                that._clipboard = null;
        },

        /**
         * Shortcut Ctrl+V:
         * paste copied element
         *
         * @return {Void}
         */
        _handler_086_0_1_0: function() {
            if (!that._clipboard)
                return;

            var clone = OP3.$(that._clipboard);
            if (!clone.length)
                return;

            var element = OP3.Designer.activeElement();
            if (!element)
                return;

            /*
            // where can we paste clone (which type)
            var target = clone.config().parent;
            if (OP3.$.type(target) === "array")
                target = target[0];
            if (!target)
                return;

            // find destination element (element which
            // parent type matches target)
            var destination = OP3.$(element);
            while (destination.length && destination.type() !== target) {
                if (destination.parent().type() === target)
                    break;

                destination = destination.parent();
            }

            // try to wrap element
            if (!destination) {

            }
            //while (destination.length && destination.type() !== target) {
            //    destination = destination.parent();
            //}

            //while (destination.parent().length && destination.parent().type() !== target) {
            //    destination = destination.parent();
            //}
            return console.log("Drop", clone, destination);
            //var target = OP3.$(element);
            //target.config



            // try to paste to current element
            // if no try to paste after current element
            // if no try to paste after current element parent
            // if no try to paste after current element parent parent
            // for now paste after current section
            */

            var destination = OP3.$(element).closest("section");

            // destination not found, paste it to document
            if (!destination.length) {
                // @todo
                return;
            }

            clone
                .unfocus()
                .clone()
                    .insertAfter(destination)
                        .focus();
        },

        /**
         * Shortcut Ctrl+Z:
         * undo
         *
         * @return {Void}
         */
        _handler_090_0_1_0: function() {
            //console.log("Undo", "...work in progress");
        },

        /**
         * Shortcut Ctrl+Y
         * redo
         *
         * @return {Void}
         */
        _handler_089_0_1_0: function() {
            //console.log("Redo", "...work in progress");
        },

    }

    // globalize
    window.OP3.Shortcuts = that;
    window.parent.OP3.Shortcuts = that;

    // autoinit
    OP3.once("workercomplete", function(e, o) {
        that._init();
    });

})(jQuery, window, document);
