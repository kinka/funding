function dateStr(date) {
	var m = date.getMonth() + 1,
	    d = date.getDate();
	if (m < 10) m = '0' + m;
	if (d < 10) d = '0' + d;
	return date.getFullYear() + '-' + m + '-' + d
}
angular.module('funding', [])
.controller('FundingCtrl', function($scope) {
	$scope.records = [];
	for (var i=0; i<10; i++) {
		var record = {
		  income: i*100, outlay: -i*10, outcome: 300,
		  person: "kinkahuang",
		  remark: "随便说点", date: dateStr(new Date())
		};
		$scope.records.push(record)
	}
	$scope.records.sort(function(a, b) {
		return a.date < b.date;
	});
	var holdStart = 0;
	$scope.onRecordClick = function(event, index) {
		if (event.type == "mousedown") {
			holdStart = new Date()
		} else if (event.type == "mouseup") {
			var lapse = new Date() - holdStart
			if (lapse < 800) return;
			var toDelete = confirm("删除该记录?");
			if (!toDelete) return;
			$scope.records.splice(index, 1)
		}
	}
	$scope.onAdd = function() {
		var record = {
		  income: 0, outlay: 0, outcome: 0,
		  person: "",
		  remark: "随便说点", date: dateStr(new Date()),
		  isNew: true
		};
		$scope.records.push(record);
	}
	$scope.onEdit = function(e, index) {
		var target = e.target;
		var record = $scope.records[index];
		var input = document.createElement("input");
		if (target.className.indexOf('date') > -1) {
			input.type = "date"
		}
		input.value = target.innerHTML;
		target.innerHTML = "";
		target.className += " editing";
		target.appendChild(input);
		input.focus();
		input.onblur = input.onkeypress = function(e) {
			if (e.type == 'keypress' && e.keyCode != 13) return;
			input.onblur = input.onkeypress = null;
			var value = input.value;
			var className = target.className;
			if (className.indexOf('income') > -1 || className.indexOf('outlay') > -1) value = parseFloat(value);
			target.innerHTML = value;
			target.className = target.className.replace("editing", "");
		}
	}
})
