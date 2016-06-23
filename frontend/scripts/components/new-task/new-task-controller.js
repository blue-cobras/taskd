(function () {
	angular
		.module('myApp')
		.controller('newTaskCtrl', newTaskCtrl)

	function newTaskCtrl() {

		// Vars
		var vm = this
		vm.createTask = createTask
		vm.newTask = {}

		// Functions
		function createTask() {
			// TODO POST to back-end
			// Reset model
			vm.newTask = {}
		}

	}

})()