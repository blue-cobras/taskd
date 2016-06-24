(function () {
	angular
		.module('myApp')
		.service('TaskService', TaskService)

	function TaskService() {

		// Vars
		let vm = this
		vm.getTaskList = getTaskList
		vm.addToTaskList = addToTaskList
		vm.removeTaskFromList = removeTaskFromList
		let taskList = [{ desc: 'stuff', due: '01/01/01', name: 'stuff' }]
		vm.taskList = getTaskList()

		// Functions
		function getTaskList(user) {
			// TODO: GET from back end
			let out = taskList
			return out
		}

		function addToTaskList(user, task) {
			// TODO: Post to back end
			if (task.name) taskList.push(task)
			vm.taskList = getTaskList()

		}

		function removeTaskFromList(i) {
			// TODO/: remove task from list
			vm.taskList.splice(i, 1)
		}

	}

})()