/**
 * OptimizePress3 live editor extension:
 * adding elements to sidebar and binding
 * events to it.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-storage.js
 *     - op3-live-editor.js
 *     - op3-live-editor-sidebar.js
 *     - op3-designer.js
 *     - op3-query.js
 */
;(function($, window, document) {

    "use strict";

    // extending window.OP3.LiveEditor
    var that = window.OP3.LiveEditor;

    /**
     * Render sidebar thumb
     *
     * @param  {String} gid
     * @return {Node}
     */
    var _render = function(gid) {
        var data = OP3.GlobalElements.data(gid);
        if (!data)
            return null;

        var html = ''
            + '<li class="template-thumb-item">'
            + '<a href="#" class="template-thumb-link" title="{title}" data-op3-global-element-gid="{gid}" data-op3-element-type="{type}" data-op3-async-drop-method="OP3.GlobalElements.template" data-op3-async-drop-args="[&quot;{gid}&quot;]" data-jquery-mmdnd-draggable="op3-query">'
            + '<div class="template-thumb">'
            + '<img class="template-thumb-image" src="{thumb}" alt="{title}" />'
            + '<span class="template-thumb-label">{title}</span>'
            + '</div>'
            + '</a>'
            + '</li>';

        // @todo
        //      - _preloadImages
        //      - cached content/thumb

        if (!OP3.LiveEditor.$ui.sidebarGlobalElementContent)
            OP3.LiveEditor.$ui.sidebarGlobalElementContent = OP3.LiveEditor.$ui.sidebar.find('.tab-content[data-tab="global-elements"] .content');

        var $target = OP3.LiveEditor.$ui.sidebarGlobalElementContent,
            $old = $target.find('.template-thumb-link[data-op3-global-element-gid="' + gid + '"]'),
            $new = $(OP3.$.templating(html, data));

        if ($old.length) {
            $new.insertAfter($old);
            $old.remove();
        }
        else
            // newest first
            $new.prependTo($target);

        return $new.get(0);
    }

    /**
     * WorkerReady event handler
     * execute preload
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    that._handleSidebarGlobalElementsWorkerReady = function(e, o) {
        //console.time("OP3.LiveEditorSidebarCategories._preload");

        that._preloadWorkerJobSidebarGlobalElementsItems();
        that._preloadWorkerJobSidebarGlobalElementsClean();

        //console.timeEnd("OP3.LiveEditorSidebarCategories._preload");
    }

    that._preloadWorkerJobSidebarGlobalElementsItems = function() {
        // worker job - render elements
        var job = function(gids) {
            for (var i = 0; i < gids.length; i++) {
                var gid = gids[i];
                var thumb = _render(gid);

                $(thumb)
                    .appendTo($target);
            }
        }

        // list items to render
        var $target = that.$ui.sidebar
            .find('.tab-content[data-tab="global-elements"] .content')
        var gids = OP3.GlobalElements._data.map(function(item) {
            return item.gid;
        });
        var size = 80;
        var chunks = OP3.$.splitList(gids, size);

        // append job to worker
        for (var i = 0; i < chunks.length; i++) {
            OP3.Worker.append(job, [ chunks[i] ]);
        }
    }

    that._preloadWorkerJobSidebarGlobalElementsClean = function(e, o) {
        OP3.Worker.append(function() {
            that.$ui.sidebar
                .find('.tab-content[data-tab="global-elements"] .content')
                .removeData("op3-preload-config");

            OP3.transmit("sidebarrefresh");
        });
    }

    // render sidebar global elements with worker
    OP3.bind("workerready", that._handleSidebarGlobalElementsWorkerReady);

    // Update element in sidebar (globals)
    OP3.bind("elementgid elementgidupdate", function(e, o) {
        _render(OP3.$(o.node).element().gid());
    });

    OP3.bind("ready", function(e, o) {
        OP3.LiveEditor.$ui.sidebarWrapper.on("click", "button[data-op3-global-element-action]", function(e) {
            var action = $(this).attr("data-op3-global-element-action");
            if (action === "wizard")
                OP3.GlobalElements.openWizard();
            else if (action === "unlock")
                OP3.GlobalElements.editMode(true);
            else if (action === "unlink")
                OP3.Designer.activeElement().gid("");
        });
    });

})(jQuery, window, document);
