/**
 * ruddyJS Events - Grabbable
 *
 *  @package    ruddyJS
 *  @author     Gil Nimer
 *  @copyright  Copyright 2015 Ruddy Monkey studios & ruddy.nl
 *  @version    0.0.2
 *
 * http://ruddymonkey.com/
 */

(function (__core) {
    /**
     * grabbable event fallback
     *
     * @param element
     * @param callback
     * @returns {*}
     */
    __core.events['grabbable'] = function (element, callback, settings) {
        var obj = this, calls = 0, isDown = false,
            target, rect, translate, offX, offY, x, y,
            position    = obj.style('position') || null,
            zIndex      = obj.style('zIndex') || 0,
            settings    = settings || {},
            callback    = callback || function(){};

        if(position != 'absolute')
            obj.style('position', 'relative');

        function start(e, t) {
            var event, mouse;

            rect        = obj.position();
            translate   = obj.getTranslate();
            mouse       = $doc (document).mousePosition(e);

            offX = mouse.x - rect.x;
            offY = mouse.y - rect.y;

            if(!isDown) {
                obj.style('zIndex', '1000');
                event = $doc (document).customEvent("grab.start", {
                    detail: {
                        about: 'Fired when the user grab an element or text selection'
                    },
                    bubbles: true,
                    cancelable: true
                });

                isDown = true;
                element.dispatchEvent(event);
                return;
            }

            event = $doc (document).customEvent("grab.end", {
                detail: {
                    about: 'Fired when a grab operation is being ended (for example, by releasing a mouse button)',
                    x: x,
                    y: y,
                    defaultX: rect.x,
                    defaultY: rect.y,
                    translateX: translate.x,
                    translateY: translate.y,
                    normalize: function()
                    {
                        obj.style('zIndex', zIndex);
                        obj.setTranslate(0, 0);
                    }
                },

                bubbles: true,
                cancelable: true
            });

            element.dispatchEvent(event);
            isDown = false;
        }

        function move(e, t) {
            var event, mouse;

            if(isDown) {
                mouse = $doc (document).mousePosition(e);

                x = mouse.x + translate.x - rect.x - offX;
                y = mouse.y + translate.y - rect.y - offY;

                event = $doc (document).customEvent("grab.move", {
                    detail: {
                        about: 'Fired when an element or text selection is being grabbed and moved',
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

        obj.on('click', start);
        $r(document).on('mousemove', move);

        return obj.on('grab.start', function (e) {
            e = e || window.event;
            target = e.target || e.srcElement;

            calls++;
            callback.call(this, e, target, element, calls);
        }, false);
    };
})(Ruddy);