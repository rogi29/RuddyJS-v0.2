(function(__core, $r){
    var cache = __core.cache.templating;

    /**
     * Update view cache
     *
     * @param c
     * @param v
     * @param arr
     */
    function updateCache(c, v, arr) {
        var data = $arr ([]), braces = $arr ([]);

        $arr(c.models[arr[0]].value).forEach(function (e, k) {
            v.htmlData.forEach(function (h, i) {
                if(v.htmlData[i].pregMatch(/[{{].*[}}]/))
                    braces[data.length] = v.htmlData[i];

                data[data.length] = v.htmlData[i];
            });
        });

        v.htmlBraces = braces;
        v.htmlData = data;
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
        var key, index = 0, model = c.models[arr[0]].value, len = v.htmlData.length / model.length;

        v.htmlBraces.forEach(function (b, i) {
            if(Math.floor(i/len) > index)
                index++;

            if (b == '{{' + attr + '}}') {
                v.htmlData[i] = model[index];
                return;
            }
        });
        v.el.html(v.htmlData.join('')).append();
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
        var key, index = 0, model = c.models[arr[0]].value, len = v.htmlData.length / model.length;

        v.htmlBraces.forEach(function (b, i) {
            if(Math.floor(i/len) > index)
                index++;

            key = b.replace('{{' + arr[1] + '.', '').replace('}}', '');
            if (key in model[index]) {
                v.htmlData[i] = model[index][key];
            }
        });
        v.el.html(v.htmlData.join('')).append();
    }

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
            if (model && !__core.isArr(model.value))
                v.htmlData[i] = model.func(model);
        });
        v.el.html(v.htmlData.join('')).inner();
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
                    var repeat  = $str (v.el.attribute('app-repeat') || ' '),
                        array   = (repeat+'-> ').split('->');

                    if(repeat != ' ' && array[0] in c.models) {
                        v.el.html('').inner();
                        updateCache(c,v,array);
                        if(repeat.pregMatch(/->/g)) {
                            multArrayBinding(c, v, repeat, array);
                        } else {
                            arrayBinding(c, v, repeat, array);
                        }
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