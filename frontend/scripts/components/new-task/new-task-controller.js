(function () {
	angular
		.module('myApp')
		.controller('newTaskCtrl', newTaskCtrl)

	function newTaskCtrl(TaskService) {

		// Vars
		let vm = this
		vm.createTask = createTask
		vm.newTask = {}
		vm.tasks = []

		//START DATEPICKER VENDOR CODE
		// Vars
		let tomorrow = new Date()
		let afterTomorrow = new Date()
		tomorrow.setDate(tomorrow.getDate() + 1)
		afterTomorrow.setDate(tomorrow.getDate() + 1)
		vm.inlineOptions = {
			customClass: getDayClass,
			minDate: new Date(),
			showWeeks: true
		}
		vm.dateOptions = {
			formatYear: 'yy',
			maxDate: new Date(2020, 5, 22),
			minDate: new Date(),
			startingDay: 1
		}
		vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate']
		vm.format = vm.formats[0]
		vm.altInputFormats = ['M!/d!/yyyy']
		vm.popup2 = {
			opened: false
		}
		vm.events = [
			{
				date: tomorrow,
				status: 'full'
			},
			{
				date: afterTomorrow,
				status: 'partially'
			}
		]
		// Exports
		vm.today = today
		vm.clear = clear
		vm.toggleMin = toggleMin
		vm.setDate = setDate
		vm.open2 = open2
		// Run
		vm.today()
		vm.toggleMin()
		// Functions
		function getDayClass(data) {
			let date = data.date,
				mode = data.mode
			if (mode === 'day') {
				let dayToCheck = new Date(date).setHours(0, 0, 0, 0)
				for (let i = 0; i < vm.events.length; i++) {
					let currentDay = new Date(vm.events[i].date).setHours(0, 0, 0, 0)
					if (dayToCheck === currentDay) {
						return vm.events[i].status
					}
				}
			}
			return ''
		}
		function today() {
			vm.newTask.due = new Date()
		}
		function clear() {
			vm.newTask.due = null
		}
		function toggleMin() {
			vm.inlineOptions.minDate = vm.inlineOptions.minDate ? null : new Date()
			vm.dateOptions.minDate = vm.inlineOptions.minDate
		}
		function setDate(year, month, day) {
			vm.newTask.due = new Date(year, month, day)
		}
		function open2() {
			vm.popup2.opened = true
		}
		// END DATEPICKER

		// Functions
		function createTask() {
			// Send data to Task Service
			TaskService.addToTaskList('me', vm.newTask)
			// Reset model
			vm.newTask = {}
			vm.today()
		}
	}

})()

