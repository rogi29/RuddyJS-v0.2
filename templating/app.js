(function(__core, $r){
    var app = $obj (function(appName){
        if (!(this instanceof app)) {
            return new app(appName);
        }

        this.app = __core.cache.templating[appName];
    });

    app.assign('controller', $func (function(controllerName, func){
        this.controller = this.app.controllers[controllerName];
        this.controller.models.forEach($func (function(v, k){
            this.controller.models[k] = __core.model(v);
        }).bind(this));

        func.call(this.controller, this.controller.models, this.controller.views);
    }));

    __core.app = app;
})(Ruddy, $r);