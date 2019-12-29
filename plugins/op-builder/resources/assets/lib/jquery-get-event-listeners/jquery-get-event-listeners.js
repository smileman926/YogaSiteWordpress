;(function($) {

    "use strict";

    $.getEventListeners = function(context, eventName, selector) {
        if (!eventName)
            throw "jQuery.getEventListeners: event type not specified.";

        var result = [],
            arr = eventName.split("."),
            type = arr.shift(),
            namespace = arr.join(".");

        $(context).each(function() {
            $.each(($._data(this).events || {})[type], function() {
                if (namespace && namespace !== this.namespace)
                    return;
                if (selector && selector !== this.selector)
                    return;

                result.push(this.handler);
            });
        });

        return result;
    }

    $.fn.getEventListeners = function(eventName, selector) {
        return $.getEventListeners(this, eventName, selector);
    }

})(window.jQuery);
