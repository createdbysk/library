var requirejs,
    path;
requirejs = require('requirejs');
path = require('path');

requirejs.config({
    baseUrl: path.resolve(__dirname, "../.."),
    nodeRequire: require
});

module.exports = requirejs;