/**
 * Provides a requirejs injector based on Squire.
 *
 * This current implementation will NOT work if the client uses squirejs directly.
 */
'use strict';
var path,
    createInjector;

path = require('path');

createInjector = function () {
    'use strict';
    var requirejs,
        Squire;
    requirejs = require('requirejs');
    requirejs.config({
        // This file gets installed under node_modules/library/test_utilities on the client side.
        // Therefore, the path has to go up 3 directories to get to the project root.
        baseUrl: path.resolve(__dirname, "../../.."),
        nodeRequire: require,
        packages: [
            {
                name: "squirejs",
                location: "node_modules/library/node_modules/squirejs",
                main: "src/Squire"
            }
        ]
    });
    Squire = requirejs('squirejs');
    return new Squire();
};

module.exports = {
    createInjector : createInjector
};
