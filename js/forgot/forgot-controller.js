(function () {
	angular
		.module('myApp')
		.controller('forgotCtrl', forgotCtrl)

	function forgotCtrl($state) {

		// Vars
		let vm = this

		// Exports
		vm.reset = reset

		// Functions
		function reset() {
			$state.go('splash.login')
		}
	}

})()