/**
 * RuddyJS Templating - Config
 *
 *  @package    ruddyJS
 *  @author     Gil Nimer <info@ruddymonkey.com>
 *  @author     Nick Vlug <info@ruddy.nl>
 *  @copyright  Copyright 2015 Ruddy Monkey studios & ruddy.nl
 *  @version    0.0.2
 *
 * http://ruddymonkey.com/ruddyjs/templating
 */

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
        tag: {
            start: '{{',
            end: '}}'
        },

        attributes: {
            app: 'ruddy-app',
            component: 'app-component',
            controller: 'app-controller',
            model: 'app-model',
            view: 'app-view'
        }
    };

    return config;
})(Ruddy);