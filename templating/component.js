/**
 * RuddyJS Templating - component
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
     * Component Class
     *
     * @param componentName
     */
    var component = $obj (function(componentName, template) {
        this.name       = $str (componentName);
        this.template   = template;
        this.index      = 0;

        this.component = __core.cache.templating['components'][this.name] = {name: this.name, template: this.template, ctrls: {}};
    });

    /**
     * Controller
     *
     * @param controllerName
     * @param callback
     */
    component.assign('controller', $func(function(controllerName, callback){
        __core.cache.templating['components'][this.name]['ctrls'][controllerName] = {callback: callback};
        this.index++;
    }));

    /*
    component.assign('controller', $func (function(controllerName, callback){

        var ctrl = this.ctrl[this.index] = this.component.controllers[controllerName];

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
    }));*/

    __core.component = component;
})(Ruddy, $r);