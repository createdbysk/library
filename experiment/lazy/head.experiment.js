/**
 * Experiment with lazy.head.
 *
 * TO USE THIS EXPERIMENT, follow the steps below
 *
 * npm install lazy
 * node experiment/lazy/head.experiment.js
 */
(function () {
    'use strict';
    var Lazy,
        lines,
        head;
    Lazy = require('lazy');
    lines = new Lazy(process.stdin).lines
    lines.head(function (value) {
        console.error("Head is ", value.toString());
    });
    lines.bucket('', function (b) {
        console.error("bucket ", b.toString());
    });
    lines = lines.tail();
    lines.head(function (value) {
        console.error("Head of tail is ", value.toString());
    });
    lines = lines.tail();
    lines.head(function (value) {
        console.error("Head of tail is ", value.toString());
    });
    process.stdin.resume();
})();