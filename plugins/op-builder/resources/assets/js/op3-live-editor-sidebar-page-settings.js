
/**
 * OptimizePress3 live editor extension:
 * Sidebar option to change page template.
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

    /**
     * Registered wordpress templates
     *
     * @type {Object}
     */
    var templates = {
        "default": "Default",
        "op_builder_blank": "OP3 - Blank Template",
        "op_builder_full_width": "OP3 - Full Width Template",
    };

    /**
     * Option render
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _renderDocument = function(e, o) {
        var $group = $(OP3.$.templating(OP3.DocumentOptions._templateGroup, {
            id: "page-settings",
            label: "Page Settings",
            reset: false,
        }));

        // Page Template
        var $templateWrapper = $(
            '<div class="op3-element-options-property">' +
                '<div class="op3-element-options-label-group">' +
                    '<label>Page Template</label>' +
                '</div>' +
            '</div>')
            .appendTo($group);

        var $select = $("<select />");
        for (var key in templates) {
            $('<option value="' + key + '">' + templates[key] + '</option>')
                .appendTo($select);
        }

        $select
            .val(OP3.Meta.pageTemplate)
            .on("select2:selecting", _beforePageTemplateChange)
            .on("select2:select", _pageTemplateChange)
            .appendTo($templateWrapper)
            .select2({
                width: '100%',
                dropdownCssClass: "select2-simple",
                containerCssClass: "select2-simple",
            });

        // Page Status
        var $statusWrapper = $(
            '<div class="op3-element-options-property">' +
                '<div class="op3-element-options-label-group">' +
                    '<label>Page Status</label>' +
                '</div>' +
            '</div>')
            .appendTo($group);

        $('<select>' +
              '<option value="draft">Draft</option>' +
              '<option value="publish">Published</option>' +
          '</select>')
            .val(OP3.Meta.pageStatus)
            .on("change", _pageStatusChange)
            .appendTo($statusWrapper)
            .selectButtons();

        // Append to sidebar
        $(o.parent)
            .find(".op3-element-options-group")
            .first()
            .before($group);
    }

    /**
     * Before template change event handler
     *
     * @param {Event} e
     */
    var _beforePageTemplateChange = function(e) {
        if (OP3.Designer.changed()) {
            e.preventDefault();
            return OP3.UI.alert("Template Change", "Your document has not been saved. Please make sure you save the page before template change.")
        }
    }

    /**
     * Page template change event handler
     *
     * @param  {Object} e
     * @return {Void}
     */
    var _pageTemplateChange = function(e) {
        OP3.Ajax.request({
            url: "pages/" + OP3.Meta.pageId + "/template",
            method: "post",
            data: JSON.stringify({
                "id": OP3.Meta.pageId,
                "template": $(e.target).val(),
            }),
            success: function(data, textStatus, jqXHR) {
                // Reload LiveEditor iframe
                window.frameElement.contentWindow.location.reload();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                // @todo - handle error
                alert("ERROR: " + errorThrown);
            },
        });
    }

    /**
     * Page status change event handler
     *
     * @param {Object} e
     * @return {Void}
     */
    var _pageStatusChange = function(e) {
        var status = $(e.target).val();
        OP3.Ajax.request({
            url: "pages/" + OP3.Meta.pageId + "/status",
            method: "post",
            data: JSON.stringify({
                "ID": OP3.Meta.pageId,
                "post_status": status,
            }),
            success: function(data, textStatus, jqXHR) {
                OP3.LiveEditor.$ui.body.attr("data-op3-page-status", status);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                // @todo - handle error
                alert("ERROR: " + errorThrown);
            },
        });
    }

    // init
    OP3.bind("elementoptionsformprerender::document", _renderDocument);

    // import page templates from initial ajax request
    OP3.bind("loadajaxinit", function(e, o) {
        templates = o.page_templates;
    });

})(jQuery, window, document);
