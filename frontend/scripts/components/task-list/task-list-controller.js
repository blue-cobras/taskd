(function () {
	angular
		.module('myApp')
		.controller('taskListCtrl', taskListCtrl)

	function taskListCtrl(TaskService) {

		// Vars
		let vm = this
		let user = 'me'
		vm.taskList = TaskService.taskList
		vm.removeTask = TaskService.removeTaskFromList

		// Functions

	}

})()