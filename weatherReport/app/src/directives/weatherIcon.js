var weatherIcon = angular.module('weatherIcon', []);

weatherIcon.directive('weatherIcon', function() {
  return {
    restrict: 'E', 
    replace: true,
    controller: function($scope, $rootScope) {
      $scope.icon = function() {
	var baseUrl = 'http://openweathermap.org/img/w/';
	console.log($rootScope.icon)
	return baseUrl + $rootScope.icon + ".png"
      }   
    },  
    template: '<img ng-src="{{ icon() }}">'
  };  
}); 
