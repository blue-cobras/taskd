(function () {
	angular
		.module('myApp')
		.component('newtask', {
			bindings: {
				count: '='
			},
			controller: 'registerCtrl as ctrl',
			templateUrl: 'scripts/components/register/register.html'
		})
})()