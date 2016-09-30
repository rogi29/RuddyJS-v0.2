(function(__core, $r){
    var cache = $obj (__core.cache.templating);

    cache.forEach(function(v){
        $obj (v.controllers).forEach(function(c) {
            $obj (c.models).forEach(function(m) {
                var modelName = m.name;

                m.el.on('input', $func (function(e,t){
                    if(m.el.el == t){
                        $arr (c.views).forEach(function(v){
                            var html;
                            v.htmlBraces.forEach(function(b, i){
                                if(b == '{{'+modelName+'}}')
                                    v.htmlData[i] = t.value;
                            });
                            html = v.htmlData.join('');
                            v.el.html(html).inner();
                        })
                    }
                }));
            });
        });
    });
})(Ruddy, $r);