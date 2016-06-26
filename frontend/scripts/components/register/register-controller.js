(function () {
	angular
		.module('myApp')
		.controller('registerCtrl', registerCtrl)

	function registerCtrl($state) {

		// Vars
		let vm = this

		// Exports
		vm.register = register

		// Functions
		function register() {
			$state.go('home.tasks')
		}
	}

})()