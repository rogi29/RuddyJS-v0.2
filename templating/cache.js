(function(__core, $r) {
    /**
     * Get view inner html
     *
     * @param el
     * @returns {{data: *, braces: *}}
     */
    function getDataBinding(el) {
        var html        = el.html(),
            data        = [],
            braces      = [],
            rand        = Math.random(),
            regex       = new RegExp('\/\{' + rand  + '}\/');

        html = html.replace(/,/g, '/{'+ rand +'}/').replace(/{{/g, ',{{').replace(/}}/g, '}},');
        $arr (html.split(',')).map(function(v, i){
            v = $str (v.replace(regex, ','));
            if(v.pregMatch(/{{/))
                braces[i] = v;

            data[i] = v;
            return data;
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
    function $$cache(attrs) {
        var apps    = $r (attrs.app),
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
                        html        = getDataBinding(el);

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
    Ruddy.cache['templating'] = $$cache(__core.config.templating['attributes']);
})(Ruddy, $r);