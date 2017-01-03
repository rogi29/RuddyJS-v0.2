/**
 * RuddyJS Globals - Function
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
     * Global Function Wrapper
     *
     * @param func
     * @returns {Function|*}
     */
    var funct = function(func) {
        if(__core.isFunc(func) === false)
            throw new TypeError("Function type - argument provided is not a function type");

        /**
         *
         * @type {{assign: assign, bind: (*|Function)}}
         */
        var prototype = {
            /**
             * Assign a function to a prototype of an object function
             *
             * @param name
             * @param func
             * @returns {*}
             */
            assign: function(name, func) {
                return func.prototype[name] = func;
            },

            /**
             * Native bind function polyfill
             *
             * @param b
             * @returns {Function}
             */
            bind: (Function.prototype.bind || function (b) {
                "use strict";
                var a = [].slice, f = a.call(arguments, 1), e = func, d = function () {
                    return e.apply(func instanceof c ? func : b || window, f.concat(a.call(arguments)));
                };

                function c(){}

                c.prototype = func.prototype;
                d.prototype = new c();
                return d;
            })
        };

        return __core.assign(func, prototype);
    };

    /**
     *
     * @type function
     */
    window.$func = funct;
})(Ruddy);