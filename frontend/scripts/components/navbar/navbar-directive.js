(function () {
	angular
		.module('myApp')
		.component('mynav', {
			bindings: {
				count: '='
			},
			controller: 'navbarCtrl as ctrl',
			templateUrl: 'scripts/components/navbar/navbar.html'
		})
})()