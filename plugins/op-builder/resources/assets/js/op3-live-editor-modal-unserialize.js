/**
 * OptimizePress3 live editor extension:
 * open unserialize modal.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-query.js
 *     - op3-ui.js
 *     - op3-live-editor.js
 */
;(function($, window, document) {

    "use strict";

    // extending window.OP3.LiveEditor
    var that = window.OP3.LiveEditor;

    /**
     * Unserialize modal user click ok event handler
     *
     * @param  {Object}   e
     * @param  {Object}   o
     * @param  {Function} c
     * @return {Void}
     */
    that._handle_modal_unserialize_click_ok = function(e, o) {
        if (o.value !== "ok")
            return;

        var modal = OP3.UI.modal();
        var target, data = $(modal.element).find(".op3-modal-content textarea").val();
        try {
            data = JSON.parse(data);
            target = OP3.$.unserialize(data);
        }
        catch(e) {
            throw "OP3 Error: unable to unserialize OP3 data (" + e.toString() + ")";
        }

        target.appendTo(OP3.Designer.$ui.parent);
        modal.hide();
        target.focus();
    }

    /**
     * Show unserialize modal
     *
     * @return {Void}
     */
    that.modalUnserialize = function() {
        var modal = OP3.UI.modal({
            className: "op3-modal op3-modal-unserialize button-ok-disabled",
            title: "Unserialize",
            message: "",
        });

        var link = document.createElement("a");
        if ("download" in link)
            $(modal.element).removeClass("button-ok-disabled");

        modal.on("click", function(e, o) {
            that._handle_modal_unserialize_click_ok.call(that, e, o)
        });

        modal.content("<textarea />");
        modal.show();
    }

})(jQuery, window, document);
