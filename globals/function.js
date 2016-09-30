/**
 * ruddyJS Globals - function
 *
 *  @package    ruddyJS
 *  @author     Gil Nimer
 *  @copyright  Copyright 2015 Ruddy Monkey studios & ruddy.nl
 *  @version    0.0.2
 *
 * http://ruddymonkey.com/
 */

(function(__core){
    var funct = function(func) {
        if(!__core.isFunc(func))
            throw new TypeError("$func type - argument provided is not a function type");

        var prototype = {
            /**
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

    window.$func = funct;
})(Ruddy);