;(function() {

    "use strict";

    /**
     * Op3Ipsum constructor
     *
     * @type {Function}
     */
    window.Op3Ipsum = function() {
        // pass
    }

    /**
     * Op3Ipsum prototype
     *
     * @type {Object}
     */
    window.Op3Ipsum.prototype = {

        /**
         * Possible headlines
         *
         * @type {Array}
         */
        _headlines: [ "Sections", "Templates", "Mobile", "Elements", "Optimized", "Cloud", "Sales", "Customers", "Optimization", "Amazing Support", "Subscribers", "Funnels", "Blogging", "Fast", "Conversion", "Inline", "Visual", "Powerful", "Speed", "Editing", "Freedom", "Flexible", "Rapid", "Benefit", "Leads", "Optin", "Modern", "New", "Members" ],

         /**
         * Possible testimonial headlines
         *
         * @type {Array}
         */
        _testimonialHeadlines: [ "Amazing", "Great", "Awesome", "Stunning", "Excellent", "Proven", "Guaranteed", "Results", "Remarkable", "Innovative", "Revolutionary", "Breakthrough", "Groundbreaking", "Magnificent", "Invaluable", "Transformed", "Genuine", "Premium", "Immaculate", "Accelerated" ],

        /**
         * Words used for generating randomish lorem ipsum.
         * All words are always used, but in random order
         * to ensure texts look different but are
         * of similar length (OP3-948 & OP3-978)
         *
         * @type {Array}
         */
        _words: [ "lectus", "semper", "vulput", "lacusa", "laoret", "portti", "intege", "platea", "venena", "sagitt", "proina", "ipsume", "dolors", "evenie", "tempor", "vertis", "minim" ],

        /**
         * Some elements require
         * shorter lore ipsum...
         *
         * @type {Array}
         */
        _wordsShort: [ "lectus", "semper", "vulput", "vestib", "lacusa", "laoret", "portti", "intege", "platea" ],

         /**
         * Possible icons
         *
         * @type {Array}
         */
        _icons: [ "single-03-2", "shape-star-1-1", "leaf-80-2-2", "humidity-52-2", "pen-01-2-2", "quote-2", "preferences-rotate-2", "multiple-11-2", "settings-gear-63-2", "chat-33-2", "favourite-28-6", "like-2-2", "explore-2-2", "spaceship-2", "notification-69-2", "wifi-3", "cart-simple-2", "support-16-2", "tag-2", "action-74-2", "gps-2", "pin-3-2", "thumb-up-2", "organic-2-2" ],

        /**
         * Get random number
         *
         * @param  {Number} x
         * @param  {Number} y
         * @return {Number}
         */
        _random: function(x, y) {
            var rnd = (Math.random() * 2 - 1) + (Math.random() * 2 - 1) + (Math.random() * 2 - 1);
            return Math.round(Math.abs(rnd) * x + y);
        },

        /**
         * Get random number between min and max
         *
         * @param  {Number} min (optional) lower result limit
         * @param  {Number} max (optional) upper result limit
         * @return {Number}     random number
         */
        _count: function(min, max) {
            var result;
            if (min && max) result = Math.floor(Math.random() * (max - min + 1) + min);
            else if (min) result = min;
            else if (max) result = max;
            else result = this._random(8, 2);
            return result;
        },

        /**
         * Generate a random headline
         *
         * @return {String}     headline
         */
        _headline: function(headlines) {
            var length = headlines.length;
            var count = this._count(1, length) - 1;

            return headlines[count];
        },

        /**
         * Shuffles the 'words' array to create an
         * illusion of random with an identical
         * set of words to ensure the copy
         * is always of the same length
         *
         * @param {Array}   words
         * @return {String}
         */
        _text: function(words) {
            var currentIndex = words.length;
            var temporaryValue;
            var randomIndex;
            var result = '';

            // While there remain words to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = words[currentIndex];
                words[currentIndex] = words[randomIndex];
                words[randomIndex] = temporaryValue;
            }

            // Join words
            result = words.join(" ");

            // Upercase first letter and add a dot to the end
            result = result.charAt(0).toUpperCase() + result.slice(1) + ".";

            return result;
        },

        /**
         * Generate a random lorem ipsum
         * based on the _words array
         *
         * @param  {String} tag (optional)
         * @return {String}
         */
        text: function(tag) {
            return ''
                + (tag ? '<' + tag + '>' : '')
                + this._text(this._words)
                + (tag ? '</' + tag + '>' : '');
        },

        /**
         * Generate a random lorem ipsum based
         * on the _wordsShort array
         *
         * @param  {String} tag (optional)
         * @return {String}
         */
        textShort: function(tag) {
            return ''
                + (tag ? '<' + tag + '>' : '')
                + this._text(this._wordsShort);
                + (tag ? '</' + tag + '>' : '');
        },

        /**
         * Return a random headline from _headlines array
         *
         * @param  {String} tag (optional)
         * @return {String}
         */
        headline: function(tag) {
            return ''
                + (tag ? '<' + tag + '>' : '')
                + this._headline(this._headlines)
                + (tag ? '</' + tag + '>' : '');
        },


        /**
         * Return a random testimonial headline
         *
         * @param  {String} tag (optional)
         * @return {String}
         */
        testimonialHeadline: function(tag) {
            return ''
                + (tag ? '<' + tag + '>' : '')
                + this._headline(this._testimonialHeadlines);
                + (tag ? '</' + tag + '>' : '');
        },

        /**
         * Return a random OP3 icon from a predefined set
         *
         * @return {String}
         */
        icon: function() {
            var length = this._icons.length;
            return this._icons[this._count(1, length) - 1];
        },

    }

})();
