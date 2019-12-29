/**
 * OptimizePress3 element type
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-query.js
 *     - op3-element-options.js
 */
;(function($, window, document) {

    "use strict";

    var that = {

        /**
         * Configuration
         * (this object is defined inside
         * op3-document-options-config.js)
         *
         * @type {Object}
         */
        _config: {},

        /**
         * Current focused element
         *
         * @type {Object}
         */
        element: null,

        /**
         * Attached form of current element
         *
         * @type {Object}
         */
        form: null,

        /**
         * Not used
         *
         * @type {Object}
         */
        _template: null,

        /**
         * Group (accordion) template
         *
         * @type {String}
         */
        _templateGroup: ''
            +   '<div class="op3-element-options-group" data-op3-element-options-group-id="{id}">'
            +      '<header class="op3-options-group-header">'
            +           '{label}'
            +           '<div class="op3-options-group-actions">'
            +               '<i class="op3-options-group-actions-reset op3-options-group-actions-reset-{reset} op3-icon op3-icon-refresh-02-1" aria-hidden="true"></i>'
            +               '<i class="op3-options-group-actions-toggle op3-icon op3-icon-stre-up"></i>'
            +          '</div>'
            +       '</header>'
            +   '</div>',

        /**
         * Object initialization
         *
         * @return {Void}
         */
        _init: function() {
            if (that._props)
                return;

            OP3.LiveEditor.$ui.sidebar.find('[data-tab="settings"]')
                .on("click", ".op3-element-options-property-reset", that._handlePropertyReset);

            OP3.bind("workerready", that._handleWorkerReady);
            OP3.bind("elementappend", that._handleElementAppend);
            OP3.bind("elementdetach elementremove", that._handleElementDetach);
            OP3.bind("elementchange", that._handleElementChange);
            OP3.bind("elementoptionssyncrequest", that._handleElementOptionsSyncRequest);
            OP3.bind("elementoptionsrefreshrequest", that._handleElementOptionsRefreshRequest);
            OP3.bind("devicechange", that._handleDeviceChange);
        },

        _preloadWorkerJobForm: function() {
            // job done
            if (that.form)
                return false;

            // job handler
            var weight = 1/25;
            var fn = function() {
                this.data.op3 = this.data.op3 || {};
                this.data.op3.message = "Rendering settings";

                var config = $.extend(true, {}, that._config);
                var $form = OP3.LiveEditor.$ui.sidebar.find('[data-tab="settings"] form:first')
                    .data("op3-preload-config", config)
                    .attr("data-op3-user-role", OP3.Meta.userRole)
                    .attr("data-op3-element-options-render-status", "rendering")
                    .attr("data-op3-element-options-type", that.element.type())
                    .attr("data-op3-element-options-uuid", "")
                    .attr("data-op3-element-options-gid", "")
                    .attr("data-op3-element-options-style", "")
                    .attr("data-op3-element-options-spec", "")
                    .attr("data-op3-element-options-path", that.element.path())
                    //.attr("data-op3-element-options-path-full", "")
                    .attr("data-op3-element-options-has-styles", "0")
                    .attr("data-op3-element-options-has-presets", "0")
                    .attr("data-op3-element-options-children-count", "")
                    .attr("data-op3-element-options-row-children-count", "");

                that.form = $form.get(0);
            }

            // append job
            OP3.Worker.append(fn, [], weight);

            // job added
            return true;
        },

        _preloadWorkerJobNavGroups: function() {
            // job list (arguments)
            var list = [];
            for (var i = 0; i < that._config.group.length; i++) {
                list.push([ i ]);
            }

            // job done
            var done = $(that.form).find(".op3-element-options-group").length;
            if (done === list.length)
                return false;

            // job handler
            var weight = 1/25;
            var fn = function(groupIndex) {
                var form = that.form;
                if (!form)
                    return;

                var $form = $(form);
                var config = $form.data("op3-preload-config");
                if (!config)
                    return;

                var template = OP3.$.templating(that._templateGroup, config.group[groupIndex]);
                config.group[groupIndex].$ui = {
                    parent: $(template)
                        .appendTo($form),
                }
            }

            // append job
            for (var i = done; i < list.length; i++) {
                OP3.Worker.append(fn, list[i], weight);
            }

            // job added
            return true;
        },

        _preloadWorkerJobProperty: function() {
            // job list (arguments)
            var list = [];
            if (that._config.group && that._config.group.length)
                for (var i = 0; i < that._config.group.length; i++) {
                    var group = that._config.group[i];
                    if (group.prependHTML)
                        list.push([ i, false, group.prependHTML ]);

                    if (group.property)
                        for (var j = 0; j < group.property.length; j++) {
                            list.push([ i, true, group.property[j] ]);
                        }

                    if (group.appendHTML)
                        list.push([ i, false, group.appendHTML ]);
                }

            // job done
            var done = $(that.form).find(".op3-element-options-property, .op3-element-options-custom-html").length;
            if (done === list.length)
                return false;

            // job handler
            var weight = 1/6;
            var fn = function(groupIndex, useElement, value) {
                var $form = $(that.form);
                var config = $form.data("op3-preload-config");
                var group = config.group[groupIndex];
                var $target = group.$ui.parent;

                if (useElement) {
                    var node = that.element.findProperty(value).prerender();
                    $target.append(node);

                    var emit = {
                        node: null,
                        type: that.element.type(),
                        parent: node,
                    }
                    OP3.transmit("elementoptionsrefresh", emit);
                    OP3.transmit("elementoptionsrefresh::" + emit.type, emit);
                }
                else
                    $target.append('<div class="op3-element-options-custom-html">' + value + '</div>');
            }

            // append job to worker
            for (var i = done; i < list.length; i++) {
                OP3.Worker.append(fn, list[i], weight);
            }

            // job added
            return true;
        },

        _preloadWorkerJobClean: function() {
            // job done
            if (that.form) {
                var status = $(that.form).attr("data-op3-element-options-render-status");
                if (status === "rendered" || status === "ready")
                    return false;
            }

            // job handler
            var weight = 1/2;
            var fn = function() {
                if (!that.form)
                    return;

                $(that.form)
                    .removeData("op3-preload-config")
                    .attr("data-op3-element-options-render-status", "rendered");

                var emit = {
                    node: null,
                    type: that.element.type(),
                    parent: that.form,
                }
                OP3.transmit("elementoptionsformprerender", emit);
                OP3.transmit("elementoptionsformprerender::" + emit.type, emit);
            }

            // append job
            OP3.Worker.append(fn, [], weight);

            // job added
            return true;
        },

        /**
         * Create form
         *
         * @return {Void}
         */
        _preload: function() {
            // prerender only once
            if (that.element)
                return;
            that.element = OP3.Document;

            // render
            that._preloadWorkerJobForm();
            that._preloadWorkerJobNavGroups();
            that._preloadWorkerJobProperty();
            that._preloadWorkerJobClean();

            // when all done prepare form
            OP3.Worker.append(that._activateForm, [], 1/2);
        },

        /**
         * Set input values for form
         *
         * @param  {String} property (optional)
         * @return {Void}
         */
        _sync: function(property) {
            var element = that.element;
            var node = element.node();
            var type = element.type();
            var form = that.form;
            var media = OP3.LiveEditor.deviceMedia();
            if (!element || !form || $(form).attr("data-op3-element-options-render-status") === "rendering")
                return;

            // unbind event before sync
            var binded = !!$(form).getEventListeners("change.op3elementoptions").length;
            if (binded)
                $(form)
                    .off("change.op3elementoptions");

            // all properties or find the one from argument
            var selector = "";
            if (property) {
                var className = "op3-element-options-property-input";
                var dataAttr = "data-op3-element-options-property-id";
                var propType = OP3.$.type(property);

                if (propType === "string")
                    property.split(",").forEach(function(item) {
                        selector += (selector ? "," : "") + "." + className + "[" + dataAttr + '="' + item.trim() + '"]';
                    });
                else if (propType === "array")
                    property.forEach(function(item) {
                        selector += (selector ? "," : "") + "." + className + "[" + dataAttr + '="' + item.trim() + '"]';
                    });
                else if (propType === "object" && property.id)
                    selector += (selector ? "," : "") + "." + className + "[" + dataAttr + '="' + property.id + '"]';
            }
            selector = selector || ".op3-element-options-property-input";

            // disable hovers
            //var hoverDisabled = OP3.Designer.$ui.parent.hasClass("op3-disable-hover");
            //if (!hoverDisabled)
            //    OP3.Designer.$ui.parent.addClass("op3-disable-hover");

            // iterate form inputs
            $(form).find(selector).each(function() {
                var key = $(this).attr("data-op3-element-options-property-id");
                var name = $(this).attr("data-op3-element-options-property-name");
                var value = element.getOption(key, media);
                var isNull = element.isOptionNull(key, media) ? "1" : "0";
                var isDefault = element.isOptionDefault(key, media) ? "1" : "0";

                if (value === null)
                    value = element.getOption(key, true);
                var trigger = $(this).val() != value;

                $(this)
                    .closest(".op3-element-options-property")
                        .attr("data-op3-element-options-property-value", value)
                        .attr("data-op3-element-options-property-isnull", isNull)
                        .attr("data-op3-element-options-property-default", isDefault);
                $(this)
                    .attr("data-op3-element-options-property-media", media)
                    .val(value)
                    .trigger(trigger ? "change" : "_op3nothing");

                var emit = {
                    node: node,
                    parent: form,
                    input: this,
                    id: key,
                    name: name,
                    value: value,
                }
                OP3.transmit("elementoptionssync", emit);
                OP3.transmit("elementoptionssync::" + type, emit);
                OP3.transmit("elementoptionssync::*::" + emit.name, emit);
                OP3.transmit("elementoptionssync::" + type + "::" + emit.name, emit);
            });

            // enable hovers
            //if (!hoverDisabled)
            //    OP3.Designer.$ui.parent.removeClass("op3-disable-hover");

            // bind event back
            if (binded)
                $(form)
                    .off("change.op3elementoptions")
                    .on("change.op3elementoptions", ".op3-element-options-property-input", that._handleFormChange);
        },

        /**
         * Prepare tabs/groups
         *
         * @return {Void}
         */
        _activateForm: function() {
            var element = that.element;
            var $form = $(that.form);
            if (!element || !$form.length)
                return;

            // set form data attributes and bind events
            $form
                //.attr("data-op3-element-options-type", that.element.type())
                .attr("data-op3-element-options-uuid", that.element.uuid())
                //.attr("data-op3-element-options-gid", that.element.gid())
                //.attr("data-op3-element-options-style", that.element.style())
                //.attr("data-op3-element-options-spec", that.element.spec())
                //.attr("data-op3-element-options-path", that.element.path())
                //.attr("data-op3-element-options-path-full", that.element.path(true))
                .attr("data-op3-element-options-children-count", that.element.children().length);

            // close all groups and display
            // only first ones
            $form
                .find(".op3-element-options-group")
                .removeClass("dropdown")
                .filter(function() {
                    return !$(this).prevAll(".op3-element-options-group").length;
                })
                .addClass("dropdown")
                .removeData("op3-preload-config");

            var emit = {
                node: that.element.node(),
                parent: that.form,
                type: element.type(),
            }
            OP3.transmit("elementoptionsformattach", emit);
            OP3.transmit("elementoptionsformattach::" + emit.type, emit);

            that._sync();

            $(that.form)
                .attr("data-op3-element-options-render-status", "ready")
                .off("change.op3elementoptions")
                .on("change.op3elementoptions", ".op3-element-options-property-input", that._handleFormChange);
        },

        /**
         * Refresh entire form or
         * single property on it
         *
         * @param  {String} property (optional)
         * @return {Void}
         */
        refresh: function(property) {
            that._sync(property);
        },

        /**
         * Property Reset event handler
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handlePropertyReset: function(e) {
            var $widget = $(e.currentTarget).closest(".op3-element-options-property");
            var key = $widget.attr("data-op3-element-options-property-id");
            var prop = that.element.findProperty(key);
            if (prop)
                prop.reset();

            e.preventDefault();
        },

        /**
         * WorkerReady event handler
         * execute preload
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleWorkerReady: function(e, o) {
            that._preload();
        },

        /**
         * ElementAppend event handler:
         * sync changes with current form
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementAppend: function(e, o) {
            if (!o.node || !that.form || !that.element || !OP3.Designer.$ui.parent.is(o.parent))
                return;

            $(that.form)
                .attr("data-op3-element-options-children-count", that.element.children().length);
        },

        /**
         * ElementDetach event handler:
         * sync changes with current form
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementDetach: function(e, o) {
            if (!o.parent || !that.form || !that.element || !OP3.Designer.$ui.parent.is(o.parent))
                return;

            $(that.form)
                .attr("data-op3-element-options-children-count", that.element.children().length);
        },

        /**
         * ElementChange event handler:
         * sync changes with current form
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementChange: function(e, o) {
            if (!o.node || !that.form || !that.element || o.node !== that.element.node())
                return;
            if (!o.forceComputed && o.media !== OP3.LiveEditor.deviceMedia())
                return;

            that._sync(o.id);
        },

        /**
         * Deveice change event handler:
         * refresh
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleDeviceChange: function(e, o) {
            that._handleElementOptionsSyncRequest(e, o);
        },

        /**
         * ElementOptionsSyncRequest event handler:
         * sync data
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementOptionsSyncRequest: function(e, o) {
            if (!that.element)
                return;

            var props = null;
            if (e.type === "op3elementoptionssyncrequest")
                props = o.property || null;

            that._sync(props);
        },

        /**
         * ElementOptionsRefreshRequest event handler:
         * re-render and replace form propertie(s)
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementOptionsRefreshRequest: function(e, o) {
            var element = OP3.Designer.activeElement();
            if (!element || element !== OP3.Document)
                return;

            var property = o.property;
            if (typeof property === "string")
                property = [ property ];

            if (OP3.$.type(property) === "array") {
                property.forEach(function(item) {
                    var $old = $(that.form).find('.op3-element-options-property[data-op3-element-options-property-id="' + item + '"]');
                    var $new = element.findProperty(item).render();

                    // replace old with new
                    $old
                        .after($new)
                        .remove();

                    // emit event
                    var emit = {
                        node: null,
                        type: element.type(),
                        parent: $new,
                    }
                    OP3.transmit("elementoptionsrefresh", emit);
                    OP3.transmit("elementoptionsrefresh::" + emit.type, emit);
                });
            }
        },

        /**
         * Form change event handler:
         * set element option
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleFormChange: function(e) {
            var key = $(e.target).attr("data-op3-element-options-property-id");
            var value = $(e.target).val();
            var media = OP3.LiveEditor.deviceMedia();

            that.element.setOption(key, value, media);
        },
    }

    // globalize
    window.OP3.DocumentOptions = that;

    // autoinit
    $(function() {
        OP3.DocumentOptions._init();
    });

})(jQuery, window, document);
