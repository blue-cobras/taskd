(function () {
	angular
		.module('myApp')
		.component('forgot', {
			bindings: {
				count: '='
			},
			controller: 'forgotCtrl as ctrl',
			templateUrl: 'scripts/components/forgot/forgot.html'
		})
})()