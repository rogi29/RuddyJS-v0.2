/**
 * RuddyJS Templating - Cache
 *
 *  @package    ruddyJS
 *  @author     Gil Nimer <info@ruddymonkey.com>
 *  @author     Nick Vlug <info@ruddy.nl>
 *  @copyright  Copyright 2015 Ruddy Monkey studios & ruddy.nl
 *  @version    0.0.2
 *
 * http://ruddymonkey.com/ruddyjs/templating
 */

(function(__core, $r) {
    /**
     * Get view inner htmls
     *
     * @param el
     * @returns {{data: *, braces: *}}
     */
    function getDataBinding(el, models, tag) {
        var html        = el.html(),
            data        = $arr ([]),
            braces      = $arr ([]),
            rand        = Math.random(),
            tag         = tag || {start: '{{', end: '}}'},
            query       = '[' + tag.start + '].*[' + tag.end +']',
            regex       = new RegExp('{/{-' + rand  + '--}//}',"g"),
            start       = new RegExp(tag.start, "g"),
            end         = new RegExp(tag.end, "g");

        html = html.replace(/,/g, '{/{-'+ rand +'--}//}').replace(start, ',{{').replace(end, '}},');
        $arr (html.split(',')).forEach(function(v, i){
            v = $str (v.replace(regex, ','));
            if(v.pregMatch(query))
                braces[i] = v;

            data[i] = v;
        });

        return {data: data, braces: braces}
    }

    /**
     * Get element's event
     *
     * @param el
     * @returns {string}
     */
    function getEvent(el) {
        var type = $el (el).getAttribute('app-event') || $el (el).getAttribute('type');

        switch(type) {
            case 'password':
            case 'email':
            case 'text':
                return 'input';
                break;

            case 'submit':
            case 'button':
            case 'checkbox':
            case 'tap':
            case 'press':
            case 'doubletap':
                return 'click';
                break;

            case 'draggable':
            case 'grabbable':
            case 'droppable':
                return type;
                break;
        }
    }

    /**
     * Get Function
     *
     * @param event
     * @returns {Function}
     */
    function getFunction(event) {
        switch(event) {
            case 'input':
                return $func (function (target) {
                    return target.value;
                });
                break;

            case 'click':
                return $func (function (target) {
                    return target.value;
                });
                break;

            default:
                return  function(){};
                break;
        }
    }

    /**
     * Templating cache object
     *
     * @returns {*}
     */
    function $$cache(config) {

        var attrs   = config['attributes'],
            appExt  = '[' + attrs.app + ']',
            tree    = {};

        $r (appExt).each(function(v) {
            var
                compExt     = '[' + attrs.component + ']',
                ctrlrExt    = '[' + attrs.controller + ']',
                modelExt    = '[' + attrs.model + ']',
                viewExt     = '[' + attrs.view + ']',
                appName     = v.getAttribute(attrs.app),
                appEl       = $r ('[' + attrs.app + '="' + appName + '"]'),
                ctrlsList   = {};

            //Cache all controllers
            tree[appName] = {components: $arr ([]), controllers: {}};

            appEl.find(compExt).each(function(v, g) {
                var
                    componentName   = $el (v).getAttribute(attrs.component),
                    componentObj    = __core.cache.templating.components[componentName];

                tree[appName].components.push({name: componentName, el: $r (v), template: componentObj.template});
                v.innerHTML = componentObj.template;

                $r (v).find(ctrlrExt).each(function (ctrl) {
                    var
                        controllerName  = $el (ctrl).getAttribute(attrs.controller),
                        controllerEl    = $r (ctrl);

                    if(controllerName in tree[appName].controllers)
                        return;

                    tree[appName].controllers['$' + componentName + '[' + g + ']_' + controllerName] = {el: controllerEl, models: {}, views: []};
                    ctrlsList[controllerName] = '$' + componentName + '[' + g + ']_' + controllerName;
                });
            });

            appEl.find(ctrlrExt).each(function(v){
                var
                    controllerName  = $el (v).getAttribute(attrs.controller),
                    controllerEl    = $r (v);

                if(controllerName in tree[appName].controllers || controllerName in ctrlsList)
                    return;

                tree[appName].controllers[controllerName] = {el: controllerEl, models: {}, views: []};
            });

            $obj (tree[appName].controllers).forEach(function(v, g){
                var controllerEl = v.el,
                    controllerName = g;

                //Cache all models
                controllerEl.find(modelExt).each(function(v) {
                    var
                        modelName   = $el (v).getAttribute(attrs.model),
                        el          = $r (v),
                        event       = getEvent(v),
                        defaultFunc = getFunction(event);

                    tree[appName].controllers[controllerName].models[modelName] = {name: modelName, el: el, value: el.el.value, event: event, callback: defaultFunc, defaultCall: defaultFunc};
                });

                //Cache all views
                controllerEl.find(viewExt).each(function(v, g) {
                    var
                        viewName    = $el (v).getAttribute(attrs.view),
                        el          = $r (v),
                        html        = getDataBinding(el, tree[appName].controllers[controllerName].models, config.tag);

                    tree[appName].controllers[controllerName].views[g] = {name: viewName, el: el, htmlData: html.data, htmlBraces: html.braces};
                });
            });
        });

        return tree;
    };

    /**
     *
     * @type {cache}
     */
    __core.cache['templating'] = {apps: {}, components: {}};
    __core.cacheTemplate = function() {
        __core['cache']['templating']['apps'] = $$cache(__core.config.templating);
    };
})(Ruddy, $r);