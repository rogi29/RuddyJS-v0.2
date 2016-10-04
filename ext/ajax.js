/**
 * ruddyJS Extenstions - ajax
 *
 *  @package    ruddyJS
 *  @author     Gil Nimer
 *  @copyright  Copyright 2015 Ruddy Monkey studios & ruddy.nl
 *  @version    0.0.2
 *
 * http://ruddymonkey.com/
 */

(function(__core, $r){
    "use strict";

    /**
     * Ajax request polyfill
     */
    if(!window.XMLHttpRequest){
        var AXOs = ['MSXML2.XMLHTTP.6.0', 'MSXML3.XMLHTTP', 'Microsoft.XMLHTTP', 'MSXML2.XMLHTTP.3.0'];
        var correctAXO = null;

        window.XMLHttpRequest = function() {
            if (correctAXO === null) {
                var request;
                if (window.Activerequestect) {
                    for (var i = 0, c = AXOs.length; i < c; i++) {
                        try {
                            request = new window.Activerequestect(AXOs[i]);
                        } catch (e) { request = false; }
                        if (request) {
                            correctAXO = AXOs[i];
                            return request;
                        }
                    }
                }
                correctAXO = false;
            }
            if (correctAXO === false) {
                throw new Error('XMLHttpRequest not supported in this browser');
            }
            return new window.Activerequestect(correctAXO);
        };

    }

    /**
     * Ajax
     *
     * @param params
     */
    $r.assign('ajax', $func (function(params){
        var
            request     = new XMLHttpRequest(),
            params      = params || {},
            method      = params.method || 'GET',
            async       = params.async || false,
            contentType = params.contentType || 'application/x-www-form-urlencoded',
            mimeType    = params.mimeType || false,
            success     = params.success || function(){},
            error       = params.error || function(){},
            send        = params.send || function(){},
            url         = this.param['url'] || false,
            data        = '';

        if(params.data) {
            var id;
            data = '?';

            for(id in params.data) {
                data += (id + '=' + params.data[id] + "&");
            }
            data.slice(0, -1);
        }

        url += data;
        request.open(method, encodeURI(url), async);

        if(mimeType) {
            request.overrideMimeType(mimeType)
        }

        request.setRequestHeader('Content-Type', contentType);
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status === 200) {
                success(request);
            } else {
                error(request);
            }
        };

        request.send(send.apply(request));
    }));

    /**
     * Extend
     *
     * @type {{ajax: *}}
     */
    window.$r = $r;
})(Ruddy, $r);