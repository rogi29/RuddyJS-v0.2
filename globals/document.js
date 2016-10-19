/**
 * ruddyJS Globals - document
 *
 *  @package    ruddyJS
 *  @author     Gil Nimer
 *  @copyright  Copyright 2015 Ruddy Monkey studios & ruddy.nl
 *  @version    0.0.2
 *
 * http://ruddymonkey.com/
 */

(function(__core){
    var docum = function(doc) {
        if(__core.isDoc(doc) === false)
            throw new TypeError("$doc type - argument provided is not a function type");

        var prototype = {
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

            querySelector: (document.querySelector || function(selectors) {
                var elements = prototype.querySelectorAll.call(document, selectors);
                return (elements.length) ? elements[0] : null;
            }),

            createStyle: function(title) {
                var style = document.createElement('style'), element;
                style.title = title;
                element = document.getElementsByTagName('head')[0].appendChild(style);
                return element.sheet;
            },

            getStyle: function(title) {
                var sheets = document.styleSheets, len = sheets.length, i;
                for(i = len; i--;) {
                    if(sheets[i].title == title){
                        return sheets[i];
                    }
                }
                return false;
            },

            addEventListener: document.addEventListener || function(eventNameWithoutOn, callback) {
                return doc.attachEvent('on' + eventNameWithoutOn, callback);
            },

            dispatchEvent: ('Element' in window) ? Element.prototype.dispatchEvent : function (eventObject) {
                return doc.fireEvent("on" + eventObject.type, eventObject);
            },

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

            mousePosition: function(e) {
                var x, y;
                x =  e.pageX || (e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft) || ((e.changedTouches) ? e.changedTouches[0].pageX : 0);
                y =  e.pageY || (e.clientY + document.body.scrollTop + document.documentElement.scrollTop) || ((e.changedTouches) ? e.changedTouches[0].pageY : 0);

                return {x: Math.round(x), y: Math.round(y)}
            }
        };

        return __core.assign(doc, prototype);
    };

    window.$doc = docum;
})(Ruddy);