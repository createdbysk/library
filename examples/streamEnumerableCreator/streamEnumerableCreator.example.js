var streamEnumerableCreator;
streamEnumerableCreator = require('../../streamEnumerableCreator');
streamEnumerableCreator(process.stdin, function (err, lines) {
    lines.forEach(function (line) {
        console.log(line);
    });
});
