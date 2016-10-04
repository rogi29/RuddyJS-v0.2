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
            }
        };

        return __core.assign(doc, prototype);
    };

    window.$doc = docum;
})(Ruddy);