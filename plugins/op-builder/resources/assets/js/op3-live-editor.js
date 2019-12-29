/**
 * OptimizePress3 live editor:
 * page builder wrapper.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-meta.js
 *     - op3-ajax.js
 *     - op3-ui.js
 *     - op3-loadinfo.js
 *     - op3-document.js
 *     - op3-element-map.js
 *     - op3-element-options.js
 *     - op3-live-editor-modal-style-picker.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * window.OP3.LiveEditor object
     *
     * @type {Object}
     */
    var that = {

        /**
         * Document node
         *
         * @type {Object}
         */
        ownerDocument: document,

        /**
         * UI elements
         *
         * @type {Object}
         */
        $ui: {},

        /**
         * Page metadata
         *
         * @type {Object}
         */
        meta: {},

        /**
         * Reload iframe content
         *
         * @return {Void}
         */
        reload: function() {
            var src = that.$ui.frame.attr("src");

            OP3.Designer = null;

            OP3.Loadinfo.message("Loading OptimizePress");
            OP3.Loadinfo.display(true);

            that.$ui.frame.attr("src", null);
            that.$ui.frame.attr("src", src);
        },

        /**
         * Save live editor changes
         *
         * @param {Object} e
         * @return {Void}
         */
        save: function(e) {
            var msg = {
                type: OP3.prefix,
                data: null,
            };
            var data = OP3.Map.toJSON();

            window.parent.postMessage(JSON.stringify($.extend({}, msg, { message: "saving" })), "*");
            OP3.transmit("saving", { status: null, data: data, progress: 0 });

            OP3.Ajax.request({
                method: "post",
                url: "pages/" + OP3.Meta.pageId,
                data: JSON.stringify(data),
                uploadProgress: function(e) {
                    OP3.transmit("savingprogress", { status: null, data: null, progress: e.progress });
                },
                success: function(data, textStatus, jqXHR) {
                    OP3.transmit("save", { status: true, data: data.data, progress: 1 });
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    OP3.transmit("save", { status: false, data: null, progress: 0 });
                },
                complete: function(jqXHR, textStatus) {
                    window.parent.postMessage(JSON.stringify($.extend({}, msg, { message: "saved" })), "*");
                },
            });
        },

        /**
         * Close live editor:
         * Displays confirm dialog if changes have been made.
         * If no changes (or if force param is true) live
         * editor will be closed without the dialog.
         *
         * @param  {Boolean} force (optional)
         * @return {Void}
         */
        close: function(force) {
            var changed = OP3.Designer && OP3.Designer.changed() || false;

            if (force || !changed) {
                var msg = {
                    type: OP3.prefix,
                    message: "close",
                    data: null,
                }

                OP3.transmit("close");
                window.parent.postMessage(JSON.stringify(msg), "*");
            }
            else if (changed) {
                OP3.UI.confirm("OptimizeBuilder", "Your document has not been saved. Are you sure you want to close it?", function() {
                    that.close(true);
                });
            }
        },

        /**
         * Object initialization
         *
         * @return {Void}
         */
        _init: function() {
            OP3.layer = "live-editor";

            that._ui();
            that._bind();

            OP3.transmit("domcontentloaded");
            OP3.transmit("domcontentloaded::liveeditor");
        },

        /**
         * Init UI elements
         *
         * @return {Void}
         */
        _ui: function() {
            that.$ui.html = $("html");
            that.$ui.body = $("body");
            that.$ui.header = $("#header");
            that.$ui.footer = $("#footer");
            that.$ui.frameWrapper = $("#frame");
            that.$ui.frame  = that.$ui.frameWrapper.find("iframe");

            that.$ui.html.attr("data-op3-layer", OP3.layer);
            that.$ui.body.removeClass("op3-loading");

            // Remove inlined CSS, because its the only purpose is
            // to hide the flash of unstyled HTML before
            // the live-editor stylesheet is loaded
            $("#op3-loadinfo-css").remove();
        },

        /**
         * Bind events
         *
         * @return {Void}
         */
        _bind: function() {
            $(window).on("load", that._handle_window_load);

            OP3.bind("load::designer", that._handle_transmit_load);
            OP3.bind("ready", that._handle_transmit_ready);
            OP3.bind("elementappend", that._handle_transmit_elementappend);
            OP3.bind("elementremove", that._handle_transmit_elementremove);
            OP3.bind("elementdetach", that._handle_transmit_elementdetach);
            OP3.bind("elementstyle", that._handle_transmit_elementstyle);
            OP3.bind("elementchange", that._handle_transmit_elementchange);
            OP3.bind("elementrequeststylechange", that._handle_transmit_elementrequeststylechange);
            OP3.bind("elementrequestparent", that._handle_transmit_elementrequestparent);
            OP3.bind("elementrequestclone", that._handle_transmit_elementrequestclone);
            OP3.bind("elementrequestaddrow", that._handle_transmit_elementrequestaddrow);
            OP3.bind("elementrequestaddcolumn", that._handle_transmit_elementrequestaddcolumn);
            OP3.bind("elementrequestoptions", that._handle_transmit_elementrequestoptions);
            OP3.bind("elementrequestremove", that._handle_transmit_elementrequestremove);
            OP3.bind("elementrequestdetach", that._handle_transmit_elementrequestremove);
            OP3.bind("elementrequestcreatevideopopoverlay", that._handle_transmit_elementrequestcreatevideopopoverlay);
        },

        /**
         * Window load event handler
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handle_window_load: function(e) {
            OP3.emit("load");
            OP3.emit("load::liveeditor");
        },

        /**
         * Transmitted load event handler
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handle_transmit_load: function(e) {
            OP3.Designer = e.origin.Designer;
        },

        /**
         * Transmitted ready event handler
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handle_transmit_ready: function(e) {
            // send parent ready message
            window.parent.postMessage(JSON.stringify({
                type: OP3.prefix,
                message: "ready",
                data: null,
            }), "*");

            // hide loadinfo
            OP3.Loadinfo.display(false);

            // !!! IMPORTANT !!!
            // This is a temporary fix for an issue where page builder loads but doesn't render
            // (all elements are available but they're transparent, invisible).
            // The issue happens in Chrome (72), but not in Firefox, only
            // on slower connections. It can reliably be reproduced by
            // throttling network to "Fast 3G".
            // This hack fixes the issue, but doesn't solve the underlying reason,
            // which might have to with iframe loading, but I'm not sure.
            OP3.LiveEditor.$ui.frame.css("display", "none");
            setTimeout(function() {
                OP3.LiveEditor.$ui.frame.css("display", "");
            }, 50);
        },

        /**
         * Transmitted elementappend event handler
         *
         * @param  {Object} e event object
         * @param  {Object} o additional data
         * @return {Void}
         */
        _handle_transmit_elementappend: function(e, o) {
            // var element = OP3.$(o.node).element();
            // var message = "New element type " + element.type() + " style " + (element.style() || "(none)") + " appended to document";
            // console.log(message, o.node);
        },

        /**
         * Transmitted elementremove event handler
         *
         * @param  {Object} e event object
         * @param  {Object} o additional data
         * @return {Void}
         */
        _handle_transmit_elementremove: function(e, o) {
            // var element = OP3.$(o.node).element();
            // var message = "Element type " + element.type() + " style " + (element.style() || "(none)") + " removed from document";
            // console.log(message, o.node);

            // remove parent if empty
            var parent = OP3.$(o.parent);
            if (parent.length && !parent.children().length && parent.config().removeIfEmpty)
                parent.remove();
        },

        /**
         * Transmitted elementdetach event handler
         *
         * @param  {Object} e event object
         * @param  {Object} o additional data
         * @return {Void}
         */
        _handle_transmit_elementdetach: function(e, o) {
            // var element = OP3.$(o.node).element();
            // var message = "Element type " + element.type() + " style " + (element.style() || "(none)") + " detached from document";
            // console.log(message, o.node);

            // detach parent if empty
            var parent = OP3.$(o.parent);
            if (parent.length && !parent.children().length && parent.config().removeIfEmpty)
                parent.detach();
        },

        /**
         * Transmitted elementstyle event handler
         *
         * @param  {Object} e event object
         * @param  {Object} o additional data
         * @return {Void}
         */
        _handle_transmit_elementstyle: function(e, o) {
            //var element = OP3.$(o.node).element();
            //var message = "Element type " + element.type() + " style changed from " + o.value.before + " to " + o.value.after;
            //console.log(message, o.node);
        },

        /**
         * Transmitted elementchange event handler
         *
         * @param  {Object} e event object
         * @param  {Object} o additional data
         * @return {Void}
         */
        _handle_transmit_elementchange: function(e, o) {
            //var element = OP3.$(o.node).element();
            //var message = "Element type " + element.type() + " style " + (element.style() || "(none)") + " option " + o.key + " changed from " + o.value.before + " to " + o.value.after + " for media " + o.media;
            //console.log(message, o.node);
        },

        /**
         * Transmited elementrequeststylechange event handler
         *
         * @param  {Object} e event object
         * @param  {Object} o additional data
         * @return {Void}
         */
        _handle_transmit_elementrequeststylechange: function(e, o) {
            var element = OP3.$(o.node).element();
            that.modalStylePicker(element.type(), function(e) {
                element.style(e);
            });
        },

        /**
         * Transmitted elementrequestparent event handler
         *
         * @param  {Object} e event object
         * @param  {Object} o additional data (node)
         * @return {Void}
         */
        _handle_transmit_elementrequestparent: function(e, o) {
            OP3.$(o.node).parent().focus();
        },

        /**
         * Transmitted elementrequestclone event handler
         *
         * @param  {Object} e event object
         * @param  {Object} o additional data (node)
         * @return {Void}
         */
        _handle_transmit_elementrequestclone: function(e, o) {
            OP3.$(o.node)
                .unfocus()
                .clone()
                    [o.method || "insertAfter"](o.node)
                    .focus();
        },

        /**
         * Transmitted elementrequestaddrow event handler
         *
         * @param  {Object} e event object
         * @param  {Object} o additional data (node)
         * @return {Void}
         */
        _handle_transmit_elementrequestaddrow: function(e, o) {
            var $node = OP3.$(o.node);
            if ($node.type() !== "row")
                return;

            OP3.$("<column />")
                [o.method || "insertAfter"]($node)
                .closest("row")
                .focus();
        },

        /**
         * Transmitted elementrequestaddcolumn event handler
         *
         * @todo
         * this method depends on jquery-flex-grid-cell-sizer?!?!
         *
         * @param  {Object} e event object
         * @param  {Object} o additional data (node)
         * @return {Void}
         */
        _handle_transmit_elementrequestaddcolumn: function(e, o) {
            var $node = OP3.$(o.node);
            if ($node.type() !== "column")
                return;

            var column = $node.closest("column");
            var $column = column.jq();
            var sizer = $column.parent().data("jquery-flex-grid-cell-sizer");
            var index = sizer.columns.index($column);
            var element = OP3.$("<column />");

            // use flex-grid-sizer to append column
            // (library autp-resizes columns)
            sizer[o.method || "insertAfter"](index, element.jq());

            // append element in op3 way to make
            // sure append event is triggered
            element.appendTo(column.parent());

            element.focus();
        },

        /**
         * Transmitted elementrequestoptions event handler
         *
         * @param  {Object} e event object
         * @param  {Object} o additional data (node)
         * @return {Void}
         */
        _handle_transmit_elementrequestoptions: function(e, o) {
            OP3.ElementOptions.toggle();
        },

        /**
         * Transmitted elementrequestremove event handler
         *
         * @param  {Object} e event object
         * @param  {Object} o additional data (node)
         * @return {Void}
         */
        _handle_transmit_elementrequestremove: function(e, o) {
            var element = OP3.$(o.node);
            if (!element.length)
                return;

            element
                .unfocus()
                .detach();
        },

        /**
         * Transmitted elementrequestcreatevideopopoverlay event handler
         *
         * @param {Object} e
         * @param {Object} o
         */
        _handle_transmit_elementrequestcreatevideopopoverlay: function(e, o) {
            var target = OP3.$("<_videopopoverlay_template />");
            var position = OP3.Designer.$ui.parent
                .find('> [data-op3-children] [data-op3-element-type="popoverlay"]')
                .last();

            // Either prepend it to #op3-designer-element
            // or add it after the last
            // existing popoverlay
            if (!position.length)
                target.prependTo(OP3.Designer.$ui.parent);
            else
                target.insertAfter(position);

            // Open popoverlay
            that._edit_popoverlay(target.uuid());

            // Select video
            target.find("video").focus();

            // Set element action to open newly created popoverlay
            var element = OP3.$(o.node);
            element.setOption("action", "popoverlay", o.media);
            element.setOption("popOverlayTrigger", target.uuid(), o.media);
        }
    }

    // globalize
    window.OP3.LiveEditor = that;
    window.OP3.Designer = null;

    // autoinit
    $(function() {
        OP3.LiveEditor._init();
    });

})(jQuery, window, document);
