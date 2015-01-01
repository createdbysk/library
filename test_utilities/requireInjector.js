/**
 * Provides a requirejs injector based on Squire.
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
            // If the client of this library has squirejs installed, then expect it under
            // the node_modules on the client.
            {
                name: "squirejs",
                location: "node_modules/squirejs",
                main: "src/Squire"
            },
            // If the client of this library does not have squirejs installed, then expect it under
            // the node_modules under library.
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
