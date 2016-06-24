(function () {
	angular
		.module('myApp')
		.component('tasklist', {
			bindings: {
				count: '='
			},
			controller: 'taskListCtrl as ctrl',
			templateUrl: 'scripts/components/task-list/task-list.html'
		})
})()