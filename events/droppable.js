/**
 * RuddyJS Events - Droppable
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
     * Droppable event fallback
     *
     * @param element
     * @param callback
     *
     * @returns {*} drop.enter event
     */
    __core.events['droppable'] = function (element, callback, settings) {
        var obj = this, calls = 0, settings = settings || {}, target;

        function drop(e, t)
        {
            var
                target = {
                    obj:        $r (t),
                    translate:  e.detail.translate,
                    pos:        e.detail.position,
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
                        about: 'Fired when an element is dropped on a valid drop area',
                        element: t
                    },
                    bubbles: true,
                    cancelable: true
                });

                element.dispatchEvent(event);
                if(settings.sync) {
                    $r (t).setTranslate(x, y);
                }
            }
        }

        $r(document).on('grab.end', drop);
        $r(document).on('drag.end', drop);

        return obj.on('drop.enter', function (e) {
            e = e || window.event;
            target = e.target || e.srcElement;

            calls++;
            callback.call(this, e, target, element, calls);
        }, false);
    };
})(Ruddy);