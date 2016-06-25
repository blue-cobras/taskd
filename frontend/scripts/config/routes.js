(function () {
	angular.module('myApp')
		.config(($stateProvider, $urlRouterProvider) => {


			$stateProvider
				.state('splash', {
					url: '/splash',
					templateUrl: 'scripts/partials/splash.html'
				})
				.state('splash.login', {
					url: '/login',
					template: '<login></login>'
				})
				.state('splash.register', {
					url: '/register',
					template: '<register></register>'
				})
				.state('home', {
					url: '/home',
					templateUrl: 'scripts/partials/home.html'
				})

			$urlRouterProvider.otherwise('/splash/login')

		})
})()