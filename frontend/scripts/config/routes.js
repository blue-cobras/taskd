(function () {
	angular.module('myApp')
		.config(($stateProvider, $urlRouterProvider) => {


			$stateProvider
				.state('login', {
					url: '/login',
					templateUrl: 'scripts/partials/login.html'
				})
				.state('home', {
					url: '/home',
					templateUrl: 'scripts/partials/home.html'
				})

			$urlRouterProvider.otherwise('/login')

		})
})()