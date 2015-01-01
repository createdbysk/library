/**
 * Integration test to verify that createStreamEnumerable works correctly.
 *
 * Usage:
 * From the project root, run the following
 * 
 *     echo Test | node integration_test/streamEnumerableCreator.test.js
 *
 * Expected Output:
 *     LINE: Test
 *  
 */
(function () {
    'use strict';
    var createStreamEnumerable;
    createStreamEnumerable = require('../streamEnumerableCreator');

    createStreamEnumerable(process.stdin, function (err, streamEnumerable) {
        if (err) {
            console.error('ERROR: ', err)
        }
        else {
            streamEnumerable.forEach(function (line) {
                console.error("LINE :", line);
            });            
        }
    });
})();
