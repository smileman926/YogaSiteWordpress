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
     * Sidebar category template
     *
     * @type {String}
     */
    that._templateSidebarCategoriesGroup = ''
        + '<div class="category-item" data-op3-category-id="{id}">'
        + '<h5 class="category-item-title">{title}</h5>'
        + '<ul class="category-item-children"></ul>'
        + '</div>';

    /**
     * Sidebar element template
     *
     * @type {String}
     */
    that._templateSidebarCategoriesElement = ''
        + '<li class="element-item-wrapper" data-op3-element-title="{type}">'
        + '<a href="#" class="element-item" data-op3-element-type="{type}" title="{title}" data-jquery-mmdnd-draggable="op3-query">'
        + '<div class="op3-element-thumb">'
        + '<span class="op3-icon op3-icon-{thumb}" ></span>'
        + '<span>{title}</span>'
        + '</div>'
        + '</a>'
        + '</li>';

    that._preloadWorkerJobSidebarCategoriesGroups = function() {
        // worker job - render groups
        var job = function(groups, $target) {
            this.data.op3 = this.data.op3 || {};
            this.data.op3.message = "Rendering elements";

            for (var i = 0; i < groups.length; i++) {
                var group = groups[i];
                var config = $target.data("op3-preload-config");
                var html = OP3.$.templating(that._templateSidebarCategoriesGroup, group);
                var $parent = $target;

                config[group.id] = $(html)
                    .appendTo($parent)
                    .find(".category-item-children");
            }
        }

        // list groups to render
        var $target = that.$ui.sidebar
            .find(".categories .content")
                .data("op3-preload-config", {})
                .empty();
        var list = OP3.Designer.categories();
        var size = 100;
        var chunks = OP3.$.splitList(list, size);

        // append job to worker
        for (var i = 0; i < chunks.length; i++) {
            OP3.Worker.append(job, [ chunks[i], $target ]);
        }
    }

    that._preloadWorkerJobSidebarCategoriesElements = function() {
        // worker job - render elements
        var job = function(types, $target) {
            for (var i = 0; i < types.length; i++) {
                var type = types[i];
                var category = type.category;
                var config = $target.data("op3-preload-config");
                var $parent = config[category];
                var html = OP3.$.templating(that._templateSidebarCategoriesElement, type);

                $(html)
                    .appendTo($parent);
            }
        }

        // list types to render
        var $target = that.$ui.sidebar
            .find(".categories .content");
        var list = OP3.Designer.types().filter(function(item) {
            return item.category;
        });
        var size = 80;
        var chunks = OP3.$.splitList(list, size);

        // append job to worker
        for (var i = 0; i < chunks.length; i++) {
            OP3.Worker.append(job, [ chunks[i], $target ]);
        }
    }

    that._preloadWorkerJobSidebarCategoriesClean = function(e, o) {
        OP3.Worker.append(function() {
            that.$ui.sidebar
                .find(".categories .content")
                .removeData("op3-preload-config")
                    .find(".category-item-children:empty")
                    .closest(".category-item")
                        .addClass("category-item-empty");

            OP3.transmit("sidebarrefresh");
        });
    }

    /**
     * WorkerReady event handler
     * execute preload
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    that._handleSidebarCategoriesWorkerReady = function(e, o) {
        //console.time("OP3.LiveEditorSidebarCategories._preload");

        that._preloadWorkerJobSidebarCategoriesGroups();
        that._preloadWorkerJobSidebarCategoriesElements();
        that._preloadWorkerJobSidebarCategoriesClean();

        //console.timeEnd("OP3.LiveEditorSidebarCategories._preload");
    }

    OP3.bind("workerready", that._handleSidebarCategoriesWorkerReady);

})(jQuery, window, document);
