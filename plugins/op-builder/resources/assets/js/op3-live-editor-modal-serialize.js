/**
 * OptimizePress3 live editor extension:
 * open serialize modal.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-ui.js
 *     - op3-live-editor.js
 */
;(function($, window, document) {

    "use strict";

    // extending window.OP3.LiveEditor
    var that = window.OP3.LiveEditor;

    /**
     * Serialize modal user click ok event handler
     *
     * @param  {Object}   e
     * @param  {Object}   o
     * @param  {Function} c
     * @return {Void}
     */
    that._handle_modal_serialize_click_ok = function(e, o) {
        if (o.value !== "ok")
            return;

        var link = document.createElement("a");
        if (!("download" in link))
            return;

        var data = OP3.Designer.serialize();
        var content = JSON.stringify(data);
        var filename = "export.json";
        var filetype = "application/json;charset=utf-8";
        var blob = new Blob([ content ], { type: filetype });
        var url = URL.createObjectURL(blob);

        setTimeout(function() {
            link.href = url;
            link.download = filename;

            var event = new MouseEvent("click");
            link.dispatchEvent(event);
        });
    }

    /**
     * Show serialize modal
     *
     * @return {Void}
     */
    that.modalSerialize = function() {
        var modal = OP3.UI.modal({
            className: "op3-modal op3-modal-serialize button-ok-disabled",
            title: "Serialize",
            message: "",
        });

        var link = document.createElement("a");
        if ("download" in link)
            $(modal.element).removeClass("button-ok-disabled");

        modal.on("click", function(e, o) {
            that._handle_modal_serialize_click_ok.call(that, e, o)
        });

        modal.show();

        /*
        OP3.Document.serializeAsync(function(data) {
            var json = new JSONer(data);
            var html = json.toHTML();
            modal.content(html);
        });
        */

        var data = OP3.Map.toJSON();
        var json = new JSONer(data);
        var html = json.toHTML();
        modal.content(html);
    }

})(jQuery, window, document);
