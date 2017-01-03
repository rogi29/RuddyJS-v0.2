/**
 * RuddyJS Globals - String
 *
 *  @package    ruddyJS
 *  @author     Gil Nimer <info@ruddymonkey.com>
 *  @author     Nick Vlug <info@ruddy.nl>
 *  @copyright  Copyright 2015 Ruddy Monkey studios & ruddy.nl
 *  @version    0.0.2
 *
 * http://ruddymonkey.com/ruddyjs/globals
 */

(function(__core){
    /**
     * Global String Wrapper
     *
     * @param str
     * @returns {*}
     */
    var string = function(str) {
        if(__core.isStr(str) === false)
            throw new TypeError("String type - argument provided is not a string type");

        var prototype = {
            /**
             * Check if string is empty
             *
             * @returns {boolean}
             */
            isEmpty: function()
            {
                var s = str;
                return (s == null || s == "" || s.length == 0);
            },

            /**
             * Native toLowerCase function polyfill
             *
             * @returns {string}
             */
            toLowerCase: (String.prototype.toLowerCase || function()
            {
                return str.replace(/[a-z]/g, function (ch) {
                    return String.fromCharCode(ch.charCodeAt(0) & ~32);
                });
            }),

            /**
             * Native toUpperCase function polyfill
             *
             * @returns {string}
             */
            toUpperCase: (String.prototype.toUpperCase || function()
            {
                return str.replace(/[A-Z]/g, function (c) {
                    return String.fromCharCode(c.charCodeAt(0) | 32);
                });
            }),

            /**
             * Set first character to upper case
             *
             * @returns {string}
             */
            ucfirst: function ()
            {
                return str.charAt(0).toUpperCase() + this.substr(1);
            },

            /**
             * Apply regex and checks if true or false
             *
             * @param regex
             * @returns {boolean}
             */
            pregMatch: function(regex)
            {
                var reg = new RegExp(regex);
                return reg.test(str);
            },

            /**
             * Escape html string
             *
             * @returns {string|string|*}
             */
            escapeHTML: function() {
                var div = document.createElement('div');
                div.appendChild(document.createTextNode(str));
                return div.innerHTML;
            },

            /**
             * Convert escaped string to html string
             *
             * @returns {string|HTML}
             */
            toHTML: function() {
                var div = document.createElement('div');
                div.innerHTML = str;
                var child = div.childNodes[0];
                return child ? child.nodeValue : '';
            }
        };

        return __core.assign(str, prototype);
    };

    window.$str = string;
})(Ruddy);