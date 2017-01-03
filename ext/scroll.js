/**
 * RuddyJS Extenstions - Scroll
 *
 *  @package    ruddyJS
 *  @author     Gil Nimer <info@ruddymonkey.com>
 *  @author     Nick Vlug <info@ruddy.nl>
 *  @copyright  Copyright 2015 Ruddy Monkey studios & ruddy.nl
 *  @version    0.0.2
 *
 * http://ruddymonkey.com/ruddyjs/extenstions
 */

(function(__core, $r) {
    "use strict";

    /**
     * pageXOffset
     *
     * @type {Number|number}
     */
    function pageXOffset() {
        return window.pageXOffset || (
            (document.documentElement.clientWidth) ? document.documentElement.scrollLeft : document.body.scrollLeft
        );
    }

    /**
     * pageYOffset
     *
     * @type {Number|number}
     */
    function pageYOffset() {
        return window.pageYOffset || (
            (document.documentElement.clientHeight) ? document.documentElement.scrollTop : document.body.scrollTop
        );
    }

    /**
     * scroll page both X and Y axis
     *
     * @param x
     * @param y
     * @param settings
     */
    $r.assign('scroll', $func (function(x, y, settings) {
        var minX = pageXOffset(), minY = pageYOffset(), nx = 0, ny = 0,
            delay = 1, duration = 1, callback = false, condition = undefined,
            delta = $r(false).setDelta(
                'easeOut',
                {name: 'linear', progress: 4},
                false
            );

        if(__core.isObj(settings)) {
            delay       = settings.delay        || delay;
            duration    = settings.duration     || duration;
            callback    = settings.callback     || callback;
            condition   = settings.condition    || condition;
            delta       = settings.delta        || delta;
        }

        this.setAni(
            {
                delay: 1,
                duration:   duration * 1000 || 1000,
                delta:      delta,

                step: function(delta){
                    if(minX == x && minY == y)
                        return;

                    nx = minX + (x-minX)*delta;
                    ny = minY + (y-minY)*delta;

                    window.scrollTo(nx, ny);
                }
            },
            callback,
            condition
        );
    }));

    /**
     * scroll page the X axis only
     *
     * @param to
     * @param settings
     */
    $r.assign('scrollX', $func (function(to, settings) {
        var minX = pageXOffset(), nx = 0, delay = 0, duration = 1, callback = false, condition = undefined,
            delta = $r(false).setDelta(
                'easeOut',
                {name: 'linear', progress: 4},
                false
            );

        if(__core.isObj(settings)) {
            delay       = settings.delay        || delay;
            duration    = settings.duration     || duration;
            callback    = settings.callback     || callback;
            condition   = settings.condition    || condition;
            delta       = settings.delta        || delta;
        }

        this.setAni(
            {
                delay:      delay,
                duration:   duration * 1000 || 1000,
                delta:      delta,
                startPoint: minX,
                endPoint:   to,

                step: function(delta){
                    nx = minX + (to-minX)*delta;
                    window.scrollTo(nx, window.pageYOffset);
                }
            },
            callback,
            condition
        );
    }));

    /**
     * scroll page the Y axis only
     *
     * @param to
     * @param settings
     */
    $r.assign('scrollY', $func (function(to, settings)
    {
        var minY = pageYOffset(), ny = 0, delay = 0, duration = 1, callback = false, condition = undefined,
            delta = $r(false).setDelta(
                'easeOut',
                {name: 'linear', progress: 1},
                false
            );

        if(__core.isObj(settings)) {
            delay       = settings.delay        || delay;
            duration    = settings.duration     || duration;
            callback    = settings.callback     || callback;
            condition   = settings.condition    || condition;
            delta       = settings.delta        || delta;
        }

        this.setAni({
                delay:      delay,
                duration:   duration * 1000 || 1000,
                delta:      delta,
                startPoint: minY,
                endPoint:   to,

                step: function(delta){
                    ny = minY + (to-minY)*delta;
                    window.scrollTo(window.pageXOffset, ny);
                }
            },
            callback,
            condition
        );
    }));

    /**
     * Extend
     *
     * @type {{scroll: *, scrollX: *, scrollY: *}}
     */
    window.$r = $r;
})(Ruddy, $r);