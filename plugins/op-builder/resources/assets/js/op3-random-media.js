/**
 * OptimizePress3 designer extension:
 * add random images/icons on specific element(s)
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * Add random icon to element
     *
     * @param  {Object} node
     * @return {Void}
     */
    var _icon = function(node) {
        var element = OP3.$(node);
        var value = element.getOption("op3Icon", "all");
        if (value && value !== "_empty")
            return;

        var ipsum = new Op3Ipsum();
        var icon = "op3-icon-" + ipsum.icon();

        element
            .setOption("op3Icon", icon, "all");
    }

    /**
     * Add random image to element
     *
     * @param  {Object} node
     * @return {Void}
     */
    var _image = function(node) {
        var element = OP3.$(node);
        var value = element.getOption("src", "all");
        if (value)
            return;

        var count = 10;
        var index = Math.floor(Math.random() * (count - 1)) + 1;
        var url = OP3.Meta.assets + "/img/elements/featureblock/predefined/{index}.jpg";
        var src = url
            .replace(/{index}/, index);
        var attrWidth = "640";
        var attrHeight = "480";

        element
            .setOption("src", src, "all")
            .setOption("attrWidth", attrWidth, "all")
            .setOption("attrHeight", attrHeight, "all");
    }

    /**
     * Add random avatar image to element
     *
     * @param  {Object} node
     * @return {Void}
     */
    var _avatar = function(node) {
        var element = OP3.$(node);
        var value = element.getOption("src", "all");
        if (value)
            return;

        var url = OP3.Meta.assets + "/img/elements/testimonial/profiles/{gender}/{index}.jpg";
        var author = element.next().jq().text().split(" ").shift();
        var gender = ["male", "female"][Math.floor(Math.random() * 2)];
        if (author && PersonIpsum.prototype._firstNameMale.indexOf(author) !== -1)
            gender = "male";
        else if (author && PersonIpsum.prototype._firstNameFemale.indexOf(author) !== -1)
            gender = "female";

        var count = 10;
        var index = Math.floor(Math.random() * (count - 1)) + 1;
        var src = url
            .replace(/{gender}/, gender)
            .replace(/{index}/, index);
        var attrWidth = "128";
        var attrHeight = "128";

        element
            .setOption("src", src, "all")
            .setOption("attrWidth", attrWidth, "all")
            .setOption("attrHeight", attrHeight, "all");
    }

    // random icon on featureblock
    OP3.bind("elementappend::section elementappend::featureblock elementappend::featureblockitem", function(e, o) {
        var target = o.node.querySelectorAll('.op3-element[data-op3-element-type="featureblockitem"] .op3-element[data-op3-element-type="icon"][data-op3-element-spec="icon"]');
        Array.prototype.slice.call(target).forEach(function(item) {
            _icon(item);
        });
    });

    // random image on featureblock
    OP3.bind("elementappend::section elementappend::featureblock elementappend::featureblockitem", function(e, o) {
        var target = o.node.querySelectorAll('.op3-element[data-op3-element-type="featureblockitem"] .op3-element[data-op3-element-type="image"][data-op3-element-spec="image"]');
        Array.prototype.slice.call(target).forEach(function(item) {
            _image(item);
        })
    });

    // random avatar image on testimonial
    OP3.bind("elementappend::section elementappend::testimonial elementappend::testimonialitem", function(e, o) {
        var target = o.node.querySelectorAll('.op3-element[data-op3-element-type="testimonialitem"] .op3-element[data-op3-element-type="image"][data-op3-element-spec="avatar"]');
        Array.prototype.slice.call(target).forEach(function(item) {
            _avatar(item);
        })
    });

})(jQuery, window, document);
