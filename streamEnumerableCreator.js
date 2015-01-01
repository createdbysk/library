/**
 * Creates an enumerable from the given stream
 *
 * I could not figure out how to mock a stream and make that work with readline.
 * Therefore, the test for this code is under integration_test/streamEnumerableCreator.test.js.
 */
var createStreamEnumerable,
    readline,
    linq;
readline = require('readline');
linq = require('linq');
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
        callback(null, linq.from(lines));
    });

};

module.exports = createStreamEnumerable;