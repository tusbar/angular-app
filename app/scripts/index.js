var angular = require('angular');

var app = angular.module('app', [
]);

app.controller('HomeController',[
    '$scope',
    require('./controllers/home')
]);
