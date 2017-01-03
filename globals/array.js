/**
 * RuddyJS Globals - Array
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
     * Global array wrapper
     *
     * @param arr
     * @returns {Array|*}
     */
    var array = function(arr) {
        if(__core.isArr(arr) === false)
            throw new TypeError("Array type - argument provided is not a array type");

        /**
         *
         * @type {{isEmpty: isEmpty, join: (*|Function), push: (*|Function), pop: (*|Function), reverse: (*|Function), concat: (*|Function), forEach: (*|Function), map: (*|Function), reduce: (*|Function), indexOf: (*|Function), first: first, last: last}}
         */
        var prototype = {
            /**
             * Checks if array is empty
             *
             * @returns {boolean}
             */
            isEmpty: function() {
                return (arr.length == 0);
            },

            /**
             * Native join function polyfill
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
             * Native push function polyfill
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
             * Native pop function polyfill
             *
             * @returns {*}
             */
            pop: (Array.prototype.pop || function() {
                "use strict";
                var last;

                if(arr.length <= 0)
                    return undefined;

                last = arr[arr.length - 1];
                arr.length = arr.length - 1;
                return last;
            }),

            /**
             * Native reverse function polyfill
             *
             * @returns {Array}
             */
            reverse: (Array.prototype.reverse || function() {
                "use strict";
                var len = arr.length - 1, id = 0, i = 0, a = [];

                for(len; len >= i; len--) {
                    a[id] = arr[len];
                    id++;
                }

                return a;
            }),

            /**
             * Native concat function polyfill
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
             * Native forEach function polyfill
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
             * Native map function polyfill
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
             * Native reduce function polyfill
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
             * Native indexOf function polyfill
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
            },

            /**
             * Get first element of array
             *
             * @returns {*}
             */
            first: function () {
                if(arr.length <= 0)
                    return undefined;

                return arr[0];
            },

            /**
             * Get last element of array
             *
             * @returns {*}
             */
            last: function () {
                if(arr.length <= 0)
                    return undefined;

                return arr[arr.length - 1];
            }
        };

        return __core.assign(arr, prototype);
    };

    /**
     *
     * @type array
     */
    window.$arr = array;
})(Ruddy);