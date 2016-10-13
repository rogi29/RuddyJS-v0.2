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
       if(__core.isEl(el) === false)
            throw new TypeError("$el type - argument provided is not a function type");

        var prototype = {
            querySelectorAll: ('Element' in window) ? Element.prototype.querySelectorAll :
            (function(selector) {
                var nodes = el.childNodes, list = [], i, l = 0;
                for(i = 0; i < nodes.length; i++) {
                    if ($nodes ($doc (document).querySelectorAll(selector)).indexOf(nodes[i]) !== -1) {
                        list[l] = nodes[i];
                        l++;
                    }
                }

                return list;
            }),

            querySelector: ('Element' in window) ? Element.prototype.querySelector : function(selectors)
            {
                var elements = $el (el).querySelectorAll(selectors);
                return (elements.length) ? elements[0] : null;
            },

            addEventListener: ('Element' in window) ? Element.prototype.addEventListener : function(eventNameWithoutOn, callback)
            {
                return el.attachEvent('on' + eventNameWithoutOn, callback);
            },

            dispatchEvent: ('Element' in window) ? Element.prototype.dispatchEvent : function (eventObject) {
                return el.fireEvent("on" + eventObject.type, eventObject);
            },

            getAttribute: ('Element' in window) ? Element.prototype.getAttribute : function(attributeName) {
                var attrs = el.attributes, i;

                for(i = attrs.length; i--;){
                    if(attrs[i].name == attributeName){
                        return attrs[i].value;
                    }
                }
            },

            setAttribute: ('Element' in window) ? Element.prototype.setAttribute : function(name, value) {
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
            }
        };

        return __core.assign(el, prototype);
    };

    window.$el = element;
})(Ruddy);