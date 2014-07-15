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
            scripts: {
                files: ['<%= c.app %>/scripts/**/*.js'],
                tasks: ['browserify:app'],
                options: {
                    livereload: true
                }
            },
            styles: {
                files: ['<%= c.app %>/styles/**/*.less'],
                tasks: ['less:app'],
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

        less: {
            options: {
                paths: ['node_modules']
            },
            app: {
                src: '<%= c.app %>/styles/main.less',
                dest: '<%= c.dist %>/styles/bundle.css'
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
        'build',
        'livereload',
        'watch'
    ]);

    grunt.registerTask('build', [
        'browserify:app',
        'less:app',
        'copy:views'
    ]);
};
