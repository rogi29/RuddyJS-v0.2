Ruddy.config = (function(__core){
    /**
     *
     * @type {{}|*}
     */
    var config = __core.config || (__core['config'] = {});

    /**
     * Config here
     *
     * @type {{}}
     */
    config['templating'] = {
        attributes: {
            app: '[ruddy-app]',
            controller: '[app-controller]',
            model: '[app-model]',
            view: '[app-view]'
        }
    };

    return config;
})(Ruddy);