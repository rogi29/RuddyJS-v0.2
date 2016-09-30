/**
 * ruddyJS JavaScript Library
 *
 *  @package    ruddyJS
 *  @author     Gil Nimer
 *  @copyright  Copyright 2015 Ruddy Monkey studios & ruddy.nl
 *  @version    0.0.2
 *
 * http://ruddymonkey.com/
 */

(function(__core){
    "use strict";
    var
        /**
         * $r cache object
         *
         * @type {{}}
         */
        $$rCache = __core.cache['$r'] = {},

        /**
         * Document
         *
         * @type {HTMLDocument}
         */
        doc = $doc (document),

        /**
         * StyleSheet
         *
         * @type {Stylesheet}
         */
        css = $css (doc.createStyle('ruddyjs'));

    /**
     * Ruddy Library
     *
     * @param param
     * @returns {$r}
     */
    var $r = $obj (function(param) {
        if (!(this instanceof $r)) {
            return new $r(param);
        }

        var index = param;
        if(__core.isEl(param)) {
            this.el = $el (param);
            this.index = index = Array.prototype.slice.call(doc.all).indexOf(param);
        }

        if($$rCache[index]) {
            var cache = $$rCache[index];

            this.el     = cache.el;
            this.param  = cache.param;
            this.index  = cache.index;
        } else {
            var el = this.el || false;

            if(__core.isStr(param)) {
                el = $nodes (doc.querySelectorAll(param));
                el = (el.length == 1) ? $el (el.first()) : el;
            } else if(__core.isArr(param) || __core.isNodes(param)) {
                el = param;
            }

            this.el     =  el;
            this.param  = param;
            this.index  = this.index || Array.prototype.slice.call(doc.all).indexOf(el);

            $$rCache[index] = {el: this.el, param: this.param, index: this.index}
        }
    });

    /**
     * Find element
     *
     * @param selectors
     * @returns {$r}
     */
    $r.assign('find', $func (function(selectors) {
        var key = this.param + ':' + selectors;

        if($$rCache[key]) {
            return $r(key);
        }

        var el = $nodes (this.el.querySelectorAll(selectors));
        el = (el.length == 1) ? $el (el.first()) : el;
        $$rCache[key] = {el: el, param: key, index: Array.prototype.slice.call(doc.all).indexOf(el), rule: null};

        return $r(key);
    }));

    /**
     * Loop through elements
     *
     * @param callback
     * @param afterCallback
     * @returns {*}
     */
    $r.assign('each', $func (function(callback) {
        var obj = this.el;

        if(__core.isArr(obj) || __core.isNodes(obj)) {
            obj.forEach.call(obj, callback, this);
            return this;
        }

        callback.call(this, this.el, 0, this.el);
        return this;
    }));

    /**
     * Change/get css value
     *
     * @param style
     * @param value
     * @returns {*}
     */
    $r.assign('html', $func (function(content) {
        var el = this.el;
        if(typeof content == 'undefined')
            return el.innerHTML;

        return {
            inner: function () {
                if (__core.isFunc(content))
                    return el.innerHTML = content.call(obj);

                return el.innerHTML = content;
            },

            append: function () {
                if (__core.isFunc(content))
                    return el.innerHTML += content.call(obj);

                return (el.innerHTML += content);
            }
        }
    }));

    $r.assign('getAttribute', $func (function(name) {
        if(!__core.isEl(this.el)) {
            throw new TypeError("$r argument provided is not an element");
        }

        return this.el.getAttribute(name);
    }));

    $r.assign('setAttribute', $func (function(name, value) {
        if(!__core.isEl(this.el)) {
            throw new TypeError("$r argument provided is not an element");
        }

        return this.el.setAttribute(name, value);
    }));

    /**
     * Create CSS Rule
     *
     * @returns {Function|null|*}
     */
    $r.assign('createRule', $func (function() {
        var index = css.insertRule(this.param + '{}', css.cssRules.length);
        $$rCache[this.param].rule = this.rule = css.getRule(index);
        return index;
    }));

    /**
     * Get/replace CSS Rule
     *
     * @param rule
     * @param value
     * @returns {*}
     */
    $r.assign('css', $func (function(rule, value) {
        var css = this.rule;

        if(!value)
            return css.style[rule];

        return css.style[rule] = value;
    }));

    /**
     * Get/repalce element style
     *
     * @param rule
     * @param value
     * @returns {*}
     */
    $r.assign('style', $func (function(rule, value) {
        var el = this.el;

        if(!value)
            return el.style[rule];

        return el.style[rule] = value;
    }));

    /**
     * If statment
     *
     * @param expression
     * @returns {$r}
     */
    $r.assign('when', $func (function(expression) {
        if(expression) {
            this.bool = true;
            return this;
        }

        this.bool = false;
        return this;
    }));

    /**
     * Execute if
     * @param callback
     * @returns {$r}
     */
    $r.assign('then', $func (function(callback) {
        if(!this.bool){
            this.bool = true;
            return this;
        }

        callback.call(this, this.el);
        this.bool = false;
        return this;
    }));

    /**
     * ELse if statment
     *
     * @param expression
     * @returns {$r}
     */
    $r.assign('or', $func (function(expression) {
        if(!this.bool){
            return this;
        }

        if(expression) {
            this.bool = true;
            return this;
        }

        this.bool = false;
        return this;
    }));

    /**
     * Event listener
     *
     * @param listener
     * @returns {boolean}
     */
    $r.assign('on', $func (function(listener, callback) {
        var obj = this.el, target, calls = 0;

        if(listener in __core.events){
            obj.calls = __core.events[listener].call(this, obj, callback);
            return;
        }

        obj.addEventListener(listener, function(e){
            e = e || window.event;
            target = e.target || e.srcElement;

            calls++;
            callback.call(this, e, target, obj, calls);
        }, false);

       // return false;
    }));

    /**
     * Get element offset
     *
     * @returns {{x: number, y: number}}
     */
    $r.assign('position', $func (function() {
        var box     = this.el.getBoundingClientRect(),
            body    = document.body,
            docElem = document.documentElement,
            scrollTop, scrollLeft, clientTop, clientLeft, x, y;

        scrollTop   = window.pageYOffset || docElem.scrollTop  || body.scrollTop;
        scrollLeft  = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

        clientTop   = docElem.clientTop  || body.clientTop  || 0;
        clientLeft  = docElem.clientLeft || body.clientLeft || 0;

        x = box.left + scrollLeft - clientLeft;
        y = box.top + scrollTop - clientTop;

        return {x: Math.round(x),  y: Math.round(y)};
    }));

    /**
     * Get element size
     *
     * @returns {{width: (Number|number), height: (Number|number)}}
     */
    $r.assign('size', $func (function() {
        var width = parseInt(this.css('width')) || this.el.offsetWidth || 0,
            height = parseInt(this.css('height')) || this.el.offsetHeight || 0;

        return {width: width, height: height};
    }));

    /**
     * $r in window
     *
     * @type {{find: *, each: *, html: *, createRule: *, css: *, style: *, when: *, then: *, or: *, on: *, position: *, size: *}}
     */
    window.$r = $r;
})(Ruddy);