/**
 * OptimizePress3 live editor extension:
 * open style picker modal.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-ajax.js
 *     - op3-ui.js
 *     - op3-live-editor.js
 */
;(function($, window, document) {

    "use strict";

    // extending window.OP3.LiveEditor
    var that = window.OP3.LiveEditor;

    /**
     * Style picker item template
     *
     * @type {String}
     */
    that._template_modal_style_picker_item = ''
        + '<li class="style-item-wrapper">'
        + '<a href="#" class="style-item" draggable="false" data-click-trigger="pick" data-dblclick-trigger="pick" data-style-id="{id}">'
        + '<img src="{thumb}" alt="{title}" draggable="false" />'
        + '</a>'
        + '</li>';

    /**
     * On style picker load event handler:
     * append styles thumbs
     *
     * @param  {Object} e
     * @return {Void}
     */
    that._handle_modal_style_picker_render = function(e) {
        var $ul = $("<ul />");

        for (var i in e.styles) {
            var html = OP3.$.templating(that._template_modal_style_picker_item, e.styles[i]);
            $(html)
                .appendTo($ul);
        }

        OP3.UI.modal().content($ul);
    }

    /**
     * Style picker modal clear selection
     *
     * @param  {Object} e
     * @return {Void}
     */
    that._handle_modal_style_picker_clear = function(e) {
        $(OP3.UI.modal().element)
            .find(".op3-modal-content [data-style-id]")
            .removeClass("selected");
    }

    /**
     * Style picker modal user click ok event handler
     *
     * @param  {Object}   e
     * @param  {Object}   o
     * @param  {Function} c
     * @return {Void}
     */
    that._handle_modal_style_picker_click_ok = function(e, o, c) {
        if (o.value !== "ok")
            return;

        var style = $(OP3.UI.modal().element)
            .find(".op3-modal-content [data-style-id].selected")
            .attr("data-style-id")

        if (typeof c === "function")
            c.call(OP3.UI.modal(), style);

        OP3.UI.modal().hide();
    }

    /**
     * Style picker modal user click pick event handler
     *
     * @param  {Object}   e
     * @param  {Object}   o
     * @param  {Function} c
     * @return {Void}
     */
    that._handle_modal_style_picker_click_pick = function(e, o, c) {
        if (o.value !== "pick")
            return;

        that._handle_modal_style_picker_clear();
        $(o.element).addClass("selected")
        $(OP3.UI.modal().element).removeClass("button-ok-disabled");
    }

    /**
     * Style picker modal user dblclick pick event handler
     *
     * @param  {Object}   e
     * @param  {Object}   o
     * @param  {Function} c
     * @return {Void}
     */
    that._handle_modal_style_picker_dblclick_pick = function(e, o, c) {
        if (o.value !== "pick")
            return;

        OP3.UI.modal().trigger("click", {
            element: null,
            value: "ok",
        });
    }

    /**
     * Show style picker modal
     *
     * @param  {String}   type     (optional)
     * @param  {Function} callback
     * @return {Void}
     */
    that.modalStylePicker = function(type, callback) {
        var config = OP3.Designer.config(type);
        if (!config || config.markup) return;

        // modal thumb size
        var thumb_size = config.thumbSize ? " op3-modal-style-picker-thumb-size-" + config.thumbSize : "";

        // reset modal
        var modal = OP3.UI.modal({
            className: "op3-modal op3-modal-style-picker button-ok-disabled" + thumb_size,
            title: "Style picker",
            message: "Some message svg image something something...",
        });

        // bind events
        modal.on("click", function(e, o) {
            that._handle_modal_style_picker_click_ok.call(that, e, o, callback)
        });
        modal.on("click", function(e, o) {
            that._handle_modal_style_picker_click_pick.call(that, e, o, callback)
        });
        modal.on("dblclick", function(e, o) {
            that._handle_modal_style_picker_dblclick_pick.call(that, e, o, callback)
        });

        // show modal
        modal.show();

        // arguments
        if (typeof type === "function" && typeof callback === "undefined")
            callback = type;
        if (typeof callback !== "function")
            callback = function() {};

        // no need for api ajax request (already done so)
        if (!(config.styles && config.styles[1] === null))
            return that._handle_modal_style_picker_render(config);

        // api ajax request
        OP3.Ajax.request({
            url: "elements/" + config.type.replace(/^_/, ""),
            complete: function(jqXHR, textStatus) {
                // pass
            },
            success: function(data, textStatus, jqXHR) {
                // save data
                config.styles = data.styles;

                // callback
                that._handle_modal_style_picker_render(config);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                // to do: error handler
            }
        });

    }

})(jQuery, window, document);
