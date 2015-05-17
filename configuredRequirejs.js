var requirejs,
    path;
requirejs = require('requirejs');
path = require('path');

requirejs.config({
    baseUrl: path.resolve(__dirname, "../.."),
    nodeRequire: require,
    paths : {
        'library': 'node_modules/library',
        'configuration': 'node_modules/library/configuration',
        'utilities': 'node_modules/library/utilities'
    }
});

module.exports = requirejs;
