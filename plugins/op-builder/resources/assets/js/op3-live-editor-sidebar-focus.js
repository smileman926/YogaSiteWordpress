/**
 * OptimizePress3 sidebar focus:
 *
 * While we have last input in sidebar group focused,
 * on tab click next input (which is in another group)
 * will focus. This will move scrollTop on group so
 * input will be in viewport. We should close current
 * group, open next one and then focus next element...
 */
;(function($, window, document) {

    OP3.bind("ready", function() {

        OP3.LiveEditor.$ui.sidebar.on("focusin", ".op3-element-options-group", function(e) {
            if ($(e.currentTarget).hasClass("dropdown"))
                return;

            $(e.currentTarget).find(".op3-options-group-header").click();
        });

    });

})(jQuery, window, document);
