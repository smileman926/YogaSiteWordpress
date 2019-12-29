/**
 * OptimizePress3 live-editor extension
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-query.js
 *     - op3-live-editor.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * Prerender type enum
     *
     *      NONE    - do not prerender (default, no initialization, good preformance)
     *      UI      - prerender interace only (fast initialization, better preformance)
     *      ALL     - prerender all (very very slow initialization, best preformance)
     *
     * @type {Object}
     */
    var prerenderType = {
        NONE: 1,
        UI: 2,
        ALL: 4,
    }

    /**
     * window.OP3.Toolbar object
     *
     * @type {Object}
     */
    var that = {

        /**
         * Prerender type
         *
         * @type {[type]}
         */
        _prerenderType: prerenderType.UI,

        /**
         * Configuration for each element type
         * (this object is defined inside
         * op3-live-editor-toolbar-config.js)
         *
         * @type {Object}
         */
        _config: {

            /*
            // default is element type
            default: {
                // label written on top of toolbar navigation
                // (usualy element name)
                label: OP3._("Default"),

                // nav or navigation (array of objects)
                nav: [
                    {
                        // nav id (can be used for css targeting)
                        id: "potato",

                        // navigation hover title
                        label: OP3._("Potato"),

                        // navigation icon
                        icon: "op3-icon-simple-up",

                        // action executed (this current example
                        // will execute _handleActionPotato)
                        action: "potato",

                        // optional context menu list (to display
                        // context menu action must be context)
                        context: [
                            {
                                // tab label
                                label: OP3._("Cars"),

                                // tab HTML (before properties)
                                prependHTML: "<p>Lorem ipsum is dummy text...</p>",

                                // list of properties on tab
                                property: [ "volvo", "bmw" ],
                            },
                            {
                                // another tab label
                                label: OP3._("Another Cars"),

                                // list of properties on second tab
                                property: [ "mercedes" ],

                                // tab HTML (after properties)
                                appendHTML: "<p>Dummy text lorem ipsum is...</p>",
                            },
                        ]
                    },

                    .
                    .
                    .
                ]
            },
            */

        },

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
         * UI elements
         *
         * @type {Object}
         */
        $ui: {},

        /**
         * Form for each element type
         *
         * @type {Object}
         */
        _props: null,

        /**
         * Form template
         * (this must be function because we do not have
         * translations yet)
         *
         * @todo - get it from dom?
         *
         * @type {String}
         */
        _template: function() {
            return ''
                +   '<div id="toolbar" class="op3-toolbar op3-toolbar-sticky">'
                +   '</div>';
        },

        _templateForm: function() {
            return ''
                +   '<form>'
                +       '<div class="op3-toolbar-main">'
                +           '<div class="op3-toolbar-wrapper">'
                +               '<header class="op3-toolbar-header">'
                +                   '<span class="op3-toolbar-header-section op3-toolbar-header-section-left">'
                +                       '<button type="button" class="op3-toolbar-header-button op3-toolbar-sticky" title="' + OP3._("Toggle Sticky Toolbar") + '">'
                +                           '<span class="visually-hidden">' + OP3._("Toggle Sticky Toolbar") + '</span>'
                +                           '<span class="op3-icon op3-icon-pin-2"></span>'
                +                       '</button>'
                +                   '</span>'
                +                   '<span class="op3-toolbar-header-section op3-toolbar-header-section-center op3-toolbar-header-section-element-title op3-toolbar-draggable" draggable="false">'
                +                       '{label}'
                +                   '</span>'
                +                   '<span class="op3-toolbar-header-section op3-toolbar-header-section-center op3-toolbar-header-section-global-label op3-toolbar-draggable" draggable="false">'
                +                       OP3._("Global Element")
                +                   '</span>'
                +                   '<span class="op3-toolbar-header-section op3-toolbar-header-section-right">'
                +                       '<button type="button" class="op3-toolbar-header-button op3-toolbar-parent" title="' + OP3._("Focus Parent Element") + '">'
                +                           '<span class="visually-hidden">' + OP3._("Focus Parent Element") + '</span>'
                +                           '<span class="op3-icon op3-icon-minimal-up"></span>'
                +                       '</button>'
                +                       '<button type="button" class="op3-toolbar-header-button op3-toolbar-close" title="' + OP3._("Close Toolbar") + '">'
                +                           '<span class="visually-hidden">' + OP3._("Close Toolbar") + '</span>'
                +                           '<span class="op3-icon op3-icon-simple-remove-2"></span>'
                +                       '</button>'
                +                   '</span>'
                +               '</header>'
                +               '<nav class="op3-toolbar-content">'
                +                   '<ul class="op3-toolbar-list op3-toolbar-icon-list"></ul>'
                +               '</nav>'
                +           '</div>'
                +       '</div>'
                +       '<div class="op3-toolbar-context">'
                +       '</div>'
                +   '</form>';
        },

        _templateNav: function() {
            return ''
                +   '<li class="op3-toolbar-list-item" data-op3-toolbar-nav-id="{id}">'
                +       '<a href="#" class="op3-toolbar-link" data-op3-toolbar-action="{action}" data-op3-toolbar-args="{args}" title="{label}">'
                +           '<i class="op3-icon {icon}"></i>'
                +       '</a>'
                +   '</li>';
        },

        _templateContext: function() {
            return ''
                +   '<div class="op3-toolbar-wrapper">'
                +       '<nav class="op3-toolbar-header">'
                +           '<ul class="op3-toolbar-list"></ul>'
                +       '</nav>'
                +       '<div class="op3-toolbar-content">'
                +       '</div>'
                +   '</div>';
        },

        _templateContextNav: function() {
            return ''
                +   '<li class="op3-toolbar-list-item">'
                +       '<a href="#" class="op3-toolbar-link">{label}</a>'
                +   '</li>';
        },

        _templateContextContent: function() {
            return ''
                +   '<div class="op3-toolbar-content-item jquery-colorpicker-widget-parent">'
                +   '</div>';
        },

        /**
         * Object initialization
         *
         * @return {Void}
         */
        _init: function() {
            if (that.$ui.parent)
                return;

            that.$ui.parent = $(that._template())
                .on("mmdnddragstart", that._handleElementDragstart)
                .on("mmdnddragend", that._handleElementDragend)
                //.on("click", ".op3-toolbar-main .op3-toolbar-link", that._handleNavClick)
                .on("click", "[data-op3-toolbar-action]", that._handleActionClick)
                .on("click", ".op3-toolbar-context .op3-toolbar-link", that._handleTabClick)
                .on("click", ".op3-toolbar-header .op3-toolbar-close", that._handleCloseClick)
                .on("click", ".op3-toolbar-header .op3-toolbar-sticky", that._handleStickyClick)
                .on("click", ".op3-toolbar-header .op3-toolbar-parent", that._handleParentClick)
                .on("click", ".op3-element-options-property-reset", that._handlePropertyReset)
                .on("draggablestart", that._handleDraggableStart)
                .on("draggablemove", that._handleDraggableMove)
                .on("draggablestop", that._handleDraggableStop)
                .draggable({
                    handle: ".op3-toolbar-draggable",
                })
                .appendTo(OP3.LiveEditor.$ui.body);

            OP3.bind("loadlang", that._handleLoadLang);
            OP3.bind("workerready", that._handleWorkerReady);
            OP3.bind("elementfocus", that._handleElementFocus);
            OP3.bind("elementunfocus", that._handleElementUnfocus);
            OP3.bind("elementgid", that._handleElementGid);
            OP3.bind("elementappend", that._handleElementAppend);
            OP3.bind("elementdetach elementremove", that._handleElementDetach);
            OP3.bind("elementchange", that._handleElementChange);
            OP3.bind("elementchange::*::linkProperties", that._handleElementChangeLinkProperties);
            OP3.bind("elementoptionssyncrequest", that._handleElementOptionsSyncRequest);
            OP3.bind("elementoptionsrefreshrequest", that._handleElementOptionsRefreshRequest);
            OP3.bind("elementclipboardcopy", that._handleElementClipboardCopy);
            OP3.bind("devicechange", that._handleDeviceChange);
            //OP3.bind("togglesidebar", that._handleReposition);

            var frame = OP3.LiveEditor.$ui.frame.get(0);
            $(null)
                .add(frame.ownerDocument.defaultView)
                .add(frame.ownerDocument)
                .add(frame.parentElement.parentElement)
                .add(frame.parentElement)
                .add(frame)
                .add(frame.contentWindow)
                .add(frame.contentDocument)
                    .on("resize scroll", that._handleReposition);
        },

        _preloadWorkerJobForm: function(type, priority) {
            if (OP3.$.type(type) === "array") {
                var result = true;
                for (var i = 0; i < type.length; i++) {
                    result = that._preloadWorkerJobForm(type[i], priority) && result;
                }

                // recursion
                return result;
            }

            // type not in config
            var config = that._config[type];
            if (!config)
                return false;

            // job done
            if (that._props[type])
                return false;

            // job handler
            var weight = 1/2;
            var fn = function() {
                this.data.op3 = this.data.op3 || {};
                this.data.op3.message = OP3._("Rendering inline properties");

                config = $.extend(true, {}, config);
                var element = OP3.$("<" + type + " />").element();
                var template = OP3.$.templating(that._templateForm(), config);
                var elcfg = OP3.Designer.config(type);
                var hasStyles = elcfg && elcfg.styles && elcfg.styles.length ? 1 : 0;
                var hasPresets = elcfg && elcfg.presets && elcfg.presets.length ? 1 : 0;

                var $form = $(template)
                    .data("op3-preload-element", element)
                    .data("op3-preload-config", config)
                    .attr("data-op3-user-role", OP3.Meta.userRole)
                    .attr("data-op3-element-options-render-status", "rendering")
                    .attr("data-op3-element-options-type", type)
                    .attr("data-op3-element-options-uuid", "null")
                    .attr("data-op3-element-options-gid", "null")
                    .attr("data-op3-element-options-style", "null")
                    .attr("data-op3-element-options-spec", "null")
                    .attr("data-op3-element-options-path", "null")
                    //.attr("data-op3-element-options-path-full", "null")
                    .attr("data-op3-element-options-has-styles", hasStyles)
                    .attr("data-op3-element-options-has-presets", hasPresets)
                    .attr("data-op3-element-options-children-count", "null")
                    .attr("data-op3-element-options-row-children-count", "null");

                config.$ui = {
                    list: $form.find(".op3-toolbar-list"),
                    wrapper: $form.find(".op3-toolbar-context"),
                }

                that._props[type] = $form.get(0);
            }

            // append job
            OP3.Worker.append(fn, [], weight, priority);

            // job added
            return true;
        },

        _preloadWorkerJobNav: function(type, priority) {
            if (OP3.$.type(type) === "array") {
                var result = true;
                for (var i = 0; i < type.length; i++) {
                    result = that._preloadWorkerJobNav(type[i], priority) && result;
                }

                // recursion
                return result;
            }

            // type not in config
            var config = that._config[type];
            if (!config)
                return false;

            // job list (arguments)
            var list = [];
            for (var i = 0; i < config.nav.length; i++) {
                list.push([ i ]);
            }

            // job done
            var done = $(that._props[type]).find(".op3-toolbar-main .op3-toolbar-list-item").length;
            if (done === list.length)
                return false;

            // job handler
            var weight = 1/25;
            var fn = function(navIndex) {
                var form = that._props[type];
                if (!form)
                    return;

                var $form = $(form);
                //var element = $form.data("op3-preload-element");
                var config = $form.data("op3-preload-config");
                if (!config || !config.nav)
                    return;

                var template = OP3.$.templating(that._templateNav(), config.nav[navIndex]);
                config.nav[navIndex].$ui = {
                    parent: $(template).appendTo(config.$ui.list),
                }

                config.nav[navIndex].$ui.parent
                    .find("[data-op3-toolbar-args]")
                    .each(function() {
                        if (config.nav[navIndex].args)
                            $(this).attr("data-op3-toolbar-args", JSON.stringify(config.nav[navIndex].args));
                        else
                            $(this).removeAttr("data-op3-toolbar-args");
                    });

                config.nav[navIndex].$ui.parent
                    .find('.op3-toolbar-link[data-op3-toolbar-action="move"]')
                    .attr("data-jquery-mmdnd-draggable", "op3-query");

                config.nav[navIndex].$ui.context = $(that._templateContext()).appendTo(config.$ui.wrapper);
                config.nav[navIndex].$ui.header = config.nav[navIndex].$ui.context.find(".op3-toolbar-list");
                config.nav[navIndex].$ui.content = config.nav[navIndex].$ui.context.find(".op3-toolbar-content");
            }

            // append job
            for (var i = done; i < list.length; i++) {
                OP3.Worker.append(fn, list[i], weight, priority);
            }

            // job added
            return true;
        },

        _preloadWorkerJobContext: function(type, priority) {
            if (OP3.$.type(type) === "array") {
                var result = true;
                for (var i = 0; i < type.length; i++) {
                    result = that._preloadWorkerJobContext(type[i], priority) && result;
                }

                // recursion
                return result;
            }

            // type not in config
            var config = that._config[type];
            if (!config)
                return false;

            // job list (arguments)
            var list = [];
            for (var i = 0; i < config.nav.length; i++) {
                if (!config.nav[i].context)
                    continue;

                for (var j = 0; j < config.nav[i].context.length; j++) {
                    list.push([ i, j ]);
                }
            }

            // job done
            var done = $(that._props[type]).find(".op3-toolbar-context .op3-toolbar-list-item").length;
            if (done === list.length)
                return false;

            // job handler
            var weight = 1/25;
            var fn = function(navIndex, contextIndex) {
                var form = that._props[type];
                if (!form)
                    return;

                var $form = $(form);
                //var element = $form.data("op3-preload-element");
                var config = $form.data("op3-preload-config");
                if (!config || !config.nav)
                    return;

                var template = OP3.$.templating(that._templateContextNav(), config.nav[navIndex].context[contextIndex]);
                var itemName = ""
                    + config.nav[navIndex].id
                    + "-"
                    + config.nav[navIndex].context[contextIndex].label
                        .replace(/[^a-zA-Z]+/g, "-")
                        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
                        .toLowerCase();

                $(template)
                    .attr("data-op3-content-item-name", itemName)
                    .appendTo(config.nav[navIndex].$ui.header);

                template = that._templateContextContent();
                config.nav[navIndex].context[contextIndex].$ui = {
                    parent: $(template)
                        .attr("data-op3-content-item-name", itemName)
                        .appendTo(config.nav[navIndex].$ui.content),
                }
            }

            // append job
            for (var i = done; i < list.length; i++) {
                OP3.Worker.append(fn, list[i], weight, priority);
            }

            // job added
            return true;
        },

        _preloadWorkerJobProperty: function(type, priority) {
            if (OP3.$.type(type) === "array") {
                var result = true;
                for (var i = 0; i < type.length; i++) {
                    result = that._preloadWorkerJobProperty(type[i], priority) && result;
                }

                // recursion
                return result;
            }

            // type not in config
            var config = that._config[type];
            if (!config)
                return false;

            // job list (arguments)
            var list = [];
            for (var i = 0; i < config.nav.length; i++) {
                if (!config.nav[i].context)
                    continue;

                for (var j = 0; j < config.nav[i].context.length; j++) {
                    var context = config.nav[i].context[j];
                    if (context.prependHTML)
                        list.push([ i, j, false, context.prependHTML ]);

                    if (context.property)
                        for (var l = 0; l < context.property.length; l++) {
                            list.push([ i, j, true, context.property[l] ]);
                        }

                    if (context.appendHTML)
                        list.push([ i, j, false, context.appendHTML ]);
                }
            }

            // job done
            var done = $(that._props[type]).find(".op3-toolbar-content").find(".op3-element-options-property, .op3-element-options-custom-html").length;
            if (done === list.length)
                return false;

            // job handler
            var weight = 1/6;
            var fn = function(navIndex, contextIndex, useElement, value) {
                var form = that._props[type];
                var $form = $(form);
                var config = $form.data("op3-preload-config");
                var element = $form.data("op3-preload-element");
                var context = config.nav[navIndex].context[contextIndex];
                var $target = context.$ui.parent;

                if (useElement) {
                    var node = element.findProperty(value).prerender();
                    $target.append(node);

                    var emit = {
                        node: null,
                        type: type,
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
                OP3.Worker.append(fn, list[i], weight, priority);
            }

            // job added
            return true;
        },

        _preloadWorkerJobPropertyFilter: function(type, priority) {
            if (OP3.$.type(type) === "array") {
                var result = true;
                for (var i = 0; i < type.length; i++) {
                    result = that._preloadWorkerJobPropertyFilter(type[i], priority) && result;
                }

                // recursion
                return result;
            }

            // type not in config
            var config = that._config[type];
            if (!config)
                return false;

            // job list (arguments)
            var list = [];
            for (var i = 0; i < config.nav.length; i++) {
                if (!config.nav[i].context)
                    continue;

                for (var j = 0; j < config.nav[i].context.length; j++) {
                    var context = config.nav[i].context[j];
                    if (context.filter)
                        for (var k = 0; k < context.filter.length; k++) {
                            list.push([ i, j, context.filter[k] ]);
                        }
                }
            }

            // job done
            var done = $(that._props[type]).find(".op3-toolbar-content").find(".op3-element-options-property-filter").length;
            if (done === list.length)
                return false;

            // job handler
            var weight = 1/10;
            var fn = function(navIndex, contextIndex, value) {
                var form = that._props[type];
                var $form = $(form);
                var config = $form.data("op3-preload-config");
                //var element = $form.data("op3-preload-element");
                var context = config.nav[navIndex].context[contextIndex];
                var $target = context.$ui.parent;

                // apply filter
                var tagName = "div";
                if (value.lib === "filterDropdown")
                    tagName = "select";
                var $filter = $("<" + tagName + " />")
                    [value.lib](value.options.map(function(item) {
                        var label = item.label;
                        var selector = item.property.map(function(item) {
                                return '.op3-element-options-property[data-op3-element-options-property-id="' + item + '"]';
                            })
                            .join(",");

                        return {
                            label: label,
                            content: $target.find(selector),
                        };
                    }))
                    [value.lib]("attach");

                // wrap filter
                var $widget = $filter
                    .wrap("<div />")
                    .parent()
                        .addClass("op3-element-options-property-filter");
                $('<div class="op3-element-options-label-group"><label>' + value.label + '</label></div>')
                    .prependTo($widget);
            }

            // append job to worker
            for (var i = done; i < list.length; i++) {
                OP3.Worker.append(fn, list[i], weight, priority);
            }

            // job added
            return true;
        },

        _preloadWorkerJobClean: function(type, priority) {
            if (OP3.$.type(type) === "array") {
                var result = true;
                for (var i = 0; i < type.length; i++) {
                    result = that._preloadWorkerJobClean(type[i], priority) && result;
                }

                // recursion
                return result;
            }

            // type not in config
            var config = that._config[type];
            if (!config)
                return false;

            // job done
            if (that._props[type]) {
                var status = $(that._props[type]).attr("data-op3-element-options-render-status");
                if (status === "rendered" || status === "ready")
                    return false;
            }

            // job handler
            var weight = 1/2;
            var fn = function() {
                var form = that._props[type];
                if (!form)
                    return;

                var $form = $(form);
                $form
                    .data("op3-preload-element")
                        .remove();
                $form
                    .removeData("op3-preload-element")
                    .removeData("op3-preload-config")
                    .attr("data-op3-element-options-render-status", "rendered");

                var emit = {
                    node: null,
                    type: type,
                    parent: form,
                }
                OP3.transmit("elementoptionsformprerender", emit);
                OP3.transmit("elementoptionsformprerender::" + emit.type, emit);
            }

            // append job
            OP3.Worker.append(fn, [], weight, priority);

            // job added
            return true;
        },

        /**
         * Append jobs to worker
         *
         * @return {Void}
         */
        _preload: function() {
            // preload only once
            if (that._props)
                return;
            that._props = {};

            // list all types in config
            var type = Object.keys(that._config);

            // prerender interface
            if (that._prerenderType === prerenderType.UI || that._prerenderType === prerenderType.ALL) {
                that._preloadWorkerJobForm(type);
                that._preloadWorkerJobNav(type);
                that._preloadWorkerJobContext(type);
            }

            // prerender properties
            if (that._prerenderType === prerenderType.ALL) {
                that._preloadWorkerJobProperty(type);
                that._preloadWorkerJobPropertyFilter(type);
                that._preloadWorkerJobClean(type);
            }
        },

        /**
         * Set input values for current
         * attached form
         *
         * @param  {Mixed} property (optional)
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
            var hoverDisabled = OP3.Designer.$ui.parent.hasClass("op3-disable-hover");
            if (!hoverDisabled)
                OP3.Designer.$ui.parent.addClass("op3-disable-hover");

            // iterate form inputs
            $(form).find(selector || ".op3-element-options-property-input").each(function() {
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
            if (!hoverDisabled)
                OP3.Designer.$ui.parent.removeClass("op3-disable-hover");

            // bind event back
            if (binded)
                $(form)
                    .off("change.op3elementoptions")
                    .on("change.op3elementoptions", ".op3-element-options-property-input", that._handleFormChange);
        },

        /**
         * Get current form UI
         * (main/context elements)
         *
         * @return {Object}
         */
        _formUI: function() {
            var result = null;
            if (!that.form)
                return result;

            result = $(that.form).data("op3-toolbar-ui");
            if (!result) {
                result = {};
                result.form = $(that.form);
                result.main = result.form.find(".op3-toolbar-main");
                result.context = result.form.find(".op3-toolbar-context");

                $(that.form).data("op3-toolbar-ui", result);
            }

            return result;
        },

        /**
         * Get position/dimenzions of elements
         * needed for reposition
         *
         * @return {Object}
         */
        _getRepositionRect: function() {
            if (!that.element || !that.form)
                return null;

            // force display block (can not getBoundingClientRect
            // elements with display: none)
            that.$ui.parent
                .css({
                    visibility: "hidden",
                    display: "block",
                });

            // do we have scrollbar
            var hasScroll = OP3.LiveEditor.$ui.frameWrapper.css("overflow-y") === "scroll";
            if (!hasScroll) {
                // frameWrapper element has no overflow-y, maybe
                // the scrollbar is inside frame's html element
                var scrollElement = OP3.Designer.$ui.html.get(0).ownerDocument.scrollingElement;
                hasScroll = scrollElement.scrollHeight > scrollElement.clientHeight;
            }

            // position and dimenzions
            var result = {
                scrollBar: [ 0, hasScroll ? (parseInt(window.scrollbarSize) || 17) : 0 ],
                parent: that.$ui.parent.get(0).getBoundingClientRect(),
                element: that.element.node().getBoundingClientRect(),
                wrapper: OP3.LiveEditor.$ui.frameWrapper.get(0).getBoundingClientRect(),
                frame: OP3.LiveEditor.$ui.frame.get(0).getBoundingClientRect(),
            };

            // viewport
            result.viewport = {
                left: result.wrapper.left,
                right: result.wrapper.right - result.scrollBar[1],
                top: 0,
                bottom: result.wrapper.bottom,
                width: result.wrapper.width - result.scrollBar[1],
                height: result.wrapper.bottom,
            }

            // target (focused element relative to live-editor)
            result.target = {
                left: result.frame.left + result.element.left,
                width: result.element.width,
                top: result.frame.top + result.element.top,
                height: result.element.height,
            }
            result.target.right = result.target.left + result.target.width;
            result.target.bottom = result.target.top + result.target.height;

            // toolbar main (no need getBoundingClientRect, only size)
            var form = that._formUI();
            var props = [ "width", "height", "marginTop", "marginRight", "marginBottom", "marginLeft" ];
            result.main = form.main.css(props);
            Object.keys(result.main).forEach(function(value, index) {
                result.main[value] = parseFloat(result.main[value]);
            });
            result.main.outerWidth = result.main.marginLeft + result.main.width + result.main.marginRight;
            result.main.outerHeight = result.main.marginTop + result.main.height + result.main.marginBottom;

            // toolbar context (no need getBoundingClientRect, only size)
            result.context = form.context.css(props);
            Object.keys(result.context).forEach(function(value, index) {
                result.context[value] = parseFloat(result.context[value]);
            });
            result.context.outerWidth = result.context.marginLeft + result.context.width + result.context.marginRight;
            result.context.outerHeight = result.context.marginTop + result.context.height + result.context.marginBottom;

            // reset display
            that.$ui.parent
                .css({
                    visibility: "",
                    display: "",
                });

            return result;
        },

        /**
         * Reposition toolbar
         *
         * @return {Void}
         */
        reposition: function() {
            var rect = that._getRepositionRect();
            if (!rect)
                return;

            // defaults
            var isSticky = that.$ui.parent.hasClass("op3-toolbar-sticky"),
                point = "none",
                pointAdjust = "none",
                contextPosition = "right",
                contextOffset = 0,
                top = "auto",
                right = "auto",
                bottom = "auto",
                left = "auto";

            // valid toolbar positions
            var validPosition = that.element.config().validToolbarPosition;
            if (!validPosition || !validPosition.length)
                validPosition = [ "top", "bottom", "left", "right" ];

            // calculate toolbar position
            if (isSticky) {
                // position align: if top is set - set left, if left is set - set top
                var _setAlign = function(position) {
                    if (top !== "auto" && left === "auto" && (position === "top" || position === "bottom")) {
                        left = rect.target.left + rect.target.width / 2 - rect.main.width / 2 - rect.main.marginLeft;

                        if (left < rect.viewport.left)
                            pointAdjust = "left";
                        if (left < rect.viewport.left)
                            left = rect.target.left - rect.main.marginLeft;
                        if (left < rect.viewport.left)
                            left = rect.target.left;
                        if (left < rect.viewport.left)
                            left = rect.viewport.left;

                        if (left + rect.main.outerWidth > rect.viewport.right)
                            pointAdjust = "right";
                        if (left + rect.main.outerWidth > rect.viewport.right)
                            left = rect.target.right - rect.main.outerWidth + rect.main.marginLeft;
                        if (left + rect.main.outerWidth > rect.viewport.right)
                            left = rect.target.right - rect.main.outerWidth;
                        if (left + rect.main.outerWidth > rect.viewport.right)
                            left = rect.viewport.right - rect.main.outerWidth;
                    }

                    if (left !== "auto" && top === "auto" && (position === "left" || position === "right")) {
                        top = rect.target.top + rect.target.height / 2 - rect.main.height / 2 - rect.main.marginTop;

                        if (top < rect.viewport.top)
                            pointAdjust = "top";
                        if (top < rect.viewport.top)
                            top = rect.target.top - rect.main.marginTop;
                        if (top < rect.viewport.top)
                            top = rect.target.top;
                        if (top < rect.viewport.top)
                            top = rect.viewport.top;

                        if (top + rect.main.outerHeight > rect.viewport.bottom)
                            pointAdjust = "bottom";
                        if (top + rect.main.outerHeight > rect.viewport.bottom)
                            top = rect.target.bottom - rect.main.outerHeight + rect.main.marginTop;
                        if (top + rect.main.outerHeight > rect.viewport.bottom)
                            top = rect.target.bottom - rect.main.outerHeight;
                        if (top + rect.main.outerHeight > rect.viewport.bottom)
                            top = rect.viewport.bottom - rect.main.outerHeight;
                    }
                }

                // set position object with methods to
                // position toolbar
                var _setPosition = {
                    // position toolbar outside element touching element border with middle align
                    outsideSticked: function(position) {
                        if (top === "auto" && position === "top" && rect.target.top - rect.main.outerHeight >= rect.viewport.top && rect.target.top <= rect.viewport.bottom && rect.target.left + rect.target.width / 2 - rect.main.width / 2 - rect.main.marginLeft >= rect.viewport.left && rect.target.left + rect.target.width / 2 - rect.main.width / 2 - rect.main.marginLeft + rect.main.outerWidth <= rect.viewport.right) {
                            top = rect.target.top - rect.main.outerHeight;
                            left = rect.target.left + rect.target.width / 2 - rect.main.width / 2 - rect.main.marginLeft;
                            point = "bottom";
                        }
                        else if (top === "auto" && position === "bottom" && rect.target.bottom >= rect.viewport.top && rect.target.bottom + rect.main.outerHeight <= rect.viewport.bottom && rect.target.left + rect.target.width / 2 - rect.main.width / 2 - rect.main.marginLeft >= rect.viewport.left && rect.target.left + rect.target.width / 2 - rect.main.width / 2 - rect.main.marginLeft + rect.main.outerWidth <= rect.viewport.right) {
                            top = rect.target.bottom;
                            left = rect.target.left + rect.target.width / 2 - rect.main.width / 2 - rect.main.marginLeft;
                            point = "top";
                        }
                        else if (left === "auto" && position === "left" && rect.target.left - rect.main.outerWidth >= rect.viewport.left && rect.target.left <= rect.viewport.right && rect.target.top + rect.target.height / 2 - rect.main.height / 2 - rect.main.marginTop > rect.viewport.top && rect.target.top + rect.target.height / 2 - rect.main.height / 2 - rect.main.marginTop + rect.main.outerHeight <= rect.viewport.bottom) {
                            top = rect.target.top + rect.target.height / 2 - rect.main.height / 2 - rect.main.marginTop;
                            left = rect.target.left - rect.main.outerWidth;
                            point = "right";
                        }
                        else if (left === "auto" && position === "right" && rect.target.right >= rect.viewport.left && rect.target.right + rect.main.outerWidth <= rect.viewport.right && rect.target.top + rect.target.height / 2 - rect.main.height / 2 - rect.main.marginTop > rect.viewport.top && rect.target.top + rect.target.height / 2 - rect.main.height / 2 - rect.main.marginTop + rect.main.outerHeight <= rect.viewport.bottom) {
                            top = rect.target.top + rect.target.height / 2 - rect.main.height / 2 - rect.main.marginTop;
                            left = rect.target.right;
                            point = "left";
                        }
                    },

                    // position toolbar outside element not touching element border with middle align
                    outsideNonSticked: function(position) {
                        if (top === "auto" && position === "top" && rect.target.bottom <= rect.viewport.top && rect.target.left + rect.target.width / 2 - rect.main.width / 2 - rect.main.marginLeft >= rect.viewport.left && rect.target.left + rect.target.width / 2 - rect.main.width / 2 - rect.main.marginLeft + rect.main.outerWidth <= rect.viewport.right) {
                            top = rect.viewport.top;
                            left = rect.target.left + rect.target.width / 2 - rect.main.width / 2 - rect.main.marginLeft;
                            point = "top";
                        }
                        else if (top === "auto" && position === "bottom" && rect.target.top >= rect.viewport.bottom - rect.main.outerHeight && rect.target.left + rect.target.width / 2 - rect.main.width / 2 - rect.main.marginLeft >= rect.viewport.left && rect.target.left + rect.target.width / 2 - rect.main.width / 2 - rect.main.marginLeft + rect.main.outerWidth <= rect.viewport.right) {
                            top = rect.viewport.bottom - rect.main.outerHeight;
                            left = rect.target.left + rect.target.width / 2 - rect.main.width / 2 - rect.main.marginLeft;
                            point = "bottom";
                        }
                        else if (left === "auto" && position === "left" && rect.target.right <= rect.viewport.left && rect.target.top + rect.target.height / 2 - rect.main.height / 2 - rect.main.marginTop > rect.viewport.top && rect.target.top + rect.target.height / 2 - rect.main.height / 2 - rect.main.marginTop + rect.main.outerHeight <= rect.viewport.bottom) {
                            top = rect.target.top + rect.target.height / 2 - rect.main.height / 2 - rect.main.marginTop;
                            left = rect.viewport.left;
                            point = "left";
                        }
                        else if (left === "auto" && position === "right" && rect.target.left >= rect.viewport.right - rect.main.outerWidth && rect.target.top + rect.target.height / 2 - rect.main.height / 2 - rect.main.marginTop > rect.viewport.top && rect.target.top + rect.target.height / 2 - rect.main.height / 2 - rect.main.marginTop + rect.main.outerHeight <= rect.viewport.bottom) {
                            top = rect.target.top + rect.target.height / 2 - rect.main.height / 2 - rect.main.marginTop;
                            left = rect.viewport.right - rect.main.outerWidth;
                            point = "right";
                        }
                    },

                    // position toolbar inside element touching element border with middle align
                    insideSticked: function(position) {
                        if (top === "auto" && position === "top" && rect.target.top >= rect.viewport.top && rect.target.left + rect.target.width / 2 - rect.main.width / 2 - rect.main.marginLeft >= rect.viewport.left && rect.target.left + rect.target.width / 2 - rect.main.width / 2 - rect.main.marginLeft + rect.main.outerWidth <= rect.viewport.right) {
                            top = rect.target.top;
                            left = rect.target.left + rect.target.width / 2 - rect.main.width / 2 - rect.main.marginLeft;
                            point = "top";
                        }
                        else if (top === "auto" && position === "bottom" && rect.target.bottom <= rect.viewport.bottom && rect.target.left + rect.target.width / 2 - rect.main.width / 2 - rect.main.marginLeft >= rect.viewport.left && rect.target.left + rect.target.width / 2 - rect.main.width / 2 - rect.main.marginLeft + rect.main.outerWidth <= rect.viewport.right) {
                            top = rect.target.bottom - rect.main.outerHeight;
                            left = rect.target.left + rect.target.width / 2 - rect.main.width / 2 - rect.main.marginLeft;
                            point = "bottom";
                        }
                        else if (left === "auto" && position === "left" && rect.target.left >= rect.viewport.left && rect.target.top + rect.target.height / 2 - rect.main.height / 2 - rect.main.marginTop > rect.viewport.top && rect.target.top + rect.target.height / 2 - rect.main.height / 2 - rect.main.marginTop + rect.main.outerHeight <= rect.viewport.bottom) {
                            top = rect.target.top + rect.target.height / 2 - rect.main.height / 2 - rect.main.marginTop;
                            left = rect.target.left;
                            point = "left";
                        }
                        else if (left === "auto" && position === "right" && rect.target.right <= rect.viewport.right && rect.target.top + rect.target.height / 2 - rect.main.height / 2 - rect.main.marginTop > rect.viewport.top && rect.target.top + rect.target.height / 2 - rect.main.height / 2 - rect.main.marginTop + rect.main.outerHeight <= rect.viewport.bottom) {
                            top = rect.target.top + rect.target.height / 2 - rect.main.height / 2 - rect.main.marginTop;
                            left = rect.target.right - rect.main.outerWidth;
                            point = "right";
                        }
                    },

                    // position toolbar inside element not touching element border with middle align
                    insideNonSticked: function(position) {
                        if (top === "auto" && position === "top" && rect.target.left + rect.target.width / 2 - rect.main.width / 2 - rect.main.marginLeft >= rect.viewport.left && rect.target.left + rect.target.width / 2 - rect.main.width / 2 - rect.main.marginLeft + rect.main.outerWidth <= rect.viewport.right) {
                            top = rect.viewport.top;
                            left = rect.target.left + rect.target.width / 2 - rect.main.width / 2 - rect.main.marginLeft;
                            point = "top";
                        }
                        else if (top === "auto" && position === "bottom" && rect.target.left + rect.target.width / 2 - rect.main.width / 2 - rect.main.marginLeft >= rect.viewport.left && rect.target.left + rect.target.width / 2 - rect.main.width / 2 - rect.main.marginLeft + rect.main.outerWidth <= rect.viewport.right) {
                            top = rect.viewport.bottom - rect.main.outerHeight;
                            left = rect.target.left + rect.target.width / 2 - rect.main.width / 2 - rect.main.marginLeft;
                            point = "bottom";
                        }
                        else if (left === "auto" && position === "left" && rect.target.top + rect.target.height / 2 - rect.main.height / 2 - rect.main.marginTop > rect.viewport.top && rect.target.top + rect.target.height / 2 - rect.main.height / 2 - rect.main.marginTop + rect.main.outerHeight <= rect.viewport.bottom) {
                            top = rect.target.top + rect.target.height / 2 - rect.main.height / 2 - rect.main.marginTop;
                            left = rect.viewport.left;
                            point = "left";
                        }
                        else if (left === "auto" && position === "right" && rect.target.top + rect.target.height / 2 - rect.main.height / 2 - rect.main.marginTop > rect.viewport.top && rect.target.top + rect.target.height / 2 - rect.main.height / 2 - rect.main.marginTop + rect.main.outerHeight <= rect.viewport.bottom) {
                            top = rect.target.top + rect.target.height / 2 - rect.main.height / 2 - rect.main.marginTop;
                            left = rect.viewport.right - rect.main.outerWidth;
                            point = "right";
                        }
                    },

                    // position toolbar outside element touching element border with align adjust
                    outsideStickedAligned: function(position) {
                        if (top === "auto" && position === "top" && rect.target.top - rect.main.outerHeight >= rect.viewport.top && rect.target.top <= rect.viewport.bottom) {
                            top = rect.target.top - rect.main.outerHeight;
                            point = "bottom";
                        }
                        else if (top === "auto" && position === "bottom" && rect.target.bottom >= rect.viewport.top && rect.target.bottom + rect.main.outerHeight <= rect.viewport.bottom) {
                            top = rect.target.bottom;
                            point = "top";
                        }
                        else if (left === "auto" && position === "left" && rect.target.left - rect.main.outerWidth >= rect.viewport.left && rect.target.left <= rect.viewport.right) {
                            left = rect.target.left - rect.main.outerWidth;
                            point = "right";
                        }
                        else if (left === "auto" && position === "right" && rect.target.right >= rect.viewport.left && rect.target.right + rect.main.outerWidth <= rect.viewport.right) {
                            left = rect.target.right;
                            point = "left";
                        }
                        else
                            return;

                        _setAlign(position);
                    },

                    // position toolbar outside element not touching element border with align adjust
                    outsideNonStickedAligned: function(position) {
                        if (top === "auto" && position === "top" && rect.target.bottom <= rect.viewport.top) {
                            top = rect.viewport.top;
                            point = "top";
                        }
                        else if (top === "auto" && position === "bottom" && rect.target.top >= rect.viewport.bottom - rect.main.outerHeight) {
                            top = rect.viewport.bottom - rect.main.outerHeight;
                            point = "bottom";
                        }
                        else if (left === "auto" && position === "left" && rect.target.right <= rect.viewport.left) {
                            left = rect.viewport.left;
                            point = "left";
                        }
                        else if (left === "auto" && position === "right" && rect.target.left >= rect.viewport.right - rect.main.outerWidth) {
                            left = rect.viewport.right - rect.main.outerWidth;
                            point = "right";
                        }
                        else
                            return;

                        _setAlign(position);
                    },

                    // position toolbar inside element touching element border with align adjust
                    insideStickedAligned: function(position) {
                        if (top === "auto" && position === "top" && rect.target.top >= rect.viewport.top) {
                            top = rect.target.top;
                            point = "top";
                        }
                        else if (top === "auto" && position === "bottom" && rect.target.bottom <= rect.viewport.bottom) {
                            top = rect.target.bottom - rect.main.outerHeight;
                            point = "bottom";
                        }
                        else if (left === "auto" && position === "left" && rect.target.left >= rect.viewport.left) {
                            left = rect.target.left;
                            point = "left";
                        }
                        else if (left === "auto" && position === "right" && rect.target.right <= rect.viewport.right) {
                            left = rect.target.right - rect.main.outerWidth;
                            point = "right";
                        }
                        else
                            return;

                        _setAlign(position);
                    },

                    // position toolbar inside element not touching element border with align adjust
                    insideNonStickedAligned: function(position) {
                        if (top === "auto" && position === "top") {
                            top = rect.viewport.top;
                            point = "top";
                        }
                        else if (top === "auto" && position === "bottom") {
                            top = rect.viewport.bottom - rect.main.outerHeight;
                            point = "bottom";
                        }
                        else if (left === "auto" && position === "left") {
                            left = rect.viewport.left;
                            point = "left";
                        }
                        else if (left === "auto" && position === "right") {
                            left = rect.viewport.right - rect.main.outerWidth;
                            point = "right";
                        }
                        else
                            return;

                        _setAlign(position);
                    },
                }

                var methodPosition = [ "outsideSticked", "outsideNonSticked", "insideSticked", "insideNonSticked", "outsideStickedAligned", "outsideNonStickedAligned", "insideStickedAligned", "insideNonStickedAligned" ];
                for (var i = 0; i < methodPosition.length; i++) {
                    var method = methodPosition[i];

                    for (var j = 0; j < validPosition.length; j++) {
                        var position = validPosition[j];

                        // for beeter ux lets skip some methods
                        if ((method === "insideNonSticked" || method === "insideNonStickedAligned") && position === "top" && validPosition.indexOf("bottom") !== -1)
                            continue;

                        _setPosition[method](position);
                        if (left !== "auto" && top !== "auto")
                            break;
                    }

                    if (left !== "auto" && top !== "auto")
                        break;
                }
            }
            else {
                // get current toolbar position
                top = rect.parent.top;
                right = "auto";
                bottom = "auto";
                left = rect.parent.left;

                // adjust to fit in viewport
                if (left + rect.parent.width > rect.viewport.right)
                    left = rect.viewport.right - rect.parent.width;
                if (top + rect.parent.height > rect.viewport.bottom)
                    top = rect.viewport.bottom - rect.parent.height;
            }

            // context opened
            if (rect.context.width && rect.context.height) {
                var validContextPosition = [];
                if (point === "right")
                    validContextPosition = [ "bottom", "top", "left", "right" ];
                else if (point === "left")
                    validContextPosition = [ "bottom", "top", "right", "left" ];
                else if (point === "top")
                    validContextPosition = [ "right", "left", "bottom", "top" ];
                else
                    validContextPosition = [ "right", "left", "top", "bottom" ];

                // find best position for context
                for (var i = 0; i < validContextPosition.length; i++) {
                    contextPosition = validContextPosition[i];

                    var inViewport = false
                        || (contextPosition === "bottom" && top + rect.main.outerHeight + rect.context.outerHeight <= rect.viewport.bottom)
                        || (contextPosition === "top" && top - rect.context.outerHeight >= rect.viewport.top)
                        || (contextPosition === "right" && left + rect.main.outerWidth + rect.context.outerWidth <= rect.viewport.right)
                        || (contextPosition === "left" && left - rect.context.outerWidth >= rect.viewport.left)
                    if (inViewport)
                        break;
                }

                // horizontaly adjust context
                if (contextPosition === "top" || contextPosition === "bottom") {

                }

                // vertically adjust context
                else {
                    if (top + rect.context.outerHeight > rect.viewport.bottom)
                        contextOffset = -1 * (rect.viewport.bottom - rect.context.outerHeight - top);
                }

                /*
                if (contextPosition === "right" && left + rect.main.outerWidth + rect.context.outerWidth > rect.viewport.right)
                    contextPosition = "left";
                if (contextPosition === "left" && left - rect.context.outerWidth < rect.viewport.left)
                    contextPosition = "right";

                // vertically adjust context
                if (top + rect.context.outerHeight > rect.viewport.bottom)
                    contextOffset = -1 * (rect.viewport.bottom - rect.context.outerHeight - top);
                */
            }

            // swap non-sticky left/right and top/bottom
            if (!isSticky) {
                if (rect.viewport.right - rect.parent.right + rect.scrollBar[1] < rect.parent.left) {
                    right = rect.viewport.right - rect.parent.right + rect.scrollBar[1];
                    left = "auto";
                }

                if (rect.viewport.bottom - rect.parent.bottom < rect.parent.top) {
                    bottom = rect.viewport.bottom - rect.parent.bottom;
                    top = "auto";
                }
            }

            // set toolbar position and reset display
            that.$ui.parent
                .attr("data-op3-toolbar-point", point)
                .attr("data-op3-toolbar-point-adjust", pointAdjust)
                .attr("data-op3-toolbar-context-position", contextPosition)
                .css({
                    "--context-offset": contextOffset + "px",
                    top: top,
                    left: left,
                    right: right,
                    bottom: bottom,
                });
        },

        /**
         * Show toolbar
         *
         * @return {Void}
         */
        show: function() {
            if (!that.element || !that.form)
                return;

            that.reposition();
            that.$ui.parent
                .addClass("op3-toolbar-active");
        },

        /**
         * Hide toolbar
         *
         * @return {Void}
         */
        hide: function() {
            that.$ui.parent.removeClass("op3-toolbar-active");
            that.hideContext();
        },

        /**
         * Show the context menu
         *
         * @param  {Number} index
         * @return {Void}
         */
        showContext: function(index) {
            var $form = that._formUI();
            if (!$form)
                return;

            that._tabStatusChange("unfocus");

            $form.main
                .find(".op3-toolbar-list-item")
                    .removeClass("op3-toolbar-active")
                    .eq(index)
                        .addClass("op3-toolbar-active");
            var $current = $form.context
                .find(".op3-toolbar-wrapper")
                    .removeClass("op3-toolbar-active")
                    .eq(index)
                        .addClass("op3-toolbar-active");

            // activate first tab on current context
            $current
                .find(".op3-toolbar-list-item")
                    .removeClass("op3-toolbar-active")
                    .eq(0)
                        .addClass("op3-toolbar-active");
            $current
                .find(".op3-toolbar-content-item")
                    .removeClass("op3-toolbar-active")
                    .eq(0)
                        .addClass("op3-toolbar-active");

            that.$ui.parent
                .attr("data-op3-toolbar-context-position", "right")
                .attr("data-op3-toolbar-context-index", index)
                .attr("data-op3-toolbar-context-tab-index", 0);

            that._tabStatusChange("focus");

            that.reposition();
        },

        /**
         * Hide the context menu
         *
         * @return {Void}
         */
        hideContext: function() {
            var $form = that._formUI();
            if (!$form)
                return;

            that._tabStatusChange("unfocus");

            that.$ui.parent
                .attr("data-op3-toolbar-context-position", "none")
                .attr("data-op3-toolbar-context-index", "")
                .attr("data-op3-toolbar-context-tab-index", "");
            $form.main
                .find(".op3-toolbar-list-item.op3-toolbar-active")
                    .removeClass("op3-toolbar-active")
            $form.context
                .find(".op3-toolbar-wrapper.op3-toolbar-active")
                    .removeClass("op3-toolbar-active");
            $form.context
                .find(".op3-toolbar-list-item.op3-toolbar-active")
                    .removeClass("op3-toolbar-active");
            $form.context
                .find(".op3-toolbar-content-item.op3-toolbar-active")
                    .removeClass("op3-toolbar-active");

            that.reposition();
        },

        /**
         * Get active context menu index
         *
         * @return {Number}
         */
        activeContext: function() {
            var $form = that._formUI();
            if (!$form)
                return -1;

            var $context = $form.context.find(".op3-toolbar-wrapper");
            var $current = $context.filter(".op3-toolbar-active");

            return $context.index($current);
        },

        /**
         * Trigger custom events on tab change
         *
         * @param  {Object} $target
         * @param  {String} status
         * @return {Void}
         */
        _tabStatusChange: function(status) {
            var selector = ".op3-toolbar-context"
                + " .op3-toolbar-wrapper.op3-toolbar-active"
                + " .op3-toolbar-content"
                + " .op3-toolbar-content-item.op3-toolbar-active"
                + " [data-op3-tab-" + status + "-trigger]";

            $(that.form)
                .find(selector)
                    .each(function() {
                        var event = $(this).attr("data-op3-tab-" + status + "-trigger");
                        if (!event)
                            return;

                        event = event.split(" ");
                        for (var i = 0; i < event.length; i++) {
                            $(this).trigger(event[i]);
                        }
                    });
        },

        /**
         * LoadLang event handler
         * convert function config to object
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleLoadLang: function(e, o) {
            if (typeof that._config === "function")
                that._config = that._config();
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
         * Initialize worker (if necessary) and
         * return element form
         *
         * @param  {Object} options
         * @return {Void}
         */
        _preloadForm: function(node) {
            var element = OP3.$(node).element();
            var type = element.type();
            var config = that._config[type];
            if (!config)
                return;

            // form already preloaded
            var form = that._props[type];
            var status = $(form).attr("data-op3-element-options-render-status");
            if (form && status === "ready") {
                that._attachForm(node);
                that._activateForm(node);

                return;
            }

            // prepare form
            var formReady = true;
            formReady = !that._preloadWorkerJobForm(type, 100) && formReady;
            formReady = !that._preloadWorkerJobNav(type, 200) && formReady;
            formReady = !that._preloadWorkerJobContext(type, 300) && formReady;

            // attach form when form is ready
            if (formReady)
                that._attachForm(node);
            else
                OP3.Worker.append(that._attachForm, [ node ], 1/4, 500);

            // render properties
            that._preloadWorkerJobProperty(type, 1000);
            that._preloadWorkerJobPropertyFilter(type, 99990);
            that._preloadWorkerJobClean(type, 100000);

            // when all done prepare form
            OP3.Worker.append(that._activateForm, [ node ], 1/25, 100100);
        },

        /**
         * Attach form:
         * set element/form objects, prepare
         * and attach form
         *
         * @param  {Object} node
         * @return {Void}
         */
        _attachForm: function(node) {
            var element = OP3.$(node);
            var type = element.type();
            var form = that._props[type];
            if (!element.length || !form)
                return;

            var $element = element.jq();
            var $form = $(form);

            that.element = element.element();
            that.form = form;

            // append form
            $form
                //.attr("data-op3-element-options-type", element.type())
                .attr("data-op3-element-options-uuid", element.uuid())
                .attr("data-op3-element-options-gid", element.gid())
                .attr("data-op3-element-options-style", element.style())
                .attr("data-op3-element-options-spec", element.spec())
                .attr("data-op3-element-options-path", element.path())
                //.attr("data-op3-element-options-path-full", element.path(true))
                .attr("data-op3-element-options-children-count", element.children().length)
                .attr("data-op3-element-options-row-children-count", element.closestHorizontal().children().length)
                .attr("data-op3-parent-options-property-value-linkproperties", element.getOption("linkProperties", "all"))
                .attr("data-op3-parent-options-property-length-linkproperties", OP3.LinkProperties._cousins ? OP3.LinkProperties._cousins.children.length : 0)
                .appendTo(that.$ui.parent.empty());

            // enable/disable up down buttons
            // @todo
            //      - add custom class (op3-element-is-first-child?) to form, disable button with css
            //      - add is:first-child and is:last-child check to OP3.$
            $(that.form)
                .find('[data-op3-toolbar-action="up"]')
                    .closest(".op3-toolbar-list-item")
                        .removeClass("op3-toolbar-disabled")
                        .addClass($element.is(":first-child") || $element.prev().is('[data-op3-element-type="popoverlay"]') ? "op3-toolbar-disabled" : "_temp")
                        .removeClass("_temp");
            $(that.form)
                .find('[data-op3-toolbar-action="down"]')
                    .closest(".op3-toolbar-list-item")
                        .removeClass("op3-toolbar-disabled")
                        .addClass($element.is(":last-child") ? "op3-toolbar-disabled" : "_temp")
                        .removeClass("_temp");

            that.show();

            var emit = {
                node: node,
                parent: that.form,
                type: that.element.type(),
            }
            OP3.transmit("elementoptionsformattach", emit);
            OP3.transmit("elementoptionsformattach::" + emit.type, emit);
        },

        /**
         * Detach form
         *
         * @return {Void}
         */
        _detachForm: function() {
            // form not attached
            if (!that.element || !that.form)
                return;

            // if we change form property input and click on
            // designer document to unfocus current element,
            // unfocus event it triggered before input change.
            // we need to force input change before we unbind
            // change event from form.
            if ($(document.activeElement).closest(that.form).length)
                document.activeElement.blur();

            var emit = {
                node: that.element.node(),
                parent: that.form,
                type: that.element.type(),
            }
            OP3.transmit("elementoptionsformdetach", emit);
            OP3.transmit("elementoptionsformdetach::" + emit.type, emit);

            that.hide();

            $(that.form)
                .off("change.op3elementoptions")
                .detach();

            that.form = null;
            that.element = null;
        },

        /**
         * Sync, prepare and bind change events
         *
         * @return {Void}
         */
        _activateForm: function() {
            if (!that.element || !that.form)
                return;

            var $form = $(that.form);
            var status = $form.attr("data-op3-element-options-render-status");

            that._sync();

            $form
                .attr("data-op3-element-options-render-status", "ready")
                .off("change.op3elementoptions")
                .on("change.op3elementoptions", ".op3-element-options-property-input", that._handleFormChange);

            // status changed to ready, reposition
            if (status !== "ready")
                setTimeout(function() {
                    that.reposition();
                });
        },

        /**
         * Create new child type element and append it
         * to it's parent (relative to focused element)
         *
         * @param  {String} parent
         * @param  {String} child
         * @return {Void}
         */
        _actionAddElement: function(parent, child) {
            var element = that.element,
                rel = OP3.$(element),
                clone;
            if (rel.type() !== child)
                rel = OP3.$(element).closest(parent).children(child).last();

            // create new child-like element
            try {
                // this is dirty quickfix for bullet block icons
                // @todo refactor the element to have icons on the parent
                // then remove this !!!!
                if (parent === "bulletblock") {
                    clone = rel.clone();
                    clone.setOption("html", '<loremipsum method="paragraph" min="3" max="4" />')
                } else if (parent === "faq") {
                    clone = rel.clone();
                    clone.setOption("html", '<h3><loremipsum method="paragraph" min="2" max="3" /></h3>')
                } else {
                    clone = OP3.$("<_" + child + "_template />");
                }
            }
            catch (e) {
                clone = OP3.$("<" + child + " />");
            }

            // append it to dom
            clone.insertAfter(rel);
        },

        /**
         * ElementFocus event handler
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementFocus: function(e, o) {
            that._preloadForm(o.node);
        },

        /**
         * ElementUnfocus event handler:
         * unbind and detach form, clear
         * form and element objects
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementUnfocus: function(e, o) {
            that._detachForm();
        },

        /**
         * ElementGid event handler:
         * sync changes with current form
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementGid: function(e, o) {
            if (!o.node || !that.form || !that.element)
                return;

            $(that.form)
                .attr("data-op3-element-options-gid", o.value.after);
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
            if (!o.node || !that.form || !that.element)
                return;

            var reposition = false;
            if (OP3.$(o.node).parent().node() === that.element.node()) {
                $(that.form)
                    .attr("data-op3-element-options-children-count", that.element.children().length);

                reposition = true;
            }

            var row = OP3.$(that.element).closestHorizontal();
            if (OP3.$(o.node).parent().node() === row.node())
                $(that.form)
                    .attr("data-op3-element-options-row-children-count",  row.children().length);

            if (reposition)
                that.reposition();
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
            if (!o.parent || !that.form || !that.element)
                return;

            var reposition = false;
            if (o.parent === that.element.node()) {
                $(that.form)
                    .attr("data-op3-element-options-children-count", that.element.children().length);

                reposition = true;
            }

            var row = OP3.$(that.element).closestHorizontal();
            if (o.parent === row.node())
                $(that.form)
                    .attr("data-op3-element-options-row-children-count",  row.children().length);

            if (reposition)
                that.reposition();
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
            that._handleReposition();
        },

        /**
         * ElementChange for property linkProperties
         * event handler:
         * add data attribute to form so css can
         * show/hide lock icon
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementChangeLinkProperties: function(e, o) {
            if (!o.node || !that.form || !that.element || o.node !== that.element.node())
                return;

            $(that.form).attr("data-op3-parent-options-property-value-linkProperties", o.value.after);
        },

        /**
         * Device change event handler:
         * sync data
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
            if (!that.form || !that.element)
                return;

            var element = OP3.Designer.activeElement();
            if (!element || element === OP3.Document)
                return;

            var property = o.property;
            if (typeof property === "string")
                property = [ property ];
            if (property.length === 1 && property[0] === "*")
                property = $(that.form)
                    .find(".op3-element-options-property[data-op3-element-options-property-id]")
                    .map(function() {
                        return $(this).attr("data-op3-element-options-property-id");
                    })
                    .toArray();

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
         * ElementClipboardCopy event handler:
         * set data attributes on this.form
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementClipboardCopy: function(e, o) {
            $(that.form)
                .attr("data-op3-element-options-allow-paste", "1");
        },

        /**
         * Event handler
         * (resize/scroll)
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleReposition: function(e) {
            if (!that.$ui.parent.hasClass("op3-toolbar-sticky"))
                return;

            if (that._intervalReposition)
                clearInterval(that._intervalReposition);

            // using interval to prevent repositionin on
            // every resize/scroll (do reposition on
            // stopped user interaction - resizeEnd/scrollEnd)
            that._intervalReposition = setTimeout(function() {
                // wait after the input (drag) is finished,
                // to avoid moving the toolbar when user
                // is using it
                if (OP3.LiveEditor.$ui.body.hasClass("op3-input-range-dragging")) {
                    that._handleReposition(e);
                    return;
                }

                delete that._intervalReposition;
                that.reposition();
            }, 100);
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

        /**
         * Element dragstart event handler
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleElementDragstart: function(e) {
            var element = OP3.$(that.element);
            var type = element.type();
            var source = element.node();
            var config = element.config();
            var template = OP3.$.templating(OP3.LiveEditor._templateSidebarCategoriesElement, config);
            var parent = element.parent();
            var ancestor = "document";
            var lock = parent.length && parent.config().dragLockChildren ? "#" + parent.uuid() : null;
            var ghost = $(template).find(".op3-element-thumb");

            element.jq()
                .addClass("op3-drag-source");

            e.setData("type", type);
            e.setData("source", source);
            e.setData("destination", null);
            e.setData("method", null);
            e.setData("config", config);
            e.setData("ancestor", ancestor);
            e.setData("lock", lock);
            e.setData("grid", {});
            e.setGhostElement(ghost);

            element.unfocus();
        },

        /**
         * Element dragevent event handler
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleElementDragend: function(e) {
            $(e.getData("source"))
                .removeClass("op3-drag-source");
        },

        _handleActionClick: function(e) {
            e.preventDefault();

            var action = $(this).attr("data-op3-toolbar-action");
            var method = action
                .replace(/[\W_]+/g, "-")
                .replace(/\-(\w)/g, function(a, b) {
                    return b.toUpperCase();
                });

            method = "_handleAction_" + method;
            if (typeof that[method] === "function")
                that[method].call(this, e);
        },

        _handleTabClick: function(e) {
            e.preventDefault();

            var $current = $(this).closest(".op3-toolbar-list-item");
            if ($current.is(".op3-toolbar-active"))
                return;

            that._tabStatusChange("unfocus");

            var $wrapper = $current.closest(".op3-toolbar-wrapper");
            var $lists = $current.parent().find(".op3-toolbar-list-item");
            var index = $lists.index($current);

            $wrapper
                .find(".op3-toolbar-list .op3-toolbar-list-item")
                    .removeClass("op3-toolbar-active")
                    .eq(index)
                        .addClass("op3-toolbar-active");
            $wrapper
                .find(".op3-toolbar-content .op3-toolbar-content-item")
                    .removeClass("op3-toolbar-active")
                    .eq(index)
                        .addClass("op3-toolbar-active");

            that.$ui.parent
                .attr("data-op3-toolbar-context-tab-index", index);

            that._tabStatusChange("focus");
            that.reposition();
        },

        /**
         * Click on close toolbar icon
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleCloseClick: function(e) {
            OP3.$(that.element).unfocus();

            $(e.currentTarget).blur();
            e.preventDefault();
        },

        /**
         * Click on sticky toolbar icon
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleStickyClick: function(e) {
            that.$ui.parent.toggleClass("op3-toolbar-sticky");

            that.hideContext();
            that.reposition();

            $(e.currentTarget).blur();
            e.preventDefault();
        },

        /**
         * Click on Focus Parent Element toolbar icon
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleParentClick: function(e) {
            OP3.$(that.element.parent()).focus()

            $(e.currentTarget).blur();
            e.preventDefault();
        },

        /**
         * Click on Reset Property icon
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
         * Draggable start event handler
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleDraggableStart: function(e, o) {
            that.hideContext();
            OP3.LiveEditor.sidebarHide();

            // do we have scrollbar
            var hasScroll = OP3.LiveEditor.$ui.frameWrapper.css("overflow-y") === "scroll";
            if (!hasScroll) {
                // frameWrapper element has no overflow-y, maybe
                // the scrollbar is inside frame's html element
                var scrollElement = OP3.Designer.$ui.html.get(0).ownerDocument.scrollingElement;
                hasScroll = scrollElement.scrollHeight > scrollElement.clientHeight;
            }

            // store scrollSize to event data
            var scrollSize = hasScroll ? (parseInt(window.scrollbarSize) || 17) : 0;
            o.scroll = [ scrollSize, 0 ];
        },

        /**
         * Draggable move event handler
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleDraggableMove: function(e, o) {
            var css = o.css,
                rect = o.rect,
                rel = o.element.rel,
                viewport = o.viewport,
                scroll = o.scroll,
                boundaries = {
                    top: rel[1],
                    right: rel[0] + viewport[2] - scroll[0],
                    bottom: rel[1] + viewport[3] - scroll[1],
                    left: rel[0],
                };

            // fix css object so element will fit to viewport
            if (rect.left < boundaries.left)
                css.left = boundaries.left + "px";
            if (rect.top < boundaries.top)
                css.top = boundaries.top + "px";
            if (rect.right > boundaries.right)
                css.left = boundaries.right - rect.width + "px";
            if (rect.bottom > boundaries.bottom)
                css.top = boundaries.bottom - rect.height + "px";
        },

        /**
         * Draggable stop event handler
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleDraggableStop: function(e, o) {
            that.reposition();
        },

        _handleAction_context: function(e) {
            var $current = $(this).closest(".op3-toolbar-list-item");
            var $lists = $current.parent().find(".op3-toolbar-list-item");
            var index = $lists.index($current);
            var active = that.activeContext();

            if (index === active)
                that.hideContext();
            else
                that.showContext(index);
        },

        /**
         * Action toggle link properties
         * parse event handler
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleAction_toggleLinkProperties: function(e) {
            that.hideContext();

            var element = OP3.$(that.element);
            var key = "linkProperties";
            var media = "all";
            var linked = !!(element.getOption(key, media)*1);

            element.setOption(key, linked ? "0" : "1", media);
        },

        /**
         * Action toggle presets tab
         *
         * @param {Object} e
         */
        _handleAction_toggleSidebarDesignerTab: function(e) {
            OP3.LiveEditor.sidebarTabOpen("design");
            OP3.LiveEditor.sidebarShow();
        },

        _handleAction_toggleSidebarGlobalElementTab: function(e) {
            that.hideContext();

            OP3.LiveEditor.sidebarTabOpen("global-element");
            OP3.LiveEditor.sidebarShow();
        },

        /**
         * Action up parse event handler
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleAction_up: function(e) {
            that.hideContext();

            var element = OP3.$(that.element);
            var $rel = element.jq().prev();

            element
                .unfocus()
                .detach()
                .insertBefore($rel)
                .focus();
        },

        /**
         * Action down parse event handler
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleAction_down: function(e) {
            that.hideContext();

            var element = OP3.$(that.element);
            var $rel = element.jq().next();

            element
                .unfocus()
                .detach()
                .insertAfter($rel)
                .focus();
        },

        _handleAction_clone: function(e) {
            that.hideContext();

            var element = OP3.$(that.element);
            var $rel = element.jq();

            element
                .unfocus()
                .clone()
                    .insertAfter($rel)
                    .focus();
        },

        _handleAction_addElement: function(e) {
            var args = [];
            try {
                args = JSON.parse($(e.currentTarget).closest("[data-op3-toolbar-args]").attr("data-op3-toolbar-args"));
            }
            catch(e) {
                // pass
            }

            that._actionAddElement.apply(this, args);
        },

        _handleAction_globalElementUnlock: function(e) {
            console.log("_handleAction_globalElementUnlock");
        },

        _handleAction_delete: function() {
            that.hideContext();
            OP3.transmit("elementrequestdetach", { node: that.element.node() });
        },

        _handleAction_settings: function() {
            that.hideContext();
            OP3.LiveEditor.sidebarToggle();
        },

        _handleAction_design: function() {
            that.hideContext();

            OP3.LiveEditor.sidebarTabOpen("design");
            OP3.LiveEditor.sidebarShow();
        },

        _handleAction_style: function() {
            that.hideContext();
            OP3.LiveEditor.sidebarTabOpen("style");
            OP3.LiveEditor.sidebarShow();
        },

        /* --- */

    }

    // globalize
    window.OP3.Toolbar = that;

    // autoinit
    OP3.bind("load::designer", function(e,o) {
        that._init();
    });

    // bind
    OP3.bind("ready", function(e, o) {
        // make sure that all toolbar context is hidden
        // when iceeditor is focused OP3-585
        OP3.Designer.ownerDocument.addEventListener("iceselect", function(e) {
            OP3.Toolbar.hideContext();
        });

        // hide toolbar context on live-editor click
        $(OP3.LiveEditor.ownerDocument).on("click", function(e) {
            if ($(e.target).closest("#toolbar").length)
                return;

            // click event occurs after mousedown, so we can
            // not detect if this is dragend event (and we
            // don't want to hide context on dragend).
            // target should never be html element,
            // since there is always body above it.
            // if target is html that means that
            // body had pointer-events:none,
            // which is added on dragstart...
            if (!$(e.target).is("html"))
                OP3.Toolbar.hideContext();
        });
    });

})(jQuery, window, document);
