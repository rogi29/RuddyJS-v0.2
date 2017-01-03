/**
 * RuddyJS Globals - Document
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
     * Global document wrapper
     *
     * @param doc
     * @type HTMLDocument
     * @returns HTMLDocument
     */
    var docum = function(doc) {
        if(__core.isDoc(doc) === false)
            throw new TypeError("Document type - argument provided is not a document variable");

        /**
         *
         * @type {{querySelectorAll: (*|Function), querySelector: (*|Function), createStyle: createStyle, getStyle: getStyle, addEventListener: (*|Function), dispatchEvent: Function, customEvent: customEvent, mousePosition: mousePosition}}
         */
        var prototype = {
            /**
             * Native QuerySelectorAll function polyfill
             *
             * @param r
             * @param c
             * @param i
             * @param j
             * @param a
             * @returns {Array}
             */
            querySelectorAll: (document.querySelectorAll || function (r, c, i, j, a) {
                var d=document,
                    s=d.createStyleSheet();
                a = d.all;
                c = [];
                r = r.replace(/\[for\b/gi, '[htmlFor').split(',');
                for (i = r.length; i--;) {
                    s.addRule(r[i], 'visiblility:visible', 0);
                    for (j = a.length; j--;) {
                        a[j].currentStyle.visiblility && c.push(a[j]);
                    }
                    s.removeRule(0);
                }
                return c;
            }),

            /**
             * Native QuerySelector function polyfill
             *
             * @param selectors
             * @returns {element|null}
             */
            querySelector: (document.querySelector || function(selectors) {
                var elements = prototype.querySelectorAll.call(document, selectors);
                return (elements.length) ? elements[0] : null;
            }),

            /**
             * Creates style element
             *
             * @param title
             * @returns {*}
             */
            createStyle: function(title) {
                var style = document.createElement('style'), element;
                style.title = title;
                element = document.getElementsByTagName('head')[0].appendChild(style);
                return element.sheet;
            },

            /**
             * Get style element
             *
             * @param title
             * @returns {*}
             */
            getStyle: function(title) {
                var sheets = document.styleSheets, len = sheets.length, i;
                for(i = len; i--;) {
                    if(sheets[i].title == title){
                        return sheets[i];
                    }
                }
                return false;
            },

            /**
             * Native addEventListener function polyfill
             *
             * @param eventNameWithoutOn
             * @param callback
             * @returns {*}
             */
            addEventListener: document.addEventListener || function(eventNameWithoutOn, callback) {
                return doc.attachEvent('on' + eventNameWithoutOn, callback);
            },

            /**
             * Native addEventListener function polyfill
             *
             * @param eventObject
             * @returns {*}
             */
            dispatchEvent: ('Element' in window) ? Element.prototype.dispatchEvent : function (eventObject) {
                return doc.fireEvent("on" + eventObject.type, eventObject);
            },

            /**
             * Creates custom event
             *
             * @param event
             * @param params
             * @returns {CustomEvent}
             */
            customEvent: function(event, params) {
                if(typeof window.CustomEvent === 'function')
                    return new CustomEvent(event, params);

                function CustomEvent ( event, params ) {
                    params = params || { bubbles: false, cancelable: false, detail: undefined };
                    var e = document.createEvent( 'CustomEvent' );
                    e.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
                    return e;
                }

                window.CustomEvent = CustomEvent;
                return new CustomEvent(event, params );
            },

            /**
             * Gets mouse position
             *
             * @param e
             * @returns {{x: number, y: number}}
             */
            mousePosition: function(e) {
                var x, y;
                x =  e.pageX || (e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft) || ((e.changedTouches) ? e.changedTouches[0].pageX : 0);
                y =  e.pageY || (e.clientY + document.body.scrollTop + document.documentElement.scrollTop) || ((e.changedTouches) ? e.changedTouches[0].pageY : 0);

                return {x: Math.round(x), y: Math.round(y)}
            }
        };

        return __core.assign(doc, prototype);
    };

    /**
     *
     * @type {{createStyle, getStyle, customEvent, mousePosition}}
     */
    window.$doc = docum;
})(Ruddy);