(function () {
	angular
		.module('myApp')
		.service('AuthService', AuthService)

	function AuthService($http) {

		// Vars
		let vm = this

		// Exports
		vm.login = login
		vm.register = register
		vm.forgot = forgot

		// Functions
		function login(email, password) {
			console.log('Login Sent')
			$http.post('/api/login', { 'username': email, 'password': password })
				.then(res => {
					console.log(res)
				})
		}

		function register(email, password) {
			console.log('Registration Sent')
			$http.post('/api/user/create', { 'username': email, 'password': password })
				.then(res => {
					console.log(res)
				})
		}

		function forgot(email) {
			console.log('Request Sent')
			// TODO: Hook up API endpoint
		}

	}

})()