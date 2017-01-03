/**
 * RuddyJS Events - Doubletap
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
     * doubletap event fallback
     *
     * @param element
     * @param callback
     * @param settings
     *
     * @returns {*} doubletap.end event
     */
    __core.events['doubletap'] = function (element, callback, settings) {
        var obj = this, isDown = false,
            calls = 0, count = 0, sTime = 0, dTime = 0, target, inputs, frame,
            settings    = settings || {},
            callback    = callback || function(){},
            maxDelay    = settings['maxDelay']  || 400,
            numInputs   = settings['numInputs'] || 1;

        /**
         * Start doubletap event
         *
         * @param e
         * @param t
         */
        function start(e, t) {
            var event;
            sTime = Date.now()
            inputs  = e.changedTouches || [1];

            if(inputs.length <= numInputs) {
                event = $doc (document).customEvent("doubletap.start", {
                    detail: {
                        about: 'Fired when the user start to doubletap the surface',
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
         * End doubletap event
         *
         * @param e
         * @param t
         * @returns {boolean}
         */
        function end(e, t){
            var event,
                eTime   = Date.now(),
                delay   = eTime - dTime;

            if (isDown) {
                if(!frame) {
                    frame = setTimeout( function() { clearTimeout(frame); frame = false; }, maxDelay );
                    dTime = eTime;
                    return false;
                }

                event = $doc (document).customEvent("doubletap.end", {
                    detail: {
                        about: 'Fired when the user doubletaps the surface',
                        delay: delay,
                        inputs: inputs
                    },
                    bubbles: true,
                    cancelable: true
                });

                element.dispatchEvent(event);
                clearTimeout(frame);
                frame = false;
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

        return obj.on('doubletap.end', function (e) {
            e = e || window.event;
            target = e.target || e.srcElement;

            calls++;
            callback.call(this, e, target, element, calls);
        }, false);
    };
})(Ruddy);