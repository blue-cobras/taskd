(function () {
	angular
		.module('myApp')
		.controller('registerCtrl', registerCtrl)

	function registerCtrl($state, AuthService) {

		// Vars
		let vm = this

		// Exports
		vm.register = register
		vm.regUser = { email: '', password1: '', password2: '' }

		// Functions
		function register() {
			// Check passwords are identical
			// console.log('Sending Registration')
			// if (vm.regUser.password1 === vm.regUser.password2) AuthService.register(vm.regUser.email, vm.regUser.password1)
			// else {
			// 	alert('Error: passwords don\'t match!')
			// 	vm.regUser.password1 = ''
			// 	vm.regUser.password2 = ''
			// }

			// Bypass while back-end is being hooked up
			$state.go('home.tasks')
		}
	}

})()