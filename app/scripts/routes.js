module.exports = function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/pages/home.html',
            controller: 'HomeController'
        })
        .otherwise({
            redirectTo: '/'
        });
};
