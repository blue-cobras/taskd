(function () {
	angular
		.module('myApp')
		.component('register', {
			bindings: {
				count: '='
			},
			controller: 'registerCtrl as ctrl',
			templateUrl: 'scripts/components/register/register.html'
		})
})()