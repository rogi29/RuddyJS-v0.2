(function(__core, $r) {
    /**
     * Get view inner html
     *
     * @param el
     * @returns {{data: *, braces: *}}
     */
    function getDataBinding(el) {
        var html        = $str (el.html()),
            data        = $arr ([]),
            braces      = $arr ([]),
            rand        = Math.random(),
            regex       = new RegExp('\/\{' + rand  + '}\/');

        html = html.replace(/,/g, '/{'+ rand +'}/').replace(/{{/g, ',{{').replace(/}}/g, '}},');
        html.split(',').map(function(v, i){
            v = $str ($str (v).replace(regex, ','));
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
     * @type {{cacheAll:*}}
     */
    var cache = $obj (
        function(attrs) {
            this.attrs = attrs;
            this.$apps = $r (attrs.app);
            this.$tree = {};
            this.$controllers = {};
        }
    );

    cache.assign('cacheAll', $func (function() {
        this.$apps.each($func (
            function(v)
            {
                var
                    /**
                     *
                     * @type {string}
                     */
                    appExt      = this.attrs.app.replace('[', ''). replace(']', ''),
                    /**
                     *
                     * @type {*|string}
                     */
                    appName     = v.getAttribute(appExt),
                    /**
                     *
                     * @type {string}
                     */
                    appQuery    = this.attrs.app.slice(0, -1) + '="' + appName + '"]';

                /**
                 *
                 * @type {{controllers: {}}}
                 */
                this.$tree[appName] = {controllers: $obj ({})};

                //Cache all controllers
                $r (appQuery).find(this.attrs.controller).each($func (function(v){
                    var controllerExt   = this.attrs.controller.replace('[', ''). replace(']', ''),
                        controllerName  = $el (v).getAttribute(controllerExt),
                        controllerQuery = this.attrs.controller.slice(0, -1) + '="' + controllerName + '"]';

                    this.$tree[appName].controllers[controllerName] = $obj ({el: $r (appQuery).find(controllerQuery), models: $obj ({}), views: []});

                    //Cache all models
                    $r (appQuery).find(controllerQuery).find(this.attrs.model).each($func (function(v) {
                        var modelExt    = this.attrs.model.replace('[', ''). replace(']', ''),
                            modelName   = $el (v).getAttribute(modelExt),
                            el          = $r ($el (v)),
                            defaultFunc = getFunction(getEvent(v));

                        this.$tree[appName].controllers[controllerName].models[modelName] = $obj ({el: el, event: getEvent(v), name: modelName, value: el.el.value, func: defaultFunc, defaultFunc: defaultFunc});
                    }).bind(this));

                    //Cache all views
                    $r (appQuery).find(controllerQuery).find(this.attrs.view).each($func (function(v, g) {
                        var viewExt = this.attrs.view.replace('[', ''). replace(']', ''),
                            viewName    = $el (v).getAttribute(viewExt),
                            el          = $r ($el (v)),
                            html        = getDataBinding(el);

                        this.$tree[appName].controllers[controllerName].views[g] = $obj ({el: el, name: viewName, htmlData: html.data, htmlBraces: html.braces});
                    }).bind(this));
                }).bind(this));
            }
        ).bind(this));

        return this;
    }));

    /**
     *
     * @type {cache}
     */
    var $$cache = new cache(__core.config.templating['attributes']);
    $$cache.cacheAll();
    Ruddy.cache['templating'] = $$cache.$tree;
    Ruddy['controllers'] = $$cache.$controllers;
})(Ruddy, $r);