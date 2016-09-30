(function(__core, $r){
    var model = function(obj){
        if (!(this instanceof model)) {
            return new model(obj);
        }

        this.obj = obj;
    };

    model.prototype.value = function(value){
        if(value){
            return this.obj.el.setAttribute('value', value);
        }

        return this.obj.el.getAttribute('value');
    };

    model.prototype.event = function(eventName) {
        if(eventName){
            return this.obj.event = eventName;
        }

        return this.obj.event;
    };

    model.prototype.func = function(func) {
        if(func){
            return this.obj.func = func;
        }

        return this.obj.func;
    };

    __core.model = model;
})(Ruddy, $r);