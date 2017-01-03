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
     * Global Float Wrapper
     *
     * @param float
     * @returns {Float|Number|*}
     */
    var float = function(float) {
       if(__core.isInt(float) === false)
            throw new TypeError("Float type - argument provided is not an float type");

        var prototype = {
        };

        return __core.assign(float, prototype);
    };

    window.$float = float;
})(Ruddy);