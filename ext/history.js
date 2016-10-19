/**
 * ruddyJS Extenstions - history
 *
 *  @package    ruddyJS
 *  @author     Gil Nimer
 *  @copyright  Copyright 2015 Ruddy Monkey studios & ruddy.nl
 *  @version    0.0.2
 *
 * http://ruddymonkey.com/
 */

(function (__core, $r) {
    "use strict";

    $r.assign('pushState', function(title, response) {
        if(!this.param.url)
            throw new TypeError('Url is not valid.');

        var url = this.param.url;
        response = (response) ? response : {};

        if (typeof (history.pushState) != "undefined") {
            document.title = title;
            history.pushState(response, title, url);
        } else {
            window.location = window.location.href + url;
        }
    });

    /**
     * Extend
     *
     * @type {{}}
     */
    window.$r = $r;
})(Ruddy, $r);