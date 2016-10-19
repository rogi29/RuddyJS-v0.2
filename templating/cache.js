(function(__core, $r) {
    /**
     * Get view inner html
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
        var type = $el (el).getAttribute('type');

        switch(type) {
            case 'password':
            case 'email':
            case 'text':
                return 'input';
                break;

            case 'submit':
            case 'button':
            case 'checkbox':
                return 'click';
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
            apps    = $r (attrs.app),
            tree    = {};

        apps.each(function(v) {
            var
                appExt      = attrs.app.replace('[', ''). replace(']', ''),
                ctrlrExt    = attrs.controller.replace('[', ''). replace(']', ''),
                modelExt    = attrs.model.replace('[', ''). replace(']', ''),
                viewExt     = attrs.view.replace('[', ''). replace(']', ''),
                appName     = v.getAttribute(appExt),
                appEl       = $r (attrs.app.slice(0, -1) + '="' + appName + '"]');

            //Cache all controllers
            tree[appName] = {controllers: {}};
            appEl.find(attrs.controller).each(function(v){
                var
                    controllerName  = $el (v).getAttribute(ctrlrExt),
                    controllerQuery = attrs.controller.slice(0, -1) + '="' + controllerName + '"]',
                    controllerEl    = appEl.find(controllerQuery);

                tree[appName].controllers[controllerName] = {el: controllerEl, models: {}, views: []};

                //Cache all models
                controllerEl.find(attrs.model).each(function(v) {
                    var
                        modelName   = $el (v).getAttribute(modelExt),
                        el          = $r (v),
                        event       = getEvent(v),
                        defaultFunc = getFunction(event);

                    tree[appName].controllers[controllerName].models[modelName] = {name: modelName, el: el, value: el.el.value, event: event, func: defaultFunc, defaultFunc: defaultFunc};
                });

                //Cache all views
                controllerEl.find(attrs.view).each(function(v, g) {
                    var
                        viewName    = $el (v).getAttribute(viewExt),
                        el          = $r (v),
                        html        = getDataBinding(el, tree[appName].controllers[controllerName].models, config.tag);

                    tree[appName].controllers[controllerName].views[g] = {type: viewName, el: el, htmlData: html.data, htmlBraces: html.braces};
                });
            })
        });

        return $obj (tree);
    };

    /**
     *
     * @type {cache}
     */
    Ruddy.cache['templating'] = $$cache(__core.config.templating);
})(Ruddy, $r);