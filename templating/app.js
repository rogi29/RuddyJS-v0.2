(function(__core, $r){
    var app = $obj (function(appName) {

        this.app = __core.cache.templating[appName];
        this.ctrl = [];
        this.models = [];
        this.index = 0;
    });

    app.assign('controller', $func (function(controllerName, func){
        var ctrl;

        this.models[this.index] = {};
        this.ctrl[this.index] = ctrl = this.app.controllers[controllerName];
        this.ctrl[this.index]['model'] = $func (function(modelName, value) {
            var func = function(target) {
                return target.value;
            }
            ctrl.models[modelName] = {value: value, defaultFunc: func, func: func};
            return __core.model(ctrl.models[modelName]);
        }).bind(this);

        this.ctrl[this.index].models.forEach($func (function(v, k){
            this.models[this.index][k] = __core.model(v);
        }).bind(this));

        func.call(this.ctrl[this.index], this.models[this.index], this.ctrl[this.index].views);
        this.index++;
    }));

    __core.app = app;
})(Ruddy, $r);