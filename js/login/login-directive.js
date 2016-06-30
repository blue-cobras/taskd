(function () {
	angular
		.module('myApp')
		.component('login', {
			bindings: {
				count: '='
			},
			controller: 'loginCtrl as ctrl',
			templateUrl: 'scripts/components/login/login.html'
		})
})()