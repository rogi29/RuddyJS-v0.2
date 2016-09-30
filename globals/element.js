/**
 * ruddyJS Globals - element
 *
 *  @package    ruddyJS
 *  @author     Gil Nimer
 *  @copyright  Copyright 2015 Ruddy Monkey studios & ruddy.nl
 *  @version    0.0.2
 *
 * http://ruddymonkey.com/
 */

(function(__core){
    var element = function(el) {
        if(!__core.isEl(el))
            throw new TypeError("$el type - argument provided is not a function type");

        var prototype = {
            querySelectorAll: ('Element' in window) ? Element.prototype.querySelectorAll : function (r, c, i, j, a)
            {
                var d=document,
                    s=d.createStyleSheet();
                a = d.all;
                c = [];
                r = r.replace(/\[for\b/gi, '[htmlFor').split(',');
                for (i = r.length; i--;) {
                    s.addRule(r[i], 'k:v');
                    for (j = a.length; j--;) {
                        a[j].currentStyle.k && c.push(a[j]);
                    }
                    s.removeRule(0);
                }
                return c;
            },

            querySelector: ('Element' in window) ? Element.prototype.querySelector : function(selectors)
            {
                var elements = $el (el).querySelectorAll(selectors);
                return (elements.length) ? elements[0] : null;
            },

            addEventListener: ('Element' in window) ? Element.prototype.addEventListener : function(eventNameWithoutOn, callback)
            {
                return el.attachEvent('on' + eventNameWithoutOn, callback);
            },

            //('Element' in window && 'getAttribute' in Element.prototype) ? Element.prototype.getAttribute :
            getAttribute: ('Element' in window && 'getAttribute' in Element.prototype) ? Element.prototype.getAttribute : function(attributeName) {
                var attrs = el.attributes, i;

                for(i = attrs.length; i--;){
                    if(attrs[i].name == attributeName){
                        return attrs[i].value;
                    }
                }
            }/*,

            ('Element' in window && 'setAttribute' in Element.prototype) ? Element.prototype.setAttribute :
            setAttribute: function(name, value) {
                var attrs = el.attributes, i;

                for(i = attrs.length; i--;){
                    if(attrs[i].name == name){
                        attrs[i].value = value;
                        return;
                    }
                }
                console.log(attrs[0]);

                attrs[attrs.length] = {};
                attrs[attrs.length][name] = {}
            }*/
        };

        return __core.assign(el, prototype);
    };

    window.$el = element;
})(Ruddy);