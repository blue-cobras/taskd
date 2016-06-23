(function () {
	angular
		.module('myApp')
		.component('myhome', {
			bindings: {
				count: '='
			},
			controller: 'homeCtrl as ctrl',
			templateUrl: 'scripts/components/home/home.html'
		})
})()