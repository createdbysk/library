/**
 * Experiment to test how to convert a stream into a line-by-line linq enumerable.
 */
(function () {
    'use strict';
    var linq,
        readline,
        createStreamEnumerable;
    linq = require('linq');
    readline = require('readline');

    createStreamEnumerable = function (fd, callback) {
        var lines,
            reader;

        lines = [];

        reader = readline.createInterface({
            input: fd,
            // Specify that the output is not a TTY so that readline does not echo the input.
            output: {isTTY: false}
        });    

        reader.on('line', function (line) {
            lines.push(line);
        });

        reader.on('close', function () {
            callback(linq.from(lines));
        });
    };


    createStreamEnumerable(process.stdin, function (streamEnumerable) {
        streamEnumerable.forEach(function (line) {
            console.error("LINE :", line);
        });
    });
})();
