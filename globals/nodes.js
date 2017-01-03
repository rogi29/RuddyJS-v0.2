/**
 * RuddyJS Globals - Nodes
 *
 *  @package    ruddyJS
 *  @author     Gil Nimer <info@ruddymonkey.com>
 *  @author     Nick Vlug <info@ruddy.nl>
 *  @copyright  Copyright 2015 Ruddy Monkey studios & ruddy.nl
 *  @version    0.0.2
 *
 * http://ruddymonkey.com/ruddyjs/globals
 */

(function(__core){
    /**
     * Global NodeList Wrapper
     *
     * @param nodes
     * @returns {*}
     */
    var nodeList = function(nodes) {
        if(__core.isNodes(nodes) === false)
            throw new TypeError("Nodes type - argument provided is not a nodeList type");

        /**
         *
         * @type {{push: push, concat: concat, forEach: (*|Function), map: map, first: first, last: last, isOne: isOne, indexOf: indexOf}}
         */
        var prototype = {
            /**
             * Native push function for a nodeList
             *
             * @returns {Number}
             */
            push: function () {
                "use strict";
                var arg = arguments, l = arg.length, i = 0;

                for(i; i !== l; i++) {
                    nodes[nodes.length] = arg[i];
                }

                return nodes.length;
            },

            /**
             * Native concat function for a nodeList
             *
             * @returns {string[]}
             */
            concat: function () {
                "use strict";
                var arg = arguments, l = arg.length, i = 0, s = $nodes (nodes).join();

                for(i; i !== l; i++) {
                    s += (','+arg[i]);
                }

                return s.split(',');
            },

            /**
             * Native forEach function for a nodeList
             *
             * @param f
             * @param p
             */
            forEach: (Array.prototype.forEach || function (f, p) {
                "use strict";
                if (typeof f !== 'function')
                    throw new TypeError(f + ' is not a function');

                var a = nodes, p = p || nodes, l = a.length, i = 0;
                for (i; i !== l; i++) {
                    f.call(p, a[i], i, a);
                }
            }),

            /**
             * Native map function for a nodeList
             *
             * @param f
             * @param p
             * @returns {Array}
             */
            map: function (f, p) {
                "use strict";
                var t = nodes, a = [], i = 0, l = t.length, v;

                for(i; i != l; i++) {
                    v = t[i];
                    a[i] = p ? f.call(p, v, i, t) : f(v, i, t);
                }

                return a;
            },

            /**
             * Get first element
             *
             * @returns {*}
             */
            first: function () {
                "use strict";
                if(nodes.length == 0)
                    throw new TypeError('Cant retrieve first element of an nodeList array with no initial value');

                return nodes[0];
            },

            /**
             * Get last element
             *
             * @returns {*}
             */
            last: function () {
                "use strict";
                if(nodes.length == 0)
                    throw new TypeError('Cant retrieve last element of an empty nodeList with no initial value');

                return nodes[nodes.length - 1];
            },

            /**
             * Check if nodeList length is one
             *
             * @returns {boolean}
             */
            isOne: function() {
                "use strict";
                if(nodes.length == 0)
                    throw new TypeError('Cant retrieve last element of an empty nodeList with no initial value');

                return (nodes.length == 1);
            },

            /**
             * Native indexOf function for a nodeList
             *
             * @param value
             * @returns {*}
             */
            indexOf: function(value) {
                "use strict";
                var a = nodes, key;
                for (key in a) {
                    if(value == a[key]) {
                        return key;
                    }
                }
                return -1;
            }
        };

        return __core.assign(nodes, prototype);
    };

    window.$nodes = nodeList;
})(Ruddy);

