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
				.state('splash.forgot', {
					url: '/forgot',
					template: '<forgot></forgot>'
				})
				.state('home', {
					url: '/home',
					templateUrl: 'scripts/partials/home.html'
				})
				.state('home.tasks', {
					url: '/tasks',
					templateUrl: 'scripts/partials/tasks.html'
				})
				.state('home.settings', {
					url: 'settings',
					templateUrl: 'scripts/partials/settings.html'
				})

			$urlRouterProvider.otherwise('/splash/login')

		})
})()