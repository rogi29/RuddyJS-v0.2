/**
 * ruddyJS Events - Droppable
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
     * Droppable event fallback
     *
     * @param element
     * @param callback
     * @returns {*}
     */
    __core.events['droppable'] = function (element, callback, settings) {
        var obj = this, calls = 0, settings = settings || {}, target;

        function drop(e, t)
        {
            function start(e, t){
                var
                    target = {
                        obj:        $r (t),
                        translate:  $r (t).getTranslate(),
                        pos:        $r (t).position(),
                        size:       $r (t).size()
                    },
                    area = {
                        pos:    obj.position(),
                        size:   obj.size()
                    },
                    x = area.pos.x + target.translate.x - target.pos.x,
                    y = area.pos.y + target.translate.y - target.pos.y;

                if( (area.pos.x - target.size.width) < target.pos.x
                    && (area.pos.x + area.size.width) >  target.pos.x
                    && (area.pos.y - target.size.height) < target.pos.y
                    && (area.pos.y + area.size.height) >  target.pos.y ) {

                    var event = new CustomEvent("drop.enter", {
                        detail: {
                            about: 'Fired when an element is dropped on a valid drop area'
                        },

                        bubbles: true,
                        cancelable: true
                    });

                    element.dispatchEvent(event);
                    if(settings.sync) {
                        target.obj.setTranslate(x, y);
                    }
                    return true;
                }

                return false;
            }

            $r (t).on('drag.end', start);
            $r (t).on('grab.end', start);
        }

        $r(document).on('mouseup', drop);
        return obj.on('drop.enter', function (e) {
            e = e || window.event;
            target = e.target || e.srcElement;

            calls++;
            callback.call(this, e, target, element, calls);
        }, false);
    };
})(Ruddy);