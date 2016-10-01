(function(__core, $r){
    var cache = $obj(__core.cache.templating);

    function templating () {
        cache.forEach(function (v) {
            $obj(v.controllers).forEach(function (c) {
                $obj(c.models).forEach(function (m, k) {

                    $arr(c.views).forEach(function (v) {
                        var html;
                        v.htmlBraces.forEach(function (b, i) {
                            if (b == '{{' + k + '}}')
                                v.htmlData[i] = m.func(m);
                        });
                        html = v.htmlData.join('');
                        v.el.html(html).inner();
                    })

                    if(m.event) {
                        m.el.on(m.event, $func(function (e, t) {
                            if (m.el.el == t) {
                                $arr(c.views).forEach(function (v) {
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
                });
            });
        });
    }

    __core.templating = templating;
})(Ruddy, $r);