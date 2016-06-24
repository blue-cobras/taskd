(function () {
	angular
		.module('myApp')
		.controller('newTaskCtrl', newTaskCtrl)

	function newTaskCtrl(TaskService) {

		// Vars
		let vm = this
		vm.createTask = createTask
		// vm.removeTask = removeTask
		vm.newTask = {}
		vm.tasks = []
		// Functions
		function createTask() {
			// Send data to Task Service
			TaskService.addToTaskList('me', vm.newTask)
			// Reset model
			vm.newTask = {}
		}
	}

})()

