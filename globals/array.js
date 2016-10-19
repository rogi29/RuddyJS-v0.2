/**
 * ruddyJS Globals - array
 *
 *  @package    ruddyJS
 *  @author     Gil Nimer
 *  @copyright  Copyright 2015 Ruddy Monkey studios & ruddy.nl
 *  @version    0.0.2
 *
 * http://ruddymonkey.com/
 */

(function(__core){
    var array = function(arr) {
        if(__core.isArr(arr) === false)
            throw new TypeError("$arr type - argument provided is not a function type");

        var prototype = {
            /**
             *
             * @returns {boolean}
             */
            isEmpty: function() {
                return (arr.length == 0);
            },

            /**
             *
             * @param c
             * @returns {string}
             */
            join: (Array.prototype.join || function (c) {
                "use strict";
                var a = arr, l = a.length, i = 0, s = '', c = c || ',';

                for(i; i !== l-1; i++) {
                    s += (a[i] + c);
                }

                s += a[l-1];
                return s;
            }),

            /**
             *
             * @returns {Number}
             */
            push: (Array.prototype.push || function () {
                "use strict";
                var arg = arguments, l = arg.length, i = 0;

                for(i; i !== l; i++) {
                    arr[arr.length] = arg[i];
                }

                return arr.length;
            }),

            /**
             *
             * @returns {string[]}
             */
            concat: (Array.prototype.concat || function () {
                "use strict";
                var arg = arguments, l = arg.length, i = 0, s = $arr (arr).join();

                for(i; i !== l; i++) {
                    s += (','+arg[i]);
                }

                return s.split(',');
            }),

            /**
             *
             * @param f
             * @param p
             */
            forEach: (Array.prototype.forEach || function (f, p) {
                "use strict";
                if (typeof f !== 'function')
                    throw new TypeError(f + ' is not a function');

                var a = arr, p = p || arr, l = a.length, i = 0;
                for (i; i !== l; i++) {
                    f.call(p, a[i], i, a);
                }
            }),

            /**
             *
             * @param f
             * @param p
             * @returns {Array}
             */
            map: (Array.prototype.map || function (f, p) {
                "use strict";
                var t = arr, a = [], i = 0, l = t.length, v;

                for(i; i != l; i++) {
                    v = t[i];
                    a[i] = p ? f.call(p, v, i, t) : f(v, i, t);
                }

                return a;
            }),

            /**
             *
             * @param callback
             * @returns {*}
             */
            reduce: (Array.prototype.reduce || function(callback /*, initialValue*/) {
                "use strict";
                if (typeof callback !== 'function')
                    throw new TypeError(callback + ' is not a function');

                var t = arr, l = t.length >>> 0, k = 0, value;

                if (arguments.length == 2) {
                    value = arguments[1];
                } else {
                    while (k < l && ! k in t) {
                        k++;
                    }
                    if (k >= l)
                        throw new TypeError('Reduce of empty array with no initial value');
                    value = t[k++];
                }

                for (; k < l; k++) {
                    if (k in t) {
                        value = callback(value, t[k], k, t);
                    }
                }

                return value;
            }),

            /**
             *
             * @returns {*}
             */
            first: function () {
                if(arr.length == 0)
                    throw new TypeError('Cant retrieve first element of an empty array with no initial value');

                return arr[0];
            },

            /**
             *
             * @returns {*}
             */
            last: function () {
                if(arr.length == 0)
                    throw new TypeError('Cant retrieve last element of an empty array with no initial value');

                return arr[arr.length - 1];
            },

            /**
             *
             * @param elt
             * @returns {number}
             */
            indexOf: Array.prototype.indexOf || function(elt /*, from*/) {
                var len = this.length >>> 0;

                var from = Number(arguments[1]) || 0;
                from = (from < 0)
                    ? Math.ceil(from)
                    : Math.floor(from);
                if (from < 0)
                    from += len;

                for (; from < len; from++)
                {
                    if (from in this &&
                        this[from] === elt)
                        return from;
                }
                return -1;
            }
        };

        return __core.assign(arr, prototype);
    };

    window.$arr = array;
})(Ruddy);