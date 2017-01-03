/**
 * RuddyJS Globals - Element
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
     * Global Element Wrapper
     *
     * @param el
     * @returns {Element|*}
     */
    var element = function(el) {
       if(__core.isEl(el) === false)
            throw new TypeError("Element type - argument provided is not an element type");

        var prototype = {
            /**
             * Native querySelectorAll function polyfill
             *
             * @param selector
             * @returns {Array}
             */
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
            /**
             * Native querySelector function polyfill
             *
             * @param selectors
             * @returns {null}
             */
            querySelector: ('Element' in window) ? Element.prototype.querySelector : function(selectors)
            {
                var elements = $el (el).querySelectorAll(selectors);
                return (elements.length) ? elements[0] : null;
            },

            /**
             * Native addEventListener function polyfill
             *
             * @param eventNameWithoutOn
             * @param callback
             */
            addEventListener: ('Element' in window) ? Element.prototype.addEventListener : function(eventNameWithoutOn, callback)
            {
                return el.attachEvent('on' + eventNameWithoutOn, callback);
            },

            /**
             * Native dispatchEvent function polyfill
             *
             * @param eventObject
             */
            dispatchEvent: ('Element' in window) ? Element.prototype.dispatchEvent : function (eventObject) {
                return el.fireEvent("on" + eventObject.type, eventObject);
            },

            /**
             * Native getAttribute function polyfill
             *
             * @param attributeName
             * @returns {*}
             */
            getAttribute: ('Element' in window) ? Element.prototype.getAttribute : function(attributeName) {
                var attrs = el.attributes, i;

                for(i = attrs.length; i--;){
                    if(attrs[i].name == attributeName){
                        return attrs[i].value;
                    }
                }

                return null;
            },

            /**
             * Native setAttribute function polyfill
             *
             * @param name
             * @param value
             */
            setAttribute: ('Element' in window) ? Element.prototype.setAttribute : function(name, value) {
                var attrs = el.attributes, i;

                for(i = attrs.length; i--;){
                    if(attrs[i].name == name){
                        attrs[i].value = value;
                        return;
                    }
                }

                attrs[attrs.length] = {};
                attrs[attrs.length][name] = {}
            }
        };

        return __core.assign(el, prototype);
    };

    window.$el = element;
})(Ruddy);