/**
 * OptimizePress3 live editor:
 * history functionality
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-live-editor.js
 */
;(function($, window, document) {

    "use strict";

    // extending window.OP3.LiveEditor
    var that = window.OP3.LiveEditor;

    // header buttons
    var $historyUndo = null,
        $historyRedo = null,
        $globalElementSave = null,
        $globalElementCancel = null,
        $pageSave = null;

    OP3.bind("ready", function(e, o) {
        $historyUndo = that.$ui.header.find(".header-btn.undo");
        $historyRedo = that.$ui.header.find(".header-btn.redo");
        $globalElementSave = that.$ui.header.find(".header-btn.global-element-save");
        $globalElementCancel = that.$ui.header.find(".header-btn.global-element-cancel");
        $pageSave = that.$ui.header.find(".header-btn.save");

        $pageSave
            .css("--op3-button-progress", "0%")
            .attr("data-op3-button-status", "default")
            .removeClass("disabled")
            .on("click", function(e) {
                e.preventDefault();
                that.save();
            });
        $historyUndo
            .addClass("disabled")
            .on("click", function(e) {
                e.preventDefault();
                OP3.History && OP3.History.undo();
            });
        $historyRedo
            .addClass("disabled")
            .on("click", function(e) {
                e.preventDefault();
                OP3.History && OP3.History.redo();
            });
        $globalElementSave
            .on("click", function(e) {
                e.preventDefault();
                OP3.GlobalElements && OP3.GlobalElements.editSave();
            });
        $globalElementCancel
            .on("click", function(e) {
                e.preventDefault();
                OP3.GlobalElements && OP3.GlobalElements.editCancel();
            });

        if (OP3.History) {
            $pageSave
                .attr("data-op3-button-status", "success")
                .addClass("disabled")
                .css("display", "");
            $historyUndo
                .css("display", "");
            $historyRedo
                .css("display", "");
        }
    });

    // saving button status
    OP3.bind("saving", function(e, o) {
        $pageSave
            .css("--op3-button-progress", "0%")
            .attr("data-op3-button-status", "pending")
            .addClass("disabled")
    });

    OP3.bind("savingprogress", function(e, o) {
        $pageSave
            .css("--op3-button-progress", o.progress.status * 90 + "%")
    });

    OP3.bind("save", function(e, o) {
        $pageSave
            .css("--op3-button-progress", "100%")
            .attr("data-op3-button-status", o.status ? "success" : "error")
            .css("--op3-button-progress", "0%")
            .addClass("disabled");

        that._intervalSaveButton = setTimeout(function() {
            var canSave = OP3.History && OP3.History.isRecording() && OP3.History.hasChanges();

            $pageSave
                .css("--op3-button-progress", "0%")
                .attr("data-op3-button-status", canSave ? "default" : "success")
                .removeClass("disabled")
                .addClass(canSave ? "_temp" : "disabled")
                .removeClass("_temp");

            delete that._intervalSaveButton;
        }, OP3.History && OP3.History.isRecording() && OP3.History.hasChanges() ? 0 : 3000);
    });

    OP3.bind("historystart historystop historyclear historyappend historyundo historyredo", function(e, o) {
        clearInterval(that._intervalSaveButton);
        delete that._intervalSaveButton;

        var canSave = OP3.History.isRecording() && OP3.History.hasChanges();
        var canUndo = OP3.History.canUndo();
        var canRedo = OP3.History.canRedo();

        if ($pageSave.attr("data-op3-button-status") !== "pending")
            $pageSave
                .css("--op3-button-progress", "0%")
                .attr("data-op3-button-status", canSave ? "default" : "success")
                .removeClass("disabled")
                .addClass(canSave ? "_temp" : "disabled")
                .removeClass("_temp");

        $historyUndo
            .removeClass("disabled")
            .addClass(canUndo ? "_temp" : "disabled")
            .removeClass("_temp");
        $historyRedo
            .removeClass("disabled")
            .addClass(canRedo ? "_temp" : "disabled")
            .removeClass("_temp");
    });

})(jQuery, window, document);
