(function () {
	angular
		.module('myApp')
		.controller('loginCtrl', loginCtrl)

	function loginCtrl($state, AuthService) {

		// Vars
		let vm = this
		vm.logUser = { email: '', password: '' }

		// Exports
		vm.login = login

		// Functions
		function login() {
			// Send login and wait for token
			// console.log('Sending Login')
			// AuthService.login(vm.logUser.email, vm.logUser.password)

			// Bypass while back-end is being hooked up
			$state.go('home.tasks')
		}
	}

})()