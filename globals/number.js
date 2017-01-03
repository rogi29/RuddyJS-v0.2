/**
 * RuddyJS Globals - Element
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
     * Global Number Wrapper
     *
     * @param num
     * @returns {Number|*}
     */
    var number = function(num) {
       if(__core.isNumber(num) === false)
            throw new TypeError("Number type - argument provided is not an number type");

        /**
         *
         * @type {{isInteger: isInteger, isFloat: isFloat}}
         */
        var prototype = {
            /**
             * Check if number is a integer type
             *
             * @returns {Boolean|*}
             */
            isInteger: function() {
                return __core.isInt(num);
            },

            /**
             * Check if nubmer is a float type
             *
             * @returns {Boolean|*}
             */
            isFloat: function() {
                return __core.isFloat(num);
            }
        };

        return __core.assign(num, prototype);
    };

    window.$num = number;
})(Ruddy);