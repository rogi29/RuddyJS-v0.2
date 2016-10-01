(function(__core, $r){
    var app = $obj (function(appName){
        if (!(this instanceof app)) {
            return new app(appName);
        }

        this.app = __core.cache.templating[appName];
        this.ctrler = [];
        this.models = [];
        this.index = 0;
    });

    app.assign('controller', $func (function(controllerName, func){
        var ctrler;

        this.models[this.index] = {};
        this.ctrler[this.index] = ctrler = this.app.controllers[controllerName];
        this.ctrler[this.index]['model'] = function(modelName, value) {
            var func = function(target) {
                return target.value;
            }
            ctrler.models[modelName] = {value: value, defaultFunc: func, func: func};
        };

        this.ctrler[this.index].models.forEach($func (function(v, k){
            this.models[this.index][k] = __core.model(v);
        }).bind(this));

        func.call(this.ctrler[this.index], this.models[this.index], this.ctrler[this.index].views);
        this.index++;
    }));

    __core.app = app;
})(Ruddy, $r);