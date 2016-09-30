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

        return value;
    };

    __core.model = model;
})(Ruddy, $r);