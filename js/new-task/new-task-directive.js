(function () {
	angular
		.module('myApp')
		.component('newtask', {
			bindings: {
				count: '='
			},
			controller: 'newTaskCtrl as ctrl',
			templateUrl: 'scripts/components/new-task/new-task.html'
		})
})()