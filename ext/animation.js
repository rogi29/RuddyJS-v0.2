/**
 * ruddyJS Extenstions - animation
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
     * RequestAnimationFrame polyfill
     */
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
        || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
    }

    /**
     * Get current value
     *
     * @param startPoint
     * @param endPoint
     * @param delta
     * @returns {*}
     */
    var currValue = $func (function(startPoint, endPoint, delta) {
        return startPoint + (endPoint-startPoint)*delta;
    });

    /**
     * Start animation
     *
     * @param opts
     * @param callback
     * @param condition
     */
    $r.assign('setAni', $func (function(opts, callback, condition) {
        var start = new Date, el = this.el,
            timePassed, progress, delta,
            condition = condition || true;

        console.log(opts);

        if(opts === false){
            this.animation = $func (function () {
                if (callback) { callback.apply(el); }
                return true;
            });
            return;
        }

        this.animation = $func (function () {
            if(!condition) return;

            timePassed = new Date - start;
            progress = timePassed / opts.duration;

            if (progress > 1) {
                progress = 1;
            }

            delta = opts.delta(progress);
            opts.step(delta);

            if (progress == 1) {
                if (callback) callback.apply(el);
                return;
            }

            window.requestAnimationFrame(this.animation.bind(this));
        });

        this.animation();
    }));

    /**
     * Cancel animation
     *
     * @param callback
     */
    $r.assign('cancleAnimation', $func (function(callback) {
        this.setAni(false, callback, false);
    }));

    /**
     * Animate (set values)
     *
     * @param style (x=translateX(), y=translateY(), xy=translate())
     * @param startPoint
     * @param endPoint
     * @param delay
     * @param duration
     * @param delta
     * @param ext
     * @param callback
     * @param condition
     */
    $r.assign('animate', $func (function(params) {
        var
            el          = this.el,
            params      = params || {},
            ext         = params.ext || '',
            delay       = params.delay || 0.9,
            duration    = params.duration * 1000 || 1000,
            style       = params.style      || false,
            startPoint  = params.startPoint || false,
            endPoint    = params.endPoint   || false,
            callback    = params.callback   || false,
            condition   = params.condition  || false,
            delta       = params.delta || $r(false).setDelta('easeOut', {name: 'linear', progress: 1});

        this.setAni({
            delay: delay,
            duration: duration,
            delta: delta,
            ext: ext,
            style: style,
            startPoint: startPoint,
            endPoint: endPoint,
            step: function(delta){
                var minimum = startPoint + (endPoint-startPoint)*delta;
                switch(style){
                    case 'x':
                        $r (el).style('transform', 'translateX(' + currValue(startPoint, endPoint, delta) + ext + ')');
                        break;
                    case 'y':
                        $r (el).style('transform', 'translateY(' + currValue(startPoint, endPoint, delta) + ext + ')');
                        break;
                    case 'xy':
                        $r (el).style('transform', 'translate(' + currValue(startPoint['x'], endPoint['x'], delta) + ext + ', ' + currValue(startPoint['y'], endPoint['y'], delta) + ext + ')');
                        break;
                    default:
                        $r (el).style(style, minimum + ext);
                        break;
                }
            }
        }, callback, condition);

    }));

    /**
     * Get delta
     *
     * @param name
     * @param x
     * @returns {Function}
     */
    $r.assign('getDelta', $func (function(name, x) {
        switch(name)
        {
            case 'linear':
                return function linear(progress)
                {
                    return progress;
                };
                break;

            case 'quadrantic':
                return function quad(progress)
                {
                    return Math.pow(progress, x);
                };
                break;

            case 'circ':
                return function circ(progress)
                {
                    return 1 - Math.sin(Math.acos(progress));
                };
                break;

            case 'backbow':
                return function backbow(progress)
                {
                    return Math.pow(progress, 2) * ((x + 1) * progress - x);
                };
                break;

            case 'bounce':
                return function bounce(progress)
                {
                    for(var a = 0, b = 1, result; 1; a += b, b /= 2){
                        if(progress >= (7 - 4 * a) / 11){
                            return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
                        }
                    }
                };
                break;

            case 'elastic':
                return function elastic(progress)
                {
                    return Math.pow(2, 10 * (progress-1)) * Math.cos(20*Math.PI*x/3*progress);
                };
                break;

            case 'custom':
                return function custom(progress, x)
                {
                    return Math.pow(progress, Math.LOG10E);
                };
                break;

            default:
                return function linear(progress)
                {
                    return progress;
                };
                break;
        }
    }));

    /**
     * Set ease
     *
     * @param type
     * @param delta
     * @param delta_2
     * @returns {*}
     */
    $r.assign('setEase', $func (function(type, delta, delta_2) {
        switch(type){
            case 'easeOut':
                return function(progress) {
                    return 1 - delta(1 - progress);
                };
                break;

            case 'easeInOut':
                return function(progress) {
                    if (progress < .5){
                        return delta(2*progress) / 2
                    } else {
                        return (2 - delta(2*(1-progress))) / 2
                    }
                };
                break;

            case 'easeInOut_delta':
                return function(progress) {
                    if (progress < 0.5){
                        return delta(2*progress) / 2
                    } else {
                        return (2 - delta_2(2*(1-progress))) / 2
                    }
                };
                break;

            default:
                return delta;
                break;
        }
    }));

    /**
     * Set delta
     *
     * @param type
     * @param delta
     * @param delta_2
     * @returns {*}
     */
    $r.assign('setDelta', $func (function(type, delta, delta_2) {
        delta = (delta) ? this.getDelta(delta.name, delta.progress) : false;
        delta_2 = (delta_2) ? this.getDelta(delta_2.name, delta_2.progress) : false;
        return this.setEase(type, delta, delta_2);
    }));

    /**
     * Extend
     *
     * @type {{setAni: *, cancelAnimation: *, animate: *, getDelta: *, setDelta: *, setEase: *}}
     */
    window.$r = $r;
})(Ruddy, $r);