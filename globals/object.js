/**
 * ruddyJS Globals - object
 *
 *  @package    ruddyJS
 *  @author     Gil Nimer
 *  @copyright  Copyright 2015 Ruddy Monkey studios & ruddy.nl
 *  @version    0.0.2
 *
 * http://ruddymonkey.com/
 */

(function(__core){
    var object = function(obj) {
        if(!__core.isObj(obj))
            throw new TypeError("$obj type - argument provided is not an Object type");

        var prototype = {
            /**
             *
             * @returns {Array}
             */
            keys: function() {
                "use strict";
                var k, r = [], i = 0;

                for(k in obj) {
                    if(!prototype[k]){
                        r[i] = k;
                        i++;
                    }
                }

                return r;
            },

            /**
             *
             * @returns {Array}
             */
            values: function() {
                "use strict";
                var k, r = [], i = 0;

                for(k in obj) {
                    if(!prototype[k]){
                        r[i] = obj[k];
                        i++;
                    }
                }

                return r;
            },

            /**
             *
             * @returns {Number}
             */
            push: function() {
                "use strict";
                var a = arguments, v, k;

                for(k in a) {
                    v = a[k];
                    obj[v.key] = v.value;
                }

                return $obj (obj).keys().length;
            },

            /**
             *
             * @param f
             * @param p
             * @returns {Array}
             */
            map: function (f, p) {
                "use strict";
                var o = obj, a = [], k, v;

                for(k in o) {
                    v = o[k];
                    a[k] = p ? f.call(p, v, k, o) : f(v, k, o);
                }

                return a;
            },

            /**
             *
             * @param f
             * @param p
             */
            forEach: function (f, p) {
                "use strict";
                if (typeof f !== 'function')
                    throw new TypeError(f + ' is not a function');

                var p = p || obj, k;
                for (k in obj) {
                    if(!prototype[k]) {
                        f.call(p, obj[k], k, obj);
                    }
                }
            },

            /**
             *
             * @param name
             * @param func
             * @returns {*}
             */
            assign: function(name, func) {
                return obj.prototype[name] = func;
            },

            /**
             * Extend object prototype
             *
             * @param source
             * @returns {Object|Function|*}
             */
            extend: function(source) {
                source = source.prototype;

                for (var attrname in source) {
                    if(!obj.prototype[attrname])
                        obj.prototype[attrname] = source[attrname];
                }

                return obj;
            }
        };

        return __core.assign(obj, prototype);
    };

    window.$obj = object;
})(Ruddy);