;(function($, window, document) {

    "use strict";

    // Intentionally an empty string, because
    // 'null' causes an error upon share
    var appId = '';

    // SDK must be loaded both in LiveEditor and on the
    // frontend appId is in meta tag from OP Dashboard
    if (typeof OP3 === "object" && OP3.Meta)
        appId = OP3.Meta.facebookAppId;
    else if (window.parent.OP3 && window.parent.OP3.Meta)
        appId = window.parent.OP3.Meta.facebookAppId;

    window.fbAsyncInit = function() {
        FB.init({
            appId            : appId,
            autoLogAppEvents : true,
            xfbml            : true,
            version          : 'v5.0'
        });
    };

    // Read lang from OP Dashboard but default to en
    var lang = 'en_US';
    if (typeof OP3 === "object" && OP3.Meta)
        lang = OP3.Meta.facebookLang;
    else if (window.parent.OP3 && window.parent.OP3.Meta && window.parent.OP3.Meta.facebookLang)
        lang = window.parent.OP3.Meta.facebookLang;

    // Loading SDK asyncronously
    var ref = document.getElementsByTagName('script')[0];
    var script = document.createElement('script');
    script.async = true;
    script.src = "//connect.facebook.net/" + lang + "/sdk.js";
    ref.parentNode.insertBefore(script, ref);

})(jQuery, window, document);
