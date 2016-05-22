
var calcApp = angular.module('calcApp', []);

calcApp.controller('CalcCtrl', function($scope) {

  $scope.master = [0];

  $scope.input = function(buttonData) {
    $scope.master.push(buttonData);
  };

  $scope.clear = function() {
    $scope.master = [0];
  };

  $scope.eval = function() {
    var evalString = $scope.master.join("");
    var answer = eval(evalString);
    $scope.master = [answer];
  };

});






