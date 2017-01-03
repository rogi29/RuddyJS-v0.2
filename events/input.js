/**
 * RuddyJS Events - Input
 *
 *  @package    ruddyJS
 *  @author     Gil Nimer <info@ruddymonkey.com>
 *  @author     Nick Vlug <info@ruddy.nl>
 *  @copyright  Copyright 2015 Ruddy Monkey studios & ruddy.nl
 *  @version    0.0.2
 *
 * http://ruddymonkey.com/ruddyjs/events
 */

(function(__core){
    /**
     * Input event fallback
     *
     * @param element
     * @param callback
     *
     * @returns {*} input|keyup
     */
    __core.events['input'] = function(element, callback) {
        var target, calls = 0;

        /**
         *
         * @param e
         */
        function call(e) {
            e = e || window.event;
            target = e.target || e.srcElement;

            calls++;
            callback.call(this, e, target, element, calls);
        }

        /**
         *
         * @param e
         */
        function before(e)  {
            e = e || window.event;
            target = e.target || e.srcElement;

            callback.call(this, e, target, element, calls);
        }

        if(__core.isEvent('input')) {
            if (navigator.userAgent.indexOf('MSIE 9') !== -1) {
                var elements = [], values = [], d = $doc (document);

                d.addEventListener('selectionchange', function() {
                    var actEl = d.activeElement;

                    if (actEl.tagName === 'TEXTAREA' || (actEl.tagName === 'INPUT' && actEl.type === 'text')) {
                        var idx = elements.indexOf(actEl), el = elements[idx] || elements.push(actEl);
                        if (el.value !== values[idx]) {
                            values[idx] = el.value;
                            var ev = d.createEvent('CustomEvent');
                            ev.initCustomEvent('input', true, true, {});
                            el.dispatchEvent(ev);
                        }
                    }
                });
            }

            return element.addEventListener('input', call, false);
        }

        element.addEventListener('keydown', before);
        element.addEventListener('keypress', before);
        return element.addEventListener('keyup', call);
    };
})(Ruddy);