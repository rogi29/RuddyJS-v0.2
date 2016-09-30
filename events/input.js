/**
 * ruddyJS Events - input
 *
 *  @package    ruddyJS
 *  @author     Gil Nimer
 *  @copyright  Copyright 2015 Ruddy Monkey studios & ruddy.nl
 *  @version    0.0.2
 *
 * http://ruddymonkey.com/
 */

(function(__core){
    /**
     * Input event fallback
     *
     * @param element
     * @param callback
     * @returns {*}
     */
    __core.events['input'] = function(element, callback) {
        var target, calls = 0;

        if(__core.isEvent('input')) {
            return element.addEventListener('input', function (e) {
                e = e || window.event;
                target = e.target || e.srcElement;

                calls++;
                callback.call(this, e, target, element, calls);
            }, false);
        }

        element.addEventListener('keydown', function(e) {
            e = e || window.event;
            target = e.target || e.srcElement;

            callback.call(this, e, target, element, calls);
        });

        element.addEventListener('keypress', function(e) {
            e = e || window.event;
            target = e.target || e.srcElement;

            callback.call(this, e, target, element, calls);
        });

        return element.addEventListener('keyup', function(e) {
            e = e || window.event;
            target = e.target || e.srcElement;

            calls++;
            callback.call(this, e, target, element, calls);
            return calls;
        });
    };
})(Ruddy);