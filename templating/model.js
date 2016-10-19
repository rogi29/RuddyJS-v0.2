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
            return this.obj.func = func;
        }

        return this.obj.func;
    };

    /**
     *
     * @type {model}
     */
    __core.model = model;
})(Ruddy, $r);