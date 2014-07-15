'use strict';

var angular = require('angular');

require('angular-route');


angular

    // App dependencies
    .module('app', [
        'ngRoute'
    ])

    // Enable #-less routes
    .config([
        '$locationProvider',
        function ($locationProvider) {
            $locationProvider.html5Mode(true);
        }
    ])

    // Route configuration
    .config([
        '$routeProvider',
        require('./routes')
    ])

    // Controllers
    .controller('HomeController', [
        '$scope',
        require('./controllers/home')
    ]);
