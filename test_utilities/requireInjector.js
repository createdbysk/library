/**
 * Provides a requirejs injector based on Squire.
 *
 * This current implementation will NOT work if the client uses squirejs directly.
 */


var configureInjector;
configureInjector = require('./configureInjector');

createInjector = function () {
    // This file gets installed under node_modules/library/test_utilities on the client side.
    // Therefore, the path has to go up 3 directories to get to the project root.
    return configureInjector('../../..', "node_modules/library/node_modules/squirejs");
};

module.exports = {
    createInjector : createInjector
};
