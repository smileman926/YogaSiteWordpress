/**
 * OptimizePress3 designer extension:
 * adding undo/redo functionality to designer.
 *
 * Dependencies:
 *     - jQuery.js
 *     - ice-text-editor.js
 *     - op3-core.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * Floatbar object
     *
     * @type {Object}
     */
    var _floatbar = null;

    /**
     * Autoinit editor
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _editor = function(e, o) {
        if (!_floatbar)
            _floatbar = new ice.Floatbar({
                onready: function(e) {
                    _colorpicker(this);
                    _autocomplete(this);
                    _links(this);
                },
                ondropdown: function(e) {
                    // refresh hover state decorations
                    if (e.detail.to === "font")
                        this.refresh();
                },
                onshow: function(e) {
                    _refreshPopOverlays();
                    _refreshFunnelSteps();
                    _funnels(this);
                    _handleShow(this);
                },
            });

        $(o ? o.node : document)
            .find("[data-op3-contenteditable]")
                .on("dragenter dragleave dragover drop", function(e) {
                    e.originalEvent.dataTransfer.dropEffect = "none";
                    e.preventDefault();
                })
                .each(function() {
                    if (this.ice)
                        this.ice.destroy();

                    // op3 element
                    var $element = OP3.$.closest(this).jq();
                    var type = OP3.$($element).type();

                    // add element type to data attr, so
                    // css can display different toolbar
                    // options for different elements
                    $(this)
                        .attr("data-floatbar-element-type", type);

                    // default options, simple text editor
                    var options = {
                        defaultTag: "div",
                        allowLineBreak: true,
                        allowHorizontalRule: false,
                        allowSplit: false,
                        allowedBlocks: [ "div", ],
                        autoSelectLink: true,
                        autoSelectAll: false
                    }

                    // advanced text editor
                    if (type === "headline") {
                        options.defaultTag = "h2";
                        if (this.firstElementChild && this.firstElementChild.tagName.toLowerCase().substr(0, 1) === "h")
                            options.defaultTag = this.firstElementChild.tagName.toLowerCase();
                        options.allowedBlocks = [ "h1", "h2", "h3", "h4", "h5", "h6", ];
                    } else if (type === "text") {
                        options.defaultTag = "p";
                        options.allowSplit = true;
                        options.allowedBlocks = [ "h1", "h2", "h3", "h4", "h5", "h6", "p", "pre", "blockquote", "ul", "ol", ];
                    } else if (type === "faqitem" || type === "contenttoggleitem") {
                        options.defaultTag = "h3";
                        options.allowSplit = true;
                        options.allowedBlocks = [ "h3" ];
                    }

                    // Fix for an issue in Firefox that prevents selection on inline text.
                    // The bug is happening because firefox has by default draggable
                    // enabled on all <a> elements, which breaks the
                    // contenteditable from working properly.
                    if ($(this).parent().is("a")) {
                        $(this).parent().attr("draggable", "false");
                    }

                    // instance ice editor
                    new ice.Editor(this, options);
                });
    }

    /**
     * Replace color inputs with
     * colorpicker
     *
     * @param  {Object} floatbar
     * @return {Void}
     */
    var _colorpicker = function(floatbar) {
        // colorpicker elements
        var $element = $(floatbar.document)
            .find('[data-ice-decoration="foreColor"],[data-ice-decoration="backColor"]');

        // initialize/destroy colorpicker on
        // dropdown fore-color/back-color
        // state change
        $(floatbar.element).on("icefloatbardropdown", function(e) {
            var $dest = $(false)
            if (e.detail.from === "fore-color")
                $dest = this.filter('[data-ice-decoration="foreColor"]');
            else if (e.detail.from === "back-color")
                $dest = this.filter('[data-ice-decoration="backColor"]');

            var $init = $(false);
            if (e.detail.to === "fore-color")
                $init = this.filter('[data-ice-decoration="foreColor"]');
            else if (e.detail.to === "back-color")
                $init = this.filter('[data-ice-decoration="backColor"]');

            // destructor
            $dest
                .off(".op3-iceeditor-colorpicker")
                .colorpicker("destroy");

            // constructor
            $init
                .on("colorpickerinit.op3-iceeditor-colorpicker", function(e, c) {
                    $(this).colorpicker("show");
                })
                .on("colorpickertab.op3-iceeditor-colorpicker", function(e, o) {
                    // show color-scheme settings in sidebar
                    if (o.tab === "edit") {
                        e.preventDefault();

                        // @todo - refacture this!!!
                        floatbar.editor.window.getSelection().removeAllRanges();
                        floatbar.hide();
                        OP3.LiveEditor.$ui.sidebarTabs.find('[data-tab="settings"]').click();
                        OP3.Designer.unfocus();
                    }
                })
                .on("colorpickerhide.op3-iceeditor-colorpicker", function(e, c) {
                    // recent color values are appended to
                    // local storage on widget hide/show,
                    // and since our widget is always shown
                    // we need to manually store color
                    $(this).colorpicker("store");

                    // do toggle dropdown...
                    floatbar.dropdown(null);

                    // ...instead of hidding colorpicker
                    e.preventDefault();
                })
                .colorpicker({
                    format: "rgb",
                    default: floatbar.editor ? $(floatbar.editor.element).css("color") : "black",
                    allowEmpty: true,
                    autoClose: false,
                    forceOpacity: true,
                    //parent: floatbar.element,
                    cssVarNode: OP3.Designer.$ui.parent,
                    schemeVars: [
                        "--op3-color-scheme-1",
                        "--op3-color-scheme-2",
                        "--op3-color-scheme-3",
                        "--op3-color-scheme-4",
                        "--op3-color-scheme-5",
                    ]
                });
        }.bind($element));
    }

    /**
     * Show next funnel step if the
     * page is a part of a funnel
     *
     * @param  {Object} floatbar
     * @return {Void}
     */
    var _funnels = function(floatbar) {
        var funnels = OP3.Funnels;
        if (!funnels || !funnels.pluginActive || !funnels.funnelId)
            return;

        var $action = $(floatbar.document)
            .find(".ice-floatbar-link-action");

        // Allow only 1 next funnel step option
        if ($action.find('option[value="nextFunnelStep"]').length > 0)
            return;
        if ($action.find('option[value="prevFunnelStep"]').length > 0)
            return;

        // Add next step
        if (funnels.nextPageId) {
            $action.append('<option value="nextFunnelStep">Go to Next Funnel Step</option>')
        }

        // Add previous step
        if (funnels.prevPageId) {
            $action.append('<option value="prevFunnelStep">Go to Previous Funnel Step</option>')
        }

        // Add step picker
        if (funnels.pages) {
            $action.append('<option value="goToFunnelStep">Go to Specific Funnel Step</option>')
        }
    }

    /**
     * Select a link option when floatbar is shown
     * (if a link isn't already created)
     *
     * @param {Object} floatbar
     * @return {Void}
     */
    var _handleShow = function(floatbar) {
        var $action = $(floatbar.document)
            .find(".ice-floatbar-link-action");

        // Selected text is already a link
        if (_getLink())
            return;

        $action.val("link");
        _refreshLink();
    }

    /**
     * Initialize event listeners for link dropdown
     * (Action & PopOverlay Trigger)
     *
     * @param  {Object} floatbar
     * @return {Void}
     */
    var _links = function(floatbar) {
        $(floatbar.document)
            .on("change", ".ice-floatbar-link-action", _handleAction)
            .on("change", ".ice-floatbar-link-popoverlay-trigger", _handlePopOverlay)
            .on("change", ".ice-floatbar-select-funnel-step-trigger", _handleSelectFunnelStep);
    }

    /**
     * Event handler for link action select
     *
     * @param  {Object} e
     * @return {Void}
     */
    var _handleAction = function(e) {
        var value = $(this).val();

        // set flag to show/hide
        // link or html in
        // the dropdown
        $(this)
            .closest(".ice-floatbar-dropdown-link")
            .attr("data-op-action", value);


        // Set actual value to the link itself
        var link = _getLink();
        $(link).attr("data-op-action", value);

        // Adjust next funnel href
        if (value === 'nextFunnelStep')
            _handleNextFunnelStep(this);

        // Adjust prev funnel href
        if (value === 'prevFunnelStep')
            _handlePrevFunnelStep(this);

        // Adjust specific funnel href
        if (value === 'goToFunnelStep')
            _handleSelectFunnelStep(this);

        _floatbar.refresh();
        _triggerHistory();
    }

    /**
     * Event handler for popoverlay trigger select
     *
     * @param {Object} e
     * @return {Void}
     */
    var _handlePopOverlay = function(e) {
        var link = _getLink();

        // If link already exists, update its
        // popoverlay trigger data attribute
        if (link) {
            $(link).attr("data-op-popoverlay-trigger", $(this).val());
            _triggerHistory()
            return;
        }

        // ...and if the link doesn't exist,
        // create it so we can set its
        // data attributes
        _floatbar.editor.createLink("#");
        var $element = $(this);
        setTimeout(function() {
            $element.trigger("change");

            link = _getLink();
            $(link).attr("data-op-action", "popoverlay");
            _refreshLink();
            _triggerHistory();
        });
    }

    /**
     * Event handler for next funnel step
     *
     * @param {Object} element
     * @return {void}
     */
    var _handleNextFunnelStep = function(element) {
        var link = _getLink();
        var url  = OP3.Meta.siteUrl + "/op-funnel-next-step/" + OP3.Meta.pageId;

        // If link already exists, update its href
        if (link) {
            $(link)
                // .attr("href", OP3.Meta.siteUrl + "/op-funnel-next-step/" + OP3.Meta.pageId)
                .attr("href", url)
                .removeAttr("rel")
                .removeAttr("target");
            _triggerHistory();

            return;
        }

        // ...and if the link doesn't exist,
        // create it and set its href
        _floatbar.editor.createLink(url);
        $(element).trigger("change");
        _refreshLink();
    }

    /**
     * Event handler for previous funnel step
     *
     * @param {Object} e
     * @return {void}
     */
    var _handlePrevFunnelStep = function(e) {
        var link = _getLink();
        var url  = OP3.Meta.siteUrl + "/op-funnel-prev-step/" + OP3.Meta.pageId;

        // If link already exists, update its href
        if (link) {
            $(link)
                .attr("href", url)
                .removeAttr("rel")
                .removeAttr("target");
            _triggerHistory();

            return;
        }

        // ...and if the link doesn't exist,
        // create it and set its href
        _floatbar.editor.createLink(url);
        $(e).trigger("change");
        _refreshLink();
    }

    /**
     * Event handler for selecting funnel step
     *
     * @param {Object} e
     * @return {void}
     */
    var _handleSelectFunnelStep = function(e) {
        var link     = _getLink();
        var $element = $(_floatbar.document)
        var stepId   = $element.find(".ice-floatbar-select-funnel-step-trigger").val();

        // If link already exists, update its href
        if (link) {
            $(link)
                .attr("href", OP3.Meta.siteUrl + "/op-funnel-step/" + OP3.Meta.pageId + "/" + stepId)
                .attr("data-op-funnel-step-trigger", $(this).val())
                .removeAttr("rel")
                .removeAttr("target");
            _triggerHistory();

            return;
        }

        // ...and if the link doesn't exist,
        // create it and set its href
        _floatbar.editor.createLink(OP3.Meta.siteUrl + "/op-funnel-step/" + OP3.Meta.pageId + "/" + stepId);
        $(e).trigger("change");
        _refreshLink();
    }

    /**
     * Trigger change for op3 history
     * !!! @TODO: FFFILO should review this !!!
     *
     * @param {Object} e
     * @return {Void}
     */
    var _triggerHistory = function() {
        var link = _getLink();
        if (!link)
            return;

        // Hack to trigger history append
        $(link).closest('[data-op3-contenteditable][contenteditable]')
            .trigger("keyup");
    }

    /**
     * Return the link element for the
     * current editor text selection
     *
     * @return {Object or Null}
     */
    var _getLink = function() {
        var nodes = ice.Util.getSelectedNodes('a');
        if (!nodes || nodes.length === 0)
            return null;

        return nodes[0];
    }

    /**
     * Refresh the link dropdown
     * to show correct action
     * and popoverlay trigger
     *
     * @return {Void}
     */
    var _refreshLink = function() {
        var $element = $(_floatbar.document)
            .find('.ice-floatbar-dropdown-link');

        var link = _getLink();
        // TODO: Remove "data-op3" part after a few versions (OP3-1228)
        var action = $(link).attr("data-op-action") || $(link).attr("data-op3-action") || "link";

        // Set action to dropdown, to
        // show correct section
        // (either link or
        // popoverlay)
        $element.attr("data-op-action", action);

        // Set action to <select>
        $element
            .find(".ice-floatbar-link-action")
            .val(action);

        // TODO: Remove "data-op3" part after a few versions (OP3-1228)
        var value = $(link).attr("data-op-popoverlay-trigger") || $(link).attr("data-op3-popoverlay-trigger");
        if (!value) value = "none";

        setTimeout(function() {
            $element
                .find(".ice-floatbar-link-popoverlay-trigger")
                .val(value);
        });

        var value = $(link).attr("data-op-funnel-step-trigger");
        if (!value) value = "none";

        setTimeout(function() {
            $element
                .find(".ice-floatbar-select-funnel-step-trigger")
                .val(value);
        });
    }

    /**
     * Get the list of pop overlays
     * and set it to the popoverlay
     * trigger select field
     *
     * @return {Void}
     */
    var _refreshPopOverlays = function() {
        var $element = $(_floatbar.document)
            .find('.ice-floatbar-dropdown-link');

        var data = OP3.LiveEditor._get_popoverlays();
        var template = '<option value="{uuid}">{name}</option>';
        var html = '<option value="none">None</option>';
        for (var i = 0; i < data.length; i++) {
            html += OP3.$.templating(template, data[ i ]);
        }

        $element
            .find(".ice-floatbar-link-popoverlay-trigger")
            .html(html);
    }

    /**
     * Get the list of pop overlays
     * and set it to the popoverlay
     * trigger select field
     *
     * @return {Void}
     */
    var _refreshFunnelSteps = function() {
        var data = [];
        var $element = $(_floatbar.document)
            .find('.ice-floatbar-dropdown-link');

        if (OP3.Funnels && OP3.Funnels.pages) {
            data = OP3.Funnels.pages;
        }

        var template = '<option value="{index}">{title}</option>';
        var html = '<option value="none">None</option>';
        for (var i = 0; i < data.length; i++) {
            data[i].index = i + 1;
            html += OP3.$.templating(template, data[i]);
        }

        $element
            .find(".ice-floatbar-select-funnel-step-trigger")
            .html(html);
    }

    /**
     * Init autocomplete on link input
     * of inline editor
     *
     * @param  {Object} editor
     * @return {Void}
     */
    var _autocomplete = function(floatbar) {
        $.Autocomplete.defaults.ajaxSettings = {
           beforeSend: OP3.Ajax._beforeSend,
        }
        window.parent.$.Autocomplete.defaults.ajaxSettings = {
           beforeSend: OP3.Ajax._beforeSend,
        }

        // autocomplete elements
        var $element = $(floatbar.document)
            .find('[data-ice-decoration="linkURL"]');

        // initialize/destroy autocomplete on
        // dropdown link state change
        $(floatbar.element).on("icefloatbardropdown", function(e) {
            // destructor
            if (e.detail.from === "link")
                this
                    .autocomplete("dispose");

            // constructor
            else if (e.detail.to === "link")
                setTimeout(function() {
                    var _nonce = null
                        || (window.OP3 && OP3.Meta ? OP3.Meta.nonce : "")
                        || "";

                    var autocompleteUrl = (null
                        || (window.OP3 && OP3.Meta ? OP3.Meta.api : "")
                        || "/wp-json/op3/v1") + "/pages?type[]=post&type[]=page&_wpnonce=" + _nonce;

                    this
                        .autocomplete({
                            serviceUrl: autocompleteUrl,
                            dataType: "json",
                            transformResult: function(response) {
                                return {
                                    suggestions: $.map(response, function(data) {
                                        return {
                                            value: data.post_title,
                                            data: data.post_title,
                                            permalink: data.permalink,
                                        };
                                    })
                                };
                            },
                            appendTo: this.parent(),
                            forceFixPosition: true,
                            maxHeight: 80,
                            onSearchStart: function(params) {
                                if (params.query.length <= 1)
                                    return false;
                            },
                            onSelect: function(suggestion) {
                                $(this).val(suggestion.permalink)
                                floatbar.editor.createLink(suggestion.permalink);
                            },
                        });
                }.bind(this));
        }.bind($element));
    }

    /**
     * Replace loremipsum tag with
     * lorem ipsum text
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _loremIpsum = function(e, o) {
        $(o ? o.node : document)
            .find("loremipsum")
                .each(function() {
                    var ipsum = new LoremIpsum();
                    var method = $(this).attr("method") || "paragraph";
                    var min = $(this).attr("min")*1 || undefined;
                    var max = $(this).attr("max")*1 || undefined;
                    var slice = $(this).attr("slice")*1;
                    var text = ipsum[method](min, max);

                    if (slice)
                        text = text.slice(0, slice);

                    $(this).replaceWith(text);
                });
    }

    /**
     * Replace personipsum tag with
     * person ipsum text
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _personIpsum = function(e, o) {
        $(o ? o.node : document)
            .find("personipsum")
                .each(function() {
                    var ipsum = new PersonIpsum({
                        format: $(this).attr("format") || "",
                        gender: $(this).attr("gender") || "",
                    });
                    var text = ipsum.generate();

                    $(this).replaceWith(text);
                });
    }

    /**
     * Replace loremipsum tag with
     * lorem ipsum text
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _op3Ipsum = function(e, o) {
        $(o ? o.node : document)
            .find("op3ipsum")
                .each(function() {
                    var ipsum = new Op3Ipsum();
                    var method = $(this).attr("method") || "text";
                    var element = $(this).closest(".op3-element");
                    var response = ipsum[method]();

                    if (method === "icon") response = '<i class="op3-icon op3-icon-' + response + '"></i>';

                    $(this).replaceWith(response);
                });


        $(o ? o.node : document)
            .find("op3ipsumnew")
                .each(function() {
                    var element = $(this).closest(".op3-element");
                    var ipsum = new Op3Ipsum();
                    var method = $(this).attr("method") || "text";
                    var args = $(this).attr("arguments") || "";
                    try {
                        args = JSON.parse(args);
                    }
                    catch(e) {
                        args = [ args ] || [];
                    }
                    var response = ipsum[method].apply(ipsum, args);

                    $(this).replaceWith(response);
                });
    }

    /**
     * Replace steps tag with "Steps NR"
     * where NR is the number of the
     * current element item based
     * on the 'rel' relation
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _step = function(e, o) {
        $(o ? o.node : document)
            .find("steps")
                .each(function() {
                    var rel = $(this).attr("rel") || "";
                    var tag = $(this).attr("tag") || "";
                    var type = '[data-op3-element-type="' + rel + '"]';
                    var step = $(o.node).prevAll(type).length + 1;
                    var text = ""
                        + (tag ? "<" + tag + ">" : "")
                        + "Step " + step;
                        + (tag ? "</" + tag + ">" : "");

                    $(this).replaceWith(text);
                });
    }

    /**
     * Refresh ice editor floatbar
     * (reposition/decorations)
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _change = function(e, o) {
        _floatbar.refresh();
        setTimeout(() => {
            _refreshLink();
            _floatbar.refresh();
        });
    }

    /**
     * Removing element form page can leave
     * floatbar below #op3-designer-element
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _detach = function(e, o) {
        var designerElement = OP3.Designer.$ui.parent.get(0);
        var designerTop = designerElement.offsetTop;
        var designerHeight = designerElement.offsetHeight;
        var floatbarElement = _floatbar.element;
        var floatbarTop = floatbarElement.offsetTop;
        var floatbarHeight = floatbarElement.offsetHeight;

        if (floatbarTop + floatbarHeight > designerTop + designerHeight)
            _floatbar.refresh();
    }

    /**
     * Hide ice editor floatbar on
     * live-editor mousedown
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _mousedown = function(e, o) {
        var doc = OP3.Designer.ownerDocument;
        var win = doc.defaultView;

        win.getSelection().removeAllRanges();

        var event = new win.Event("selectionchange");
        win.dispatchEvent(event);
    }

    // bind events
    $(function() {
        OP3.bind("load", _editor);
        OP3.bind("elementappendfirst", _loremIpsum);
        OP3.bind("elementappendfirst", _personIpsum);
        OP3.bind("elementappendfirst", _op3Ipsum);
        OP3.bind("elementappendfirst", _step);
        OP3.bind("elementappendfirst", _editor);
        OP3.bind("elementstyle", _editor);
        OP3.bind("elementchange", _change);
        OP3.bind("elementdetach elementremove", _detach);
        OP3.bind("mousedown::live-editor", _mousedown);
    });

    // ice editor floatbar auto dropdown
    // link tab on full link select
    var _range = null;
    document.addEventListener("iceselect", function(e) {
        var notChanged = (!!_range)
            && _range.startContainer === e.detail.range.startContainer
            && _range.endContainer === e.detail.range.endContainer
            && _range.startOffset === e.detail.range.startOffset
            && _range.endOffset === e.detail.range.endOffset;
        _range = e.detail.range;
        if (notChanged)
            return;

        var link = ice.Util.closest(e.detail.range.commonAncestorContainer, "a");
        if (!link || !ice.Util.is(link, "a") || ice.Util.closest(e.detail.editor.element, link))
            return;

        var text = ice.Util.getTextNodes(link);
        if (!text)
            return;

        var start = text[0];
        var end = text[text.length - 1];

        var isFullLink = true
            && e.detail.range.startContainer === start
            && e.detail.range.endContainer === end
            && e.detail.range.startOffset === 0
            && e.detail.range.endOffset === end.length;
        if (!isFullLink)
            return;

        setTimeout(function() {
            _refreshLink();
            _floatbar.dropdown("link");
        });
    });
    document.addEventListener("iceunselect", function(e) {
        _range = null;
    });

    // add/remove custom class to html on floatbar show/hide
    document.addEventListener("iceunselect", function(e) {
        $(window.parent.document.documentElement)
            .removeClass("op3-icefloatbar");
    });
    document.addEventListener("iceselect", function(e) {
        $(window.parent.document.documentElement)
            .removeClass("op3-icefloatbar")
            .addClass(e.detail.hasSelection ? "op3-icefloatbar" : "_temp")
            .removeClass("_temp");
    });

    // click on a tag does not remove selection on
    // contenteditable
    $(document).on("click", "a", function(e) {
        if ($(e.target).closest(".ice-editor").length)
            return;

        window.getSelection().removeAllRanges();
    });

    // firefox does not select word on a tag dblclick
    // (dirty hack)
    $(document).on("dblclick", "a", function(e) {
        if (!$(e.target).closest(".ice-editor").length)
            return;

        var selection = window.getSelection();
        if (!selection.isCollapsed || !selection.modify)
            return;

        selection.modify("move", "backward", "word");
        selection.modify("extend", "forward", "word");
    });

    // change ice floatbar default template
    ice.Floatbar.prototype._defaults.template = ''
        + '<div class="ice-floatbar-wrapper">'
        + '<div class="ice-floatbar-content">'
        + '<nav class="ice-floatbar-nav">'
        + '<ul class="ice-floatbar-hlist">'
        + '<li class="ice-floatbar-list-item-format-block"><a href="#" title="Format Block" data-ice-method="toggleDropdown" data-ice-args="[&quot;format-block&quot;]"><i class="op3-icon op3-icon-capitalize-2"></i></a></li>'
        + '<li class="ice-floatbar-list-item-font"><a href="#" title="Font Options" data-ice-method="toggleDropdown" data-ice-args="[&quot;font&quot;]"><i class="op3-icon op3-icon-text-2"></i></a></li>'
        + '<li class="ice-floatbar-list-item-align"><a href="#" title="Text Align" data-ice-method="toggleDropdown" data-ice-args="[&quot;align&quot;]"><i class="op3-icon op3-icon-align-center-2"></i></a></li>'
        + '<li class="ice-floatbar-list-item-link" data-ice-decoration="linkCount"><a href="#" title="Link" data-ice-method="toggleDropdown" data-ice-args="[&quot;link&quot;]" data-ice-pre-method="exec" data-ice-pre-args="[&quot;filterSelection&quot;,&quot;a&quot;]"><i class="op3-icon op3-icon-link-69-2"></i></a></li>'
        + '<li class="ice-floatbar-list-item-unlink" data-ice-decoration="linkCount"><a href="#" title="Unlink" data-ice-method="exec" data-ice-args="[&quot;unlink&quot;]"><i class="op3-icon op3-icon-link-broken-70-2"></i></a></li>'
        + '<li class="ice-floatbar-list-item-fore-color"><a href="#" title="Text Colour" data-ice-method="toggleDropdown" data-ice-args="[&quot;fore-color&quot;]"><i class="op3-icon op3-icon-color-2"></i></a></li>'
        + '<li class="ice-floatbar-list-item-back-color"><a href="#" title="Background Colour" data-ice-method="toggleDropdown" data-ice-args="[&quot;back-color&quot;]"><i class="op3-icon op3-icon-paint-bucket-40-2"></i></a></li>'
        + '<li class="ice-floatbar-list-item-remove-format"><a href="#" title="Remove All Formatting" data-ice-method="exec" data-ice-args="[&quot;removeFormat&quot;]"><i class="op3-icon op3-icon-filter-remove-1"></i></a></li>'
        + '</ul>'
        + '</nav>'
        + '<article class="ice-floatbar-dropdown ice-floatbar-dropdown-format-block">'
        + '<ul class="ice-floatbar-vlist" data-ice-decoration="formatBlock">'
        + '<li><a href="#" title="Headline 1" data-ice-method="exec" data-ice-args="[&quot;formatBlock&quot;,&quot;h1&quot;]">Headline 1</a></li>'
        + '<li><a href="#" title="Headline 2" data-ice-method="exec" data-ice-args="[&quot;formatBlock&quot;,&quot;h2&quot;]">Headline 2</a></li>'
        + '<li><a href="#" title="Headline 3" data-ice-method="exec" data-ice-args="[&quot;formatBlock&quot;,&quot;h3&quot;]">Headline 3</a></li>'
        + '<li><a href="#" title="Headline 4" data-ice-method="exec" data-ice-args="[&quot;formatBlock&quot;,&quot;h4&quot;]">Headline 4</a></li>'
        + '<li><a href="#" title="Headline 5" data-ice-method="exec" data-ice-args="[&quot;formatBlock&quot;,&quot;h5&quot;]">Headline 5</a></li>'
        + '<li><a href="#" title="Headline 6" data-ice-method="exec" data-ice-args="[&quot;formatBlock&quot;,&quot;h6&quot;]">Headline 6</a></li>'
        + '<li><a href="#" title="Paragraph" data-ice-method="exec" data-ice-args="[&quot;formatBlock&quot;,&quot;p&quot;]">Paragraph</a></li>'
        + '<li><a href="#" title="Code" data-ice-method="exec" data-ice-args="[&quot;formatBlock&quot;,&quot;pre&quot;]">Code</a></li>'
        + '<li><a href="#" title="Quote" data-ice-method="exec" data-ice-args="[&quot;formatBlock&quot;,&quot;blockquote&quot;]">Quote</a></li>'
        + '<li><a href="#" title="Ordered List" data-ice-method="exec" data-ice-args="[&quot;formatBlock&quot;,&quot;ol&quot;]">Ordered List</a></li>'
        + '<li><a href="#" title="Unordered List" data-ice-method="exec" data-ice-args="[&quot;formatBlock&quot;,&quot;ul&quot;]">Unordered List</a></li>'
        + '</ul>'
        + '</article>'
        + '<article class="ice-floatbar-dropdown ice-floatbar-dropdown-font">'
        + '<ul class="ice-floatbar-hlist">'
        + '<li data-ice-decoration="bold"><a href="#" title="Bold" data-ice-method="exec" data-ice-args="[&quot;bold&quot;]"><i class="op3-icon op3-icon-bold-2"></i></a></li>'
        + '<li data-ice-decoration="italic"><a href="#" title="Italic" data-ice-method="exec" data-ice-args="[&quot;italic&quot;]"><i class="op3-icon op3-icon-italic-2"></i></a></li>'
        + '<li data-ice-decoration="underline"><a href="#" title="Underline" data-ice-method="exec" data-ice-args="[&quot;underline&quot;]"><i class="op3-icon op3-icon-underline-2"></i></a></li>'
        + '<li data-ice-decoration="strikeThrough"><a href="#" title="Line Through" data-ice-method="exec" data-ice-args="[&quot;strikeThrough&quot;]"><i class="op3-icon op3-icon-strikethrough-2"></i></a></li>'
        + '</ul>'
        + '</article>'
        + '<article class="ice-floatbar-dropdown ice-floatbar-dropdown-align">'
        + '<ul class="ice-floatbar-hlist" data-ice-decoration="align">'
        + '<li><a href="#" title="Text Align Left" data-ice-method="exec" data-ice-args="[&quot;align&quot;,&quot;left&quot;]"><i class="op3-icon op3-icon-menu-left-1"></i></a></li>'
        + '<li><a href="#" title="Text Align Center" data-ice-method="exec" data-ice-args="[&quot;align&quot;,&quot;center&quot;]"><i class="op3-icon op3-icon-align-center-2"></i></a></li>'
        + '<li><a href="#" title="Text Align Right" data-ice-method="exec" data-ice-args="[&quot;align&quot;,&quot;right&quot;]"><i class="op3-icon op3-icon-menu-right-1"></i></a></li>'
        + '<li><a href="#" title="Text Align Justify" data-ice-method="exec" data-ice-args="[&quot;align&quot;,&quot;justify&quot;]"><i class="op3-icon op3-icon-align-justify-1"></i></a></li>'
        + '</ul>'
        + '</article>'
        + '<article class="ice-floatbar-dropdown ice-floatbar-dropdown-link" data-op-action="link">'
        + '<p>'
        + '<label>Action</label>'
        + '<select class="ice-floatbar-link-action">'
        + '<option value="link">Link URL</option>'
        + '<option value="popoverlay">Show Popup Overlay</option>'
        + '</select>'
        + '</p>'
        + '<div class="ice-floatbar-dropdown-link-href">'
        + '<p>'
        + '<input type="text" title="Link URL" placeholder="Link URL" value="" data-ice-empty-value="#" data-ice-method="exec" data-ice-args="[&quot;createLink&quot;,&quot;&dollar;value&quot;,null,null]" data-ice-decoration="linkURL" />'
        + '<a href="#" target="_parent|_blank" title="Open Link" data-ice-link-test=""><i class="op3-icon op3-icon-eye-17-2"></i></a>'
        + '</p>'
        + '<p><label>Show in New Tab</label><label class="ice-floatbar-switch" title="Show in New Tab"><input type="checkbox" value="_blank" data-ice-method="exec" data-ice-args="[&quot;createLink&quot;,null,&quot;&dollar;value&quot;,null]" data-ice-decoration="linkTarget" /><span></span></label></p>'
        + '<p><label>No Follow</label><label class="ice-floatbar-switch" title="No Follow"><input type="checkbox" value="nofollow" data-ice-method="exec" data-ice-args="[&quot;createLink&quot;,null,null,&quot;&dollar;value&quot;]" data-ice-decoration="linkRel" /><span></span></label></p>'
        + '</div>'
        + '<div class="ice-floatbar-dropdown-link-popoverlay">'
        + '<p>'
        + '<label>Pop Overlay Trigger</label>'
        + '<select class="ice-floatbar-link-popoverlay-trigger"><option value="none">None</option></select>'
        + '</p>'
        + '</div>'
        + '<div class="ice-floatbar-dropdown-select-funnel-step">'
        + '<p>'
        + '<label>Select Funnel Page</label>'
        + '<select class="ice-floatbar-select-funnel-step-trigger"><option value="none">None</option></select>'
        + '</p>'
        + '</div>'
        + '</article>'
        + '<article class="ice-floatbar-dropdown ice-floatbar-dropdown-fore-color">'
        + '<p><input type="text" title="Text Color" placeholder="Text Colour" value="" data-ice-method="exec" data-ice-args="[&quot;foreColor&quot;,&quot;&dollar;value&quot;]" data-ice-decoration="foreColor" /></p>'
        + '</article>'
        + '<article class="ice-floatbar-dropdown ice-floatbar-dropdown-back-color">'
        + '<p><input type="text" title="Background Color" placeholder="Background Colour" value="" data-ice-method="exec" data-ice-args="[&quot;backColor&quot;,&quot;&dollar;value&quot;]" data-ice-decoration="backColor" /></p>'
        + '</article>'
        + '</div>'
        + '</div>'

})(jQuery, window, document);
