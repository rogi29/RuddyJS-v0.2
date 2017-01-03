/**
 * RuddyJS Events - Press
 *
 *  @package    ruddyJS
 *  @author     Gil Nimer <info@ruddymonkey.com>
 *  @author     Nick Vlug <info@ruddy.nl>
 *  @copyright  Copyright 2015 Ruddy Monkey studios & ruddy.nl
 *  @version    0.0.2
 *
 * http://ruddymonkey.com/ruddyjs/events
 */

(function (__core) {
    /**
     * press event fallback
     *
     * @param element
     * @param callback
     * @param settings
     *
     * @returns {*} press.start event
     */
    __core.events['press'] = function (element, callback, settings) {
        var obj = this, calls = 0, isDown = false, target, inputs, frame, sTime,
            settings    = settings || {},
            callback    = callback || function(){},
            delay       = settings['delay']  || 700,
            numInputs   = settings['numInputs'] || 1;

        /**
         * Start press event
         *
         * @param e
         * @param t
         */
        function start(e, t) {
            var event;
            inputs  = e.changedTouches || [1];

            if(inputs.length <= numInputs) {
                event = $doc (document).customEvent("press.start", {
                    detail: {
                        about: 'Fired when the user press the surface',
                        delay: delay,
                        inputs: inputs
                    },
                    bubbles: true,
                    cancelable: true
                });

                frame = window.setTimeout(function(){
                    element.dispatchEvent(event);
                    window.clearTimeout(frame);
                }, delay);

                isDown = true;
            }

            e.preventDefault();
        }

        /**
         * End press event
         *
         * @param e
         * @param t
         */
        function end(e, t){
            window.clearTimeout(frame);

            if(isDown) {
                var event = $doc (document).customEvent("press.end", {
                    detail: {
                        about: 'Fired when the user stops pressing the surface',
                        delay: delay,
                        inputs: inputs
                    },
                    bubbles: true,
                    cancelable: true
                });

                element.dispatchEvent(event);
                isDown = false;
            }

            e.preventDefault();
        }
        
        if(__core.isEvent('touchstart')) {
            obj.on('touchstart', start);
            $r(document).on('touchend', end);
            $r(document).on('touchcancel', end);
        } else {
            obj.on('mousedown', start);
            $r(document).on('mouseup', end);
        }

        return obj.on('press.start', function (e) {
            e = e || window.event;
            target = e.target || e.srcElement;

            calls++;
            callback.call(this, e, target, element, calls);
        }, false);
    };
})(Ruddy);