/**
 * OptimizePress3 storage object:
 * local storage helper.
 *
 * Dependencies:
 *     - op3-core.js
 */
;(function(window, document) {

    "use strict";

    var Storage = OP3.defineClass({

        Name: "OP3.Storage",

        Prototype: {

            /**
             * Storage object
             *
             * @type {String}
             */
            _storageObject: "globalStorage",

            /**
             * Camelcase string
             *
             * @param  {String} key
             * @return {String}
             */
            _camelcase: function(key) {
                return key.replace(/[^A-Za-z0-9]+([A-Za-z0-9])/g, function($0, $1) {
                    return $1.toUpperCase();
                });
            },

            /**
             * Get value from storage
             *
             * @param  {String} key (optional)
             * @return {Mixed}
             */
            get: function(key) {
                var ls = {};
                try {
                    ls = JSON.parse(window[this._storageObject].getItem(OP3.prefix));
                }
                catch(e) {
                    // pass
                }

                if (key) {
                    var arr = key.split(".");
                    while (arr.length) {
                        var i = this._camelcase(arr.shift());

                        try {
                            ls = ls[i];
                        }
                        catch(e) {
                            return;
                        }
                    }
                }

                return ls;
            },

            /**
             * Set value to storage
             *
             * @param  {String} key
             * @param  {Mixed}  value
             * @return {Void}
             */
            set: function(key, value) {
                var ls = this.get() || {};

                var res = ls;
                var arr = key.split(".");
                while (arr.length - 1) {
                    var i = this._camelcase(arr.shift());

                    if (typeof res[i] !== "object") {
                        res[i] = {};
                    }

                    res = res[i];
                }

                var i = this._camelcase(arr.shift());
                res[i] = value;

                window[this._storageObject].setItem(OP3.prefix, JSON.stringify(ls));
            },

            /**
             * Remove key from storage
             *
             * @param  {String} key
             * @return {Void}
             */
            del: function(key) {
                var ls = this.get() || {};

                var res = ls;
                var arr = key.split(".");
                while (arr.length - 1) {
                    var i = this._camelcase(arr.shift());

                    try {
                        res = res[i];
                    }
                    catch(e) {
                        res = undefined;
                        break;
                    }
                }

                if (typeof res !== "undefined") {
                    try {
                        var i = this._camelcase(arr.shift());
                        delete res[i];
                    }
                    catch(e) {
                        // pass
                    }
                }

                window[this._storageObject].setItem(OP3.prefix, JSON.stringify(ls));
            }

        },

    });

    var LocalStorage = OP3.defineClass({
        Name: "OP3.LocalStorage",
        Extends: Storage,
        Prototype: {
            _storageObject: "localStorage",
        },
    });

    var SessionStorage = OP3.defineClass({
        Name: "OP3.SessionStorage",
        Extends: Storage,
        Prototype: {
            _storageObject: "sessionStorage",
        },
    });

    // globalize
    window.OP3.LocalStorage = new LocalStorage();
    window.OP3.SessionStorage = new SessionStorage();

    // link (wrapper)
    OP3.bind("load::liveeditor", function(e, o) {
        if (window !== window.parent) {
            window.parent.OP3.LocalStorage = window.OP3.LocalStorage;
            window.parent.OP3.SessionStorage = window.OP3.SessionStorage;
        }
    });

    // link (designer)
    OP3.bind("load::designer", function(e, o) {
        e.origin.LocalStorage = window.OP3.LocalStorage;
        e.origin.SessionStorage = window.OP3.SessionStorage;
    });

})(window, document);
