/**
 * ruddyJS Globals - string
 *
 *  @package    ruddyJS
 *  @author     Gil Nimer
 *  @copyright  Copyright 2015 Ruddy Monkey studios & ruddy.nl
 *  @version    0.0.2
 *
 * http://ruddymonkey.com/
 */

(function(__core){
    var string = function(str) {
        if(!__core.isStr(str))
            throw new TypeError("$str type - argument provided is not a function type");

        var prototype = {
            /**
             *
             * @returns {boolean}
             */
            isEmpty: function()
            {
                var s = str;
                return (s == null || s == "" || s.length == 0);
            },

            /**
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
             *
             * @returns {string}
             */
            ucfirst: function ()
            {
                return str.charAt(0).toUpperCase() + this.substr(1);
            },

            /**
             *
             * @param regex
             * @returns {boolean}
             */
            pregMatch: function(regex)
            {
                var reg = new RegExp(regex);
                return reg.test(str);
            }
        };

        return __core.assign(str, prototype);
    };

    window.$str = string;
})(Ruddy);