/**
 * RuddyJS Templating - App
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
     * Application Class
     *
     * @param appName
     */
    var app = $obj (function(appName) {
        this.app    = __core.cache.templating['apps'][appName];
        this.ctrl   = [];
        this.models = [];
        this.index  = 0;
    });

    /**
     * Controller
     *
     * @param controllerName
     * @param callback
     */
    app.assign('controller', $func (function(controllerName, callback){
        var ctrl = this.ctrl[this.index] = this.app.controllers[controllerName];

        this.models[this.index] = {};
        this.ctrl[this.index]['model'] = function(modelName, value) {
            var func = function(target) {
                return target.value;
            }
            ctrl.models[modelName] = {name: modelName, value: value, defaultCall: func, callback: func};
            return __core.model(ctrl.models[modelName]);
        };

        $obj (this.ctrl[this.index].models).forEach($func (function(v, k){
            this.models[this.index][k] = __core.model(v);
        }).bind(this));

        callback.call(this.ctrl[this.index], this.models[this.index], this.ctrl[this.index].views);
        this.index++;
    }));

    __core.app = app;
})(Ruddy, $r);