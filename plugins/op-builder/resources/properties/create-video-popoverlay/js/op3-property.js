/**
 * OptimizePress3 createVideoPopoverlay property.
 *
 * Property used to create popoverlay
 * with video inside.
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.CreateVideoPopoverlay = OP3.defineClass({

        Name: "OP3.Property.CreateVideoPopoverlay",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "createVideoPopoverlay",

            _defaults: {
                label: function() {
                    return OP3._("Create Video Popoverlay");
                },
                attr: {
                    "data-property-type": "execute",
                },
                serialize: false,
            },

            computed: function() {
                return "0";
            },

            getter: function(media) {
                return this.computed();
            },

            setter: function(value, media) {
                setTimeout(function() {
                    // Trigger event and let live editor
                    // create video popoverlay
                    OP3.transmit("elementrequestcreatevideopopoverlay", {
                        node: this.element.node(),
                        media: media,
                    });
                }.bind(this));
            },

        },

    });

})(jQuery, window, document);
