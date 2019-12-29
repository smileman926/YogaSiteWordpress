/**
 * OptimizePress3 element.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-elements.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.VideoStartTime = OP3.defineClass({

        Name: "OP3.Property.VideoStartTime",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "videoStartTime",

            _defaults: {
                label: function() {
                    return OP3._("Select Start Time");
                },
                selector: " [data-op3-video-start-time]",
                attr: {
                    type: "text",
                    "data-property-type": "time",
                },
            },

            _forceComputed: true,

            computed: function() {
                var seconds = $(this.target()).attr("data-op3-video-start-time") || "00:00";
                var measuredTime = new Date(null);
                measuredTime.setSeconds(parseInt(seconds));
                var MHTime = measuredTime.toISOString().substr(14, 5);

                return MHTime;
            },

            setter: function(value, media) {
                value = value || "00:00";
                var time = value.split(":");
                var seconds = (+time[0]) * 60 + (+time[1]);

                $(this.target()).attr("data-op3-video-start-time", seconds);
            },

        },

    });

})(jQuery, window, document);
