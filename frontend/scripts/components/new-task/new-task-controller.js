(function () {
	angular
		.module('myApp')
		.controller('newTaskCtrl', newTaskCtrl)

	function newTaskCtrl() {

		// Vars
		var vm = this
		vm.createTask = createTask
		vm.removeTask = removeTask
		vm.newTask = {}
		vm.tasks=[]
		// Functions
		function createTask() {
			// TODO POST to back-end
			vm.tasks.push(vm.newTask)
			// Reset model
			vm.newTask = {}
		}
		function removeTask(i) {
			vm.tasks.splice(i,1)
		}
	}

})()

