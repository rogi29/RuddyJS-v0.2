(function(__core, $r){
    var cache = __core.cache.templating;

    /**
     * General Binding
     *
     * @param c
     * @param v
     */
    function binding(c, v) {
        var key, model;

        v.htmlBraces.forEach(function (b, i) {
            key = b.replace('{{', '').replace('}}', '');
            model = c.models[key];
            if (model)
                v.htmlData[i] = model.func(model);
        });
        v.el.html(v.htmlData.join('')).inner();
    }

    /**
     * Array Binding
     *
     * @param c
     * @param v
     * @param attr
     * @param arr
     */
    function arrayBinding(c, v, attr, arr) {
        var key, model;

        $arr (c.models[arr[0]].value).forEach(function(e, k) {
            v.htmlBraces.forEach(function (b, i) {
                if (b == '{{' + attr + '}}'){
                    v.htmlData[i] = e;
                    return;
                }

                /*
                key = b.replace('{{', '').replace('}}', '');
                model = c.models[key];
                if (model) {
                    v.htmlData[i] = model.func(model);
                }
                */
            });
            v.el.html(v.htmlData.join('')).append();
        });
    }

    /**
     * Multi array Binding
     *
     * @param c
     * @param v
     * @param attr
     * @param arr
     */
    function multArrayBinding(c, v, attr, arr) {
        var key;
        $arr(c.models[arr[0]].value).forEach(function (e, k) {
            v.htmlBraces.forEach(function (b, i) {
                key = b.replace('{{' + arr[1] + '.', '').replace('}}', '');
                if (key in e)
                    v.htmlData[i] = e[key];
            });
            v.el.html(v.htmlData.join('')).append();
        });
    }

    /**
     * Event Binding
     *
     * @param c
     * @param m
     */
    function eventBinding(c, m, k) {
        if(!m.event)
            return;

        m.el.on(m.event, $func(function (e, t) {
            if (m.el.el == t) {
                $arr (c.views).forEach(function (v) {
                    var html;
                    v.htmlBraces.forEach(function (b, i) {
                        if (b == '{{' + k + '}}')
                            v.htmlData[i] = m.func(t);
                    });
                    html = v.htmlData.join('');
                    v.el.html(html).inner();
                })
            }
        }));
    }

    /**
     * Run Templating
     */
    function templating () {
        cache.forEach(function (v) {
            $obj (v.controllers).forEach(function (c) {
                $arr (c.views).forEach(function (v) {
                    var repeat = $str (v.el.attribute('app-repeat') || ''), array;

                    if(repeat != '') {
                        v.el.html('').inner();
                        array = repeat.split('->');

                        if(repeat.pregMatch(/->/g) && array[0] in c.models) {
                            multArrayBinding(c, v, repeat, array);
                        } else {
                            arrayBinding(c, v, repeat, array);
                        }
                        return;
                    }

                    binding(c, v);
                });

                $obj (c.models).forEach(function (m, k) {
                    eventBinding(c, m, k);
                });
            });
        });
    }

    /**
     * Global function
     *
     * @type {templating}
     */
    __core.templating = templating;
})(Ruddy, $r);