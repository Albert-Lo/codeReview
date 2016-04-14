'use strict'

var quoteApp = angular.module('quoteApp', []);
  quoteApp.controller('QuoteCtrl', function($scope, $http) {
    $scope.text = "I want to click this button"
    $scope.author = "You"
    this.generate = function generate() {
      $http.get('http://api.icndb.com/jokes/random')
	.success(function(res) {
	  $scope.text = res.value.joke;
	})
	.error(function(res) {
	  $scope.text = "I have no more Chuck Norris Jokes";
	});
      $scope.author = "Chuck Norris";
      var color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
      document.getElementById("wrapper").style.background = color;
      document.getElementById("btn").style.background = color;
    };
  });
