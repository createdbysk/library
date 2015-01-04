/**
 * Provides a requirejs injector based on Squire.
 */
var configureInjector;
configureInjector = function (relativePathToProjectRoot, squirejsPathRelativeToBase) {
    'use strict';
    var path,
        createInjector,
        requirejs,
        Squire;

    path = require('path');
    requirejs = require('requirejs');
    requirejs.config({
        baseUrl: path.resolve(__dirname, relativePathToProjectRoot),
        nodeRequire: require,
        packages: [
            {
                name: "squirejs",
                location: squirejsPathRelativeToBase,
                main: "src/Squire"
            }
        ]
    });
    Squire = requirejs('squirejs');
    return new Squire();
}

module.exports = configureInjector;
