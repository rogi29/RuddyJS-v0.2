/**
 * RuddyJS Templating - Model
 *
 *  @package    ruddyJS
 *  @author     Gil Nimer <info@ruddymonkey.com>
 *  @author     Nick Vlug <info@ruddy.nl>
 *  @copyright  Copyright 2015 Ruddy Monkey studios & ruddy.nl
 *  @version    0.0.2
 *
 * http://ruddymonkey.com/ruddyjs/templating
 */

(function(__core, $r){
    /**
     *
     * @param obj
     * @returns {model}
     */
    var model = function(obj){
        if (!(this instanceof model)) {
            return new model(obj);
        }

        this.obj = obj;
    };

    /**
     *
     * @param value
     * @returns {*}
     */
    model.prototype.value = function(value){
        if(value) {
            if(this.obj.el)
                this.obj.el.attribute('value', value);

            return this.obj.value = value;
        }

        return this.obj.value;
    };

    /**
     *
     * @param selector
     * @returns {*}
     */
    model.prototype.element = function(selector) {
        if(selector) {
            return this.obj.el = (selector instanceof $r) ? selector : $r (selector);
        }

        return this.obj.el || null;
    };

    /**
     *
     * @param eventName
     * @returns {*}
     */
    model.prototype.event = function(eventName) {
        if(eventName){
            return this.obj.event = eventName;
        }

        return this.obj.event;
    };

    /**
     *
     * @param func
     * @returns {*}
     */
    model.prototype.callback = function(func) {
        if(func){
            return this.obj.callback = func;
        }

        return this.obj.callback;
    };

    /**
     *
     * @type {model}
     */
    __core.model = model;
})(Ruddy, $r);