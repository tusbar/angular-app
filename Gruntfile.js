'use strict';

module.exports = function (grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    var config = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({
        c: config,

        // ## //

        watch: {
            views: {
                files: ['<%= c.app %>/index.html', '<%= c.app %>/views/**/*.html'],
                tasks: ['copy:views'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['<%= c.app %>/scripts/**/*.js'],
                tasks: ['browserify:app'],
                options: {
                    livereload: true
                }
            }
        },

        // ## //

        jshint: {
            options: {
                'node': true,
                'curly': true,
                'eqeqeq': true,
                'immed': true,
                'latedef': true,
                'newcap': true,
                'noarg': true,
                'noempty': true,
                'unused': true,
                'undef': true,
                'trailing': true,
                'indent': 2,
                'quotmark': 'single',
                'boss': true,
                'eqnull': true,
                'strict': true
            },
            browser: {
                files: {
                    src: [
                        '<%= c.app %>/scripts/**/*.js'
                    ]
                },
                options: {
                    'browser': true
                }
            },
            node: {
                files: {
                    src: [
                        'Gruntfile.js',
                        'tasks/*.js'
                    ]
                }
            }
        },

        // ## //

        browserify: {
            app: {
                src: '<%= c.app %>/scripts/index.js',
                dest: '<%= c.dist %>/scripts/bundle.js'
            }
        },

        // ## //

        copy: {
            views: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= c.app %>',
                    dest: '<%= c.dist %>',
                    src: [
                        'index.html',
                        'views/**/*.html'
                    ]
                }]
            }
        }
    });

    grunt.registerTask('livereload', require('tasks/livereload')(grunt));

    grunt.registerTask('default', [
        'livereload',
        'watch'
    ]);

    grunt.registerTask('build', [
        'browserify:app',
        'copy:views'
    ]);
};
