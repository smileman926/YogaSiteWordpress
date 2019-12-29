
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

    var revisions = [];

    var $group = null;

    /**
     * Option render
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _renderDocument = function(e, o) {
        if ($group)
            return;

        $group = $(OP3.$.templating(OP3.DocumentOptions._templateGroup, {
            id: "page-revisions",
            label: OP3._("Revisions"),
            reset: false,
        }));

        // Revisions UI HTML
        var revisionsUI = OP3.Revisions.render();

        $group.append(revisionsUI);

        // adding click event listener to buttons
        $group.on("click", ".op3-revision-restore", function(e) {
            _restoreRevisionClick(e);
        });

        // Append to sidebar
        $(o.parent)
            .find(".op3-element-options-group")
            .last()
            .after($group);
    }

    /**
     * Option refresh
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _refreshDocument = function(e, o) {
        if (!$group)
            return;

        var revisionsUI = OP3.Revisions.render();

        $group.find(".op3-revisions-list").remove();
        $group.append(revisionsUI);
    }

    /**
     * Restore revision event handler
     *
     * @param  {Object} e
     * @return {Void}
     */
    var _restoreRevisionClick = function(e) {
        if (OP3.Designer.changed())
            return OP3.UI.alert("Restore Revision", "Your document has not been saved. Please make sure you save the page before restoring revision.")

        var revision = $(e.target).val();
        OP3.Revisions.restore(revision);
    }

    // init
    OP3.bind("elementoptionsformprerender::document", _renderDocument);
    OP3.bind("loadelementrevisions", _refreshDocument);

    // import revisions from initial ajax request
    OP3.bind("loadajaxinit", function(e, o) {
        revisions = o.revisions;
    });

})(jQuery, window, document);
