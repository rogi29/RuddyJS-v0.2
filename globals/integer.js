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
     * Global Integer Wrapper
     *
     * @param int
     * @returns {Integer|Number|*}
     */
    var integer = function(int) {
       if(__core.isInt(int) === false)
            throw new TypeError("Integer type - argument provided is not an integer type");

        var prototype = {
        };

        return __core.assign(int, prototype);
    };

    window.$int = integer;
})(Ruddy);