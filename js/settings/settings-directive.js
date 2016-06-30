(function () {
	angular
		.module('myApp')
		.component('settings', {
			bindings: {
				count: '='
			},
			controller: 'settingsCtrl as ctrl',
			templateUrl: 'scripts/components/settings/settings.html'
		})
})()