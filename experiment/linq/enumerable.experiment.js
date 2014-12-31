/**
 * Experiment to understand how to create a linq enumerable
 *
 */
(function () {
    'use strict';
    var linq,
        enumerator,
        enumerable,
        i;

    linq = require('linq');

    enumerator = linq.Utils.createEnumerator(
        function () {
            i = 0;
            console.error("Initialize called with ", arguments);
        },
        function () {
            console.error("tryGetNext called with ", arguments, this);
            if (++i < 5) {
                //console.error("i ", i)
                return this.yieldReturn(i);
            }
            else {
                return this.yieldBreak();
            }
        },
        function () {
            console.error("dispose called with ", arguments);
            i = 0;
        }
    );

    enumerable = linq.Utils.createEnumerable(function () {
        return enumerator;
    });

    // This will generate a sequence 0,1,2,3,4
    linq.from(enumerable).
        select(function (value) {
            console.error('select called with ', value);
        }).toArray();
})();
