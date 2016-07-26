/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-03-20 17:19:46
 * @version $Id$
 */

var app = angular.module("myApp", []);
app.controller('myCtrl', function($scope, $http, $timeout, $interval, $parse, $interpolate, $filter) {

	

	//跨越请求
	$http.jsonp("https://api.github.com?callback=JSON_CALLBACK") .success(function(data) {
		console.log(data)
	});



	//js过滤器
	$scope.filter = $filter('lowercase')('HWG');

	$scope.filterFun = function(str) {
		return str[0] == str[0].toUpperCase();
	}

})