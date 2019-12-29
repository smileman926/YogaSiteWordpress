/**
 * OptimizePress3 live editor extension:
 * adding elements to sidebar and binding
 * events to it.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-ui.js
 *     - op3-live-editor.js
 *     - op3-live-editor-sidebar.js
 *     - op3-designer.js
 */
;(function($, window, document) {

    "use strict";

    // extending window.OP3.LiveEditor
    var that = window.OP3.LiveEditor;

    /**
     * Option group reset event handler:
     * set each group property to it's
     * default value
     *
     * @param {Object} e
     * @return {Void}
     */
    that._handleGroupReset = function(e) {
        var element = OP3.Designer.activeElement();
        var type = element.node() === OP3.Document.node() ? "document" : "element";
        var group = $(e.currentTarget).closest(".op3-options-group-header").text();
        var title = "OptimizeBuilder";
        var message = "Are you sure you want to reset the " + type + " " + group + " settings to default?"

        // confirm and iterate
        OP3.UI.confirm(title, message, function() {
            $(e.currentTarget).closest(".op3-element-options-group").find(".op3-element-options-property").each(function() {
                element.resetOption($(this).attr("data-op3-element-options-property-id"));
            });
        });

        return false;
    },

    /**
     * Group header click event handler:
     * toggle dropdown class on parent
     *
     * @param  {Object} e
     * @return {Void}
     */
    that._handleGroupDropdown = function(e) {
         $(this)
            .closest(".op3-element-options-group")
                .toggleClass("dropdown")
                .siblings(".op3-element-options-group")
                    .removeClass("dropdown");

        // Scroll to begining of accordion
        // when block category is long
        var scrollable = $(this).closest(".wrapper");
        var top = this.parentNode.offsetTop - this.offsetHeight;
        scrollable.get(0).scrollTo({
            left: 0,
            top: top,
            behavior: "smooth"
        });
    },

    // autoinit
    $(function() {
        that.$ui.sidebar
            .on("click", ".op3-element-options-group header", that._handleGroupDropdown)
            .on("click", ".op3-options-group-actions .op3-options-group-actions-reset", that._handleGroupReset);
    });

})(jQuery, window, document);
