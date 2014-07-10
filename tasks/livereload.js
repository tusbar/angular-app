'use strict';

var express = require('express');
var livereload = require('connect-livereload');

module.exports = function (grunt) {
    var dist = grunt.config.get('c.dist');

    return function () {
        express()
            .use(livereload())
            .use(express.static(dist))
            .all('/*', function (req, res) {
                res.sendfile('index.html', {
                    root: dist
                });
            })
            .listen(5000);
    };
};
