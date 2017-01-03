/**
 * RuddyJS Core Globals
 *
 *  @package    ruddyJS
 *  @author     Gil Nimer <info@ruddymonkey.com>
 *  @author     Nick Vlug <info@ruddy.nl>
 *  @copyright  Copyright 2015 Ruddy Monkey studios & ruddy.nl
 *  @version    0.0.2
 *
 * http://ruddymonkey.com/ruddyjs/globals
 */

/**
 * Object Types
 *
 * $obj ({});
 * $func (function(){});
 * $arr ([]);
 * $str ('string');
 * $num (11);
 * $int (11);
 * $float (11.35);
 * $date (35, 21);
 * $bool (false);
 * $el (document.getElementById('#hello'));
 * $nodes (document.querySelectorAll('.class'));
 * $style (document.styleSheets[0]);
 * $doc ();
 * $r ('.class');
 */
(function(){
    /**
     * Mozzila Polyfill
     *
     * @param target
     * @returns {*}
     */
    var
        objectAssign = Object.prototype.assign || (function(target) {
            'use strict';

            if (target === null)
                throw new TypeError('Cannot convert null or undefined to an object');

            target = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var source = arguments[index];
                if (source != null) {
                    for (var key in source) {
                        if (Object.prototype.hasOwnProperty.call(source, key)) {
                            target[key] = source[key];
                        }
                    }
                }
            }

            return target;
        }),

        /**
         * Tag names for eventlistener check
         *
         * @type {{select: string, change: string, submit: string, reset: string, error: string, load: string, abort: string, input: string}}
         */
        TAGNAMES = {
            select:'input',change:'input',
            submit:'form',reset:'form',
            error:'img',load:'img',
            abort:'img',input:'input'
        },

        /**
         * Is object type
         *
         * @param v
         * @returns {boolean}
         */
        isObject = function(v) {
            return (typeof v == 'object' || typeof v == 'function');
        },

        /**
         * Is function type
         *
         * @param v
         * @returns {boolean}
         */
        isFunction = function(v) {
            return (typeof v == 'function');
        },

        /**
         * Is array type
         *
         * @type {Function}
         * @returns {boolean}
         */
        isArray = (Array.isArray || function(v) {
            return (v && v.constructor === Array) || '' + v !== v && {}.toString.call(v) == '[object Array]';
        }),

        /**
         * Is element type
         *
         * @param v
         * @returns {boolean}
         */
        isElement = function(v) {
            return (v && (v.nodeName || v.tagName || v.className || v.id) && v != document) ? true : false;
        },

        /**
         * Is string type
         *
         * @param v
         * @returns {boolean}
         */
        isString = function(v) {
            return (typeof v == 'string');
        },

        /**
         * Is number type
         *
         * @param v
         * @returns {boolean}
         */
        isNumber = function(v) {
            return (typeof v == 'number');
        },

        /**
         * Is integer type
         *
         * @type {*|Function}
         * @returns {boolean}
         */
        isInt = (Number.isInteger || function(v) {
            return (isNumber(v) && isFinite(v) && Math.round(v) === v);
        }),

        /**
         * Is float type
         *
         * @param v
         * @returns {boolean}
         */
        isFloat = function(v) {
            return (isNumber(v) && Math.round(v) !== v);
        },

        /**
         * Is date type
         *
         * @param v
         * @returns {boolean}
         */
        isDate = function(v) {
            return Object.prototype.toString.call(v) === '[object Date]';
        },

        /**
         * Is boolean type
         *
         * @param v
         * @returns {boolean}
         */
        isBool = function(v) {
            return (typeof v === "boolean");
        },

        /**
         * Is nodes type
         *
         * @param v
         * @returns {boolean|*|Function}
         */
        isNodes = function(v) {
            var stringRepr = Object.prototype.toString.call(v);

            return typeof v === 'object' &&
            (/^\[object (HTMLCollection|NodeList|Object)\]$/.test(stringRepr) &&
            (typeof v.length === 'number') || (v[0] && isElement(v[0]))) || (window.HTMLAllCollection && v instanceof HTMLAllCollection);
        },

        /**
         * Is document type
         *
         * @param v
         * @returns {boolean}
         */
        isDoc = function(v) {
            return (v == document);
        },

        /**
         * Is event type
         *
         * @param eventName
         * @returns {boolean}
         */
        isEvent = function(v) {
            var el = document.createElement(TAGNAMES[v] || 'div'), isSupported;
            v = 'on' + v;
            if (!(isSupported = (v in el))) {
                el.setAttribute(v, 'return;');
                isSupported = typeof el[v] == 'function';
            }
            el = null;
            return isSupported;
        };

    /**
     *
     * @type {{assign: (assign|*|Function), cache: {}, events: {}, isObj: isObject, isFunc: isFunction, isArr: Function, isEl: isElement, isStr: isString, isNum: isNumber, isInt: (*|Function), isFloat: isFloat, isDate: isDate, isBool: isBool, isNodes: isNodes, isDoc: isDoc, isEvent: isEvent}}
     */
    window.Ruddy = {
        assign: objectAssign,
        cache: {},
        events: {},
        isObj: isObject,
        isFunc: isFunction,
        isArr: isArray,
        isEl: isElement,
        isStr: isString,
        isNum: isNumber,
        isInt: isInt,
        isFloat: isFloat,
        isDate: isDate,
        isBool: isBool,
        isNodes: isNodes,
        isDoc: isDoc,
        isEvent: isEvent
    };
})();