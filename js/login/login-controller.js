(function () {
	angular
		.module('myApp')
		.controller('loginCtrl', loginCtrl)

	function loginCtrl($state) {

		// Vars
		let vm = this

		// Exports
		vm.login = login

		// Functions
		function login() {
			$state.go('home.tasks')
		}
	}

})()