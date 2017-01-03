/**
 * RuddyJS Events - Draggable
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
     * draggable event fallback
     *
     * @param element
     * @param callback
     *
     * @returns {*} drag.start event
     */
    __core.events['draggable'] = function (element, callback, settings) {

        var obj = this, calls = 0, isDown = false,
            target, rect, translate, offX, offY, x, y,
            position    = obj.style('position') || null,
            zIndex      = obj.style('zIndex') || 0,
            settings    = settings || {},
            callback    = callback || function(){};

        if(position != 'absolute')
            obj.style('position', 'relative');

        /**
         * Start drag event
         *
         * @param e
         * @param t
         */
        function start(e, t) {
            var event, mouse;

            rect        = obj.position();
            translate   = obj.getTranslate();
            mouse       = $doc (document).mousePosition(e);

            offX = mouse.x - rect.x;
            offY = mouse.y - rect.y;

            obj.style('zIndex', '1000');
            event = $doc (document).customEvent("drag.start", {
                detail: {
                    about: 'Fired when the user starts dragging an element or text selection'
                },
                bubbles: true,
                cancelable: true
            });

            element.dispatchEvent(event);
            isDown = true;
        }

        /**
         * Move drag event
         *
         * @param e
         * @param t
         */
        function move(e, t) {
            var event, mouse;

            if(isDown) {
                e.preventDefault();
                mouse = $doc (document).mousePosition(e);

                x = mouse.x + translate.x - rect.x - offX;
                y = mouse.y + translate.y - rect.y - offY;

                event = $doc (document).customEvent("drag.move", {
                    detail: {
                        about: 'Fired when an element or text selection is being dragged',
                        x: x,
                        y: y
                    },
                    bubbles: true,
                    cancelable: true
                });

                switch(settings.axis){
                    case 'x':
                        obj.setTranslate(x, translate.y);
                        break;

                    case 'y':
                        obj.setTranslate(translate.x, y);
                        break;

                    default:
                        obj.setTranslate(x, y);
                        break;
                }
                element.dispatchEvent(event);
            }
        }

        /**
         * End drag event
         *
         * @param e
         * @param t
         */
        function end(e, t){
            var event;

            rect        = obj.position();
            translate   = obj.getTranslate();

            if(isDown) {
                event = $doc (document).customEvent("drag.end", {
                    detail: {
                        about: 'Fired when a drag operation is being ended (for example, by releasing a mouse button)',
                        x: x,
                        y: y,
                        position: rect,
                        translate: translate,
                        normalize: settings.normalize || false
                    },

                    bubbles: true,
                    cancelable: true
                });


                if(settings.normalize) {
                    obj.setTranslate(0, 0);
                }
                element.dispatchEvent(event);
                isDown = false;
            }
        }

        if(settings.disableTouch !== true) {
            obj.on('touchstart', start);
            $r(document).on('touchmove', move);
            $r(document).on('touchend', end);
            $r(document).on('touchcancel', end);
        }

        obj.on('mousedown', start);
        $r(document).on('mousemove', move);
        $r(document).on('mouseup', end);

        return obj.on('drag.start', function (e) {
            e = e || window.event;
            target = e.target || e.srcElement;

            calls++;
            callback.call(this, e, target, element, calls);
        }, false);
    };
})(Ruddy);