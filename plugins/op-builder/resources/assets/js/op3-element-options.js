/**
 * OptimizePress3 element options box.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-live-editor.js
 *     - op3-live-editor-sidebar.js
 *     - op3-designer.js
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
         * op3-element-options-config.js)
         *
         * @type {Object}
         */
        _config: {

            /*
            // default is element type
            default: {
                // label written on top of sidebar
                // (usualy element name)
                label: OP3._("Default"),

                // tabs (array of objects)
                tab: [
                    {
                        // tab id (not used)
                        id: "advanced",

                        // tab label (not used)
                        label: OP3._("Advanced"),

                        // tab icon (not used)
                        icon: "op3-icon-preferences-2",

                        // tab groups (accordions)
                        group: [
                            {
                                // group id (can be used for css targeting)
                                id: "cars",

                                // group label
                                label: OP3._("Cars"),

                                // display reset icon (reset settings to default)
                                reset: true,

                                // tab HTML (before properties)
                                prependHTML: "<p>Lorem ipsum is dummy text...</p>",

                                // list of properties in group
                                property: [ "volvo", "bmw" ],
                            },
                            {
                                // another group id
                                id: "another_cars",

                                // another group label
                                label: OP3._("Another Cars"),

                                // display reset icon (reset settings to default)
                                reset: true,

                                // list of properties in second group
                                property: [ "mercedes" ],

                                // tab HTML (after properties)
                                appendHTML: "<p>Dummy text lorem ipsum is...</p>",
                            }
                        ]
                    },
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
         * @todo - get it from dom?
         *
         * @type {String}
         */
        _template: function() {
            return ''
                +   '<form>'
                +       '<div id="tab-heading-element" class="tab-heading">'
                +           '<h2 class="tab-heading-title">{label}</h2>'
                +           '<div class="tab-heading-button-wrapper">'
                +               '<button class="tab-heading-button active" data-op3-element-state="normal" type="button">' + OP3._("Normal") + '</button>'
                +               '<button class="tab-heading-button" data-op3-element-state="hover" type="button">' + OP3._("Hover") + '</button>'
                +           '</div>'
                +           '<div class="tab-heading-select-parent-element">'
                +               '<button class="tab-heading-button" type="button">' + OP3._("Select Parent Element") + '</button>'
                +           '</div>'
                +       '</div>'
                +       '<ul class="op3-tabs">'
                +           '<li class="op3-tab hidden" data-tab="global-element">'
                +               '<button type="button">'
                +                   '<span class="op3-icon op3-icon-globe-1"></span>'
                +                   OP3._("Global Element")
                +               '</button>'
                +           '</li>'
                +           '<li class="op3-tab" data-tab="design">'
                +               '<button type="button">'
                +                   '<span class="op3-icon op3-icon-wand-99-2"></span>'
                +                   OP3._("Design")
                +               '</button>'
                +           '</li>'
                +           '<li class="op3-tab" data-tab="style">'
                +               '<button type="button">'
                +                   '<span class="op3-icon op3-icon-paint-37-2"></span>'
                +                   OP3._("Style")
                +               '</button>'
                +           '</li>'
                +           '<li class="op3-tab" data-tab="advanced">'
                +               '<button type="button">'
                +                   '<span class="op3-icon op3-icon-preferences-2"></span>'
                +                   OP3._("Advanced")
                +               '</button>'
                +           '</li>'
                +       '</ul>'
                +       '<div class="tab-content" data-tab="global-element">'
                +          '<div class="op3-element-options-group dropdown" data-op3-element-options-group-id="global-element">'
                +              '<header class="op3-options-group-header">'
                +                  'Global Element'
                +                  '<div class="op3-options-group-actions">'
                +                      '<i class="op3-options-group-actions-toggle op3-icon op3-icon-stre-up"></i>'
                +                  '</div>'
                +              '</header>'
                +              '<div class="op3-element-options-container">'
                +                   '<p class="op3-options-group-notes">Global elements are synced elements you can save to use across site.  Change a global element on any page and it will update across other instances of that element.<br><br>Use the Global Element Wizard to update an existing global element name or thumbnail.</p>'
                +                   '<button type="button" data-op3-global-element-action="wizard">' + OP3._("Global Element Wizard") + '</button>'
                +              '</div>'
                +              '<div class="op3-element-options-container">'
                +                   '<p class="op3-options-group-notes">Once an element is marked as global, you cannot change its content.  If you wish to change the content, unlock the element first.</p>'
                +                   '<button type="button" data-op3-global-element-action="unlock">' + OP3._("Unlock Global Element") + '</button>'
                +              '</div>'
                +              '<div class="op3-element-options-container">'
                +                   '<p class="op3-options-group-notes">If you no longer want changes to this element to be synced to other instances of the element, you should unlink the element.  Once an element is unlinked, you can no longer link it back to the other global elements of the same design.</p>'
                +                   '<button type="button" data-op3-global-element-action="unlink">' + OP3._("Unlink Global Element") + '</button>'
                +              '</div>'
                +          '</div>'
                +       '</div>'
                +       '<div class="tab-content" data-tab="design"></div>'
                +       '<div class="tab-content" data-tab="style"></div>'
                +       '<div class="tab-content" data-tab="advanced"></div>'
                +       '<div class="tab-content" data-tab="hover"></div>'
                +   '</form>';
        },

        /**
         * Object initialization
         *
         * @return {Void}
         */
        _init: function() {
            if (that.$ui.parent)
                return;

            that.$ui.parent = OP3.LiveEditor.$ui.sidebar.find('[data-tab="elements"] .options')
                .on("click", ".op3-tab[data-tab] button", that._handleTabClick)
                .on("click", ".tab-heading-select-parent-element button", that._handleParentFocus)
                .on("click", ".op3-element-options-property-reset", that._handlePropertyReset);

            OP3.bind("loadlang", that._handleLoadLang);
            OP3.bind("workerready", that._handleWorkerReady);
            OP3.bind("elementfocus", that._handleElementFocus);
            OP3.bind("elementunfocus", that._handleElementUnfocus);
            OP3.bind("elementgid", that._handleElementGid);
            OP3.bind("elementappend", that._handleElementAppend);
            OP3.bind("elementdetach elementremove", that._handleElementDetach);
            OP3.bind("elementchange", that._handleElementChange);
            OP3.bind("elementoptionssyncrequest", that._handleElementOptionsSyncRequest);
            OP3.bind("elementoptionsrefreshrequest", that._handleElementOptionsRefreshRequest);
            OP3.bind("devicechange", that._handleDeviceChange);
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
            var weight = 1/8;
            var fn = function() {
                this.data.op3 = this.data.op3 || {};
                this.data.op3.message = OP3._("Rendering sidebar properties");

                config = $.extend(true, {}, config);
                var element = OP3.$("<" + type + " />").element();
                var template = OP3.$.templating(that._template(), config);
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

                // get used tabs
                var tabs = (config.tab || []).map(function(item) {
                    return item.id;
                });
                if (hasStyles || hasPresets && tabs.indexOf("design") === -1)
                    tabs.push("design");

                // hide tabs, show used ones
                $form
                    .find(".op3-tabs .op3-tab")
                        .addClass("hidden")
                        .filter(function() {
                            return tabs.indexOf($(this).attr("data-tab")) !== -1;
                        })
                            .removeClass("hidden");

                // hide tab menu selector when there is
                // only one active tab (hover is virtual
                // tab, so excluding it)
                if (tabs.filter(function(item) { return item !== "hover"; }).length < 2)
                    $form.find(".op3-tabs").addClass("hidden");

                // hover tab toggle
                $form.find(".tab-heading-button-wrapper")
                    .on("click", "button", that._handleElementStateToggle)
                    .addClass(tabs.indexOf("hover") === -1 ? "_temp" : "visible")
                    .removeClass("_temp");

                // select parent element button
                if (elcfg.focusParentElementButton)
                    $form
                        .find(".tab-heading-select-parent-element")
                        .addClass("visible")
                        .find("button")
                            .text(typeof elcfg.focusParentElementButton === "string" ? elcfg.focusParentElementButton : undefined);

                that._props[type] = $form.get(0);
            }

            // append job
            OP3.Worker.append(fn, [], weight, priority);

            // job added
            return true;
        },

        _preloadWorkerJobNavGroups: function(type, priority) {
            if (OP3.$.type(type) === "array") {
                var result = true;
                for (var i = 0; i < type.length; i++) {
                    result = that._preloadWorkerJobNavGroups(type[i], priority) && result;
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
            for (var i = 0; i < config.tab.length; i++) {
                if (!config.tab[i].group)
                    continue;

                for (var j = 0; j < config.tab[i].group.length; j++) {
                    list.push([ i, j ]);
                }
            }

            // job done
            var done = $(that._props[type]).find('.op3-element-options-group:not([data-op3-element-options-group-id="style-picker"]):not([data-op3-element-options-group-id="preset-picker"])').length;
            if (done === list.length)
                return false;

            // job handler
            var weight = 1/25;
            var fn = function(tabIndex, groupIndex) {
                var form = that._props[type];
                if (!form)
                    return;

                var $form = $(form);
                //var element = $form.data("op3-preload-element");
                var config = $form.data("op3-preload-config");
                if (!config)
                    return;

                if (!config.tab[tabIndex].$ui)
                    config.tab[tabIndex].$ui = {};
                if (!config.tab[tabIndex].$ui.parent)
                    config.tab[tabIndex].$ui.parent = $form.find('.tab-content[data-tab="' + config.tab[tabIndex].id + '"]');

                var group = config.tab[tabIndex].group[groupIndex];
                var template = OP3.$.templating(OP3.DocumentOptions._templateGroup, group);

                group.$ui = {
                    parent: $(template)
                        .appendTo(config.tab[tabIndex].$ui.parent),
                }
            }

            // append job
            for (var i = done; i < list.length; i++) {
                OP3.Worker.append(fn, list[i], weight, priority);
            }

            // job added
            return true;
        },

        _preloadWorkerJobNavGroupStyles: function(type, priority) {
            if (OP3.$.type(type) === "array") {
                var result = true;
                for (var i = 0; i < type.length; i++) {
                    result = that._preloadWorkerJobNavGroupStyles(type[i], priority) && result;
                }

                // recursion
                return result;
            }

            // type not in config
            var config = that._config[type];
            if (!config)
                return false;

            // job done
            config = OP3.Designer.config(type);
            if (!config || !config.styles || !config.styles.length)
                return;
            if ($(that._props[type]).find('.op3-element-options-group[data-op3-element-options-group-id="style-picker"]').length)
                return;

            // job handler
            var weight = 1/25;
            var fn = function() {
                var form = that._props[type];
                if (!form)
                    return;

                var $form = $(form);
                //var element = $form.data("op3-preload-element");
                var config = $form.data("op3-preload-config");
                if (!config)
                    return;
                config.$ui = config.$ui || {};

                var template = OP3.$.templating(OP3.DocumentOptions._templateGroup, { id: "style-picker", label: "Style Picker", reset: false });
                var uiTab = $form.find('.tab-content[data-tab="design"]');
                var uiGroup = $(template)
                    .appendTo(uiTab);
                var thumbSize = OP3.Designer.config(type).thumbSize || "normal";
                config.$ui.styleList = $("<ul />")
                    .addClass("op3-style-picker")
                    .attr("data-thumb-size", thumbSize)
                    .on("click", "[data-style-id]", that._handleStyleClick)
                    .appendTo(uiGroup);
            }

            // append job
            OP3.Worker.append(fn, [], weight, priority);

            // job added
            return true;
        },

        _preloadWorkerJobNavGroupPresets: function(type, priority) {
            if (OP3.$.type(type) === "array") {
                var result = true;
                for (var i = 0; i < type.length; i++) {
                    result = that._preloadWorkerJobNavGroupPresets(type[i], priority) && result;
                }

                // recursion
                return result;
            }

            // type not in config
            var config = that._config[type];
            if (!config)
                return false;

            // job done
            config = OP3.Designer.config(type);
            if (!config || !config.presets || !config.presets.length)
                return;
            if ($(that._props[type]).find('.op3-element-options-group[data-op3-element-options-group-id="preset-picker"]').length)
                return;

            // job handler
            var weight = 1/25;
            var fn = function() {
                var form = that._props[type];
                if (!form)
                    return;

                var $form = $(form);
                //var element = $form.data("op3-preload-element");
                var config = $form.data("op3-preload-config");
                if (!config)
                    return;
                config.$ui = config.$ui || {};

                var template = OP3.$.templating(OP3.DocumentOptions._templateGroup, { id: "preset-picker", label: "Preset Picker", reset: false });
                var uiTab = $form.find('.tab-content[data-tab="design"]');
                var uiGroup = $(template)
                    .appendTo(uiTab);
                var thumbSize = OP3.Designer.config(type).thumbSize || "normal";
                config.$ui.presetList = $("<ul />")
                    .addClass("op3-preset-picker")
                    .attr("data-thumb-size", thumbSize)
                    .on("click", "[data-preset-index]", that._handlePresetClick)
                    .appendTo(uiGroup);
            }

            // append job
            OP3.Worker.append(fn, [], weight, priority);

            // job added
            return true;
        },

        _preloadWorkerJobStyles: function(type, priority) {
            if (OP3.$.type(type) === "array") {
                var result = true;
                for (var i = 0; i < type.length; i++) {
                    result = that._preloadWorkerJobStyles(type[i], priority) && result;
                }

                // recursion
                return result;
            }

            // type not in config
            var config = that._config[type];
            if (!config)
                return false;

            // element has no styles
            config = OP3.Designer.config(type);
            if (!config || !config.styles || !config.styles.length)
                return;

            // job list (arguments)
            var list = [];
            for (var i = 0; i < config.styles.length; i++) {
                list.push([ config.styles[i].id, config.styles[i].title, config.styles[i].thumb ]);
            }

            // job done
            var done = $(that._props[type]).find(".op3-style-picker .op3-style-picker-item").length;
            if (done === list.length)
                return false;

            // job handler
            var weight = 1/25;
            var fn = function(id, title, src) {
                var form = that._props[type];
                if (!form)
                    return;

                var $form = $(form);
                //var element = $form.data("op3-preload-element");
                var config = $form.data("op3-preload-config");

                var $item = $("<li />")
                    .addClass("op3-style-picker-item")
                    .appendTo(config.$ui.styleList);
                var $link = $("<a />")
                    .attr("href", "#")
                    .attr("draggable", "false")
                    .attr("data-style-id", id)
                    .attr(title ? "title" : "data-title", title)
                    .removeAttr("data-title")
                    .appendTo($item);
                $("<img />")
                    .attr("src", src)
                    .attr("alt", id)
                    .appendTo($link);
            }

            // append job
            for (var i = done; i < list.length; i++) {
                OP3.Worker.append(fn, list[i], weight, priority);
            }

            // job added
            return true;
        },

        _preloadWorkerJobPresets: function(type, priority) {
            if (OP3.$.type(type) === "array") {
                var result = true;
                for (var i = 0; i < type.length; i++) {
                    result = that._preloadWorkerJobPresets(type[i], priority) && result;
                }

                // recursion
                return result;
            }

            // type not in config
            var config = that._config[type];
            if (!config)
                return false;

            // element has no presets
            config = OP3.Designer.config(type);
            if (!config || !config.presets || !config.presets.length)
                return;

            // job list (arguments)
            var list = [];
            for (var i = 0; i < config.presets.length; i++) {
                list.push([ i, config.presets[i].title, config.presets[i].thumb ]);
            }

            // job done
            var done = $(that._props[type]).find(".op3-preset-picker .op3-preset-picker-item").length;
            if (done === list.length)
                return false;

            // job handler
            var weight = 1/25;
            var fn = function(presetIndex, title, src) {
                var form = that._props[type];
                if (!form)
                    return;

                var $form = $(form);
                //var element = $form.data("op3-preload-element");
                var config = $form.data("op3-preload-config");

                var $item = $("<li />")
                    .addClass("op3-preset-picker-item")
                    .appendTo(config.$ui.presetList);
                var $link = $("<a />")
                    .attr("href", "#")
                    .attr("draggable", "false")
                    .attr("data-preset-index", presetIndex)
                    .attr(title ? "title" : "data-title", title)
                    .removeAttr("data-title")
                    .appendTo($item);
                $("<img />")
                    .attr("src", src)
                    .attr("alt", "")
                    .appendTo($link);
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
            for (var i = 0; i < config.tab.length; i++) {
                if (!config.tab[i].group)
                    continue;

                for (var j = 0; j < config.tab[i].group.length; j++) {
                    var group = config.tab[i].group[j];
                    if (group.prependHTML)
                        list.push([i, j, false, group.prependHTML]);

                    if (group.property)
                        for (var l = 0; l < group.property.length; l++) {
                            list.push([i, j, true, group.property[l]]);
                        }

                    if (group.appendHTML)
                        list.push([i, j, false, group.appendHTML]);
                }
            }

            // job done
            var done = $(that._props[type]).find(".op3-element-options-property, .op3-element-options-custom-html").length;
            if (done === list.length)
                return false;

            // job handler
            var weight = 1/6;
            var fn = function(tabIndex, groupIndex, useElement, value) {
                var form = that._props[type];
                var $form = $(form);
                var config = $form.data("op3-preload-config");
                var element = $form.data("op3-preload-element");
                var group = config.tab[tabIndex].group[groupIndex];
                var $target = group.$ui.parent;

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
            for (var i = 0; i < config.tab.length; i++) {
                if (!config.tab[i].group)
                    continue;

                for (var j = 0; j < config.tab[i].group.length; j++) {
                    var group = config.tab[i].group[j];
                    if (group.filter)
                        for (var k = 0; k < group.filter.length; k++) {
                            list.push([ i, j, group.filter[k] ]);
                        }
                }
            }

            // job done
            var done = $(that._props[type]).find(".op3-element-options-property-filter").length;
            if (done === list.length)
                return false;

            // job handler
            var weight = 1/10;
            var fn = function(tabIndex, groupIndex, value) {
                var form = that._props[type];
                var $form = $(form);
                var config = $form.data("op3-preload-config");
                //var element = $form.data("op3-preload-element");
                var group = config.tab[tabIndex].group[groupIndex];
                var $target = group.$ui.parent;

                // append filter
                var $filter = $("<div />")
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
         * Create form for each element type
         *
         * @return {Void}
         */
        _preload: function() {
            // prerender only once
            if (that._props)
                return;
            that._props = {};

            // list all types in config
            var type = Object.keys(that._config);

            // prerender interface
            if (that._prerenderType === prerenderType.UI || that._prerenderType === prerenderType.ALL) {
                that._preloadWorkerJobForm(type);
                that._preloadWorkerJobNavGroups(type);
                that._preloadWorkerJobNavGroupStyles(type);
                that._preloadWorkerJobNavGroupPresets(type);
            }

            // prerender properties
            if (that._prerenderType === prerenderType.ALL) {
                that._preloadWorkerJobStyles(type);
                that._preloadWorkerJobPresets(type);
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
         * Tab click event handler:
         * hide/display tabs
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleTabClick: function(e) {
            var $tabs = $(e.target).closest(".op3-tabs");
            var $content = $tabs.nextAll(".tab-content");
            var $current = $(e.target).closest(".op3-tab[data-tab]")

            $tabs
                .find(".op3-tab[data-tab].selected")
                    .removeClass("selected");
            $content
                .removeClass("selected")
                    .filter('[data-tab="' + $current.attr("data-tab") + '"]')
                        .addClass("selected");
            $current
                .addClass("selected");

            e.preventDefault();
        },

        /**
         * Focus parent element click
         * event handler
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleParentFocus: function(e) {
            var element = OP3.Designer.activeElement();
            var parent = element.parent();

            OP3.$(parent).focus();
        },

        /**
         * Reset property click
         * event handler
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
         * Style click event handler:
         * change element style
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleStyleClick: function(e) {
            e.preventDefault();

            var style = $(e.currentTarget).attr("data-style-id");
            that.element.style(style);
        },

        /**
         * Preset click event handler:
         * apply preset
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handlePresetClick: function(e) {
            e.preventDefault();

            var index = $(e.currentTarget).attr("data-preset-index")*1;
            var config = that.element.config();
            var preset = config.presets ? config.presets[index] : null;
            if (!preset)
                return;

            that.element.unserializePreset(preset);
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
                return null;

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
            formReady = !that._preloadWorkerJobNavGroups(type, 200) && formReady;
            formReady = !that._preloadWorkerJobNavGroupStyles(type, 300) && formReady;
            formReady = !that._preloadWorkerJobNavGroupPresets(type, 400) && formReady;

            // attach form when form is ready
            if (formReady)
                that._attachForm(node);
            else
                OP3.Worker.append(that._attachForm, [ node ], 1/4, 500);

            // render properties
            that._preloadWorkerJobStyles(type, 800);
            that._preloadWorkerJobPresets(type, 900);
            that._preloadWorkerJobProperty(type, 1000);
            that._preloadWorkerJobPropertyFilter(type, 99990);
            that._preloadWorkerJobClean(type, 100000);

            // when all done prepare form
            OP3.Worker.append(that._activateForm, [ node ], 1/20, 100100);
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
                .attr("data-op3-element-options-row-children-count", OP3.$(element).closestHorizontal().children().length)
                .appendTo(that.$ui.parent.empty());

            // select first visible tab
            $form
                .find(".tab-content")
                    .removeClass("selected");
            $form
                .find(".op3-tabs .op3-tab")
                .removeClass("selected")
                .not(".hidden")
                .not('[data-tab="design"]')
                .first()
                    .addClass("selected")
                        .each(function() {
                            $(form)
                                .find('.tab-content[data-tab="' + $(this).attr("data-tab") + '"]')
                                    .addClass("selected");
                        });

            // close all groups and display
            // only first ones
            $form
                .find(".op3-element-options-group")
                .removeClass("dropdown")
                .filter(function() {
                    return !$(this).prevAll(".op3-element-options-group").length;
                })
                    .addClass("dropdown");

            OP3.LiveEditor.$ui.body
                .attr("data-op3-state", "normal")
                .addClass("sidebar-options");

            // Make sure Normal state tab is marked as active
            // by default on element focus and element drop
            OP3.LiveEditor.$ui.sidebar
                .find(".options .tab-heading-button")
                .removeClass("active")
                .filter('[data-op3-element-state="normal"]')
                .addClass("active");

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

            $(that.form)
                .off("change.op3elementoptions")
                .detach();

            that.form = null;
            that.element = null;

            OP3.LiveEditor.$ui.body
                .removeClass("sidebar-options")
                .removeAttr("data-op3-state");
        },

        /**
         * Sync, prepare and bind change events
         *
         * @return {Void}
         */
        _activateForm: function() {
            if (!that.element || !that.form)
                return;

            that._sync();

            $(that.form)
                .attr("data-op3-element-options-render-status", "ready")
                .off("change.op3elementoptions")
                .on("change.op3elementoptions", ".op3-element-options-property-input", that._handleFormChange)
                .find(".op3-style-picker [data-style-id]")
                    .removeClass("selected")
                    .filter('[data-style-id="' + that.element.style() + '"]')
                        .addClass("selected");
        },

        /**
         * ElementFocus event handler
         * set element/form objects, prepare
         * and attach form
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

            if (OP3.$(o.node).parent().node() === that.element.node())
                $(that.form)
                    .attr("data-op3-element-options-children-count", that.element.children().length);
            else {
                var row = OP3.$(that.element).closestHorizontal();
                if (OP3.$(o.node).parent().node() === row.node())
                    $(that.form)
                        .attr("data-op3-element-options-row-children-count",  row.children().length);
            }
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

            if (o.parent === that.element.node())
                $(that.form)
                    .attr("data-op3-element-options-children-count", that.element.children().length);
            else {
                var row = OP3.$(that.element).closestHorizontal();
                if (o.parent === row.node())
                    $(that.form)
                        .attr("data-op3-element-options-row-children-count",  row.children().length);
            }
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

        /**
         * Element state toggle click event handler
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleElementStateToggle: function(e) {
            var $target = $(e.target),
                state = $target.attr("data-op3-element-state");

            if ($target.hasClass("active"))
                return;

            $target
                .addClass("active")
                .siblings()
                .toggleClass("active");

            OP3.LiveEditor.$ui.body.attr("data-op3-state", state);
            OP3.LiveEditor.$ui.sidebarWrapper.scrollTop(0);

            e.preventDefault();
        },

    }

    // globalize
    window.OP3.ElementOptions = that;

    // autoinit
    $(function() {
        OP3.ElementOptions._init();
    });

})(jQuery, window, document);
