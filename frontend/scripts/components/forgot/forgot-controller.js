(function () {
	angular
		.module('myApp')
		.controller('forgotCtrl', forgotCtrl)

	function forgotCtrl($state, AuthService) {

		// Vars
		let vm = this

		// Exports
		vm.reset = reset
		vm.forUser = {email: ''}

		// Functions
		function reset() {
			// AuthService.forgot(email: vm.forUser.email)

			// Bypass while back-end is being hooked up
			$state.go('splash.login')
		}
	}

})()