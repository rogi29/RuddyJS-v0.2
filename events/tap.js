/**
 * RuddyJS Events - Tap
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
     * tap event fallback
     *
     * @param element
     * @param callback
     * @param settings
     *
     * @returns {*} tap.end event
     */
    __core.events['tap'] = function (element, callback, settings) {
        var obj = this, calls = 0, isDown = false, target, inputs, sTime,
            settings    = settings || {},
            callback    = callback || function(){},
            maxDelay    = settings['maxDelay']  || 600,
            numInputs   = settings['numInputs'] || 1;

        /**
         * Start tap event
         *
         * @param e
         * @param t
         */
        function start(e, t) {
            var event;
            sTime = Date.now()
            inputs  = e.changedTouches || [1];

            if(inputs.length <= numInputs) {
                event = $doc (document).customEvent("tap.start", {
                    detail: {
                        about: 'Fired when the user start to tap the surface',
                        delay: sTime,
                        inputs: inputs
                    },
                    bubbles: true,
                    cancelable: true
                });

                element.dispatchEvent(event);
                isDown = true;
            }

            e.preventDefault();
        }

        /**
         * End tap event
         *
         * @param e
         * @param t
         */
        function end(e, t){
            var event,
                eTime   = Date.now(),
                time    = eTime - sTime;

            if(isDown && time < maxDelay) {
                event = $doc (document).customEvent("tap.end", {
                    detail: {
                        about: 'Fired when the user taps the surface',
                        delay: time,
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

        return obj.on('tap.end', function (e) {
            e = e || window.event;
            target = e.target || e.srcElement;

            calls++;
            callback.call(this, e, target, element, calls);
        }, false);
    };
})(Ruddy);