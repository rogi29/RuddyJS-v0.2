/**
 * RuddyJS Globals - Style
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
     * Global Style Wrapper
     *
     * @param css
     * @returns {*}
     */
    var style = function(css) {
        var prototype = {
            /**
             *
             * @param index
             * @returns {CssRule|CSSRule}
             */
            getRule: function(index) {
                return css.cssRules[index];
            },

            /**
             *
             * @param index
             * @returns {string}
             */
            getCSSText: function(index) {
                return css.cssRules[index].cssText;
            },

            /**
             * Native insertRule function polyfill
             *
             * @param rule
             * @param index
             * @returns {*}
             */
            insertRule: ('CSSStyleSheet' in window) ? CSSStyleSheet.prototype.insertRule : function(rule, index) {
                var arr;
                rule = rule.replace(/\s+/g, '');
                arr = rule.split('{');
                css.addRule(arr[0], arr[1].replace('}', ''), index);
                return index;
            },

            /**
             * Native deleteRule function polyfill
             *
             * @param index
             */
            deleteRule: ('CSSStyleSheet' in window) ? CSSStyleSheet.prototype.deleteRule : function(index) {
                return css.removeRule(index);
            },

            /**
             *
             * @param rule
             * @returns {string}
             */
            ruleToJson: function(rule) {
                var rule = rule.replace(/\s+/g, ''),
                    rule = rule.split('{'),
                    selector = rule[0],
                    json = '{"selector":"' + selector + '","' + rule[1].replace(':', '":"').replace(';}', '"}').replace(';', '","');

                return json;
            },

            /**
             *
             * @param json
             * @returns {*}
             */
            jsonToRule: function(json) {
                var selector = JSON.parse(json)['selector'],
                    rule = selector + json.replace(/"/g, '').replace(/,/g, ';').replace('selector:' + selector + ';', '');

                return rule;
            },

            /**
             *
             * @param rule
             * @returns {{}}
             */
            ruleToObj: function(rule) {
                var rule = rule.replace(/\s+/g, ''),
                    obj = {}, style = null, i = 0,
                    rule = rule.split('{'),
                    selector = rule[0],
                    styles = rule[1].replace('}').split(';');

                obj[selector] = {}
                for(i; i != styles.length; i++) {
                    if(styles[i] == ''){
                        continue;
                    }

                    style = styles[i].split(':');
                    obj[selector][style[0]] = style[1];
                }

                return obj;
            },

            /**
             *
             * @param obj
             * @returns {string}
             */
            objToRule: function(obj) {
                var str = '', selector, style;
                for (selector in obj) {
                    str += (selector + '{');
                    for(style in obj[selector]) {
                        str += (style + ':' + obj[selector][style]);
                    }
                }

                return (str + '}');
            }
        };

        return __core.assign(css, prototype);
    };

    window.$css = style;
})(Ruddy);