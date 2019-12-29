/**
 * OptimizePress3 options sidebar clean:
 *
 * Trigger live-editor document click/mousedown
 * on designer document click/mousedown making
 * sure that all libraries like colorpicker
 * are hidden. In other words make designer
 * click hide colorpicker in sidebar.
 */
;(function($, window, document) {

    "use strict";

    OP3.bind("ready", function(e) {

        $(false)
            .add(OP3.LiveEditor.ownerDocument)
            .add(OP3.Designer.ownerDocument)
                .on("mousedown", function(e) {
                    var doc = this.ownerDocument || this;
                    var win = doc.defaultView;
                    var body = doc.body;

                    if ($(body).data("op3-mousedown"))
                        return;

                    win.OP3.transmit("mousedown");
                    win.OP3.transmit("mousedown::" + win.OP3.layer);
                });

    });

    OP3.bind("mousedown::designer", function(e) {
        $(document.body)
            .data("op3-mousedown", true)
            .trigger("mousedown")
            .trigger("mouseup")
            .trigger("click");

        setTimeout(function() {
            $(document.body)
                .removeData("op3-mousedown");
        });
    });

})(jQuery, window, document);
